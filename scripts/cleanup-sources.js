#!/usr/bin/env node
/**
 * Cleanup Source Images Script
 * Removes original .jpg/.jpeg/.png files when .webp versions exist
 * Targets: public/images/photography/ and public/images/design/
 *
 * Usage: node scripts/cleanup-sources.js [--dry-run]
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const dryRun = process.argv.includes('--dry-run');

// Target directories
const TARGET_DIRS = [
  path.join(repoRoot, 'public', 'images', 'photography'),
  path.join(repoRoot, 'public', 'images', 'design'),
];

// Original image extensions
const ORIGINAL_EXTS = ['.jpg', '.jpeg', '.png'];
const WEBP_EXT = '.webp';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getBaseName(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return path.basename(filePath, ext);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function scanDirectory(dir) {
  const filesToRemove = [];
  let totalSize = 0;

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isFile()) continue;

      const ext = path.extname(entry.name).toLowerCase();

      // Check if this is an original image file
      if (ORIGINAL_EXTS.includes(ext)) {
        const fullPath = path.join(dir, entry.name);
        const baseName = getBaseName(fullPath);
        const webpPath = path.join(dir, `${baseName}${WEBP_EXT}`);

        // Only remove if .webp version exists (safety check)
        if (await fileExists(webpPath)) {
          const stats = await fs.stat(fullPath);
          filesToRemove.push({
            path: fullPath,
            size: stats.size,
            name: entry.name,
            webpName: `${baseName}${WEBP_EXT}`,
          });
          totalSize += stats.size;
        }
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`⚠️  Error scanning ${dir}: ${error.message}`);
    }
  }

  return { filesToRemove, totalSize };
}

async function main() {
  console.log('\n🗑️  Cleanup Source Images');
  console.log('='.repeat(60));
  console.log(`Mode: ${dryRun ? 'DRY RUN (no files will be deleted)' : 'LIVE (files will be deleted)'}\n`);

  let allFilesToRemove = [];
  let totalSize = 0;

  // Scan target directories
  for (const targetDir of TARGET_DIRS) {
    const relativeDir = path.relative(repoRoot, targetDir);
    console.log(`🔍 Scanning ${relativeDir}...`);

    const { filesToRemove, totalSize: dirSize } = await scanDirectory(targetDir);
    allFilesToRemove = allFilesToRemove.concat(filesToRemove);
    totalSize += dirSize;
  }

  if (allFilesToRemove.length === 0) {
    console.log('\n✅ No source images found that have .webp versions.');
    console.log('💡 All originals are either already removed or don\'t have .webp versions yet.\n');
    return;
  }

  console.log(`\n📊 Found ${allFilesToRemove.length} source image(s) with .webp versions`);
  console.log(`💾 Total size: ${formatSize(totalSize)}\n`);

  // Show files to remove
  console.log('📋 Files to remove:');
  allFilesToRemove.forEach((file, index) => {
    const relativePath = path.relative(repoRoot, file.path);
    console.log(`   ${index + 1}. ${relativePath} (${formatSize(file.size)}) → ${file.webpName} exists`);
  });
  console.log();

  // Confirm (unless dry run)
  if (!dryRun) {
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const question = (query) => new Promise((resolve) => rl.question(query, resolve));

    const answer = await question(`\n⚠️  Remove ${allFilesToRemove.length} source image files (${formatSize(totalSize)})? (yes/no): `);
    rl.close();

    if (answer.toLowerCase() !== 'yes') {
      console.log('❌ Cancelled.');
      return;
    }
  }

  // Remove files
  console.log(`\n${dryRun ? '🔍 [DRY RUN] Would remove' : '🗑️  Removing'} files...\n`);

  let removed = 0;
  let failed = 0;
  let notFound = 0;

  for (const file of allFilesToRemove) {
    try {
      if (dryRun) {
        const relativePath = path.relative(repoRoot, file.path);
        console.log(`[DRY RUN] Would delete: ${relativePath} (Source backed up in Lightroom)`);
        removed++;
      } else {
        await fs.unlink(file.path);
        const relativePath = path.relative(repoRoot, file.path);
        console.log(`✅ Deleted ${relativePath} (Source backed up in Lightroom)`);
        removed++;
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        notFound++;
      } else {
        failed++;
        const relativePath = path.relative(repoRoot, file.path);
        console.error(`❌ Failed to remove ${relativePath}: ${error.message}`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Cleanup Summary');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log(`[DRY RUN] Would remove: ${removed} files`);
    console.log(`[DRY RUN] Would save: ${formatSize(totalSize)}`);
  } else {
    console.log(`✅ Removed: ${removed} source image files`);
    console.log(`💾 Space saved: ${formatSize(totalSize)}`);
    if (notFound > 0) {
      console.log(`⚠️  Not found: ${notFound} files`);
    }
    if (failed > 0) {
      console.log(`❌ Failed: ${failed} files`);
    }
  }

  console.log('\n💡 Note: Original images are safely backed up in Lightroom.');
  console.log('   Only optimized .webp versions are needed for the website.\n');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

