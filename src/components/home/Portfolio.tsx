import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import CaseStudyCard from '@components/cards/CaseStudyCard';
import { caseStudies } from '@data/caseStudies';
import { OceanBackgroundBeams } from '../ui/OceanBackgroundBeams';
import { OceanGradientText } from '../ui/OceanGradientText';
import { OceanCardContainer, OceanCardBody, OceanCardItem } from '../ui/Ocean3DCard';
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
      : 'linear-gradient(135deg, #006d77 0%, #5a7a7d 40%, #83c5be 100%)';

    // Use color for hoverGlow or default
    const hoverGlow = cs.color || 'var(--color-success)'; // telemetry-400

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
    <section id="portfolio" className="portfolio container-px mx-auto max-w-6xl py-16 md:py-24 relative">
      {/* Ocean Background Beams */}
      <OceanBackgroundBeams className="opacity-25" />

      {/* Background gradient orb */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-[#e29578]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="portfolio__header relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">
          <OceanGradientText text="Featured Case Studies" className="text-[#edf6f9]" />
        </h2>
        <p className="text-lg text-[#edf6f9]/60 mt-4 max-w-2xl mx-auto text-center font-body">
          Real-world systems delivering measurable results
        </p>
      </motion.div>

      <div className="portfolio__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {featuredCaseStudies.map((study, index) => (
          <OceanCardContainer
            key={study.slug}
            containerClassName="py-0"
            className="w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              <OceanCardBody className="h-auto w-full">
                <OceanCardItem
                  translateZ={20}
                  className="w-full"
                >
                  <CaseStudyCard {...study} />
                </OceanCardItem>
              </OceanCardBody>
            </motion.div>
          </OceanCardContainer>
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

