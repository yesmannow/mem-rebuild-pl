import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Beaker, Target } from 'lucide-react';

interface Experiment {
  id: string;
  name: string;
  budget: number;
  expectedLift: number;
  confidence: number;
}

const ExperimentationBudget: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState<number>(500000);
  const [experimentPercentage, setExperimentPercentage] = useState<number>(15);
  const [experiments, setExperiments] = useState<Experiment[]>([
    { id: '1', name: 'Landing Page A/B Test', budget: 5000, expectedLift: 0.12, confidence: 0.85 },
    { id: '2', name: 'Email Subject Line Test', budget: 3000, expectedLift: 0.08, confidence: 0.90 },
    { id: '3', name: 'Ad Copy Variation', budget: 8000, expectedLift: 0.15, confidence: 0.75 },
  ]);

  const experimentBudget = (totalBudget * experimentPercentage) / 100;
  const allocatedBudget = experiments.reduce((sum, exp) => sum + exp.budget, 0);
  const remainingBudget = experimentBudget - allocatedBudget;

  const projectedImpact = useMemo(() => {
    return experiments.reduce((sum, exp) => {
      const impact = exp.budget * exp.expectedLift * exp.confidence;
      return sum + impact;
    }, 0);
  }, [experiments]);

  return (
    <div className="rounded-2xl border border-brand-teal/20 bg-slate-900/50 backdrop-blur-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/20 border border-brand-teal/30 text-brand-teal">
          <Beaker size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">Innovation & Testing</p>
          <h3 className="text-2xl font-semibold text-brand-text">Experimentation Budget</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-brand-muted mb-2 block">
              Total Marketing Budget ($)
            </label>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              min="0"
              step="10000"
              className="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
            />
          </div>

          <div>
            <label className="text-sm text-brand-muted mb-2 block">
              Experimentation Budget: {experimentPercentage}% (${experimentBudget.toLocaleString()})
            </label>
            <input
              type="range"
              value={experimentPercentage}
              onChange={(e) => setExperimentPercentage(Number(e.target.value))}
              min="5"
              max="30"
              step="1"
              className="w-full"
            />
            <p className="text-xs text-brand-muted mt-1">
              Industry standard: 10-20% for testing and optimization
            </p>
          </div>

          {/* Budget Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-brand-teal/10 to-transparent rounded-lg p-4 border border-brand-teal/30">
              <div className="text-xs uppercase tracking-wider text-brand-muted mb-1">
                Allocated
              </div>
              <div className="text-2xl font-bold text-brand-text">
                ${(allocatedBudget / 1000).toFixed(0)}K
              </div>
            </div>
            <div className={`bg-gradient-to-br rounded-lg p-4 border ${
              remainingBudget >= 0 
                ? 'from-green-500/10 border-green-500/30' 
                : 'from-red-500/10 border-red-500/30'
            }`}>
              <div className="text-xs uppercase tracking-wider text-brand-muted mb-1">
                Remaining
              </div>
              <div className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${(remainingBudget / 1000).toFixed(0)}K
              </div>
            </div>
          </div>

          {/* Projected Impact */}
          <div className="bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Target size={16} className="text-purple-400" />
              <span className="text-xs uppercase tracking-wider text-brand-muted">
                Projected ROI from Tests
              </span>
            </div>
            <div className="text-3xl font-bold text-brand-text">
              ${(projectedImpact / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-brand-muted mt-1">
              {((projectedImpact / allocatedBudget) * 100).toFixed(0)}% expected return
            </div>
          </div>
        </div>

        {/* Experiments List */}
        <div className="space-y-4">
          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-3">Active Experiments</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {experiments.map((exp) => (
                <div
                  key={exp.id}
                  className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-brand-text">{exp.name}</div>
                      <div className="text-xs text-brand-muted mt-1">
                        Budget: ${exp.budget.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <div className="text-xs text-brand-muted">Expected Lift</div>
                      <div className="text-sm font-mono text-brand-text">
                        +{(exp.expectedLift * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-brand-muted">Confidence</div>
                      <div className="text-sm font-mono text-brand-text">
                        {(exp.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 bg-slate-800/60 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-teal to-blue-500"
                      style={{ width: `${exp.confidence * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-2">💡 Testing Best Practices</h4>
            <ul className="text-xs text-brand-muted space-y-1">
              <li>• Run tests for minimum 2 weeks to account for weekly patterns</li>
              <li>• Aim for 95% statistical confidence before declaring winners</li>
              <li>• Test one variable at a time for clear attribution</li>
              <li>• Document learnings and scale successful experiments</li>
              <li>• Reserve 10-20% of budget for continuous testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentationBudget;
