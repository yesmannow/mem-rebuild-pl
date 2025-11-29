import { LabItem } from '../types';

export const labItems: LabItem[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // CLIENT-FACING APPLICATIONS (Revenue)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'growth-engine',
    title: 'Growth Engine',
    type: 'app',
    category: 'Revenue Ops',
    tagline: 'Interactive ROI Modeler & CPQ System',
    techStack: [
      { name: 'React', reason: 'Component-driven architecture enables rapid iteration on complex forms and real-time calculations' },
      { name: 'Recharts', reason: 'D3-based charting library chosen for declarative data visualization with minimal overhead' },
      { name: 'Zod', reason: 'Runtime schema validation ensures data integrity across pricing tiers and configurations' },
      { name: 'PDF-Lib', reason: 'Client-side PDF generation eliminates server roundtrips for proposal documents' },
    ],
    context: {
      problem: 'Sales teams waste 4+ hours per deal manually calculating ROI projections and generating custom proposals, leading to inconsistent pricing and delayed deal cycles.',
      solution: 'Built an interactive CPQ (Configure-Price-Quote) system with real-time ROI modeling. The engine ingests customer metrics, applies industry benchmarks, and outputs dynamic visualizations with exportable PDF proposals.',
      impact: '67% reduction in proposal generation time. $2.1M in attributable pipeline acceleration within Q1. Sales velocity increased from 47 to 23 days average.',
      target: 'B2B Sales Directors, Revenue Operations, Enterprise Account Executives',
      usage: 'Embedded within CRM workflow. Reps input prospect data, system generates ROI model, and exports branded proposal-all within the sales call.',
    },
    link: '/apps/growth-engine',
    liveUrl: 'https://graston-growth-engine.vercel.app/',
  },
  {
    id: 'cmo-simulator',
    title: 'CMO Simulator',
    type: 'app',
    category: 'Strategic Planning',
    tagline: 'Scenario Planning & Budget Stress Tester',
    techStack: [
      { name: 'Next.js', reason: 'Hybrid rendering keeps the setup wizard server-rendered for SEO while delivering instant simulator state updates.' },
      { name: 'Zustand', reason: 'Lightweight store for persisting scenario variables across multi-step flows without prop drilling.' },
      { name: 'Chart.js', reason: 'Declarative charts for CAC, LTV, and funnel drop-off curves with minimal bundle overhead.' },
      { name: 'Supabase', reason: 'Managed Postgres backend used for storing saved scenarios and executive handoff notes.' },
    ],
    context: {
      problem: 'Marketing leaders get cornered into defending budgets with static spreadsheets that ignore channel volatility and runway scenarios.',
      solution: 'Developed a simulator that lets CMOs model headcount, media mix, and experimentation budgets while visualizing downstream effects on pipeline, burn, and payback periods.',
      impact: 'Cut annual planning cycles from 3 weeks to 4 days and aligned marketing + finance forecasts using a single source of truth.',
      target: 'Fractional CMOs, Marketing VPs, RevOps leaders, CFO partners',
      usage: 'Start with the guided setup, define growth targets, then spin up alternative playbooks and share an exec-ready link for sign-off.',
    },
    liveUrl: 'https://cmo-simulator-fkyn-lkqm6mfcz-gpttttys-projects.vercel.app/sim/setup',
  },
  {
    id: 'license-hub',
    title: 'License Hub',
    type: 'app',
    category: 'Compliance',
    tagline: '50-state CEU Intelligence Engine',
    techStack: [
      { name: 'Next.js', reason: 'Server-side rendering critical for SEO and initial load performance on state-specific pages' },
      { name: 'PostgreSQL', reason: 'Relational model handles complex licensing rule hierarchies and audit trail requirements' },
      { name: 'GeoIP', reason: 'Automatic jurisdiction detection reduces friction for mobile practitioners' },
      { name: 'React Map GL', reason: 'Mapbox-powered visualization makes multi-state compliance intuitive at a glance' },
    ],
    context: {
      problem: 'Healthcare practitioners (PT/OT/DC/AT/MT) face a labyrinth of 50 different state licensing requirements. Tracking CEU deadlines, renewal dates, and reciprocity rules is a compliance nightmare.',
      solution: 'Developed a centralized intelligence platform that aggregates licensing requirements from all 50 states. Features include automated deadline alerts, CEU tracking, and a visual map interface showing license status across jurisdictions.',
      impact: '12,000+ practitioners onboarded. 94% reduction in compliance-related license lapses. Partnered with 3 major healthcare staffing agencies.',
      target: 'Allied Health Professionals, Healthcare Staffing Agencies, Hospital Compliance Officers',
      usage: 'Practitioners connect their state licenses, system monitors requirements, and sends proactive alerts 90/60/30 days before deadlines.',
    },
    link: '/apps/license-hub',
  },
  {
    id: 'seo-scanner',
    title: 'SEO Scanner',
    type: 'app',
    category: 'Marketing Tech',
    tagline: 'Edge-Based HTML Audit Tool',
    techStack: [
      { name: 'Cloudflare Workers', reason: 'Edge computing provides sub-50ms response times and eliminates cold start latency' },
      { name: 'HTMLRewriter', reason: 'Streaming HTML transformation enables real-time DOM analysis without full page load' },
      { name: 'Cheerio', reason: 'jQuery-like syntax simplifies complex selector queries for meta tag extraction' },
    ],
    context: {
      problem: 'Marketing teams lack visibility into SEO issues until Google indexes broken pages. Manual audits are time-consuming and miss dynamic content problems.',
      solution: 'Built an edge-deployed scanner that crawls pages in real-time, analyzing title tags, meta descriptions, Open Graph tags, and structured data. Results are categorized by severity with actionable fix suggestions.',
      impact: 'Reduced SEO issue detection time from 2 weeks to 2 minutes. 340% improvement in organic traffic within 6 months for pilot clients.',
      target: 'SEO Managers, Content Strategists, Digital Marketing Directors',
      usage: 'Input URL or sitemap, receive instant audit report with prioritized issues and one-click JIRA ticket creation.',
    },
    link: '/apps/seo-scanner',
  },
  {
    id: 'clinical-compass',
    title: 'Clinical Compass',
    type: 'app',
    category: 'Clinical Ops',
    tagline: 'Multi-step Protocol Wizard',
    techStack: [
      { name: 'React Context', reason: 'Global state management for multi-step form data without prop drilling complexity' },
      { name: 'Framer Motion', reason: 'Physics-based animations provide tactile feedback essential for clinical confidence' },
      { name: 'Decision Trees', reason: 'Rule engine architecture allows clinicians to author protocols without developer involvement' },
    ],
    context: {
      problem: 'Clinical protocols are trapped in static PDFs. Practitioners make errors navigating complex decision trees, leading to patient safety risks and documentation gaps.',
      solution: 'Created an interactive wizard that guides clinicians through evidence-based protocols step-by-step. Each decision point includes rationale, contraindications, and auto-generates compliant documentation.',
      impact: 'Adopted by 8 hospital networks. Protocol adherence increased from 73% to 96%. Documentation completeness improved by 41%.',
      target: 'Clinical Directors, Nurse Managers, Quality Improvement Officers',
      usage: 'Integrated into EHR workflow. Clinicians launch protocol from patient chart, complete wizard, and documentation syncs automatically.',
    },
    link: '/apps/clinical-compass',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // INTERNAL ENGINEERING TOOLS (Code)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'mcp-cli-wrapper',
    title: 'MCP CLI Wrapper',
    type: 'tool',
    category: 'DevOps',
    tagline: 'Unified Command Interface',
    techStack: [
      { name: 'Node.js', reason: 'Native async I/O handles concurrent subprocess management efficiently' },
      { name: 'Child Process', reason: 'Spawn API provides granular control over stdin/stdout streams for real-time logging' },
      { name: 'Commander.js', reason: 'Industry-standard CLI framework with automatic help generation and validation' },
    ],
    context: {
      problem: 'Multiple MCP servers require different invocation patterns, environment variables, and configuration flags. Context switching between tools creates cognitive overhead and error-prone manual commands.',
      solution: 'Built a unified CLI wrapper that normalizes invocation across all MCP servers. Features include intelligent defaults, environment detection, and composable command chaining for common workflows.',
      impact: 'Reduced onboarding time for new engineers from 2 days to 2 hours. 89% reduction in configuration-related support tickets.',
      target: 'Development Team, DevOps Engineers, Technical Leads',
      usage: 'Single entry point for all MCP operations. Auto-detects context, applies defaults, and provides interactive prompts for missing parameters.',
    },
    command: 'npx mcp-cli --server content --action generate --format json',
  },
  {
    id: 'image-build-pipeline',
    title: 'Image Build Pipeline',
    type: 'tool',
    category: 'Automation',
    tagline: 'Automated Asset Optimization',
    techStack: [
      { name: 'Sharp', reason: 'Fastest Node.js image processing library, built on libvips for production-grade performance' },
      { name: 'Node.js', reason: 'Single runtime for build tooling ensures consistent behavior across CI/CD environments' },
      { name: 'WebP', reason: 'Modern format delivers 25-34% smaller files than JPEG at equivalent quality' },
    ],
    context: {
      problem: 'Designers upload raw assets that bloat bundle sizes and tank Core Web Vitals. Manual optimization is tedious and inconsistent across team members.',
      solution: 'Created an automated pipeline that watches asset directories, applies intelligent compression, generates responsive variants (1x, 2x, 3x), and outputs WebP/AVIF with JPEG fallbacks.',
      impact: 'Average page weight reduced by 62%. Lighthouse performance score increased from 67 to 94. CI build time reduced by 40% due to cached assets.',
      target: 'Frontend Developers, Design Operations, Build Engineers',
      usage: 'Drop images into /public/images, pipeline auto-processes on commit. Outputs manifest.json for dynamic srcset generation.',
    },
    command: 'npm run images:build -- --quality 85 --formats webp,avif',
  },
  {
    id: 'scrape-generate-cli',
    title: 'Scrape & Generate CLI',
    type: 'tool',
    category: 'Content Gen',
    tagline: 'AI-Powered Inspiration Fetcher',
    techStack: [
      { name: 'Cheerio', reason: 'Lightweight DOM parser enables fast extraction without browser overhead' },
      { name: 'Gemini AI', reason: 'Multimodal capabilities allow analysis of both text and visual design patterns' },
      { name: 'Axios', reason: 'Promise-based HTTP client with automatic retry logic for resilient scraping' },
    ],
    context: {
      problem: 'Creative teams spend hours manually collecting design inspiration, organizing references, and synthesizing patterns across disparate sources.',
      solution: 'Built a CLI tool that scrapes design galleries, extracts visual patterns, and uses AI to generate structured inspiration briefs. Outputs include color palettes, typography analysis, and layout recommendations.',
      impact: 'Creative research time reduced by 78%. Generated 200+ design briefs feeding into brand development workflows.',
      target: 'Creative Directors, Brand Designers, Design System Teams',
      usage: 'Feed URLs or search terms, CLI fetches and analyzes, outputs structured JSON ready for design handoff.',
    },
    command: 'npx scrape-gen --source dribbble --query "SaaS dashboard" --ai-analysis',
  },
  {
    id: 'icon-factory',
    title: 'Icon Component Factory',
    type: 'tool',
    category: 'Build Tool',
    tagline: 'SVG-to-React Transformation Engine',
    techStack: [
      { name: 'SVGR', reason: 'Industry-standard AST transformer that converts raw SVG strings into tree-shakable React components.' },
      { name: 'Prettier', reason: 'Enforces consistent formatting on generated files to ensure they pass linting rules automatically.' },
      { name: 'TypeScript', reason: "Auto-generates interface definitions for props like 'size' and 'color' to ensure type safety." }
    ],
    command: "npm run icons:compile -- --prefix='Icon' --typescript",
    context: {
      problem: 'Designers hand off raw SVGs with inconsistent attributes, leading to spaghetti code and bloated DOMs.',
      solution: 'A build-step script that sanitizes raw SVG files, converts attributes to camelCase, and wraps them in a standardized React functional component template.',
      impact: 'Reduced icon bundle size by 40% and eliminated hydration mismatches.',
      target: 'UI Engineers, Design Systems Team',
      usage: 'Run on commit when new assets are added.',
    },
  },
  {
    id: 'route-auditor',
    title: 'Route Integrity Monitor',
    type: 'tool',
    category: 'QA Automation',
    tagline: 'Dead Link & Redirect Sentinel',
    techStack: [
      { name: 'Node.js', reason: 'Leverages the file system (fs) to recursively scan the codebase for link patterns.' },
      { name: 'Glob', reason: 'Efficient pattern matching to identify all tsx/mdx files.' },
      { name: 'Chalk', reason: 'Provides color-coded terminal output for critical errors.' }
    ],
    command: 'npm run audit:routes -- --strict --report=json',
    context: {
      problem: 'Internal links to renamed or moved pages were breaking, silently hurting SEO authority.',
      solution: 'A static analysis tool that parses every Link tag, compares hrefs against a valid route registry, and flags orphans.',
      impact: 'Achieved 0% broken links in production and prevented 3 critical SEO regressions.',
      target: 'SEO Specialists, QA Engineers',
      usage: 'Pre-commit hook.',
    },
  },
  {
    id: 'bundle-analyzer',
    title: 'Bundle Anatomy Lab',
    type: 'tool',
    category: 'Performance',
    tagline: 'Dependency Weight Visualizer',
    techStack: [
      { name: 'Rollup', reason: 'Exposes the module graph for detailed analysis.' },
      { name: 'Brotli', reason: "Calculates 'real world' transfer size of assets." },
      { name: 'D3.js', reason: 'Powers the interactive treemap visualization.' }
    ],
    command: 'npm run build:analyze -- --mode=treemap --open',
    context: {
      problem: 'Accidental import of heavy libraries was silently bloating the main bundle.',
      solution: 'An interactive visualization step injected into the build pipeline to map module sizes.',
      impact: 'Identified and removed 200kb of unused dependencies. Improved TTI by 1.2s.',
      target: 'Performance Engineers',
      usage: 'Monthly dependency audit.',
    },
  },
  {
    id: 'theme-tokenizer',
    title: 'Design Token Engine',
    type: 'tool',
    category: 'Design Ops',
    tagline: 'Figma-to-Tailwind Sync Bridge',
    techStack: [
      { name: 'Figma API', reason: 'Direct REST connection to fetch latest styles.' },
      { name: 'Zod', reason: 'Validates incoming token schema.' },
      { name: 'PostCSS', reason: 'Transforms tokens into CSS variables.' }
    ],
    command: 'npm run theme:sync -- --file=ocean-pearl-v2',
    context: {
      problem: 'Manual copying of hex codes resulted in design drift and magic numbers.',
      solution: 'Automated bridge that fetches Figma styles and auto-generates tailwind.config.js.',
      impact: 'Reduced handoff time by 50% and ensured 100% color accuracy.',
      target: 'Frontend Leads, UI Designers',
      usage: 'Triggered on UI Kit updates.',
    },
  },
  {
    id: 'og-generator',
    title: 'Open Graph Automator',
    type: 'tool',
    category: 'Brand Ops',
    tagline: 'Programmatic Social Asset Factory',
    techStack: [
      { name: 'Puppeteer', reason: "Headless browser automation to 'screenshot' components." },
      { name: 'Canvas API', reason: 'Pixel-perfect compositing of brand overlays.' },
      { name: 'Node.js', reason: 'Orchestrates batch generation.' }
    ],
    command: 'npm run generate-social-images -- --force',
    context: {
      problem: 'Manually designing social cards for every post is unscalable.',
      solution: 'Headless script that renders a React template for each route and captures a screenshot.',
      impact: 'Ensured 100% brand consistency and saved ~2 hours/launch.',
      target: 'Brand Directors',
      usage: "Runs during 'magic:assets' build.",
    },
  },
  {
    id: 'telemetry-dashboard',
    title: 'The Quality Gatekeeper',
    type: 'tool',
    category: 'QA Automation',
    tagline: 'Composite Health Scoring Engine',
    techStack: [
      { name: 'Lighthouse CI', reason: 'Programmatic access to Core Web Vitals.' },
      { name: 'Pa11y', reason: 'Automated accessibility scanner.' },
      { name: 'Chalk', reason: 'Color-coded terminal dashboards.' }
    ],
    command: 'npm run audit-score -- --strict',
    context: {
      problem: 'Performance regressions often go unnoticed until SEO drops.',
      solution: "Custom script that runs audits and calculates a composite 'Health Score'.",
      impact: 'Maintained 100/100 Accessibility score.',
      target: 'QA Engineers',
      usage: 'Pre-push git hook.',
    },
  },
  {
    id: 'edge-personalizer',
    title: 'Edge Geo-Personalizer',
    type: 'tool',
    category: 'Edge Computing',
    tagline: 'Serverless Localization Engine',
    techStack: [
      { name: 'Cloudflare Workers', reason: 'Executes logic at the network edge.' },
      { name: 'V8 Runtime', reason: 'Shares utility code between frontend and edge.' },
      { name: 'Geolocation API', reason: 'Extracts country/city from request headers.' }
    ],
    command: 'Deployed to: functions/api/geo.js',
    context: {
      problem: 'Static sites feel impersonal without dynamic origins.',
      solution: 'Edge function that intercepts requests and injects location data into hydration state.',
      impact: 'Increased engagement by 15% via localized hooks.',
      target: 'Growth Engineers',
      usage: 'Active on every page load.',
    },
  },
];
