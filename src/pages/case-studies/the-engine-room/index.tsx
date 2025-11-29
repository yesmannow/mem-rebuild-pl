import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theEngineRoom } from '@data/case-studies/the-engine-room';
import CaseStudyTemplate, { CaseStudyTemplateData } from '@components/case-study/CaseStudyTemplate';

const TheEngineRoomPage: React.FC = () => {
  const templateData: CaseStudyTemplateData = {
    slug: theEngineRoom.slug,
    theme: theEngineRoom.theme,
    hero: {
      title: theEngineRoom.title,
      subtitle: theEngineRoom.subtitle,
      emoji: theEngineRoom.emoji,
      stat: {
        label: theEngineRoom.outcomes.beforeAfter[0].metric,
        value: theEngineRoom.outcomes.beforeAfter[0].after,
      },
    },
    challenge: theEngineRoom.challenge.body,
    strategy: theEngineRoom.strategy,
    build: theEngineRoom.build,
    outcomes: 'Speed is a feature—and stability is the brand promise.',
    highlights: theEngineRoom.outcomes.highlights,
    metrics: theEngineRoom.outcomes.beforeAfter,
    capabilities: theEngineRoom.badges,
    quote: theEngineRoom.pullQuote,
    cta: {
      title: 'Need a faster, safer deployment engine?',
      label: theEngineRoom.cta.label,
      href: theEngineRoom.cta.href,
      secondaryLabel: 'View More Case Studies',
      secondaryHref: '/case-studies',
    },
  };

  return (
    <>
      <Helmet>
        <title>The Engine Room | BearCave Marketing</title>
        <meta
          name="description"
          content="Rebuilding the infrastructure so speed and stability become competitive advantages. Case study showing performance optimization and zero-downtime deployments."
        />
      </Helmet>

      <CaseStudyTemplate data={templateData} />
    </>
  );
};

export default TheEngineRoomPage;
