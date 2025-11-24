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
 * Top 10 technologies to generate icons for
 * Based on frequency in tools and importance
 */
const TOP_TECHNOLOGIES = [
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'HubSpot',
  'JavaScript',
  'Express',
  'Vite',
  'Tailwind CSS',
  'GitHub',
];

/**
 * Generate SVG icon for a technology
 * Creates a modern, geometric icon using brand colors
 */
function generateTechIcon(techName) {
  const slug = techName.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
  const initials = techName
    .split(/[\s.-]+/)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 3);

  // Create a geometric, modern icon design
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient-${slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_TEAL};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BRAND_ORANGE};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background circle with gradient -->
  <circle cx="32" cy="32" r="30" fill="url(#gradient-${slug})" opacity="0.2"/>

  <!-- Inner geometric shape -->
  <rect x="16" y="16" width="32" height="32" rx="6" fill="url(#gradient-${slug})" opacity="0.9"/>

  <!-- Text/Initials -->
  <text
    x="32"
    y="38"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="18"
    font-weight="700"
    fill="${BRAND_TEAL}"
    text-anchor="middle"
    dominant-baseline="middle"
  >${initials}</text>

  <!-- Accent border -->
  <rect x="16" y="16" width="32" height="32" rx="6" fill="none" stroke="${BRAND_ORANGE}" stroke-width="2" opacity="0.6"/>
</svg>`;

  return { slug, svg, techName };
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Generating tech icons...\n');

  const outputDir = path.join(repoRoot, 'public', 'images', 'tech-icons');

  // Ensure directory exists
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }

  const generated = [];

  for (const tech of TOP_TECHNOLOGIES) {
    const { slug, svg } = generateTechIcon(tech);
    const filePath = path.join(outputDir, `${slug}.svg`);

    await fs.writeFile(filePath, svg, 'utf8');
    generated.push({ tech, slug, path: `/images/tech-icons/${slug}.svg` });
    console.log(`✅ Generated icon for ${tech} → ${slug}.svg`);
  }

  console.log(`\n✨ Generated ${generated.length} tech icons in ${outputDir}`);
  console.log('\n💡 Next step: Update ToolsShowcase.tsx to include iconSrc paths');
  console.log('\nExample mapping:');
  generated.forEach(({ tech, path: iconPath }) => {
    console.log(`  ${tech}: '${iconPath}'`);
  });

  return generated;
}

main().catch(console.error);

