import { useState, useEffect } from 'react';

/**
 * Hook for detecting reduced motion preference and mobile device
 * Returns true if animations should be reduced for better performance/accessibility
 */
export function useReducedMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check for user's reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const checkMotionPreference = () => {
      setShouldReduceMotion(mediaQuery.matches);
    };

    // Initial check
    checkMotionPreference();

    // Listen for changes
    mediaQuery.addEventListener('change', checkMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', checkMotionPreference);
    };
  }, []);

  return shouldReduceMotion;
}

/**
 * Hook for detecting if device is mobile based on screen width and touch capability
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}

/**
 * Combined hook for checking if animations should be simplified
 * Returns true if on mobile or user prefers reduced motion
 */
export function useShouldReduceAnimations(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  return prefersReducedMotion || isMobile;
}
