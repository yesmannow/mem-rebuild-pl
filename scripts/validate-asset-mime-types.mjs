#!/usr/bin/env node
/**
 * Validates that all built assets have correct MIME types
 * Run after build: node scripts/validate-asset-mime-types.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = join(__dirname, '..', 'dist');
const indexHtmlPath = join(distDir, 'index.html');

// Expected MIME types
const MIME_TYPES = {
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.html': 'text/html',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function getExpectedMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || null;
}

function extractAssetReferences(htmlContent) {
  const assets = new Set();

  // Extract script src
  const scriptMatches = htmlContent.matchAll(/src=["']([^"']+\.(js|mjs))["']/g);
  for (const match of scriptMatches) {
    assets.add(match[1]);
  }

  // Extract link href (CSS, modulepreload)
  const linkMatches = htmlContent.matchAll(/href=["']([^"']+\.(css|js|mjs))["']/g);
  for (const match of linkMatches) {
    assets.add(match[1]);
  }

  return Array.from(assets);
}

function checkAssetExists(assetPath) {
  const fullPath = join(distDir, assetPath.startsWith('/') ? assetPath.slice(1) : assetPath);
  return statSync(fullPath, { throwIfNoEntry: false }) !== undefined;
}

function validateAssets() {
  console.log('🔍 Validating asset MIME types...\n');

  if (!statSync(indexHtmlPath, { throwIfNoEntry: false })) {
    console.error('❌ index.html not found in dist/');
    process.exit(1);
  }

  const htmlContent = readFileSync(indexHtmlPath, 'utf-8');
  const referencedAssets = extractAssetReferences(htmlContent);

  console.log(`Found ${referencedAssets.length} referenced assets\n`);

  let errors = 0;
  let warnings = 0;

  for (const asset of referencedAssets) {
    const assetPath = asset.startsWith('/') ? asset.slice(1) : asset;
    const fullPath = join(distDir, assetPath);

    if (!checkAssetExists(assetPath)) {
      console.error(`❌ Asset not found: ${asset}`);
      errors++;
      continue;
    }

    const expectedMime = getExpectedMimeType(fullPath);
    if (expectedMime) {
      console.log(`✅ ${asset} → ${expectedMime}`);
    } else {
      console.warn(`⚠️  ${asset} → Unknown MIME type`);
      warnings++;
    }
  }

  // Check all assets in dist/assets
  console.log('\n📦 Checking all assets in dist/assets/...\n');
  const assetsDir = join(distDir, 'assets');
  if (statSync(assetsDir, { throwIfNoEntry: false })) {
    const assetFiles = readdirSync(assetsDir);
    for (const file of assetFiles) {
      const filePath = join(assetsDir, file);
      const expectedMime = getExpectedMimeType(filePath);
      if (expectedMime) {
        console.log(`✅ assets/${file} → ${expectedMime}`);
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Referenced assets: ${referencedAssets.length}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Warnings: ${warnings}`);

  if (errors > 0) {
    console.error('\n❌ Validation failed');
    process.exit(1);
  }

  console.log('\n✅ All assets validated successfully');
}

validateAssets();

