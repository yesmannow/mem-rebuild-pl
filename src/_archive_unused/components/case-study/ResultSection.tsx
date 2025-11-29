import React from 'react';
import { motion } from 'framer-motion';
import { motion as motionTokens } from '../../styles/motion-tokens.js';
import { castMotionProps } from '../../utils/motion-helpers';
import OptimizedImage from '@components/media/OptimizedImage';

interface ResultSectionProps {
  results: string;
  beforeImage: string;
  afterImage: string;
}

const ResultSection: React.FC<ResultSectionProps> = ({ results, beforeImage, afterImage }) => {
  return (
    <motion.section
      className="result-section"
      style={{
        padding: '4rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
      }}
      {...castMotionProps(motionTokens.fadeIn)}
    >
      <div style={{ flex: 1 }}>
        <OptimizedImage src={beforeImage.replace(/^\//, '')} alt="Before" className="w-full rounded-lg" />
      </div>
      <div style={{ flex: 1 }}>
        <OptimizedImage src={afterImage.replace(/^\//, '')} alt="After" className="w-full rounded-lg" />
      </div>
      <div style={{ flex: 2, padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Results</h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{results}</p>
      </div>
    </motion.section>
  );
};

export default ResultSection;
