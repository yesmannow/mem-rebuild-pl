import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LogoIntro.css';

const LogoIntro: React.FC = () => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if intro has been shown this session
    const hasSeenIntro = sessionStorage.getItem('logoIntroSeen');

    if (!hasSeenIntro) {
      setShowIntro(true);

      // Mark as seen after animation completes
      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem('logoIntroSeen', 'true');
      }, 3000); // 3 second intro

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="logo-intro-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="logo-intro-content"
            initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
            animate={{
              scale: [0.5, 1.2, 1],
              opacity: [0, 1, 1],
              rotateY: [-180, 0, 0],
            }}
            exit={{
              scale: 1.5,
              opacity: 0,
              rotateY: 180,
            }}
            transition={{
              duration: 2,
              times: [0, 0.6, 1],
              ease: 'easeInOut',
            }}
          >
            <img
              src="/images/design/logo-01.svg"
              alt="Jacob Darling"
              className="logo-intro-image"
            />

            {/* Orbital rings animation */}
            <motion.div
              className="intro-ring ring-1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.3, 1.3],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                times: [0, 0.5, 1],
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="intro-ring ring-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.5, 1.5],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 2,
                delay: 0.2,
                times: [0, 0.5, 1],
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="intro-ring ring-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.7, 1.7],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2,
                delay: 0.4,
                times: [0, 0.5, 1],
                ease: 'easeOut',
              }}
            />
          </motion.div>

          {/* Animated text */}
          <motion.div
            className="logo-intro-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
            transition={{
              duration: 2.5,
              times: [0, 0.3, 0.8, 1],
              ease: 'easeInOut',
            }}
          >
            <h2>Jacob Darling</h2>
            <p>Product Designer & Developer</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoIntro;
