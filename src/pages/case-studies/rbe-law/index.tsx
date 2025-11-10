import React from 'react';
import { Helmet } from 'react-helmet-async';
import { rbeLaw } from '@data/case-studies/rbe-law';
import HeroBlock from '@components/case-study/HeroBlock';
import ChallengeSection from '@components/case-study/ChallengeSection';
import StrategySection from '@components/case-study/StrategySection';
import BuildSection from '@components/case-study/BuildSection';
import OutcomesSection from '@components/case-study/OutcomesSection';
import PullQuote from '@components/case-study/PullQuote';
import CapabilitiesBadges from '@components/case-study/CapabilitiesBadges';
import CaseStudyCTA from '@components/case-study/CTA';
import PageLayout from '@components/layout/PageLayout';

const RBELawPage: React.FC = () => {
  const primaryStat = rbeLaw.outcomes.beforeAfter[0];
  const strategyContent = rbeLaw.strategy.map(s => `${s.title}: ${s.detail}`).join('\n\n');
  const buildContent = rbeLaw.build.map(b => 
    `${b.title}:\n${b.items.map(item => `  • ${item}`).join('\n')}`
  ).join('\n\n');

  return (
    <>
      <Helmet>
        <title>Riley Bennett Egloff — Brand & Digital Overhaul | BearCave Marketing</title>
        <meta
          name="description"
          content="Repositioning a prestigious law firm for modern growth. Case study showing brand strategy, web design, and content marketing."
        />
      </Helmet>

      <div className="cs-shell" data-case-study="rbe-law-brand-and-digital" style={rbeLaw.theme as React.CSSProperties}>
        <PageLayout>
          <HeroBlock
            title={rbeLaw.title}
            impact={rbeLaw.subtitle}
            stat={{
              label: primaryStat.metric,
              value: primaryStat.after,
            }}
            gradient={rbeLaw.theme['--cs-bg']}
            emoji={rbeLaw.emoji}
          />

          <ChallengeSection
            title={rbeLaw.challenge.heading}
            content={rbeLaw.challenge.body}
            visualIdentity={{
              primaryColor: rbeLaw.theme['--cs-primary'],
            }}
          />

          <StrategySection
            title="Strategy"
            content={strategyContent}
            visualIdentity={{
              primaryColor: rbeLaw.theme['--cs-primary'],
            }}
          />

          <BuildSection
            title="What I Built"
            content={buildContent}
            visualIdentity={{
              primaryColor: rbeLaw.theme['--cs-primary'],
            }}
          />

          <OutcomesSection
            outcomes={{
              bullets: rbeLaw.outcomes.highlights,
            }}
            metrics={rbeLaw.outcomes.beforeAfter.map(m => ({
              label: m.metric,
              before: m.before,
              after: m.after,
            }))}
            capabilities={rbeLaw.badges}
          />

          <PullQuote
            quote={rbeLaw.pullQuote.quote}
            author={rbeLaw.pullQuote.source}
            visualIdentity={{
              primaryColor: rbeLaw.theme['--cs-primary'],
            }}
          />

          <CapabilitiesBadges
            capabilities={rbeLaw.badges}
            visualIdentity={{
              primaryColor: rbeLaw.theme['--cs-primary'],
            }}
          />

          <CaseStudyCTA
            primaryAction={{
              label: rbeLaw.cta.label,
              href: rbeLaw.cta.href,
            }}
            secondaryAction={{
              label: 'View More Case Studies',
              href: '/case-studies',
            }}
            visualIdentity={{
              accentColor: rbeLaw.theme['--cs-accent'],
            }}
          />
        </PageLayout>
      </div>
    </>
  );
};

export default RBELawPage;

