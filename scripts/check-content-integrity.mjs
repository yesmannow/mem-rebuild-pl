import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

/**
 * Check content integrity in data files
 * Looks for:
 * - null/undefined values
 * - empty strings in required fields
 * - broken image paths
 */
async function checkContentIntegrity() {
  const issues = [];
  const dataDir = path.join(repoRoot, 'src', 'data');

  try {
    const files = await fs.readdir(dataDir);
    const dataFiles = files.filter(f => f.endsWith('.ts') || f.endsWith('.json'));

    for (const file of dataFiles) {
      const filePath = path.join(dataDir, file);
      const content = await fs.readFile(filePath, 'utf8');

      // Check for null/undefined in strings
      const nullMatches = content.match(/:\s*(null|undefined)/g);
      if (nullMatches) {
        issues.push({
          file,
          type: 'null-value',
          message: `Found ${nullMatches.length} null/undefined values`,
          severity: 'warning',
        });
      }

      // Check for empty strings in key fields
      // Check for empty strings (but not in code snippets or template literals)
      // Exclude matches inside backticks (code snippets) and template literals
      const lines = content.split('\n');
      let emptyStringCount = 0;
      let inCodeSnippet = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Track if we're inside a code snippet (between backticks)
        const backtickCount = (line.match(/`/g) || []).length;
        if (backtickCount % 2 === 1) {
          inCodeSnippet = !inCodeSnippet;
        }

        // Only check for empty strings if we're NOT in a code snippet
        if (!inCodeSnippet) {
          // Match empty strings in object properties (field: "" or field: '')
          // But exclude template literals and code snippets
          const emptyStringMatch = line.match(/:\s*['"]\s*['"]\s*[,}]/);
          if (emptyStringMatch && !line.includes('snippet') && !line.includes('template')) {
            emptyStringCount++;
          }
        }
      }

      if (emptyStringCount > 0) {
        issues.push({
          file,
          type: 'empty-string',
          message: `Found ${emptyStringCount} empty string values`,
          severity: 'warning',
        });
      }

      // Check for broken image paths (relative paths that don't exist)
      const imagePathMatches = content.match(/['"]([^'"]*\/images\/[^'"]+)['"]/g);
      if (imagePathMatches) {
        for (const match of imagePathMatches) {
          const imagePath = match.replace(/['"]/g, '');
          // Skip absolute URLs
          if (imagePath.startsWith('http')) continue;

          const fullPath = path.join(repoRoot, 'public', imagePath);
          try {
            await fs.access(fullPath);
          } catch {
            issues.push({
              file,
              type: 'broken-image',
              message: `Broken image path: ${imagePath}`,
              severity: 'error',
            });
          }
        }
      }
    }

    // Calculate integrity score (100 - (errors * 10 + warnings * 5))
    const errors = issues.filter(i => i.severity === 'error').length;
    const warnings = issues.filter(i => i.severity === 'warning').length;
    const score = Math.max(0, 100 - (errors * 10 + warnings * 5));

    return {
      score,
      issues,
      errors,
      warnings,
      filesChecked: dataFiles.length,
    };
  } catch (error) {
    console.error('Error checking content integrity:', error);
    return {
      score: 0,
      issues: [{ type: 'error', message: error.message, severity: 'error' }],
      errors: 1,
      warnings: 0,
      filesChecked: 0,
    };
  }
}

// If run directly, output results
if (import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  checkContentIntegrity().then(result => {
    console.log(JSON.stringify(result, null, 2));
  });
}

export { checkContentIntegrity };

