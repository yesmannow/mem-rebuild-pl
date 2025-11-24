#!/usr/bin/env node
/**
 * Image Audit Script
 * Audits all images in /public/images for alt text, aria-label compliance,
 * and flags missing or too-short descriptions.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.gif'];
const minAltLength = 5; // Minimum characters for alt text

/**
 * Recursively walk directory and find all images
 */
async function walkDirectory(dir, fileList = []) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walkDirectory(fullPath, fileList);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (imageExtensions.includes(ext)) {
          const stats = await fs.stat(fullPath);
          fileList.push({
            path: fullPath,
            relativePath: path.relative(rootDir, fullPath),
            name: entry.name,
            extension: ext,
            size: stats.size,
            modified: stats.mtime
          });
        }
      }
    }
  } catch (error) {
    // Skip directories that can't be read
    console.warn(`⚠️  Could not read directory: ${dir}`, error.message);
  }

  return fileList;
}

/**
 * Search for image usage in source files
 */
async function findImageUsage(imagePath, relativePath) {
  const usage = {
    inHtml: [],
    inJsx: [],
    inCss: [],
    inJson: [],
    hasAlt: false,
    altText: null,
    hasAriaLabel: false,
    ariaLabel: null
  };

  // Search in src directory
  const srcDir = path.join(rootDir, 'src');
  const publicDir = path.join(rootDir, 'public');

  try {
    // Search HTML/JSX files
    const searchDirs = [srcDir];
    const searchExtensions = ['.tsx', '.ts', '.jsx', '.js', '.html'];

    for (const searchDir of searchDirs) {
      try {
        const files = await getAllFiles(searchDir, searchExtensions);
        for (const file of files) {
          try {
            const content = await fs.readFile(file, 'utf-8');
            const imageName = path.basename(imagePath);
            const imagePathVariations = [
              relativePath,
              `/images/${path.basename(relativePath)}`,
              imageName,
              path.basename(relativePath, path.extname(relativePath))
            ];

            for (const imgPath of imagePathVariations) {
              if (content.includes(imgPath) || content.includes(imageName)) {
                // Check for alt text
                const altMatch = content.match(new RegExp(`(alt|aria-label)=["']([^"']+)["']`, 'i'));
                if (altMatch) {
                  usage.hasAlt = true;
                  usage.altText = altMatch[2];
                  if (altMatch[1].toLowerCase() === 'aria-label') {
                    usage.hasAriaLabel = true;
                    usage.ariaLabel = altMatch[2];
                  }
                }

                if (file.endsWith('.html') || file.endsWith('.tsx') || file.endsWith('.jsx')) {
                  usage.inJsx.push(file);
                } else if (file.endsWith('.css')) {
                  usage.inCss.push(file);
                } else if (file.endsWith('.json')) {
                  usage.inJson.push(file);
                }
              }
            }
          } catch (err) {
            // Skip files that can't be read
          }
        }
      } catch (err) {
        // Skip directories that can't be read
      }
    }
  } catch (error) {
    // Continue even if search fails
  }

  return usage;
}

/**
 * Get all files with specific extensions
 */
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

/**
 * Categorize images based on directory structure
 */
function categorizeImage(relativePath) {
  const parts = relativePath.split(path.sep);
  const category = parts[parts.length - 2] || 'root';

  const categories = {
    'bio': 'Bio/Profile Photos',
    'case-studies': 'Case Study Images',
    'projects': 'Project Images',
    'side-projects': 'Side Project Images',
    'logos': 'Logos',
    'apps': 'Application Icons',
    'demos': 'Demo Images'
  };

  return categories[category] || 'Other';
}

async function main() {
  console.log('🖼️  Image Audit Script\n');
  console.log('='.repeat(60));

  const imagesDir = path.join(rootDir, 'public/images');

  console.log(`\n📁 Scanning: ${imagesDir}\n`);

  const images = await walkDirectory(imagesDir);
  console.log(`Found ${images.length} images\n`);

  const audit = {
    total: images.length,
    byCategory: {},
    issues: {
      missingAlt: [],
      shortAlt: [],
      unused: [],
      largeFiles: []
    },
    compliant: [],
    summary: {
      totalSize: 0,
      averageSize: 0,
      largestFile: null,
      smallestFile: null
    }
  };

  let totalSize = 0;
  let largestFile = null;
  let smallestFile = null;
  let maxSize = 0;
  let minSize = Infinity;

  // Audit each image
  for (const image of images) {
    const category = categorizeImage(image.relativePath);
    if (!audit.byCategory[category]) {
      audit.byCategory[category] = [];
    }

    totalSize += image.size;
    if (image.size > maxSize) {
      maxSize = image.size;
      largestFile = image;
    }
    if (image.size < minSize) {
      minSize = image.size;
      smallestFile = image;
    }

    const usage = await findImageUsage(image.path, image.relativePath);

    const imageAudit = {
      ...image,
      category,
      usage: {
        found: usage.inJsx.length > 0 || usage.inCss.length > 0 || usage.inJson.length > 0,
        inJsx: usage.inJsx.length,
        inCss: usage.inCss.length,
        inJson: usage.inJson.length
      },
      accessibility: {
        hasAlt: usage.hasAlt,
        altText: usage.altText,
        hasAriaLabel: usage.hasAriaLabel,
        ariaLabel: usage.ariaLabel,
        compliant: usage.hasAlt && usage.altText && usage.altText.length >= minAltLength
      }
    };

    audit.byCategory[category].push(imageAudit);

    // Check for issues
    if (!imageAudit.accessibility.hasAlt) {
      audit.issues.missingAlt.push(imageAudit);
    } else if (imageAudit.accessibility.altText && imageAudit.accessibility.altText.length < minAltLength) {
      audit.issues.shortAlt.push(imageAudit);
    }

    if (!imageAudit.usage.found) {
      audit.issues.unused.push(imageAudit);
    }

    // Flag large files (>500KB)
    if (image.size > 500 * 1024) {
      audit.issues.largeFiles.push(imageAudit);
    }

    if (imageAudit.accessibility.compliant && imageAudit.usage.found) {
      audit.compliant.push(imageAudit);
    }
  }

  // Calculate summary
  audit.summary.totalSize = totalSize;
  audit.summary.averageSize = Math.round(totalSize / images.length);
  audit.summary.largestFile = largestFile ? {
    path: largestFile.relativePath,
    size: largestFile.size,
    sizeMB: (largestFile.size / (1024 * 1024)).toFixed(2)
  } : null;
  audit.summary.smallestFile = smallestFile ? {
    path: smallestFile.relativePath,
    size: smallestFile.size
  } : null;

  // Save audit report
  const reportPath = path.join(rootDir, 'reports/design-analysis/image-audit-report.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(audit, null, 2), 'utf-8');

  // Print summary
  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(60));
  console.log(`\nTotal images: ${audit.total}`);
  console.log(`Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Average size: ${(audit.summary.averageSize / 1024).toFixed(2)} KB`);

  console.log(`\n✅ Compliant: ${audit.compliant.length}`);
  console.log(`❌ Missing alt text: ${audit.issues.missingAlt.length}`);
  console.log(`⚠️  Short alt text (<${minAltLength} chars): ${audit.issues.shortAlt.length}`);
  console.log(`🔍 Unused images: ${audit.issues.unused.length}`);
  console.log(`📦 Large files (>500KB): ${audit.issues.largeFiles.length}`);

  console.log(`\n📂 By Category:`);
  for (const [category, images] of Object.entries(audit.byCategory)) {
    console.log(`   ${category}: ${images.length} images`);
  }

  console.log(`\n💾 Report saved to: ${reportPath}`);

  // Generate HTML report
  const htmlReport = generateHtmlReport(audit);
  const htmlPath = path.join(rootDir, 'reports/design-analysis/image-audit-report.html');
  await fs.writeFile(htmlPath, htmlReport, 'utf-8');
  console.log(`📄 HTML report: ${htmlPath}`);

  console.log('\n' + '='.repeat(60));
  console.log('✨ Image audit complete!');
  console.log('='.repeat(60));
}

function generateHtmlReport(audit) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Audit Report</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    h1 { color: #005AE2; }
    .summary { background: #F6F8FA; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .issue { background: #FEF3C7; padding: 15px; margin: 10px 0; border-radius: 4px; }
    .compliant { background: #D1FAE5; padding: 15px; margin: 10px 0; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #F6F8FA; }
  </style>
</head>
<body>
  <h1>🖼️ Image Audit Report</h1>
  <div class="summary">
    <h2>Summary</h2>
    <p><strong>Total Images:</strong> ${audit.total}</p>
    <p><strong>Total Size:</strong> ${(audit.summary.totalSize / (1024 * 1024)).toFixed(2)} MB</p>
    <p><strong>Compliant:</strong> ${audit.compliant.length}</p>
    <p><strong>Issues Found:</strong> ${audit.issues.missingAlt.length + audit.issues.shortAlt.length + audit.issues.unused.length}</p>
  </div>

  <h2>Issues</h2>
  <div class="issue">
    <h3>❌ Missing Alt Text (${audit.issues.missingAlt.length})</h3>
    <ul>
      ${audit.issues.missingAlt.slice(0, 10).map(img => `<li>${img.relativePath}</li>`).join('')}
      ${audit.issues.missingAlt.length > 10 ? `<li>... and ${audit.issues.missingAlt.length - 10} more</li>` : ''}
    </ul>
  </div>

  <div class="issue">
    <h3>⚠️ Short Alt Text (${audit.issues.shortAlt.length})</h3>
    <ul>
      ${audit.issues.shortAlt.slice(0, 10).map(img => `<li>${img.relativePath}: "${img.accessibility.altText}"</li>`).join('')}
      ${audit.issues.shortAlt.length > 10 ? `<li>... and ${audit.issues.shortAlt.length - 10} more</li>` : ''}
    </ul>
  </div>

  <div class="issue">
    <h3>🔍 Unused Images (${audit.issues.unused.length})</h3>
    <ul>
      ${audit.issues.unused.slice(0, 10).map(img => `<li>${img.relativePath}</li>`).join('')}
      ${audit.issues.unused.length > 10 ? `<li>... and ${audit.issues.unused.length - 10} more</li>` : ''}
    </ul>
  </div>

  <h2>By Category</h2>
  <table>
    <tr><th>Category</th><th>Count</th></tr>
    ${Object.entries(audit.byCategory).map(([cat, imgs]) => `<tr><td>${cat}</td><td>${imgs.length}</td></tr>`).join('')}
  </table>
</body>
</html>`;
}

main().catch(console.error);

