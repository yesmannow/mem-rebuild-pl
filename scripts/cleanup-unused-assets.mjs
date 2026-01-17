#!/usr/bin/env node
/**
 * Cleanup Unused Assets Script
 * Removes unused images identified in the asset audit
 *
 * Usage: node scripts/cleanup-unused-assets.mjs [--dry-run]
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRY_RUN = process.argv.includes('--dry-run');

// Unused images from audit report
const UNUSED_IMAGES = [
  'public/images/projects/Piko Fg Music/piko-logo.avif',
  'public/images/projects/Piko Fg Music/piko-logo.png',
  'public/images/projects/Piko Fg Music/piko-logo.webp',
  'public/images/projects/ResQ Organics/ResQ Organics for Pets.png',
  'public/images/projects/Russell painting/Interior_sl.avif',
  'public/images/projects/Russell painting/Interior_sl.webp',
  'public/images/projects/Russell painting/interior_w3.avif',
  'public/images/projects/Russell painting/interior_w3.webp',
  'public/images/projects/Russell painting/painting_illustration_01.avif',
  'public/images/projects/Russell painting/painting_illustration_01.png',
  'public/images/projects/Russell painting/painting_illustration_01.webp',
  'public/images/projects/Russell painting/rpc-logo.png',
  'public/images/_src/creative-agency-office-3.avif',
  'public/images/_src/creative-agency-office-3.webp',
  'public/images/_src/modern-workspace-6.avif',
  'public/images/_src/modern-workspace-6.webp',
];

async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

async function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function deleteFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  try {
    const size = await getFileSize(fullPath);
    const sizeStr = await formatSize(size);

    if (DRY_RUN) {
      console.log(`[DRY RUN] Would delete: ${filePath} (${sizeStr})`);
      return { deleted: false, size, path: filePath };
    } else {
      await fs.unlink(fullPath);
      console.log(`✅ Deleted: ${filePath} (${sizeStr})`);
      return { deleted: true, size, path: filePath };
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`⚠️  File not found (already deleted?): ${filePath}`);
      return { deleted: false, size: 0, path: filePath, error: 'not_found' };
    } else {
      console.error(`❌ Error deleting ${filePath}:`, error.message);
      return { deleted: false, size: 0, path: filePath, error: error.message };
    }
  }
}

async function main() {
  console.log('🧹 Cleanup Unused Assets');
  console.log('========================\n');

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No files will be deleted\n');
  } else {
    console.log('⚠️  LIVE MODE - Files will be permanently deleted\n');
  }

  let totalSize = 0;
  let foundCount = 0;
  let notFoundCount = 0;
  const results = [];

  for (const filePath of UNUSED_IMAGES) {
    const result = await deleteFile(filePath);
    results.push(result);

    if (result.error === 'not_found') {
      notFoundCount++;
    } else {
      foundCount++;
      totalSize += result.size;
    }
  }

  console.log('\n📊 Summary');
  console.log('==========');
  console.log(`Total files processed: ${UNUSED_IMAGES.length}`);
  console.log(`Files found ${DRY_RUN ? '(would be deleted)' : '(deleted)'}: ${foundCount}`);
  if (notFoundCount > 0) {
    console.log(`Files not found: ${notFoundCount}`);
  }
  console.log(`Total size ${DRY_RUN ? 'that would be ' : ''}freed: ${await formatSize(totalSize)}`);

  if (DRY_RUN) {
    console.log('\n💡 Run without --dry-run to actually delete files');
  } else {
    console.log('\n✅ Cleanup complete!');
  }

  // Write results to file
  const reportPath = path.join(process.cwd(), 'reports', 'cleanup-results.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(
    reportPath,
    JSON.stringify({
      timestamp: new Date().toISOString(),
      dryRun: DRY_RUN,
      summary: {
        totalFiles: UNUSED_IMAGES.length,
        found: foundCount,
        notFound: notFoundCount,
        totalSizeFreed: totalSize,
      },
      results,
    }, null, 2)
  );

  console.log(`\n📄 Report saved to: ${reportPath}`);
}

main().catch(console.error);
