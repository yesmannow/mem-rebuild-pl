import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
}

interface ImpactMetricsProps {
  metrics: Metric[];
  className?: string;
}

/**
 * ImpactMetrics
 * Animated metrics display with counting numbers in glass panels
 */
export const ImpactMetrics: React.FC<ImpactMetricsProps> = ({
  metrics,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Parse numeric value from metric string (e.g., "+212%" -> 212, "85K+/month" -> 85)
  const parseNumericValue = (value: string): number => {
    // Remove all non-numeric characters except decimal point and minus sign
    const cleaned = value.replace(/[^0-9.-]/g, '');
    return parseFloat(cleaned) || 0;
  };

  // Extract suffix (%, K, etc.)
  const getSuffix = (value: string): string => {
    const match = value.match(/[^0-9.-]+/g);
    return match ? match.join('') : '';
  };

  // Extract prefix (+ or -)
  const getPrefix = (value: string): string => {
    return value.startsWith('+') ? '+' : value.startsWith('-') ? '-' : '';
  };

  return (
    <div ref={containerRef} className={`impact-metrics ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const numericValue = parseNumericValue(metric.value);
          const suffix = getSuffix(metric.value);
          const prefix = getPrefix(metric.value);
          const [displayValue, setDisplayValue] = useState(0);

                  useEffect(() => {
            if (isInView && numericValue > 0) {
              const duration = 2000; // 2 seconds
              const steps = 60;
              const increment = numericValue / steps;
              const stepDuration = duration / steps;

              let currentStep = 0;
              const timer = setInterval(() => {
                currentStep++;
                const newValue = Math.min(increment * currentStep, numericValue);
                setDisplayValue(Math.floor(newValue));

                if (currentStep >= steps) {
                  setDisplayValue(numericValue);
                  clearInterval(timer);
                }
              }, stepDuration);

              return () => clearInterval(timer);
            } else if (isInView) {
              // For non-numeric values, just show the original
              setDisplayValue(0);
            }
          }, [isInView, numericValue]);

          return (
            <motion.div
              key={metric.label}
              className="glass-panel p-6 hover:border-brand-turquoise/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-turquoise flex-shrink-0" />
                  <span className="text-sm font-medium text-brand-muted uppercase tracking-wider">
                    {metric.label}
                  </span>
                </div>
              </div>
              <div className="text-4xl font-bold text-brand-turquoise font-mono">
                {numericValue > 0 ? (
                  <>
                    {prefix}
                    {displayValue.toLocaleString()}
                    {suffix}
                  </>
                ) : (
                  <span>{metric.value}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ImpactMetrics;
