#!/usr/bin/env node
/**
 * Analyze Image Organization
 * Identifies images that might need to be merged or moved to different locations
 *
 * Usage: node scripts/analyze-image-organization.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');
const imagesDir = path.join(publicDir, 'images');
const projectsDir = path.join(imagesDir, 'projects');
const sideProjectsDir = path.join(imagesDir, 'side-projects');

// Load unused assets report
function loadUnusedAssetsReport() {
  const reportPath = path.join(projectRoot, 'reports', 'unused-assets-report.json');
  if (!fs.existsSync(reportPath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  } catch (error) {
    return null;
  }
}

// Get all files in a directory recursively
function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Normalize filename for comparison (remove extensions, spaces, case)
function normalizeFilename(filename) {
  return filename
    .replace(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i, '')
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase();
}

// Extract project name from path
function extractProjectName(filePath) {
  const relative = path.relative(imagesDir, filePath);
  const parts = relative.split(path.sep);
  if (parts[0] === 'projects' && parts.length > 1) {
    return parts[1];
  }
  if (parts[0] === 'side-projects') {
    // Try to infer project from filename
    const filename = path.basename(filePath, path.extname(filePath));
    const projectMap = {
      'primarycare': 'Primarycare Indy',
      '317bbq': '317 bbq',
      '317-bbq': '317 bbq',
      'blackletter': 'Black Letter',
      'circlecitykicks': 'circle  city kicks',
      'urgentcare': 'urgent care indy',
      'graston': 'Graston Technique',
    };
    for (const [key, value] of Object.entries(projectMap)) {
      if (filename.toLowerCase().includes(key)) {
        return value;
      }
    }
  }
  return null;
}

// Find potential duplicates across projects and side-projects
function findPotentialDuplicates() {
  console.log('🔍 Analyzing image organization...\n');

  const projectsFiles = getAllFiles(projectsDir);
  const sideProjectsFiles = getAllFiles(sideProjectsDir);
  const allFiles = [...projectsFiles, ...sideProjectsFiles];

  const duplicates = [];
  const projectMismatches = [];
  const unusedInProjects = [];
  const unusedInSideProjects = [];

  const report = loadUnusedAssetsReport();
  const unusedPaths = new Set();
  if (report && report.unusedImages) {
    report.unusedImages.forEach(img => {
      unusedPaths.add(img.path.toLowerCase());
    });
  }

  // Group files by normalized name
  const fileGroups = new Map();

  allFiles.forEach(filePath => {
    const filename = path.basename(filePath);
    const normalized = normalizeFilename(filename);
    const relativePath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
    const isUnused = unusedPaths.has(relativePath.toLowerCase());

    if (!fileGroups.has(normalized)) {
      fileGroups.set(normalized, []);
    }

    fileGroups.get(normalized).push({
      path: filePath,
      relativePath,
      filename,
      isInProjects: filePath.includes('projects' + path.sep),
      isInSideProjects: filePath.includes('side-projects'),
      projectName: extractProjectName(filePath),
      isUnused,
    });
  });

  // Find duplicates
  fileGroups.forEach((files, normalized) => {
    if (files.length > 1) {
      const inProjects = files.filter(f => f.isInProjects);
      const inSideProjects = files.filter(f => f.isInSideProjects);

      if (inProjects.length > 0 && inSideProjects.length > 0) {
        duplicates.push({
          normalized,
          files,
          issue: 'Same image in both projects/ and side-projects/',
        });
      } else if (files.length > 1 && files.some(f => f.isUnused) && files.some(f => !f.isUnused)) {
        duplicates.push({
          normalized,
          files,
          issue: 'Multiple formats, some unused',
        });
      }
    }
  });

  // Find project name mismatches
  const projectNames = new Set();
  projectsFiles.forEach(filePath => {
    const projectName = extractProjectName(filePath);
    if (projectName) {
      projectNames.add(projectName);
    }
  });

  sideProjectsFiles.forEach(filePath => {
    const filename = path.basename(filePath, path.extname(filePath));
    const normalized = normalizeFilename(filename);
    const projectName = extractProjectName(filePath);

    // Check if this might belong to a project folder
    for (const projName of projectNames) {
      const projNormalized = normalizeFilename(projName);
      if (normalized.includes(projNormalized) || projNormalized.includes(normalized)) {
        const relativePath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
        const isUnused = unusedPaths.has(relativePath.toLowerCase());

        projectMismatches.push({
          file: filePath,
          relativePath,
          currentLocation: 'side-projects',
          suggestedLocation: `projects/${projName}`,
          projectName: projName,
          isUnused,
        });
      }
    }
  });

  // Find unused files in projects that might need to move
  projectsFiles.forEach(filePath => {
    const relativePath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
    if (unusedPaths.has(relativePath.toLowerCase())) {
      const projectName = extractProjectName(filePath);
      unusedInProjects.push({
        file: filePath,
        relativePath,
        projectName,
      });
    }
  });

  // Find unused files in side-projects
  sideProjectsFiles.forEach(filePath => {
    const relativePath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
    if (unusedPaths.has(relativePath.toLowerCase())) {
      unusedInSideProjects.push({
        file: filePath,
        relativePath,
      });
    }
  });

  return {
    duplicates,
    projectMismatches,
    unusedInProjects,
    unusedInSideProjects,
  };
}

// Print analysis results
function printAnalysis(results) {
  console.log('='.repeat(70));
  console.log('📊 Image Organization Analysis');
  console.log('='.repeat(70));

  // Duplicates
  if (results.duplicates.length > 0) {
    console.log('\n🔄 DUPLICATES FOUND (same image in multiple locations):');
    console.log('-'.repeat(70));
    results.duplicates.slice(0, 20).forEach(dup => {
      console.log(`\n  Normalized name: ${dup.normalized}`);
      console.log(`  Issue: ${dup.issue}`);
      dup.files.forEach(file => {
        const location = file.isInProjects ? 'projects/' : 'side-projects/';
        const status = file.isUnused ? '❌ UNUSED' : '✅ USED';
        console.log(`    ${status} ${location}${path.relative(publicDir, file.path).replace(/\\/g, '/')}`);
      });
    });
    if (results.duplicates.length > 20) {
      console.log(`\n  ... and ${results.duplicates.length - 20} more duplicates`);
    }
  }

  // Project mismatches
  if (results.projectMismatches.length > 0) {
    console.log('\n\n📍 POTENTIAL LOCATION MISMATCHES:');
    console.log('   (Files in side-projects that might belong in projects/)');
    console.log('-'.repeat(70));
    results.projectMismatches.slice(0, 15).forEach(mismatch => {
      const status = mismatch.isUnused ? '❌ UNUSED' : '⚠️  USED';
      console.log(`\n  ${status} ${path.relative(publicDir, mismatch.file).replace(/\\/g, '/')}`);
      console.log(`    Current: ${mismatch.currentLocation}`);
      console.log(`    Suggested: ${mismatch.suggestedLocation}`);
      console.log(`    Project: ${mismatch.projectName}`);
    });
    if (results.projectMismatches.length > 15) {
      console.log(`\n  ... and ${results.projectMismatches.length - 15} more mismatches`);
    }
  }

  // Summary
  console.log('\n\n' + '='.repeat(70));
  console.log('📈 SUMMARY');
  console.log('='.repeat(70));
  console.log(`\n  Duplicates found: ${results.duplicates.length}`);
  console.log(`  Location mismatches: ${results.projectMismatches.length}`);
  console.log(`  Unused in projects/: ${results.unusedInProjects.length}`);
  console.log(`  Unused in side-projects/: ${results.unusedInSideProjects.length}`);

  // Recommendations
  console.log('\n\n💡 RECOMMENDATIONS:');
  console.log('-'.repeat(70));

  if (results.duplicates.length > 0) {
    console.log('\n1. MERGE DUPLICATES:');
    console.log('   - Review duplicates and keep only the version that\'s actually used');
    console.log('   - If both are unused, keep the one in the correct location');
    console.log('   - Delete the duplicate');
  }

  if (results.projectMismatches.length > 0) {
    console.log('\n2. MOVE MISMATCHED FILES:');
    console.log('   - Files in side-projects/ that match project names should be moved to projects/');
    console.log('   - This will help organize assets by project');
  }

  if (results.unusedInProjects.length > 0 || results.unusedInSideProjects.length > 0) {
    console.log('\n3. CLEAN UP UNUSED:');
    console.log('   - Run: npm run cleanup:unused:dry');
    console.log('   - Review and delete unused files');
  }

  console.log('\n' + '='.repeat(70));
}

// Main execution
function main() {
  const results = findPotentialDuplicates();
  printAnalysis(results);
}

main();

