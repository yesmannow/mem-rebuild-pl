import React from 'react';
import { motion } from 'framer-motion';

export interface HeroBlockProps {
  title: string;
  impact: string;
  stat: {
    label: string;
    value: string;
  };
  gradient?: string;
  emoji?: string;
}

const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  impact,
  stat,
  gradient,
  emoji,
}) => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      {gradient && (
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: gradient }}
        />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Emoji */}
          {emoji && (
            <motion.div
              className="text-6xl md:text-7xl mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {emoji}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {/* Impact statement */}
          <motion.p
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {impact}
          </motion.p>

          {/* Stat highlight */}
          <motion.div
            className="inline-flex items-center gap-4 px-6 py-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBlock;

