import React from 'react';
import { Helmet } from 'react-helmet-async';
import CaseStudyTemplate, { CaseStudyTemplateData } from '@components/case-study/CaseStudyTemplate';
import WorkflowVisualizer from '@components/case-studies/WorkflowVisualizer';
import { theLaunchpad } from '@data/case-studies/the-launchpad';

const theme = {
  '--cs-bg': theLaunchpad.visualIdentity.gradient,
  '--cs-primary': theLaunchpad.visualIdentity.primaryColor,
  '--cs-accent': theLaunchpad.visualIdentity.accentColor,
  '--cs-surface': 'rgba(255,255,255,0.92)',
  '--cs-glow': 'rgba(60,198,196,0.35)',
};

const TheLaunchpadPage: React.FC = () => {
  const templateData: CaseStudyTemplateData = {
    slug: theLaunchpad.slug,
    theme,
    hero: {
      title: theLaunchpad.title,
      subtitle: theLaunchpad.positioning,
      emoji: theLaunchpad.visualIdentity.emoji,
      stat: theLaunchpad.stat,
      media: {
        src: '/demos/graston-growth-engine.jpg',
        alt: 'Launchpad growth engine interface',
      },
    },
    challenge: theLaunchpad.challenge,
    strategy: theLaunchpad.strategy,
    build: theLaunchpad.whatIBuilt,
    outcomes: theLaunchpad.outcomes,
    metrics: theLaunchpad.metrics,
    capabilities: theLaunchpad.capabilities,
    quote: {
      quote: 'Directories don’t create growth. Systems do.',
    },
    cta: {
      title: 'Want to transform your practitioner ecosystem?',
      label: 'Start a Project',
      href: '/contact',
      secondaryLabel: 'View More Case Studies',
      secondaryHref: '/case-studies',
    },
  };

  return (
    <>
      <Helmet>
        <title>The Launchpad | BearCave Marketing</title>
        <meta
          name="description"
          content="Transforming a trusted catalog into a practitioner growth engine. Case study showing how we rebuilt a directory into a conversion-focused platform."
        />
      </Helmet>

      <CaseStudyTemplate data={templateData} interactiveSlot={<WorkflowVisualizer />} />
    </>
  );
};

export default TheLaunchpadPage;
