import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, TrendingUp } from 'lucide-react';
import ROICalculator from './growth-engine/ROICalculator';
import SmartQuote from './growth-engine/SmartQuote';

type ActiveTab = 'roi' | 'quote';

const GrowthEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('roi');

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'roi', label: 'ROI Modeler', icon: <TrendingUp size={16} /> },
    { id: 'quote', label: 'Smart Quote', icon: <Cpu size={16} /> },
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
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mt-2">Growth Engine</h1>
          <p className="text-brand-muted text-lg mt-2">
            Interactive ROI modeler & CPQ system built on the Ocean Pearl design language.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-full p-2 inline-flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-teal text-brand-dark shadow-[0_10px_30px_rgba(64,224,208,0.35)]'
                    : 'text-brand-muted hover:text-brand-text hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'roi' ? -12 : 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          layout
        >
          {activeTab === 'roi' ? <ROICalculator /> : <SmartQuote />}
        </motion.div>
      </div>
    </div>
  );
};

export default GrowthEngine;

