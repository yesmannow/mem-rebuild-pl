import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { cn } from '../lib/utils';

interface AwardsRowProps {
  className?: string;
}

const AwardsRow: React.FC<AwardsRowProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        'py-8 px-6 border-t border-b border-brand-muted/10',
        'bg-gradient-to-r from-brand-surface/30 via-brand-surface/20 to-brand-surface/30',
        className
      )}
    >
      <div className="max-w-4xl mx-auto flex items-center gap-4 justify-center flex-wrap">
        <div className="flex items-center gap-3 text-brand-muted">
          <Award className="w-5 h-5 text-brand-teal/60" />
          <span className="text-sm font-medium uppercase tracking-wide">
            Recognition:
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="/images/awards/gold-key.svg"
            alt="Gold Key Award"
            className="w-8 h-8 opacity-80 grayscale hover:grayscale-0 transition-all duration-300"
          />
          <span className="text-brand-text/70 text-sm">
            Scholastic Art & Writing Award - <span className="text-brand-teal/80 font-medium">Gold Key</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AwardsRow;

