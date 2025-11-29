import React from 'react';

export default function JSONLD() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jacob Darling',
    url: 'https://www.bearcavemarketing.com',
    jobTitle: 'Marketing Strategist & Systems Architect',
    sameAs: ['https://linkedin.com/in/jacobdarling', 'https://github.com/JdarlingGT'],
    description: 'I build marketing systems that turn brands into revenue engines.',
    knowsAbout: [
      'Marketing Automation',
      'CRM Campaigns',
      'Digital Marketing Strategy',
      'SEO/SEM',
      'Web Development',
      'Marketing Analytics',
    ],
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Jacob Darling Portfolio',
    url: 'https://www.bearcavemarketing.com',
    creator: {
      '@type': 'Person',
      name: 'Jacob Darling',
    },
    about: 'Marketing Strategy & Systems Architecture',
    keywords: 'marketing strategy, marketing automation, CRM architecture, fractional CMO, marketing systems',
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(portfolioSchema)}</script>
    </>
  );
}
