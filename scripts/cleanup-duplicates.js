#!/usr/bin/env node
/**
 * Safe Cleanup Tool for Duplicates and Unused Files
 * Safely removes duplicates and unused files with dry-run mode
 *
 * Usage:
 *   node scripts/cleanup-duplicates.js --dry-run (default, shows what would be deleted)
 *   node scripts/cleanup-duplicates.js --interactive (prompts before deletion)
 *   node scripts/cleanup-duplicates.js --auto (deletes with confirmation)
 *   node scripts/cleanup-duplicates.js --unused-only (only remove unused files)
 *   node scripts/cleanup-duplicates.js --duplicates-only (only remove duplicates)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRY_RUN = process.argv.includes('--dry-run') || (!process.argv.includes('--interactive') && !process.argv.includes('--auto'));
const INTERACTIVE = process.argv.includes('--interactive');
const AUTO = process.argv.includes('--auto');
const UNUSED_ONLY = process.argv.includes('--unused-only');
const DUPLICATES_ONLY = process.argv.includes('--duplicates-only');
const BACKUP_DIR = path.join(process.cwd(), '.cleanup-backup');

const deletionLog = [];
const skippedFiles = [];

// Whitelist of files that should never be deleted
const WHITELIST = [
  'src/main.tsx',
  'src/App.tsx',
  'src/router/AppRouter.tsx',
  'public/sw.js',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  '.gitignore',
];

// Check if file is whitelisted
function isWhitelisted(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  return WHITELIST.some(whitelisted => relativePath.includes(whitelisted));
}

// Check if file is in src directory (requires extra caution)
function isInSrc(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  return relativePath.startsWith('src/');
}

// Create backup directory
function createBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

// Backup file before deletion
function backupFile(filePath) {
  if (!AUTO && !INTERACTIVE) return; // Only backup in non-dry-run mode

  createBackupDir();
  const relativePath = path.relative(process.cwd(), filePath);
  const backupPath = path.join(BACKUP_DIR, relativePath);
  const backupDir = path.dirname(backupPath);

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

// Delete file safely
function deleteFile(filePath, reason) {
  if (isWhitelisted(filePath)) {
    skippedFiles.push({ path: filePath, reason: 'Whitelisted file' });
    return false;
  }

  if (DRY_RUN) {
    deletionLog.push({
      path: filePath,
      reason,
      action: 'would delete',
      size: fs.statSync(filePath).size,
    });
    return true;
  }

  try {
    // Backup before deletion
    const backupPath = backupFile(filePath);

    fs.unlinkSync(filePath);
    deletionLog.push({
      path: filePath,
      reason,
      action: 'deleted',
      backup: backupPath,
      size: fs.statSync(backupPath).size,
    });
    return true;
  } catch (error) {
    console.error(`❌ Error deleting ${filePath}: ${error.message}`);
    return false;
  }
}

// Prompt user for confirmation
function promptUser(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Load reports
function loadReports() {
  const reports = {
    duplicates: null,
    unusedAssets: null,
    moodboardDuplicates: null,
    svgDuplicates: null,
    unusedAnimations: null,
  };

  try {
    if (fs.existsSync('reports/duplicates-report.json')) {
      reports.duplicates = JSON.parse(fs.readFileSync('reports/duplicates-report.json', 'utf-8'));
    }
  } catch (e) {}

  try {
    if (fs.existsSync('reports/unused-assets-report.json')) {
      reports.unusedAssets = JSON.parse(fs.readFileSync('reports/unused-assets-report.json', 'utf-8'));
    }
  } catch (e) {}

  try {
    if (fs.existsSync('reports/moodboard-duplicates-report.json')) {
      reports.moodboardDuplicates = JSON.parse(fs.readFileSync('reports/moodboard-duplicates-report.json', 'utf-8'));
    }
  } catch (e) {}

  try {
    if (fs.existsSync('reports/svg-duplicates-report.json')) {
      reports.svgDuplicates = JSON.parse(fs.readFileSync('reports/svg-duplicates-report.json', 'utf-8'));
    }
  } catch (e) {}

  try {
    if (fs.existsSync('reports/unused-animations-report.json')) {
      reports.unusedAnimations = JSON.parse(fs.readFileSync('reports/unused-animations-report.json', 'utf-8'));
    }
  } catch (e) {}

  return reports;
}

// Cleanup duplicates
async function cleanupDuplicates(reports) {
  if (UNUSED_ONLY) return;

  console.log('🗑️  Cleaning up duplicates...\n');

  // Content-based duplicates
  if (reports.duplicates?.contentDuplicates) {
    for (const dup of reports.duplicates.contentDuplicates) {
      for (const duplicate of dup.duplicates) {
        const filePath = path.join(process.cwd(), duplicate.path);

        if (!fs.existsSync(filePath)) continue;

        if (INTERACTIVE) {
          const confirmed = await promptUser(
            `Delete duplicate: ${duplicate.path}? (y/n): `
          );
          if (!confirmed) {
            skippedFiles.push({ path: filePath, reason: 'User skipped' });
            continue;
          }
        }

        deleteFile(filePath, `Duplicate of ${dup.original.path}`);
      }
    }
  }

  // Moodboard duplicates
  if (reports.moodboardDuplicates?.duplicates) {
    for (const dup of reports.moodboardDuplicates.duplicates) {
      // Keep the first file, delete others
      for (let i = 1; i < dup.files.length; i++) {
        const filePath = path.join(process.cwd(), dup.files[i].path);

        if (!fs.existsSync(filePath)) continue;

        if (INTERACTIVE) {
          const confirmed = await promptUser(
            `Delete duplicate moodboard: ${dup.files[i].path}? (y/n): `
          );
          if (!confirmed) {
            skippedFiles.push({ path: filePath, reason: 'User skipped' });
            continue;
          }
        }

        deleteFile(filePath, `Duplicate moodboard: ${dup.variants.join(', ')}`);
      }
    }
  }

  // SVG duplicates
  if (reports.svgDuplicates?.exactDuplicates) {
    for (const dup of reports.svgDuplicates.exactDuplicates) {
      for (const duplicate of dup.duplicates) {
        const filePath = path.join(process.cwd(), duplicate.path);

        if (!fs.existsSync(filePath)) continue;

        if (INTERACTIVE) {
          const confirmed = await promptUser(
            `Delete duplicate SVG: ${duplicate.path}? (y/n): `
          );
          if (!confirmed) {
            skippedFiles.push({ path: filePath, reason: 'User skipped' });
            continue;
          }
        }

        deleteFile(filePath, `Duplicate SVG: ${dup.filename}`);
      }
    }
  }
}

// Cleanup unused files
async function cleanupUnused(reports) {
  if (DUPLICATES_ONLY) return;

  console.log('🗑️  Cleaning up unused files...\n');

  // Unused images
  if (reports.unusedAssets?.unusedImages) {
    for (const img of reports.unusedAssets.unusedImages) {
      const filePath = path.join(process.cwd(), 'public', img.path.slice(1));

      if (!fs.existsSync(filePath)) continue;

      if (INTERACTIVE) {
        const confirmed = await promptUser(
          `Delete unused image: ${img.path}? (y/n): `
        );
        if (!confirmed) {
          skippedFiles.push({ path: filePath, reason: 'User skipped' });
          continue;
        }
      }

      deleteFile(filePath, 'Unused image');
    }
  }

  // Unused animations (be more cautious)
  if (reports.unusedAnimations?.unusedAnimations) {
    console.log('\n⚠️  Unused animation components found. Skipping deletion (requires manual review).');
    console.log('   Review unused-animations-report.json and delete manually if needed.\n');
  }
}

// Generate cleanup log
function generateCleanupLog() {
  const log = {
    timestamp: new Date().toISOString(),
    mode: DRY_RUN ? 'dry-run' : INTERACTIVE ? 'interactive' : 'auto',
    summary: {
      deleted: deletionLog.filter(d => d.action === 'deleted').length,
      wouldDelete: deletionLog.filter(d => d.action === 'would delete').length,
      skipped: skippedFiles.length,
      totalSize: deletionLog.reduce((sum, d) => sum + (d.size || 0), 0),
    },
    deletions: deletionLog,
    skipped: skippedFiles,
    backupLocation: DRY_RUN ? null : BACKUP_DIR,
  };

  const logPath = `reports/cleanup-log-${Date.now()}.json`;
  fs.writeFileSync(logPath, JSON.stringify(log, null, 2));

  return log;
}

// Main execution
async function main() {
  console.log('🧹 Cleanup Tool');
  console.log('===============\n');

  if (DRY_RUN) {
    console.log('🔍 DRY-RUN MODE: No files will be deleted\n');
  } else if (INTERACTIVE) {
    console.log('💬 INTERACTIVE MODE: You will be prompted before each deletion\n');
  } else if (AUTO) {
    console.log('⚡ AUTO MODE: Files will be deleted automatically\n');
    const confirmed = await promptUser('⚠️  Are you sure you want to proceed? (y/n): ');
    if (!confirmed) {
      console.log('Cleanup cancelled.');
      process.exit(0);
    }
  }

  // Load reports
  const reports = loadReports();

  if (!reports.duplicates && !reports.unusedAssets && !reports.moodboardDuplicates && !reports.svgDuplicates) {
    console.log('⚠️  No reports found. Run asset-audit.js first to generate reports.');
    process.exit(1);
  }

  // Run cleanup
  await cleanupDuplicates(reports);
  await cleanupUnused(reports);

  // Generate log
  const log = generateCleanupLog();

  // Summary
  console.log('\n📊 Cleanup Summary');
  console.log('==================');
  console.log(`Mode: ${log.mode}`);
  console.log(`Deleted: ${log.summary.deleted}`);
  console.log(`Would Delete: ${log.summary.wouldDelete}`);
  console.log(`Skipped: ${log.summary.skipped}`);

  const totalMB = (log.summary.totalSize / 1024 / 1024).toFixed(2);
  if (log.summary.totalSize > 0) {
    console.log(`Total Size: ${totalMB} MB`);
  }

  if (log.backupLocation) {
    console.log(`\n✅ Backup created at: ${log.backupLocation}`);
  }

  console.log(`\n✅ Cleanup log saved to: reports/cleanup-log-*.json`);

  if (DRY_RUN) {
    console.log('\n💡 Run with --interactive or --auto to actually delete files.');
  }
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});

