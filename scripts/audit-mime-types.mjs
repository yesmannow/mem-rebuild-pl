#!/usr/bin/env node
/**
 * MIME Type and Resource Loading Audit
 * Identifies and fixes MIME type mismatches and resource loading issues
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const issues = [];
const warnings = [];
const fixes = [];

console.log('🔍 MIME Type and Resource Loading Audit');
console.log('========================================\n');

// 1. Check HTML files for incorrect link/script tags
async function auditHTMLFiles() {
  console.log('📄 Auditing HTML files...\n');

  const htmlFiles = await glob(['**/*.html', '!node_modules/**', '!dist/**']);

  for (const file of htmlFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        const lineNum = index + 1;

        // Check for link tags with rel="stylesheet" pointing to JS files
        const stylesheetLinkMatch = line.match(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/i);
        if (stylesheetLinkMatch) {
          const href = stylesheetLinkMatch[1];
          if (href.match(/\.(js|mjs|ts|tsx)$/i)) {
            issues.push({
              file,
              line: lineNum,
              type: 'stylesheet-js',
              message: `Link tag with rel="stylesheet" points to JavaScript file: ${href}`,
              fix: `Change to valid CSS file or remove if incorrect`
            });
          }
        }

        // Check for script tags with incorrect MIME types
        const scriptMatch = line.match(/<script[^>]*src=["']([^"']+)["']/i);
        if (scriptMatch) {
          const src = scriptMatch[1];
          const typeAttr = line.match(/type=["']([^"']+)["']/i);
          const type = typeAttr ? typeAttr[1] : null;

          // Check if module script has correct type
          if (src.match(/\.(mjs|ts|tsx)$/i) && type !== 'module') {
            warnings.push({
              file,
              line: lineNum,
              type: 'module-type',
              message: `Module script ${src} should have type="module"`,
              fix: `Add type="module" to script tag`
            });
          }
        }

        // Check for preload/modulepreload pointing to source files (won't work in production)
        const preloadMatch = line.match(/<link[^>]*rel=["'](preload|modulepreload)["'][^>]*href=["']([^"']+)["']/i);
        if (preloadMatch) {
          const href = preloadMatch[2];
          if (href.startsWith('/src/') && !href.includes('node_modules')) {
            warnings.push({
              file,
              line: lineNum,
              type: 'preload-source',
              message: `Preload/modulepreload points to source file: ${href} (will not work in production)`,
              fix: `Remove or update to point to built asset path (Vite handles this automatically)`
            });
          }
        }
      });
    } catch (error) {
      console.warn(`⚠️  Could not read ${file}:`, error.message);
    }
  }
}

// 2. Check server configuration files
async function auditServerConfig() {
  console.log('⚙️  Auditing server configuration...\n');

  // Check Cloudflare Pages _headers
  const headersFile = 'public/_headers';
  try {
    const content = await fs.readFile(headersFile, 'utf8');

    // Check for correct MIME types
    if (content.includes('text/javascript') && !content.includes('application/javascript')) {
      warnings.push({
        file: headersFile,
        type: 'mime-type',
        message: 'Uses text/javascript instead of application/javascript (preferred for ES modules)',
        fix: 'Update to application/javascript for .js/.mjs/.ts/.tsx files'
      });
    }

    // Check if CSS MIME type is set
    if (!content.includes('text/css')) {
      issues.push({
        file: headersFile,
        type: 'missing-mime',
        message: 'CSS files may not have explicit Content-Type header',
        fix: 'Add Content-Type: text/css for .css files'
      });
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`⚠️  Could not read ${headersFile}:`, error.message);
    }
  }

  // Check Netlify config
  const netlifyFile = 'netlify.toml';
  try {
    const content = await fs.readFile(netlifyFile, 'utf8');

    if (content.includes('text/javascript')) {
      warnings.push({
        file: netlifyFile,
        type: 'mime-type',
        message: 'Uses text/javascript instead of application/javascript',
        fix: 'Update to application/javascript for ES modules'
      });
    }

    // Check if CSS Content-Type is missing
    const cssHeaderMatch = content.match(/for\s*=\s*["']\/\*\.css["']/);
    if (cssHeaderMatch) {
      const cssSection = content.substring(content.indexOf(cssHeaderMatch[0]));
      if (!cssSection.includes('Content-Type')) {
        issues.push({
          file: netlifyFile,
          type: 'missing-mime',
          message: 'CSS files missing Content-Type header',
          fix: 'Add Content-Type = "text/css" for CSS files'
        });
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`⚠️  Could not read ${netlifyFile}:`, error.message);
    }
  }
}

// 3. Check for duplicate custom element definitions
async function auditCustomElements() {
  console.log('🔧 Checking custom element definitions...\n');

  const jsFiles = await glob(['src/**/*.{ts,tsx,js,jsx}', '!node_modules/**', '!dist/**']);
  const customElementDefs = new Map();

  for (const file of jsFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');

      // Look for customElements.define calls
      const defineMatches = content.matchAll(/customElements\.define\s*\(\s*["']([^"']+)["']/g);
      for (const match of defineMatches) {
        const elementName = match[1];
        if (!customElementDefs.has(elementName)) {
          customElementDefs.set(elementName, []);
        }
        customElementDefs.get(elementName).push({
          file,
          line: content.substring(0, match.index).split('\n').length
        });
      }
    } catch (error) {
      // Skip files we can't read
    }
  }

  // Report duplicates
  for (const [elementName, locations] of customElementDefs.entries()) {
    if (locations.length > 1) {
      warnings.push({
        type: 'duplicate-element',
        message: `Custom element "${elementName}" defined ${locations.length} times`,
        locations: locations,
        fix: 'Use defineCustomElementIfNeeded utility or check before defining'
      });
    }
  }
}

// Generate report
async function generateReport() {
  console.log('\n📊 Audit Results');
  console.log('================\n');

  if (issues.length > 0) {
    console.log(`❌ Issues Found: ${issues.length}`);
    issues.forEach((issue, idx) => {
      console.log(`\n${idx + 1}. ${issue.type.toUpperCase()}`);
      console.log(`   File: ${issue.file || 'N/A'}`);
      if (issue.line) console.log(`   Line: ${issue.line}`);
      console.log(`   Message: ${issue.message}`);
      console.log(`   Fix: ${issue.fix}`);
    });
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  Warnings: ${warnings.length}`);
    warnings.forEach((warning, idx) => {
      console.log(`\n${idx + 1}. ${warning.type.toUpperCase()}`);
      console.log(`   File: ${warning.file || 'N/A'}`);
      if (warning.line) console.log(`   Line: ${warning.line}`);
      if (warning.locations) {
        console.log(`   Locations:`);
        warning.locations.forEach(loc => {
          console.log(`     - ${loc.file}:${loc.line}`);
        });
      }
      console.log(`   Message: ${warning.message}`);
      console.log(`   Fix: ${warning.fix}`);
    });
  }

  if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ No issues found!');
  }

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    issues,
    warnings,
    summary: {
      totalIssues: issues.length,
      totalWarnings: warnings.length
    }
  };

  await fs.writeFile(
    'reports/mime-audit-report.json',
    JSON.stringify(report, null, 2)
  );

  console.log('\n📄 Report saved to: reports/mime-audit-report.json');

  if (issues.length > 0) {
    process.exit(1);
  }
}

// Run audit
async function runAudit() {
  await auditHTMLFiles();
  await auditServerConfig();
  await auditCustomElements();
  await generateReport();
}

runAudit().catch(console.error);

