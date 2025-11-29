#!/usr/bin/env node
/**
 * Cleanup Unused Files Script
 * Finds and removes unused images and files from the project
 *
 * Usage:
 *   node scripts/cleanup-unused-files.js [--dry-run] [--images-only] [--all]
 *   --dry-run: Show what would be deleted without actually deleting
 *   --images-only: Only clean up images (default)
 *   --all: Clean up all unused files (images, components, etc.)
 *   --interactive: Prompt before deleting each file
 *   --force: Skip confirmation prompts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRY_RUN = process.argv.includes('--dry-run');
const IMAGES_ONLY = !process.argv.includes('--all');
const INTERACTIVE = process.argv.includes('--interactive');
const FORCE = process.argv.includes('--force');

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');
const reportsDir = path.join(projectRoot, 'reports');

// Directories to exclude from cleanup
const EXCLUDE_DIRS = [
  '_archive_media',
  'node_modules',
  '.git',
  'dist',
  'build',
  'archive',
];

// File patterns to always keep
const KEEP_PATTERNS = [
  /manifest\.json$/i,
  /favicon\./i,
  /logo.*\.(svg|png|webp)$/i,
  /og\/.*\.svg$/i, // Open Graph images
];

// Statistics
const stats = {
  deleted: [],
  skipped: [],
  errors: [],
  totalSize: 0,
};

// Create readline interface for interactive mode
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.toLowerCase().trim());
    });
  });
}

// Normalize path for comparison
function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/').toLowerCase();
}

// Check if file should be kept
function shouldKeepFile(filePath) {
  const relativePath = path.relative(publicDir, filePath).replace(/\\/g, '/');

  // Check exclude directories
  for (const excludeDir of EXCLUDE_DIRS) {
    if (relativePath.includes(excludeDir)) {
      return true;
    }
  }

  // Check keep patterns
  for (const pattern of KEEP_PATTERNS) {
    if (pattern.test(relativePath)) {
      return true;
    }
  }

  return false;
}

// Load unused assets report
function loadUnusedAssetsReport() {
  const reportPath = path.join(reportsDir, 'unused-assets-report.json');

  if (!fs.existsSync(reportPath)) {
    console.log('⚠️  No unused assets report found. Running find-unused-assets.js first...\n');
    return null;
  }

  try {
    const content = fs.readFileSync(reportPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error reading report: ${error.message}`);
    return null;
  }
}

// Find all unused files
async function findUnusedFiles() {
  const report = loadUnusedAssetsReport();

  if (!report) {
    console.log('📊 Generating unused assets report...\n');
    // Run the find-unused-assets script
    const { execSync } = await import('child_process');
    try {
      execSync('node scripts/find-unused-assets.js --images-only', {
        stdio: 'inherit',
        cwd: projectRoot
      });
      // Reload the report
      return loadUnusedAssetsReport();
    } catch (error) {
      console.error('❌ Failed to generate report');
      return null;
    }
  }

  return report;
}

// Get file size in human-readable format
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Delete a file
async function deleteFile(filePath, reason = '') {
  if (shouldKeepFile(filePath)) {
    stats.skipped.push({ path: filePath, reason: 'Protected file' });
    return false;
  }

  if (!fs.existsSync(filePath)) {
    stats.skipped.push({ path: filePath, reason: 'File not found' });
    return false;
  }

  try {
    const stat = fs.statSync(filePath);
    const size = stat.size;

    if (INTERACTIVE && !DRY_RUN) {
      const answer = await askQuestion(`Delete ${path.relative(projectRoot, filePath)}? (y/n): `);
      if (answer !== 'y' && answer !== 'yes') {
        stats.skipped.push({ path: filePath, reason: 'User skipped' });
        return false;
      }
    }

    if (!DRY_RUN) {
      fs.unlinkSync(filePath);
    }

    stats.deleted.push({
      path: filePath,
      size,
      reason: reason || 'Unused',
    });
    stats.totalSize += size;

    return true;
  } catch (error) {
    stats.errors.push({
      path: filePath,
      error: error.message,
    });
    return false;
  }
}

// Clean up unused images
async function cleanupUnusedImages() {
  console.log('🧹 Cleaning up unused images...\n');

  const report = await findUnusedFiles();

  if (!report || !report.unusedImages || report.unusedImages.length === 0) {
    console.log('✅ No unused images found!\n');
    return;
  }

  console.log(`Found ${report.unusedImages.length} unused image(s)\n`);

  if (!DRY_RUN && !FORCE && !INTERACTIVE) {
    const answer = await askQuestion(
      `⚠️  This will delete ${report.unusedImages.length} unused images (${formatSize(report.summary.totalUnusedSize)}). Continue? (y/n): `
    );
    if (answer !== 'y' && answer !== 'yes') {
      console.log('❌ Cleanup cancelled.\n');
      return;
    }
  }

  console.log(DRY_RUN ? '🔍 DRY RUN - No files will be deleted\n' : '🗑️  Deleting unused images...\n');

  for (const image of report.unusedImages) {
    const imagePath = image.path.startsWith('/')
      ? path.join(publicDir, image.path.slice(1))
      : path.join(publicDir, image.path);

    await deleteFile(imagePath, 'Unused image');
  }

  // Also check for duplicate formats (e.g., if .webp exists and is unused, check if .jpg/.png/.avif versions exist)
  await cleanupDuplicateFormats(report.unusedImages);
}

// Clean up duplicate image formats
async function cleanupDuplicateFormats(unusedImages) {
  console.log('\n🔍 Checking for duplicate image formats...\n');

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

  for (const image of unusedImages) {
    const imagePath = image.path.startsWith('/')
      ? path.join(publicDir, image.path.slice(1))
      : path.join(publicDir, image.path);

    const ext = path.extname(imagePath).toLowerCase();
    const basePath = imagePath.replace(ext, '');

    // Check for other formats of the same image
    for (const otherExt of imageExtensions) {
      if (otherExt === ext) continue;

      const otherPath = basePath + otherExt;
      if (fs.existsSync(otherPath)) {
        // Check if this other format is also unused
        const otherPublicPath = '/' + path.relative(publicDir, otherPath).replace(/\\/g, '/');
        const isAlsoUnused = unusedImages.some(img =>
          normalizePath(img.path) === normalizePath(otherPublicPath)
        );

        if (isAlsoUnused) {
          await deleteFile(otherPath, `Duplicate format of unused image`);
        }
      }
    }
  }
}

// Clean up empty directories
function cleanupEmptyDirectories(dir) {
  if (shouldKeepFile(dir)) {
    return;
  }

  try {
    const entries = fs.readdirSync(dir);

    // Recursively clean subdirectories first
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      if (fs.statSync(fullPath).isDirectory()) {
        cleanupEmptyDirectories(fullPath);
      }
    }

    // Check if directory is now empty (after cleaning subdirectories)
    const remainingEntries = fs.readdirSync(dir);
    if (remainingEntries.length === 0 && !DRY_RUN) {
      fs.rmdirSync(dir);
      console.log(`🗑️  Removed empty directory: ${path.relative(projectRoot, dir)}`);
    }
  } catch (error) {
    // Ignore errors (directory might have been deleted already)
  }
}

// Print summary
function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 Cleanup Summary');
  console.log('='.repeat(60));

  console.log(`\n✅ Deleted: ${stats.deleted.length} file(s)`);
  if (stats.deleted.length > 0) {
    console.log(`   Total size: ${formatSize(stats.totalSize)}`);
    if (DRY_RUN) {
      console.log('\n   Files that would be deleted:');
      stats.deleted.slice(0, 20).forEach(file => {
        console.log(`   - ${path.relative(projectRoot, file.path)} (${formatSize(file.size)})`);
      });
      if (stats.deleted.length > 20) {
        console.log(`   ... and ${stats.deleted.length - 20} more`);
      }
    }
  }

  if (stats.skipped.length > 0) {
    console.log(`\n⏭️  Skipped: ${stats.skipped.length} file(s)`);
    if (stats.skipped.length <= 10) {
      stats.skipped.forEach(file => {
        console.log(`   - ${path.relative(projectRoot, file.path)} (${file.reason})`);
      });
    }
  }

  if (stats.errors.length > 0) {
    console.log(`\n❌ Errors: ${stats.errors.length} file(s)`);
    stats.errors.forEach(error => {
      console.log(`   - ${path.relative(projectRoot, error.path)}: ${error.error}`);
    });
  }

  console.log('\n' + '='.repeat(60));

  if (DRY_RUN) {
    console.log('\n💡 This was a dry run. Use without --dry-run to actually delete files.\n');
  } else {
    console.log('\n✅ Cleanup complete!\n');
  }
}

// Main execution
async function main() {
  console.log('🧹 Cleanup Unused Files');
  console.log('='.repeat(60));
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Scope: ${IMAGES_ONLY ? 'Images only' : 'All files'}`);
  console.log(`Interactive: ${INTERACTIVE ? 'Yes' : 'No'}`);
  console.log('='.repeat(60) + '\n');

  try {
    if (IMAGES_ONLY) {
      await cleanupUnusedImages();
    } else {
      // For now, only images are supported
      await cleanupUnusedImages();
    }

    // Clean up empty directories
    if (!DRY_RUN) {
      console.log('\n🧹 Cleaning up empty directories...\n');
      cleanupEmptyDirectories(path.join(publicDir, 'images'));
    }

    printSummary();
  } catch (error) {
    console.error('\n❌ Error during cleanup:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();

