#!/usr/bin/env node
/**
 * Enhanced Image Alt Text Fix Script
 * Reads image audit report and fixes missing alt text in React components
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function generateAltText(imagePath, relativePath) {
  // Extract meaningful name from path
  const fileName = path.basename(imagePath, path.extname(imagePath));

  // Clean up filename (remove numbers, dashes, underscores)
  let altText = fileName
    .replace(/[-_]/g, ' ')
    .replace(/\d+/g, '')
    .replace(/\b\w/g, l => l.toUpperCase())
    .trim();

  // Category-based alt text
  if (relativePath.includes('bio') || relativePath.includes('avatar')) {
    return altText || 'Profile photo';
  }
  if (relativePath.includes('logo')) {
    return `${altText} logo` || 'Company logo';
  }
  if (relativePath.includes('award')) {
    return `${altText} award` || 'Award certificate';
  }
  if (relativePath.includes('project') || relativePath.includes('case-study')) {
    return `${altText} project screenshot` || 'Project image';
  }
  if (relativePath.includes('testimonial')) {
    return 'Testimonial author photo';
  }
  if (relativePath.includes('gallery') || relativePath.includes('photo')) {
    return altText || 'Gallery image';
  }

  return altText || 'Image';
}

function fixAltInFile(content, imagePath, altText) {
  let modified = content;
  let updated = false;

  const imageName = path.basename(imagePath);
  const imagePathClean = imagePath.replace(/\\/g, '/');
  const relativePath = imagePathClean.replace(/^.*\/public\//, '/');

  // Pattern 1: Standard img tags
  const imgPattern = new RegExp(
    `(<img[^>]*src=["']([^"']*${imageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"']*)["'][^>]*)>`,
    'gi'
  );

  modified = modified.replace(imgPattern, (match, tag) => {
    if (!tag.includes('alt=') || tag.match(/alt=["']\s*["']/)) {
      updated = true;
      // Insert alt before closing >
      return tag.replace(/>$/, ` alt="${altText}">`);
    } else if (tag.match(/alt=["'][^"']*["']/)) {
      // Update existing alt
      updated = true;
      return tag.replace(/(alt=["'])[^"']*(["'])/i, `$1${altText}$2`);
    }
    return match;
  });

  // Pattern 2: Image components with src prop
  const componentPatterns = [
    /(<(?:Image|OptimizedImage|ResponsiveImage)[^>]*src=["']([^"']*)["'][^>]*)>/gi,
    /(<(?:Image|OptimizedImage|ResponsiveImage)[^>]*src=\{["']([^"']*)["']\}[^>]*)>/gi,
  ];

  componentPatterns.forEach(pattern => {
    modified = modified.replace(pattern, (match, tag, src) => {
      if (src && (src.includes(imageName) || src.includes(relativePath))) {
        if (!tag.includes('alt=') && !tag.includes('altText=')) {
          updated = true;
          return tag.replace(/>$/, ` alt="${altText}">`);
        } else if (tag.match(/(alt|altText)=["']\s*["']/)) {
          updated = true;
          return tag.replace(/(alt|altText)=["']\s*["']/i, `alt="${altText}"`);
        }
      }
      return match;
    });
  });

  // Pattern 3: JSX props format
  const jsxPropPattern = new RegExp(
    `(src=["']([^"']*${imageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"']*)["'])`,
    'gi'
  );

  modified = modified.replace(jsxPropPattern, (match, srcProp) => {
    // Check if alt is missing in the same component
    const componentMatch = modified.substring(
      Math.max(0, modified.indexOf(match) - 200),
      Math.min(modified.length, modified.indexOf(match) + 200)
    );

    if (!componentMatch.includes('alt=') && !componentMatch.includes('altText=')) {
      updated = true;
      return `${srcProp} alt="${altText}"`;
    }
    return match;
  });

  return { modified, updated };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  console.log('🖼️  Enhanced Image Alt Text Fix Script\n');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  // Load audit report
  const auditPath = path.join(rootDir, 'reports/design-analysis/image-audit-report.json');
  let audit;

  try {
    const auditContent = await fs.readFile(auditPath, 'utf-8');
    audit = JSON.parse(auditContent);
  } catch (error) {
    console.error('❌ Could not read image audit report. Run npm run design:audit-images first.');
    process.exit(1);
  }

  // Find images missing alt text
  const imagesNeedingAlt = [];

  // Check all images in the audit
  if (audit.byCategory) {
    Object.values(audit.byCategory).flat().forEach(img => {
      if (!img.accessibility?.hasAlt || !img.accessibility?.altText ||
          img.accessibility.altText === '' ||
          img.accessibility.altText === null) {
        imagesNeedingAlt.push({
          path: img.path,
          relativePath: img.relativePath,
          name: img.name,
          category: img.category
        });
      }
    });
  }

  if (imagesNeedingAlt.length === 0) {
    console.log('✅ All images already have alt text!\n');
    process.exit(0);
  }

  console.log(`📊 Found ${imagesNeedingAlt.length} images needing alt text\n`);

  // Find all source files
  const files = await fg('**/*.{tsx,jsx,ts,js}', {
    cwd: rootDir,
    ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/scripts/**']
  });

  console.log(`📁 Scanning ${files.length} source files...\n`);

  const report = {
    totalImages: imagesNeedingAlt.length,
    processed: 0,
    updated: 0,
    filesModified: 0,
    changes: []
  };

  // Process each file
  for (const filePath of files) {
    const fullPath = path.join(rootDir, filePath);
    let content;

    try {
      content = await fs.readFile(fullPath, 'utf-8');
    } catch (error) {
      continue;
    }

    let fileModified = false;
    let fileChanges = [];

    // Check each image
    for (const image of imagesNeedingAlt) {
      const imageName = path.basename(image.name);

      // Check if this file references the image
      if (content.includes(imageName) || content.includes(image.relativePath)) {
        const altText = generateAltText(image.path, image.relativePath);
        const result = fixAltInFile(content, image.path, altText);

        if (result.updated) {
          content = result.modified;
          fileModified = true;
          fileChanges.push({
            image: image.name,
            altText: altText
          });
          report.updated++;
        }
      }
    }

    if (fileModified) {
      report.filesModified++;
      report.changes.push({
        file: filePath,
        changes: fileChanges
      });

      if (!dryRun) {
        await fs.writeFile(fullPath, content, 'utf-8');
        console.log(`✅ ${filePath} (${fileChanges.length} images fixed)`);
      } else {
        console.log(`📝 ${filePath} (${fileChanges.length} images - DRY RUN)`);
      }
    }
  }

  report.processed = imagesNeedingAlt.length;

  // Save report
  const reportPath = path.join(rootDir, 'reports/design-analysis/alt-text-fix-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log('\n' + '='.repeat(60));
  console.log('📊 ALT TEXT FIX SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total images: ${report.totalImages}`);
  console.log(`Images processed: ${report.processed}`);
  console.log(`Alt text added: ${report.updated}`);
  console.log(`Files modified: ${report.filesModified}`);
  console.log(`\n💾 Report saved to: ${reportPath}`);

  if (dryRun) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.');
  }
  console.log('='.repeat(60));
}

main().catch(console.error);

