#!/usr/bin/env node
/**
 * Dead Code Finder Script
 * Finds potentially unused exports, files, and CSS
 *
 * Usage: node scripts/find-dead-code.js [--check-exports] [--check-files] [--check-css]
 * Example: node scripts/find-dead-code.js --check-exports --check-files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHECK_EXPORTS =
  process.argv.includes('--check-exports') ||
  (!process.argv.includes('--check-files') && !process.argv.includes('--check-css'));
const CHECK_FILES = process.argv.includes('--check-files');
const CHECK_CSS = process.argv.includes('--check-css');
const OUTPUT_PATH = 'reports/dead-code-report.json';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🔍 Dead Code Finder');
console.log('==================\n');

const unusedExports = [];
const unusedFiles = [];
const unusedCSS = [];
const allExports = new Map();
const allImports = new Set();
const allFiles = new Set();
const cssClasses = new Set();
const usedCSSClasses = new Set();

// Extract exports from file
function extractExports(filePath, content) {
  const exports = [];

  // Named exports: export const/function/class
  const namedExportRegex = /export\s+(?:const|function|class|interface|type|enum)\s+(\w+)/g;
  let match;
  while ((match = namedExportRegex.exec(content)) !== null) {
    exports.push({ name: match[1], type: 'named', file: filePath });
  }

  // Default exports
  const defaultExportRegex = /export\s+default\s+(?:class|function|const)?\s*(\w+)?/;
  const defaultMatch = content.match(defaultExportRegex);
  if (defaultMatch) {
    exports.push({ name: defaultMatch[1] || 'default', type: 'default', file: filePath });
  }

  // Export from statements
  const exportFromRegex = /export\s+\{[^}]+\}\s+from\s+["']([^"']+)["']/g;
  while ((match = exportFromRegex.exec(content)) !== null) {
    const importPath = match[1];
    // This is a re-export, mark the source file
    exports.push({ name: '*', type: 're-export', file: filePath, source: importPath });
  }

  return exports;
}

// Extract imports from file
function extractImports(filePath, content) {
  const imports = [];

  // Import statements
  const importRegex = /import\s+(?:\{[^}]+\}|\*\s+as\s+\w+|\w+)\s+from\s+["']([^"']+)["']/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    imports.push({ path: importPath, file: filePath });
    allImports.add(importPath);
  }

  // Dynamic imports
  const dynamicImportRegex = /import\(["']([^"']+)["']\)/g;
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    const importPath = match[1];
    imports.push({ path: importPath, file: filePath });
    allImports.add(importPath);
  }

  return imports;
}

// Extract CSS classes from file
function extractCSSClasses(content) {
  const classes = [];

  // className="..." or class="..."
  const classNameRegex = /(?:className|class)=["']([^"']+)["']/g;
  let match;
  while ((match = classNameRegex.exec(content)) !== null) {
    const classNames = match[1].split(/\s+/);
    classNames.forEach(cls => {
      if (cls.trim()) {
        classes.push(cls.trim());
        usedCSSClasses.add(cls.trim());
      }
    });
  }

  return classes;
}

// Resolve import path
function resolveImportPath(importPath, fromFile) {
  // Skip node_modules
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
      return testPath;
    }

    // Try index files
    const indexPath = path.join(resolvedPath, 'index' + ext);
    if (fs.existsSync(indexPath)) {
      return indexPath;
    }
  }

  return resolvedPath;
}

// Scan source files
function scanSourceFiles() {
  console.log('📁 Scanning source files...\n');

  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    console.log('⚠️  src directory not found');
    return;
  }

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !filePath.includes('node_modules')) {
        scanDirectory(filePath);
      } else if (file.match(/\.(tsx|ts|jsx|js)$/)) {
        const relativePath = path.relative(process.cwd(), filePath);
        allFiles.add(relativePath);

        const content = fs.readFileSync(filePath, 'utf-8');

        if (CHECK_EXPORTS) {
          const exports = extractExports(relativePath, content);
          exports.forEach(exp => {
            const key = `${relativePath}:${exp.name}`;
            allExports.set(key, exp);
          });
        }

        extractImports(relativePath, content);
        extractCSSClasses(content);
      }
    });
  }

  scanDirectory(srcDir);

  console.log(`Found ${allFiles.size} source file(s)`);
  if (CHECK_EXPORTS) {
    console.log(`Found ${allExports.size} export(s)`);
  }
  console.log(`Found ${allImports.size} import(s)\n`);
}

// Check for unused exports
function checkUnusedExports() {
  if (!CHECK_EXPORTS) return;

  console.log('🔍 Checking for unused exports...\n');

  allExports.forEach((exportInfo, key) => {
    const [filePath, exportName] = key.split(':');

    // Skip if it's a re-export or default export (harder to track)
    if (exportInfo.type === 're-export' || exportInfo.type === 'default') {
      return;
    }

    // Check if exported name is imported anywhere
    let isUsed = false;
    allFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      // Check for import of this specific export
      const importRegex = new RegExp(
        `import\\s+.*\\{[^}]*\\b${exportName}\\b[^}]*\\}.*from\\s+["']([^"']+)["']`
      );
      if (importRegex.test(content)) {
        const importPath = content.match(importRegex)[1];
        const resolvedPath = resolveImportPath(importPath, file);
        const exportFilePath = path.resolve(process.cwd(), filePath);

        if (resolvedPath && resolvedPath === exportFilePath) {
          isUsed = true;
        }
      }
    });

    if (!isUsed) {
      unusedExports.push(exportInfo);
    }
  });

  console.log(`Found ${unusedExports.length} potentially unused export(s)`);
}

// Check for unused files
function checkUnusedFiles() {
  if (!CHECK_FILES) return;

  console.log('🔍 Checking for unused files...\n');

  // Files that are definitely used
  const usedFiles = new Set();

  // Entry points
  usedFiles.add('src/main.tsx');
  usedFiles.add('src/App.tsx');
  usedFiles.add('src/router/AppRouter.tsx');

  // Files imported anywhere
  allImports.forEach(importPath => {
    allFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      if (content.includes(importPath)) {
        const resolvedPath = resolveImportPath(importPath, file);
        if (resolvedPath) {
          const relativePath = path.relative(process.cwd(), resolvedPath);
          if (allFiles.has(relativePath)) {
            usedFiles.add(relativePath);
          }
        }
      }
    });
  });

  // Find unused files
  allFiles.forEach(file => {
    if (!usedFiles.has(file) && !file.includes('.test.') && !file.includes('.spec.')) {
      unusedFiles.push(file);
    }
  });

  console.log(`Found ${unusedFiles.length} potentially unused file(s)`);
}

// Check for unused CSS classes
function checkUnusedCSS() {
  if (!CHECK_CSS) return;

  console.log('🔍 Checking for unused CSS classes...\n');

  // Scan CSS files
  const cssDir = path.join(process.cwd(), 'src');
  function scanCSSFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !filePath.includes('node_modules')) {
        scanCSSFiles(filePath);
      } else if (file.endsWith('.css')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Extract class names from CSS
        const classRegex = /\.([a-zA-Z][a-zA-Z0-9_-]*)/g;
        let match;
        while ((match = classRegex.exec(content)) !== null) {
          cssClasses.add(match[1]);
        }
      }
    });
  }

  scanCSSFiles(cssDir);

  // Find unused classes
  cssClasses.forEach(className => {
    if (!usedCSSClasses.has(className)) {
      unusedCSS.push(className);
    }
  });

  console.log(`Found ${unusedCSS.length} potentially unused CSS class(es)`);
}

// Generate report
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      unusedExports: unusedExports.length,
      unusedFiles: unusedFiles.length,
      unusedCSS: unusedCSS.length,
    },
    unusedExports: unusedExports.slice(0, 50),
    unusedFiles: unusedFiles.slice(0, 50),
    unusedCSS: unusedCSS.slice(0, 50),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  console.log('\n📊 Dead Code Report');
  console.log('===================');
  console.log(
    `Unused Exports:  ${report.summary.unusedExports} ${report.summary.unusedExports === 0 ? '✅' : '⚠️'}`
  );
  console.log(
    `Unused Files:    ${report.summary.unusedFiles} ${report.summary.unusedFiles === 0 ? '✅' : '⚠️'}`
  );
  console.log(
    `Unused CSS:      ${report.summary.unusedCSS} ${report.summary.unusedCSS === 0 ? '✅' : '⚠️'}`
  );

  if (unusedExports.length > 0) {
    console.log('\n⚠️  Potentially Unused Exports (sample):');
    unusedExports.slice(0, 10).forEach(exp => {
      console.log(`   - ${exp.name} in ${exp.file}`);
    });
  }

  if (unusedFiles.length > 0) {
    console.log('\n⚠️  Potentially Unused Files (sample):');
    unusedFiles.slice(0, 10).forEach(file => {
      console.log(`   - ${file}`);
    });
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);
  console.log('\n💡 Note: This is a heuristic analysis. Review carefully before removing code.');
}

// Run analysis
scanSourceFiles();
checkUnusedExports();
checkUnusedFiles();
checkUnusedCSS();
generateReport();
