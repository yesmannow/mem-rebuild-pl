import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxSection.css';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
  offset?: [string, string];
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = ['start end', 'end start'],
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // TODO: Properly type offset prop - framer-motion expects specific offset types
    offset: offset as [string, string] as any,
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [0, -100 * speed] : [0, 100 * speed]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div ref={ref} className={`parallax-section ${className}`}>
      <motion.div
        style={{
          y,
          opacity,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
