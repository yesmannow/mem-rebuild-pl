import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const BurnRateCalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(150000);
  const [monthlyMarketingSpend, setMonthlyMarketingSpend] = useState<number>(45000);
  const [monthlyCAC, setMonthlyCAC] = useState<number>(500);
  const [averageLTV, setAverageLTV] = useState<number>(2500);
  const [currentCash, setCurrentCash] = useState<number>(500000);
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState<number>(10);

  const { 
    burnRate, 
    runway, 
    paybackPeriod, 
    ltvCacRatio, 
    breakEvenMonth,
    projectionData,
    isHealthy 
  } = useMemo(() => {
    const burn = monthlyMarketingSpend - (monthlyRevenue * 0.3); // Assuming 30% comes from marketing
    const runwayMonths = burn > 0 ? Math.floor(currentCash / burn) : Infinity;
    const payback = monthlyCAC > 0 ? averageLTV / (monthlyRevenue / 30) : 0; // Simplified payback in days
    const ratio = monthlyCAC > 0 ? averageLTV / monthlyCAC : 0;
    
    // Project future months
    const projections = [];
    let cash = currentCash;
    let revenue = monthlyRevenue;
    let spend = monthlyMarketingSpend;
    
    for (let month = 0; month <= 12; month++) {
      const netCash = revenue * 0.3 - spend; // Net from marketing
      cash += netCash;
      
      projections.push({
        month: `M${month}`,
        cash: Math.round(cash),
        revenue: Math.round(revenue),
        spend: Math.round(spend),
        net: Math.round(netCash),
      });
      
      // Grow for next month
      revenue *= (1 + monthlyGrowthRate / 100);
      spend *= (1 + monthlyGrowthRate / 100);
    }
    
    const breakEven = projections.findIndex(p => p.net >= 0);
    const healthy = ratio >= 3 && burn < currentCash / 6;
    
    return {
      burnRate: burn,
      runway: runwayMonths,
      paybackPeriod: payback,
      ltvCacRatio: ratio,
      breakEvenMonth: breakEven > 0 ? breakEven : null,
      projectionData: projections,
      isHealthy: healthy,
    };
  }, [monthlyRevenue, monthlyMarketingSpend, monthlyCAC, averageLTV, currentCash, monthlyGrowthRate]);

  return (
    <div className="rounded-2xl border border-brand-teal/20 bg-slate-900/50 backdrop-blur-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/20 border border-brand-teal/30 text-brand-teal">
          <TrendingUp size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">Financial Health</p>
          <h3 className="text-2xl font-semibold text-brand-text">Burn Rate & Payback</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-brand-muted mb-2 block">
                Monthly Revenue ($)
              </label>
              <input
                type="number"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                min="0"
                step="10000"
                className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
              />
            </div>
            <div>
              <label className="text-sm text-brand-muted mb-2 block">
                Marketing Spend ($)
              </label>
              <input
                type="number"
                value={monthlyMarketingSpend}
                onChange={(e) => setMonthlyMarketingSpend(Number(e.target.value))}
                min="0"
                step="5000"
                className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
              />
            </div>
            <div>
              <label className="text-sm text-brand-muted mb-2 block">
                CAC ($)
              </label>
              <input
                type="number"
                value={monthlyCAC}
                onChange={(e) => setMonthlyCAC(Number(e.target.value))}
                min="0"
                step="50"
                className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
              />
            </div>
            <div>
              <label className="text-sm text-brand-muted mb-2 block">
                LTV ($)
              </label>
              <input
                type="number"
                value={averageLTV}
                onChange={(e) => setAverageLTV(Number(e.target.value))}
                min="0"
                step="100"
                className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-brand-muted mb-2 block">
              Current Cash Reserve ($)
            </label>
            <input
              type="number"
              value={currentCash}
              onChange={(e) => setCurrentCash(Number(e.target.value))}
              min="0"
              step="50000"
              className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            />
          </div>

          <div>
            <label className="text-sm text-brand-muted mb-2 block">
              Monthly Growth Rate: {monthlyGrowthRate}%
            </label>
            <input
              type="range"
              value={monthlyGrowthRate}
              onChange={(e) => setMonthlyGrowthRate(Number(e.target.value))}
              min="0"
              max="30"
              step="1"
              className="w-full"
            />
          </div>

          {/* Key Metrics */}
          <div className="space-y-3">
            <div className={`rounded-lg p-4 border ${
              burnRate < 0 
                ? 'bg-gradient-to-br from-green-500/10 border-green-500/30' 
                : 'bg-gradient-to-br from-red-500/10 border-red-500/30'
            }`}>
              <div className="text-xs uppercase tracking-wider text-brand-muted mb-1">
                Monthly Burn Rate
              </div>
              <div className={`text-3xl font-bold ${burnRate < 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${Math.abs(burnRate / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-brand-muted mt-1">
                {burnRate < 0 ? 'Profitable 🎉' : `${runway === Infinity ? '∞' : runway} months runway`}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-lg p-3 border ${
                ltvCacRatio >= 3 
                  ? 'bg-gradient-to-br from-green-500/10 border-green-500/30' 
                  : 'bg-gradient-to-br from-yellow-500/10 border-yellow-500/30'
              }`}>
                <div className="flex items-center gap-1 mb-1">
                  {ltvCacRatio >= 3 ? (
                    <CheckCircle size={14} className="text-green-400" />
                  ) : (
                    <AlertCircle size={14} className="text-yellow-400" />
                  )}
                  <span className="text-xs uppercase tracking-wider text-brand-muted">
                    LTV:CAC
                  </span>
                </div>
                <div className="text-2xl font-bold text-brand-text">
                  {ltvCacRatio.toFixed(1)}:1
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-lg p-3 border border-blue-500/30">
                <div className="text-xs uppercase tracking-wider text-brand-muted mb-1">
                  Payback
                </div>
                <div className="text-2xl font-bold text-brand-text">
                  {paybackPeriod.toFixed(0)}d
                </div>
              </div>
            </div>
          </div>

          {/* Health Status */}
          <div className={`rounded-lg p-3 border ${
            isHealthy 
              ? 'bg-gradient-to-br from-green-500/10 border-green-500/30' 
              : 'bg-gradient-to-br from-yellow-500/10 border-yellow-500/30'
          }`}>
            <div className="flex items-center gap-2">
              {isHealthy ? (
                <CheckCircle size={16} className="text-green-400" />
              ) : (
                <AlertCircle size={16} className="text-yellow-400" />
              )}
              <span className="text-sm font-semibold text-brand-text">
                {isHealthy ? 'Healthy Metrics ✅' : 'Needs Attention ⚠️'}
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-1">
              {isHealthy 
                ? 'LTV:CAC ratio > 3:1 and sustainable burn rate' 
                : 'Consider optimizing CAC or extending runway'}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-4">
          <div className="bg-slate-800/20 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-4">12-Month Cash Projection</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
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
                <ReferenceLine y={0} stroke="#EF4444" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="cash"
                  stroke="#40E0D0"
                  strokeWidth={2}
                  dot={{ fill: '#40E0D0', r: 3 }}
                  name="Cash Reserve"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 3 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-2">💡 Financial Health Tips</h4>
            <ul className="text-xs text-brand-muted space-y-1">
              <li>• Target LTV:CAC ratio of 3:1 or higher</li>
              <li>• Maintain 6-12 months runway minimum</li>
              <li>• Payback period under 12 months is ideal</li>
              <li>• Monitor burn rate weekly and adjust spend accordingly</li>
              <li>• Plan fundraising 6+ months before runway expires</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurnRateCalculator;
