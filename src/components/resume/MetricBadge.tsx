/**
 * MetricBadge - Tremor-style metric badge component
 * Displays metrics like "+40% Revenue" in Emerald Green
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface MetricBadgeProps {
  value: string;
  label?: string;
  color?: 'emerald' | 'teal' | 'orange' | 'blue';
  className?: string;
}

const colorStyles = {
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-emerald-500/20',
  teal: 'bg-brand-teal/20 text-brand-teal border-brand-teal/30 shadow-brand-teal/20',
  orange: 'bg-brand-orange/20 text-brand-orange border-brand-orange/30 shadow-brand-orange/20',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-blue-500/20',
};

export const MetricBadge: React.FC<MetricBadgeProps> = ({
  value,
  label,
  color = 'emerald',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-semibold text-sm shadow-lg ${colorStyles[color]} ${className}`}
    >
      <TrendingUp size={14} />
      <span>{value}</span>
      {label && <span className="text-xs opacity-80">({label})</span>}
    </motion.div>
  );
};
