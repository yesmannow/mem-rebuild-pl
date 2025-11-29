# Image Organization Issues

This document identifies images that need to be merged or moved to different locations.

## 🔄 Duplicates Found (11 sets)

These images exist in both `projects/` and `side-projects/` directories:

### 1. **317 BBQ Logo** ⚠️ NEEDS DECISION
- ✅ USED: `projects/317 bbq/317BBQLogo_wht.webp`
- ✅ USED: `side-projects/317bbqlogo_wht.avif`
- ✅ USED: `side-projects/317bbqlogo_wht.png`
- ✅ USED: `side-projects/317bbqlogo_wht.webp`

**Action**: Since 317 BBQ is a project, keep the version in `projects/317 bbq/` and remove duplicates from `side-projects/`.

### 2. **Primary Care Indy Logo** ❌ UNUSED DUPLICATES
- ✅ USED: `projects/Primarycare Indy/Primary Care Logo with PMC.png`
- ❌ UNUSED: `side-projects/primarycare indy logo.avif`
- ❌ UNUSED: `side-projects/primarycare indy logo.png`
- ❌ UNUSED: `side-projects/primarycare indy logo.webp`

**Action**: Delete the unused versions in `side-projects/` since the project version is being used.

### 3. **Cropped PC Logo** ✅ USED
- ✅ USED: `side-projects/cropped-pc_logo1-1024x174.avif`
- ✅ USED: `side-projects/cropped-PC_LOGO1-1024x174.jpg`
- ✅ USED: `side-projects/cropped-pc_logo1-1024x174.webp`

**Action**: These are used for "Primary Colours" project. Keep in `side-projects/` (correct location).

### 4. **Interior Images** ✅ USED
- ✅ USED: `side-projects/interior_sl.avif`, `.jpg`, `.webp`
- ✅ USED: `side-projects/interior_w3.avif`, `.jpg`, `.webp`

**Action**: These appear to be used. Keep in `side-projects/` if they're for side projects, or move to appropriate project folder if they belong to a specific project.

### 5. **Other Duplicates** ✅ USED
- `my-post-2.*` - Used in side-projects
- `occ-health-header.*` - Used in side-projects
- `online-doctor-consultation-instagram-post.*` - Used in side-projects
- `painting_illustration_01.*` - Used in side-projects
- `skincare-for-dogs-and-cats.*` - Used in side-projects
- `what-we-treat-1.*` - Used in side-projects

**Action**: Review each to determine if they belong to a specific project or should stay in side-projects.

## 📍 Location Mismatches (8 files)

Files in `side-projects/` that should probably be in `projects/`:

### 1. **317 BBQ Files** → Move to `projects/317 bbq/`
- `side-projects/317-bbq.svg` (placeholder)
- `side-projects/317bbqlogo_wht.avif`
- `side-projects/317bbqlogo_wht.png`
- `side-projects/317bbqlogo_wht.webp`

**Action**: Move these to `projects/317 bbq/` since 317 BBQ is a main project.

### 2. **Primary Care Indy** → Already in projects, delete from side-projects
- ❌ UNUSED: `side-projects/primarycare indy logo.avif`
- ❌ UNUSED: `side-projects/primarycare indy logo.png`
- ❌ UNUSED: `side-projects/primarycare indy logo.webp`

**Action**: Delete these - the project version is being used.

### 3. **Black Letter Placeholder** → Move or Delete
- ❌ UNUSED: `side-projects/black-letter-placeholder.svg`

**Action**: Either move to `projects/Black Letter/` if it's needed, or delete if it's truly unused.

## 🗑️ Unused Files Summary

### In `projects/` (19 files)
- Project logos that are unused (likely replaced by newer versions)
- Multiple format duplicates (.png, .webp, .avif) where only one format is used

### In `side-projects/` (7 files)
- Unused logo variations
- Placeholder SVGs

## 📋 Recommended Actions

### Priority 1: Clean Up Duplicates
1. **317 BBQ**: Keep `projects/317 bbq/317BBQLogo_wht.webp`, delete duplicates from `side-projects/`
2. **Primary Care Indy**: Delete unused versions from `side-projects/` (already have project version)
3. **Review other duplicates**: Determine which location is correct for each

### Priority 2: Move Mismatched Files
1. Move 317 BBQ files from `side-projects/` to `projects/317 bbq/`
2. Delete or move Black Letter placeholder

### Priority 3: Clean Up Unused
1. Run `npm run cleanup:unused:dry` to preview
2. Review and delete unused files
3. Consider consolidating multiple formats (keep .webp, delete .png/.avif if unused)

## 🛠️ Quick Commands

```bash
# Analyze organization issues
node scripts/analyze-image-organization.js

# Preview what would be deleted
npm run cleanup:unused:dry

# Clean up unused files (with confirmation)
npm run cleanup:unused

# Interactive cleanup (prompt for each file)
npm run cleanup:unused:interactive
```

## 📊 Current Status

- **Total duplicates**: 11 sets
- **Location mismatches**: 8 files
- **Unused in projects/**: 19 files
- **Unused in side-projects/**: 7 files
- **Total unused images**: 215 files (~8.83 MB)

