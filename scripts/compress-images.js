#!/usr/bin/env node
/**
 * Image Compression Script
 * Generates compression commands for large images and converts to WebP
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const MAX_SIZE = 500 * 1024; // 500KB

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const auto = args.includes('--auto');

  console.log('📦 Image Compression Script\n');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  const auditPath = path.join(rootDir, 'reports/design-analysis/image-audit-report.json');
  let audit;

  try {
    audit = JSON.parse(await fs.readFile(auditPath, 'utf-8'));
  } catch (error) {
    console.error('❌ Could not read image audit report. Run npm run design:audit-images first.');
    process.exit(1);
  }

  const largeFiles = audit.issues.largeFiles || [];
  const commands = [];
  const webpConversions = [];

  for (const image of largeFiles) {
    const fullPath = path.join(rootDir, image.relativePath);
    const ext = path.extname(image.relativePath).toLowerCase();
    const dir = path.dirname(fullPath);
    const name = path.basename(image.relativePath, ext);

    // Generate WebP conversion command
    if (ext !== '.webp' && ext !== '.svg') {
      const webpPath = path.join(dir, `${name}.webp`);
      webpConversions.push({
        original: image.relativePath,
        webp: path.relative(rootDir, webpPath),
        size: `${(image.size / (1024 * 1024)).toFixed(2)} MB`,
        command: `npx @squoosh/cli --webp auto "${fullPath}" -d "${dir}" -o "${name}.webp"`
      });
    }

    // Generate compression command
    if (ext === '.jpg' || ext === '.jpeg') {
      commands.push({
        file: image.relativePath,
        command: `npx sharp-cli --input "${fullPath}" --output "${fullPath}" --quality 85 --progressive`
      });
    } else if (ext === '.png') {
      commands.push({
        file: image.relativePath,
        command: `npx sharp-cli --input "${fullPath}" --output "${fullPath}" --quality 90 --compressionLevel 9`
      });
    }
  }

  // Generate script file
  const scriptContent = `#!/bin/bash
# Image Compression Script
# Generated: ${new Date().toISOString()}
# Total files: ${largeFiles.length}

# Install dependencies if needed
# npm install -g @squoosh/cli sharp-cli

echo "📦 Compressing ${largeFiles.length} large images..."

${commands.map(c => `# ${c.file}\n${c.command}`).join('\n\n')}

echo "✅ Compression complete!"
`;

  const scriptPath = path.join(rootDir, 'scripts/compress-images.sh');
  await fs.writeFile(scriptPath, scriptContent, 'utf-8');

  // Generate WebP conversion script
  const webpScriptContent = `#!/bin/bash
# WebP Conversion Script
# Generated: ${new Date().toISOString()}
# Total conversions: ${webpConversions.length}

echo "🔄 Converting ${webpConversions.length} images to WebP..."

${webpConversions.map(c => `# ${c.original} (${c.size})\necho "Converting ${c.original}..."\n${c.command}`).join('\n\n')}

echo "✅ WebP conversion complete!"
`;

  const webpScriptPath = path.join(rootDir, 'scripts/convert-to-webp.sh');
  await fs.writeFile(webpScriptPath, webpScriptContent, 'utf-8');

  // Save report
  const report = {
    totalLargeFiles: largeFiles.length,
    commands: commands,
    webpConversions: webpConversions,
    scripts: {
      compression: 'scripts/compress-images.sh',
      webp: 'scripts/convert-to-webp.sh'
    }
  };

  const reportPath = path.join(rootDir, 'reports/design-analysis/image-compression-commands.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log(`\n📊 Compression Summary:`);
  console.log(`   Large files: ${largeFiles.length}`);
  console.log(`   Compression commands: ${commands.length}`);
  console.log(`   WebP conversions: ${webpConversions.length}`);

  console.log(`\n💾 Scripts generated:`);
  console.log(`   ${scriptPath}`);
  console.log(`   ${webpScriptPath}`);
  console.log(`   ${reportPath}`);

  if (auto && !dryRun) {
    console.log('\n⚠️  Auto-compression not implemented. Run scripts manually.');
  }

  console.log('\n' + '='.repeat(60));
}

main().catch(console.error);

