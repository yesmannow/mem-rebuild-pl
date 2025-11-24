import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

/**
 * Generate human-readable title from filename
 * Examples:
 * - "20210903_182855-3.jpg" -> "September 3, 2021 Scene"
 * - "DSC00123.jpg" -> "Urban Geometry Scene"
 * - "portrait_00100_burst20180224211719099_cover2.jpg" -> "Portrait Study"
 */
function generateTitleFromFilename(filename) {
  // Remove extension
  const baseName = filename.replace(/\.[^.]+$/, '');

  // Handle date patterns: YYYYMMDD_HHMMSS or YYYYMMDDHHMMSS
  const datePattern1 = /(\d{4})(\d{2})(\d{2})[_-]?(\d{2})(\d{2})(\d{2})/;
  const dateMatch1 = baseName.match(datePattern1);
  if (dateMatch1) {
    const [, year, month, day] = dateMatch1;
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    if (monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      return `${monthNames[monthNum - 1]} ${dayNum}, ${year} Scene`;
    }
  }

  // Handle date patterns: YYYYMMDD
  const datePattern2 = /^(\d{4})(\d{2})(\d{2})/;
  const dateMatch2 = baseName.match(datePattern2);
  if (dateMatch2) {
    const [, year, month, day] = dateMatch2;
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    if (monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      return `${monthNames[monthNum - 1]} ${dayNum}, ${year} Scene`;
    }
  }

  // Handle descriptive filenames with keywords
  const keywords = {
    portrait: 'Portrait Study',
    landscape: 'Landscape View',
    street: 'Street Scene',
    urban: 'Urban Geometry',
    nature: 'Natural Scene',
    abstract: 'Abstract Composition',
    design: 'Design Work',
    logo: 'Logo Design',
    brand: 'Brand Identity',
    ad: 'Advertisement',
    campaign: 'Campaign Design',
  };

  const lowerBase = baseName.toLowerCase();
  for (const [key, title] of Object.entries(keywords)) {
    if (lowerBase.includes(key)) {
      return title;
    }
  }

  // Handle common patterns
  if (lowerBase.includes('dsc') || lowerBase.includes('img_')) {
    return 'Photographic Study';
  }

  if (lowerBase.includes('burst')) {
    return 'Portrait Study';
  }

  // Handle descriptive filenames (remove numbers, clean up)
  const cleaned = baseName
    .replace(/[-_]/g, ' ')
    .replace(/\d+/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleaned.length > 3) {
    return cleaned
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim() || 'Untitled';
  }

  // Last resort: use filename pattern
  if (baseName.length > 0) {
    return 'Photographic Study';
  }

  return 'Untitled';
}

/**
 * Infer category from filename or folder
 */
function inferCategory(filename, folder) {
  const lowerName = filename.toLowerCase();

  // Photography categories
  if (folder === 'photography') {
    if (lowerName.includes('portrait') || lowerName.includes('burst')) {
      return 'Portrait';
    }
    if (lowerName.includes('street') || lowerName.includes('urban') || lowerName.includes('city')) {
      return 'Street';
    }
    if (lowerName.includes('nature') || lowerName.includes('forest') || lowerName.includes('mountain')) {
      return 'Nature';
    }
    if (lowerName.includes('abstract')) {
      return 'Abstract';
    }
    // Default for photography
    return 'Street';
  }

  // Design categories
  if (folder === 'design') {
    if (lowerName.includes('logo') || lowerName.includes('brand') || lowerName.includes('identity')) {
      return 'Branding';
    }
    if (lowerName.includes('ad') || lowerName.includes('campaign') || lowerName.includes('post')) {
      return 'Digital';
    }
    if (lowerName.includes('print') || lowerName.includes('poster') || lowerName.includes('flyer')) {
      return 'Print';
    }
    // Default for design
    return 'Digital';
  }

  return 'Uncategorized';
}

/**
 * Scan folder and generate image dataset
 */
async function buildGalleryDataset(folderName) {
  const folderPath = path.join(repoRoot, 'public', 'images', folderName);

  try {
    const files = await fs.readdir(folderPath);

    // Filter for image files (prefer .jpg, fallback to .webp, then .avif)
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
      .sort();

    // Group by base name (without extension)
    const imageGroups = new Map();

    for (const file of imageFiles) {
      const baseName = file.replace(/\.[^.]+$/, '');
      if (!imageGroups.has(baseName)) {
        imageGroups.set(baseName, []);
      }
      imageGroups.get(baseName).push(file);
    }

    // Build gallery items (prefer .jpg, then .webp, then .avif)
    const galleryItems = [];

    for (const [baseName, variants] of imageGroups.entries()) {
      // Find preferred format
      const jpg = variants.find(v => /\.(jpg|jpeg)$/i.test(v));
      const webp = variants.find(v => /\.webp$/i.test(v));
      const avif = variants.find(v => /\.avif$/i.test(v));

      const preferredFile = jpg || webp || avif || variants[0];
      const src = `/images/${folderName}/${preferredFile}`;
      const title = generateTitleFromFilename(preferredFile);
      const category = inferCategory(preferredFile, folderName);

      galleryItems.push({
        src,
        title,
        category,
      });
    }

    return galleryItems;
  } catch (error) {
    console.error(`Error scanning ${folderName}:`, error);
    return [];
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('📸 Building gallery datasets...\n');

  const photography = await buildGalleryDataset('photography');
  const design = await buildGalleryDataset('design');

  // Write JSON files
  const photographyPath = path.join(repoRoot, 'src', 'data', 'photography.json');
  const designPath = path.join(repoRoot, 'src', 'data', 'design.json');

  await fs.writeFile(photographyPath, JSON.stringify(photography, null, 2));
  await fs.writeFile(designPath, JSON.stringify(design, null, 2));

  console.log(`✅ Generated photography.json (${photography.length} items)`);
  console.log(`✅ Generated design.json (${design.length} items)`);
  console.log('\n💡 Tip: Use "node scripts/mcp-cli.js generate-titles" to enhance titles with AI-generated descriptions');
}

main().catch(console.error);

