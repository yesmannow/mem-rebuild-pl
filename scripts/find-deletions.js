#!/usr/bin/env node
/**
 * Generate DELETIONS_CANDIDATES.md with metadata for likely-removable files.
 * Non-destructive: only writes a report.
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const candidates = [];
const maxSizeBytes = Number(process.env.DELETION_SIZE_THRESHOLD || 5 * 1024 * 1024); // 5MB
const patterns = [
	/\.bak$/i, /~$/, /\.tmp$/i, /^Thumbs\.db$/i, /^\.DS_Store$/i,
	/^tatus.*/i, /^use BearCave CSS variables for consistent branding\.*$/i,
	/^PR integrates.*$/i
];

function walk(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "dist" || entry.name === "build") continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(full);
			continue;
		}
		const rel = path.relative(root, full).replace(/\\/g, "/");
		const stat = fs.statSync(full);
		const reason = [];
		if (patterns.some(p => p.test(entry.name))) reason.push("suspicious/temporary filename");
		if (stat.size >= maxSizeBytes) reason.push(`large file >= ${maxSizeBytes}B`);
		if (rel.endsWith(".map")) reason.push("source map (build artifact)");
		if (!reason.length) continue;
		candidates.push({
			path: rel,
			size: stat.size,
			mtime: stat.mtime.toISOString(),
			reasonCandidate: reason.join(", ")
		});
	}
}

walk(root);

const out = [
	"# Candidate Deletions",
	"",
	"Note: This is a non-destructive report. Review before deletion.",
	"",
	"| Path | Size (bytes) | Modified | Reason |",
	"|------|--------------:|----------|--------|",
	...candidates.map(c => `| ${c.path} | ${c.size} | ${c.mtime} | ${c.reasonCandidate} |`),
	""
].join("\n");

fs.writeFileSync("DELETIONS_CANDIDATES.md", out, "utf8");
console.log(`Wrote DELETIONS_CANDIDATES.md with ${candidates.length} candidates`);

#!/usr/bin/env node
/**
 * Deletions Candidate Scanner
 * - Walks the repository
 * - Identifies likely removable files (.bak, ~, temp files), large assets (> threshold), and unreferenced files
 * - Cross-checks references (package.json, tsconfig.json, README.md)
 * - Emits DELETIONS_CANDIDATES.md with metadata for each candidate
 *
 * Usage:
 *   node scripts/find-deletions.js --threshold=1MB
 *   node scripts/find-deletions.js --threshold=2000000   // bytes
 *
 * Notes:
 * - This script does NOT delete files. It only reports candidates with reasons and confidence.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";

const repoRoot = path.resolve(process.cwd());

function parseThreshold(argValue) {
	const str = String(argValue || "").trim().toUpperCase();
	if (!str) return 1 * 1024 * 1024; // default 1MB
	if (/^\d+$/.test(str)) return parseInt(str, 10);
	const match = /^(\d+(?:\.\d+)?)(B|KB|MB|GB)$/.exec(str);
	if (!match) return 1 * 1024 * 1024;
	const value = parseFloat(match[1]);
	const unit = match[2];
	const multipliers = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
	return Math.round(value * multipliers[unit]);
}

function formatBytes(bytes) {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = ["B", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function sha256OfFile(filePath) {
	try {
		const hash = crypto.createHash("sha256");
		const data = fs.readFileSync(filePath);
		hash.update(data);
		return hash.digest("hex");
	} catch {
		return "";
	}
}

const IGNORED_DIRS = new Set([
	".git",
	"node_modules",
	"dist",
	"types",
	".next",
	"storybook-static",
	".turbo",
	".cache",
	".pnpm-store",
]);

const TEMP_BACKUP_PATTERNS = [
	/\.bak$/i,
	/~$/i,
	/\.tmp$/i,
	/\.swp$/i,
	/\.swo$/i,
	/^\.DS_Store$/i,
	/^Thumbs\.db$/i,
];

const BINARY_EXTENSIONS = new Set([
	"jpg", "jpeg", "png", "gif", "webp", "avif", "bmp", "ico", "svgz",
	"mp4", "mov", "mkv", "webm", "avi",
	"mp3", "wav", "flac", "ogg",
	"zip", "tar", "gz", "bz2", "7z",
	"pdf", "psd", "ai", "eps",
	"doc", "docx", "xls", "xlsx", "ppt", "pptx",
]);

function looksTempOrBackup(filename) {
	return TEMP_BACKUP_PATTERNS.some((re) => re.test(filename));
}

function isBinaryByExt(filename) {
	const ext = path.extname(filename).toLowerCase().replace(".", "");
	return BINARY_EXTENSIONS.has(ext);
}

function safeRel(p) {
	return path.relative(repoRoot, p).split(path.sep).join("/");
}

function readFileTextIfExists(p) {
	try {
		return fs.readFileSync(p, "utf8");
	} catch {
		return "";
	}
}

function collectReferenceCorpus() {
	const corpus = [];
	const pkgPath = path.join(repoRoot, "package.json");
	const tsconfigPath = path.join(repoRoot, "tsconfig.json");
	const readmePath = path.join(repoRoot, "README.md");
	const tsconfigAppPath = path.join(repoRoot, "tsconfig.app.json");

	corpus.push(readFileTextIfExists(pkgPath));
	corpus.push(readFileTextIfExists(tsconfigPath));
	corpus.push(readFileTextIfExists(tsconfigAppPath));
	corpus.push(readFileTextIfExists(readmePath));

	return corpus.join("\n").toLowerCase();
}

function walkFiles(startDir) {
	/** @type {string[]} */
	const files = [];
	/** @type {string[]} */
	const queue = [startDir];
	while (queue.length) {
		const current = queue.pop();
		if (!current) continue;
		let stat;
		try {
			stat = fs.statSync(current);
		} catch {
			continue;
		}
		if (stat.isDirectory()) {
			const base = path.basename(current);
			if (IGNORED_DIRS.has(base)) continue;
			let entries = [];
			try {
				entries = fs.readdirSync(current);
			} catch {
				continue;
			}
			for (const e of entries) {
				queue.push(path.join(current, e));
			}
		} else if (stat.isFile()) {
			files.push(current);
		}
	}
	return files;
}

function buildHowToVerify(reason, relPath) {
	switch (reason) {
		case "temporary/backup artifact":
			return "Open a PR to remove; confirm no build or script references this file.";
		case "large file exceeds threshold":
			return "Confirm file is not used by app and not referenced in content; if removable, replace with optimized version or remove.";
		case "unreferenced file (cross-check)":
			return "Search repo for usages (IDE or grep) and verify not required by code, configs, or docs before removal.";
		default:
			return "Manually verify usage and references before deleting.";
	}
}

function main() {
	const arg = process.argv.find((s) => s.startsWith("--threshold="));
	const thresholdStr = arg ? arg.split("=")[1] : "";
	const thresholdBytes = parseThreshold(thresholdStr || "");

	const corpus = collectReferenceCorpus();
	const allFiles = walkFiles(repoRoot);

	/** @type {{
	 *   path: string,
	 *   size: number,
	 *   lastModified: string,
	 *   reason: string,
	 *   confidence: "high"|"medium"|"low",
	 *   checksum?: string
	 * }[]} */
	const candidates = [];

	for (const absPath of allFiles) {
		const relPath = safeRel(absPath);
		const base = path.basename(absPath);
		let stat;
		try {
			stat = fs.statSync(absPath);
		} catch {
			continue;
		}
		const size = stat.size || 0;
		const lastModified = new Date(stat.mtimeMs || Date.now()).toISOString();

		// 1) Temp/backup artifacts
		if (looksTempOrBackup(base)) {
			candidates.push({
				path: relPath,
				size,
				lastModified,
				reason: "temporary/backup artifact",
				confidence: "high",
				checksum: isBinaryByExt(base) || size > thresholdBytes ? sha256OfFile(absPath) : undefined,
			});
			continue;
		}

		// 2) Large assets
		if (size > thresholdBytes) {
			candidates.push({
				path: relPath,
				size,
				lastModified,
				reason: "large file exceeds threshold",
				confidence: (relPath.startsWith("public/") || relPath.startsWith("src/assets/")) ? "medium" : "low",
				checksum: sha256OfFile(absPath),
			});
			continue;
		}

		// 3) Unreferenced (cross-check package.json, tsconfig*, README)
		const corpusHit = corpus.includes(relPath.toLowerCase()) || corpus.includes(base.toLowerCase());
		if (!corpusHit) {
			// exclude obvious source files from unreferenced noise
			const ext = path.extname(base).toLowerCase();
			const isSourceLike = [".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".md", ".yml", ".yaml"].includes(ext);
			// only flag assets and misc files for low-confidence unreferenced
			if (!isSourceLike) {
				candidates.push({
					path: relPath,
					size,
					lastModified,
					reason: "unreferenced file (cross-check)",
					confidence: "low",
					checksum: isBinaryByExt(base) ? sha256OfFile(absPath) : undefined,
				});
			}
		}
	}

	// Write DELETIONS_CANDIDATES.md
	const outPath = path.join(repoRoot, "DELETIONS_CANDIDATES.md");
	const lines = [];
	lines.push("# Deletions Candidates");
	lines.push("");
	lines.push(`- Repo root: ${repoRoot}`);
	lines.push(`- Scan threshold: ${formatBytes(thresholdBytes)} (${thresholdBytes} bytes)`);
	lines.push(`- Generated: ${new Date().toISOString()}`);
	lines.push("");
	lines.push("This is a non-destructive report enumerating likely removable files and artifacts.");
	lines.push("It does not delete anything. Review reasons and verification steps before removal.");
	lines.push("");
	lines.push("| path | size | lastModified | reason | confidence | howToVerify | checksum |");
	lines.push("|------|------|--------------|--------|------------|-------------|----------|");
	for (const c of candidates.sort((a, b) => b.size - a.size || a.path.localeCompare(b.path))) {
		const sizeStr = formatBytes(c.size);
		const how = buildHowToVerify(c.reason, c.path);
		const checksum = c.checksum ? "`" + c.checksum + "`" : "";
		lines.push(`| \`${c.path}\` | ${sizeStr} | ${c.lastModified} | ${c.reason} | ${c.confidence} | ${how} | ${checksum} |`);
	}
	lines.push("");
	lines.push("Notes:");
	lines.push("- Confidence is heuristic. 'High' indicates common temp/backup patterns.");
	lines.push("- For 'large files', consider optimizing before deletion.");
	lines.push("- For 'unreferenced', confirm with a project-wide search in your IDE.");
	lines.push("");

	fs.writeFileSync(outPath, lines.join("\n"), "utf8");
	console.log(`Wrote ${outPath} with ${candidates.length} candidates.`);
}

main();


