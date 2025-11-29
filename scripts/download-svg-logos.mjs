#!/usr/bin/env node
/**
 * Download SVG Logos from Multiple Sources
 * Supports: svglogos.dev, GitHub repos (prplx/svg-logos, TaranVH/LOGOS)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { load } from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TECH_ICONS_DIR = path.join(__dirname, '../public/images/tech-icons');
const LOGOS_DIR = path.join(__dirname, '../public/images/logos');

// Tech stack logos needed based on labItems.ts and toolbox
const TECH_LOGOS_NEEDED = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'JavaScript',
  'Tailwind CSS',
  'Vite',
  'Express',
  'Python',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GraphQL',
  'GitHub',
  'Git',
  'Framer Motion',
  'Supabase',
  'Cloudflare Workers',
  'Cheerio',
  'Sharp',
  'Zod',
  'Figma',
  'HubSpot',
];

// Normalize tech names to match SVG logo naming conventions
const normalizeTechName = (name) => {
  const mapping = {
    'React': 'react',
    'Next.js': 'nextjs',
    'TypeScript': 'typescript',
    'Node.js': 'nodejs',
    'JavaScript': 'javascript',
    'Tailwind CSS': 'tailwindcss',
    'Vite': 'vite',
    'Express': 'express',
    'Python': 'python',
    'PostgreSQL': 'postgresql',
    'MySQL': 'mysql',
    'MongoDB': 'mongodb',
    'Redis': 'redis',
    'Docker': 'docker',
    'Kubernetes': 'kubernetes',
    'AWS': 'amazonaws', // Try 'amazonaws' or 'aws'
    'Azure': 'microsoftazure', // Try 'microsoftazure' or 'azure'
    'GraphQL': 'graphql',
    'GitHub': 'github',
    'Git': 'git',
    'Framer Motion': 'framer', // May need adjustment
    'Zustand': 'zustand',
    'Recharts': 'recharts',
    'Supabase': 'supabase',
    'Cloudflare Workers': 'cloudflare',
    'Cheerio': 'cheerio',
    'Sharp': 'sharp',
    'Zod': 'zod',
    'Figma': 'figma',
    'HubSpot': 'hubspot',
  };
  return mapping[name] || name.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Download from Simple Icons (most reliable source)
 */
async function downloadFromSimpleIcons(techName, normalizedName) {
  try {
    // Simple Icons uses a CDN pattern
    const url = `https://cdn.simpleicons.org/${normalizedName}`;
    const response = await axios.get(url, {
      responseType: 'text',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (response.status === 200 && response.data.includes('<svg')) {
      return response.data;
    }
  } catch (error) {
    // Not found, continue
  }
  return null;
}

/**
 * Download from svglogos.dev
 */
async function downloadFromSvgLogosDev(techName, normalizedName) {
  try {
    // Try direct URL first
    const url = `https://svglogos.dev/logos/${normalizedName}.svg`;
    const response = await axios.get(url, {
      responseType: 'text',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (response.status === 200 && response.data.includes('<svg')) {
      return response.data;
    }
  } catch (error) {
    // Not found or error, continue to next source
  }
  return null;
}

/**
 * Download from GitHub prplx/svg-logos
 */
async function downloadFromPrplx(techName, normalizedName) {
  try {
    const url = `https://raw.githubusercontent.com/prplx/svg-logos/master/svg/${normalizedName}.svg`;
    const response = await axios.get(url, {
      responseType: 'text',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (response.status === 200 && response.data.includes('<svg')) {
      return response.data;
    }
  } catch (error) {
    // Not found, continue
  }
  return null;
}

/**
 * Search and download from GitHub TaranVH/LOGOS (PNG to SVG conversion needed)
 */
async function downloadFromTaranVH(techName, normalizedName) {
  // This repo has PNGs, so we'll skip it for SVG needs
  // But we can note it for future PNG needs
  return null;
}

/**
 * Try multiple sources for a logo
 */
async function downloadLogo(techName) {
  const normalizedName = normalizeTechName(techName);
  console.log(`\n📥 Downloading ${techName} (${normalizedName})...`);

  // Try Simple Icons first (most reliable)
  let svg = await downloadFromSimpleIcons(techName, normalizedName);
  if (svg) {
    console.log(`  ✓ Found on Simple Icons`);
    return { name: normalizedName, svg, source: 'simpleicons.org' };
  }

  // Try prplx/svg-logos
  svg = await downloadFromPrplx(techName, normalizedName);
  if (svg) {
    console.log(`  ✓ Found on prplx/svg-logos`);
    return { name: normalizedName, svg, source: 'prplx/svg-logos' };
  }

  // Try svglogos.dev
  svg = await downloadFromSvgLogosDev(techName, normalizedName);
  if (svg) {
    console.log(`  ✓ Found on svglogos.dev`);
    return { name: normalizedName, svg, source: 'svglogos.dev' };
  }

  // Try alternative names
  const alternatives = [
    normalizedName.replace(/-/g, ''),
    normalizedName.replace(/-/g, '_'),
    techName.toLowerCase(),
    normalizedName.replace('css', ''),
    normalizedName.replace('js', 'javascript'),
  ];

  // Special cases
  if (normalizedName === 'amazonaws') {
    alternatives.push('aws');
  }
  if (normalizedName === 'microsoftazure') {
    alternatives.push('azure');
  }

  for (const alt of alternatives) {
    if (alt === normalizedName) continue;

    svg = await downloadFromSimpleIcons(techName, alt);
    if (svg) {
      console.log(`  ✓ Found on Simple Icons (as ${alt})`);
      return { name: normalizedName, svg, source: 'simpleicons.org' };
    }

    svg = await downloadFromPrplx(techName, alt);
    if (svg) {
      console.log(`  ✓ Found on prplx/svg-logos (as ${alt})`);
      return { name: normalizedName, svg, source: 'prplx/svg-logos' };
    }
  }

  console.log(`  ✗ Not found in any source`);
  return null;
}

/**
 * Optimize SVG (remove unnecessary attributes, ensure viewBox)
 */
function optimizeSvg(svgContent) {
  const $ = load(svgContent, { xmlMode: true });
  const $svg = $('svg');

  // Ensure viewBox exists
  if (!$svg.attr('viewBox') && $svg.attr('width') && $svg.attr('height')) {
    $svg.attr('viewBox', `0 0 ${$svg.attr('width')} ${$svg.attr('height')}`);
  }

  // Remove unnecessary attributes
  $svg.removeAttr('xmlns:xlink');
  $svg.removeAttr('version');

  // Ensure xmlns
  if (!$svg.attr('xmlns')) {
    $svg.attr('xmlns', 'http://www.w3.org/2000/svg');
  }

  // Make fill currentColor for better theming
  $svg.find('[fill]').each((i, el) => {
    const fill = $(el).attr('fill');
    if (fill && !fill.startsWith('url(') && fill !== 'none' && fill !== 'transparent') {
      // Keep original fill for now, but could change to currentColor
    }
  });

  return $.html();
}

/**
 * Main function
 */
async function main() {
  console.log('🎨 SVG Logo Downloader\n');
  console.log('='.repeat(60));

  // Ensure directories exist
  await fs.mkdir(TECH_ICONS_DIR, { recursive: true });
  await fs.mkdir(LOGOS_DIR, { recursive: true });

  const results = {
    downloaded: [],
    failed: [],
  };

  // Download all tech logos
  for (const tech of TECH_LOGOS_NEEDED) {
    const result = await downloadLogo(tech);

    if (result) {
      try {
        // Optimize SVG
        const optimized = optimizeSvg(result.svg);

        // Save to tech-icons directory
        const filename = `${result.name}.svg`;
        const filepath = path.join(TECH_ICONS_DIR, filename);
        await fs.writeFile(filepath, optimized, 'utf-8');

        results.downloaded.push({
          tech,
          filename,
          source: result.source,
        });

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`  ✗ Error saving: ${error.message}`);
        results.failed.push(tech);
      }
    } else {
      results.failed.push(tech);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Summary:\n');
  console.log(`✓ Downloaded: ${results.downloaded.length}`);
  console.log(`✗ Failed: ${results.failed.length}`);

  if (results.downloaded.length > 0) {
    console.log('\n✅ Successfully downloaded:');
    results.downloaded.forEach(({ tech, filename, source }) => {
      console.log(`   ${tech} → ${filename} (${source})`);
    });
  }

  if (results.failed.length > 0) {
    console.log('\n❌ Failed to download:');
    results.failed.forEach(tech => {
      console.log(`   ${tech}`);
    });
  }

  // Save manifest
  const manifestPath = path.join(TECH_ICONS_DIR, 'manifest.json');
  await fs.writeFile(
    manifestPath,
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      downloaded: results.downloaded,
      failed: results.failed,
    }, null, 2)
  );

  console.log(`\n📄 Manifest saved to: ${manifestPath}`);
  console.log('\n💡 Tip: Some logos may need manual download from:');
  console.log('   - https://simpleicons.org/ (CDN: cdn.simpleicons.org/iconname)');
  console.log('   - https://svglogos.dev/');
  console.log('   - https://github.com/prplx/svg-logos');
  console.log('\n💡 For missing logos, you can:');
  console.log('   1. Visit simpleicons.org and search for the tech name');
  console.log('   2. Copy the SVG code or download directly');
  console.log('   3. Save to public/images/tech-icons/[name].svg');
}

main().catch(console.error);

