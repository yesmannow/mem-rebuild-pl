import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mouse } from 'lucide-react';

interface ScrollIndicatorProps {
  className?: string;
  variant?: 'chevron' | 'mouse' | 'line';
  label?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  className = '',
  variant = 'chevron',
  label = 'Scroll to explore',
}) => {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth',
    });
  };

  if (variant === 'mouse') {
    return (
      <motion.button
        onClick={handleClick}
        className={`flex flex-col items-center gap-2 text-brand-muted hover:text-brand-teal transition-colors ${className}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-label={label}
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em]">{label}</span>
        <div className="relative w-6 h-10 rounded-full border-2 border-current">
          <motion.div
            className="absolute left-1/2 top-2 w-1 h-2 -ml-0.5 rounded-full bg-current"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.button>
    );
  }

  if (variant === 'line') {
    return (
      <motion.button
        onClick={handleClick}
        className={`flex flex-col items-center gap-3 text-brand-muted hover:text-brand-teal transition-colors ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-label={label}
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em]">{label}</span>
        <div className="relative w-px h-16 bg-gradient-to-b from-transparent via-current to-transparent overflow-hidden">
          <motion.div
            className="absolute inset-x-0 h-8 bg-gradient-to-b from-brand-teal to-transparent"
            animate={{ y: [-32, 64] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.button>
    );
  }

  // Default: chevron variant
  return (
    <motion.button
      onClick={handleClick}
      className={`flex flex-col items-center gap-2 text-brand-muted hover:text-brand-teal transition-colors ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      aria-label={label}
    >
      <span className="text-xs font-mono uppercase tracking-[0.2em]">{label}</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </motion.button>
  );
};

export default ScrollIndicator;
