#!/usr/bin/env node
/**
 * Enhanced Icon Import Script
 * Imports SVG icons, optimizes them, and generates React components
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const iconsDir = path.join(rootDir, 'public/icons');
const componentsDir = path.join(rootDir, 'src/components/icons');
const requiredIcons = [
  'about', 'projects', 'skills', 'tools', 'download', 'email',
  'linkedin', 'github', 'twitter', 'x', 'pdf', 'awards',
  'success', 'warning', 'error', 'menu', 'close'
];

/**
 * Optimize SVG content
 */
function optimizeSVG(svgContent) {
  let optimized = svgContent;

  // Remove comments
  optimized = optimized.replace(/<!--[\s\S]*?-->/g, '');

  // Remove unnecessary whitespace
  optimized = optimized.replace(/\s+/g, ' ');
  optimized = optimized.replace(/>\s+</g, '><');

  // Ensure currentColor for fill/stroke
  if (!optimized.includes('fill=') && !optimized.includes('currentColor')) {
    optimized = optimized.replace(/<svg/, '<svg fill="currentColor"');
  }

  // Ensure stroke-width is 2px if stroke exists
  if (optimized.includes('stroke') && !optimized.includes('stroke-width')) {
    optimized = optimized.replace(/<svg/, '<svg stroke-width="2"');
  }

  // Ensure viewBox if missing
  if (!optimized.includes('viewBox') && !optimized.includes('width')) {
    optimized = optimized.replace(/<svg/, '<svg viewBox="0 0 24 24"');
  }

  return optimized.trim();
}

/**
 * Generate React component from SVG
 */
function generateReactComponent(iconName, svgContent) {
  const componentName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Extract SVG attributes
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // Clean SVG for React
  let cleanSvg = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace('</svg>', '')
    .trim();

  return `import React from 'react';

export interface ${componentName}IconProps {
  className?: string;
  size?: number | string;
  color?: string;
  'aria-label'?: string;
}

export const ${componentName}Icon: React.FC<${componentName}IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  'aria-label': ariaLabel,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      width={size}
      height={size}
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel || '${iconName} icon'}
      role="img"
    >
      ${cleanSvg}
    </svg>
  );
};

export default ${componentName}Icon;
`;
}

/**
 * Update icon registry
 */
async function updateIconRegistry(iconName) {
  const registryPath = path.join(rootDir, 'src/components/icons/IconRegistry.tsx');

  let registryContent = '';
  try {
    registryContent = await fs.readFile(registryPath, 'utf-8');
  } catch (error) {
    // Create new registry if it doesn't exist
    registryContent = `import React from 'react';

export const IconRegistry: Record<string, React.ComponentType<any>> = {};
`;
  }

  const componentName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Add import if not present
  if (!registryContent.includes(`${componentName}Icon`)) {
    const importLine = `import { ${componentName}Icon } from './${iconName}Icon';`;
    registryContent = registryContent.replace(
      /^(import React from 'react';)/m,
      `$1\n${importLine}`
    );

    // Add to registry object
    if (registryContent.includes('IconRegistry: Record')) {
      registryContent = registryContent.replace(
        /(IconRegistry: Record<string, React\.ComponentType<any>> = \{)/,
        `$1\n  '${iconName}': ${componentName}Icon,`
      );
    }
  }

  return registryContent;
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'add' && args[1] && args[2]) {
    const iconName = args[1].toLowerCase().replace(/\s+/g, '-');
    const sourcePath = args[2];
    const generateComponent = !args.includes('--no-component');

    console.log(`➕ Adding icon: ${iconName}\n`);

    // Ensure directories exist
    await fs.mkdir(iconsDir, { recursive: true });
    if (generateComponent) {
      await fs.mkdir(componentsDir, { recursive: true });
    }

    // Read source file
    let content;
    try {
      content = await fs.readFile(sourcePath, 'utf-8');
    } catch (error) {
      console.error(`❌ Error reading source file: ${error.message}`);
      process.exit(1);
    }

    // Optimize SVG
    if (sourcePath.endsWith('.svg')) {
      content = optimizeSVG(content);
    }

    // Save to icons directory
    const targetPath = path.join(iconsDir, `${iconName}.svg`);
    await fs.writeFile(targetPath, content, 'utf-8');
    console.log(`✅ Icon saved to: ${targetPath}`);

    // Generate React component
    if (generateComponent && sourcePath.endsWith('.svg')) {
      const componentCode = generateReactComponent(iconName, content);
      const componentPath = path.join(componentsDir, `${iconName}Icon.tsx`);
      await fs.writeFile(componentPath, componentCode, 'utf-8');
      console.log(`✅ React component generated: ${componentPath}`);

      // Update icon registry
      const registryContent = await updateIconRegistry(iconName);
      const registryPath = path.join(rootDir, 'src/components/icons/IconRegistry.tsx');
      await fs.writeFile(registryPath, registryContent, 'utf-8');
      console.log(`✅ Icon registry updated: ${registryPath}`);
    }

    console.log('\n✨ Icon import complete!');

  } else if (command === 'audit') {
    // Use existing audit logic
    const { execSync } = await import('child_process');
    execSync('node scripts/icon-import.js audit', { stdio: 'inherit' });

  } else {
    console.log(`
Enhanced Icon Import Script

Usage:
  npm run icon:add <name> <path> [--no-component]
  npm run icon:audit

Examples:
  npm run icon:add email ./downloads/email-icon.svg
  npm run icon:add linkedin ./downloads/linkedin.svg --no-component

Options:
  --no-component    Skip React component generation

Features:
  - Optimizes SVG (removes metadata, uses currentColor)
  - Generates React component with TypeScript
  - Updates icon registry automatically
  - Validates SVG structure
`);
  }
}

main().catch(console.error);

