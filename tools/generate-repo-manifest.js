#!/usr/bin/env node

import { readdir, readFile, stat, writeFile, mkdir } from 'fs/promises';
import { join, relative, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const repoRoot = resolve(__dirname, '..');

// Helper to check if file should be excluded
function shouldExclude(path) {
  const normalized = path.toLowerCase();
  return (
    normalized.includes('node_modules') ||
    normalized.includes('.git') ||
    normalized.includes('secret') ||
    normalized.endsWith('.env') ||
    normalized.includes('.env.')
  );
}

// Helper to check if file is a code file
function isCodeFile(path) {
  const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.cjs', '.mjs'];
  return codeExtensions.some(ext => path.toLowerCase().endsWith(ext));
}

// Helper to get file snippet (first 200 chars)
async function getFileSnippet(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    return content.substring(0, 200).trim();
  } catch {
    return '';
  }
}

// Recursive directory walker
async function walkDirectory(dir, relativePath = '') {
  const entries = [];
  try {
    const items = await readdir(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = join(dir, item.name);
      const relPath = relativePath ? join(relativePath, item.name) : item.name;
      
      if (shouldExclude(fullPath)) continue;
      
      if (item.isDirectory()) {
        entries.push(...await walkDirectory(fullPath, relPath));
      } else if (item.isFile()) {
        entries.push({
          relativePath: relPath.replace(/\\/g, '/'),
          fullPath: fullPath
        });
      }
    }
  } catch (err) {
    // Ignore permission errors
  }
  return entries;
}

// Find files matching pattern
async function findFiles(pattern) {
  const allFiles = await walkDirectory(repoRoot);
  return allFiles.filter(file => {
    const name = file.relativePath.toLowerCase();
    return pattern.test(name);
  });
}

// Get file info with size and snippet
async function getFileInfo(file) {
  try {
    const stats = await stat(file.fullPath);
    const snippet = isCodeFile(file.relativePath) && !shouldExclude(file.relativePath)
      ? await getFileSnippet(file.fullPath)
      : '';
    
    return {
      path: file.relativePath,
      size: stats.size,
      ...(snippet && { snippet })
    };
  } catch {
    return {
      path: file.relativePath,
      size: 0
    };
  }
}

// Main function
async function generateManifest() {
  const manifest = {
    generatedAt: new Date().toISOString(),
    repoRoot: relative(process.cwd(), repoRoot) || '.',
    tailwindConfig: null,
    globalStyles: [],
    motionFiles: [],
    pages: [],
    components: [],
    package: {
      path: null,
      name: null,
      version: null
    },
    storybook: false,
    envPresent: false
  };

  // Find tailwind config
  const tailwindFiles = await findFiles(/^tailwind\.config\.(js|cjs)$/);
  if (tailwindFiles.length > 0) {
    manifest.tailwindConfig = await getFileInfo(tailwindFiles[0]);
  }

  // Find global styles under src/styles
  const allFiles = await walkDirectory(repoRoot);
  const styleFiles = allFiles.filter(file => {
    const normalized = file.relativePath.replace(/\\/g, '/');
    return normalized.startsWith('src/styles/') && normalized.endsWith('.css');
  });
  manifest.globalStyles = await Promise.all(styleFiles.map(getFileInfo));

  // Find motion files (*Motion* or animationVariants)
  const motionFiles = allFiles.filter(file => {
    const name = file.relativePath.toLowerCase();
    return (
      name.includes('motion') ||
      name.includes('animationvariants') ||
      name.includes('animation-variants')
    );
  });
  manifest.motionFiles = await Promise.all(motionFiles.map(getFileInfo));

  // Find pages under src/pages
  const pageFiles = allFiles.filter(file => 
    file.relativePath.startsWith('src/pages/')
  );
  // Group by directory structure
  const pageMap = new Map();
  for (const file of pageFiles) {
    const parts = file.relativePath.replace('src/pages/', '').split('/');
    const dir = parts.length > 1 ? parts[0] : 'root';
    if (!pageMap.has(dir)) {
      pageMap.set(dir, []);
    }
    pageMap.get(dir).push(await getFileInfo(file));
  }
  manifest.pages = Array.from(pageMap.entries()).map(([dir, files]) => ({
    directory: dir === 'root' ? null : dir,
    files
  }));

  // Find component directories under src/components
  const componentFiles = allFiles.filter(file => 
    file.relativePath.startsWith('src/components/')
  );
  const componentMap = new Map();
  for (const file of componentFiles) {
    const parts = file.relativePath.replace('src/components/', '').split('/');
    const dir = parts.length > 1 ? parts[0] : 'root';
    if (!componentMap.has(dir)) {
      componentMap.set(dir, []);
    }
    componentMap.get(dir).push(await getFileInfo(file));
  }
  manifest.components = Array.from(componentMap.entries()).map(([dir, files]) => ({
    directory: dir === 'root' ? null : dir,
    files: files.slice(0, 10) // Limit to first 10 files per directory for brevity
  }));

  // Get package.json info
  const packageJsonPath = join(repoRoot, 'package.json');
  try {
    const packageContent = await readFile(packageJsonPath, 'utf-8');
    const packageData = JSON.parse(packageContent);
    manifest.package = {
      path: 'package.json',
      name: packageData.name || null,
      version: packageData.version || null
    };
  } catch {
    // package.json not found or invalid
  }

  // Check for Storybook config
  const storybookDirs = allFiles.filter(file => 
    file.relativePath.startsWith('.storybook/')
  );
  manifest.storybook = storybookDirs.length > 0;

  // Check for .env file (boolean only)
  const envFiles = allFiles.filter(file => 
    file.relativePath === '.env' || file.relativePath.startsWith('.env.')
  );
  manifest.envPresent = envFiles.length > 0;

  return manifest;
}

// Run and write output
generateManifest()
  .then(async manifest => {
    const manifestPath = join(repoRoot, 'tools', 'repo-manifest.json');
    // Ensure tools directory exists
    await mkdir(dirname(manifestPath), { recursive: true });
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    return manifestPath;
  })
  .then(manifestPath => {
    console.log(`Wrote manifest to ${relative(process.cwd(), manifestPath)}`);
  })
  .catch(err => {
    console.error('Error generating manifest:', err);
    process.exit(1);
  });

