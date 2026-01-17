import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, ExternalLink } from 'lucide-react';
import './AppDemoModal.css';

interface AppDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  appTitle: string;
  appUrl: string;
  embeddable?: boolean; // Defaults to true
  thumbnail?: string; // For non-embeddable apps backdrop
}

const AppDemoModal: React.FC<AppDemoModalProps> = ({
  isOpen,
  onClose,
  appTitle,
  appUrl,
  embeddable = true,
  thumbnail
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  const isSameOrigin = (() => {
    try {
      const url = new URL(appUrl, window.location.href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  })();

  // Determine if we should use iframe or Secure Terminal UI
  const shouldEmbed = embeddable && isSameOrigin;

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
      if (e.key === 'Escape' && isOpen && !isLaunching) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, isLaunching]);

  // Handle countdown and launch
  const handleLaunch = () => {
    if (isLaunching) return;

    setIsLaunching(true);
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) {
          clearInterval(countdownInterval);
          return null;
        }
        if (prev === 1) {
          clearInterval(countdownInterval);
          // Wait one more second to show "1", then open
          setTimeout(() => {
            window.open(appUrl, '_blank', 'noopener,noreferrer');
            // Reset after a brief moment
            setTimeout(() => {
              setIsLaunching(false);
              setCountdown(null);
              onClose();
            }, 500);
          }, 1000);
          return 1; // Keep showing 1
        }
        return prev - 1;
      });
    }, 1000);
  };

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
          className="app-demo-modal-container modal-mobile"
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
              <p className="modal-subtitle">
                {shouldEmbed ? 'Interactive Demo' : 'External Secure Session'}
              </p>
            </div>
            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
              disabled={isLaunching}
            >
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
            {shouldEmbed ? (
              // Embeddable: Use iframe
              <iframe
                src={appUrl}
                title={`${appTitle} Demo`}
                className="app-demo-iframe"
                frameBorder="0"
                allowFullScreen
                allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            ) : (
              // Non-embeddable: Secure Terminal UI
              <div className="secure-terminal-container">
                {/* Blurred Backdrop */}
                {thumbnail && (
                  <div
                    className="secure-terminal-backdrop"
                    style={{
                      backgroundImage: `url(${thumbnail})`,
                    }}
                  />
                )}

                {/* Foreground Card */}
                <motion.div
                  className="secure-terminal-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Status Indicator */}
                  <div className="secure-terminal-status">
                    <motion.div
                      className="signal-indicator"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Radio className="signal-icon" size={48} />
                    </motion.div>
                    <motion.p
                      className="status-text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Ready to Launch
                    </motion.p>
                  </div>

                  {/* Title */}
                  <h2 className="secure-terminal-title">External Environment Detected</h2>

                  {/* Description */}
                  <p className="secure-terminal-description">
                    This application requires a secure external session.
                  </p>

                  {/* Countdown Display */}
                  <AnimatePresence mode="wait">
                    {countdown !== null && (
                      <motion.div
                        key={countdown}
                        className="countdown-display"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="countdown-number">{countdown}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Launch Button */}
                  <motion.button
                    className="secure-launch-button"
                    onClick={handleLaunch}
                    disabled={isLaunching}
                    whileHover={!isLaunching ? { scale: 1.05 } : {}}
                    whileTap={!isLaunching ? { scale: 0.95 } : {}}
                  >
                    {isLaunching && countdown !== null ? (
                      <span className="launch-button-text">Initializing...</span>
                    ) : (
                      <>
                        <span className="launch-button-text">Initialize Secure Session</span>
                        <ExternalLink className="launch-button-icon" size={24} />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            )}
          </div>

          {/* Modal Footer - Only show for embeddable apps */}
          {shouldEmbed && (
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
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppDemoModal;
