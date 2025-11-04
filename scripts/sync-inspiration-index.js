/**
 * Global Sync - Combine everything into /public/inspiration.json
 * Merges moodboard data, classifications, and preview paths into unified feed
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moodboardDir = path.resolve(__dirname, "../public/moodboards");
const previewDir = path.join(moodboardDir, "previews");
const outputPath = path.resolve(__dirname, "../public/inspiration.json");

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

/**
 * Safely read and parse JSON file
 */
function safeReadJSON(filePath) {
  try {
    if (!fileExists(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`⚠️  Could not read ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Generate a readable title from slug
 */
function generateTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Main sync function
 */
async function syncInspirationIndex() {
  console.log('🔗 Starting global inspiration index sync...');
  
  if (!fs.existsSync(moodboardDir)) {
    console.error(`❌ Moodboards directory not found: ${moodboardDir}`);
    return;
  }
  
  // Load classifications if available
  const classifiedPath = path.join(moodboardDir, 'classified.json');
  const classifiedData = safeReadJSON(classifiedPath);
  const classifications = classifiedData?.classifications || [];
  
  console.log(`📊 Found ${classifications.length} classifications`);
  
  // Process all moodboard files
  const moodboardFiles = fs.readdirSync(moodboardDir)
    .filter(f => f.endsWith('.json') && !f.includes('classified') && !f.includes('enhanced'));
  
  console.log(`📁 Processing ${moodboardFiles.length} moodboard files`);
  
  const entries = [];
  
  for (const file of moodboardFiles) {
    try {
      const moodboardPath = path.join(moodboardDir, file);
      const moodboardData = safeReadJSON(moodboardPath);
      
      if (!moodboardData) {
        console.warn(`⚠️  Skipping invalid moodboard: ${file}`);
        continue;
      }
      
      const { slug } = moodboardData;
      
      // Find matching classification
      const classification = classifications.find(c => c.slug === slug) || {
        tags: ['design', 'creative'],
        summary: `${generateTitle(slug)} project showcasing creative design work.`,
        confidence: 'fallback'
      };
      
      // Check for preview files
      const gridPath = `/moodboards/previews/${slug}-grid.jpg`;
      const swatchPath = `/moodboards/previews/${slug}-swatches.jpg`;
      
      const gridExists = fileExists(path.join(__dirname, `../public${gridPath}`));
      const swatchExists = fileExists(path.join(__dirname, `../public${swatchPath}`));
      
      // Create unified entry
      const entry = {
        slug,
        title: moodboardData.title || generateTitle(slug),
        dominantColors: moodboardData.dominantColors || ['#333333', '#666666', '#999999'],
        keywords: moodboardData.keywords || ['design'],
        tags: classification.tags || ['creative'],
        summary: classification.summary || `${generateTitle(slug)} project.`,
        confidence: classification.confidence || 'fallback',
        imageCount: moodboardData.imageCount || 0,
        lastUpdated: moodboardData.lastUpdated || new Date().toISOString(),
        previews: {
          grid: gridExists ? gridPath : null,
          swatches: swatchExists ? swatchPath : null
        },
        colorAnalysis: moodboardData.colorAnalysis || null,
        images: moodboardData.images || []
      };
      
      entries.push(entry);
      console.log(`✅ Processed ${slug} (${entry.tags.join(', ')})`);
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  // Sort entries by title
  entries.sort((a, b) => a.title.localeCompare(b.title));
  
  // Create final inspiration index
  const inspirationIndex = {
    generated: new Date().toISOString(),
    version: "1.0.0",
    totalProjects: entries.length,
    metadata: {
      totalColors: entries.reduce((sum, entry) => sum + entry.dominantColors.length, 0),
      uniqueTags: [...new Set(entries.flatMap(entry => entry.tags))].sort(),
      averageImageCount: Math.round(entries.reduce((sum, entry) => sum + entry.imageCount, 0) / entries.length),
      lastProjectUpdate: entries.reduce((latest, entry) => {
        return new Date(entry.lastUpdated) > new Date(latest) ? entry.lastUpdated : latest;
      }, '1970-01-01T00:00:00.000Z')
    },
    projects: entries
  };
  
  // Write the final index
  fs.writeFileSync(outputPath, JSON.stringify(inspirationIndex, null, 2));
  
  console.log('🎉 Global inspiration index sync complete!');
  console.log(`📊 Synced ${entries.length} projects`);
  console.log(`🏷️  Unique tags: ${inspirationIndex.metadata.uniqueTags.join(', ')}`);
  console.log(`📁 Output: ${outputPath}`);
  
  // Generate summary statistics
  const tagDistribution = {};
  entries.forEach(entry => {
    entry.tags.forEach(tag => {
      tagDistribution[tag] = (tagDistribution[tag] || 0) + 1;
    });
  });
  
  console.log('📈 Tag distribution:', tagDistribution);
  
  return inspirationIndex;
}

// Run the script
syncInspirationIndex().catch(console.error);
