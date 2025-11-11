#!/usr/bin/env node

/**
 * Lightweight accessibility smoke test that focuses on the `aria-valid-attr-value` rule.
 *
 * Usage:
 *   node scripts/a11y-smoke.js --url https://localhost:4173/
 *   node scripts/a11y-smoke.js --file dist/index.html --file dist/preview.html
 */

import process from 'process';
import path from 'path';
import { promises as fs } from 'fs';
import { createRequire } from 'module';
import puppeteer from 'puppeteer';

const require = createRequire(import.meta.url);

function parseArgs(argv) {
  const args = argv.slice(2);
  const urls = [];
  const files = [];

  for (let i = 0; i < args.length; i++) {
    const token = args[i];
    if (token === '--url') {
      const value = args[++i];
      if (!value) throw new Error('Expected value after --url');
      urls.push(value);
      continue;
    }
    if (token.startsWith('--url=')) {
      urls.push(token.split('=').slice(1).join('='));
      continue;
    }
    if (token === '--file') {
      const value = args[++i];
      if (!value) throw new Error('Expected value after --file');
      files.push(value);
      continue;
    }
    if (token.startsWith('--file=')) {
      files.push(token.split('=').slice(1).join('='));
      continue;
    }
    console.warn(`[a11y-smoke] Unknown argument ignored: ${token}`);
  }

  return { urls, files };
}

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function deriveDefaultTargets() {
  const distIndex = path.resolve(process.cwd(), 'dist', 'index.html');
  if (await pathExists(distIndex)) {
    return [`file://${distIndex}`];
  }
  console.warn('[a11y-smoke] dist/index.html not found; defaulting to http://localhost:4173/');
  return ['http://localhost:4173/'];
}

function createTargetList(parsed) {
  const fileUrls = parsed.files.map((filePath) => {
    const absolutePath = path.resolve(process.cwd(), filePath);
    return `file://${absolutePath}`;
  });
  return [...parsed.urls, ...fileUrls];
}

async function run() {
  const parsed = parseArgs(process.argv);
  let targets = createTargetList(parsed);

  if (targets.length === 0) {
    targets = await deriveDefaultTargets();
  }

  // Load axe-core source file from node_modules
  let axeSource;
  try {
    const axeCorePath = require.resolve('axe-core/axe.min.js');
    axeSource = await fs.readFile(axeCorePath, 'utf-8');
  } catch (error) {
    // Fallback to non-minified version if minified is not available
    try {
      const axeCorePath = require.resolve('axe-core/axe.js');
      axeSource = await fs.readFile(axeCorePath, 'utf-8');
    } catch (fallbackError) {
      throw new Error(`Unable to load axe-core source for injection: ${error.message}. Fallback also failed: ${fallbackError.message}`);
    }
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const violationsAccumulator = [];

  for (const target of targets) {
    console.log(`[a11y-smoke] Checking ${target}`);
    try {
      await page.goto(target, { waitUntil: 'networkidle2', timeout: 60000 });
      await page.addScriptTag({ content: axeSource });

      const results = await page.evaluate(async () => {
        return await window.axe.run(document, {
          runOnly: {
            type: 'rule',
            values: ['aria-valid-attr-value']
          }
        });
      });

      const violations = results.violations.filter((violation) => violation.id === 'aria-valid-attr-value');
      if (violations.length > 0) {
        console.error(`[a11y-smoke] Violations found on ${target}`);
        violationsAccumulator.push({ target, violations });
      } else {
        console.log(`[a11y-smoke] PASS aria-valid-attr-value (${target})`);
      }
    } catch (error) {
      console.error(`[a11y-smoke] Error evaluating ${target}`, error.message);
      violationsAccumulator.push({ target, error: error.message });
    }
  }

  await browser.close();

  if (violationsAccumulator.length > 0) {
    console.error('[a11y-smoke] aria-valid-attr-value violations detected:');
    for (const entry of violationsAccumulator) {
      console.error(`- Target: ${entry.target}`);
      if (entry.violations) {
        entry.violations.forEach((violation) => {
          violation.nodes.forEach((node) => {
            console.error(`  Selector: ${node.target.join(' ')}`);
            console.error(`  HTML: ${node.html}`);
            console.error(`  Failure Summary: ${node.failureSummary}`);
          });
        });
      } else if (entry.error) {
        console.error(`  Error: ${entry.error}`);
      }
    }
    process.exitCode = 1;
    return;
  }

  console.log('[a11y-smoke] All targets passed aria-valid-attr-value.');
}

run().catch((error) => {
  console.error('[a11y-smoke] Unexpected error', error);
  process.exitCode = 1;
});

