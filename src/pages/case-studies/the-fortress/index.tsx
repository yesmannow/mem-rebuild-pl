import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theFortress } from '@data/case-studies/the-fortress';
import HeroBlock from '@components/case-study/HeroBlock';
import ChallengeSection from '@components/case-study/ChallengeSection';
import StrategySection from '@components/case-study/StrategySection';
import BuildSection from '@components/case-study/BuildSection';
import OutcomesSection from '@components/case-study/OutcomesSection';
import PullQuote from '@components/case-study/PullQuote';
import CapabilitiesBadges from '@components/case-study/CapabilitiesBadges';
import CaseStudyCTA from '@components/case-study/CTA';
import PageLayout from '@components/layout/PageLayout';

const TheFortressPage: React.FC = () => {
  const primaryStat = theFortress.outcomes.beforeAfter[0];
  const strategyContent = theFortress.strategy.map(s => `${s.title}: ${s.detail}`).join('\n\n');
  const buildContent = theFortress.build.map(b => 
    `${b.title}:\n${b.items.map(item => `  • ${item}`).join('\n')}`
  ).join('\n\n');

  return (
    <>
      <Helmet>
        <title>The Fortress | BearCave Marketing</title>
        <meta
          name="description"
          content="Standing up an edge-first security posture that protects revenue 24/7. Case study showing security and performance optimization."
        />
      </Helmet>

      <div className="cs-shell" data-case-study="the-fortress" style={theFortress.theme as React.CSSProperties}>
        <PageLayout>
          <HeroBlock
            title={theFortress.title}
            impact={theFortress.subtitle}
            stat={{
              label: primaryStat.metric,
              value: primaryStat.after,
            }}
            gradient={theFortress.theme['--cs-bg']}
            emoji={theFortress.emoji}
          />

          <ChallengeSection
            title={theFortress.challenge.heading}
            content={theFortress.challenge.body}
            visualIdentity={{
              primaryColor: theFortress.theme['--cs-primary'],
            }}
          />

          <StrategySection
            title="Strategy"
            content={strategyContent}
            visualIdentity={{
              primaryColor: theFortress.theme['--cs-primary'],
            }}
          />

          <BuildSection
            title="What I Built"
            content={buildContent}
            visualIdentity={{
              primaryColor: theFortress.theme['--cs-primary'],
            }}
          />

          <OutcomesSection
            outcomes={{
              bullets: theFortress.outcomes.highlights,
            }}
            metrics={theFortress.outcomes.beforeAfter.map(m => ({
              label: m.metric,
              before: m.before,
              after: m.after,
            }))}
            capabilities={theFortress.badges}
          />

          <PullQuote
            quote={theFortress.pullQuote.quote}
            author={theFortress.pullQuote.source}
            visualIdentity={{
              primaryColor: theFortress.theme['--cs-primary'],
            }}
          />

          <CapabilitiesBadges
            capabilities={theFortress.badges}
            visualIdentity={{
              primaryColor: theFortress.theme['--cs-primary'],
            }}
          />

          <CaseStudyCTA
            primaryAction={{
              label: theFortress.cta.label,
              href: theFortress.cta.href,
            }}
            secondaryAction={{
              label: 'View More Case Studies',
              href: '/case-studies',
            }}
            visualIdentity={{
              accentColor: theFortress.theme['--cs-accent'],
            }}
          />
        </PageLayout>
      </div>
    </>
  );
};

export default TheFortressPage;

