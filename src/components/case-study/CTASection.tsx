import './CTASection.css';
import React from 'react';
import { motion } from 'framer-motion';
import { motion as motionTokens } from '../../styles/motion-tokens.js';
import { castMotionProps } from '../../utils/motion-helpers';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  nextProjectSlug: string;
}

const CTASection: React.FC<CTASectionProps> = ({ nextProjectSlug }) => {
  return (
    <motion.section className="cta-section" {...castMotionProps(motionTokens.glowPulse)}>
      <h3>Interested in more?</h3>
      <p>Explore the next project in our portfolio.</p>
      <Link to={`/case-studies/${nextProjectSlug}`} className="btn-primary">
        View Next Project
      </Link>
    </motion.section>
  );
};

export default CTASection;
