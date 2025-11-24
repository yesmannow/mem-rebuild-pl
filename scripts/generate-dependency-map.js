#!/usr/bin/env node

/**
 * Generate dependency import map
 * Shows which files import each dependency for better understanding
 */

import { execSync } from 'child_process';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const srcDir = join(rootDir, 'src');
const scriptsDir = join(rootDir, 'scripts');

console.log('🗺️  Generating dependency import map...\n');

// Read package.json to get all dependencies
const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
const allDeps = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies
};

const depMap = {};

// Function to recursively find all JS/TS files
function findFiles(dir, fileList = []) {
  try {
    const files = readdirSync(dir);
    files.forEach(file => {
      const filePath = join(dir, file);
      try {
        const stat = statSync(filePath);
        if (stat.isDirectory()) {
          if (!file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
            findFiles(filePath, fileList);
          }
        } else if (file.match(/\.(js|jsx|ts|tsx|mjs|cjs)$/)) {
          fileList.push(filePath);
        }
      } catch (e) {
        // Skip files we can't access
      }
    });
  } catch (e) {
    // Skip directories we can't access
  }
  return fileList;
}

// Find all source and script files
const allFiles = [
  ...findFiles(srcDir),
  ...findFiles(scriptsDir)
];

console.log(`Found ${allFiles.length} files to analyze\n`);

// Analyze each file for imports
allFiles.forEach(filePath => {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const relativePath = relative(rootDir, filePath);
    
    // Match import statements
    const importRegex = /(?:import|require)\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)?\s*(?:,?\s*\{[^}]*\})?\s*from\s+['"]([^'"]+)['"]/g;
    const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    
    let match;
    const imports = new Set();
    
    // Find ES6 imports
    while ((match = importRegex.exec(content)) !== null) {
      imports.add(match[1]);
    }
    
    // Find CommonJS requires
    while ((match = requireRegex.exec(content)) !== null) {
      imports.add(match[1]);
    }
    
    // Check each import against dependencies
    imports.forEach(importPath => {
      // Get the package name (handle scoped packages)
      let packageName = importPath;
      if (importPath.startsWith('@')) {
        const parts = importPath.split('/');
        packageName = `${parts[0]}/${parts[1]}`;
      } else {
        packageName = importPath.split('/')[0];
      }
      
      // If it's a known dependency, add to map
      if (allDeps[packageName]) {
        if (!depMap[packageName]) {
          depMap[packageName] = [];
        }
        if (!depMap[packageName].includes(relativePath)) {
          depMap[packageName].push(relativePath);
        }
      }
    });
  } catch (e) {
    // Skip files we can't read
  }
});

// Generate visual tree
let output = '# Dependency Import Map\n\n';
output += `Generated: ${new Date().toISOString()}\n\n`;
output += '## Dependencies and Their Usage\n\n';

const sortedDeps = Object.keys(depMap).sort();
const unusedDeps = Object.keys(allDeps).filter(dep => !depMap[dep]);

output += `### Used Dependencies (${sortedDeps.length})\n\n`;

sortedDeps.forEach(dep => {
  const files = depMap[dep].sort();
  const fileCount = files.length;
  const inSrc = files.filter(f => f.startsWith('src/')).length;
  const inScripts = files.filter(f => f.startsWith('scripts/')).length;
  
  output += `#### ${dep}\n`;
  output += `**Used in ${fileCount} file${fileCount !== 1 ? 's' : ''}** `;
  output += `(${inSrc} in src/, ${inScripts} in scripts/)\n\n`;
  output += '```\n';
  
  files.forEach(file => {
    output += `├─ ${file}\n`;
  });
  
  output += '```\n\n';
});

output += `### Potentially Unused Dependencies (${unusedDeps.length})\n\n`;

if (unusedDeps.length > 0) {
  output += 'These dependencies were not found in any imports (may be false positives):\n\n';
  unusedDeps.forEach(dep => {
    const isDev = packageJson.devDependencies && packageJson.devDependencies[dep];
    output += `- \`${dep}\` (${isDev ? 'devDependency' : 'dependency'})\n`;
  });
} else {
  output += 'All dependencies appear to be used! ✓\n';
}

output += '\n## Visual Dependency Graph\n\n';
output += '```\n';
output += 'Project Dependencies\n';
output += '├─ Core Framework\n';
if (depMap['react']) output += '│  ├─ react\n';
if (depMap['react-dom']) output += '│  ├─ react-dom\n';
if (depMap['react-router-dom']) output += '│  └─ react-router-dom\n';
output += '├─ Animation\n';
if (depMap['framer-motion']) output += '│  ├─ framer-motion\n';
if (depMap['gsap']) output += '│  └─ gsap\n';
output += '├─ UI Libraries\n';
if (depMap['lucide-react']) output += '│  ├─ lucide-react\n';
if (depMap['@radix-ui/react-navigation-menu']) output += '│  └─ @radix-ui/* (various)\n';
output += '├─ State Management\n';
if (depMap['zustand']) output += '│  ├─ zustand\n';
if (depMap['@tanstack/react-query']) output += '│  └─ @tanstack/react-query\n';
output += '├─ Utilities\n';
if (depMap['axios']) output += '│  ├─ axios\n';
if (depMap['cheerio']) output += '│  ├─ cheerio\n';
if (depMap['dotenv']) output += '│  └─ dotenv\n';
output += '└─ Build Tools\n';
if (depMap['vite']) output += '   ├─ vite\n';
if (depMap['typescript']) output += '   └─ typescript\n';
output += '```\n\n';

// Summary statistics
output += '## Summary Statistics\n\n';
output += `- Total dependencies: ${Object.keys(allDeps).length}\n`;
output += `- Used dependencies: ${sortedDeps.length}\n`;
output += `- Potentially unused: ${unusedDeps.length}\n`;
output += `- Files analyzed: ${allFiles.length}\n`;

// Write to file
const outputPath = join(rootDir, 'DEPENDENCY_MAP.md');
writeFileSync(outputPath, output);

console.log(`✅ Dependency map generated: DEPENDENCY_MAP.md\n`);
console.log(`Summary:`);
console.log(`- ${sortedDeps.length} dependencies are actively used`);
console.log(`- ${unusedDeps.length} dependencies appear unused`);
console.log(`- Analyzed ${allFiles.length} files\n`);

// Also output to console
console.log('Top 10 most-used dependencies:');
const topDeps = sortedDeps
  .map(dep => ({ name: dep, count: depMap[dep].length }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);

topDeps.forEach((dep, i) => {
  console.log(`${i + 1}. ${dep.name} (${dep.count} files)`);
});
