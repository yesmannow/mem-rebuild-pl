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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-950/90 shadow-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-800/60 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">Live App Preview</p>
            <h3 className="text-lg font-semibold text-brand-text">{title}</h3>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-slate-700/70 px-3 py-1 text-xs font-semibold text-brand-text hover:border-brand-teal/70"
            >
              Open in new tab
              <ExternalLink size={14} />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-brand-text hover:bg-slate-900/70"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <iframe
            src={url}
            title={title}
            className="h-[65vh] w-full rounded-2xl border border-slate-800/70 bg-black"
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
