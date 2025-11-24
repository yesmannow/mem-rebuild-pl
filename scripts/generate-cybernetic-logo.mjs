import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Ocean Pearl brand colors
const BRAND_TEAL = '#40E0D0';
const BRAND_ORANGE = '#FFA500';
const BG_DARK = '#0f172a';

/**
 * Sanitize ID for XML compatibility
 */
function sanitizeId(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Generate Cybernetic Monogram SVG
 * Design: JD wrapped in tech brackets with status dot
 */
function generateCyberneticLogo() {
  const safeId = sanitizeId('cybernetic-logo');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Main gradient: Teal to Orange -->
    <linearGradient id="gradient-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_TEAL};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BRAND_ORANGE};stop-opacity:1" />
    </linearGradient>

    <!-- Glow filter for interactive effects -->
    <filter id="glow-${safeId}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Status dot glow -->
    <radialGradient id="status-glow-${safeId}" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:${BRAND_TEAL};stop-opacity:1" />
      <stop offset="70%" style="stop-color:${BRAND_TEAL};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${BRAND_TEAL};stop-opacity:0" />
    </radialGradient>
  </defs>

  <!-- Background circle (subtle) -->
  <circle cx="32" cy="32" r="30" fill="${BG_DARK}" opacity="0.3"/>

  <!-- Tech bracket: Opening -->
  <path d="M 12 20 L 12 44 L 18 44 L 18 26 L 16 24 L 12 20 Z" fill="url(#gradient-${safeId})" opacity="0.6"/>

  <!-- Tech bracket: Closing -->
  <path d="M 52 20 L 52 44 L 46 44 L 46 26 L 48 24 L 52 20 Z" fill="url(#gradient-${safeId})" opacity="0.6"/>

  <!-- JD Monogram -->
  <g transform="translate(32, 32)">
    <!-- J -->
    <path d="M -8 -12 L -8 8 L -4 8 L -4 4 L 0 4 L 0 0 L -4 0 L -4 -8 L -8 -12 Z" fill="url(#gradient-${safeId})"/>
    <!-- D -->
    <path d="M 4 -12 L 4 8 L 12 8 L 16 4 L 16 0 L 12 -4 L 16 -8 L 16 -12 L 4 -12 Z M 8 -8 L 8 4 L 12 4 L 14 2 L 14 -2 L 12 -4 L 8 -8 Z" fill="url(#gradient-${safeId})"/>
  </g>

  <!-- Status dot (top right) -->
  <circle cx="50" cy="14" r="4" fill="${BRAND_TEAL}" opacity="0.9" filter="url(#glow-${safeId})">
    <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
  </circle>

  <!-- Status dot inner glow -->
  <circle cx="50" cy="14" r="2" fill="url(#status-glow-${safeId})" opacity="0.6">
    <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}

/**
 * Main execution
 */
async function main() {
  console.log('🤖 Generating Cybernetic Monogram Logo...\n');

  const outputPath = path.join(repoRoot, 'public', 'logo-tech.svg');

  try {
    const svg = generateCyberneticLogo();
    await fs.writeFile(outputPath, svg, 'utf8');

    console.log(`✅ Generated: logo-tech.svg`);
    console.log(`📁 Saved to: ${outputPath}`);
    console.log('\n💡 Next step: Create InteractiveLogo.tsx component');
    console.log('   Then update Navbar.tsx to use <InteractiveLogo />');

    return { success: true, path: outputPath };
  } catch (error) {
    console.error(`❌ Error generating logo: ${error.message}`);
    process.exit(1);
  }
}

main().catch(console.error);

