import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator: React.FC = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <span className="text-xs font-mono uppercase tracking-wide">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;

