/**
 * LucideIcon Component
 * 
 * Standardized wrapper for lucide-react icons
 * Provides consistent sizing, stroke width, colors, and accessibility
 */

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LucideIconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  title?: string;
  'aria-hidden'?: boolean;
}

const sizeMap = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * LucideIcon component wrapping lucide-react
 * 
 * @example
 * <LucideIcon icon={ArrowRight} size="md" title="Navigate to next page" />
 * <LucideIcon icon={Github} size={32} className="text-brand-turquoise" />
 */
export function LucideIconWrapper({
  icon: IconComponent,
  size = 'md',
  strokeWidth = 2,
  className,
  color,
  title,
  'aria-hidden': ariaHidden = !title,
}: LucideIconProps) {
  const sizeValue = typeof size === 'number' ? size : sizeMap[size];

  return (
    <IconComponent
      size={sizeValue}
      strokeWidth={strokeWidth}
      className={cn('inline-block', className)}
      color={color}
      aria-hidden={ariaHidden}
      aria-label={title}
      role={title ? 'img' : undefined}
    />
  );
}

export default LucideIconWrapper;
