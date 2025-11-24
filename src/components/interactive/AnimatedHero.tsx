/**
 * Animated Hero Component
 * Framer Motion powered hero header with scroll/hover animations
 * Matches design system palette and typography
 */

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import './AnimatedHero.css';

export interface AnimatedHeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
  theme?: 'light' | 'dark';
  className?: string;
}

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaHref = '#',
  backgroundImage,
  theme = 'dark',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothY = useSpring(y, springConfig);
  const smoothOpacity = useSpring(opacity, springConfig);
  const smoothScale = useSpring(scale, springConfig);

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        type: 'spring',
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className={`animated-hero ${theme} ${className}`}
      style={{
        y: smoothY,
        opacity: smoothOpacity,
        scale: smoothScale,
      }}
    >
      {backgroundImage && (
        <div
          className="animated-hero__background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="animated-hero__content">
        <motion.h1
          className="animated-hero__title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="animated-hero__subtitle"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            {subtitle}
          </motion.p>
        )}

        {ctaText && (
          <motion.a
            href={ctaHref}
            className="animated-hero__cta"
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            {ctaText}
          </motion.a>
        )}
      </div>
    </motion.section>
  );
};

export default AnimatedHero;

