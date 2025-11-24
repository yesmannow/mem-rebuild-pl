#!/usr/bin/env node

/**
 * Content Audit Tool
 * Analyzes all content files for tone consistency, style compliance, and structure
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Brand voice guidelines
const BRAND_VOICE = {
  tone: ['cinematic', 'confident', 'intelligent', 'warmly human'],
  avoid: ['might', 'try', 'attempt', '...', 'ellipsis', 'passive voice'],
  preferred: ['craft', 'create', 'shape', 'turn', 'move'],
  style: {
    sentenceLength: 'mix of short and long for rhythm',
    structure: 'strategic fragments, pauses, beats',
    emotion: 'visceral over abstract'
  }
};

// Content patterns to check
const PATTERNS = {
  ellipsis: /\.\.\./g,
  hedging: /\b(might|try|attempt|maybe|perhaps)\b/gi,
  passiveVoice: /\b(is|are|was|were)\s+\w+ed\b/gi,
  jargon: /\b(leverage|utilize|synergy|paradigm)\b/gi,
  weakVerbs: /\b(make|do|get|put)\b/gi
};

/**
 * Read all content files
 */
async function findContentFiles(dir, extensions = ['.tsx', '.ts', '.md', '.json']) {
  const files = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip node_modules, dist, .git
      if (entry.name.startsWith('.') ||
          entry.name === 'node_modules' ||
          entry.name === 'dist') {
        continue;
      }

      if (entry.isDirectory()) {
        const subFiles = await findContentFiles(fullPath, extensions);
        files.push(...subFiles);
      } else if (extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Skip directories we can't read
  }

  return files;
}

/**
 * Analyze content for tone consistency
 */
function analyzeContent(content, filePath) {
  const issues = [];
  const stats = {
    wordCount: content.split(/\s+/).length,
    sentenceCount: content.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
    ellipsisCount: (content.match(PATTERNS.ellipsis) || []).length,
    hedgingCount: (content.match(PATTERNS.hedging) || []).length,
    passiveVoiceCount: (content.match(PATTERNS.passiveVoice) || []).length,
    jargonCount: (content.match(PATTERNS.jargon) || []).length
  };

  // Check for issues
  if (stats.ellipsisCount > 0) {
    issues.push({
      type: 'ellipsis',
      severity: 'medium',
      message: `Found ${stats.ellipsisCount} ellipsis(...) - avoid unfinished thoughts`,
      count: stats.ellipsisCount
    });
  }

  if (stats.hedgingCount > 0) {
    issues.push({
      type: 'hedging',
      severity: 'high',
      message: `Found ${stats.hedgingCount} hedging words - use confident language`,
      count: stats.hedgingCount
    });
  }

  if (stats.passiveVoiceCount > 3) {
    issues.push({
      type: 'passiveVoice',
      severity: 'medium',
      message: `Found ${stats.passiveVoiceCount} passive voice instances - prefer active voice`,
      count: stats.passiveVoiceCount
    });
  }

  if (stats.jargonCount > 0) {
    issues.push({
      type: 'jargon',
      severity: 'low',
      message: `Found ${stats.jargonCount} jargon words - consider simpler alternatives`,
      count: stats.jargonCount
    });
  }

  // Calculate tone score
  const toneScore = calculateToneScore(stats, content);

  return {
    file: path.relative(projectRoot, filePath),
    stats,
    issues,
    toneScore,
    needsReview: issues.length > 0 || toneScore < 80
  };
}

/**
 * Calculate tone consistency score
 */
function calculateToneScore(stats, content) {
  let score = 100;

  // Penalize issues
  score -= stats.ellipsisCount * 5;
  score -= stats.hedgingCount * 10;
  score -= Math.min(stats.passiveVoiceCount * 2, 20);
  score -= stats.jargonCount * 3;

  // Check for preferred words
  const preferredCount = BRAND_VOICE.preferred.reduce((count, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return count + (content.match(regex) || []).length;
  }, 0);

  // Bonus for using preferred words
  score += Math.min(preferredCount * 2, 10);

  return Math.max(0, Math.min(100, score));
}

/**
 * Generate report
 */
function generateReport(results) {
  const totalFiles = results.length;
  const filesWithIssues = results.filter(r => r.needsReview).length;
  const avgToneScore = results.reduce((sum, r) => sum + r.toneScore, 0) / totalFiles;

  const report = {
    summary: {
      totalFiles,
      filesWithIssues,
      filesClean: totalFiles - filesWithIssues,
      averageToneScore: Math.round(avgToneScore * 10) / 10,
      needsReview: filesWithIssues > 0
    },
    issues: {
      ellipsis: results.filter(r => r.issues.some(i => i.type === 'ellipsis')).length,
      hedging: results.filter(r => r.issues.some(i => i.type === 'hedging')).length,
      passiveVoice: results.filter(r => r.issues.some(i => i.type === 'passiveVoice')).length,
      jargon: results.filter(r => r.issues.some(i => i.type === 'jargon')).length
    },
    files: results.map(r => ({
      file: r.file,
      toneScore: r.toneScore,
      issueCount: r.issues.length,
      issues: r.issues.map(i => i.type),
      needsReview: r.needsReview
    }))
  };

  return report;
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Content Audit Tool\n');
  console.log('Scanning content files...\n');

  // Find all content files
  const contentDirs = [
    path.join(projectRoot, 'src', 'pages'),
    path.join(projectRoot, 'src', 'components'),
    path.join(projectRoot, 'content'),
    path.join(projectRoot, 'docs')
  ];

  const allFiles = [];
  for (const dir of contentDirs) {
    try {
      const files = await findContentFiles(dir);
      allFiles.push(...files);
    } catch (error) {
      // Directory doesn't exist, skip
    }
  }

  console.log(`Found ${allFiles.length} content files\n`);

  // Analyze each file
  const results = [];
  for (const file of allFiles) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      const analysis = analyzeContent(content, file);
      results.push(analysis);
    } catch (error) {
      // Skip files we can't read
    }
  }

  // Generate report
  const report = generateReport(results);

  // Output report
  console.log('📊 Content Audit Report\n');
  console.log('Summary:');
  console.log(`  Total Files: ${report.summary.totalFiles}`);
  console.log(`  Files with Issues: ${report.summary.filesWithIssues}`);
  console.log(`  Clean Files: ${report.summary.filesClean}`);
  console.log(`  Average Tone Score: ${report.summary.averageToneScore}/100\n`);

  console.log('Issues Found:');
  console.log(`  Ellipsis: ${report.issues.ellipsis} files`);
  console.log(`  Hedging: ${report.issues.hedging} files`);
  console.log(`  Passive Voice: ${report.issues.passiveVoice} files`);
  console.log(`  Jargon: ${report.issues.jargon} files\n`);

  // Files needing review
  const needsReview = report.files.filter(f => f.needsReview);
  if (needsReview.length > 0) {
    console.log('⚠️  Files Needing Review:\n');
    needsReview.slice(0, 10).forEach(file => {
      console.log(`  ${file.file}`);
      console.log(`    Tone Score: ${file.toneScore}/100`);
      console.log(`    Issues: ${file.issues.join(', ')}`);
      console.log('');
    });

    if (needsReview.length > 10) {
      console.log(`  ... and ${needsReview.length - 10} more files\n`);
    }
  }

  // Save report
  const reportPath = path.join(projectRoot, 'reports', 'content-audit-report.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n✅ Report saved to: ${path.relative(projectRoot, reportPath)}`);

  // Exit with error code if issues found
  if (report.summary.needsReview) {
    process.exit(1);
  }
}

main().catch(console.error);

