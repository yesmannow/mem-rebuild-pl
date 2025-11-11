#!/usr/bin/env node
/**
 * mcpctl.js
 *
 * A lightweight developer CLI to simplify common maintenance tasks in
 * the portfolio project. This script wraps frequent npm scripts and
 * provides a single entry point for cleaning, building and running
 * validation checks. Invoking `node cli/mcpctl.js --help` will
 * display available commands. Feel free to extend this CLI with
 * additional commands as your workflow evolves.
 */

import { spawn } from 'child_process';

const args = process.argv.slice(2);
const command = args[0];

function run(script, scriptArgs = []) {
  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const child = spawn(cmd, ['run', script, '--', ...scriptArgs], {
    stdio: 'inherit',
  });
  child.on('exit', code => {
    process.exit(code);
  });
}

function showHelp() {
  console.log(`\nUsage: mcpctl <command> [options]\n\nCommands:\n  build           Run a full production build (npm run build)\n  dev             Start the Vite dev server (npm run dev)\n  validate        Run all validation checks (npm run validate:all)\n  images          Run image prevalidation (npm run images:prevalidate)\n  images:auto     Auto-resize oversized images (npm run images:prevalidate:auto)\n  clean           Remove cached dist/types before a fresh build\n  help            Show this help message\n\nExamples:\n  node cli/mcpctl.js build\n  node cli/mcpctl.js images:auto\n`);
}

switch (command) {
  case 'build':
    run('build');
    break;
  case 'dev':
    run('dev');
    break;
  case 'validate':
    run('validate:all');
    break;
  case 'images':
    run('images:prevalidate');
    break;
  case 'images:auto':
    run('images:prevalidate:auto');
    break;
  case 'clean':
    run('clean:types');
    break;
  case 'help':
  default:
    showHelp();
    break;
}
