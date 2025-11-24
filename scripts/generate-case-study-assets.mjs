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
 * Generate professional case study SVG
 * Theme: Medical/Professional (Blue/Teal) or Legal/Corporate (Dark Navy/Grey)
 */
function generateCaseStudySVG(title, initials, theme) {
  const safeId = sanitizeId(title);

  let mainColor, secondaryColor, bgColor, textColor, accentColor;

  if (theme === 'medical') {
    // Medical/Professional: Blue/Teal theme
    mainColor = '#0066CC'; // Professional blue
    secondaryColor = '#40E0D0'; // Brand teal
    bgColor = '#F0F8FF'; // Light blue background
    textColor = '#FFFFFF';
    accentColor = BRAND_TEAL;
  } else {
    // Legal/Corporate: Dark Navy/Grey theme
    mainColor = '#1A1A2E'; // Dark navy
    secondaryColor = '#16213E'; // Darker navy
    bgColor = '#2D2D44'; // Dark grey background
    textColor = '#FFFFFF';
    accentColor = '#4A5568'; // Professional grey
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${mainColor};stop-opacity:0.15" />
      <stop offset="50%" style="stop-color:${secondaryColor};stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:${mainColor};stop-opacity:0.15" />
    </linearGradient>
    <linearGradient id="accent-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_TEAL};stop-opacity:0.6" />
      <stop offset="100%" style="stop-color:${BRAND_ORANGE};stop-opacity:0.6" />
    </linearGradient>
    <linearGradient id="main-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${mainColor};stop-opacity:0.95" />
      <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:0.95" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="256" height="256" rx="16" fill="${bgColor}"/>

  <!-- Subtle background gradient -->
  <rect width="256" height="256" rx="16" fill="url(#bg-${safeId})"/>

  <!-- Main logo container -->
  <rect x="40" y="40" width="176" height="176" rx="20" fill="url(#main-${safeId})"/>

  <!-- Professional accent border -->
  <rect x="40" y="40" width="176" height="176" rx="20" fill="none" stroke="url(#accent-${safeId})" stroke-width="3"/>

  <!-- Inner decorative line -->
  <line x1="60" y1="128" x2="196" y2="128" stroke="${textColor}" stroke-width="2" opacity="0.3"/>

  <!-- Initials -->
  <text x="128" y="150" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="56" font-weight="700" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" letter-spacing="2">${initials}</text>

  <!-- Professional accent dots -->
  <circle cx="128" cy="80" r="5" fill="${BRAND_TEAL}" opacity="0.8"/>
  <circle cx="128" cy="220" r="5" fill="${BRAND_ORANGE}" opacity="0.8"/>

  <!-- Corner accents -->
  <rect x="50" y="50" width="8" height="8" rx="2" fill="${BRAND_TEAL}" opacity="0.5"/>
  <rect x="198" y="50" width="8" height="8" rx="2" fill="${BRAND_ORANGE}" opacity="0.5"/>
  <rect x="50" y="198" width="8" height="8" rx="2" fill="${BRAND_ORANGE}" opacity="0.5"/>
  <rect x="198" y="198" width="8" height="8" rx="2" fill="${BRAND_TEAL}" opacity="0.5"/>
</svg>`;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Generating Case Study SVG Assets...\n');

  const outputDir = path.join(repoRoot, 'public', 'images', 'case-studies');

  // Ensure directory exists
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }

  // Case study definitions
  const caseStudies = [
    {
      filename: 'graston-ceu-system.svg',
      title: 'Graston Technique CEU System',
      theme: 'medical',
      initials: 'GCEU'
    },
    {
      filename: 'riley-bennett-egloff.svg',
      title: 'Riley Bennett Egloff',
      theme: 'legal',
      initials: 'RBE'
    }
  ];

  const generated = [];

  for (const caseStudy of caseStudies) {
    try {
      const svg = generateCaseStudySVG(caseStudy.title, caseStudy.initials, caseStudy.theme);
      const filePath = path.join(outputDir, caseStudy.filename);

      await fs.writeFile(filePath, svg, 'utf8');
      generated.push({
        title: caseStudy.title,
        filename: caseStudy.filename,
        path: `/images/case-studies/${caseStudy.filename}`
      });
      console.log(`✅ Generated: ${caseStudy.title} → ${caseStudy.filename}`);
    } catch (error) {
      console.error(`❌ Failed to generate ${caseStudy.title}: ${error.message}`);
    }
  }

  console.log(`\n✨ Generated ${generated.length} case study SVGs`);
  console.log('\n📁 Files saved to: public/images/case-studies/');
  console.log('\n💡 Next step: Verify paths in caseStudies.ts match these filenames');

  return generated;
}

main().catch(console.error);

