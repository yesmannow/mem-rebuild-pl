import React, { ReactNode, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

// Background variant types for GT theme
export type BackgroundVariant = 'turquoise' | 'creamsicle' | 'light-blue-gray' | 'white' | 'transparent' | 'dark';

// Comprehensive prop interface supporting both systems
interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  children: ReactNode;
  animate?: boolean;

  // GT theme background system
  bgVariant?: BackgroundVariant;

  // Traditional Tailwind background system
  bg?: string;

  // Animation configuration
  animationConfig?: {
    initial?: any;
    whileInView?: any;
    viewport?: any;
    transition?: any;
  };
}

// GT theme color mapping
const getBackgroundClass = (bgVariant?: BackgroundVariant, bg?: string): string => {
  if (bgVariant) {
    switch (bgVariant) {
      case 'turquoise':
        return 'bg-turquoise';
      case 'creamsicle':
        return 'bg-creamsicle';
      case 'light-blue-gray':
        return 'bg-light-blue-gray';
      case 'white':
        return 'bg-white';
      case 'transparent':
        return 'bg-transparent';
      case 'dark':
        return 'bg-[color:theme("colors.cave.bg")]';
      default:
        return 'bg-[color:theme("colors.cave.bg")]';
    }
  }

  // Fallback to traditional bg prop or default
  return bg || 'bg-[color:theme("colors.cave.bg")]';
};

// Animation presets
const getAnimationConfig = (animate: boolean = true, customConfig?: any) => {
  if (!animate) {
    return {
      initial: null,
      whileInView: null,
      viewport: null,
      transition: null
    };
  }

  if (customConfig) {
    return customConfig;
  }

  // Default animation
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: 'easeOut' }
  };
};

function SectionWrapper({
  id,
  children,
  animate = true,
  bgVariant,
  bg,
  className = '',
  animationConfig,
  ...props
}: SectionWrapperProps) {
  const backgroundClass = getBackgroundClass(bgVariant, bg);
  const animation = getAnimationConfig(animate, animationConfig);
  const containerClass = `${backgroundClass} py-20 ${className}`.trim();

  return (
    <section
      id={id}
      className={containerClass}
      {...props}
    >
      {animate && animation.initial ? (
        <motion.div
          initial={animation.initial}
          whileInView={animation.whileInView}
          viewport={animation.viewport}
          transition={animation.transition}
          className="container mx-auto max-w-7xl px-6"
        >
          {children}
        </motion.div>
      ) : (
        <div className="container mx-auto max-w-7xl px-6">
          {children}
        </div>
      )}
    </section>
  );
}

export default SectionWrapper;
export { SectionWrapper };
