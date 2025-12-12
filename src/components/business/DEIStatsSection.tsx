/**
 * DEIStatsSection.tsx
 * 
 * Visually engaging component using framer-motion counters to display firm statistics.
 * Critical for Fortune 500 RFPs that mandate DEI standards.
 * 
 * Features:
 * - Animated counters using framer-motion
 * - Stats organized by category (diversity, experience, culture, recognition)
 * - Scroll-triggered animations
 * - Accessible and WCAG compliant
 * - Responsive grid layout
 */

import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Users, Award, Heart, TrendingUp } from 'lucide-react';
import { DEIStat, deiStats, getStatsByCategory } from '../../data/deiStats';

interface DEIStatsSectionProps {
  stats?: DEIStat[];
  title?: string;
  subtitle?: string;
  categoryFilter?: DEIStat['category'] | 'all';
  columns?: number;
  className?: string;
}

const getCategoryIcon = (category: DEIStat['category']) => {
  switch (category) {
    case 'diversity':
      return <Users className="w-6 h-6" />;
    case 'experience':
      return <Award className="w-6 h-6" />;
    case 'culture':
      return <Heart className="w-6 h-6" />;
    case 'recognition':
      return <TrendingUp className="w-6 h-6" />;
    default:
      return <Award className="w-6 h-6" />;
  }
};

const getCategoryColor = (category: DEIStat['category']) => {
  switch (category) {
    case 'diversity':
      return 'text-brand-turquoise';
    case 'experience':
      return 'text-blue-400';
    case 'culture':
      return 'text-pink-400';
    case 'recognition':
      return 'text-amber-400';
    default:
      return 'text-brand-turquoise';
  }
};

const DEIStatsSection: React.FC<DEIStatsSectionProps> = ({
  stats: customStats,
  title = 'Our Commitment to Excellence & Diversity',
  subtitle = 'Building a diverse, experienced team committed to client service and community impact',
  categoryFilter = 'all',
  columns = 4,
  className = '',
}) => {
  // Get stats based on filter
  const displayStats = customStats || (
    categoryFilter === 'all' 
      ? deiStats 
      : getStatsByCategory(categoryFilter)
  );

  // Grid column class mapping
  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
    5: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  };

  return (
    <section className={`dei-stats-section ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {title && (
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p 
              className="text-lg text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className={`grid grid-cols-1 ${columnClasses[columns as keyof typeof columnClasses]} gap-6`}>
        {displayStats.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: DEIStat;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 2000,
    bounce: 0,
  });
  
  const displayValue = useTransform(springValue, (current) => {
    return Math.floor(current).toString();
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(stat.value);
    }
  }, [isInView, stat.value, motionValue]);

  const colorClass = getCategoryColor(stat.category);

  return (
    <motion.div
      ref={ref}
      className="stat-card group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 overflow-hidden hover:border-brand-turquoise/50 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-turquoise/0 to-brand-turquoise/0 group-hover:from-brand-turquoise/10 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
      
      <div className="relative space-y-4">
        {/* Icon */}
        {stat.icon && (
          <div className="flex items-center justify-between">
            <span className="text-4xl" role="img" aria-label={stat.category}>
              {stat.icon}
            </span>
            <div className={`${colorClass} opacity-70`}>
              {getCategoryIcon(stat.category)}
            </div>
          </div>
        )}

        {/* Animated Counter */}
        <div className="space-y-1">
          <div className={`text-5xl font-bold ${colorClass} tabular-nums`}>
            {stat.prefix}
            <motion.span>{displayValue}</motion.span>
            {stat.suffix}
          </div>
          <h3 className="text-lg font-semibold text-white">
            {stat.label}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed">
          {stat.description}
        </p>

        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${colorClass} uppercase tracking-wide`}>
            {stat.category}
          </span>
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className={`absolute -bottom-2 -right-2 w-24 h-24 ${colorClass} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-2xl`} />
    </motion.div>
  );
};

/**
 * Compact variant for smaller displays or sidebars
 */
export const DEIStatsCompact: React.FC<{ stats?: DEIStat[] }> = ({ stats: customStats }) => {
  const displayStats = customStats || deiStats.slice(0, 4);

  return (
    <div className="grid grid-cols-2 gap-4">
      {displayStats.map((stat, index) => (
        <CompactStatCard key={stat.id} stat={stat} index={index} />
      ))}
    </div>
  );
};

const CompactStatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1500 });
  const displayValue = useTransform(springValue, (current) => Math.floor(current).toString());

  useEffect(() => {
    if (isInView) {
      motionValue.set(stat.value);
    }
  }, [isInView, stat.value, motionValue]);

  return (
    <motion.div
      ref={ref}
      className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <div className={`text-3xl font-bold ${getCategoryColor(stat.category)} mb-1 tabular-nums`}>
        {stat.prefix}
        <motion.span>{displayValue}</motion.span>
        {stat.suffix}
      </div>
      <div className="text-sm font-medium text-slate-300">{stat.label}</div>
    </motion.div>
  );
};

export default DEIStatsSection;
