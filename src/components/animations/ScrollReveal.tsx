import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  stagger?: boolean;
  speed?: 'fast' | 'slow';
  className?: string;
  delay?: number;
}

/**
 * ScrollReveal - Global scroll-triggered animation system
 * Reveals elements as they enter the viewport with smooth animations
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  stagger = false,
  speed = 'fast',
  className = '',
  delay = 0,
}) => {
  // Speed mapping
  const speedMap = {
    fast: 0.4,
    slow: 0.8,
  };

  // Direction variants
  const directionVariants = {
    up: { y: 30, opacity: 0 },
    left: { x: 30, opacity: 0 },
    right: { x: -30, opacity: 0 },
  };

  const initial = directionVariants[direction];

  // If stagger is true, wrap children in a container with staggerChildren
  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: delay,
              staggerChildren: speedMap[speed] / 2,
            },
          },
        }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: initial,
              visible: { x: 0, y: 0, opacity: 1 },
            }}
            transition={{
              duration: speedMap[speed],
              ease: 'easeOut',
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Single element reveal
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: speedMap[speed],
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
