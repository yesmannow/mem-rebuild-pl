#!/usr/bin/env node
/**
 * Scrape side project websites to extract logos, hero images, and brand colors
 * Creates screenshots and extracts og:image, favicon, and color palettes
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import puppeteer from 'puppeteer';
import axios from 'axios';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Target URLs from user's documents
const TARGET_SITES = [
  { url: 'https://urgentcareindy.com', slug: 'urgentcare-indy', name: 'UrgentCare Indy' },
  { url: 'https://behrpetessentials.com', slug: 'behr-pet-essentials', name: 'Behr Pet Essentials' },
  { url: 'https://russellpaintingcompany.com', slug: 'russell-painting', name: 'Russell Painting Co.' },
  { url: 'https://317bbq.com', slug: '317-bbq', name: '317 BBQ' },
  { url: 'https://hoosierboybarbershop.com', slug: 'hoosier-boy-barbershop', name: 'Hoosier Boy Barbershop' },
  { url: 'https://ayresmechanicalinc.com', slug: 'ayres-mechanical', name: 'Ayres Mechanical' },
  { url: 'https://tbmattorneys.com', slug: 'tuohy-bailey-moore', name: 'Tuohy Bailey & Moore' },
  { url: 'https://primarycolours.org', slug: 'primary-colours', name: 'Primary Colours' },
];

/**
 * Extract og:image from meta tags
 */
async function extractOGImage(page) {
  try {
    const ogImage = await page.evaluate(() => {
      const meta = document.querySelector('meta[property="og:image"]');
      return meta ? meta.getAttribute('content') : null;
    });
    return ogImage;
  } catch (error) {
    console.warn('  ⚠️  Could not extract og:image:', error.message);
    return null;
  }
}

/**
 * Extract favicon or logo
 */
async function extractFavicon(page) {
  try {
    const favicon = await page.evaluate(() => {
      // Try multiple favicon sources
      const selectors = [
        'link[rel="icon"]',
        'link[rel="shortcut icon"]',
        'link[rel="apple-touch-icon"]',
        'link[rel="apple-touch-icon-precomposed"]',
      ];

      for (const selector of selectors) {
        const link = document.querySelector(selector);
        if (link) {
          const href = link.getAttribute('href');
          if (href) {
            // Convert relative URLs to absolute
            if (href.startsWith('http')) return href;
            if (href.startsWith('//')) return `https:${href}`;
            if (href.startsWith('/')) {
              const baseUrl = window.location.origin;
              return `${baseUrl}${href}`;
            }
            return `${window.location.origin}/${href}`;
          }
        }
      }
      return null;
    });
    return favicon;
  } catch (error) {
    console.warn('  ⚠️  Could not extract favicon:', error.message);
    return null;
  }
}

/**
 * Extract brand colors from CSS
 */
async function extractBrandColors(page) {
  try {
    const colors = await page.evaluate(() => {
      const colorSet = new Set();

      // Get computed styles from body and main elements
      const elements = [document.body, document.querySelector('main'), document.querySelector('header')];

      elements.forEach(el => {
        if (!el) return;
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const textColor = styles.color;

        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          colorSet.add(bgColor);
        }
        if (textColor && textColor !== 'rgba(0, 0, 0, 0)') {
          colorSet.add(textColor);
        }
      });

      // Also check for CSS custom properties
      const rootStyles = window.getComputedStyle(document.documentElement);
      for (let i = 0; i < rootStyles.length; i++) {
        const prop = rootStyles[i];
        if (prop.startsWith('--') && prop.includes('color')) {
          const value = rootStyles.getPropertyValue(prop);
          if (value) colorSet.add(value);
        }
      }

      return Array.from(colorSet).slice(0, 5); // Limit to 5 colors
    });

    return colors;
  } catch (error) {
    console.warn('  ⚠️  Could not extract colors:', error.message);
    return [];
  }
}

/**
 * Take a screenshot of the website
 */
async function takeScreenshot(page, outputPath) {
  try {
    await page.screenshot({
      path: outputPath,
      width: 1280,
      height: 800,
      fullPage: false,
    });
    return true;
  } catch (error) {
    console.warn('  ⚠️  Could not take screenshot:', error.message);
    return false;
  }
}

/**
 * Download an image from URL
 */
async function downloadImage(url, outputPath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 10000,
    });

    const writer = createWriteStream(outputPath);
    await pipeline(response.data, writer);
    return true;
  } catch (error) {
    console.warn(`  ⚠️  Could not download ${url}:`, error.message);
    return false;
  }
}

/**
 * Scrape a single website
 */
async function scrapeWebsite(site) {
  const { url, slug, name } = site;
  const outputDir = join(rootDir, 'public', 'images', 'side-projects', slug);
  await fs.mkdir(outputDir, { recursive: true });

  console.log(`\n🌐 Scraping: ${name}`);
  console.log(`   URL: ${url}`);
  console.log(`   Output: ${outputDir}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = {
    slug,
    name,
    url,
    screenshot: null,
    ogImage: null,
    favicon: null,
    colors: [],
    techStack: [],
    success: false,
  };

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log('  ⏳ Loading page...');
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Wait for page to fully render
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Take screenshot
    const screenshotPath = join(outputDir, 'screenshot.png');
    console.log('  📸 Taking screenshot...');
    if (await takeScreenshot(page, screenshotPath)) {
      results.screenshot = `/images/side-projects/${slug}/screenshot.png`;
      console.log('  ✅ Screenshot saved');
    }

    // Extract og:image
    console.log('  🔍 Extracting og:image...');
    const ogImageUrl = await extractOGImage(page);
    if (ogImageUrl) {
      const ogImagePath = join(outputDir, 'og-image.png');
      if (await downloadImage(ogImageUrl, ogImagePath)) {
        results.ogImage = `/images/side-projects/${slug}/og-image.png`;
        console.log('  ✅ OG Image saved');
      }
    }

    // Extract favicon
    console.log('  🔍 Extracting favicon...');
    const faviconUrl = await extractFavicon(page);
    if (faviconUrl) {
      const faviconPath = join(outputDir, 'favicon.png');
      if (await downloadImage(faviconUrl, faviconPath)) {
        results.favicon = `/images/side-projects/${slug}/favicon.png`;
        console.log('  ✅ Favicon saved');
      }
    }

    // Extract colors
    console.log('  🎨 Extracting brand colors...');
    results.colors = await extractBrandColors(page);
    if (results.colors.length > 0) {
      console.log(`  ✅ Found ${results.colors.length} colors`);
    }

    // Detect tech stack
    console.log('  🔧 Detecting tech stack...');
    const techStack = await page.evaluate(() => {
      const stack = [];
      const html = document.documentElement.innerHTML;

      if (html.includes('wp-content') || html.includes('wordpress')) stack.push('WordPress');
      if (html.includes('react') || html.includes('React')) stack.push('React');
      if (html.includes('divi')) stack.push('Divi');
      if (html.includes('woocommerce')) stack.push('WooCommerce');
      if (html.includes('shopify')) stack.push('Shopify');
      if (html.includes('squarespace')) stack.push('Squarespace');

      return stack;
    });
    results.techStack = techStack;
    if (techStack.length > 0) {
      console.log(`  ✅ Tech stack: ${techStack.join(', ')}`);
    }

    results.success = true;
    console.log(`  ✅ Successfully scraped ${name}`);

  } catch (error) {
    console.error(`  ❌ Error scraping ${name}:`, error.message);
    results.error = error.message;
  } finally {
    await browser.close();
  }

  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Side Projects Scraping');
  console.log(`📁 Root directory: ${rootDir}`);
  console.log(`🎯 Target sites: ${TARGET_SITES.length}`);

  const allResults = [];

  for (const site of TARGET_SITES) {
    try {
      const result = await scrapeWebsite(site);
      allResults.push(result);

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Failed to scrape ${site.name}:`, error.message);
      allResults.push({
        slug: site.slug,
        name: site.name,
        url: site.url,
        success: false,
        error: error.message,
      });
    }
  }

  // Save results to JSON
  const resultsPath = join(rootDir, 'src', 'data', 'scraped-side-projects.json');
  await fs.writeFile(resultsPath, JSON.stringify(allResults, null, 2));
  console.log(`\n💾 Results saved to: ${resultsPath}`);

  // Summary
  const successful = allResults.filter(r => r.success).length;
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successful: ${successful}/${TARGET_SITES.length}`);
  console.log(`   ❌ Failed: ${TARGET_SITES.length - successful}`);
}

main().catch(console.error);

