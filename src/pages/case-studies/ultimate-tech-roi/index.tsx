import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ultimateTechRoi } from '@data/case-studies/ultimate-tech-roi';
import CaseStudyTemplate, { CaseStudyTemplateData } from '@components/case-study/CaseStudyTemplate';

const UltimateTechRoiPage: React.FC = () => {
  const templateData: CaseStudyTemplateData = {
    slug: ultimateTechRoi.slug,
    theme: ultimateTechRoi.theme,
    hero: {
      title: ultimateTechRoi.title,
      subtitle: ultimateTechRoi.subtitle,
      emoji: ultimateTechRoi.emoji,
      stat: {
        label: ultimateTechRoi.outcomes.beforeAfter[0].metric,
        value: ultimateTechRoi.outcomes.beforeAfter[0].after,
      },
    },
    challenge: ultimateTechRoi.challenge.body,
    strategy: ultimateTechRoi.strategy,
    build: ultimateTechRoi.build,
    outcomes: 'From wasted spend to accountable, compounding paid performance.',
    highlights: ultimateTechRoi.outcomes.highlights,
    metrics: ultimateTechRoi.outcomes.beforeAfter,
    capabilities: ultimateTechRoi.badges,
    quote: ultimateTechRoi.pullQuote,
    cta: {
      title: 'Need your paid funnel to actually compound?',
      label: ultimateTechRoi.cta.label,
      href: ultimateTechRoi.cta.href,
      secondaryLabel: 'View More Case Studies',
      secondaryHref: '/case-studies',
    },
  };

  return (
    <>
      <Helmet>
        <title>Ultimate Technologies - ROI Growth | BearCave Marketing</title>
        <meta
          name="description"
          content="From wasted spend to accountable, compounding paid performance. Case study showing performance marketing and ABM strategies."
        />
      </Helmet>

      <CaseStudyTemplate data={templateData} />
    </>
  );
};

export default UltimateTechRoiPage;
