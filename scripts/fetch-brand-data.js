/**
 * Brand Data Fetching Utility
 * ---------------------------
 * Fetches brand identity information from various sources using browser automation
 * Supports both browser MCP tools and Puppeteer fallback
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BrandSource {
  id: string;
  name: string;
  url: string;
  type: 'mcp' | 'puppeteer';
  selectors?: {
    colors?: string;
    typography?: string;
    principles?: string;
  };
}

const BRAND_SOURCES: BrandSource[] = [
  {
    id: 'ibm-design',
    name: 'IBM Design Language',
    url: 'https://www.ibm.com/design/language/',
    type: 'puppeteer',
  },
  {
    id: 'nasa-manual',
    name: 'NASA Graphics Standards Manual',
    url: 'https://standardsmanual.com/products/nasa-graphics-standards-manual',
    type: 'puppeteer',
  },
  {
    id: 'indiana-university',
    name: 'Indiana University',
    url: 'https://iu.edu/brand/',
    type: 'puppeteer',
  },
];

/**
 * Extract brand data using Puppeteer
 */
async function fetchWithPuppeteer(source: BrandSource): Promise<any> {
  console.log(`🌐 Fetching ${source.name} using Puppeteer...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(source.url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Extract basic page data
    const title = await page.title();
    const description = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');

    // Try to extract colors (look for CSS variables, color swatches, etc.)
    const colors = await page.evaluate(() => {
      const colorElements = document.querySelectorAll('[class*="color"], [data-color], [style*="background"]');
      const foundColors: string[] = [];

      colorElements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          foundColors.push(bgColor);
        }
      });

      return [...new Set(foundColors)].slice(0, 10);
    }).catch(() => []);

    // Extract text content for typography analysis
    const typography = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const fonts = new Set<string>();

      headings.forEach(h => {
        const style = window.getComputedStyle(h);
        fonts.add(style.fontFamily);
      });

      return Array.from(fonts);
    }).catch(() => []);

    await browser.close();

    return {
      title,
      description,
      colors: colors.length > 0 ? { extracted: colors } : undefined,
      typography: typography.length > 0 ? { fonts: typography } : undefined,
      fetchedAt: new Date().toISOString(),
      source: source.url,
    };
  } catch (error) {
    await browser.close();
    console.error(`❌ Error fetching ${source.name}:`, error);
    return null;
  }
}

/**
 * Extract brand data using browser MCP tools (placeholder for future implementation)
 */
async function fetchWithMCP(source: BrandSource): Promise<any> {
  console.log(`🔧 MCP fetching for ${source.name} not yet implemented`);
  console.log(`   Falling back to Puppeteer...`);
  return fetchWithPuppeteer(source);
}

/**
 * Main fetching function
 */
async function fetchBrandData() {
  console.log('🚀 Starting brand data fetch...\n');

  const results: any[] = [];
  const outputPath = path.resolve(__dirname, '../src/data/brand-identities.json');

  // Load existing data
  let existingData: any = { version: '1.0.0', lastUpdated: '', brands: [] };
  if (fs.existsSync(outputPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    } catch (error) {
      console.warn('⚠️  Could not read existing brand data, starting fresh');
    }
  }

  // Fetch data for each source
  for (const source of BRAND_SOURCES) {
    try {
      let data;

      if (source.type === 'mcp') {
        data = await fetchWithMCP(source);
      } else {
        data = await fetchWithPuppeteer(source);
      }

      if (data) {
        // Merge with existing brand data if it exists
        const existingBrand = existingData.brands?.find((b: any) => b.id === source.id);
        if (existingBrand) {
          // Merge fetched data with existing structured data
          results.push({
            ...existingBrand,
            fetchedData: data,
            lastFetched: data.fetchedAt,
          });
        } else {
          results.push({
            id: source.id,
            title: source.name,
            fetchedData: data,
            lastFetched: data.fetchedAt,
          });
        }
        console.log(`✅ Successfully fetched ${source.name}\n`);
      }
    } catch (error) {
      console.error(`❌ Failed to fetch ${source.name}:`, error);
    }

    // Be nice to servers
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Update existing data with fetched information
  if (results.length > 0) {
    existingData.lastUpdated = new Date().toISOString();
    existingData.brands = existingData.brands.map((brand: any) => {
      const fetched = results.find(r => r.id === brand.id);
      return fetched ? { ...brand, ...fetched.fetchedData } : brand;
    });

    // Write updated data
    fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));
    console.log(`\n💾 Updated brand data saved to: ${outputPath}`);
    console.log(`📊 Updated ${results.length} brand(s)`);
  } else {
    console.log('\n⚠️  No data was fetched. Existing data preserved.');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchBrandData().catch(console.error);
}

export { fetchBrandData, fetchWithPuppeteer, fetchWithMCP };

