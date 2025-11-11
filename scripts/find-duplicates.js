#!/usr/bin/env node
/**
 * Duplicate File Finder Script
 * Finds duplicate files by content hash and filename
 *
 * Usage: node scripts/find-duplicates.js [--content-only] [--name-only] [--similar-names]
 * Example: node scripts/find-duplicates.js
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHECK_CONTENT = !process.argv.includes('--name-only');
const CHECK_NAME = !process.argv.includes('--content-only');
const CHECK_SIMILAR = process.argv.includes('--similar-names') || true;
const OUTPUT_PATH = 'reports/duplicates-report.json';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🔍 Duplicate File Finder');
console.log('=======================\n');

const contentDuplicates = [];
const nameDuplicates = [];
const similarNames = [];
const fileHashes = new Map();
const fileNames = new Map();

// Normalize filename for comparison
function normalizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Check if two filenames are similar (handles hyphenated variants)
function areSimilarNames(name1, name2) {
  const norm1 = normalizeFilename(name1);
  const norm2 = normalizeFilename(name2);
  return norm1 === norm2;
}

// Calculate file hash
function calculateFileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(content).digest('hex');
  } catch (error) {
    console.warn(`⚠️  Could not read file: ${filePath}`);
    return null;
  }
}

// Get file size in bytes
function getFileSize(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return stat.size;
  } catch (error) {
    return 0;
  }
}

// Check if file should be excluded
function shouldExclude(filePath) {
  const excludePaths = [
    'node_modules',
    '.git',
    'dist',
    'build',
    '.next',
    '.vite',
    'reports',
  ];

  const excludePatterns = [
    /\.test\./,
    /\.spec\./,
    /\.d\.ts$/,
    /\.map$/,
  ];

  // Check exclude paths
  for (const excludePath of excludePaths) {
    if (filePath.includes(excludePath)) {
      return true;
    }
  }

  // Check exclude patterns
  for (const pattern of excludePatterns) {
    if (pattern.test(filePath)) {
      return true;
    }
  }

  return false;
}

// Scan directory recursively
function scanDirectory(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(process.cwd(), fullPath);

    if (shouldExclude(relativePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (entry.isFile()) {
      fileList.push({
        path: fullPath,
        relative: relativePath,
        name: entry.name,
        size: getFileSize(fullPath),
      });
    }
  }

  return fileList;
}

// Find content-based duplicates
function findContentDuplicates(files) {
  if (!CHECK_CONTENT) return;

  console.log('📦 Scanning for content-based duplicates...\n');

  for (const file of files) {
    const hash = calculateFileHash(file.path);
    if (!hash) continue;

    if (!fileHashes.has(hash)) {
      fileHashes.set(hash, []);
    }
    fileHashes.get(hash).push(file);
  }

  // Find duplicates
  fileHashes.forEach((fileList, hash) => {
    if (fileList.length > 1) {
      // Sort by path length (shorter paths are usually the "original")
      const sorted = fileList.sort((a, b) => a.relative.length - b.relative.length);
      const original = sorted[0];
      const duplicates = sorted.slice(1);

      contentDuplicates.push({
        hash,
        original: {
          path: original.relative,
          size: original.size,
        },
        duplicates: duplicates.map(f => ({
          path: f.relative,
          size: f.size,
        })),
        totalSize: fileList.reduce((sum, f) => sum + f.size, 0),
        wastedSpace: duplicates.reduce((sum, f) => sum + f.size, 0),
      });
    }
  });

  console.log(`Found ${contentDuplicates.length} content-based duplicate group(s)`);
}

// Find name-based duplicates
function findNameDuplicates(files) {
  if (!CHECK_NAME) return;

  console.log('\n📝 Scanning for name-based duplicates...\n');

  const nameMap = new Map();

  for (const file of files) {
    const name = file.name.toLowerCase();
    if (!nameMap.has(name)) {
      nameMap.set(name, []);
    }
    nameMap.get(name).push(file);
  }

  // Find duplicates
  nameMap.forEach((fileList, name) => {
    if (fileList.length > 1) {
      // Check if they're actually different files (different content)
      const uniqueHashes = new Set();
      fileList.forEach(f => {
        const hash = calculateFileHash(f.path);
        if (hash) uniqueHashes.add(hash);
      });

      if (uniqueHashes.size > 1) {
        // Different content, same name - potential issue
        nameDuplicates.push({
          name,
          files: fileList.map(f => ({
            path: f.relative,
            size: f.size,
            hash: calculateFileHash(f.path),
          })),
        });
      }
    }
  });

  console.log(`Found ${nameDuplicates.length} name-based duplicate group(s)`);
}

// Find similar filenames (handles hyphenated variants)
function findSimilarNames(files) {
  if (!CHECK_SIMILAR) return;

  console.log('\n🔤 Scanning for similar filenames...\n');

  const similarMap = new Map();

  for (const file of files) {
    const normalized = normalizeFilename(file.name);
    if (!similarMap.has(normalized)) {
      similarMap.set(normalized, []);
    }
    similarMap.get(normalized).push(file);
  }

  // Find similar names
  similarMap.forEach((fileList, normalized) => {
    if (fileList.length > 1) {
      const uniqueNames = new Set(fileList.map(f => f.name));
      if (uniqueNames.size > 1) {
        // Different name formats but similar
        similarNames.push({
          normalized,
          variants: Array.from(uniqueNames),
          files: fileList.map(f => ({
            path: f.relative,
            name: f.name,
            size: f.size,
          })),
        });
      }
    }
  });

  console.log(`Found ${similarNames.length} similar filename group(s)`);
}

// Generate report
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      contentDuplicates: contentDuplicates.length,
      nameDuplicates: nameDuplicates.length,
      similarNames: similarNames.length,
      totalWastedSpace: contentDuplicates.reduce((sum, d) => sum + d.wastedSpace, 0),
    },
    contentDuplicates: contentDuplicates.slice(0, 50),
    nameDuplicates: nameDuplicates.slice(0, 50),
    similarNames: similarNames.slice(0, 50),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  console.log('\n📊 Duplicate File Report');
  console.log('========================');
  console.log(
    `Content Duplicates: ${report.summary.contentDuplicates} ${report.summary.contentDuplicates === 0 ? '✅' : '⚠️'}`
  );
  console.log(
    `Name Duplicates:    ${report.summary.nameDuplicates} ${report.summary.nameDuplicates === 0 ? '✅' : '⚠️'}`
  );
  console.log(
    `Similar Names:      ${report.summary.similarNames} ${report.summary.similarNames === 0 ? '✅' : '⚠️'}`
  );

  const wastedMB = (report.summary.totalWastedSpace / 1024 / 1024).toFixed(2);
  if (report.summary.totalWastedSpace > 0) {
    console.log(`Wasted Space:      ${wastedMB} MB`);
  }

  if (contentDuplicates.length > 0) {
    console.log('\n⚠️  Content-Based Duplicates (sample):');
    contentDuplicates.slice(0, 5).forEach(dup => {
      console.log(`\n   Original: ${dup.original.path} (${(dup.original.size / 1024).toFixed(2)} KB)`);
      dup.duplicates.forEach(d => {
        console.log(`   Duplicate: ${d.path} (${(d.size / 1024).toFixed(2)} KB)`);
      });
    });
  }

  if (similarNames.length > 0) {
    console.log('\n⚠️  Similar Filenames (sample):');
    similarNames.slice(0, 5).forEach(sim => {
      console.log(`\n   Variants: ${sim.variants.join(', ')}`);
      sim.files.forEach(f => {
        console.log(`   - ${f.path}`);
      });
    });
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);
}

// Main execution
const rootDir = process.cwd();
const allFiles = scanDirectory(rootDir);

console.log(`Found ${allFiles.length} file(s) to scan\n`);

findContentDuplicates(allFiles);
findNameDuplicates(allFiles);
findSimilarNames(allFiles);
generateReport();

