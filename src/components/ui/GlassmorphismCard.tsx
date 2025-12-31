import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  gradient?: boolean;
  animate?: boolean;
}

/**
 * GlassmorphismCard - Modern glassmorphism UI card component
 * Features backdrop blur, subtle borders, and optional gradient effects
 */
export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className = '',
  hoverable = true,
  blur = 'xl',
  border = true,
  gradient = false,
  animate = true,
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  const cardContent = (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-slate-900/40',
        blurClasses[blur],
        border && 'border border-white/10',
        hoverable && 'transition-all duration-300 hover:border-brand-teal/50 hover:shadow-lg hover:shadow-brand-teal/20',
        className
      )}
    >
      {/* Gradient Background (Optional) */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/10 via-transparent to-brand-orange/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Shine Effect on Hover */}
      {hoverable && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default GlassmorphismCard;
