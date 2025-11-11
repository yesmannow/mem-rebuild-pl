#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts images to WebP/AVIF format and optimizes them
 *
 * Usage: node scripts/optimize-images.js [directory]
 * Example: node scripts/optimize-images.js public/images
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Configuration
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const OUTPUT_FORMATS = {
  webp: true,
  avif: true, // Enable AVIF if sharp supports it
};

const QUALITY = {
  webp: 85,
  jpeg: 85,
  png: 90,
};

/**
 * Check if sharp is available (for WebP conversion)
 */
function checkDependencies() {
  try {
    require.resolve('sharp');
    return true;
  } catch (e) {
    console.warn('⚠️  sharp not found. Install with: npm install --save-dev sharp');
    console.warn('   Falling back to basic optimization recommendations.');
    return false;
  }
}

/**
 * Get all image files recursively
 */
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_FORMATS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Generate WebP version using sharp
 */
async function convertToWebP(inputPath, outputPath) {
  try {
    const sharp = require('sharp');
    await sharp(inputPath).webp({ quality: QUALITY.webp }).toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}:`, error.message);
    return false;
  }
}

/**
 * Generate AVIF version using sharp
 */
async function convertToAVIF(inputPath, outputPath) {
  try {
    const sharp = require('sharp');
    await sharp(inputPath).avif({ quality: 80 }).toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath} to AVIF:`, error.message);
    return false;
  }
}

/**
 * Get file size in KB
 */
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Main optimization function
 */
async function optimizeImages(directory = 'public/images') {
  console.log('🖼️  Image Optimization Script');
  console.log('==============================\n');

  if (!fs.existsSync(directory)) {
    console.error(`❌ Directory not found: ${directory}`);
    process.exit(1);
  }

  const hasSharp = checkDependencies();
  const imageFiles = getImageFiles(directory);

  if (imageFiles.length === 0) {
    console.log('ℹ️  No images found to optimize.');
    return;
  }

  console.log(`📁 Found ${imageFiles.length} images to process\n`);

  let processed = 0;
  let skipped = 0;
  let errors = 0;
  const recommendations = [];

  for (const imagePath of imageFiles) {
    const ext = path.extname(imagePath);
    const dir = path.dirname(imagePath);
    const basename = path.basename(imagePath, ext);
    const webpPath = path.join(dir, `${basename}.webp`);

    const originalSize = getFileSize(imagePath);

    if (hasSharp) {
      // Convert to WebP
      if (OUTPUT_FORMATS.webp && !fs.existsSync(webpPath)) {
        const success = await convertToWebP(imagePath, webpPath);
        if (success) {
          const webpSize = getFileSize(webpPath);
          const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
          console.log(`✅ ${path.basename(imagePath)} → ${basename}.webp (${savings}% smaller)`);
          processed++;
        } else {
          errors++;
        }
      } else if (OUTPUT_FORMATS.webp) {
        console.log(`⏭️  ${basename}.webp already exists`);
        skipped++;
      }

      // Convert to AVIF
      if (OUTPUT_FORMATS.avif) {
        const avifPath = path.join(dir, `${basename}.avif`);
        if (!fs.existsSync(avifPath)) {
          const success = await convertToAVIF(imagePath, avifPath);
          if (success) {
            const avifSize = getFileSize(avifPath);
            const savings = ((1 - avifSize / originalSize) * 100).toFixed(1);
            console.log(`✅ ${path.basename(imagePath)} → ${basename}.avif (${savings}% smaller)`);
            processed++;
          } else {
            errors++;
          }
        } else {
          console.log(`⏭️  ${basename}.avif already exists`);
          skipped++;
        }
      }
    } else {
      // Just provide recommendations
      recommendations.push({
        file: imagePath,
        originalSize: `${originalSize} KB`,
        recommendation: `Convert to WebP format (estimated savings: 30-50%)`,
      });
    }
  }

  console.log('\n📊 Summary');
  console.log('==========');
  console.log(`Processed: ${processed}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);

  if (recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    recommendations.slice(0, 10).forEach(rec => {
      console.log(`   ${path.basename(rec.file)}: ${rec.recommendation}`);
    });
    if (recommendations.length > 10) {
      console.log(`   ... and ${recommendations.length - 10} more`);
    }
  }

  console.log('\n✨ Optimization complete!');
}

// Run if called directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` || import.meta.url.endsWith(process.argv[1]);
if (isMainModule || process.argv[1]?.endsWith('optimize-images.js')) {
  const directory = process.argv[2] || 'public/images';
  optimizeImages(directory).catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

export { optimizeImages };
