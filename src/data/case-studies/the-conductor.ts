export const theConductor = {
  slug: 'the-conductor',
  emoji: '🎼',
  title: 'The Conductor',
  subtitle: 'Orchestrating a unified data pipeline across marketing, education, and finance',
  theme: {
    '--cs-bg': 'linear-gradient(135deg, #0f0f2b 0%, #1a1a4a 100%)',
    '--cs-surface': 'rgba(18, 18, 56, 0.6)',
    '--cs-primary': '#6ea8ff',
    '--cs-accent': '#35e0ff',
    '--cs-glow': 'rgba(53, 224, 255, 0.45)',
  },
  badges: ['Systems Integration', 'Automation', 'Data Architecture'],
  challenge: {
    heading: 'Challenge',
    body: `WooCommerce, LearnDash, Gravity Forms, FluentCRM, and Google Sheets all told different stories. Teams worked from conflicting data.`,
  },
  strategy: [
    { title: 'Contracted Events', detail: 'Common schema for purchases, enrollments, completions, and marketing signals.' },
    { title: 'ELT to Warehouse', detail: 'Incremental syncs, idempotent loaders, PII-minimizing transforms.' },
    { title: 'Reverse ETL', detail: 'Push clean entities back to CRM, email, and ads for activation.' },
  ],
  build: [
    { title: 'Integration Layer', items: ['Webhooks + queues', 'Backfills', 'Retry + dead-letter'] },
    { title: 'Models', items: ['dbt marts', 'Student 360', 'Cohort stitching'] },
    { title: 'Activation', items: ['Segmented campaigns', 'Churn alerts', 'Cross-sell education flows'] },
  ],
  outcomes: {
    beforeAfter: [
      { metric: 'Platforms Unified', before: 'Siloed', after: '6' },
      { metric: 'Manual Hours Saved', before: 'Heavy', after: '48 hrs/week' },
      { metric: 'Data Freshness', before: 'Days', after: 'Sub-hour' },
    ],
    highlights: [
      'Source-of-truth entities across tools',
      'Lifecycle automation aligned to reality',
      'Better LTV insights by cohort',
    ],
  },
  pullQuote: {
    quote: 'Everyone finally looked at the same numbers.',
    source: 'Ops Lead',
  },
  cta: {
    label: 'See the integration map',
    href: '/contact',
  },
};

export default theConductor;

