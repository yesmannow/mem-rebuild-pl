#!/usr/bin/env node
/**
 * Image Checker Script
 * Validates image references and finds missing/broken images
 *
 * Usage: node scripts/check-images.js [--check-dist] [--check-src]
 * Example: node scripts/check-images.js --check-dist --check-src
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHECK_DIST = process.argv.includes('--check-dist');
const CHECK_SRC = process.argv.includes('--check-src') || !CHECK_DIST;
const OUTPUT_PATH = 'reports/image-check-report.json';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🖼️  Image Checker');
console.log('================\n');

const missingImages = [];
const foundImages = [];
const unusedImages = [];
const imageReferences = new Set();
const imageFiles = new Set();

// Extract image references from HTML/JSX
function extractImageReferences(content, filePath) {
  const images = [];

  // Match src="..." or src='...'
  const srcRegex = /src=["']([^"']+)["']/gi;
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    const src = match[1];
    if (
      src.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i) ||
      src.includes('/images/') ||
      src.includes('/apps/')
    ) {
      images.push({ src, file: filePath });
      imageReferences.add(src);
    }
  }

  // Match background-image: url(...)
  const bgRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
      images.push({ src, file: filePath });
      imageReferences.add(src);
    }
  }

  // Match import statements
  const importRegex = /import\s+.*from\s+["']([^"']+\.(jpg|jpeg|png|gif|webp|svg|avif))["']/gi;
  while ((match = importRegex.exec(content)) !== null) {
    const src = match[1];
    images.push({ src, file: filePath });
    imageReferences.add(src);
  }

  return images;
}

// Resolve image path
function resolveImagePath(imageSrc, baseDir) {
  // Remove query strings and fragments
  const cleanSrc = imageSrc.split('?')[0].split('#')[0];

  // Handle absolute paths
  if (cleanSrc.startsWith('/')) {
    return path.join(process.cwd(), 'public', cleanSrc);
  }

  // Handle relative paths
  if (cleanSrc.startsWith('./') || cleanSrc.startsWith('../')) {
    return path.resolve(baseDir, cleanSrc);
  }

  // Handle public paths
  if (cleanSrc.includes('/images/') || cleanSrc.includes('/apps/')) {
    const publicPath = cleanSrc.startsWith('/') ? cleanSrc.slice(1) : cleanSrc;
    return path.join(process.cwd(), 'public', publicPath);
  }

  // Try relative to baseDir
  return path.resolve(baseDir, cleanSrc);
}

// Check if image exists
function checkImageExists(imagePath) {
  if (fs.existsSync(imagePath)) {
    const stat = fs.statSync(imagePath);
    return { exists: true, size: stat.size };
  }

  // Try with different extensions
  const ext = path.extname(imagePath);
  const basePath = imagePath.replace(ext, '');
  const altExtensions = ['.webp', '.jpg', '.png', '.svg'];

  for (const altExt of altExtensions) {
    if (altExt !== ext) {
      const altPath = basePath + altExt;
      if (fs.existsSync(altPath)) {
        const stat = fs.statSync(altPath);
        return { exists: true, size: stat.size, altPath: altPath };
      }
    }
  }

  return { exists: false };
}

// Scan source files
function scanSourceFiles() {
  if (!CHECK_SRC) return;

  console.log('📁 Scanning source files...\n');

  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    console.log('⚠️  src directory not found');
    return;
  }

  const imageRefs = [];

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !filePath.includes('node_modules')) {
        scanDirectory(filePath);
      } else if (file.match(/\.(tsx|ts|jsx|js|css)$/)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const refs = extractImageReferences(content, path.relative(process.cwd(), filePath));
        imageRefs.push(...refs);
      }
    });
  }

  scanDirectory(srcDir);

  console.log(`Found ${imageRefs.length} image reference(s)\n`);

  // Check each reference
  imageRefs.forEach(ref => {
    const imagePath = resolveImagePath(ref.src, path.dirname(ref.file));
    const check = checkImageExists(imagePath);

    if (check.exists) {
      foundImages.push({
        reference: ref.src,
        file: ref.file,
        path: check.altPath || imagePath,
        size: check.size,
      });
    } else {
      missingImages.push({
        reference: ref.src,
        file: ref.file,
        expectedPath: imagePath,
      });
    }
  });
}

// Scan dist files
function scanDistFiles() {
  if (!CHECK_DIST) return;

  console.log('📁 Scanning dist files...\n');

  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    console.log('⚠️  dist directory not found. Run: npm run build');
    return;
  }

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

  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const refs = extractImageReferences(content, path.relative(process.cwd(), file));
    refs.forEach(ref => {
      const imagePath = resolveImagePath(ref.src, path.dirname(file));
      const check = checkImageExists(imagePath);

      if (!check.exists) {
        missingImages.push({
          reference: ref.src,
          file: path.relative(process.cwd(), file),
          expectedPath: imagePath,
        });
      }
    });
  });
}

// Find all image files in public directory
function findImageFiles() {
  console.log('📁 Scanning public directory for images...\n');

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    return;
  }

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
        const relativePath = path.relative(publicDir, filePath).replace(/\\/g, '/');
        imageFiles.add('/' + relativePath);
      }
    });
  }

  scanDirectory(publicDir);

  console.log(`Found ${imageFiles.size} image file(s) in public directory\n`);

  // Find unused images
  imageFiles.forEach(imageFile => {
    // Check if referenced (exact match or with different extension)
    const baseName = path.basename(imageFile, path.extname(imageFile));
    let isUsed = false;

    imageReferences.forEach(ref => {
      const refBaseName = path.basename(ref, path.extname(ref));
      if (ref.includes(imageFile) || refBaseName === baseName) {
        isUsed = true;
      }
    });

    if (!isUsed) {
      unusedImages.push(imageFile);
    }
  });
}

// Generate report
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalReferences: imageReferences.size,
      found: foundImages.length,
      missing: missingImages.length,
      unused: unusedImages.length,
    },
    missingImages: missingImages,
    unusedImages: unusedImages.slice(0, 20), // Limit to first 20
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  // Display results
  console.log('📊 Image Check Results');
  console.log('=====================');
  console.log(`Total References: ${report.summary.totalReferences}`);
  console.log(`Found:            ${report.summary.found} ✅`);
  console.log(
    `Missing:          ${report.summary.missing} ${report.summary.missing === 0 ? '✅' : '❌'}`
  );
  console.log(
    `Unused:           ${report.summary.unused} ${report.summary.unused === 0 ? '✅' : '⚠️'}`
  );

  if (missingImages.length > 0) {
    console.log('\n❌ Missing Images:');
    missingImages.slice(0, 10).forEach(img => {
      console.log(`   - ${img.reference}`);
      console.log(`     Referenced in: ${img.file}`);
      console.log(`     Expected: ${img.expectedPath}`);
    });
    if (missingImages.length > 10) {
      console.log(`   ... and ${missingImages.length - 10} more`);
    }
  }

  if (unusedImages.length > 0) {
    console.log('\n⚠️  Potentially Unused Images (sample):');
    unusedImages.slice(0, 10).forEach(img => {
      console.log(`   - ${img}`);
    });
    if (unusedImages.length > 10) {
      console.log(`   ... and ${unusedImages.length - 10} more`);
    }
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);

  if (missingImages.length > 0) {
    process.exit(1);
  }
}

// Run checks
scanSourceFiles();
scanDistFiles();
findImageFiles();
generateReport();
