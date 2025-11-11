import fs from 'fs/promises';
import path from 'path';

const MAN = 'src/data/images.manifest.json';

const manifest = JSON.parse(await fs.readFile(MAN, 'utf8'));

const demos = [];
const gallery = [];

for (const [k, v] of Object.entries(manifest)) {
  if (k.startsWith('demos/')) {
    demos.push({
      slug: k.replace(/^demos\//, '').replace(/\..*$/, ''),
      title: path.basename(k).replace(/[-_]/g, ' ').replace(/\..*$/, ''),
      image: k,
      meta: v
    });
  }

  if (k.startsWith('images/') && /\.(jpg|jpeg|png|webp)$/i.test(k)) {
    gallery.push({ file: k, meta: v });
  }
}

await fs.writeFile('src/data/demos.json', JSON.stringify(demos, null, 2));
await fs.writeFile('src/data/gallery.json', JSON.stringify(gallery, null, 2));
console.log(`✅ datasets: demos.json (${demos.length} items), gallery.json (${gallery.length} items)`);

