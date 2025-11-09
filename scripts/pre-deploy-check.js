#!/usr/bin/env node
/**
 * Pre-Deployment Checklist Script
 * Runs all validation checks before deployment
 *
 * Usage: node scripts/pre-deploy-check.js [--skip-build] [--url=http://localhost:4173]
 * Example: node scripts/pre-deploy-check.js --url=https://www.bearcavemarketing.com
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKIP_BUILD = process.argv.includes('--skip-build');
const BASE_URL =
  process.argv.find(arg => arg.startsWith('--url='))?.split('=')[1] || 'http://localhost:4173';
const OUTPUT_PATH = 'reports/pre-deploy-report.json';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🚀 Pre-Deployment Checklist');
console.log('===========================\n');

const checks = [];
let hasErrors = false;

// Run a check
function runCheck(name, command, options = {}) {
  return new Promise(resolve => {
    console.log(`⏳ ${name}...`);

    try {
      const result = execSync(command, {
        encoding: 'utf-8',
        stdio: options.silent ? 'pipe' : 'inherit',
      });

      checks.push({
        name,
        status: 'passed',
        command,
      });

      console.log(`✅ ${name}\n`);
      resolve(true);
    } catch (error) {
      const errorMsg = error.stdout || error.stderr || error.message;
      checks.push({
        name,
        status: 'failed',
        command,
        error: errorMsg.substring(0, 200),
      });

      console.log(`❌ ${name}\n`);
      if (!options.continueOnError) {
        hasErrors = true;
      }
      resolve(false);
    }
  });
}

// Run async check (for scripts that take time)
async function runAsyncCheck(name, scriptPath, args = []) {
  return new Promise(resolve => {
    console.log(`⏳ ${name}...`);

    try {
      const command = `node ${scriptPath} ${args.join(' ')}`;
      execSync(command, {
        encoding: 'utf-8',
        stdio: 'inherit',
      });

      checks.push({
        name,
        status: 'passed',
        command,
      });

      console.log(`✅ ${name}\n`);
      resolve(true);
    } catch (error) {
      checks.push({
        name,
        status: 'failed',
        error: error.message,
      });

      console.log(`❌ ${name}\n`);
      resolve(false);
    }
  });
}

// Main checklist
async function runChecklist() {
  console.log(`Base URL: ${BASE_URL}\n`);

  // 1. Type checking
  await runCheck('TypeScript Type Check', 'npm run typecheck', { continueOnError: false });

  // 2. Build
  if (!SKIP_BUILD) {
    await runCheck('Production Build', 'npm run build', { continueOnError: false });
  } else {
    console.log('⏭️  Skipping build (--skip-build flag)\n');
    checks.push({ name: 'Production Build', status: 'skipped' });
  }

  // 3. Bundle size check
  if (!SKIP_BUILD) {
    await runAsyncCheck('Bundle Size Check', 'scripts/monitor-bundle-size.js', ['--compare']);
  }

  // 4. Link validation
  if (!SKIP_BUILD) {
    await runAsyncCheck('Link Validation', 'scripts/check-links.js', [`--base-url=${BASE_URL}`]);
  }

  // 5. Image validation
  await runAsyncCheck('Image Validation', 'scripts/check-images.js', ['--check-src']);

  // 6. SEO validation
  if (!SKIP_BUILD) {
    await runAsyncCheck('SEO Validation', 'scripts/validate-seo.js', [`--url=${BASE_URL}`]);
  }

  // 7. Content validation
  await runAsyncCheck('Content Validation', 'scripts/validate-content.js', ['--check-spelling']);

  // 8. Route validation
  if (!SKIP_BUILD) {
    await runAsyncCheck('Route Validation', 'scripts/validate-routes.js', [
      `--base-url=${BASE_URL}`,
    ]);
  }

  // 9. Check for console.logs in production
  if (!SKIP_BUILD) {
    const distDir = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distDir)) {
      console.log('⏳ Checking for console.logs in production build...');
      let hasConsoleLogs = false;

      function checkFiles(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory()) {
            checkFiles(filePath);
          } else if (file.endsWith('.js')) {
            const content = fs.readFileSync(filePath, 'utf-8');
            if (content.includes('console.log') || content.includes('console.warn')) {
              hasConsoleLogs = true;
            }
          }
        });
      }

      checkFiles(distDir);

      if (hasConsoleLogs) {
        checks.push({
          name: 'Console.log Check',
          status: 'warning',
          message: 'Found console.log statements in production build',
        });
        console.log('⚠️  Console.log Check: Found console statements\n');
      } else {
        checks.push({
          name: 'Console.log Check',
          status: 'passed',
        });
        console.log('✅ Console.log Check\n');
      }
    }
  }

  // 10. Environment variables check
  console.log('⏳ Checking environment variables...');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envPath = path.join(process.cwd(), '.env');

  if (fs.existsSync(envExamplePath) && !fs.existsSync(envPath)) {
    checks.push({
      name: 'Environment Variables',
      status: 'warning',
      message: '.env file not found (may be intentional)',
    });
    console.log('⚠️  Environment Variables: .env file not found\n');
  } else {
    checks.push({
      name: 'Environment Variables',
      status: 'passed',
    });
    console.log('✅ Environment Variables\n');
  }

  // Generate report
  const passed = checks.filter(c => c.status === 'passed').length;
  const failed = checks.filter(c => c.status === 'failed').length;
  const warnings = checks.filter(c => c.status === 'warning').length;
  const skipped = checks.filter(c => c.status === 'skipped').length;

  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary: {
      total: checks.length,
      passed,
      failed,
      warnings,
      skipped,
    },
    checks,
    deploymentReady: failed === 0 && !hasErrors,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  // Display summary
  console.log('📊 Pre-Deployment Summary');
  console.log('========================');
  console.log(`Total Checks:    ${report.summary.total}`);
  console.log(`Passed:          ${report.summary.passed} ✅`);
  console.log(
    `Failed:          ${report.summary.failed} ${report.summary.failed === 0 ? '✅' : '❌'}`
  );
  console.log(
    `Warnings:        ${report.summary.warnings} ${report.summary.warnings === 0 ? '✅' : '⚠️'}`
  );
  console.log(`Skipped:         ${report.summary.skipped}`);

  if (report.deploymentReady) {
    console.log('\n✅ Deployment Ready!');
  } else {
    console.log('\n❌ Deployment Not Ready - Please fix the issues above');

    if (failed > 0) {
      console.log('\nFailed Checks:');
      checks
        .filter(c => c.status === 'failed')
        .forEach(check => {
          console.log(`   - ${check.name}`);
          if (check.error) {
            console.log(`     Error: ${check.error.substring(0, 100)}...`);
          }
        });
    }
  }

  console.log(`\n✅ Full report saved to: ${OUTPUT_PATH}`);

  if (!report.deploymentReady) {
    process.exit(1);
  }
}

runChecklist().catch(error => {
  console.error('❌ Pre-deployment check failed:', error);
  process.exit(1);
});
