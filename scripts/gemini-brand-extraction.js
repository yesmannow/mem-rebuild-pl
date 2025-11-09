/**
 * Gemini-Powered Brand Content Extraction
 * ========================================
 *
 * Uses Google Gemini API to extract brand identity information from URLs.
 * Gemini can analyze web content and extract structured brand data including:
 * - Colors and color palettes
 * - Typography and font choices
 * - Design principles
 * - Brand history and philosophy
 * - Visual specifications
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brandDataPath = path.resolve(__dirname, '../src/data/brand-identities.json');

// Initialize Gemini
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  console.error('❌ GEMINI_API_KEY not found in .env file');
  console.error('   Please add GEMINI_API_KEY=your_key_here to your .env file');
  console.error('   Get your key at: https://aistudio.google.com/');
  process.exit(1);
}

const gemini = new GoogleGenerativeAI(geminiApiKey);
const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Fetch HTML content from a URL
 */
async function fetchWebContent(url) {
  try {
    console.log(`📡 Fetching content from ${url}...`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching ${url}:`, error.message);
    return null;
  }
}

/**
 * Extract text content from HTML (simplified)
 */
function extractTextContent(html) {
  // Remove script and style tags
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Extract text from common content areas
  const contentSelectors = [
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<section[^>]*>([\s\S]*?)<\/section>/i,
    /<body[^>]*>([\s\S]*?)<\/body>/i,
  ];

  for (const regex of contentSelectors) {
    const match = text.match(regex);
    if (match && match[1]) {
      text = match[1];
      break;
    }
  }

  // Remove HTML tags and decode entities
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");

  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return text.substring(0, 50000); // Limit to 50k chars
}

/**
 * Extract brand information using Gemini
 */
async function extractBrandInfo(url, brandName, existingData = {}) {
  console.log(`\n🔍 Extracting brand info for: ${brandName}`);
  console.log(`   URL: ${url}`);

  try {
    // Fetch web content
    const html = await fetchWebContent(url);
    if (!html) {
      console.log('   ⚠️  Could not fetch content, using URL-only analysis...');
    }

    const textContent = html ? extractTextContent(html) : '';
    const hasContent = textContent.length > 100;

    // Create comprehensive prompt for Gemini
    const prompt = `Analyze this brand identity website and extract structured brand information.

${hasContent ? `Website Content (first 50k chars):\n${textContent}\n\n` : ''}Website URL: ${url}
Brand Name: ${brandName}
${existingData.category ? `Category: ${existingData.category}` : ''}
${existingData.year ? `Year: ${existingData.year}` : ''}

Extract the following information and return as JSON:

1. **Colors**: Extract color palette including:
   - Primary colors (array of hex codes)
   - Secondary colors (array of hex codes)
   - Neutral colors (array of hex codes)
   - Semantic colors (success, warning, error, info) if available
   Format: { "primary": ["#HEX"], "secondary": ["#HEX"], "neutral": ["#HEX"], "semantic": { "success": "#HEX", "warning": "#HEX", "error": "#HEX", "info": "#HEX" } }

2. **Typography**: Extract typography information:
   - Primary font family name
   - Secondary font family name (if any)
   - Type scale (display, h1, h2, h3, h4, body, caption sizes)
   Format: { "primary": "Font Name", "secondary": "Font Name", "scale": { "display": "3.75rem", "h1": "3rem", ... } }

3. **Design Principles**: Extract 3-7 key design principles or values mentioned
   Format: ["Principle 1", "Principle 2", ...]

4. **Visual Specifications**: Extract logo and visual specs:
   - Logo type/style description
   - Logo usage guidelines (if mentioned)
   - Spacing system (if mentioned)
   Format: { "logo": { "type": "description", "usage": "guidelines" }, "spacing": "description" }

5. **Educational Content**: Extract:
   - Brief history (2-3 sentences)
   - Design philosophy (2-3 sentences)
   - Applications/use cases (2-3 sentences)
   Format: { "history": "text", "philosophy": "text", "applications": "text" }

6. **Additional Details**: Extract any notable details about the brand identity
   Format: "text description"

Return ONLY valid JSON with this exact structure:
{
  "colors": { ... },
  "typography": { ... },
  "designPrinciples": [ ... ],
  "visualSpecs": { ... },
  "educationalContent": { ... },
  "details": "..."
}

If information is not available, use empty arrays/objects. Be accurate and only extract information that is clearly present in the content.`;

    console.log('   🤖 Analyzing with Gemini...');

    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3, // Lower temperature for more accurate extraction
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.response.text();
    let extractedData;

    try {
      // Try to parse JSON directly
      extractedData = JSON.parse(responseText);
    } catch (parseError) {
      // If direct parse fails, try to extract JSON from markdown code blocks
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
                       responseText.match(/```\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Could not parse JSON from response');
      }
    }

    console.log('   ✅ Successfully extracted brand information');

    // Structure the data according to our brand-identities.json format
    const structuredData = {
      brandInfo: {
        colors: extractedData.colors || {},
        typography: extractedData.typography || {},
      },
      designPrinciples: extractedData.designPrinciples || [],
      visualSpecs: extractedData.visualSpecs || {},
      educationalContent: extractedData.educationalContent || {},
      details: extractedData.details || existingData.details || '',
    };

    return structuredData;

  } catch (error) {
    console.error(`   ❌ Error extracting brand info:`, error.message);
    if (error.message.includes('JSON')) {
      console.error('   ⚠️  Gemini returned invalid JSON format');
    }
    return null;
  }
}

/**
 * Update brand data in brand-identities.json
 */
function updateBrandData(brandId, extractedData) {
  try {
    const brandData = JSON.parse(fs.readFileSync(brandDataPath, 'utf-8'));
    const brands = brandData.brands || [];

    const brandIndex = brands.findIndex(b => b.id === brandId);

    if (brandIndex === -1) {
      console.error(`   ❌ Brand with id "${brandId}" not found in brand-identities.json`);
      return false;
    }

    // Merge extracted data with existing brand data
    brands[brandIndex] = {
      ...brands[brandIndex],
      ...extractedData,
      brandInfo: {
        ...brands[brandIndex].brandInfo,
        ...extractedData.brandInfo,
        colors: {
          ...brands[brandIndex].brandInfo?.colors,
          ...extractedData.brandInfo?.colors,
        },
        typography: {
          ...brands[brandIndex].brandInfo?.typography,
          ...extractedData.brandInfo?.typography,
        },
      },
      designPrinciples: extractedData.designPrinciples?.length > 0
        ? extractedData.designPrinciples
        : brands[brandIndex].designPrinciples,
      visualSpecs: {
        ...brands[brandIndex].visualSpecs,
        ...extractedData.visualSpecs,
      },
      educationalContent: {
        ...brands[brandIndex].educationalContent,
        ...extractedData.educationalContent,
      },
      details: extractedData.details || brands[brandIndex].details,
      lastExtracted: new Date().toISOString(),
    };

    // Update lastUpdated timestamp
    brandData.lastUpdated = new Date().toISOString();

    // Save updated data
    fs.writeFileSync(brandDataPath, JSON.stringify(brandData, null, 2), 'utf-8');

    console.log(`   💾 Updated brand data in brand-identities.json`);
    return true;

  } catch (error) {
    console.error(`   ❌ Error updating brand data:`, error.message);
    return false;
  }
}

/**
 * Extract brand information for a single brand
 */
async function extractSingleBrand(brandId, url) {
  try {
    // Load existing brand data
    const brandData = JSON.parse(fs.readFileSync(brandDataPath, 'utf-8'));
    const brands = brandData.brands || [];
    const brand = brands.find(b => b.id === brandId);

    if (!brand) {
      console.error(`❌ Brand "${brandId}" not found`);
      return;
    }

    const brandUrl = url || brand.sourceUrl;
    if (!brandUrl) {
      console.error(`❌ No URL found for brand "${brandId}"`);
      return;
    }

    // Extract brand information
    const extractedData = await extractBrandInfo(brandUrl, brand.title, brand);

    if (extractedData) {
      // Update brand data
      updateBrandData(brandId, extractedData);
      console.log(`\n✅ Successfully extracted and updated ${brand.title}\n`);
    } else {
      console.log(`\n⚠️  Extraction failed for ${brand.title}\n`);
    }

  } catch (error) {
    console.error(`❌ Error processing brand:`, error.message);
  }
}

/**
 * Extract brand information for multiple brands
 */
async function extractMultipleBrands(brandIds = []) {
  try {
    const brandData = JSON.parse(fs.readFileSync(brandDataPath, 'utf-8'));
    const brands = brandData.brands || [];

    const brandsToProcess = brandIds.length > 0
      ? brands.filter(b => brandIds.includes(b.id))
      : brands.filter(b => b.sourceUrl); // Process all brands with URLs

    console.log(`\n🚀 Starting extraction for ${brandsToProcess.length} brand(s)...\n`);

    for (let i = 0; i < brandsToProcess.length; i++) {
      const brand = brandsToProcess[i];
      console.log(`\n[${i + 1}/${brandsToProcess.length}] Processing: ${brand.title}`);

      await extractSingleBrand(brand.id, brand.sourceUrl);

      // Add delay between requests to avoid rate limiting
      if (i < brandsToProcess.length - 1) {
        console.log('   ⏳ Waiting 5 seconds before next extraction...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    console.log(`\n✅ Completed extraction for ${brandsToProcess.length} brand(s)\n`);

  } catch (error) {
    console.error(`❌ Error in batch extraction:`, error.message);
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('📚 Gemini Brand Extraction Tool');
    console.log('\nUsage:');
    console.log('  node scripts/gemini-brand-extraction.js <brand-id> [url]');
    console.log('  node scripts/gemini-brand-extraction.js --all');
    console.log('  node scripts/gemini-brand-extraction.js <brand-id1> <brand-id2> ...');
    console.log('\nExamples:');
    console.log('  node scripts/gemini-brand-extraction.js ibm-design');
    console.log('  node scripts/gemini-brand-extraction.js nasa-manual https://standardsmanual.com/products/nasa-graphics-standards-manual');
    console.log('  node scripts/gemini-brand-extraction.js --all');
    console.log('  node scripts/gemini-brand-extraction.js ibm-design nasa-manual indiana-university');
    process.exit(0);
  }

  if (args[0] === '--all') {
    await extractMultipleBrands();
  } else if (args.length === 1) {
    // Single brand extraction
    await extractSingleBrand(args[0]);
  } else if (args.length === 2 && args[1].startsWith('http')) {
    // Single brand with custom URL
    await extractSingleBrand(args[0], args[1]);
  } else {
    // Multiple brands
    await extractMultipleBrands(args);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('gemini-brand-extraction.js')) {
  main().catch(console.error);
}

export { extractBrandInfo, extractSingleBrand, extractMultipleBrands };

