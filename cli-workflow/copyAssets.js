// cli-workflow/copyAssets.js
// Cross-platform asset copying script
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, 'images');
const TARGET_DIR = path.join(__dirname, '..', 'public', 'images');

// Ensure target directory exists
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Copy files recursively
function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('📦 Copying images from CLI workflow to public directory...');

try {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.warn(`⚠️  Source directory not found: ${SOURCE_DIR}`);
    console.log('   Skipping asset copy (images directory may be empty)');
    process.exit(0);
  }

  copyRecursive(SOURCE_DIR, TARGET_DIR);
  console.log(`✅ Successfully copied images to ${TARGET_DIR}`);
} catch (error) {
  console.error('❌ Error copying assets:', error.message);
  process.exit(1);
}

