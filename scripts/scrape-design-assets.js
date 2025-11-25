#!/usr/bin/env node
/**
 * Script to extract images and design components from websites
 * Uses the AI-Cursor-Scraping-Assistant MCP server
 * Special handling for Adobe Lightroom share pages
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

/**
 * Scrape images from Adobe Lightroom share pages
 */
async function scrapeLightroomImages(url, outputDir, prefix = 'photo') {
  const outputPath = join(rootDir, outputDir);
  await fs.mkdir(outputPath, { recursive: true });

  console.log(`\n📸 Scraping Lightroom share page: ${url}`);
  console.log(`📁 Output directory: ${outputPath}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Set a reasonable viewport
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('⏳ Loading page and waiting for images...');
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Wait for images to load - Lightroom uses dynamic loading
    console.log('⏳ Waiting for images to render...');
    await new Promise(resolve => setTimeout(resolve, 3000)); // Initial wait for page load

    // Scroll to load more images (Lightroom often lazy loads)
    await page.evaluate(() => {
      return new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            setTimeout(resolve, 2000); // Wait for images to load after scroll
          }
        }, 100);
      });
    });

    // Extract image URLs - Lightroom uses various selectors
    // Target 2048px renditions specifically to avoid full-resolution bloat
    console.log('🔍 Extracting 2048px image URLs...');
    const imageUrls = await page.evaluate(() => {
      const images = [];
      const foundUrls = new Set();

      // Function to extract best 2048px URL from srcset or src
      const get2048Url = (img) => {
        let bestUrl = null;
        let bestWidth = 0;

        // Check srcset first (most reliable for responsive images)
        const srcset = img.getAttribute('srcset') || img.getAttribute('data-srcset');
        if (srcset) {
          // Parse srcset: "url1 500w, url2 1024w, url3 2048w"
          const sources = srcset.split(',').map(s => s.trim());
          sources.forEach(source => {
            const parts = source.split(/\s+/);
            if (parts.length >= 2) {
              const url = parts[0];
              const width = parseInt(parts[1].replace('w', '')) || 0;

              // Prefer exactly 2048px, or closest below 2048px
              if (width === 2048) {
                bestUrl = url;
                bestWidth = 2048;
              } else if (width < 2048 && width > bestWidth) {
                bestUrl = url;
                bestWidth = width;
              }
            }
          });
        }

        // If no 2048px found in srcset, check src and try to modify it
        if (!bestUrl || bestWidth < 2048) {
          let src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');

          // Handle background-image
          if (!src && img.style.backgroundImage) {
            const match = img.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (match) src = match[1];
          }

          // Get parent background-image if img doesn't have src
          if (!src) {
            const parent = img.closest('[style*="background-image"]');
            if (parent && parent.style.backgroundImage) {
              const match = parent.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
              if (match) src = match[1];
            }
          }

          if (src && !src.startsWith('data:')) {
            // Try to find 2048px rendition in URL patterns
            // Common patterns: /w_2048/, /rendition_2048/, ?width=2048, /2048x/
            if (src.includes('2048') || src.includes('rendition')) {
              bestUrl = src;
              bestWidth = 2048;
            } else {
              // Try to modify URL to get 2048px version
              const modified = src
                .replace(/\/w_\d+/, '/w_2048')
                .replace(/\/h_\d+/, '/h_2048')
                .replace(/\/\d+x\d+/, '/2048x2048')
                .replace(/width=\d+/, 'width=2048')
                .replace(/height=\d+/, 'height=2048')
                .replace(/\/rendition_\d+/, '/rendition_2048')
                .replace(/\/\d+px/, '/2048px');

              if (modified !== src) {
                bestUrl = modified;
                bestWidth = 2048; // Assume modified URL is 2048px
              } else if (!bestUrl) {
                // Fallback to original if no modification possible
                bestUrl = src;
                bestWidth = 0;
              }
            }
          }
        }

        return bestUrl;
      };

      const selectors = [
        'img[src*="lightroom"]',
        'img[src*="adobe"]',
        'img[srcset]',
        'img[data-srcset]',
        'img[data-src]',
        'img[src]',
        '[style*="background-image"]',
        'picture img',
        'picture source',
        '.image img',
        '.photo img',
        '[class*="image"] img',
        '[class*="photo"] img',
      ];

      selectors.forEach(selector => {
        try {
          document.querySelectorAll(selector).forEach(img => {
            const url = get2048Url(img);

            if (url && !url.startsWith('data:') && !foundUrls.has(url)) {
              foundUrls.add(url);
              images.push({
                url: url,
                alt: img.alt || img.getAttribute('alt') || '',
                width: img.naturalWidth || img.width || 2048,
                height: img.naturalHeight || img.height || 0,
              });
            }
          });
        } catch (e) {
          // Continue if selector fails
        }
      });

      return Array.from(images);
    });

    console.log(`✅ Found ${imageUrls.length} images`);

    // Download images with clean filenames
    let downloaded = 0;
    for (let i = 0; i < imageUrls.length; i++) {
      const img = imageUrls[i];
      try {
        // Get file extension from URL
        const urlPath = new URL(img.url).pathname;
        const ext = urlPath.match(/\.(jpg|jpeg|png|webp|gif)$/i)?.[0] || '.jpg';
        // Use clean filenames with configurable prefix: photo-01.jpg, design-01.jpg, etc.
        const paddedIndex = String(i + 1).padStart(2, '0');
        const fileName = `${prefix}-${paddedIndex}${ext}`;
        const filePath = join(outputPath, fileName);

        console.log(`⬇️  Downloading ${i + 1}/${imageUrls.length}: ${fileName}`);

        const response = await axios({
          method: 'GET',
          url: img.url,
          responseType: 'stream',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer': url,
          },
        });

        const writer = createWriteStream(filePath);
        await pipeline(response.data, writer);
        downloaded++;
      } catch (error) {
        console.warn(`⚠️  Failed to download image ${i + 1}: ${error.message}`);
      }
    }

    console.log(`\n✅ Downloaded ${downloaded}/${imageUrls.length} images to ${outputPath}`);
    return downloaded;
  } finally {
    await browser.close();
  }
}

/**
 * Call the MCP scraping assistant to extract images
 */
async function extractImages(url, outputDir = 'public/images/scraped', prefix = 'photo') {
  // Check if this is a Lightroom URL
  if (url.includes('lightroom.adobe.com')) {
    return await scrapeLightroomImages(url, outputDir, prefix);
  }

  const outputPath = join(rootDir, outputDir);
  await fs.mkdir(outputPath, { recursive: true });

  console.log(`Extracting images from ${url}...`);
  console.log(`Output directory: ${outputPath}`);

  // This would typically call the MCP server
  // For now, we'll create a Python script that can be called
  const pythonScript = `
import asyncio
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'cli-workflow/scraping-assistant/MCPfiles'))
from xpath_server import extract_images

async def main():
    result = await extract_images("${url}", "${outputPath}")
    print(result)

asyncio.run(main())
  `;

  const scriptPath = join(rootDir, 'tmp_extract_images.py');
  await fs.writeFile(scriptPath, pythonScript);

  return new Promise((resolve, reject) => {
    const python = spawn('python', [scriptPath], {
      cwd: rootDir,
      stdio: 'inherit'
    });

    python.on('close', (code) => {
      fs.unlink(scriptPath).catch(() => {});
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

/**
 * Call the MCP scraping assistant to extract design components
 */
async function extractDesignComponents(url, outputDir = 'public/images/scraped') {
  const outputPath = join(rootDir, outputDir);
  await fs.mkdir(outputPath, { recursive: true });

  console.log(`Extracting design components from ${url}...`);
  console.log(`Output directory: ${outputPath}`);

  const pythonScript = `
import asyncio
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'cli-workflow/scraping-assistant/MCPfiles'))
from xpath_server import extract_design_components

async def main():
    result = await extract_design_components("${url}", "${outputPath}")
    print(result)

asyncio.run(main())
  `;

  const scriptPath = join(rootDir, 'tmp_extract_design.py');
  await fs.writeFile(scriptPath, pythonScript);

  return new Promise((resolve, reject) => {
    const python = spawn('python', [scriptPath], {
      cwd: rootDir,
      stdio: 'inherit'
    });

    python.on('close', (code) => {
      fs.unlink(scriptPath).catch(() => {});
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

// CLI interface - supports both positional and flag-based arguments
const args = process.argv.slice(2);

// Parse flags
let command = null;
let url = null;
let outputDir = null;
let prefix = 'photo';

// Check for flag-based arguments first
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--url' && args[i + 1]) {
    url = args[i + 1];
    i++;
  } else if (args[i] === '--output' && args[i + 1]) {
    outputDir = args[i + 1];
    i++;
  } else if (args[i] === '--prefix' && args[i + 1]) {
    prefix = args[i + 1];
    i++;
  } else if (!command && !args[i].startsWith('--')) {
    // First non-flag argument is the command
    command = args[i];
  } else if (command && !url && !args[i].startsWith('--')) {
    // Second non-flag argument is the URL (if not already set)
    url = args[i];
  } else if (command && url && !outputDir && !args[i].startsWith('--')) {
    // Third non-flag argument is the output directory (if not already set)
    outputDir = args[i];
  }
}

if (!command || !url) {
  console.log(`
Usage:
  node scripts/scrape-design-assets.js <command> <url> [outputDir] [--prefix <prefix>]
  node scripts/scrape-design-assets.js <command> --url <url> [--output <dir>] [--prefix <prefix>]

Commands:
  images          Extract all images from the website
  design          Extract design components (colors, fonts, etc.)
  all             Extract both images and design components

Arguments:
  --url <url>     URL to scrape (required)
  --output <dir>  Output directory (default: public/images/scraped)
  --prefix <name> Filename prefix for Lightroom images (default: photo)

Examples:
  node scripts/scrape-design-assets.js images https://example.com
  node scripts/scrape-design-assets.js images https://lightroom.adobe.com/shares/xxx public/images/photography
  node scripts/scrape-design-assets.js images --url https://lightroom.adobe.com/shares/xxx --output public/images/photography --prefix photo
  node scripts/scrape-design-assets.js design https://example.com public/design-assets
  node scripts/scrape-design-assets.js all https://example.com

Note: Lightroom share URLs are automatically detected and use Puppeteer for dynamic content.
  `);
  process.exit(1);
}

(async () => {
  try {
    switch (command) {
      case 'images':
        await extractImages(url, outputDir, prefix);
        break;
      case 'design':
        await extractDesignComponents(url, outputDir);
        break;
      case 'all':
        await extractImages(url, outputDir, prefix);
        await extractDesignComponents(url, outputDir);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
    console.log('✅ Extraction complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();

