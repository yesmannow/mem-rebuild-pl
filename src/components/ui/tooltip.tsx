import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  variant?: 'default' | 'turquoise' | 'creamsicle';
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({
  content,
  children,
  variant = 'default',
  side = 'top',
  className
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const variants = {
    default: 'bg-cave-bg text-cave-text border-cave-border',
    turquoise: 'bg-turquoise text-cave-bg border-turquoise/20',
    creamsicle: 'bg-creamsicle text-cave-bg border-creamsicle/20',
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
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: side === 'top' ? 5 : -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: side === 'top' ? 5 : -5 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 px-3 py-1.5 text-sm rounded-md border shadow-lg pointer-events-none whitespace-nowrap',
              variants[variant],
              sideClasses[side],
              className
            )}
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                'absolute w-2 h-2 bg-inherit border-inherit transform rotate-45',
                side === 'top' && 'top-full left-1/2 -translate-x-1/2 -mt-1 border-b border-r',
                side === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-t border-l',
                side === 'left' && 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l border-b',
                side === 'right' && 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r border-t'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}