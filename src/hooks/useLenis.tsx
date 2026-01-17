/**
 * useLenis - React hook for Lenis smooth scroll
 * Provides a React-friendly wrapper around Lenis with proper lifecycle management
 */

import React, { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseLenisOptions {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

const defaultOptions: UseLenisOptions = {
  lerp: 0.1, // Silky smooth interpolation
  duration: 1.2, // Animation duration
  smoothWheel: true,
  wheelMultiplier: 1.2,
  touchMultiplier: 2,
};

/**
 * React hook for Lenis smooth scrolling
 * Manages Lenis instance lifecycle and RAF loop
 */
export function useLenis(options: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const optionsRef = useRef({ ...defaultOptions, ...options });

  useEffect(() => {
    // Only initialize in browser
    if (typeof window === 'undefined') return;

    // Create Lenis instance
    const lenis = new Lenis({
      lerp: optionsRef.current.lerp,
      duration: optionsRef.current.duration,
      smoothWheel: optionsRef.current.smoothWheel,
      wheelMultiplier: optionsRef.current.wheelMultiplier,
      touchMultiplier: optionsRef.current.touchMultiplier,
      infinite: false,
    });

    lenisRef.current = lenis;

    // RAF loop for smooth scrolling
    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Cleanup
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (lenis) {
        try {
          lenis.destroy();
        } catch (error) {
          console.error('Error destroying Lenis:', error);
        }
      }
      lenisRef.current = null;
    };
  }, []);

  return lenisRef.current;
}

/**
 * ReactLenis Provider Component
 * Wraps the app and provides Lenis context
 */
interface ReactLenisProps {
  root?: boolean;
  options?: UseLenisOptions;
  children: ReactNode;
}

export function ReactLenis({ root = true, options, children }: ReactLenisProps) {
  useLenis(options);
  return <>{children}</>;
}
