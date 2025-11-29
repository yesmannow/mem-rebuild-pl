import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theCompass } from '@data/case-studies/the-compass';
import CaseStudyTemplate, { CaseStudyTemplateData } from '@components/case-study/CaseStudyTemplate';
import DataStream from '@components/case-studies/DataStream';

const TheCompassPage: React.FC = () => {
  const templateData: CaseStudyTemplateData = {
    slug: theCompass.slug,
    theme: theCompass.theme,
    hero: {
      title: theCompass.title,
      subtitle: theCompass.subtitle,
      emoji: theCompass.emoji,
      stat: {
        label: theCompass.outcomes.beforeAfter[0].metric,
        value: theCompass.outcomes.beforeAfter[0].after,
      },
    },
    challenge: theCompass.challenge.body,
    strategy: theCompass.strategy,
    build: theCompass.build,
    outcomes: 'Every channel, cohort, and conversion path mapped to one truthful dashboard.',
    highlights: theCompass.outcomes.highlights,
    metrics: theCompass.outcomes.beforeAfter,
    capabilities: theCompass.badges,
    quote: theCompass.pullQuote,
    cta: {
      title: 'Want attribution you can trust?',
      label: theCompass.cta.label,
      href: theCompass.cta.href,
      secondaryLabel: 'View More Case Studies',
      secondaryHref: '/case-studies',
    },
  };

  return (
    <>
      <Helmet>
        <title>The Compass | BearCave Marketing</title>
        <meta
          name="description"
          content="Rebuilding analytics and attribution so every dollar is accountable. Case study showing how we created a single source of truth for data-driven decisions."
        />
      </Helmet>

      <CaseStudyTemplate data={templateData} interactiveSlot={<DataStream />} />
    </>
  );
};

export default TheCompassPage;
