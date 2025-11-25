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
      { label: 'Conversion Lift', value: '+40%' },
      { label: 'Admin Time', value: '-95%' },
      { label: 'User Journey', value: 'Automated' },
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
        ],
      },
      strategy: {
        paragraphs: [
          'I architected a deeply integrated "Conversion Engine" connecting LearnDash, WooCommerce, and FluentCRM. The moment a clinician completes training, Uncanny Automator triggers a workflow that generates a premium profile and activates a 60-day trial. A sophisticated 60-day email sequence then onboards the user, guiding them through profile optimization and demonstrating ROI before the hard sell.',
        ],
      },
      impact: {
        paragraphs: [
          'This transformed a cost center into a predictable revenue stream. The automated onboarding system reduced administrative overhead to near-zero while providing immediate value to graduates. It created a self-fueling marketing engine that continuously generates high-quality, pre-approved social proof and drives subscription renewals.',
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
      { label: 'Bad Bots Blocked', value: '85k/mo' },
      { label: 'Cache Hit Ratio', value: '86%' },
      { label: 'Uptime', value: '99.99%' },
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
        ],
      },
      strategy: {
        paragraphs: [
          'I implemented a "Defense-in-Depth" strategy. At the edge, I deployed Cloudflare WAF rules to block exploits and activated "Super Bot Fight Mode" to neutralize threats before they reached the origin. Internally, I enforced strict security headers (HSTS, CSP), rolled out DNSSEC for trust, and configured Authenticated Origin Pulls to create an encrypted tunnel between Cloudflare and our server.',
        ],
      },
      impact: {
        paragraphs: [
          'The digital fortress successfully neutralized ~85,000 malicious bot hits per month. By blocking traffic at the edge, we significantly reduced load on the origin server, freeing up resources for legitimate users and ensuring business continuity even during coordinated attacks.',
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
      { label: 'Admin Tasks', value: '-80%' },
      { label: 'Data Accuracy', value: '99%' },
      { label: 'Sync Latency', value: '<2s' },
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
        ],
      },
      strategy: {
        paragraphs: [
          'I built an event-driven data highway. Now, a purchase instantly triggers enrollment; Uncanny Automator logs the event; and WP Fusion maps every data point into a single, unified FluentCRM contact record. This created a "Single Source of Truth" where a customer\'s history, license type, and training status are instantly accessible and accurate.',
        ],
      },
      impact: {
        paragraphs: [
          'We eliminated hours of mind-numbing manual data entry every week. With accurate data, marketing automation became exponentially smarter—allowing for hyper-targeted reminders and upsells. The system is now a scalable infrastructure that supports growth without creating new operational debt.',
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
      { label: 'CPU Usage', value: '-40%' },
      { label: 'Page Load', value: '30% Faster' },
      { label: '504 Errors', value: '0' },
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
        ],
      },
      strategy: {
        paragraphs: [
          'I executed a surgical intervention on the stack. I migrated the handler to PHP-FPM 8.1 for stability, tuned Apache\'s `LimitRequestLine` to handle complex CRM URLs, and installed Netdata for real-time monitoring. I also implemented Redis object caching to slash database query times.',
        ],
      },
      impact: {
        paragraphs: [
          'The results were immediate stability. We reduced CPU usage by 40% during peak loads and achieved ~30% faster page loads for end-users. The platform shifted from a source of constant firefighting to a reliable engine ready to scale.',
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
      { label: 'Attribution', value: '100%' },
      { label: 'ROAS', value: 'Increased' },
      { label: 'Tag Bloat', value: 'Removed' },
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
        ],
      },
      strategy: {
        paragraphs: [
          'I declared bankruptcy on the old data layer. I deployed a clean GTM v28 container, implemented server-side PHP hooks to push reliable `purchase` and `generate_lead` events, and configured Google Ads to optimize ONLY for high-intent actions. I also enabled User-ID tracking to solve cross-device attribution drift.',
        ],
      },
      impact: {
        paragraphs: [
          'Every marketing dollar became smarter. We achieved precise attribution from first click to final sale, allowing us to cut wasted spend and scale profitable campaigns. We moved from guessing to knowing.',
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
    slug: 'the-closer',
    title: 'The Closer',
    image: '/images/case-studies/the-closer.svg',
    tagline: 'A quote-to-order system that unlocks high-ticket revenue.',
    category: ['E-commerce', 'Payment Systems'],
    tags: [
      'Payment Processing',
      'Quote Management',
      'E-commerce Automation',
      'Stripe',
      'WooCommerce',
    ],
    color: '#10B981',
    icon: '💳',
    metrics: [
      { label: 'Close Rate', value: 'Increased' },
      { label: 'Manual Invoices', value: '0' },
      { label: 'Payment Plans', value: 'Automated' },
    ],
    challenge:
      'High-value training bundles were stalling at checkout due to payment friction. Sales reps had to manually generate invoices, and customers lacked flexible payment options, creating a barrier to entry for our premium products.',
    strategy:
      'I built a custom "Quote-to-Order" system. Sales reps can now generate a custom quote that instantly creates a pending WooCommerce order and emails a secure "Pay Link" to the client. Crucially, I integrated Stripe to offer ACF-driven payment plans (3-18 months) directly in the checkout flow.',
    impact:
      'This removed the friction from high-ticket sales. We saw a significant increase in close rates for phone orders and lowered the operational overhead of managing payment plans. It turned a manual accounts-receivable headache into an automated revenue lever.',
    fullContent: {
      challenge: {
        paragraphs: [
          'High-value training bundles were stalling at checkout due to payment friction. Sales reps had to manually generate invoices, and customers lacked flexible payment options, creating a barrier to entry for our premium products.',
        ],
      },
      strategy: {
        paragraphs: [
          'I built a custom "Quote-to-Order" system. Sales reps can now generate a custom quote that instantly creates a pending WooCommerce order and emails a secure "Pay Link" to the client. Crucially, I integrated Stripe to offer ACF-driven payment plans (3-18 months) directly in the checkout flow.',
        ],
      },
      impact: {
        paragraphs: [
          'This removed the friction from high-ticket sales. We saw a significant increase in close rates for phone orders and lowered the operational overhead of managing payment plans. It turned a manual accounts-receivable headache into an automated revenue lever.',
        ],
      },
    },
    technologies: ['Stripe API', 'WooCommerce', 'ACF', 'Gravity Forms', 'PHP'],
    architecture: [
      'Gravity Forms → Quote Generation',
      'WooCommerce → Pending Order Creation',
      'Stripe API → Payment Plan Configuration',
      'ACF → Custom Payment Fields',
      'Email → Secure Pay Link Delivery',
    ],
    featured: true,
  },
  {
    slug: 'clean-aesthetic',
    title: 'Clean Aesthetic Brand Identity',
    image: '/images/case-studies/clean-aesthetic.svg',
    tagline: 'Medical credibility meets luxury appeal for concierge Botox.',
    category: ['Branding', 'Design'],
    tags: ['Branding', 'Design', 'Identity', 'Medical', 'Luxury'],
    color: '#40E0D0',
    icon: '✨',
    metrics: [
      { label: 'Brand Identity', value: 'Launched' },
      { label: 'Timeline', value: '4 Weeks' },
      { label: 'Client Satisfaction', value: '100%' },
    ],
    challenge:
      'Medical credibility meets luxury appeal for concierge Botox. The brand needed to convey trust and sophistication while standing out in a competitive aesthetic medicine market.',
    strategy:
      'Designed a sophisticated monogram combining "C" and "A" with teal-green trust signals. Created a complete brand system including logo variations, color palette, typography, and application guidelines that balanced medical professionalism with luxury aesthetics.',
    impact:
      'Delivered a cohesive brand identity that elevated the practice positioning and provided a foundation for all marketing materials. The monogram became an instantly recognizable symbol of quality and trust.',
    fullContent: {
      challenge: {
        paragraphs: [
          'Medical credibility meets luxury appeal for concierge Botox. The brand needed to convey trust and sophistication while standing out in a competitive aesthetic medicine market.',
        ],
      },
      strategy: {
        paragraphs: [
          'Designed a sophisticated monogram combining "C" and "A" with teal-green trust signals. Created a complete brand system including logo variations, color palette, typography, and application guidelines that balanced medical professionalism with luxury aesthetics.',
        ],
      },
      impact: {
        paragraphs: [
          'Delivered a cohesive brand identity that elevated the practice positioning and provided a foundation for all marketing materials. The monogram became an instantly recognizable symbol of quality and trust.',
        ],
      },
    },
    technologies: ['Adobe Illustrator', 'Brand Guidelines', 'Typography', 'Color Theory'],
    featured: false,
  },
  {
    slug: 'russell-painting',
    title: 'Russell Painting Redesign',
    image: '/images/case-studies/russell-painting.svg',
    tagline: 'Leveraging 43+ years of history for a modern web presence.',
    category: ['Web Design', 'SEO'],
    tags: ['Web Design', 'SEO', 'Conversion', 'Local Marketing', 'HomeAdvisor'],
    color: '#40E0D0',
    icon: '🏠',
    metrics: [
      { label: 'Lead Gen', value: '+30%' },
      { label: 'SEO', value: 'Local #1' },
      { label: 'Conversion', value: 'Improved' },
    ],
    challenge:
      'A 43-year family painting business needed to modernize their web presence while leveraging their legacy of trust and local reputation. The site needed to integrate with HomeAdvisor and rank for local search.',
    strategy:
      'Developed a trust-building strategy with HomeAdvisor integration and "Family Business" narrative. Redesigned the website with local SEO optimization, conversion-focused landing pages, and seamless lead capture workflows.',
    impact:
      'Achieved #1 local search rankings for key terms and increased qualified leads by 30%. The "Family Business" positioning resonated with local customers seeking reliable, established contractors.',
    fullContent: {
      challenge: {
        paragraphs: [
          'A 43-year family painting business needed to modernize their web presence while leveraging their legacy of trust and local reputation. The site needed to integrate with HomeAdvisor and rank for local search.',
        ],
      },
      strategy: {
        paragraphs: [
          'Developed a trust-building strategy with HomeAdvisor integration and "Family Business" narrative. Redesigned the website with local SEO optimization, conversion-focused landing pages, and seamless lead capture workflows.',
        ],
      },
      impact: {
        paragraphs: [
          'Achieved #1 local search rankings for key terms and increased qualified leads by 30%. The "Family Business" positioning resonated with local customers seeking reliable, established contractors.',
        ],
      },
    },
    technologies: ['WordPress', 'HomeAdvisor API', 'Local SEO', 'Conversion Optimization'],
    featured: false,
  },
  {
    slug: 'installation-nation',
    title: 'Installation Nation',
    image: '/images/case-studies/installation-nation.svg',
    tagline: 'Marketing a 23-day outdoor art exhibition on 9.5 acres.',
    category: ['Event Marketing', 'Branding'],
    tags: ['Event Marketing', 'Branding', 'Sponsorship', 'Arts', 'Community'],
    color: '#40E0D0',
    icon: '🎨',
    metrics: [
      { label: 'Raised', value: '$46k' },
      { label: 'Attendance', value: '10k+' },
      { label: 'Sponsors', value: '15+' },
    ],
    challenge:
      'Marketing a 23-day outdoor art exhibition on 9.5 acres required a multi-tier sponsorship strategy and complete event branding. The challenge was creating awareness and securing funding for a large-scale community arts event.',
    strategy:
      'Developed a multi-tier sponsorship strategy with clear value propositions for each level. Created complete event branding including logo, signage, promotional materials, and digital assets. Executed a comprehensive marketing campaign across print, digital, and community channels.',
    impact:
      'Successfully raised $46k in sponsorship funding and attracted 10,000+ attendees over the 23-day exhibition. The event became a signature community arts experience and established a template for future installations.',
    fullContent: {
      challenge: {
        paragraphs: [
          'Marketing a 23-day outdoor art exhibition on 9.5 acres required a multi-tier sponsorship strategy and complete event branding. The challenge was creating awareness and securing funding for a large-scale community arts event.',
        ],
      },
      strategy: {
        paragraphs: [
          'Developed a multi-tier sponsorship strategy with clear value propositions for each level. Created complete event branding including logo, signage, promotional materials, and digital assets. Executed a comprehensive marketing campaign across print, digital, and community channels.',
        ],
      },
      impact: {
        paragraphs: [
          'Successfully raised $46k in sponsorship funding and attracted 10,000+ attendees over the 23-day exhibition. The event became a signature community arts experience and established a template for future installations.',
        ],
      },
    },
    technologies: ['Event Branding', 'Sponsorship Strategy', 'Print Design', 'Digital Marketing'],
    featured: false,
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
