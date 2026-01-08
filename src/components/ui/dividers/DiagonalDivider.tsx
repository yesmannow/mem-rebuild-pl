import React from 'react';
import { motion } from 'framer-motion';

interface DiagonalDividerProps {
  direction?: 'left' | 'right';
  color?: string;
  className?: string;
  height?: number;
}

/**
 * DiagonalDivider - Angular diagonal transition
 * 
 * Usage:
 * <DiagonalDivider direction="right" color="#0f172a" height={100} />
 */
export const DiagonalDivider: React.FC<DiagonalDividerProps> = ({
  direction = 'right',
  color = '#0f172a',
  className = '',
  height = 100,
}) => {
  const points = direction === 'right'
    ? '0,0 1440,100 1440,100 0,100'
    : '0,100 1440,0 1440,100';

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg viewBox={`0 0 1440 ${height}`} className="w-full h-auto">
        <motion.polygon
          fill={color}
          points={points}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </svg>
    </div>
  );
};

export default DiagonalDivider;
