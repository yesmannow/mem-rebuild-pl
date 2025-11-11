import fs from 'fs/promises';
import path from 'path';

const ROOT = 'public';
const BAD = /[^a-z0-9\-_.]/g;
const SPACE = /\s+/g;

const toSlug = (f) => f.toLowerCase().replace(SPACE, '-').replace(BAD, '');

const redirects = [];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const e of entries) {
    const p = path.join(dir, e.name);

    if (e.isDirectory()) {
      await walk(p);
      continue;
    }

    const ext = path.extname(e.name);
    const base = path.basename(e.name, ext);
    const slug = toSlug(base) + ext.toLowerCase();

    if (slug !== e.name) {
      const np = path.join(dir, slug);
      await fs.rename(p, np);
      const from = '/' + p.replace(/^public[\\/]/, '').replaceAll('\\', '/');
      const to = '/' + np.replace(/^public[\\/]/, '').replaceAll('\\', '/');
      redirects.push({ from, to });
      console.log(`Renamed: ${e.name} → ${slug}`);
    }
  }
}

await walk(ROOT);
await fs.writeFile('public/redirects.json', JSON.stringify(redirects, null, 2));
console.log(`✅ Normalized filenames and wrote public/redirects.json (${redirects.length} redirects)`);

