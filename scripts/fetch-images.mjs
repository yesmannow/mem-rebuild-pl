import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'public/images/_src');
const META_DIR = path.join(ROOT, 'public/images/_meta');

await fs.mkdir(SRC_DIR, { recursive: true });
await fs.mkdir(META_DIR, { recursive: true });

const manifestPath = path.join(ROOT, 'images.manifest.json');
let manifest;

try {
  const manifestContent = await fs.readFile(manifestPath, 'utf8');
  manifest = JSON.parse(manifestContent);
} catch (error) {
  console.error('Error reading images.manifest.json:', error.message);
  process.exit(1);
}

async function fromOpenverse(query, n = 1) {
  const url = new URL('https://api.openverse.engineering/v1/images/');
  url.searchParams.set('q', query);
  url.searchParams.set('license_type', 'commercial');
  url.searchParams.set('page_size', String(Math.min(n, 5)));

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Openverse ${res.status}`);
    const data = await res.json();
    return data.results.slice(0, n).map(r => ({
      src: r.url,
      title: r.title,
      author: r.creator,
      license: r.license,
      license_url: r.license_url,
      source: r.foreign_landing_url,
    }));
  } catch (error) {
    console.error(`Error fetching from Openverse for "${query}":`, error.message);
    return [];
  }
}

async function download(url, outPath) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Download failed ${r.status}`);
    const buf = await r.arrayBuffer();
    await fs.writeFile(outPath, Buffer.from(buf));
  } catch (error) {
    console.error(`Error downloading ${url}:`, error.message);
    throw error;
  }
}

function safeName(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

async function handleEntry(dstDir, query, count, metaKey) {
  await fs.mkdir(dstDir, { recursive: true });
  const items = await fromOpenverse(query, count);

  if (items.length === 0) {
    console.warn(`No images found for query: "${query}"`);
    return [];
  }

  const meta = [];
  for (const item of items) {
    const fname = safeName(item.title || 'image') + '.jpg';
    const raw = path.join(SRC_DIR, fname);
    await download(item.src, raw);
    meta.push({ file: fname, ...item });
  }

  const metaPath = path.join(META_DIR, `${metaKey}.json`);
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));
  return items.map(i => i.title);
}

(async () => {
  console.log('Starting image fetch pipeline...\n');

  // Hero images
  if (manifest.hero && manifest.hero.length > 0) {
    for (const h of manifest.hero) {
      console.log(`Fetching hero images: ${h.query}`);
      const titles = await handleEntry(h.dest, h.query, h.count ?? 1, 'hero');
      console.log(`  ✓ Fetched: ${titles.join(', ')}\n`);
    }
  }

  // Work images
  if (manifest.work && manifest.work.length > 0) {
    for (const w of manifest.work) {
      const dest = path.join(ROOT, 'public/images/work', w.slug);
      console.log(`Fetching work images for ${w.slug}: ${w.query}`);
      const titles = await handleEntry(dest, w.query, w.count ?? 1, `work-${w.slug}`);
      console.log(`  ✓ Fetched: ${titles.join(', ')}\n`);
    }
  }

  // Bio uses local file only; no fetch needed
  if (manifest.bio) {
    console.log('Bio images: Using local files (no fetch needed)\n');
  }

  console.log('✓ Image fetch pipeline complete!');
  console.log(`\nRaw images saved to: ${SRC_DIR}`);
  console.log(`License metadata saved to: ${META_DIR}`);
})();

