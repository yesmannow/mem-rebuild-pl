import React from 'react';
import { motion } from 'framer-motion';
import { FinalScore, CompanySetup } from '@/lib/marketing-simulator/types';
import { Trophy, TrendingUp, Target, Award, Download, RotateCcw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface Props {
  finalScore: FinalScore;
  companySetup: CompanySetup;
  onRestart: () => void;
}

const FinalDebrief: React.FC<Props> = ({ finalScore, companySetup, onRestart }) => {
  const gradeColor = {
    'A+': 'text-green-400',
    'A': 'text-green-400',
    'B': 'text-blue-400',
    'C': 'text-yellow-400',
    'D': 'text-orange-400',
    'F': 'text-red-400',
  }[finalScore.grade] || 'text-brand-text';

  const radarData = [
    { category: 'Revenue', value: Math.min(100, (finalScore.finalKPIs.revenue / 1000000) * 100) },
    { category: 'Market Share', value: finalScore.finalKPIs.marketShare },
    { category: 'Brand', value: finalScore.finalKPIs.brandAwareness },
    { category: 'Customer Sat.', value: finalScore.finalKPIs.customerSatisfaction },
    { category: 'ROI', value: Math.min(100, finalScore.finalKPIs.roi / 3) },
  ];

  const scoreBreakdown = [
    { name: 'Market Share', value: finalScore.breakdown.marketShareScore, color: '#40E0D0' },
    { name: 'ROI', value: finalScore.breakdown.roiScore, color: '#FFA500' },
    { name: 'Brand Equity', value: finalScore.breakdown.brandEquityScore, color: '#B0C4DE' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-brand-teal to-brand-teal/50 mb-6">
          <Trophy className="w-12 h-12 text-brand-dark" />
        </div>
        <h1 className="text-5xl font-bold text-brand-text mb-3">Campaign Complete!</h1>
        <p className="text-xl text-brand-muted mb-6">
          {companySetup.companyName} • {companySetup.timeHorizon} Journey
        </p>
        
        <div className="flex items-center justify-center gap-8 mb-8">
          <div>
            <div className="text-sm text-brand-muted mb-1">Final Grade</div>
            <div className={`text-6xl font-bold ${gradeColor}`}>{finalScore.grade}</div>
          </div>
          <div className="w-px h-20 bg-brand-teal/20" />
          <div>
            <div className="text-sm text-brand-muted mb-1">Strategy Score</div>
            <div className="text-6xl font-bold text-brand-teal">
              {finalScore.strategyScore.toLocaleString()}
            </div>
          </div>
          <div className="w-px h-20 bg-brand-teal/20" />
          <div>
            <div className="text-sm text-brand-muted mb-1">Percentile</div>
            <div className="text-6xl font-bold text-brand-text">{finalScore.percentile}%</div>
          </div>
        </div>
      </motion.div>

      {/* Final KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {[
          { label: 'Revenue', value: `$${finalScore.finalKPIs.revenue.toLocaleString()}`, icon: <TrendingUp /> },
          { label: 'Profit', value: `$${finalScore.finalKPIs.profit.toLocaleString()}`, icon: <TrendingUp /> },
          { label: 'Market Share', value: `${finalScore.finalKPIs.marketShare.toFixed(1)}%`, icon: <Target /> },
          { label: 'ROI', value: `${finalScore.finalKPIs.roi.toFixed(0)}%`, icon: <Award /> },
          { label: 'Brand Awareness', value: `${finalScore.finalKPIs.brandAwareness.toFixed(0)}%`, icon: <Trophy /> },
        ].map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-xl p-4 text-center"
          >
            <div className="flex justify-center mb-2 text-brand-teal">{kpi.icon}</div>
            <div className="text-xs text-brand-muted mb-1">{kpi.label}</div>
            <div className="text-xl font-bold text-brand-text">{kpi.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Performance Radar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-xl p-6"
        >
          <h3 className="text-2xl font-bold text-brand-text mb-6">Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(64, 224, 208, 0.2)" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94A3B8' }} />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#40E0D0"
                fill="#40E0D0"
                fillOpacity={0.3}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(64, 224, 208, 0.3)',
                  borderRadius: '8px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-xl p-6"
        >
          <h3 className="text-2xl font-bold text-brand-text mb-6">Score Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(64, 224, 208, 0.1)" />
              <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94A3B8' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(64, 224, 208, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {scoreBreakdown.map((entry, index) => (
                  <rect key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Strategic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <Award size={20} />
            Strengths
          </h3>
          <ul className="space-y-2">
            {finalScore.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-brand-muted">
                <span className="text-green-400 mt-1">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/30 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <Target size={20} />
            Areas to Improve
          </h3>
          <ul className="space-y-2">
            {finalScore.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start gap-2 text-brand-muted">
                <span className="text-yellow-400 mt-1">!</span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-brand-teal/10 to-transparent border border-brand-teal/30 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-brand-teal mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Recommendations
          </h3>
          <ul className="space-y-2">
            {finalScore.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-brand-muted">
                <span className="text-brand-teal mt-1">→</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-4"
      >
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-8 py-4 bg-slate-800 text-brand-text font-bold rounded-lg hover:bg-slate-700 transition-all"
        >
          <RotateCcw size={20} />
          Play Again
        </button>
        <button
          className="flex items-center gap-2 px-8 py-4 bg-brand-teal text-brand-dark font-bold rounded-lg hover:shadow-[0_0_40px_rgba(64,224,208,0.6)] transition-all"
          onClick={() => window.print()}
        >
          <Download size={20} />
          Download Report
        </button>
      </motion.div>
    </div>
  );
};

export default FinalDebrief;
