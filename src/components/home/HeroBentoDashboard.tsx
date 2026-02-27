import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, Cpu, Wifi, ExternalLink, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { useMouseGlow } from '../../hooks/useMouseGlow';
import { useSystemStore } from '../../store/useSystemStore';
import { useTerminalFocus } from '../../hooks/useTerminalFocus';
import { OceanRippleButton } from '../ui/OceanRippleButton';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import ArchitectCore from './ArchitectCore';

// ─── Bio images ────────────────────────────────────────────────────────────
const BIO_IMAGES = [
  '/images/bio/bio pic 2.png',
  '/images/bio/bio pic 3.png',
  '/images/bio/bio-photo.jpg',
  '/images/bio/IMG_20230707_235448_262~2.jpg',
  '/images/bio/QVZlSmkxeURiak5tajdscg.jpeg',
];

// ─── Active projects ────────────────────────────────────────────────────────
const ACTIVE_PROJECTS = [
  { name: 'Graston Growth Engine', status: 'LIVE',     stack: 'React · HubSpot', href: '/demos/graston-growth-engine' },
  { name: 'Clinical Compass',       status: 'LIVE',     stack: 'TypeScript · AI',  href: '/demos'           },
  { name: 'Signal Routing System',  status: 'BUILDING', stack: 'Node · Webhooks',  href: '/war-room'        },
  { name: 'Analytics Enablement',   status: 'STAGING',  stack: 'GA4 · BigQuery',   href: '/case-studies'    },
];

const STATUS_STYLE: Record<string, string> = {
  LIVE:     'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  BUILDING: 'text-yellow-400  border-yellow-400/30  bg-yellow-400/10',
  STAGING:  'text-blue-400    border-blue-400/30    bg-blue-400/10',
};

// ─── Live telemetry values (cycled) ────────────────────────────────────────
const useLiveTelemetry = () => {
  const [latency, setLatency] = useState(18);
  const [uptime]  = useState('99.9%');
  const [protos]  = useState(4);

  useEffect(() => {
    const id = setInterval(() => {
      setLatency(Math.floor(Math.random() * 12) + 14);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return { uptime, protos, latency };
};

// ─── Inline terminal with telemetry dock ───────────────────────────────────
interface InlineTerminalProps {
  onMouseEnter?: () => void;
}

const InlineTerminal: React.FC<InlineTerminalProps> = ({ onMouseEnter }) => {
  const { terminalHistory, activeModule, isBooting, runCommand, triggerBrandBuild } = useSystemStore();
  const { uptime, protos, latency } = useLiveTelemetry();
  const [input, setInput] = useState('');
  const [localLines, setLocalLines] = useState<Array<{ text: string; type: 'output' | 'input' | 'cmd' }>>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const glowRef   = useMouseGlow<HTMLDivElement>();

  // Sync store history → local display
  useEffect(() => {
    setLocalLines(
      terminalHistory.map((text) => ({
        text,
        type: text.startsWith('> EXEC:') ? 'cmd' : 'output',
      }))
    );
  }, [terminalHistory]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localLines, isBooting]);

  useEffect(() => {
    if (!isBooting) inputRef.current?.focus();
  }, [isBooting]);

  const execute = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    const lower = trimmed.toLowerCase();

    if (lower === 'clear') { setLocalLines([]); return; }
    if (lower === 'status' || lower.startsWith('mount ')) { runCommand(trimmed); return; }

    // Remote brand build trigger
    if (lower === 'generate brand' || lower === 'generate-brand') {
      setLocalLines((prev) => [...prev, { text: `$ ${trimmed}`, type: 'input' }]);
      triggerBrandBuild();
      return;
    }

    setLocalLines((prev) => [...prev, { text: `$ ${trimmed}`, type: 'input' }]);

    const responses: Record<string, string[]> = {
      help:    ['help · contact · skills · clear · status · mount [id] · generate brand'],
      contact: ['hoosierdarling@gmail.com', 'linkedin.com/in/jacobdarling'],
      skills:  ['React · TypeScript · Node · HubSpot · Marketo · GA4'],
      about:   ['Marketing Systems Architect · 15+ yrs · Full-stack MarTech'],
    };

    if (responses[lower]) {
      responses[lower].forEach((l) =>
        setLocalLines((prev) => [...prev, { text: l, type: 'output' }])
      );
    } else {
      setLocalLines((prev) => [...prev, { text: `cmd not found: ${lower}`, type: 'output' }]);
    }
  };

  return (
    <motion.div
      ref={glowRef}
      onMouseEnter={onMouseEnter}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bento-glow flex flex-col h-full min-h-[520px] rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(6,8,14,0.92)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            sys-terminal
          </span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-wider">
          {activeModule.toUpperCase()}
        </span>
      </div>

      {/* Log output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0.5 font-mono text-xs custom-scrollbar">
        <AnimatePresence initial={false}>
          {localLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={
                line.type === 'input' ? 'text-cyan-400' :
                line.type === 'cmd'   ? 'text-yellow-400' :
                                        'text-green-400/80'
              }
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {isBooting && (
          <span className="inline-block w-2 h-3.5 bg-green-400 animate-pulse" />
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!isBooting && (
        <form
          onSubmit={(e) => { e.preventDefault(); execute(input); setInput(''); }}
          className="px-4 py-2.5 border-t flex items-center gap-2"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <ChevronRight size={12} className="text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="enter command..."
            className="flex-1 bg-transparent text-xs font-mono text-green-400 placeholder-zinc-700 outline-none"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      )}

      {/* ── Live Telemetry Dock ── */}
      <div
        className="border-t grid grid-cols-3 divide-x divide-white/5"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        {[
          { icon: <Activity size={11} />, label: 'UPTIME',        value: uptime,         color: '#22d3ee' },
          { icon: <Cpu       size={11} />, label: 'ACTIVE PROTOS', value: String(protos), color: '#a78bfa' },
          { icon: <Wifi      size={11} />, label: 'LATENCY',       value: `${latency}ms`, color: '#34d399' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center gap-0.5 py-2.5 px-2"
            style={{ borderColor: 'rgba(255,255,255,0.04)' }}
          >
            <div className="flex items-center gap-1" style={{ color: `${item.color}99` }}>
              {item.icon}
              <span className="text-[9px] font-mono uppercase tracking-widest">{item.label}</span>
            </div>
            <motion.span
              key={item.value}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-bold font-mono"
              style={{ color: item.color }}
            >
              {item.value}
            </motion.span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Bio card ─────────────────────────────────────────────────────────────
interface BioCardProps {
  onMouseEnter?: () => void;
}

const BioCard: React.FC<BioCardProps> = ({ onMouseEnter }) => {
  const glowRef = useMouseGlow<HTMLDivElement>();
  const [imgIndex, setImgIndex] = useState(0);
  const [imgHovered, setImgHovered] = useState(false);

  const { text: roleText } = useTypingEffect({
    strings: ['Marketing Strategist', 'Systems Architect', 'Growth Engineer', 'Automation Expert'],
    typeSpeed: 85,
    deleteSpeed: 40,
    delayBetweenStrings: 2400,
    loop: true,
    startDelay: 500,
  });

  useEffect(() => {
    const id = setInterval(() => setImgIndex((i) => (i + 1) % BIO_IMAGES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      ref={glowRef}
      onMouseEnter={onMouseEnter}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="bento-glow flex flex-col h-full min-h-[520px] rounded-2xl overflow-hidden relative"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        background: 'rgba(10,10,14,0.72)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* ── Scanline texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] rounded-2xl opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 3px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* ── Profile image ── */}
      <div
        className="relative overflow-hidden flex-shrink-0 cursor-pointer"
        style={{ height: '52%' }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={imgIndex}
            src={BIO_IMAGES[imgIndex]}
            alt="Jacob Darling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500"
            style={{
              mixBlendMode: imgHovered ? 'normal' : 'luminosity',
              filter: imgHovered ? 'none' : 'brightness(0.85)',
            }}
          />
        </AnimatePresence>

        {/* Corner tag */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[9px] font-mono uppercase tracking-[0.3em] px-2 py-1 rounded"
            style={{ background: 'rgba(0,0,0,0.6)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.2)' }}
          >
            MODULE 01
          </span>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-black/60 px-2 py-1 rounded border border-emerald-400/20">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            AVAILABLE
          </span>
        </div>

        {/* Hover hint */}
        <div className={`absolute bottom-3 right-3 z-10 transition-opacity duration-300 ${imgHovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-[9px] font-mono text-white/50">COLOR MODE</span>
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0e] to-transparent pointer-events-none z-[2]" />
      </div>

      {/* ── Bio content ── */}
      <div className="relative z-[2] flex flex-col flex-1 p-6 gap-4">
        {/* Role + name */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-400 mb-1.5">
            {roleText}
            <span className="inline-block w-px h-3 bg-cyan-400 ml-1 animate-pulse align-middle" />
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight">
            Jacob Darling
          </h1>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed font-mono flex-1">
          15+ yrs building revenue-driving marketing infrastructure. Connecting insight to action through automation, CRM architecture, and analytics.
        </p>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-1.5">
          {['HubSpot', 'Marketo', 'GA4', 'React', 'TypeScript', 'Node'].map((s) => (
            <span
              key={s}
              className="text-[10px] font-mono px-2 py-0.5 rounded border"
              style={{ color: 'rgba(161,161,170,0.7)', borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Active projects mini-list */}
        <div className="space-y-1.5 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mb-2">ACTIVE SYSTEMS</p>
          {ACTIVE_PROJECTS.map((proj) => (
            <Link
              key={proj.name}
              to={proj.href}
              className="flex items-center justify-between group py-1 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`text-[8px] font-mono px-1.5 py-px rounded border shrink-0 ${STATUS_STYLE[proj.status]}`}
                >
                  {proj.status === 'LIVE' && <span className="inline-block w-1 h-1 rounded-full bg-current mr-0.5 animate-pulse" />}
                  {proj.status}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 group-hover:text-cyan-400 transition-colors truncate">
                  {proj.name}
                </span>
              </div>
              <ExternalLink size={9} className="text-zinc-700 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-2 pt-1">
          <OceanRippleButton asLink href="/resume" variant="primary" className="text-xs px-4 py-2 inline-flex items-center gap-1.5 font-mono">
            View Resume <ArrowRight size={12} />
          </OceanRippleButton>
          <OceanRippleButton asLink href="/contact" variant="outline" className="text-xs px-4 py-2 inline-flex items-center gap-1.5 font-mono">
            Contact
          </OceanRippleButton>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Dashboard ────────────────────────────────────────────────────────
const HeroBentoDashboard: React.FC = () => {
  const bioFocus  = useTerminalFocus('HOVERING: BIO MODULE // JACOB DARLING');
  const termFocus = useTerminalFocus('HOVERING: TERMINAL MODULE // UPLINK ACTIVE');

  return (
    <section
      className="relative w-full min-h-screen flex items-center py-20 md:py-24 px-4"
      aria-label="Systems Dashboard — Module 01"
    >
      {/* 3D WebGL Background - ArchitectCore */}
      <div className="absolute inset-0 -z-10 hidden md:block">
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
          <Suspense fallback={null}>
            {/* @ts-expect-error - R3F JSX elements are valid but not in TypeScript intrinsics */}
            <ambientLight intensity={0.5} />
            <ArchitectCore />
          </Suspense>
        </Canvas>
      </div>

      {/* Section label */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600">
          MODULE 01 // THE ARCHITECT // SYSTEMS DASHBOARD
        </span>
      </div>

      {/* 12-col grid: col 1-7 = Bio (60%), col 8-12 = Terminal (40%) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

        {/* ── BIO CARD — 7/12 cols ≈ 60% ── */}
        <div className="lg:col-span-7">
          <BioCard onMouseEnter={bioFocus.onMouseEnter} />
        </div>

        {/* ── TERMINAL PANEL — 5/12 cols ≈ 40% ── */}
        <div className="lg:col-span-5">
          <InlineTerminal onMouseEnter={termFocus.onMouseEnter} />
        </div>

      </div>
    </section>
  );
};

export default HeroBentoDashboard;
