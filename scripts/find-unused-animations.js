#!/usr/bin/env node
/**
 * Unused Animation Components Finder Script
 * Tracks usage of animation components in the codebase
 *
 * Usage: node scripts/find-unused-animations.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = 'reports/unused-animations-report.json';
const ANIMATIONS_DIR = path.join(process.cwd(), 'src', 'components', 'animations');

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🎬 Unused Animation Components Finder');
console.log('=====================================\n');

const unusedAnimations = [];
const animationReferences = new Set();
const allAnimationFiles = [];

// Extract component name from file path
function getComponentName(filePath) {
  const basename = path.basename(filePath, path.extname(filePath));
  return basename;
}

// Extract animation component references from content
function extractAnimationReferences(content, filePath) {
  const references = [];

  // Import statements: import Component from '@/components/animations/...'
  const importRegex = /import\s+(?:\{[^}]+\}|\*\s+as\s+\w+|\w+)\s+from\s+["']([^"']*animations[^"']*)["']/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    references.push(match[1]);
  }

  // Import from index: import { Component } from '@/components/animations'
  const indexImportRegex = /import\s+\{([^}]+)\}\s+from\s+["']([^"']*animations[^"']*)["']/g;
  while ((match = indexImportRegex.exec(content)) !== null) {
    const imports = match[1].split(',').map(i => i.trim());
    const importPath = match[2];
    imports.forEach(imp => {
      references.push(`${importPath}/${imp}`);
    });
  }

  // Dynamic imports: import('...')
  const dynamicImportRegex = /import\(["']([^"']*animations[^"']*)["']\)/g;
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    references.push(match[1]);
  }

  // React.lazy: React.lazy(() => import('...'))
  const lazyImportRegex = /React\.lazy\(\(\)\s*=>\s*import\(["']([^"']*animations[^"']*)["']\)\)/g;
  while ((match = lazyImportRegex.exec(content)) !== null) {
    references.push(match[1]);
  }

  // Component usage in JSX: <ComponentName />
  const componentNameRegex = /<(\w+Animation|\w+Reveal|\w+Card|\w+Button|\w+Section|\w+Progress|\w+Blob|\w+Intro|\w+Elements|\w+Grid|\w+Transition)/g;
  while ((match = componentNameRegex.exec(content)) !== null) {
    references.push(match[1]);
  }

  return references;
}

// Resolve import path to actual file
function resolveImportPath(importPath, fromFile) {
  // Skip node_modules and external packages
  if (!importPath.startsWith('.') && !importPath.startsWith('/') && !importPath.startsWith('@/')) {
    return null;
  }

  // Handle @/ alias
  if (importPath.startsWith('@/')) {
    importPath = importPath.replace('@/', 'src/');
  }

  const fromDir = path.dirname(fromFile);
  let resolvedPath = path.resolve(process.cwd(), importPath);

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

// Check if animation component is referenced
function isAnimationReferenced(animationPath, animationName) {
  const normalizedPath = animationPath.replace(/\\/g, '/').toLowerCase();
  const basename = path.basename(animationPath, path.extname(animationPath));

  for (const ref of animationReferences) {
    const resolved = resolveImportPath(ref, process.cwd());
    if (resolved) {
      const resolvedNormalized = resolved.replace(/\\/g, '/').toLowerCase();
      if (resolvedNormalized === normalizedPath) {
        return true;
      }
    }

    // Check if reference contains the component name
    if (ref.toLowerCase().includes(basename.toLowerCase())) {
      return true;
    }

    // Check basename match
    const refBasename = path.basename(ref, path.extname(ref));
    if (refBasename === basename || refBasename === animationName) {
      return true;
    }
  }

  return false;
}

// Scan source files for animation references
function scanSourceFiles() {
  console.log('📁 Scanning source files for animation references...\n');

  const srcDir = path.join(process.cwd(), 'src');

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

      // Skip animations directory itself
      if (relativePath.includes('components/animations')) {
        continue;
      }

      if (entry.isDirectory()) {
        scanDirectory(fullPath, fileList);
      } else if (entry.isFile() && entry.name.match(/\.(tsx|ts|jsx|js)$/)) {
        fileList.push(fullPath);
      }
    }

    return fileList;
  }

  const sourceFiles = scanDirectory(srcDir);

  console.log(`Found ${sourceFiles.length} source file(s)\n`);

  // Extract references
  for (const filePath of sourceFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const refs = extractAnimationReferences(content, filePath);
      refs.forEach(ref => animationReferences.add(ref));
    } catch (error) {
      console.warn(`⚠️  Could not read file: ${filePath}`);
    }
  }

  console.log(`Found ${animationReferences.size} animation reference(s)\n`);
}

// Find all animation component files
function findAnimationFiles() {
  console.log('🎬 Scanning for animation component files...\n');

  if (!fs.existsSync(ANIMATIONS_DIR)) {
    console.log('⚠️  Animations directory not found');
    return;
  }

  const entries = fs.readdirSync(ANIMATIONS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.match(/\.(tsx|ts)$/) && !entry.name.match(/\.(test|spec)\./)) {
      const filePath = path.join(ANIMATIONS_DIR, entry.name);
      const relativePath = path.relative(process.cwd(), filePath);
      const stat = fs.statSync(filePath);
      const componentName = getComponentName(filePath);

      allAnimationFiles.push({
        path: filePath,
        relative: relativePath,
        name: componentName,
        filename: entry.name,
        size: stat.size,
      });
    }
  }

  console.log(`Found ${allAnimationFiles.length} animation component file(s)\n`);

  // Check which animations are unused
  for (const animationFile of allAnimationFiles) {
    if (!isAnimationReferenced(animationFile.relative, animationFile.name)) {
      unusedAnimations.push({
        path: animationFile.relative,
        name: animationFile.name,
        filename: animationFile.filename,
        size: animationFile.size,
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
      totalAnimations: allAnimationFiles.length,
      unusedAnimations: unusedAnimations.length,
      usedAnimations: allAnimationFiles.length - unusedAnimations.length,
      totalUnusedSize: unusedAnimations.reduce((sum, anim) => sum + anim.size, 0),
    },
    unusedAnimations,
    allAnimations: allAnimationFiles.map(f => ({
      path: f.relative,
      name: f.name,
      used: !unusedAnimations.some(u => u.path === f.relative),
    })),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  console.log('\n📊 Unused Animation Components Report');
  console.log('=====================================');
  console.log(
    `Total Animations:   ${report.summary.totalAnimations}`
  );
  console.log(
    `Used Animations:    ${report.summary.usedAnimations} ✅`
  );
  console.log(
    `Unused Animations:  ${report.summary.unusedAnimations} ${report.summary.unusedAnimations === 0 ? '✅' : '⚠️'}`
  );

  const unusedKB = (report.summary.totalUnusedSize / 1024).toFixed(2);
  if (report.summary.totalUnusedSize > 0) {
    console.log(`Total Unused Size: ${unusedKB} KB`);
  }

  if (unusedAnimations.length > 0) {
    console.log('\n⚠️  Unused Animation Components:');
    unusedAnimations.forEach(anim => {
      console.log(`   - ${anim.name} (${anim.path})`);
    });
  } else {
    console.log('\n✅ All animation components are being used!');
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);
}

// Main execution
scanSourceFiles();
findAnimationFiles();
generateReport();

