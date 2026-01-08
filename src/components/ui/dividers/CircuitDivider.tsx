import React from 'react';
import { motion } from 'framer-motion';

interface CircuitDividerProps {
  className?: string;
  animated?: boolean;
}

/**
 * CircuitDivider - Tech-themed circuit board pattern
 * 
 * Usage:
 * <CircuitDivider animated={true} />
 */
export const CircuitDivider: React.FC<CircuitDividerProps> = ({
  className = '',
  animated = true,
}) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5 }
    }
  };

  return (
    <div className={`w-full h-24 relative overflow-hidden bg-slate-950 ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#40E0D0" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFA500" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#40E0D0" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Circuit paths */}
        {animated ? (
          <>
            <motion.path
              stroke="url(#circuit-grad)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
              d="M0,50 L100,50 L100,30 L200,30 L200,70 L300,70 L300,40 L400,40 L400,60 L500,60 L500,35 L600,35 L600,65 L700,65 L700,45 L800,45 L800,55 L900,55 L900,40 L1000,40 L1000,70 L1100,70 L1100,50 L1200,50 L1200,30 L1300,30 L1300,60 L1440,60"
              variants={pathVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
            
            {/* Connection nodes */}
            {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300].map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={i % 2 === 0 ? 50 : 40}
                r="4"
                fill={i % 3 === 0 ? "#40E0D0" : "#FFA500"}
                filter="url(#glow)"
                variants={circleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            ))}
          </>
        ) : (
          <>
            <path
              stroke="url(#circuit-grad)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
              d="M0,50 L100,50 L100,30 L200,30 L200,70 L300,70 L300,40 L400,40 L400,60 L500,60 L500,35 L600,35 L600,65 L700,65 L700,45 L800,45 L800,55 L900,55 L900,40 L1000,40 L1000,70 L1100,70 L1100,50 L1200,50 L1200,30 L1300,30 L1300,60 L1440,60"
            />
            {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300].map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy={i % 2 === 0 ? 50 : 40}
                r="4"
                fill={i % 3 === 0 ? "#40E0D0" : "#FFA500"}
                filter="url(#glow)"
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
};

export default CircuitDivider;
