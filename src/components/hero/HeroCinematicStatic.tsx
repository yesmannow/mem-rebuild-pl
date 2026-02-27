import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroCinematicStaticProps {
  onOpenCommandPalette?: () => void;
}

const HeroCinematicStatic: React.FC<HeroCinematicStaticProps> = ({ onOpenCommandPalette }) => {
  const prefersReducedMotion = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on the photo panel — no GSAP pin, passive scroll
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = photoRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReducedMotion]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#07090f] flex">

      {/* ── LEFT TEXT COLUMN (60%) ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full md:w-[60%]">

        {/* Abstract SVG — top-left organic accent, very faint */}
        <img
          src="/images/svgs/openclipart-vectors-abstract-158917.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: 'clamp(200px,30vw,420px)',
            opacity: 0.04,
            filter: 'invert(1) sepia(1) saturate(3) hue-rotate(155deg)',
            transform: 'translate(-30%, -20%) rotate(-15deg)',
          }}
        />

        {/* Eyebrow */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 border border-cyan-400/20 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.35em] px-4 py-1.5 rounded-full bg-cyan-400/5">
            Systems Architect · Marketing Infrastructure
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.165, 0.84, 0.44, 1], delay: 0.25 }}
          className="font-sans font-black tracking-tighter text-white leading-[0.92] mb-4"
          style={{ fontSize: 'clamp(3.2rem, 8vw, 7rem)' }}
        >
          JACOB<br />DARLING
        </motion.h1>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="w-12 h-px bg-cyan-400/60 mb-4"
        />

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
          className="font-mono text-[clamp(0.65rem,1.4vw,0.85rem)] uppercase tracking-[0.5em] text-cyan-400/80 mb-2"
        >
          SYSTEMS ARCHITECT
        </motion.p>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/25 mb-10"
        >
          Strategy · Automation · Growth · Revenue
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <Link
            to="/case-studies"
            data-magnetic
            className="group flex items-center gap-2 bg-cyan-400 text-slate-950 font-semibold px-8 py-3.5 text-sm uppercase tracking-wider hover:bg-white transition-colors duration-150 will-change-transform"
          >
            View Case Studies
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <button
            onClick={onOpenCommandPalette}
            data-magnetic
            className="flex items-center gap-2.5 border border-white/15 text-white/50 hover:text-white hover:border-white/30 px-8 py-3.5 text-sm uppercase tracking-wider transition-all duration-150 font-mono"
          >
            <kbd className="text-[10px] bg-white/8 px-1.5 py-0.5 rounded border border-white/10">⌘K</kbd>
            Command
          </button>
        </motion.div>
      </div>

      {/* ── RIGHT PHOTO PANEL (40%) ── */}
      <div className="hidden md:block absolute right-0 top-0 w-[42%] h-full overflow-hidden">
        {/* Parallax photo */}
        <div
          ref={photoRef}
          className="absolute inset-[-12%] will-change-transform"
        >
          <img
            src="/images/bio/bio-photo.webp"
            alt="Jacob Darling — Systems Architect"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.55) saturate(0.75) contrast(1.08)' }}
          />
        </div>

        {/* Left-edge hard blend — extends 55% across to erase the seam */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #07090f 0%, #07090f 8%, rgba(7,9,15,0.85) 28%, rgba(7,9,15,0.3) 45%, transparent 55%)',
          }}
        />
        {/* Cyan transition shimmer — sits at the seam, blends colour temperature */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent 20%, rgba(0,242,255,0.03) 40%, rgba(0,242,255,0.06) 50%, transparent 60%)',
          }}
        />
        {/* Top + bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #07090f 0%, transparent 22%, transparent 78%, #07090f 100%)',
          }}
        />

        {/* camera-man SVG — editorial overlay bottom-right */}
        <img
          src="/images/svgs/camera-man-circles-8531733.svg"
          alt=""
          aria-hidden="true"
          className="absolute bottom-8 right-8 pointer-events-none"
          style={{
            width: 'clamp(80px,10vw,140px)',
            opacity: 0.18,
            filter: 'invert(1) sepia(1) saturate(4) hue-rotate(155deg) brightness(1.3)',
          }}
        />

        {/* insspirito SVG — top-right swirling accent */}
        <img
          src="/images/svgs/insspirito-abstract-7465567.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-6 right-4 pointer-events-none"
          style={{
            width: 'clamp(100px,14vw,200px)',
            opacity: 0.1,
            filter: 'invert(1) sepia(1) saturate(3) hue-rotate(155deg)',
            transform: 'rotate(25deg)',
          }}
        />

        {/* Telemetry HUD chip */}
        <div className="absolute bottom-10 left-6 font-mono text-[9px] uppercase tracking-widest text-cyan-400/50">
          <span className="block">[ SIGNAL ACTIVE ]</span>
          <span className="block text-white/20">INDIANAPOLIS, IN</span>
        </div>
      </div>

      {/* Full-width dark noise grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 md:left-[30%] -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/25">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </div>
  );
};

export default HeroCinematicStatic;
