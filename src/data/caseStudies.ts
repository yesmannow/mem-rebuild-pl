import { ReactNode } from 'react';

export interface RichSection {
  paragraphs?: string[];
  bullets?: string[];
}

export interface CaseStudy {
  color?: string;
  icon?: ReactNode;
  slug: string;
  title: string;
  image: string;
  tagline: string;
  category: string[];
  tags: string[];
  technologies?: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  strategy: string;
  impact: string;
  fullContent?: {
    challenge?: string | RichSection;
    strategy?: string | RichSection;
    impact?: string | RichSection;
  };
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'the-launchpad',
    title: 'The Launchpad',
    image: '/images/case-studies/brand-identity-systems.svg',
    tagline: 'Transforming a static directory into a revenue engine for practitioners',
    category: ['Product Vision', 'Lifecycle Marketing'],
    tags: [
      'Product Vision',
      'Marketing Automation',
      'Lifecycle Marketing',
      'CRM Strategy',
      'Lead Nurturing',
    ],
    color: '#7C5CFF',
    icon: '🚀',
    metrics: [
      { label: 'Qualified Leads', value: '+212%' },
      { label: 'Lead-to-Demo Conversion', value: '+38%' },
      { label: 'New Revenue (6 months)', value: '$310K' },
    ],
    challenge:
      'A beloved practitioner directory had audience trust but almost zero monetisation. Listings looked pretty yet produced no measurable pipeline.',
    strategy:
      'Architected a full-funnel growth system that recast the directory as a performance product with automation, segmentation, and conversion paths.',
    impact:
      'The relaunch produced triple-digit growth in revenue-driving metrics and established a repeatable model for regional expansions.',
    fullContent: {
      challenge: {
        paragraphs: [
          'When I first inherited the directory it was a glossy brochure. Practitioners felt proud to be listed, but they could not tie the membership fee to real outcomes. There were no lead capture points, no attribution, and the CRM had no idea who was browsing the directory. Without proof of value renewals were a coin flip and sales conversations turned into discounts.',
          'The brief was clear: turn the directory into an engine that proved value every single month, captured demand the second it appeared, and gave sales a predictable pipeline to close.',
        ],
        bullets: [
          'No measurement beyond vanity page views',
          'Manual CSV exports for email follow up',
          'Zero segmentation or nurture for high-intent prospects',
        ],
      },
      strategy: {
        paragraphs: [
          'I reframed the entire experience as a productised acquisition journey. The build combined net-new UX, data architecture, and marketing automation so the directory could sell itself.',
        ],
        bullets: [
          'Designed new path-to-value with comparison widgets, outcomes copy, and embedded lead capture for every listing',
          'Implemented a headless sync between the directory, HubSpot, and FluentCRM that scored behaviour in real time',
          'Launched nurture sequences that reacted to signals—repeat visits, resource downloads, and geo intent',
          'Delivered weekly revenue stand-ups with cohort and persona level reporting so the team could optimise within hours',
        ],
      },
      impact: {
        paragraphs: [
          'Six months after launch the directory was unrecognisable. Practitioners finally saw deal flow, the sales team knew exactly who to call, and finance could forecast renewals with confidence.',
        ],
        bullets: [
          'Qualified leads increased 212% with a 38% lift in lead-to-demo conversions',
          'Membership renewals jumped 24 points because every provider received automated ROI proof',
          'Regional expansion blueprint created an additional $310K in attributable revenue',
        ],
      },
    },
    featured: true,
  },
  {
    slug: 'the-guardian',
    title: 'The Guardian',
    image: '/images/case-studies/the-closer.svg',
    tagline: 'Turning compliance pain into an automated trust-and-sales engine',
    category: ['Automation', 'Customer Empathy'],
    tags: [
      'Customer Empathy',
      'Data Architecture',
      'Proactive Automation',
      'Sales Funnel Development',
    ],
    color: '#FF8A65',
    icon: '🛡️',
    metrics: [
      { label: 'Time to Compliance', value: 'Minutes → Seconds' },
      { label: 'Upsell Conversion', value: '+27%' },
      { label: 'Support Tickets', value: '-68%' },
    ],
    challenge:
      'Clinics constantly phoned support to understand certification rules. The experience eroded trust and consumed the team’s time.',
    strategy:
      'Built an intelligent assistant that merged compliance data, purchase history, and nurture automations into a single workflow.',
    impact:
      'I moved the organisation from reactive firefighting to proactive enablement and turned mandatory compliance into a new revenue stream.',
    fullContent: {
      challenge: {
        paragraphs: [
          'Compliance questions were the number one support issue. Every state, credential, and renewal window had different requirements. Customers were anxious about missing a deadline and agents were digging through spreadsheets to answer the same questions over and over again.',
          'The human cost was enormous: 45% of support capacity disappeared into compliance responses and the team missed obvious upgrade moments because agents were in catch-up mode.',
        ],
        bullets: [
          'Multiple disconnected compliance sources with conflicting updates',
          'No way to tie a customer’s purchases to required credentials',
          'Support could not spot when a practitioner was eligible for premium offerings',
        ],
      },
      strategy: {
        paragraphs: [
          'I reverse engineered every question I heard and mapped it against data the business already owned. Then I designed an automation stack that answered the question before the customer could send an email.',
        ],
        bullets: [
          'Centralised state and board requirements inside a structured data warehouse refreshed nightly',
          'Authenticated experience that surfaces personalised compliance status and next steps when customers log in',
          'Trigger-based journeys in FluentCRM that automatically send reminders, curated CE options, and one-click upgrade paths',
          'Escalation workflow that summarises customer context for humans only when intent or risk is high',
        ],
      },
      impact: {
        paragraphs: [
          'Compliance moved from cost centre to conversion lever. Customers trusted me with their credential journey and bought deeper into the ecosystem.',
        ],
        bullets: [
          'Support tickets related to compliance dropped 68% within two months',
          'Self-service portal resolves 92% of inquiries in under 30 seconds',
          'Personalised upsell prompts increased advanced course conversion by 27%',
        ],
      },
    },
    featured: true,
  },
  {
    slug: 'the-compass',
    title: 'The Compass',
    image: '/images/case-studies/the-compass.svg',
    tagline: 'Rebuilding analytics and attribution so every dollar is accountable',
    category: ['Analytics', 'Data Strategy'],
    tags: [
      'Analytics Engineering',
      'Data Integrity',
      'Conversion Rate Optimization',
      'Performance Marketing',
      'GTM',
    ],
    color: '#34D399',
    icon: '🧭',
    metrics: [
      { label: 'Attribution Accuracy', value: '+46 pts' },
      { label: 'CAC Efficiency', value: '+32%' },
      { label: 'Revenue Visibility', value: 'Full Funnel' },
    ],
    challenge:
      'Leadership made six-figure decisions without reliable attribution. Data lived in silos and nothing reconciled.',
    strategy:
      'Engineered an analytics pipeline that unified web, CRM, and finance data with rock-solid governance and storytelling dashboards.',
    impact:
      'Marketing finally operated with instrumentation-grade clarity and could optimise spend in real time.',
    fullContent: {
      challenge: {
        paragraphs: [
          'Reporting conversations felt like guesswork. GA4, WooCommerce, and the CRM all disagreed on revenue. Finance pulled numbers from QuickBooks, marketing exported spreadsheets, and nobody trusted any of it. Without a shared truth the team flew blind when planning campaigns or forecasting inventory.',
        ],
        bullets: [
          'Duplicate and unclassified traffic sources made attribution meaningless',
          'Cohort retention was invisible because transactional data never met lifecycle tags',
          'Executives spent hours reconciling numbers every quarter',
        ],
      },
      strategy: {
        paragraphs: [
          'I treated analytics like a product. I documented the questions leaders needed answered, then built the plumbing to answer them daily.',
        ],
        bullets: [
          'Implemented a first-party event model in GTM with 60+ custom events aligned to lifecycle milestones',
          'Streamed orders and subscription events into a Snowflake warehouse, resolving customer identities across platforms',
          'Authored dbt models that created trustworthy revenue, LTV, and funnel views with automated QA',
          'Delivered executive dashboards in Looker Studio with story-first narratives that visualised momentum, risks, and next actions',
        ],
      },
      impact: {
        paragraphs: [
          'Within one quarter marketing decisions shifted from feelings to forecasts. Budget moved to the channels that won, and experiments were decided in days instead of months.',
        ],
        bullets: [
          'Attribution accuracy improved by 46 percentage points and CAC efficiency climbed 32%',
          'Weekly growth council now runs on dashboards that blend spend, pipeline, and revenue in one place',
          'Finance reconciles to marketing within minutes—no more midnight spreadsheets',
        ],
      },
    },
    featured: true,
  },
  {
    slug: 'the-fortress',
    title: 'The Fortress',
    image: '/images/case-studies/the-fortress.svg',
    tagline: 'Standing up an edge-first security posture that protects revenue 24/7',
    category: ['Security', 'Risk Mitigation'],
    tags: [
      'Infrastructure Security',
      'Performance Tuning',
      'DevOps',
      'Cloudflare',
      'Risk Mitigation',
    ],
    color: '#60A5FA',
    icon: '🛡️',
    metrics: [
      { label: 'Threats Blocked', value: '85K+/month' },
      { label: 'Cache Hit Ratio', value: '86%' },
      { label: 'Page Speed', value: '+210%' },
    ],
    challenge:
      'Persistent bot attacks and scrapers slowed the storefront, spiked hosting bills, and threatened customer trust.',
    strategy:
      'Implemented a multi-layered Cloudflare stack with proactive rules, observability, and performance tuning at the edge.',
    impact:
      'Revenue-critical experiences stayed fast, safe, and available—even during coordinated attacks.',
    fullContent: {
      challenge: {
        paragraphs: [
          'The team was caught in a losing game of whack-a-mole. Malicious bots pounded wp-login, scrapers hammered the directory, and marketing launches slowed to a crawl whenever attacks spiked. Security and performance were treated separately, so fixes solved one problem and created another.',
        ],
        bullets: [
          '80% of traffic was non-human noise hitting expensive PHP endpoints',
          'Average page load ballooned to 5.8 seconds during attacks',
          'Teams paused campaign launches because they feared downtime',
        ],
      },
      strategy: {
        paragraphs: [
          'I moved the fight to the edge. I designed a layered defence that filtered, cached, and monitored before traffic ever touched WordPress.',
        ],
        bullets: [
          'Deployed Cloudflare WAF with custom rules to challenge suspicious behaviour and block credential stuffing',
          "Implemented rate limiting on sensitive routes, plus bot management tuned to the site's content patterns",
          'Built observability with Workers KV logs, Grafana dashboards, and automated alerts piped to Slack',
          'Optimised origin performance with object caching, image optimisation, and queue-based background jobs',
        ],
      },
      impact: {
        paragraphs: [
          'Security became an enabler. Marketing could ship promotions during peak traffic knowing the platform would hold.',
        ],
        bullets: [
          'Blocked 85,000+ malicious hits every month and cut server load in half',
          'Edge caching pushed the cache-hit ratio to 86% while improving conversion-critical page speeds by 210%',
          'Incident response playbooks now resolve edge anomalies in under 5 minutes',
        ],
      },
    },
    featured: true,
  },
  {
    slug: 'the-conductor',
    title: 'The Conductor',
    image: '/images/case-studies/command-center.svg',
    tagline: 'Orchestrating a unified data pipeline across marketing, education, and finance',
    category: ['Systems Integration', 'Automation'],
    tags: ['Systems Integration', 'Data Architecture', 'Process Automation', 'MarTech'],
    color: '#F472B6',
    icon: '🎼',
    metrics: [
      { label: 'Platforms Unified', value: '6' },
      { label: 'Manual Hours Saved', value: '48 hrs/week' },
      { label: 'Data Accuracy', value: '99.8%' },
    ],
    challenge:
      'WooCommerce, LearnDash, Gravity Forms, FluentCRM, and Google Sheets all told different stories. Teams worked from conflicting data.',
    strategy:
      'Built a central nervous system that synced transactions, learning progress, and customer states with zero manual intervention.',
    impact:
      'Every department now operates from the same live truth, and automation handles the busywork humans used to dread.',
    fullContent: {
      challenge: {
        paragraphs: [
          'Operations, education, and marketing each maintained their own spreadsheets. Course completion in LearnDash never triggered CRM tags, finance manually reconciled payment plans, and instructors could not see who was actually progressing. The business needed orchestration, not more logins.',
        ],
        bullets: [
          'Data fragmentation created conflicting metrics at weekly stand-ups',
          'Manual CSV imports introduced costly mistakes and delays',
          'Students experienced inconsistent messaging because platforms were unaware of each other',
        ],
      },
      strategy: {
        paragraphs: [
          'I mapped the lifecycle from purchase to renewal, then engineered connectors that carried truth to every system.',
        ],
        bullets: [
          'Custom Node.js workers pulled events from WooCommerce, LearnDash, and Gravity Forms on a rolling schedule',
          'FluentCRM automations reacted instantly to state changes—sending sequences, updating health scores, and notifying account owners',
          'Centralised warehouse normalised entities so finance, ops, and marketing saw identical metrics',
          'Created instructor dashboards that surfaced attendance, satisfaction, and outstanding tasks',
        ],
      },
      impact: {
        paragraphs: [
          'Orchestration unlocked both growth and sanity. Automations executed the routine so people could focus on creative work.',
        ],
        bullets: [
          'Saved 48 hours of manual data work every week and removed 11 spreadsheets from the process',
          'Automation accuracy hit 99.8%, eliminating embarrassing student miscommunications',
          'Leadership reviews now focus on decisions, not data clean up',
        ],
      },
    },
    featured: true,
  },
  {
    slug: 'the-engine-room',
    title: 'The Engine Room',
    image: '/images/case-studies/the-safety-net.svg',
    tagline: 'Rebuilding the infrastructure so speed and stability become competitive advantages',
    category: ['Performance', 'DevOps'],
    tags: ['Server Administration', 'Performance Tuning', 'DevOps', 'PHP', 'MySQL'],
    color: '#38BDF8',
    icon: '⚙️',
    metrics: [
      { label: 'Page Load Time', value: '5.8s → 1.2s' },
      { label: 'Checkout Failures', value: '-92%' },
      { label: 'Deployment Confidence', value: '99%' },
    ],
    challenge:
      'The flagship ecommerce site creaked under growth. Slow pages, checkout errors, and risky deployments limited sales velocity.',
    strategy:
      'Optimised the entire stack—from servers to CI/CD—to create a resilient platform that could ship features without fear.',
    impact:
      'Customers experienced a blazing-fast store while the team gained an always-on release pipeline.',
    fullContent: {
      challenge: {
        paragraphs: [
          'Traffic growth outpaced the infrastructure. Pages took nearly six seconds to load, checkout hiccups cost real revenue, and any code change required an all-hands prayer.',
        ],
        bullets: [
          'Legacy LEMP stack lacked object caching and PHP tuning',
          'Manual FTP deployments regularly introduced regressions',
          'Error visibility stopped at Apache logs—no observability pipeline',
        ],
      },
      strategy: {
        paragraphs: [
          'I treated performance and reliability as a product sprint. I rebuilt the foundation and automated the release process.',
        ],
        bullets: [
          'Provisioned new autoscaling infrastructure with tuned PHP-FPM workers and Redis object cache',
          'Implemented CI/CD with GitHub Actions, automated smoke tests, and instant rollback playbooks',
          'Instrumented the stack with New Relic, Sentry, and uptime monitors feeding a shared war room dashboard',
          'Refactored WooCommerce queries and introduced queue workers for heavy tasks like PDF generation',
        ],
      },
      impact: {
        paragraphs: [
          'The storefront now feels instant, support no longer braces for outages, and marketing can launch without negotiating with engineering.',
        ],
        bullets: [
          'Average page load time dropped from 5.8 seconds to 1.2 seconds',
          'Checkout failures plummeted 92% thanks to better scaling and observability',
          'Deployments happen daily with a 99% confidence score from automated health checks',
        ],
      },
    },
    featured: true,
  },
];

export const getCategories = (): string[] => {
  const categories = new Set<string>();
  for (const study of caseStudies) {
    for (const cat of study.category) {
      categories.add(cat);
    }
  }
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
};

export const getTags = (): string[] => {
  const tags = new Set<string>();
  for (const study of caseStudies) {
    for (const tag of study.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
};

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.slug === slug);
};

export const getFeaturedCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter(study => study.featured);
};
