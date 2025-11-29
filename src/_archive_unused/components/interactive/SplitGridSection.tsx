import React from 'react';
import { motion } from 'framer-motion';

interface SplitGridSectionProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  reverse?: boolean;
}

export const SplitGridSection: React.FC<SplitGridSectionProps> = ({
  leftContent,
  rightContent,
  reverse = false,
}) => {
  return (
    <section className="py-24 bg-[var(--ink-900)]">
      <div className="container mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}>
          <motion.div
            className={`${reverse ? 'lg:col-start-2' : ''}`}
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            {leftContent}
          </motion.div>
          
          <motion.div
            className={`${reverse ? 'lg:col-start-1 lg:row-start-1' : ''}`}
            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          >
            {rightContent}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
