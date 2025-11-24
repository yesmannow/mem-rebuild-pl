import React from 'react';
import { motion } from 'framer-motion';

/**
 * SignalTape - Persistent footer marquee with live metrics
 * Replaces purple gradient mesh with data-driven signal display
 */
interface Metric {
  label: string;
  value: string;
}

const metrics: Metric[] = [
  { label: 'Projects Shipped', value: '200+' },
  { label: 'Automations Live', value: '100+' },
  { label: 'Revenue Influenced', value: '$50M+' },
  { label: 'Systems Built', value: '100+' },
];

const SignalTape: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#006d77] border-t border-[#5a7a7d] py-4">
      <motion.div
        className="flex gap-12 font-mono text-xs uppercase tracking-wider"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
      >
        {/* Duplicate for seamless loop */}
        {[...metrics, ...metrics].map((metric, index) => (
          <div
            key={index}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <span className="text-[#83c5be] font-bold">{metric.value}</span>
            <span className="text-[#edf6f9]/40">{metric.label}</span>
            <span className="text-[#5a7a7d]">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SignalTape;

