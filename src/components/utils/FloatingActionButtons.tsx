import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Mail, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToTop } from '../../utils/scroll';
import { ROUTE_RESUME, ROUTE_CONTACT, goToResume, goToContact } from '../../lib/links';
import '../../styles/bearcave-brand.css';

const FloatingActionButtons: React.FC = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowButtons(scrollY > 300);
      setShowScrollTop(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    goToResume(navigate);
  };

  const handleContactClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    goToContact(navigate);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    handler: (e: React.KeyboardEvent) => void
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler(e);
    }
  };

  // Hide on certain pages
  if (location.pathname === ROUTE_RESUME || location.pathname === ROUTE_CONTACT) {
    return null;
  }

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.8, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.8, y: 20 },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Resume Button */}
      <AnimatePresence>
        {showButtons && (
          <motion.button
            {...motionProps}
            onClick={handleResumeClick}
            onKeyDown={(e) => handleKeyDown(e, handleResumeClick)}
            role="button"
            tabIndex={0}
            className="btn-primary group relative flex items-center gap-3 px-5 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            aria-label="View Resume"
          >
            <FileText className="w-5 h-5" />
            <span className="hidden sm:inline whitespace-nowrap">Resume</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Contact Button */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.8, y: 20 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.8, y: 20 },
                  transition: { delay: 0.1 },
                })}
          >
            <motion.button
              {...(prefersReducedMotion
                ? {}
                : {
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                  })}
              onClick={handleContactClick}
              onKeyDown={(e) => handleKeyDown(e, handleContactClick)}
              role="button"
              tabIndex={0}
              className="btn-primary group flex items-center gap-3 px-5 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              }}
              aria-label="Contact Me"
            >
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline whitespace-nowrap">Contact</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.8 },
                  whileHover: { scale: 1.1 },
                  whileTap: { scale: 0.9 },
                })}
            onClick={() => scrollToTop()}
            className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-white/10 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700/80 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionButtons;
