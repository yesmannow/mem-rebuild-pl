#!/usr/bin/env node
/**
 * Moodboard Duplicate Finder Script
 * Detects duplicate moodboard JSON files with similar names
 *
 * Usage: node scripts/find-moodboard-duplicates.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = 'reports/moodboard-duplicates-report.json';
const MOODBOARDS_DIR = path.join(process.cwd(), 'public', 'moodboards');

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🎨 Moodboard Duplicate Finder');
console.log('==============================\n');

const duplicates = [];
const similarNames = [];

// Normalize filename for comparison
function normalizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Compare JSON content (deep comparison)
function compareJSONContent(content1, content2) {
  try {
    const obj1 = JSON.parse(content1);
    const obj2 = JSON.parse(content2);

    // Compare key properties
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();

    if (keys1.length !== keys2.length) {
      return { identical: false, similarity: 0 };
    }

    let matchingKeys = 0;
    let totalKeys = keys1.length;

    for (const key of keys1) {
      if (keys2.includes(key)) {
        const val1 = JSON.stringify(obj1[key]);
        const val2 = JSON.stringify(obj2[key]);
        if (val1 === val2) {
          matchingKeys++;
        }
      }
    }

    const similarity = matchingKeys / totalKeys;
    return {
      identical: similarity === 1,
      similarity,
    };
  } catch (error) {
    return { identical: false, similarity: 0, error: error.message };
  }
}

// Scan moodboards directory
function scanMoodboards() {
  if (!fs.existsSync(MOODBOARDS_DIR)) {
    console.log('⚠️  Moodboards directory not found');
    return;
  }

  console.log('📁 Scanning moodboards directory...\n');

  const files = fs.readdirSync(MOODBOARDS_DIR);
  const moodboardFiles = files.filter(f => f.endsWith('.json'));

  console.log(`Found ${moodboardFiles.length} moodboard file(s)\n`);

  // Group files by normalized name
  const nameGroups = new Map();

  for (const filename of moodboardFiles) {
    const normalized = normalizeFilename(filename);
    if (!nameGroups.has(normalized)) {
      nameGroups.set(normalized, []);
    }
    nameGroups.get(normalized).push(filename);
  }

  // Find duplicates and similar names
  nameGroups.forEach((fileList, normalized) => {
    if (fileList.length > 1) {
      // Multiple files with similar names
      const fileData = fileList.map(filename => {
        const filePath = path.join(MOODBOARDS_DIR, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        const stat = fs.statSync(filePath);

        return {
          filename,
          path: filePath,
          relative: path.relative(process.cwd(), filePath),
          size: stat.size,
          content,
          lastModified: stat.mtime.toISOString(),
        };
      });

      // Compare content
      const comparisons = [];
      for (let i = 0; i < fileData.length; i++) {
        for (let j = i + 1; j < fileData.length; j++) {
          const comparison = compareJSONContent(fileData[i].content, fileData[j].content);
          comparisons.push({
            file1: fileData[i].filename,
            file2: fileData[j].filename,
            ...comparison,
          });
        }
      }

      // Check if any are identical
      const identicalPair = comparisons.find(c => c.identical);

      if (identicalPair) {
        // True duplicates
        duplicates.push({
          normalized,
          variants: fileList,
          files: fileData.map(f => ({
            filename: f.filename,
            path: f.relative,
            size: f.size,
            lastModified: f.lastModified,
          })),
          comparison: identicalPair,
          recommendation: `Keep "${fileData[0].filename}" (first alphabetically), remove others`,
        });
      } else {
        // Similar names but different content
        const avgSimilarity = comparisons.reduce((sum, c) => sum + c.similarity, 0) / comparisons.length;

        similarNames.push({
          normalized,
          variants: fileList,
          files: fileData.map(f => ({
            filename: f.filename,
            path: f.relative,
            size: f.size,
            lastModified: f.lastModified,
          })),
          comparisons,
          averageSimilarity: avgSimilarity,
          recommendation: avgSimilarity > 0.8
            ? 'Files are very similar - consider consolidating'
            : 'Files have different content - review manually',
        });
      }
    }
  });

  console.log(`Found ${duplicates.length} duplicate group(s)`);
  console.log(`Found ${similarNames.length} similar name group(s)`);
}

// Generate report
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      duplicates: duplicates.length,
      similarNames: similarNames.length,
      totalFilesToReview: duplicates.reduce((sum, d) => sum + d.files.length - 1, 0),
    },
    duplicates,
    similarNames,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  console.log('\n📊 Moodboard Duplicate Report');
  console.log('============================');
  console.log(
    `Duplicates:        ${report.summary.duplicates} ${report.summary.duplicates === 0 ? '✅' : '⚠️'}`
  );
  console.log(
    `Similar Names:     ${report.summary.similarNames} ${report.summary.similarNames === 0 ? '✅' : '⚠️'}`
  );
  console.log(
    `Files to Review:   ${report.summary.totalFilesToReview}`
  );

  if (duplicates.length > 0) {
    console.log('\n⚠️  Duplicate Moodboards:');
    duplicates.forEach(dup => {
      console.log(`\n   Variants: ${dup.variants.join(', ')}`);
      console.log(`   Recommendation: ${dup.recommendation}`);
      dup.files.forEach(f => {
        console.log(`   - ${f.filename} (${(f.size / 1024).toFixed(2)} KB, modified: ${f.lastModified.split('T')[0]})`);
      });
    });
  }

  if (similarNames.length > 0) {
    console.log('\n⚠️  Similar Named Moodboards (different content):');
    similarNames.forEach(sim => {
      console.log(`\n   Variants: ${sim.variants.join(', ')}`);
      console.log(`   Average Similarity: ${(sim.averageSimilarity * 100).toFixed(1)}%`);
      console.log(`   Recommendation: ${sim.recommendation}`);
      sim.files.forEach(f => {
        console.log(`   - ${f.filename} (${(f.size / 1024).toFixed(2)} KB)`);
      });
    });
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);
}

// Main execution
scanMoodboards();
generateReport();

