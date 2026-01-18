/**
 * useParallax - Custom hook for parallax scroll effects
 *
 * Provides smooth parallax scrolling with customizable speed and direction
 */

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useMemo, useRef } from 'react';

interface ParallaxConfig {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  startOffset?: number;
  endOffset?: number;
}

export function useParallax(config: ParallaxConfig = {}) {
  const {
    speed = 0.5,
    direction = 'up',
    startOffset = 0,
    endOffset = 300,
  } = config;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yRange = useMemo<[number, number]>(() => {
    if (direction === 'down') return [startOffset, endOffset * speed];
    if (direction === 'up') return [startOffset, -endOffset * speed];
    return [0, 0];
  }, [direction, endOffset, speed, startOffset]);

  const xRange = useMemo<[number, number]>(() => {
    if (direction === 'right') return [startOffset, endOffset * speed];
    if (direction === 'left') return [startOffset, -endOffset * speed];
    return [0, 0];
  }, [direction, endOffset, speed, startOffset]);

  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const x = useTransform(scrollYProgress, [0, 1], xRange);

  return { ref, y, x, scrollYProgress };
}

export function useParallaxOpacity(
  range: [number, number] = [0, 1],
  outputRange: [number, number] = [1, 0]
) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, range, outputRange);
  
  return { opacity };
}
