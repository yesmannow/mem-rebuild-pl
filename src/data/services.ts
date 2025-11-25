export interface ServiceModule {
  id: string;
  name: string;
  description: string;
  iconSrc: string;
  version?: string;
  features?: string[];
}

export const services: ServiceModule[] = [
  {
    id: 'growth-os',
    name: 'GrowthOS',
    description: 'Complete marketing operating system. CRM, automation, analytics, and attribution in one unified platform.',
    iconSrc: '/images/concepts/growth-os.svg',
    version: '2.0.0',
    features: [
      'Multi-channel attribution',
      'Automated lead scoring',
      'Revenue forecasting',
      'Team collaboration tools',
    ],
  },
  {
    id: 'content-api',
    name: 'ContentAPI',
    description: 'Headless content management with automated publishing, A/B testing, and performance tracking built-in.',
    iconSrc: '/images/concepts/content-api.svg',
    version: '1.5.0',
    features: [
      'RESTful API',
      'Real-time analytics',
      'Automated SEO optimization',
      'Multi-format publishing',
    ],
  },
  {
    id: 'data-link',
    name: 'DataLink',
    description: 'Connect any data source to any destination. Real-time sync, transformation, and validation included.',
    iconSrc: '/images/concepts/data-link.svg',
    version: '3.1.0',
    features: [
      '100+ integrations',
      'Custom transformations',
      'Error handling & retries',
      'Data quality checks',
    ],
  },
];

