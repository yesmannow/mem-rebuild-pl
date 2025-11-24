#!/usr/bin/env node
/**
 * Color Refactoring Script
 * Replaces hardcoded colors in CSS/SCSS/JSX/TSX files with CSS variables
 * Based on enhanced color mapping report
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Load color mappings
let colorMappings = {};

async function loadMappings() {
  const mappingPath = path.join(rootDir, 'reports/design-analysis/enhanced-color-mapping.json');
  const mapping = JSON.parse(await fs.readFile(mappingPath, 'utf-8'));

  // Build comprehensive mapping dictionary
  const allMappings = [
    ...mapping.mappings.exact,
    ...mapping.mappings.close,
    ...mapping.mappings.far,
    ...mapping.mappings.unmapped.map(m => ({
      original: m.original,
      replaceWith: m.replaceWith || m.closest || '#111827',
      token: m.token || '--color-neutral-1'
    }))
  ];

  // Create lookup maps for various formats
  for (const map of allMappings) {
    const orig = map.original.toLowerCase().trim();

    // Handle different hex formats
    const hexVariations = [
      orig,
      orig.startsWith('#') ? orig : `#${orig}`,
      orig.replace('#', ''),
      `#${orig.replace('#', '')}`
    ];

    for (const variant of hexVariations) {
      colorMappings[variant] = {
        token: map.token,
        replacement: map.replaceWith
      };
    }

    // Handle RGB/RGBA formats
    if (orig.includes('rgb')) {
      colorMappings[orig] = {
        token: map.token,
        replacement: map.replaceWith
      };
    }
  }

  // Add design system direct mappings
  const designSystem = {
    '#005AE2': '--color-primary',
    '#23D2D5': '--color-secondary',
    '#FFD600': '--color-accent',
    '#F6F8FA': '--color-surface',
    '#111827': '--color-neutral-1',
    '#6B7280': '--color-neutral-2',
    '#34D399': '--color-success',
    '#F59E42': '--color-warning',
    '#EF4444': '--color-danger',
    '#FFFFFF': '--color-light',
    '#1B263B': '--color-dark'
  };

  for (const [color, token] of Object.entries(designSystem)) {
    colorMappings[color.toLowerCase()] = { token, replacement: color };
    colorMappings[color.toLowerCase().replace('#', '')] = { token, replacement: color };
  }
}

/**
 * Normalize color for matching
 */
function normalizeColor(color) {
  if (!color) return null;
  let normalized = color.trim().toLowerCase();

  // Handle hex
  if (normalized.match(/^#?[0-9a-f]{3,6}$/)) {
    if (!normalized.startsWith('#')) {
      normalized = '#' + normalized;
    }
    // Expand 3-digit hex
    if (normalized.length === 4) {
      normalized = '#' + normalized[1] + normalized[1] + normalized[2] + normalized[2] + normalized[3] + normalized[3];
    }
    return normalized;
  }

  // Handle RGB/RGBA
  if (normalized.includes('rgb')) {
    return normalized;
  }

  return normalized;
}

/**
 * Replace color in content
 */
function replaceColor(content, filePath) {
  let modified = content;
  const replacements = [];

  // Match hex colors (#rgb, #rrggbb, rgb(...), rgba(...))
  const hexPattern = /#([0-9a-fA-F]{3,6})\b/g;
  const rgbPattern = /rgba?\([^)]+\)/g;

  // Replace hex colors
  modified = modified.replace(hexPattern, (match) => {
    const normalized = normalizeColor(match);
    const mapping = colorMappings[normalized];

    if (mapping) {
      replacements.push({
        original: match,
        replacement: `var(${mapping.token})`,
        token: mapping.token
      });
      return `var(${mapping.token})`;
    }
    return match;
  });

  // Replace RGB/RGBA (more complex, needs context)
  modified = modified.replace(rgbPattern, (match) => {
    const normalized = normalizeColor(match);
    const mapping = colorMappings[normalized];

    if (mapping) {
      // For RGB with opacity, we might need to keep opacity
      if (match.includes('/') || match.includes(',')) {
        // Extract opacity if present
        const opacityMatch = match.match(/\/(\s*[\d.]+)/);
        if (opacityMatch) {
          replacements.push({
            original: match,
            replacement: `var(${mapping.token}) with opacity ${opacityMatch[1]}`,
            token: mapping.token,
            note: 'Manual review needed for opacity'
          });
          return match; // Don't replace, needs manual review
        }
      }

      replacements.push({
        original: match,
        replacement: `var(${mapping.token})`,
        token: mapping.token
      });
      return `var(${mapping.token})`;
    }
    return match;
  });

  return { modified, replacements };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const filePattern = args.find(arg => !arg.startsWith('--')) || '**/*.{css,scss,tsx,jsx}';

  console.log('🎨 Color Refactoring Script\n');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  await loadMappings();
  console.log(`📊 Loaded ${Object.keys(colorMappings).length} color mappings\n`);

  // Find all files
  const files = await fg(filePattern, {
    cwd: rootDir,
    ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**']
  });

  console.log(`📁 Found ${files.length} files to process\n`);

  const report = {
    totalFiles: files.length,
    processed: 0,
    modified: 0,
    totalReplacements: 0,
    files: []
  };

  for (const file of files) {
    const filePath = path.join(rootDir, file);

    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const { modified, replacements } = replaceColor(content, filePath);

      if (replacements.length > 0) {
        report.processed++;
        report.totalReplacements += replacements.length;

        const fileReport = {
          file,
          replacements: replacements.length,
          changes: replacements.slice(0, 10) // Limit for readability
        };

        report.files.push(fileReport);

        if (!dryRun && modified !== content) {
          await fs.writeFile(filePath, modified, 'utf-8');
          report.modified++;
          console.log(`✅ ${file} (${replacements.length} replacements)`);
        } else if (dryRun) {
          console.log(`📝 ${file} (${replacements.length} replacements - DRY RUN)`);
        }
      }
    } catch (error) {
      console.warn(`⚠️  Error processing ${file}: ${error.message}`);
    }
  }

  // Save report
  const reportPath = path.join(rootDir, 'reports/design-analysis/color-refactor-report.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log('\n' + '='.repeat(60));
  console.log('📊 REFACTORING SUMMARY');
  console.log('='.repeat(60));
  console.log(`\nTotal files: ${report.totalFiles}`);
  console.log(`Files with colors: ${report.processed}`);
  console.log(`Files modified: ${report.modified}`);
  console.log(`Total replacements: ${report.totalReplacements}`);
  console.log(`\n💾 Report saved to: ${reportPath}`);

  if (dryRun) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.');
  }

  console.log('='.repeat(60));
}

main().catch(console.error);

