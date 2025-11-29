import React from 'react';

const BASE_URL = 'https://www.bearcavemarketing.com';

const OrganizationSchema: React.FC = () => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jacob Darling',
    url: BASE_URL,
    image: `${BASE_URL}/images/logo-primary.svg`,
    jobTitle: 'Marketing Strategist & Systems Architect',
    description:
      'Marketing systems architect and strategist with 15+ years of experience building revenue engines through strategy, creative, analytics, and execution.',
    email: 'hoosierdarling@gmail.com',
    url: `${BASE_URL}/contact`,
    sameAs: ['https://linkedin.com/in/jacobdarling', 'https://github.com/JdarlingGT'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    knowsAbout: [
      'Marketing Strategy',
      'Marketing Automation',
      'CRM Architecture',
      'Go-to-Market Strategy',
      'Marketing Analytics',
      'Web Development',
      'Brand Strategy',
      'Revenue Operations',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  );
};

export default OrganizationSchema;
