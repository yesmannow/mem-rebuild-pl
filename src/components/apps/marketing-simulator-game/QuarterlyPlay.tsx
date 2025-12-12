import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CompanySetup, Quarter, SelectedTactic, Tactic, WildcardEvent } from '@/lib/marketing-simulator/types';
import { MARKETING_TACTICS } from '@/lib/marketing-simulator/tacticsLibrary';
import { Target, DollarSign, Clock, TrendingUp, Zap } from 'lucide-react';

interface Props {
  quarter: Quarter;
  companySetup: CompanySetup;
  previousResults?: any;
  availableBudget: number;
  onComplete: (selectedTactics: SelectedTactic[]) => void;
}

const QuarterlyPlay: React.FC<Props> = ({ quarter, companySetup, previousResults, availableBudget, onComplete }) => {
  const [selectedTactics, setSelectedTactics] = useState<SelectedTactic[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'seo' | 'paid-ads' | 'content' | 'social' | 'events' | 'pr'>('all');

  // Filter tactics based on industry and view mode
  const filteredTactics = useMemo(() => {
    let filtered = MARKETING_TACTICS.filter(t => {
      const multiplier = t.industryMultipliers[companySetup.industry];
      return multiplier > 0.5; // Only show tactics that are somewhat effective for this industry
    });

    if (viewMode !== 'all') {
      filtered = filtered.filter(t => t.category === viewMode);
    }

    return filtered;
  }, [viewMode, companySetup.industry]);

  const totalSpend = selectedTactics.reduce((sum, t) => sum + t.spend, 0);
  const totalHours = selectedTactics.reduce((sum, t) => sum + t.timeInvested, 0);
  const remainingBudget = availableBudget - totalSpend;

  const handleTacticSelect = (tactic: Tactic) => {
    const existing = selectedTactics.find(t => t.tacticId === tactic.id);
    if (existing) {
      setSelectedTactics(selectedTactics.filter(t => t.tacticId !== tactic.id));
    } else {
      setSelectedTactics([
        ...selectedTactics,
        {
          tacticId: tactic.id,
          spend: tactic.baseCost * companySetup.totalBudget / 100000, // Scale to budget
          timeInvested: tactic.teamHours,
        },
      ]);
    }
  };

  const handleSpendChange = (tacticId: string, newSpend: number) => {
    setSelectedTactics(selectedTactics.map(t => 
      t.tacticId === tacticId ? { ...t, spend: newSpend } : t
    ));
  };

  const categories = [
    { id: 'all', label: 'All Tactics', icon: <Target size={16} /> },
    { id: 'seo', label: 'SEO', icon: <TrendingUp size={16} /> },
    { id: 'paid-ads', label: 'Paid Ads', icon: <Zap size={16} /> },
    { id: 'content', label: 'Content', icon: <Target size={16} /> },
    { id: 'social', label: 'Social', icon: <Target size={16} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-brand-teal/20 to-transparent border border-brand-teal/30 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-text">{quarter} Strategy Session</h2>
              <p className="text-brand-muted mt-1">
                Select your marketing tactics for this quarter
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-brand-muted">Budget Remaining</div>
              <div className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-red-400' : 'text-brand-teal'}`}>
                ${remainingBudget.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setViewMode(cat.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              viewMode === cat.id
                ? 'bg-brand-teal text-brand-dark shadow-lg'
                : 'bg-slate-800/60 text-brand-muted hover:bg-slate-800 hover:text-brand-text'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tactics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredTactics.map(tactic => {
          const isSelected = selectedTactics.some(t => t.tacticId === tactic.id);
          const selected = selectedTactics.find(t => t.tacticId === tactic.id);
          const industryMultiplier = tactic.industryMultipliers[companySetup.industry];
          const effectiveness = industryMultiplier > 1.2 ? 'High' : industryMultiplier > 0.8 ? 'Medium' : 'Low';
          
          return (
            <motion.div
              key={tactic.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-slate-900/70 backdrop-blur-lg border rounded-xl p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-brand-teal shadow-[0_0_20px_rgba(64,224,208,0.3)]'
                  : 'border-brand-teal/20 hover:border-brand-teal/40'
              }`}
              onClick={() => handleTacticSelect(tactic)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-brand-text">{tactic.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  effectiveness === 'High' ? 'bg-green-500/20 text-green-300' :
                  effectiveness === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {effectiveness}
                </span>
              </div>
              
              <p className="text-sm text-brand-muted mb-4">{tactic.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1 text-brand-muted">
                  <DollarSign size={12} />
                  <span>${(tactic.baseCost * companySetup.totalBudget / 100000).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-brand-muted">
                  <Clock size={12} />
                  <span>{tactic.teamHours}h</span>
                </div>
                <div className="flex items-center gap-1 text-brand-muted">
                  <TrendingUp size={12} />
                  <span>{(tactic.baseROI * 100).toFixed(0)}% ROI</span>
                </div>
                {tactic.compounding && (
                  <div className="text-brand-teal text-xs">
                    🔄 Compounds
                  </div>
                )}
              </div>

              {isSelected && selected && (
                <div className="mt-4 pt-4 border-t border-brand-teal/20">
                  <label className="text-xs text-brand-muted block mb-1">Adjust Spend</label>
                  <input
                    type="range"
                    min={tactic.baseCost * 0.5 * companySetup.totalBudget / 100000}
                    max={tactic.baseCost * 3 * companySetup.totalBudget / 100000}
                    value={selected.spend}
                    onChange={e => handleSpendChange(tactic.id, Number(e.target.value))}
                    onClick={e => e.stopPropagation()}
                    className="w-full"
                  />
                  <div className="text-xs text-brand-text mt-1">${selected.spend.toLocaleString()}</div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Summary & Continue */}
      <div className="sticky bottom-0 bg-slate-950/95 backdrop-blur-lg border-t border-brand-teal/20 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-sm text-brand-muted">Tactics Selected</div>
              <div className="text-2xl font-bold text-brand-text">{selectedTactics.length}</div>
            </div>
            <div>
              <div className="text-sm text-brand-muted">Total Spend</div>
              <div className="text-2xl font-bold text-brand-text">${totalSpend.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-brand-muted">Team Hours</div>
              <div className="text-2xl font-bold text-brand-text">{totalHours}h</div>
            </div>
          </div>
          
          <button
            onClick={() => onComplete(selectedTactics)}
            disabled={selectedTactics.length === 0 || remainingBudget < 0}
            className="px-8 py-3 bg-brand-teal text-brand-dark font-bold rounded-lg hover:shadow-[0_0_30px_rgba(64,224,208,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Execute {quarter} Strategy →
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuarterlyPlay;
