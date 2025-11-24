import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Ocean Pearl theme colors
const BG_DARK = '#0f172a';
const TEXT_TEAL = '#40E0D0';
const BRAND_ORANGE = '#FFA500';
const ACCENT_TEAL = '#40E0D0';

// OG image dimensions (standard Open Graph size)
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/**
 * Sanitize ID for XML compatibility
 * Removes special characters and normalizes non-ASCII characters
 */
function sanitizeId(str) {
  return str
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric (except hyphens) with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate Open Graph SVG image
 * Theme: Ocean Pearl (Dark background, Teal text)
 */
function generateOGImage(pageTitle, subtitle = '') {
  const safeId = sanitizeId(pageTitle);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bg-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BG_DARK};stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1e293b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BG_DARK};stop-opacity:1" />
    </linearGradient>

    <!-- Teal accent gradient -->
    <linearGradient id="accent-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${TEXT_TEAL};stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:${BRAND_ORANGE};stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:${TEXT_TEAL};stop-opacity:0.3" />
    </linearGradient>

    <!-- Pattern overlay -->
    <pattern id="pattern-${safeId}" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
      <circle cx="60" cy="60" r="2" fill="${TEXT_TEAL}" opacity="0.1"/>
      <circle cx="0" cy="0" r="1" fill="${BRAND_ORANGE}" opacity="0.08"/>
      <circle cx="120" cy="120" r="1" fill="${BRAND_ORANGE}" opacity="0.08"/>
    </pattern>

    <!-- Glow effect -->
    <radialGradient id="glow-${safeId}" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:${TEXT_TEAL};stop-opacity:0.4" />
      <stop offset="50%" style="stop-color:${TEXT_TEAL};stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:${TEXT_TEAL};stop-opacity:0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#bg-${safeId})"/>

  <!-- Pattern overlay -->
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#pattern-${safeId})"/>

  <!-- Glow effects -->
  <ellipse cx="200" cy="200" rx="300" ry="300" fill="url(#glow-${safeId})"/>
  <ellipse cx="1000" cy="430" rx="250" ry="250" fill="url(#glow-${safeId})" opacity="0.6"/>

  <!-- Accent gradient overlay -->
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#accent-${safeId})" opacity="0.4"/>

  <!-- Decorative geometric shapes -->
  <rect x="80" y="80" width="4" height="120" rx="2" fill="${TEXT_TEAL}" opacity="0.3"/>
  <rect x="${OG_WIDTH - 84}" y="${OG_HEIGHT - 200}" width="4" height="120" rx="2" fill="${BRAND_ORANGE}" opacity="0.3"/>
  <circle cx="150" cy="${OG_HEIGHT - 100}" r="60" fill="none" stroke="${TEXT_TEAL}" stroke-width="2" opacity="0.2"/>
  <circle cx="${OG_WIDTH - 150}" cy="150" r="80" fill="none" stroke="${BRAND_ORANGE}" stroke-width="2" opacity="0.2"/>

  <!-- Main content area -->
  <g transform="translate(100, ${subtitle ? 240 : 280})">
    <!-- Page title -->
    <text
      x="0"
      y="0"
      font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
      font-size="72"
      font-weight="700"
      fill="${TEXT_TEAL}"
      letter-spacing="-1"
    >${pageTitle}</text>

    ${subtitle ? `
    <!-- Subtitle -->
    <text
      x="0"
      y="90"
      font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
      font-size="36"
      font-weight="400"
      fill="#94a3b8"
      opacity="0.8"
      letter-spacing="0.5"
    >${subtitle}</text>
    ` : ''}
  </g>

  <!-- Bottom accent line -->
  <line x1="100" y1="${OG_HEIGHT - 60}" x2="${OG_WIDTH - 100}" y2="${OG_HEIGHT - 60}" stroke="${TEXT_TEAL}" stroke-width="3" opacity="0.5"/>

  <!-- Corner accents -->
  <circle cx="100" cy="100" r="8" fill="${TEXT_TEAL}" opacity="0.4"/>
  <circle cx="${OG_WIDTH - 100}" cy="100" r="8" fill="${BRAND_ORANGE}" opacity="0.4"/>
  <circle cx="100" cy="${OG_HEIGHT - 100}" r="8" fill="${BRAND_ORANGE}" opacity="0.4"/>
  <circle cx="${OG_WIDTH - 100}" cy="${OG_HEIGHT - 100}" r="8" fill="${TEXT_TEAL}" opacity="0.4"/>
</svg>`;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Generating Open Graph Social Images...\n');

  const outputDir = path.join(repoRoot, 'public', 'og');

  // Ensure directory exists
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }

  // Define pages to generate OG images for
  const pages = [
    {
      filename: 'home.svg',
      title: 'Jacob Darling',
      subtitle: 'Fractional CMO & Marketing Technologist'
    },
    {
      filename: 'case-studies.svg',
      title: 'Case Studies',
      subtitle: 'Strategic Marketing Solutions'
    },
    {
      filename: 'tools.svg',
      title: 'Tools & CLI',
      subtitle: 'Marketing Technology Stack'
    }
  ];

  const generated = [];

  for (const page of pages) {
    try {
      const svg = generateOGImage(page.title, page.subtitle);
      const filePath = path.join(outputDir, page.filename);

      await fs.writeFile(filePath, svg, 'utf8');
      generated.push({
        title: page.title,
        filename: page.filename,
        path: `/og/${page.filename}`
      });
      console.log(`✅ Generated: ${page.title} → ${page.filename}`);
    } catch (error) {
      console.error(`❌ Failed to generate ${page.title}: ${error.message}`);
    }
  }

  console.log(`\n✨ Generated ${generated.length} Open Graph images`);
  console.log('\n📁 Files saved to: public/og/');
  console.log('\n💡 Next step: Update index.html to reference /og/home.svg');
  console.log('\n📋 Generated files:');
  generated.forEach(({ title, path: filePath }) => {
    console.log(`   ${title}: ${filePath}`);
  });

  return generated;
}

main().catch(console.error);

