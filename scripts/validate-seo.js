#!/usr/bin/env node
/**
 * SEO Validator Script
 * Validates SEO meta tags, Open Graph, Twitter Cards, and structured data
 *
 * Usage: node scripts/validate-seo.js [--url=http://localhost:4173] [--check-all-pages]
 * Example: node scripts/validate-seo.js --url=https://www.bearcavemarketing.com --check-all-pages
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL =
  process.argv.find(arg => arg.startsWith('--url='))?.split('=')[1] || 'http://localhost:4173';
const CHECK_ALL_PAGES = process.argv.includes('--check-all-pages');
const OUTPUT_PATH = 'reports/seo-validation-report.json';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🔍 SEO Validator');
console.log('===============\n');
console.log(`Base URL: ${BASE_URL}`);
console.log(`Check All Pages: ${CHECK_ALL_PAGES}\n`);

const issues = [];
const warnings = [];
const validations = [];

// Required meta tags
const REQUIRED_TAGS = {
  title: { required: true, maxLength: 60 },
  description: { required: true, minLength: 120, maxLength: 160 },
  'og:title': { required: true },
  'og:description': { required: true },
  'og:type': { required: true },
  'og:image': { required: true },
  'twitter:card': { required: false },
  'twitter:title': { required: false },
  'twitter:description': { required: false },
  'twitter:image': { required: false },
};

// Extract meta tags from HTML
function extractMetaTags(html) {
  const metaTags = {};

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    metaTags.title = titleMatch[1].trim();
  }

  // Extract meta tags
  const metaRegex = /<meta\s+([^>]+)>/gi;
  let match;
  while ((match = metaRegex.exec(html)) !== null) {
    const attrs = match[1];
    const nameMatch = attrs.match(/(?:name|property)=["']([^"']+)["']/i);
    const contentMatch = attrs.match(/content=["']([^"']+)["']/i);

    if (nameMatch && contentMatch) {
      metaTags[nameMatch[1].toLowerCase()] = contentMatch[1];
    }
  }

  // Extract canonical link
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (canonicalMatch) {
    metaTags.canonical = canonicalMatch[1];
  }

  return metaTags;
}

// Extract structured data (JSON-LD)
function extractStructuredData(html) {
  const structuredData = [];
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1]);
      structuredData.push(data);
    } catch (e) {
      // Invalid JSON
    }
  }

  return structuredData;
}

// Fetch HTML from URL
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOValidator/1.0)',
      },
    };

    const req = client.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

// Validate meta tags
function validateMetaTags(metaTags, url) {
  const pageIssues = [];
  const pageWarnings = [];

  // Check required tags
  Object.keys(REQUIRED_TAGS).forEach(tag => {
    const config = REQUIRED_TAGS[tag];
    const value = metaTags[tag];

    if (config.required && !value) {
      pageIssues.push({
        tag,
        issue: 'Missing required meta tag',
        url,
      });
    } else if (value) {
      // Validate length
      if (config.minLength && value.length < config.minLength) {
        pageWarnings.push({
          tag,
          issue: `Meta tag too short (${value.length} chars, recommended: ${config.minLength}+)`,
          value: value.substring(0, 50) + '...',
          url,
        });
      }
      if (config.maxLength && value.length > config.maxLength) {
        pageWarnings.push({
          tag,
          issue: `Meta tag too long (${value.length} chars, max: ${config.maxLength})`,
          value: value.substring(0, 50) + '...',
          url,
        });
      }
    }
  });

  // Check for duplicate titles
  if (metaTags.title && metaTags['og:title'] && metaTags.title !== metaTags['og:title']) {
    pageWarnings.push({
      tag: 'og:title',
      issue: 'Open Graph title differs from page title',
      url,
    });
  }

  // Check image URLs
  if (metaTags['og:image']) {
    if (!metaTags['og:image'].startsWith('http')) {
      pageIssues.push({
        tag: 'og:image',
        issue: 'Open Graph image should be absolute URL',
        value: metaTags['og:image'],
        url,
      });
    }
  }

  return { issues: pageIssues, warnings: pageWarnings };
}

// Validate structured data
function validateStructuredData(structuredData, url) {
  const pageIssues = [];

  if (structuredData.length === 0) {
    pageIssues.push({
      type: 'structured-data',
      issue: 'No structured data (JSON-LD) found',
      recommendation: 'Add structured data for better SEO',
      url,
    });
  } else {
    // Check for Organization or Person schema
    const hasOrganization = structuredData.some(
      data => data['@type'] === 'Organization' || data['@type'] === 'Person'
    );

    if (!hasOrganization) {
      pageIssues.push({
        type: 'structured-data',
        issue: 'No Organization or Person schema found',
        recommendation: 'Add Organization/Person schema for better SEO',
        url,
      });
    }
  }

  return pageIssues;
}

// Get routes to check
function getRoutesToCheck() {
  const routes = ['/'];

  if (CHECK_ALL_PAGES) {
    // Read from sitemap or router
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
      const urlMatches = sitemap.match(/<loc>([^<]+)<\/loc>/g);
      if (urlMatches) {
        urlMatches.forEach(match => {
          const url = match.replace('<loc>', '').replace('</loc>', '');
          const pathname = new URL(url).pathname;
          routes.push(pathname);
        });
      }
    } else {
      // Fallback: common routes
      routes.push(
        '/about',
        '/contact',
        '/case-studies',
        '/projects',
        '/applications',
        '/design',
        '/photography'
      );
    }
  }

  return routes;
}

// Validate a single page
async function validatePage(route) {
  const url = route.startsWith('http') ? route : BASE_URL + route;

  try {
    console.log(`Checking: ${url}`);
    const html = await fetchHTML(url);
    const metaTags = extractMetaTags(html);
    const structuredData = extractStructuredData(html);

    const metaValidation = validateMetaTags(metaTags, url);
    const structuredValidation = validateStructuredData(structuredData, url);

    return {
      url,
      route,
      metaTags,
      structuredData: structuredData.length,
      issues: [...metaValidation.issues, ...structuredValidation],
      warnings: metaValidation.warnings,
    };
  } catch (error) {
    return {
      url,
      route,
      error: error.message,
      issues: [{ issue: `Failed to fetch: ${error.message}` }],
    };
  }
}

// Main validation
async function runValidation() {
  const routes = getRoutesToCheck();
  console.log(`Checking ${routes.length} page(s)...\n`);

  const results = [];
  for (const route of routes) {
    const result = await validatePage(route);
    results.push(result);

    if (result.issues && result.issues.length > 0) {
      issues.push(...result.issues);
    }
    if (result.warnings && result.warnings.length > 0) {
      warnings.push(...result.warnings);
    }

    validations.push({
      url: result.url,
      route: result.route,
      metaTagsFound: Object.keys(result.metaTags || {}).length,
      structuredDataFound: result.structuredData || 0,
      issuesCount: result.issues?.length || 0,
      warningsCount: result.warnings?.length || 0,
    });
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary: {
      pagesChecked: results.length,
      totalIssues: issues.length,
      totalWarnings: warnings.length,
    },
    validations,
    issues,
    warnings: warnings.slice(0, 50), // Limit warnings
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  // Display results
  console.log('\n📊 SEO Validation Results');
  console.log('========================');
  console.log(`Pages Checked:    ${report.summary.pagesChecked}`);
  console.log(
    `Issues:          ${report.summary.totalIssues} ${report.summary.totalIssues === 0 ? '✅' : '❌'}`
  );
  console.log(
    `Warnings:        ${report.summary.totalWarnings} ${report.summary.totalWarnings === 0 ? '✅' : '⚠️'}`
  );

  if (issues.length > 0) {
    console.log('\n❌ Issues Found:');
    issues.slice(0, 10).forEach(issue => {
      console.log(`   - ${issue.tag || issue.type || 'Unknown'}: ${issue.issue}`);
      if (issue.url) console.log(`     URL: ${issue.url}`);
    });
    if (issues.length > 10) {
      console.log(`   ... and ${issues.length - 10} more`);
    }
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.slice(0, 5).forEach(warning => {
      console.log(`   - ${warning.tag}: ${warning.issue}`);
    });
    if (warnings.length > 5) {
      console.log(`   ... and ${warnings.length - 5} more`);
    }
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);

  if (issues.length > 0) {
    process.exit(1);
  }
}

// Run validation
runValidation().catch(error => {
  console.error('❌ Validation failed:', error);
  process.exit(1);
});
