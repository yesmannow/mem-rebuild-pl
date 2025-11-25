import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionDividerProps {
  className?: string;
  variant?: 'solid' | 'gradient' | 'dashed';
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  className,
  variant = 'gradient',
}) => {
  const variants = {
    solid: 'bg-brand-muted/20',
    gradient: 'bg-gradient-to-r from-transparent via-brand-teal/50 to-transparent',
    dashed: 'bg-transparent border-t border-dashed border-brand-muted/20',
  };

  return (
    <div className={cn('relative py-12', className)}>
      <motion.div
        className={cn('h-px w-full', variants[variant])}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      {variant === 'gradient' && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-teal"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      )}
    </div>
  );
};

export default SectionDivider;

