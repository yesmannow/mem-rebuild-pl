import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

function existsWebp(candidatePath, fileDir) {
  if (/^https?:\/\//i.test(candidatePath) || candidatePath.startsWith('data:')) return false;
  const isAbsolute = candidatePath.startsWith('/');
  const webpRel = candidatePath.replace(/\.(jpg|jpeg)$/i, '.webp');
  const abs1 = isAbsolute
    ? path.join(ROOT, 'public', webpRel.replace(/^\//, ''))
    : path.resolve(fileDir, webpRel);
  if (fs.existsSync(abs1)) return { rel: webpRel };
  const abs2 = path.join(ROOT, webpRel);
  if (fs.existsSync(abs2)) return { rel: webpRel };
  return null;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-n');
  const include = [
    'src/**/*.{ts,tsx,js,jsx,css,html,md,mdx,json,mjs,cjs}',
    'public/**/*.{html,json,js,css,md}',
    'content/**/*.{md,mdx,json}',
    'mcp/**/*.{py,json,js,md,html}',
    'pages/**/*.{ts,tsx,js,jsx}',
    'tests/**/*.{js,ts,mjs}',
    'test/**/*.{js,ts,mjs}'
  ];
  const exclude = [
    '**/node_modules/**',
    '**/.git/**',
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/.vercel/**',
    '**/storybook-static/**',
    '**/coverage/**',
    '**/types/**',
    '**/*.map'
  ];

  const files = await fg(include, { cwd: ROOT, ignore: exclude, dot: true, absolute: true });
  let totalFiles = 0;
  let totalReplacements = 0;

  const pattern = /(["'`])([^"'`]*?\.(?:jpg|jpeg))(\?[^"'`\s]*)?\1/gi;

  for (const file of files) {
    try {
      const text = fs.readFileSync(file, 'utf8');
      let changed = false;
      let replacements = 0;
      const dir = path.dirname(file);

      const newText = text.replace(pattern, (full, quote, pth, query) => {
        const hit = existsWebp(pth, dir);
        if (hit) {
          changed = true;
          replacements += 1;
          totalReplacements += 1;
          return `${quote}${hit.rel}${query || ''}${quote}`;
        }
        return full;
      });

      if (changed) {
        totalFiles += 1;
        if (dryRun) {
          console.log(`[DRY] ${path.relative(ROOT, file)}: ${replacements} replacements`);
        } else {
          fs.writeFileSync(file, newText, 'utf8');
          console.log(`[WRITE] ${path.relative(ROOT, file)}: ${replacements} replacements`);
        }
      }
    } catch {}
  }

  console.log(`\nSummary: ${totalReplacements} replacements across ${totalFiles} files`);
}

main().catch(err => {
  console.error('❌ replace-image-refs failed:', err?.message || err);
  process.exit(1);
});
