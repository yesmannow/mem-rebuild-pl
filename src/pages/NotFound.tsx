import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TerminalBlock from '../components/ui/TerminalBlock';

const CRASH_LINES = [
  '[kernel] panic: CRITICAL_PROCESS_DIED',
  '[router] invalid route pointer -> 0x000000000',
  '[network] packet_loss=97.6% | node=us-east-1',
  '[fs] mountpoint /pages/404 not found',
  '[diagnostics] attempting automated restore...',
];

export default function NotFound() {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let frame = 0;
    const timer = setInterval(() => {
      setVisibleLines(CRASH_LINES.slice(0, frame + 1));
      frame++;
      if (frame >= CRASH_LINES.length) clearInterval(timer);
    }, 320);
    return () => clearInterval(timer);
  }, []);

  const fakeDump = useMemo(
    () =>
      [
        'STACK TRACE ::',
        '0x00ff13 -> /core/navigation.ts',
        '0x10aa44 -> /router/resolve.ts',
        '0x1c0d33 -> /pages/not-found.tsx',
        '0x0f0f0f -> /rehydrate/main',
        '',
        'Hint: INITIATE SYSTEM RESTORE to recover session.',
      ].join('\n'),
    [],
  );

  return (
    <main className="min-h-dvh bg-black text-amber-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,125,69,0.1),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(64,224,208,0.1),transparent_35%)]" />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col gap-10">
        <header className="space-y-3">
          <motion.p
            className="text-sm font-mono text-red-400 tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            System Failure // War Room
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-black font-mono text-orange-300 drop-shadow-[0_0_20px_rgba(255,125,69,0.35)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            CRITICAL_PROCESS_DIED
          </motion.h1>
          <p className="text-slate-300 text-lg max-w-2xl font-mono">
            The requested route exited with status <span className="text-red-400">404</span>. Navigation table could not recover.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <TerminalBlock
            title="CRASH LOG"
            className="bg-slate-950/80 border-red-500/50 text-red-200 shadow-[0_0_30px_rgba(255,69,58,0.25)]"
          >
            <div className="space-y-2">
              {visibleLines.map((line, idx) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <span className="text-orange-100">{line}</span>
                </motion.div>
              ))}
            </div>
          </TerminalBlock>

          <TerminalBlock
            title="MEMORY DUMP"
            className="bg-slate-950/80 border-orange-400/50 text-orange-200"
          >
            <pre className="whitespace-pre-wrap leading-relaxed text-orange-100/90">
              {fakeDump}
            </pre>
          </TerminalBlock>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4">
          <motion.button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-black font-semibold rounded-lg shadow-lg shadow-red-500/30 border border-orange-400/60 hover:shadow-red-500/50 transition-all font-mono uppercase tracking-wide"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Initiate System Restore
          </motion.button>
          <Link
            to="/case-studies"
            className="px-6 py-3 border border-teal-400/40 text-teal-200 rounded-lg backdrop-blur-sm hover:bg-teal-400/10 font-mono uppercase tracking-wide"
          >
            View Operational Logs
          </Link>
        </div>
      </div>
    </main>
  );
}
