import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Reading Progress Bar with Reading Time Estimate
 * Shows scroll progress and reading time on case study and article pages
 */
export default function ReadingProgressBar() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [readingTime, setReadingTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const contentRef = useRef<HTMLElement | null>(null);

  // Only show on case study pages and article-like pages
  const shouldShow = location.pathname.includes('/case-studies/') ||
                     location.pathname.includes('/projects/') ||
                     location.pathname.includes('/applications/');

  // Calculate reading time
  useEffect(() => {
    if (!shouldShow) return;

    const calculateReadingTime = () => {
      // Find main content area
      const mainContent = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
      const text = mainContent.innerText || mainContent.textContent || '';
      const words = text.trim().split(/\s+/).length;
      const wordsPerMinute = 200; // Average reading speed
      const minutes = Math.ceil(words / wordsPerMinute);
      setReadingTime(minutes);
    };

    // Wait for content to load
    const timer = setTimeout(calculateReadingTime, 500);
    return () => clearTimeout(timer);
  }, [location.pathname, shouldShow]);

  // Calculate time remaining based on scroll progress
  useEffect(() => {
    if (!shouldShow || readingTime === 0) return;

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const remaining = Math.max(0, Math.ceil(readingTime * (1 - progress)));
      setTimeRemaining(remaining);
    });

    return () => unsubscribe();
  }, [scrollYProgress, readingTime, shouldShow]);

  if (!shouldShow) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[101]">
      {/* Progress Bar */}
      <motion.div
        className="h-1 bg-brand-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="h-full bg-brand-teal origin-left shadow-[0_0_10px_rgba(64,224,208,0.5)]"
          style={{ scaleX }}
        />
      </motion.div>

      {/* Reading Time Indicator */}
      {readingTime > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 right-4 bg-brand-dark/90 backdrop-blur-sm border border-brand-teal/30 rounded px-3 py-1 text-xs font-mono text-brand-teal"
        >
          {timeRemaining > 0 ? (
            <span>
              {timeRemaining} min {timeRemaining === 1 ? '' : 's'} remaining
            </span>
          ) : (
            <span className="text-green-400">✓ Complete</span>
          )}
        </motion.div>
      )}
    </div>
  );
}

