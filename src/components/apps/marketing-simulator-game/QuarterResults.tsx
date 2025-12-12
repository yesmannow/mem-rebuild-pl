import React from 'react';
import { motion } from 'framer-motion';
import { QuarterResults as QuarterResultsType, Quarter } from '@/lib/marketing-simulator/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Award } from 'lucide-react';

interface Props {
  quarter: Quarter;
  results: QuarterResultsType;
  previousResults?: QuarterResultsType;
  onContinue: () => void;
}

const QuarterResults: React.FC<Props> = ({ quarter, results, previousResults, onContinue }) => {
  const revenueChange = previousResults 
    ? ((results.revenue - previousResults.revenue) / previousResults.revenue) * 100
    : 0;
  
  const profitChange = previousResults
    ? ((results.profit - previousResults.profit) / previousResults.profit) * 100
    : 0;

  const marketShareChange = previousResults
    ? results.marketShare - previousResults.marketShare
    : 0;

  const trafficData = [
    { name: 'Organic', value: results.trafficSources.organic, color: '#40E0D0' },
    { name: 'Paid', value: results.trafficSources.paid, color: '#FFA500' },
    { name: 'Social', value: results.trafficSources.social, color: '#B0C4DE' },
    { name: 'Referral', value: results.trafficSources.referral, color: '#88ABF2' },
    { name: 'Email', value: results.trafficSources.email, color: '#EC4899' },
  ];

  const kpiCards = [
    {
      icon: <DollarSign className="text-brand-teal" />,
      label: 'Revenue',
      value: `$${results.revenue.toLocaleString()}`,
      change: revenueChange,
      color: 'teal'
    },
    {
      icon: <TrendingUp className="text-green-400" />,
      label: 'Profit',
      value: `$${results.profit.toLocaleString()}`,
      change: profitChange,
      color: 'green'
    },
    {
      icon: <Target className="text-blue-400" />,
      label: 'Market Share',
      value: `${results.marketShare.toFixed(1)}%`,
      change: marketShareChange,
      color: 'blue'
    },
    {
      icon: <Users className="text-purple-400" />,
      label: 'Customer Sat.',
      value: `${results.customerSatisfaction.toFixed(0)}%`,
      change: 0,
      color: 'purple'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-block px-6 py-2 bg-brand-teal/20 border border-brand-teal rounded-full mb-4">
          <span className="text-brand-teal font-bold">{quarter} Results</span>
        </div>
        <h2 className="text-4xl font-bold text-brand-text mb-2">Performance Summary</h2>
        <p className="text-brand-muted">Here's how your strategy performed this quarter</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800/60 flex items-center justify-center">
                {kpi.icon}
              </div>
              {kpi.change !== 0 && (
                <div className={`flex items-center gap-1 text-xs font-semibold ${
                  kpi.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {kpi.change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(kpi.change).toFixed(1)}%
                </div>
              )}
            </div>
            <div className="text-sm text-brand-muted mb-1">{kpi.label}</div>
            <div className="text-2xl font-bold text-brand-text">{kpi.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-brand-text mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={trafficData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {trafficData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => value.toLocaleString()}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(64, 224, 208, 0.3)',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Brand Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-brand-text mb-4">Brand Health</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-brand-muted">Brand Awareness</span>
                <span className="text-sm font-semibold text-brand-text">
                  {results.brandAwareness.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${results.brandAwareness}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-brand-teal to-brand-teal/60"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-brand-muted">Customer Satisfaction</span>
                <span className="text-sm font-semibold text-brand-text">
                  {results.customerSatisfaction.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${results.customerSatisfaction}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-gradient-to-r from-green-400 to-green-400/60"
                />
              </div>
            </div>

            {results.hiddenMetrics && (
              <>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-brand-muted">Brand Equity (Hidden)</span>
                    <span className="text-sm font-semibold text-brand-text">
                      {results.hiddenMetrics.brandEquity.toFixed(0)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${results.hiddenMetrics.brandEquity}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full bg-gradient-to-r from-purple-400 to-purple-400/60"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-brand-muted">Team Morale (Hidden)</span>
                    <span className="text-sm font-semibold text-brand-text">
                      {results.hiddenMetrics.teamMorale.toFixed(0)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${results.hiddenMetrics.teamMorale}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-400/60"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Key Insights */}
      {results.insights && results.insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-brand-teal/10 to-transparent border border-brand-teal/30 rounded-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-brand-text mb-4 flex items-center gap-2">
            <Award className="text-brand-teal" />
            Key Insights
          </h3>
          <ul className="space-y-2">
            {results.insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2 text-brand-muted">
                <span className="text-brand-teal mt-1">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Continue Button */}
      <div className="text-center">
        <button
          onClick={onContinue}
          className="px-12 py-4 bg-brand-teal text-brand-dark font-bold text-lg rounded-lg hover:shadow-[0_0_40px_rgba(64,224,208,0.6)] transition-all"
        >
          Continue to Next Quarter →
        </button>
      </div>
    </div>
  );
};

export default QuarterResults;
