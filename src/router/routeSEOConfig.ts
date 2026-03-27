/**
 * routeSEOConfig.ts
 *
 * Centralised SEO metadata for every route in the application.
 * Keeping this out of AppRouter.tsx makes the router easier to scan and lets
 * us update titles/descriptions without touching routing logic.
 *
 * Usage (in AppRouter.tsx):
 *   import { getSEOData } from './routeSEOConfig';
 *   const seoData = getSEOData(location.pathname);
 */

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
}

/** Returns SEO metadata for a given pathname. Falls back to `{}` for unknown routes. */
export function getSEOData(path: string): SEOData {
  if (path === '/') {
    return {
      title: 'Jacob Darling — Fractional CMO & Systems Architect',
      description:
        'Fractional CMO + Systems Architect activating high-ticket growth systems, AI-assisted creative, and cinematic GTM experiences.',
      keywords:
        'fractional cmo, systems architect, marketing automation, revenue architecture, cinematic web design, ai creative director',
    };
  }

  if (path === '/studio') {
    return {
      title: 'Studio | Visual Engineering & Digital Twilight Systems',
      description:
        'Immersive studio reel of cinematic photography, interaction design, and Digital Twilight brand systems engineered for premium launches.',
      keywords:
        'visual engineering, digital twilight, cinematic design, brand systems, 3d studio, creative direction',
    };
  }

  if (path === '/projects') {
    return {
      title: 'Flagship Projects | Agency-Grade Systems & ROI',
      description:
        'Flagship deployments combining GSAP, WebGL, and revenue architecture. Cinematic case studies for elite operators and growth teams.',
      keywords:
        'flagship case studies, gsap parallax stack, cinematic webgl, revenue systems, enterprise web design',
    };
  }

  if (path === '/resume') {
    return {
      title: 'Resume | Systems Architect & Growth Command',
      description:
        'Mission dossier covering 15+ years of systems architecture, marketing automation, AI copilots, and command-center GTM execution.',
      keywords:
        'systems architect resume, fractional cmo resume, marketing automation lead, growth operator, ai marketing director',
    };
  }

  if (path === '/side-projects') {
    return {
      title: 'Side Projects | Experimental Labs & Applied R&D',
      description:
        'Experimental labs, applied R&D, and self-funded prototypes spanning AI tooling, 3D interactions, and brand telemetry.',
      keywords: 'side projects, experimental labs, applied rnd, ai tooling, brand telemetry, indie prototypes',
    };
  }

  if (path === '/about') {
    return {
      title: 'Resume | Jacob Darling',
      description:
        'Meet Jacob Darling—marketing automation, analytics, and growth systems architect with 15+ years of experience building revenue engines for SaaS, healthcare, and e-commerce brands.',
      keywords: 'Jacob Darling, marketing strategist, marketing technologist, automation, systems architect',
    };
  }

  if (path === '/applications') {
    return {
      title: 'Developer Tools | Jacob Darling Portfolio',
      description:
        'Custom tools and applications engineered by Jacob Darling showcasing marketing automation, analytics, and product systems.',
      keywords: 'developer tools, custom applications, interactive demos, marketing technology, web tools',
    };
  }

  if (path === '/apps') {
    return {
      title: 'The Lab | Living Documentation System',
      description:
        'Interactive laboratory of live applications, internal tools, and telemetry dashboards showcasing architecture and impact.',
      keywords: 'lab, live apps, engineering tools, telemetry, portfolio',
    };
  }

  if (path.startsWith('/applications/')) {
    return {
      title: 'Developer Tool | Jacob Darling Portfolio',
      description:
        'Deep dive into a custom tool or application engineered by Jacob Darling to solve real marketing, sales, and operations challenges.',
    };
  }

  if (path === '/services') {
    return {
      title: 'Services | Jacob Darling Portfolio',
      description:
        'Deployable marketing systems. Audit, architect, automate, and scale your marketing operations with proven frameworks and pre-built modules.',
      keywords:
        'marketing automation, marketing systems, growth operations, marketing technology, CRM automation',
    };
  }

  if (path === '/tools') {
    return {
      title: 'CLI Tools & MCP Servers | Jacob Darling Portfolio',
      description:
        'Command-line utilities, automation scripts, and MCP servers for portfolio development, content generation, and design system management.',
      keywords: 'CLI tools, MCP servers, automation, build tools, content generation, developer tools',
    };
  }

  if (path === '/devops') {
    return {
      title: 'DevOps & Deployment | Jacob Darling Portfolio',
      description:
        'Deep dive into deployment architecture, dual base path configuration, custom element guards, and bundle optimization strategies.',
      keywords: 'devops, deployment, vite, github pages, cloudflare pages, build optimization, CI/CD',
    };
  }

  if (path === '/war-room') {
    return {
      title: 'The War Room | Jacob Darling Portfolio',
      description:
        'A transparent, real-time look at how we executed a multi-week site optimization project, transforming performance, security, and reliability from the server to the browser.',
      keywords:
        'devops, system optimization, performance tuning, server administration, cloudflare, litespeed, redis',
    };
  }

  if (path === '/resume-print') {
    return {
      title: 'Resume - Jacob Darling | Marketing Director & Systems Architect',
      description:
        'ATS-optimized, printable resume for Jacob Darling - Marketing Director & Systems Architect with 15+ years experience building revenue-driving infrastructure.',
      keywords: 'resume, CV, marketing director, systems architect, ATS, printable resume',
    };
  }

  if (path === '/case-studies') {
    return {
      title: 'Case Studies | Jacob Darling Portfolio',
      description:
        'Detailed case studies showing problem-solving approach and measurable results in marketing automation and systems architecture',
      keywords: 'marketing case studies, project portfolio, marketing automation examples',
    };
  }

  if (path.startsWith('/case-studies/')) {
    return {
      title: 'Case Study | Jacob Darling Portfolio',
      description: 'Detailed case study showing problem-solving approach and measurable results',
    };
  }

  if (path === '/contact') {
    return {
      title: 'Contact | Jacob Darling Portfolio',
      description:
        'Get in touch with Jacob Darling for job opportunities, collaborations, or consulting inquiries',
      keywords: 'contact, hire, job opportunity, marketing consultant',
    };
  }

  if (path === '/design') {
    return {
      title: 'Design Portfolio | Jacob Darling Portfolio',
      description:
        'Explore a curated collection of design work including branding, digital design, print campaigns, and creative concepts',
      keywords: 'design portfolio, graphic design, branding, digital design, print design, creative design',
    };
  }

  if (path === '/graphic-design') {
    return {
      title: 'Graphic Design Portfolio | Jacob Darling Portfolio',
      description:
        'Explore a curated collection of graphic design work including branding, digital layouts, album artwork, and creative direction',
      keywords:
        'graphic design, branding, digital design, album artwork, creative direction, visual identity',
    };
  }

  if (path === '/photography') {
    return {
      title: 'Photography Portfolio | Jacob Darling Portfolio',
      description:
        'Explore a curated collection of photography work capturing moments that inspire and connect',
      keywords: 'photography, visual storytelling, photo gallery, Adobe Lightroom, photographic portfolio',
    };
  }

  if (path === '/creative') {
    return {
      title: 'Creative Work | Jacob Darling Portfolio',
      description:
        'Explore creative work across photography, graphic design, branding systems, web builds, and motion design',
      keywords:
        'creative portfolio, photography, graphic design, branding, web design, motion design, visual design',
    };
  }

  if (path === '/gallery') {
    return {
      title: 'Brand Gallery | Jacob Darling Portfolio',
      description:
        'Explore curated brand identity systems and design systems created with the Brand Builder',
      keywords: 'brand gallery, brand boards, design systems, brand identity',
    };
  }

  if (path === '/brand-builder') {
    return {
      title: 'Brand Builder | Jacob Darling Portfolio',
      description:
        'Create a complete brand identity system in minutes with our interactive brand builder',
      keywords: 'brand builder, brand identity, design system, brand creation',
    };
  }

  if (path === '/showcase') {
    return {
      title: 'Component Showcase | Jacob Darling Portfolio',
      description:
        'Interactive showcase of modern UI components featuring particle effects, glassmorphism, and smooth animations',
      keywords: 'component showcase, UI components, interactive demos, particle effects, glassmorphism',
    };
  }

  if (path === '/design-system') {
    return {
      title: 'Design System Demo | Jacob Darling Portfolio',
      description:
        'Interactive demo of the new design system featuring design tokens, typography, and accessible components',
      keywords: 'design system, design tokens, typography, accessibility, UI components',
    };
  }

  if (path.startsWith('/brand/')) {
    return {
      title: 'Brand Board | Jacob Darling Portfolio',
      description: 'Explore this brand identity system and design tokens',
    };
  }

  if (path === '/apps/growth-engine') {
    return {
      title: 'Growth Engine | Jacob Darling Portfolio',
      description: 'ROI modeling & quote generation tools for sales enablement',
    };
  }

  if (path === '/apps/seo-scanner') {
    return {
      title: 'SEO Scanner | Jacob Darling Portfolio',
      description: 'Edge HTMLRewriter audit for titles, meta descriptions, H1, and og:image.',
    };
  }

  if (path === '/apps/license-hub') {
    return {
      title: 'License Hub | Jacob Darling Portfolio',
      description: '50-state compliance database for continuing education requirements',
    };
  }

  if (path === '/apps/clinical-compass') {
    return {
      title: 'Clinical Compass | Jacob Darling Portfolio',
      description: 'Logic-based treatment protocols and clinical reasoning tool',
    };
  }

  if (path === '/business-development-demo') {
    return {
      title: 'Law Firm Business Development Components | Jacob Darling Portfolio',
      description:
        'Demo of enterprise-grade law firm components including Representative Matters Grid, Industry Hub Layouts, and DEI Statistics - built for Fortune 100 corporate clients.',
      keywords:
        'law firm components, legal marketing, business development, corporate legal, representative matters, industry microsites, DEI statistics',
    };
  }

  if (path === '/legal/workers-compensation') {
    return {
      title: "Workers' Compensation Law Demo | Jacob Darling Portfolio",
      description:
        "Interactive demo showcasing AI legal concierge and Indiana district map for workers' compensation practice.",
      keywords: 'workers compensation, legal tech, interactive map, AI chatbot, Indiana law',
    };
  }

  if (path === '/legal/litigation') {
    return {
      title: 'Litigation Practice Demo | Jacob Darling Portfolio',
      description:
        'Interactive litigation practice demo with district court mapping and AI legal assistant.',
      keywords: 'litigation, trial practice, legal tech, court mapping, AI assistant',
    };
  }

  if (path === '/legal/business-law') {
    return {
      title: 'Business & Corporate Law Demo | Jacob Darling Portfolio',
      description:
        'Business law demo featuring real-time market ticker and AI legal concierge for corporate clients.',
      keywords: 'business law, corporate law, M&A, legal tech, market data',
    };
  }

  if (path === '/legal/finance-industry') {
    return {
      title: 'Financial Services Law Demo | Jacob Darling Portfolio',
      description:
        'Financial services legal demo with market data integration and regulatory compliance tools.',
      keywords: 'financial services, banking law, securities, regulatory compliance, legal tech',
    };
  }

  // Fallback — SEOHead will use its own defaults
  return {};
}
