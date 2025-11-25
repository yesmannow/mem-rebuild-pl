import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ROICalculator from './ROICalculator';
import SmartQuoter from './SmartQuoter';

const GrowthEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roi' | 'quoter'>('roi');

  return (
    <div className="min-h-screen bg-brand-dark py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">The Growth Engine</h1>
          <p className="text-brand-muted text-lg">
            ROI modeling & quote generation tools for sales enablement
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-brand-surface/10 rounded-lg p-1 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('roi')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'roi'
                  ? 'bg-brand-teal text-brand-dark'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              ROI Modeler
            </button>
            <button
              onClick={() => setActiveTab('quoter')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'quoter'
                  ? 'bg-brand-teal text-brand-dark'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              Smart Quoter
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'roi' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === 'roi' ? 20 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'roi' ? <ROICalculator /> : <SmartQuoter />}
        </motion.div>
      </div>
    </div>
  );
};

export default GrowthEngine;

