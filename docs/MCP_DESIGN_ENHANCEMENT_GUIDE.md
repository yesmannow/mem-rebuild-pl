# MCP & CLI Tools for Design Enhancement

## Overview

This guide shows how to use MCP browser tools and CLI scripts to enhance your portfolio design by analyzing reference sites and generating new components.

## Available Tools

### 1. **Design Analysis Scripts**

#### `npm run design:analyze`
Analyzes reference sites (Emma Johnson, Aliah Johnson, Harvey Oliver, GTE, Janar Siniloo) to extract:
- Color palettes
- Typography systems
- Animation patterns
- Layout structures
- Interactive elements

**Output**: `data/design-analysis/extracted-patterns.json`

#### `npm run design:generate`
Generates new interactive components based on analysis:
- `KineticHeadline.tsx` - Word-by-word animated reveals (Aliah Johnson style)
- `SplitGridSection.tsx` - Asymmetric split-screen layouts (Harvey Oliver style)
- `InteractiveDataOverlay.tsx` - Hover-triggered data visualizations (Janar Siniloo style)
- `ServiceLadder.tsx` - Four-tall service modules with stacked card effects

**Output**: `src/components/interactive/`

#### `npm run design:optimize`
Analyzes your current design system to:
- Count new token usage (signal-500, telemetry-400, ink colors)
- Find remaining old gradient patterns
- Calculate migration score
- Generate recommendations

**Output**: `data/design-analysis/design-system-report.json`

#### `npm run design:all`
Runs all three scripts in sequence.

---

## Using MCP Browser Tools

### Step 1: Navigate to Reference Site

```javascript
// In Cursor, use MCP browser tools:
mcp_cursor-browser-extension_browser_navigate({
  url: "https://emmajohnson.webflow.io/"
})
```

### Step 2: Extract Design Patterns

```javascript
// Extract colors
mcp_cursor-browser-extension_browser_evaluate({
  function: `
    (() => {
      const colors = new Set();
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        const color = style.color;
        // Extract hex values...
      });
      return { colors: Array.from(colors) };
    })();
  `
})

// Extract typography
mcp_cursor-browser-extension_browser_evaluate({
  function: `
    (() => {
      const fonts = new Set();
      document.querySelectorAll('h1, h2, h3, p').forEach(el => {
        fonts.add(window.getComputedStyle(el).fontFamily);
      });
      return { fonts: Array.from(fonts) };
    })();
  `
})

// Extract animation patterns
mcp_cursor-browser-extension_browser_evaluate({
  function: `
    (() => {
      const animations = [];
      const styleSheets = Array.from(document.styleSheets);
      styleSheets.forEach(sheet => {
        try {
          Array.from(sheet.cssRules).forEach(rule => {
            if (rule.type === CSSRule.KEYFRAMES_RULE) {
              animations.push(rule.name);
            }
          });
        } catch(e) {}
      });
      return { animations };
    })();
  `
})
```

### Step 3: Analyze Layout Structure

```javascript
mcp_cursor-browser-extension_browser_snapshot()
// This gives you the page structure to analyze layouts
```

### Step 4: Save Extracted Data

Use the helper functions from `scripts/mcp-extraction-helpers.js`:

```javascript
import { updateBrandData } from './scripts/mcp-extraction-helpers.js';

updateBrandData("emma-johnson", {
  colors: ["#...", "#..."],
  fonts: ["Fraunces", "Space Grotesk"],
  animations: ["fadeIn", "slideUp"],
  layout: "split-screen",
  extractedAt: new Date().toISOString()
});
```

---

## Generated Components Usage

### KineticHeadline

```tsx
import { KineticHeadline } from '@/components/interactive/KineticHeadline';

<KineticHeadline
  text="From hypothesis to pipeline"
  delay={0.2}
/>
```

### SplitGridSection

```tsx
import { SplitGridSection } from '@/components/interactive/SplitGridSection';

<SplitGridSection
  leftContent={<div>Left content</div>}
  rightContent={<div>Right content</div>}
  reverse={false}
/>
```

### InteractiveDataOverlay

```tsx
import { InteractiveDataOverlay } from '@/components/interactive/InteractiveDataOverlay';

<InteractiveDataOverlay
  data={[
    { label: 'Projects', value: '200+', description: 'Delivered' },
    { label: 'Revenue', value: '$50M+', description: 'Influenced' }
  ]}
  trigger="hover"
/>
```

### ServiceLadder

```tsx
import { ServiceLadder } from '@/components/interactive/ServiceLadder';

<ServiceLadder
  services={[
    {
      number: '01',
      title: 'Systems Architecture',
      description: 'Build scalable infrastructure...',
      icon: '🏗️'
    },
    // ... more services
  ]}
/>
```

---

## Image Optimization

### Organize Images

```bash
# Normalize filenames
npm run images:normalize

# Build optimized versions
npm run images:build:all

# Generate datasets
npm run datasets:build
```

### Recommended Image Structure

```
public/images/
  ├── hero/
  │   └── portrait.webp (from bio/)
  ├── case-studies/
  │   └── [slug]/
  │       ├── thumbnail.webp
  │       └── hero.webp
  └── projects/
      └── [slug]/
          └── images/
```

---

## Performance Analysis

### Lighthouse Audit

```bash
# Run Lighthouse audit
npm run audit:lighthouse

# Or use the script directly
node scripts/lighthouse-audit.js http://localhost:4173 --device=desktop
```

### Accessibility Check

```bash
npm run a11y:smoke
npm run audit:accessibility
```

---

## Next Steps

1. **Run Design Analysis**: `npm run design:all`
2. **Review Generated Components**: Check `src/components/interactive/`
3. **Integrate Components**: Add to your pages
4. **Use MCP Browser Tools**: Analyze reference sites for more patterns
5. **Optimize Images**: Organize and optimize image assets
6. **Run Performance Audit**: Check Lighthouse scores

---

## Example Workflow

```bash
# 1. Generate components
npm run design:generate

# 2. Analyze design system
npm run design:optimize

# 3. Optimize images
npm run images:all

# 4. Build and test
npm run build
npm run preview

# 5. Run audits
npm run audit:all
```

---

## MCP Browser Tool Reference

| Tool | Purpose | Example |
|------|---------|---------|
| `browser_navigate` | Navigate to URL | Navigate to reference site |
| `browser_snapshot` | Get page structure | Analyze layout |
| `browser_evaluate` | Run JavaScript | Extract colors, fonts, animations |
| `browser_click` | Click elements | Interact with page |
| `browser_wait_for` | Wait for content | Wait for animations to load |

---

**Status**: Tools ready to use. Run `npm run design:all` to get started!

