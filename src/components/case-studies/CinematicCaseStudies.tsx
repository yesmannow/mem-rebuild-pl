import React, { useRef, useState, useId, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import { X, ArrowRight, TrendingUp, Layers, Zap } from 'lucide-react';
import type { CaseStudy } from '../../data/caseStudies';
import CountUp from './CountUp';

function useInView(ref: React.RefObject<Element>): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

interface CinematicCaseStudiesProps {
  studies: CaseStudy[];
}

const ACCENT_COLORS: Record<string, string> = {
  'the-launchpad': '#7C5CFF',
  'the-fortress': '#60A5FA',
  'the-conductor': '#F472B6',
  'the-engine-room': '#38BDF8',
};

const TopicCluster: React.FC<{ tags: string[]; color: string }> = ({ tags, color }) => {
  const centerX = 120;
  const centerY = 100;
  const radius = 70;

  return (
    <svg viewBox="0 0 240 200" className="w-full h-full" aria-hidden="true">
      {/* Center node */}
      <circle cx={centerX} cy={centerY} r={18} fill={`${color}22`} stroke={color} strokeWidth={1.5} />
      <text x={centerX} y={centerY + 4} textAnchor="middle" fontSize={8} fill={color} fontFamily="monospace">
        CORE
      </text>

      {/* Satellite nodes */}
      {tags.slice(0, 5).map((tag, i) => {
        const angle = (i * 2 * Math.PI) / Math.min(tags.length, 5) - Math.PI / 2;
        const nx = centerX + radius * Math.cos(angle);
        const ny = centerY + radius * Math.sin(angle);
        const labelX = centerX + (radius + 28) * Math.cos(angle);
        const labelY = centerY + (radius + 28) * Math.sin(angle);

        return (
          <g key={tag}>
            <line
              x1={centerX}
              y1={centerY}
              x2={nx}
              y2={ny}
              stroke={`${color}40`}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <circle cx={nx} cy={ny} r={8} fill={`${color}18`} stroke={`${color}80`} strokeWidth={1} />
            <text
              x={labelX}
              y={labelY + 3}
              textAnchor="middle"
              fontSize={5.5}
              fill={`${color}99`}
              fontFamily="monospace"
            >
              {tag.split(' ')[0]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const ROIModule: React.FC<{ metrics: CaseStudy['metrics']; color: string }> = ({ metrics, color }) => (
  <div className="grid grid-cols-2 gap-3">
    {metrics.map((m) => (
      <div
        key={m.label}
        className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded-lg p-4"
        style={{ borderColor: `${color}30` }}
      >
        <span
          className="text-2xl font-bold font-mono"
          style={{ color }}
        >
          {m.value}
        </span>
        <span className="text-xs text-white/50 uppercase tracking-wider font-mono">{m.label}</span>
      </div>
    ))}
  </div>
);

const ExpandedModule: React.FC<{
  study: CaseStudy;
  color: string;
  onClose: () => void;
  layoutId: string;
}> = ({ study, color, onClose, layoutId }) => (
  <motion.div
    layoutId={layoutId}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Backdrop */}
    <motion.div
      className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />

    {/* Panel */}
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
        style={{
          background: `linear-gradient(135deg, ${color}12 0%, transparent 60%)`,
          borderColor: `${color}20`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4">
          <span className="text-4xl" role="img" aria-label={study.title}>
            {study.icon as string}
          </span>
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
        {/* Left: ROI + Cluster */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={14} style={{ color }} />
              <span className="text-xs font-mono uppercase tracking-wider text-white/50">ROI Metrics</span>
            </div>
            <ROIModule metrics={study.metrics} color={color} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers size={14} style={{ color }} />
              <span className="text-xs font-mono uppercase tracking-wider text-white/50">Topic Cluster Map</span>
            </div>
            <div
              className="rounded-lg border p-2 bg-white/[0.02]"
              style={{ borderColor: `${color}20`, height: 180 }}
            >
              <TopicCluster tags={study.tags} color={color} />
            </div>
          </div>
        </div>

        {/* Right: Narrative */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} style={{ color }} />
              <span className="text-xs font-mono uppercase tracking-wider text-white/50">The Challenge</span>
            </div>
            <p className="text-white/65 text-sm leading-relaxed">{study.challenge}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} style={{ color }} />
              <span className="text-xs font-mono uppercase tracking-wider text-white/50">The Strategy</span>
            </div>
            <p className="text-white/65 text-sm leading-relaxed">{study.strategy}</p>
          </div>

          {/* Tech stack */}
          {study.technologies && (
            <div className="flex flex-wrap gap-2 pt-2">
              {study.technologies.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ borderColor: `${color}40`, color: `${color}BB` }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

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

// ─── 100vh Sticky Panel ───────────────────────────────────────────────────
const StickyCard: React.FC<{
  study: CaseStudy;
  index: number;
  total: number;
  onExpand: () => void;
  layoutId: string;
}> = ({ study, index, total, onExpand, layoutId }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const color = study.color ?? ACCENT_COLORS[study.slug] ?? '#40E0D0';
  const inView = useInView(metricsRef as React.RefObject<Element>);

  // Track scroll progress through this card's viewport window
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end start'],
  });

  // Cards beneath: scale down to 0.92, brightness to 0.4 (agency depth effect)
  const underlayScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const underlayOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.45]);

  // Primary card slides up into view
  const primaryY = useTransform(scrollYProgress, [0, 0.2], ['5vh', '0vh']);

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ height: '100vh', zIndex: 10 + index }}
    >
      {/* Sticky viewport — card sticks here while next card slides over */}
      <div className="sticky top-0 h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          layoutId={layoutId}
          style={{
            scale: underlayScale,
            opacity: underlayOpacity,
            y: primaryY,
            filter: prefersReducedMotion ? undefined : 'auto',
            willChange: 'transform, opacity, filter',
          }}
          className="w-full max-w-5xl cursor-pointer"
          onClick={onExpand}
          role="button"
          tabIndex={0}
          aria-label={`Open case study: ${study.title}`}
          onKeyDown={(e) => e.key === 'Enter' && onExpand()}
        >
          {/* ── Card body with 3D tilt ── */}
          <Tilt
            tiltMaxAngleX={prefersReducedMotion ? 0 : 3}
            tiltMaxAngleY={prefersReducedMotion ? 0 : 5}
            glareEnable={!prefersReducedMotion}
            glareMaxOpacity={0.06}
            glareColor={color}
            glarePosition="all"
            scale={1.01}
            transitionSpeed={600}
            tiltReverse={false}
            className="w-full"
          >
          <div
            className="relative w-full rounded-2xl overflow-hidden border bg-[#0A0C12] group"
            style={{
              borderColor: `${color}20`,
              minHeight: 'min(520px, 72vh)',
              boxShadow: `0 32px 100px rgba(0,0,0,0.7), 0 0 0 1px ${color}0C`,
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            />

            {/* Ambient background glow */}
            <div
              className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${color}14, transparent 70%)`,
                filter: 'blur(60px)',
              }}
              aria-hidden="true"
            />

            {/* Tactile dot-grid overlay */}
            <div className="tactile-grid absolute inset-0 pointer-events-none opacity-35" aria-hidden="true" />

            {/* Noise texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.025]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] h-full">
              {/* ── Left: narrative ── */}
              <div className="flex flex-col justify-between p-8 lg:p-12">
                {/* Index + category */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span
                      className="text-[10px] font-mono uppercase tracking-[0.3em] px-2.5 py-1 rounded-full border"
                      style={{ color, borderColor: `${color}35`, background: `${color}0C` }}
                    >
                      {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">
                      {study.category[0]}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex items-start gap-4 mb-5">
                    <span className="text-4xl leading-none shrink-0 mt-1" role="img" aria-hidden="true">
                      {study.icon as string}
                    </span>
                    <div>
                      <h3
                        className="text-4xl sm:text-5xl font-black text-white leading-none tracking-tight mb-3"
                        style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}
                      >
                        {study.title}
                      </h3>
                      <p className="text-white/40 text-base leading-relaxed">{study.tagline}</p>
                    </div>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed max-w-lg line-clamp-4">
                    {study.challenge}
                  </p>
                </div>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {(study.technologies ?? study.tags).slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full border backdrop-blur-sm"
                      style={{ borderColor: `${color}20`, color: `${color}75`, background: `${color}06` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Right: heroic results panel ── */}
              <div
                ref={metricsRef}
                className="flex flex-col justify-between p-8 border-l"
                style={{ borderColor: `${color}10`, background: `${color}03` }}
              >
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/25 mb-6">
                    Measured Impact
                  </p>

                  <div className="flex flex-col gap-5">
                    {study.metrics.map((m) => (
                      <div key={m.label}>
                        {/* Massive cinematic metric — 15vw target, clamp prevents overflow */}
                        <div
                          className="font-black leading-none mb-1.5 tabular-nums"
                          style={{
                            fontFamily: '"Space Grotesk", "Clash Display", sans-serif',
                            fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)',
                            textShadow: `0 0 60px ${color}55`,
                          }}
                        >
                          <CountUp value={m.value} color={color} inView={inView} duration={1800} />
                        </div>
                        <div className="text-[9px] font-mono uppercase tracking-[0.28em] text-white/30">
                          {m.label}
                        </div>
                        <div
                          className="mt-2 h-px w-full opacity-15"
                          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expand CTA */}
                <button
                  className="mt-8 flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-all duration-100 group/btn"
                  style={{ color }}
                  aria-label={`Open full breakdown: ${study.title}`}
                >
                  Full Breakdown
                  <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
          </Tilt>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────
const CinematicCaseStudies: React.FC<CinematicCaseStudiesProps> = ({ studies }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const uid = useId();

  const featured = studies.filter((s) => s.featured).slice(0, 5);
  const expandedStudy = featured.find((s) => s.slug === expandedId);
  const expandedColor = expandedStudy?.color ?? ACCENT_COLORS[expandedId ?? ''] ?? '#40E0D0';

  return (
    <section className="relative bg-[#050507]" aria-labelledby="cinematic-studies-title">
      {/* Section header — pinned above the stack */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#22d3ee]/50 mb-4">
            Field Reports // Case Studies
          </p>
          <h2
            id="cinematic-studies-title"
            className="mb-4 leading-none"
            style={{
              fontFamily: '"Space Grotesk", "Clash Display", sans-serif',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.03em',
            }}
          >
            Work That{' '}
            <span style={{ color: '#22d3ee' }}>Moves</span>
            <br />
            Numbers.
          </h2>
          <p className="text-white/40 max-w-lg text-base">
            Click any card to expand the full ROI breakdown, strategy map, and tech architecture.
          </p>
        </motion.div>
      </div>

      {/* Sticky stack — each panel is 100vh */}
      <div className="relative">
        {featured.map((study, i) => (
          <StickyCard
            key={study.slug}
            study={study}
            index={i}
            total={featured.length}
            layoutId={`${uid}-card-${study.slug}`}
            onExpand={() => setExpandedId(study.slug)}
          />
        ))}
      </div>

      {/* View all */}
      <div className="py-20 text-center">
        <Link
          to="/case-studies"
          data-magnetic
          data-cursor-label="All Work"
          className="inline-flex items-center gap-2 text-[#22d3ee] hover:text-white border border-[#22d3ee]/25 hover:border-[#22d3ee]/60 px-8 py-3.5 font-mono text-xs uppercase tracking-widest transition-all duration-100 btn-haptic"
        >
          View All Case Studies
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expandedId && expandedStudy && (
          <ExpandedModule
            key={expandedId}
            study={expandedStudy}
            color={expandedColor}
            layoutId={`${uid}-card-${expandedId}`}
            onClose={() => setExpandedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default CinematicCaseStudies;
