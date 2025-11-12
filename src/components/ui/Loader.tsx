import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', message, className = '' }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <motion.div
        className={`${sizeMap[size]} relative`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: 'var(--color-primary)',
            borderRightColor: 'var(--color-accent)',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: 'var(--color-accent)',
            borderLeftColor: 'var(--color-primary)',
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
      {message && (
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {message}
        </p>
      )}
      <span className="sr-only">{message || 'Loading...'}</span>
    </div>
  );
};

export default Loader;
