#!/usr/bin/env node
/**
 * Unused Assets Finder Script
 * Finds unused images, components, and animations
 *
 * Usage: node scripts/find-unused-assets.js [--images-only] [--components-only] [--animations-only]
 * Example: node scripts/find-unused-assets.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHECK_IMAGES = !process.argv.includes('--components-only') && !process.argv.includes('--animations-only');
const CHECK_COMPONENTS = !process.argv.includes('--images-only') && !process.argv.includes('--animations-only');
const CHECK_ANIMATIONS = !process.argv.includes('--images-only') && !process.argv.includes('--components-only');
const OUTPUT_PATH = 'reports/unused-assets-report.json';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🔍 Unused Assets Finder');
console.log('=======================\n');

const unusedImages = [];
const unusedComponents = [];
const unusedAnimations = [];
const imageReferences = new Set();
const componentReferences = new Set();
const animationReferences = new Set();
const allImageFiles = new Set();
const allComponentFiles = new Set();
const allAnimationFiles = new Set();

// Normalize path for comparison
function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/').toLowerCase();
}

// Extract image references from content
function extractImageReferences(content, filePath) {
  const references = [];

  // Import statements: import img from '...'
  const importRegex = /import\s+.*from\s+["']([^"']+\.(jpg|jpeg|png|gif|webp|svg|avif))["']/gi;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    references.push(match[1]);
  }

  // JSX src attributes: <img src="..." />
  const srcRegex = /src=["']([^"']+)["']/gi;
  while ((match = srcRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i) || src.includes('/images/') || src.includes('/apps/')) {
      references.push(src);
    }
  }

  // CSS background-image: url(...)
  const bgRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
      references.push(src);
    }
  }

  // JSON data files - check image paths
  if (filePath.endsWith('.json')) {
    try {
      const data = JSON.parse(content);
      const jsonStr = JSON.stringify(data);
      const jsonImageRegex = /["']([^"']*\/images\/[^"']*\.(jpg|jpeg|png|gif|webp|svg|avif))["']/gi;
      while ((match = jsonImageRegex.exec(jsonStr)) !== null) {
        references.push(match[1]);
      }
    } catch (e) {
      // Not valid JSON or can't parse
    }
  }

  return references;
}

// Extract component references from content
function extractComponentReferences(content, filePath) {
  const references = [];

  // Import statements: import Component from '...'
  const importRegex = /import\s+(?:\{[^}]+\}|\*\s+as\s+\w+|\w+)\s+from\s+["']([^"']+)["']/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    references.push(match[1]);
  }

  // Dynamic imports: import('...')
  const dynamicImportRegex = /import\(["']([^"']+)["']\)/g;
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    references.push(match[1]);
  }

  // React.lazy: React.lazy(() => import('...'))
  const lazyImportRegex = /React\.lazy\(\(\)\s*=>\s*import\(["']([^"']+)["']\)\)/g;
  while ((match = lazyImportRegex.exec(content)) !== null) {
    references.push(match[1]);
  }

  return references;
}

// Resolve import path to actual file
function resolveImportPath(importPath, fromFile) {
  // Skip node_modules and external packages
  if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
    return null;
  }

  const fromDir = path.dirname(fromFile);
  let resolvedPath = path.resolve(fromDir, importPath);

  // Try different extensions
  const extensions = ['.ts', '.tsx', '.js', '.jsx', ''];
  for (const ext of extensions) {
    const testPath = resolvedPath + ext;
    if (fs.existsSync(testPath)) {
      return path.relative(process.cwd(), testPath);
    }

    // Try index files
    const indexPath = path.join(resolvedPath, 'index' + ext);
    if (fs.existsSync(indexPath)) {
      return path.relative(process.cwd(), indexPath);
    }
  }

  return null;
}

// Check if image is referenced
function isImageReferenced(imagePath) {
  const normalized = normalizePath(imagePath);
  const basename = path.basename(imagePath);
  const basenameNoExt = path.basename(imagePath, path.extname(imagePath));

  for (const ref of imageReferences) {
    const refNormalized = normalizePath(ref);
    const refBasename = path.basename(ref);
    const refBasenameNoExt = path.basename(ref, path.extname(ref));

    // Exact match
    if (refNormalized.includes(normalized) || normalized.includes(refNormalized)) {
      return true;
    }

    // Basename match
    if (refBasename.toLowerCase() === basename.toLowerCase()) {
      return true;
    }

    // Basename without extension match
    if (refBasenameNoExt.toLowerCase() === basenameNoExt.toLowerCase()) {
      return true;
    }

    // Check if reference contains the image path
    if (ref.includes('/images/') && imagePath.includes('/images/')) {
      const refImagePath = ref.split('/images/')[1];
      const imageImagePath = imagePath.split('/images/')[1];
      if (refImagePath && imageImagePath && normalizePath(refImagePath) === normalizePath(imageImagePath)) {
        return true;
      }
    }
  }

  return false;
}

// Check if component is referenced
function isComponentReferenced(componentPath) {
  const normalized = normalizePath(componentPath);
  const basename = path.basename(componentPath, path.extname(componentPath));

  for (const ref of componentReferences) {
    const resolved = resolveImportPath(ref, process.cwd());
    if (resolved && normalizePath(resolved) === normalized) {
      return true;
    }

    // Check basename match
    const refBasename = path.basename(ref, path.extname(ref));
    if (refBasename === basename) {
      return true;
    }
  }

  return false;
}

// Scan source files for references
function scanSourceFiles() {
  console.log('📁 Scanning source files for references...\n');

  const srcDir = path.join(process.cwd(), 'src');
  const publicDir = path.join(process.cwd(), 'public');

  function scanDirectory(dir, fileList = []) {
    if (!fs.existsSync(dir)) {
      return fileList;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(process.cwd(), fullPath);

      if (relativePath.includes('node_modules') || relativePath.includes('.git')) {
        continue;
      }

      if (entry.isDirectory()) {
        scanDirectory(fullPath, fileList);
      } else if (entry.isFile()) {
        if (entry.name.match(/\.(tsx|ts|jsx|js|css|json)$/)) {
          fileList.push(fullPath);
        }
      }
    }

    return fileList;
  }

  const sourceFiles = [
    ...scanDirectory(srcDir),
    ...scanDirectory(publicDir),
  ];

  console.log(`Found ${sourceFiles.length} source file(s)\n`);

  // Extract references
  for (const filePath of sourceFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(process.cwd(), filePath);

      if (CHECK_IMAGES) {
        const imgRefs = extractImageReferences(content, filePath);
        imgRefs.forEach(ref => imageReferences.add(ref));
      }

      if (CHECK_COMPONENTS || CHECK_ANIMATIONS) {
        const compRefs = extractComponentReferences(content, filePath);
        compRefs.forEach(ref => componentReferences.add(ref));
      }
    } catch (error) {
      console.warn(`⚠️  Could not read file: ${filePath}`);
    }
  }

  console.log(`Found ${imageReferences.size} image reference(s)`);
  console.log(`Found ${componentReferences.size} component reference(s)\n`);
}

// Find all image files
function findImageFiles() {
  if (!CHECK_IMAGES) return;

  console.log('🖼️  Scanning for image files...\n');

  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');

  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) {
      return;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(publicDir, fullPath).replace(/\\/g, '/');

      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && entry.name.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
        const publicPath = '/' + relativePath;
        allImageFiles.add(publicPath);
      }
    }
  }

  scanDirectory(imagesDir);
  scanDirectory(path.join(publicDir, 'apps'));

  console.log(`Found ${allImageFiles.size} image file(s)\n`);

  // Check which images are unused
  for (const imagePath of allImageFiles) {
    if (!isImageReferenced(imagePath)) {
      const fullPath = path.join(publicDir, imagePath.slice(1));
      const stat = fs.statSync(fullPath);
      unusedImages.push({
        path: imagePath,
        size: stat.size,
      });
    }
  }

  console.log(`Found ${unusedImages.length} unused image(s)`);
}

// Find all component files
function findComponentFiles() {
  if (!CHECK_COMPONENTS) return;

  console.log('\n🧩 Scanning for component files...\n');

  const srcDir = path.join(process.cwd(), 'src');
  const componentsDir = path.join(srcDir, 'components');

  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) {
      return;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(process.cwd(), fullPath);

      if (relativePath.includes('node_modules')) {
        continue;
      }

      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && entry.name.match(/\.(tsx|ts|jsx|js)$/)) {
        // Skip index files and test files
        if (entry.name === 'index.ts' || entry.name === 'index.tsx' || entry.name.match(/\.(test|spec)\./)) {
          continue;
        }
        allComponentFiles.add(relativePath);
      }
    }
  }

  scanDirectory(componentsDir);

  console.log(`Found ${allComponentFiles.size} component file(s)\n`);

  // Check which components are unused
  // Entry points are always used
  const entryPoints = new Set([
    'src/main.tsx',
    'src/App.tsx',
    'src/router/AppRouter.tsx',
  ]);

  for (const componentPath of allComponentFiles) {
    if (entryPoints.has(componentPath)) {
      continue;
    }

    if (!isComponentReferenced(componentPath)) {
      const fullPath = path.join(process.cwd(), componentPath);
      const stat = fs.statSync(fullPath);
      unusedComponents.push({
        path: componentPath,
        size: stat.size,
      });
    }
  }

  console.log(`Found ${unusedComponents.length} unused component(s)`);
}

// Find all animation component files
function findAnimationFiles() {
  if (!CHECK_ANIMATIONS) return;

  console.log('\n🎬 Scanning for animation component files...\n');

  const animationsDir = path.join(process.cwd(), 'src', 'components', 'animations');

  if (!fs.existsSync(animationsDir)) {
    return;
  }

  const entries = fs.readdirSync(animationsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.match(/\.(tsx|ts)$/) && !entry.name.match(/\.(test|spec)\./)) {
      const relativePath = path.relative(process.cwd(), path.join(animationsDir, entry.name));
      allAnimationFiles.add(relativePath);
    }
  }

  console.log(`Found ${allAnimationFiles.size} animation component file(s)\n`);

  // Check which animations are unused
  for (const animationPath of allAnimationFiles) {
    if (!isComponentReferenced(animationPath)) {
      const fullPath = path.join(process.cwd(), animationPath);
      const stat = fs.statSync(fullPath);
      unusedAnimations.push({
        path: animationPath,
        size: stat.size,
      });
    }
  }

  console.log(`Found ${unusedAnimations.length} unused animation component(s)`);
}

// Generate report
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      unusedImages: unusedImages.length,
      unusedComponents: unusedComponents.length,
      unusedAnimations: unusedAnimations.length,
      totalUnusedSize: [
        ...unusedImages,
        ...unusedComponents,
        ...unusedAnimations,
      ].reduce((sum, item) => sum + item.size, 0),
    },
    unusedImages: unusedImages.slice(0, 50),
    unusedComponents: unusedComponents.slice(0, 50),
    unusedAnimations: unusedAnimations.slice(0, 50),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  console.log('\n📊 Unused Assets Report');
  console.log('======================');
  console.log(
    `Unused Images:     ${report.summary.unusedImages} ${report.summary.unusedImages === 0 ? '✅' : '⚠️'}`
  );
  console.log(
    `Unused Components: ${report.summary.unusedComponents} ${report.summary.unusedComponents === 0 ? '✅' : '⚠️'}`
  );
  console.log(
    `Unused Animations: ${report.summary.unusedAnimations} ${report.summary.unusedAnimations === 0 ? '✅' : '⚠️'}`
  );

  const unusedMB = (report.summary.totalUnusedSize / 1024 / 1024).toFixed(2);
  if (report.summary.totalUnusedSize > 0) {
    console.log(`Total Unused Size: ${unusedMB} MB`);
  }

  if (unusedImages.length > 0) {
    console.log('\n⚠️  Unused Images (sample):');
    unusedImages.slice(0, 10).forEach(img => {
      console.log(`   - ${img.path} (${(img.size / 1024).toFixed(2)} KB)`);
    });
  }

  if (unusedAnimations.length > 0) {
    console.log('\n⚠️  Unused Animation Components (sample):');
    unusedAnimations.slice(0, 10).forEach(anim => {
      console.log(`   - ${anim.path}`);
    });
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);
}

// Main execution
scanSourceFiles();
findImageFiles();
findComponentFiles();
findAnimationFiles();
generateReport();

