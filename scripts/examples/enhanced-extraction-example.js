/**
 * Integration Example: Enhanced Brand Extraction
 * ===============================================
 *
 * This example shows how to integrate enhanced extraction tools
 * into your existing workflow.
 */

import {
  enrichBrandWithAI,
  extractComprehensiveBrandData,
  generateBrandQuiz,
  compareBrands,
  extractColorsFromImage
} from '../scripts/enhanced-brand-extraction.js';
import { updateBrandData } from '../scripts/mcp-extraction-helpers.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Example: Complete workflow for extracting and enriching a brand
 */
async function extractAndEnrichBrand(url: string, brandId: string) {
  console.log(`🚀 Starting extraction for ${brandId}...`);

  try {
    // Step 1: Extract comprehensive data
    console.log('📊 Extracting comprehensive brand data...');
    const extractedData = await extractComprehensiveBrandData(url, brandId);

    // Step 2: Enrich with AI (if API key available)
    console.log('🤖 Enriching with AI...');
    const enrichedData = await enrichBrandWithAI({
      id: brandId,
      title: extractedData.pageTitle,
      brandInfo: {
        colors: { extracted: extractedData.colors },
        typography: {
          fonts: extractedData.fonts,
          scales: extractedData.scales
        }
      },
      designPrinciples: extractedData.principles
    });

    // Step 3: Generate quiz questions
    console.log('📚 Generating quiz questions...');
    const quiz = await generateBrandQuiz(enrichedData);

    // Step 4: Save to brand-identities.json
    console.log('💾 Saving data...');
    updateBrandData(brandId, {
      ...enrichedData,
      quiz: quiz,
      extractedAt: new Date().toISOString()
    });

    console.log(`✅ Successfully extracted and enriched ${brandId}!`);
    console.log(`   - Colors: ${extractedData.colors.length} found`);
    console.log(`   - Fonts: ${extractedData.fonts.length} found`);
    console.log(`   - Quiz questions: ${quiz.length} generated`);

    return {
      brand: enrichedData,
      quiz: quiz
    };
  } catch (error) {
    console.error(`❌ Error extracting ${brandId}:`, error);
    throw error;
  }
}

/**
 * Example: Compare two brands
 */
async function compareTwoBrands(brandId1: string, brandId2: string) {
  const brandDataPath = path.resolve(__dirname, '../src/data/brand-identities.json');
  const brandData = JSON.parse(fs.readFileSync(brandDataPath, 'utf-8'));

  const brand1 = brandData.brands.find((b: any) => b.id === brandId1);
  const brand2 = brandData.brands.find((b: any) => b.id === brandId2);

  if (!brand1 || !brand2) {
    throw new Error('Brands not found');
  }

  console.log(`🔍 Comparing ${brand1.title} vs ${brand2.title}...`);
  const comparison = await compareBrands(brand1, brand2);

  return comparison;
}

/**
 * Example: Extract colors from brand logo image
 */
async function extractLogoColors(imagePath: string) {
  console.log(`🎨 Extracting colors from ${imagePath}...`);
  const colors = await extractColorsFromImage(imagePath);
  console.log(`   Found ${colors.length} dominant colors`);
  return colors;
}

// Example usage:
if (import.meta.url === `file://${process.argv[1]}`) {
  // Extract IBM Design Language
  extractAndEnrichBrand(
    'https://www.ibm.com/design/language/',
    'ibm-design'
  ).then(result => {
    console.log('\n📊 Extraction complete!');
    console.log('Quiz questions:', result.quiz.length);
  });

  // Compare NASA and IBM
  compareTwoBrands('nasa-manual', 'ibm-design').then(comparison => {
    console.log('\n⚖️  Comparison complete!');
    console.log('Similarities:', comparison.similarities?.length);
    console.log('Differences:', comparison.differences?.length);
  });
}

export {
  extractAndEnrichBrand,
  compareTwoBrands,
  extractLogoColors
};

