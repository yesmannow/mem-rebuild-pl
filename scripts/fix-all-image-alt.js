#!/usr/bin/env node
/**
 * Fix All Image Alt Text Script
 * Automatically updates alt text in React components based on audit report
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

/**
 * Generate alt text from file path
 */
function generateAltText(filePath, relativePath) {
  const parts = relativePath.split(path.sep);
  const fileName = path.basename(filePath, path.extname(filePath));

  let cleanName = fileName
    .replace(/^[0-9]+[-_]?/, '')
    .replace(/[-_](logo|icon|img|image|photo|pic|thumb|thumbnail)$/i, '')
    .replace(/[-_]/g, ' ')
    .trim();

  cleanName = cleanName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const category = parts[parts.length - 2] || 'image';

  const altTextMap = {
    'bio': `Jacob Darling - ${cleanName || 'Professional photo'}`,
    'case-studies': `${cleanName || 'Case study'} illustration`,
    'projects': `${cleanName || 'Project'} screenshot`,
    'side-projects': `${cleanName || 'Side project'} image`,
    'logos': `${cleanName || 'Logo'}`,
    'apps': `${cleanName || 'Application'} icon`,
    'demos': `${cleanName || 'Demo'} preview`
  };

  return altTextMap[category] || cleanName || 'Image';
}

/**
 * Update alt text in React component
 */
function updateAltText(content, imagePath, altText) {
  const imageName = path.basename(imagePath);
  const pathVariations = [
    imagePath,
    `/images/${path.basename(imagePath)}`,
    imageName,
    path.basename(imagePath, path.extname(imagePath))
  ];

  let modified = content;
  let updated = false;

  for (const imgPath of pathVariations) {
    // Match img tags
    const imgTagPattern = new RegExp(
      `(<img[^>]*src=["']([^"']*${imageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"']*)["'][^>]*)>`,
      'gi'
    );

    modified = modified.replace(imgTagPattern, (match, tag) => {
      // Check if alt already exists
      if (tag.includes('alt=')) {
        // Update existing alt
        updated = true;
        return match.replace(/alt=["'][^"']*["']/i, `alt="${altText}"`);
      } else {
        // Add alt attribute
        updated = true;
        return tag + ` alt="${altText}">`;
      }
    });

    // Match Image components (Next.js, custom components)
    const imageComponentPattern = new RegExp(
      `(<(?:Image|img|OptimizedImage)[^>]*src=["']([^"']*${imageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"']*)["'][^>]*)>`,
      'gi'
    );

    modified = modified.replace(imageComponentPattern, (match, tag) => {
      if (tag.includes('alt=') || tag.includes('altText=')) {
        updated = true;
        return match.replace(/(alt|altText)=["'][^"']*["']/i, `alt="${altText}"`);
      } else {
        updated = true;
        return tag + ` alt="${altText}">`;
      }
    });
  }

  return { modified, updated };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  console.log('🖼️  Fix All Image Alt Text Script\n');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  // Load audit report
  const auditPath = path.join(rootDir, 'reports/design-analysis/image-audit-report.json');
  let audit;

  try {
    audit = JSON.parse(await fs.readFile(auditPath, 'utf-8'));
  } catch (error) {
    console.error('❌ Could not read image audit report. Run npm run design:audit-images first.');
    process.exit(1);
  }

  // Load alt text fixes
  const fixesPath = path.join(rootDir, 'reports/design-analysis/image-alt-fixes.json');
  let fixes;

  try {
    fixes = JSON.parse(await fs.readFile(fixesPath, 'utf-8'));
  } catch (error) {
    console.log('⚠️  Alt fixes report not found. Generating suggestions...\n');
    // Generate fixes on the fly
    fixes = {
      fixes: audit.issues.missingAlt.map(img => ({
        image: img.relativePath,
        suggestedAlt: generateAltText(img.path, img.relativePath)
      }))
    };
  }

  // Find all React/TSX files
  const files = await fg('**/*.{tsx,jsx,ts,js}', {
    cwd: rootDir,
    ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**']
  });

  console.log(`📁 Found ${files.length} source files\n`);
  console.log(`🖼️  Processing ${fixes.fixes.length} images\n`);

  const report = {
    totalImages: fixes.fixes.length,
    processed: 0,
    updated: 0,
    filesModified: 0,
    changes: []
  };

  for (const fix of fixes.fixes) {
    const imagePath = fix.image;
    const altText = fix.suggestedAlt || generateAltText(imagePath, imagePath);

    // Find files that use this image
    for (const file of files) {
      const filePath = path.join(rootDir, file);

      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const { modified, updated } = updateAltText(content, imagePath, altText);

        if (updated) {
          report.processed++;

          if (!dryRun) {
            await fs.writeFile(filePath, modified, 'utf-8');
            report.updated++;
            if (!report.changes.find(c => c.file === file)) {
              report.filesModified++;
              report.changes.push({ file, images: [] });
            }
            report.changes.find(c => c.file === file).images.push({
              image: imagePath,
              alt: altText
            });
            console.log(`✅ ${file} - Added alt: "${altText}"`);
          } else {
            console.log(`📝 ${file} - Would add alt: "${altText}" (DRY RUN)`);
          }
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
  }

  // Save report
  const reportPath = path.join(rootDir, 'reports/design-analysis/alt-text-fix-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log('\n' + '='.repeat(60));
  console.log('📊 ALT TEXT FIX SUMMARY');
  console.log('='.repeat(60));
  console.log(`\nTotal images: ${report.totalImages}`);
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

