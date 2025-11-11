/**
 * Cleanup Automation Script
 *
 * Provides reusable functions for cleaning up the codebase:
 * - Delete legacy/test files
 * - Validate imports
 * - Check folder structure
 * - Generate cleanup reports
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

interface CleanupResult {
  deleted: string[];
  errors: string[];
  warnings: string[];
}

interface ImportValidationResult {
  broken: Array<{ file: string; line: number; import: string }>;
  valid: number;
}

/**
 * Files and folders to delete during cleanup
 */
const CLEANUP_TARGETS = {
  files: [
    'src/sw.js', // Duplicate service worker
    'test-page.html',
    'src/test-nav-implementation.tsx',
    'tatus',
    'use BearCave CSS variables for consistent branding.',
    'PR integrates modern React UX patterns into the portfolio site, enhancing user experience with professional libraries and best practices.',
  ],
  folders: [
    'src/components/resume',
    'src/components/services',
    'src/sections',
    'src/components/sections/gt',
  ],
  patterns: [
    'vite.config.js.timestamp-*.mjs',
  ],
};

/**
 * Deleted component paths to check for broken imports
 */
const DELETED_PATHS = [
  'components/resume',
  'components/services',
  'sections/gt',
  'sections[^/]', // sections but not sections/...
];

/**
 * Clean up legacy and test files
 */
export async function cleanRepo(dryRun: boolean = false): Promise<CleanupResult> {
  const result: CleanupResult = {
    deleted: [],
    errors: [],
    warnings: [],
  };

  // Delete files
  for (const file of CLEANUP_TARGETS.files) {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      if (dryRun) {
        result.deleted.push(`[DRY RUN] Would delete: ${file}`);
      } else {
        try {
          fs.unlinkSync(filePath);
          result.deleted.push(`Deleted: ${file}`);
        } catch (error) {
          result.errors.push(`Failed to delete ${file}: ${error}`);
        }
      }
    }
  }

  // Delete folders
  for (const folder of CLEANUP_TARGETS.folders) {
    const folderPath = path.join(projectRoot, folder);
    if (fs.existsSync(folderPath)) {
      if (dryRun) {
        result.deleted.push(`[DRY RUN] Would delete folder: ${folder}`);
      } else {
        try {
          fs.rmSync(folderPath, { recursive: true, force: true });
          result.deleted.push(`Deleted folder: ${folder}`);
        } catch (error) {
          result.errors.push(`Failed to delete folder ${folder}: ${error}`);
        }
      }
    }
  }

  return result;
}

/**
 * Validate imports for broken references to deleted components
 */
export async function validateImports(): Promise<ImportValidationResult> {
  const result: ImportValidationResult = {
    broken: [],
    valid: 0,
  };

  const srcDir = path.join(projectRoot, 'src');
  const files = getAllTsFiles(srcDir);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Check for imports from deleted paths
      for (const deletedPath of DELETED_PATHS) {
        const regex = new RegExp(`from\\s+['"].*${deletedPath}`, 'g');
        if (regex.test(line)) {
          result.broken.push({
            file: path.relative(projectRoot, file),
            line: index + 1,
            import: line.trim(),
          });
        }
      }
    });

    // Count valid imports (rough estimate)
    const importMatches = content.match(/^import\s+.*from\s+['"]/gm);
    if (importMatches) {
      result.valid += importMatches.length;
    }
  }

  return result;
}

/**
 * Validate folder structure
 */
export function validateStructure(): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check for empty folders that should be removed
  const emptyFolders = [
    'src/components/resume',
    'src/components/services',
    'src/sections',
    'src/components/sections/gt',
  ];

  for (const folder of emptyFolders) {
    const folderPath = path.join(projectRoot, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      if (files.length === 0) {
        issues.push(`Empty folder should be removed: ${folder}`);
      }
    }
  }

  // Check for duplicate service worker
  const srcSw = path.join(projectRoot, 'src/sw.js');
  const publicSw = path.join(projectRoot, 'public/sw.js');
  if (fs.existsSync(srcSw) && fs.existsSync(publicSw)) {
    issues.push('Duplicate service worker found: src/sw.js should be deleted');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Get all TypeScript/TSX files recursively
 */
function getAllTsFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist') {
      files.push(...getAllTsFiles(fullPath));
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Generate cleanup report
 */
export async function generateReport(): Promise<string> {
  const importResult = await validateImports();
  const structureResult = validateStructure();

  let report = '# Cleanup Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;

  report += '## Import Validation\n\n';
  if (importResult.broken.length === 0) {
    report += '✅ No broken imports found\n';
  } else {
    report += `❌ Found ${importResult.broken.length} broken imports:\n\n`;
    importResult.broken.forEach((broken) => {
      report += `- ${broken.file}:${broken.line} - ${broken.import}\n`;
    });
  }
  report += `\nValid imports: ${importResult.valid}\n\n`;

  report += '## Structure Validation\n\n';
  if (structureResult.valid) {
    report += '✅ Folder structure is valid\n';
  } else {
    report += `❌ Found ${structureResult.issues.length} issues:\n\n`;
    structureResult.issues.forEach((issue) => {
      report += `- ${issue}\n`;
    });
  }

  return report;
}

// CLI execution
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.endsWith('cleanup-automation.ts')) {
  const command = process.argv[2];

  switch (command) {
    case 'clean':
      const dryRun = process.argv.includes('--dry-run');
      cleanRepo(dryRun).then((result) => {
        console.log('Cleanup Results:');
        console.log('Deleted:', result.deleted);
        if (result.errors.length > 0) {
          console.error('Errors:', result.errors);
        }
        if (result.warnings.length > 0) {
          console.warn('Warnings:', result.warnings);
        }
      });
      break;

    case 'validate-imports':
      validateImports().then((result) => {
        if (result.broken.length === 0) {
          console.log('✅ No broken imports found');
        } else {
          console.error(`❌ Found ${result.broken.length} broken imports:`);
          result.broken.forEach((broken) => {
            console.error(`  ${broken.file}:${broken.line} - ${broken.import}`);
          });
          process.exit(1);
        }
      });
      break;

    case 'validate-structure':
      const structureResult = validateStructure();
      if (structureResult.valid) {
        console.log('✅ Folder structure is valid');
      } else {
        console.error('❌ Structure issues found:');
        structureResult.issues.forEach((issue) => {
          console.error(`  - ${issue}`);
        });
        process.exit(1);
      }
      break;

    case 'report':
      generateReport().then((report) => {
        console.log(report);
      });
      break;

    default:
      console.log('Usage:');
      console.log('  npm run mcp:clean [--dry-run]');
      console.log('  npm run mcp:validate-imports');
      console.log('  npm run mcp:validate-structure');
      console.log('  npm run mcp:report');
  }
}

