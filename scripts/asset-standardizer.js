import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ImageProvider } from './api-services/image-provider.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(ROOT, '.env.local') });
dotenv.config();

const config = {
  pexelsApiKey: process.env.PEXELS_API_KEY || process.env.VITE_PEXELS_API_KEY,
};

const provider = new ImageProvider(config);

const TARGET_DIMENSIONS = { width: 800, height: 1000 };
const LOW_RES_THRESHOLD = { width: 700, height: 875 };

async function optimizeProjectAssets(dir) {
  const report = { optimized: 0, sourced: 0, lowResReplaced: 0, missing: 0 };
  try {
    const folders = await fs.readdir(dir);

    for (const folder of folders) {
      const folderPath = path.join(dir, folder);
      const stat = await fs.stat(folderPath);

      if (!stat.isDirectory()) continue;

      const heroPath = path.join(folderPath, 'hero.webp');
      const optimizedHeroPath = path.join(folderPath, 'hero_optimized.webp');
      const fallbackJpgPath = path.join(folderPath, 'hero.jpg');
      const fallbackPngPath = path.join(folderPath, 'hero.png');

      let sourcePath = null;

      if (await fileExists(optimizedHeroPath)) {
        sourcePath = optimizedHeroPath;
      } else if (await fileExists(heroPath)) {
        sourcePath = heroPath;
      } else if (await fileExists(fallbackJpgPath)) {
        sourcePath = fallbackJpgPath;
      } else if (await fileExists(fallbackPngPath)) {
        sourcePath = fallbackPngPath;
      }

      const hasAnyAsset = await folderHasAssets(folderPath);
      const imageIsLowRes = sourcePath ? await isLowResImage(sourcePath) : false;

      if (sourcePath && !imageIsLowRes) {
        if (sourcePath === optimizedHeroPath) {
          console.log(`[OK] ${folder} already has a valid hero_optimized.webp`);
        } else {
          console.log(`[OPTIMIZE] Optimizing existing hero image for ${folder}...`);
          await optimizeImage(sourcePath, folderPath);
        }
        report.optimized += 1;
      } else {
        if (sourcePath && imageIsLowRes) {
          console.log(`[LOW_RES] ${folder} source is under threshold. Re-sourcing from Pexels...`);
          report.lowResReplaced += 1;
        } else {
          console.log(`[MISSING] hero.webp missing for ${folder}. Sourcing from Pexels...`);
          report.missing += 1;
        }
        const sourced = await sourceFromPexels(folder, folderPath);
        if (!sourced && !hasAnyAsset) {
          console.log(`  ⚠️ ${folder} is still empty. Please review manually.`);
        }
        if (sourced) {
          report.sourced += 1;
        }
      }
    }

    console.log('\n=== Asset Intelligence Report ===');
    console.log(report);
  } catch (error) {
    console.error('Error optimizing project assets:', error);
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function optimizeImage(inputPath, outputDir) {
  try {
    const optimizedOutput = path.join(outputDir, 'hero_optimized.webp');
    const optimizedTempOutput = path.join(outputDir, `hero_optimized_${Date.now()}.tmp.webp`);

    await sharp(inputPath)
      .resize(TARGET_DIMENSIONS.width, TARGET_DIMENSIONS.height, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(optimizedTempOutput);

    if (await fileExists(optimizedOutput)) {
      await fs.unlink(optimizedOutput);
    }
    await fs.rename(optimizedTempOutput, optimizedOutput);

    console.log(`  ✅ Optimized saved to ${optimizedOutput}`);
  } catch (error) {
    console.error(`  ❌ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function isLowResImage(inputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    return (
      !metadata.width ||
      !metadata.height ||
      metadata.width < LOW_RES_THRESHOLD.width ||
      metadata.height < LOW_RES_THRESHOLD.height
    );
  } catch {
    return true;
  }
}

async function folderHasAssets(folderPath) {
  try {
    const contents = await fs.readdir(folderPath);
    return contents.length > 0;
  } catch {
    return false;
  }
}

async function sourceFromPexels(projectName, folderPath) {
  try {
    const query = `${projectName} cinematic dark minimalist`;

    const results = await provider.searchImages(query, {
      perPage: 1,
      orientation: 'portrait',
      provider: 'pexels'
    });

    if (results && results.length > 0) {
      const img = results[0];
      console.log(`  🔍 Found match on Pexels: ${img.description || 'Untitled'}`);

      // Download to temp file
      const tempFilename = `temp_${Date.now()}.jpg`;
      const result = await provider.downloadImage(img.urls.regular, folderPath, tempFilename);

      if (result) {
        const tempPath = result.path;

        console.log(`  [OPTIMIZE] Optimizing downloaded asset...`);
        await optimizeImage(tempPath, folderPath);

        // Save the raw file for traceability without overwriting legacy hero.webp files.
        await fs.rename(tempPath, path.join(folderPath, 'hero_source.jpg'));
        console.log(`  ✅ Asset pipeline complete for ${projectName}`);
        return true;
      }
    } else {
      console.log(`  ⚠️ No suitable match found on Pexels for "${query}"`);
    }
  } catch (error) {
    console.error(`  ❌ Failed to source from Pexels for ${projectName}:`, error.message);
  }
  return false;
}

const targetDirs = [
  path.join(ROOT, 'public/images/projects'),
  path.join(ROOT, 'public/gallery'),
];

for (const targetDir of targetDirs) {
  if (await fileExists(targetDir)) {
    console.log(`\nStarting autonomous asset intelligence for: ${targetDir}`);
    await optimizeProjectAssets(targetDir);
  }
}
