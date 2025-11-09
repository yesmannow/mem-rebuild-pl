/**
 * generate-moodboards.js
 * Auto-creates moodboard metadata for each /public/images/projects/[slug] folder
 * Run: node scripts/generate-moodboards.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, '../public/images/projects');
const outputDir = path.resolve(__dirname, '../public/moodboards');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Extract dominant colors from filename patterns (simplified approach)
 * In a real implementation, you'd use a library like node-vibrant or sharp
 */
function extractColorsFromFilename(filename) {
  const lower = filename.toLowerCase();

  // Color associations based on project types and names
  if (lower.includes('bbq') || lower.includes('food')) {
    return ['#8B4513', '#D2691E', '#CD853F', '#F4A460', '#DEB887']; // Browns, oranges
  }

  if (lower.includes('law') || lower.includes('legal') || lower.includes('tbm')) {
    return ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE']; // Blues
  }

  if (lower.includes('painting') || lower.includes('art') || lower.includes('russell')) {
    return ['#7C3AED', '#A855F7', '#C084FC', '#DDD6FE', '#F3E8FF']; // Purples
  }

  // Default professional palette
  return ['#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6'];
}

/**
 * Generate keywords based on project type and filename
 */
function generateKeywords(folderName, filename) {
  const keywords = new Set();
  const lower = folderName.toLowerCase() + ' ' + filename.toLowerCase();

  // Project-specific keywords
  if (lower.includes('bbq')) {
    keywords.add('restaurant');
    keywords.add('branding');
    keywords.add('food');
    keywords.add('rustic');
    keywords.add('authentic');
  }

  if (lower.includes('law') || lower.includes('legal') || lower.includes('tbm')) {
    keywords.add('professional');
    keywords.add('legal');
    keywords.add('corporate');
    keywords.add('trustworthy');
    keywords.add('established');
  }

  if (lower.includes('painting') || lower.includes('art')) {
    keywords.add('artistic');
    keywords.add('creative');
    keywords.add('expressive');
    keywords.add('cultural');
    keywords.add('vibrant');
  }

  // File type keywords
  if (lower.includes('logo')) {
    keywords.add('logo design');
    keywords.add('identity');
  }

  if (lower.includes('brand')) {
    keywords.add('branding');
    keywords.add('visual identity');
  }

  // Default keywords if none found
  if (keywords.size === 0) {
    keywords.add('design');
    keywords.add('professional');
    keywords.add('modern');
  }

  return Array.from(keywords);
}

/**
 * Analyze a project folder and generate moodboard data
 */
async function analyzeProject(folderPath) {
  const folderName = path.basename(folderPath);

  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    return null;
  }

  const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));

  if (files.length === 0) {
    return null;
  }

  const colorData = [];
  const keywords = new Set();

  // Process each file in the project folder
  for (const file of files) {
    try {
      // Extract colors (simplified - in real implementation use image analysis)
      const colors = extractColorsFromFilename(file);
      colorData.push(...colors);

      // Generate keywords
      const fileKeywords = generateKeywords(folderName, file);
      fileKeywords.forEach(k => keywords.add(k));
    } catch (err) {
      console.warn(`Skipping ${file}:`, err.message);
    }
  }

  // Remove duplicates and limit colors
  const uniqueColors = [...new Set(colorData)].slice(0, 8);

  return {
    slug: folderName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
    title: folderName
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    dominantColors: uniqueColors,
    keywords: Array.from(keywords),
    imageCount: files.length,
    images: files.map(f => `/images/projects/${folderName}/${f}`),
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Main execution function
 */
async function generateMoodboards() {
  console.log('🎨 Starting moodboard generation...');

  try {
    if (!fs.existsSync(baseDir)) {
      console.error(`❌ Projects directory not found: ${baseDir}`);
      return;
    }

    const projectFolders = fs.readdirSync(baseDir).filter(item => {
      const itemPath = path.join(baseDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    const results = [];

    for (const folder of projectFolders) {
      const folderPath = path.join(baseDir, folder);
      console.log(`📁 Analyzing project: ${folder}`);

      const data = await analyzeProject(folderPath);

      if (data) {
        // Write individual moodboard file
        const outputFile = path.join(outputDir, `${data.slug}.json`);
        fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
        console.log(`✅ Generated moodboard: ${data.slug}.json`);

        results.push(data);
      } else {
        console.log(`⚠️  Skipped empty project: ${folder}`);
      }
    }

    // Write combined moodboards file
    const combinedOutput = {
      generated: new Date().toISOString(),
      totalProjects: results.length,
      projects: results,
    };

    fs.writeFileSync(
      path.join(outputDir, 'moodboards.json'),
      JSON.stringify(combinedOutput, null, 2)
    );

    console.log(`🎉 Moodboard generation complete!`);
    console.log(`📊 Generated data for ${results.length} projects`);
    console.log(`📁 Output directory: ${outputDir}`);
  } catch (error) {
    console.error('❌ Error generating moodboards:', error);
    process.exit(1);
  }
}

// Run the script
generateMoodboards();
