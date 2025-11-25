#!/usr/bin/env node
/**
 * Cleanup Archive Script
 * Moves old/unused files to archive directory for organization
 * Usage: node scripts/cleanup-archive.mjs [--dry-run] [--interactive]
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const archiveDir = path.join(repoRoot, 'archive');
const dryRun = process.argv.includes('--dry-run');
const interactive = process.argv.includes('--interactive');

// Patterns for files to archive
const archivePatterns = [
  // Old reports in root
  { pattern: /^.*-report\.md$/, type: 'report', dest: 'docs' },
  { pattern: /^.*-summary\.md$/, type: 'summary', dest: 'docs' },
  { pattern: /^.*-audit\.md$/, type: 'audit', dest: 'docs' },
  { pattern: /^.*-status\.md$/, type: 'status', dest: 'docs' },

  // Old HTML files in root
  { pattern: /^.*\.html$/, type: 'html', dest: 'docs', exclude: ['index.html', 'unused-gallery.html'] },

  // Temporary files
  { pattern: /^.*\.tmp$/, type: 'temp', dest: 'temp' },
  { pattern: /^.*\.bak$/, type: 'backup', dest: 'temp' },
  { pattern: /^.*timestamp-.*\.mjs$/, type: 'timestamped', dest: 'temp' },
];

async function ensureArchiveDir() {
  const dirs = ['docs', 'temp', 'reports'];
  for (const dir of dirs) {
    const fullPath = path.join(archiveDir, dir);
    try {
      await fs.mkdir(fullPath, { recursive: true });
    } catch (e) {
      // Directory might already exist
    }
  }
}

async function shouldArchive(filePath, fileName) {
  // Skip if already in archive
  if (filePath.includes('archive')) return false;

  // Skip node_modules, dist, etc.
  if (filePath.includes('node_modules') || filePath.includes('dist')) return false;

  // Check patterns
  for (const { pattern, exclude } of archivePatterns) {
    if (pattern.test(fileName)) {
      if (exclude && exclude.some(e => fileName === e)) {
        return false;
      }
      return true;
    }
  }

  return false;
}

async function getArchiveDestination(fileName, type) {
  const pattern = archivePatterns.find(p => p.pattern.test(fileName));
  if (!pattern) return null;

  const subdir = pattern.dest || 'misc';
  return path.join(archiveDir, subdir, fileName);
}

async function moveToArchive(sourcePath, destPath) {
  if (dryRun) {
    console.log(`[DRY RUN] Would move: ${path.relative(repoRoot, sourcePath)} → ${path.relative(repoRoot, destPath)}`);
    return false;
  }

  try {
    // Ensure destination directory exists
    await fs.mkdir(path.dirname(destPath), { recursive: true });

    // Move file
    await fs.rename(sourcePath, destPath);
    return true;
  } catch (error) {
    console.error(`❌ Failed to move ${sourcePath}:`, error.message);
    return false;
  }
}

async function scanDirectory(dir, files = []) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip certain directories
      if (entry.isDirectory()) {
        if (!['node_modules', 'dist', '.git', 'archive', '.next'].includes(entry.name)) {
          await scanDirectory(fullPath, files);
        }
        continue;
      }

      // Check if file should be archived
      if (await shouldArchive(fullPath, entry.name)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Skip directories we can't read
  }

  return files;
}

async function main() {
  console.log('📦 Cleanup Archive Tool\n');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Interactive: ${interactive ? 'YES' : 'NO'}\n`);

  await ensureArchiveDir();

  // Scan for files to archive
  console.log('🔍 Scanning for files to archive...\n');
  const filesToArchive = await scanDirectory(repoRoot);

  if (filesToArchive.length === 0) {
    console.log('✅ No files found to archive.');
    return;
  }

  console.log(`Found ${filesToArchive.length} file(s) to archive:\n`);

  // Group by type
  const grouped = {};
  for (const file of filesToArchive) {
    const fileName = path.basename(file);
    const pattern = archivePatterns.find(p => p.pattern.test(fileName));
    const type = pattern?.type || 'misc';

    if (!grouped[type]) grouped[type] = [];
    grouped[type].push({ file, fileName, type });
  }

  // Display grouped files
  for (const [type, files] of Object.entries(grouped)) {
    console.log(`📁 ${type.toUpperCase()} (${files.length}):`);
    files.forEach(({ file }) => {
      console.log(`   ${path.relative(repoRoot, file)}`);
    });
    console.log();
  }

  // Interactive mode
  if (interactive && !dryRun) {
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const question = (query) => new Promise((resolve) => rl.question(query, resolve));

    const answer = await question('\n❓ Archive these files? (y/N): ');
    rl.close();

    if (answer.toLowerCase() !== 'y') {
      console.log('❌ Cancelled.');
      return;
    }
  }

  // Move files
  console.log('\n📦 Archiving files...\n');
  let moved = 0;
  let failed = 0;

  for (const file of filesToArchive) {
    const fileName = path.basename(file);
    const dest = await getArchiveDestination(fileName, null);

    if (!dest) {
      console.warn(`⚠️  No destination for: ${fileName}`);
      failed++;
      continue;
    }

    const success = await moveToArchive(file, dest);
    if (success) moved++;
    else if (!dryRun) failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  if (dryRun) {
    console.log(`📊 DRY RUN: Would archive ${filesToArchive.length} file(s)`);
  } else {
    console.log(`✅ Archived: ${moved} file(s)`);
    if (failed > 0) {
      console.log(`❌ Failed: ${failed} file(s)`);
    }
  }
  console.log('='.repeat(50) + '\n');
}

main().catch(console.error);

