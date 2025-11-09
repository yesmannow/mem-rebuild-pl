import React from 'react';
import { motion } from 'framer-motion';
import { motion as motionTokens } from '../../styles/motion-tokens.js';
import { castMotionProps } from '../../utils/motion-helpers';

interface ChallengeSectionProps {
  challenge: string;
}

const ChallengeSection: React.FC<ChallengeSectionProps> = ({ challenge }) => {
  return (
    <motion.section
      className="challenge-section"
      style={{
        padding: '4rem 2rem',
        background: 'var(--gradient-brand)',
        color: 'white',
      }}
      {...castMotionProps(motionTokens.slideInLeft)}
    >
      <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>The Challenge</h2>
      <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{challenge}</p>
    </motion.section>
  );
};

export default ChallengeSection;
