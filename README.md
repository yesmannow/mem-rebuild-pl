# Jacob Darling — BearCave Portfolio

> Fractional CMO · Systems Architect · Marketing Technologist

A modern, interactive portfolio built with **React 18 + TypeScript + Vite**, showcasing expertise in marketing automation, full-stack development, and systems integration.

---

## Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server → http://localhost:5173
npm run dev

# Type-check without emitting
npm run typecheck

# Lint
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18, TypeScript 5 |
| Build | Vite 6, Rollup (manual chunks) |
| Routing | React Router v6 |
| Styling | TailwindCSS 3.4, CSS custom properties |
| Animation | Framer Motion, GSAP, Lenis |
| UI primitives | Radix UI, Lucide React |
| PWA | vite-plugin-pwa (Workbox) |
| Testing | Jest, Playwright, Lighthouse CI |

---

## Site Structure

| Route | Page |
|---|---|
| `/` | Homepage — hero, featured work, testimonials |
| `/resume` | Interactive resume + skills timeline |
| `/case-studies` | Case study index with filtering |
| `/case-studies/:slug` | Dynamic case study detail |
| `/applications` | Interactive tools hub |
| `/apps/:tool` | Individual tool (Growth Engine, SEO Scanner, …) |
| `/tools` | CLI tools & MCP server showcase |
| `/devops` | Deployment architecture & build pipeline docs |
| `/services` | Marketing systems & services overview |
| `/projects` | Technical & creative project gallery |
| `/photography` | Photography portfolio |
| `/design` | Design & branding work |
| `/contact` | Contact form |
| `/resume-print` | ATS-optimised printable resume |

---

## Key npm Scripts

```bash
# Build
npm run build                    # Production build (Vercel/Cloudflare)
GITHUB_PAGES=true npm run build  # Build with /mem-rebuild-pl/ base path
ANALYZE=true npm run build       # Bundle analysis (opens dist/stats.html)

# Quality
npm run typecheck                # TypeScript check (no emit)
npm run lint                     # ESLint
npm run lint:fix                 # ESLint + auto-fix
npm run format                   # Prettier

# Test
npm test                         # Jest unit tests
npm run a11y:smoke               # Accessibility smoke test

# Assets
npm run optimize-images          # Compress & convert images to WebP/AVIF
npm run audit:images             # Audit unused images
npm run images:build             # Build image manifest

# MCP / Content
npm run mcp:start                # Start MCP server
npm run generate:content         # Generate content from design websites

# Deploy
npm run predeploy                # typecheck → lint → build → SEO check
npm run deploy:cloudflare        # Deploy to Cloudflare Pages
```

---

## Deployment

### Vercel / Netlify / Cloudflare Pages (default)

```bash
npm run build
# Output: dist/  — point your host here
# Build command: npm run build
# Output dir: dist
```

### GitHub Pages (subdirectory)

```bash
GITHUB_PAGES=true npm run build
# Sets base: '/mem-rebuild-pl/' in Vite automatically
```

The `vite.config.js` reads `GITHUB_PAGES=true` and switches the `base` path accordingly. All other environments default to `base: '/'`.

---

## Adding Content

### New Case Study

1. Add an entry to `src/data/caseStudies.ts`:
   ```typescript
   {
     slug: 'my-project',
     title: 'My Project',
     tagline: 'One-line description',
     metrics: [{ label: 'Conversion lift', value: '+45%' }],
     fullContent: { challenge: {…}, strategy: {…}, impact: {…} }
   }
   ```
2. Drop a cover image at `public/images/case-studies/my-project.jpg`
3. Case study becomes available at `/case-studies/my-project`

### New CLI Tool (on `/tools` page)

1. Edit `src/pages/ToolsShowcase.tsx`
2. Add an object to the `tools` array with `name`, `description`, `category`, `command`, and `tech`

### Portfolio Concierge Knowledge Base

Edit `src/data/ai-knowledge.ts` to update bio, skills, rates, and availability. The `findAnswer()` function uses keyword matching — no model API required.

---

## Project Structure

```
mem-rebuild-pl/
├── src/
│   ├── pages/          # Route-level components
│   ├── components/     # Shared components
│   │   ├── layout/     # Layout + navigation
│   │   ├── ai/         # Portfolio Concierge widget
│   │   ├── seo/        # SEOHead component
│   │   └── ui/         # Primitives (Button, Loader, …)
│   ├── router/
│   │   ├── AppRouter.tsx       # Route definitions
│   │   └── routeSEOConfig.ts   # Per-route SEO metadata
│   ├── data/           # TypeScript data models
│   ├── hooks/          # Custom React hooks
│   ├── styles/         # Global CSS + design tokens
│   └── utils/          # Shared utilities
├── public/
│   ├── images/         # Optimised images (WebP/AVIF)
│   └── resume/         # PDF resumes
├── scripts/            # Build & automation scripts
├── mcp/                # MCP server (Express)
├── functions/          # Cloudflare Pages Functions
├── vite.config.js
├── tailwind.config.js
└── tsconfig.app.json
```

---

## Design System

| Token | Value |
|---|---|
| Primary (Turquoise) | `#40E0D0` |
| Secondary (Creamsicle) | `#FFA500` |
| Background (Slate) | `#0f172a` |
| Font | Montserrat (300–800) |

WCAG AA contrast compliance · Dark mode with `prefers-color-scheme` · Zero-FOUC

---

## Additional Docs

- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Architecture Status](./ARCHITECTURE_STATUS.md)
- [Changelog](./CHANGELOG.md)
- [Contributing](./CONTRIBUTING.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

---

*Private & proprietary — all rights reserved.*

