import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { trackPortfolioEngagement } from '../../utils/analytics';
import './MetricsVisualization.css';

interface Metric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  percentage?: number; // For progress bars
}

interface MetricsVisualizationProps {
  metrics: Metric[];
  accentColor?: string;
  caseStudySlug?: string;
  variant?: 'cards' | 'bars' | 'comparison';
}

/**
 * MetricsVisualization Component
 * Enhanced metrics display with animations and visualizations
 */
const MetricsVisualization: React.FC<MetricsVisualizationProps> = ({
  metrics,
  accentColor = '#3B82F6',
  caseStudySlug,
  variant = 'cards',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track metrics view
    if (caseStudySlug) {
      trackPortfolioEngagement.metricsView(caseStudySlug);
    }
  }, [caseStudySlug]);

  // Parse numeric value from string (e.g., "70%" -> 70, "400+" -> 400)
  const parseNumericValue = (value: string): number => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  };

  // Determine trend from value
  const getTrend = (metric: Metric): 'up' | 'down' | 'neutral' => {
    if (metric.trend) return metric.trend;

    const numValue = parseNumericValue(metric.value);
    if (numValue > 50) return 'up';
    if (numValue < 50) return 'down';
    return 'neutral';
  };

  if (variant === 'bars') {
    return (
      <div ref={containerRef} className="metrics-visualization metrics-visualization--bars">
        {metrics.map((metric, index) => {
          const numericValue = parseNumericValue(metric.value);
          const maxValue = 100; // Assume percentage-based
          const percentage = metric.percentage || Math.min((numericValue / maxValue) * 100, 100);
          const trend = getTrend(metric);

          return (
            <motion.div
              key={metric.label}
              className="metric-bar"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="metric-bar__header">
                <span className="metric-bar__label">{metric.label}</span>
                <span className="metric-bar__value">{metric.value}</span>
              </div>
              <div className="metric-bar__track">
                <motion.div
                  className="metric-bar__fill"
                  style={
                    {
                      backgroundColor: accentColor,
                      '--accent-color': accentColor,
                    } as React.CSSProperties
                  }
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              {trend !== 'neutral' && (
                <div className={`metric-bar__trend metric-bar__trend--${trend}`}>
                  {trend === 'up' ? '↑' : '↓'}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (variant === 'comparison') {
    return (
      <div ref={containerRef} className="metrics-visualization metrics-visualization--comparison">
        <div className="metrics-comparison-grid">
          {metrics.map((metric, index) => {
            const numericValue = parseNumericValue(metric.value);
            const trend = getTrend(metric);

            return (
              <motion.div
                key={metric.label}
                className="metric-comparison-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="metric-comparison-card__icon" data-trend={trend}>
                  {trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️'}
                </div>
                <div className="metric-comparison-card__value" style={{ color: accentColor }}>
                  {metric.value}
                </div>
                <div className="metric-comparison-card__label">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default: cards variant
  return (
    <div ref={containerRef} className="metrics-visualization metrics-visualization--cards">
      <div className="metrics-cards-grid">
        {metrics.map((metric, index) => {
          const numericValue = parseNumericValue(metric.value);
          const trend = getTrend(metric);

          return (
            <motion.div
              key={metric.label}
              className="metric-card-enhanced"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={
                {
                  '--accent-color': accentColor,
                } as React.CSSProperties
              }
            >
              <div className="metric-card-enhanced__accent" />
              <div className="metric-card-enhanced__content">
                <div className="metric-card-enhanced__value">{metric.value}</div>
                <div className="metric-card-enhanced__label">{metric.label}</div>
                {trend !== 'neutral' && (
                  <div
                    className={`metric-card-enhanced__trend metric-card-enhanced__trend--${trend}`}
                  >
                    {trend === 'up' ? '↑ Improvement' : '↓ Reduction'}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsVisualization;
