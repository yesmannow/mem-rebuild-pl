import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ExternalLink,
  Rocket, Shield, Music2, Cpu, Compass,
  Eye, GraduationCap, Scale, BarChart3, Zap,
} from 'lucide-react';
import Lenis from 'lenis';
import type { CaseStudy } from '../../data/caseStudies';
import { useCardVideo } from '../../hooks/useCardVideo';
import CountUp from './CountUp';
import TopicClusterMap from './TopicClusterMap';

// Lucide icon per case-study slug — replaces emojis
const SLUG_ICONS: Record<string, React.ElementType> = {
  'the-launchpad':     Rocket,
  'the-fortress':      Shield,
  'the-conductor':     Music2,
  'the-engine-room':   Cpu,
  'the-compass':       Compass,
  'the-guardian':      Eye,
  'graston-ceu-system': GraduationCap,
  'rbe-law':           Scale,
  'ultimate-tech-roi': BarChart3,
};
const DefaultIcon = Zap;

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyStackProps {
  studies: CaseStudy[];
  activeFilter: string;
}

const ACCENT_FALLBACK = '#40E0D0';

// ── Mobile detection hook ───────────────────────────────────────────────────
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

// ── IntersectionObserver hook for CountUp trigger ───────────────────────────
function useInView(ref: React.RefObject<Element>): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// ── Pexels video background ─────────────────────────────────────────────────
const CardVideo: React.FC<{ slug: string; category: string[]; tags: string[]; color: string }> = ({
  slug, category, tags, color,
}) => {
  const { videoUrl, loading } = useCardVideo(slug, category, tags);
  return (
    <div className="card-video-layer" aria-hidden="true">
      <div
        className="card-video-layer__gradient"
        style={{
          background: `radial-gradient(ellipse at 70% 30%, ${color}20 0%, transparent 65%),
                       linear-gradient(160deg, #0d0d14 0%, #06060c 100%)`,
        }}
      />
      {!loading && videoUrl && (
        <video
          className="card-video-layer__video"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      )}
      {/* Dark scrim — heavy on left so text is always legible */}
      <div className="card-video-layer__scrim" />
      <div className="card-video-layer__text-scrim" />
    </div>
  );
};

// ── Single sticky card ──────────────────────────────────────────────────────
const StackCard: React.FC<{
  study: CaseStudy;
  index: number;
  total: number;
  onHoverChange: (hovered: boolean, color: string) => void;
}> = ({ study, index, total, onHoverChange }) => {
  const color = study.color ?? ACCENT_FALLBACK;
  const metricsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(metricsRef as React.RefObject<Element>);

  const handleEnter = useCallback(() => onHoverChange(true, color), [color, onHoverChange]);
  const handleLeave = useCallback(() => onHoverChange(false, color), [color, onHoverChange]);

  return (
    <div
      className="case-study-card"
      data-index={index}
      style={{ zIndex: 10 + index }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="case-study-card__sticky">
        <div className="case-study-card__panel">
          {/* Pexels video background */}
          <CardVideo slug={study.slug} category={study.category} tags={study.tags} color={color} />

          {/* Recession dim overlay — GSAP animates opacity 0→0.75 as card is buried */}
          <div className="card-recession-overlay" aria-hidden="true" />

          {/* top accent line */}
          <div
            className="case-study-card__accent-line"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          />

          {/* tactile grid overlay */}
          <div className="tactile-grid absolute inset-0 pointer-events-none opacity-25" aria-hidden="true" />

          {/* ── content grid ── */}
          <div className="case-study-card__content">
            {/* LEFT: narrative */}
            <div className="case-study-card__left">
              <div className="case-study-card__eyebrow">
                <span
                  className="case-study-card__counter"
                  style={{ color, borderColor: `${color}35`, background: `${color}0C` }}
                >
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <span className="case-study-card__category">{study.category[0]}</span>
              </div>

              <div className="case-study-card__title-block">
                {(() => {
                  const IconComp = SLUG_ICONS[study.slug] ?? DefaultIcon;
                  return (
                    <span
                      className="case-study-card__icon"
                      aria-hidden="true"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${color}12`,
                        border: `1px solid ${color}28`,
                        backdropFilter: 'blur(8px)',
                        flexShrink: 0,
                      }}
                    >
                      <IconComp size={18} color={color} strokeWidth={1.5} />
                    </span>
                  );
                })()}
                <div>
                  <h2
                    className="case-study-card__title"
                    style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}
                  >
                    {study.title}
                  </h2>
                  <p className="case-study-card__tagline">{study.tagline}</p>
                </div>
              </div>

              {/* Topic cluster map */}
              <div className="case-study-card__cluster">
                <TopicClusterMap
                  tags={study.tags}
                  technologies={study.technologies}
                  color={color}
                  title={study.title}
                />
              </div>

              {/* tech pills */}
              <div className="case-study-card__pills">
                {(study.technologies ?? study.tags).slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="case-study-card__pill"
                    style={{ borderColor: `${color}25`, color: `${color}80`, background: `${color}06` }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="case-study-card__cta-row">
                <Link
                  to={`/case-studies/${study.slug}`}
                  className="case-study-card__cta-primary"
                  style={{ color, borderColor: `${color}35` }}
                  aria-label={`Read full case study: ${study.title}`}
                  data-cursor-label="Read"
                >
                  Read Case Study
                  <ArrowRight size={13} />
                </Link>
                {study.siteUrl && (
                  <a
                    href={study.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-study-card__cta-secondary"
                    style={{ color: `${color}70`, borderColor: `${color}20` }}
                    aria-label={`Visit live site for ${study.title}`}
                  >
                    Live Site
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT: bold results panel */}
            <div
              ref={metricsRef}
              className="case-study-card__right"
              style={{ borderColor: `${color}12`, background: `${color}05` }}
            >
              <p className="case-study-card__results-label">Measured Impact</p>

              <div className="case-study-card__metrics">
                {study.metrics.map((m) => (
                  <div key={m.label} className="case-study-card__metric">
                    <div
                      className="case-study-card__metric-value"
                      style={{
                        fontFamily: '"Space Grotesk", "Clash Display", sans-serif',
                        textShadow: `0 0 60px ${color}60`,
                      }}
                    >
                      <CountUp value={m.value} color={color} inView={inView} duration={1600} />
                    </div>
                    <div className="case-study-card__metric-label">{m.label}</div>
                    <div
                      className="case-study-card__metric-rule"
                      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                    />
                  </div>
                ))}
              </div>

              <div className="case-study-card__progress">
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    className="case-study-card__progress-dot"
                    style={{
                      background: i === index ? color : `${color}30`,
                      width: i === index ? '1.5rem' : '0.375rem',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Mobile card — vertical list ──────────────────────────────────────────────
const MobileCard: React.FC<{ study: CaseStudy; index: number }> = ({ study, index }) => {
  const color = study.color ?? ACCENT_FALLBACK;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} className="mobile-case-card" style={{ borderColor: `${color}20` }}>
      <div
        className="mobile-case-card__bg"
        style={{ background: `radial-gradient(ellipse at 60% 0%, ${color}18, transparent 70%)` }}
        aria-hidden="true"
      />
      <div className="tactile-grid absolute inset-0 pointer-events-none opacity-20" aria-hidden="true" />
      <div className="mobile-case-card__inner">
        <div className="mobile-case-card__eyebrow">
          <span style={{ color, fontFamily: 'Geist Mono,ui-monospace,monospace', fontSize: '0.6rem', letterSpacing: '0.3em' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ color: `${color}60`, fontFamily: 'Geist Mono,ui-monospace,monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {study.category[0]}
          </span>
        </div>
        <h2 className="mobile-case-card__title" style={{ fontFamily: '"Space Grotesk", "Clash Display", sans-serif' }}>
          {study.icon as string} {study.title}
        </h2>
        <p className="mobile-case-card__tagline">{study.tagline}</p>
        <div className="mobile-case-card__metrics">
          {study.metrics.map((m) => (
            <div key={m.label} className="mobile-case-card__metric">
              <CountUp value={m.value} color={color} inView={inView} duration={1400} />
              <span className="mobile-case-card__metric-label">{m.label}</span>
            </div>
          ))}
        </div>
        <Link
          to={`/case-studies/${study.slug}`}
          className="mobile-case-card__cta"
          style={{ color, borderColor: `${color}30` }}
        >
          Read Case Study <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};

// ── Main stack ──────────────────────────────────────────────────────────────
const CaseStudyStack: React.FC<CaseStudyStackProps> = ({ studies, activeFilter }) => {
  const stackRef    = useRef<HTMLDivElement>(null);
  const lenisRef    = useRef<Lenis | null>(null);
  const rafRef      = useRef<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const isMobile    = useIsMobile();

  const [isOverCard, setIsOverCard]           = useState(false);
  const [activeCardColor, setActiveCardColor] = useState(ACCENT_FALLBACK);

  const handleHoverChange = useCallback((hovered: boolean, color: string) => {
    setIsOverCard(hovered);
    if (hovered) setActiveCardColor(color);
  }, []);

  const filtered = activeFilter === 'All'
    ? studies
    : studies.filter(s => s.category.includes(activeFilter) || s.tags.includes(activeFilter));

  // ── Lenis smooth scroll (desktop only) ───────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', () => ScrollTrigger.update());
    const raf = (time: number) => { lenis.raf(time); rafRef.current = requestAnimationFrame(raf); };
    rafRef.current = requestAnimationFrame(raf);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      try { lenis.destroy(); } catch (_e) { /* noop */ }
      lenisRef.current = null;
    };
  }, [isMobile]);

  // ── GSAP sticky-stack with Depth Compression (desktop only) ───────────────
  useEffect(() => {
    if (isMobile) return;
    const ctx = gsap.context(() => {
      triggersRef.current.forEach(t => t.kill());
      triggersRef.current = [];
      const cards = gsap.utils.toArray<HTMLElement>('.case-study-card', stackRef.current ?? undefined);

      cards.forEach((card, i) => {
        // ── Pin each card — offset 80px from top so stack lands higher ────
        const pinST = ScrollTrigger.create({
          trigger: card,
          start: 'top 80px',
          pin: true,
          pinSpacing: false,
          id: `stack-pin-${i}`,
        });
        triggersRef.current.push(pinST);

        // ── Depth Compression: recede card[i-1] as card[i] approaches ────
        if (i > 0) {
          const prevCard    = cards[i - 1];
          const prevPanel   = prevCard.querySelector<HTMLElement>('.case-study-card__panel');
          const prevOverlay = prevCard.querySelector<HTMLElement>('.card-recession-overlay');

          if (prevPanel && prevOverlay) {
            // Only begin recession when card[i] is 60% up the screen
            // (not from the very bottom — that caused premature disappearance)
            gsap.to(prevPanel, {
              scale:  0.92,
              filter: 'blur(15px) brightness(0.5)',
              ease:   'none',
              scrollTrigger: {
                trigger: card,
                start:   'top 65%',
                end:     'top 80px',
                scrub:   0.8,
                id:      `stack-recede-panel-${i}`,
              },
            });

            gsap.to(prevOverlay, {
              opacity: 0.72,
              ease:    'none',
              scrollTrigger: {
                trigger: card,
                start:   'top 65%',
                end:     'top 80px',
                scrub:   0.8,
                id:      `stack-recede-overlay-${i}`,
              },
            });
          }
        }
      });

      ScrollTrigger.refresh();
    }, stackRef);
    return () => { ctx.revert(); triggersRef.current = []; };
  }, [filtered.length, activeFilter, isMobile]);

  // ── Mobile: vertical list ────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="case-study-stack case-study-stack--mobile">
        {filtered.length === 0 ? (
          <div className="case-study-stack__empty"><p>No case studies match this filter.</p></div>
        ) : (
          filtered.map((study, i) => <MobileCard key={study.slug} study={study} index={i} />)
        )}
      </div>
    );
  }

  // ── Desktop: sticky-stack ────────────────────────────────────────────────
  return (
    <>
      <div ref={stackRef} className="case-study-stack">
        {filtered.length === 0 ? (
          <div className="case-study-stack__empty"><p>No case studies match this filter.</p></div>
        ) : (
          <>
            {filtered.map((study, i) => (
              <StackCard
                key={study.slug}
                study={study}
                index={i}
                total={filtered.length}
                onHoverChange={handleHoverChange}
              />
            ))}
            <div style={{ height: '20vh' }} aria-hidden="true" />
          </>
        )}
      </div>
    </>
  );
};

export default CaseStudyStack;
