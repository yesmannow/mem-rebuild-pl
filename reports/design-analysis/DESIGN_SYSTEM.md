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

### Image Audit & Optimization
```bash
# Audit all images for accessibility
npm run design:audit-images

# Generate alt text fixes (dry run)
npm run design:fix-alt-text --dry-run

# Generate compression commands
npm run design:compress-images --dry-run
```

**MCP script sample:**
```json
{
  "task": "Audit and tag all images in /public/images for alt+aria-label compliance, flag missing or too-short descriptions"
}
```

### Icon Import & Management
```bash
# Audit existing icons
npm run icon:audit

# Import new icon (with React component generation)
npm run icon:add <name> <path>

# Example:
npm run icon:add email ./downloads/email-icon.svg
npm run icon:add linkedin ./downloads/linkedin.svg
```

**Features:**
- Automatically optimizes SVG (removes metadata, uses currentColor)
- Generates React component with TypeScript
- Updates icon registry automatically
- Validates SVG structure (2px stroke, viewBox, etc.)

---

## 8. Inspiration & Extraction

### Scrape-Ready Prompts for Cursor AI

Use these prompts with the AI-Cursor-Scraping-Assistant to extract high-quality UI components:

#### 1. Testimonial Carousels & Reveal Animations
**Source:** https://hyperui.dev/components/marketing/testimonials

**Prompt:**
```
Extract all testimonial carousel components from https://hyperui.dev/components/marketing/testimonials.
Focus on:
- Card layouts with avatar, quote, and author information
- Reveal-on-scroll animations
- Navigation controls (prev/next, indicators)
- Responsive breakpoints
- Accessibility features (ARIA labels, keyboard navigation)

Save the HTML structure, CSS styles, and JavaScript animation logic.
Adapt the color scheme to match our design system palette (--color-primary, --color-secondary, etc.).
```

#### 2. Animated Navigation Bars & Dropdowns
**Source:** https://tailwindui.com/components/preview

**Prompt:**
```
Extract animated navigation bar components from https://tailwindui.com/components/preview.
Focus on:
- Sticky header with scroll-triggered animations
- Dropdown menu animations (fade, slide, scale)
- Mobile hamburger menu transitions
- Active state indicators
- Search bar integrations

Extract the component structure, Tailwind classes, and any JavaScript for interactivity.
Map colors to our design system tokens (--color-primary, --color-neutral-1, etc.).
```

#### 3. Interactive Contact Cards & Dark Mode Toggles
**Source:** https://ui.shadcn.com/

**Prompt:**
```
Extract interactive contact form cards and dark mode toggle components from https://ui.shadcn.com/.
Focus on:
- Contact card layouts with floating labels
- Form validation states (success, error, warning)
- Dark mode toggle with smooth transitions
- Animated accordions for FAQ sections
- Checkbox and radio button customizations

Extract React component code, CSS variables, and animation configurations.
Ensure all components use our design system color tokens and typography.
```

### Usage Instructions

1. **Start the scraping assistant:**
   ```bash
   npm run scraping:server
   ```

2. **In Cursor AI, use the prompts above** to extract components

3. **Adapt extracted components:**
   - Replace hardcoded colors with CSS variables
   - Update typography to match our font stack
   - Ensure accessibility (ARIA labels, keyboard navigation)
   - Test responsive breakpoints

4. **Integrate into component library:**
   - Place in `src/components/interactive/`
   - Follow existing component patterns
   - Add TypeScript types
   - Document props and usage

---

## 9. Interactive Components

### Available Components

#### AnimatedHero
Framer Motion powered hero header with scroll/hover animations.

**Usage:**
```tsx
import { AnimatedHero } from '@/components/interactive/AnimatedHero';

<AnimatedHero
  title="Welcome to My Portfolio"
  subtitle="Marketing Strategist & Systems Architect"
  ctaText="View My Work"
  ctaHref="/projects"
  theme="dark"
/>
```

**Props:**
- `title: string` - Main headline
- `subtitle?: string` - Subheading text
- `ctaText?: string` - Call-to-action button text
- `ctaHref?: string` - CTA link destination
- `backgroundImage?: string` - Optional background image URL
- `theme?: 'light' | 'dark'` - Color theme
- `className?: string` - Additional CSS classes

#### StatCounter
Animated count-up component for KPIs and statistics.

**Usage:**
```tsx
import { StatCounter } from '@/components/interactive/StatCounter';

<StatCounter
  value={212}
  label="Qualified Leads"
  prefix="+"
  suffix="%"
  theme="primary"
/>
```

**Props:**
- `value: number` - Target number to count to
- `label: string` - Description label
- `prefix?: string` - Text before number
- `suffix?: string` - Text after number
- `duration?: number` - Animation duration (ms)
- `decimals?: number` - Decimal places
- `theme?: 'primary' | 'secondary' | 'accent'` - Color theme
- `className?: string` - Additional CSS classes

#### TestimonialCarousel
Reveal-on-scroll testimonial carousel with Framer Motion.

**Usage:**
```tsx
import { TestimonialCarousel } from '@/components/interactive/TestimonialCarousel';

const testimonials = [
  {
    id: '1',
    quote: 'Jacob transformed our marketing operations.',
    author: 'Jane Doe',
    role: 'CMO',
    company: 'Acme Corp',
    avatar: '/images/avatars/jane.jpg'
  },
  // ... more testimonials
];

<TestimonialCarousel
  testimonials={testimonials}
  autoPlay={true}
  autoPlayInterval={5000}
  theme="dark"
/>
```

**Props:**
- `testimonials: Testimonial[]` - Array of testimonial objects
- `autoPlay?: boolean` - Enable auto-advance
- `autoPlayInterval?: number` - Auto-advance interval (ms)
- `theme?: 'light' | 'dark'` - Color theme
- `className?: string` - Additional CSS classes

### Best Practices

1. **Accessibility:**
   - All components support `prefers-reduced-motion`
   - ARIA labels included where needed
   - Keyboard navigation supported
   - Focus states clearly visible

2. **Performance:**
   - Lazy loading for images
   - Optimized animations (GPU-accelerated)
   - Code splitting for large components

3. **Theming:**
   - All components use CSS variables
   - Support light/dark themes
   - Match design system palette

---

**This living document ensures your marketing portfolio always projects a clear, thoughtful, and visually unique brand.**
