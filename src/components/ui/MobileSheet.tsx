import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

/**
 * Mobile-optimized Sheet component inspired by Shadcn UI and ReactBits patterns
 * Full-screen on mobile, drawer on tablet/desktop
 */
export const MobileSheet: React.FC<MobileSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  side = 'bottom',
  className,
}) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const sideVariants = {
    top: {
      initial: { y: '-100%' },
      animate: { y: 0 },
      exit: { y: '-100%' },
      className: 'inset-x-0 top-0 rounded-b-3xl',
    },
    bottom: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
      className: 'inset-x-0 bottom-0 rounded-t-3xl',
    },
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
      className: 'inset-y-0 left-0 rounded-r-3xl',
    },
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
      className: 'inset-y-0 right-0 rounded-l-3xl',
    },
  };

  const variant = sideVariants[side];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={variant.initial}
            animate={variant.animate}
            exit={variant.exit}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            className={cn(
              'fixed z-[101] bg-[var(--ink-900)] border border-[var(--ink-700)] shadow-2xl',
              // Mobile: Full screen
              'w-full h-full',
              // Tablet/Desktop: Constrained
              'md:w-auto md:h-auto',
              side === 'bottom' && 'md:max-h-[80vh] md:max-w-lg',
              side === 'top' && 'md:max-h-[80vh] md:max-w-lg',
              side === 'left' && 'md:w-96 md:h-full',
              side === 'right' && 'md:w-96 md:h-full',
              variant.className,
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[var(--ink-700)]">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[var(--ink-800)] text-[var(--parchment-050)]/70 hover:text-white transition-colors touch-target"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto h-full md:max-h-[calc(80vh-80px)] safe-area-inset">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

