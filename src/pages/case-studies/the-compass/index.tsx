import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theCompass } from '@data/case-studies/the-compass';
import HeroBlock from '@components/case-study/HeroBlock';
import ChallengeSection from '@components/case-study/ChallengeSection';
import StrategySection from '@components/case-study/StrategySection';
import BuildSection from '@components/case-study/BuildSection';
import OutcomesSection from '@components/case-study/OutcomesSection';
import PullQuote from '@components/case-study/PullQuote';
import CapabilitiesBadges from '@components/case-study/CapabilitiesBadges';
import CaseStudyCTA from '@components/case-study/CTA';
import PageLayout from '@components/layout/PageLayout';

const TheCompassPage: React.FC = () => {
  // Extract primary stat from outcomes
  const primaryStat = theCompass.outcomes.beforeAfter[0];
  
  // Format strategy as paragraphs
  const strategyContent = theCompass.strategy.map(s => `${s.title}: ${s.detail}`).join('\n\n');
  
  // Format build as bullets
  const buildContent = theCompass.build.map(b => 
    `${b.title}:\n${b.items.map(item => `  • ${item}`).join('\n')}`
  ).join('\n\n');

  return (
    <>
      <Helmet>
        <title>The Compass | BearCave Marketing</title>
        <meta
          name="description"
          content="Rebuilding analytics and attribution so every dollar is accountable. Case study showing how we created a single source of truth for data-driven decisions."
        />
      </Helmet>

      <div className="cs-shell" data-case-study="the-compass" style={theCompass.theme as React.CSSProperties}>
        <PageLayout>
          {/* Hero Block */}
          <HeroBlock
            title={theCompass.title}
            impact={theCompass.subtitle}
            stat={{
              label: primaryStat.metric,
              value: primaryStat.after,
            }}
            gradient={theCompass.theme['--cs-bg']}
            emoji={theCompass.emoji}
          />

          {/* Challenge Section */}
          <ChallengeSection
            title={theCompass.challenge.heading}
            content={theCompass.challenge.body}
            visualIdentity={{
              primaryColor: theCompass.theme['--cs-primary'],
            }}
          />

          {/* Strategy Section */}
          <StrategySection
            title="Strategy"
            content={strategyContent}
            visualIdentity={{
              primaryColor: theCompass.theme['--cs-primary'],
            }}
          />

          {/* What I Built Section */}
          <BuildSection
            title="What I Built"
            content={buildContent}
            visualIdentity={{
              primaryColor: theCompass.theme['--cs-primary'],
            }}
          />

          {/* Outcomes Section */}
          <OutcomesSection
            outcomes={{
              bullets: theCompass.outcomes.highlights,
            }}
            metrics={theCompass.outcomes.beforeAfter.map(m => ({
              label: m.metric,
              before: m.before,
              after: m.after,
            }))}
            capabilities={theCompass.badges}
          />

          {/* Pull Quote */}
          <PullQuote
            quote={theCompass.pullQuote.quote}
            author={theCompass.pullQuote.source}
            visualIdentity={{
              primaryColor: theCompass.theme['--cs-primary'],
            }}
          />

          {/* Capabilities Badges */}
          <CapabilitiesBadges
            capabilities={theCompass.badges}
            visualIdentity={{
              primaryColor: theCompass.theme['--cs-primary'],
            }}
          />

          {/* CTA */}
          <CaseStudyCTA
            primaryAction={{
              label: theCompass.cta.label,
              href: theCompass.cta.href,
            }}
            secondaryAction={{
              label: 'View More Case Studies',
              href: '/case-studies',
            }}
            visualIdentity={{
              accentColor: theCompass.theme['--cs-accent'],
            }}
          />
        </PageLayout>
      </div>
    </>
  );
};

export default TheCompassPage;
