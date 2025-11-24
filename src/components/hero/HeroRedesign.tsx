import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../theme/ThemeProvider';
import LayeredBackground from '../ui/LayeredBackground';
import './HeroRedesign.css';

export interface HeroRedesignProps {
  /**
   * Main hero title
   */
  title: string;
  
  /**
   * Hero subtitle
   */
  subtitle: string;
  
  /**
   * Primary CTA button text
   */
  primaryCTA: string;
  
  /**
   * Primary CTA button link
   */
  primaryCTAHref: string;
  
  /**
   * Secondary CTA button text (optional)
   */
  secondaryCTA?: string;
  
  /**
   * Secondary CTA button link (optional)
   */
  secondaryCTAHref?: string;
  
  /**
   * Use Framer Motion for animations (fallback if CSS-only not sufficient)
   */
  useFramerMotion?: boolean;
  
  /**
   * Custom gradient colors for background
   */
  gradientColors?: string[];
}

/**
 * HeroRedesign - Modern hero section with orchestrated reveal animation
 * 
 * Features:
 * - Staggered CSS-only animations (title, subtitle, CTA)
 * - Optional Framer Motion fallback
 * - Layered background with gradient and texture
 * - Respects prefers-reduced-motion
 * - Fully accessible with WCAG AA contrast
 * - Responsive design
 */
export const HeroRedesign: React.FC<HeroRedesignProps> = ({
  title,
  subtitle,
  primaryCTA,
  primaryCTAHref,
  secondaryCTA,
  secondaryCTAHref,
  useFramerMotion = false,
  gradientColors = ['#0a0a0a', '#1a1a2e', '#16213e'],
}) => {
  const { prefersReducedMotion: themeReducedMotion } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    // Small delay to ensure CSS is loaded
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const reducedMotion = themeReducedMotion || shouldReduceMotion;

  // CSS-only animation approach (default)
  if (!useFramerMotion || reducedMotion) {
    return (
      <section 
        className={`hero-redesign ${mounted ? 'hero-redesign--mounted' : ''}`}
        aria-labelledby="hero-title"
      >
        <LayeredBackground 
          gradient={gradientColors}
          textureOpacity={0.2}
          parallax={!reducedMotion}
          parallaxSpeed={0.3}
        />
        
        <div className="hero-redesign__container">
          <div className="hero-redesign__content">
            {/* Title with staggered reveal */}
            <h1 
              id="hero-title"
              className="hero-redesign__title"
              style={{
                animationDelay: reducedMotion ? '0s' : 'var(--stagger-short)',
              }}
            >
              {title}
            </h1>
            
            {/* Subtitle with staggered reveal */}
            <p 
              className="hero-redesign__subtitle"
              style={{
                animationDelay: reducedMotion ? '0s' : 'calc(var(--stagger-short) + var(--stagger-medium))',
              }}
            >
              {subtitle}
            </p>
            
            {/* CTAs with staggered reveal */}
            <div 
              className="hero-redesign__ctas"
              style={{
                animationDelay: reducedMotion ? '0s' : 'calc(var(--stagger-short) + var(--stagger-medium) + var(--stagger-medium))',
              }}
            >
              <a
                href={primaryCTAHref}
                className="hero-redesign__cta hero-redesign__cta--primary"
                aria-label={primaryCTA}
              >
                {primaryCTA}
              </a>
              
              {secondaryCTA && secondaryCTAHref && (
                <a
                  href={secondaryCTAHref}
                  className="hero-redesign__cta hero-redesign__cta--secondary"
                  aria-label={secondaryCTA}
                >
                  {secondaryCTA}
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        {!reducedMotion && (
          <div className="hero-redesign__scroll-indicator" aria-hidden="true">
            <div className="hero-redesign__scroll-arrow" />
          </div>
        )}
      </section>
    );
  }

  // Framer Motion fallback
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
        duration: 0.8,
        ease: [0.45, 0, 0.15, 1],
      },
    },
  };

  return (
    <section 
      className="hero-redesign hero-redesign--mounted"
      aria-labelledby="hero-title"
    >
      <LayeredBackground 
        gradient={gradientColors}
        textureOpacity={0.2}
        parallax={false}
      />
      
      <div className="hero-redesign__container">
        <motion.div 
          className="hero-redesign__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            id="hero-title"
            className="hero-redesign__title"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="hero-redesign__subtitle"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
          
          <motion.div 
            className="hero-redesign__ctas"
            variants={itemVariants}
          >
            <a
              href={primaryCTAHref}
              className="hero-redesign__cta hero-redesign__cta--primary"
              aria-label={primaryCTA}
            >
              {primaryCTA}
            </a>
            
            {secondaryCTA && secondaryCTAHref && (
              <a
                href={secondaryCTAHref}
                className="hero-redesign__cta hero-redesign__cta--secondary"
                aria-label={secondaryCTA}
              >
                {secondaryCTA}
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroRedesign;
