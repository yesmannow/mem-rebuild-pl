import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useHaptic } from '../hooks/useHaptic';

interface SwipeShellProps {
  children: React.ReactNode;
}

// Define navigation order for swipe gestures
const NAVIGATION_ORDER = [
  '/',
  '/case-studies',
  '/tools',
  '/about',
];

const SwipeShell: React.FC<SwipeShellProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { triggerHaptic } = useHaptic();
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enable swipe only on mobile/touch devices
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsSwipeEnabled(isTouchDevice);
  }, []);

  const getCurrentIndex = () => {
    const currentPath = location.pathname;
    // Check exact match first
    const exactIndex = NAVIGATION_ORDER.indexOf(currentPath);
    if (exactIndex !== -1) return exactIndex;

    // Check if path starts with any navigation item
    for (let i = 0; i < NAVIGATION_ORDER.length; i++) {
      if (currentPath.startsWith(NAVIGATION_ORDER[i])) {
        return i;
      }
    }
    return 0; // Default to home
  };

  const navigateToNext = () => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % NAVIGATION_ORDER.length;
    const nextPath = NAVIGATION_ORDER[nextIndex];
    triggerHaptic([10]);
    navigate(nextPath);
  };

  const navigateToPrevious = () => {
    const currentIndex = getCurrentIndex();
    const prevIndex = (currentIndex - 1 + NAVIGATION_ORDER.length) % NAVIGATION_ORDER.length;
    const prevPath = NAVIGATION_ORDER[prevIndex];
    triggerHaptic([10]);
    navigate(prevPath);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isSwipeEnabled) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwipeEnabled || touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Only trigger swipe if horizontal movement is greater than vertical (swipe, not scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swipe right - go to previous
        setDirection('right');
        navigateToPrevious();
        setTimeout(() => setDirection(null), 300);
      } else {
        // Swipe left - go to next
        setDirection('left');
        navigateToNext();
        setTimeout(() => setDirection(null), 300);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!isSwipeEnabled) {
    // On desktop, just render children without swipe handlers
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full"
      style={{ touchAction: 'pan-y' }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          initial={direction === 'left'
            ? { x: '100%', opacity: 0 }
            : direction === 'right'
            ? { x: '-100%', opacity: 0 }
            : { x: 0, opacity: 1 }
          }
          animate={{ x: 0, opacity: 1 }}
          exit={direction === 'left'
            ? { x: '-100%', opacity: 0 }
            : direction === 'right'
            ? { x: '100%', opacity: 0 }
            : { x: 0, opacity: 0 }
          }
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SwipeShell;

