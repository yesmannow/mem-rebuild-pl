/**
 * useParallax - Custom hook for parallax scroll effects
 * 
 * Provides smooth parallax scrolling with customizable speed and direction
 */

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

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

  let transform: MotionValue<number>;

  switch (direction) {
    case 'down':
      transform = useTransform(
        scrollYProgress,
        [0, 1],
        [startOffset, endOffset * speed]
      );
      break;
    case 'up':
      transform = useTransform(
        scrollYProgress,
        [0, 1],
        [startOffset, -endOffset * speed]
      );
      break;
    case 'left':
      transform = useTransform(
        scrollYProgress,
        [0, 1],
        [startOffset, -endOffset * speed]
      );
      break;
    case 'right':
      transform = useTransform(
        scrollYProgress,
        [0, 1],
        [startOffset, endOffset * speed]
      );
      break;
    default:
      transform = useTransform(
        scrollYProgress,
        [0, 1],
        [startOffset, -endOffset * speed]
      );
  }

  return { ref, y: transform, x: transform, scrollYProgress };
}

export function useParallaxOpacity(
  range: [number, number] = [0, 1],
  outputRange: [number, number] = [1, 0]
) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, range, outputRange);
  
  return { opacity };
}
