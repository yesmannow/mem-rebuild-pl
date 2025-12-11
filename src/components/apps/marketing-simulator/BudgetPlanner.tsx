import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ChannelBudget {
  name: string;
  amount: number;
  percentage?: number;
  color: string;
}

type Scenario = 'conservative' | 'balanced' | 'aggressive';

const BudgetPlanner: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState<number>(500000);
  const [scenario, setScenario] = useState<Scenario>('balanced');

  const scenarioAllocations: Record<Scenario, Record<string, number>> = {
    conservative: {
      'Paid Media': 25,
      'Content Marketing': 20,
      'SEO': 15,
      'Events': 10,
      'Brand': 10,
      'Sales Enablement': 15,
      'Tools & Tech': 5,
    },
    balanced: {
      'Paid Media': 30,
      'Content Marketing': 20,
      'SEO': 12,
      'Events': 15,
      'Brand': 8,
      'Sales Enablement': 10,
      'Tools & Tech': 5,
    },
    aggressive: {
      'Paid Media': 40,
      'Content Marketing': 15,
      'SEO': 10,
      'Events': 20,
      'Brand': 5,
      'Sales Enablement': 5,
      'Tools & Tech': 5,
    },
  };

  const colors = [
    '#40E0D0', // brand-teal
    '#FFA500', // creamsicle
    '#B0C4DE', // light-blue-gray
    '#88ABF2', // ocean blue
    '#EC4899', // pink
    '#10B981', // green
    '#F59E0B', // amber
  ];

  const channelData: ChannelBudget[] = useMemo(() => {
    const allocation = scenarioAllocations[scenario];
    return Object.entries(allocation).map(([name, percentage], index) => ({
      name,
      amount: Math.round((totalBudget * percentage) / 100),
      percentage,
      color: colors[index % colors.length],
    }));
  }, [totalBudget, scenario]);

  const pieData = channelData.map((item) => ({
    name: item.name,
    value: item.amount,
  }));

  const estimatedROI = useMemo(() => {
    const roiMultipliers: Record<Scenario, number> = {
      conservative: 2.5,
      balanced: 3.2,
      aggressive: 4.0,
    };
    return totalBudget * roiMultipliers[scenario];
  }, [totalBudget, scenario]);

  return (
    <div className="rounded-2xl border border-brand-teal/20 bg-slate-900/50 backdrop-blur-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/20 border border-brand-teal/30 text-brand-teal">
          <DollarSign size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">Scenario Planning</p>
          <h3 className="text-2xl font-semibold text-brand-text">Budget Planner</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="text-sm text-brand-muted mb-2 block">
              Total Annual Marketing Budget ($)
            </label>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              min="0"
              step="10000"
              className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            />
            <input
              type="range"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              min="100000"
              max="5000000"
              step="50000"
              className="w-full mt-3"
            />
          </div>

          <div>
            <label className="text-sm text-brand-muted mb-3 block">Allocation Scenario</label>
            <div className="grid grid-cols-3 gap-2">
              {(['conservative', 'balanced', 'aggressive'] as Scenario[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold capitalize transition-all ${
                    scenario === s
                      ? 'bg-brand-teal text-brand-dark shadow-lg'
                      : 'bg-slate-800/60 text-brand-muted hover:bg-slate-800 hover:text-brand-text'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Channel Breakdown */}
          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-3 flex items-center gap-2">
              <Target size={16} className="text-brand-teal" />
              Channel Allocation
            </h4>
            <div className="space-y-2">
              {channelData.map((channel) => (
                <div key={channel.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: channel.color }}
                    />
                    <span className="text-sm text-brand-muted">{channel.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono text-brand-text">
                      ${channel.amount.toLocaleString()}
                    </span>
                    <span className="text-xs text-brand-muted ml-2">
                      ({channel.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Projection */}
          <div className="bg-gradient-to-br from-brand-teal/10 to-transparent rounded-lg p-4 border border-brand-teal/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-brand-teal" />
              <span className="text-xs uppercase tracking-wider text-brand-muted">
                Estimated Annual ROI
              </span>
            </div>
            <div className="text-3xl font-bold text-brand-text">
              ${estimatedROI.toLocaleString()}
            </div>
            <div className="text-sm text-brand-muted mt-1">
              {((estimatedROI / totalBudget) * 100).toFixed(0)}% return on investment
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex flex-col items-center justify-center bg-slate-800/20 rounded-lg p-6 border border-slate-700/50">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={channelData[index].color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(64, 224, 208, 0.3)',
                  borderRadius: '8px',
                  color: '#E2E8F0',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
