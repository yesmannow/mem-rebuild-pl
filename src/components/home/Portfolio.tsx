import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import CaseStudyCard from '@components/cards/CaseStudyCard';
import { caseStudies } from '@data/caseStudies';
import './Portfolio.css';

// Map case studies to CaseStudyCard format
const featuredCaseStudies = caseStudies
  .filter(cs => cs.featured)
  .slice(0, 3)
  .map(cs => {
    // Extract first metric value for statLine
    const statLine = cs.metrics.length > 0 ? cs.metrics[0].value : '';

    // Create gradient from color or use default
    const gradient = cs.color
      ? `linear-gradient(135deg, ${cs.color}15 0%, ${cs.color}30 50%, ${cs.color}50 100%)`
      : 'linear-gradient(135deg, #0D0D0F 0%, #1A1D1F 40%, #3CC6C4 100%)';

    // Use color for hoverGlow or default
    const hoverGlow = cs.color || '#3CC6C4';

    return {
      slug: cs.slug,
      title: cs.title,
      microtagline: cs.tagline,
      emoji: typeof cs.icon === 'string' ? cs.icon : '🚀',
      statLine,
      badges: cs.tags.slice(0, 3),
      gradient,
      hoverGlow,
      thumbnail: cs.image?.replace(/^\//, ''),
      impactValue: 0.7, // Default impact value
    };
  });

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="portfolio container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="portfolio__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">Featured Case Studies</h2>
      </motion.div>

      <div className="portfolio__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {featuredCaseStudies.map((study, index) => (
          <motion.div
            key={study.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CaseStudyCard {...study} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="portfolio__footer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link to="/case-studies" className="portfolio__view-all">
          <span>View Full Portfolio</span>
          <ExternalLink size={18} />
        </Link>
      </motion.div>
    </section>
  );
};

export default Portfolio;

