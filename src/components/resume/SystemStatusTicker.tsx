/**
 * SystemStatusTicker - Animated status ticker component
 * Displays "Available for Consulting // Next Slot: Oct 2025"
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export const SystemStatusTicker: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 backdrop-blur border border-brand-teal/30 rounded-lg"
    >
      <Activity size={14} className="text-brand-teal animate-pulse" />
      <span className="text-xs font-mono text-brand-text">
        <span className="text-brand-teal">Available for Consulting</span>
        <span className="text-brand-muted mx-2">//</span>
        <span className="text-brand-muted">Next Slot: Oct 2025</span>
      </span>
    </motion.div>
  );
};
