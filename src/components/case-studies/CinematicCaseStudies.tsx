import React, { useState, useId, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X, ArrowRight, TrendingUp, Zap, Shield, Music2, Settings, Compass,
  BarChart3, Lock, FlaskConical
} from 'lucide-react';
import type { CaseStudy } from '../../data/caseStudies';

interface CinematicCaseStudiesProps {
  studies: CaseStudy[];
}

const ACCENT_COLORS: Record<string, string> = {
  'the-launchpad':  '#7C5CFF',
  'the-fortress':   '#60A5FA',
  'the-conductor':  '#F472B6',
  'the-engine-room':'#38BDF8',
  'the-compass':    '#34D399',
  'the-guardian':   '#FB923C',
};

// Lucide icon map replacing emoji — matches site aesthetic
const SLUG_ICONS: Record<string, React.FC<{ size?: number; style?: React.CSSProperties }>> = {
  'the-launchpad':   TrendingUp,
  'the-fortress':    Shield,
  'the-conductor':   Music2,
  'the-engine-room': Settings,
  'the-compass':     Compass,
  'the-guardian':    Lock,
  'graston-ceu-system': FlaskConical,
  'rbe-law':         BarChart3,
  'ultimate-tech-roi': Zap,
};

// ─── Expanded detail modal (unchanged interaction, updated icon) ──────────
const ExpandedModule: React.FC<{
  study: CaseStudy;
  color: string;
  onClose: () => void;
}> = ({ study, color, onClose }) => {
  const Icon = SLUG_ICONS[study.slug] ?? TrendingUp;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/85" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0D1117] border rounded-2xl shadow-2xl"
        style={{ borderColor: `${color}40` }}
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div
          className="relative p-8 border-b"
          style={{ background: `linear-gradient(135deg, ${color}12 0%, transparent 60%)`, borderColor: `${color}20` }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${color}18`, border: `1px solid ${color}35` }}
            >
              <Icon size={22} style={{ color }} />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] mb-1" style={{ color }}>
                {study.category.join(' · ')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{study.title}</h2>
              <p className="text-white/60">{study.tagline}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 grid sm:grid-cols-2 gap-8">
          {/* Left: metrics */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={14} style={{ color }} />
                <span className="text-xs font-mono uppercase tracking-wider text-white/50">Measured Impact</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {study.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between bg-white/5 border rounded-xl p-4"
                    style={{ borderColor: `${color}25` }}
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-white/50">{m.label}</span>
                    <span className="text-xl font-black font-mono tabular-nums" style={{ color }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {study.technologies && (
              <div className="flex flex-wrap gap-2">
                {study.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full border"
                    style={{ borderColor: `${color}35`, color: `${color}BB` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: narrative */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-white/30 mb-2">Challenge</p>
              <p className="text-white/65 text-sm leading-relaxed">{study.challenge}</p>
            </div>
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-white/30 mb-2">Strategy</p>
              <p className="text-white/65 text-sm leading-relaxed">{study.strategy}</p>
            </div>
            <Link
              to={`/case-studies/${study.slug}`}
              className="mt-auto flex items-center gap-2 text-sm font-semibold uppercase tracking-wider group"
              style={{ color }}
            >
              Read Full Case Study
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Single bento card ────────────────────────────────────────────────────
const BentoCard: React.FC<{
  study: CaseStudy;
  index: number;
  onExpand: () => void;
  featured?: boolean;
}> = ({ study, index, onExpand, featured: isFeatured }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const color = study.color ?? ACCENT_COLORS[study.slug] ?? '#40E0D0';
  const Icon = SLUG_ICONS[study.slug] ?? TrendingUp;

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className={isFeatured ? 'md:col-span-2' : ''}
    >
      <button
        onClick={onExpand}
        className="group w-full text-left relative rounded-2xl overflow-hidden border bg-[#0A0C12] transition-all duration-300 hover:border-opacity-60 focus-visible:outline-none focus-visible:ring-2"
        style={{
          borderColor: `${color}20`,
          boxShadow: `0 0 0 1px ${color}08`,
        }}
        aria-label={`Open case study: ${study.title}`}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300 group-hover:opacity-100 opacity-60"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)` }}
        />

        {/* Ambient glow — only renders, no GPU animation */}
        <div
          className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${color}18, transparent 70%)` }}
          aria-hidden="true"
        />

        <div className={`relative z-10 p-7 ${isFeatured ? 'flex flex-col md:flex-row gap-8' : 'flex flex-col'}`}>

          {/* ── Left / Main block ── */}
          <div className={`flex flex-col gap-5 ${isFeatured ? 'flex-1' : ''}`}>
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.3em] mb-0.5" style={{ color: `${color}80` }}>
                    {study.category[0]}
                  </p>
                  <h3 className="font-sans font-black text-xl tracking-tight text-white leading-none">
                    {study.title}
                  </h3>
                </div>
              </div>
              <span
                className="flex-shrink-0 text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border"
                style={{ color: `${color}70`, borderColor: `${color}25`, background: `${color}08` }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{study.tagline}</p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5">
              {(study.technologies ?? study.tags).slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ borderColor: `${color}18`, color: `${color}65` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right / Metrics block ── */}
          <div className={`flex ${isFeatured ? 'md:flex-col md:w-56 flex-row' : 'flex-row'} gap-3 ${isFeatured ? 'md:mt-0 mt-2' : 'mt-2'}`}>
            {study.metrics.slice(0, 2).map((m) => (
              <div
                key={m.label}
                className={`flex flex-col gap-0.5 rounded-xl p-4 border flex-1`}
                style={{ background: `${color}06`, borderColor: `${color}18` }}
              >
                <span
                  className="font-black font-mono tabular-nums leading-none"
                  style={{ color, fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
                >
                  {m.value}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/35 leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA row — bottom */}
          <div className="absolute bottom-5 right-7 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color }}>Full Breakdown</span>
            <ArrowRight size={11} style={{ color }} />
          </div>
        </div>
      </button>
    </motion.div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────
const CinematicCaseStudies: React.FC<CinematicCaseStudiesProps> = ({ studies }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const uid = useId();

  // 3 featured cards on home page — no 500vh scroll trap
  const featured = studies.filter((s) => s.featured).slice(0, 3);
  const expandedStudy = featured.find((s) => s.slug === expandedId);
  const expandedColor = expandedStudy?.color ?? ACCENT_COLORS[expandedId ?? ''] ?? '#40E0D0';

  return (
    <section className="relative bg-[#050507] py-24" aria-labelledby="cinematic-studies-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400/50 mb-4">
            Field Reports // Case Studies
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="cinematic-studies-title"
              className="font-sans font-black leading-none text-white"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
            >
              Work That{' '}
              <span className="text-cyan-400">Moves</span>{' '}
              Numbers.
            </h2>
            <Link
              to="/case-studies"
              className="flex-shrink-0 flex items-center gap-2 text-cyan-400 hover:text-white border border-cyan-400/25 hover:border-cyan-400/60 px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-150"
            >
              All Case Studies
              <ArrowRight size={12} />
            </Link>
          </div>
          <p className="text-white/35 text-sm mt-4 max-w-lg">
            Click any card to expand the full ROI breakdown, strategy, and tech architecture.
          </p>
        </motion.div>

        {/* Bento grid — 2 cols, first card spans both */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((study, i) => (
            <BentoCard
              key={`${uid}-${study.slug}`}
              study={study}
              index={i}
              featured={i === 0}
              onExpand={() => setExpandedId(study.slug)}
            />
          ))}
        </div>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expandedId && expandedStudy && (
          <ExpandedModule
            key={expandedId}
            study={expandedStudy}
            color={expandedColor}
            onClose={() => setExpandedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default CinematicCaseStudies;
