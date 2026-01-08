import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TechLogoCarouselProps {
  logos: string[];
  className?: string;
  speed?: number; // pixels per second
  height?: number; // px
  gap?: number; // px
  pauseOnHover?: boolean;
  ariaLabel?: string;
}

/**
 * A lightweight, dependency-free logo carousel that smoothly auto-scrolls.
 * - Uses CSS transforms for performance
 * - Duplicates the track to create an infinite loop
 */
export const TechLogoCarousel: React.FC<TechLogoCarouselProps> = ({
  logos,
  className = '',
  speed = 60,
  height = 40,
  gap = 32,
  pauseOnHover = true,
  ariaLabel = 'Technology logos carousel',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>();
  const lastTsRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const loop = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000; // seconds
      lastTsRef.current = ts;

      if (!pausedRef.current) {
        offsetRef.current -= speed * dt; // move left
        const totalWidth = el.scrollWidth / 2; // half because we duplicated
        if (Math.abs(offsetRef.current) >= totalWidth) {
          offsetRef.current += totalWidth; // wrap seamlessly
        }
        el.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [speed, logos.length]);

  const onEnter = () => {
    if (pauseOnHover) pausedRef.current = true;
  };
  const onLeave = () => {
    if (pauseOnHover) pausedRef.current = false;
  };

  const itemStyle: React.CSSProperties = {
    height,
    minWidth: height * 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    opacity: 0.85,
  };

  const renderTrack = (key: string) => (
    <div key={key} className="flex items-center" style={{ gap }}>
      {logos.map((src, i) => (
        <div key={key + '-' + i} style={itemStyle} aria-hidden={key !== 'a'}>
          <img
            src={src}
            alt=""
            className="max-h-full w-auto opacity-80 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className={`relative overflow-hidden ${className}`} aria-label={ariaLabel} role="region">
      <motion.div
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{ transform: 'translate3d(0,0,0)' }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {renderTrack('a')}
        {renderTrack('b')}
      </motion.div>
    </div>
  );
};

export default TechLogoCarousel;
