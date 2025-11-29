import { ExperienceItem, EducationItem, VolunteerItem, SkillCategory, Metric, Award } from '../types';

// Executive Summary
export const executiveSummary = `Marketing strategist and systems architect with 15+ years of experience building revenue-driving marketing infrastructure for global healthcare brands. Proven track record of transforming complex marketing challenges into measurable business results through strategic thinking, technical execution, and data-driven decision making. I bridge the gap between creative marketing vision and technical implementation, delivering systems that scale while driving measurable ROI. My expertise spans marketing automation, CRM architecture, web development, and revenue operations - positioning me uniquely to lead growth initiatives from strategy through execution.`;

export const metrics: Metric[] = [
  { id: 'years', label: 'Years Experience', value: 15, suffix: '+' },
  { id: 'users', label: 'Users Served', value: 30000, suffix: '+' },
  { id: 'automations', label: 'Automations Built', value: 400, suffix: '+' },
  { id: 'conversions', label: 'Conversion Lift', value: 40, prefix: '+', suffix: '%' },
];

export const experience: ExperienceItem[] = [
  {
    id: 'graston',
    company: 'Graston Technique, LLC',
    role: 'Marketing Director',
    period: 'Aug 2023 - Present',
    location: 'Indianapolis, IN',
    description: 'Leads both marketing strategy and technical execution for a high-volume educational platform serving thousands of clinicians with continuing education and clinical tools.',
    achievements: [
      "System Architecture: Built integrated ecosystem with LearnDash LMS, WooCommerce, WP Fusion, Gravity Forms, Uncanny Automator, and FluentCRM. Architected 'Buy Now, Choose Later' credit system for training bundles.",
      "AI & Automation: Built and deployed GPT-powered assistant connected via REST APIs for CEU rules, order lookups, training suggestions. Built 400+ automations triggered by tags, training progress, or form submissions.",
      "Analytics & Dashboards: Created provider analytics dashboards syncing GA4 data via GTM and Analytify. Displays page views, link clicks, social metrics, UTM sources with admin override and export options.",
      "Performance & DevOps: Optimized site speed with WP Rocket, LiteSpeed, Cloudflare CDN, async/defer scripts, GTM server-side tagging. Built REST-based dashboards with Cloudflare Workers + Mapbox.",
      "Cloudflare Optimizations: Rate-limiting, WAF rules, Bot Fight Mode, Caching & Tiered Cache, Managed Transforms, Page Rules, SSL/TLS Origin Cert, DNSSEC Setup.",
      "Server Enhancements: Compression (Brotli + gzip), Browser Caching, Security Headers, Cookie-Free CDN, LiteSpeed CDN, WP Rocket Page Cache, PHP-FPM Optimization, PHP 8.3 Upgrade.",
      "Monitoring & Recovery: Netdata Monitoring & Alerts, Critical Error Recovery, Server Resource Review, Liquid Web PHP Handler Update.",
      "Code & Database Maintenance: Search & Replace Cleanup, Autoloaded Options Cleanup, JS Optimization, Asset Optimization, Font & DNS Preload Fixes, Apache Tuning.",
      "Team Leadership: Manages cross-functional sprints with developers, designers, instructors, and marketing associates. Translates business goals into dev-ready specifications.",
      "Tracking & Conversion: Form Submission Tracking (Gravity Forms / GTM / Google Ads), GTM Engagement Tracking, Google Ads Conversion Optimization, PixelYourSite Pro integration.",
      "Instructor Tools: Dynamic 'event' Map Integration, Google Maps API, Instructor Dashboard with Event Filtering and Instrument Visibility.",
      "Platform Development: LearnDash Multisite Planning and architecture.",
    ],
    techStack: ['LearnDash', 'WooCommerce', 'WP Fusion', 'Gravity Forms', 'Uncanny Automator', 'FluentCRM', 'WordPress', 'JavaScript', 'GA4', 'GTM', 'Cloudflare Workers', 'Mapbox', 'WP Rocket', 'LiteSpeed', 'REST APIs', 'OpenAI', 'Netdata', 'PHP 8.3', 'GTM Server-Side'],
  },
  {
    id: 'ultimate',
    company: 'Ultimate Technologies Group',
    role: 'Interim Director of Marketing',
    period: 'Mar 2023 - Jul 2023',
    location: 'Fishers, IN',
    description: 'Spearheaded marketing strategy and execution during a key transitional period, ensuring business continuity and brand consistency across all channels.',
    achievements: [
      'Managed end-to-end marketing communications, including internal messaging, external campaigns, and stakeholder engagement.',
      'Led the development and optimization of Google Ads campaigns, improving lead generation, CTR, and overall ROI.',
      'Oversaw content creation for website, email marketing, social media, and sales collateral to support business development.',
      'Coordinated with cross-functional teams (sales, customer success, executive leadership) to align marketing strategy with organizational goals.',
      'Implemented marketing automation workflows and CRM integrations to streamline operations and enhance campaign performance tracking.',
      'Conducted market research and competitive analysis to refine targeting and positioning strategies.',
      'Managed and optimized paid media and SEO efforts, driving qualified traffic and enhancing online visibility.',
      'Directed branding updates and ensured visual and messaging alignment across all customer touchpoints.',
      'Provided leadership and mentoring to the marketing team, ensuring high performance during organizational change.',
    ],
    techStack: ['Marketing Strategy', 'Google Ads', 'Marketing Automation', 'CRM Integration', 'SEO', 'Paid Media', 'Brand Management', 'Campaign Management'],
  },
  {
    id: 'rbe-mgr',
    company: 'Riley Bennett Egloff, LLP',
    role: 'Marketing Manager',
    period: 'Jul 2022 - Mar 2023',
    location: 'Indianapolis, IN',
    description: 'Led strategic marketing, digital communications, and client development for legal and professional services.',
    achievements: [
      'Designed, built, and managed comprehensive marketing materials, including brochures, advertisements, email campaigns, newsletters, social media content, and RBE magazines.',
      'Oversaw firm branding and content strategy across digital platforms, including full ownership of the RBE website—enhancing performance, SEO, and user experience.',
      'Led public and media relations efforts: cultivated media relationships, drafted press releases, and secured firm publicity in legal news and thought leadership.',
      'Created and executed direct email marketing and social media campaigns; tracked performance metrics and optimized results.',
      'Partnered with attorneys to develop and manage individualized business development plans—successfully identifying new opportunities for client engagement and growth.',
      'Developed strategic pitch materials and managed RFP/proposal responses, showcasing firm capabilities with precision and impact.',
      'Played a key role in industry submissions and award nominations, increasing firm visibility and market recognition.',
      'Provided market intelligence insights to guide future strategy and business development planning.',
      'Actively participated in practice group meetings, contributing actionable insights that drove firm-wide initiatives forward.',
      'Established trusted relationships with practice group leaders and attorneys to support cross-selling and firm-wide business growth.',
    ],
    techStack: ['Strategic Marketing', 'Digital Marketing', 'SEO', 'Content Strategy', 'Email Marketing', 'Social Media', 'Public Relations', 'Business Development', 'RFP Management', 'Brand Management'],
  },
  {
    id: 'rbe-admin',
    company: 'Riley Bennett Egloff, LLP',
    role: 'Marketing Administrator',
    period: 'Jun 2015 - Nov 2022',
    location: 'Greater Indianapolis',
    description: 'Responsible for managing content marketing initiatives, website content, social media platforms, graphic design and ad creation, overall firm-to-client communication, and brand development.',
    achievements: [
      "Assisted in responding to the firm's RFP responses.",
      "Worked in conjunction with the Marketing Committee to carry out the firm's strategic marketing plan.",
      'Managed and developed business development plans for attorneys.',
    ],
    techStack: ['Content Marketing', 'Brand Development', 'Business Development', 'Social Media', 'Graphic Design', 'RFP Management'],
  },
  {
    id: 'deerfield',
    company: 'Deerfield Financial Advisors',
    role: 'Marketing Coordinator',
    period: 'Jun 2013 - Jun 2015',
    location: 'Indianapolis, IN',
    description: 'Executed marketing initiatives and campaigns to elevate brand awareness and attract new clients while supporting ongoing engagement with existing clients and professional partners.',
    achievements: [
      'Planned and managed successful client-facing seminars and events, enhancing client retention and brand credibility.',
      'Wrote and maintained content for the company website, email marketing campaigns, and printed collateral, ensuring consistency and clarity in brand messaging.',
      'Researched, evaluated, and implemented new technology platforms, improving both client services and internal operational efficiency.',
      'Collaborated with the Chief Compliance Officer to review all marketing materials, ensuring full compliance with FINRA and SEC regulations.',
    ],
    techStack: ['Content Development', 'Email Marketing', 'Event Management', 'Website Management', 'Technology Implementation', 'FINRA Compliance', 'SEC Compliance'],
  },
  {
    id: 'pike',
    company: 'Pike Medical Consultants',
    role: 'Marketing Coordinator',
    period: 'Sep 2009 - Jun 2013',
    location: 'Greater Indianapolis',
    description: 'Directed all marketing functions for the organization, including strategic planning, budgeting, advertising, branding, public relations, website development, and event management, while reporting directly to the company president.',
    achievements: [
      'Drove a 45% increase in patient visits over three years, maintaining a consistently positive ROI across all marketing initiatives.',
      'Designed and executed integrated marketing and advertising campaigns that directly contributed to sustained company growth.',
      'Led the creation of a new company website, modernizing the digital presence and improving patient engagement and lead generation.',
      'Developed and managed internal and external communication strategies to strengthen brand positioning and market visibility.',
      'Oversaw public relations efforts to increase awareness and credibility in the healthcare community.',
      'Implemented data-driven tracking and evaluation processes to measure the effectiveness of campaigns and inform future strategy.',
    ],
    techStack: ['Strategic Planning', 'Budgeting', 'Website Development', 'Google Ads', 'Public Relations', 'Brand Management', 'Campaign Management', 'Data Analytics', 'Event Management'],
    highlight: '+45% Patient Visits',
  },
  {
    id: 'orthoindy',
    company: 'OrthoIndy',
    role: 'Marketing Intern',
    period: '2006 – 2007',
    location: 'Indianapolis, IN',
    description: 'Gained foundational experience in a professional healthcare marketing environment, assisting with content and event coordination.',
    achievements: [
      'Assisted with content development and event coordination in a professional healthcare marketing environment.',
    ],
    techStack: ['Content Coordination', 'Event Management'],
  },
];

export const volunteering: VolunteerItem[] = [
  { role: 'President', organization: 'School 80 Condominiums Home Owners Association', period: 'Oct 2019 - Present', description: 'Volunteer as President for the School 80 Condominiums Home Owners Association.' },
  { role: 'Board Member', organization: 'Primary Colours', period: 'Jan 2018 - Dec 2019', description: 'Primary Colours is a non-profit organization dedicated to serving visual art and culture and connecting artists with their communities. Facilitated interaction between visual artists and the community.' },
  { role: 'Business Mentor', organization: 'SMART - Anti Bullying at School #96', period: 'Jan 2013 - May 2013', description: 'Volunteered to help a group of students build a business and marketing plan for their anti-bullying program.' },
  { role: 'Marketing', organization: 'Primary Colours', period: 'Feb 2017 - Present', description: 'Designed website and print materials for Primary Colours annual event, Installation Nation.' },
  { role: 'Board Member', organization: 'School 80 Condominiums Home Owners Association', period: 'Dec 2015 - Present', description: 'Volunteer as a board member for the School 80 Condominiums Home Owners Association.' },
  { role: 'Marketing Volunteer', organization: 'Frances W Parker IPS School 56', period: 'Jun 2017 - Jul 2017', description: "Designed posters (12) for the school's Situational VALUES project." },
  { role: 'Event Volunteer', organization: 'Walk to Defeat ALS - Indianapolis', period: 'Jan 2016 - Jan 2017', description: 'Volunteered for the Walk to Defeat ALS event in Indianapolis.' },
  { role: 'Designer', organization: 'Eastwood Middle School Soccer Team', period: 'Jan 2017 - Present', description: "Designed and printed shirts for Eastwood Middle School women's soccer team." },
];

export const education: EducationItem[] = [
  {
    school: 'Indiana University-Bloomington',
    degree: "Bachelor's degree in Business Management",
    year: 'August 2004 – May 2008',
    honors: 'Won 2006 Target Marketing Competition',
  },
];

export const awards: Award[] = [
  { 
    title: 'Gold Key Photography Award', 
    organization: 'Scholastic Art & Writing Awards', 
    year: '2008',
    description: 'Top-tier recognition in visual arts'
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'strategy',
    title: 'Strategy',
    accent: 'teal',
    items: [
      'Strategic Marketing & Leadership',
      'Brand Strategy & Transformation',
      'Content Strategy & Technical SEO',
      'Team Leadership & Cross-Functional Collaboration',
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    accent: 'orange',
    items: [
      'CRM Architecture & Automation (HubSpot, FluentCRM, WP Fusion)',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    accent: 'blue',
    items: [
      'Data Analytics & Attribution Modeling',
      'Custom Analytics Dashboards (GA4, GTM, Mapbox)',
    ],
  },
  {
    id: 'development',
    title: 'Development',
    accent: 'teal',
    items: [
      'Full-Stack Web Development (WordPress, JavaScript, React)',
      'Serverless Development (Cloudflare Workers)',
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    accent: 'orange',
    items: [
      'WordPress', 'JavaScript', 'React', 'HubSpot', 'FluentCRM', 'WP Fusion', 
      'LearnDash', 'WooCommerce', 'Google Analytics', 'Google Tag Manager', 
      'Mapbox', 'Cloudflare Workers', 'Cloudflare CDN', 'WP Rocket', 'LiteSpeed',
      'ACF Pro', 'FacetWP', 'Figma', 'Adobe Creative Suite', 'Canva', 'Photoshop'
    ],
  },
];
