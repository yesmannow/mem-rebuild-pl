#!/usr/bin/env node

/**
 * Image prevalidation utility.
 * - Scans provided directories (defaults: public/images, src/assets/images).
 * - Flags files larger than 5MB or dimensions exceeding 8000px.
 * - With --auto-resize, downsizes offenders to max 4000px (longest edge) after creating .bak backup.
 *
 * Usage:
 *   node scripts/ensure-images.js
 *   node scripts/ensure-images.js --dir public/hero --dir assets/banners
 *   node scripts/ensure-images.js --auto-resize
 */

import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';
import sharp from 'sharp';
import pLimit from 'p-limit';

const DEFAULT_DIRECTORIES = ['public/images', 'src/assets/images'];
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.tiff', '.bmp', '.heic']);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_DIMENSION = 8000;
const RESIZE_TARGET = 4000;
const CONCURRENCY_LIMIT = 4;

function logInfo(message, data) {
  console.log(`[image-prevalidate] ${message}`, data ?? '');
}

function logWarn(message, data) {
  console.warn(`[image-prevalidate] ${message}`, data ?? '');
}

function logError(message, data) {
  console.error(`[image-prevalidate] ${message}`, data ?? '');
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const directories = [];
  let autoResize = false;

  for (let i = 0; i < args.length; i++) {
    const token = args[i];
    if (token === '--auto-resize') {
      autoResize = true;
      continue;
    }
    if (token === '--dir' || token === '--dirs') {
      const next = args[++i];
      if (!next) {
        throw new Error(`Expected value after ${token}`);
      }
      directories.push(...next.split(',').map((entry) => entry.trim()).filter(Boolean));
      continue;
    }
    if (token.startsWith('--dir=')) {
      const [, value] = token.split('=');
      directories.push(value);
      continue;
    }
    if (token.startsWith('--dirs=')) {
      const [, value] = token.split('=');
      directories.push(...value.split(',').map((entry) => entry.trim()).filter(Boolean));
      continue;
    }
    logWarn(`Unknown argument ignored: ${token}`);
  }

  const resolvedDirs = (directories.length > 0 ? directories : DEFAULT_DIRECTORIES)
    .map((dir) => path.resolve(process.cwd(), dir));

  return {
    directories: [...new Set(resolvedDirs)],
    autoResize
  };
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectImageFiles(startPaths) {
  const files = [];

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (error) {
      logWarn(`Unable to read directory ${dir}`, error.message);
      return;
    }

    await Promise.all(entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        return;
      }
      if (!entry.isFile()) {
        return;
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        files.push(fullPath);
      }
    }));
  }

  for (const startPath of startPaths) {
    if (!(await pathExists(startPath))) {
      logWarn(`Skipping missing directory: ${startPath}`);
      continue;
    }
    await walk(startPath);
  }

  return files;
}

function formatBytes(bytes) {
  const thresholds = [
    { unit: 'GB', size: 1024 ** 3 },
    { unit: 'MB', size: 1024 ** 2 },
    { unit: 'KB', size: 1024 }
  ];
  for (const { unit, size } of thresholds) {
    if (bytes >= size) {
      return `${(bytes / size).toFixed(2)} ${unit}`;
    }
  }
  return `${bytes} B`;
}

async function analyzeFiles(filePaths) {
  const limit = pLimit(CONCURRENCY_LIMIT);
  const offenders = [];

  await Promise.all(
    filePaths.map((filePath) =>
      limit(async () => {
        let stats;
        try {
          stats = await fs.stat(filePath);
        } catch (error) {
          logWarn(`Unable to stat file ${filePath}`, error.message);
          return;
        }
        if (!stats.isFile()) {
          return;
        }

        const reasons = [];

        if (stats.size > MAX_SIZE_BYTES) {
          reasons.push(`size ${formatBytes(stats.size)}`);
        }

        let metadata = null;
        try {
          metadata = await sharp(filePath).metadata();
        } catch (error) {
          logWarn(`Unable to read metadata for ${filePath}`, error.message);
        }

        if (metadata && (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION)) {
          reasons.push(`dimensions ${metadata.width ?? '?'}x${metadata.height ?? '?'}`);
        }

        if (reasons.length > 0) {
          offenders.push({
            filePath,
            stats,
            metadata,
            reasons
          });
        }
      })
    )
  );

  return offenders;
}

async function ensureBackup(filePath) {
  const backupPath = `${filePath}.bak`;
  if (await pathExists(backupPath)) {
    logWarn(`Backup already exists for ${filePath}, skipping new backup creation.`);
    return backupPath;
  }
  await fs.copyFile(filePath, backupPath);
  return backupPath;
}

async function resizeOffender(offender) {
  const { filePath, metadata } = offender;
  const transformer = sharp(filePath);

  const resizeOptions = {
    fit: 'inside',
    withoutEnlargement: true
  };

  if (metadata?.width && metadata?.height) {
    if (metadata.width >= metadata.height) {
      resizeOptions.width = RESIZE_TARGET;
    } else {
      resizeOptions.height = RESIZE_TARGET;
    }
  } else {
    resizeOptions.width = RESIZE_TARGET;
    resizeOptions.height = RESIZE_TARGET;
  }

  const buffer = await transformer.resize(resizeOptions).toBuffer();
  await fs.writeFile(filePath, buffer);
}

async function main() {
  const { directories, autoResize } = parseArgs(process.argv);

  if (directories.length === 0) {
    logWarn('No directories provided or found. Nothing to validate.');
    return;
  }

  logInfo('Scanning directories', directories);
  const files = await collectImageFiles(directories);

  if (files.length === 0) {
    logInfo('No images found to validate.');
    return;
  }

  logInfo(`Inspecting ${files.length} image(s) with concurrency ${CONCURRENCY_LIMIT}.`);
  const offenders = await analyzeFiles(files);

  if (offenders.length === 0) {
    logInfo('All images are within size and dimension limits.');
    return;
  }

  logWarn(`Detected ${offenders.length} oversized image(s).`);
  offenders.forEach((offender) => {
    logWarn(offender.filePath, offender.reasons.join(', '));
  });

  if (!autoResize) {
    logError('Run with --auto-resize to downscale offenders automatically.');
    process.exitCode = 1;
    return;
  }

  logInfo('Attempting auto-resize for offending images (backups will be created with .bak extension).');
  const limit = pLimit(CONCURRENCY_LIMIT);
  await Promise.all(
    offenders.map((offender) =>
      limit(async () => {
        try {
          const backupPath = await ensureBackup(offender.filePath);
          await resizeOffender(offender);
          logInfo(`Resized ${offender.filePath} (backup: ${backupPath})`);
        } catch (error) {
          logError(`Failed to resize ${offender.filePath}`, error.message);
          throw error;
        }
      })
    )
  );

  logInfo('Auto-resize completed successfully.');
}

main().catch((error) => {
  logError('Unexpected failure', error);
  process.exitCode = 1;
});
