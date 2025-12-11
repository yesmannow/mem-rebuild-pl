/**
 * AppCard Component
 * 
 * Brand-specific card with glass effect, gradients, and Framer Motion
 * Built with Bear Cave Marketing styling
 */

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface AppCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: 'default' | 'glass' | 'gradient' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  children: ReactNode;
}

const variantStyles = {
  default: 'bg-brand-surface border border-brand-surface',
  glass: 'bg-white/5 backdrop-blur-md border border-white/10',
  gradient: 'bg-gradient-to-br from-brand-turquoise/10 to-brand-creamsicle/10 border border-brand-turquoise/20',
  outline: 'bg-transparent border-2 border-brand-turquoise/30',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

/**
 * AppCard - Brand-styled card with motion
 * 
 * @example
 * <AppCard variant="glass" padding="lg" hover>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </AppCard>
 */
export function AppCard({
  variant = 'default',
  padding = 'md',
  hover = true,
  className,
  children,
  ...props
}: AppCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl shadow-soft-dark transition-all duration-200',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default AppCard;
