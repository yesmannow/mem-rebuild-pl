import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "../../styles/motion-tokens.js";

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
        gap: '2rem'
      }}
      {...motionTokens.fadeIn}
    >
      <div style={{ flex: 1 }}>
        <img src={beforeImage} alt="Before" style={{ width: '100%', borderRadius: '8px' }} />
      </div>
      <div style={{ flex: 1 }}>
        <img src={afterImage} alt="After" style={{ width: '100%', borderRadius: '8px' }} />
      </div>
      <div style={{ flex: 2, padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Results</h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{results}</p>
      </div>
    </motion.section>
  );
};

export default ResultSection;
