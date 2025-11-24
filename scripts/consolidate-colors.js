#!/usr/bin/env node
/**
 * Color Consolidation Script
 * Maps the 394 colors from css_colors.json to the new design system palette
 * and generates a migration report.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Design System Palette from DESIGN_SYSTEM.md
const designSystemColors = {
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

/**
 * Convert hex to RGB for color distance calculation
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate color distance (Euclidean distance in RGB space)
 */
function colorDistance(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return Infinity;

  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Normalize hex color (add # if missing, handle 3-digit hex)
 */
function normalizeHex(hex) {
  if (!hex) return null;
  let normalized = hex.toString().trim();
  if (!normalized.startsWith('#')) {
    normalized = '#' + normalized;
  }
  // Handle 3-digit hex
  if (normalized.length === 4) {
    normalized = '#' + normalized[1] + normalized[1] + normalized[2] + normalized[2] + normalized[3] + normalized[3];
  }
  // Handle 4-digit hex (with alpha)
  if (normalized.length === 5) {
    normalized = '#' + normalized[1] + normalized[1] + normalized[2] + normalized[2] + normalized[3] + normalized[3] + normalized[4] + normalized[4];
  }
  return normalized.length === 7 ? normalized : null;
}

/**
 * Find closest design system color
 */
function findClosestColor(color, threshold = 50) {
  const normalized = normalizeHex(color);
  if (!normalized) return null;

  let closest = null;
  let minDistance = Infinity;
  let closestName = null;

  for (const [name, systemColor] of Object.entries(designSystemColors)) {
    const distance = colorDistance(normalized, systemColor);
    if (distance < minDistance) {
      minDistance = distance;
      closest = systemColor;
      closestName = name;
    }
  }

  return {
    original: color,
    closest: closest,
    name: closestName,
    distance: minDistance,
    shouldReplace: minDistance < threshold
  };
}

async function main() {
  console.log('🎨 Color Consolidation Script\n');
  console.log('=' .repeat(60));

  // Load CSS colors
  const cssColorsPath = path.join(rootDir, 'reports/design-analysis/css_colors.json');
  let cssColorsData;

  try {
    const fileContent = await fs.readFile(cssColorsPath, 'utf-8');
    cssColorsData = JSON.parse(fileContent);
  } catch (error) {
    console.error('❌ Error reading css_colors.json:', error.message);
    process.exit(1);
  }

  const allColors = cssColorsData.all_colors || [];
  console.log(`\n📊 Analyzing ${allColors.length} colors...\n`);

  // Analyze each color
  const analysis = {
    exactMatches: [],
    closeMatches: [],
    farMatches: [],
    unmapped: [],
    duplicates: new Map()
  };

  const seen = new Set();

  for (const color of allColors) {
    // Skip empty or invalid colors
    if (!color || color.trim() === '') continue;

    // Check for duplicates
    const normalized = normalizeHex(color);
    if (normalized && seen.has(normalized)) {
      const count = analysis.duplicates.get(normalized) || 0;
      analysis.duplicates.set(normalized, count + 1);
      continue;
    }
    if (normalized) seen.add(normalized);

    const match = findClosestColor(color);
    if (!match) {
      analysis.unmapped.push(color);
      continue;
    }

    if (match.distance === 0) {
      analysis.exactMatches.push(match);
    } else if (match.distance < 20) {
      analysis.closeMatches.push(match);
    } else if (match.distance < 50) {
      analysis.farMatches.push(match);
    } else {
      analysis.unmapped.push(color);
    }
  }

  // Generate report
  const report = {
    summary: {
      totalColors: allColors.length,
      uniqueColors: seen.size,
      exactMatches: analysis.exactMatches.length,
      closeMatches: analysis.closeMatches.length,
      farMatches: analysis.farMatches.length,
      unmapped: analysis.unmapped.length,
      duplicates: analysis.duplicates.size
    },
    designSystemPalette: designSystemColors,
    mappings: {
      exact: analysis.exactMatches.map(m => ({
        original: m.original,
        replaceWith: m.closest,
        token: `--color-${m.name}`
      })),
      close: analysis.closeMatches.map(m => ({
        original: m.original,
        replaceWith: m.closest,
        token: `--color-${m.name}`,
        distance: Math.round(m.distance)
      })),
      far: analysis.farMatches.map(m => ({
        original: m.original,
        replaceWith: m.closest,
        token: `--color-${m.name}`,
        distance: Math.round(m.distance)
      }))
    },
    unmapped: analysis.unmapped,
    duplicates: Array.from(analysis.duplicates.entries()).map(([color, count]) => ({
      color,
      occurrences: count + 1
    }))
  };

  // Save report
  const reportPath = path.join(rootDir, 'reports/design-analysis/color-consolidation-report.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  // Print summary
  console.log('📊 CONSOLIDATION SUMMARY');
  console.log('=' .repeat(60));
  console.log(`\nTotal colors analyzed: ${allColors.length}`);
  console.log(`Unique colors: ${seen.size}`);
  console.log(`\n✅ Exact matches: ${analysis.exactMatches.length}`);
  console.log(`🟡 Close matches (<20): ${analysis.closeMatches.length}`);
  console.log(`🟠 Far matches (20-50): ${analysis.farMatches.length}`);
  console.log(`❌ Unmapped (>50): ${analysis.unmapped.length}`);
  console.log(`🔄 Duplicates: ${analysis.duplicates.size}`);

  console.log(`\n💾 Report saved to: ${reportPath}`);

  // Generate CSS variables file
  const cssVarsPath = path.join(rootDir, 'src/styles/design-system-colors.css');
  const cssContent = `/* Design System Color Tokens */
/* Generated from color consolidation analysis */
/* Update date: ${new Date().toISOString()} */

:root {
  /* Primary Brand Colors */
  --color-primary: ${designSystemColors.primary};
  --color-secondary: ${designSystemColors.secondary};
  --color-accent: ${designSystemColors.accent};

  /* Surface Colors */
  --color-surface: ${designSystemColors.surface};
  --color-light: ${designSystemColors.light};
  --color-dark: ${designSystemColors.dark};

  /* Neutral Colors */
  --color-neutral-1: ${designSystemColors['neutral-1']};
  --color-neutral-2: ${designSystemColors['neutral-2']};

  /* Semantic Colors */
  --color-success: ${designSystemColors.success};
  --color-warning: ${designSystemColors.warning};
  --color-danger: ${designSystemColors.danger};
}

/* Migration Notes:
 * - ${analysis.exactMatches.length} colors match exactly
 * - ${analysis.closeMatches.length} colors are close matches (<20 distance)
 * - ${analysis.farMatches.length} colors are far matches (20-50 distance)
 * - ${analysis.unmapped.length} colors need manual review
 *
 * See reports/design-analysis/color-consolidation-report.json for full mapping
 */
`;

  await fs.writeFile(cssVarsPath, cssContent, 'utf-8');
  console.log(`\n✅ CSS variables generated: ${cssVarsPath}`);

  console.log('\n' + '='.repeat(60));
  console.log('✨ Color consolidation complete!');
  console.log('='.repeat(60));
  console.log('\n📋 Next steps:');
  console.log('1. Review color-consolidation-report.json');
  console.log('2. Update CSS files to use new design system tokens');
  console.log('3. Test color changes for accessibility');
  console.log('4. Update components to use CSS variables\n');
}

main().catch(console.error);

