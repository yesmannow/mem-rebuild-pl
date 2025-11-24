import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Brand colors from Tailwind config
const BRAND_TEAL = '#40E0D0';
const BRAND_ORANGE = '#FFA500';

/**
 * Generate SVG logo for a brand based on its data
 * Integrates brand colors as accents while maintaining brand identity
 */
function generateBrandLogo(brand) {
  const slug = brand.id;
  const title = brand.title;
  const colors = brand.brandInfo?.colors || {};
  const primaryColors = colors.primary || [];
  const accentColors = colors.accent || [];
  const palette = colors.palette || 'Modern';

  // Get primary brand color (first primary color)
  const mainColor = primaryColors[0] || '#000000';
  const secondaryColor = primaryColors[1] || mainColor;
  const accentColor = accentColors[0] || BRAND_TEAL;

  // Extract initials for logo
  const initials = title
    .split(/[\s&!]+/)
    .map(word => word.charAt(0).toUpperCase())
    .filter(char => /[A-Z]/.test(char))
    .join('')
    .substring(0, 3);

  // Determine style based on brand category and description
  const isMinimal = brand.designPrinciples?.some(p =>
    p.toLowerCase().includes('minimal') || p.toLowerCase().includes('modern')
  );
  const isPlayful = brand.designPrinciples?.some(p =>
    p.toLowerCase().includes('playful') || p.toLowerCase().includes('whimsical')
  );
  const isLuxury = brand.designPrinciples?.some(p =>
    p.toLowerCase().includes('luxury') || p.toLowerCase().includes('premium')
  );

  // Generate SVG based on brand characteristics
  let svg;

  if (isPlayful) {
    // Playful, whimsical design
    svg = generatePlayfulLogo(title, initials, mainColor, secondaryColor, accentColor);
  } else if (isLuxury) {
    // Luxury, sophisticated design
    svg = generateLuxuryLogo(title, initials, mainColor, secondaryColor, accentColor);
  } else if (isMinimal) {
    // Minimal, modern design
    svg = generateMinimalLogo(title, initials, mainColor, secondaryColor, accentColor);
  } else {
    // Default balanced design
    svg = generateBalancedLogo(title, initials, mainColor, secondaryColor, accentColor);
  }

  return { slug, svg, title };
}

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

function generatePlayfulLogo(title, initials, mainColor, secondaryColor, accentColor) {
  const safeId = sanitizeId(title);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${mainColor};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:0.3" />
    </linearGradient>
    <linearGradient id="accent-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_TEAL};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${BRAND_ORANGE};stop-opacity:0.8" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="256" height="256" rx="40" fill="url(#bg-${safeId})"/>

  <!-- Playful shapes -->
  <circle cx="64" cy="64" r="24" fill="${accentColor}" opacity="0.6"/>
  <circle cx="192" cy="64" r="20" fill="${BRAND_TEAL}" opacity="0.5"/>
  <circle cx="64" cy="192" r="18" fill="${BRAND_ORANGE}" opacity="0.5"/>
  <circle cx="192" cy="192" r="22" fill="${accentColor}" opacity="0.6"/>

  <!-- Main logo area -->
  <rect x="80" y="80" width="96" height="96" rx="20" fill="${mainColor}" opacity="0.9"/>

  <!-- Accent border -->
  <rect x="80" y="80" width="96" height="96" rx="20" fill="none" stroke="url(#accent-${safeId})" stroke-width="4"/>

  <!-- Initials -->
  <text x="128" y="150" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="700" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>`;
}

function generateLuxuryLogo(title, initials, mainColor, secondaryColor, accentColor) {
  const safeId = sanitizeId(title);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="luxury-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${mainColor};stop-opacity:0.95" />
      <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:0.95" />
    </linearGradient>
    <linearGradient id="gold-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_ORANGE};stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:#FFD700;stop-opacity:0.9" />
    </linearGradient>
  </defs>

  <!-- Dark background -->
  <rect width="256" height="256" fill="#000000"/>

  <!-- Luxury frame -->
  <rect x="32" y="32" width="192" height="192" rx="8" fill="none" stroke="url(#gold-${safeId})" stroke-width="3"/>
  <rect x="40" y="40" width="176" height="176" rx="4" fill="url(#luxury-${safeId})"/>

  <!-- Elegant divider -->
  <line x1="128" y1="60" x2="128" y2="196" stroke="url(#gold-${safeId})" stroke-width="2" opacity="0.6"/>

  <!-- Initials with luxury styling -->
  <text x="128" y="140" font-family="Georgia, serif" font-size="56" font-weight="400" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle" letter-spacing="4">${initials}</text>

  <!-- Accent dots -->
  <circle cx="128" cy="50" r="4" fill="${BRAND_TEAL}" opacity="0.8"/>
  <circle cx="128" cy="206" r="4" fill="${BRAND_TEAL}" opacity="0.8"/>
</svg>`;
}

function generateMinimalLogo(title, initials, mainColor, secondaryColor, accentColor) {
  const safeId = sanitizeId(title);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="minimal-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_TEAL};stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:${BRAND_ORANGE};stop-opacity:0.15" />
    </linearGradient>
  </defs>

  <!-- Clean background -->
  <rect width="256" height="256" fill="#FFFFFF"/>

  <!-- Minimal geometric shape -->
  <rect x="64" y="64" width="128" height="128" rx="12" fill="${mainColor}" opacity="0.9"/>

  <!-- Accent line -->
  <line x1="64" y1="128" x2="192" y2="128" stroke="url(#minimal-${safeId})" stroke-width="6"/>

  <!-- Clean typography -->
  <text x="128" y="150" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="600" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${initials}</text>

  <!-- Subtle accent -->
  <circle cx="128" cy="200" r="8" fill="${BRAND_TEAL}" opacity="0.6"/>
</svg>`;
}

function generateBalancedLogo(title, initials, mainColor, secondaryColor, accentColor) {
  const safeId = sanitizeId(title);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="balanced-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${mainColor};stop-opacity:0.2" />
      <stop offset="50%" style="stop-color:${BRAND_TEAL};stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:0.2" />
    </linearGradient>
    <linearGradient id="accent-balanced-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_TEAL};stop-opacity:0.7" />
      <stop offset="100%" style="stop-color:${BRAND_ORANGE};stop-opacity:0.7" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="256" height="256" rx="32" fill="url(#balanced-${safeId})"/>

  <!-- Main logo container -->
  <rect x="48" y="48" width="160" height="160" rx="24" fill="${mainColor}" opacity="0.95"/>

  <!-- Accent border -->
  <rect x="48" y="48" width="160" height="160" rx="24" fill="none" stroke="url(#accent-balanced-${safeId})" stroke-width="3"/>

  <!-- Initials -->
  <text x="128" y="150" font-family="system-ui, -apple-system, sans-serif" font-size="50" font-weight="700" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${initials}</text>

  <!-- Decorative elements -->
  <circle cx="128" cy="80" r="6" fill="${BRAND_TEAL}" opacity="0.8"/>
  <circle cx="128" cy="220" r="6" fill="${BRAND_ORANGE}" opacity="0.8"/>
</svg>`;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Generating Brand Logo SVGs...\n');

  // Load brand identities
  const brandDataPath = path.join(repoRoot, 'src', 'data', 'brand-identities.json');
  const brandData = JSON.parse(await fs.readFile(brandDataPath, 'utf8'));
  const brands = brandData.brands || [];

  // Get existing SVG files
  const inspirationsDir = path.join(repoRoot, 'public', 'images', 'inspirations');
  const existingFiles = await fs.readdir(inspirationsDir).catch(() => []);
  const existingSvgs = new Set(existingFiles.filter(f => f.endsWith('.svg')));

  // Find brands with missing SVGs
  const missingBrands = brands.filter(brand => {
    const expectedFile = `${brand.id}.svg`;
    return !existingSvgs.has(expectedFile);
  });

  console.log(`📊 Found ${brands.length} total brands`);
  console.log(`📊 Found ${existingSvgs.size} existing SVGs`);
  console.log(`📊 Need to generate ${missingBrands.length} logos\n`);

  if (missingBrands.length === 0) {
    console.log('✅ All brand logos already exist!');
    return;
  }

  const generated = [];
  const failed = [];

  for (const brand of missingBrands) {
    try {
      const { slug, svg, title } = generateBrandLogo(brand);
      const filePath = path.join(inspirationsDir, `${slug}.svg`);

      await fs.writeFile(filePath, svg, 'utf8');
      generated.push({ brand: title, slug, path: `/images/inspirations/${slug}.svg` });
      console.log(`✅ Generated: ${title} → ${slug}.svg`);
    } catch (error) {
      failed.push({ brand: brand.title, error: error.message });
      console.error(`❌ Failed to generate ${brand.title}: ${error.message}`);
    }
  }

  console.log(`\n✨ Generated ${generated.length} brand logos`);
  if (failed.length > 0) {
    console.log(`⚠️  Failed to generate ${failed.length} logos`);
  }

  return { generated, failed };
}

main().catch(console.error);

