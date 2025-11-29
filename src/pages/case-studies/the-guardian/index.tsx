import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theGuardian } from '@data/case-studies/the-guardian';
import CaseStudyTemplate, { CaseStudyTemplateData } from '@components/case-study/CaseStudyTemplate';

const TheGuardianPage: React.FC = () => {
  const templateData: CaseStudyTemplateData = {
    slug: theGuardian.slug,
    theme: theGuardian.theme,
    hero: {
      title: theGuardian.title,
      subtitle: theGuardian.subtitle,
      emoji: theGuardian.emoji,
      stat: {
        label: theGuardian.outcomes.beforeAfter[0].metric,
        value: theGuardian.outcomes.beforeAfter[0].after,
      },
    },
    challenge: theGuardian.challenge.body,
    strategy: theGuardian.strategy,
    build: theGuardian.build,
    outcomes: 'Compliance became proactive, lightweight, and full-fidelity.',
    highlights: theGuardian.outcomes.highlights,
    metrics: theGuardian.outcomes.beforeAfter,
    capabilities: theGuardian.badges,
    quote: theGuardian.pullQuote,
    cta: {
      title: 'Let’s turn compliance into an advantage.',
      label: theGuardian.cta.label,
      href: theGuardian.cta.href,
      secondaryLabel: 'View More Case Studies',
      secondaryHref: '/case-studies',
    },
  };

  return (
    <>
      <Helmet>
        <title>The Guardian | BearCave Marketing</title>
        <meta
          name="description"
          content="Turning compliance pain into an automated trust-and-sales engine. Case study showing automation and compliance systems."
        />
      </Helmet>

      <CaseStudyTemplate data={templateData} />
    </>
  );
};

export default TheGuardianPage;
