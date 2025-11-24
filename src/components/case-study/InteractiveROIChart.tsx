import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface ROIMetric {
  label: string;
  value: string;
}

interface InteractiveROIChartProps {
  metrics: ROIMetric[];
  className?: string;
}

/**
 * Parses a metric value to extract a numeric percentage for visualization
 * Examples: "+212%" -> 212, "-42%" -> 42, "70%" -> 70, "$310K" -> 100 (max)
 */
const parseMetricValue = (value: string): number => {
  // Remove all non-numeric characters except decimal point and minus sign
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const numValue = parseFloat(cleaned) || 0;

  // If it's a percentage, normalize to 0-100 scale
  // For large percentages like +212%, we'll scale down for visual consistency
  if (value.includes('%')) {
    const absValue = Math.abs(numValue);
    // For percentages over 100, normalize to 0-100 scale
    if (absValue > 100) {
      // Scale down: 212% becomes ~85% of bar, 320% becomes ~100%
      return Math.min((absValue / 4), 100);
    }
    return Math.min(absValue, 100);
  }

  // For dollar amounts, normalize based on typical ranges
  if (value.includes('$') || value.includes('K')) {
    // $310K -> normalize to ~62% (310/5 = 62)
    // Adjust divisor based on your typical metric ranges
    return Math.min((Math.abs(numValue) / 5), 100);
  }

  // For scores like "8.2/10", extract the first number and convert to percentage
  if (value.includes('/')) {
    const firstNum = parseFloat(value.split('/')[0]) || 0;
    return (firstNum / 10) * 100; // Convert to percentage
  }

  // Default: normalize to 0-100 scale
  return Math.min(Math.abs(numValue), 100);
};

const InteractiveROIChart: React.FC<InteractiveROIChartProps> = ({ metrics, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div ref={containerRef} className={cn('space-y-6', className)}>
      {metrics.map((metric, index) => {
        const percentage = parseMetricValue(metric.value);
        const itemRef = useRef<HTMLDivElement>(null);
        const itemInView = useInView(itemRef, { once: true, margin: '-50px' });

        return (
          <motion.div
            key={metric.label}
            ref={itemRef}
            initial={{ opacity: 0, y: 20 }}
            animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-brand-text">{metric.label}</span>
              <span className="text-lg font-bold text-brand-teal">{metric.value}</span>
            </div>

            {/* Bar container */}
            <div className="relative h-3 bg-brand-surface/50 rounded-full overflow-hidden">
              {/* Animated bar */}
              <motion.div
                className="h-full bg-gradient-to-r from-brand-teal to-brand-orange rounded-full"
                initial={{ width: 0 }}
                animate={itemInView ? { width: `${percentage}%` } : { width: 0 }}
                transition={{
                  duration: 1,
                  delay: index * 0.1 + 0.3,
                  ease: 'easeOut',
                }}
              />

              {/* Shimmer effect */}
              {itemInView && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.1 + 1.3,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default InteractiveROIChart;

