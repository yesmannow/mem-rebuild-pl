export const rbeLaw = {
  slug: 'rbe-law-brand-and-digital',
  emoji: '⚖️',
  title: 'Riley Bennett Egloff — Brand & Digital Overhaul',
  subtitle: 'Repositioning a prestigious law firm for modern growth',
  theme: {
    '--cs-bg': 'linear-gradient(135deg, #0a1a3a 0%, #0e2650 100%)',
    '--cs-surface': 'rgba(12, 36, 84, 0.6)',
    '--cs-primary': '#3d7eff',
    '--cs-accent': '#f3bd4f',
    '--cs-glow': 'rgba(61, 126, 255, 0.45)',
  },
  badges: ['Brand Strategy', 'Web Design', 'Content Marketing'],
  challenge: {
    heading: 'Challenge',
    body: `A traditional brand and dated site lost ground to digital-first competitors. Expertise was not surfacing for corporate or individual prospects.`,
  },
  strategy: [
    { title: 'Positioning', detail: 'Clarify practice strengths, industries, and proof through case results and thought leadership.' },
    { title: 'Site IA + UX', detail: 'Task-focused navigation, attorney profiles, structured practice pages.' },
    { title: 'Editorial Ops', detail: 'Publishing cadence, SEO briefs, and distribution to the right channels.' },
  ],
  build: [
    { title: 'Brand System', items: ['Logo refinements', 'Typography scale', 'Color accessibility'] },
    { title: 'Website', items: ['Next/Vite stack', 'Schema.org for practices', 'Attorney finder'] },
    { title: 'Content', items: ['Playbooks', 'Templates', 'Distribution calendar'] },
  ],
  outcomes: {
    beforeAfter: [
      { metric: 'Organic Traffic', before: 'Flat', after: '+180%' },
      { metric: 'Corporate Inquiries', before: 'Low', after: '+65%' },
      { metric: 'Lead Quality', before: 'Mixed', after: 'Improved fit' },
    ],
    highlights: [
      'Clear differentiation vs peers',
      'Findable practice expertise',
      'Attorney profiles convert better',
    ],
  },
  pullQuote: {
    quote: 'The digital presence finally matches the caliber of the firm.',
    source: 'Managing Partner',
  },
  cta: {
    label: 'Review the brand system',
    href: '/contact',
  },
};

export default rbeLaw;

