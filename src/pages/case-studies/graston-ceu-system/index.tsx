import React from 'react';
import { Helmet } from 'react-helmet-async';
import { grastonCEU } from '@data/case-studies/graston-ceu';
import HeroBlock from '@components/case-study/HeroBlock';
import ChallengeSection from '@components/case-study/ChallengeSection';
import StrategySection from '@components/case-study/StrategySection';
import BuildSection from '@components/case-study/BuildSection';
import OutcomesSection from '@components/case-study/OutcomesSection';
import PullQuote from '@components/case-study/PullQuote';
import CapabilitiesBadges from '@components/case-study/CapabilitiesBadges';
import CaseStudyCTA from '@components/case-study/CTA';
import PageLayout from '@components/layout/PageLayout';

const GrastonCEUPage: React.FC = () => {
  const primaryStat = grastonCEU.outcomes.beforeAfter[0];
  const strategyContent = grastonCEU.strategy.map(s => `${s.title}: ${s.detail}`).join('\n\n');
  const buildContent = grastonCEU.build.map(b => 
    `${b.title}:\n${b.items.map(item => `  • ${item}`).join('\n')}`
  ).join('\n\n');

  return (
    <>
      <Helmet>
        <title>Graston Technique CEU System | BearCave Marketing</title>
        <meta
          name="description"
          content="End-to-end CEU commerce, enrollment, and verification for providers. Case study showing healthcare tech and automation systems."
        />
      </Helmet>

      <div className="cs-shell" data-case-study="graston-ceu-system" style={grastonCEU.theme as React.CSSProperties}>
        <PageLayout>
          <HeroBlock
            title={grastonCEU.title}
            impact={grastonCEU.subtitle}
            stat={{
              label: primaryStat.metric,
              value: primaryStat.after,
            }}
            gradient={grastonCEU.theme['--cs-bg']}
            emoji={grastonCEU.emoji}
          />

          <ChallengeSection
            title={grastonCEU.challenge.heading}
            content={grastonCEU.challenge.body}
            visualIdentity={{
              primaryColor: grastonCEU.theme['--cs-primary'],
            }}
          />

          <StrategySection
            title="Strategy"
            content={strategyContent}
            visualIdentity={{
              primaryColor: grastonCEU.theme['--cs-primary'],
            }}
          />

          <BuildSection
            title="What I Built"
            content={buildContent}
            visualIdentity={{
              primaryColor: grastonCEU.theme['--cs-primary'],
            }}
          />

          <OutcomesSection
            outcomes={{
              bullets: grastonCEU.outcomes.highlights,
            }}
            metrics={grastonCEU.outcomes.beforeAfter.map(m => ({
              label: m.metric,
              before: m.before,
              after: m.after,
            }))}
            capabilities={grastonCEU.badges}
          />

          <PullQuote
            quote={grastonCEU.pullQuote.quote}
            author={grastonCEU.pullQuote.source}
            visualIdentity={{
              primaryColor: grastonCEU.theme['--cs-primary'],
            }}
          />

          <CapabilitiesBadges
            capabilities={grastonCEU.badges}
            visualIdentity={{
              primaryColor: grastonCEU.theme['--cs-primary'],
            }}
          />

          <CaseStudyCTA
            primaryAction={{
              label: grastonCEU.cta.label,
              href: grastonCEU.cta.href,
            }}
            secondaryAction={{
              label: 'View More Case Studies',
              href: '/case-studies',
            }}
            visualIdentity={{
              accentColor: grastonCEU.theme['--cs-accent'],
            }}
          />
        </PageLayout>
      </div>
    </>
  );
};

export default GrastonCEUPage;

