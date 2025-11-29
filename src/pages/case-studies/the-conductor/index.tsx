import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theConductor } from '@data/case-studies/the-conductor';
import CaseStudyTemplate, { CaseStudyTemplateData } from '@components/case-study/CaseStudyTemplate';
import SystemSchematic from '@components/case-studies/SystemSchematic';

const TheConductorPage: React.FC = () => {
  const templateData: CaseStudyTemplateData = {
    slug: theConductor.slug,
    theme: theConductor.theme,
    hero: {
      title: theConductor.title,
      subtitle: theConductor.subtitle,
      emoji: theConductor.emoji,
      stat: {
        label: theConductor.outcomes.beforeAfter[0].metric,
        value: theConductor.outcomes.beforeAfter[0].after,
      },
    },
    challenge: theConductor.challenge.body,
    strategy: theConductor.strategy,
    build: theConductor.build,
    outcomes: theConductor.subtitle,
    highlights: theConductor.outcomes.highlights,
    metrics: theConductor.outcomes.beforeAfter,
    capabilities: theConductor.badges,
    quote: theConductor.pullQuote,
    cta: {
      title: 'Ready to orchestrate your data stack?',
      label: theConductor.cta.label,
      href: theConductor.cta.href,
      secondaryLabel: 'View More Case Studies',
      secondaryHref: '/case-studies',
    },
  };

  return (
    <>
      <Helmet>
        <title>The Conductor | BearCave Marketing</title>
        <meta
          name="description"
          content="Orchestrating a unified data pipeline across marketing, education, and finance. Case study showing systems integration and data architecture."
        />
      </Helmet>

      <CaseStudyTemplate data={templateData} interactiveSlot={<SystemSchematic />} />
    </>
  );
};

export default TheConductorPage;

