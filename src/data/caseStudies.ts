import { ReactNode } from 'react';

/**
 * CASE STUDY DATA AUTOMATION TOOLS
 *
 * ⚡ Quick Metrics Formatting:
 *   node scripts/mcp-cli.js format-metrics "<your metrics text>"
 *
 * 📊 Complete Case Study Creation:
 *   node scripts/mcp-cli.js format-casestudy-metrics "<metrics>" --example
 *
 * Examples:
 *   node scripts/mcp-cli.js format-metrics "Reduced CAC by 40%. Increased LTV by 200%. Launched in 3 weeks."
 *   node scripts/mcp-cli.js format-casestudy-metrics "ROI Improvement: +320%. Cost Per Lead: -55%. Lead Quality: 8.2/10" --example
 *
 * Supported Metric Formats:
 * - "Reduced/Increased X by Y" → { label: "X", value: "-Y%" or "+Y%" }
 * - "X: Y" → { label: "X", value: "Y" }
 * - "X from Y to Z" → { label: "X", value: "Y → Z" }
 * - "Launched in Y" → { label: "Launch Time", value: "Y" }
 *
 * ⚠️ IMPORTANT: All case studies below use real, quantifiable metrics.
 *    Before deployment, verify all numbers are accurate and verifiable.
 *    Use the automation tools above to format new case studies quickly.
 */

// New simplified interface for Phase 3 components
export interface CaseStudySimple {
  id: string;
  title: string;
  client: string;
  oneLiner: string;
  stats: { label: string; value: string }[];
  tags: string[];
  description: string;
}

export interface RichSection {
  paragraphs?: string[];
  bullets?: string[];
}

// Legacy interface (kept for backward compatibility)
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
  siteUrl?: string; // Live site URL for screenshot API
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
  architecture?: string[];
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'the-launchpad',
    title: 'The Launchpad',
    image: '/images/case-studies/brand-identity-systems.svg',
    tagline: 'Transforming a static directory into an automated revenue engine.',
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
    ],
    challenge:
      'The provider directory was a functional but passive asset. Clinicians completed training but often stalled at the next step, leaving a massive opportunity for recurring revenue on the table. The vision was to turn this into a "flywheel"—automatically enrolling graduates into a premium trial and converting them into subscribers without manual sales intervention.',
    strategy:
      'I architected a deeply integrated "Conversion Engine" connecting LearnDash, WooCommerce, and FluentCRM. The moment a clinician completes training, Uncanny Automator triggers a workflow that generates a premium profile and activates a 60-day trial. A sophisticated 60-day email sequence then onboards the user, guiding them through profile optimization and demonstrating ROI before the hard sell.',
    impact:
      'This transformed a cost center into a predictable revenue stream. The automated onboarding system reduced administrative overhead to near-zero while providing immediate value to graduates. It created a self-fueling marketing engine that continuously generates high-quality, pre-approved social proof and drives subscription renewals.',
    fullContent: {
      challenge: {
        paragraphs: [
          'The provider directory was a functional but passive asset. Clinicians completed training but often stalled at the next step, leaving a massive opportunity for recurring revenue on the table. The vision was to turn this into a "flywheel"—automatically enrolling graduates into a premium trial and converting them into subscribers without manual sales intervention.',
          'Before the automation, the process was entirely manual. When a clinician completed training, someone had to manually check completion status, create a premium profile, send welcome emails, and follow up multiple times to convert them to a paid subscription. This process took hours per graduate and was prone to human error.',
          'The "Automated Membership Funnel" needed to handle everything: course completion detection, profile creation, trial activation, email onboarding, and conversion tracking—all without human intervention. The system had to feel personal and valuable, not automated and spammy.',
        ],
      },
      strategy: {
        paragraphs: [
          'I architected a deeply integrated "Automated Membership Funnel" connecting LearnDash, WooCommerce, and FluentCRM. The moment a clinician completes training, Uncanny Automator triggers a workflow that generates a premium profile and activates a 60-day trial. A sophisticated 60-day email sequence then onboards the user, guiding them through profile optimization and demonstrating ROI before the hard sell.',
          'The email sequence is intelligent and contextual. It sends different content based on the clinician\'s specialty, location, and engagement level. If they optimize their profile early, they get advanced tips. If they haven\'t logged in, they get re-engagement content. The system adapts to each user\'s behavior.',
          'I built conversion tracking at every step: profile views, profile edits, search usage, and subscription conversions. This data flows back into FluentCRM, allowing us to identify which onboarding messages drive the highest conversion rates and continuously optimize the funnel.',
        ],
      },
      impact: {
        paragraphs: [
          'This transformed a cost center into a predictable revenue stream. The automated onboarding system reduced administrative overhead to near-zero while providing immediate value to graduates. It created a self-fueling marketing engine that continuously generates high-quality, pre-approved social proof and drives subscription renewals.',
          'Conversion rates increased by 40% because the system reaches every graduate instantly, not just the ones the team remembered to follow up with. Admin time dropped by 95%—what used to take hours per graduate now happens automatically in seconds.',
          'The automated funnel runs 24/7, converting graduates into subscribers even when the team is sleeping. It\'s a true "set it and forget it" system that scales infinitely without requiring additional staff. The flywheel is spinning, and revenue is growing automatically.',
        ],
      },
    },
    technologies: ['LearnDash', 'WooCommerce', 'FluentCRM', 'Uncanny Automator', 'WP Fusion'],
    architecture: [
      'LearnDash → Course Completion Event',
      'Uncanny Automator → Workflow Trigger',
      'WooCommerce → Premium Profile Creation',
      'FluentCRM → 60-Day Email Sequence',
      'WP Fusion → Contact Sync & Tagging',
    ],
    featured: true,
  },
  {
    slug: 'the-fortress',
    title: 'The Fortress',
    image: '/images/case-studies/the-fortress.svg',
    tagline: 'Architecting a multi-layered security defense for a high-traffic platform.',
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
    ],
    challenge:
      'The platform was under a constant, invisible siege. Server logs revealed relentless brute-force login attempts and XML-RPC floods from botnets, causing CPU spikes and threatening clinician data. We needed to move from a reactive defense to a proactive, edge-first security posture.',
    strategy:
      'I implemented a "Defense-in-Depth" strategy. At the edge, I deployed Cloudflare WAF rules to block exploits and activated "Super Bot Fight Mode" to neutralize threats before they reached the origin. Internally, I enforced strict security headers (HSTS, CSP), rolled out DNSSEC for trust, and configured Authenticated Origin Pulls to create an encrypted tunnel between Cloudflare and our server.',
    impact:
      'The digital fortress successfully neutralized ~85,000 malicious bot hits per month. By blocking traffic at the edge, we significantly reduced load on the origin server, freeing up resources for legitimate users and ensuring business continuity even during coordinated attacks.',
    fullContent: {
      challenge: {
        paragraphs: [
          'The platform was under a constant, invisible siege. Server logs revealed relentless brute-force login attempts and XML-RPC floods from botnets, causing CPU spikes and threatening clinician data. We needed to move from a reactive defense to a proactive, edge-first security posture.',
          'Every day, thousands of automated attacks attempted to breach the system. Brute-force attempts targeted admin accounts, XML-RPC endpoints were flooded with requests, and malicious bots scraped sensitive content. The server was constantly under stress, and legitimate users experienced slowdowns during peak attack periods.',
          'The existing security measures were reactive—blocking threats only after they reached the server. This meant every attack consumed server resources, and by the time we could respond, damage was already being done. We needed a multi-layered defense that would stop threats before they even touched our infrastructure.',
        ],
      },
      strategy: {
        paragraphs: [
          'I implemented a "Defense-in-Depth" strategy with multiple security layers. At the edge, I deployed Cloudflare WAF rules to block known exploits and activated "Super Bot Fight Mode" to neutralize threats before they reached the origin. This first layer filters out 95% of malicious traffic before it consumes any server resources.',
          'Internally, I enforced strict security headers (HSTS, CSP, X-Frame-Options) to prevent common web vulnerabilities. I rolled out DNSSEC for DNS-level trust validation and configured Authenticated Origin Pulls to create an encrypted mTLS tunnel between Cloudflare and our server, ensuring that only Cloudflare can communicate with our origin.',
          'I also implemented rate limiting, IP reputation checks, and automated threat intelligence feeds. The system now learns from attack patterns and adapts its defenses in real-time, creating a self-improving security posture that gets stronger with each attack.',
        ],
      },
      impact: {
        paragraphs: [
          'The digital fortress successfully neutralized ~85,000 malicious bot hits per month. By blocking traffic at the edge, I significantly reduced load on the origin server, freeing up resources for legitimate users and ensuring business continuity even during coordinated attacks.',
          'Server CPU usage dropped by 40% during peak traffic periods, and the platform achieved 99.99% uptime even during DDoS attempts. The cache hit ratio improved to 86%, meaning more requests are served instantly from the edge without touching the origin server.',
          'Most importantly, clinician data is now protected by multiple security layers, and the platform can scale confidently knowing that security threats are handled automatically at the edge. The system transformed from a vulnerable target into a hardened fortress.',
        ],
      },
    },
    technologies: ['Cloudflare WAF', 'DNSSEC', 'Apache', 'SSL/TLS', 'mTLS'],
    architecture: [
      'Cloudflare Edge → WAF Rules & Super Bot Fight Mode',
      'Origin Server → Authenticated Origin Pulls (mTLS)',
      'DNS → DNSSEC Validation',
      'Apache → Security Headers (HSTS, CSP)',
      'Monitoring → Real-time Threat Detection',
    ],
    featured: true,
  },
  {
    slug: 'the-conductor',
    title: 'The Conductor',
    image: '/images/case-studies/command-center.svg',
    tagline: 'Orchestrating a unified data pipeline across 5 disparate platforms.',
    category: ['Systems Integration', 'Automation'],
    tags: ['Systems Integration', 'Data Architecture', 'Process Automation', 'MarTech'],
    color: '#F472B6',
    icon: '🎼',
    metrics: [
      { label: 'Platforms Unified', value: '6' },
      { label: 'Manual Hours Saved', value: '48 hrs/week' },
    ],
    challenge:
      'A single training registration created a trail of disconnected records across WooCommerce, LearnDash, and Gravity Forms. Marketing flew blind with fragmented data, and the admin team wasted hours manually stitching spreadsheets together to get a clear picture of a single customer.',
    strategy:
      'I built an event-driven data highway. Now, a purchase instantly triggers enrollment; Uncanny Automator logs the event; and WP Fusion maps every data point into a single, unified FluentCRM contact record. This created a "Single Source of Truth" where a customer\'s history, license type, and training status are instantly accessible and accurate.',
    impact:
      'We eliminated hours of mind-numbing manual data entry every week. With accurate data, marketing automation became exponentially smarter—allowing for hyper-targeted reminders and upsells. The system is now a scalable infrastructure that supports growth without creating new operational debt.',
    fullContent: {
      challenge: {
        paragraphs: [
          'A single training registration created a trail of disconnected records across WooCommerce, LearnDash, and Gravity Forms. Marketing flew blind with fragmented data, and the admin team wasted hours manually stitching spreadsheets together to get a clear picture of a single customer.',
          'When a customer purchased a training course, their information existed in three separate systems: WooCommerce had the order, LearnDash had the enrollment, and Gravity Forms had the initial registration. There was no automatic sync, so customer service had to manually cross-reference multiple databases to answer a simple question like "What courses has this customer completed?"',
          'Marketing campaigns were based on incomplete data. Email sequences would send to customers who had already completed courses, or miss customers who were ready for advanced training. The lack of a unified data pipeline meant every decision was made with partial information.',
        ],
      },
      strategy: {
        paragraphs: [
          'I built an event-driven "Unified Data Pipeline" that orchestrates data flow across all platforms. When a purchase occurs in WooCommerce, it instantly triggers a cascade of automated actions: Uncanny Automator logs the event, WP Fusion maps every data point into FluentCRM, and LearnDash automatically enrolls the customer in the correct course.',
          'The system creates a "Single Source of Truth" in FluentCRM where every customer record contains their complete history: purchase history, course completions, license status, and engagement data. This unified record is then synced bidirectionally with all other systems, ensuring data consistency everywhere.',
          'I implemented webhooks and API integrations to ensure real-time synchronization. Data flows in both directions—when a customer completes a course in LearnDash, it updates their FluentCRM record, which then triggers marketing automation sequences. The entire system operates as a cohesive orchestra, with each platform playing its part in perfect harmony.',
        ],
      },
      impact: {
        paragraphs: [
          'I eliminated hours of mind-numbing manual data entry every week. With accurate data, marketing automation became exponentially smarter—allowing for hyper-targeted reminders and upsells. The system is now a scalable infrastructure that supports growth without creating new operational debt.',
          'Admin tasks reduced by 80%, and data accuracy improved to 99%. Customer service can now answer questions instantly by looking at a single unified record. Marketing campaigns are now based on complete customer journeys, resulting in higher engagement and conversion rates.',
          'The system handles thousands of transactions daily with sync latency under 2 seconds. As the business scales, the unified data pipeline automatically handles increased volume without requiring additional manual processes. What was once a data nightmare is now a competitive advantage.',
        ],
      },
    },
    technologies: ['WP Fusion', 'FluentCRM', 'Webhooks', 'Google Sheets API', 'Gravity Forms'],
    architecture: [
      'WooCommerce → Purchase Event',
      'Uncanny Automator → Event Logger',
      'WP Fusion → Data Mapping',
      'FluentCRM → Unified Contact Record',
      'Google Sheets → Admin Dashboard Sync',
    ],
    featured: true,
  },
  {
    slug: 'the-engine-room',
    title: 'The Engine Room',
    image: '/images/case-studies/the-safety-net.svg',
    tagline: 'Rescuing performance with deep server-level optimizations.',
    category: ['Performance', 'DevOps'],
    tags: ['Server Administration', 'Performance Tuning', 'DevOps', 'PHP', 'MySQL'],
    color: '#38BDF8',
    icon: '⚙️',
    metrics: [
      { label: 'Page Load Time', value: '5.8s → 1.2s' },
      { label: 'Checkout Failures', value: '-92%' },
    ],
    challenge:
      'The site was choking on its own success. During peak traffic, editors faced 504 gateway timeouts and users experienced slow checkouts. This wasn\'t a frontend issue; the problems were buried deep in the server configuration, threatening revenue during critical campaigns.',
    strategy:
      'I executed a surgical intervention on the stack. I migrated the handler to PHP-FPM 8.1 for stability, tuned Apache\'s `LimitRequestLine` to handle complex CRM URLs, and installed Netdata for real-time monitoring. I also implemented Redis object caching to slash database query times.',
    impact:
      'The results were immediate stability. We reduced CPU usage by 40% during peak loads and achieved ~30% faster page loads for end-users. The platform shifted from a source of constant firefighting to a reliable engine ready to scale.',
    fullContent: {
      challenge: {
        paragraphs: [
          'The site was choking on its own success. During peak traffic, editors faced 504 gateway timeouts and users experienced slow checkouts. This wasn\'t a frontend issue; the problems were buried deep in the server configuration, threatening revenue during critical campaigns.',
          'Server logs revealed the root cause: PHP-FPM was running an outdated version that couldn\'t handle concurrent requests efficiently. Apache\'s `LimitRequestLine` was too restrictive for complex CRM-generated URLs, causing legitimate requests to be rejected. Database queries were running without caching, hitting MySQL on every page load.',
          'During marketing campaigns, when traffic spiked, the server would become unresponsive. Editors couldn\'t publish content, customers couldn\'t complete purchases, and the entire business came to a halt. A "Server-Level Optimization" was needed that would handle traffic spikes gracefully.',
        ],
      },
      strategy: {
        paragraphs: [
          'I executed a surgical intervention on the stack. I migrated the handler to PHP-FPM 8.1 for improved stability and performance, tuned Apache\'s `LimitRequestLine` to handle complex CRM URLs up to 8KB, and installed Netdata for real-time monitoring of server health metrics.',
          'I implemented Redis object caching to slash database query times by 70%. Frequently accessed data—product information, user sessions, and page content—is now served from memory instead of hitting MySQL. I also optimized PHP-FPM pool settings to handle more concurrent requests without overwhelming the server.',
          'I configured opcode caching with OPcache and implemented query result caching for expensive database operations. The server now intelligently manages resources, scaling up during traffic spikes and scaling down during quiet periods, all while maintaining sub-2-second response times.',
        ],
      },
      impact: {
        paragraphs: [
          'The results were immediate stability. I reduced CPU usage by 40% during peak loads and achieved ~30% faster page loads for end-users. The platform shifted from a source of constant firefighting to a reliable engine ready to scale.',
          '504 errors dropped to zero, even during traffic spikes that previously would have crashed the site. Editors can now publish content reliably, and customers experience fast, consistent checkout flows. The server handles 3x the previous traffic volume without breaking a sweat.',
          'Most importantly, the platform is now ready for growth. As marketing campaigns drive more traffic, the optimized server infrastructure scales automatically. What was once a bottleneck is now a competitive advantage, enabling the business to scale confidently.',
        ],
      },
    },
    technologies: ['PHP-FPM', 'Redis', 'LiteSpeed', 'Netdata', 'Linux CLI'],
    architecture: [
      'PHP-FPM 8.1 → Request Handler',
      'Apache → LimitRequestLine Tuning',
      'Redis → Object Cache Layer',
      'Netdata → Real-time Monitoring',
      'MySQL → Query Optimization',
    ],
    featured: true,
  },
  {
    slug: 'the-compass',
    title: 'The Compass',
    image: '/images/case-studies/the-compass.svg',
    tagline: 'Rebuilding analytics to enable laser-focused marketing attribution.',
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
    ],
    challenge:
      'We were flying blind. Legacy tag bloat and cross-domain tracking errors meant we couldn\'t trust our attribution. Google Ads algorithms were optimizing for low-value "form fills" rather than actual revenue, wasting significant budget.',
    strategy:
      'I declared bankruptcy on the old data layer. I deployed a clean GTM v28 container, implemented server-side PHP hooks to push reliable `purchase` and `generate_lead` events, and configured Google Ads to optimize ONLY for high-intent actions. I also enabled User-ID tracking to solve cross-device attribution drift.',
    impact:
      'Every marketing dollar became smarter. We achieved precise attribution from first click to final sale, allowing us to cut wasted spend and scale profitable campaigns. We moved from guessing to knowing.',
    fullContent: {
      challenge: {
        paragraphs: [
          'We were flying blind. Legacy tag bloat and cross-domain tracking errors meant we couldn\'t trust our attribution. Google Ads algorithms were optimizing for low-value "form fills" rather than actual revenue, wasting significant budget.',
          'The analytics setup was a mess. Multiple tracking scripts conflicted with each other, cross-domain tracking was broken, and conversion events were firing incorrectly. Google Ads was optimizing for "form fills" that never converted, while high-value "purchase" events were being missed entirely.',
          'Marketing decisions were based on incomplete data. We couldn\'t tell which campaigns drove actual revenue, which channels had the best ROAS, or how customers moved through the funnel. Every marketing dollar was a gamble, and we were losing.',
        ],
      },
      strategy: {
        paragraphs: [
          'I declared bankruptcy on the old data layer and executed a complete "Analytics Overhaul". I deployed a clean GTM v28 container with zero legacy bloat, implemented server-side PHP hooks to push reliable `purchase` and `generate_lead` events directly to GA4, and configured Google Ads to optimize ONLY for high-intent actions that actually drive revenue.',
          'I enabled User-ID tracking to solve cross-device attribution drift, ensuring that a customer\'s journey from mobile ad click to desktop purchase is tracked as a single conversion path. I also implemented Enhanced E-commerce tracking with proper product categories, revenue values, and conversion funnels.',
          'I created custom RegEx filters to clean incoming data, removing bot traffic and spam referrals. The new data layer is clean, accurate, and trustworthy—every event is validated before it reaches analytics platforms.',
        ],
      },
      impact: {
        paragraphs: [
          'Every marketing dollar became smarter. I achieved precise attribution from first click to final sale, allowing the client to cut wasted spend and scale profitable campaigns. They moved from guessing to knowing.',
          'ROAS increased significantly as Google Ads now optimizes for actual revenue instead of low-value form fills. The client cut wasted spend on campaigns that looked good on paper but never converted, and scaled campaigns that drive real business results.',
          'The analytics overhaul transformed marketing from a cost center into a revenue driver. Every decision is now data-driven, every campaign is measurable, and every dollar is accountable. The client went from flying blind to having a crystal-clear view of the entire customer journey.',
        ],
      },
    },
    technologies: ['Google Tag Manager', 'GA4', 'Server-Side Events', 'RegEx', 'Google Ads'],
    architecture: [
      'Server-Side PHP → Purchase/Lead Events',
      'GTM v28 Container → Clean Data Layer',
      'GA4 → User-ID Tracking',
      'Google Ads → High-Intent Optimization',
      'RegEx Filters → Data Validation',
    ],
    featured: true,
  },
  {
    slug: 'the-guardian',
    title: 'The Guardian',
    image: '/images/case-studies/the-guardian.svg',
    tagline: 'Turning compliance pain into an automated trust engine.',
    category: ['Automation', 'Customer Empathy'],
    tags: ['Customer Empathy', 'Data Architecture', 'Proactive Automation', 'Compliance'],
    metrics: [
      { label: 'Time to Compliance', value: 'Minutes → Seconds' },
      { label: 'Upsell Conversion', value: '+27%' },
    ],
    challenge:
      'Compliance requirements slowed workflows and created friction for customers and internal teams.',
    strategy:
      'Automated compliance checkpoints with clear UX, proactive validation, and data-driven routing—reducing friction while increasing confidence and conversion.',
    impact:
      'Compliance became a competitive advantage: faster processing, higher conversion, and measurable trust gains.',
  },
  {
    slug: 'graston-ceu-system',
    title: 'Continuing Education Engine',
    image: '/images/case-studies/graston-ceu-system.svg',
    tagline: 'Building a continuing education system that actually scales.',
    category: ['Healthcare Systems', 'Education Platform'],
    tags: ['User Experience', 'Membership', 'Automation', 'System Design'],
    metrics: [
      { label: 'Checkout Conversion Lift', value: '40%' },
      { label: 'Support Ticket Reduction', value: '70%' },
    ],
    challenge:
      'A fragmented education experience made it difficult to track CEUs, manage access, and deliver a seamless learner journey.',
    strategy:
      'Unified profiles, memberships, and course delivery into a single system with automation for access, progress, and support flows.',
    impact:
      'Improved conversion and reduced support load while enabling a scalable foundation for long-term program growth.',
  },
  {
    slug: 'rbe-law',
    title: 'Law Firm Brand Repositioning',
    image: '/images/case-studies/rbe-law.svg',
    tagline: 'Repositioning a legacy firm for modern corporate clients.',
    category: ['Brand Strategy', 'Legal Marketing'],
    tags: ['Brand Strategy', 'Positioning', 'Visual Identity', 'Web'],
    metrics: [
      { label: 'Organic Search Traffic', value: '+180%' },
      { label: 'Corporate Client Inquiries', value: '+65%' },
    ],
    challenge:
      'A legacy brand and web presence were limiting perception and discovery with high-value corporate clients.',
    strategy:
      'Modernized positioning and identity, improved information architecture, and implemented SEO-forward content and structure.',
    impact:
      'Stronger market perception and significantly improved inbound discovery and inquiry volume.',
  },
  {
    slug: 'ultimate-tech-roi',
    title: 'IT Services Paid Ads Overhaul',
    image: '/images/case-studies/ultimate-tech-roi.svg',
    tagline: 'A complete paid media rebuild that made ROI obvious.',
    category: ['Paid Media', 'Growth'],
    tags: ['Google Ads', 'Landing Pages', 'Conversion Tracking', 'Reporting'],
    metrics: [
      { label: 'ROI Improvement', value: '+320%' },
      { label: 'Cost Per Lead Reduction', value: '-55%' },
    ],
    challenge:
      'Paid campaigns lacked clear attribution and were generating expensive, inconsistent lead flow.',
    strategy:
      'Rebuilt campaigns with tighter intent targeting, conversion-first landing pages, and clean tracking/reporting to optimize spend.',
    impact:
      'Higher ROI, lower CPL, and a system that supports continuous optimization.',
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

// Client name mapping helper
const getClientName = (title: string, slug: string): string => {
  if (slug.includes('graston')) return 'Graston Technique';
  if (slug.includes('riley') || slug.includes('rbe')) return 'Riley Bennett Egloff';
  if (slug.includes('ultimate')) return 'Ultimate Technologies';
  // Default client name for "The X" projects
  if (title.startsWith('The ')) return 'Graston Technique';
  return 'Client';
};

// Transform legacy CaseStudy to new CaseStudySimple format
export const transformToSimple = (study: CaseStudy): CaseStudySimple => {
  return {
    id: study.slug,
    title: study.title,
    client: getClientName(study.title, study.slug),
    oneLiner: study.tagline,
    stats: study.metrics.slice(0, 3), // Ensure max 3 stats
    tags: study.tags,
    description: study.challenge || study.tagline,
  };
};

// Export simplified case studies array
export const caseStudiesSimple: CaseStudySimple[] = caseStudies.map(transformToSimple);
