import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theFortress } from '@data/case-studies/the-fortress';
import CaseStudyTemplate, { CaseStudyTemplateData } from '@components/case-study/CaseStudyTemplate';
import ThreatMap from '@components/case-studies/ThreatMap';

const TheFortressPage: React.FC = () => {
  const templateData: CaseStudyTemplateData = {
    slug: theFortress.slug,
    theme: theFortress.theme,
    hero: {
      title: theFortress.title,
      subtitle: theFortress.subtitle,
      emoji: theFortress.emoji,
      stat: {
        label: theFortress.outcomes.beforeAfter[0].metric,
        value: theFortress.outcomes.beforeAfter[0].after,
      },
    },
    challenge: theFortress.challenge.body,
    strategy: theFortress.strategy,
    build: theFortress.build,
    outcomes: 'Security became a growth enabler, not a tax.',
    highlights: theFortress.outcomes.highlights,
    metrics: theFortress.outcomes.beforeAfter,
    capabilities: theFortress.badges,
    quote: theFortress.pullQuote,
    cta: {
      title: 'Need an always-on security posture?',
      label: theFortress.cta.label,
      href: theFortress.cta.href,
      secondaryLabel: 'View More Case Studies',
      secondaryHref: '/case-studies',
    },
  };

  return (
    <>
      <Helmet>
        <title>The Fortress | BearCave Marketing</title>
        <meta
          name="description"
          content="Standing up an edge-first security posture that protects revenue 24/7. Case study showing security and performance optimization."
        />
      </Helmet>

      <CaseStudyTemplate data={templateData} interactiveSlot={<ThreatMap />} />
    </>
  );
};

export default TheFortressPage;

