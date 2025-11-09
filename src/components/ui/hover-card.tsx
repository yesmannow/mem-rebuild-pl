import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface HoverCardProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
}

export function HoverCard({
  children,
  content,
  side = 'top',
  className,
  delay = 100
}: HoverCardProps) {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setVisible(false);
  };

  const sideClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: side === 'top' ? 5 : -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: side === 'top' ? 5 : -5 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute z-50 w-80 bg-cave-bg/95 backdrop-blur-md border border-cave-border rounded-lg shadow-xl p-4 pointer-events-auto',
              sideClasses[side],
              className
            )}
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                'absolute w-3 h-3 bg-cave-bg/95 backdrop-blur-md border border-cave-border transform rotate-45',
                side === 'top' && 'top-full left-1/2 -translate-x-1/2 -mt-1.5 border-t border-r',
                side === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 -mb-1.5 border-b border-l',
                side === 'left' && 'left-full top-1/2 -translate-y-1/2 -ml-1.5 border-l border-b',
                side === 'right' && 'right-full top-1/2 -translate-y-1/2 -mr-1.5 border-r border-t'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}