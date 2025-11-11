export const theCompass = {
  slug: 'the-compass',
  emoji: '🧭',
  title: 'The Compass',
  subtitle: 'Rebuilding analytics and attribution so every dollar is accountable',
  theme: {
    // CSS var tokens consumed by case-study-tokens.css
    '--cs-bg': 'linear-gradient(135deg, #0e1a2b 0%, #0f2d4a 100%)',
    '--cs-surface': 'rgba(18, 32, 58, 0.6)',
    '--cs-primary': '#43bdfd',
    '--cs-accent': '#7cf1d6',
    '--cs-glow': 'rgba(67, 189, 253, 0.45)',
  },
  badges: ['Analytics', 'Data Strategy', 'CRO'],
  challenge: {
    heading: 'Challenge',
    body: `Leadership made six-figure decisions without reliable attribution. Data lived in silos and nothing reconciled across systems.`,
  },
  strategy: [
    { title: 'Single Source of Truth', detail: 'Centralized event schema and UTM governance across web, CRM, LMS, and payments.' },
    { title: 'Attribution Model', detail: 'Position-based + time-decay hybrid to balance discovery and conversion touchpoints.' },
    { title: 'Governance + QA', detail: 'Data contracts, CI checks, and alerting for event drift across environments.' },
  ],
  build: [
    { title: 'Event Layer', items: ['Web + backend event spec', 'Queue + retries', 'Bot filtering', 'PII-safe transforms'] },
    { title: 'Warehouse', items: ['dbt models', 'Incremental builds', 'Dimensional marts', 'Attribution tables'] },
    { title: 'Visualization', items: ['Revenue attribution dashboards', 'Channel efficiency', 'Funnel drop-off'] },
  ],
  outcomes: {
    beforeAfter: [
      { metric: 'Attribution Accuracy', before: 'Low / Non-reconciling', after: '+46 pts' },
      { metric: 'CAC Efficiency', before: 'Inconsistent', after: '+32%' },
      { metric: 'Decision Latency', before: 'Weeks', after: 'Hours' },
    ],
    highlights: [
      'Executive dashboard adopted org-wide',
      'Budget reallocated to top-ROI channels within 2 cycles',
      'Drift alerts reduced fire drills',
    ],
  },
  pullQuote: {
    quote: 'If it is not measured, it does not exist.',
    source: 'CFO, after first 30 days of instrumented reporting',
  },
  cta: {
    label: 'See how I structure attribution',
    href: '/contact',
  },
};

export default theCompass;

