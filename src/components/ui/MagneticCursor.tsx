/**
 * MagneticCursor - Custom cursor with magnetic attraction effect
 *
 * Features:
 * - Smooth cursor following with lagging trail ring
 * - Magnetic attraction to interactive elements
 * - Scale + blend-mode animation on hover
 * - Haptic ripple visual feedback on click
 * - Context-aware label on [data-cursor-label] elements
 */

import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface MagneticCursorProps {
  color?: string;
  enabled?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const MagneticCursor: React.FC<MagneticCursorProps> = ({
  color = '#40E0D0',
  enabled = true
}) => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Trailing ring: slower spring = visible lag behind dot
  const trailConfig = { damping: 18, stiffness: 120 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  // Fast dot spring
  const dotConfig = { damping: 28, stiffness: 400 };
  const dotX = useSpring(cursorX, dotConfig);
  const dotY = useSpring(cursorY, dotConfig);

  // Detect mobile devices - use matchMedia for better performance
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const touchQuery = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const checkMobile = () => {
      setIsMobile(mobileQuery.matches || touchQuery);
    };

    checkMobile();
    mobileQuery.addEventListener('change', checkMobile);
    return () => mobileQuery.removeEventListener('change', checkMobile);
  }, []);

  const spawnRipple = useCallback((x: number, y: number) => {
    const id = Date.now();
    setRipples((prev) => [...prev.slice(-3), { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e: MouseEvent) => {
      if (!e || !e.target) return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!e || !e.target) return;
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== 'function') return;
      const interactive = target.closest('a, button, [data-magnetic], [role="button"], .cursor-pointer');
      if (interactive) {
        setIsHovering(true);
        const label = (interactive as HTMLElement).getAttribute('data-cursor-label');
        setCursorLabel(label);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e || !e.target) return;
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== 'function') return;
      const interactive = target.closest('a, button, [data-magnetic], [role="button"], .cursor-pointer');
      if (interactive) {
        setIsHovering(false);
        setCursorLabel(null);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      spawnRipple(e.clientX, e.clientY);
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled, cursorX, cursorY, spawnRipple]);

  // Don't render on mobile devices
  if (!enabled || !isVisible || isMobile) return null;

  return (
    <>
      {/* Haptic ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
            style={{
              borderColor: color,
              x: r.x,
              y: r.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ width: 8, height: 8, opacity: 0.8 }}
            animate={{ width: 64, height: 64, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Trailing outer ring — lags behind cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border"
          style={{ borderColor: `${color}60` }}
          animate={{
            width: isHovering ? 56 : 36,
            height: isHovering ? 56 : 36,
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        />

        {/* Context label */}
        <AnimatePresence>
          {cursorLabel && (
            <motion.span
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Fast dot — snaps to cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            width: isHovering ? 0 : 6,
            height: isHovering ? 0 : 6,
            scale: isClicking ? 1.5 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </motion.div>
    </>
  );
};

export default MagneticCursor;
