#!/usr/bin/env node
/**
 * Fix Image Alt Text Script
 * Automatically generates and updates alt text for images based on
 * file names, directory structure, and context
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.gif'];

/**
 * Generate alt text from file path
 */
function generateAltText(filePath, relativePath) {
  const parts = relativePath.split(path.sep);
  const fileName = path.basename(filePath, path.extname(filePath));

  // Remove common prefixes/suffixes
  let cleanName = fileName
    .replace(/^[0-9]+[-_]?/, '') // Remove leading numbers
    .replace(/[-_](logo|icon|img|image|photo|pic|thumb|thumbnail)$/i, '')
    .replace(/[-_]/g, ' ')
    .trim();

  // Capitalize first letter of each word
  cleanName = cleanName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Context-based alt text
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
 * Find image usage in source files
 */
async function findImageUsage(imagePath, relativePath) {
  const usage = [];
  const srcDir = path.join(rootDir, 'src');

  try {
    const files = await getAllFiles(srcDir, ['.tsx', '.ts', '.jsx', '.js', '.html']);
    const imageName = path.basename(imagePath);
    const imagePathVariations = [
      relativePath,
      `/images/${path.basename(relativePath)}`,
      imageName,
      path.basename(relativePath, path.extname(relativePath))
    ];

    for (const file of files) {
      try {
        const content = await fs.readFile(file, 'utf-8');
        for (const imgPath of imagePathVariations) {
          if (content.includes(imgPath) || content.includes(imageName)) {
            usage.push({
              file,
              hasAlt: /(alt|aria-label)=["']([^"']+)["']/i.test(content),
              line: content.split('\n').findIndex(line => line.includes(imgPath) || line.includes(imageName)) + 1
            });
          }
        }
      } catch (err) {
        // Skip files that can't be read
      }
    }
  } catch (error) {
    // Continue even if search fails
  }

  return usage;
}

async function getAllFiles(dir, extensions, fileList = []) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await getAllFiles(fullPath, extensions, fileList);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          fileList.push(fullPath);
        }
      }
    }
  } catch (error) {
    // Skip directories that can't be read
  }
  return fileList;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const fix = args.includes('--fix');

  console.log('🖼️  Image Alt Text Fix Script\n');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  const imagesDir = path.join(rootDir, 'public/images');
  const auditPath = path.join(rootDir, 'reports/design-analysis/image-audit-report.json');

  let audit;
  try {
    audit = JSON.parse(await fs.readFile(auditPath, 'utf-8'));
  } catch (error) {
    console.error('❌ Could not read image audit report. Run npm run design:audit-images first.');
    process.exit(1);
  }

  const fixes = [];
  const recommendations = [];

  // Process images missing alt text
  for (const image of audit.issues.missingAlt) {
    const altText = generateAltText(image.path, image.relativePath);
    const usage = await findImageUsage(image.path, image.relativePath);

    fixes.push({
      image: image.relativePath,
      currentAlt: null,
      suggestedAlt: altText,
      usage: usage.length,
      files: usage.map(u => u.file)
    });
  }

  // Process short alt text
  for (const image of audit.issues.shortAlt) {
    const altText = generateAltText(image.path, image.relativePath);
    fixes.push({
      image: image.relativePath,
      currentAlt: image.accessibility.altText,
      suggestedAlt: altText,
      usage: 0,
      files: []
    });
  }

  // Generate report
  const report = {
    totalFixes: fixes.length,
    fixes: fixes.slice(0, 50), // Limit to first 50 for readability
    recommendations: [
      ...audit.issues.unused.slice(0, 20).map(img => ({
        action: 'delete',
        image: img.relativePath,
        reason: 'Unused',
        size: `${(img.size / 1024).toFixed(2)} KB`
      })),
      ...audit.issues.largeFiles.slice(0, 20).map(img => ({
        action: 'compress',
        image: img.relativePath,
        reason: `Large file: ${(img.size / (1024 * 1024)).toFixed(2)} MB`,
        command: `npx @squoosh/cli --webp auto "${img.relativePath}"`
      }))
    ]
  };

  // Save report
  const reportPath = path.join(rootDir, 'reports/design-analysis/image-alt-fixes.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log(`\n📊 Alt Text Fixes:`);
  console.log(`   Total fixes needed: ${fixes.length}`);
  console.log(`   Unused images: ${audit.issues.unused.length}`);
  console.log(`   Large files: ${audit.issues.largeFiles.length}`);

  console.log(`\n💾 Report saved to: ${reportPath}`);

  if (!dryRun && fix) {
    console.log('\n⚠️  Auto-fix mode not implemented. Please review report and update manually.');
    console.log('   Use the suggested alt text from the report.');
  }

  console.log('\n' + '='.repeat(60));
}

main().catch(console.error);

