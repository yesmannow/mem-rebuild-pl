import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, DollarSign } from 'lucide-react';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down';
}

const LiveMetricsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: 'Revenue Impact',
      value: 12.5,
      suffix: 'M',
      icon: <DollarSign size={20} />,
      color: 'text-brand-teal',
      trend: 'up',
    },
    {
      label: 'Users Served',
      value: 30,
      suffix: 'k+',
      icon: <Users size={20} />,
      color: 'text-brand-orange',
      trend: 'up',
    },
    {
      label: 'Automations',
      value: 400,
      suffix: '+',
      icon: <Zap size={20} />,
      color: 'text-brand-teal',
      trend: 'up',
    },
    {
      label: 'Uptime',
      value: 99.9,
      suffix: '%',
      icon: <TrendingUp size={20} />,
      color: 'text-green-500',
      trend: 'up',
    },
  ]);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          if (metric.label === 'Revenue Impact') {
            return { ...metric, value: metric.value + Math.random() * 0.1 };
          }
          if (metric.label === 'Users Served') {
            return { ...metric, value: metric.value + Math.random() * 0.5 };
          }
          return metric;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-metrics-dashboard p-6 bg-brand-surface/50 border border-brand-teal/20 rounded-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-brand-text">Live System Metrics</h3>
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-xs text-brand-muted font-mono">LIVE</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-brand-dark/50 border border-brand-teal/10 rounded-xl p-4 hover:border-brand-teal/30 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${metric.color}`}>{metric.icon}</div>
              {metric.trend === 'up' && (
                <TrendingUp size={16} className="text-green-500" />
              )}
            </div>
            <div className="text-2xl font-bold text-brand-text mb-1">
              {metric.value.toFixed(metric.label === 'Uptime' ? 1 : 1)}
              {metric.suffix}
            </div>
            <div className="text-xs text-brand-muted uppercase tracking-wide">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-brand-muted">
          Metrics update in real-time • Last sync: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default LiveMetricsDashboard;

