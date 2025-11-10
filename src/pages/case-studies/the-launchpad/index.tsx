import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroBlock from '@components/case-study/HeroBlock';
import ChallengeSection from '@components/case-study/ChallengeSection';
import StrategySection from '@components/case-study/StrategySection';
import BuildSection from '@components/case-study/BuildSection';
import OutcomesSection from '@components/case-study/OutcomesSection';
import PullQuote from '@components/case-study/PullQuote';
import CapabilitiesBadges from '@components/case-study/CapabilitiesBadges';
import CaseStudyCTA from '@components/case-study/CTA';
import { theLaunchpad } from '@data/case-studies/the-launchpad';
import PageLayout from '@components/layout/PageLayout';

const TheLaunchpadPage: React.FC = () => {
  const { visualIdentity } = theLaunchpad;

  return (
    <>
      <Helmet>
        <title>The Launchpad | BearCave Marketing</title>
        <meta
          name="description"
          content="Transforming a trusted catalog into a practitioner growth engine. Case study showing how we rebuilt a directory into a conversion-focused platform."
        />
      </Helmet>

      <div data-case-study="the-launchpad">
        <PageLayout>
          {/* Hero Block */}
          <HeroBlock
            title={theLaunchpad.title}
            impact={theLaunchpad.impact}
            stat={theLaunchpad.stat}
            gradient={theLaunchpad.visualIdentity.gradient}
            emoji={theLaunchpad.visualIdentity.emoji}
          />

          {/* Challenge Section */}
          <ChallengeSection
            title="Challenge"
            content={theLaunchpad.challenge}
            visualIdentity={{
              primaryColor: visualIdentity.primaryColor,
            }}
          />

          {/* Strategy Section */}
          <StrategySection
            title="Strategy"
            content={theLaunchpad.strategy}
            visualIdentity={{
              primaryColor: visualIdentity.primaryColor,
            }}
          />

          {/* Pull Quote */}
          <PullQuote
            quote="Directories don't create growth. Systems do."
            visualIdentity={{
              primaryColor: visualIdentity.primaryColor,
            }}
          />

          {/* What I Built Section */}
          <BuildSection
            title="What I Built"
            content={theLaunchpad.whatIBuilt}
            visualIdentity={{
              primaryColor: visualIdentity.primaryColor,
            }}
          />

          {/* Outcomes Section */}
          <OutcomesSection
            outcomes={theLaunchpad.outcomes}
            metrics={theLaunchpad.metrics}
            capabilities={theLaunchpad.capabilities}
          />

          {/* Capabilities Badges */}
          <CapabilitiesBadges
            capabilities={theLaunchpad.capabilities}
            visualIdentity={{
              primaryColor: visualIdentity.primaryColor,
            }}
          />

          {/* CTA */}
          <CaseStudyCTA
            title="Want to transform your practitioner ecosystem?"
            primaryAction={{
              label: 'Start a Project',
              href: '/contact',
            }}
            secondaryAction={{
              label: 'View More Case Studies',
              href: '/case-studies',
            }}
            visualIdentity={{
              accentColor: visualIdentity.accentColor,
            }}
          />
        </PageLayout>
      </div>
    </>
  );
};

export default TheLaunchpadPage;

