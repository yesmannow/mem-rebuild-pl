#!/usr/bin/env node
/**
 * Cleanup Design Duplicates
 * Removes duplicate design-XX files and updates manifest to include all real design files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();
const designDir = path.join(projectRoot, 'public', 'images', 'design');
const manifestPath = path.join(designDir, 'manifest.json');

const DRY_RUN = process.argv.includes('--dry-run');

// Patterns for duplicate files to remove
const DUPLICATE_PATTERNS = [
  /^design-\d{3}\.webp$/i,  // design-001.webp, design-002.webp, etc.
  /^design-\d{2}\.webp$/i,   // design-01.webp, design-02.webp, etc.
  /^design-\d{2}\.avif$/i,   // design-01.avif, design-02.avif, etc.
];

// Files to always keep (real design files)
function isRealDesign(filename) {
  // Real design files have descriptive names, date stamps, or are logos/branding
  return (
    /^\d{4}-/.test(filename) ||                    // 2020-forty-under-40-ad.webp
    /^IMG_\d{8}_/.test(filename) ||                 // IMG_20211002_204207_713.webp
    /^img_\d{8}_/.test(filename) ||                // img_20211002_204207_713.webp
    /^file_/.test(filename) ||                      // file_00000000c524623091018296ba5b34a3.webp
    /logo/i.test(filename) ||                       // herbs-rub-logo.webp, am-logo.webp
    /-logo/i.test(filename) ||                      // taco-ninja-logo.webp
    /^adobe_express/.test(filename) ||              // adobe_express_20220527_2105230.6071119382485303.webp
    /^Adobe_Express/.test(filename) ||              // Adobe_Express_20220527_2105230.6071119382485303.avif
    /^back-/.test(filename) ||                      // back-1.webp
    /^front-/.test(filename) ||                     // front-updated.webp
    /^font-/.test(filename) ||                      // font-1.webp
    /^hot-sauce/.test(filename) ||                  // hot-sauce-dark.webp
    /^koozie/.test(filename) ||                     // koozie-design---final.webp
    /^jacob-brady/.test(filename) ||                // jacob-brady-resized.webp
    /^bird/.test(filename) ||                       // bird.avif
    /^CA\./.test(filename) ||                       // CA.avif
    /^bf-mogogram/.test(filename) ||                // bf-mogogram-final-02.webp
    /^bicentinial/.test(filename) ||                 // bicentinial-design-contest.webp
    /^blue---/.test(filename) ||                    // blue---rbe-indy-500-design.webp
    /^ChoppedBrisket/.test(filename) ||             // ChoppedBrisketSandwich_LG.avif
    /^choppedbrisket/.test(filename) ||             // choppedbrisketsandwich_lg.webp
    /^dog-summer/.test(filename) ||                  // dog-summer-sale-1.webp
    /^flu-shot/.test(filename) ||                   // flu-shot-2021.webp
    /^my-post/.test(filename) ||                    // my-post-2.webp
    /^online-doctor/.test(filename) ||              // online-doctor-consultation-instagram-post.webp
    /^25-percent/.test(filename) ||                 // 25-percent-sale---spring.webp
    /^Be free/.test(filename) ||                    // Be free home and life logo.avif
    /^Clean Aesthetic/.test(filename) ||             // Clean Aesthetic logo.webp
    /^Hoosierboy/.test(filename) ||                  // Hoosierboy Barber shop logo.webp
    /^logo-01\./.test(filename) ||                  // logo-01.svg
    /^\d+_/.test(filename)                          // 236802803_10117457411055169_5004587858113382909_n.webp
  );
}

// Check if file is a duplicate
function isDuplicate(filename) {
  return DUPLICATE_PATTERNS.some(pattern => pattern.test(filename));
}

// Get all files in design directory
function getAllFiles() {
  if (!fs.existsSync(designDir)) {
    return [];
  }

  return fs.readdirSync(designDir)
    .filter(file => {
      const filePath = path.join(designDir, file);
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
  console.log('🧹 Cleaning up design duplicates...\n');
  console.log('='.repeat(70));

  const allFiles = getAllFiles();
  const currentManifest = loadManifest();

  console.log(`📁 Total files in design/: ${allFiles.length}`);
  console.log(`📋 Current manifest entries: ${currentManifest.length}\n`);

  // Identify duplicates
  const duplicates = allFiles.filter(isDuplicate);
  const realDesigns = allFiles.filter(isRealDesign);
  const otherFiles = allFiles.filter(f => !isDuplicate(f) && !isRealDesign(f));

  console.log(`🎨 Real design files: ${realDesigns.length}`);
  console.log(`❌ Duplicate files to remove: ${duplicates.length}`);
  console.log(`❓ Other files: ${otherFiles.length}\n`);

  if (duplicates.length > 0) {
    console.log('📋 Duplicate files found:');
    duplicates.forEach(file => {
      const filePath = path.join(designDir, file);
      const stat = fs.statSync(filePath);
      const size = (stat.size / 1024).toFixed(2);
      console.log(`   - ${file} (${size} KB)`);
    });
    console.log();
  }

  if (otherFiles.length > 0) {
    console.log('⚠️  Other files (not duplicates, not clearly real designs):');
    otherFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
    console.log();
  }

  // Create new manifest with only real designs
  const newManifest = [];
  const processed = new Set();

  // Add all real designs
  allFiles.forEach(file => {
    if (isRealDesign(file) && !processed.has(file)) {
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
      const filePath = path.join(designDir, file);
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
      const filePath = path.join(designDir, file);
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
  console.log(`Real designs: ${realDesigns.length}`);
  console.log(`Duplicates removed: ${duplicates.length}`);
  console.log(`New manifest entries: ${newManifest.length}`);

  if (DRY_RUN) {
    console.log('\n💡 This was a dry run. Use without --dry-run to apply changes.');
  }
}

// Main execution
cleanup();

