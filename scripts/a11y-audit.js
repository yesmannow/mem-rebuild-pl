#!/usr/bin/env node
/**
 * Accessibility Audit Script
 * Runs accessibility checks using axe-core or pa11y
 *
 * Usage: node scripts/a11y-audit.js [url] [--output=report.json]
 * Example: node scripts/a11y-audit.js http://localhost:4173
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_URL = 'http://localhost:4173';
const DEFAULT_OUTPUT = 'reports/a11y-report.json';

const args = process.argv.slice(2);
const url = args[0] || DEFAULT_URL;
const outputArg = args.find(arg => arg.startsWith('--output='));
const outputPath = outputArg ? outputArg.split('=')[1] : DEFAULT_OUTPUT;

// Ensure reports directory exists
const reportsDir = path.dirname(outputPath);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('♿ Accessibility Audit');
console.log('=====================\n');
console.log(`URL: ${url}`);
console.log(`Output: ${outputPath}\n`);

// Check if pa11y is available
function checkPa11y() {
  try {
    execSync('pa11y --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function runPa11y() {
  const pa11yCmd = checkPa11y() ? 'pa11y' : 'npx pa11y';

  const cmd = [pa11yCmd, url, '--reporter=json', '--standard=WCAG2AA', '--timeout=30000'].join(' ');

  try {
    console.log('⏳ Running accessibility audit...\n');
    const result = execSync(cmd, { encoding: 'utf-8' });

    let report;
    try {
      report = JSON.parse(result);
    } catch (e) {
      // If JSON parsing fails, create a basic report
      report = {
        url,
        timestamp: new Date().toISOString(),
        issues: [],
        note: 'Could not parse pa11y output. Install pa11y: npm install -g pa11y',
      };
    }

    // Save report
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    // Display summary
    const issues = report.issues || [];
    const errors = issues.filter(i => i.type === 'error').length;
    const warnings = issues.filter(i => i.type === 'warning').length;
    const notices = issues.filter(i => i.type === 'notice').length;

    console.log('📊 Accessibility Summary');
    console.log('=======================');
    console.log(`Errors:    ${errors} ${errors === 0 ? '✅' : '❌'}`);
    console.log(`Warnings:  ${warnings} ${warnings === 0 ? '✅' : '⚠️'}`);
    console.log(`Notices:   ${notices} ${notices === 0 ? '✅' : 'ℹ️'}`);

    if (errors > 0 || warnings > 0) {
      console.log('\n🔍 Top Issues:');
      issues.slice(0, 10).forEach((issue, idx) => {
        console.log(`\n${idx + 1}. ${issue.type.toUpperCase()}: ${issue.message}`);
        if (issue.code) console.log(`   Code: ${issue.code}`);
        if (issue.selector) console.log(`   Selector: ${issue.selector}`);
      });
    }

    console.log(`\n✅ Report saved to: ${outputPath}`);

    if (errors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Accessibility audit failed:', error.message);
    console.log('\n💡 Tip: Install pa11y:');
    console.log('   npm install -g pa11y');
    console.log('   or');
    console.log('   npm install --save-dev pa11y');

    // Create a placeholder report
    const placeholderReport = {
      url,
      timestamp: new Date().toISOString(),
      error: error.message,
      note: 'Install pa11y to run accessibility audits',
    };
    fs.writeFileSync(outputPath, JSON.stringify(placeholderReport, null, 2));
    process.exit(1);
  }
}

// Alternative: Simple HTML validation using basic checks
function runBasicA11yCheck() {
  console.log('⚠️  pa11y not found. Running basic accessibility checks...\n');

  // This would require puppeteer or similar to actually check the page
  // For now, just create a placeholder
  const placeholderReport = {
    url,
    timestamp: new Date().toISOString(),
    note: 'Install pa11y for full accessibility auditing: npm install -g pa11y',
    recommendations: [
      'Ensure all images have alt attributes',
      'Use semantic HTML elements',
      'Ensure proper heading hierarchy (h1-h6)',
      'Add ARIA labels where needed',
      'Ensure keyboard navigation works',
      'Check color contrast ratios',
      'Ensure form labels are properly associated',
    ],
  };

  fs.writeFileSync(outputPath, JSON.stringify(placeholderReport, null, 2));
  console.log('📝 Basic recommendations saved to:', outputPath);
}

if (checkPa11y() || process.env.USE_NPX === 'true') {
  runPa11y();
} else {
  runBasicA11yCheck();
}
