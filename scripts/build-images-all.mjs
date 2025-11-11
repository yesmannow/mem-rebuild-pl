import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ROOT = 'public';
const OUT = 'src/data/images.manifest.json';

const exts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg']);
const manifest = {};

async function walk(dir) {
  const ents = await fs.readdir(dir, { withFileTypes: true });

  for (const e of ents) {
    const p = path.join(dir, e.name);

    if (e.isDirectory()) {
      await walk(p);
      continue;
    }

    const ext = path.extname(e.name).toLowerCase();
    if (!exts.has(ext)) continue;

    const rel = p.replace(/^public[\\/]/, '').replaceAll('\\', '/');
    const key = rel;

    let meta = {
      path: '/' + rel,
      width: null,
      height: null,
      color: null,
      webp: null,
      avif: null,
      blur: null
    };

    try {
      if (ext !== '.svg') {
        const img = sharp(p);
        const { width, height } = await img.metadata();
        meta.width = width;
        meta.height = height;

        // Dominant color (fast approx)
        const { dominant } = await img.stats();
        if (dominant) {
          meta.color = `rgb(${dominant.r} ${dominant.g} ${dominant.b} / 0.35)`;
        }

        // Generate webp/avif + blur
        const base = p.slice(0, -ext.length);
        await sharp(p).webp({ quality: 82 }).toFile(base + '.webp');
        await sharp(p).avif({ quality: 62 }).toFile(base + '.avif');
        meta.webp = '/' + rel.replace(ext, '.webp');
        meta.avif = '/' + rel.replace(ext, '.avif');

        const b64 = await img.resize(24).blur(6).toBuffer();
        const mimeType = ext.slice(1) === 'jpg' ? 'jpeg' : ext.slice(1);
        meta.blur = `data:image/${mimeType};base64,${b64.toString('base64')}`;
      }
    } catch (err) {
      // Non-fatal - continue
      console.warn(`⚠️  Skipping ${rel}:`, err.message);
    }

    manifest[key] = meta;
  }
}

await walk(ROOT);
await fs.mkdir('src/data', { recursive: true });
await fs.writeFile(OUT, JSON.stringify(manifest, null, 2));
console.log(`✅ wrote ${OUT} with ${Object.keys(manifest).length} items`);

