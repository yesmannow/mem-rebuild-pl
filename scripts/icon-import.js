#!/usr/bin/env node
/**
 * Icon Import Script
 * Helps import and optimize SVG icons for the design system
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const iconsDir = path.join(rootDir, 'public/icons');
const requiredIcons = [
  'about', 'projects', 'skills', 'tools', 'download', 'email',
  'linkedin', 'github', 'twitter', 'x', 'pdf', 'awards',
  'success', 'warning', 'error', 'menu', 'close'
];

/**
 * Check if icon exists
 */
async function iconExists(iconName) {
  const possiblePaths = [
    path.join(iconsDir, `${iconName}.svg`),
    path.join(iconsDir, `${iconName}.png`),
    path.join(iconsDir, `icon-${iconName}.svg`),
  ];

  for (const iconPath of possiblePaths) {
    try {
      await fs.access(iconPath);
      return { exists: true, path: iconPath };
    } catch {
      continue;
    }
  }

  return { exists: false, path: null };
}

/**
 * Validate SVG structure
 */
function validateSVG(svgContent) {
  const issues = [];

  if (!svgContent.includes('<svg')) {
    issues.push('Missing <svg> tag');
  }

  // Check for viewBox (recommended)
  if (!svgContent.includes('viewBox') && !svgContent.includes('width') && !svgContent.includes('height')) {
    issues.push('Missing viewBox, width, or height');
  }

  // Check for stroke (should be 2px for design system)
  if (svgContent.includes('stroke-width')) {
    const strokeMatch = svgContent.match(/stroke-width=["']?([^"'\s]+)/i);
    if (strokeMatch && parseFloat(strokeMatch[1]) !== 2) {
      issues.push(`Stroke width is ${strokeMatch[1]}, should be 2px`);
    }
  }

  // Check for currentColor (for theming)
  if (!svgContent.includes('currentColor') && !svgContent.includes('fill=') && !svgContent.includes('stroke=')) {
    issues.push('Consider using currentColor for theming');
  }

  return issues;
}

/**
 * Optimize SVG (basic cleanup)
 */
function optimizeSVG(svgContent) {
  let optimized = svgContent;

  // Remove comments
  optimized = optimized.replace(/<!--[\s\S]*?-->/g, '');

  // Remove unnecessary whitespace
  optimized = optimized.replace(/\s+/g, ' ');
  optimized = optimized.replace(/>\s+</g, '><');

  // Ensure currentColor for fill/stroke if not specified
  if (!optimized.includes('fill=') && !optimized.includes('currentColor')) {
    optimized = optimized.replace(/<svg/, '<svg fill="currentColor"');
  }

  return optimized.trim();
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'audit') {
    console.log('🔍 Icon Audit\n');
    console.log('='.repeat(60));

    // Ensure icons directory exists
    try {
      await fs.mkdir(iconsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    const audit = {
      required: requiredIcons.length,
      found: 0,
      missing: [],
      existing: [],
      issues: []
    };

    for (const iconName of requiredIcons) {
      const check = await iconExists(iconName);
      if (check.exists) {
        audit.found++;
        audit.existing.push({
          name: iconName,
          path: check.path
        });

        // Validate existing icon
        try {
          const content = await fs.readFile(check.path, 'utf-8');
          if (check.path.endsWith('.svg')) {
            const issues = validateSVG(content);
            if (issues.length > 0) {
              audit.issues.push({
                icon: iconName,
                path: check.path,
                issues
              });
            }
          }
        } catch (error) {
          // Couldn't read file
        }
      } else {
        audit.missing.push(iconName);
      }
    }

    console.log(`\n📊 Icon Status:`);
    console.log(`   Required: ${audit.required}`);
    console.log(`   Found: ${audit.found}`);
    console.log(`   Missing: ${audit.missing.length}`);

    if (audit.missing.length > 0) {
      console.log(`\n❌ Missing Icons:`);
      audit.missing.forEach(icon => {
        console.log(`   • ${icon}`);
      });
    }

    if (audit.issues.length > 0) {
      console.log(`\n⚠️  Icons with Issues:`);
      audit.issues.forEach(({ icon, issues }) => {
        console.log(`   • ${icon}:`);
        issues.forEach(issue => console.log(`     - ${issue}`));
      });
    }

    // Save audit report
    const reportPath = path.join(rootDir, 'reports/design-analysis/icon-audit-report.json');
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, JSON.stringify(audit, null, 2), 'utf-8');

    console.log(`\n💾 Audit report saved to: ${reportPath}`);

  } else if (command === 'add' && args[1] && args[2]) {
    const iconName = args[1];
    const sourcePath = args[2];

    console.log(`➕ Adding icon: ${iconName}\n`);

    // Ensure icons directory exists
    await fs.mkdir(iconsDir, { recursive: true });

    // Read source file
    let content;
    try {
      content = await fs.readFile(sourcePath, 'utf-8');
    } catch (error) {
      console.error(`❌ Error reading source file: ${error.message}`);
      process.exit(1);
    }

    // Optimize if SVG
    if (sourcePath.endsWith('.svg')) {
      const issues = validateSVG(content);
      if (issues.length > 0) {
        console.log('⚠️  Validation issues:');
        issues.forEach(issue => console.log(`   - ${issue}`));
      }

      content = optimizeSVG(content);
    }

    // Save to icons directory
    const targetPath = path.join(iconsDir, `${iconName}.svg`);
    await fs.writeFile(targetPath, content, 'utf-8');

    console.log(`✅ Icon saved to: ${targetPath}`);

  } else {
    console.log(`
Icon Import Script

Usage:
  npm run icon:audit              - Audit existing icons
  npm run icon:add <name> <path>  - Add/import a new icon

Examples:
  npm run icon:audit
  npm run icon:add email ./downloads/email-icon.svg
  npm run icon:add linkedin ./downloads/linkedin.svg

Required Icons:
  ${requiredIcons.join(', ')}
`);
  }
}

main().catch(console.error);

