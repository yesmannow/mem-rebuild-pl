#!/usr/bin/env node
/**
 * Content Validator Script
 * Validates content quality, spelling, and markdown links
 *
 * Usage: node scripts/validate-content.js [--check-spelling] [--check-markdown]
 * Example: node scripts/validate-content.js --check-spelling --check-markdown
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHECK_SPELLING = process.argv.includes('--check-spelling');
const CHECK_MARKDOWN = process.argv.includes('--check-markdown');
const OUTPUT_PATH = 'reports/content-validation-report.json';

// Ensure reports directory exists
const reportsDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('📝 Content Validator');
console.log('====================\n');

const issues = [];
const warnings = [];

// Check spelling using cspell if available
function checkSpelling() {
  if (!CHECK_SPELLING) return;

  console.log('🔤 Checking spelling...\n');

  try {
    const cspellCmd = 'npx cspell';

    // Check source files
    const srcDir = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcDir)) {
      try {
        const result = execSync(`${cspellCmd} "src/**/*.{ts,tsx,js,jsx}"`, {
          encoding: 'utf-8',
          stdio: 'pipe',
        });
        console.log('✅ No spelling errors found in source files');
      } catch (error) {
        const output = error.stdout || error.stderr || '';
        const errors = output.split('\n').filter(line => line.trim());
        errors.forEach(error => {
          issues.push({
            type: 'spelling',
            file: error.split(':')[0],
            issue: error,
            severity: 'warning',
          });
        });
        console.log(`⚠️  Found ${errors.length} potential spelling issue(s)`);
      }
    }
  } catch (error) {
    console.log('⚠️  cspell not available. Install with: npm install --save-dev cspell');
    warnings.push({
      type: 'spelling',
      issue: 'cspell not available for spelling checks',
    });
  }
}

// Check markdown files
function checkMarkdown() {
  if (!CHECK_MARKDOWN) return;

  console.log('📄 Checking markdown files...\n');

  const markdownFiles = [];
  function findMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !filePath.includes('node_modules')) {
        findMarkdownFiles(filePath);
      } else if (file.endsWith('.md')) {
        markdownFiles.push(filePath);
      }
    });
  }

  findMarkdownFiles(process.cwd());

  console.log(`Found ${markdownFiles.length} markdown file(s)\n`);

  markdownFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(process.cwd(), file);

    // Check for broken markdown links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];

      // Skip external links
      if (
        linkUrl.startsWith('http://') ||
        linkUrl.startsWith('https://') ||
        linkUrl.startsWith('mailto:')
      ) {
        continue;
      }

      // Check if linked file exists
      const linkPath = path.resolve(path.dirname(file), linkUrl);
      if (!fs.existsSync(linkPath)) {
        issues.push({
          type: 'broken-link',
          file: relativePath,
          link: linkUrl,
          linkText,
          issue: `Broken markdown link: ${linkUrl}`,
        });
      }
    }

    // Check for empty headings
    const headingRegex = /^(#{1,6})\s*$/gm;
    if (headingRegex.test(content)) {
      warnings.push({
        type: 'empty-heading',
        file: relativePath,
        issue: 'Empty heading found',
      });
    }

    // Check for very long lines (hard to read)
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.length > 120 && !line.startsWith('#')) {
        warnings.push({
          type: 'long-line',
          file: relativePath,
          line: index + 1,
          issue: `Line ${index + 1} is very long (${line.length} chars)`,
        });
      }
    });
  });
}

// Validate case study data
function validateCaseStudies() {
  console.log('📚 Validating case study data...\n');

  const caseStudiesPath = path.join(process.cwd(), 'src', 'data', 'caseStudies.ts');
  if (!fs.existsSync(caseStudiesPath)) {
    return;
  }

  try {
    // Read and parse case studies (simplified - would need proper TS parsing)
    const content = fs.readFileSync(caseStudiesPath, 'utf-8');

    // Check for required fields
    const requiredFields = ['slug', 'title', 'tagline', 'metrics'];
    const caseStudyMatches = content.match(/export const caseStudies[^=]*=\s*\[([\s\S]*?)\];/);

    if (caseStudyMatches) {
      // Basic validation - check for common fields
      requiredFields.forEach(field => {
        if (!content.includes(field)) {
          warnings.push({
            type: 'case-study',
            issue: `Case studies may be missing '${field}' field`,
          });
        }
      });

      console.log('✅ Case study structure looks valid');
    }
  } catch (error) {
    warnings.push({
      type: 'case-study',
      issue: `Could not validate case studies: ${error.message}`,
    });
  }
}

// Check for placeholder text
function checkPlaceholders() {
  console.log('🔍 Checking for placeholder text...\n');

  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    return;
  }

  const placeholders = [
    /lorem ipsum/gi,
    /placeholder/gi,
    /TODO:/gi,
    /FIXME:/gi,
    /XXX/gi,
    /\[.*?\]/g, // Bracketed placeholders
  ];

  function scanFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !filePath.includes('node_modules')) {
        scanFiles(filePath);
      } else if (file.match(/\.(tsx|ts|jsx|js)$/)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(process.cwd(), filePath);

        placeholders.forEach((pattern, index) => {
          const matches = content.match(pattern);
          if (matches && index < 2) {
            // Only flag lorem ipsum and placeholder
            matches.forEach(match => {
              warnings.push({
                type: 'placeholder',
                file: relativePath,
                issue: `Possible placeholder text found: "${match.substring(0, 30)}..."`,
              });
            });
          }
        });
      }
    });
  }

  scanFiles(srcDir);

  const placeholderWarnings = warnings.filter(w => w.type === 'placeholder');
  if (placeholderWarnings.length > 0) {
    console.log(`⚠️  Found ${placeholderWarnings.length} potential placeholder(s)`);
  } else {
    console.log('✅ No placeholder text found');
  }
}

// Validate image alt text (basic check)
function validateImageAltText() {
  console.log('🖼️  Checking image alt text...\n');

  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    return;
  }

  function scanFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !filePath.includes('node_modules')) {
        scanFiles(filePath);
      } else if (file.match(/\.(tsx|jsx)$/)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(process.cwd(), filePath);

        // Find img tags without alt or with empty alt
        const imgRegex = /<img[^>]*>/gi;
        let match;
        while ((match = imgRegex.exec(content)) !== null) {
          const imgTag = match[0];
          if (!imgTag.includes('alt=') || imgTag.match(/alt=["']\s*["']/)) {
            issues.push({
              type: 'missing-alt',
              file: relativePath,
              issue: 'Image missing alt text or has empty alt attribute',
              severity: 'error',
            });
          }
        }
      }
    });
  }

  scanFiles(srcDir);

  const altIssues = issues.filter(i => i.type === 'missing-alt');
  if (altIssues.length > 0) {
    console.log(`❌ Found ${altIssues.length} image(s) missing alt text`);
  } else {
    console.log('✅ All images have alt text');
  }
}

// Run all validations
function runValidations() {
  checkSpelling();
  checkMarkdown();
  validateCaseStudies();
  checkPlaceholders();
  validateImageAltText();

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      issues: issues.length,
      warnings: warnings.length,
    },
    issues,
    warnings,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));

  // Display summary
  console.log('\n📊 Content Validation Results');
  console.log('============================');
  console.log(`Issues:    ${report.summary.issues} ${report.summary.issues === 0 ? '✅' : '❌'}`);
  console.log(
    `Warnings:  ${report.summary.warnings} ${report.summary.warnings === 0 ? '✅' : '⚠️'}`
  );

  if (issues.length > 0) {
    console.log('\n❌ Issues:');
    issues.slice(0, 10).forEach(issue => {
      console.log(`   - ${issue.type}: ${issue.issue}`);
      if (issue.file) console.log(`     File: ${issue.file}`);
    });
    if (issues.length > 10) {
      console.log(`   ... and ${issues.length - 10} more`);
    }
  }

  console.log(`\n✅ Report saved to: ${OUTPUT_PATH}`);

  if (issues.length > 0) {
    process.exit(1);
  }
}

runValidations();
