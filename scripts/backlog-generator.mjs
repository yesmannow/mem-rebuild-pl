#!/usr/bin/env node
/**
 * Backlog Generator
 * Scan repo and generate GitHub issues by label
 * 
 * Usage: node scripts/backlog-generator.mjs [--dry-run] [--label=enhancement]
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRY_RUN = process.argv.includes('--dry-run');
const LABEL = process.argv.find(arg => arg.startsWith('--label='))?.split('=')[1] || 'enhancement';

console.log('📋 Backlog Generator');
console.log('====================\n');

// Patterns to scan for potential issues
const patterns = {
  'TODO': /TODO|FIXME|XXX|HACK/gi,
  'console.log': /console\.(log|warn|error)/g,
  'deprecated': /@deprecated|deprecated/gi,
  'performance': /performance|optimize|slow/gi,
  'accessibility': /a11y|accessibility|aria|screen reader/gi,
  'security': /security|vulnerability|XSS|CSRF/gi,
};

async function scanFiles() {
  const files = await glob('src/**/*.{ts,tsx,js,jsx}', {
    ignore: ['**/node_modules/**', '**/dist/**', '**/*.test.*', '**/*.spec.*']
  });
  
  const issues = [];
  
  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      const lines = content.split('\n');
      
      for (const [type, pattern] of Object.entries(patterns)) {
        const matches = content.match(pattern);
        if (matches) {
          lines.forEach((line, index) => {
            if (pattern.test(line)) {
              issues.push({
                file,
                type,
                line: index + 1,
                content: line.trim(),
                label: getLabelForType(type)
              });
            }
          });
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not read ${file}:`, error.message);
    }
  }
  
  return issues;
}

function getLabelForType(type) {
  const labelMap = {
    'TODO': 'enhancement',
    'console.log': 'maintenance',
    'deprecated': 'refactor',
    'performance': 'performance',
    'accessibility': 'accessibility',
    'security': 'security'
  };
  return labelMap[type] || 'enhancement';
}

function generateIssueBody(issue) {
  return `## ${issue.type} Found

**File:** \`${issue.file}\`
**Line:** ${issue.line}

\`\`\`
${issue.content}
\`\`\`

### Context
This ${issue.type.toLowerCase()} was found during automated scanning. Please review and address.

### Suggested Actions
- [ ] Review the code
- [ ] Create a proper issue if needed
- [ ] Address or document the finding
`;
}

async function generateIssues() {
  const findings = await scanFiles();
  
  console.log(`Found ${findings.length} potential issues\n`);
  
  // Group by type
  const grouped = findings.reduce((acc, issue) => {
    if (!acc[issue.type]) acc[issue.type] = [];
    acc[issue.type].push(issue);
    return acc;
  }, {});
  
  for (const [type, issues] of Object.entries(grouped)) {
    console.log(`\n📌 ${type}: ${issues.length} findings`);
    
    if (!DRY_RUN) {
      // In a real implementation, you would use GitHub API to create issues
      console.log(`   Would create ${issues.length} issues with label: ${getLabelForType(type)}`);
      issues.slice(0, 5).forEach(issue => {
        console.log(`   - ${issue.file}:${issue.line}`);
      });
      if (issues.length > 5) {
        console.log(`   ... and ${issues.length - 5} more`);
      }
    } else {
      console.log(`   [DRY RUN] Would create issues:`);
      issues.slice(0, 3).forEach(issue => {
        const body = generateIssueBody(issue);
        console.log(`\n   Title: [${type}] ${issue.file}:${issue.line}`);
        console.log(`   Label: ${getLabelForType(type)}`);
        console.log(`   Body preview: ${body.substring(0, 100)}...`);
      });
    }
  }
  
  if (DRY_RUN) {
    console.log('\n✅ Dry run complete. Use without --dry-run to create issues.');
  } else {
    console.log('\n✅ Issue generation complete.');
  }
}

generateIssues().catch(console.error);

