import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ExperienceItem } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ZAxisTunnelProps {
  experiences: ExperienceItem[];
}

const DataSlab: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  return (
    <div
      className="job-card absolute inset-0 w-full"
      style={{ transformOrigin: '50% 50%' }}
    >
      <div className="relative mx-auto max-w-3xl backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-2xl p-7 shadow-[0_0_60px_rgba(0,242,255,0.04)] overflow-hidden job-card-inner transition-colors duration-500">
        {/* Teal left accent bar */}
        <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-orange-400 opacity-60" />

        {/* Index badge */}
        <span className="absolute top-4 right-5 font-mono text-[10px] uppercase tracking-widest text-white/20">
          {String(index + 1).padStart(2, '0')} / {String(index + 1).padStart(2, '0')}
        </span>

        <div className="pl-4">
          {/* Role + company */}
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/70 mb-1">
            {item.period} &nbsp;·&nbsp; {item.location}
          </p>
          <h3 className="font-clash font-black tracking-tighter text-2xl md:text-3xl text-white leading-tight mb-0.5">
            {item.role}
          </h3>
          <p className="text-cyan-300/80 font-semibold text-base mb-4">{item.company}</p>
          <p className="text-white/50 text-sm leading-relaxed mb-5 line-clamp-3">{item.description}</p>

          {/* Achievement pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {item.keyAchievement && (
              <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-green-400/30 text-green-400/80 bg-green-400/5">
                ✓ {item.keyAchievement}
              </span>
            )}
            {item.highlight && (
              <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-400/80 bg-cyan-400/5">
                ↑ {item.highlight}
              </span>
            )}
          </div>

          {/* Tech stack */}
          {item.techStack && item.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
              {item.techStack.slice(0, 10).map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/8 rounded-md text-white/40"
                >
                  {tech}
                </span>
              ))}
              {item.techStack.length > 10 && (
                <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/8 rounded-md text-white/30">
                  +{item.techStack.length - 10}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Glow edge */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-cyan-400/[0.03] via-transparent to-orange-400/[0.03]" />
      </div>
    </div>
  );
};

export const ZAxisTunnel: React.FC<ZAxisTunnelProps> = ({ experiences }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stack = stackRef.current;
      if (!stack) return;

      const cards = gsap.utils.toArray<HTMLElement>('.job-card', stack);
      const total = cards.length;
      if (total === 0) return;

      // Position all cards stacked in Z — furthest back first, frontmost last
      gsap.set(cards, {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        z: (i: number) => -i * 500,
        opacity: (i: number) => Math.max(0, 1 - i * 0.18),
        filter: (i: number) => `blur(${i * 1.2}px)`,
      });

      // Fly each card towards and past the camera
      gsap.to(cards, {
        z: 1200,
        opacity: (_i) => 0,
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.2, // Weighty inertia
          pinSpacing: true, // Ensure resistance of experience
          start: 'top top',
          end: `+=${total * 800}`, // Increased length for more weight
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }

            // Dynamic Blur and Brightness Calibration
            cards.forEach((card) => {
              const z = gsap.getProperty(card, 'z') as number;

              // Blur: Only sharp when near focal point (z approx 0)
              const blurValue = z < 0 ? Math.abs(z) / 150 : z / 50;
              const opacityValue = z < -1000 ? 0 : z > 800 ? 0 : 1;

              gsap.set(card, {
                filter: `blur(${blurValue}px)`,
                opacity: opacityValue,
                pointerEvents: z > -100 && z < 100 ? 'auto' : 'none'
              });

              // Brightness flash when reaching focal point (z between -100 and 100)
              const innerCard = (card as HTMLElement).querySelector('.job-card-inner');
              if (innerCard) {
                const isFocused = z > -100 && z < 100;
                gsap.set(innerCard, {
                  borderColor: isFocused ? 'rgba(34, 211, 238, 0.6)' : 'rgba(255, 255, 255, 0.1)',
                  filter: isFocused ? 'brightness(1.3)' : 'brightness(1)',
                  boxShadow: isFocused
                    ? '0 0 0 1px rgba(34, 211, 238, 0.6), 0 0 30px rgba(34, 211, 238, 0.35)'
                    : '0 0 0 rgba(0,0,0,0)',
                });
              }
            });
          },
        },
      });
    },
    { scope: sectionRef, dependencies: [experiences] }
  );

  return (
    <div ref={sectionRef} className="relative w-full print:hidden">
      {/* Section header — outside pin, above */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-clash font-black tracking-tighter text-[clamp(1.75rem,4vw,3rem)] text-white mb-1 flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-orange-400 rounded-full" />
            Career Tunnel
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Scroll to traverse the timeline
          </p>
        </div>
        {/* Depth counter */}
        <div className="hidden md:flex flex-col items-end gap-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">Z-AXIS DEPTH</span>
          <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full transition-none"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Perspective viewport */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 40%', height: '480px' }}
      >
        {/* Ambient fog */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020409] via-transparent to-[#020409]/60 z-20 pointer-events-none rounded-2xl" />

        {/* Slab stack */}
        <div
          ref={stackRef}
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {experiences.map((item, i) => (
            <DataSlab key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
