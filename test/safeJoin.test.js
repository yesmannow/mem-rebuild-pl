/* eslint-disable no-console */
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { safeJoin } from "../mcp/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

describe("safeJoin path sanitizer", () => {
	const tmpDir = path.join(repoRoot, "tmp", ".mcp-smoke-tmp");
	beforeAll(() => {
		fs.mkdirSync(tmpDir, { recursive: true });
		fs.writeFileSync(path.join(tmpDir, "ok.txt"), "ok");
	});
	afterAll(() => {
		try {
			fs.rmSync(tmpDir, { recursive: true, force: true });
		} catch {}
	});

	test("allows paths under allowed root", () => {
		const relOk = path.relative(repoRoot, path.join(tmpDir, "ok.txt"));
		const resolved = safeJoin(repoRoot, relOk);
		expect(resolved).toContain(path.join(tmpDir, "ok.txt"));
	});

	test("rejects path traversal attempts", () => {
		expect(() => safeJoin(repoRoot, "../package.json")).toThrow();
	});

	test("rejects paths outside allowedPaths when configured", () => {
		// Construct a path that would be outside typical allowedPaths
		expect(() => safeJoin(repoRoot, "../../")).toThrow();
	});
});


