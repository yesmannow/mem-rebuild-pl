import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theEngineRoom } from '@data/case-studies/the-engine-room';
import HeroBlock from '@components/case-study/HeroBlock';
import ChallengeSection from '@components/case-study/ChallengeSection';
import StrategySection from '@components/case-study/StrategySection';
import BuildSection from '@components/case-study/BuildSection';
import OutcomesSection from '@components/case-study/OutcomesSection';
import PullQuote from '@components/case-study/PullQuote';
import CapabilitiesBadges from '@components/case-study/CapabilitiesBadges';
import CaseStudyCTA from '@components/case-study/CTA';
import PageLayout from '@components/layout/PageLayout';

const TheEngineRoomPage: React.FC = () => {
  // Extract primary stat from outcomes
  const primaryStat = theEngineRoom.outcomes.beforeAfter[0];
  
  // Format strategy as paragraphs
  const strategyContent = theEngineRoom.strategy.map(s => `${s.title}: ${s.detail}`).join('\n\n');
  
  // Format build as bullets
  const buildContent = theEngineRoom.build.map(b => 
    `${b.title}:\n${b.items.map(item => `  • ${item}`).join('\n')}`
  ).join('\n\n');

  return (
    <>
      <Helmet>
        <title>The Engine Room | BearCave Marketing</title>
        <meta
          name="description"
          content="Rebuilding the infrastructure so speed and stability become competitive advantages. Case study showing performance optimization and zero-downtime deployments."
        />
      </Helmet>

      <div className="cs-shell" data-case-study="the-engine-room" style={theEngineRoom.theme as React.CSSProperties}>
        <PageLayout>
          {/* Hero Block */}
          <HeroBlock
            title={theEngineRoom.title}
            impact={theEngineRoom.subtitle}
            stat={{
              label: primaryStat.metric,
              value: primaryStat.after,
            }}
            gradient={theEngineRoom.theme['--cs-bg']}
            emoji={theEngineRoom.emoji}
          />

          {/* Challenge Section */}
          <ChallengeSection
            title={theEngineRoom.challenge.heading}
            content={theEngineRoom.challenge.body}
            visualIdentity={{
              primaryColor: theEngineRoom.theme['--cs-primary'],
            }}
          />

          {/* Strategy Section */}
          <StrategySection
            title="Strategy"
            content={strategyContent}
            visualIdentity={{
              primaryColor: theEngineRoom.theme['--cs-primary'],
            }}
          />

          {/* What I Built Section */}
          <BuildSection
            title="What I Built"
            content={buildContent}
            visualIdentity={{
              primaryColor: theEngineRoom.theme['--cs-primary'],
            }}
          />

          {/* Outcomes Section */}
          <OutcomesSection
            outcomes={{
              bullets: theEngineRoom.outcomes.highlights,
            }}
            metrics={theEngineRoom.outcomes.beforeAfter.map(m => ({
              label: m.metric,
              before: m.before,
              after: m.after,
            }))}
            capabilities={theEngineRoom.badges}
          />

          {/* Pull Quote */}
          <PullQuote
            quote={theEngineRoom.pullQuote.quote}
            author={theEngineRoom.pullQuote.source}
            visualIdentity={{
              primaryColor: theEngineRoom.theme['--cs-primary'],
            }}
          />

          {/* Capabilities Badges */}
          <CapabilitiesBadges
            capabilities={theEngineRoom.badges}
            visualIdentity={{
              primaryColor: theEngineRoom.theme['--cs-primary'],
            }}
          />

          {/* CTA */}
          <CaseStudyCTA
            primaryAction={{
              label: theEngineRoom.cta.label,
              href: theEngineRoom.cta.href,
            }}
            secondaryAction={{
              label: 'View More Case Studies',
              href: '/case-studies',
            }}
            visualIdentity={{
              accentColor: theEngineRoom.theme['--cs-accent'],
            }}
          />
        </PageLayout>
      </div>
    </>
  );
};

export default TheEngineRoomPage;
