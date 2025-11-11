#!/usr/bin/env node
/**
 * SVG Duplicate Finder Script
 * Detects duplicate SVG files in case-study folders
 *
 * Usage: node scripts/find-svg-duplicates.js
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = 'reports/svg-duplicates-report.json';
const CASE_STUDIES_DIR = path.join(process.cwd(), 'public', 'images', 'case-studies');

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🎨 SVG Duplicate Finder');
console.log('=======================\n');

const duplicates = [];
const svgHashes = new Map();

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

// Normalize SVG content for comparison (remove comments, normalize whitespace)
function normalizeSVG(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Calculate normalized hash (for finding similar but not identical SVGs)
function calculateNormalizedHash(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const normalized = normalizeSVG(content);
    return crypto.createHash('md5').update(normalized).digest('hex');
  } catch (error) {
    return null;
  }
}

// Scan case-study directories
function scanCaseStudies() {
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    console.log('⚠️  Case studies directory not found');
    return;
  }

  console.log('📁 Scanning case-study directories...\n');

  const subdirs = fs.readdirSync(CASE_STUDIES_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  console.log(`Found ${subdirs.length} case-study subdirectory(ies)\n`);

  // Target SVG files to check
  const targetFiles = ['after.svg', 'before.svg', 'cover.svg', 'gallery-1.svg', 'gallery-2.svg'];

  // Collect all SVG files
  const svgFiles = [];

  for (const subdir of subdirs) {
    const subdirPath = path.join(CASE_STUDIES_DIR, subdir);
    const files = fs.readdirSync(subdirPath);

    for (const filename of files) {
      if (filename.endsWith('.svg')) {
        const filePath = path.join(subdirPath, filename);
        const relativePath = path.relative(process.cwd(), filePath);
        const stat = fs.statSync(filePath);

        svgFiles.push({
          filename,
          subdir,
          path: filePath,
          relative: relativePath,
          size: stat.size,
          hash: calculateFileHash(filePath),
          normalizedHash: calculateNormalizedHash(filePath),
        });
      }
    }
  }

  console.log(`Found ${svgFiles.length} SVG file(s)\n`);

  // Group by hash
  const hashGroups = new Map();
  const normalizedHashGroups = new Map();

  for (const svgFile of svgFiles) {
    if (svgFile.hash) {
      if (!hashGroups.has(svgFile.hash)) {
        hashGroups.set(svgFile.hash, []);
      }
      hashGroups.get(svgFile.hash).push(svgFile);
    }

    if (svgFile.normalizedHash) {
      if (!normalizedHashGroups.has(svgFile.normalizedHash)) {
        normalizedHashGroups.set(svgFile.normalizedHash, []);
      }
      normalizedHashGroups.get(svgFile.normalizedHash).push(svgFile);
    }
  }

  // Find exact duplicates (same hash)
  hashGroups.forEach((fileList, hash) => {
    if (fileList.length > 1) {
      // Group by filename to find duplicates of specific files
      const filenameGroups = new Map();

      fileList.forEach(file => {
        if (!filenameGroups.has(file.filename)) {
          filenameGroups.set(file.filename, []);
        }
        filenameGroups.get(file.filename).push(file);
      });

      filenameGroups.forEach((files, filename) => {
        if (files.length > 1 && targetFiles.includes(filename)) {
          // Sort by path length (shorter paths are usually the "original")
          const sorted = files.sort((a, b) => a.relative.length - b.relative.length);
          const original = sorted[0];
          const duplicates = sorted.slice(1);

          duplicates.push({
            filename,
            hash,
            type: 'exact',
            original: {
              path: original.relative,
              subdir: original.subdir,
              size: original.size,
            },
            duplicates: duplicates.map(f => ({
              path: f.relative,
              subdir: f.subdir,
              size: f.size,
            })),
            totalSize: files.reduce((sum, f) => sum + f.size, 0),
            wastedSpace: duplicates.reduce((sum, f) => sum + f.size, 0),
            recommendation: `Keep "${original.relative}", remove ${duplicates.length} duplicate(s)`,
          });
        }
      });
    }
  });

  // Find normalized duplicates (similar content, different formatting)
  normalizedHashGroups.forEach((fileList, normalizedHash) => {
    if (fileList.length > 1) {
      // Check if they have different raw hashes (meaning they're formatted differently)
      const uniqueRawHashes = new Set(fileList.map(f => f.hash));

      if (uniqueRawHashes.size > 1) {
        // Same content, different formatting
        const filenameGroups = new Map();

        fileList.forEach(file => {
          if (!filenameGroups.has(file.filename)) {
            filenameGroups.set(file.filename, []);
          }
          filenameGroups.get(file.filename).push(file);
        });

        filenameGroups.forEach((files, filename) => {
          if (files.length > 1 && targetFiles.includes(filename)) {
            const sorted = files.sort((a, b) => a.relative.length - b.relative.length);
            const original = sorted[0];
            const duplicates = sorted.slice(1);

            duplicates.push({
              filename,
              normalizedHash,
              type: 'normalized',
              original: {
                path: original.relative,
                subdir: original.subdir,
                size: original.size,
              },
              duplicates: duplicates.map(f => ({
                path: f.relative,
                subdir: f.subdir,
                size: f.size,
              })),
              recommendation: `Files have same content but different formatting. Consider consolidating.`,
            });
          }
        });
      }
    }
  });

  console.log(`Found ${duplicates.length} duplicate SVG group(s)`);
}

// Generate report
function generateReport() {
  const exactDuplicates = duplicates.filter(d => d.type === 'exact');
  const normalizedDuplicates = duplicates.filter(d => d.type === 'normalized');

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      exactDuplicates: exactDuplicates.length,
      normalizedDuplicates: normalizedDuplicates.length,
      totalDuplicates: duplicates.length,
      totalWastedSpace: exactDuplicates.reduce((sum, d) => sum + (d.wastedSpace || 0), 0),
    },
    exactDuplicates,
    normalizedDuplicates,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  console.log('\n📊 SVG Duplicate Report');
  console.log('======================');
  console.log(
    `Exact Duplicates:   ${report.summary.exactDuplicates} ${report.summary.exactDuplicates === 0 ? '✅' : '⚠️'}`
  );
  console.log(
    `Normalized Duplicates: ${report.summary.normalizedDuplicates} ${report.summary.normalizedDuplicates === 0 ? '✅' : '⚠️'}`
  );

  const wastedKB = (report.summary.totalWastedSpace / 1024).toFixed(2);
  if (report.summary.totalWastedSpace > 0) {
    console.log(`Wasted Space:      ${wastedKB} KB`);
  }

  if (exactDuplicates.length > 0) {
    console.log('\n⚠️  Exact Duplicate SVGs:');
    exactDuplicates.forEach(dup => {
      console.log(`\n   File: ${dup.filename}`);
      console.log(`   Original: ${dup.original.path}`);
      dup.duplicates.forEach(d => {
        console.log(`   Duplicate: ${d.path}`);
      });
      console.log(`   Recommendation: ${dup.recommendation}`);
    });
  }

  if (normalizedDuplicates.length > 0) {
    console.log('\n⚠️  Normalized Duplicate SVGs (same content, different formatting):');
    normalizedDuplicates.forEach(dup => {
      console.log(`\n   File: ${dup.filename}`);
      console.log(`   Original: ${dup.original.path}`);
      dup.duplicates.forEach(d => {
        console.log(`   Similar: ${d.path}`);
      });
      console.log(`   Recommendation: ${dup.recommendation}`);
    });
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);
}

// Main execution
scanCaseStudies();
generateReport();

