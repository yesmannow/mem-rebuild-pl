# jacob-darling-portfolio
# Jacob Darling - Portfolio

> Marketing Strategist & Systems Architect | Turning Complexity into Clarity

A modern, interactive portfolio showcasing expertise in marketing automation, full-stack development, and systems integration. Built with Vite, React, TypeScript, and Framer Motion.

## 🚀 Features

- **BearCave cinematic hero** — looping tech backdrop, chip indicators, and gradient CTAs
- **Filterable case study library** — six narrative deep dives with rich metrics and tag search
- **Interactive applications hub** — live demos, sort/search, grid & list layouts, and metric cards
- **Modern About experience** — rotating portrait gallery, accordion timeline, and community work showcase
- **Assistant-ready data model** — case studies and applications defined in TypeScript for quick updates

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Styling**: CSS3 with Custom Properties
- **Deployment**: Vercel

## 📱 Key Sections

### 🧭 Site navigation

- **Home** — hero, selected work, testimonials, and contact CTA
- **Case Studies** — searchable hub plus `/case-studies/[slug]` detail pages
- **Applications** — interactive listings and `/applications/[id]` detail views
- **About** — rotating bio gallery, philosophy cards, accordion timeline, community impact
- **Projects** — technical and value project catalog
- **Contact** — accessible contact form with scheduling link

### Case Studies
Six narrative projects showing problem → strategy → impact:
- **The Launchpad** — turned a static directory into a revenue engine (+212% qualified leads)
- **The Guardian** — automated compliance assistant that reduces tickets 68%
- **The Compass** — rebuilt analytics and attribution for precise ROI decisions
- **The Fortress** — edge-first security overhaul blocking 85K+ malicious hits monthly
- **The Conductor** — unified data pipeline across WooCommerce, LearnDash, FluentCRM, and Sheets
- **The Engine Room** — server optimization that cut load times from 5.8s to 1.2s

### Content management

#### Adding a case study
1. Update `src/data/caseStudies.ts` with a new object containing `slug`, `title`, `tagline`, `color`, `icon`, `metrics`, and `fullContent` (challenge/strategy/impact). The `fullContent` object supports `paragraphs` and `bullets` arrays for rich rendering.
2. Add a lightweight entry to `src/data/caseStudies.json` so the Case Study Explorer highlights the new story.
3. Provide a supporting image or illustration in `public/images/case-studies/` and reference it from the `image` field. Use TODO comments if an asset needs to be produced later.

#### Adding an application
1. Append a new application object in `src/data/applications.ts`. Provide an `icon` emoji, optional `accentGradient`, and ensure `thumbnail` points to an asset in `public/apps/`.
2. Populate the `valueProposition`, `features`, and `technicalDetails` arrays so the detail view renders the Overview, Technical Deep Dive, and Live Demo tabs.
3. Supply metrics and optional testimonial data to surface impact on both the listing card and detail page.

## 🎨 Brand Identity

- **Primary**: #88ABF2 (Clarity Blue)
- **Secondary**: #595959 (Professional Gray)
- **Dark**: #0D0D0D (Deep Background)
- **Light**: #fafbfc (Clean White)

## 🏃 Quick Start

```bash
# Clone the repository
git clone https://github.com/JdarlingGT/jacob-darling-portfolio.git

# Navigate to project
cd jacob-darling-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

# mem-rebuild-pl

A working portfolio build powered by Vite, React, TailwindCSS, and assistant-ready CLI tools.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🧱 Folder Structure

```
src/
  assets/
  components/
  utils/
  routes/
cli/
  generate-logo.ts
  preview-layout.ts
  svg-export.ts
  cli.config.json
public/
  preview.html
  favicon.svg
prompts/
  branding.json
```

## 🛠️ CLI Tools

Run from terminal:

```bash
ts-node cli/generate-logo.ts public/logo.svg
ts-node cli/preview-layout.ts
ts-node cli/svg-export.ts public/assets
```

## 🤖 Assistant Prompts

See `prompts/branding.json` for reusable instructions for staff and AI assistants.

## 🌐 Deployment

Uses `vercel.json` for Vercel deployment. GitHub Pages optional via `/docs`.

## 📊 Build Status

[![Inspiration Showcase Build & Deploy](https://github.com/yesmannow/mem-rebuild-pl/actions/workflows/showcase.yml/badge.svg)](https://github.com/yesmannow/mem-rebuild-pl/actions/workflows/showcase.yml)

## 🌐 Live Site

[View Live Portfolio](https://yesmannow.github.io/mem-rebuild-pl/)

## 🧠 Roadmap

- MCP FastAPI integration
- Assistant-ready branding CLI
- Real-time telemetry and layout scoring
- SVG component preview and export
