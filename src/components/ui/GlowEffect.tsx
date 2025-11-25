import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlowEffectProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'teal' | 'orange' | 'both';
}

const GlowEffect: React.FC<GlowEffectProps> = ({
  className,
  intensity = 'medium',
  color = 'both',
}) => {
  const intensityMap = {
    low: 'opacity-10 blur-xl',
    medium: 'opacity-20 blur-2xl',
    high: 'opacity-30 blur-3xl',
  };

  const colorMap = {
    teal: 'from-brand-teal to-brand-teal',
    orange: 'from-brand-orange to-brand-orange',
    both: 'from-brand-teal via-brand-orange to-brand-teal',
  };

  return (
    <motion.div
      className={cn(
        'absolute inset-0 bg-gradient-to-r rounded-xl',
        colorMap[color],
        intensityMap[intensity],
        className
      )}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export default GlowEffect;

