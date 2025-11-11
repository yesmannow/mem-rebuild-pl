export const theEngineRoom = {
  slug: 'the-engine-room',
  emoji: '⚙️',
  title: 'The Engine Room',
  subtitle: 'Rebuilding the infrastructure so speed and stability become competitive advantages',
  theme: {
    '--cs-bg': 'linear-gradient(135deg, #0d1217 0%, #101a24 100%)',
    '--cs-surface': 'rgba(16, 26, 36, 0.6)',
    '--cs-primary': '#ffb86b',
    '--cs-accent': '#ffd166',
    '--cs-glow': 'rgba(255, 184, 107, 0.45)',
  },
  badges: ['Performance', 'DevOps', 'Reliability'],
  challenge: {
    heading: 'Challenge',
    body: `The flagship ecommerce site creaked under growth. Slow pages, checkout errors, and risky deployments limited sales velocity.`,
  },
  strategy: [
    { title: 'Edge-first Architecture', detail: 'Static + edge cached content, SSR where needed, API responses cached with stale-while-revalidate.' },
    { title: 'Perf Budget + CI', detail: 'TTFB, LCP, and CLS budgets enforced in PR checks with Lighthouse CI.' },
    { title: 'Zero-downtime Deploys', detail: 'Blue/green with instant rollback and config-as-code for infra changes.' },
  ],
  build: [
    { title: 'Frontend', items: ['Route-level code split', 'Image CDN + AVIF/WebP', 'Critical CSS inlining'] },
    { title: 'Edge/Backend', items: ['KV for session-lite state', 'Queue for retries', 'Circuit breakers + timeouts'] },
    { title: 'Tooling', items: ['Synthetic monitoring', 'Error budgets', 'Auto-canary + rollbacks'] },
  ],
  outcomes: {
    beforeAfter: [
      { metric: 'Page Load Time', before: '5.8s', after: '1.2s' },
      { metric: 'Checkout Failures', before: 'High / Spiky', after: '-92%' },
      { metric: 'Cache Hit Ratio', before: 'Variable', after: '86%' },
    ],
    highlights: [
      'Devs ship daily with confidence',
      'Rollback time < 60s',
      'Perf regressions flagged before release',
    ],
  },
  pullQuote: {
    quote: 'Speed is a feature and stability is the brand.',
    source: 'Head of Product',
  },
  cta: {
    label: 'See the deployment playbook',
    href: '/contact',
  },
};

export default theEngineRoom;

