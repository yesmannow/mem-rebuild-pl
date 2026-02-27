import React, { useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface SearchlightCursorProps {
  color?: string;
  activeCardColor?: string;
  isOverCard: boolean;
}

/**
 * Page-specific cursor for /case-studies.
 * - Default: small dot + trailing ring (inherits from MagneticCursor style)
 * - Over a card: expands to a large translucent "lens flare" radial gradient
 *   that illuminates whatever video/background is beneath it.
 *   Uses mix-blend-mode: screen so it brightens rather than tints.
 */
const SearchlightCursor: React.FC<SearchlightCursorProps> = ({
  color = '#40E0D0',
  activeCardColor,
  isOverCard,
}) => {
  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);

  const springConfig = { damping: 22, stiffness: 280 };
  const lensX = useSpring(cursorX, { damping: 18, stiffness: 120 });
  const lensY = useSpring(cursorY, { damping: 18, stiffness: 120 });
  const dotX  = useSpring(cursorX, { damping: 30, stiffness: 500 });
  const dotY  = useSpring(cursorY, { damping: 30, stiffness: 500 });
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const glowColor = activeCardColor ?? color;

  const move = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  useEffect(() => {
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [move]);

  return (
    <>
      {/* ── Lens flare — only visible over a card ── */}
      <motion.div
        className="searchlight__lens"
        style={{
          x: lensX,
          y: lensY,
          translateX: '-50%',
          translateY: '-50%',
          background: `radial-gradient(circle, ${glowColor}55 0%, ${glowColor}22 30%, transparent 70%)`,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
        animate={{
          width:   isOverCard ? 320 : 0,
          height:  isOverCard ? 320 : 0,
          opacity: isOverCard ? 1   : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      />

      {/* ── Inner bright core of flare ── */}
      <motion.div
        className="searchlight__core"
        style={{
          x: lensX,
          y: lensY,
          translateX: '-50%',
          translateY: '-50%',
          background: `radial-gradient(circle, ${glowColor}90 0%, transparent 60%)`,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
        animate={{
          width:   isOverCard ? 80  : 0,
          height:  isOverCard ? 80  : 0,
          opacity: isOverCard ? 0.6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
      />

      {/* ── Trailing ring ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: `${glowColor}60`,
        }}
        animate={{
          width:  isOverCard ? 64 : 36,
          height: isOverCard ? 64 : 36,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />

      {/* ── Fast dot ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: glowColor,
        }}
        animate={{
          width:  isOverCard ? 0 : 6,
          height: isOverCard ? 0 : 6,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
};

export default SearchlightCursor;
