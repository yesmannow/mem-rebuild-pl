import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AppDemoModal.css';

interface AppDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  appTitle: string;
  appUrl: string;
}

const AppDemoModal: React.FC<AppDemoModalProps> = ({ isOpen, onClose, appTitle, appUrl }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="app-demo-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="app-demo-modal-container"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="app-demo-modal-header">
            <div className="modal-header-content">
              <h3 className="modal-title">{appTitle}</h3>
              <p className="modal-subtitle">Interactive Demo</p>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="app-demo-modal-content">
            <iframe
              src={appUrl}
              title={`${appTitle} Demo`}
              className="app-demo-iframe"
              frameBorder="0"
              allowFullScreen
              allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>

          {/* Modal Footer */}
          <div className="app-demo-modal-footer">
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-footer-link"
              onClick={e => e.stopPropagation()}
            >
              Open in New Tab
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3L11 8L6 13M11 3h3v10h-3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <button className="modal-close-footer-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppDemoModal;
