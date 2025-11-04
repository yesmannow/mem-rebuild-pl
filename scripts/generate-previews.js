/**
 * Generate visual previews: color swatches and image grids
 * Uses Jimp to build thumbnail grids + color swatch bars
 */
import fs from "fs";
import path from "path";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Jimp = require('jimp');
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.resolve(__dirname, "../public/images/projects");
const moodboardDir = path.resolve(__dirname, "../public/moodboards");
const previewDir = path.join(moodboardDir, "previews");

// Ensure preview directory exists
if (!fs.existsSync(previewDir)) {
  fs.mkdirSync(previewDir, { recursive: true });
}

/**
 * Create a color swatch bar from an array of hex colors
 */
async function createSwatch(colors, outPath) {
  try {
    const swatchWidth = 800;
    const swatchHeight = 120;
    const img = await Jimp.create(swatchWidth, swatchHeight, '#000000');
    
    const segmentWidth = Math.floor(swatchWidth / colors.length);
    
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      const startX = i * segmentWidth;
      const endX = i === colors.length - 1 ? swatchWidth : (i + 1) * segmentWidth;
      
      try {
        const hexColor = Jimp.cssColorToHex(color);
        
        // Fill the segment with the color
        img.scan(startX, 0, endX - startX, swatchHeight, function (x, y, idx) {
          this.bitmap.data[idx + 0] = (hexColor >> 16) & 255; // Red
          this.bitmap.data[idx + 1] = (hexColor >> 8) & 255;  // Green
          this.bitmap.data[idx + 2] = hexColor & 255;         // Blue
          this.bitmap.data[idx + 3] = 255;                    // Alpha
        });
      } catch (colorError) {
        console.warn(`⚠️  Invalid color ${color}, using fallback`);
        // Use a fallback gray color
        img.scan(startX, 0, endX - startX, swatchHeight, function (x, y, idx) {
          this.bitmap.data[idx + 0] = 128; // Gray
          this.bitmap.data[idx + 1] = 128;
          this.bitmap.data[idx + 2] = 128;
          this.bitmap.data[idx + 3] = 255;
        });
      }
    }
    
    await img.writeAsync(outPath);
    console.log(`🎨 Created color swatch: ${path.basename(outPath)}`);
    
  } catch (error) {
    console.error(`❌ Error creating swatch for ${outPath}:`, error.message);
  }
}

/**
 * Create a 2x2 grid of project images
 */
async function createGrid(projectFolder, outPath) {
  try {
    const files = fs.readdirSync(projectFolder)
      .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
      .slice(0, 4); // Take first 4 images
    
    if (files.length === 0) {
      console.warn(`⚠️  No images found for grid in ${projectFolder}`);
      return;
    }
    
    const gridSize = 800;
    const cellSize = gridSize / 2;
    const grid = await Jimp.create(gridSize, gridSize, '#000000');
    
    // Load and process images
    const imagePromises = files.map(async (file, index) => {
      try {
        const imagePath = path.join(projectFolder, file);
        const img = await Jimp.read(imagePath);
        
        // Resize to fit cell and cover the area
        img.cover(cellSize, cellSize);
        
        // Calculate position in 2x2 grid
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = col * cellSize;
        const y = row * cellSize;
        
        return { img, x, y };
      } catch (error) {
        console.warn(`⚠️  Could not load image ${file}:`, error.message);
        return null;
      }
    });
    
    const processedImages = (await Promise.all(imagePromises)).filter(Boolean);
    
    // Composite images onto grid
    processedImages.forEach(({ img, x, y }) => {
      grid.composite(img, x, y);
    });
    
    // If we have fewer than 4 images, fill remaining cells with a subtle pattern
    if (processedImages.length < 4) {
      for (let i = processedImages.length; i < 4; i++) {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col * cellSize;
        const y = row * cellSize;
        
        // Create a subtle gradient fill
        const placeholder = new Jimp(cellSize, cellSize, '#1a1a1a');
        grid.composite(placeholder, x, y);
      }
    }
    
    await grid.writeAsync(outPath);
    console.log(`🖼️  Created image grid: ${path.basename(outPath)}`);
    
  } catch (error) {
    console.error(`❌ Error creating grid for ${outPath}:`, error.message);
  }
}

/**
 * Generate previews for all projects
 */
async function generatePreviews() {
  console.log('🖼️  Starting preview generation...');
  
  if (!fs.existsSync(projectsDir)) {
    console.error(`❌ Projects directory not found: ${projectsDir}`);
    return;
  }
  
  const projects = fs.readdirSync(projectsDir).filter(item => {
    const itemPath = path.join(projectsDir, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  console.log(`📁 Found ${projects.length} project folders`);
  
  for (const slug of projects) {
    const moodboardPath = path.join(moodboardDir, `${slug}.json`);
    
    if (!fs.existsSync(moodboardPath)) {
      console.warn(`⚠️  No moodboard data found for ${slug}, skipping`);
      continue;
    }
    
    try {
      const data = JSON.parse(fs.readFileSync(moodboardPath, "utf8"));
      
      // Generate color swatch
      if (data.dominantColors && data.dominantColors.length > 0) {
        const swatchPath = path.join(previewDir, `${slug}-swatches.jpg`);
        await createSwatch(data.dominantColors, swatchPath);
      }
      
      // Generate image grid
      const projectFolder = path.join(projectsDir, slug);
      const gridPath = path.join(previewDir, `${slug}-grid.jpg`);
      await createGrid(projectFolder, gridPath);
      
      console.log(`✅ Generated previews for ${slug}`);
      
    } catch (error) {
      console.error(`❌ Error processing ${slug}:`, error.message);
    }
  }
  
  console.log('🎉 Preview generation complete!');
}

// Run the script
generatePreviews().catch(console.error);
