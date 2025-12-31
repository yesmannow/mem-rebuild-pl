import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Award, Code, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import AnimatedCounter from './AnimatedCounter';

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend?: number;
  color?: string;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  label,
  value,
  suffix = '',
  prefix = '',
  trend,
  color = '#40E0D0',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      className="relative group"
    >
      {/* Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 hover:border-brand-teal/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-teal/20">
        {/* Gradient Background Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="p-3 rounded-xl bg-slate-800/50"
            style={{ boxShadow: `0 0 20px ${color}20` }}
          >
            <Icon
              size={24}
              style={{ color }}
              className="transition-transform group-hover:scale-110 duration-300"
            />
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp size={14} className="text-green-400" />
              <span className="text-green-400 font-semibold">+{trend}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <AnimatedCounter
            value={value}
            prefix={prefix}
            suffix={suffix}
            className="text-3xl md:text-4xl font-bold text-brand-text"
            duration={2}
          />
        </div>

        {/* Label */}
        <p className="text-sm text-brand-muted font-medium">{label}</p>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </motion.div>
  );
};

interface LivePortfolioMetricsProps {
  className?: string;
}

/**
 * LivePortfolioMetrics - Real-time animated dashboard showing portfolio statistics
 * Features glassmorphism design, animated counters, and hover effects
 */
export const LivePortfolioMetrics: React.FC<LivePortfolioMetricsProps> = ({
  className = '',
}) => {
  const [metrics, setMetrics] = useState({
    yearsExperience: 16,
    projectsCompleted: 120,
    clientsServed: 45,
    certifications: 8,
    githubRepos: 67,
    techStackSize: 30,
  });

  // Simulate live data updates (could be replaced with real API calls)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        githubRepos: prev.githubRepos + Math.floor(Math.random() * 2),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const metricsData: MetricCardProps[] = [
    {
      icon: Briefcase,
      label: 'Years Experience',
      value: metrics.yearsExperience,
      suffix: '+',
      color: '#40E0D0',
      delay: 0,
    },
    {
      icon: Star,
      label: 'Projects Completed',
      value: metrics.projectsCompleted,
      suffix: '+',
      trend: 15,
      color: '#FFA500',
      delay: 0.1,
    },
    {
      icon: Users,
      label: 'Clients Served',
      value: metrics.clientsServed,
      suffix: '+',
      trend: 22,
      color: '#B3CDE0',
      delay: 0.2,
    },
    {
      icon: Award,
      label: 'Certifications',
      value: metrics.certifications,
      color: '#40E0D0',
      delay: 0.3,
    },
    {
      icon: Code,
      label: 'GitHub Repositories',
      value: metrics.githubRepos,
      trend: 8,
      color: '#FFA500',
      delay: 0.4,
    },
    {
      icon: Star,
      label: 'Tech Stack',
      value: metrics.techStackSize,
      suffix: '+',
      color: '#B3CDE0',
      delay: 0.5,
    },
  ];

  return (
    <div className={cn('w-full', className)}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
          Portfolio at a Glance
        </h2>
        <p className="text-brand-muted text-lg max-w-2xl mx-auto">
          Real-time metrics showcasing experience, impact, and technical expertise
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsData.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default LivePortfolioMetrics;
