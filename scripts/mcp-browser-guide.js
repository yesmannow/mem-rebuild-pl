/**
 * MCP Browser Tool Usage Guide for Brand Data Fetching
 * ======================================================
 *
 * This script demonstrates how to use MCP browser extension tools to fetch
 * brand identity information from websites.
 *
 * MCP Browser Tools Available:
 * - browser_navigate: Navigate to a URL
 * - browser_snapshot: Get accessibility snapshot of page
 * - browser_evaluate: Run JavaScript on the page to extract data
 * - browser_click: Click elements on the page
 * - browser_type: Type into form fields
 * - browser_wait_for: Wait for text or time
 *
 * Example Usage:
 * 1. Navigate to brand website
 * 2. Wait for page to load
 * 3. Extract color/typography data using browser_evaluate
 * 4. Save extracted data to JSON
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Example: Extract colors from IBM Design Language
 *
 * Steps:
 * 1. Navigate to https://www.ibm.com/design/language/color
 * 2. Use browser_evaluate to extract color values
 * 3. Parse and structure the data
 */
export async function extractIBMColors() {
  // This would be called via MCP browser tools
  // For now, showing the extraction logic

  const extractionScript = `
    (() => {
      const colors = {
        primary: [],
        secondary: [],
        semantic: {}
      };

      // Extract from color swatches
      const colorElements = document.querySelectorAll('[class*="color"], [data-color]');
      const foundColors = new Set();

      colorElements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
          const rgb = bgColor.match(/\\d+/g);
          if (rgb && rgb.length >= 3) {
            const hex = '#' + rgb.map(x => {
              const val = parseInt(x).toString(16);
              return val.length === 1 ? '0' + val : val;
            }).join('');
            foundColors.add(hex.toUpperCase());
          }
        }
      });

      // Extract hex codes from text
      const textContent = document.body.innerText;
      const hexMatches = textContent.match(/#[0-9A-Fa-f]{6}/g);
      if (hexMatches) {
        hexMatches.forEach(hex => foundColors.add(hex.toUpperCase()));
      }

      return {
        colors: Array.from(foundColors),
        pageTitle: document.title,
        url: window.location.href
      };
    })();
  `;

  return extractionScript;
}

/**
 * Example: Extract typography information
 */
export async function extractTypography() {
  const extractionScript = `
    (() => {
      const typography = {
        fonts: [],
        scales: {}
      };

      // Extract font families
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const fonts = new Set();

      headings.forEach(h => {
        const style = window.getComputedStyle(h);
        fonts.add(style.fontFamily);
      });

      // Extract font sizes
      const scales = {};
      headings.forEach((h, i) => {
        const style = window.getComputedStyle(h);
        scales[\`h\${i + 1}\`] = style.fontSize;
      });

      return {
        fonts: Array.from(fonts),
        scales,
        pageTitle: document.title
      };
    })();
  `;

  return extractionScript;
}

/**
 * Manual MCP Browser Tool Workflow
 *
 * To use MCP browser tools manually:
 *
 * 1. Navigate to brand site:
 *    mcp_cursor-browser-extension_browser_navigate({ url: "https://..." })
 *
 * 2. Wait for page to load:
 *    mcp_cursor-browser-extension_browser_wait_for({ text: "Color", time: 3 })
 *
 * 3. Get page snapshot to see structure:
 *    mcp_cursor-browser-extension_browser_snapshot()
 *
 * 4. Extract data using JavaScript:
 *    mcp_cursor-browser-extension_browser_evaluate({ function: "() => { ... }" })
 *
 * 5. Click elements if needed:
 *    mcp_cursor-browser-extension_browser_click({ element: "...", ref: "..." })
 *
 * 6. Save extracted data to brand-identities.json
 */

/**
 * Example extracted data structure
 */
export const exampleExtractedData = {
  ibm: {
    colors: [
      "#052FAD",
      "#0F62FE",
      "#000000",
      "#001141",
      "#001D6C",
      "#002D9C",
      "#0043CE",
      "#4589FF",
      "#78A9FF",
      "#A6C8FF",
      "#D0E2FF",
      "#EDF5FF",
      "#FFFFFF"
    ],
    extractedAt: "2025-11-09T10:48:41.951Z",
    source: "https://www.ibm.com/design/language/color"
  }
};

/**
 * Save extracted data to brand-identities.json
 */
export function saveExtractedData(brandId: string, data: any) {
  const outputPath = path.resolve(__dirname, '../src/data/brand-identities.json');

  let existingData: any = { version: '1.0.0', lastUpdated: '', brands: [] };
  if (fs.existsSync(outputPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    } catch (error) {
      console.warn('Could not read existing brand data');
    }
  }

  // Find and update the brand
  const brandIndex = existingData.brands.findIndex((b: any) => b.id === brandId);
  if (brandIndex >= 0) {
    existingData.brands[brandIndex] = {
      ...existingData.brands[brandIndex],
      brandInfo: {
        ...existingData.brands[brandIndex].brandInfo,
        colors: {
          ...existingData.brands[brandIndex].brandInfo?.colors,
          extracted: data.colors,
          extractedAt: data.extractedAt
        }
      },
      lastFetched: data.extractedAt
    };
  }

  existingData.lastUpdated = new Date().toISOString();
  fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));

  console.log(`✅ Updated ${brandId} with extracted data`);
}

// Example: How to use this in your workflow
console.log(`
To extract brand data using MCP browser tools:

1. Use browser_navigate to go to the brand website
2. Use browser_wait_for to wait for content to load
3. Use browser_evaluate with the extraction scripts above
4. Use saveExtractedData to save the results

Example workflow:
- Navigate: browser_navigate({ url: "https://www.ibm.com/design/language/color" })
- Wait: browser_wait_for({ text: "Color", time: 3 })
- Extract: browser_evaluate({ function: extractIBMColors() })
- Save: saveExtractedData("ibm-design", extractedData)
`);

