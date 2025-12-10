/**
 * Motion Helpers - Utility functions for Framer Motion animations
 * Provides type-safe helpers for motion props and animation variants
 */

import { type Variants, type Target, type Transition } from 'framer-motion';

/**
 * Safely cast motion properties to ensure type compatibility
 * Used when importing motion tokens from JS files
 */
export function castMotionProps(props: any) {
  return props as {
    initial?: Target;
    animate?: Target;
    exit?: Target;
    transition?: Transition;
    variants?: Variants;
    whileHover?: Target;
    whileTap?: Target;
    whileInView?: Target;
  };
}

/**
 * Create type-safe variants for Framer Motion
 */
export function createVariants(variants: Variants): Variants {
  return variants;
}

/**
 * Helper to create smooth easing curves
 * Returns a tuple that Framer Motion expects for cubic-bezier easing
 */
export function createEasing(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): [number, number, number, number] {
  return [x1, y1, x2, y2];
}

/**
 * Common easing presets
 */
export const easingPresets = {
  smooth: createEasing(0.22, 1, 0.36, 1),
  easeOut: createEasing(0, 0, 0.2, 1),
  easeIn: createEasing(0.4, 0, 1, 1),
  easeInOut: createEasing(0.4, 0, 0.2, 1),
  spring: createEasing(0.68, -0.55, 0.265, 1.55),
};

/**
 * Common animation variants
 */
export const commonVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
};
