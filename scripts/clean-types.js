// scripts/clean-types.js
// Cross-platform script to clean TypeScript declaration files
const fs = require('fs');
const path = require('path');

function deleteFileOrDir(filePath) {
  if (!fs.existsSync(filePath)) return;

  const stats = fs.statSync(filePath);
  if (stats.isDirectory()) {
    fs.readdirSync(filePath).forEach(child => {
      deleteFileOrDir(path.join(filePath, child));
    });
    fs.rmdirSync(filePath);
  } else {
    fs.unlinkSync(filePath);
  }
}

function findAndDeleteFiles(dir, extension) {
  if (!fs.existsSync(dir)) return;

  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    try {
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        findAndDeleteFiles(filePath, extension);
      } else if (file.endsWith(extension)) {
        deleteFileOrDir(filePath);
      }
    } catch (error) {
      // Skip files we can't access
      console.warn(`⚠️  Could not process ${filePath}: ${error.message}`);
    }
  });
}

console.log('🧹 Cleaning TypeScript declaration files...');

try {
  // Clean dist and types directories
  ['dist', 'types'].forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`   Removing ${dir}/`);
      deleteFileOrDir(dir);
    }
  });

  // Find and delete .d.ts files in src
  console.log('   Removing .d.ts files from src/');
  findAndDeleteFiles('src', '.d.ts');

  console.log('✅ Type cleanup complete!');
} catch (error) {
  console.error('❌ Error cleaning types:', error.message);
  process.exit(1);
}

