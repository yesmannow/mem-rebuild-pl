#!/usr/bin/env node
/**
 * Smart Asset Cleanup Script
 * Deletes unused assets from the unused-assets-report.json with safety filters
 *
 * Usage: node scripts/cleanup-assets.js [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const REPORT_PATH = path.join(repoRoot, 'reports', 'unused-assets-report.json');
const PUBLIC_DIR = path.join(repoRoot, 'public');
const dryRun = process.argv.includes('--dry-run');

// Safety filter: Files containing these strings will NOT be deleted
const PROTECTED_KEYWORDS = [
  'gold-key',
  'iu-',
  'samplegates',
  'graston',
  'education', // Protect education assets
  'awards',    // Protect awards assets
];

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isProtected(filePath) {
  const normalized = filePath.toLowerCase();
  return PROTECTED_KEYWORDS.some(keyword => normalized.includes(keyword));
}

function deleteFile(filePath) {
  const fullPath = path.join(PUBLIC_DIR, filePath.replace(/^\//, ''));

  if (!fs.existsSync(fullPath)) {
    return { success: false, error: 'File not found' };
  }

  if (dryRun) {
    return { success: true, dryRun: true };
  }

  try {
    fs.unlinkSync(fullPath);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🧹 Smart Asset Cleanup');
  console.log('======================\n');
  console.log(`Mode: ${dryRun ? 'DRY RUN (no files will be deleted)' : 'LIVE (files will be deleted)'}\n`);

  // Check if report exists
  if (!fs.existsSync(REPORT_PATH)) {
    console.error('❌ Report not found:', REPORT_PATH);
    console.log('💡 Run "npm run audit:unused" first to generate the report.');
    process.exit(1);
  }

  // Read report
  const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
  const unusedImages = report.unusedImages || [];

  if (unusedImages.length === 0) {
    console.log('✅ No unused images found in report.');
    return;
  }

  console.log(`📊 Found ${unusedImages.length} unused images in report\n`);

  // Filter and process
  const toDelete = [];
  const protectedFiles = [];
  let totalSize = 0;
  let protectedSize = 0;

  for (const image of unusedImages) {
    const imagePath = image.path || image;
    const imageSize = image.size || 0;

    if (isProtected(imagePath)) {
      protectedFiles.push({ path: imagePath, size: imageSize });
      protectedSize += imageSize;
    } else {
      toDelete.push({ path: imagePath, size: imageSize });
      totalSize += imageSize;
    }
  }

  // Display protected files
  if (protectedFiles.length > 0) {
    console.log(`🛡️  Protected Files (${protectedFiles.length} files, ${formatSize(protectedSize)}):`);
    protectedFiles.slice(0, 10).forEach(item => {
      console.log(`   ✓ ${item.path}`);
    });
    if (protectedFiles.length > 10) {
      console.log(`   ... and ${protectedFiles.length - 10} more`);
    }
    console.log();
  }

  // Display files to delete
  console.log(`🗑️  Files to Delete (${toDelete.length} files, ${formatSize(totalSize)}):`);
  toDelete.slice(0, 20).forEach(item => {
    console.log(`   ${dryRun ? '[DRY RUN]' : '   '} ${item.path} (${formatSize(item.size)})`);
  });
  if (toDelete.length > 20) {
    console.log(`   ... and ${toDelete.length - 20} more`);
  }
  console.log();

  if (toDelete.length === 0) {
    console.log('✅ No files to delete (all are protected).');
    return;
  }

  // Confirm (unless dry run)
  if (!dryRun) {
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const question = (query) => new Promise((resolve) => rl.question(query, resolve));

    const answer = await question(`\n⚠️  Delete ${toDelete.length} files (${formatSize(totalSize)})? (yes/no): `);
    rl.close();

    if (answer.toLowerCase() !== 'yes') {
      console.log('❌ Cancelled.');
      return;
    }
  }

  // Delete files
  console.log(`\n${dryRun ? '🔍 [DRY RUN] Would delete' : '🗑️  Deleting'} files...\n`);

  let deleted = 0;
  let failed = 0;
  let notFound = 0;

  for (const item of toDelete) {
    const result = deleteFile(item.path);

    if (result.dryRun) {
      deleted++;
    } else if (result.success) {
      deleted++;
      if (deleted % 10 === 0) {
        process.stdout.write('.');
      }
    } else if (result.error === 'File not found') {
      notFound++;
    } else {
      failed++;
      console.error(`\n❌ Failed to delete ${item.path}: ${result.error}`);
    }
  }

  console.log('\n');
  console.log('='.repeat(50));
  console.log('📊 Cleanup Summary');
  console.log('='.repeat(50));

  if (dryRun) {
    console.log(`[DRY RUN] Would delete: ${deleted} files`);
    console.log(`[DRY RUN] Would save: ${formatSize(totalSize)}`);
  } else {
    console.log(`✅ Deleted: ${deleted} files`);
    console.log(`💾 Space saved: ${formatSize(totalSize)}`);
    if (notFound > 0) {
      console.log(`⚠️  Not found: ${notFound} files`);
    }
    if (failed > 0) {
      console.log(`❌ Failed: ${failed} files`);
    }
  }

  console.log(`🛡️  Protected: ${protectedFiles.length} files (${formatSize(protectedSize)})`);
  console.log('='.repeat(50) + '\n');
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

