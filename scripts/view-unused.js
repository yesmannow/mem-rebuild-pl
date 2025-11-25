#!/usr/bin/env node
/**
 * Visual Audit Tool - Generate HTML gallery of unused assets
 * Usage: node scripts/view-unused.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const reportPath = path.join(repoRoot, 'reports', 'unused-assets-report.json');
const outputPath = path.join(repoRoot, 'unused-gallery.html');

function generateHTML(unusedAssets) {
  const images = unusedAssets.filter(asset =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(asset.path)
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unused Assets Gallery - Visual Audit</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      padding: 2rem;
      line-height: 1.6;
    }
    .header {
      max-width: 1400px;
      margin: 0 auto 3rem;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(to right, #40E0D0, #FFA500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .stats {
      display: flex;
      gap: 2rem;
      justify-content: center;
      margin-top: 1rem;
      flex-wrap: wrap;
    }
    .stat {
      padding: 1rem 2rem;
      background: #1e293b;
      border-radius: 8px;
      border: 1px solid #334155;
    }
    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #40E0D0;
    }
    .gallery {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }
    .asset-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .asset-card:hover {
      border-color: #40E0D0;
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(64, 224, 208, 0.2);
    }
    .asset-image {
      width: 100%;
      height: 200px;
      object-fit: contain;
      background: #0f172a;
      padding: 1rem;
    }
    .asset-info {
      padding: 1rem;
    }
    .asset-path {
      font-size: 0.85rem;
      color: #94a3b8;
      word-break: break-all;
      margin-bottom: 0.5rem;
    }
    .asset-name {
      font-weight: 600;
      color: #f8fafc;
      margin-bottom: 0.5rem;
    }
    .asset-size {
      font-size: 0.75rem;
      color: #64748b;
    }
    .no-images {
      text-align: center;
      padding: 4rem;
      color: #94a3b8;
    }
    .filter-bar {
      max-width: 1400px;
      margin: 0 auto 2rem;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .filter-btn {
      padding: 0.5rem 1rem;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 6px;
      color: #f8fafc;
      cursor: pointer;
      transition: all 0.2s;
    }
    .filter-btn:hover,
    .filter-btn.active {
      background: #40E0D0;
      border-color: #40E0D0;
      color: #0f172a;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Unused Assets Gallery</h1>
    <p style="color: #94a3b8; margin-top: 0.5rem;">
      Visual audit of unused assets. Review and decide what to keep or remove.
    </p>
    <div class="stats">
      <div class="stat">
        <div class="stat-number">${images.length}</div>
        <div>Unused Images</div>
      </div>
      <div class="stat">
        <div class="stat-number">${unusedAssets.length}</div>
        <div>Total Unused</div>
      </div>
    </div>
  </div>

  <div class="filter-bar">
    <button class="filter-btn active" onclick="filterAssets('all')">All</button>
    <button class="filter-btn" onclick="filterAssets('svg')">SVG</button>
    <button class="filter-btn" onclick="filterAssets('png')">PNG</button>
    <button class="filter-btn" onclick="filterAssets('jpg')">JPG</button>
    <button class="filter-btn" onclick="filterAssets('webp')">WebP</button>
  </div>

  <div class="gallery" id="gallery">
    ${images.length > 0 ? images.map(asset => {
      const fileName = path.basename(asset.path);
      const ext = path.extname(asset.path).toLowerCase();
      const relativePath = asset.path.replace(/\\/g, '/').replace(/^public\//, '/');

      return `
        <div class="asset-card" data-type="${ext.replace('.', '')}">
          <img
            src="${relativePath}"
            alt="${fileName}"
            class="asset-image"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          />
          <div style="display:none; padding: 2rem; text-align: center; color: #64748b;">
            Image not found or invalid
          </div>
          <div class="asset-info">
            <div class="asset-name">${fileName}</div>
            <div class="asset-path">${asset.path}</div>
            ${asset.size ? `<div class="asset-size">${formatSize(asset.size)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('') : '<div class="no-images">No unused images found</div>'}
  </div>

  <script>
    function filterAssets(type) {
      const cards = document.querySelectorAll('.asset-card');
      const buttons = document.querySelectorAll('.filter-btn');

      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      cards.forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>`;

  return html;
}

function formatSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function main() {
  try {
    if (!fs.existsSync(reportPath)) {
      console.error(`❌ Report not found: ${reportPath}`);
      console.log('💡 Run the audit script first to generate the report.');
      process.exit(1);
    }

    const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    // Handle both old format (unused) and new format (unusedImages)
    const unusedAssets = reportData.unused || reportData.unusedImages || [];

    console.log(`📊 Found ${unusedAssets.length} unused assets`);
    console.log(`🖼️  Generating gallery for ${unusedAssets.filter(a => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(a.path)).length} images...`);

    const html = generateHTML(unusedAssets);
    fs.writeFileSync(outputPath, html, 'utf8');

    console.log(`✅ Gallery generated: ${outputPath}`);
    console.log(`🌐 Open in browser: file://${outputPath.replace(/\\/g, '/')}`);
  } catch (error) {
    console.error('❌ Error generating gallery:', error.message);
    process.exit(1);
  }
}

main();

