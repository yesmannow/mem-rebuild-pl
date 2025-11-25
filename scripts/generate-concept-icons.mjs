import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Ocean Pearl brand colors
const BRAND_TEAL = '#40E0D0';
const BRAND_ORANGE = '#FFA500';
const STORMY_TEAL = '#006d77';
const PEARL_AQUA = '#83c5be';
const TANGERINE_DREAM = '#e29578';

/**
 * Generate concept icon SVG
 */
function generateConceptIcon(name, type) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const safeId = slug.replace(/[^a-z0-9-]/g, '-');

  let svg;

  if (type === 'process') {
    svg = generateProcessIcon(name, safeId);
  } else if (type === 'service') {
    svg = generateServiceIcon(name, safeId);
  } else if (type === 'testimonial') {
    svg = generateTestimonialIcon(name, safeId);
  } else {
    svg = generateDefaultIcon(name, safeId);
  }

  return { slug, svg, name };
}

function generateProcessIcon(name, safeId) {
  const iconMap = {
    'audit': {
      shape: `<path d="M32 16 L48 32 L32 48 L16 32 Z" fill="url(#gradient-${safeId})" opacity="0.9"/>`,
      accent: `<circle cx="32" cy="32" r="4" fill="${BRAND_TEAL}" opacity="0.8"/>`,
    },
    'architect': {
      shape: `<rect x="20" y="20" width="24" height="24" rx="4" fill="url(#gradient-${safeId})" opacity="0.9"/>`,
      accent: `<line x1="20" y1="32" x2="44" y2="32" stroke="${BRAND_ORANGE}" stroke-width="2" opacity="0.8"/>`,
    },
    'automate': {
      shape: `<circle cx="32" cy="32" r="12" fill="url(#gradient-${safeId})" opacity="0.9"/>`,
      accent: `<path d="M24 32 L30 38 L40 26" stroke="${BRAND_TEAL}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    },
    'scale': {
      shape: `<path d="M16 48 L32 16 L48 48 Z" fill="url(#gradient-${safeId})" opacity="0.9"/>`,
      accent: `<circle cx="32" cy="20" r="3" fill="${BRAND_ORANGE}" opacity="0.8"/>`,
    },
  };

  const icon = iconMap[name] || iconMap['audit'];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_TEAL};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BRAND_ORANGE};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background circle -->
  <circle cx="32" cy="32" r="28" fill="${STORMY_TEAL}" opacity="0.2"/>

  <!-- Main icon shape -->
  ${icon.shape}

  <!-- Accent element -->
  ${icon.accent}

  <!-- Outer border -->
  <circle cx="32" cy="32" r="28" fill="none" stroke="url(#gradient-${safeId})" stroke-width="2" opacity="0.5"/>
</svg>`;
}

function generateServiceIcon(name, safeId) {
  const iconMap = {
    'growth-os': {
      shape: `<rect x="16" y="16" width="32" height="32" rx="6" fill="url(#gradient-${safeId})" opacity="0.9"/>`,
      accent: `<path d="M24 32 L32 24 L40 32 L32 40 Z" fill="${BRAND_TEAL}" opacity="0.6"/>`,
    },
    'content-api': {
      shape: `<rect x="18" y="18" width="28" height="28" rx="4" fill="url(#gradient-${safeId})" opacity="0.9"/>`,
      accent: `<line x1="18" y1="28" x2="46" y2="28" stroke="${BRAND_ORANGE}" stroke-width="2" opacity="0.8"/>
               <line x1="18" y1="36" x2="46" y2="36" stroke="${BRAND_ORANGE}" stroke-width="2" opacity="0.8"/>`,
    },
    'data-link': {
      shape: `<circle cx="32" cy="32" r="14" fill="url(#gradient-${safeId})" opacity="0.9"/>`,
      accent: `<path d="M20 32 L28 32 M36 32 L44 32" stroke="${BRAND_TEAL}" stroke-width="3" stroke-linecap="round"/>
               <circle cx="24" cy="32" r="2" fill="${BRAND_ORANGE}"/>
               <circle cx="40" cy="32" r="2" fill="${BRAND_ORANGE}"/>`,
    },
  };

  const icon = iconMap[name] || iconMap['growth-os'];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${PEARL_AQUA};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${TANGERINE_DREAM};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="64" height="64" rx="8" fill="${STORMY_TEAL}" opacity="0.15"/>

  <!-- Main icon shape -->
  ${icon.shape}

  <!-- Accent elements -->
  ${icon.accent}

  <!-- Border -->
  <rect width="64" height="64" rx="8" fill="none" stroke="url(#gradient-${safeId})" stroke-width="2" opacity="0.4"/>
</svg>`;
}

function generateTestimonialIcon(name, safeId) {
  // Pixelated avatar style
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_TEAL};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BRAND_ORANGE};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="64" height="64" rx="8" fill="${STORMY_TEAL}" opacity="0.2"/>

  <!-- Pixelated head (8x8 grid style) -->
  <rect x="20" y="16" width="24" height="24" rx="2" fill="url(#gradient-${safeId})" opacity="0.9"/>

  <!-- Pixelated eyes -->
  <rect x="26" y="22" width="4" height="4" fill="${BRAND_TEAL}" opacity="0.8"/>
  <rect x="34" y="22" width="4" height="4" fill="${BRAND_TEAL}" opacity="0.8"/>

  <!-- Pixelated mouth -->
  <rect x="28" y="30" width="8" height="2" fill="${BRAND_ORANGE}" opacity="0.8"/>

  <!-- Pixelated body -->
  <rect x="24" y="40" width="16" height="12" rx="2" fill="url(#gradient-${safeId})" opacity="0.7"/>

  <!-- Border -->
  <rect width="64" height="64" rx="8" fill="none" stroke="url(#gradient-${safeId})" stroke-width="2" opacity="0.5"/>
</svg>`;
}

function generateDefaultIcon(name, safeId) {
  const initials = name
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_TEAL};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BRAND_ORANGE};stop-opacity:1" />
    </linearGradient>
  </defs>

  <circle cx="32" cy="32" r="28" fill="url(#gradient-${safeId})" opacity="0.2"/>
  <rect x="16" y="16" width="32" height="32" rx="6" fill="url(#gradient-${safeId})" opacity="0.9"/>
  <text x="32" y="40" font-family="system-ui" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>`;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Generating Concept Icons...\n');

  const conceptsDir = path.join(repoRoot, 'public', 'images', 'concepts');
  await fs.mkdir(conceptsDir, { recursive: true });

  const icons = [
    { name: 'audit', type: 'process' },
    { name: 'architect', type: 'process' },
    { name: 'automate', type: 'process' },
    { name: 'scale', type: 'process' },
    { name: 'growth-os', type: 'service' },
    { name: 'content-api', type: 'service' },
    { name: 'data-link', type: 'service' },
    { name: 'terminal-user', type: 'testimonial' },
  ];

  const generated = [];
  const failed = [];

  for (const icon of icons) {
    try {
      const { slug, svg, name } = generateConceptIcon(icon.name, icon.type);
      const filePath = path.join(conceptsDir, `${slug}.svg`);

      await fs.writeFile(filePath, svg, 'utf8');
      generated.push({ name, slug, path: `/images/concepts/${slug}.svg` });
      console.log(`✅ Generated: ${name} → ${slug}.svg`);
    } catch (error) {
      failed.push({ name: icon.name, error: error.message });
      console.error(`❌ Failed to generate ${icon.name}: ${error.message}`);
    }
  }

  console.log(`\n✨ Generated ${generated.length} concept icons`);
  if (failed.length > 0) {
    console.log(`⚠️  Failed to generate ${failed.length} icons`);
  }

  return { generated, failed };
}

main().catch(console.error);

