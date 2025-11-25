#!/usr/bin/env node
/**
 * Remove Original Image Files Script
 * Removes original .jpg/.jpeg/.png files when optimized .webp/.avif versions exist
 * This prevents "double bloat" - keeping both original and optimized versions
 *
 * Usage: node scripts/remove-original-images.js [--dry-run] [directory]
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const dryRun = process.argv.includes('--dry-run');
const targetDir = process.argv.find(arg => !arg.startsWith('--') && arg !== 'scripts/remove-original-images.js' && arg !== 'node')
  || path.join(repoRoot, 'public', 'images');

// Original image extensions to check
const ORIGINAL_EXTS = ['.jpg', '.jpeg', '.png'];
// Optimized extensions that indicate we can safely remove originals
const OPTIMIZED_EXTS = ['.webp', '.avif'];

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getBaseName(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath, ext);
  return base;
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

  async function walkDir(currentDir) {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          await walkDir(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();

          // Check if this is an original image file
          if (ORIGINAL_EXTS.includes(ext)) {
            // Check if optimized versions exist
            const baseName = getBaseName(fullPath);
            let hasOptimized = false;

            for (const optExt of OPTIMIZED_EXTS) {
              const optimizedPath = path.join(currentDir, `${baseName}${optExt}`);
              if (await fileExists(optimizedPath)) {
                hasOptimized = true;
                break;
              }
            }

            if (hasOptimized) {
              const stats = await fs.stat(fullPath);
              filesToRemove.push({
                path: fullPath,
                size: stats.size,
                baseName: baseName,
              });
              totalSize += stats.size;
            }
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Error scanning ${dir}: ${error.message}`);
    }
  }

  await walkDir(dir);
  return { filesToRemove, totalSize };
}

async function main() {
  console.log('\n🗑️  Remove Original Image Files');
  console.log('='.repeat(60));
  console.log(`Mode: ${dryRun ? 'DRY RUN (no files will be deleted)' : 'LIVE (files will be deleted)'}`);
  console.log(`Target directory: ${targetDir}\n`);

  // Check if target directory exists
  try {
    await fs.access(targetDir);
  } catch {
    console.error(`❌ Directory not found: ${targetDir}`);
    process.exit(1);
  }

  console.log('🔍 Scanning for original images with optimized versions...\n');
  const { filesToRemove, totalSize } = await scanDirectory(targetDir);

  if (filesToRemove.length === 0) {
    console.log('✅ No original images found that have optimized versions.');
    console.log('💡 All originals are either already removed or don\'t have optimized versions yet.\n');
    return;
  }

  console.log(`📊 Found ${filesToRemove.length} original image(s) with optimized versions`);
  console.log(`💾 Total size: ${formatSize(totalSize)}\n`);

  // Show first 20 files
  console.log('📋 Files to remove:');
  filesToRemove.slice(0, 20).forEach((file, index) => {
    const relativePath = path.relative(repoRoot, file.path);
    console.log(`   ${index + 1}. ${relativePath} (${formatSize(file.size)})`);
  });
  if (filesToRemove.length > 20) {
    console.log(`   ... and ${filesToRemove.length - 20} more`);
  }
  console.log();

  // Confirm (unless dry run)
  if (!dryRun) {
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const question = (query) => new Promise((resolve) => rl.question(query, resolve));

    const answer = await question(`\n⚠️  Remove ${filesToRemove.length} original image files (${formatSize(totalSize)})? (yes/no): `);
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

  for (const file of filesToRemove) {
    try {
      if (dryRun) {
        removed++;
      } else {
        await fs.unlink(file.path);
        removed++;
        if (removed % 10 === 0) {
          process.stdout.write('.');
        }
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        notFound++;
      } else {
        failed++;
        console.error(`\n❌ Failed to remove ${file.path}: ${error.message}`);
      }
    }
  }

  console.log('\n');
  console.log('='.repeat(60));
  console.log('📊 Cleanup Summary');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log(`[DRY RUN] Would remove: ${removed} files`);
    console.log(`[DRY RUN] Would save: ${formatSize(totalSize)}`);
  } else {
    console.log(`✅ Removed: ${removed} original image files`);
    console.log(`💾 Space saved: ${formatSize(totalSize)}`);
    if (notFound > 0) {
      console.log(`⚠️  Not found: ${notFound} files`);
    }
    if (failed > 0) {
      console.log(`❌ Failed: ${failed} files`);
    }
  }

  console.log('\n💡 Note: Original images are safely backed up in Lightroom.');
  console.log('   Only optimized .webp/.avif versions are needed for the website.\n');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

