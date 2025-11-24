/**
 * Logo Variation Generator
 * Creates multiple logo variations based on design tokens
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate SVG logo variations
 */
function generateLogoVariations() {
  const outputDir = path.join(__dirname, '../public/logos');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const variations = [
    {
      name: 'cave-icon',
      description: 'Cave entrance icon only',
      viewBox: '0 0 200 200',
      svg: generateCaveIconSVG(),
    },
    {
      name: 'cave-lockup',
      description: 'Cave icon with wordmark',
      viewBox: '0 0 400 200',
      svg: generateCaveLockupSVG(),
    },
    {
      name: 'cave-full',
      description: 'Full logo with marketing tagline',
      viewBox: '0 0 500 200',
      svg: generateCaveFullSVG(),
    },
    {
      name: 'cave-monochrome',
      description: 'Monochrome version for dark backgrounds',
      viewBox: '0 0 200 200',
      svg: generateCaveMonochromeSVG(),
    },
  ];

  console.log('🎨 Generating logo variations...\n');

  variations.forEach((variation) => {
    const filePath = path.join(outputDir, `${variation.name}.svg`);
    fs.writeFileSync(filePath, variation.svg);
    console.log(`✅ Created ${variation.name}.svg - ${variation.description}`);
  });

  // Generate React component exports
  const componentExports = generateComponentExports(variations);
  const componentPath = path.join(__dirname, '../src/components/branding/LogoVariations.tsx');
  fs.writeFileSync(componentPath, componentExports);
  console.log(`\n✅ Created LogoVariations.tsx component`);

  console.log(`\n📁 Logos saved to: ${outputDir}`);
  console.log(`📁 Component saved to: ${componentPath}`);
}

function generateCaveIconSVG() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff6b3d" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#ff8c5a" stop-opacity="0.7" />
    </linearGradient>
    <linearGradient id="telemetryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00a8a8" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#00d4d4" stop-opacity="0.6" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Mountain range -->
  <path d="M 20 140 L 60 80 L 100 100 L 140 60 L 180 100 L 200 140 L 20 140 Z"
        fill="#0b1014" stroke="#ff6b3d" stroke-width="2" opacity="0.8" />

  <!-- Cave entrance arch -->
  <path d="M 70 140 Q 100 100 130 140"
        fill="none" stroke="url(#signalGradient)" stroke-width="4"
        stroke-linecap="round" filter="url(#glow)" />

  <!-- Inner cave depth -->
  <path d="M 80 140 Q 100 120 120 140"
        fill="#0b1014" opacity="0.6" />

  <!-- Bear silhouette -->
  <ellipse cx="100" cy="130" rx="25" ry="20" fill="#1e2a32" />
  <circle cx="100" cy="115" r="15" fill="#1e2a32" />
  <circle cx="90" cy="108" r="5" fill="#1e2a32" />
  <circle cx="110" cy="108" r="5" fill="#1e2a32" />
  <ellipse cx="100" cy="120" rx="6" ry="8" fill="#1e2a32" />
  <circle cx="95" cy="112" r="2" fill="#ff6b3d" opacity="0.8" />

  <!-- Telemetry accent lines -->
  <line x1="50" y1="120" x2="70" y2="120" stroke="#00a8a8" stroke-width="2" opacity="0.6" />
  <line x1="130" y1="120" x2="150" y2="120" stroke="#00a8a8" stroke-width="2" opacity="0.6" />
</svg>`;
}

function generateCaveLockupSVG() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="signalGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff6b3d" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#ff8c5a" stop-opacity="0.7" />
    </linearGradient>
  </defs>

  <!-- Icon (left side) -->
  <g transform="translate(0, 0)">
    ${generateCaveIconSVG().match(/<defs>[\s\S]*<\/defs>/)?.[0] || ''}
    <g transform="scale(0.8) translate(20, 20)">
      ${generateCaveIconSVG().match(/<!--[\s\S]*-->/)?.[0] || ''}
    </g>
  </g>

  <!-- Wordmark (right side) -->
  <text x="220" y="100" font-family="Fraunces 144, serif" font-size="48" font-weight="700" fill="#ff6b3d">
    Bear
  </text>
  <text x="220" y="140" font-family="Fraunces 144, serif" font-size="48" font-weight="700" fill="#f4efe5">
    Cave
  </text>
</svg>`;
}

function generateCaveFullSVG() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="500" height="200" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${generateCaveLockupSVG().match(/<defs>[\s\S]*<\/defs>/)?.[0] || ''}

  <!-- Full lockup -->
  ${generateCaveLockupSVG().match(/<!--[\s\S]*-->/)?.[0] || ''}

  <!-- Marketing tagline -->
  <text x="220" y="170" font-family="Space Grotesk, sans-serif" font-size="18" font-weight="400" fill="#00a8a8">
    Marketing
  </text>
</svg>`;
}

function generateCaveMonochromeSVG() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Monochrome version - white on transparent -->
  <path d="M 20 140 L 60 80 L 100 100 L 140 60 L 180 100 L 200 140 L 20 140 Z"
        fill="white" opacity="0.1" stroke="white" stroke-width="2" />

  <path d="M 70 140 Q 100 100 130 140"
        fill="none" stroke="white" stroke-width="4" stroke-linecap="round" />

  <path d="M 80 140 Q 100 120 120 140"
        fill="white" opacity="0.2" />

  <ellipse cx="100" cy="130" rx="25" ry="20" fill="white" opacity="0.3" />
  <circle cx="100" cy="115" r="15" fill="white" opacity="0.3" />
  <circle cx="90" cy="108" r="5" fill="white" opacity="0.3" />
  <circle cx="110" cy="108" r="5" fill="white" opacity="0.3" />
  <ellipse cx="100" cy="120" rx="6" ry="8" fill="white" opacity="0.3" />
  <circle cx="95" cy="112" r="2" fill="white" opacity="0.8" />
</svg>`;
}

function generateComponentExports(variations) {
  return `/**
 * Logo Variations Component
 * Auto-generated logo variations
 */

import React from 'react';

export const LogoVariations = {
${variations.map(v => `  ${v.name}: '/logos/${v.name}.svg',`).join('\n')}
};

export default LogoVariations;
`;
}

// Check if running directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` ||
                     process.argv[1] && process.argv[1].endsWith('generate-logo-variations.js');

if (isMainModule) {
  generateLogoVariations();
}

export { generateLogoVariations };

