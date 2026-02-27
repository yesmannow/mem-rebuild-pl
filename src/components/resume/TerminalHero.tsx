import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Download, Calendar, Terminal } from 'lucide-react';
import { useSystemSound } from '../../hooks/useSystemSound';
import { toast } from 'sonner';

gsap.registerPlugin(TextPlugin);

const BOOT_LINES = [
  '> INITIALIZING IDENTITY MATRIX...',
  '> ROLE: MARKETING TECHNOLOGIST',
  '> YEARS_IN_SYSTEMS: 15+',
  '> CLIENTS_SERVED: 50+',
  '> DEPLOYS: 120+',
  '> USERS_ON_PLATFORM: 30,000+',
  '> CONVERSION_LIFT: +40%',
  '> AUTOMATIONS_BUILT: 400+',
  '> STATUS: OPERATIONAL',
  '> DOSSIER: READY FOR REVIEW',
];

interface TerminalHeroProps {
  onBootComplete?: () => void;
}

export const TerminalHero: React.FC<TerminalHeroProps> = ({ onBootComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isBooted, setIsBooted] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const { playSwitch } = useSystemSound();

  const onBootCompleteRef = useRef(onBootComplete);
  useEffect(() => { onBootCompleteRef.current = onBootComplete; });

  useEffect(() => {
    let cancelled = false;
    let lineIndex = 0;

    const typeNextLine = () => {
      if (cancelled || lineIndex >= BOOT_LINES.length) {
        if (!cancelled) {
          setIsBooted(true);
          onBootCompleteRef.current?.();
          gsap.to(cursorRef.current, { opacity: 0, duration: 0.4, repeat: -1, yoyo: true, ease: 'none' });
        }
        return;
      }

      const line = BOOT_LINES[lineIndex];
      lineIndex++;

      const tempEl = document.createElement('div');
      gsap.to(tempEl, {
        duration: line.length * 0.035,
        text: { value: line, delimiter: '' },
        ease: 'none',
        onUpdate: () => {
          if (!cancelled) {
            setVisibleLines((prev) => {
              const next = [...prev];
              next[lineIndex - 1] = tempEl.textContent ?? '';
              return next;
            });
          }
        },
        onComplete: () => {
          if (!cancelled) {
            setTimeout(typeNextLine, lineIndex < BOOT_LINES.length ? 120 : 400);
          }
        },
      });
    };

    const initialDelay = setTimeout(typeNextLine, 600);

    return () => {
      cancelled = true;
      clearTimeout(initialDelay);
    };
  }, []); // intentionally run once on mount

  const handleDownload = async () => {
    if (isCompiling) return;
    setIsCompiling(true);
    playSwitch();
    toast.success('Compiling Personnel Dossier...', { description: 'System Access Authorized', duration: 800 });
    await new Promise((r) => setTimeout(r, 800));
    const link = document.createElement('a');
    link.href = '/resume/resume-jd-draft.pdf';
    link.download = 'Jacob-Darling-Resume.pdf';
    link.click();
    setIsCompiling(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[520px] flex flex-col justify-between rounded-[28px] border border-white/10 bg-[#020409] overflow-hidden shadow-[0_40px_100px_rgba(0,242,255,0.06)] print:hidden"
    >
      {/* Scan-line texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,242,255,0.6) 2px, rgba(0,242,255,0.6) 3px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* Terminal chrome bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.025]">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="flex items-center gap-2 ml-4">
          <Terminal size={12} className="text-cyan-400/60" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400/50 font-mono">
            dossier@bearcave ~ identity-matrix
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          />
          <span className="text-[9px] font-mono text-cyan-400/70 uppercase tracking-widest">LIVE</span>
        </div>
      </div>

      {/* Terminal output */}
      <div className="flex-1 p-6 lg:p-10 font-mono text-sm leading-7 overflow-hidden">
        {visibleLines.map((line, i) => {
          const isStatus = line.includes('STATUS') || line.includes('DOSSIER');
          const isMetric = /:\s/.test(line) && !line.includes('INITIALIZING');
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`whitespace-pre ${
                isStatus
                  ? 'text-green-400'
                  : isMetric
                  ? 'text-cyan-300'
                  : 'text-cyan-400/80'
              }`}
            >
              {line}
              {i === visibleLines.length - 1 && (
                <span ref={cursorRef} className="inline-block w-2 h-[1em] bg-cyan-400 ml-0.5 align-middle" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* CTA footer — appears after boot */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5 }}
        className="border-t border-white/[0.06] bg-white/[0.02] p-5 flex flex-col sm:flex-row gap-3"
      >
        <button
          onClick={handleDownload}
          disabled={isCompiling}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-400 text-[#020409] font-bold text-sm rounded-xl hover:bg-cyan-300 transition-colors duration-200 shadow-[0_0_20px_rgba(0,242,255,0.35)] disabled:opacity-60"
        >
          <Download size={16} className={isCompiling ? 'animate-pulse' : ''} />
          {isCompiling ? 'COMPILING...' : 'DOWNLOAD CV'}
        </button>
        <button
          onClick={() => (window.location.href = '/contact')}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-cyan-400/80 font-semibold text-sm rounded-xl hover:border-cyan-400/40 hover:text-cyan-400 transition-colors duration-200"
        >
          <Calendar size={16} />
          BOOK CONSULTATION
        </button>
        <div className="ml-auto hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
          <span>BUILD: 2026.02</span>
          <span className="text-white/10">|</span>
          <span>NODE: READY</span>
        </div>
      </motion.div>
    </div>
  );
};
