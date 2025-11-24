#!/usr/bin/env node
/**
 * List Unused Images Script
 * Finds images in public/images that are not referenced in any JSX, TSX, or MDX files
 * and optionally moves them to archive/images-unused/
 * 
 * Usage: 
 *   npm run audit:images           # List unused images
 *   npm run audit:images -- --move # Move unused images to archive
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.resolve(__dirname, '../public/images');
const archiveDir = path.resolve(__dirname, '../archive/images-unused');
const srcDirs = ['../src', '../content'].map(p => path.resolve(__dirname, p));

const getAllImageFiles = (): string[] =>
  globSync(`${imageDir}/**/*.{png,jpg,jpeg,webp,avif,svg}`, { nodir: true });

const getAllProjectFiles = (): string[] =>
  srcDirs.flatMap(dir => {
    if (!fs.existsSync(dir)) return [];
    return globSync(`${dir}/**/*.{tsx,ts,jsx,js,md,mdx}`, { nodir: true });
  });

const isImageUsed = (imagePath: string, projectFiles: string[]): boolean => {
  const relativePath = imagePath.split('public')[1]?.replace(/\\/g, '/');
  if (!relativePath) return true; // Safe default
  
  return projectFiles.some(file => {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      // Check for various reference patterns
      return content.includes(relativePath) || 
             content.includes(relativePath.replace('/images/', '')) ||
             content.includes(path.basename(imagePath));
    } catch (e) {
      return false;
    }
  });
};

const moveToArchive = (filePath: string) => {
  const relative = path.relative(imageDir, filePath);
  const dest = path.join(archiveDir, relative);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(filePath, dest);
};

const formatSize = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
};

const runAudit = () => {
  console.log('🔍 Scanning for unused images...\n');
  
  const allImages = getAllImageFiles();
  const allFiles = getAllProjectFiles();
  
  console.log(`📁 Found ${allFiles.length} source files to scan`);
  console.log(`🖼️  Found ${allImages.length} total images\n`);

  const unusedImages = allImages.filter(img => !isImageUsed(img, allFiles));

  if (unusedImages.length === 0) {
    console.log('✅ No unused images found!');
    return;
  }

  // Calculate sizes
  let totalSize = 0;
  const imageStats = unusedImages.map(img => {
    const stat = fs.statSync(img);
    totalSize += stat.size;
    return {
      path: img,
      size: stat.size,
      relative: path.relative(imageDir, img)
    };
  });

  // Sort by size descending
  imageStats.sort((a, b) => b.size - a.size);

  console.log(`⚠️  Found ${unusedImages.length} unused images:\n`);

  // Show top 20 largest
  const topImages = imageStats.slice(0, 20);
  topImages.forEach(({ relative, size }) => {
    console.log(`  ${relative} (${formatSize(size)})`);
  });

  if (imageStats.length > 20) {
    console.log(`\n  ... and ${imageStats.length - 20} more images`);
  }

  console.log(`\n💾 Total unused image size: ${formatSize(totalSize)}`);

  // Check if we should move files
  const shouldMove = process.argv.includes('--move');
  
  if (shouldMove) {
    if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true });
    }

    console.log(`\n📦 Moving ${unusedImages.length} unused image(s) to archive/images-unused/...`);
    
    let moved = 0;
    unusedImages.forEach(img => {
      try {
        moveToArchive(img);
        moved++;
      } catch (e) {
        console.error(`Failed to move ${path.basename(img)}:`, e);
      }
    });
    
    console.log(`✅ Moved ${moved} images to archive/images-unused/`);
  } else {
    console.log(`\n💡 Run with --move flag to archive these images:`);
    console.log(`   npm run audit:images -- --move`);
  }
};

runAudit();
