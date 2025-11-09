/**
 * Generate Quiz Questions and Comparison Data for Brands
 * =======================================================
 *
 * This script generates quiz questions and comparison data for all brands
 * in brand-identities.json using AI-powered tools.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brandDataPath = path.resolve(__dirname, '../src/data/brand-identities.json');

// Initialize OpenAI
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

if (!openai) {
  console.warn('⚠️  OpenAI API key not found in .env file.');
  console.warn('   Please add OPENAI_API_KEY=your_key_here to your .env file');
  console.warn('   Continuing with mock data generation...\n');
}

/**
 * Generate quiz questions for a brand
 */
async function generateBrandQuiz(brandData) {
  // Always generate mock quiz questions as fallback
  const mockQuiz = [
    {
      question: `What is the primary color palette used in ${brandData.title}?`,
      options: [
        'Warm tones',
        'Cool tones',
        'Neutral grays',
        'Vibrant colors'
      ],
      correctAnswer: brandData.brandInfo?.colors?.primary?.length > 0 ? 1 : 0,
      explanation: `${brandData.title} uses a carefully selected color palette that reflects its brand identity.`
    },
    {
      question: `What year was ${brandData.title} created?`,
      options: [
        brandData.year ? (brandData.year - 5).toString() : 'Unknown',
        brandData.year?.toString() || 'Unknown',
        brandData.year ? (brandData.year + 5).toString() : 'Unknown',
        brandData.year ? (brandData.year + 10).toString() : 'Unknown'
      ],
      correctAnswer: 1,
      explanation: `${brandData.title} was created in ${brandData.year || 'an unknown year'}.`
    },
    {
      question: `What is a key design principle of ${brandData.title}?`,
      options: brandData.designPrinciples?.slice(0, 4) || [
        'Simplicity',
        'Complexity',
        'Randomness',
        'Chaos'
      ],
      correctAnswer: 0,
      explanation: brandData.designPrinciples?.[0] || 'Design principles guide the brand identity.'
    },
    {
      question: `Who designed ${brandData.title}?`,
      options: [
        brandData.designer || 'Unknown',
        'Various designers',
        'In-house team',
        'External agency'
      ],
      correctAnswer: 0,
      explanation: `${brandData.title} was designed by ${brandData.designer || 'various contributors'}.`
    },
    {
      question: `What category does ${brandData.title} belong to?`,
      options: [
        brandData.category,
        'Other',
        'Unknown',
        'Mixed'
      ],
      correctAnswer: 0,
      explanation: `${brandData.title} is categorized as ${brandData.category}.`
    }
  ];

  if (!openai) {
    return mockQuiz;
  }

  try {
    const prompt = `Create 5 multiple-choice quiz questions about this brand identity:

Brand: ${brandData.title}
Category: ${brandData.category}
Year: ${brandData.year || 'Unknown'}
Designer: ${brandData.designer || 'Unknown'}
Colors: ${JSON.stringify(brandData.brandInfo?.colors || {})}
Typography: ${JSON.stringify(brandData.brandInfo?.typography || {})}
Design Principles: ${(brandData.designPrinciples || []).join(', ')}
Reflection: ${brandData.reflection || ''}
Details: ${brandData.details || ''}

Each question should:
- Test understanding of design concepts
- Be educational and informative
- Have exactly 4 options with 1 correct answer (index 0-3)
- Include a clear explanation

Format as JSON with this structure:
{
  "questions": [
    {
      "question": "Question text here",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0,
      "explanation": "Explanation text here"
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a design educator creating quiz questions about brand identity. Always return valid JSON with exactly 5 questions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return result.questions || mockQuiz;
  } catch (error) {
    console.error(`❌ Error generating quiz for ${brandData.title}:`, error.message);
    console.log(`   ⚠️  Falling back to mock quiz questions...`);
    return mockQuiz;
  }
}

/**
 * Generate comparison data between two brands
 */
async function generateComparison(brand1, brand2) {
  // Always generate mock comparison as fallback
  const mockComparison = {
    similarities: [
      'Both brands use systematic design approaches',
      'Both emphasize visual consistency',
      'Both have defined color palettes'
    ],
    differences: [
      `${brand1.title} focuses on ${brand1.category}, while ${brand2.title} focuses on ${brand2.category}`,
      'Different color schemes reflect different brand personalities',
      'Typography choices differ based on brand needs'
    ],
    lessons: `Comparing ${brand1.title} and ${brand2.title} shows how different industries and contexts require different design approaches while maintaining core design principles.`,
    whenToUse: {
      brand1: `Use ${brand1.title} approach for ${brand1.category} projects`,
      brand2: `Use ${brand2.title} approach for ${brand2.category} projects`
    }
  };

  if (!openai) {
    return mockComparison;
  }

  try {
    const prompt = `Compare these two brand identities and provide insights:

Brand 1: ${brand1.title}
- Category: ${brand1.category}
- Year: ${brand1.year || 'Unknown'}
- Colors: ${JSON.stringify(brand1.brandInfo?.colors || {})}
- Typography: ${JSON.stringify(brand1.brandInfo?.typography || {})}
- Principles: ${(brand1.designPrinciples || []).join(', ')}
- Reflection: ${brand1.reflection || ''}

Brand 2: ${brand2.title}
- Category: ${brand2.category}
- Year: ${brand2.year || 'Unknown'}
- Colors: ${JSON.stringify(brand2.brandInfo?.colors || {})}
- Typography: ${JSON.stringify(brand2.brandInfo?.typography || {})}
- Principles: ${(brand2.designPrinciples || []).join(', ')}
- Reflection: ${brand2.reflection || ''}

Provide:
1. Similarities (3-5 points as array)
2. Differences (3-5 points as array)
3. Design lessons from comparison (1-2 paragraphs)
4. When to use each approach (object with brand1 and brand2 keys)

Format as JSON with keys: similarities, differences, lessons, whenToUse`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a design analyst comparing brand identities. Provide insightful, educational comparisons.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  } catch (error) {
    console.error(`❌ Error generating comparison for ${brand1.title} vs ${brand2.title}:`, error.message);
    console.log(`   ⚠️  Falling back to mock comparison...`);
    return mockComparison;
  }
}

/**
 * Main function to generate quiz and comparison data
 */
async function generateAllData() {
  console.log('🚀 Starting quiz and comparison data generation...\n');

  // Read existing brand data
  const brandData = JSON.parse(fs.readFileSync(brandDataPath, 'utf-8'));
  const brands = brandData.brands || [];

  console.log(`📊 Found ${brands.length} brands to process\n`);

  // Generate quiz questions for each brand
  console.log('📚 Generating quiz questions...\n');
  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    console.log(`[${i + 1}/${brands.length}] Generating quiz for ${brand.title}...`);

    const quiz = await generateBrandQuiz(brand);
    brands[i].quiz = quiz;

    console.log(`   ✅ Generated ${quiz.length} quiz questions`);

    // Add delay to avoid rate limiting
    if (openai && i < brands.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n⚖️  Generating comparison data...\n');

  // Generate comparisons for key brand pairs
  const keyComparisons = [
    ['ibm-design', 'nasa-manual'],
    ['nasa-manual', 'indiana-university'],
    ['ibm-design', 'indiana-university'],
    ['folklorious', 'eat-my-shorts'],
    ['lune-croissanterie', 'tenth-muse']
  ];

  const comparisons = {};

  for (const [id1, id2] of keyComparisons) {
    const brand1 = brands.find((b) => b.id === id1);
    const brand2 = brands.find((b) => b.id === id2);

    if (brand1 && brand2) {
      console.log(`Comparing ${brand1.title} vs ${brand2.title}...`);
      const comparison = await generateComparison(brand1, brand2);

      if (comparison) {
        const comparisonKey = `${id1}-vs-${id2}`;
        comparisons[comparisonKey] = comparison;

        // Add comparison data to both brands
        const brand1Index = brands.findIndex((b) => b.id === id1);
        const brand2Index = brands.findIndex((b) => b.id === id2);

        if (brand1Index >= 0) {
          brands[brand1Index].comparisonData = brands[brand1Index].comparisonData || {};
          brands[brand1Index].comparisonData[comparisonKey] = comparison;
        }

        if (brand2Index >= 0) {
          brands[brand2Index].comparisonData = brands[brand2Index].comparisonData || {};
          brands[brand2Index].comparisonData[comparisonKey] = comparison;
        }

        console.log(`   ✅ Comparison generated`);

        // Add delay to avoid rate limiting
        if (openai) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
  }

  // Update brand data
  brandData.brands = brands;
  brandData.lastUpdated = new Date().toISOString();
  brandData.quizGeneratedAt = new Date().toISOString();

  // Save updated data
  fs.writeFileSync(brandDataPath, JSON.stringify(brandData, null, 2), 'utf-8');

  console.log('\n✅ Successfully generated quiz and comparison data!');
  console.log(`\n📊 Summary:`);
  console.log(`   - Quiz questions: ${brands.reduce((sum, b) => sum + (b.quiz?.length || 0), 0)} total`);
  console.log(`   - Comparisons: ${Object.keys(comparisons).length} generated`);
  console.log(`\n💾 Data saved to: ${brandDataPath}`);
}

// Run the script
generateAllData().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});

