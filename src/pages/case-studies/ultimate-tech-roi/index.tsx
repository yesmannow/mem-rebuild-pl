import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ultimateTechRoi } from '@data/case-studies/ultimate-tech-roi';
import HeroBlock from '@components/case-study/HeroBlock';
import ChallengeSection from '@components/case-study/ChallengeSection';
import StrategySection from '@components/case-study/StrategySection';
import BuildSection from '@components/case-study/BuildSection';
import OutcomesSection from '@components/case-study/OutcomesSection';
import PullQuote from '@components/case-study/PullQuote';
import CapabilitiesBadges from '@components/case-study/CapabilitiesBadges';
import CaseStudyCTA from '@components/case-study/CTA';
import PageLayout from '@components/layout/PageLayout';

const UltimateTechRoiPage: React.FC = () => {
  const primaryStat = ultimateTechRoi.outcomes.beforeAfter[0];
  const strategyContent = ultimateTechRoi.strategy.map(s => `${s.title}: ${s.detail}`).join('\n\n');
  const buildContent = ultimateTechRoi.build.map(b => 
    `${b.title}:\n${b.items.map(item => `  • ${item}`).join('\n')}`
  ).join('\n\n');

  return (
    <>
      <Helmet>
        <title>Ultimate Technologies — ROI Growth | BearCave Marketing</title>
        <meta
          name="description"
          content="From wasted spend to accountable, compounding paid performance. Case study showing performance marketing and ABM strategies."
        />
      </Helmet>

      <div className="cs-shell" data-case-study="ultimate-tech-roi-growth" style={ultimateTechRoi.theme as React.CSSProperties}>
        <PageLayout>
          <HeroBlock
            title={ultimateTechRoi.title}
            impact={ultimateTechRoi.subtitle}
            stat={{
              label: primaryStat.metric,
              value: primaryStat.after,
            }}
            gradient={ultimateTechRoi.theme['--cs-bg']}
            emoji={ultimateTechRoi.emoji}
          />

          <ChallengeSection
            title={ultimateTechRoi.challenge.heading}
            content={ultimateTechRoi.challenge.body}
            visualIdentity={{
              primaryColor: ultimateTechRoi.theme['--cs-primary'],
            }}
          />

          <StrategySection
            title="Strategy"
            content={strategyContent}
            visualIdentity={{
              primaryColor: ultimateTechRoi.theme['--cs-primary'],
            }}
          />

          <BuildSection
            title="What I Built"
            content={buildContent}
            visualIdentity={{
              primaryColor: ultimateTechRoi.theme['--cs-primary'],
            }}
          />

          <OutcomesSection
            outcomes={{
              bullets: ultimateTechRoi.outcomes.highlights,
            }}
            metrics={ultimateTechRoi.outcomes.beforeAfter.map(m => ({
              label: m.metric,
              before: m.before,
              after: m.after,
            }))}
            capabilities={ultimateTechRoi.badges}
          />

          <PullQuote
            quote={ultimateTechRoi.pullQuote.quote}
            author={ultimateTechRoi.pullQuote.source}
            visualIdentity={{
              primaryColor: ultimateTechRoi.theme['--cs-primary'],
            }}
          />

          <CapabilitiesBadges
            capabilities={ultimateTechRoi.badges}
            visualIdentity={{
              primaryColor: ultimateTechRoi.theme['--cs-primary'],
            }}
          />

          <CaseStudyCTA
            primaryAction={{
              label: ultimateTechRoi.cta.label,
              href: ultimateTechRoi.cta.href,
            }}
            secondaryAction={{
              label: 'View More Case Studies',
              href: '/case-studies',
            }}
            visualIdentity={{
              accentColor: ultimateTechRoi.theme['--cs-accent'],
            }}
          />
        </PageLayout>
      </div>
    </>
  );
};

export default UltimateTechRoiPage;

