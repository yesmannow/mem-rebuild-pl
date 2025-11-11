/**
 * AI-powered moodboard classification
 * Uses OpenAI to analyze color palettes and generate style tags and summaries
 */
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moodboardDir = path.resolve(__dirname, '../public/moodboards');

// Initialize OpenAI (will use OPENAI_API_KEY from environment)
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

/**
 * Fallback classification for when AI is not available
 */
function fallbackClassification(data) {
  const { slug, dominantColors, keywords } = data;

  // Simple rule-based classification
  const tags = [];
  const lower = slug.toLowerCase();

  // Project type tags
  if (lower.includes('bbq') || lower.includes('food')) {
    tags.push('organic', 'warm', 'rustic');
  } else if (lower.includes('law') || lower.includes('legal')) {
    tags.push('professional', 'minimalist', 'corporate');
  } else if (lower.includes('paint') || lower.includes('art')) {
    tags.push('artistic', 'vibrant', 'creative');
  } else {
    tags.push('modern', 'clean');
  }

  // Color-based tags
  if (dominantColors && dominantColors.length > 0) {
    const firstColor = dominantColors[0];
    if (firstColor) {
      const hex = firstColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      if (brightness > 200) tags.push('bright');
      else if (brightness < 50) tags.push('dark');

      if (r > g && r > b) tags.push('warm');
      else if (b > r && b > g) tags.push('cool');
    }
  }

  return {
    slug,
    tags: [...new Set(tags)].slice(0, 4), // Limit to 4 unique tags
    summary: `${data.title} project featuring ${tags.join(', ')} design elements with a focus on ${keywords.slice(0, 2).join(' and ')} aesthetics.`,
    confidence: 'fallback',
  };
}

/**
 * Classify a single moodboard using AI
 */
async function classifyMoodboard(data) {
  const { slug, dominantColors, keywords, title } = data;

  if (!openai) {
    console.log(`⚠️  No OpenAI API key found, using fallback classification for ${slug}`);
    return fallbackClassification(data);
  }

  try {
    const prompt = `Analyze this design project and provide a JSON response with classification data.

Project: "${title}"
Dominant Colors: ${dominantColors.join(', ')}
Keywords: ${keywords.join(', ')}

Please return a JSON object with:
- "slug": "${slug}"
- "tags": array of 3-4 style tags from: ["cinematic", "minimalist", "organic", "futuristic", "vibrant", "muted", "editorial", "retro", "modern", "artistic", "professional", "warm", "cool", "dark", "bright"]
- "summary": a 1-2 sentence description of the project's visual style and mood
- "confidence": "high", "medium", or "low"

Focus on the emotional and aesthetic qualities suggested by the color palette and keywords.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a design expert analyzing visual projects. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const content = response.choices[0].message.content.trim();

    // Try to parse the JSON response
    try {
      const parsed = JSON.parse(content);

      // Validate the response structure
      if (parsed.slug && parsed.tags && parsed.summary) {
        console.log(`🧠 AI classified ${slug}: ${parsed.tags.join(', ')}`);
        return parsed;
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (parseError) {
      console.warn(`⚠️  Could not parse AI response for ${slug}, using fallback`);
      return fallbackClassification(data);
    }
  } catch (error) {
    console.warn(`⚠️  AI classification failed for ${slug}: ${error.message}`);
    return fallbackClassification(data);
  }
}

/**
 * Main classification function
 */
async function classifyMoodboards() {
  console.log('🧠 Starting AI-powered moodboard classification...');

  if (!fs.existsSync(moodboardDir)) {
    console.error(`❌ Moodboards directory not found: ${moodboardDir}`);
    return;
  }

  const files = fs
    .readdirSync(moodboardDir)
    .filter(f => f.endsWith('.json') && !f.includes('classified') && !f.includes('enhanced'));

  if (files.length === 0) {
    console.warn('⚠️  No moodboard files found to classify');
    return;
  }

  console.log(`📁 Found ${files.length} moodboard files to classify`);

  const classified = [];

  for (const file of files) {
    try {
      const filePath = path.join(moodboardDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      console.log(`🔍 Classifying ${data.slug}...`);
      const classification = await classifyMoodboard(data);
      classified.push(classification);

      // Small delay to be respectful to API limits
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  // Save classified data
  const outputPath = path.join(moodboardDir, 'classified.json');
  const classifiedData = {
    generated: new Date().toISOString(),
    totalClassified: classified.length,
    classifications: classified,
  };

  fs.writeFileSync(outputPath, JSON.stringify(classifiedData, null, 2));

  console.log(`✅ Classification complete! Processed ${classified.length} projects`);
  console.log(`📁 Output saved to: ${outputPath}`);

  // Summary statistics
  const tagCounts = {};
  classified.forEach(item => {
    item.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  console.log('📊 Tag distribution:', tagCounts);
}

// Run the script
classifyMoodboards().catch(console.error);
