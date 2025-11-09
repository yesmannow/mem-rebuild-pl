#!/usr/bin/env node
/**
 * Bundle Size Monitor Script
 * Tracks bundle size over time and alerts on increases
 *
 * Usage: node scripts/monitor-bundle-size.js [--compare] [--threshold=100]
 * Example: node scripts/monitor-bundle-size.js --compare --threshold=100
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPARE = process.argv.includes('--compare');
const THRESHOLD = parseInt(
  process.argv.find(arg => arg.startsWith('--threshold='))?.split('=')[1] || '100'
);
const OUTPUT_PATH = 'reports/bundle-size-report.json';
const HISTORY_PATH = 'reports/bundle-size-history.json';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('📦 Bundle Size Monitor');
console.log('======================\n');

// Get file size
function getFileSize(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const stat = fs.statSync(filePath);
  return stat.size;
}

// Format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Analyze bundle
function analyzeBundle() {
  const distDir = path.join(process.cwd(), 'dist');

  if (!fs.existsSync(distDir)) {
    console.log('⚠️  dist directory not found. Building first...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Build failed');
      process.exit(1);
    }
  }

  console.log('📁 Analyzing bundle...\n');

  const assets = {
    js: [],
    css: [],
    images: [],
    other: [],
  };

  let totalSize = 0;

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else {
        const size = stat.size;
        totalSize += size;
        const relativePath = path.relative(distDir, filePath);

        if (file.endsWith('.js')) {
          assets.js.push({ file: relativePath, size, formatted: formatBytes(size) });
        } else if (file.endsWith('.css')) {
          assets.css.push({ file: relativePath, size, formatted: formatBytes(size) });
        } else if (file.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
          assets.images.push({ file: relativePath, size, formatted: formatBytes(size) });
        } else {
          assets.other.push({ file: relativePath, size, formatted: formatBytes(size) });
        }
      }
    });
  }

  scanDirectory(distDir);

  // Sort by size (largest first)
  Object.keys(assets).forEach(key => {
    assets[key].sort((a, b) => b.size - a.size);
  });

  // Calculate totals by type
  const totals = {
    js: assets.js.reduce((sum, file) => sum + file.size, 0),
    css: assets.css.reduce((sum, file) => sum + file.size, 0),
    images: assets.images.reduce((sum, file) => sum + file.size, 0),
    other: assets.other.reduce((sum, file) => sum + file.size, 0),
  };

  const report = {
    timestamp: new Date().toISOString(),
    totalSize,
    totals: {
      js: { size: totals.js, formatted: formatBytes(totals.js) },
      css: { size: totals.css, formatted: formatBytes(totals.css) },
      images: { size: totals.images, formatted: formatBytes(totals.images) },
      other: { size: totals.other, formatted: formatBytes(totals.other) },
    },
    largestFiles: {
      js: assets.js.slice(0, 10),
      css: assets.css.slice(0, 10),
      images: assets.images.slice(0, 10),
    },
    assetCounts: {
      js: assets.js.length,
      css: assets.css.length,
      images: assets.images.length,
      other: assets.other.length,
    },
  };

  return report;
}

// Compare with history
function compareWithHistory(currentReport) {
  if (!fs.existsSync(HISTORY_PATH)) {
    console.log('📝 Creating initial history...\n');
    const history = [currentReport];
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));
    return null;
  }

  const history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf-8'));
  const lastReport = history[history.length - 1];

  const comparison = {
    totalSize: {
      current: currentReport.totalSize,
      previous: lastReport.totalSize,
      change: currentReport.totalSize - lastReport.totalSize,
      changePercent: (
        ((currentReport.totalSize - lastReport.totalSize) / lastReport.totalSize) *
        100
      ).toFixed(2),
    },
    js: {
      current: currentReport.totals.js.size,
      previous: lastReport.totals.js.size,
      change: currentReport.totals.js.size - lastReport.totals.js.size,
      changePercent: (
        ((currentReport.totals.js.size - lastReport.totals.js.size) / lastReport.totals.js.size) *
        100
      ).toFixed(2),
    },
    css: {
      current: currentReport.totals.css.size,
      previous: lastReport.totals.css.size,
      change: currentReport.totals.css.size - lastReport.totals.css.size,
      changePercent: (
        ((currentReport.totals.css.size - lastReport.totals.css.size) /
          lastReport.totals.css.size) *
        100
      ).toFixed(2),
    },
  };

  // Add to history (keep last 10)
  history.push(currentReport);
  if (history.length > 10) {
    history.shift();
  }
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));

  return comparison;
}

// Main function
function runMonitor() {
  const report = analyzeBundle();

  // Display current stats
  console.log('📊 Bundle Size Analysis');
  console.log('=======================');
  console.log(`Total Size:     ${formatBytes(report.totalSize)}`);
  console.log(`JavaScript:     ${report.totals.js.formatted} (${report.assetCounts.js} files)`);
  console.log(`CSS:            ${report.totals.css.formatted} (${report.assetCounts.css} files)`);
  console.log(
    `Images:         ${report.totals.images.formatted} (${report.assetCounts.images} files)`
  );
  console.log(
    `Other:          ${report.totals.other.formatted} (${report.assetCounts.other} files)`
  );

  console.log('\n📦 Largest JavaScript Files:');
  report.largestFiles.js.slice(0, 5).forEach((file, idx) => {
    console.log(`   ${idx + 1}. ${file.file}: ${file.formatted}`);
  });

  console.log('\n🎨 Largest CSS Files:');
  report.largestFiles.css.slice(0, 5).forEach((file, idx) => {
    console.log(`   ${idx + 1}. ${file.file}: ${file.formatted}`);
  });

  // Compare if requested
  if (COMPARE) {
    const comparison = compareWithHistory(report);

    if (comparison) {
      console.log('\n📈 Size Comparison');
      console.log('==================');

      const totalChange = parseFloat(comparison.totalSize.changePercent);
      const jsChange = parseFloat(comparison.js.changePercent);
      const cssChange = parseFloat(comparison.css.changePercent);

      console.log(
        `Total Size:     ${formatBytes(comparison.totalSize.current)} (${totalChange >= 0 ? '+' : ''}${totalChange}%) ${totalChange > THRESHOLD ? '⚠️' : totalChange > 0 ? '📈' : '✅'}`
      );
      console.log(
        `JavaScript:     ${formatBytes(comparison.js.current)} (${jsChange >= 0 ? '+' : ''}${jsChange}%) ${jsChange > THRESHOLD ? '⚠️' : jsChange > 0 ? '📈' : '✅'}`
      );
      console.log(
        `CSS:            ${formatBytes(comparison.css.current)} (${cssChange >= 0 ? '+' : ''}${cssChange}%) ${cssChange > THRESHOLD ? '⚠️' : cssChange > 0 ? '📈' : '✅'}`
      );

      if (totalChange > THRESHOLD || jsChange > THRESHOLD || cssChange > THRESHOLD) {
        console.log('\n⚠️  Bundle size increased significantly!');
        report.warning = true;
      }
    }
  } else {
    // Save initial report
    compareWithHistory(report);
  }

  // Save report
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);

  if (report.warning) {
    process.exit(1);
  }
}

runMonitor();
