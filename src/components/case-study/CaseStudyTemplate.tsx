import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@components/layout/PageLayout';
import HeroBlock from './HeroBlock';
import HeroMedia from './HeroMedia';
import ChallengeSection, { RichSection } from './ChallengeSection';
import StrategySection from './StrategySection';
import BuildSection from './BuildSection';
import OutcomesSection from './OutcomesSection';
import PullQuote from './PullQuote';
import CapabilitiesBadges from './CapabilitiesBadges';
import CaseStudyCTA from './CTA';
import './CaseStudyTemplate.css';

interface StrategyCard {
  title: string;
  detail: string;
}

interface BuildCluster {
  title: string;
  items: string[];
}

export interface CaseStudyTemplateData {
  slug: string;
  theme?: Record<string, string>;
  hero: {
    title: string;
    subtitle: string;
    emoji?: string;
    stat?: {
      label: string;
      value: string;
    };
    media?: {
      src?: string;
      alt?: string;
    };
  };
  challenge: string | RichSection;
  strategy: string | RichSection | StrategyCard[];
  build: string | RichSection | BuildCluster[];
  outcomes: string | RichSection;
  highlights?: string[];
  metrics: Array<{
    metric?: string;
    label?: string;
    before?: string;
    after: string;
  }>;
  capabilities: string[];
  quote?: {
    quote: string;
    source?: string;
  };
  cta: {
    label: string;
    href: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    title?: string;
    description?: string;
  };
}

interface CaseStudyTemplateProps {
  data: CaseStudyTemplateData;
  interactiveSlot?: React.ReactNode;
}

const isStrategyCardArray = (
  value: CaseStudyTemplateData['strategy']
): value is StrategyCard[] =>
  Array.isArray(value) && value.every((item) => typeof item.title === 'string' && typeof item.detail === 'string');

const isBuildClusterArray = (
  value: CaseStudyTemplateData['build']
): value is BuildCluster[] =>
  Array.isArray(value) && value.every((item) => Array.isArray(item.items));

const CaseStudyTemplate: React.FC<CaseStudyTemplateProps> = ({ data, interactiveSlot }) => {
  const metrics = data.metrics.map((metric) => ({
    label: metric.label ?? metric.metric ?? '',
    before: metric.before,
    after: metric.after,
  }));
  const heroStat =
    data.hero.stat ??
    (metrics[0]
      ? {
          label: metrics[0].label,
          value: metrics[0].after,
        }
      : undefined);
  const accentColor = data.theme?.['--cs-primary'];
  const strategyCards = isStrategyCardArray(data.strategy);
  const buildCards = isBuildClusterArray(data.build);

  return (
    <div className="case-study-template cs-shell" data-case-study={data.slug} style={data.theme as React.CSSProperties}>
      <PageLayout>
        <div className="cs-template-inner space-y-8">
          {data.hero.media?.src && (
            <HeroMedia src={data.hero.media.src} alt={data.hero.media.alt} className="cs-panel" />
          )}

          <HeroBlock
            title={data.hero.title}
            impact={data.hero.subtitle}
            stat={heroStat ?? { label: '', value: '' }}
            gradient={data.theme?.['--cs-bg']}
            emoji={data.hero.emoji}
            variant="surface"
            className="cs-hero-panel"
          />

          {metrics.length > 0 && <StatsRibbon metrics={metrics.slice(0, 3)} accentColor={accentColor} />}

          <ChallengeSection
            {...(typeof data.challenge === 'string'
              ? { challenge: data.challenge }
              : { title: 'The Challenge', content: data.challenge })}
            visualIdentity={{ primaryColor: accentColor }}
            variant="surface"
          />

          {strategyCards ? (
            <StrategyHighlights items={data.strategy as StrategyCard[]} accentColor={accentColor} />
          ) : (
            <StrategySection
              title="Strategy"
              content={data.strategy as string | RichSection}
              visualIdentity={{ primaryColor: accentColor }}
              variant="surface"
            />
          )}

          {buildCards ? (
            <BuildHighlights groups={data.build as BuildCluster[]} accentColor={accentColor} />
          ) : (
            <BuildSection
              title="What I Built"
              content={data.build as string | RichSection}
              visualIdentity={{ primaryColor: accentColor }}
              variant="surface"
            />
          )}

          {interactiveSlot && (
            <section className="cs-panel cs-interactive py-10 px-6">
              {interactiveSlot}
            </section>
          )}

          <OutcomesSection
            outcomes={data.outcomes}
            metrics={metrics}
            highlights={data.highlights}
            variant="surface"
          />

          {data.quote && (
            <PullQuote
              quote={data.quote.quote}
              author={data.quote.source}
              visualIdentity={{ primaryColor: accentColor }}
              variant="surface"
            />
          )}

          <CapabilitiesBadges
            capabilities={data.capabilities}
            visualIdentity={{ primaryColor: accentColor }}
            variant="surface"
          />

          <CaseStudyCTA
            title={data.cta.title}
            description={data.cta.description}
            primaryAction={{ label: data.cta.label, href: data.cta.href }}
            secondaryAction={
              data.cta.secondaryLabel && data.cta.secondaryHref
                ? { label: data.cta.secondaryLabel, href: data.cta.secondaryHref }
                : undefined
            }
            visualIdentity={{ accentColor: data.theme?.['--cs-accent'] }}
            variant="surface"
          />
        </div>
      </PageLayout>
    </div>
  );
};

interface StatsRibbonProps {
  metrics: Array<{ label: string; before?: string; after: string }>;
  accentColor?: string;
}

const StatsRibbon: React.FC<StatsRibbonProps> = ({ metrics, accentColor }) => {
  if (!metrics.length) return null;

  return (
    <div className="cs-stats-grid">
      {metrics.map((metric, idx) => (
        <motion.div
          key={`${metric.label}-${idx}`}
          className="cs-stat-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <small>{metric.label}</small>
          <strong style={{ color: accentColor || 'inherit' }}>{metric.after}</strong>
          {metric.before && (
            <span className="text-sm text-slate-500">
              Before: <span className="font-medium text-slate-700">{metric.before}</span>
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const StrategyHighlights: React.FC<{ items: StrategyCard[]; accentColor?: string }> = ({ items, accentColor }) => (
  <section className="cs-panel p-8">
    <div className="mb-6">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Approach</p>
      <h2 className="text-3xl font-black text-slate-900">Strategy</h2>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, idx) => (
        <motion.div
          key={item.title}
          className="rounded-2xl border border-slate-100/60 bg-white/70 p-5 shadow-sm"
          style={{
            borderColor: accentColor ? `${accentColor}35` : undefined,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{item.title}</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{item.detail}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const BuildHighlights: React.FC<{ groups: BuildCluster[]; accentColor?: string }> = ({ groups, accentColor }) => (
  <section className="cs-panel p-8">
    <div className="mb-6">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Execution</p>
      <h2 className="text-3xl font-black text-slate-900">What I Built</h2>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {groups.map((group, idx) => (
        <motion.div
          key={group.title}
          className="rounded-2xl border border-slate-100/60 bg-gradient-to-br from-white to-slate-50/60 p-5 shadow-sm"
          style={{
            borderColor: accentColor ? `${accentColor}35` : undefined,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{group.title}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {group.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  className="inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: accentColor || '#0f172a' }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CaseStudyTemplate;
