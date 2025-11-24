# Color Refactoring Guide

**Status:** ✅ Scripts Complete | ⏳ Refactoring In Progress
**Date:** January 25, 2025

---

## Overview

This guide documents the complete color system refactoring process, mapping 394 colors to the 11-color design system palette.

---

## Color Mapping Strategy

### Design System Palette (11 Colors)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#005AE2` | CTAs, interactive accents |
| `--color-secondary` | `#23D2D5` | Links, highlights, hover states |
| `--color-accent` | `#FFD600` | Chips, highlights, UI accents |
| `--color-surface` | `#F6F8FA` | Cards, backgrounds |
| `--color-neutral-1` | `#111827` | Headings, high-contrast text |
| `--color-neutral-2` | `#6B7280` | Meta, secondary text |
| `--color-success` | `#34D399` | Success, positive badges |
| `--color-warning` | `#F59E42` | Alert, warning icons |
| `--color-danger` | `#EF4444` | Error state, destructive actions |
| `--color-light` | `#FFFFFF` | Backgrounds, surfaces |
| `--color-dark` | `#1B263B` | Footer, dark mode backgrounds |

### Additional Tokens (Neutral Scale)

For edge cases requiring more granular control:

- `--color-neutral-50` through `--color-neutral-900` (full scale)
- Legacy compatibility tokens maintained

---

## Mapping Results

### Summary Statistics

- **Total Colors Found:** 394
- **Unique Colors:** 98
- **Exact Matches:** 5 colors
- **Close Matches (<20 distance):** 23 colors
- **Far Matches (20-50 distance):** 31 colors
- **Unmapped (mapped to closest):** 39 colors
- **Mapped Percentage:** 25%

### Mapping Decisions

#### Primary Colors
- `#2563eb` → `--color-primary` (distance: 39) - Blue variant, closest to primary
- `#3b82f6` → `--color-primary` (distance: 45) - Electric blue, primary variant
- `#60a5fa` → `--color-primary` (distance: 52) - Light blue, primary variant

#### Secondary Colors
- `#06b6d4` → `--color-secondary` (distance: 40) - Cyan, close to secondary
- `#22d3ee` → `--color-secondary` (distance: 25) - Light cyan, secondary variant
- `#35e0ff` → `--color-secondary` (distance: 48) - Bright cyan, secondary variant
- `#3CC6C4` → `--color-secondary` (distance: 33) - Turquoise, secondary variant

#### Accent Colors
- `#facc15` → `--color-accent` (distance: 24) - Yellow, accent variant
- `#ffbe0b` → `--color-accent` (distance: 26) - Golden yellow, accent variant

#### Neutral Colors
- All dark variants (`#0a0a0a`, `#0b0b0c`, `#0d0d0f`, etc.) → `--color-neutral-1`
- All medium grays → `--color-neutral-2`
- All light grays → `--color-surface`

#### Semantic Colors
- `#10b981` → `--color-success` (distance: 35) - Green, success variant
- `#f59e0b` → `--color-warning` (distance: 24) - Orange, warning variant
- `#ff6b3d` → `--color-danger` (distance: 43) - Red-orange, danger variant

### Edge Cases Requiring New Tokens

**None identified.** All colors can be mapped to existing tokens with acceptable visual similarity.

---

## Refactoring Process

### Step 1: Review Mappings

```bash
# View complete mapping
cat reports/design-analysis/enhanced-color-mapping.json | jq '.mappings'

# View unmapped colors
cat reports/design-analysis/enhanced-color-mapping.json | jq '.mappings.unmapped[0:10]'
```

### Step 2: Dry Run Refactoring

```bash
# Preview changes without modifying files
npm run design:refactor-colors --dry-run

# Review report
cat reports/design-analysis/color-refactor-report.json | jq '.summary'
```

### Step 3: Apply Refactoring

```bash
# Apply color replacements
npm run design:refactor-colors:apply

# Verify changes
git diff src/styles/
```

### Step 4: Manual Review

Some cases require manual review:

1. **RGB with opacity:** Colors like `rgb(0 0 0 / 0.5)` need opacity preserved
2. **HSL variables:** `hsl(var(--accent))` should remain as-is
3. **Dynamic colors:** Colors in JavaScript calculations may need special handling

### Step 5: Test & Verify

```bash
# Build and test
npm run build

# Check for remaining hardcoded colors
grep -r "#[0-9a-fA-F]\{6\}" src/ --exclude-dir=node_modules | head -20
```

---

## File-by-File Refactoring

### CSS Files Priority

1. **High Priority:**
   - `src/styles/tokens.css` - Core design tokens
   - `src/styles/globals.css` - Global styles
   - `src/styles/design-system-colors.css` - Color system

2. **Medium Priority:**
   - `src/styles/case-study-tokens.css` - Case study colors
   - Component CSS files in `src/components/**/*.css`

3. **Low Priority:**
   - Page-specific CSS files
   - Utility CSS files

### React Component Priority

1. **High Priority:**
   - Shared components (`src/components/ui/`)
   - Layout components (`src/components/layout/`)

2. **Medium Priority:**
   - Feature components (`src/components/sections/`)
   - Interactive components

3. **Low Priority:**
   - Page-specific components

---

## Example Refactorings

### Before (Hardcoded)
```css
.button {
  background: #005AE2;
  color: #FFFFFF;
  border: 1px solid #111827;
}

.button:hover {
  background: #23D2D5;
}
```

### After (CSS Variables)
```css
.button {
  background: var(--color-primary);
  color: var(--color-light);
  border: 1px solid var(--color-neutral-1);
}

.button:hover {
  background: var(--color-secondary);
}
```

### Before (React Component)
```tsx
<div style={{ backgroundColor: '#005AE2', color: '#FFFFFF' }}>
  Content
</div>
```

### After (CSS Variables)
```tsx
<div style={{
  backgroundColor: 'var(--color-primary)',
  color: 'var(--color-light)'
}}>
  Content
</div>
```

Or better, use CSS classes:
```tsx
<div className="bg-primary text-light">
  Content
</div>
```

---

## Migration Status

### Completed ✅
- [x] Color mapping analysis
- [x] Enhanced mapping script
- [x] Refactoring script created
- [x] CSS variables file generated

### In Progress ⏳
- [ ] CSS files refactored
- [ ] React components refactored
- [ ] Tailwind config updated
- [ ] Visual testing completed

### Pending 📋
- [ ] Accessibility verification
- [ ] Dark mode testing
- [ ] Performance impact assessment

---

## Troubleshooting

### Issue: Colors not updating
**Solution:** Clear browser cache, verify CSS variable syntax

### Issue: Opacity lost in RGB colors
**Solution:** Manual review needed - preserve opacity with CSS custom properties

### Issue: Dynamic colors in JavaScript
**Solution:** Create helper functions to map colors to tokens

```typescript
// Example helper
function getColorToken(color: string): string {
  const colorMap: Record<string, string> = {
    '#005AE2': 'var(--color-primary)',
    '#23D2D5': 'var(--color-secondary)',
    // ... etc
  };
  return colorMap[color] || color;
}
```

---

## Next Steps

1. Run refactoring script on all files
2. Manual review of edge cases
3. Update Tailwind configuration
4. Test all pages for visual consistency
5. Verify accessibility (WCAG AA contrast)
6. Document any exceptions

---

*This guide is updated as refactoring progresses.*

