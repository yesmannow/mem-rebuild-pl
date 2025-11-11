#!/usr/bin/env node
/**
 * Route Validator Script
 * Validates that all routes are accessible and properly configured
 *
 * Usage: node scripts/validate-routes.js [--base-url=http://localhost:4173]
 * Example: node scripts/validate-routes.js --base-url=https://www.bearcavemarketing.com
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
const OUTPUT_PATH = 'reports/route-validation-report.json';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🛣️  Route Validator');
console.log('==================\n');
console.log(`Base URL: ${BASE_URL}\n`);

const routes = [];
const accessibleRoutes = [];
const brokenRoutes = [];
const redirectRoutes = [];

// Extract routes from router
function extractRoutesFromRouter() {
  const routerPath = path.join(process.cwd(), 'src', 'router', 'AppRouter.tsx');
  if (!fs.existsSync(routerPath)) {
    console.log('⚠️  Router file not found');
    return [];
  }

  const content = fs.readFileSync(routerPath, 'utf-8');
  const routeMatches = content.match(/path=["']([^"']+)["']/g);

  if (routeMatches) {
    routeMatches.forEach(match => {
      const route = match.replace(/path=["']/, '').replace(/["']/, '');
      if (route !== '*' && !routes.includes(route)) {
        routes.push(route);
      }
    });
  }

  // Also check sitemap for additional routes
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
    const urlMatches = sitemap.match(/<loc>([^<]+)<\/loc>/g);
    if (urlMatches) {
      urlMatches.forEach(match => {
        const url = match.replace('<loc>', '').replace('</loc>', '');
        try {
          const urlObj = new URL(url);
          const route = urlObj.pathname;
          if (!routes.includes(route)) {
            routes.push(route);
          }
        } catch (e) {
          // Invalid URL
        }
      });
    }
  }

  return routes;
}

// Check if route is accessible
function checkRoute(route) {
  return new Promise(resolve => {
    const url = route.startsWith('http') ? route : BASE_URL + route;
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RouteValidator/1.0)',
      },
    };

    const req = client.request(options, res => {
      const statusCode = res.statusCode;
      let data = '';

      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        resolve({
          route,
          url,
          statusCode,
          accessible: statusCode >= 200 && statusCode < 400,
          isRedirect: statusCode >= 300 && statusCode < 400,
          contentType: res.headers['content-type'] || '',
          contentLength: data.length,
        });
      });
    });

    req.on('error', error => {
      resolve({
        route,
        url,
        accessible: false,
        error: error.message,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        route,
        url,
        accessible: false,
        error: 'Request timeout',
      });
    });

    req.end();
  });
}

// Validate dynamic routes
function validateDynamicRoutes() {
  console.log('🔍 Validating dynamic routes...\n');

  // Check case studies
  const caseStudiesPath = path.join(process.cwd(), 'src', 'data', 'caseStudies.ts');
  if (fs.existsSync(caseStudiesPath)) {
    const content = fs.readFileSync(caseStudiesPath, 'utf-8');
    const slugMatches = content.match(/slug:\s*["']([^"']+)["']/g);

    if (slugMatches) {
      slugMatches.forEach(match => {
        const slug = match.replace(/slug:\s*["']/, '').replace(/["']/, '');
        const route = `/case-studies/${slug}`;
        if (!routes.includes(route)) {
          routes.push(route);
        }
      });
    }
  }

  // Check applications
  const applicationsPath = path.join(process.cwd(), 'src', 'data', 'applications.ts');
  if (fs.existsSync(applicationsPath)) {
    const content = fs.readFileSync(applicationsPath, 'utf-8');
    const idMatches = content.match(/id:\s*["']([^"']+)["']/g);

    if (idMatches) {
      idMatches.forEach(match => {
        const id = match.replace(/id:\s*["']/, '').replace(/["']/, '');
        const route = `/applications/${id}`;
        if (!routes.includes(route)) {
          routes.push(route);
        }
      });
    }
  }
}

// Main validation
async function validateRoutes() {
  // Extract routes
  const staticRoutes = extractRoutesFromRouter();
  validateDynamicRoutes();

  console.log(`Found ${routes.length} route(s) to validate\n`);

  // Check each route
  for (const route of routes) {
    console.log(`Checking: ${route}`);
    const result = await checkRoute(route);

    if (result.accessible) {
      if (result.isRedirect) {
        redirectRoutes.push(result);
      } else {
        accessibleRoutes.push(result);
      }
    } else {
      brokenRoutes.push(result);
    }
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary: {
      total: routes.length,
      accessible: accessibleRoutes.length,
      broken: brokenRoutes.length,
      redirects: redirectRoutes.length,
    },
    accessibleRoutes: accessibleRoutes.map(r => ({ route: r.route, statusCode: r.statusCode })),
    brokenRoutes: brokenRoutes.map(r => ({ route: r.route, error: r.error || r.statusCode })),
    redirectRoutes: redirectRoutes.map(r => ({ route: r.route, statusCode: r.statusCode })),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  // Display results
  console.log('\n📊 Route Validation Results');
  console.log('===========================');
  console.log(`Total Routes:   ${report.summary.total}`);
  console.log(`Accessible:     ${report.summary.accessible} ✅`);
  console.log(
    `Broken:         ${report.summary.broken} ${report.summary.broken === 0 ? '✅' : '❌'}`
  );
  console.log(
    `Redirects:      ${report.summary.redirects} ${report.summary.redirects === 0 ? '✅' : '⚠️'}`
  );

  if (brokenRoutes.length > 0) {
    console.log('\n❌ Broken Routes:');
    brokenRoutes.forEach(route => {
      console.log(`   - ${route.route}: ${route.error || route.statusCode}`);
    });
  }

  if (redirectRoutes.length > 0) {
    console.log('\n⚠️  Redirect Routes:');
    redirectRoutes.forEach(route => {
      console.log(`   - ${route.route}: ${route.statusCode}`);
    });
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);

  if (brokenRoutes.length > 0) {
    process.exit(1);
  }
}

validateRoutes().catch(error => {
  console.error('❌ Route validation failed:', error);
  process.exit(1);
});
