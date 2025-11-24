/**
 * MetricCard Component
 * Animated metric display card with icon and description
 * Uses OceanCountingNumber for smooth number animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { OceanCountingNumber } from './OceanCountingNumber';

export interface MetricCardProps {
  value: number;
  label: string;
  description?: string;
  icon?: LucideIcon | React.ReactNode;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
  delay?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  description,
  icon: Icon,
  prefix = '',
  suffix = '',
  decimals = 0,
  color = 'primary',
  className = '',
  delay = 0,
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-[#006d77]/10',
      border: 'border-[#006d77]/20',
      text: 'text-[#006d77]',
      icon: 'text-[#006d77]',
    },
    secondary: {
      bg: 'bg-[#83c5be]/10',
      border: 'border-[#83c5be]/20',
      text: 'text-[#83c5be]',
      icon: 'text-[#83c5be]',
    },
    accent: {
      bg: 'bg-[#e29578]/10',
      border: 'border-[#e29578]/20',
      text: 'text-[#e29578]',
      icon: 'text-[#e29578]',
    },
  };

  const selectedColor = colorClasses[color];

  return (
    <motion.div
      className={`metric-card p-6 rounded-xl border-2 ${selectedColor.bg} ${selectedColor.border} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: `0 20px 40px ${color === 'primary' ? 'rgba(0,109,119,0.2)' : color === 'secondary' ? 'rgba(131,197,190,0.2)' : 'rgba(226,149,120,0.2)'}`
      }}
    >
      {/* Icon */}
      {Icon && (
        <div className={`mb-4 ${selectedColor.icon}`}>
          {typeof Icon === 'function' ? (
            <Icon size={32} />
          ) : (
            <div className="text-3xl">{Icon}</div>
          )}
        </div>
      )}

      {/* Value with Animated Counter */}
      <div className={`metric-value text-4xl md:text-5xl font-bold ${selectedColor.text} mb-2`}>
        {prefix}
        <OceanCountingNumber
          number={value}
          decimalPlaces={decimals}
          inView={true}
          transition={{
            stiffness: 80,
            damping: 30,
          }}
        />
        {suffix}
      </div>

      {/* Label */}
      <div className="metric-label text-lg font-semibold text-[var(--parchment-050)] mb-1">
        {label}
      </div>

      {/* Description */}
      {description && (
        <p className="metric-description text-sm text-[var(--parchment-050)]/70">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default MetricCard;
