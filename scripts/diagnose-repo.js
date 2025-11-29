import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'repo-status.txt');
const IGNORED_NAMES = new Set(['node_modules', '.git', '.DS_Store']);
const ARCHIVE_PATTERN = /(^|\/)_?archive[^/]*(\/|$)/i;

const buckets = {
  src: [],
  public: [],
  archived: [],
};

const normalizePath = (targetPath, isDirectory) => {
  const normalized = targetPath.split(path.sep).join('/');
  return isDirectory ? `${normalized}/` : normalized;
};

const walkDir = async (absoluteDir, bucketKey) => {
  const entries = await fs.readdir(absoluteDir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_NAMES.has(entry.name)) continue;

    const absolutePath = path.join(absoluteDir, entry.name);
    const relativePath = path.relative(ROOT_DIR, absolutePath);
    const isDirectory = entry.isDirectory();
    const normalizedPath = normalizePath(relativePath, isDirectory);
    const isArchived = ARCHIVE_PATTERN.test(normalizedPath);
    const targetBucket = isArchived ? 'archived' : bucketKey;

    buckets[targetBucket].push(normalizedPath);

    if (isDirectory) {
      await walkDir(absolutePath, bucketKey);
    }
  }
};

const scanIfExists = async (relativeDir, bucketKey) => {
  const absoluteDir = path.join(ROOT_DIR, relativeDir);

  try {
    const stats = await fs.stat(absoluteDir);
    if (!stats.isDirectory()) return;
  } catch {
    return;
  }

  await walkDir(absoluteDir, bucketKey);
};

const writeReport = async () => {
  const sections = [
    { title: '=== SRC STRUCTURE ===', data: buckets.src },
    { title: '=== PUBLIC ASSETS ===', data: buckets.public },
    { title: '=== ARCHIVED FILES ===', data: buckets.archived },
  ];

  const content = sections
    .map(({ title, data }) => {
      const body = data.length ? data.slice().sort().join('\n') : '(none found)';
      return `${title}\n${body}`;
    })
    .join('\n\n');

  await fs.writeFile(OUTPUT_FILE, `${content}\n`, 'utf8');
};

const main = async () => {
  await scanIfExists('src', 'src');
  await scanIfExists('public', 'public');
  await writeReport();
  console.log('Diagnostic complete. Check repo-status.txt');
};

main().catch((error) => {
  console.error('Failed to generate repo status:', error);
  process.exitCode = 1;
});
