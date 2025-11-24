import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataPoint {
  label: string;
  value: string | number;
  description?: string;
}

interface InteractiveDataOverlayProps {
  data: DataPoint[];
  trigger: 'hover' | 'click';
}

export const InteractiveDataOverlay: React.FC<InteractiveDataOverlayProps> = ({
  data,
  trigger = 'hover',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => trigger === 'hover' && setIsVisible(true)}
      onMouseLeave={() => trigger === 'hover' && setIsVisible(false)}
      onClick={() => trigger === 'click' && setIsVisible(!isVisible)}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-full left-0 mt-4 p-6 bg-[var(--ink-700)] border border-[var(--ink-700)] rounded-lg backdrop-blur-md z-50 min-w-[300px]"
          >
            <div className="space-y-3">
              {data.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-[var(--ink-700)] last:border-0 pb-3 last:pb-0"
                >
                  <div className="font-mono text-xs text-[var(--telemetry-400)] uppercase tracking-wider mb-1">
                    {point.label}
                  </div>
                  <div className="text-2xl font-bold text-[var(--signal-500)] font-display">
                    {point.value}
                  </div>
                  {point.description && (
                    <div className="text-sm text-[var(--parchment-050)]/60 mt-1">
                      {point.description}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
