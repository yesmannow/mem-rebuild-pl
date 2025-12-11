/**
 * AppBadge Component
 * 
 * Brand-specific badge for tags, labels, and status indicators
 */

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface AppBadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
}

const variantStyles = {
  primary: 'bg-brand-turquoise/20 text-brand-turquoise border-brand-turquoise/30',
  secondary: 'bg-brand-creamsicle/20 text-brand-creamsicle border-brand-creamsicle/30',
  success: 'bg-green-500/20 text-green-400 border-green-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

/**
 * AppBadge - Brand-styled badge component
 * 
 * @example
 * <AppBadge variant="primary" size="md">Featured</AppBadge>
 */
export function AppBadge({
  variant = 'primary',
  size = 'md',
  className,
  children,
}: AppBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export default AppBadge;
