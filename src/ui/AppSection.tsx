/**
 * AppSection Component
 * 
 * Brand-specific section wrapper with consistent layout patterns
 */

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface AppSectionProps extends Omit<HTMLMotionProps<'section'>, 'ref'> {
  variant?: 'default' | 'feature' | 'hero';
  container?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
}

const variantStyles = {
  default: '',
  feature: 'bg-gradient-to-b from-transparent to-brand-surface/50',
  hero: 'min-h-[80vh] flex items-center justify-center',
};

const paddingStyles = {
  none: '',
  sm: 'py-8',
  md: 'py-16',
  lg: 'py-24',
  xl: 'py-32',
};

/**
 * AppSection - Brand-styled section wrapper
 * 
 * @example
 * <AppSection variant="hero" padding="xl">
 *   <h1>Welcome to Bear Cave Marketing</h1>
 * </AppSection>
 */
export function AppSection({
  variant = 'default',
  container = true,
  padding = 'md',
  className,
  children,
  ...props
}: AppSectionProps) {
  return (
    <motion.section
      className={cn(
        'relative',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {container ? (
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.section>
  );
}

export default AppSection;
