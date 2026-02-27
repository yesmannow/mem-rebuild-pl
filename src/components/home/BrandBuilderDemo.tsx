import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, RefreshCw, ArrowRight, Cpu, Send } from 'lucide-react';
import { useSystemStore } from '../../store/useSystemStore';

// ─── Static data ────────────────────────────────────────────────────────────

const FONTS_2026 = [
  'JetBrains Mono', 'Space Grotesk', 'Syne', 'Cabinet Grotesk',
  'Neue Machina', 'General Sans', 'Clash Display', 'Satoshi',
  'Plus Jakarta Sans', 'Switzer', 'Bricolage Grotesque', 'Instrument Serif',
];

const NEON_HEX = [
  '#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#fb923c',
  '#60a5fa', '#e879f9', '#4ade80', '#facc15', '#f87171',
  '#38bdf8', '#c084fc',
];

const ARCHETYPES = [
  'THE INNOVATOR', 'THE ARCHITECT', 'THE DISRUPTOR', 'THE NAVIGATOR',
  'THE CATALYST', 'THE SOVEREIGN', 'THE ORACLE', 'THE ENGINEER',
];

const PALETTE_SETS = [
  { primary: '#22d3ee', secondary: '#0e7490', accent: '#a78bfa', neutral: '#18181b', name: 'Cyan Protocol' },
  { primary: '#a78bfa', secondary: '#6d28d9', accent: '#f472b6', neutral: '#1c1427', name: 'Violet Systems' },
  { primary: '#34d399', secondary: '#065f46', accent: '#22d3ee', neutral: '#0f1f18', name: 'Growth Engine' },
  { primary: '#fb923c', secondary: '#9a3412', accent: '#facc15', neutral: '#1c0f06', name: 'Signal Pulse' },
  { primary: '#f472b6', secondary: '#9d174d', accent: '#a78bfa', neutral: '#1c0a14', name: 'Neon Forge' },
];

const VOICE_TONES = [
  'AUTHORITATIVE', 'CONVERSATIONAL', 'TECHNICAL', 'ASPIRATIONAL',
  'DISRUPTIVE', 'EMPATHETIC', 'PROVOCATIVE', 'PRECISE',
];

const POSITIONING_TAGS = [
  'CATEGORY CREATOR', 'CHALLENGER BRAND', 'MARKET LEADER',
  'NICHE DOMINATOR', 'PLATFORM PLAY', 'COMMUNITY-LED GROWTH',
];

// ─── Generation phases ──────────────────────────────────────────────────────

interface GenPhaseStep {
  id: string;
  label: string;
  terminalLine: string;
  durationMs: number;
}

const GEN_PHASES: GenPhaseStep[] = [
  {
    id: 'market-scan',
    label: 'SCANNING MARKET SIGNALS',
    terminalLine: '> MARKET INTELLIGENCE: INGESTING COMPETITIVE LANDSCAPE...',
    durationMs: 700,
  },
  {
    id: 'archetype-profile',
    label: 'PROFILING BRAND ARCHETYPE',
    terminalLine: '> ARCHETYPE ENGINE: MAPPING PSYCHOGRAPHIC VECTORS...',
    durationMs: 800,
  },
  {
    id: 'palette-gen',
    label: 'GENERATING COLOR PROTOCOL',
    terminalLine: '> PALETTE SYNTHESIZER: ENCODING EMOTIONAL RESONANCE...',
    durationMs: 700,
  },
  {
    id: 'voice-calibrate',
    label: 'CALIBRATING VOICE & TONE',
    terminalLine: '> MESSAGING MATRIX: ALIGNING ICP FREQUENCY...',
    durationMs: 600,
  },
  {
    id: 'lock',
    label: 'LOCKING BRAND PROTOCOL',
    terminalLine: '> BRAND KERNEL: CRYSTALLIZING IDENTITY SIGNATURE...',
    durationMs: 400,
  },
];

type GenPhase = 'idle' | 'generating' | 'locked';

// ─── Props ──────────────────────────────────────────────────────────────────

interface BrandBuilderDemoProps {
  autoTrigger?: boolean;
  onTriggerConsumed?: () => void;
  prefillName?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

const BrandBuilderDemo: React.FC<BrandBuilderDemoProps> = ({
  autoTrigger,
  onTriggerConsumed,
  prefillName = '',
}) => {
  const [brandInput, setBrandInput] = useState(prefillName);
  const [submittedName, setSubmittedName] = useState('');
  const [font, setFont] = useState(FONTS_2026[0]);
  const [archetype, setArchetype] = useState(ARCHETYPES[0]);
  const [voiceTone, setVoiceTone] = useState(VOICE_TONES[0]);
  const [positioning, setPositioning] = useState(POSITIONING_TAGS[0]);
  const [palette, setPalette] = useState(PALETTE_SETS[0]);
  const [color, setColor] = useState(NEON_HEX[0]);
  const [phase, setPhase] = useState<GenPhase>('idle');
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(-1);
  const [progressPct, setProgressPct] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { pushHistory } = useSystemStore();

  // Clear cycling interval on unmount
  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Update prefill if it changes externally (e.g. from terminal command)
  useEffect(() => {
    if (prefillName) setBrandInput(prefillName);
  }, [prefillName]);

  const startGeneration = useCallback((nameOverride?: string) => {
    if (phase === 'generating') return;
    const name = (nameOverride ?? brandInput).trim() || 'UNNAMED BRAND';
    setSubmittedName(name.toUpperCase());
    setPhase('generating');
    setProgressPct(0);
    setCurrentPhaseIdx(0);

    const totalDuration = GEN_PHASES.reduce((sum, p) => sum + p.durationMs, 0);
    let elapsed = 0;

    // Log first phase immediately
    pushHistory(GEN_PHASES[0].terminalLine);

    // Rapid cycling of visual noise
    intervalRef.current = setInterval(() => {
      elapsed += 80;
      setProgressPct(Math.min(98, Math.round((elapsed / totalDuration) * 100)));
      setFont(FONTS_2026[Math.floor(Math.random() * FONTS_2026.length)]);
      setColor(NEON_HEX[Math.floor(Math.random() * NEON_HEX.length)]);
      setArchetype(ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)]);
      setVoiceTone(VOICE_TONES[Math.floor(Math.random() * VOICE_TONES.length)]);
      setPositioning(POSITIONING_TAGS[Math.floor(Math.random() * POSITIONING_TAGS.length)]);
    }, 80);

    // Run each named phase sequentially
    let cumulativeDelay = 0;
    GEN_PHASES.forEach((step, idx) => {
      cumulativeDelay += step.durationMs;
      setTimeout(() => {
        setCurrentPhaseIdx(idx);
        if (idx > 0) pushHistory(step.terminalLine);
      }, cumulativeDelay - step.durationMs);
    });

    // Lock at end of all phases
    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      const locked = PALETTE_SETS[Math.floor(Math.random() * PALETTE_SETS.length)];
      const lockedFont = FONTS_2026[Math.floor(Math.random() * FONTS_2026.length)];
      const lockedArch = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
      const lockedVoice = VOICE_TONES[Math.floor(Math.random() * VOICE_TONES.length)];
      const lockedPos = POSITIONING_TAGS[Math.floor(Math.random() * POSITIONING_TAGS.length)];

      setPalette(locked);
      setFont(lockedFont);
      setArchetype(lockedArch);
      setVoiceTone(lockedVoice);
      setPositioning(lockedPos);
      setColor(locked.primary);
      setProgressPct(100);
      setCurrentPhaseIdx(GEN_PHASES.length);
      setPhase('locked');

      pushHistory(`> BRAND PROTOCOL LOCKED // ${name.toUpperCase()}`);
      pushHistory(`> ARCHETYPE: ${lockedArch} // PALETTE: ${locked.name.toUpperCase()}`);
      pushHistory(`> VOICE: ${lockedVoice} // POSITION: ${lockedPos}`);
    }, totalDuration);
  }, [phase, brandInput, pushHistory]);

  // React to external terminal trigger
  useEffect(() => {
    if (autoTrigger) {
      startGeneration();
      onTriggerConsumed?.();
    }
  }, [autoTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startGeneration();
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase('idle');
    setProgressPct(0);
    setCurrentPhaseIdx(-1);
    setSubmittedName('');
    setBrandInput('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const isGenerating = phase === 'generating';
  const isLocked = phase === 'locked';
  const isIdle = phase === 'idle';
  const currentPhaseName = currentPhaseIdx >= 0 && currentPhaseIdx < GEN_PHASES.length
    ? GEN_PHASES[currentPhaseIdx].label
    : '';

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu size={12} className="text-violet-400" />
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">
            BRAND PROTOCOL ENGINE
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isGenerating && (
            <motion.div
              className="flex items-center gap-1.5"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span className="text-[9px] font-mono text-violet-400 uppercase tracking-widest">
                {currentPhaseName || 'PROCESSING'}
              </span>
            </motion.div>
          )}
          {isLocked && (
            <div className="flex items-center gap-1.5">
              <Lock size={10} className="text-cyan-400" />
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">LOCKED</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Brand name input ── */}
      <AnimatePresence mode="wait">
        {!isLocked ? (
          <motion.form
            key="input"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex gap-2"
          >
            <div
              className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: 'rgba(10,8,18,0.8)',
                border: `1px solid ${isGenerating ? color + '50' : 'rgba(255,255,255,0.08)'}`,
                transition: 'border-color 0.15s',
              }}
            >
              <span className="text-[10px] font-mono text-zinc-700">$</span>
              <input
                ref={inputRef}
                type="text"
                value={brandInput}
                onChange={(e) => setBrandInput(e.target.value)}
                placeholder="Enter brand or company name..."
                disabled={isGenerating}
                className="flex-1 bg-transparent text-xs font-mono text-zinc-200 placeholder-zinc-700 outline-none disabled:opacity-40"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              style={{
                background: 'rgba(167,139,250,0.12)',
                border: '1px solid rgba(167,139,250,0.30)',
                color: '#a78bfa',
              }}
            >
              {isGenerating ? (
                <RefreshCw size={11} className="animate-spin" />
              ) : (
                <Send size={11} />
              )}
              {isGenerating ? 'RUNNING' : 'GENERATE'}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="locked-name"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-3 py-2 rounded-xl"
            style={{
              background: 'rgba(34,211,238,0.05)',
              border: '1px solid rgba(34,211,238,0.15)',
            }}
          >
            <div className="flex items-center gap-2">
              <Lock size={10} className="text-cyan-400 shrink-0" />
              <span className="text-xs font-mono font-bold text-cyan-400">{submittedName}</span>
            </div>
            <button
              onClick={handleReset}
              className="text-[9px] font-mono text-zinc-600 hover:text-zinc-400 uppercase tracking-widest transition-colors"
            >
              RESET
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Phase progress stepper ── */}
      {(isGenerating || isLocked) && (
        <div className="space-y-1.5">
          {/* Progress bar */}
          <div className="w-full h-px bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: isLocked ? '#22d3ee' : color }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.12 }}
            />
          </div>
          {/* Phase step pills */}
          <div className="flex gap-1 flex-wrap">
            {GEN_PHASES.map((step, i) => {
              const done = isLocked || i < currentPhaseIdx;
              const active = !isLocked && i === currentPhaseIdx;
              return (
                <motion.span
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                  style={{
                    background: done
                      ? 'rgba(34,211,238,0.10)'
                      : active
                      ? `${color}18`
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${done ? 'rgba(34,211,238,0.25)' : active ? color + '40' : 'rgba(255,255,255,0.06)'}`,
                    color: done ? '#22d3ee' : active ? color : '#52525b',
                  }}
                >
                  {done ? '✓ ' : active ? '⟳ ' : ''}{step.label}
                </motion.span>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Cycling archetype display ── */}
      <motion.div
        className="rounded-xl p-4 relative overflow-hidden"
        animate={isGenerating ? {
          borderColor: [color + '30', color + '80', color + '30'],
          boxShadow: [`0 0 0px ${color}00`, `0 0 24px ${color}30`, `0 0 0px ${color}00`],
        } : {}}
        transition={{ duration: 0.8, repeat: isGenerating ? Infinity : 0 }}
        style={{
          background: 'rgba(10,8,18,0.8)',
          border: `1px solid ${isLocked ? palette.primary + '50' : isGenerating ? color + '30' : 'rgba(255,255,255,0.06)'}`,
        }}
      >
        <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mb-2">ARCHETYPE</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={archetype}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.12 }}
            className="text-xl font-bold font-mono tracking-tight"
            style={{ color: isLocked ? palette.primary : isGenerating ? color : '#52525b' }}
          >
            {isIdle ? '——' : archetype}
          </motion.p>
        </AnimatePresence>

        {/* Voice + Positioning row */}
        <AnimatePresence mode="wait">
          {(isGenerating || isLocked) && (
            <motion.div
              key={`meta-${voiceTone}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="flex gap-3 mt-2"
            >
              <div>
                <p className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">VOICE</p>
                <p className="text-[10px] font-mono font-semibold" style={{ color: isLocked ? palette.accent : color + 'cc' }}>
                  {voiceTone}
                </p>
              </div>
              <div>
                <p className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">POSITIONING</p>
                <p className="text-[10px] font-mono font-semibold" style={{ color: isLocked ? palette.accent : color + 'cc' }}>
                  {positioning}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">TYPEFACE</p>
                <p className="text-[10px] font-mono" style={{ color: isLocked ? palette.primary + 'aa' : '#52525b' }}>
                  {font}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Locked brand archetype data card ── */}
      <AnimatePresence mode="wait">
        {isLocked ? (
          <motion.div
            key="protocol-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="space-y-3"
          >
            {/* Protocol header */}
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">
                BRAND PROTOCOL // {palette.name.toUpperCase()}
              </p>
              <span
                className="text-[8px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(34,211,238,0.10)', border: '1px solid rgba(34,211,238,0.25)', color: '#22d3ee' }}
              >
                IDENTITY LOCKED
              </span>
            </div>

            {/* 3D perspective color swatch row */}
            <div className="grid grid-cols-4 gap-2" style={{ perspective: '800px' }}>
              {[
                { label: 'PRIMARY',   hex: palette.primary   },
                { label: 'SECONDARY', hex: palette.secondary },
                { label: 'ACCENT',    hex: palette.accent    },
                { label: 'NEUTRAL',   hex: palette.neutral   },
              ].map((swatch, i) => (
                <motion.div
                  key={swatch.label}
                  initial={{ opacity: 0, rotateX: -30, y: 12 }}
                  animate={{ opacity: 1, rotateX: 8, y: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18, delay: i * 0.07 }}
                  whileHover={{ rotateX: 0, scale: 1.05 }}
                  className="rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: `0 8px 24px ${swatch.hex}30`,
                    border: `1px solid ${swatch.hex}40`,
                  }}
                >
                  <div className="h-12 w-full" style={{ backgroundColor: swatch.hex }} />
                  <div className="px-1.5 py-1" style={{ background: 'rgba(10,8,18,0.92)' }}>
                    <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-wider">{swatch.label}</p>
                    <p className="text-[8px] font-mono font-bold" style={{ color: swatch.hex }}>{swatch.hex}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Brand metrics row */}
            <div
              className="grid grid-cols-3 gap-2 rounded-xl p-3"
              style={{ background: 'rgba(10,8,18,0.6)', border: `1px solid ${palette.primary}18` }}
            >
              {[
                { label: 'ARCHETYPE',   value: archetype.replace('THE ', '') },
                { label: 'VOICE TONE',  value: voiceTone },
                { label: 'POSITIONING', value: positioning },
              ].map((metric) => (
                <div key={metric.label}>
                  <p className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest mb-0.5">{metric.label}</p>
                  <p className="text-[10px] font-mono font-bold leading-tight" style={{ color: palette.primary }}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Typeface specimen — holographic card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="rounded-xl p-4 relative overflow-hidden"
              style={{
                background: 'rgba(10,8,18,0.85)',
                border: `1px solid ${palette.primary}25`,
                transform: 'perspective(1000px) rotateX(4deg)',
                transformOrigin: 'top center',
              }}
            >
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
                }}
              />
              <p className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest mb-2">TYPEFACE SPECIMEN</p>
              <p
                className="text-base font-bold leading-snug"
                style={{ fontFamily: `'${font}', monospace`, color: palette.primary }}
              >
                Build revenue systems<br />that compound.
              </p>
              <p className="text-[9px] text-zinc-700 font-mono mt-2">{font} · {archetype}</p>
            </motion.div>
          </motion.div>
        ) : isIdle ? (
          <motion.div
            key="idle-prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center py-8 gap-3"
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.15)' }}
            >
              <Cpu size={18} className="text-violet-400/50" />
            </div>
            <p className="text-xs font-mono text-zinc-700 text-center leading-relaxed">
              Enter a brand name above<br />
              <span className="text-zinc-800">or type</span>{' '}
              <span className="text-cyan-400/60">generate brand [name]</span>{' '}
              <span className="text-zinc-800">in the terminal</span>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="generating-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center py-4"
          >
            <p className="text-[10px] font-mono text-zinc-600 text-center uppercase tracking-widest">
              Analyzing brand vectors...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA row ── */}
      {isLocked && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-2 mt-auto pt-2"
        >
          <button
            onClick={() => startGeneration(submittedName.toLowerCase())}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-150"
            style={{
              background: 'rgba(34,211,238,0.06)',
              border: '1px solid rgba(34,211,238,0.20)',
              color: '#22d3ee',
            }}
          >
            <RefreshCw size={11} />
            REGENERATE
          </button>
          <Link
            to="/apps/brand-builder"
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-mono text-xs text-zinc-600 hover:text-cyan-400 border border-zinc-800 hover:border-cyan-400/30 transition-all"
          >
            FULL APP <ArrowRight size={10} />
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default BrandBuilderDemo;
