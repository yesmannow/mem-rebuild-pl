import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { FlagshipProject } from '../../types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectStackProps {
  projects: FlagshipProject[];
}

const useFinePointer = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(media.matches);
    const handler = (event: MediaQueryListEvent) => setEnabled(event.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  return enabled;
};

const ProjectStack: React.FC<ProjectStackProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('Hold to View');
  const navigate = useNavigate();
  const supportsFinePointer = useFinePointer();

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(containerRef.current?.querySelectorAll('.project-panel') ?? []);
        panels.forEach((panel, index) => {
          if (index === panels.length - 1) return;
          gsap.to(panel, {
            scale: 0.9,
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              pin: true,
              pinSpacing: false,
            },
          });
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  const moveCursor = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (!supportsFinePointer || !cursorRef.current) return;
    const targetX = event.clientX - 70;
    const targetY = event.clientY - 70;
    gsap.to(cursorRef.current, {
      x: targetX,
      y: targetY,
      duration: 0.25,
      ease: 'power3.out',
    });
  }, [supportsFinePointer]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>, label: string) => {
    if (!supportsFinePointer) return;
    setCursorVisible(true);
    setCursorLabel(label);
    moveCursor(event);
  };

  const handlePointerLeave = () => {
    setCursorVisible(false);
  };

  const handlePointerDown = () => supportsFinePointer && setCursorLabel('Click to Explore');
  const handlePointerUp = () => supportsFinePointer && setCursorLabel('Hold to View');

  const handleNavigate = (slug: string, heroImage: string) => {
    navigate(`/projects/${slug}`, { state: { heroImage, layoutId: `project-hero-${slug}` } });
  };

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white">
      <AnimatePresence>
        {supportsFinePointer && (
          <motion.div
            ref={cursorRef}
            className="pointer-events-none fixed left-0 top-0 z-[120] hidden md:block"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: cursorVisible ? 1 : 0, scale: cursorVisible ? 1 : 0.85 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ mixBlendMode: 'screen' }}
          >
            <div className="relative h-36 w-36 rounded-full border border-white/20 bg-black/70 backdrop-blur-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-['Geist',_sans-serif] text-[10px] uppercase tracking-[0.6em] text-white/70">
                  {cursorLabel}
                </span>
              </div>
              <svg className="absolute inset-0" viewBox="0 0 160 160" aria-hidden="true">
                <defs>
                  <path id="cursor-circle" d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
                </defs>
                <text fill="#00F2FF" className="font-['Geist',_sans-serif] text-[12px] uppercase tracking-[0.4em]">
                  <textPath xlinkHref="%23cursor-circle" startOffset="0%">
                    CLICK TO EXPLORE · CLICK TO EXPLORE · CLICK TO EXPLORE ·
                  </textPath>
                </text>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {projects.map((proj, index) => (
        <section
          key={proj.id}
          className={`project-panel relative flex h-screen w-full items-center justify-center overflow-hidden bg-black ${supportsFinePointer ? 'cursor-none' : ''}`}
          onPointerMove={(event) => handlePointerMove(event, 'Hold to View')}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <button
            type="button"
            className="absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            onClick={() => handleNavigate(proj.slug ?? proj.id, proj.heroImage)}
            aria-label={`Open case study ${proj.title}`}
          />

          <motion.div
            layoutId={`project-hero-${proj.id}`}
            className="absolute inset-0"
          >
            <img
              src={proj.heroImage}
              alt={proj.title}
              className="h-full w-full object-cover opacity-60"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </motion.div>

          <div className="relative z-10 flex h-full w-full flex-col justify-end px-8 pb-16 md:px-14">
            <p className="font-['Geist',_sans-serif] text-[11px] uppercase tracking-[0.8em] text-cyan-300">
              0{index + 1}{' // '}{proj.client}
            </p>
            <h2 className="mt-4 max-w-[90vw] font-clash font-black tracking-tighter text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white">
              {proj.title}
            </h2>
            <div className="mt-6 flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-wrap gap-3">
                {proj.roles.map(role => (
                  <span
                    key={role}
                    className="border border-white/30 px-4 py-1 font-['Geist',_sans-serif] text-[10px] uppercase tracking-[0.4em] text-white/80"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <div className="text-right">
                <p className="font-clash font-black tracking-tighter text-5xl text-cyan-300">
                  {proj.metrics.value}
                </p>
                <p className="font-['Geist',_sans-serif] text-[10px] uppercase tracking-[0.7em] text-white/50">
                  {proj.metrics.label}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProjectStack;
