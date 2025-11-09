import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Mail, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToTop } from '../../utils/scroll';

const FloatingActionButtons: React.FC = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowButtons(scrollY > 300);
      setShowScrollTop(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeDownload = () => {
    const resumePath = '/resume/Resume JD draft.pdf';
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Jacob-Darling-Resume.pdf';
    link.click();
  };

  // Hide on certain pages or mobile menu open
  if (location.pathname === '/resume' || location.pathname === '/contact') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Resume Download Button */}
      <AnimatePresence>
        {showButtons && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResumeDownload}
            className="group relative flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            aria-label="Download Resume"
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
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/contact"
              className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline whitespace-nowrap">Contact</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
