#!/usr/bin/env node

/**
 * Cloudflare Configuration Verification Script
 * 
 * This script verifies that the repository is correctly configured for Cloudflare Pages
 * deployment and helps diagnose custom domain issues.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const fullPath = path.join(projectRoot, filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const stats = fs.statSync(fullPath);
    log(`✅ ${description}`, 'green');
    log(`   Path: ${filePath}`, 'cyan');
    log(`   Size: ${stats.size} bytes`, 'cyan');
    return { exists: true, path: fullPath };
  } else {
    log(`❌ ${description} - FILE MISSING`, 'red');
    log(`   Expected at: ${filePath}`, 'red');
    return { exists: false, path: fullPath };
  }
}

function checkFileContent(filePath, description, requiredPatterns = []) {
  const result = checkFile(filePath, description);
  
  if (result.exists) {
    const content = fs.readFileSync(result.path, 'utf8');
    const missingPatterns = [];
    
    for (const pattern of requiredPatterns) {
      if (!content.includes(pattern)) {
        missingPatterns.push(pattern);
      }
    }
    
    if (missingPatterns.length > 0) {
      log(`⚠️  Missing required content:`, 'yellow');
      missingPatterns.forEach(p => log(`   - ${p}`, 'yellow'));
      return false;
    } else {
      log(`   Content verified ✓`, 'green');
      return true;
    }
  }
  
  return false;
}

function checkViteConfig() {
  log('\n📦 Checking Vite Configuration...', 'blue');
  
  const result = checkFile('vite.config.js', 'Vite configuration file');
  
  if (result.exists) {
    const content = fs.readFileSync(result.path, 'utf8');
    
    // Check base path configuration
    if (content.includes("base: process.env.GITHUB_PAGES")) {
      log(`✅ Base path configured for flexible deployment`, 'green');
      log(`   - GitHub Pages: /mem-rebuild-pl/`, 'cyan');
      log(`   - Custom domain: /`, 'cyan');
    } else {
      log(`⚠️  Base path may not be flexible`, 'yellow');
    }
    
    // Check build output directory
    if (content.includes("outDir: 'dist'")) {
      log(`✅ Output directory configured as 'dist'`, 'green');
    } else {
      log(`⚠️  Output directory not set to 'dist'`, 'yellow');
    }
  }
}

function checkCloudflareFiles() {
  log('\n☁️  Checking Cloudflare Pages Configuration...', 'blue');
  
  // Check _headers file
  const hasValidHeaders = checkFileContent(
    'public/_headers',
    'Cloudflare _headers file',
    [
      '/*.js',
      'Content-Type: application/javascript',
      '/*.css',
      'Content-Type: text/css'
    ]
  );
  
  // Check _redirects file
  const hasValidRedirects = checkFileContent(
    'public/_redirects',
    'Cloudflare _redirects file',
    ['/*', '/index.html', '200']
  );
  
  if (hasValidHeaders && hasValidRedirects) {
    log(`\n✅ Cloudflare Pages files are correctly configured`, 'green');
  } else {
    log(`\n⚠️  Some Cloudflare Pages files need attention`, 'yellow');
  }
}

function checkBuildFiles() {
  log('\n🏗️  Checking Build Configuration...', 'blue');
  
  checkFile('package.json', 'Package configuration');
  checkFile('index.html', 'Entry HTML file');
  checkFile('tsconfig.json', 'TypeScript configuration');
  
  // Check if dist exists (previous build)
  const distPath = path.join(projectRoot, 'dist');
  if (fs.existsSync(distPath)) {
    const stats = fs.statSync(distPath);
    if (stats.isDirectory()) {
      const files = fs.readdirSync(distPath);
      log(`✅ Build output exists (dist/)`, 'green');
      log(`   Files: ${files.length}`, 'cyan');
      
      // Check for critical files
      if (files.includes('index.html')) {
        log(`   ✓ index.html present`, 'green');
      }
      if (files.some(f => f.startsWith('assets'))) {
        log(`   ✓ assets directory present`, 'green');
      }
    }
  } else {
    log(`⚠️  No build output found (run 'npm run build')`, 'yellow');
  }
}

function provideDiagnosticInfo() {
  log('\n🔍 Diagnostic Information', 'blue');
  log('━'.repeat(60), 'cyan');
  
  log('\nIf your custom domain shows Error 522:', 'yellow');
  log('1. Verify custom domain is added in Cloudflare Pages dashboard', 'cyan');
  log('2. Check DNS records point to mem-rebuild-pl.pages.dev', 'cyan');
  log('3. Ensure SSL/TLS mode is "Full" or "Full (strict)"', 'cyan');
  log('4. Wait 5-60 minutes for DNS propagation', 'cyan');
  
  log('\nTest your DNS configuration:', 'yellow');
  log('  nslookup www.bearcavemarketing.com', 'cyan');
  log('  curl -I https://www.bearcavemarketing.com/', 'cyan');
  
  log('\nFor detailed instructions, see:', 'yellow');
  log('  docs/CLOUDFLARE_CUSTOM_DOMAIN_SETUP.md', 'cyan');
}

function main() {
  log('╔═══════════════════════════════════════════════════════╗', 'blue');
  log('║   Cloudflare Pages Configuration Verifier           ║', 'blue');
  log('╚═══════════════════════════════════════════════════════╝', 'blue');
  
  checkCloudflareFiles();
  checkViteConfig();
  checkBuildFiles();
  provideDiagnosticInfo();
  
  log('\n' + '═'.repeat(60), 'blue');
  log('Verification complete!', 'green');
  log('═'.repeat(60) + '\n', 'blue');
}

main();
