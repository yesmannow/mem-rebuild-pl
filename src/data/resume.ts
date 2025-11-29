export type ImpactMetric = {
  label: string;
  value: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  dates: string;
  location?: string;
  summary: string;
  metrics: ImpactMetric[];
  technologies: string[];
  link?: string;
  logo?: string;
};

export type EducationEntry = {
  institution: string;
  degree: string;
  year: string;
};

export type ResumeData = {
  name: string;
  title: string;
  tagline: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
};

const placeholderLogo = 'https://placehold.co/100x100/0f172a/40E0D0?text=Logo';

export const resume: ResumeData = {
  name: 'Jacob Darling',
  title: 'Marketing Director & Systems Architect',
  tagline: 'Dual-Threat Marketing Director & Systems Architect.',
  experience: [
    {
      company: 'Graston Technique',
      role: 'Marketing Director',
      dates: '2023 - Present',
      location: 'Indianapolis, IN',
      summary: 'Leads the full marketing ecosystem and productized training experience for 30K+ practitioners.',
      metrics: [
        { label: 'Ecosystem Users', value: '30K+' },
        { label: 'Automations', value: '400+' },
        { label: 'Support Tickets', value: '-70%' },
      ],
      technologies: ['WordPress', 'React', 'Cloudflare', 'Open AI'],
      link: '/case-studies/the-fortress',
      logo: placeholderLogo,
    },
    {
      company: 'Ultimate Technologies Group',
      role: 'Interim Director of Marketing',
      dates: '2023',
      location: 'Fishers, IN',
      summary: 'Stabilized marketing operations and accelerated Google Ads + CRM integration during a leadership transition.',
      metrics: [
        { label: 'Campaign Velocity', value: '+40%' },
        { label: 'CRM Integration', value: 'Unified' },
      ],
      technologies: ['Google Ads', 'HubSpot', 'Analytics', 'Workflow Automation'],
      logo: placeholderLogo,
    },
    {
      company: 'Riley Bennett Egloff, LLP',
      role: 'Marketing Manager',
      dates: '2015 - 2023',
      location: 'Indianapolis, IN',
      summary: 'Owned full branding, SEO, and digital communications for a leading law firm.',
      metrics: [
        { label: 'Brand & SEO', value: 'Owned' },
        { label: 'Digital Rebrand', value: 'Lead' },
      ],
      technologies: ['Brand Strategy', 'SEO', 'Content', 'Email'],
      logo: placeholderLogo,
    },
    {
      company: 'Apple',
      role: 'Creative Pro',
      dates: '2012 - 2022',
      location: 'Indianapolis, IN',
      summary: 'Delivered training, UX guidance, and hardware solutions while mentoring peers on customer experience.',
      metrics: [
        { label: 'Market NPS', value: 'Top 10' },
        { label: 'Workshops', value: 'User Training' },
      ],
      technologies: ['Customer Experience', 'Hardware Repair', 'Training'],
      logo: placeholderLogo,
    },
  ],
  education: [
    {
      institution: 'Indiana University',
      degree: 'Business Management',
      year: '2008',
    },
  ],
};
