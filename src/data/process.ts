export interface ProcessItem {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

export const processes: ProcessItem[] = [
  {
    id: 'audit',
    title: 'Audit',
    description: 'Deep-dive analysis of your current marketing systems, identifying bottlenecks and opportunities for automation.',
    iconSrc: '/images/concepts/audit.svg',
  },
  {
    id: 'architect',
    title: 'Architect',
    description: 'Design scalable marketing architectures that connect your tools, data, and teams into a unified system.',
    iconSrc: '/images/concepts/architect.svg',
  },
  {
    id: 'automate',
    title: 'Automate',
    description: 'Build workflows that run themselves—from lead capture to revenue attribution, without manual intervention.',
    iconSrc: '/images/concepts/automate.svg',
  },
  {
    id: 'scale',
    title: 'Scale',
    description: 'Systems that grow with you. Every automation is designed to handle 10x volume without breaking.',
    iconSrc: '/images/concepts/scale.svg',
  },
];

