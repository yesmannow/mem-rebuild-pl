# CLI Usage Guide - Design System Tools

Complete documentation for all CLI scripts and commands related to the design system implementation.

---

## 🎨 Color System Commands

### Consolidate Colors
Maps all colors to the design system palette.

```bash
npm run design:consolidate-colors
```

**Output:**
- `reports/design-analysis/color-consolidation-report.json` - Color mapping report
- `src/styles/design-system-colors.css` - CSS variables file

**Usage:**
```bash
# Run consolidation
npm run design:consolidate-colors

# View report
cat reports/design-analysis/color-consolidation-report.json | jq '.summary'

# View CSS variables
cat src/styles/design-system-colors.css
```

### Enhanced Color Mapping
Complete mapping of all colors including far matches and unmapped.

```bash
npm run design:map-colors
```

**Output:**
- `reports/design-analysis/enhanced-color-mapping.json` - Complete mapping

**Usage:**
```bash
# Generate enhanced mapping
npm run design:map-colors

# View mapping summary
cat reports/design-analysis/enhanced-color-mapping.json | jq '.summary'
```

---

## 🖼️ Image Commands

### Audit Images
Audits all images for accessibility, usage, and optimization.

```bash
npm run design:audit-images
```

**Output:**
- `reports/design-analysis/image-audit-report.json` - Detailed audit
- `reports/design-analysis/image-audit-report.html` - HTML report

**Usage:**
```bash
# Run audit
npm run design:audit-images

# View summary
cat reports/design-analysis/image-audit-report.json | jq '.summary'

# Open HTML report
open reports/design-analysis/image-audit-report.html
```

### Fix Alt Text
Generates suggested alt text for images missing descriptions.

```bash
npm run design:fix-alt-text --dry-run
```

**Output:**
- `reports/design-analysis/image-alt-fixes.json` - Alt text suggestions

**Usage:**
```bash
# Generate suggestions (dry run)
npm run design:fix-alt-text --dry-run

# View suggestions
cat reports/design-analysis/image-alt-fixes.json | jq '.fixes[0:5]'

# Apply fixes manually based on suggestions
```

### Compress Images
Generates compression commands for large images.

```bash
npm run design:compress-images --dry-run
```

**Output:**
- `reports/design-analysis/image-compression-commands.json` - Commands
- `scripts/compress-images.sh` - Compression script
- `scripts/convert-to-webp.sh` - WebP conversion script

**Usage:**
```bash
# Generate commands (dry run)
npm run design:compress-images --dry-run

# Review commands
cat reports/design-analysis/image-compression-commands.json | jq '.commands[0:3]'

# Run compression (after reviewing)
bash scripts/compress-images.sh
bash scripts/convert-to-webp.sh
```

---

## 🎯 Icon Commands

### Audit Icons
Checks which required icons are present.

```bash
npm run icon:audit
```

**Output:**
- `reports/design-analysis/icon-audit-report.json` - Icon audit

**Usage:**
```bash
# Run audit
npm run icon:audit

# View missing icons
cat reports/design-analysis/icon-audit-report.json | jq '.missing'
```

### Add Icon
Imports and optimizes an SVG icon, generates React component.

```bash
npm run icon:add <name> <path>
```

**Options:**
- `--no-component` - Skip React component generation

**Output:**
- `public/icons/<name>.svg` - Optimized SVG
- `src/components/icons/<name>Icon.tsx` - React component
- Updated `src/components/icons/IconRegistry.tsx`

**Usage:**
```bash
# Add icon with React component
npm run icon:add email ./downloads/email-icon.svg

# Add icon without component
npm run icon:add logo ./downloads/logo.svg --no-component

# Verify icon was added
ls public/icons/
ls src/components/icons/
```

**Example Workflow:**
```bash
# 1. Download icon from lucide.dev or phosphoricons.com
# 2. Save to downloads folder
# 3. Import with script
npm run icon:add linkedin ./downloads/linkedin.svg

# 4. Use in component
# import { LinkedinIcon } from '@/components/icons/linkedinIcon';
```

---

## 🕷️ Scraping Commands

### Start Scraping Server
Starts the MCP scraping assistant server.

```bash
npm run scraping:server
```

**Usage:**
```bash
# Start server (runs in foreground)
npm run scraping:server

# In another terminal, use Cursor AI with scraping prompts
```

### Extract Images
Extracts all images from a website.

```bash
npm run scrape:images <url> [outputDir]
```

**Usage:**
```bash
# Extract images
npm run scrape:images https://example.com

# Extract to specific directory
npm run scrape:images https://example.com public/images/scraped
```

### Extract Design Components
Extracts colors, fonts, and design patterns.

```bash
npm run scrape:design <url> [outputDir]
```

**Usage:**
```bash
# Extract design components
npm run scrape:design https://example.com

# View results
cat public/design-assets/design_components.json | jq
```

### Extract Everything
Extracts images, design components, and CSS files.

```bash
npm run scrape:all <url> [outputDir]
```

**Usage:**
```bash
# Extract everything
npm run scrape:all https://example.com

# Review all extracted data
ls public/images/scraped/
```

---

## 📊 Analysis Commands

### Analyze Portfolio Design
Comprehensive design analysis of the live portfolio.

```bash
npm run design:analyze
```

**Usage:**
```bash
# Analyze portfolio
npm run design:analyze https://mem-rebuild-pl.vercel.app/

# View summary
cat reports/design-analysis/design_summary.json | jq
```

---

## 🔧 Advanced Usage

### Combining Commands
```bash
# Full design system audit
npm run design:analyze && \
npm run design:audit-images && \
npm run icon:audit

# Generate all reports
npm run design:consolidate-colors && \
npm run design:map-colors && \
npm run design:fix-alt-text --dry-run
```

### Scripting Workflows
```bash
#!/bin/bash
# design-system-audit.sh

echo "🎨 Running design system audit..."

# Color analysis
npm run design:consolidate-colors
npm run design:map-colors

# Image audit
npm run design:audit-images
npm run design:fix-alt-text --dry-run
npm run design:compress-images --dry-run

# Icon audit
npm run icon:audit

echo "✅ Audit complete! Check reports/design-analysis/"
```

### CI/CD Integration
```yaml
# .github/workflows/design-audit.yml
name: Design System Audit

on:
  schedule:
    - cron: '0 0 1 * *' # Monthly

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run design:audit-images
      - run: npm run icon:audit
      - uses: actions/upload-artifact@v3
        with:
          name: design-audit-reports
          path: reports/design-analysis/
```

---

## 📝 Output Files Reference

### Color System
- `reports/design-analysis/color-consolidation-report.json`
- `reports/design-analysis/enhanced-color-mapping.json`
- `src/styles/design-system-colors.css`

### Images
- `reports/design-analysis/image-audit-report.json`
- `reports/design-analysis/image-audit-report.html`
- `reports/design-analysis/image-alt-fixes.json`
- `reports/design-analysis/image-compression-commands.json`

### Icons
- `reports/design-analysis/icon-audit-report.json`

### Design Analysis
- `reports/design-analysis/design_summary.json`
- `reports/design-analysis/extracted_images.json`
- `reports/design-analysis/design_components.json`
- `reports/design-analysis/css_colors.json`

---

## 🐛 Troubleshooting

### Color Scripts
**Problem:** Colors not mapping correctly
```bash
# Check color format
cat reports/design-analysis/css_colors.json | jq '.colors_by_type.hex[0:5]'

# Verify design system colors
cat src/styles/design-system-colors.css
```

### Image Scripts
**Problem:** Images not found
```bash
# Check image directory
ls -la public/images/

# Verify paths in report
cat reports/design-analysis/image-audit-report.json | jq '.byCategory'
```

### Icon Scripts
**Problem:** Icons not generating components
```bash
# Check SVG structure
cat public/icons/email.svg

# Verify component was created
ls src/components/icons/
```

---

## 📚 Related Documentation

- [Design System](./DESIGN_SYSTEM.md)
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- [Scraping Assistant Setup](../docs/SCRAPING_ASSISTANT_SETUP.md)

---

*Last updated: January 25, 2025*

