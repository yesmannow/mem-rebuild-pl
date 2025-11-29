import React from 'react';
import NarrativeSection, { NarrativeSectionProps } from './ChallengeSection';

const BuildSection: React.FC<NarrativeSectionProps> = (props) => {
  return <NarrativeSection {...props} />;
};

export type { NarrativeSectionProps };
export default BuildSection;

