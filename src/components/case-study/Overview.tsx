import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "../../styles/motion-tokens.js";

interface OverviewProps {
  role: string;
  tools: string[];
  duration: string;
  summary: string;
}

const Overview: React.FC<OverviewProps> = ({ role, tools, duration, summary }) => {
  return (
    <motion.section
      className="overview-section"
      style={{
        padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #3B82F6, #EC4899)',
        color: 'white'
      }}
      {...motionTokens.fadeInLeft}
    >
      <div style={{ fontSize: '1rem', lineHeight: 1.6 }}>
        <p><strong>Role:</strong> {role}</p>
        <p><strong>Tools:</strong> {tools.join(', ')}</p>
        <p><strong>Duration:</strong> {duration}</p>
      </div>
      <div style={{ fontSize: '1rem', lineHeight: 1.6 }}>
        <p>{summary}</p>
      </div>
    </motion.section>
  );
};

export default Overview;
