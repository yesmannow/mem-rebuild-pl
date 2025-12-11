import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface FunnelStage {
  name: string;
  conversionRate: number;
  color: string;
}

const PipelineVisualizer: React.FC = () => {
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(10000);
  const [averageDealSize, setAverageDealSize] = useState<number>(5000);
  const [salesCycleLength, setSalesCycleLength] = useState<number>(45);
  
  const [funnelStages, setFunnelStages] = useState<FunnelStage[]>([
    { name: 'Visitors', conversionRate: 100, color: '#40E0D0' },
    { name: 'Leads', conversionRate: 3, color: '#FFA500' },
    { name: 'MQLs', conversionRate: 40, color: '#88ABF2' },
    { name: 'SQLs', conversionRate: 50, color: '#B0C4DE' },
    { name: 'Opportunities', conversionRate: 30, color: '#EC4899' },
    { name: 'Closed Won', conversionRate: 25, color: '#10B981' },
  ]);

  const updateStageConversion = (index: number, value: number) => {
    const newStages = [...funnelStages];
    newStages[index].conversionRate = value;
    setFunnelStages(newStages);
  };

  const { pipelineData, totalRevenue, closedDeals, velocity } = useMemo(() => {
    let cumulativeCount = monthlyVisitors;
    const data = funnelStages.map((stage, index) => {
      if (index === 0) {
        return {
          name: stage.name,
          count: cumulativeCount,
          color: stage.color,
          dropOff: 0,
        };
      }
      
      const previousCount = cumulativeCount;
      cumulativeCount = Math.round((cumulativeCount * stage.conversionRate) / 100);
      const dropOff = previousCount - cumulativeCount;
      
      return {
        name: stage.name,
        count: cumulativeCount,
        color: stage.color,
        dropOff,
      };
    });

    const deals = data[data.length - 1].count;
    const revenue = deals * averageDealSize;
    const vel = salesCycleLength > 0 ? (revenue / salesCycleLength) * 30 : 0;

    return {
      pipelineData: data,
      totalRevenue: revenue,
      closedDeals: deals,
      velocity: vel,
    };
  }, [monthlyVisitors, averageDealSize, salesCycleLength, funnelStages]);

  return (
    <div className="rounded-2xl border border-brand-teal/20 bg-slate-900/50 backdrop-blur-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/20 border border-brand-teal/30 text-brand-teal">
          <GitBranch size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">Revenue Pipeline</p>
          <h3 className="text-2xl font-semibold text-brand-text">Pipeline Visualizer</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-brand-muted mb-2 block">
              Monthly Website Visitors
            </label>
            <input
              type="number"
              value={monthlyVisitors}
              onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
              min="0"
              step="1000"
              className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            />
            <input
              type="range"
              value={monthlyVisitors}
              onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
              min="1000"
              max="100000"
              step="1000"
              className="w-full mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-brand-muted mb-2 block">
                Avg Deal Size ($)
              </label>
              <input
                type="number"
                value={averageDealSize}
                onChange={(e) => setAverageDealSize(Number(e.target.value))}
                min="0"
                step="500"
                className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
              />
            </div>
            <div>
              <label className="text-sm text-brand-muted mb-2 block">
                Sales Cycle (days)
              </label>
              <input
                type="number"
                value={salesCycleLength}
                onChange={(e) => setSalesCycleLength(Number(e.target.value))}
                min="1"
                step="5"
                className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
              />
            </div>
          </div>

          {/* Conversion Rates */}
          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50 space-y-3">
            <h4 className="text-sm font-semibold text-brand-text">Conversion Rates (%)</h4>
            {funnelStages.slice(1).map((stage, index) => (
              <div key={stage.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="text-sm text-brand-text">{stage.name}</span>
                  </div>
                  <span className="text-sm font-mono text-brand-muted">
                    {stage.conversionRate}%
                  </span>
                </div>
                <input
                  type="range"
                  value={stage.conversionRate}
                  onChange={(e) => updateStageConversion(index + 1, Number(e.target.value))}
                  min="1"
                  max="100"
                  step="1"
                  className="w-full"
                  style={{ accentColor: stage.color }}
                />
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-brand-teal/10 to-transparent rounded-lg p-4 border border-brand-teal/30">
              <div className="text-xs uppercase tracking-wider text-brand-muted mb-1">
                Monthly Revenue
              </div>
              <div className="text-2xl font-bold text-brand-text">
                ${(totalRevenue / 1000).toFixed(0)}K
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-transparent rounded-lg p-4 border border-green-500/30">
              <div className="text-xs uppercase tracking-wider text-brand-muted mb-1">
                Closed Deals
              </div>
              <div className="text-2xl font-bold text-brand-text">
                {closedDeals}
              </div>
            </div>
            <div className="col-span-2 bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-purple-400" />
                <span className="text-xs uppercase tracking-wider text-brand-muted">
                  Pipeline Velocity
                </span>
              </div>
              <div className="text-3xl font-bold text-brand-text">
                ${(velocity / 1000).toFixed(1)}K/day
              </div>
            </div>
          </div>
        </div>

        {/* Funnel Chart */}
        <div className="space-y-4">
          <div className="bg-slate-800/20 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-4">Funnel Breakdown</h4>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={pipelineData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  type="number"
                  stroke="#94A3B8"
                  fontSize={12}
                  tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value.toString()}
                />
                <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={12} width={100} />
                <Tooltip
                  formatter={(value: number) => value.toLocaleString()}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(64, 224, 208, 0.3)',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-2">💡 Pipeline Tips</h4>
            <ul className="text-xs text-brand-muted space-y-1">
              <li>• Focus on improving conversion at the biggest drop-off points</li>
              <li>• Shorter sales cycles = higher pipeline velocity</li>
              <li>• Track velocity weekly to spot trends early</li>
              <li>• Benchmark your conversion rates against industry standards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineVisualizer;
