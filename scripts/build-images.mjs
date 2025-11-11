import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const SRC_DIRS = ["public/images", "public/demos"];
const OUT = "src/data/images.manifest.json";
const BATCH_SIZE = 5; // Process 5 images in parallel
const MAX_RETRIES = 2; // Retry failed images up to 2 times

async function run() {
  const files = [];

  // Recursively get all image files
  async function getImageFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const imageFiles = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await getImageFiles(fullPath);
        imageFiles.push(...subFiles);
      } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
        // Store relative path from public/
        const relativePath = path.relative("public", fullPath).replace(/\\/g, '/');
        imageFiles.push(relativePath);
      }
    }

    return imageFiles;
  }

  // Collect files from all source directories
  for (const srcDir of SRC_DIRS) {
    try {
      const dirFiles = await getImageFiles(srcDir);
      files.push(...dirFiles);
    } catch (err) {
      console.warn(`⚠️  Could not read ${srcDir}:`, err);
    }
  }

  const out = {};
  let successCount = 0;
  let failCount = 0;

  console.log(`📸 Processing ${files.length} image(s) in batches of ${BATCH_SIZE}...`);

  // Process image with retry logic
  async function processImage(file, retries = MAX_RETRIES) {
    const abs = path.join("public", file);

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const img = sharp(abs);
        const { width, height } = await img.metadata();

        if (!width || !height) {
          throw new Error(`Could not read dimensions`);
        }

        // Generate webp/avif
        const base = file.replace(/\.(jpe?g|png)$/i, "");
        const basePath = path.join("public", base);

        await img.webp({ quality: 82 }).toFile(`${basePath}.webp`);
        await img.avif({ quality: 45 }).toFile(`${basePath}.avif`);

        // Tiny blur placeholder
        const blur = await img.resize(20).webp({ quality: 30 }).toBuffer();
        const blurDataURL = `data:image/webp;base64,${blur.toString("base64")}`;

        // Dominant color - use sharp's stats
        const stats = await img.stats();
        const dominant = stats.dominant;
        const color = dominant
          ? `rgb(${Math.round(dominant.r)} ${Math.round(dominant.g)} ${Math.round(dominant.b)})`
          : "#222";

        out[file] = {
          width,
          height,
          base: base.replace(/\\/g, '/'),
          color,
          blurDataURL
        };

        return { success: true, file };
      } catch (error) {
        if (attempt === retries) {
          return { success: false, file, error: error.message };
        }
        // Wait a bit before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, attempt)));
      }
    }
  }

  // Process images in batches
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(files.length / BATCH_SIZE);

    // Show progress
    if (i === 0 || i + BATCH_SIZE >= files.length || batchNum % 5 === 0) {
      console.log(`   Batch ${batchNum}/${totalBatches}: Processing ${i + 1}-${Math.min(i + BATCH_SIZE, files.length)}/${files.length}`);
    }

    // Process batch in parallel
    const results = await Promise.allSettled(
      batch.map(file => processImage(file))
    );

    // Count successes and failures
    for (const result of results) {
      if (result.status === 'fulfilled') {
        if (result.value.success) {
          successCount++;
        } else {
          failCount++;
          console.error(`❌ Failed to process ${result.value.file}: ${result.value.error}`);
        }
      } else {
        failCount++;
        console.error(`❌ Error processing image:`, result.reason);
      }
    }
  }

  // Ensure directory exists
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(out, null, 2));

  // Summary
  console.log(`\n✅ Image build complete: ${successCount}/${files.length} succeeded`);
  if (failCount > 0) {
    console.warn(`⚠️  ${failCount} image(s) failed to process`);
  }
  console.log(`📄 Wrote ${OUT} with ${Object.keys(out).length} image entries`);
}

run().catch(console.error);

