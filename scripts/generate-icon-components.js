#!/usr/bin/env node
/**
 * Generate Icon Components Script
 * Creates React components for all icons in /public/icons
 * and updates the icon registry
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const iconsDir = path.join(rootDir, 'public/icons');
const componentsDir = path.join(rootDir, 'src/components/icons');

/**
 * Generate React component from SVG
 */
function generateIconComponent(iconName, svgContent) {
  const componentName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Icon';

  // Extract SVG content
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // Clean SVG for React
  let cleanSvg = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace('</svg>', '')
    .trim();

  // Ensure currentColor
  cleanSvg = cleanSvg.replace(/fill=["'][^"']*["']/g, 'fill="currentColor"');
  cleanSvg = cleanSvg.replace(/stroke=["'][^"']*["']/g, 'stroke="currentColor"');

  return `/**
 * ${componentName}
 * Generated icon component from ${iconName}.svg
 * Matches design system: 2px stroke, currentColor theming
 */

import React from 'react';

export interface ${componentName}Props {
  className?: string;
  size?: number | string;
  color?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = !ariaLabel,
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
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaLabel ? 'img' : 'presentation'}
    >
      ${cleanSvg}
    </svg>
  );
};

export default ${componentName};
`;
}

/**
 * Update icon registry
 */
async function updateIconRegistry(iconFiles) {
  const registryPath = path.join(componentsDir, 'IconRegistry.tsx');

  const imports = iconFiles.map(file => {
    const iconName = path.basename(file, '.svg');
    const componentName = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'Icon';
    return { iconName, componentName, import: `import { ${componentName} } from './${iconName}Icon';` };
  });

  const registryEntries = iconFiles.map(file => {
    const iconName = path.basename(file, '.svg');
    const componentName = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'Icon';
    return `  '${iconName}': ${componentName},`;
  });

  const registryContent = `/**
 * Icon Registry
 * Auto-generated registry of all icon components
 * Updated: ${new Date().toISOString()}
 */

import React from 'react';

${imports.map(i => i.import).join('\n')}

export const IconRegistry: Record<string, React.ComponentType<any>> = {
${registryEntries.join('\n')}
};

/**
 * Get icon component by name
 */
export function getIcon(name: string): React.ComponentType<any> | null {
  return IconRegistry[name] || null;
}

/**
 * List all available icons
 */
export function listIcons(): string[] {
  return Object.keys(IconRegistry);
}
`;

  await fs.writeFile(registryPath, registryContent, 'utf-8');
  return registryPath;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  console.log('🎯 Generate Icon Components Script\n');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be created\n');
  }

  // Ensure directories exist
  await fs.mkdir(componentsDir, { recursive: true });

  // Find all SVG icons
  let iconFiles;
  try {
    const files = await fs.readdir(iconsDir);
    iconFiles = files.filter(f => f.endsWith('.svg')).map(f => path.join(iconsDir, f));
  } catch (error) {
    console.error(`❌ Error reading icons directory: ${error.message}`);
    console.log(`\n💡 Tip: Add icons to ${iconsDir} first using:`);
    console.log(`   npm run icon:add <name> <path>`);
    process.exit(1);
  }

  if (iconFiles.length === 0) {
    console.log('⚠️  No icons found in /public/icons');
    console.log(`\n💡 Add icons first using:`);
    console.log(`   npm run icon:add <name> <path>`);
    process.exit(0);
  }

  console.log(`📁 Found ${iconFiles.length} icons\n`);

  const report = {
    totalIcons: iconFiles.length,
    generated: 0,
    skipped: 0,
    components: []
  };

  // Generate components
  for (const iconFile of iconFiles) {
    const iconName = path.basename(iconFile, '.svg');
    const componentPath = path.join(componentsDir, `${iconName}Icon.tsx`);

    try {
      const svgContent = await fs.readFile(iconFile, 'utf-8');
      const componentCode = generateIconComponent(iconName, svgContent);

      // Check if component already exists
      let exists = false;
      try {
        await fs.access(componentPath);
        exists = true;
      } catch {
        // File doesn't exist, will create
      }

      if (!dryRun) {
        await fs.writeFile(componentPath, componentCode, 'utf-8');
        report.generated++;
        console.log(`✅ Generated: ${iconName}Icon.tsx`);
      } else {
        if (exists) {
          report.skipped++;
          console.log(`⏭️  Skipped (exists): ${iconName}Icon.tsx`);
        } else {
          report.generated++;
          console.log(`📝 Would generate: ${iconName}Icon.tsx (DRY RUN)`);
        }
      }

      report.components.push({
        icon: iconName,
        component: `${iconName}Icon`,
        path: componentPath
      });
    } catch (error) {
      console.warn(`⚠️  Error processing ${iconName}: ${error.message}`);
    }
  }

  // Update registry
  if (!dryRun && report.generated > 0) {
    const registryPath = await updateIconRegistry(iconFiles.map(f => path.basename(f)));
    console.log(`\n✅ Updated icon registry: ${registryPath}`);
  } else if (dryRun) {
    console.log(`\n📝 Would update icon registry (DRY RUN)`);
  }

  // Save report
  const reportPath = path.join(rootDir, 'reports/design-analysis/icon-components-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log('\n' + '='.repeat(60));
  console.log('📊 COMPONENT GENERATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`\nTotal icons: ${report.totalIcons}`);
  console.log(`Components generated: ${report.generated}`);
  console.log(`Components skipped: ${report.skipped}`);
  console.log(`\n💾 Report saved to: ${reportPath}`);

  if (dryRun) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to generate components.');
  }

  console.log('='.repeat(60));
}

main().catch(console.error);

