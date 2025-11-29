import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

interface AppPreviewModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

const AppPreviewModal: React.FC<AppPreviewModalProps> = ({ url, title, onClose }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        className="w-full h-full sm:w-full sm:h-auto sm:max-w-5xl sm:rounded-3xl border-0 sm:border border-slate-800 bg-slate-950/90 shadow-2xl flex flex-col"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-3 border-b border-slate-800/60 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-muted hidden sm:block">Live App Preview</p>
            <h3 className="text-base sm:text-lg font-semibold text-brand-text truncate">{title}</h3>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-slate-700/70 px-2 sm:px-3 py-1.5 sm:py-1 text-xs font-semibold text-brand-text hover:border-brand-teal/70 touch-target"
            >
              <span className="hidden sm:inline">Open in new tab</span>
              <span className="sm:hidden">Open</span>
              <ExternalLink size={14} />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-brand-text hover:bg-slate-900/70 touch-target"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-2 sm:p-6">
          <iframe
            src={url}
            title={title}
            className="h-full w-full sm:rounded-2xl border-0 sm:border border-slate-800/70 bg-black"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default AppPreviewModal;
