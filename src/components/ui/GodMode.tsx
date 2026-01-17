import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Layout, Activity, X } from 'lucide-react';

interface GodModeProps {
  active: boolean;
}

/**
 * GodMode - High-tech debug overlay easter egg
 * Activated via Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)
 * Shows real-time system metrics and wireframe toggle
 */
const GodMode: React.FC<GodModeProps> = ({ active }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [wireframeMode, setWireframeMode] = useState(false);

  // Update window size
  useEffect(() => {
    if (!active) return;

    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, [active]);

  // Update scroll position
  useEffect(() => {
    if (!active) return;

    const updateScrollPosition = () => {
      setScrollPosition({
        x: window.scrollX || window.pageXOffset,
        y: window.scrollY || window.pageYOffset,
      });
    };

    updateScrollPosition();
    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, [active]);

  // Toggle wireframe mode
  useEffect(() => {
    if (wireframeMode) {
      document.body.classList.add('wireframe-mode');
    } else {
      document.body.classList.remove('wireframe-mode');
    }

    return () => {
      document.body.classList.remove('wireframe-mode');
    };
  }, [wireframeMode]);

  if (!active) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed top-4 left-4 z-[9999] pointer-events-auto"
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Debug Overlay Panel */}
          <div className="bg-slate-900/95 backdrop-blur-xl border-2 border-brand-turquoise/50 rounded-lg p-4 shadow-[0_0_30px_rgba(64,224,208,0.4)] min-w-[280px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-turquoise/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="text-sm font-mono font-bold text-brand-turquoise uppercase tracking-wider">
                  Debug Overlay
                </h3>
              </div>
              <motion.button
                onClick={() => setWireframeMode(false)}
                className="text-slate-400 hover:text-brand-turquoise transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close debug overlay"
                title="Close overlay (wireframe mode will be disabled)"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Metrics */}
            <div className="space-y-3 text-xs font-mono">
              {/* Window Size */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Monitor size={14} className="text-brand-turquoise" />
                  <span>Window Size</span>
                </div>
                <span className="text-brand-turquoise font-semibold">
                  {windowSize.width} × {windowSize.height}
                </span>
              </div>

              {/* Scroll Position */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Layout size={14} className="text-brand-turquoise" />
                  <span>Scroll Position</span>
                </div>
                <span className="text-brand-turquoise font-semibold">
                  X: {Math.round(scrollPosition.x)} Y: {Math.round(scrollPosition.y)}
                </span>
              </div>

              {/* System Integrity */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Activity size={14} className="text-brand-turquoise" />
                  <span>System Integrity</span>
                </div>
                <span className="text-green-400 font-semibold">100%</span>
              </div>

              {/* Divider */}
              <div className="pt-2 border-t border-brand-turquoise/20" />

              {/* Wireframe Toggle */}
              <motion.button
                onClick={() => setWireframeMode(!wireframeMode)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded border-2 transition-all ${
                  wireframeMode
                    ? 'bg-brand-turquoise/20 border-brand-turquoise text-brand-turquoise'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-brand-turquoise/50 hover:text-brand-turquoise'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Wireframe Mode
                </span>
                <motion.div
                  className={`w-8 h-4 rounded-full relative ${
                    wireframeMode ? 'bg-brand-turquoise' : 'bg-slate-700'
                  }`}
                  animate={{
                    backgroundColor: wireframeMode ? '#40E0D0' : '#475569',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"
                    animate={{
                      x: wireframeMode ? 16 : 2,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              </motion.button>

              {/* Status Footer */}
              <div className="pt-2 border-t border-brand-turquoise/20">
                <p className="text-[10px] text-brand-turquoise/60 uppercase tracking-widest text-center">
                  Konami Code Active
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GodMode;
