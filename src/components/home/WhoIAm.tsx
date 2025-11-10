import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';
import './WhoIAm.css';

const WhoIAm: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const skills = [
    'Strategy',
    'Positioning',
    'Web + CRO',
    'Lifecycle',
    'Paid',
    'Analytics',
  ];

  return (
    <SectionWrapper bg="bg-[color:theme('colors.cave.bg')]" id="about">
      <div className="who-i-am__grid">
        {/* Bio Photo with Creative Treatment */}
        <motion.div
          className="who-i-am__photo-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={prefersReducedMotion ? {} : { rotate: 3 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="who-i-am__photo-card card">
            {/* Animated gradient border */}
            <div className="who-i-am__photo-border" />

            {/* Inner glow */}
            <div className="who-i-am__photo-glow" />

            {/* Reflection highlight */}
            <AnimatePresence>
              {isHovered && !prefersReducedMotion && (
                <motion.div
                  className="who-i-am__photo-reflection"
                  initial={{ x: '-100%', opacity: 0, skewX: -20 }}
                  animate={{
                    x: '100%',
                    opacity: [0, 0.6, 0],
                    skewX: -20
                  }}
                  exit={{ x: '100%', opacity: 0, skewX: -20 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              )}
            </AnimatePresence>

            {/* Photo with blob mask */}
            <div className="who-i-am__photo-container">
              <img
                src="/images/bio/bio-photo.jpg"
                srcSet="/images/bio/bio-photo.jpg 1x, /images/bio/241311036_10117555583372059_173429180650836298_n.webp 2x"
                alt="Jacob Darling"
                className="who-i-am__photo"
                loading="lazy"
                width="500"
                height="500"
                onError={(e) => {
                  // Fallback chain: try other images if primary fails
                  const target = e.currentTarget;
                  if (!target.src.includes('1732967007485')) {
                    target.src = '/images/bio/1732967007485.jpg';
                    target.srcSet = '/images/bio/1732967007485.jpg 1x, /images/bio/241311036_10117555583372059_173429180650836298_n.webp 2x';
                  } else if (!target.src.includes('Adobe')) {
                    target.src = '/images/bio/Adobe Express 2025-10-12 09.58.18.PNG';
                  }
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="who-i-am__content">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Who I Am
          </motion.h2>

          <motion.p
            className="who-i-am__intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            I'm Jacob Darling — a marketing technologist with a strategist's mindset and an engineer's precision.
          </motion.p>
          <motion.p
            className="who-i-am__intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            I design and deploy systems that align creative direction with technical execution — from CRM workflows and automation to analytics, SEO, and campaign strategy.
          </motion.p>
          <motion.p
            className="who-i-am__intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            At Graston Technique®, I built a marketing system with 400+ automations, reducing support tickets by 70% and increasing checkout conversions by 40%. My work supports 30,000+ users across industries like SaaS, healthcare, legal, and finance.
          </motion.p>
          <motion.p
            className="who-i-am__intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            If you need someone who can architect the backend <strong>and</strong> craft the message — let's talk.
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default WhoIAm;

