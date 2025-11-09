/**
 * Enhanced Moodboard Generator with Real Color Extraction
 * Extract dominant colors + metadata from /images/projects using node-vibrant
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Vibrant } = require('node-vibrant/node');
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../public/images/projects');
const outputDir = path.resolve(__dirname, '../public/moodboards');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Generate keywords based on project type and folder name
 */
function generateKeywords(slug, colors) {
  const keywords = new Set();
  const lower = slug.toLowerCase();

  // Project-specific keywords based on slug
  if (lower.includes('bbq') || lower.includes('food')) {
    keywords.add('restaurant', 'culinary', 'branding', 'warm', 'rustic');
  } else if (lower.includes('law') || lower.includes('legal') || lower.includes('tbm')) {
    keywords.add('professional', 'corporate', 'trustworthy', 'established', 'clean');
  } else if (lower.includes('paint') || lower.includes('art') || lower.includes('russell')) {
    keywords.add('artistic', 'creative', 'expressive', 'cultural', 'vibrant');
  } else {
    // Default keywords
    keywords.add('design', 'modern', 'professional', 'creative');
  }

  // Color-based keywords
  const dominantHue = colors[0];
  if (dominantHue) {
    const hex = dominantHue.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Determine color characteristics
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);

    if (brightness > 200) keywords.add('bright', 'light');
    else if (brightness < 50) keywords.add('dark', 'dramatic');

    if (saturation > 100) keywords.add('vibrant', 'bold');
    else keywords.add('muted', 'subtle');

    // Dominant color keywords
    if (r > g && r > b) keywords.add('warm', 'energetic');
    else if (g > r && g > b) keywords.add('natural', 'fresh');
    else if (b > r && b > g) keywords.add('cool', 'professional');
  }

  return Array.from(keywords);
}

/**
 * Process a single project folder
 */
async function processProject(slug) {
  const folder = path.join(inputDir, slug);

  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
    console.log(`⚠️  Skipping ${slug} - not a directory`);
    return null;
  }

  const files = fs.readdirSync(folder).filter(f => /\.(png|jpe?g|webp|avif)$/i.test(f));

  if (!files.length) {
    console.log(`⚠️  No images found in ${slug}`);
    return null;
  }

  try {
    // Use the first image for color extraction
    const imagePath = path.join(folder, files[0]);
    console.log(`🎨 Analyzing colors in ${slug}/${files[0]}...`);

    const palette = await Vibrant.from(imagePath).getPalette();

    // Extract colors in order of vibrancy
    const colorOrder = [
      'Vibrant',
      'DarkVibrant',
      'LightVibrant',
      'Muted',
      'DarkMuted',
      'LightMuted',
    ];
    const dominantColors = [];

    colorOrder.forEach(colorName => {
      if (palette[colorName]) {
        // Handle different API versions
        const color = palette[colorName];
        const hex = color.hex || color.getHex?.() || color.toString?.() || '#333333';
        dominantColors.push(hex);
      }
    });

    // Ensure we have at least 3 colors
    while (dominantColors.length < 3) {
      dominantColors.push('#333333');
    }

    const keywords = generateKeywords(slug, dominantColors);

    const data = {
      slug,
      title: slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      dominantColors: dominantColors.slice(0, 6), // Limit to 6 colors
      keywords,
      imageCount: files.length,
      images: files.map(f => `/images/projects/${slug}/${f}`),
      lastUpdated: new Date().toISOString(),
      colorAnalysis: {
        vibrant: palette.Vibrant ? palette.Vibrant.hex || palette.Vibrant.getHex?.() || null : null,
        muted: palette.Muted ? palette.Muted.hex || palette.Muted.getHex?.() || null : null,
        darkVibrant: palette.DarkVibrant
          ? palette.DarkVibrant.hex || palette.DarkVibrant.getHex?.() || null
          : null,
        lightVibrant: palette.LightVibrant
          ? palette.LightVibrant.hex || palette.LightVibrant.getHex?.() || null
          : null,
      },
    };

    const outputPath = path.join(outputDir, `${slug}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log(`✅ Generated enhanced moodboard for ${slug} (${dominantColors.length} colors)`);
    return data;
  } catch (error) {
    console.error(`❌ Error processing ${slug}:`, error.message);
    return null;
  }
}

/**
 * Main execution
 */
async function generateEnhancedMoodboards() {
  console.log('🎨 Starting enhanced moodboard generation with real color extraction...');

  if (!fs.existsSync(inputDir)) {
    console.error(`❌ Projects directory not found: ${inputDir}`);
    return;
  }

  const projects = fs.readdirSync(inputDir).filter(item => {
    const itemPath = path.join(inputDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  console.log(`📁 Found ${projects.length} project folders`);

  const results = [];

  for (const project of projects) {
    const data = await processProject(project);
    if (data) {
      results.push(data);
    }
  }

  // Create combined index
  const combinedData = {
    generated: new Date().toISOString(),
    totalProjects: results.length,
    projects: results,
  };

  const indexPath = path.join(outputDir, 'enhanced-moodboards.json');
  fs.writeFileSync(indexPath, JSON.stringify(combinedData, null, 2));

  console.log(`🎉 Enhanced moodboard generation complete!`);
  console.log(`📊 Generated data for ${results.length} projects`);
  console.log(`📁 Output directory: ${outputDir}`);
}

// Run the script
generateEnhancedMoodboards().catch(console.error);
