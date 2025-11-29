import React from 'react';
import { Helmet } from 'react-helmet-async';
import { rbeLaw } from '@data/case-studies/rbe-law';
import CaseStudyTemplate, { CaseStudyTemplateData } from '@components/case-study/CaseStudyTemplate';

const RBELawPage: React.FC = () => {
  const templateData: CaseStudyTemplateData = {
    slug: rbeLaw.slug,
    theme: rbeLaw.theme,
    hero: {
      title: rbeLaw.title,
      subtitle: rbeLaw.subtitle,
      emoji: rbeLaw.emoji,
      stat: {
        label: rbeLaw.outcomes.beforeAfter[0].metric,
        value: rbeLaw.outcomes.beforeAfter[0].after,
      },
    },
    challenge: rbeLaw.challenge.body,
    strategy: rbeLaw.strategy,
    build: rbeLaw.build,
    outcomes: 'A modernized brand and digital system that signals confidence and clarity.',
    highlights: rbeLaw.outcomes.highlights,
    metrics: rbeLaw.outcomes.beforeAfter,
    capabilities: rbeLaw.badges,
    quote: rbeLaw.pullQuote,
    cta: {
      title: 'Need a brand and digital overhaul?',
      label: rbeLaw.cta.label,
      href: rbeLaw.cta.href,
      secondaryLabel: 'View More Case Studies',
      secondaryHref: '/case-studies',
    },
  };

  return (
    <>
      <Helmet>
        <title>Riley Bennett Egloff - Brand & Digital Overhaul | BearCave Marketing</title>
        <meta
          name="description"
          content="Repositioning a prestigious law firm for modern growth. Case study showing brand strategy, web design, and content marketing."
        />
      </Helmet>

      <CaseStudyTemplate data={templateData} />
    </>
  );
};

export default RBELawPage;
