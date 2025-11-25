import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeTransitionEffectsProps {
  brand: 'cmo' | 'dev' | 'default';
  prevBrand?: 'cmo' | 'dev' | 'default';
}

/**
 * Theme Transition Effects
 * Shows special effects when switching between brand modes
 */
export default function ThemeTransitionEffects({ brand, prevBrand }: ThemeTransitionEffectsProps) {
  const [showEffect, setShowEffect] = React.useState(false);

  useEffect(() => {
    if (prevBrand && prevBrand !== brand) {
      setShowEffect(true);
      const timer = setTimeout(() => setShowEffect(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [brand, prevBrand]);

  if (!showEffect || !prevBrand) return null;

  return (
    <AnimatePresence>
      {showEffect && (
        <>
          {/* Dev Mode: Matrix Code Rain */}
          {brand === 'dev' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] pointer-events-none"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-[#00ff41] font-mono text-xs opacity-30"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: -20,
                    opacity: 0,
                  }}
                  animate={{
                    y: window.innerHeight + 20,
                    opacity: [0, 0.3, 0.3, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    delay: Math.random() * 0.5,
                    repeat: 0,
                  }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {String.fromCharCode(0x30a0 + Math.random() * 96)}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CMO Mode: Elegant Fade */}
          {brand === 'cmo' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] pointer-events-none bg-gradient-to-b from-[#0f3b82]/20 to-transparent"
            />
          )}

          {/* Hybrid Mode: Particle Explosion */}
          {brand === 'default' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] pointer-events-none"
            >
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                  }}
                  style={{
                    background: i % 2 === 0 ? '#40E0D0' : '#FFA500',
                  }}
                />
              ))}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

