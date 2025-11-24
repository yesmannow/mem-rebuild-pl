/**
 * Design System Optimization Script
 * Analyzes current design and suggests improvements
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Analyze CSS files for design token usage
 */
function analyzeDesignTokens() {
  const stylesDir = path.join(__dirname, '../src/styles');
  const tokenUsage = {
    signalOrange: 0,
    telemetryTeal: 0,
    inkColors: 0,
    oldGradients: 0,
    oldColors: 0,
  };

  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Count new token usage
    tokenUsage.signalOrange += (content.match(/signal-500|--signal-500/g) || []).length;
    tokenUsage.telemetryTeal += (content.match(/telemetry-400|--telemetry-400/g) || []).length;
    tokenUsage.inkColors += (content.match(/ink-900|ink-700|--ink-/g) || []).length;

    // Count old patterns (should be 0)
    tokenUsage.oldGradients += (content.match(/gradient-brand|#3b82f6|#ec4899|#8B5CF6|#88ABF2/g) || []).length;
    tokenUsage.oldColors += (content.match(/from-blue|to-purple|from-indigo/g) || []).length;
  }

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.css') || file.endsWith('.tsx') || file.endsWith('.ts')) {
        scanFile(filePath);
      }
    });
  }

  scanDirectory(stylesDir);
  scanDirectory(path.join(__dirname, '../src/components'));

  return tokenUsage;
}

/**
 * Generate optimization report
 */
function generateReport() {
  const tokens = analyzeDesignTokens();
  const totalNew = tokens.signalOrange + tokens.telemetryTeal + tokens.inkColors;
  const totalOld = tokens.oldGradients + tokens.oldColors;
  const migrationScore = totalOld === 0 ? 100 : Math.round((totalNew / (totalNew + totalOld)) * 100);

  const report = {
    timestamp: new Date().toISOString(),
    tokenUsage: tokens,
    metrics: {
      totalNewTokens: totalNew,
      totalOldPatterns: totalOld,
      migrationScore,
      status: migrationScore === 100 ? 'complete' : migrationScore > 80 ? 'good' : 'needs-work'
    },
    recommendations: []
  };

  if (tokens.oldGradients > 0) {
    report.recommendations.push({
      priority: 'high',
      issue: 'Old gradient patterns found',
      count: tokens.oldGradients,
      action: 'Replace with Signalcraft color system'
    });
  }

  if (tokens.oldColors > 0) {
    report.recommendations.push({
      priority: 'high',
      issue: 'Old color classes found',
      count: tokens.oldColors,
      action: 'Update to use CSS variables (--signal-500, --telemetry-400)'
    });
  }

  if (tokens.signalOrange < 10) {
    report.recommendations.push({
      priority: 'medium',
      issue: 'Low signal orange usage',
      action: 'Consider adding more signal orange accents for brand consistency'
    });
  }

  return report;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Analyzing Design System...\n');

  const report = generateReport();

  console.log('📊 Design Token Usage:');
  console.log(`   Signal Orange: ${report.tokenUsage.signalOrange}`);
  console.log(`   Telemetry Teal: ${report.tokenUsage.telemetryTeal}`);
  console.log(`   Ink Colors: ${report.tokenUsage.inkColors}`);
  console.log(`   Old Gradients: ${report.tokenUsage.oldGradients} ⚠️`);
  console.log(`   Old Colors: ${report.tokenUsage.oldColors} ⚠️`);

  console.log(`\n📈 Migration Score: ${report.metrics.migrationScore}%`);
  console.log(`   Status: ${report.metrics.status}`);

  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach((rec, i) => {
      console.log(`   ${i + 1}. [${rec.priority.toUpperCase()}] ${rec.issue}`);
      if (rec.count) console.log(`      Found ${rec.count} instances`);
      console.log(`      Action: ${rec.action}`);
    });
  }

  // Save report
  const outputDir = path.join(__dirname, '../data/design-analysis');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, 'design-system-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log(`\n📁 Report saved to: ${path.join(outputDir, 'design-system-report.json')}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { analyzeDesignTokens, generateReport };

