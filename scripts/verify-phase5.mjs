#!/usr/bin/env node
/**
 * Phase 5 Verification Script
 * Automated checks for performance and SEO improvements
 */

import { existsSync, readdirSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Phase 5 Verification Script');
console.log('================================\n');

let passed = 0;
let failed = 0;

function check(name, condition, details = '') {
  if (condition) {
    console.log(`✅ ${name}`);
    if (details) console.log(`   ${details}`);
    passed++;
  } else {
    console.log(`❌ ${name}`);
    if (details) console.log(`   ${details}`);
    failed++;
  }
}

// 1. Check EnhancedImage component
console.log('📦 Component Checks\n');

const enhancedImagePath = resolve(__dirname, '..', 'src', 'components', 'ui', 'EnhancedImage.tsx');
const enhancedImageExists = existsSync(enhancedImagePath);
check('EnhancedImage.tsx exists', enhancedImageExists);

if (enhancedImageExists) {
  const content = await import('fs').then(fs => fs.readFileSync(enhancedImagePath, 'utf-8'));
  check('usePicture prop added', content.includes('usePicture'));
  check('<picture> element implemented', content.includes('<motion.picture>'));
  check('AVIF source added', content.includes("type=\"image/avif\""));
  check('WebP source added', content.includes("type=\"image/webp\""));
}

console.log('');

// 2. Check Vite config
console.log('⚙️  Configuration Checks\n');

const viteConfigPath = resolve(__dirname, '..', 'vite.config.js');
const viteConfigExists = existsSync(viteConfigPath);
check('vite.config.js exists', viteConfigExists);

if (viteConfigExists) {
  const { readFileSync } = await import('fs');
  const viteContent = readFileSync(viteConfigPath, 'utf-8');
  check('React aliases removed', !viteContent.includes("'react': resolve"));
  check('Dedupe configuration present', viteContent.includes("dedupe: ['react'"));
}

console.log('');

// 3. Check SEO meta files
console.log('📊 SEO Meta Files\n');

const seoFiles = [
  'seo-home.json',
  'seo-about.json',
  'seo-studio.json',
  'seo-case-studies.json',
  'seo-side-projects.json',
  'seo-contact.json',
];

const dataDir = resolve(__dirname, '..', 'src', 'data');
seoFiles.forEach(file => {
  const filePath = resolve(dataDir, file);
  const exists = existsSync(filePath);
  check(`${file}`, exists, exists ? `Size: ${statSync(filePath).size} bytes` : 'Missing');
});

console.log('');

// 4. Check image files
console.log('🖼️  Image File Checks\n');

const primaryColoursDir = resolve(__dirname, '..', 'public', 'images', 'projects', 'Primary Colours');
if (existsSync(primaryColoursDir)) {
  const files = readdirSync(primaryColoursDir);
  check('Primary Colours logo.webp', files.includes('primary colours logo.webp'));
  check('Primary Colours logo.avif', files.includes('primary colours logo.avif'));
  check('art v art.webp', files.includes('art v art.webp'));
  check('Broad Ripple Village Association.webp', files.includes('Broad Ripple Village Association.webp'));
} else {
  check('Primary Colours directory', false, 'Directory not found');
}

console.log('');

const pikoDir = resolve(__dirname, '..', 'public', 'images', 'projects', 'Piko Fg Music', 'Site Images');
if (existsSync(pikoDir)) {
  const files = readdirSync(pikoDir);
  check('Piko DJ Console.webp', files.includes('Screenshot of PIKO _ Pro DJ Console.webp'));
  check('Piko DJ Console.avif', files.includes('Screenshot of PIKO _ Pro DJ Console.avif'));
  check('Piko Artist Studio.webp', files.includes('Screenshot of Piko Artist Studio.webp'));
} else {
  check('Piko Fg Music directory', false, 'Directory not found');
}

console.log('');

// 5. Check scripts
console.log('🛠️  Script Checks\n');

const seoScriptPath = resolve(__dirname, 'generate-seo-meta.mjs');
check('SEO generator script', existsSync(seoScriptPath));

const optimizeScriptPath = resolve(__dirname, 'optimize-images.js');
check('Image optimizer script', existsSync(optimizeScriptPath));

console.log('');

// Summary
console.log('================================');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📊 Total:  ${passed + failed}`);
console.log('================================\n');

if (failed === 0) {
  console.log('🎉 All checks passed! Phase 5 is ready for testing.');
  console.log('\n📝 Next steps:');
  console.log('   1. Start dev server: npm run dev');
  console.log('   2. Visit: http://localhost:5173/side-projects/primary-colours');
  console.log('   3. Visit: http://localhost:5173/side-projects/piko-fg-music');
  console.log('   4. Check Network tab for AVIF/WebP delivery');
  console.log('   5. Run: npm run build && npm run preview');
  console.log('   6. Run: npm run audit:lighthouse\n');
} else {
  console.log('⚠️  Some checks failed. Review the output above.');
  process.exit(1);
}
