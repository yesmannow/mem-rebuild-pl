import { useEffect, useRef } from 'react';

/**
 * useMouseGlow
 * Tracks the cursor position relative to a target element and updates
 * CSS variables --mouse-x and --mouse-y on that element so radial-gradient
 * borders and glows can "follow" the mouse.
 *
 * Usage:
 *   const ref = useMouseGlow<HTMLDivElement>();
 *   <div ref={ref} className="bento-glow">...</div>
 */
export function useMouseGlow<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };

    el.addEventListener('mousemove', onMouseMove);
    return () => el.removeEventListener('mousemove', onMouseMove);
  }, []);

  return ref;
}

/**
 * useGlobalMouseGlow
 * Sets --mouse-x and --mouse-y on a given element relative to the viewport.
 * Use this when you want a single global tracker shared across many cards.
 */
export function useGlobalMouseGlow<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      el.style.setProperty('--mouse-x', `${e.clientX}px`);
      el.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return ref;
}
