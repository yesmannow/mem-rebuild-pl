import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  'INITIALIZING KERNEL...',
  'LOADING ASSET MANIFEST...',
  'AUTHENTICATING UPLINK... [99%]',
  'MOUNTING MODULES...',
  'SYSTEMS ONLINE.',
];

const TOTAL_DURATION = 800; // ms

interface SystemBootProps {
  onComplete: () => void;
}

// Shutter panel — one horizontal slice that slides off-screen
const ShutterPanel: React.FC<{ index: number; total: number; direction: 'left' | 'right' }> = ({
  index,
  total,
  direction,
}) => {
  const heightPct = 100 / total;
  return (
    <motion.div
      className="absolute left-0 right-0 bg-[#050507]"
      style={{
        top: `${index * heightPct}%`,
        height: `${heightPct}%`,
      }}
      initial={{ x: 0 }}
      exit={{
        x: direction === 'left' ? '-100%' : '100%',
        transition: {
          duration: 0.55,
          ease: [0.76, 0, 0.24, 1],
          delay: index * 0.04,
        },
      }}
    />
  );
};

const PANEL_COUNT = 8;

const SystemBoot: React.FC<SystemBootProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const stepCount = 60;
    const stepDuration = TOTAL_DURATION / stepCount;
    let step = 0;

    const id = setInterval(() => {
      step++;
      // Progress runs to 99, then snaps to 100 on completion
      const raw = (step / stepCount) * 100;
      setProgress(step < stepCount ? Math.min(99, raw) : 100);
      setLineIndex(Math.floor((step / stepCount) * (BOOT_LINES.length - 1)));

      if (step >= stepCount) {
        clearInterval(id);
        setDone(true);
        setTimeout(onComplete, 550);
      }
    }, stepDuration);

    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9000] overflow-hidden"
          initial={{ opacity: 1 }}
        >
          {/* Shutter panels — exit staggered left/right alternating */}
          {Array.from({ length: PANEL_COUNT }).map((_, i) => (
            <ShutterPanel
              key={i}
              index={i}
              total={PANEL_COUNT}
              direction={i % 2 === 0 ? 'left' : 'right'}
            />
          ))}

          {/* Content layer above panels */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {/* Noise overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
              aria-hidden="true"
            />

            {/* Wordmark */}
            <div className="relative mb-12 flex flex-col items-center gap-2">
              <span
                className="text-white font-black tracking-[-0.04em]"
                style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif', fontSize: '2.5rem' }}
              >
                JD
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">
                Systems Architect
              </span>
            </div>

            {/* Progress bar */}
            <div className="relative w-64 mb-6">
              <div className="h-px w-full bg-white/8 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #22d3ee, #7fffd4)',
                    boxShadow: '0 0 12px rgba(34,211,238,0.6)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                />
              </div>
              {/* Shimmer scan */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.18) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Boot line */}
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIndex}
                className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#22d3ee]/50"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.1 }}
              >
                {BOOT_LINES[lineIndex]}
              </motion.p>
            </AnimatePresence>

            {/* Percentage */}
            <p className="mt-3 text-[9px] font-mono tabular-nums text-white/15">
              {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemBoot;
