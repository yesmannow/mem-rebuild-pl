#!/usr/bin/env node
/**
 * Cleanup Photography Duplicates
 * Removes duplicate photo-XX files and updates manifest to include all real photography
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();
const photographyDir = path.join(projectRoot, 'public', 'images', 'photography');
const manifestPath = path.join(photographyDir, 'manifest.json');

const DRY_RUN = process.argv.includes('--dry-run');

// Patterns for duplicate files to remove
const DUPLICATE_PATTERNS = [
  /^photo-\d{3}\.webp$/i,  // photo-001.webp, photo-002.webp, etc.
  /^photo-\d{2}\.webp$/i,   // photo-01.webp, photo-02.webp, etc.
  /^photo-\d{2}\.avif$/i,   // photo-01.avif, photo-02.avif, etc.
];

// Files to always keep (real photography files)
function isRealPhoto(filename) {
  // Real photos have date stamps or descriptive names
  return (
    /^\d{8}_/.test(filename) ||           // 20240704_175213.webp
    /^img_\d{8}_/.test(filename) ||        // img_20230604_154323_912.webp
    /^psx_\d{8}_/.test(filename) ||        // psx_20240717_043437.webp
    /^\d+-\d+\./.test(filename) ||          // 00100dportrait_00100_burst...
    /^00100dportrait/.test(filename) ||     // 00100dportrait_00100_burst...
    /^1000000219-1\./.test(filename) ||     // Specific file
    filename === 'image.webp' ||            // Generic but might be used
    filename === 'image.avif' ||
    filename === 'qvzmsfl0bmlbmhvyd3jhsw.webp' ||
    filename === 'qvzmsfl0bmlbmhvyd3jhsw.avif'
  );
}

// Check if file is a duplicate
function isDuplicate(filename) {
  return DUPLICATE_PATTERNS.some(pattern => pattern.test(filename));
}

// Get all files in photography directory
function getAllFiles() {
  if (!fs.existsSync(photographyDir)) {
    return [];
  }

  return fs.readdirSync(photographyDir)
    .filter(file => {
      const filePath = path.join(photographyDir, file);
      return fs.statSync(filePath).isFile() && file !== 'manifest.json';
    });
}

// Load current manifest
function loadManifest() {
  if (!fs.existsSync(manifestPath)) {
    return [];
  }

  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } catch (error) {
    console.warn('⚠️  Could not parse manifest.json');
    return [];
  }
}

// Main cleanup function
function cleanup() {
  console.log('🧹 Cleaning up photography duplicates...\n');
  console.log('='.repeat(70));

  const allFiles = getAllFiles();
  const currentManifest = loadManifest();

  console.log(`📁 Total files in photography/: ${allFiles.length}`);
  console.log(`📋 Current manifest entries: ${currentManifest.length}\n`);

  // Identify duplicates
  const duplicates = allFiles.filter(isDuplicate);
  const realPhotos = allFiles.filter(isRealPhoto);
  const otherFiles = allFiles.filter(f => !isDuplicate(f) && !isRealPhoto(f));

  console.log(`🖼️  Real photography files: ${realPhotos.length}`);
  console.log(`❌ Duplicate files to remove: ${duplicates.length}`);
  console.log(`❓ Other files: ${otherFiles.length}\n`);

  if (duplicates.length > 0) {
    console.log('📋 Duplicate files found:');
    duplicates.forEach(file => {
      const filePath = path.join(photographyDir, file);
      const stat = fs.statSync(filePath);
      const size = (stat.size / 1024).toFixed(2);
      console.log(`   - ${file} (${size} KB)`);
    });
    console.log();
  }

  // Create new manifest with only real photos
  // Include both .webp and .avif versions of real photos
  const newManifest = [];
  const processed = new Set();

  // Add all real photos
  allFiles.forEach(file => {
    if (isRealPhoto(file) && !processed.has(file)) {
      newManifest.push(file);
      processed.add(file);
    }
  });

  // Sort manifest for consistency
  newManifest.sort();

  console.log(`✅ New manifest will have ${newManifest.length} entries`);
  console.log(`   Removed ${currentManifest.length - newManifest.length} duplicate entries\n`);

  // Delete duplicate files
  if (!DRY_RUN && duplicates.length > 0) {
    console.log('🗑️  Deleting duplicate files...\n');
    let deletedCount = 0;
    let totalSize = 0;

    duplicates.forEach(file => {
      const filePath = path.join(photographyDir, file);
      try {
        const stat = fs.statSync(filePath);
        totalSize += stat.size;
        fs.unlinkSync(filePath);
        deletedCount++;
        console.log(`   ✓ Deleted: ${file}`);
      } catch (error) {
        console.error(`   ✗ Error deleting ${file}: ${error.message}`);
      }
    });

    console.log(`\n✅ Deleted ${deletedCount} files (${(totalSize / 1024 / 1024).toFixed(2)} MB)`);
  } else if (DRY_RUN && duplicates.length > 0) {
    console.log('🔍 DRY RUN - Would delete:');
    duplicates.forEach(file => {
      const filePath = path.join(photographyDir, file);
      const stat = fs.statSync(filePath);
      const size = (stat.size / 1024).toFixed(2);
      console.log(`   - ${file} (${size} KB)`);
    });
    console.log();
  }

  // Update manifest
  if (!DRY_RUN) {
    fs.writeFileSync(manifestPath, JSON.stringify(newManifest, null, 2) + '\n');
    console.log('✅ Updated manifest.json');
  } else {
    console.log('🔍 DRY RUN - Would update manifest.json with:');
    console.log(JSON.stringify(newManifest, null, 2));
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 Summary');
  console.log('='.repeat(70));
  console.log(`Real photos: ${realPhotos.length}`);
  console.log(`Duplicates removed: ${duplicates.length}`);
  console.log(`New manifest entries: ${newManifest.length}`);

  if (DRY_RUN) {
    console.log('\n💡 This was a dry run. Use without --dry-run to apply changes.');
  }
}

// Main execution
cleanup();

