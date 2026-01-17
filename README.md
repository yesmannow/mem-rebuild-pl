# Jacob Darling - Portfolio

> Marketing Strategist & Systems Architect | Turning Complexity into Clarity

A modern, interactive portfolio showcasing expertise in marketing automation, full-stack development, and systems integration. Built with Vite, React, TypeScript, TailwindCSS, and a comprehensive suite of CLI tools and MCP servers.

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

The development server will be available at `http://localhost:5173`

## 🛠️ Tech Stack

### Core Framework

- **React 18** - UI library with hooks and concurrent features
- **TypeScript 5.9** - Type-safe development
- **Vite 6** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **TailwindCSS 3.4** - Utility-first CSS framework

### UI & Animation

- **Framer Motion** - Production-ready motion library
- **GSAP** - Advanced animation toolkit
- **Lenis** - Smooth scrolling library
- **Lucide React** - Icon library
- **Radix UI** - Accessible component primitives

### Data & State

- **TanStack Query** - Server state management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling with validation

### Build & Deployment

- **Vite PWA Plugin** - Progressive Web App support
- **Rollup** - Module bundler
- **TypeScript Compiler** - Type checking

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Playwright** - E2E testing
- **Lighthouse CI** - Performance auditing

## ✨ Features

### Core Portfolio Features

- **Modern Homepage** - Ocean Pearl hero with animated background, career highlights, portfolio showcase, and testimonials
- **Case Studies** - 9+ detailed case studies with metrics, challenges, strategies, and outcomes
- **Interactive Applications** - Live demos of marketing tools and applications
- **Resume/About Page** - Interactive resume with timeline, skills visualization, and downloadable PDF
- **Projects Gallery** - Technical and creative project showcase
- **Services** - Marketing systems and services overview
- **Contact Form** - Accessible contact form with scheduling integration
- **Portfolio Concierge (AI Assistant)** - Global floating chat widget that answers visitor questions about skills, rates, case studies, and availability

### Interactive Applications

- **Growth Engine** - ROI modeling & quote generation
- **SEO Scanner** - Edge HTMLRewriter audit tool
- **License Hub** - 50-state compliance database
- **Clinical Compass** - Logic-based treatment protocols
- **Lead Score Lab** - Lead scoring and qualification
- **Link Architect** - Link building and management
- **Campaign Performance Visualizer** - Marketing campaign analytics
- **Competitor Intelligence Hub** - Competitive analysis tools
- **Marketing Simulator** - Interactive marketing scenario modeling
- **Brand Builder** - Interactive brand identity creation tool
- **Email Marketing Simulator** - Email campaign simulation
- **Social Media Simulator** - Social media strategy tool

### Design & Creative

- **Photography Portfolio** - Curated photography gallery
- **Graphic Design** - Branding and visual identity work
- **Design System** - Comprehensive design tokens and components
- **Component Showcase** - Interactive UI component demos
- **Brand Gallery** - Brand identity systems showcase

### Developer Tools

- **Tools Showcase** - CLI tools and MCP servers documentation
- **DevOps Portfolio** - Deployment architecture and optimization strategies
- **The Lab** - Interactive tools and system telemetry

### Legal Demo Features

- **Workers Compensation** - Legal tech demo with document viewer
- **Litigation Practice** - Court mapping and legal tools
- **Business Law** - Corporate law tools with market data
- **Finance Industry** - Financial services legal tools

### AI & Interactive Features

- **Portfolio Concierge** - Global Marketing OS Assistant
  - Floating chat widget (bottom-right corner, accessible from any page)
  - Answers questions about skills, hourly rates, case studies, and availability
  - Keyword-based intelligent responses using centralized knowledge base
  - Preset prompt buttons for quick questions ("Skills", "The Launchpad", "Availability")
  - Typing indicator with smooth animations
  - Responsive design (mobile-optimized with proper spacing)
  - Glass-panel styling with brand turquoise gradient
  - Auto-scrolls to latest messages
  - Case study search and detailed project information

## 📱 Site Structure

### Main Navigation

- **/** - Homepage with hero, featured work, testimonials
- **/resume** - Interactive resume (About page redirects here)
- **/case-studies** - Case studies listing with filtering
- **/applications** - Interactive applications hub
- **/projects** - Technical and creative projects
- **/services** - Marketing systems and services
- **/tools** - CLI tools & MCP servers showcase
- **/devops** - DevOps & deployment documentation
- **/contact** - Contact form

### Global Features

- **Portfolio Concierge** - Floating AI assistant widget (available on all pages)
  - Accessible via floating button in bottom-right corner
  - Responsive positioning (mobile: `bottom-4 right-4`, desktop: `bottom-6 right-6`)
  - High z-index (z-50) to float above all content
  - Mobile-optimized chat window with proper margins

### Case Studies

Individual case study pages with comprehensive metrics:

- `/case-studies/the-launchpad` - 212% increase in qualified leads
- `/case-studies/the-guardian` - 68% reduction in compliance tickets
- `/case-studies/the-compass` - Analytics rebuild for precise ROI tracking
- `/case-studies/the-fortress` - Edge security blocking 85K+ malicious hits/month
- `/case-studies/the-conductor` - Unified data pipeline across 4+ platforms
- `/case-studies/the-engine-room` - Server optimization (5.8s → 1.2s load time)
- `/case-studies/graston-ceu-system` - Continuing education platform
- `/case-studies/rbe-law-brand-and-digital` - Law firm rebrand and digital transformation
- `/case-studies/ultimate-tech-roi-growth` - Tech ROI growth system

### Creative & Design

- `/photography` - Photography portfolio
- `/design` - Design work showcase
- `/graphic-design` - Graphic design portfolio
- `/creative` - Combined creative work
- `/gallery` - Brand gallery
- `/showcase` - Component showcase
- `/design-system` - Design system demo

### Applications & Tools

- `/apps` - The Lab (interactive tools hub)
- `/apps/growth-engine` - Growth Engine application
- `/apps/seo-scanner` - SEO Scanner tool
- `/apps/license-hub` - License Hub application
- `/apps/clinical-compass` - Clinical Compass tool
- `/apps/lead-lab` - Lead Score Lab
- `/apps/link-architect` - Link Architect
- `/apps/campaign-performance` - Campaign Performance Visualizer
- `/apps/competitor-intelligence` - Competitor Intelligence Hub
- `/apps/marketing-simulator` - Marketing Simulator
- `/apps/brand-builder` - Brand Builder tool
- `/apps/email-marketing-simulator` - Email Marketing Simulator
- `/apps/social-media-simulator` - Social Media Simulator

### Legal Demo Routes

- `/legal/workers-compensation` - Workers compensation law demo
- `/legal/litigation` - Litigation practice demo
- `/legal/business-law` - Business law demo
- `/legal/finance-industry` - Financial services law demo
- `/business-development-demo` - Law firm business development components

### Additional Pages

- `/side-projects` - Side projects showcase
- `/testimonials` - Client testimonials
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/resume-print` - Printable resume version
- `/deployment-status` - Deployment status dashboard

## 🎨 Design System

### Color Palette

- **Primary: Turquoise** (#40E0D0) - Bright, modern accent for CTAs and highlights
- **Secondary: Creamsicle** (#FFA500) - Warm, energetic for secondary emphasis
- **Tertiary: Light Blue-Gray** (#B3CDE0) - Sophisticated backgrounds
- **Dark: Slate** (#0f172a) - Deep backgrounds for dark mode
- **Surface: Slate-800** (#1e293b) - Card backgrounds
- **Text: High contrast** (#F8FAFC) - Accessibility-first text color

### Typography

- **Primary Font**: Montserrat (300-800 weights) - Modern, clean, professional
- **Monospace Font**: Fira Code - For code snippets and technical content
- **Font Display**: `swap` for optimal performance

### Features

- ✅ WCAG AA contrast compliance
- ✅ Dark mode with system preference detection
- ✅ Zero-FOUC (Flash of Unstyled Content) implementation
- ✅ Smooth theme transitions
- ✅ Responsive design (mobile-first)

## 🧰 CLI Tools & Automation

### Build & Deploy

```bash
# Analyze bundle size with visualizer
ANALYZE=true npm run build

# Build for GitHub Pages (subdirectory deployment)
GITHUB_PAGES=true npm run build

# Build for Cloudflare Pages / Vercel (root deployment)
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

### Design & Content Tools

```bash
# Analyze portfolio design
npm run design:analyze

# Generate icon components
npm run icon:generate-components

# Refactor colors in design system
npm run design:refactor-colors

# Generate moodboards
npm run generate:moodboards

# Generate enhanced moodboards
npm run generate:enhanced-moodboards
```

### Audit & Cleanup

```bash
# Lighthouse audit
npm run audit:lighthouse

# Accessibility audit
npm run audit:accessibility

# Find duplicates
npm run audit:duplicates

# Find unused assets
npm run audit:unused

# Cleanup unused files (dry run)
npm run cleanup:unused:dry

# Interactive cleanup
npm run cleanup:unused:interactive
```

## 📦 Project Structure

```text
mem-rebuild-pl/
├── src/
│   ├── pages/              # React page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Applications.tsx
│   │   ├── ToolsShowcase.tsx
│   │   ├── DevOpsPortfolio.tsx
│   │   └── ...
│   ├── components/         # Reusable React components
│   │   ├── layout/         # Layout components
│   │   │   └── Layout.tsx  # Main layout with Portfolio Concierge
│   │   ├── ai/             # AI assistant components
│   │   │   └── PortfolioConcierge.tsx  # Global Marketing OS Assistant
│   │   ├── case-study/     # Case study components
│   │   ├── apps/           # Application components
│   │   ├── ui/             # UI primitives
│   │   └── ...
│   ├── data/               # TypeScript data models
│   │   ├── caseStudies.ts
│   │   ├── applications.ts
│   │   ├── ai-knowledge.ts # Portfolio Concierge knowledge base
│   │   ├── projects.ts
│   │   └── ...
│   ├── router/             # React Router configuration
│   ├── hooks/               # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── services/           # API services
│   ├── styles/             # Global styles
│   └── assets/             # Static assets
├── public/
│   ├── images/             # Optimized images (WebP/AVIF)
│   │   ├── bio/            # Bio photos
│   │   ├── case-studies/   # Case study images
│   │   ├── projects/       # Project images
│   │   └── ...
│   ├── apps/               # Application assets
│   ├── resume/             # PDF resumes
│   └── ...
├── scripts/                # Build and automation scripts
│   ├── optimize-images.js  # Image optimization
│   ├── mcp-cli.js          # MCP CLI wrapper
│   └── ...
├── mcp/                    # MCP server implementation
│   ├── server.js           # Express-based MCP server
│   ├── routes/             # API routes
│   └── utils/              # MCP utilities
├── functions/              # Cloudflare Pages Functions
│   └── api/                # API endpoints
├── cli/                    # CLI tools
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🚢 Deployment

### Vercel (Recommended)

The project is configured for Vercel deployment with `vercel.json`:

```bash
# Deploy to Vercel
vercel

# Or connect via GitHub for automatic deployments
```

**Configuration:**

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- Node version: 18+

### Cloudflare Pages

Deploy to Cloudflare Pages with automatic builds:

```bash
# Build for Cloudflare Pages
npm run build

# Output in dist/ is ready for Cloudflare Pages
# Connect your repo in Cloudflare dashboard
```

**Features:**

- Edge Functions support via `functions/` directory
- Automatic HTTPS
- Global CDN
- Custom domain support

### GitHub Pages

Deploy to GitHub Pages with subdirectory support:

```bash
# Build with GitHub Pages base path
GITHUB_PAGES=true npm run build

# Output in dist/ is ready for deployment
# GitHub Actions can auto-deploy on push to main
```

### Base Path Logic

The `vite.config.js` automatically handles base path:

- **GitHub Pages**: Sets `base: '/mem-rebuild-pl/'` when `GITHUB_PAGES=true`
- **Vercel/Cloudflare**: Uses `base: '/'` by default

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

3. Case study will be accessible at `/case-studies/my-project`

### Updating Portfolio Concierge Knowledge Base

The Portfolio Concierge uses a centralized knowledge base in `src/data/ai-knowledge.ts`:

1. Edit `src/data/ai-knowledge.ts` to update:
   - **Bio**: Professional summary
   - **Skills**: Array of technical and professional skills
   - **Availability**: Current availability status
   - **Contact**: Contact information and links
   - **Rates**: Pricing information

2. The `findAnswer()` function uses keyword matching to provide quick responses:
   - Rate/cost questions → Returns pricing information
   - Contact questions → Returns contact details
   - Availability questions → Returns availability status
   - Skills questions → Returns skills list and bio
   - Case study questions → Searches case studies and returns details

3. Preset prompts can be updated in `src/components/ai/PortfolioConcierge.tsx`:

```typescript
const presetPrompts = [
  { text: 'What are your skills?', label: 'Skills' },
  { text: 'Tell me about The Launchpad', label: 'The Launchpad' },
  { text: 'Are you available?', label: 'Availability' },
];
```

### Adding an Application

1. Edit `src/data/applications.ts` and add a new application object
2. Provide `icon`, `accentGradient`, and ensure `thumbnail` points to an asset
3. Populate `valueProposition`, `features`, and `technicalDetails` arrays
4. Application will appear in `/applications` listing

### Adding a CLI Tool to /tools Page

1. Edit `src/pages/ToolsShowcase.tsx`
2. Add a new tool object to the `tools` array with metadata
3. Tool will appear in the tools showcase with search and filtering

## 🔧 Environment Variables

For local development, create a `.env` file:

```env
# AI APIs (optional - for case study explainer)
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...

# Database (optional)
SUPABASE_URL=...
SUPABASE_ANON_KEY=...

# Build configuration
NODE_ENV=development
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run accessibility tests
npm run a11y:smoke

# Run E2E tests with Playwright
npm run a11y:ci

# Performance testing
npm run perf:ci
```

## 📊 Performance

### Bundle Optimization

- Code splitting with manual chunks for optimal loading
- Lazy loading for routes and heavy components
- Image optimization with WebP/AVIF formats
- Tree shaking for unused code elimination

### Performance Targets

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### Monitoring

```bash
# Analyze bundle size
ANALYZE=true npm run build

# Lighthouse audit
npm run audit:lighthouse

# Monitor bundle size
npm run monitor:size
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make changes and test thoroughly
4. Run pre-deploy checks: `npm run predeploy`
5. Commit: `git commit -m "feat: add my feature"`
6. Push and open a Pull Request

### Code Quality

- TypeScript strict mode enabled
- ESLint for code linting
- Prettier for code formatting
- Pre-commit hooks recommended

## 📄 License

This portfolio is private and proprietary. All rights reserved.

## 🎯 Project Status

**Version**: 1.0.0
**Status**: Production Ready
**Last Updated**: January 2026

### Recent Updates (January 2026)

- ✅ **Portfolio Concierge (AI Assistant)** - Global floating chat widget integrated
  - Keyword-based intelligent responses
  - Case study search and information
  - Preset prompt buttons for quick questions
  - Responsive mobile design with proper spacing
  - Glass-panel styling with brand turquoise gradient
  - Centralized knowledge base in `src/data/ai-knowledge.ts`
- ✅ **Application Detail Pages** - Full application showcase with Code Vault component
- ✅ **Case Study Detail Pages** - Enhanced with Impact Metrics and Rich Content Renderer
- ✅ **Legal Demo Pages** - Simplified layout with direct content integration

## 📚 Additional Documentation

- [Design System](./DESIGN_SYSTEM.md) - Complete design system documentation
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Detailed deployment instructions
- [Architecture Status](./ARCHITECTURE_STATUS.md) - Current architecture overview
- [Component Usage Guide](./COMPONENT_USAGE_GUIDE.md) - Component documentation

For questions or issues, please open an issue on GitHub or contact through the portfolio website.
