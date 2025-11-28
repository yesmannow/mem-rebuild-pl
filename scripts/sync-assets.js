import { readdir, writeFile } from 'fs/promises';
import path from 'path';

const IMAGE_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif']);

const TARGET_DIRECTORIES = [
  path.resolve('public/images/photography'),
  path.resolve('public/images/design'),
];

async function syncDirectory(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });

  const images = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  const manifestPath = path.join(dirPath, 'manifest.json');
  await writeFile(manifestPath, JSON.stringify(images, null, 2));

  console.log(`✅ Synced ${images.length} images to ${manifestPath}`);
}

async function main() {
  for (const dir of TARGET_DIRECTORIES) {
    await syncDirectory(dir);
  }
}

main().catch((error) => {
  console.error('❌ Failed to sync assets:', error);
  process.exitCode = 1;
});
