#!/usr/bin/env node

/**
 * Vercel Deployment Audit Script
 * Comprehensive check for Vite + React Router application
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Starting Vercel Deployment Audit for Vite Application...\n');

let hasErrors = false;
let hasWarnings = false;

function runCommand(command, description, required = true) {
  console.log(`\n📋 ${description}...`);
  try {
    const output = execSync(command, { cwd: rootDir, encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ ${description} - PASSED`);
    if (output && output.length < 1000) {
      console.log(output);
    }
    return true;
  } catch (error) {
    if (required) {
      console.error(`❌ ${description} - FAILED`);
      console.error(error.stdout || error.stderr || error.message);
      hasErrors = true;
      return false;
    } else {
      console.warn(`⚠️  ${description} - WARNING`);
      console.warn(error.stdout || error.stderr || error.message);
      hasWarnings = true;
      return false;
    }
  }
}

function checkFile(filepath, description, required = true) {
  console.log(`\n📄 Checking ${description}...`);
  const fullPath = join(rootDir, filepath);
  if (existsSync(fullPath)) {
    console.log(`✅ ${description} - EXISTS`);
    return true;
  } else {
    if (required) {
      console.error(`❌ ${description} - MISSING: ${filepath}`);
      hasErrors = true;
    } else {
      console.warn(`⚠️  ${description} - NOT FOUND (optional): ${filepath}`);
      hasWarnings = true;
    }
    return false;
  }
}

function checkViteInvariants() {
  console.log('\n🔍 Checking Vite-specific invariants...');
  
  // Vite should exist
  if (!checkFile('vite.config.js', 'Vite config', true)) {
    return false;
  }
  
  // index.html should exist for Vite
  if (!checkFile('index.html', 'Vite index.html', true)) {
    return false;
  }
  
  // Check package.json for Vite dependency
  const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'));
  
  if (!packageJson.devDependencies?.vite && !packageJson.dependencies?.vite) {
    console.error('❌ Vite is not in dependencies');
    hasErrors = true;
    return false;
  }
  
  // Check react-router-dom for SPA routing
  if (!packageJson.dependencies?.['react-router-dom']) {
    console.error('❌ react-router-dom is not in dependencies');
    hasErrors = true;
    return false;
  }
  
  console.log('✅ Vite invariants check - PASSED');
  return true;
}

function checkVercelConfig() {
  console.log('\n🔍 Checking Vercel configuration...');
  
  if (!checkFile('vercel.json', 'Vercel config', false)) {
    console.log('ℹ️  No vercel.json found (Vercel will use auto-detection)');
    return true;
  }
  
  try {
    const vercelConfig = JSON.parse(readFileSync(join(rootDir, 'vercel.json'), 'utf8'));
    
    // Check framework setting
    if (vercelConfig.framework === null || vercelConfig.framework === undefined) {
      console.log('✅ Framework is null/undefined (SPA mode)');
    }
    
    // Check output directory
    if (vercelConfig.outputDirectory === 'dist') {
      console.log('✅ Output directory is set to dist (Vite default)');
    } else {
      console.warn(`⚠️  Output directory is ${vercelConfig.outputDirectory}, expected 'dist'`);
      hasWarnings = true;
    }
    
    // Check for SPA rewrites
    if (vercelConfig.rewrites) {
      const hasSPARewrite = vercelConfig.rewrites.some(r => r.destination === '/index.html');
      if (hasSPARewrite) {
        console.log('✅ SPA rewrite rule found');
      } else {
        console.warn('⚠️  No SPA rewrite rule found (may cause routing issues)');
        hasWarnings = true;
      }
    }
    
    console.log('✅ Vercel config check - PASSED');
    return true;
  } catch (error) {
    console.error('❌ Error reading vercel.json:', error.message);
    hasErrors = true;
    return false;
  }
}

function checkEnvironmentVariables() {
  console.log('\n🔍 Checking environment variable setup...');
  
  // Check for .env.example to document required variables
  const hasEnvExample = checkFile('.env.example', 'Environment variables documentation', false);
  
  if (!hasEnvExample) {
    console.warn('⚠️  No .env.example found. Consider documenting required environment variables.');
    hasWarnings = true;
  }
  
  console.log('ℹ️  Remember to set environment variables in Vercel dashboard');
  return true;
}

// Main audit execution
console.log('═══════════════════════════════════════════════════════════');
console.log('  VERCEL DEPLOYMENT BLOCKER AUDIT - VITE APPLICATION');
console.log('═══════════════════════════════════════════════════════════\n');

// 1. Check repository invariants
checkViteInvariants();

// 2. Check Vercel configuration
checkVercelConfig();

// 3. Run TypeScript check
runCommand('npm run typecheck', 'TypeScript type checking', true);

// 4. Run linting
runCommand('npm run lint', 'ESLint code quality check', false);

// 5. Run production build
console.log('\n🏗️  Running production build (this may take a while)...');
const buildSuccess = runCommand('npm run build', 'Production build', true);

// 6. Check build output
if (buildSuccess) {
  console.log('\n📦 Checking build output...');
  if (checkFile('dist/index.html', 'Build output index.html', true)) {
    console.log('✅ Build artifacts generated successfully');
  }
}

// 7. Check environment variables
checkEnvironmentVariables();

// Final summary
console.log('\n═══════════════════════════════════════════════════════════');
console.log('  AUDIT SUMMARY');
console.log('═══════════════════════════════════════════════════════════\n');

if (hasErrors) {
  console.error('❌ AUDIT FAILED - Deployment blockers found!');
  console.error('   Please fix the errors above before deploying to Vercel.\n');
  process.exit(1);
} else if (hasWarnings) {
  console.warn('⚠️  AUDIT PASSED WITH WARNINGS');
  console.warn('   Consider addressing the warnings for optimal deployment.\n');
  process.exit(0);
} else {
  console.log('✅ AUDIT PASSED - Ready for Vercel deployment!');
  console.log('   All checks completed successfully.\n');
  process.exit(0);
}
