import React from 'react';
import { motion } from 'framer-motion';

interface WaveDividerProps {
  flip?: boolean;
  color?: string;
  className?: string;
  animated?: boolean;
}

/**
 * WaveDivider - Smooth wave transition between sections
 * 
 * Usage:
 * <WaveDivider color="#0f172a" animated={true} />
 */
export const WaveDivider: React.FC<WaveDividerProps> = ({
  flip = false,
  color = '#0f172a',
  className = '',
  animated = false,
}) => {
  return (
    <div className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}>
      {animated ? (
        <motion.svg
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.path
            fill={color}
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </motion.svg>
      ) : (
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill={color}
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      )}
    </div>
  );
};

export default WaveDivider;
