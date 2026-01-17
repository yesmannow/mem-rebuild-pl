import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp } from 'lucide-react';

interface PerformanceDataPoint {
  metric: string;
  value: number;
  target?: number;
}

interface DevOpsPerformanceMetricsProps {
  data: PerformanceDataPoint[];
  timeSeriesData?: Array<{ date: string; value: number }>;
  className?: string;
}

/**
 * DevOpsPerformanceMetrics
 * Displays performance metrics with charts
 */
export const DevOpsPerformanceMetrics: React.FC<DevOpsPerformanceMetricsProps> = ({
  data,
  timeSeriesData,
  className = '',
}) => {
  return (
    <motion.div
      className={`devops-performance-metrics ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-brand-text mb-2 flex items-center gap-2">
          <Zap className="w-6 h-6 text-brand-turquoise" />
          Performance Metrics
        </h3>
        <p className="text-brand-muted text-sm">
          Key performance indicators and benchmarks
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {data.map((metric, index) => {
          const isOnTarget = metric.target ? metric.value >= metric.target : true;
          const percentage = metric.target ? (metric.value / metric.target) * 100 : 100;

          return (
            <motion.div
              key={metric.metric}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-brand-muted">{metric.metric}</span>
                {isOnTarget ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-400" />
                )}
              </div>
              <div className="text-3xl font-bold text-brand-text mb-2">{metric.value}</div>
              {metric.target && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-brand-muted">
                    <span>Target: {metric.target}</span>
                    <span>{percentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${isOnTarget ? 'bg-green-400' : 'bg-yellow-400'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(percentage, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Time Series Chart */}
      {timeSeriesData && timeSeriesData.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h4 className="text-lg font-semibold text-brand-text mb-4">Performance Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#40E0D0" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#40E0D0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis
                dataKey="date"
                stroke="#94A3B8"
                fontSize={12}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(64, 224, 208, 0.3)',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#40E0D0"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
};

export default DevOpsPerformanceMetrics;
