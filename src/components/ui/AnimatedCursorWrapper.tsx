import React, { createContext, useContext, useState, useEffect } from 'react';
import CustomCursor from './CustomCursor';

interface CursorContextType {
  cursorEnabled: boolean;
  toggleCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorEnabled: false,
  toggleCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

interface AnimatedCursorWrapperProps {
  children: React.ReactNode;
  enableByDefault?: boolean;
}

/**
 * AnimatedCursorWrapper - Provides custom cursor functionality with accessibility controls
 * 
 * Features:
 * - Context-based cursor enable/disable
 * - Respects prefers-reduced-motion
 * - Provides toggle for user control
 * - Only enabled on non-mobile devices
 */
export const AnimatedCursorWrapper: React.FC<AnimatedCursorWrapperProps> = ({
  children,
  enableByDefault = false,
}) => {
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setCursorEnabled(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Only enable cursor if not reduced motion and enabled by default
    if (!prefersReducedMotion && enableByDefault) {
      setCursorEnabled(true);
    }
  }, [enableByDefault, prefersReducedMotion]);

  const toggleCursor = () => {
    if (!prefersReducedMotion) {
      setCursorEnabled(!cursorEnabled);
    }
  };

  return (
    <CursorContext.Provider value={{ cursorEnabled, toggleCursor }}>
      {cursorEnabled && <CustomCursor />}
      {children}
    </CursorContext.Provider>
  );
};
