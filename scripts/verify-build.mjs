#!/usr/bin/env node
/**
 * Post-build verification script
 * Verifies that build output has correct structure and files for Cloudflare Pages
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '..', 'dist');
const errors = [];
const warnings = [];

console.log('🔍 Post-build verification');
console.log('==========================\n');

async function verifyHeadersFile() {
  console.log('📋 Checking _headers file...');
  const headersPath = path.join(distDir, '_headers');
  try {
    const content = await fs.readFile(headersPath, 'utf8');

    // Check for CSS MIME type
    if (!content.includes('text/css')) {
      errors.push('_headers file missing text/css Content-Type for CSS files');
    }

    // Check for JS MIME type
    if (!content.includes('application/javascript')) {
      errors.push('_headers file missing application/javascript Content-Type for JS files');
    }

    // Check that CSS rules come before JS rules
    const cssIndex = content.indexOf('/assets/*.css');
    const jsIndex = content.indexOf('/assets/*.js');
    if (cssIndex === -1 || jsIndex === -1 || cssIndex > jsIndex) {
      warnings.push('CSS rules should come before JS rules in _headers file');
    }

    console.log('✅ _headers file found and validated\n');
  } catch (error) {
    if (error.code === 'ENOENT') {
      errors.push('_headers file not found in dist/ - Cloudflare Pages needs this for MIME types');
    } else {
      errors.push(`Error reading _headers: ${error.message}`);
    }
  }
}

async function verifyRedirectsFile() {
  console.log('🔄 Checking _redirects file...');
  const redirectsPath = path.join(distDir, '_redirects');
  try {
    const content = await fs.readFile(redirectsPath, 'utf8');

    // Check for SPA fallback
    if (!content.includes('/*') || !content.includes('/index.html') || !content.includes('200')) {
      warnings.push('_redirects file may not have correct SPA fallback format');
    }

    console.log('✅ _redirects file found and validated\n');
  } catch (error) {
    if (error.code === 'ENOENT') {
      warnings.push('_redirects file not found in dist/ - SPA routing may not work');
    } else {
      warnings.push(`Error reading _redirects: ${error.message}`);
    }
  }
}

async function verifyAssets() {
  console.log('📦 Checking asset files...');

  try {
    const assetsDir = path.join(distDir, 'assets');
    const files = await fs.readdir(assetsDir);

    // Check for CSS files
    const cssFiles = files.filter(f => f.endsWith('.css'));
    if (cssFiles.length === 0) {
      warnings.push('No CSS files found in dist/assets/ - styles may not be extracted');
    } else {
      console.log(`   Found ${cssFiles.length} CSS file(s)`);
    }

    // Check for JS files
    const jsFiles = files.filter(f => f.endsWith('.js'));
    if (jsFiles.length === 0) {
      errors.push('No JS files found in dist/assets/ - build may have failed');
    } else {
      console.log(`   Found ${jsFiles.length} JS file(s)`);

      // Verify JS files don't have incorrect extensions
      const mjsFiles = files.filter(f => f.endsWith('.mjs'));
      if (mjsFiles.length > 0) {
        warnings.push(`Found ${mjsFiles.length} .mjs file(s) - ensure _headers handles these`);
      }
    }

    // Check for files with incorrect extensions
    const suspiciousFiles = files.filter(f => {
      const ext = path.extname(f);
      return ext && !['.js', '.css', '.json', '.map'].includes(ext) &&
             !f.match(/\.(png|jpg|jpeg|svg|webp|woff|woff2|ttf|eot)$/i);
    });
    if (suspiciousFiles.length > 0) {
      warnings.push(`Found ${suspiciousFiles.length} file(s) with unexpected extensions: ${suspiciousFiles.slice(0, 3).join(', ')}`);
    }

    console.log('✅ Assets directory validated\n');
  } catch (error) {
    if (error.code === 'ENOENT') {
      errors.push('dist/assets/ directory not found - build may have failed');
    } else {
      errors.push(`Error reading assets directory: ${error.message}`);
    }
  }
}

async function verifyIndexHtml() {
  console.log('📄 Checking index.html...');
  const indexPath = path.join(distDir, 'index.html');
  try {
    const content = await fs.readFile(indexPath, 'utf8');

    // Check for module script tags
    if (!content.includes('type="module"')) {
      warnings.push('index.html may not have module script tags');
    }

    // Check for CSS link tags
    if (!content.includes('rel="stylesheet"') && !content.includes('<style')) {
      warnings.push('index.html may not have CSS links or inline styles');
    }

    console.log('✅ index.html found\n');
  } catch (error) {
    if (error.code === 'ENOENT') {
      errors.push('index.html not found in dist/ - build may have failed');
    } else {
      errors.push(`Error reading index.html: ${error.message}`);
    }
  }
}

async function runVerification() {
  // Check if dist directory exists
  try {
    await fs.access(distDir);
  } catch (error) {
    console.error('❌ dist/ directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  await verifyHeadersFile();
  await verifyRedirectsFile();
  await verifyAssets();
  await verifyIndexHtml();

  // Report results
  console.log('\n📊 Verification Results');
  console.log('=======================\n');

  if (errors.length > 0) {
    console.error(`❌ Errors: ${errors.length}`);
    errors.forEach((error, idx) => {
      console.error(`   ${idx + 1}. ${error}`);
    });
    console.error('');
  }

  if (warnings.length > 0) {
    console.warn(`⚠️  Warnings: ${warnings.length}`);
    warnings.forEach((warning, idx) => {
      console.warn(`   ${idx + 1}. ${warning}`);
    });
    console.warn('');
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All checks passed! Build is ready for Cloudflare Pages deployment.\n');
  }

  if (errors.length > 0) {
    process.exit(1);
  }
}

runVerification().catch(error => {
  console.error('❌ Verification failed:', error);
  process.exit(1);
});

