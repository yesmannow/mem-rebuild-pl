#!/usr/bin/env node

/**
 * Automatic unused package cleanup script
 * Uses depcheck to identify unused dependencies and removes them from package.json
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');
const packageJsonPath = resolve(rootDir, 'package.json');

console.log('🔍 Running depcheck to find unused dependencies...\n');

try {
  // Run depcheck and capture output
  const depcheckOutput = execSync('npx depcheck --json', {
    cwd: rootDir,
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe']
  });

  const depcheckResults = JSON.parse(depcheckOutput);
  const unusedDeps = depcheckResults.dependencies || [];

  if (unusedDeps.length === 0) {
    console.log('✅ No unused dependencies found!');
    process.exit(0);
  }

  console.log(`Found ${unusedDeps.length} unused dependencies:\n`);
  unusedDeps.forEach(dep => console.log(`  - ${dep}`));
  console.log('');

  // Read package.json
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  // Remove unused dependencies
  let removedCount = 0;
  unusedDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      delete packageJson.dependencies[dep];
      removedCount++;
    }
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      delete packageJson.devDependencies[dep];
      removedCount++;
    }
  });

  // Sort dependencies alphabetically
  if (packageJson.dependencies) {
    const sortedDeps = {};
    Object.keys(packageJson.dependencies).sort().forEach(key => {
      sortedDeps[key] = packageJson.dependencies[key];
    });
    packageJson.dependencies = sortedDeps;
  }

  if (packageJson.devDependencies) {
    const sortedDevDeps = {};
    Object.keys(packageJson.devDependencies).sort().forEach(key => {
      sortedDevDeps[key] = packageJson.devDependencies[key];
    });
    packageJson.devDependencies = sortedDevDeps;
  }

  // Write updated package.json
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  console.log(`✅ Removed ${removedCount} unused dependencies from package.json`);
  console.log('\n🔄 Running npm install to update lockfile...\n');

  // Run npm install
  execSync('npm install', {
    cwd: rootDir,
    stdio: 'inherit'
  });

  console.log('\n✅ Cleanup complete!');

} catch (error) {
  console.error('❌ Error running depcheck or cleanup:');
  console.error(error.message);
  process.exit(1);
}
