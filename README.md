# jacob-darling-portfolio
# Jacob Darling - Portfolio

> Marketing Strategist & Systems Architect | Turning Complexity into Clarity

A modern, interactive portfolio showcasing expertise in marketing automation, full-stack development, and systems integration. Built with Vite, React, TypeScript, and Framer Motion.

## 🚀 Features

- **BearCave cinematic hero** — looping tech backdrop, chip indicators, and gradient CTAs
- **Filterable case study library** — six narrative deep dives with rich metrics and tag search
- **Interactive applications hub** — live demos, sort/search, grid & list layouts, and metric cards
- **Modern About experience** — rotating portrait gallery, accordion timeline, and community work showcase
- **AI-Powered Case Study Explainer** — Generate persona-specific explanations (Founder, CMO, Developer, General) using OpenAI/Gemini
- **Live Screenshot Previews** — Dynamic case study thumbnails from live websites via screenshot API
- **Dynamic API Imagery** — Photography APIs (Unsplash, Lorem Picsum) enhance all pages with themed backgrounds
- **Design System** — Shadcn/ui style components (Card, Badge, TechIcon) for consistent UX
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

## 📸 Professional API Integrations

This portfolio features enterprise-grade API integrations that showcase technical expertise and create engaging user experiences.

### 🤖 AI-Powered Case Study Explainer

**Location**: Case study detail pages (`/case-study/[slug]`)

Generate persona-specific explanations of case studies using OpenAI GPT-4 or Google Gemini AI:

- **Personas**: Founder/CEO, CMO, Developer, General
- **Features**: 
  - Interactive persona selection with animations
  - Real-time AI-generated explanations
  - Automatic fallback from OpenAI to Gemini
  - Professional, concise output (2-3 paragraphs)
- **Implementation**: 
  - Cloudflare Pages Function: `/functions/api/explain-case-study.ts`
  - React Component: `/src/components/case-study/CaseStudyExplainer.tsx`

### 📸 Live Screenshot API

**Location**: Case studies listing page

Dynamically generate screenshots of live case study websites:

- **Features**:
  - Live website thumbnails
  - Lazy loading and 24-hour caching
  - Graceful fallback to gradient backgrounds
  - Hover effects and external links
- **Implementation**:
  - Cloudflare Pages Function: `/functions/api/screenshot.ts`
  - React Component: `/src/components/case-study/CaseStudyScreenshotCard.tsx`

### 🎨 Dynamic Background Imagery

**Location**: All major pages

Themed background images from Unsplash API enhance visual appeal:

- **Page Themes**: Pre-configured for Home, Portfolio, Services, Tools, DevOps, etc.
- **Features**:
  - Lazy loading for performance
  - Brand-consistent overlays
  - WCAG AA contrast compliance
  - Section-level and page-level backgrounds
- **Implementation**:
  - Service: `/src/services/pageBackgroundService.ts`
  - Components: `/src/components/layout/PageWithApiBackground.tsx`

### 🎨 Design System Components

Professional UI components following Shadcn/ui principles:

- **Card**: Composable card system with 4 variants (default, glass, gradient, outlined)
- **Badge**: 8 variants with icons and removable functionality
- **TechIcon**: Unified tech stack icon system with 50+ pre-mapped technologies

See [`docs/PROFESSIONAL_API_ENHANCEMENTS.md`](docs/PROFESSIONAL_API_ENHANCEMENTS.md) for complete documentation.

### Environment Variables

Required for Cloudflare Pages deployment:

```env
# AI APIs (at least one required)
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...

# Database
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

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

A modern, professional portfolio powered by Vite, React, TypeScript, TailwindCSS, and a comprehensive suite of CLI tools and MCP servers for automated content generation, asset optimization, and deployment.

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Site Structure

### Main Pages

- **/** - Homepage with hero, featured work, and testimonials
- **/portfolio** - Interactive portfolio gallery with filtering
- **/tools** - CLI tools & MCP servers showcase
- **/devops** - DevOps & deployment portfolio with architecture documentation
- **/case-study/[slug]** - Dynamic case study detail pages
- **/resume** - Interactive resume with PDF download
- **/about** - About page with bio, timeline, and community work
- **/contact** - Contact form with scheduling integration

## 🛠️ CLI Tools & Automation

### Build & Deploy Commands

```bash
# Analyze bundle size with visualizer
ANALYZE=true npm run build

# Build for GitHub Pages (subdirectory deployment)
GITHUB_PAGES=true npm run build

# Build for Cloudflare Pages / custom domain (root deployment)
npm run build

# Preview build locally
npm run preview
```

### Asset Optimization

```bash
# Optimize all images >1MB (compress, convert to WebP/AVIF)
npm run optimize-images

# Audit unused images in project
npm run audit:images

# Build image manifest for lazy loading
npm run images:build

# Normalize image filenames
npm run images:normalize

# Validate MIME types
npm run audit:mime
```

### MCP Server & Content Generation

```bash
# Start MCP server
npm run mcp:start

# Test MCP health
npm run mcp:test

# Monitor MCP metrics
npm run mcp:monitor

# Run smoke tests
npm run mcp:smoke

# Generate content from design websites
npm run generate:content

# Copy optimized assets to public/
npm run copy:assets

# Full build with content generation
npm run build:full
```

### Development & Testing

```bash
# Type check without emitting files
npm run typecheck

# Lint code
npm run lint

# Lint and auto-fix
npm run lint:fix

# Format code with Prettier
npm run format

# Run tests
npm test

# Accessibility smoke test
npm run a11y:smoke
```

### Deployment Workflows

```bash
# Pre-deploy validation (typecheck, lint, build, SEO)
npm run predeploy

# Deploy to Cloudflare Pages
npm run deploy:cloudflare

# Full pre-deploy check with all validations
npm run predeploy:full

# Validate all routes, SEO, content
npm run validate:all
```

## 📦 Folder Structure

```
mem-rebuild-pl/
├── src/
│   ├── pages/              # React page components
│   │   ├── ToolsShowcase.tsx
│   │   ├── DevOpsPortfolio.tsx
│   │   ├── Resume.tsx
│   │   └── ...
│   ├── components/         # Reusable React components
│   ├── data/               # TypeScript data models
│   ├── router/             # React Router configuration
│   └── styles/             # CSS and style files
├── public/
│   ├── images/             # Static images (649 files, optimize >1MB)
│   ├── resume/             # PDF resumes
│   └── ...
├── scripts/                # Build and automation scripts
│   ├── optimize-images.js
│   ├── listUnusedImages.ts
│   ├── mcp-cli.js
│   └── ...
├── mcp/                    # MCP server implementation
│   └── server.js
├── docs/                   # Documentation files
│   └── *.md                # Various documentation and guides
├── vite.config.js          # Vite configuration with base path logic
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🎨 Design System

The portfolio uses a comprehensive, unified design system for consistency and maintainability.

### Color Palette (Wow Factor Portfolio Theme)

- **Turquoise**: `#40E0D0` - Primary accent for links, highlights, and interactive elements
- **Creamsicle**: `#FFA500` - Secondary accent for warm touches and CTAs
- **Light Blue-Gray**: `#B3CDE0` - Backgrounds and subtle elements
- **Dark Slate**: `#0f172a` - Main background
- **Surface**: `#1e293b` - Card backgrounds

### Typography

- **Font Family**: Montserrat (all text - unified across the site)
- **Weights**: 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 800 (extra bold)
- **Monospace**: Fira Code (code blocks only)

### Component Library

The site includes a comprehensive style guide with pre-built utilities:
- Card components (primary, secondary, glass)
- Button styles (primary, secondary, accent)
- Badge and tag components
- Form elements
- Metric displays
- Timeline components
- Icon wrappers
- Loading states
- Hover effects
- Accessibility utilities

📖 See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation and usage examples.

## 🚢 Deployment

### GitHub Pages

Deploy to `https://username.github.io/mem-rebuild-pl/`

```bash
# Build with GitHub Pages base path
GITHUB_PAGES=true npm run build

# Output in dist/ is ready for deployment
# GitHub Actions can auto-deploy on push to main
```

### Cloudflare Pages / Custom Domain

Deploy to root domain like `https://yourdomain.com/`

```bash
# Build with root base path (default)
npm run build

# Verify Cloudflare configuration
npm run verify:cloudflare

# Output in dist/ is ready for Cloudflare Pages
# Connect your repo in Cloudflare dashboard
```

#### Setting Up Custom Domain

If you're experiencing **Error 522** or connection issues with your custom domain:

1. **Add Custom Domain in Cloudflare Pages Dashboard:**
   - Go to Cloudflare Dashboard → Workers & Pages → Your Project
   - Click "Custom domains" tab
   - Add both apex domain (`example.com`) and www subdomain (`www.example.com`)

2. **Configure DNS Records:**
   ```
   Type    Name              Target                      Proxied
   CNAME   example.com       your-project.pages.dev     Yes ☁️
   CNAME   www.example.com   example.com                Yes ☁️
   ```

3. **Verify SSL/TLS Settings:**
   - Go to Cloudflare Dashboard → SSL/TLS
   - Set encryption mode to **Full** or **Full (strict)**

4. **Wait for DNS Propagation** (5-60 minutes)

📖 **For detailed troubleshooting, see [docs/CLOUDFLARE_CUSTOM_DOMAIN_SETUP.md](./docs/CLOUDFLARE_CUSTOM_DOMAIN_SETUP.md)**

### Base Path Logic

The `vite.config.js` automatically handles base path:

- **GitHub Pages**: Sets `base: '/mem-rebuild-pl/'` when `GITHUB_PAGES=true`
- **Custom Domain**: Uses `base: '/'` by default

This ensures all asset paths and routing work correctly on both deployment targets.

## 📝 Content Management

### Adding a Case Study

1. Edit `src/data/caseStudies.ts` and add a new object:
   ```typescript
   {
     slug: 'my-project',
     title: 'My Project',
     tagline: 'Brief description',
     color: '#40E0D0',
     icon: '🚀',
     metrics: [
       { label: 'Metric 1', value: '+100%' },
     ],
     fullContent: {
       challenge: { paragraphs: ['...'], bullets: ['...'] },
       strategy: { paragraphs: ['...'], bullets: ['...'] },
       impact: { paragraphs: ['...'], bullets: ['...'] }
     }
   }
   ```

2. Add image to `public/images/case-studies/my-project.jpg`

3. Case study will be accessible at `/case-study/my-project`

### Adding a CLI Tool to /tools Page

1. Edit `src/pages/ToolsShowcase.tsx`
2. Add a new tool object to the `tools` array:
   ```typescript
   {
     name: 'My Tool',
     category: 'CLI',
     description: 'What it does',
     technologies: ['Node.js', 'TypeScript'],
     usage: `# Command examples
   npm run my-tool`,
     outcomes: ['Outcome 1', 'Outcome 2'],
     icon: <Terminal className="w-6 h-6" />,
     lastModified: '2024-11',
     author: 'Your Name'
   }
   ```

## 🔍 Tool Metadata

All CLI tools include comprehensive metadata:

- **sourcePath**: Automatically resolved from `scripts/` and `cli/` directories
- **outputType**: Varies by tool (Markdown reports, Optimized assets, JSON data)
- **lastUsed**: Tracked via git log and file modification timestamps
- **archiveLocation**: Non-production tools can be moved to `/docs` for reference

View the full tool catalog at `/tools` or in `src/pages/ToolsShowcase.tsx`

## 🧰 MCP Integration

This portfolio includes Model Context Protocol (MCP) integration for AI-powered development workflows:

- **MCP Server**: Express-based server with health monitoring and rate limiting
- **CLI Wrapper**: Unified command-line interface for all MCP operations
- **Content Generation**: Automated design inspiration scraping and content creation
- **Asset Pipeline**: Image optimization and metadata generation

All MCP tools are documented at `/tools` with usage examples and outcomes.

## 📊 Available Scripts Reference

See `package.json` for the complete list of 100+ scripts. Key categories:

- **Development**: `dev`, `build`, `preview`, `typecheck`, `lint`, `format`
- **MCP**: `mcp:start`, `mcp:test`, `mcp:monitor`, `mcp:smoke`
- **Content**: `generate:content`, `copy:assets`, `build:full`
- **Images**: `optimize-images`, `audit:images`, `images:build`, `images:normalize`
- **Design**: `design:analyze`, `design:refactor-colors`, `icon:generate-components`
- **Audit**: `audit:lighthouse`, `audit:accessibility`, `audit:duplicates`, `audit:unused`
- **Deploy**: `predeploy`, `deploy:cloudflare`, `validate:all`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make changes and test thoroughly
4. Run pre-deploy checks: `npm run predeploy`
5. Commit: `git commit -m "feat: add my feature"`
6. Push and open a Pull Request

## 📄 License

This portfolio is private and proprietary. All rights reserved.

## 🎯 Project Status

**Version**: 2.0 (Wow Factor Portfolio)
**Status**: Production Ready
**Last Updated**: November 2024

---

## 🛠️ CLI Tools (Legacy)

> **Note**: The CLI tools documentation has been consolidated to `/docs` for reference.
> Active tools are documented at `/tools` and in the sections above.

Run from terminal:

```bash
ts-node cli/generate-logo.ts public/logo.svg
ts-node cli/preview-layout.ts
ts-node cli/svg-export.ts public/assets
```

## 🌐 API Services

New! Free API integrations for enhanced UX and content generation. See [API Services Documentation](scripts/api-services/README.md) for details.

```bash
# Fetch website favicons/logos
npm run api:favicon -- google.com github.com

# Search high-quality images
npm run api:image -- search "technology" --count=5

# Extract website metadata
npm run api:metadata -- https://example.com --output=metadata.json

# Generate avatars, QR codes, demo data
npm run api:utility -- avatar "John Doe"
npm run api:utility -- qr "https://example.com" --output=qr.png
npm run api:utility -- users 5
```

**Available Services:**
- 🎨 **Favicon Fetcher**: Extract logos from any website
- 📸 **Image Provider**: Unsplash stock photos & placeholders
- 🔍 **Metadata Extractor**: Rich website metadata & Open Graph data
- 🛠️ **Utility Services**: Avatars, QR codes, demo users, jokes, advice

See [scripts/api-services/README.md](scripts/api-services/README.md) for comprehensive API documentation and usage examples.

## 🤖 Assistant Prompts

See `prompts/branding.json` for reusable instructions for staff and AI assistants.

## 🌐 Deployment

### GitHub Pages
The project is configured for automatic deployment to GitHub Pages. See [docs/HOW_TO_LAUNCH_GITHUB_PAGES.md](./docs/HOW_TO_LAUNCH_GITHUB_PAGES.md) for detailed setup instructions.

**Quick Deploy:**
```bash
# Push to main or test branch to trigger automatic deployment
git push origin main
```

### Vercel
Uses `vercel.json` for Vercel deployment configuration.

## 📊 Build Status

[![Deploy to GitHub Pages](https://github.com/yesmannow/mem-rebuild-pl/actions/workflows/github-pages.yml/badge.svg)](https://github.com/yesmannow/mem-rebuild-pl/actions/workflows/github-pages.yml)
[![Inspiration Showcase Build & Deploy](https://github.com/yesmannow/mem-rebuild-pl/actions/workflows/showcase.yml/badge.svg)](https://github.com/yesmannow/mem-rebuild-pl/actions/workflows/showcase.yml)

## 🌐 Live Site

**GitHub Pages**: [https://yesmannow.github.io/mem-rebuild-pl/](https://yesmannow.github.io/mem-rebuild-pl/)

**Vercel (Alternative)**: [https://mem-rebuild-55q0c32al-gpttttys-projects.vercel.app/](https://mem-rebuild-55q0c32al-gpttttys-projects.vercel.app/)

> 📝 See [docs/HOW_TO_LAUNCH_GITHUB_PAGES.md](./docs/HOW_TO_LAUNCH_GITHUB_PAGES.md) for GitHub Pages setup and [docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md) for Vercel configuration.

## 🧠 Roadmap

- MCP FastAPI integration
- Assistant-ready branding CLI
- Real-time telemetry and layout scoring
- SVG component preview and export
