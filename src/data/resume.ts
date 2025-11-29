import { ExperienceItem, EducationItem, VolunteerItem, SkillCategory, Metric, Award } from '../types';

export const metrics: Metric[] = [
  { id: 'users', label: 'Users Served', value: 30000, suffix: '+' },
  { id: 'conversions', label: 'Conversion Lift', value: 40, prefix: '+', suffix: '%' },
  { id: 'automations', label: 'Automations Built', value: 400, suffix: '+' },
  { id: 'tickets', label: 'Support Reduction', value: 70, prefix: '-', suffix: '%' },
];

export const experience: ExperienceItem[] = [
  {
    id: 'graston',
    company: 'Graston Technique, LLC',
    role: 'Marketing Director',
    period: 'Aug 2023 - Present',
    location: 'Indianapolis, IN',
    description: 'Leading marketing strategy and technical execution for a high-volume educational platform.',
    achievements: [
      'Architected ecosystem (LearnDash, WooCommerce, FluentCRM) for 30K+ users.',
      'Deployed GPT-powered AI assistant via REST APIs for support & training.',
      'Built 400+ automations (Uncanny Automator) reducing admin time by 95%.',
      'Optimized site speed (LiteSpeed, Cloudflare) and security (WAF, DNSSEC).',
      'Created provider analytics dashboards syncing GA4 via GTM.',
    ],
    techStack: ['WordPress', 'React', 'Cloudflare', 'OpenAI API', 'LearnDash'],
  },
  {
    id: 'ultimate',
    company: 'Ultimate Technologies Group',
    role: 'Interim Director of Marketing',
    period: 'Mar 2023 - Jul 2023',
    location: 'Fishers, IN',
    description: 'Spearheaded marketing strategy during a key transitional period.',
    achievements: [
      'Led Google Ads optimization, improving CTR and ROI.',
      'Implemented marketing automation workflows and CRM integrations.',
      'Directed branding updates across all customer touchpoints.',
    ],
    techStack: ['HubSpot', 'Google Ads', 'SEO', 'CRM'],
  },
  {
    id: 'rbe-mgr',
    company: 'Riley Bennett Egloff, LLP',
    role: 'Marketing Manager',
    period: 'Jul 2022 - Mar 2023',
    location: 'Indianapolis, IN',
    description: 'Led strategic marketing and digital communications for legal services.',
    achievements: [
      'Owned full firm branding and website strategy, enhancing SEO.',
      'Partnered with attorneys on individualized business development plans.',
      'Managed high-stakes RFP and proposal responses.',
    ],
    techStack: ['Digital Strategy', 'Content Marketing', 'Analytics'],
  },
  {
    id: 'rbe-admin',
    company: 'Riley Bennett Egloff, LLP',
    role: 'Marketing Administrator',
    period: 'Jun 2015 - Nov 2022',
    location: 'Greater Indianapolis',
    description: 'Managed content initiatives and brand development.',
    achievements: [
      'Executed strategic marketing plans with the Marketing Committee.',
      'Managed social media platforms and graphic design ad creation.',
      'Developed business development plans for attorneys.',
    ],
    techStack: ['Adobe Creative Suite', 'Social Media', 'WordPress'],
  },
  {
    id: 'deerfield',
    company: 'Deerfield Financial Advisors',
    role: 'Marketing Coordinator',
    period: 'Jun 2013 - Jun 2015',
    location: 'Indianapolis, IN',
    description: 'Executed campaigns to elevate brand awareness and attract clients.',
    achievements: [
      'Researched and implemented new technology platforms for efficiency.',
      'Ensured full FINRA and SEC compliance for all materials.',
      'Managed client-facing seminars and events.',
    ],
    techStack: ['Compliance', 'CRM', 'Event Mgmt'],
  },
  {
    id: 'pike',
    company: 'Pike Medical Consultants',
    role: 'Marketing Coordinator',
    period: 'Sep 2009 - Jun 2013',
    location: 'Greater Indianapolis',
    description: 'Directed all marketing functions, reporting to the president.',
    achievements: [
      'Drove a 45% increase in patient visits over three years.',
      'Led creation of a new company website, modernizing digital presence.',
      'Maintained consistently positive ROI across campaigns.',
    ],
    techStack: ['Strategic Planning', 'Budgeting', 'Web Dev'],
  },
];

export const volunteering: VolunteerItem[] = [
  { role: 'President', organization: 'School 80 Condominiums HOA', period: 'Oct 2019 - Present' },
  { role: 'Board Member', organization: 'Primary Colours', period: 'Jan 2018 - Dec 2019' },
  { role: 'Business Mentor', organization: 'SMART - Anti Bullying', period: 'Jan 2013 - May 2013' },
];

export const education: EducationItem[] = [
  {
    school: 'Indiana University-Bloomington',
    degree: 'B.S. Business Management',
    year: '2004 – 2008',
    honors: 'Won 2006 Target Marketing Competition',
  },
];

export const awards: Award[] = [
  { title: 'Gold Key Photography Award', organization: 'Scholastic Art & Writing Awards', year: '2008' },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'strategy',
    title: 'Strategy & Leadership',
    accent: 'teal',
    items: [
      'Brand Architecture',
      'Go-to-Market',
      'Revenue Ops',
      'Lifecycle Strategy',
      'Positioning',
      'Product Marketing',
    ],
  },
  {
    id: 'systems',
    title: 'Systems & Development',
    accent: 'blue',
    items: ['React', 'TypeScript', 'WordPress', 'Node', 'SQL', 'APIs', 'Edge Functions'],
  },
  {
    id: 'automation',
    title: 'Automation & Data',
    accent: 'orange',
    items: ['HubSpot', 'FluentCRM', 'GA4 + GTM', 'Uncanny Automator', 'Make', 'Zapier'],
  },
  {
    id: 'design',
    title: 'Design & Content',
    accent: 'teal',
    items: ['Figma', 'Adobe CC', 'Motion', 'Storytelling', 'UX Writing'],
  },
];
