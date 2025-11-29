#!/usr/bin/env node
/**
 * Cleanup Side Projects Manifest
 * Updates manifest.json to only include files that actually exist
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();
const sideProjectsDir = path.join(projectRoot, 'public', 'images', 'side-projects');
const manifestPath = path.join(sideProjectsDir, 'manifest.json');

// Get all actual files in side-projects directory
function getActualFiles() {
  if (!fs.existsSync(sideProjectsDir)) {
    return [];
  }

  const files = fs.readdirSync(sideProjectsDir);
  return files
    .filter(file => {
      const filePath = path.join(sideProjectsDir, file);
      const stat = fs.statSync(filePath);
      return stat.isFile() && file !== 'manifest.json';
    })
    .sort();
}

// Update manifest with only existing files
function updateManifest() {
  const actualFiles = getActualFiles();

  console.log('📁 Files actually in side-projects/:');
  actualFiles.forEach(file => console.log(`   - ${file}`));

  // Read current manifest
  let currentManifest = [];
  if (fs.existsSync(manifestPath)) {
    try {
      currentManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    } catch (error) {
      console.warn('⚠️  Could not parse existing manifest.json');
    }
  }

  console.log(`\n📋 Current manifest has ${currentManifest.length} entries`);
  console.log(`📋 Actual files: ${actualFiles.length}`);

  // Find files in manifest that don't exist
  const missingFiles = currentManifest.filter(file => !actualFiles.includes(file));
  if (missingFiles.length > 0) {
    console.log(`\n❌ Files in manifest that don't exist (${missingFiles.length}):`);
    missingFiles.forEach(file => console.log(`   - ${file}`));
  }

  // Find files that exist but aren't in manifest
  const newFiles = actualFiles.filter(file => !currentManifest.includes(file));
  if (newFiles.length > 0) {
    console.log(`\n➕ Files that exist but aren't in manifest (${newFiles.length}):`);
    newFiles.forEach(file => console.log(`   + ${file}`));
  }

  // Write updated manifest
  const updatedManifest = actualFiles;
  fs.writeFileSync(manifestPath, JSON.stringify(updatedManifest, null, 2) + '\n');

  console.log(`\n✅ Updated manifest.json with ${updatedManifest.length} files`);
  console.log(`   Removed ${missingFiles.length} missing entries`);
  console.log(`   Added ${newFiles.length} new entries`);

  return {
    removed: missingFiles,
    added: newFiles,
    total: updatedManifest.length,
  };
}

// Main execution
function main() {
  console.log('🧹 Cleaning up side-projects manifest.json\n');
  console.log('='.repeat(60));

  const result = updateManifest();

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary');
  console.log('='.repeat(60));
  console.log(`Total files in manifest: ${result.total}`);
  console.log(`Removed entries: ${result.removed.length}`);
  console.log(`Added entries: ${result.added.length}`);

  if (result.removed.length > 0) {
    console.log('\n💡 Note: Removed entries were files that no longer exist');
    console.log('   (likely moved to projects/ folder)');
  }
}

main();

