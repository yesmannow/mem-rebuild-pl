#!/usr/bin/env node
/**
 * Find Large Files Script
 * Scans repository for large files and provides detailed information
 * Usage: node scripts/find-large-files.mjs [--threshold=1MB] [--top=10] [--check-usage] [--json]
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const thresholdArg = args.find(arg => arg.startsWith('--threshold='));
const topArg = args.find(arg => arg.startsWith('--top='));
const checkUsage = args.includes('--check-usage');
const jsonOutput = args.includes('--json');
const excludeDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'archive'];

const threshold = parseSize(thresholdArg?.split('=')[1] || '100KB');
const topN = parseInt(topArg?.split('=')[1] || '20', 10);

function parseSize(sizeStr) {
  const units = {
    'B': 1,
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024,
  };

  const match = sizeStr.match(/^(\d+\.?\d*)\s*([KMGT]?B)$/i);
  if (!match) return 100 * 1024; // Default 100KB

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  return value * (units[unit] || 1);
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function getFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const typeMap = {
    '.mp4': 'Video',
    '.webm': 'Video',
    '.mov': 'Video',
    '.avi': 'Video',
    '.jpg': 'Image',
    '.jpeg': 'Image',
    '.png': 'Image',
    '.webp': 'Image',
    '.gif': 'Image',
    '.svg': 'Image',
    '.avif': 'Image',
    '.pdf': 'Document',
    '.zip': 'Archive',
    '.tar': 'Archive',
    '.gz': 'Archive',
    '.json': 'Data',
    '.js': 'Code',
    '.ts': 'Code',
    '.tsx': 'Code',
    '.jsx': 'Code',
    '.css': 'Styles',
    '.html': 'Markup',
    '.md': 'Documentation',
  };
  return typeMap[ext] || 'Other';
}

async function isFileUsed(filePath, codebaseRoot) {
  if (!checkUsage) return null;

  const fileName = path.basename(filePath);
  const relativePath = path.relative(codebaseRoot, filePath).replace(/\\/g, '/');

  try {
    // Search in common source directories
    const searchDirs = [
      path.join(codebaseRoot, 'src'),
      path.join(codebaseRoot, 'public'),
      path.join(codebaseRoot, 'scripts'),
    ];

    for (const dir of searchDirs) {
      try {
        const files = await getAllFiles(dir);
        for (const file of files) {
          if (file === filePath) continue;

          try {
            const content = await fs.readFile(file, 'utf8');
            if (content.includes(fileName) || content.includes(relativePath)) {
              return { used: true, foundIn: path.relative(codebaseRoot, file) };
            }
          } catch {
            // Skip binary files
          }
        }
      } catch {
        // Directory might not exist
      }
    }

    return { used: false };
  } catch {
    return null;
  }
}

async function getAllFiles(dir, fileList = []) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(repoRoot, fullPath);

      // Check if this path should be excluded
      const pathParts = relativePath.split(path.sep);
      const shouldExclude = excludeDirs.some(ex =>
        pathParts.includes(ex) ||
        relativePath.startsWith(ex + path.sep) ||
        relativePath.startsWith('.' + path.sep + ex)
      );

      if (shouldExclude) {
        continue;
      }

      try {
        if (entry.isDirectory()) {
          await getAllFiles(fullPath, fileList);
        } else {
          fileList.push(fullPath);
        }
      } catch (err) {
        // Skip files/dirs we can't access
      }
    }
  } catch (err) {
    // Skip directories we can't read
  }

  return fileList;
}

async function scanForLargeFiles() {
  console.log('🔍 Scanning for large files...\n');
  console.log(`Threshold: ${formatSize(threshold)}`);
  console.log(`Top ${topN} files will be shown\n`);

  const allFiles = await getAllFiles(repoRoot);
  const largeFiles = [];

  for (const filePath of allFiles) {
    try {
      const stats = await fs.stat(filePath);
      if (stats.size >= threshold) {
        const relativePath = path.relative(repoRoot, filePath);
        const usage = await isFileUsed(filePath, repoRoot);

        largeFiles.push({
          path: relativePath,
          fullPath: filePath,
          size: stats.size,
          type: getFileType(filePath),
          modified: stats.mtime,
          used: usage,
        });
      }
    } catch (err) {
      // Skip files we can't read
    }
  }

  // Sort by size descending
  largeFiles.sort((a, b) => b.size - a.size);

  return largeFiles.slice(0, topN);
}

function displayResults(files) {
  if (jsonOutput) {
    console.log(JSON.stringify(files.map(f => ({
      path: f.path,
      size: f.size,
      sizeFormatted: formatSize(f.size),
      type: f.type,
      modified: f.modified.toISOString(),
      used: f.used?.used || null,
      foundIn: f.used?.foundIn || null,
    })), null, 2));
    return;
  }

  console.log('='.repeat(80));
  console.log(`📊 Top ${files.length} Largest Files\n`);

  files.forEach((file, index) => {
    console.log(`${index + 1}. ${file.path}`);
    console.log(`   Size: ${formatSize(file.size)} | Type: ${file.type}`);
    console.log(`   Modified: ${file.modified.toLocaleString()}`);

    if (checkUsage && file.used) {
      if (file.used.used) {
        console.log(`   ✅ Used in: ${file.used.foundIn}`);
      } else {
        console.log(`   ⚠️  Not found in codebase (possibly unused)`);
      }
    }

    console.log();
  });

  // Summary
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const byType = {};
  files.forEach(f => {
    byType[f.type] = (byType[f.type] || 0) + f.size;
  });

  console.log('='.repeat(80));
  console.log('📈 Summary:\n');
  console.log(`Total size: ${formatSize(totalSize)}`);
  console.log(`Files found: ${files.length}`);
  console.log('\nBy type:');
  Object.entries(byType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, size]) => {
      console.log(`  ${type}: ${formatSize(size)} (${files.filter(f => f.type === type).length} files)`);
    });

  if (checkUsage) {
    const unused = files.filter(f => f.used && !f.used.used);
    if (unused.length > 0) {
      console.log(`\n⚠️  ${unused.length} potentially unused file(s) found`);
      const unusedSize = unused.reduce((sum, f) => sum + f.size, 0);
      console.log(`   Total unused size: ${formatSize(unusedSize)}`);
    }
  }

  console.log('='.repeat(80));
}

async function main() {
  try {
    const largeFiles = await scanForLargeFiles();
    displayResults(largeFiles);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
