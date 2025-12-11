import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Line, ComposedChart } from 'recharts';

interface Channel {
  name: string;
  budget: number;
  historicalROI: number;
  color: string;
}

const MediaMixOptimizer: React.FC = () => {
  const [totalMediaBudget, setTotalMediaBudget] = useState<number>(300000);
  const [channels, setChannels] = useState<Channel[]>([
    { name: 'Google Ads', budget: 35, historicalROI: 3.2, color: '#40E0D0' },
    { name: 'LinkedIn Ads', budget: 25, historicalROI: 2.8, color: '#FFA500' },
    { name: 'Facebook/Instagram', budget: 20, historicalROI: 2.5, color: '#88ABF2' },
    { name: 'Display Network', budget: 10, historicalROI: 1.8, color: '#B0C4DE' },
    { name: 'Programmatic', budget: 10, historicalROI: 2.0, color: '#EC4899' },
  ]);

  const updateChannelBudget = (index: number, value: number) => {
    const newChannels = [...channels];
    newChannels[index].budget = value;
    
    // Normalize to 100%
    const total = newChannels.reduce((sum, ch) => sum + ch.budget, 0);
    if (total > 0) {
      newChannels.forEach(ch => {
        ch.budget = (ch.budget / total) * 100;
      });
    }
    
    setChannels(newChannels);
  };

  const { projectedRevenue, averageROI, chartData } = useMemo(() => {
    const data = channels.map(ch => {
      const spend = (totalMediaBudget * ch.budget) / 100;
      const revenue = spend * ch.historicalROI;
      return {
        name: ch.name,
        budget: Math.round(spend),
        revenue: Math.round(revenue),
        roi: ch.historicalROI,
        color: ch.color,
      };
    });

    const totalRevenue = data.reduce((sum, ch) => sum + ch.revenue, 0);
    const avgROI = totalRevenue / totalMediaBudget;

    return {
      projectedRevenue: totalRevenue,
      averageROI: avgROI,
      chartData: data,
    };
  }, [channels, totalMediaBudget]);

  return (
    <div className="rounded-2xl border border-brand-teal/20 bg-slate-900/50 backdrop-blur-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/20 border border-brand-teal/30 text-brand-teal">
          <BarChart3 size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">Channel Optimization</p>
          <h3 className="text-2xl font-semibold text-brand-text">Media Mix Optimizer</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-brand-muted mb-2 block">
              Total Paid Media Budget ($)
            </label>
            <input
              type="number"
              value={totalMediaBudget}
              onChange={(e) => setTotalMediaBudget(Number(e.target.value))}
              min="0"
              step="10000"
              className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            />
            <input
              type="range"
              value={totalMediaBudget}
              onChange={(e) => setTotalMediaBudget(Number(e.target.value))}
              min="50000"
              max="1000000"
              step="10000"
              className="w-full mt-3"
            />
          </div>

          {/* Channel Allocation Sliders */}
          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50 space-y-4">
            <h4 className="text-sm font-semibold text-brand-text">Channel Allocation (%)</h4>
            {channels.map((channel, index) => (
              <div key={channel.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: channel.color }}
                    />
                    <span className="text-sm text-brand-text">{channel.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono text-brand-text">
                      {channel.budget.toFixed(1)}%
                    </span>
                    <span className="text-xs text-brand-muted ml-2">
                      (${((totalMediaBudget * channel.budget) / 100).toLocaleString()})
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  value={channel.budget}
                  onChange={(e) => updateChannelBudget(index, Number(e.target.value))}
                  min="0"
                  max="100"
                  step="1"
                  className="w-full"
                  style={{
                    accentColor: channel.color,
                  }}
                />
                <div className="text-xs text-brand-muted mt-1">
                  Historical ROI: {channel.historicalROI}x
                </div>
              </div>
            ))}
          </div>

          {/* Performance Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-brand-teal/10 to-transparent rounded-lg p-4 border border-brand-teal/30">
              <div className="text-xs uppercase tracking-wider text-brand-muted mb-1">
                Projected Revenue
              </div>
              <div className="text-2xl font-bold text-brand-text">
                ${(projectedRevenue / 1000).toFixed(0)}K
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp size={14} className="text-blue-400" />
                <span className="text-xs uppercase tracking-wider text-brand-muted">
                  Blended ROI
                </span>
              </div>
              <div className="text-2xl font-bold text-brand-text">
                {averageROI.toFixed(2)}x
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-4">
          <div className="bg-slate-800/20 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-4">Budget vs. Revenue</h4>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(64, 224, 208, 0.3)',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                  }}
                />
                <Bar dataKey="budget" name="Budget" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.6} />
                  ))}
                </Bar>
                <Bar dataKey="revenue" name="Projected Revenue" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-2">💡 Optimization Tips</h4>
            <ul className="text-xs text-brand-muted space-y-1">
              <li>• Channels with higher historical ROI typically warrant larger budgets</li>
              <li>• Consider diminishing returns when over-allocating to single channels</li>
              <li>• Diversify across 3-5 channels to reduce risk</li>
              <li>• Test new channels with 5-10% of total budget</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaMixOptimizer;
