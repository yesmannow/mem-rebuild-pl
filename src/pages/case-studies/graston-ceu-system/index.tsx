import React from 'react';
import { Helmet } from 'react-helmet-async';
import { grastonCEU } from '@data/case-studies/graston-ceu';
import CaseStudyTemplate, { CaseStudyTemplateData } from '@components/case-study/CaseStudyTemplate';

const GrastonCEUPage: React.FC = () => {
  const templateData: CaseStudyTemplateData = {
    slug: grastonCEU.slug,
    theme: grastonCEU.theme,
    hero: {
      title: grastonCEU.title,
      subtitle: grastonCEU.subtitle,
      emoji: grastonCEU.emoji,
      stat: {
        label: grastonCEU.outcomes.beforeAfter[0].metric,
        value: grastonCEU.outcomes.beforeAfter[0].after,
      },
    },
    challenge: grastonCEU.challenge.body,
    strategy: grastonCEU.strategy,
    build: grastonCEU.build,
    outcomes: 'CEU commerce, enrollment, and verification unified under one automated journey.',
    highlights: grastonCEU.outcomes.highlights,
    metrics: grastonCEU.outcomes.beforeAfter,
    capabilities: grastonCEU.badges,
    quote: grastonCEU.pullQuote,
    cta: {
      title: 'Need an automated CEU experience?',
      label: grastonCEU.cta.label,
      href: grastonCEU.cta.href,
      secondaryLabel: 'View More Case Studies',
      secondaryHref: '/case-studies',
    },
  };

  return (
    <>
      <Helmet>
        <title>Graston Technique CEU System | BearCave Marketing</title>
        <meta
          name="description"
          content="End-to-end CEU commerce, enrollment, and verification for providers. Case study showing healthcare tech and automation systems."
        />
      </Helmet>

      <CaseStudyTemplate data={templateData} />
    </>
  );
};

export default GrastonCEUPage;
