#!/usr/bin/env node
/**
 * Script to extract images and design components from websites
 * Uses the AI-Cursor-Scraping-Assistant MCP server
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Call the MCP scraping assistant to extract images
 */
async function extractImages(url, outputDir = 'public/images/scraped') {
  const outputPath = join(rootDir, outputDir);
  await fs.mkdir(outputPath, { recursive: true });

  console.log(`Extracting images from ${url}...`);
  console.log(`Output directory: ${outputPath}`);

  // This would typically call the MCP server
  // For now, we'll create a Python script that can be called
  const pythonScript = `
import asyncio
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'cli-workflow/scraping-assistant/MCPfiles'))
from xpath_server import extract_images

async def main():
    result = await extract_images("${url}", "${outputPath}")
    print(result)

asyncio.run(main())
  `;

  const scriptPath = join(rootDir, 'tmp_extract_images.py');
  await fs.writeFile(scriptPath, pythonScript);

  return new Promise((resolve, reject) => {
    const python = spawn('python', [scriptPath], {
      cwd: rootDir,
      stdio: 'inherit'
    });

    python.on('close', (code) => {
      fs.unlink(scriptPath).catch(() => {});
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

/**
 * Call the MCP scraping assistant to extract design components
 */
async function extractDesignComponents(url, outputDir = 'public/images/scraped') {
  const outputPath = join(rootDir, outputDir);
  await fs.mkdir(outputPath, { recursive: true });

  console.log(`Extracting design components from ${url}...`);
  console.log(`Output directory: ${outputPath}`);

  const pythonScript = `
import asyncio
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'cli-workflow/scraping-assistant/MCPfiles'))
from xpath_server import extract_design_components

async def main():
    result = await extract_design_components("${url}", "${outputPath}")
    print(result)

asyncio.run(main())
  `;

  const scriptPath = join(rootDir, 'tmp_extract_design.py');
  await fs.writeFile(scriptPath, pythonScript);

  return new Promise((resolve, reject) => {
    const python = spawn('python', [scriptPath], {
      cwd: rootDir,
      stdio: 'inherit'
    });

    python.on('close', (code) => {
      fs.unlink(scriptPath).catch(() => {});
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];
const url = args[1];
const outputDir = args[2];

if (!command || !url) {
  console.log(`
Usage:
  node scripts/scrape-design-assets.js <command> <url> [outputDir]

Commands:
  images          Extract all images from the website
  design          Extract design components (colors, fonts, etc.)
  all             Extract both images and design components

Examples:
  node scripts/scrape-design-assets.js images https://example.com
  node scripts/scrape-design-assets.js design https://example.com public/design-assets
  node scripts/scrape-design-assets.js all https://example.com
  `);
  process.exit(1);
}

(async () => {
  try {
    switch (command) {
      case 'images':
        await extractImages(url, outputDir);
        break;
      case 'design':
        await extractDesignComponents(url, outputDir);
        break;
      case 'all':
        await extractImages(url, outputDir);
        await extractDesignComponents(url, outputDir);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
    console.log('✅ Extraction complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();

