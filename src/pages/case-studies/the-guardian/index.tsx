import React from 'react';
import { Helmet } from 'react-helmet-async';
import { theGuardian } from '@data/case-studies/the-guardian';
import HeroBlock from '@components/case-study/HeroBlock';
import ChallengeSection from '@components/case-study/ChallengeSection';
import StrategySection from '@components/case-study/StrategySection';
import BuildSection from '@components/case-study/BuildSection';
import OutcomesSection from '@components/case-study/OutcomesSection';
import PullQuote from '@components/case-study/PullQuote';
import CapabilitiesBadges from '@components/case-study/CapabilitiesBadges';
import CaseStudyCTA from '@components/case-study/CTA';
import PageLayout from '@components/layout/PageLayout';

const TheGuardianPage: React.FC = () => {
  const primaryStat = theGuardian.outcomes.beforeAfter[0];
  const strategyContent = theGuardian.strategy.map(s => `${s.title}: ${s.detail}`).join('\n\n');
  const buildContent = theGuardian.build.map(b => 
    `${b.title}:\n${b.items.map(item => `  • ${item}`).join('\n')}`
  ).join('\n\n');

  return (
    <>
      <Helmet>
        <title>The Guardian | BearCave Marketing</title>
        <meta
          name="description"
          content="Turning compliance pain into an automated trust-and-sales engine. Case study showing automation and compliance systems."
        />
      </Helmet>

      <div className="cs-shell" data-case-study="the-guardian" style={theGuardian.theme as React.CSSProperties}>
        <PageLayout>
          <HeroBlock
            title={theGuardian.title}
            impact={theGuardian.subtitle}
            stat={{
              label: primaryStat.metric,
              value: primaryStat.after,
            }}
            gradient={theGuardian.theme['--cs-bg']}
            emoji={theGuardian.emoji}
          />

          <ChallengeSection
            title={theGuardian.challenge.heading}
            content={theGuardian.challenge.body}
            visualIdentity={{
              primaryColor: theGuardian.theme['--cs-primary'],
            }}
          />

          <StrategySection
            title="Strategy"
            content={strategyContent}
            visualIdentity={{
              primaryColor: theGuardian.theme['--cs-primary'],
            }}
          />

          <BuildSection
            title="What I Built"
            content={buildContent}
            visualIdentity={{
              primaryColor: theGuardian.theme['--cs-primary'],
            }}
          />

          <OutcomesSection
            outcomes={{
              bullets: theGuardian.outcomes.highlights,
            }}
            metrics={theGuardian.outcomes.beforeAfter.map(m => ({
              label: m.metric,
              before: m.before,
              after: m.after,
            }))}
            capabilities={theGuardian.badges}
          />

          <PullQuote
            quote={theGuardian.pullQuote.quote}
            author={theGuardian.pullQuote.source}
            visualIdentity={{
              primaryColor: theGuardian.theme['--cs-primary'],
            }}
          />

          <CapabilitiesBadges
            capabilities={theGuardian.badges}
            visualIdentity={{
              primaryColor: theGuardian.theme['--cs-primary'],
            }}
          />

          <CaseStudyCTA
            primaryAction={{
              label: theGuardian.cta.label,
              href: theGuardian.cta.href,
            }}
            secondaryAction={{
              label: 'View More Case Studies',
              href: '/case-studies',
            }}
            visualIdentity={{
              accentColor: theGuardian.theme['--cs-accent'],
            }}
          />
        </PageLayout>
      </div>
    </>
  );
};

export default TheGuardianPage;

