export const grastonCEU = {
  slug: 'graston-ceu-system',
  emoji: '🏥',
  title: 'Graston Technique CEU System',
  subtitle: 'End-to-end CEU commerce, enrollment, and verification for providers',
  theme: {
    '--cs-bg': 'linear-gradient(135deg, #062b2b 0%, #0d3d3a 100%)',
    '--cs-surface': 'rgba(10, 50, 50, 0.6)',
    '--cs-primary': '#2bd4c5',
    '--cs-accent': '#9affd4',
    '--cs-glow': 'rgba(43, 212, 197, 0.45)',
  },
  badges: ['Healthcare Tech', 'Automation', 'CRM Strategy'],
  challenge: {
    heading: 'Challenge',
    body: `Fragmented CEU purchasing and verification caused tickets and cart abandonment. State-by-state credit rules increased complexity.`,
  },
  strategy: [
    { title: 'Unified CEU Catalog', detail: 'Mapped courses to states, boards, and provider types with dynamic eligibility.' },
    { title: 'Checkout + Enrollment', detail: 'One flow to purchase, enroll, and provision certificates automatically.' },
    { title: 'Proof + Compliance', detail: 'Verifiable PDFs, verification endpoints, and renewal reminders.' },
  ],
  build: [
    { title: 'Commerce', items: ['Woo + coupons', 'Bundles', 'Tax + jurisdiction flags'] },
    { title: 'LMS', items: ['LearnDash hooks', 'Auto-enroll', 'Completion webhooks'] },
    { title: 'Ops', items: ['FluentCRM tags', 'Renewal drips', 'Provider portal'] },
  ],
  outcomes: {
    beforeAfter: [
      { metric: 'Support Tickets', before: 'High', after: '-70%' },
      { metric: 'Checkout Conversion', before: 'Low', after: '+40%' },
      { metric: 'Verification Time', before: 'Manual', after: 'Instant' },
    ],
    highlights: [
      'Self-serve certificates',
      'State mapping reduces errors',
      'Revenue lift from bundles',
    ],
  },
  pullQuote: {
    quote: 'Providers finally felt the system worked with them.',
    source: 'Education Director',
  },
  cta: {
    label: 'See the CEU journey',
    href: '/contact',
  },
};

export default grastonCEU;

