import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroImmersiveProps {
  onOpenCommandPalette?: () => void;
}

const HEADLINE_WORDS = ['Systems', 'That', 'Scale.'];
const SUBHEADLINES = [
  'Marketing Architecture',
  'Revenue Automation',
  'Growth Infrastructure',
];

const LampEffect: React.FC = () => (
  <div className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Conic lamp beam */}
    <div
      className="absolute left-1/2 top-0 -translate-x-1/2"
      style={{
        width: '140%',
        height: '100%',
        background:
          'conic-gradient(from 270deg at 50% 0%, transparent 30%, rgba(64,224,208,0.07) 45%, rgba(64,224,208,0.18) 50%, rgba(64,224,208,0.07) 55%, transparent 70%)',
        filter: 'blur(2px)',
      }}
    />
    {/* Hot-spot glow at apex */}
    <div
      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(64,224,208,0.22) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
    />
    {/* Horizontal line emitter */}
    <div
      className="absolute left-0 right-0 top-0 h-px"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(64,224,208,0.6) 30%, rgba(64,224,208,1) 50%, rgba(64,224,208,0.6) 70%, transparent 100%)',
        boxShadow: '0 0 20px 4px rgba(64,224,208,0.4)',
      }}
    />
  </div>
);

const KineticWord: React.FC<{ word: string; index: number; delay: number }> = ({ word, index, delay }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 80, opacity: 0, rotateX: -30, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        delay,
        ease: 'power4.out',
      }
    );
  }, [delay]);

  const isAccent = index === 0;

  return (
    <span
      ref={ref}
      className="inline-block will-change-transform"
      style={{
        transformOrigin: 'bottom center',
        perspective: '800px',
      }}
    >
      <span
        className={
          isAccent
            ? 'bg-gradient-to-r from-[#40E0D0] via-[#7fffd4] to-[#40E0D0] bg-clip-text text-transparent'
            : 'text-white'
        }
      >
        {word}
      </span>
    </span>
  );
};

const ScrollingVideoExpander: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      <motion.div
        ref={videoWrapRef}
        style={{
          scale,
          borderRadius,
          opacity,
          willChange: 'transform, border-radius, opacity',
        }}
        className="relative w-full h-full bg-[#080C12] overflow-hidden"
      >
        {/* Demo reel placeholder — swap src for actual video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/design/bearcave-og.webp"
          aria-label="Agency showreel"
        >
          {/* Add actual video source here */}
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C12] via-transparent to-transparent" />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Play showreel"
          >
            <Play size={20} className="fill-white" />
            <span className="font-medium tracking-wide">Watch Showreel</span>
          </motion.button>
        </div>

        {/* Corner labels */}
        <div className="absolute bottom-6 left-6 font-mono text-xs text-white/40 uppercase tracking-widest">
          Agency Showreel — 2026
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-xs text-white/40 uppercase tracking-widest">
          ∞ FPS
        </div>
      </motion.div>
    </div>
  );
};

const HeroImmersive: React.FC<HeroImmersiveProps> = ({ onOpenCommandPalette }) => {
  const heroRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [subIndex, setSubIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Cycle sub-headlines
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setSubIndex((i) => (i + 1) % SUBHEADLINES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  // GSAP: stagger in sub-elements after headline finishes
  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.4 });

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
        );
      }
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        );
      }

      // Scroll-triggered parallax on hero section
      if (heroRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (heroRef.current) {
              gsap.set(heroRef.current.querySelector('.hero-content'), {
                y: self.progress * 80,
                opacity: 1 - self.progress * 0.6,
                force3D: true,
              });
            }
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080C12] cursor-none"
      aria-labelledby="hero-immersive-title"
    >
      {/* Lamp Effect */}
      <LampEffect />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="hero-content relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-6xl mx-auto will-change-transform">
        {/* Eyebrow label */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex items-center gap-2"
        >
          <span className="inline-flex items-center gap-2 bg-[#40E0D0]/10 border border-[#40E0D0]/25 text-[#40E0D0] text-xs font-mono uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#40E0D0] animate-pulse" />
            Marketing Systems Architect
          </span>
        </motion.div>

        {/* Kinetic Headline */}
        <h1
          id="hero-immersive-title"
          className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.92] tracking-[-0.04em] mb-6 flex flex-wrap items-baseline justify-center gap-x-[0.25em] gap-y-1"
          style={{ fontFamily: 'Montserrat, sans-serif', perspective: '1000px' }}
        >
          {prefersReducedMotion ? (
            HEADLINE_WORDS.map((word) => (
              <span key={word} className={word === 'Systems' ? 'bg-gradient-to-r from-[#40E0D0] via-[#7fffd4] to-[#40E0D0] bg-clip-text text-transparent' : 'text-white'}>
                {word}
              </span>
            ))
          ) : (
            HEADLINE_WORDS.map((word, i) => (
              <KineticWord key={word} word={word} index={i} delay={0.3 + i * 0.18} />
            ))
          )}
        </h1>

        {/* Rotating sub-headline */}
        <div
          ref={subtitleRef}
          className="overflow-hidden h-8 mb-6"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          aria-live="polite"
        >
          <motion.p
            key={subIndex}
            initial={prefersReducedMotion ? false : { y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -32, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-lg font-mono text-[#40E0D0]/70 uppercase tracking-[0.3em]"
          >
            {SUBHEADLINES[subIndex]}
          </motion.p>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-lg sm:text-xl text-white/55 max-w-2xl leading-relaxed mb-12"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          I build marketing infrastructure that turns attention into revenue—15+ years architecting automation,
          analytics, and growth systems for healthcare, SaaS, and e-commerce brands.
        </p>

        {/* CTA Row */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <Link
            to="/case-studies"
            data-magnetic
            className="group flex items-center gap-2 bg-[#40E0D0] text-[#080C12] font-semibold px-8 py-3.5 rounded-sm text-sm uppercase tracking-wider hover:bg-white transition-colors duration-150 will-change-transform"
          >
            View Case Studies
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={onOpenCommandPalette}
            data-magnetic
            className="flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-3.5 rounded-sm text-sm uppercase tracking-wider transition-all duration-150 font-mono"
          >
            <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
            Command Palette
          </button>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>

      {/* Scroll-triggered video expander — sits below hero fold */}
      <div className="relative z-10 w-full mt-16">
        <ScrollingVideoExpander />
      </div>
    </section>
  );
};

export default HeroImmersive;
