import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Activity, Server, Wrench, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import './GlassMetrics.css';

interface MetricItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  status?: 'live' | 'active' | 'online';
}

/**
 * GlassMetrics - Bento-style glassmorphism dashboard
 * Shows real-time portfolio metrics in a floating glass panel
 */
const GlassMetrics: React.FC = () => {
  const metrics: MetricItem[] = [
    {
      label: 'Deployment Status',
      value: 'Live',
      icon: <Server size={18} />,
      status: 'live',
    },
    {
      label: 'Uptime',
      value: '99.9%',
      icon: <Activity size={18} />,
      status: 'online',
    },
    {
      label: 'Tools Active',
      value: '12',
      icon: <Wrench size={18} />,
      status: 'active',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="glass-metrics"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card variant="glass" className="glass-metrics__card">
        <CardContent className="glass-metrics__content">
          <div className="glass-metrics__header">
            <div className="glass-metrics__title">
              <Activity size={20} className="glass-metrics__title-icon" />
              <span>Portfolio Metrics</span>
            </div>
            <div className="glass-metrics__status-indicator">
              <div className="glass-metrics__pulse" />
            </div>
          </div>

          <div className="glass-metrics__grid">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="glass-metrics__item"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="glass-metrics__item-icon">
                  {metric.icon}
                </div>
                <div className="glass-metrics__item-content">
                  <div className="glass-metrics__item-label">{metric.label}</div>
                  <div className="glass-metrics__item-value">
                    {metric.value}
                    {metric.status === 'live' && (
                      <motion.span
                        className="glass-metrics__status-badge glass-metrics__status-badge--live"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <CheckCircle2 size={12} />
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GlassMetrics;
