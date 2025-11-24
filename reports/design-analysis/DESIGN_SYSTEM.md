# JD-Marketing Portfolio — Design System

A living document for building a unique, cohesive, and professional design language for mem-rebuild-pl.  
**Goal**: Impress marketing teams and hiring managers with clear branding, visual polish, and technical excellence.

---

## 1. Color Palette

**Strategy**: Curate a palette of 8–12 colors supporting accessibility, clarity, and brand personality.

| Role         | Hex       | Description                           |
|--------------|-----------|---------------------------------------|
| Primary      | #005AE2   | CTAs, interactive accents             |
| Secondary    | #23D2D5   | Links, highlights, hover states       |
| Accent       | #FFD600   | Chips, highlights, UI accents         |
| Surface      | #F6F8FA   | Cards, backgrounds                    |
| Neutral 1    | #111827   | Headings, high-contrast text          |
| Neutral 2    | #6B7280   | Meta, secondary text                  |
| Success      | #34D399   | Success, positive badges              |
| Warning      | #F59E42   | Alert, warning icons                  |
| Danger       | #EF4444   | Error state, destructive actions      |
| Light        | #FFFFFF   | Backgrounds, surfaces                 |
| Dark         | #1B263B   | Footer, dark mode backgrounds         |

**SCSS Example:**
```scss
$color-primary:   #005AE2;
$color-secondary: #23D2D5;
$color-accent:    #FFD600;
$color-surface:   #F6F8FA;
$color-neutral-1: #111827;
$color-neutral-2: #6B7280;
$color-success:   #34D399;
$color-warning:   #F59E42;
$color-danger:    #EF4444;
$color-light:     #FFFFFF;
$color-dark:      #1B263B;
```
**Action:**  
- Run `css_colors.json` through a consolidation script to enforce these tokens.
- Refactor style files and components to use new variables.

---

## 2. Typography

**Font Stack:**
- **Display/Headings:** Fraunces (variable, 700–900)
- **Body:** Space Grotesk (weights 300–700)
- **Code/snippets:** IBM Plex Mono (regular/italic)

**Usage Guide:**
- H1, H2: Fraunces, large, tight line-height
- H3–H6/Subhead: Space Grotesk, 500/600
- Body/Paragraph: Space Grotesk, 400
- Labels: Space Grotesk, 300 or IBM Plex Mono
- Code: IBM Plex Mono, 400

**CSS Example:**
```css
:root {
  --font-display: "Fraunces", serif;
  --font-body: "Space Grotesk", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}
h1, h2 { font-family: var(--font-display); font-weight: 900; }
h3, h4, h5, h6 { font-family: var(--font-body); }
body, p, li { font-family: var(--font-body); font-weight: 400; }
code, pre { font-family: var(--font-mono); }
```

---

## 3. Images & Visual Content

**Image Curation Instructions (AI/CLI-ready):**
- Search in `C:\Users\hoosi\Desktop\jd-marketing-port\mem-rebuild-pl\public\images` and all subfolders.
- Select only:
  - Bio/user photos
  - Portfolio/project screenshots (before/after, process, campaign visuals)
  - SVG diagrams or marketing workflows
  - Relevant brand/stats/award images

**Sample Node.js Script:**
```js
// list_images.js
const fs = require('fs');
const path = require('path');
const exts = ['.png','.jpg','.jpeg','.svg','.webp'];
function walk(dir, fileList=[]) {
  fs.readdirSync(dir).forEach(f => {
    let full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full, fileList);
    else if (exts.includes(path.extname(f).toLowerCase())) fileList.push(full);
  });
  return fileList;
}
console.log(walk('C:/Users/hoosi/Desktop/jd-marketing-port/mem-rebuild-pl/public/images'));
```

**Action:**  
- Run curation script, filter for images relevant to your marketing story.
- Add project/process visuals and descriptive alt text.
- Augment with additional assets from Unsplash, SVGRepo, or competitor inspiration.

---

## 4. Icon System

**Expansion Strategy:**
- Inventory existing uses (menu, buttons, social, features)
- Target min. 12–16 custom or curated icons (outline style, 2px stroke, round ends).
- Match your color palette (primary, secondary, accent for active/focus states).
- Add icons for: About, Projects, Skills/Tools, Download, Email, LinkedIn, GitHub, X, PDF, Awards, Success/Warning/Error.

**Asset Sources:**
- Open-source libraries:  
  - [phosphoricons.com](https://phosphoricons.com/) (customize colors easily)
  - [lucide.dev](https://lucide.dev/)
  - [iconoir.com](https://iconoir.com/)
  - [svg-repo.com/collection/marketing](https://www.svgrepo.com/collection/marketing/)
- Download as SVG, optimize with [SVGOMG](https://jakearchibald.github.io/svgomg/)

**MCP/CLI Tooling Example:**
- Script to add new SVG icons:
```bash
# Add SVG to your icon directory, rename to kebab-case
cp ./new-icon.svg ./public/icons/my-new-icon.svg
# Optionally, create a CLI helper
npm run icon:add 'my-new-icon' ./new-icon.svg
# Or MCP custom task to validate, optimize, register new icon
```
Integrate icons as React components (or use library approach for themeability).

---

## 5. Interactive & Animation Components

**Add or Enhance:**
- Scroll-animated hero headline/banner
- Interactive project cards (hover/flip/expand)
- Animated stats/KPIs with count-up effect
- Reveal-in-view blocks for testimonials/case studies (AOS, GSAP, Framer Motion)
- Modern contact form with floating labels/checkmarks

**Scraping Sources:**
- [https://shadcn/ui](https://ui.shadcn.com/)
- [https://hyperui.dev/components/marketing](https://hyperui.dev/components/marketing)
- [https://tailwindui.com/components/preview](https://tailwindui.com/components/preview)
- [https://storybook.design/components](https://storybook.design/components)
Use AI-assisted scraping or your CLI tools to extract, adapt, and blend these.

---

## 6. Docs & Maintenance

- Place this file at `/reports/design-analysis/DESIGN_SYSTEM.md`
- Update after any major branding/visual refresh
- Add Figma/Sketch links if design source files exist
- Consider rendering docs publicly at `/design-system`
- Use CLI and MCP automations monthly to re-audit and keep design assets consistent

---

## 7. Extra Automation & Workflow

**Image audit:**  
- Automate monthly inventory and alt-text review  
- MCP script sample:  
```json
{
  "task": "Audit and tag all images in /public/images for alt+aria-label compliance, flag missing or too-short descriptions"
}
```
**Icon import script sample:**  
- Node/CLI: Automate SVG optimization and import

---

**This living document ensures your marketing portfolio always projects a clear, thoughtful, and visually unique brand.**
