/**
 * EnhancedPageWrapper - Wrapper component for consistent page enhancements
 * 
 * Provides:
 * - Magnetic cursor effect site-wide
 * - Smooth page transitions
 * - Parallax header effects
 * - GPU-accelerated animations
 */

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import MagneticCursor from './MagneticCursor';
import { useParallax } from '../../hooks/useParallax';

interface EnhancedPageWrapperProps {
  children: ReactNode;
  showCursor?: boolean;
  cursorColor?: string;
  className?: string;
  headerContent?: ReactNode;
  enableParallaxHeader?: boolean;
}

const EnhancedPageWrapper: React.FC<EnhancedPageWrapperProps> = ({
  children,
  showCursor = true,
  cursorColor = '#40E0D0',
  className = '',
  headerContent,
  enableParallaxHeader = true,
}) => {
  const { ref, y } = useParallax({ speed: 0.5 });

  // Page entrance animation
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth motion
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {/* Magnetic Cursor Effect */}
      {showCursor && <MagneticCursor color={cursorColor} enabled={true} />}

      {/* Page Content with Animations */}
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`relative ${className}`}
      >
        {/* Parallax Header Section */}
        {headerContent && enableParallaxHeader && (
          <motion.div
            ref={ref}
            style={{ y: enableParallaxHeader ? y : 0 }}
            className="will-change-transform"
          >
            {headerContent}
          </motion.div>
        )}

        {/* Main Content */}
        <div className="gpu-accelerated">{children}</div>
      </motion.div>
    </>
  );
};

export default EnhancedPageWrapper;
