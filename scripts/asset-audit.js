#!/usr/bin/env node
/**
 * Unified Asset Audit Script
 * Runs all detection scripts and generates comprehensive report
 *
 * Usage: node scripts/asset-audit.js [--skip-duplicates] [--skip-unused] [--skip-moodboards] [--skip-svgs] [--skip-animations]
 * Example: node scripts/asset-audit.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = 'reports/asset-audit-report.json';
const HTML_OUTPUT_PATH = 'reports/asset-audit-report.html';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const RUN_DUPLICATES = !process.argv.includes('--skip-duplicates');
const RUN_UNUSED = !process.argv.includes('--skip-unused');
const RUN_MOODBOARDS = !process.argv.includes('--skip-moodboards');
const RUN_SVGS = !process.argv.includes('--skip-svgs');
const RUN_ANIMATIONS = !process.argv.includes('--skip-animations');

console.log('🔍 Unified Asset Audit');
console.log('======================\n');

const results = {
  duplicates: null,
  unusedAssets: null,
  moodboardDuplicates: null,
  svgDuplicates: null,
  unusedAnimations: null,
};

// Run a script and return its output
function runScript(scriptPath, description) {
  try {
    console.log(`Running: ${description}...`);
    execSync(`node ${scriptPath}`, { stdio: 'inherit' });

    // Try to read the report file
    const reportPath = scriptPath.replace('scripts/', 'reports/').replace('.js', '-report.json');
    if (fs.existsSync(reportPath)) {
      const content = fs.readFileSync(reportPath, 'utf-8');
      return JSON.parse(content);
    }
    return null;
  } catch (error) {
    console.warn(`⚠️  Error running ${scriptPath}: ${error.message}`);
    return null;
  }
}

// Run all detection scripts
function runAllDetectors() {
  console.log('Starting comprehensive asset audit...\n');

  if (RUN_DUPLICATES) {
    results.duplicates = runScript('scripts/find-duplicates.js', 'Duplicate Detection');
  }

  if (RUN_UNUSED) {
    results.unusedAssets = runScript('scripts/find-unused-assets.js', 'Unused Assets Detection');
  }

  if (RUN_MOODBOARDS) {
    results.moodboardDuplicates = runScript('scripts/find-moodboard-duplicates.js', 'Moodboard Duplicate Detection');
  }

  if (RUN_SVGS) {
    results.svgDuplicates = runScript('scripts/find-svg-duplicates.js', 'SVG Duplicate Detection');
  }

  if (RUN_ANIMATIONS) {
    results.unusedAnimations = runScript('scripts/find-unused-animations.js', 'Unused Animations Detection');
  }

  console.log('\n✅ All detectors completed\n');
}

// Generate comprehensive summary
function generateSummary() {
  const summary = {
    timestamp: new Date().toISOString(),
    summary: {
      contentDuplicates: results.duplicates?.summary?.contentDuplicates || 0,
      nameDuplicates: results.duplicates?.summary?.nameDuplicates || 0,
      similarNames: results.duplicates?.summary?.similarNames || 0,
      unusedImages: results.unusedAssets?.summary?.unusedImages || 0,
      unusedComponents: results.unusedAssets?.summary?.unusedComponents || 0,
      unusedAnimations: results.unusedAnimations?.summary?.unusedAnimations || 0,
      moodboardDuplicates: results.moodboardDuplicates?.summary?.duplicates || 0,
      svgExactDuplicates: results.svgDuplicates?.summary?.exactDuplicates || 0,
      svgNormalizedDuplicates: results.svgDuplicates?.summary?.normalizedDuplicates || 0,
      totalWastedSpace: 0,
      totalUnusedSize: 0,
    },
    recommendations: [],
    severity: 'low',
  };

  // Calculate wasted space
  if (results.duplicates?.summary?.totalWastedSpace) {
    summary.summary.totalWastedSpace += results.duplicates.summary.totalWastedSpace;
  }
  if (results.svgDuplicates?.summary?.totalWastedSpace) {
    summary.summary.totalWastedSpace += results.svgDuplicates.summary.totalWastedSpace;
  }
  if (results.unusedAssets?.summary?.totalUnusedSize) {
    summary.summary.totalUnusedSize += results.unusedAssets.summary.totalUnusedSize;
  }

  // Generate recommendations
  if (summary.summary.contentDuplicates > 0) {
    summary.recommendations.push({
      type: 'duplicate',
      priority: 'high',
      message: `Found ${summary.summary.contentDuplicates} content-based duplicate groups. Consider removing duplicates to save space.`,
      action: 'Run cleanup-duplicates.js to remove duplicates',
    });
    summary.severity = 'high';
  }

  if (summary.summary.moodboardDuplicates > 0) {
    summary.recommendations.push({
      type: 'moodboard',
      priority: 'medium',
      message: `Found ${summary.summary.moodboardDuplicates} duplicate moodboard files. Review and consolidate.`,
      action: 'Review moodboard-duplicates-report.json and remove duplicates',
    });
    if (summary.severity === 'low') summary.severity = 'medium';
  }

  if (summary.summary.svgExactDuplicates > 0) {
    summary.recommendations.push({
      type: 'svg',
      priority: 'medium',
      message: `Found ${summary.summary.svgExactDuplicates} exact SVG duplicates in case-study folders.`,
      action: 'Review svg-duplicates-report.json and remove duplicates',
    });
    if (summary.severity === 'low') summary.severity = 'medium';
  }

  if (summary.summary.unusedImages > 10) {
    summary.recommendations.push({
      type: 'unused',
      priority: 'low',
      message: `Found ${summary.summary.unusedImages} unused images. Consider removing to reduce bundle size.`,
      action: 'Review unused-assets-report.json and remove unused images',
    });
  }

  if (summary.summary.unusedAnimations > 0) {
    summary.recommendations.push({
      type: 'animation',
      priority: 'low',
      message: `Found ${summary.summary.unusedAnimations} unused animation components.`,
      action: 'Review unused-animations-report.json and consider removing or using them',
    });
  }

  return summary;
}

// Generate HTML report
function generateHTMLReport(report) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Asset Audit Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 10px;
    }
    .timestamp {
      color: #7f8c8d;
      margin-bottom: 30px;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .summary-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 6px;
      border-left: 4px solid #3498db;
    }
    .summary-card.high { border-left-color: #e74c3c; }
    .summary-card.medium { border-left-color: #f39c12; }
    .summary-card.low { border-left-color: #27ae60; }
    .summary-card h3 {
      font-size: 14px;
      color: #7f8c8d;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .summary-card .value {
      font-size: 32px;
      font-weight: bold;
      color: #2c3e50;
    }
    .recommendations {
      margin-top: 30px;
    }
    .recommendation {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 4px;
    }
    .recommendation.high { background: #f8d7da; border-left-color: #dc3545; }
    .recommendation.medium { background: #fff3cd; border-left-color: #ffc107; }
    .recommendation.low { background: #d1ecf1; border-left-color: #17a2b8; }
    .recommendation h4 {
      margin-bottom: 5px;
      color: #2c3e50;
    }
    .recommendation p {
      color: #555;
      margin-bottom: 5px;
    }
    .recommendation .action {
      font-weight: bold;
      color: #007bff;
      margin-top: 5px;
    }
    .section {
      margin-top: 30px;
    }
    .section h2 {
      color: #2c3e50;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #ecf0f1;
    }
    .badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      margin-left: 10px;
    }
    .badge.success { background: #27ae60; color: white; }
    .badge.warning { background: #f39c12; color: white; }
    .badge.danger { background: #e74c3c; color: white; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 Asset Audit Report</h1>
    <div class="timestamp">Generated: ${new Date(report.timestamp).toLocaleString()}</div>

    <div class="summary">
      <div class="summary-card ${report.severity}">
        <h3>Content Duplicates</h3>
        <div class="value">${report.summary.contentDuplicates}</div>
      </div>
      <div class="summary-card ${report.summary.unusedImages > 10 ? 'medium' : 'low'}">
        <h3>Unused Images</h3>
        <div class="value">${report.summary.unusedImages}</div>
      </div>
      <div class="summary-card ${report.summary.unusedAnimations > 0 ? 'medium' : 'low'}">
        <h3>Unused Animations</h3>
        <div class="value">${report.summary.unusedAnimations}</div>
      </div>
      <div class="summary-card ${report.summary.moodboardDuplicates > 0 ? 'medium' : 'low'}">
        <h3>Moodboard Duplicates</h3>
        <div class="value">${report.summary.moodboardDuplicates}</div>
      </div>
      <div class="summary-card ${report.summary.svgExactDuplicates > 0 ? 'medium' : 'low'}">
        <h3>SVG Duplicates</h3>
        <div class="value">${report.summary.svgExactDuplicates}</div>
      </div>
      <div class="summary-card">
        <h3>Wasted Space</h3>
        <div class="value">${(report.summary.totalWastedSpace / 1024 / 1024).toFixed(2)} MB</div>
      </div>
    </div>

    ${report.recommendations.length > 0 ? `
    <div class="recommendations">
      <h2>Recommendations</h2>
      ${report.recommendations.map(rec => `
        <div class="recommendation ${rec.priority}">
          <h4>${rec.type.toUpperCase()} <span class="badge ${rec.priority}">${rec.priority}</span></h4>
          <p>${rec.message}</p>
          <div class="action">Action: ${rec.action}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <div class="section">
      <h2>Detailed Reports</h2>
      <p>The following detailed reports are available:</p>
      <ul>
        <li><a href="duplicates-report.json">duplicates-report.json</a></li>
        <li><a href="unused-assets-report.json">unused-assets-report.json</a></li>
        <li><a href="moodboard-duplicates-report.json">moodboard-duplicates-report.json</a></li>
        <li><a href="svg-duplicates-report.json">svg-duplicates-report.json</a></li>
        <li><a href="unused-animations-report.json">unused-animations-report.json</a></li>
      </ul>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(HTML_OUTPUT_PATH, html);
}

// Generate JSON report
function generateJSONReport() {
  const summary = generateSummary();

  const report = {
    ...summary,
    details: {
      duplicates: results.duplicates,
      unusedAssets: results.unusedAssets,
      moodboardDuplicates: results.moodboardDuplicates,
      svgDuplicates: results.svgDuplicates,
      unusedAnimations: results.unusedAnimations,
    },
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));
  generateHTMLReport(summary);

  console.log('\n📊 Asset Audit Summary');
  console.log('=====================');
  console.log(`Content Duplicates:    ${report.summary.contentDuplicates} ${report.summary.contentDuplicates === 0 ? '✅' : '⚠️'}`);
  console.log(`Name Duplicates:       ${report.summary.nameDuplicates} ${report.summary.nameDuplicates === 0 ? '✅' : '⚠️'}`);
  console.log(`Unused Images:         ${report.summary.unusedImages} ${report.summary.unusedImages === 0 ? '✅' : '⚠️'}`);
  console.log(`Unused Components:     ${report.summary.unusedComponents} ${report.summary.unusedComponents === 0 ? '✅' : '⚠️'}`);
  console.log(`Unused Animations:      ${report.summary.unusedAnimations} ${report.summary.unusedAnimations === 0 ? '✅' : '⚠️'}`);
  console.log(`Moodboard Duplicates:  ${report.summary.moodboardDuplicates} ${report.summary.moodboardDuplicates === 0 ? '✅' : '⚠️'}`);
  console.log(`SVG Duplicates:         ${report.summary.svgExactDuplicates} ${report.summary.svgExactDuplicates === 0 ? '✅' : '⚠️'}`);

  const wastedMB = (report.summary.totalWastedSpace / 1024 / 1024).toFixed(2);
  const unusedMB = (report.summary.totalUnusedSize / 1024 / 1024).toFixed(2);

  if (report.summary.totalWastedSpace > 0) {
    console.log(`\nWasted Space: ${wastedMB} MB`);
  }
  if (report.summary.totalUnusedSize > 0) {
    console.log(`Unused Size: ${unusedMB} MB`);
  }

  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach((rec, i) => {
      console.log(`\n${i + 1}. [${rec.priority.toUpperCase()}] ${rec.message}`);
      console.log(`   Action: ${rec.action}`);
    });
  }

  console.log(`\n✅ JSON Report saved to: ${OUTPUT_PATH}`);
  console.log(`✅ HTML Report saved to: ${HTML_OUTPUT_PATH}`);
  console.log(`\nSeverity: ${report.severity.toUpperCase()}`);
}

// Main execution
runAllDetectors();
generateJSONReport();

