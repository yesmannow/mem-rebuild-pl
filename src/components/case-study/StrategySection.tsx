import React from 'react';
import NarrativeSection, { NarrativeSectionProps } from './ChallengeSection';

const StrategySection: React.FC<NarrativeSectionProps> = (props) => {
  return <NarrativeSection {...props} />;
};

export type { NarrativeSectionProps };
export default StrategySection;

