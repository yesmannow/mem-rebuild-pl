import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, ArrowUpRight, DollarSign } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Metric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  change?: string;
}

interface AnimatedMetricsDashboardProps {
  metrics: Metric[];
  chartData?: Array<{ month: string; value: number }>;
  className?: string;
}

const AnimatedMetricsDashboard: React.FC<AnimatedMetricsDashboardProps> = ({
  metrics,
  chartData,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  // Generate chart data if not provided
  const defaultChartData = chartData || [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 68 },
    { month: 'Apr', value: 89 },
    { month: 'May', value: 112 },
    { month: 'Jun', value: 145 },
  ];

  return (
    <div ref={containerRef} className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-brand-surface/30 border border-brand-muted/20 rounded-lg p-4 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 to-brand-teal/5 group-hover:to-brand-teal/10 transition-all duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-brand-muted uppercase tracking-wide">
                  {metric.label}
                </span>
                {metric.trend === 'up' && (
                  <TrendingUp className="w-4 h-4 text-brand-teal" />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className="text-2xl font-bold text-brand-text"
                >
                  {metric.value}
                </motion.span>
                {metric.change && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                    className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-brand-teal' : 'text-brand-muted'
                    }`}
                  >
                    {metric.change}
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {chartData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-brand-surface/30 border border-brand-muted/20 rounded-lg p-4"
        >
          <div className="mb-4">
            <h4 className="text-sm font-mono text-brand-teal uppercase tracking-wide mb-1">
              Growth Trend
            </h4>
            <p className="text-xs text-brand-muted">6-month performance</p>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={defaultChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis
                dataKey="month"
                stroke="rgba(148, 163, 184, 0.5)"
                style={{ fontSize: '10px' }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(64, 224, 208, 0.3)',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#40E0D0"
                strokeWidth={2}
                dot={{ fill: '#40E0D0', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedMetricsDashboard;

