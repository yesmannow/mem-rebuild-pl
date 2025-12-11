import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BarChart3, Beaker, GitBranch, DollarSign } from 'lucide-react';
import BudgetPlanner from './marketing-simulator/BudgetPlanner';
import HeadcountModeler from './marketing-simulator/HeadcountModeler';
import MediaMixOptimizer from './marketing-simulator/MediaMixOptimizer';
import ExperimentationBudget from './marketing-simulator/ExperimentationBudget';
import PipelineVisualizer from './marketing-simulator/PipelineVisualizer';
import BurnRateCalculator from './marketing-simulator/BurnRateCalculator';

type ActiveTab = 'budget' | 'headcount' | 'mediamix' | 'experiments' | 'pipeline' | 'burnrate';

const MarketingSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('budget');

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'budget', label: 'Budget Planner', icon: <DollarSign size={16} /> },
    { id: 'headcount', label: 'Headcount Model', icon: <Users size={16} /> },
    { id: 'mediamix', label: 'Media Mix', icon: <BarChart3 size={16} /> },
    { id: 'experiments', label: 'Experiments', icon: <Beaker size={16} /> },
    { id: 'pipeline', label: 'Pipeline', icon: <GitBranch size={16} /> },
    { id: 'burnrate', label: 'Burn Rate', icon: <TrendingUp size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">The Lab</p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mt-2">Marketing Simulator</h1>
          <p className="text-brand-muted text-lg mt-2">
            Scenario planning, budget modeling, and pipeline optimization for marketing leaders.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-full p-2 inline-flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-teal text-brand-dark shadow-[0_10px_30px_rgba(64,224,208,0.35)]'
                    : 'text-brand-muted hover:text-brand-text hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          layout
        >
          {activeTab === 'budget' && <BudgetPlanner />}
          {activeTab === 'headcount' && <HeadcountModeler />}
          {activeTab === 'mediamix' && <MediaMixOptimizer />}
          {activeTab === 'experiments' && <ExperimentationBudget />}
          {activeTab === 'pipeline' && <PipelineVisualizer />}
          {activeTab === 'burnrate' && <BurnRateCalculator />}
        </motion.div>
      </div>
    </div>
  );
};

export default MarketingSimulator;
