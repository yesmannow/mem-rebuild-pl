/**
 * MCP Browser Tool Integration for Brand Data Fetching
 * =====================================================
 *
 * This script provides a Node.js wrapper that can be used with MCP browser tools
 * to fetch brand identity information. Since MCP browser tools run in the Cursor
 * environment, this script provides the extraction logic and data structure.
 *
 * To actually fetch data, you would:
 * 1. Use MCP browser tools in Cursor to navigate and extract
 * 2. Save the extracted data using the functions below
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * JavaScript extraction functions to use with browser_evaluate
 */
export const extractionScripts = {
  /**
   * Extract colors from a brand design system page
   */
  extractColors: `
    (() => {
      const foundColors = new Set();

      // Method 1: Extract from computed styles
      const colorElements = document.querySelectorAll('[class*="color"], [data-color], [style*="background"]');
      colorElements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
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

      // Method 2: Extract hex codes from text content
      const textContent = document.body.innerText;
      const hexMatches = textContent.match(/#[0-9A-Fa-f]{6}/g);
      if (hexMatches) {
        hexMatches.forEach(hex => foundColors.add(hex.toUpperCase()));
      }

      // Method 3: Look for CSS variables
      const stylesheets = Array.from(document.styleSheets);
      stylesheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule.style) {
              const bgColor = rule.style.backgroundColor;
              if (bgColor && bgColor.startsWith('#')) {
                foundColors.add(bgColor.toUpperCase());
              }
            }
          });
        } catch (e) {
          // Cross-origin stylesheets may throw
        }
      });

      return {
        colors: Array.from(foundColors).slice(0, 30),
        pageTitle: document.title,
        url: window.location.href,
        extractedAt: new Date().toISOString()
      };
    })();
  `,

  /**
   * Extract typography information
   */
  extractTypography: `
    (() => {
      const fonts = new Set();
      const scales = {};

      // Extract from headings
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((h, i) => {
        const style = window.getComputedStyle(h);
        fonts.add(style.fontFamily.split(',')[0].replace(/['"]/g, '').trim());
        scales[\`h\${i + 1}\`] = style.fontSize;
      });

      // Extract from body text
      const body = document.querySelector('body');
      if (body) {
        const bodyStyle = window.getComputedStyle(body);
        fonts.add(bodyStyle.fontFamily.split(',')[0].replace(/['"]/g, '').trim());
        scales.body = bodyStyle.fontSize;
      }

      return {
        fonts: Array.from(fonts),
        scales,
        pageTitle: document.title,
        extractedAt: new Date().toISOString()
      };
    })();
  `,

  /**
   * Extract design principles/text content
   */
  extractPrinciples: `
    (() => {
      const principles = [];

      // Look for list items, headings, or specific sections
      const principleSelectors = [
        'h2, h3',
        '[class*="principle"]',
        '[class*="philosophy"]',
        'li strong',
        '.design-principle'
      ];

      principleSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          const text = el.textContent.trim();
          if (text.length > 10 && text.length < 200) {
            principles.push(text);
          }
        });
      });

      return {
        principles: [...new Set(principles)].slice(0, 10),
        pageTitle: document.title,
        extractedAt: new Date().toISOString()
      };
    })();
  `
};

/**
 * Update brand data with extracted information
 */
export function updateBrandData(brandId: string, extractedData: any) {
  const outputPath = path.resolve(__dirname, '../src/data/brand-identities.json');

  let existingData: any = { version: '1.0.0', lastUpdated: '', brands: [] };
  if (fs.existsSync(outputPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    } catch (error) {
      console.warn('⚠️  Could not read existing brand data');
    }
  }

  const brandIndex = existingData.brands.findIndex((b: any) => b.id === brandId);

  if (brandIndex >= 0) {
    const brand = existingData.brands[brandIndex];

    // Merge extracted colors
    if (extractedData.colors) {
      brand.brandInfo = brand.brandInfo || {};
      brand.brandInfo.colors = brand.brandInfo.colors || {};
      brand.brandInfo.colors.extracted = extractedData.colors;
      brand.brandInfo.colors.extractedAt = extractedData.extractedAt;
    }

    // Merge extracted typography
    if (extractedData.fonts || extractedData.scales) {
      brand.brandInfo = brand.brandInfo || {};
      brand.brandInfo.typography = brand.brandInfo.typography || {};
      if (extractedData.fonts) {
        brand.brandInfo.typography.extractedFonts = extractedData.fonts;
      }
      if (extractedData.scales) {
        brand.brandInfo.typography.extractedScales = extractedData.scales;
      }
    }

    // Merge extracted principles
    if (extractedData.principles) {
      brand.designPrinciples = [
        ...(brand.designPrinciples || []),
        ...extractedData.principles
      ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates
    }

    brand.lastFetched = extractedData.extractedAt || new Date().toISOString();
    existingData.brands[brandIndex] = brand;
  } else {
    console.warn(`⚠️  Brand ${brandId} not found in existing data`);
  }

  existingData.lastUpdated = new Date().toISOString();
  fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));

  console.log(`✅ Updated ${brandId} with extracted data`);
  return existingData;
}

/**
 * Example usage workflow
 */
export function printUsageGuide() {
  console.log(`
📖 MCP Browser Tool Usage Guide
================================

To extract brand data using MCP browser tools in Cursor:

1. NAVIGATE to the brand website:
   Use: browser_navigate({ url: "https://www.ibm.com/design/language/color" })

2. WAIT for page to load:
   Use: browser_wait_for({ text: "Color", time: 3 })

3. EXTRACT data using JavaScript:
   Use: browser_evaluate({ function: extractionScripts.extractColors })

4. SAVE the extracted data:
   Use: updateBrandData("ibm-design", extractedResult)

Example for IBM Design Language:
---------------------------------
1. Navigate: browser_navigate({ url: "https://www.ibm.com/design/language/color" })
2. Wait: browser_wait_for({ text: "Color", time: 3 })
3. Extract colors: browser_evaluate({ function: extractionScripts.extractColors })
4. Extract typography: browser_evaluate({ function: extractionScripts.extractTypography })
5. Save: updateBrandData("ibm-design", { colors: [...], fonts: [...] })

Available Extraction Scripts:
- extractionScripts.extractColors
- extractionScripts.extractTypography
- extractionScripts.extractPrinciples

Note: MCP browser tools must be used within Cursor's AI context.
For automated fetching, use the Puppeteer-based script instead.
`);
}

// Export for use
if (import.meta.url === `file://${process.argv[1]}`) {
  printUsageGuide();
}

