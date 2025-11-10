export const theFortress = {
  slug: 'the-fortress',
  emoji: '🛡️',
  title: 'The Fortress',
  subtitle: 'Standing up an edge-first security posture that protects revenue 24/7',
  theme: {
    '--cs-bg': 'linear-gradient(135deg, #111111 0%, #1b1b1b 100%)',
    '--cs-surface': 'rgba(24, 24, 24, 0.6)',
    '--cs-primary': '#ffbe0b',
    '--cs-accent': '#ffd166',
    '--cs-glow': 'rgba(255, 190, 11, 0.45)',
  },
  badges: ['Security', 'Risk Mitigation', 'DevOps'],
  challenge: {
    heading: 'Challenge',
    body: `Persistent bot attacks and scrapers slowed the storefront, spiked hosting bills, and threatened customer trust.`,
  },
  strategy: [
    { title: 'Defense-in-Depth', detail: 'WAF rules, bot scoring, rate-limits, IP reputation, and behavioral challenges.' },
    { title: 'Edge Caching', detail: 'Protect origin with cache keys, revalidation, and per-route TTLs.' },
    { title: 'Observability', detail: 'Attack telemetry, anomaly detection, auto-blocklists, and postmortems.' },
  ],
  build: [
    { title: 'Protection', items: ['WAF + bot mgmt', 'RPS caps', 'TLS enforcement'] },
    { title: 'Performance', items: ['Static-first pages', 'API caching', 'Image CDN policies'] },
    { title: 'Runbooks', items: ['Incident SLAs', 'Canary blocks', 'Rollback scripts'] },
  ],
  outcomes: {
    beforeAfter: [
      { metric: 'Threats Blocked', before: 'Leakage to origin', after: '85K+/month' },
      { metric: 'Cache Hit Ratio', before: 'Low', after: '86%' },
      { metric: 'Origin Errors', before: 'Spiky', after: '-78%' },
    ],
    highlights: [
      'Revenue protected during traffic spikes',
      'Ops confidence improved',
      'Attack forensics enable faster response',
    ],
  },
  pullQuote: {
    quote: 'Security became a growth enabler, not a tax.',
    source: 'CTO',
  },
  cta: {
    label: 'View the security runbook',
    href: '/contact',
  },
};

export default theFortress;

