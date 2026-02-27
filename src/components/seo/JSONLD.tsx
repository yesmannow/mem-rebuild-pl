import React from 'react';

export default function JSONLD() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jacob Darling',
    url: 'https://www.bearcavemarketing.com',
    jobTitle: 'Systems Architect & Fractional CMO',
    sameAs: [
      'https://linkedin.com/in/jacobdarling',
      'https://github.com/JdarlingGT',
    ],
    description: 'Digital production, visual engineering, and technical architecture by Jacob Darling. I build marketing systems that turn brands into revenue engines.',
    knowsAbout: [
      'Marketing Automation',
      'CRM Architecture',
      'Digital Marketing Strategy',
      'SEO/SEM',
      'Web Development',
      'Marketing Analytics',
      'Brand Strategy',
      '3D Interaction Design',
      'Systems Architecture',
      'Fractional CMO Services',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jacob Darling Portfolio',
    url: 'https://www.bearcavemarketing.com',
    description: 'Digital production, visual engineering, and technical architecture by Jacob Darling.',
    author: {
      '@type': 'Person',
      name: 'Jacob Darling',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.bearcavemarketing.com/side-projects',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Jacob Darling Portfolio',
    url: 'https://www.bearcavemarketing.com',
    creator: {
      '@type': 'Person',
      name: 'Jacob Darling',
      jobTitle: 'Systems Architect & Fractional CMO',
    },
    about: 'Marketing Strategy, Systems Architecture & Visual Engineering',
    keywords: 'marketing strategy, marketing automation, CRM architecture, fractional CMO, marketing systems, brand strategy, web development, 3D interaction design',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
    </>
  );
}
