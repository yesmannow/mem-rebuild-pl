import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Package, TrendingDown } from 'lucide-react';

interface BundleData {
  name: string;
  size: number; // in KB
  gzipped: number; // in KB
  color: string;
}

interface DevOpsBundleChartProps {
  data: BundleData[];
  className?: string;
}

/**
 * DevOpsBundleChart
 * Visualizes bundle sizes using recharts
 */
export const DevOpsBundleChart: React.FC<DevOpsBundleChartProps> = ({
  data,
  className = '',
}) => {
  const chartData = data.map(item => ({
    name: item.name,
    'Original Size': item.size,
    'Gzipped': item.gzipped,
    color: item.color,
  }));

  const totalSize = data.reduce((sum, item) => sum + item.size, 0);
  const totalGzipped = data.reduce((sum, item) => sum + item.gzipped, 0);
  const compressionRatio = ((totalSize - totalGzipped) / totalSize) * 100;

  return (
    <motion.div
      className={`devops-bundle-chart ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-brand-text flex items-center gap-2">
            <Package className="w-6 h-6 text-brand-turquoise" />
            Bundle Size Analysis
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-brand-muted">
              Total: <span className="text-brand-text font-semibold">{totalSize.toFixed(0)} KB</span>
            </div>
            <div className="text-brand-muted">
              Gzipped: <span className="text-brand-text font-semibold">{totalGzipped.toFixed(0)} KB</span>
            </div>
            <div className="flex items-center gap-1 text-green-400">
              <TrendingDown className="w-4 h-4" />
              <span>{compressionRatio.toFixed(1)}% smaller</span>
            </div>
          </div>
        </div>
        <p className="text-brand-muted text-sm">
          Bundle sizes before and after gzip compression
        </p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis
              dataKey="name"
              stroke="#94A3B8"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={12}
              label={{ value: 'Size (KB)', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(64, 224, 208, 0.3)',
                borderRadius: '8px',
                color: '#F8FAFC',
              }}
              formatter={(value: number) => `${value.toFixed(1)} KB`}
            />
            <Bar dataKey="Original Size" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-original-${index}`} fill={entry.color} opacity={0.6} />
              ))}
            </Bar>
            <Bar dataKey="Gzipped" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-gzipped-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-brand-turquoise opacity-60" />
            <span className="text-sm text-brand-muted">Original Size</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-brand-turquoise" />
            <span className="text-sm text-brand-muted">Gzipped</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DevOpsBundleChart;
