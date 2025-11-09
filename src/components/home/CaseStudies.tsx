import React from 'react';
import { motion } from 'framer-motion';
import { motion as motionTokens } from '../../styles/motion-tokens.js';
import { castMotionProps } from '../../utils/motion-helpers';
import { useNavigate } from 'react-router-dom';
import './CaseStudies.css';

const caseStudies = [
  {
    slug: 'graston-dashboard',
    title: 'Graston Dashboard',
    cover: './case-studies/graston-dashboard/cover.webp',
  },
  {
    slug: 'cinematic-portfolio',
    title: 'Cinematic Portfolio',
    cover: './case-studies/cinematic-portfolio/cover.webp',
  },
  {
    slug: 'branding-reel',
    title: 'Branding Reel',
    cover: './case-studies/branding-reel/cover.webp',
  },
];

const CaseStudies: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.section className="case-studies" {...castMotionProps(motionTokens.fadeIn)}>
      {caseStudies.map((study, index) => (
        <motion.div
          key={index}
          className="case-study-card"
          style={{
            backgroundImage: `url(${study.cover})`,
          }}
          whileHover={{ scale: 1.05, boxShadow: 'var(--glow-brand)' }}
          onClick={() => navigate(`/case-studies/${study.slug}`)}
        >
          <div className="card-overlay">
            <h3>{study.title}</h3>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default CaseStudies;
