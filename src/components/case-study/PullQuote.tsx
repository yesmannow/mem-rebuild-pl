import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface PullQuoteProps {
  quote: string;
  author?: string;
  visualIdentity?: {
    primaryColor?: string;
  };
  className?: string;
  variant?: 'plain' | 'surface';
}

const PullQuote: React.FC<PullQuoteProps> = ({
  quote,
  author,
  visualIdentity,
  className,
  variant = 'plain',
}) => {
  return (
    <motion.section
      className={cn(
        'py-16 md:py-20',
        variant === 'surface' && 'cs-panel',
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <blockquote
          className="text-2xl md:text-3xl font-bold text-center text-white dark:text-white relative font-clash"
          style={
            visualIdentity?.primaryColor
              ? { color: visualIdentity.primaryColor }
              : undefined
          }
        >
          <span className="text-5xl md:text-6xl absolute -top-4 -left-4 opacity-20">
            "
          </span>
          <span className="relative z-10">{quote}</span>
          <span className="text-5xl md:text-6xl absolute -bottom-8 -right-4 opacity-20">
            "
          </span>
        </blockquote>
        {author && (
          <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
            — {author}
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default PullQuote;

