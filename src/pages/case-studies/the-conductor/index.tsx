import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theConductor } from '@data/case-studies/the-conductor';
import HeroBlock from '@components/case-study/HeroBlock';
import ChallengeSection from '@components/case-study/ChallengeSection';
import StrategySection from '@components/case-study/StrategySection';
import BuildSection from '@components/case-study/BuildSection';
import OutcomesSection from '@components/case-study/OutcomesSection';
import PullQuote from '@components/case-study/PullQuote';
import CapabilitiesBadges from '@components/case-study/CapabilitiesBadges';
import CaseStudyCTA from '@components/case-study/CTA';
import PageLayout from '@components/layout/PageLayout';

const TheConductorPage: React.FC = () => {
  const primaryStat = theConductor.outcomes.beforeAfter[0];
  const strategyContent = theConductor.strategy.map(s => `${s.title}: ${s.detail}`).join('\n\n');
  const buildContent = theConductor.build.map(b => 
    `${b.title}:\n${b.items.map(item => `  • ${item}`).join('\n')}`
  ).join('\n\n');

  return (
    <>
      <Helmet>
        <title>The Conductor | BearCave Marketing</title>
        <meta
          name="description"
          content="Orchestrating a unified data pipeline across marketing, education, and finance. Case study showing systems integration and data architecture."
        />
      </Helmet>

      <div className="cs-shell" data-case-study="the-conductor" style={theConductor.theme as React.CSSProperties}>
        <PageLayout>
          <HeroBlock
            title={theConductor.title}
            impact={theConductor.subtitle}
            stat={{
              label: primaryStat.metric,
              value: primaryStat.after,
            }}
            gradient={theConductor.theme['--cs-bg']}
            emoji={theConductor.emoji}
          />

          <ChallengeSection
            title={theConductor.challenge.heading}
            content={theConductor.challenge.body}
            visualIdentity={{
              primaryColor: theConductor.theme['--cs-primary'],
            }}
          />

          <StrategySection
            title="Strategy"
            content={strategyContent}
            visualIdentity={{
              primaryColor: theConductor.theme['--cs-primary'],
            }}
          />

          <BuildSection
            title="What I Built"
            content={buildContent}
            visualIdentity={{
              primaryColor: theConductor.theme['--cs-primary'],
            }}
          />

          <OutcomesSection
            outcomes={{
              bullets: theConductor.outcomes.highlights,
            }}
            metrics={theConductor.outcomes.beforeAfter.map(m => ({
              label: m.metric,
              before: m.before,
              after: m.after,
            }))}
            capabilities={theConductor.badges}
          />

          <PullQuote
            quote={theConductor.pullQuote.quote}
            author={theConductor.pullQuote.source}
            visualIdentity={{
              primaryColor: theConductor.theme['--cs-primary'],
            }}
          />

          <CapabilitiesBadges
            capabilities={theConductor.badges}
            visualIdentity={{
              primaryColor: theConductor.theme['--cs-primary'],
            }}
          />

          <CaseStudyCTA
            primaryAction={{
              label: theConductor.cta.label,
              href: theConductor.cta.href,
            }}
            secondaryAction={{
              label: 'View More Case Studies',
              href: '/case-studies',
            }}
            visualIdentity={{
              accentColor: theConductor.theme['--cs-accent'],
            }}
          />
        </PageLayout>
      </div>
    </>
  );
};

export default TheConductorPage;

