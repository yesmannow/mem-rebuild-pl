import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActivityLog {
  id: string;
  action: string;
  points: number;
  timestamp: Date;
}

interface ScoringRules {
  emailOpen: number;
  emailClick: number;
  pricingVisit: number;
  adClick: number;
  formSubmit: number;
  demoRequest: number;
  ghosted: number;
}

const LeadScoreLab: React.FC = () => {
  const [leadScore, setLeadScore] = useState(0);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [scoringRules, setScoringRules] = useState<ScoringRules>({
    emailOpen: 5,
    emailClick: 10,
    pricingVisit: 15,
    adClick: 8,
    formSubmit: 20,
    demoRequest: 30,
    ghosted: -5,
  });
  const [showMQL, setShowMQL] = useState(false);
  const [showSQL, setShowSQL] = useState(false);

  const handleAction = (action: string, points: number) => {
    const newScore = Math.max(0, Math.min(100, leadScore + points));
    setLeadScore(newScore);

    const newActivity: ActivityLog = {
      id: Date.now().toString(),
      action,
      points,
      timestamp: new Date(),
    };

    setActivityLog((prev) => [newActivity, ...prev].slice(0, 10));

    // Trigger badges
    if (newScore >= 50 && !showMQL) {
      setShowMQL(true);
      setTimeout(() => setShowMQL(false), 3000);
    }
    if (newScore >= 100 && !showSQL) {
      setShowSQL(true);
      setTimeout(() => setShowSQL(false), 3000);
    }
  };

  const handleRuleChange = (key: keyof ScoringRules, value: number) => {
    setScoringRules((prev) => ({ ...prev, [key]: value }));
  };

  const resetScore = () => {
    setLeadScore(0);
    setActivityLog([]);
    setShowMQL(false);
    setShowSQL(false);
  };

  // Calculate thermometer color
  const getThermometerColor = () => {
    if (leadScore < 25) return 'from-blue-500 to-blue-600';
    if (leadScore < 50) return 'from-teal-400 to-teal-500';
    if (leadScore < 75) return 'from-orange-400 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  const getThermometerBgColor = () => {
    if (leadScore < 25) return 'bg-blue-500';
    if (leadScore < 50) return 'bg-teal-400';
    if (leadScore < 75) return 'bg-orange-400';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-brand-dark py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Lead Score Lab</h1>
          <p className="text-brand-muted text-lg">
            Gamified CRM simulator - Define scoring rules and watch lead temperature rise
          </p>
        </motion.div>

        {/* Badge Animations */}
        <AnimatePresence>
          {showMQL && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-gradient-to-r from-brand-teal to-brand-orange text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl">
                🎯 MQL ACHIEVED! (50+ Points)
              </div>
            </motion.div>
          )}
          {showSQL && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl animate-pulse">
                🚀 SQL CONVERSION! (100 Points)
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Config Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-6 border border-brand-teal/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Scoring Rules</h2>
            <div className="space-y-4">
              {Object.entries(scoringRules).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm text-brand-muted mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleRuleChange(key as keyof ScoringRules, parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-2 bg-brand-dark border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={resetScore}
              className="mt-6 w-full px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/80 transition-colors font-semibold"
            >
              Reset Score
            </button>
          </motion.div>

          {/* Center: Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-6 border border-brand-teal/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Simulate Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => handleAction('Email Opened', scoringRules.emailOpen)}
                className="w-full px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-white transition-all"
              >
                📧 Email Opened (+{scoringRules.emailOpen}pts)
              </button>
              <button
                onClick={() => handleAction('Email Clicked', scoringRules.emailClick)}
                className="w-full px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-white transition-all"
              >
                🔗 Email Clicked (+{scoringRules.emailClick}pts)
              </button>
              <button
                onClick={() => handleAction('Pricing Page Visit', scoringRules.pricingVisit)}
                className="w-full px-4 py-3 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/50 rounded-lg text-white transition-all"
              >
                💰 Pricing Visit (+{scoringRules.pricingVisit}pts)
              </button>
              <button
                onClick={() => handleAction('Ad Clicked', scoringRules.adClick)}
                className="w-full px-4 py-3 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/50 rounded-lg text-white transition-all"
              >
                📢 Ad Clicked (+{scoringRules.adClick}pts)
              </button>
              <button
                onClick={() => handleAction('Form Submitted', scoringRules.formSubmit)}
                className="w-full px-4 py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded-lg text-white transition-all"
              >
                📝 Form Submitted (+{scoringRules.formSubmit}pts)
              </button>
              <button
                onClick={() => handleAction('Demo Requested', scoringRules.demoRequest)}
                className="w-full px-4 py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded-lg text-white transition-all"
              >
                🎯 Demo Requested (+{scoringRules.demoRequest}pts)
              </button>
              <button
                onClick={() => handleAction('Lead Ghosted', scoringRules.ghosted)}
                className="w-full px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-white transition-all"
              >
                👻 Lead Ghosted ({scoringRules.ghosted}pts)
              </button>
            </div>
          </motion.div>

          {/* Right: Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-6 border border-brand-teal/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Lead Temperature</h2>

            {/* Thermometer */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-16 h-80 bg-brand-surface/30 rounded-full border-2 border-brand-teal/30 overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${leadScore}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`absolute bottom-0 w-full bg-gradient-to-t ${getThermometerColor()} rounded-full`}
                />
              </div>
              <div className="mt-4 text-center">
                <div className={`text-5xl font-bold ${getThermometerBgColor()}`}>
                  {leadScore}
                </div>
                <div className="text-brand-muted text-sm mt-2">Points</div>
              </div>
            </div>

            {/* Status Badges */}
            <div className="space-y-2 mb-6">
              {leadScore >= 50 && (
                <div className="bg-brand-teal/20 border border-brand-teal/50 rounded-lg p-3 text-center">
                  <span className="text-brand-teal font-semibold">✓ MQL Qualified</span>
                </div>
              )}
              {leadScore >= 100 && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
                  <span className="text-red-400 font-semibold">✓ SQL Ready</span>
                </div>
              )}
            </div>

            {/* Activity Log */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Recent Activity</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <AnimatePresence>
                  {activityLog.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-brand-dark/50 rounded-lg p-2 text-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white">{activity.action}</span>
                        <span
                          className={`font-semibold ${
                            activity.points > 0 ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {activity.points > 0 ? '+' : ''}
                          {activity.points}pts
                        </span>
                      </div>
                      <div className="text-xs text-brand-muted mt-1">
                        {activity.timestamp.toLocaleTimeString()}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {activityLog.length === 0 && (
                  <div className="text-center text-brand-muted py-4">
                    No activity yet. Start simulating actions!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LeadScoreLab;

