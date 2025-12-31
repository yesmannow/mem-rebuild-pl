import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'avatar' | 'image' | 'button';
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
  animate?: boolean;
}

/**
 * SkeletonLoader - Modern skeleton loading component
 * Provides visual feedback during content loading
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
  animate = true,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'card':
        return 'h-48 rounded-2xl';
      case 'avatar':
        return 'w-12 h-12 rounded-full';
      case 'image':
        return 'aspect-video rounded-lg';
      case 'button':
        return 'h-10 rounded-lg';
      default:
        return 'h-4 rounded';
    }
  };

  const shimmerAnimation = animate
    ? {
        backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }
    : {};

  const skeletonElement = (
    <div
      className={cn(
        'bg-slate-800/50 relative overflow-hidden',
        getVariantStyles(),
        className
      )}
      style={{
        width: width || undefined,
        height: height || undefined,
      }}
    >
      {/* Shimmer Effect */}
      {animate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  );

  if (count === 1) {
    return skeletonElement;
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{skeletonElement}</React.Fragment>
      ))}
    </div>
  );
};

/**
 * SkeletonCard - Pre-built skeleton for card layouts
 */
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={cn('p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl', className)}>
    <div className="flex items-center gap-4 mb-4">
      <SkeletonLoader variant="avatar" />
      <div className="flex-1 space-y-2">
        <SkeletonLoader width="60%" height={16} />
        <SkeletonLoader width="40%" height={12} />
      </div>
    </div>
    <SkeletonLoader variant="text" count={3} className="mb-4" />
    <div className="flex gap-2">
      <SkeletonLoader variant="button" width={100} />
      <SkeletonLoader variant="button" width={100} />
    </div>
  </div>
);

/**
 * SkeletonGrid - Grid of skeleton cards
 */
export const SkeletonGrid: React.FC<{ 
  count?: number; 
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}> = ({ 
  count = 6, 
  columns = 3,
  className = '' 
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', gridClasses[columns], className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
