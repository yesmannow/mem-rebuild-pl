#!/usr/bin/env node
/**
 * Optimize Large Images - Wow Portfolio Builder
 * 
 * Compresses images >1MB in public/images/ using Sharp
 * Target: Reduce bio and photography folders from 64MB to <20MB
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.join(__dirname, '..', 'public', 'images');
const MIN_SIZE_MB = 0.5; // Only process files >500KB
const MIN_SIZE_BYTES = MIN_SIZE_MB * 1024 * 1024;

// Optimization settings
const JPEG_QUALITY = 85;
const PNG_QUALITY = 90;
const WEBP_QUALITY = 85;
const MAX_WIDTH = 1920; // Resize images wider than this
const MAX_HEIGHT = 1080;

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

async function optimizeImage(filePath) {
  const originalSize = await getFileSize(filePath);
  const ext = path.extname(filePath).toLowerCase();
  
  console.log(`\n📸 Processing: ${path.basename(filePath)} (${formatBytes(originalSize)})`);
  
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    console.log(`   Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);
    
    // Create optimized version
    let pipeline = sharp(filePath);
    
    // Resize if too large
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      });
      console.log(`   Resizing to max ${MAX_WIDTH}x${MAX_HEIGHT}`);
    }
    
    // Apply format-specific optimizations
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: WEBP_QUALITY, effort: 6 });
    } else {
      console.log(`   ⚠️  Skipping unsupported format: ${ext}`);
      return { saved: 0 };
    }
    
    // Create temp file
    const tempPath = filePath + '.tmp';
    await pipeline.toFile(tempPath);
    
    const newSize = await getFileSize(tempPath);
    const saved = originalSize - newSize;
    const percent = ((saved / originalSize) * 100).toFixed(1);
    
    console.log(`   Optimized: ${formatBytes(newSize)} (saved ${formatBytes(saved)}, ${percent}%)`);
    
    // Replace original with optimized version
    await fs.rename(tempPath, filePath);
    
    return { saved, originalSize, newSize };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return { saved: 0 };
  }
}

async function findLargeImages(dir) {
  const files = [];
  
  async function scan(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
          const size = await getFileSize(fullPath);
          if (size > MIN_SIZE_BYTES) {
            files.push({ path: fullPath, size });
          }
        }
      }
    }
  }
  
  await scan(dir);
  return files.sort((a, b) => b.size - a.size); // Largest first
}

async function main() {
  console.log('🎨 Wow Portfolio Builder - Image Optimization\n');
  console.log(`Target directory: ${TARGET_DIR}`);
  console.log(`Min file size: ${MIN_SIZE_MB} MB\n`);
  
  // Find large images
  console.log('🔍 Scanning for large images...');
  const largeImages = await findLargeImages(TARGET_DIR);
  
  if (largeImages.length === 0) {
    console.log('\n✅ No images found over 1MB. All optimized!');
    return;
  }
  
  console.log(`\n📊 Found ${largeImages.length} images over ${MIN_SIZE_MB} MB:`);
  largeImages.forEach(({ path: p, size }) => {
    console.log(`   - ${path.relative(TARGET_DIR, p)} (${formatBytes(size)})`);
  });
  
  // Optimize each image
  console.log('\n🔧 Optimizing images...');
  let totalSaved = 0;
  let totalOriginal = 0;
  
  for (const { path: imagePath, size } of largeImages) {
    const result = await optimizeImage(imagePath);
    totalSaved += result.saved || 0;
    totalOriginal += result.originalSize || size;
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Optimization Summary');
  console.log('='.repeat(60));
  console.log(`Images processed: ${largeImages.length}`);
  console.log(`Original total size: ${formatBytes(totalOriginal)}`);
  console.log(`Optimized total size: ${formatBytes(totalOriginal - totalSaved)}`);
  console.log(`Total saved: ${formatBytes(totalSaved)} (${((totalSaved / totalOriginal) * 100).toFixed(1)}%)`);
  console.log('='.repeat(60));
  console.log('\n✅ Optimization complete!');
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
