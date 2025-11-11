import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import './HeroSection.css';

interface HeroSectionProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
  variant?: 'default' | 'minimal' | 'gradient' | 'split';
  className?: string;
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  onCtaClick,
  backgroundImage,
  variant = 'default',
  className = '',
  children,
}) => {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 14 },
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        // TODO: Convert cubic-bezier array to proper easing type - using string format for compatibility
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)' as any,
      },
    },
  };

  return (
    <section className={`hero-section hero-section--${variant} ${className}`}>
      {backgroundImage && (
        <div className="hero-section__background">
          <img src={backgroundImage} alt="" aria-hidden="true" />
          <div className="hero-section__overlay" />
        </div>
      )}

      <motion.div
        className="hero-section__container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-section__content">
          {subtitle && (
            <motion.div
              className="hero-section__subtitle"
              variants={itemVariants}
            >
              {subtitle}
            </motion.div>
          )}

          <motion.h1
            className="hero-section__title"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              className="hero-section__description"
              variants={itemVariants}
            >
              {description}
            </motion.p>
          )}

          {(ctaText || onCtaClick) && (
            <motion.div
              className="hero-section__cta"
              variants={itemVariants}
            >
              {ctaLink ? (
                <a
                  href={ctaLink}
                  className="hero-section__button btn-primary"
                >
                  {ctaText || 'Get Started'}
                </a>
              ) : (
                <button
                  onClick={onCtaClick}
                  className="hero-section__button btn-primary"
                >
                  {ctaText || 'Get Started'}
                </button>
              )}
            </motion.div>
          )}

          {children && (
            <motion.div
              className="hero-section__children"
              variants={itemVariants}
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

