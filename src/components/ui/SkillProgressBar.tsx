/**
 * SkillProgressBar Component
 * Animated progress bar for skill visualization
 * Uses Ocean Pearl color system with smooth animations
 */

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export interface SkillProgressBarProps {
  skill: string;
  percentage: number;
  years?: number;
  category?: string;
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
  showPercentage?: boolean;
  showYears?: boolean;
  animate?: boolean;
}

export const SkillProgressBar: React.FC<SkillProgressBarProps> = ({
  skill,
  percentage,
  years,
  category,
  color = 'primary',
  className = '',
  showPercentage = true,
  showYears = true,
  animate = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (inView && animate) {
      setIsVisible(true);
    } else if (!animate) {
      setIsVisible(true);
    }
  }, [inView, animate]);

  const colorClasses = {
    primary: {
      bg: 'bg-[#006d77]',
      gradient: 'from-[#005a63] to-[#006d77]',
      glow: 'shadow-[0_0_20px_rgba(0,109,119,0.3)]',
      text: 'text-[#006d77]',
    },
    secondary: {
      bg: 'bg-[#83c5be]',
      gradient: 'from-[#6ba8a1] to-[#83c5be]',
      glow: 'shadow-[0_0_20px_rgba(131,197,190,0.3)]',
      text: 'text-[#83c5be]',
    },
    accent: {
      bg: 'bg-[#e29578]',
      gradient: 'from-[#d17f62] to-[#e29578]',
      glow: 'shadow-[0_0_20px_rgba(226,149,120,0.3)]',
      text: 'text-[#e29578]',
    },
  };

  const selectedColor = colorClasses[color];

  return (
    <div ref={ref} className={`skill-progress-bar ${className}`}>
      {/* Skill header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--parchment-050)]">{skill}</span>
          {category && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#006d77]/10 text-[#83c5be]">
              {category}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          {showYears && years && (
            <span className="text-[var(--parchment-050)]/70">{years}y</span>
          )}
          {showPercentage && (
            <motion.span
              className={`font-mono ${selectedColor.text}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {percentage}%
            </motion.span>
          )}
        </div>
      </div>

      {/* Progress bar track */}
      <div className="relative h-2 bg-[var(--ink-800)]/60 rounded-full overflow-hidden">
        {/* Animated progress fill */}
        <motion.div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${selectedColor.gradient} ${selectedColor.glow} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percentage}%` : 0 }}
          transition={{
            duration: 1,
            ease: [0.65, 0, 0.35, 1],
            delay: 0.1,
          }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* Tooltip on hover */}
      <div className="mt-1 text-xs text-[var(--parchment-050)]/50 opacity-0 group-hover:opacity-100 transition-opacity">
        Proficiency: {percentage}% {years && `• ${years} years experience`}
      </div>
    </div>
  );
};

export default SkillProgressBar;
