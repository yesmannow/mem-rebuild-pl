import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animate = true,
}) => {
  const baseClasses = 'bg-slate-800/50 rounded';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    card: 'rounded-2xl',
  };

  const style: React.CSSProperties = {
    width: width ?? '100%',
    height: height ?? (variant === 'text' ? '1rem' : variant === 'circular' ? width : '100%'),
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      animate={animate ? {
        opacity: [0.5, 0.8, 0.5],
      } : undefined}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// Skeleton for cards
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`rounded-2xl border border-white/5 bg-slate-900/50 p-6 ${className}`}>
    <Skeleton variant="text" width="40%" className="mb-4" />
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" width="80%" className="mb-4" />
    <div className="flex gap-2">
      <Skeleton variant="rectangular" width={60} height={24} />
      <Skeleton variant="rectangular" width={80} height={24} />
    </div>
  </div>
);

// Skeleton for profile/avatar
export const AvatarSkeleton: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 80,
  };
  return <Skeleton variant="circular" width={sizes[size]} height={sizes[size]} />;
};

// Skeleton for gallery grid
export const GallerySkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton 
        key={i} 
        variant="card" 
        height={i % 3 === 0 ? 300 : 200} 
        className="aspect-square"
      />
    ))}
  </div>
);

// Skeleton for stats/metrics
export const MetricsSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-2xl border border-white/5 bg-slate-900/50 p-5">
        <Skeleton variant="text" width="60%" className="mb-2" />
        <Skeleton variant="text" width="40%" height="2rem" />
      </div>
    ))}
  </div>
);

// Skeleton for timeline items
export const TimelineSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-8 pl-10">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="relative">
        <Skeleton variant="circular" width={16} height={16} className="absolute -left-10 top-2" />
        <CardSkeleton />
      </div>
    ))}
  </div>
);

export default Skeleton;
