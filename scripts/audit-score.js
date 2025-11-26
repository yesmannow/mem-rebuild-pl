#!/usr/bin/env node
/**
 * System Diagnostic - Portfolio Health Score
 * Pillars:
 *  - Lighthouse (Perf/Accessibility/Best Practices/SEO)
 *  - Pa11y (Accessibility errors)
 *  - Content Integrity (data completeness + image path validity)
 */
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import * as lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import pa11y from 'pa11y';
import chalk from 'chalk';
import fg from 'fast-glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(repoRoot, 'reports');
const TARGET_URL = 'http://localhost:5173';

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const asciiHeader = `
  ____  __  _____ _______ __  __     ____  ____
 / ___|/ /_| ____|__   __|  \\/  |   / ___||  _ \\
| |   | '_ \\  _|    | |  | |\\/| |___\\___ \\| | | |
| |___| (_) | |___  | |  | |  | |___) |__) | |_| |
 \\____|\\___/|_____| |_|  |_|  |_|____/____/|____/
`;

const log = (msg) => console.log(msg);

const waitForServer = async (url, retries = 20, delay = 500) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) return true;
    } catch {
      // ignore
    }
    await new Promise((r) => setTimeout(r, delay));
  }
  return false;
};

const startPreviewIfNeeded = async () => {
  const alive = await waitForServer(TARGET_URL, 2, 200);
  if (alive) return { proc: null };

  const args = ['run', 'preview', '--', '--port', '5173'];
  const proc = spawn(npmCmd, args, {
    cwd: repoRoot,
    stdio: 'ignore',
    shell: process.platform === 'win32',
  });

  const ok = await waitForServer(TARGET_URL, 30, 500);
  if (!ok) {
    proc.kill('SIGTERM');
    throw new Error('Preview server failed to start on port 5173');
  }
  return { proc };
};

const stopPreview = (proc) => {
  if (proc && !proc.killed) {
    proc.kill('SIGTERM');
  }
};

const runLighthouse = async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { logLevel: 'error', output: 'json', port: chrome.port };
  const runnerResult = await lighthouse(TARGET_URL, options);
  await chrome.kill();

  const cats = runnerResult.lhr.categories;
  const scores = {
    performance: Math.round((cats.performance?.score || 0) * 100),
    accessibility: Math.round((cats.accessibility?.score || 0) * 100),
    bestPractices: Math.round((cats['best-practices']?.score || 0) * 100),
    seo: Math.round((cats.seo?.score || 0) * 100),
  };
  scores.average = Math.round(
    (scores.performance + scores.accessibility + scores.bestPractices + scores.seo) / 4
  );
  return { scores, raw: runnerResult.lhr };
};

const runPa11y = async () => {
  const targets = [TARGET_URL, `${TARGET_URL}/case-studies`];
  let totalErrors = 0;
  for (const url of targets) {
    const result = await pa11y(url, { standard: 'WCAG2AA', runners: ['axe'] });
    const errs = result.issues.filter((i) => i.type === 'error').length;
    totalErrors += errs;
  }
  const score = Math.max(0, 100 - totalErrors * 10);
  return { totalErrors, score };
};

const runContentIntegrity = async () => {
  const dataFiles = await fg(['src/data/**/*.ts'], { cwd: repoRoot, absolute: true });
  const publicDir = path.join(repoRoot, 'public');
  let emptyFields = 0;
  let brokenImages = 0;

  for (const file of dataFiles) {
    const content = await fsPromises.readFile(file, 'utf8');
    const emptyMatches = content.match(/:\s*""/g) || [];
    emptyFields += emptyMatches.length;

    const imagePaths = content.match(/['"`](\/images\/[^'"`]+)['"`]/g) || [];
    for (const raw of imagePaths) {
      const clean = raw.slice(1, -1);
      const absPath = path.join(publicDir, clean.replace(/^\//, ''));
      if (!fs.existsSync(absPath)) {
        brokenImages += 1;
      }
    }
  }

  const score = Math.max(0, 100 - emptyFields * 2 - brokenImages * 10);
  return { emptyFields, brokenImages, score };
};

const grade = (val) => {
  if (val >= 90) return chalk.green(`✔ ${val}`);
  if (val >= 80) return chalk.yellow(`▲ ${val}`);
  return chalk.red(`✖ ${val}`);
};

const ensureReportsDir = async () => {
  await fsPromises.mkdir(REPORTS_DIR, { recursive: true });
};

const main = async () => {
  log(chalk.cyan(asciiHeader));
  log(chalk.bold('SYSTEM DIAGNOSTIC\n'));

  let previewProc = null;
  try {
    const preview = await startPreviewIfNeeded();
    previewProc = preview.proc;

    const [lh, pa, ci] = await Promise.all([runLighthouse(), runPa11y(), runContentIntegrity()]);

    const totalScore = Math.round(
      lh.scores.average * 0.5 + pa.score * 0.3 + ci.score * 0.2
    );

    log(`${chalk.white('Lighthouse Avg')}: ${grade(lh.scores.average)} `);
    log(
      `  • Perf ${lh.scores.performance} | A11y ${lh.scores.accessibility} | BP ${lh.scores.bestPractices} | SEO ${lh.scores.seo}`
    );
    log(`${chalk.white('Pa11y')}: ${grade(pa.score)} (errors: ${pa.totalErrors})`);
    log(
      `${chalk.white('Content Integrity')}: ${grade(ci.score)} (empty: ${ci.emptyFields}, broken images: ${ci.brokenImages})`
    );
    log(chalk.bold(`\nTOTAL SCORE: ${grade(totalScore)}`));

    await ensureReportsDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(REPORTS_DIR, `audit-${timestamp}.json`);
    await fsPromises.writeFile(
      reportPath,
      JSON.stringify(
        {
          totalScore,
          lighthouse: lh.scores,
          pa11y: { errors: pa.totalErrors, score: pa.score },
          contentIntegrity: ci,
          rawLighthouse: lh.raw,
        },
        null,
        2
      )
    );
    log(chalk.gray(`\nReport saved: ${path.relative(repoRoot, reportPath)}`));

    if (totalScore < 85) {
      log(chalk.red('\nQuality Gate failed (score < 85).'));
      process.exit(1);
    }
  } catch (err) {
    console.error(chalk.red(`\nAudit failed: ${err.message || err}`));
    process.exit(1);
  } finally {
    stopPreview(previewProc);
  }
};

main();
