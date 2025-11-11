export const theGuardian = {
  slug: 'the-guardian',
  emoji: '🛡️',
  title: 'The Guardian',
  subtitle: 'Turning compliance pain into an automated trust-and-sales engine',
  theme: {
    '--cs-bg': 'linear-gradient(135deg, #0b1620 0%, #0f2232 100%)',
    '--cs-surface': 'rgba(12, 28, 44, 0.6)',
    '--cs-primary': '#79f2c0',
    '--cs-accent': '#a7ffeb',
    '--cs-glow': 'rgba(121, 242, 192, 0.45)',
  },
  badges: ['Automation', 'Customer Empathy', 'Data Architecture'],
  challenge: {
    heading: 'Challenge',
    body: `Clinics constantly phoned support to understand certification rules. The experience eroded trust and consumed the team's time.`,
  },
  strategy: [
    { title: 'Policy-as-Data', detail: 'Normalize rules into versioned, testable data models with state-level overrides.' },
    { title: 'Proactive Guides', detail: 'Dynamic checklists, expirations, and renewal nudges across email and in-product.' },
    { title: 'Audit Trail', detail: 'Signed events with human-readable diffs for compliance reviews and support.' },
  ],
  build: [
    { title: 'Rules Engine', items: ['JSON policy specs', 'Evaluator + fallback logic', 'Edge-cached responses'] },
    { title: 'Experience', items: ['Guided flows', 'Inbox-ready summaries', 'Self-serve verification'] },
    { title: 'Ops', items: ['Alerting on expirations', 'Queue-based reminders', 'Support macros + links'] },
  ],
  outcomes: {
    beforeAfter: [
      { metric: 'Time to Compliance', before: 'Manual / Calls', after: 'Minutes → Seconds' },
      { metric: 'Upsell Conversion', before: 'Ad hoc', after: '+27%' },
      { metric: 'Support Load', before: 'High', after: '-45%' },
    ],
    highlights: [
      'Zero-touch renewals',
      'Self-serve verifications',
      'Clear audit trail for audits and reviews',
    ],
  },
  pullQuote: {
    quote: 'We stopped guessing and started trusting the system.',
    source: 'Clinic Administrator',
  },
  cta: {
    label: 'See the automation patterns',
    href: '/contact',
  },
};

export default theGuardian;

