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
      usage: 'Embedded within CRM workflow. Reps input prospect data, system generates ROI model, and exports branded proposal—all within the sales call.',
    },
    link: '/apps/growth-engine',
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
];
