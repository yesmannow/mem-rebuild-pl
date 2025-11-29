# Cleanup Unused Files Guide

This guide explains how to find and remove unused files and images from your project.

## Quick Start

### 1. Find Unused Files

First, identify which files are unused:

```bash
npm run audit:unused
```

This generates a report at `reports/unused-assets-report.json` listing all unused images, components, and animations.

### 2. Preview What Will Be Deleted (Dry Run)

Before deleting anything, preview what would be removed:

```bash
npm run cleanup:unused:dry
```

This shows you:
- How many files would be deleted
- Total size that would be freed
- A sample of files that would be removed
- Files that would be skipped (protected files)

### 3. Delete Unused Files

Once you've reviewed the dry run, you can delete the unused files:

**Option A: Automatic (with confirmation)**
```bash
npm run cleanup:unused
```

**Option B: Interactive (prompt for each file)**
```bash
npm run cleanup:unused:interactive
```

**Option C: Force (no prompts)**
```bash
node scripts/cleanup-unused-files.js --force
```

## What Gets Cleaned Up?

### Images
- Unused image files (`.jpg`, `.png`, `.webp`, `.avif`, `.svg`)
- Duplicate formats of unused images (e.g., if `.webp` is unused, also removes `.jpg` and `.avif` versions)
- Empty directories left after cleanup

### Protected Files
The following files are **never deleted**:
- `manifest.json` files
- Favicon files
- Logo files (matching `/logo.*\.(svg|png|webp)$/i`)
- Open Graph images (`/og/*.svg`)
- Files in `_archive_media` directory
- Files in `node_modules`, `.git`, `dist`, `build`, `archive` directories

## Script Options

### `scripts/cleanup-unused-files.js`

**Flags:**
- `--dry-run`: Preview what would be deleted without actually deleting
- `--images-only`: Only clean up images (default)
- `--all`: Clean up all unused files (images, components, etc.)
- `--interactive`: Prompt before deleting each file
- `--force`: Skip confirmation prompts

**Examples:**
```bash
# Dry run (safe, just preview)
node scripts/cleanup-unused-files.js --dry-run

# Interactive mode (prompt for each file)
node scripts/cleanup-unused-files.js --interactive

# Force delete (no prompts)
node scripts/cleanup-unused-files.js --force

# Clean up everything (not just images)
node scripts/cleanup-unused-files.js --all
```

## How It Works

1. **Scan Source Files**: The script scans all `.ts`, `.tsx`, `.js`, `.jsx`, `.css`, and `.json` files in your project to find image references.

2. **Find Image References**: It looks for:
   - Import statements: `import img from '...'`
   - JSX src attributes: `<img src="..." />`
   - CSS background-image: `url(...)`
   - JSON data files with image paths

3. **Compare with Actual Files**: Compares referenced images with actual files in `public/images/` and `public/apps/`.

4. **Identify Unused Files**: Files that exist but aren't referenced anywhere are marked as unused.

5. **Clean Up**: Deletes unused files and removes empty directories.

## Current Status

Based on the latest scan:
- **215 unused images** found
- **~8.83 MB** of unused files
- **360 total files** that could be cleaned (including duplicate formats)

## Safety Features

1. **Dry Run by Default**: Always test with `--dry-run` first
2. **Protected Files**: Important files are never deleted
3. **Confirmation Prompts**: Asks for confirmation before deleting (unless `--force`)
4. **Error Handling**: Continues even if some files fail to delete
5. **Detailed Report**: Shows exactly what was deleted, skipped, or errored

## Troubleshooting

### "No unused assets report found"
The script will automatically run `find-unused-assets.js` to generate the report. If it fails, run it manually:
```bash
npm run audit:unused
```

### Files are being skipped unexpectedly
Check if the file matches any of the protected patterns. You can review skipped files in the summary output.

### Want to keep a specific file
If a file is marked as unused but you want to keep it:
1. Add a reference to it in your code (even a comment)
2. Move it to a protected directory like `_archive_media`
3. Use interactive mode and skip it when prompted

## Best Practices

1. **Always run dry-run first**: `npm run cleanup:unused:dry`
2. **Review the output**: Check the list of files that would be deleted
3. **Use interactive mode for important cleanups**: `npm run cleanup:unused:interactive`
4. **Commit before cleanup**: Make sure your work is committed before running cleanup
5. **Run regularly**: Clean up unused files periodically to keep the project lean

## Related Scripts

- `npm run audit:unused` - Find unused assets
- `npm run check:images` - Validate image references
- `npm run cleanup:assets` - Clean up other asset types
- `npm run cleanup:full` - Full cleanup (archive, assets, originals, optimize)

