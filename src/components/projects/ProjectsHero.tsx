import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type ProjectsHeroProps = {
  videoSrc?: string;
};

const ProjectsHero: React.FC<ProjectsHeroProps> = ({ videoSrc = '/videos/91564-629213919_medium.mp4' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const el = containerRef.current;
        if (!el) return;

        const headline = el.querySelector('.flagship-hero__text');
        if (!headline) return;

        gsap.fromTo(
          headline,
          { scale: 1, opacity: 1 },
          {
            scale: 5,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0">
        <video
          src={videoSrc}
          autoPlay
          muted
          playsInline
          loop
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(0,242,255,0.3), transparent 50%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.15), transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen opacity-20"
          style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="font-['Geist',_sans-serif] text-[10px] uppercase tracking-[0.8em] text-cyan-400/80">
          Flagship Case Studies · Digital Twilight Ops
        </p>
        <h1 className="flagship-hero__text pointer-events-none mt-6 text-[clamp(3rem,12vw,11rem)] font-sans font-black tracking-tighter leading-none text-white">
          FLAGSHIP DEPLOYS
        </h1>
        <p className="mt-8 max-w-3xl font-['Geist',_sans-serif] text-xs uppercase tracking-[0.6em] text-white/70">
          Cinematic dossiers engineered with GSAP ScrollTrigger · Scroll to breach the stack
        </p>
      </div>
    </section>
  );
};

export default ProjectsHero;
