#!/usr/bin/env node
/**
 * ensure-images.js
 *
 * Pre-validates image assets for the portfolio and optionally auto‑resizes
 * those that exceed predefined limits. This script runs ahead of the
 * main build to catch oversized assets early, preventing lengthy build
 * failures or performance regressions caused by large images. When
 * invoked with the `--auto-resize` flag, images larger than the
 * configured maximum dimensions or file size will be resized in
 * place using sharp. Without the flag, the script will exit with
 * non‑zero status if offending images are found.
 *
 * Usage:
 *   node scripts/ensure-images.js             # Validate only
 *   node scripts/ensure-images.js --auto-resize  # Auto‑resize large images
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Configuration constants. Adjust these as needed for your project.
const MAX_WIDTH = 1920; // pixels
const MAX_HEIGHT = 1080; // pixels
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];

// Parse CLI arguments
const autoResize = process.argv.includes('--auto-resize');

// Collect offending images
const oversizeImages = [];

/**
 * Recursively traverse a directory and find image files.
 * @param {string} dir Directory to scan
 */
function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        checkImage(fullPath);
      }
    }
  }
}

/**
 * Validate an image file and optionally resize it if it exceeds limits.
 * @param {string} filePath Path to the image file
 */
async function checkImage(filePath) {
  try {
    const { size } = fs.statSync(filePath);
    // Skip non‑existent or zero‑length files
    if (!size) return;

    // Read dimensions using sharp
    const metadata = await sharp(filePath).metadata();
    const { width, height } = metadata;

    const exceedsSize = size > MAX_SIZE_BYTES;
    const exceedsDimensions =
      (width && width > MAX_WIDTH) || (height && height > MAX_HEIGHT);

    if (exceedsSize || exceedsDimensions) {
      oversizeImages.push({ filePath, size, width, height });
      if (autoResize) {
        await resizeImage(filePath, metadata);
      }
    }
  } catch (err) {
    console.error(`\u26a0\ufe0f  Could not process ${filePath}:`, err.message);
  }
}

/**
 * Resize an image down to the configured maximum dimensions while
 * maintaining aspect ratio. Overwrites the original file.
 * @param {string} filePath Path to the image file
 * @param {Object} metadata Sharp metadata for the image
 */
async function resizeImage(filePath, metadata) {
  const { width, height, format } = metadata;
  if (!width || !height) return;
  // Determine target dimensions while maintaining aspect ratio
  const widthRatio = MAX_WIDTH / width;
  const heightRatio = MAX_HEIGHT / height;
  const ratio = Math.min(widthRatio, heightRatio, 1); // Never upscale
  const targetWidth = Math.floor(width * ratio);
  const targetHeight = Math.floor(height * ratio);
  try {
    const buffer = await sharp(filePath)
      .resize(targetWidth, targetHeight)
      .toFormat(format || 'png')
      .toBuffer();
    fs.writeFileSync(filePath, buffer);
    console.log(`\ud83d\udd27 Resized ${path.relative(process.cwd(), filePath)} → ${targetWidth}x${targetHeight}`);
  } catch (err) {
    console.error(`\u274c Failed to resize ${filePath}:`, err.message);
  }
}

/**
 * Entry point. Scans directories for image files. Directories scanned
 * include `public` and `src/assets` if they exist. Add additional
 * directories as needed for your project structure.
 */
async function main() {
  const roots = [];
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) roots.push(publicDir);
  const assetsDir = path.join(process.cwd(), 'src/assets');
  if (fs.existsSync(assetsDir)) roots.push(assetsDir);
  if (roots.length === 0) {
    console.log('\u26a0\ufe0f  No image directories found to scan.');
    return;
  }
  console.log('\ud83d\uddbc\ufe0f  Validating image assets...');
  for (const dir of roots) {
    scanDirectory(dir);
  }
  if (oversizeImages.length > 0) {
    console.log('\n\u274c Found oversized images:');
    oversizeImages.forEach(img => {
      const rel = path.relative(process.cwd(), img.filePath);
      console.log(
        `   - ${rel} (${(img.size / 1024).toFixed(1)} KB, ${img.width}×${img.height})`
      );
    });
    if (!autoResize) {
      console.log('\nUse --auto-resize to automatically shrink them.');
      process.exitCode = 1;
    }
  } else {
    console.log('\u2705 All images are within limits.');
  }
}

// Kick off the script
main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
