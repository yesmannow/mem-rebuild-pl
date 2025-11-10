# Asset Audit Guide

## Overview

The Asset Audit system provides comprehensive tools to detect duplicate files, unused assets, and help maintain a clean codebase. This guide explains how to use each tool and best practices for safe cleanup.

## Quick Start

### Run Complete Audit

```bash
npm run audit:assets
```

This runs all detection scripts and generates a comprehensive report in `reports/asset-audit-report.json` and `reports/asset-audit-report.html`.

### Review Findings

1. Open `reports/asset-audit-report.html` in your browser for a visual summary
2. Review individual JSON reports in the `reports/` directory
3. Check recommendations in the summary report

### Safe Cleanup

```bash
# Dry-run mode (default - shows what would be deleted)
npm run cleanup:duplicates

# Interactive mode (prompts before each deletion)
npm run cleanup:interactive

# Auto mode (deletes with confirmation - use with caution)
npm run cleanup:auto
```

## Available Scripts

### Detection Scripts

#### `audit:duplicates`
Finds duplicate files by content hash and filename.

```bash
npm run audit:duplicates
```

**Output**: `reports/duplicates-report.json`

**Finds**:
- Content-based duplicates (same file content, different locations)
- Name-based duplicates (same filename, different locations)
- Similar filenames (handles hyphenated variants like "riley bennett egloff.json" vs "riley-bennett-egloff.json")

#### `audit:unused`
Finds unused images, components, and animations.

```bash
npm run audit:unused
```

**Output**: `reports/unused-assets-report.json`

**Finds**:
- Unused images in `public/images/`
- Unused components in `src/components/`
- Unused animation components in `src/components/animations/`

#### `audit:moodboards`
Detects duplicate moodboard JSON files with similar names.

```bash
npm run audit:moodboards
```

**Output**: `reports/moodboard-duplicates-report.json`

**Finds**:
- Duplicate moodboard files (e.g., "riley bennett egloff.json" vs "riley-bennett-egloff.json")
- Compares content to determine if duplicates or different versions

#### `audit:svgs`
Detects duplicate SVG files in case-study folders.

```bash
npm run audit:svgs
```

**Output**: `reports/svg-duplicates-report.json`

**Finds**:
- Exact duplicate SVGs (same content)
- Normalized duplicates (same content, different formatting)
- Targets specific files: `after.svg`, `before.svg`, `cover.svg`, `gallery-1.svg`, `gallery-2.svg`

#### `audit:animations`
Tracks usage of animation components.

```bash
npm run audit:animations
```

**Output**: `reports/unused-animations-report.json`

**Finds**:
- Unused animation components in `src/components/animations/`
- Checks imports and JSX usage

#### `audit:assets`
Runs all detection scripts and generates comprehensive report.

```bash
npm run audit:assets
```

**Output**:
- `reports/asset-audit-report.json` (detailed JSON report)
- `reports/asset-audit-report.html` (visual HTML report)

### Cleanup Scripts

#### `cleanup:duplicates`
Dry-run mode - shows what would be deleted without actually deleting.

```bash
npm run cleanup:duplicates
```

#### `cleanup:unused`
Dry-run mode for unused files only.

```bash
npm run cleanup:unused
```

#### `cleanup:interactive`
Interactive mode - prompts before each deletion.

```bash
npm run cleanup:interactive
```

#### `cleanup:auto`
Auto mode - deletes files automatically with confirmation prompt.

```bash
npm run cleanup:auto
```

⚠️ **Warning**: Auto mode will delete files. Always review reports first!

## Understanding Reports

### Duplicate Report Structure

```json
{
  "summary": {
    "contentDuplicates": 5,
    "nameDuplicates": 2,
    "similarNames": 3,
    "totalWastedSpace": 1024000
  },
  "contentDuplicates": [
    {
      "hash": "abc123...",
      "original": {
        "path": "public/images/logo.png",
        "size": 1024
      },
      "duplicates": [
        {
          "path": "public/images/backup/logo.png",
          "size": 1024
        }
      ],
      "wastedSpace": 1024
    }
  ]
}
```

### Unused Assets Report Structure

```json
{
  "summary": {
    "unusedImages": 10,
    "unusedComponents": 2,
    "unusedAnimations": 1,
    "totalUnusedSize": 2048000
  },
  "unusedImages": [
    {
      "path": "/images/old-photo.jpg",
      "size": 204800
    }
  ]
}
```

## Best Practices

### 1. Always Start with Dry-Run

Before deleting anything, always run in dry-run mode:

```bash
npm run cleanup:duplicates
```

This shows you exactly what would be deleted without actually deleting anything.

### 2. Review Reports Thoroughly

- Check the HTML report for a visual overview
- Review JSON reports for detailed information
- Pay attention to recommendations

### 3. Use Interactive Mode for First Cleanup

When cleaning up for the first time, use interactive mode:

```bash
npm run cleanup:interactive
```

This gives you control over each deletion.

### 4. Backup Important Files

The cleanup tool automatically creates backups in `.cleanup-backup/` directory when deleting files. However, it's still good practice to:

- Commit your changes to git before cleanup
- Review the backup directory after cleanup
- Keep backups until you're confident the cleanup was successful

### 5. Clean Up in Phases

Don't try to clean everything at once:

1. **Phase 1**: Remove obvious duplicates (exact content matches)
2. **Phase 2**: Review and remove unused images
3. **Phase 3**: Review and remove unused components (be more cautious)
4. **Phase 4**: Review moodboard duplicates (may have different content)

### 6. Test After Cleanup

After cleanup, always:

```bash
npm run build
npm run typecheck
npm run lint
```

Make sure everything still works!

## Configuration

Edit `asset-audit.config.json` to customize detection rules:

```json
{
  "excludePaths": [
    "node_modules",
    ".git",
    "dist"
  ],
  "whitelist": [
    "src/main.tsx",
    "public/sw.js"
  ],
  "minFileSize": 1024,
  "similarityThreshold": 0.95
}
```

### Configuration Options

- **excludePaths**: Directories to exclude from scanning
- **excludePatterns**: File patterns to exclude (e.g., `*.test.ts`)
- **whitelist**: Files that should never be deleted
- **minFileSize**: Minimum file size to consider (in bytes)
- **similarityThreshold**: Threshold for considering files similar (0-1)

## Common Scenarios

### Scenario 1: Finding Duplicate Moodboards

```bash
# Run moodboard duplicate detection
npm run audit:moodboards

# Review the report
cat reports/moodboard-duplicates-report.json

# Clean up duplicates interactively
npm run cleanup:interactive
```

### Scenario 2: Finding Unused Images

```bash
# Find unused images
npm run audit:unused

# Review unused images
cat reports/unused-assets-report.json | grep unusedImages

# Clean up unused images only
npm run cleanup:unused
```

### Scenario 3: Finding Duplicate SVGs in Case Studies

```bash
# Find duplicate SVGs
npm run audit:svgs

# Review the report
open reports/svg-duplicates-report.html

# Clean up duplicates
npm run cleanup:duplicates
```

### Scenario 4: Complete Cleanup Workflow

```bash
# 1. Run complete audit
npm run audit:assets

# 2. Review HTML report
open reports/asset-audit-report.html

# 3. Clean up duplicates (dry-run first)
npm run cleanup:duplicates

# 4. If satisfied, run interactive cleanup
npm run cleanup:interactive

# 5. Test the build
npm run build

# 6. Commit changes
git add .
git commit -m "chore: remove duplicate and unused files"
```

## Troubleshooting

### Script Fails to Run

**Problem**: Script fails with "Cannot find module"

**Solution**: Make sure you're running from the project root and Node.js is installed.

### Too Many False Positives

**Problem**: Script reports files as unused but they are actually used

**Solution**:
- Check if files are referenced dynamically
- Add files to whitelist in `asset-audit.config.json`
- Review the detection logic in the script

### Cleanup Deleted Important Files

**Problem**: Important files were deleted

**Solution**:
- Check `.cleanup-backup/` directory for backups
- Restore from git if needed: `git checkout <file>`
- Add files to whitelist to prevent future deletion

### Reports Not Generated

**Problem**: Reports directory doesn't exist

**Solution**: Scripts automatically create the `reports/` directory. If it's missing, create it manually:

```bash
mkdir -p reports
```

## Safety Features

The cleanup tool includes several safety features:

1. **Dry-run by default**: Never deletes files unless explicitly requested
2. **Whitelist protection**: Important files are never deleted
3. **Automatic backups**: Files are backed up before deletion
4. **Deletion logs**: All deletions are logged for audit trail
5. **Interactive prompts**: User confirmation for each deletion in interactive mode

## Integration with CI/CD

You can integrate asset audits into your CI/CD pipeline:

```yaml
# .github/workflows/asset-audit.yml
name: Asset Audit

on:
  pull_request:
    branches: [main]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run audit:assets
      - name: Upload reports
        uses: actions/upload-artifact@v3
        with:
          name: asset-audit-reports
          path: reports/
```

## Advanced Usage

### Running Specific Detectors Only

```bash
# Only check for duplicates
npm run audit:duplicates

# Only check for unused assets
npm run audit:unused

# Skip specific detectors in unified audit
node scripts/asset-audit.js --skip-moodboards --skip-svgs
```

### Custom Cleanup

```bash
# Only clean duplicates (not unused files)
node scripts/cleanup-duplicates.js --duplicates-only --dry-run

# Only clean unused files (not duplicates)
node scripts/cleanup-duplicates.js --unused-only --interactive
```

## Report Locations

All reports are saved in the `reports/` directory:

- `duplicates-report.json` - Content and name duplicates
- `unused-assets-report.json` - Unused images, components, animations
- `moodboard-duplicates-report.json` - Duplicate moodboard files
- `svg-duplicates-report.json` - Duplicate SVG files
- `unused-animations-report.json` - Unused animation components
- `asset-audit-report.json` - Comprehensive summary
- `asset-audit-report.html` - Visual HTML report
- `cleanup-log-*.json` - Cleanup operation logs

## Getting Help

If you encounter issues:

1. Check the report files for detailed error information
2. Review the script source code in `scripts/` directory
3. Check the configuration in `asset-audit.config.json`
4. Review cleanup logs in `reports/cleanup-log-*.json`

## Summary

The Asset Audit system provides powerful tools to maintain a clean codebase:

- ✅ Detect duplicates by content and name
- ✅ Find unused images, components, and animations
- ✅ Safe cleanup with dry-run and backup features
- ✅ Comprehensive reporting with HTML and JSON outputs
- ✅ Configurable detection rules
- ✅ CI/CD integration ready

Start with `npm run audit:assets` to get a complete overview of your codebase!

