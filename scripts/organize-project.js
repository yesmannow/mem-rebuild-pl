#!/usr/bin/env node

/**
 * Project Hygiene Script
 * - Phase 1: Code audit for unused files (moves to src/_archive_unused)
 * - Phase 2: Asset audit for unreferenced media (moves to public/_archive_media)
 * - Phase 3: Logs recommendations for misfiled project images
 *
 * Safety: Files are moved, never deleted. A cleanup-report.txt is generated at the repo root.
 */

import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, 'src');
const publicDir = path.join(projectRoot, 'public');
const archiveCodeDir = path.join(srcDir, '_archive_unused');
const archiveMediaDir = path.join(publicDir, '_archive_media');
const reportPath = path.join(projectRoot, 'cleanup-report.txt');
const DRY_RUN = process.argv.includes('--dry-run');

const CODE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css'];
const IMPORT_REGEX = /import\s+(?:[\s\S]*?)from\s+['"](.+?)['"]|import\(\s*['"](.+?)['"]\s*\)|require\(\s*['"](.+?)['"]\s*\)/g;
const CSS_IMPORT_REGEX = /@import\s+['"](.+?)['"]/g;

const logLines = [];

const exists = async (p) => !!(await fs.stat(p).catch(() => false));

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

function normalize(p) {
  return path.normalize(p);
}

function isExcludedCode(filePath) {
  const rel = path.relative(srcDir, filePath);
  if (rel.startsWith('data' + path.sep)) return true; // dynamic references
  if (rel === 'vite-env.d.ts') return true;
  if (rel.startsWith('_archive_unused')) return true;
  return false;
}

function extractImports(content, isCss = false) {
  const imports = new Set();
  if (!content) return imports;

  if (isCss) {
    let match;
    while ((match = CSS_IMPORT_REGEX.exec(content)) !== null) {
      imports.add(match[1]);
    }
    return imports;
  }

  let match;
  while ((match = IMPORT_REGEX.exec(content)) !== null) {
    const [, imp1, imp2, imp3] = match;
    const target = imp1 || imp2 || imp3;
    if (target) imports.add(target);
  }
  return imports;
}

function resolveImport(fromFile, specifier, fileSet) {
  let base;

  if (specifier.startsWith('@/')) {
    base = path.join(srcDir, specifier.slice(2));
  } else if (specifier.startsWith('src/')) {
    base = path.join(projectRoot, specifier);
  } else if (specifier.startsWith('/')) {
    base = path.join(projectRoot, specifier.slice(1));
  } else if (specifier.startsWith('.')) {
    base = path.resolve(path.dirname(fromFile), specifier);
  } else {
    return null;
  }

  const candidates = [];

  if (CODE_EXTENSIONS.includes(path.extname(base))) {
    candidates.push(base);
  } else {
    CODE_EXTENSIONS.forEach((ext) => {
      candidates.push(base + ext);
      candidates.push(path.join(base, `index${ext}`));
    });
  }

  for (const candidate of candidates) {
    const normalized = normalize(candidate);
    if (fileSet.has(normalized)) return normalized;
  }
  return null;
}

async function phase1CodeAudit() {
  const codeFiles = await fg('src/**/*.{ts,tsx,js,jsx,css}', {
    cwd: projectRoot,
    absolute: true,
    onlyFiles: true,
  });
  const fileSet = new Set(codeFiles.map(normalize));
  const importMap = new Map();

  for (const file of fileSet) {
    const content = await fs.readFile(file, 'utf8').catch(() => '');
    const ext = path.extname(file);
    const imports = extractImports(content, ext === '.css');
    importMap.set(file, imports);
  }

  const entryCandidates = ['main.tsx', 'main.ts', 'index.tsx'];
  const entryFile = entryCandidates
    .map((f) => path.join(srcDir, f))
    .find((f) => fileSet.has(normalize(f)));
  if (!entryFile) {
    logLines.push('Phase 1: No entry file (main.tsx/main.ts/index.tsx) found. Skipping code audit.');
    return [];
  }

  const reachable = new Set();
  const queue = [normalize(entryFile)];
  while (queue.length) {
    const current = queue.pop();
    if (reachable.has(current)) continue;
    reachable.add(current);

    const imports = importMap.get(current) || [];
    for (const spec of imports) {
      const resolved = resolveImport(current, spec, fileSet);
      if (resolved && !reachable.has(resolved)) {
        queue.push(resolved);
      }
    }
  }

  const moved = [];
  for (const file of fileSet) {
    if (isExcludedCode(file)) continue;
    if (!reachable.has(file)) {
      const rel = path.relative(srcDir, file);
      const dest = path.join(archiveCodeDir, rel);
      await ensureDir(path.dirname(dest));
      if (await exists(dest)) {
        logLines.push(`  - Skipped (dest exists): ${path.relative(projectRoot, file)} -> ${path.relative(projectRoot, dest)}`);
        continue;
      }
      if (!DRY_RUN) {
        await fs.rename(file, dest);
      }
      moved.push({ from: file, to: dest });
    }
  }

  if (moved.length === 0) {
    logLines.push('Phase 1: No unused code files found.');
  } else {
    logLines.push('Phase 1: Moved unused code files:');
    moved.forEach((m) => logLines.push(`  - ${path.relative(projectRoot, m.from)} -> ${path.relative(projectRoot, m.to)}`));
  }
  return moved;
}

async function loadManifestEntries(manifestPath, folderBase) {
  const entries = [];
  if (!(await exists(manifestPath))) return entries;
  try {
    const data = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    if (Array.isArray(data)) {
      data.forEach((file) => entries.push(normalize(path.join(folderBase, file))));
    }
  } catch {
    // ignore parse errors
  }
  return entries;
}

async function phase2AssetAudit() {
  const referenced = new Set();

  // Side projects data references
  const sideProjectsPath = path.join(srcDir, 'data', 'sideProjects.ts');
  if (await exists(sideProjectsPath)) {
    const content = await fs.readFile(sideProjectsPath, 'utf8').catch(() => '');
    // Match any image path reference in sideProjects data
    const regex = new RegExp(`['"]([^'"]*?/images/[^'"]+)['"]`, 'g');
    let match;
    while ((match = regex.exec(content)) !== null) {
      const relPath = match[1].startsWith('/') ? match[1].slice(1) : match[1];
      referenced.add(normalize(path.join(projectRoot, relPath)));
    }
  }

  // Manifests for design and photography
  const designManifest = path.join(publicDir, 'images', 'design', 'manifest.json');
  const photoManifest = path.join(publicDir, 'images', 'photography', 'manifest.json');
  (await loadManifestEntries(designManifest, path.join(publicDir, 'images', 'design'))).forEach((p) => referenced.add(p));
  (await loadManifestEntries(photoManifest, path.join(publicDir, 'images', 'photography'))).forEach((p) => referenced.add(p));

  const imageFiles = await fg('public/images/**/*', {
    cwd: projectRoot,
    absolute: true,
    onlyFiles: true,
  });

  const moved = [];
  for (const file of imageFiles) {
    const rel = path.relative(publicDir, file);
    if (rel.startsWith('_archive_media')) continue;
    if (rel.endsWith('manifest.json')) continue;
    if (referenced.has(normalize(file))) continue;
    const dest = path.join(archiveMediaDir, rel);
    await ensureDir(path.dirname(dest));
    if (await exists(dest)) {
      logLines.push(`  - Skipped (dest exists): ${path.relative(projectRoot, file)} -> ${path.relative(projectRoot, dest)}`);
      continue;
    }
    if (!DRY_RUN) {
      await fs.rename(file, dest);
    }
    moved.push({ from: file, to: dest });
  }

  if (moved.length === 0) {
    logLines.push('Phase 2: No unreferenced media files moved.');
  } else {
    logLines.push('Phase 2: Moved unreferenced media files:');
    moved.forEach((m) => logLines.push(`  - ${path.relative(projectRoot, m.from)} -> ${path.relative(projectRoot, m.to)}`));
  }
  return moved;
}

async function phase3StructureRecommendations() {
  const recommendations = [];
  const projectsDir = path.join(publicDir, 'images', 'projects');
  const designDir = path.join(publicDir, 'images', 'design');

  if (!(await exists(projectsDir)) || !(await exists(designDir))) {
    return recommendations;
  }

  const projectFolders = (await fs.readdir(projectsDir, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name.toLowerCase());

  if (projectFolders.length === 0) return recommendations;

  const designFiles = await fg('**/*.*', { cwd: designDir, onlyFiles: true, absolute: true });
  for (const file of designFiles) {
    const base = path.basename(file).toLowerCase();
    const matchFolder = projectFolders.find((name) => base.includes(name));
    if (matchFolder) {
      recommendations.push(
        `Project asset likely misfiled: ${path.relative(projectRoot, file)} (matches projects/${matchFolder}). Consider moving to public/images/projects/${matchFolder}/`
      );
    }
  }

  if (recommendations.length) {
    logLines.push('Phase 3: Recommendations for project asset placement:');
    recommendations.forEach((r) => logLines.push(`  - ${r}`));
  } else {
    logLines.push('Phase 3: No project asset placement recommendations.');
  }

  return recommendations;
}

async function writeReport() {
  await fs.writeFile(reportPath, logLines.join('\n') + '\n', 'utf8');
}

async function main() {
  await ensureDir(archiveCodeDir);
  await ensureDir(archiveMediaDir);

  logLines.push(`Cleanup run: ${new Date().toISOString()}${DRY_RUN ? ' (dry-run)' : ''}`);

  await phase1CodeAudit();
  await phase2AssetAudit();
  await phase3StructureRecommendations();

  await writeReport();
  console.log(`Cleanup complete${DRY_RUN ? ' (dry-run)' : ''}. Report written to ${path.relative(projectRoot, reportPath)}`);
}

main().catch((err) => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});
