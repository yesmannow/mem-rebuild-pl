#!/usr/bin/env node
/**
 * Enhanced Color Mapping Script
 * Maps all "far match" and "unmapped" colors to the design system palette
 * Generates a complete migration guide
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Design System Palette
const designSystem = {
  primary: '#005AE2',
  secondary: '#23D2D5',
  accent: '#FFD600',
  surface: '#F6F8FA',
  'neutral-1': '#111827',
  'neutral-2': '#6B7280',
  success: '#34D399',
  warning: '#F59E42',
  danger: '#EF4444',
  light: '#FFFFFF',
  dark: '#1B263B'
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function colorDistance(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return Infinity;

  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function normalizeHex(hex) {
  if (!hex) return null;
  let normalized = hex.toString().trim();
  if (!normalized.startsWith('#')) {
    normalized = '#' + normalized;
  }
  if (normalized.length === 4) {
    normalized = '#' + normalized[1] + normalized[1] + normalized[2] + normalized[2] + normalized[3] + normalized[3];
  }
  return normalized.length === 7 ? normalized : null;
}

function findBestMatch(color) {
  const normalized = normalizeHex(color);
  if (!normalized) return null;

  let bestMatch = null;
  let minDistance = Infinity;
  let bestToken = null;

  for (const [name, systemColor] of Object.entries(designSystem)) {
    const distance = colorDistance(normalized, systemColor);
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = systemColor;
      bestToken = name;
    }
  }

  return {
    original: color,
    normalized,
    match: bestMatch,
    token: `--color-${bestToken}`,
    distance: minDistance,
    category: minDistance < 20 ? 'close' : minDistance < 50 ? 'far' : 'unmapped'
  };
}

async function main() {
  console.log('🎨 Enhanced Color Mapping\n');
  console.log('='.repeat(60));

  // Load color consolidation report
  const reportPath = path.join(rootDir, 'reports/design-analysis/color-consolidation-report.json');
  const report = JSON.parse(await fs.readFile(reportPath, 'utf-8'));

  // Get all unmapped colors from CSS
  const cssColorsPath = path.join(rootDir, 'reports/design-analysis/css_colors.json');
  const cssColors = JSON.parse(await fs.readFile(cssColorsPath, 'utf-8'));

  const allColors = cssColors.all_colors || [];
  const mapped = new Set();

  // Add already mapped colors
  report.mappings.exact.forEach(m => mapped.add(normalizeHex(m.original) || m.original));
  report.mappings.close.forEach(m => mapped.add(normalizeHex(m.original) || m.original));
  report.mappings.far.forEach(m => mapped.add(normalizeHex(m.original) || m.original));

  // Map all remaining colors
  const newMappings = {
    far: [],
    unmapped: []
  };

  for (const color of allColors) {
    if (!color || color.trim() === '') continue;
    const normalized = normalizeHex(color);
    if (!normalized || mapped.has(normalized)) continue;

    const match = findBestMatch(color);
    if (match) {
      if (match.distance < 50) {
        newMappings.far.push({
          original: color,
          replaceWith: match.match,
          token: match.token,
          distance: Math.round(match.distance)
        });
      } else {
        newMappings.unmapped.push({
          original: color,
          replaceWith: match.match,
          token: match.token,
          distance: Math.round(match.distance),
          note: 'Requires visual review - may need new token'
        });
      }
      mapped.add(normalized);
    }
  }

  // Combine with existing mappings
  const completeMappings = {
    exact: report.mappings.exact,
    close: report.mappings.close,
    far: [...report.mappings.far, ...newMappings.far],
    unmapped: newMappings.unmapped
  };

  // Generate migration guide
  const migrationGuide = {
    summary: {
      totalColors: allColors.length,
      exactMatches: completeMappings.exact.length,
      closeMatches: completeMappings.close.length,
      farMatches: completeMappings.far.length,
      unmapped: completeMappings.unmapped.length,
      mappedPercentage: Math.round(((completeMappings.exact.length + completeMappings.close.length + completeMappings.far.length) / allColors.length) * 100)
    },
    designSystem: designSystem,
    mappings: completeMappings,
    migrationSteps: [
      '1. Update src/styles/design-system-colors.css with all tokens',
      '2. Replace hardcoded colors in CSS files',
      '3. Replace hardcoded colors in React components',
      '4. Update Tailwind config to use CSS variables',
      '5. Test all pages for visual consistency',
      '6. Verify accessibility (WCAG AA contrast)'
    ]
  };

  // Save enhanced mapping
  const enhancedPath = path.join(rootDir, 'reports/design-analysis/enhanced-color-mapping.json');
  await fs.writeFile(enhancedPath, JSON.stringify(migrationGuide, null, 2), 'utf-8');

  console.log(`\n📊 Enhanced Mapping Summary:`);
  console.log(`   Total colors: ${allColors.length}`);
  console.log(`   Exact matches: ${completeMappings.exact.length}`);
  console.log(`   Close matches: ${completeMappings.close.length}`);
  console.log(`   Far matches: ${completeMappings.far.length}`);
  console.log(`   Unmapped: ${completeMappings.unmapped.length}`);
  console.log(`   Mapped: ${migrationGuide.summary.mappedPercentage}%`);

  console.log(`\n💾 Enhanced mapping saved to: ${enhancedPath}`);
  console.log('='.repeat(60));
}

main().catch(console.error);

