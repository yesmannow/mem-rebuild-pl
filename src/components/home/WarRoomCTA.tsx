import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Activity, ArrowRight, Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSystemStore } from '../../store/useSystemStore';
import { BackgroundGrid } from '../ui/BackgroundGrid';
import { LiveCommitTicker } from './LiveCommitTicker';

// ─── Character scrambler ───────────────────────────────────────────────────
const SCRAMBLE_CHARS = '!@#$%^&*()_+<>?/|{}[]~ABCDEFabcdef01234';

// ─── Matrix rain canvas ────────────────────────────────────────────────────
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const cols = Math.floor(canvas.width / 14);
    const drops = Array(cols).fill(1);
    const chars = '01アイウエオカキクケコ∆∑Ω∞⌘';

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#22d3ee';
      ctx.font = '11px "JetBrains Mono", monospace';

      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const id = setInterval(draw, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none rounded-xl"
    />
  );
};

// ─── Scrambling button label ───────────────────────────────────────────────
const ScrambleLabel: React.FC<{ target: string; isHovered: boolean }> = ({ target, isHovered }) => {
  const [displayed, setDisplayed] = useState(target);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    if (frameRef.current) clearInterval(frameRef.current);

    if (!isHovered) {
      setDisplayed(target);
      return;
    }

    iterRef.current = 0;
    frameRef.current = setInterval(() => {
      iterRef.current += 1;
      const progress = iterRef.current / 12;

      setDisplayed(
        target
          .split('')
          .map((ch, idx) => {
            if (ch === ' ') return ' ';
            if (idx / target.length < progress) return ch;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );

      if (progress >= 1) {
        clearInterval(frameRef.current!);
        setDisplayed('SECURE ACCESS');
      }
    }, 60);

    return () => { if (frameRef.current) clearInterval(frameRef.current); };
  }, [isHovered, target]);

  return <span>{displayed}</span>;
};

// ─── Main component ────────────────────────────────────────────────────────
interface WarRoomCTAProps {
  systemMetrics: { uptime: string; deployments: string; coffee: string };
}

const WarRoomCTA: React.FC<WarRoomCTAProps> = ({ systemMetrics }) => {
  const [btnHovered, setBtnHovered] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const { pushHistory } = useSystemStore();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Z-axis depth scale: section scales up as it enters view
  const sectionScale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);

  const handleHoverStart = useCallback(() => {
    setBtnHovered(true);
    setAccessGranted(false);
    pushHistory('> WARNING: ENCRYPTED DATA ACCESS DETECTED...');

    setTimeout(() => {
      pushHistory('> SCANNING CREDENTIALS... [████████] 100%');
    }, 800);

    setTimeout(() => {
      pushHistory('> ACCESS GRANTED. WELCOME, OPERATOR.');
      setAccessGranted(true);
    }, 1600);
  }, [pushHistory]);

  const handleHoverEnd = useCallback(() => {
    setBtnHovered(false);
    setAccessGranted(false);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale: sectionScale, y: sectionY }}
      className="relative w-full py-0"
      aria-label="War Room CTA"
    >
      <div className="w-full bg-zinc-950 border-y border-cyan-400/20 relative overflow-hidden">
        <BackgroundGrid />

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-400/5 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Left: LIVE TELEMETRY indicator */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-60" />
                  <div className="relative w-3 h-3 bg-cyan-400 rounded-full" />
                </div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-cyan-400">
                  LIVE TELEMETRY
                </p>
              </div>
            </div>

            {/* Center: metrics + commit ticker */}
            <div className="flex-1 flex flex-col items-center gap-5 w-full">
              <div className="flex items-center gap-8 flex-wrap justify-center">
                {[
                  { label: 'UPTIME', value: systemMetrics.uptime },
                  { label: 'DEPLOYMENTS', value: systemMetrics.deployments },
                  { label: 'COFFEE', value: systemMetrics.coffee },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 mb-1">{m.label}</p>
                    <p className="text-lg font-bold font-mono text-white">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="w-full max-w-3xl">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 mb-2 text-center">
                  LIVE COMMIT FEED
                </p>
                <LiveCommitTicker />
              </div>
            </div>

            {/* Right: War Room button */}
            <div className="shrink-0">
              <motion.div
                className="relative group"
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                {/* Matrix rain behind button */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <MatrixRain />
                </div>

                <Link
                  to="/war-room"
                  className="relative flex items-center gap-3 px-6 py-3.5 rounded-xl font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden"
                  style={{
                    background: btnHovered
                      ? 'rgba(34,211,238,0.12)'
                      : 'rgba(34,211,238,0.06)',
                    border: `1px solid ${btnHovered ? 'rgba(34,211,238,0.5)' : 'rgba(34,211,238,0.2)'}`,
                    color: '#22d3ee',
                    boxShadow: btnHovered ? '0 0 24px rgba(34,211,238,0.15)' : 'none',
                  }}
                >
                  {/* Access granted flash */}
                  <AnimatePresence>
                    {accessGranted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{ background: 'rgba(34,211,238,0.06)' }}
                      />
                    )}
                  </AnimatePresence>

                  {accessGranted ? (
                    <Lock size={15} className="shrink-0" />
                  ) : (
                    <Activity size={15} className="shrink-0" />
                  )}

                  <ScrambleLabel target="ENTER WAR ROOM" isHovered={btnHovered} />

                  <motion.div
                    animate={{ x: btnHovered ? 4 : 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  >
                    <ArrowRight size={15} />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Access status label */}
              <div className="mt-2 text-center">
                <AnimatePresence mode="wait">
                  {accessGranted ? (
                    <motion.p
                      key="granted"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-1"
                    >
                      <Shield size={9} /> ACCESS GRANTED
                    </motion.p>
                  ) : (
                    <motion.p
                      key="clearance"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest"
                    >
                      CLEARANCE LEVEL: OPERATOR
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WarRoomCTA;
