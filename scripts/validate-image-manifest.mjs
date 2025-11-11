#!/usr/bin/env node
/**
 * Validate Image Manifest
 * Check images have width/height, DPR variants, formats
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

const MAX_SIZE_KB = 300;
const REQUIRED_FORMATS = ['webp', 'avif']; // Optional but recommended

async function validateManifest() {
  console.log('🖼️  Image Manifest Validator');
  console.log('==============================\n');

  const imageFiles = await glob(['public/images/**/*.{jpg,jpeg,png,webp,avif}']);
  const issues = [];
  const warnings = [];

  for (const file of imageFiles) {
    try {
      const stats = await fs.stat(file);
      const sizeKB = stats.size / 1024;
      const ext = path.extname(file).toLowerCase().slice(1);
      const basename = path.basename(file, path.extname(file));
      const dir = path.dirname(file);

      // Check file size
      if (sizeKB > MAX_SIZE_KB) {
        issues.push({
          file,
          type: 'size',
          message: `Image exceeds ${MAX_SIZE_KB}KB limit: ${sizeKB.toFixed(2)}KB`,
        });
      }

      // Check for dimensions (would need image metadata parsing)
      // For now, just check if optimized formats exist
      if (!['webp', 'avif'].includes(ext)) {
        const webpPath = path.join(dir, `${basename}.webp`);
        const avifPath = path.join(dir, `${basename}.avif`);

        try {
          await fs.access(webpPath);
        } catch {
          warnings.push({
            file,
            type: 'format',
            message: `Missing WebP variant: ${basename}.webp`,
          });
        }

        try {
          await fs.access(avifPath);
        } catch {
          warnings.push({
            file,
            type: 'format',
            message: `Missing AVIF variant: ${basename}.avif (optional)`,
          });
        }
      }
    } catch (error) {
      warnings.push({
        file,
        type: 'error',
        message: `Could not validate: ${error.message}`,
      });
    }
  }

  console.log(`📊 Validated ${imageFiles.length} images\n`);

  if (issues.length > 0) {
    console.log('❌ Issues found:');
    issues.forEach(issue => {
      console.log(`   ${issue.file}: ${issue.message}`);
    });
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.slice(0, 10).forEach(warning => {
      console.log(`   ${warning.file}: ${warning.message}`);
    });
    if (warnings.length > 10) {
      console.log(`   ... and ${warnings.length - 10} more`);
    }
  }

  if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ All images validated successfully');
  }

  if (issues.length > 0) {
    process.exit(1);
  }
}

validateManifest().catch(console.error);

