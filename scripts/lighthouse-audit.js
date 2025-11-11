#!/usr/bin/env node
/**
 * Lighthouse Audit Script
 * Runs Lighthouse audits and generates reports
 *
 * Usage: node scripts/lighthouse-audit.js [url] [--device=desktop|mobile] [--output=report.html]
 * Example: node scripts/lighthouse-audit.js http://localhost:4173 --device=mobile
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_URL = 'http://localhost:4173';
const DEFAULT_DEVICE = 'desktop';
const DEFAULT_OUTPUT = 'reports/lighthouse-report.html';

// Parse command line arguments
const args = process.argv.slice(2);
const url = args[0] || DEFAULT_URL;
const deviceArg = args.find(arg => arg.startsWith('--device='));
const outputArg = args.find(arg => arg.startsWith('--output='));

const device = deviceArg ? deviceArg.split('=')[1] : DEFAULT_DEVICE;
const outputPath = outputArg ? outputArg.split('=')[1] : DEFAULT_OUTPUT;

// Ensure reports directory exists
const reportsDir = path.dirname(outputPath);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🔍 Lighthouse Audit');
console.log('==================\n');
console.log(`URL: ${url}`);
console.log(`Device: ${device}`);
console.log(`Output: ${outputPath}\n`);

// Check if lighthouse is available
function checkLighthouse() {
  try {
    execSync('lighthouse --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Check if lighthouse CLI is installed globally or via npx
function runLighthouse() {
  const lighthouseCmd = checkLighthouse() ? 'lighthouse' : 'npx lighthouse';

  const cmd = [
    lighthouseCmd,
    url,
    `--output=html`,
    `--output-path=${outputPath}`,
    `--preset=${device}`,
    '--quiet',
    '--chrome-flags=--headless --no-sandbox',
    '--only-categories=performance,accessibility,best-practices,seo',
  ].join(' ');

  try {
    console.log('⏳ Running Lighthouse audit...\n');
    execSync(cmd, { stdio: 'inherit' });

    // Also generate JSON for programmatic access
    const jsonPath = outputPath.replace('.html', '.json');
    const jsonCmd = cmd
      .replace(`--output=html`, '--output=json')
      .replace(`--output-path=${outputPath}`, `--output-path=${jsonPath}`);
    execSync(jsonCmd, { stdio: 'ignore' });

    // Parse and display scores
    if (fs.existsSync(jsonPath)) {
      const report = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      const scores = {
        performance: Math.round((report.categories?.performance?.score || 0) * 100),
        accessibility: Math.round((report.categories?.accessibility?.score || 0) * 100),
        'best-practices': Math.round((report.categories?.['best-practices']?.score || 0) * 100),
        seo: Math.round((report.categories?.seo?.score || 0) * 100),
      };

      console.log('\n📊 Lighthouse Scores');
      console.log('====================');
      console.log(
        `Performance:     ${scores.performance}/100 ${scores.performance >= 90 ? '✅' : scores.performance >= 75 ? '⚠️' : '❌'}`
      );
      console.log(
        `Accessibility:    ${scores.accessibility}/100 ${scores.accessibility >= 90 ? '✅' : scores.accessibility >= 75 ? '⚠️' : '❌'}`
      );
      console.log(
        `Best Practices:   ${scores['best-practices']}/100 ${scores['best-practices'] >= 90 ? '✅' : scores['best-practices'] >= 75 ? '⚠️' : '❌'}`
      );
      console.log(
        `SEO:              ${scores.seo}/100 ${scores.seo >= 90 ? '✅' : scores.seo >= 75 ? '⚠️' : '❌'}`
      );

      // Extract key metrics
      const audits = report.audits || {};
      const metrics = {
        fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
        lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
        tti: audits['interactive']?.displayValue || 'N/A',
        cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
        tbt: audits['total-blocking-time']?.displayValue || 'N/A',
      };

      console.log('\n📈 Core Web Vitals');
      console.log('==================');
      console.log(`First Contentful Paint:    ${metrics.fcp}`);
      console.log(`Largest Contentful Paint: ${metrics.lcp}`);
      console.log(`Time to Interactive:      ${metrics.tti}`);
      console.log(`Cumulative Layout Shift:  ${metrics.cls}`);
      console.log(`Total Blocking Time:      ${metrics.tbt}`);

      console.log(`\n✅ Full report saved to: ${outputPath}`);
      console.log(`📄 JSON report saved to: ${jsonPath}`);
    }
  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error.message);
    console.log('\n💡 Tip: Install Lighthouse globally or use npx:');
    console.log('   npm install -g lighthouse');
    console.log('   or');
    console.log('   npm install --save-dev lighthouse');
    process.exit(1);
  }
}

// Run audit
runLighthouse();
