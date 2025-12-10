/**
 * WaveDivider - Decorative wave divider component
 * Used for visual separation between sections
 */

import React from 'react';
import { motion } from 'framer-motion';

interface WaveDividerProps {
  className?: string;
  color?: string;
  flip?: boolean;
  animate?: boolean;
}

const WaveDivider: React.FC<WaveDividerProps> = ({
  className = '',
  color = 'currentColor',
  flip = false,
  animate = true,
}) => {
  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <div className={`wave-divider ${flip ? 'flip' : ''} ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ display: 'block' }}
      >
        <motion.path
          d="M0,0 C300,100 600,100 900,50 C1050,25 1150,0 1200,0 L1200,120 L0,120 Z"
          fill={color}
          initial={animate ? 'initial' : false}
          animate={animate ? 'animate' : false}
          variants={pathVariants}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
