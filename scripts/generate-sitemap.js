#!/usr/bin/env node
/**
 * Sitemap Generation Script
 * Generates a comprehensive sitemap.xml with all routes
 *
 * Usage: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.bearcavemarketing.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// Define all routes with their priorities and change frequencies
const routes = [
  // Core pages - High priority
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: CURRENT_DATE },
  { path: '/about', priority: '0.9', changefreq: 'monthly', lastmod: CURRENT_DATE },
  { path: '/contact', priority: '0.9', changefreq: 'monthly', lastmod: CURRENT_DATE },

  // Portfolio pages - High priority
  { path: '/case-studies', priority: '0.9', changefreq: 'weekly', lastmod: CURRENT_DATE },
  { path: '/projects', priority: '0.8', changefreq: 'monthly', lastmod: CURRENT_DATE },
  { path: '/applications', priority: '0.8', changefreq: 'monthly', lastmod: CURRENT_DATE },
  { path: '/side-projects', priority: '0.8', changefreq: 'monthly', lastmod: CURRENT_DATE },

  // Creative portfolio - Medium priority
  { path: '/design', priority: '0.7', changefreq: 'monthly', lastmod: CURRENT_DATE },
  { path: '/photography', priority: '0.7', changefreq: 'monthly', lastmod: CURRENT_DATE },
  { path: '/inspiration', priority: '0.7', changefreq: 'monthly', lastmod: CURRENT_DATE },

  // Utility pages - Medium priority
  { path: '/toolbox', priority: '0.7', changefreq: 'monthly', lastmod: CURRENT_DATE },
  { path: '/resume', priority: '0.7', changefreq: 'monthly', lastmod: CURRENT_DATE },
  { path: '/testimonials', priority: '0.6', changefreq: 'monthly', lastmod: CURRENT_DATE },

  // Brand tools - Lower priority
  { path: '/brand-builder', priority: '0.6', changefreq: 'monthly', lastmod: CURRENT_DATE },
  { path: '/gallery', priority: '0.6', changefreq: 'monthly', lastmod: CURRENT_DATE },
];

// Dynamic routes - These would be generated from data files
const dynamicRoutes = [
  // Case studies (from caseStudies.ts)
  {
    path: '/case-studies/the-launchpad',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: CURRENT_DATE,
  },
  {
    path: '/case-studies/the-conductor',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: CURRENT_DATE,
  },
  {
    path: '/case-studies/the-guardian',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: CURRENT_DATE,
  },
  {
    path: '/case-studies/the-compass',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: CURRENT_DATE,
  },
  {
    path: '/case-studies/the-fortress',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: CURRENT_DATE,
  },
  {
    path: '/case-studies/the-engine-room',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: CURRENT_DATE,
  },
];

function generateSitemap() {
  console.log('🗺️  Generating sitemap.xml...\n');

  const allRoutes = [...routes, ...dynamicRoutes];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  allRoutes.forEach(route => {
    sitemap += `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  // Write to public directory
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap, 'utf8');

  console.log(`✅ Sitemap generated: ${outputPath}`);
  console.log(`📊 Total URLs: ${allRoutes.length}`);
  console.log(`   - Static routes: ${routes.length}`);
  console.log(`   - Dynamic routes: ${dynamicRoutes.length}\n`);
}

// Run if called directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` || import.meta.url.endsWith(process.argv[1]);
if (isMainModule || process.argv[1]?.endsWith('generate-sitemap.js')) {
  generateSitemap();
}

export { generateSitemap };
