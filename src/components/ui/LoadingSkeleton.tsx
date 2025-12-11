import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

/**
 * Loading skeleton component for optimistic UI
 * Provides visual feedback while content loads
 */
export const LoadingSkeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = '1rem',
  className,
  count = 1,
}) => {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded-lg',
    card: 'rounded-xl h-64',
  };

  const skeletonElement = (
    <motion.div
      className={cn(
        'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%]',
        variantClasses[variant],
        className
      )}
      style={{ width, height: variant === 'circular' ? width : height }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 0%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );

  if (count === 1) return skeletonElement;

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={i}>{skeletonElement}</React.Fragment>
      ))}
    </div>
  );
};

/**
 * Pre-built skeleton layouts for common use cases
 */
export const SkeletonLayouts = {
  AppCard: () => (
    <div className="bg-slate-900 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-4">
        <LoadingSkeleton variant="circular" width="3rem" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton variant="text" width="60%" />
          <LoadingSkeleton variant="text" width="40%" height="0.75rem" />
        </div>
      </div>
      <LoadingSkeleton variant="rectangular" height="12rem" />
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="100%" />
        <LoadingSkeleton variant="text" width="85%" />
        <LoadingSkeleton variant="text" width="70%" />
      </div>
    </div>
  ),

  Dashboard: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-slate-900 rounded-xl p-6 space-y-4">
          <LoadingSkeleton variant="text" width="50%" />
          <LoadingSkeleton variant="rectangular" height="8rem" />
        </div>
      ))}
    </div>
  ),

  Form: () => (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <LoadingSkeleton variant="text" width="30%" height="0.875rem" />
          <LoadingSkeleton variant="rectangular" height="2.5rem" />
        </div>
      ))}
    </div>
  ),
};
