/**
 * ScrollReveal - Scroll-triggered animation component
 * Reveals elements with smooth animations as they enter viewport
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: '-50px',
    amount: 0.3 
  });

  const directionVariants = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: 40, opacity: 0 },
    right: { x: -40, opacity: 0 },
    fade: { opacity: 0 },
  };

  const initial = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : initial}
      transition={{
        duration,
        delay,
        ease: 'easeOut' as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
