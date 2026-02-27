import React, { useEffect, useRef, useState, useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { searchPexelsVideos } from '../../lib/pexels';

gsap.registerPlugin(ScrollTrigger);

// Search queries tried in order until a video URL is found
const VIDEO_QUERIES = [
  'dark liquid metal abstract',
  'liquid mercury dark cinematic',
  'dark abstract fluid motion',
  'dark data flow abstract',
];

interface HeroCinematicProps {
  onOpenCommandPalette?: () => void;
}

const HeroCinematic: React.FC<HeroCinematicProps> = ({ onOpenCommandPalette }) => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const orbRef        = useRef<HTMLDivElement>(null);   // circular orb GSAP scales 0.1→100
  const svgWrapRef    = useRef<HTMLDivElement>(null);   // SVG headline wrapper fades out on scroll
  const subRef        = useRef<HTMLDivElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const uid = useId().replace(/:/g, '');

  const clipId      = `hero-clip-${uid}`;
  const videoId     = `hero-vid-${uid}`;
  const gradId      = `hero-grad-${uid}`;

  // Fetch Pexels HD/4K video on mount
  useEffect(() => {
    let cancelled = false;
    const fetchVideo = async () => {
      for (const query of VIDEO_QUERIES) {
        const results = await searchPexelsVideos(query, 3);
        if (cancelled) return;
        if (results.length > 0) {
          setVideoUrl(results[0].videoUrl);
          return;
        }
      }
    };
    fetchVideo();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const orb        = orbRef.current;
    const svgWrap    = svgWrapRef.current;

    if (!container || !orb || !svgWrap) return;

    const ctx = gsap.context(() => {
      // ── SVG headline — line-by-line wipe reveal ────────────────────────
      // Each .hero-svg-line starts clipped (scaleY 0 from bottom), reveals upward
      const lines = svgWrap.querySelectorAll<SVGTextElement>('.hero-svg-line');
      gsap.fromTo(
        lines,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.18,
          ease: 'power4.out',
          delay: 0.2,
          force3D: true,
        }
      );

      // Eyebrow
      const eyebrow = container.querySelector<HTMLElement>('.hero-eyebrow');
      if (eyebrow) {
        gsap.fromTo(
          eyebrow,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.05 }
        );
      }

      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.3 }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 1.6 }
        );
      }

      // ── Pinned scroll: circular orb expands to fill screen ────────────
      gsap.to(orb, {
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end:   'bottom top',
          scrub: 1,
          pin:   true,
          anticipatePin: 1,
        },
        scale:        100,
        borderRadius: '0%',
        ease:         'none',
        force3D:      true,
      });

      // Fade out headline + UI as orb expands
      gsap.to(
        [svgWrap, subRef.current, ctaRef.current, container.querySelector('.hero-eyebrow')],
        {
          scrollTrigger: {
            trigger: container,
            start:   'top top',
            end:     '25% top',
            scrub:   true,
          },
          opacity: 0,
          y:       -50,
          force3D: true,
        }
      );
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion, uid]);

  return (
    <div
      ref={containerRef}
      className="hero-container relative"
      style={{ height: '250vh' }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center">

        {/* Tactile dot grid */}
        <div className="tactile-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* ── Sphere — slowly spinning ambient depth element ── */}
        <div
          className="hero-sphere absolute pointer-events-none"
          aria-hidden="true"
          style={{
            width: 'min(90vw, 820px)',
            height: 'min(90vw, 820px)',
            top: 'calc(50% - min(45vw, 410px))',
            left: 'calc(50% - min(45vw, 410px))',
            opacity: 0.07,
            filter: 'invert(1) sepia(1) saturate(2) hue-rotate(155deg) brightness(0.9)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 75%)',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 75%)',
            animation: 'hero-sphere-spin 90s linear infinite',
            willChange: 'transform',
            transformOrigin: 'center center',
          }}
        >
          <img
            src="/images/svgs/gdj-sphere-6522553.svg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* ── Tubedriver — floating right-side architectural accent ── */}
        <div
          className="hero-tube absolute pointer-events-none"
          aria-hidden="true"
          style={{
            width: 'clamp(120px, 14vw, 220px)',
            right: 'clamp(2rem, 6vw, 8rem)',
            top: '50%',
            transform: 'translate3d(0, -50%, 0)',
            opacity: 0.18,
            filter: 'invert(1) sepia(1) saturate(3) hue-rotate(155deg) brightness(1.1)',
            animation: 'hero-tube-float 6s ease-in-out infinite alternate',
            willChange: 'transform',
          }}
        >
          <img
            src="/images/svgs/tubedriver-logo-9630168.svg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* ── Abstract — floating left-side organic accent (mirrors tubedriver) ── */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            width: 'clamp(100px, 12vw, 190px)',
            left: 'clamp(2rem, 5vw, 7rem)',
            top: '50%',
            transform: 'translate3d(0, -50%, 0)',
            opacity: 0.12,
            filter: 'saturate(0.1) brightness(1.8) hue-rotate(155deg) contrast(0.9)',
            animation: 'hero-tube-float 8s ease-in-out infinite alternate-reverse',
            willChange: 'transform',
          }}
        >
          <img
            src="/images/svgs/insspirito-abstract-1277863.svg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Noise grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* ── SVG clipPath headline — video renders inside clipped letter shapes ── */}
        <div
          ref={svgWrapRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              {/* gradient fallback inside letters */}
              <radialGradient id={gradId} cx="50%" cy="50%" r="70%">
                <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="50%"  stopColor="#7c3aed" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#050507"  stopOpacity="1" />
              </radialGradient>

              {/* The clip path — text defines the mask shape */}
              <clipPath id={clipId}>
                <text
                  className="hero-svg-line"
                  x="50%"
                  y="175"
                  textAnchor="middle"
                  fontFamily='"Space Grotesk", "Clash Display", sans-serif'
                  fontSize="148"
                  fontWeight="900"
                  letterSpacing="-4"
                >
                  MARKETING
                </text>
                <text
                  className="hero-svg-line"
                  x="50%"
                  y="330"
                  textAnchor="middle"
                  fontFamily='"Space Grotesk", "Clash Display", sans-serif'
                  fontSize="148"
                  fontWeight="900"
                  letterSpacing="-4"
                >
                  ARCHITECTURE
                </text>
              </clipPath>
            </defs>

            {/* Clipped group — video + gradient live inside the letter cutouts */}
            <g clipPath={`url(#${clipId})`}>
              {/* Gradient fallback always shown */}
              <rect x="0" y="0" width="1200" height="400" fill={`url(#${gradId})`} />

              {/* Pexels video rendered inside letters via foreignObject */}
              {videoUrl && (
                <foreignObject x="0" y="0" width="1200" height="400">
                  <video
                    id={videoId}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.9,
                      filter: 'saturate(1.3) brightness(1.1)',
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                </foreignObject>
              )}
            </g>

            {/* Outline stroke layer — gives letters crisp definition */}
            <text
              className="hero-svg-line"
              x="50%"
              y="175"
              textAnchor="middle"
              fontFamily='"Space Grotesk", "Clash Display", sans-serif'
              fontSize="148"
              fontWeight="900"
              letterSpacing="-4"
              fill="none"
              stroke="rgba(34,211,238,0.25)"
              strokeWidth="1"
            >
              MARKETING
            </text>
            <text
              className="hero-svg-line"
              x="50%"
              y="330"
              textAnchor="middle"
              fontFamily='"Space Grotesk", "Clash Display", sans-serif'
              fontSize="148"
              fontWeight="900"
              letterSpacing="-4"
              fill="none"
              stroke="rgba(34,211,238,0.18)"
              strokeWidth="1"
            >
              ARCHITECTURE
            </text>
          </svg>
        </div>

        {/* ── Circular orb — GSAP scales 0.1→100 on scroll, reveals the full video ── */}
        <div
          ref={orbRef}
          className="video-mask absolute"
          style={{
            width:        340,
            height:       340,
            borderRadius: '50%',
            overflow:     'hidden',
            willChange:   'transform, border-radius',
            transform:    'translate3d(0, 0, 0)',
            zIndex:       1,
            boxShadow:    '0 0 0 1px rgba(34,211,238,0.20), 0 0 120px 0 rgba(34,211,238,0.12)',
          }}
          aria-hidden="true"
        >
          {/* Gradient fallback */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 35% 45%, rgba(34,211,238,0.45) 0%, rgba(124,92,255,0.30) 40%, rgba(5,5,7,1) 75%)',
              animation:  'gradient-drift 8s ease-in-out infinite alternate',
              opacity:    videoUrl ? 0 : 1,
              transition: 'opacity 1.4s ease',
            }}
          />

          {/* Full-viewport 4K video inside the orb */}
          {videoUrl && (
            <video
              key={videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              style={{
                opacity:    1,
                transition: 'opacity 1.4s ease',
                filter:     'saturate(1.2) brightness(0.85)',
              }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}

          {/* Vignette + scanline */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle, transparent 45%, rgba(5,5,7,0.6) 100%)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
            }}
          />
        </div>

        {/* ── UI layer — eyebrow, sub-tagline, CTAs ── */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 pointer-events-none select-none mt-[260px] sm:mt-[300px]">

          {/* Eyebrow */}
          <div
            className="hero-eyebrow mb-6 flex items-center gap-2"
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            <span className="inline-flex items-center gap-2 border border-[#22d3ee]/20 text-[#22d3ee] text-[10px] font-mono uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-[#22d3ee]/5 backdrop-blur-sm">
              <img
                src="/images/svgs/u_elq1vz823k-bitcoin-9620394.svg"
                alt=""
                style={{
                  width: 13,
                  height: 13,
                  filter: 'invert(1) sepia(1) saturate(4) hue-rotate(155deg) brightness(1.4)',
                  opacity: 0.9,
                }}
              />
              Systems Architect · Marketing Infrastructure
            </span>
          </div>

          {/* Accessible h1 hidden visually — SVG carries the visual */}
          <h1 className="sr-only">Marketing Architecture</h1>

          {/* Sub-tagline */}
          <div
            ref={subRef}
            className="font-mono text-xs uppercase tracking-[0.4em] text-white/30"
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            Strategy&nbsp;·&nbsp;Automation&nbsp;·&nbsp;Growth&nbsp;·&nbsp;Revenue
          </div>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            <Link
              to="/case-studies"
              data-magnetic
              data-cursor-label="View Work"
              className="group flex items-center gap-2 bg-[#22d3ee] text-[#050507] font-semibold px-8 py-3.5 text-sm uppercase tracking-wider hover:bg-white/5 backdrop-blur-xl transition-colors duration-100 will-change-transform btn-haptic"
            >
              View Case Studies
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              onClick={onOpenCommandPalette}
              data-magnetic
              className="flex items-center gap-2.5 border border-white/15 text-white/50 hover:text-white hover:border-white/30 px-8 py-3.5 text-sm uppercase tracking-wider transition-all duration-100 font-mono backdrop-blur-sm btn-haptic"
            >
              <kbd className="text-[10px] bg-white/8 px-1.5 py-0.5 rounded border border-white/10">⌘K</kbd>
              Command
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          aria-hidden="true"
        >
          <img
            src="/images/svgs/u_elq1vz823k-bitcoin-9620394.svg"
            alt=""
            style={{
              width: 16,
              height: 16,
              filter: 'invert(1) sepia(1) saturate(2) hue-rotate(155deg) brightness(1.1)',
              opacity: 0.3,
              marginBottom: 4,
            }}
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/25">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default HeroCinematic;
