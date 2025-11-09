#!/usr/bin/env node
/**
 * Link Checker Script
 * Validates internal and external links
 *
 * Usage: node scripts/check-links.js [--base-url=http://localhost:4173] [--check-external]
 * Example: node scripts/check-links.js --base-url=https://www.bearcavemarketing.com --check-external
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL =
  process.argv.find(arg => arg.startsWith('--base-url='))?.split('=')[1] || 'http://localhost:4173';
const CHECK_EXTERNAL = process.argv.includes('--check-external');
const OUTPUT_PATH = 'reports/link-check-report.json';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🔗 Link Checker');
console.log('===============\n');
console.log(`Base URL: ${BASE_URL}`);
console.log(`Check External: ${CHECK_EXTERNAL}\n`);

const brokenLinks = [];
const validLinks = [];
const externalLinks = [];
const checkedUrls = new Set();

// Extract links from HTML content
function extractLinks(html, baseUrl) {
  const links = [];

  // Match href attributes
  const hrefRegex = /href=["']([^"']+)["']/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    links.push(match[1]);
  }

  // Match src attributes (for images, scripts, etc.)
  const srcRegex = /src=["']([^"']+)["']/gi;
  while ((match = srcRegex.exec(html)) !== null) {
    links.push(match[1]);
  }

  return links
    .map(link => {
      // Resolve relative URLs
      if (link.startsWith('/')) {
        return new URL(link, baseUrl).href;
      } else if (link.startsWith('http://') || link.startsWith('https://')) {
        return link;
      } else if (!link.startsWith('#') && !link.startsWith('mailto:') && !link.startsWith('tel:')) {
        return new URL(link, baseUrl).href;
      }
      return null;
    })
    .filter(Boolean);
}

// Check if URL is accessible
function checkUrl(url, isExternal = false) {
  return new Promise(resolve => {
    if (checkedUrls.has(url)) {
      resolve({ url, status: 'skipped', reason: 'already checked' });
      return;
    }

    checkedUrls.add(url);

    // Skip anchors, mailto, tel
    if (url.includes('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      resolve({ url, status: 'skipped', reason: 'special protocol' });
      return;
    }

    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'HEAD',
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)',
      },
    };

    const req = client.request(options, res => {
      const status = res.statusCode;
      resolve({
        url,
        status: status >= 200 && status < 400 ? 'valid' : 'broken',
        statusCode: status,
        isExternal,
      });
    });

    req.on('error', error => {
      resolve({
        url,
        status: 'broken',
        error: error.message,
        isExternal,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 'timeout',
        isExternal,
      });
    });

    req.end();
  });
}

// Scan HTML files in dist directory
async function scanDistDirectory() {
  const distDir = path.join(process.cwd(), 'dist');

  if (!fs.existsSync(distDir)) {
    console.log('⚠️  dist directory not found. Building first...');
    console.log('   Run: npm run build');
    return;
  }

  console.log('📁 Scanning dist directory...\n');

  const htmlFiles = [];
  function findHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        findHtmlFiles(filePath);
      } else if (file.endsWith('.html')) {
        htmlFiles.push(filePath);
      }
    });
  }

  findHtmlFiles(distDir);

  if (htmlFiles.length === 0) {
    console.log('⚠️  No HTML files found in dist directory.');
    return;
  }

  console.log(`Found ${htmlFiles.length} HTML file(s)\n`);

  // Extract all links
  const allLinks = new Set();
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const links = extractLinks(content, BASE_URL);
    links.forEach(link => allLinks.add(link));
  });

  console.log(`Found ${allLinks.size} unique link(s) to check\n`);

  // Check links
  const promises = [];
  for (const link of allLinks) {
    const isExternal = !link.startsWith(BASE_URL);
    if (isExternal && !CHECK_EXTERNAL) {
      externalLinks.push({ url: link, status: 'skipped' });
      continue;
    }

    promises.push(checkUrl(link, isExternal));
  }

  const results = await Promise.all(promises);

  results.forEach(result => {
    if (result.status === 'valid') {
      validLinks.push(result);
    } else if (result.status === 'broken') {
      brokenLinks.push(result);
    } else if (result.isExternal) {
      externalLinks.push(result);
    }
  });

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary: {
      total: allLinks.size,
      valid: validLinks.length,
      broken: brokenLinks.length,
      external: externalLinks.length,
      skipped: allLinks.size - validLinks.length - brokenLinks.length,
    },
    brokenLinks: brokenLinks,
    externalLinks: externalLinks.slice(0, 10), // Sample
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  // Display results
  console.log('📊 Link Check Results');
  console.log('====================');
  console.log(`Total Links:    ${report.summary.total}`);
  console.log(`Valid:          ${report.summary.valid} ✅`);
  console.log(
    `Broken:         ${report.summary.broken} ${report.summary.broken === 0 ? '✅' : '❌'}`
  );
  console.log(`External:       ${report.summary.external} ${CHECK_EXTERNAL ? '' : '(skipped)'}`);

  if (brokenLinks.length > 0) {
    console.log('\n❌ Broken Links:');
    brokenLinks.slice(0, 10).forEach(link => {
      console.log(`   - ${link.url} (${link.statusCode || link.error || 'unknown'})`);
    });
    if (brokenLinks.length > 10) {
      console.log(`   ... and ${brokenLinks.length - 10} more`);
    }
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);

  if (brokenLinks.length > 0) {
    process.exit(1);
  }
}

// Also check source files for hardcoded links
function checkSourceFiles() {
  console.log('\n📝 Checking source files for hardcoded links...\n');

  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    return;
  }

  const sourceIssues = [];
  function scanSourceFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !filePath.includes('node_modules')) {
        scanSourceFiles(filePath);
      } else if (
        file.endsWith('.tsx') ||
        file.endsWith('.ts') ||
        file.endsWith('.jsx') ||
        file.endsWith('.js')
      ) {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Check for hardcoded localhost or absolute URLs
        const localhostMatches = content.match(/http:\/\/localhost:\d+/g);
        if (localhostMatches) {
          sourceIssues.push({
            file: path.relative(process.cwd(), filePath),
            issue: 'Hardcoded localhost URL',
            matches: localhostMatches,
          });
        }
      }
    });
  }

  scanSourceFiles(srcDir);

  if (sourceIssues.length > 0) {
    console.log('⚠️  Found hardcoded URLs in source files:');
    sourceIssues.forEach(issue => {
      console.log(`   ${issue.file}: ${issue.matches.join(', ')}`);
    });
  } else {
    console.log('✅ No hardcoded localhost URLs found');
  }
}

// Run checks
(async () => {
  await scanDistDirectory();
  checkSourceFiles();
})();
