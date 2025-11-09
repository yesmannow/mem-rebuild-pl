// Type-safe wrapper for motion-tokens.js
import { motion as jsMotionTokens, stagger as jsStagger } from '../styles/motion-tokens.js';
import { HTMLMotionProps, Easing } from 'framer-motion';

type EasingTuple = [number, number, number, number];

// Helper to cast easing arrays to tuples
function castEasing(ease: number[]): EasingTuple {
  return ease as EasingTuple;
}

// Helper to create properly typed motion preset
function createMotionPreset(preset: any): HTMLMotionProps<'div'> {
  if (preset.transition?.ease && Array.isArray(preset.transition.ease)) {
    return {
      ...preset,
      transition: {
        ...preset.transition,
        ease: castEasing(preset.transition.ease) as Easing,
      },
    } as HTMLMotionProps<'div'>;
  }
  return preset as HTMLMotionProps<'div'>;
}

// Re-export with proper types
export const motion = {
  fadeIn: createMotionPreset(jsMotionTokens.fadeIn),
  fadeInFast: createMotionPreset(jsMotionTokens.fadeInFast),
  fadeInSlow: createMotionPreset(jsMotionTokens.fadeInSlow),
  fadeOut: createMotionPreset(jsMotionTokens.fadeOut),
  slideUp: createMotionPreset(jsMotionTokens.slideUp),
  slideDown: createMotionPreset(jsMotionTokens.slideDown),
  slideInLeft: createMotionPreset(jsMotionTokens.slideInLeft),
  slideInRight: createMotionPreset(jsMotionTokens.slideInRight),
  scaleIn: createMotionPreset(jsMotionTokens.scaleIn),
  scaleOut: createMotionPreset(jsMotionTokens.scaleOut),
  cinematicEntry: createMotionPreset(jsMotionTokens.cinematicEntry),
  buttonHover: createMotionPreset(jsMotionTokens.buttonHover),
  glowPulse: createMotionPreset(jsMotionTokens.glowPulse),
} as const;

export const stagger = {
  container: createMotionPreset(jsStagger.container),
  fastStagger: createMotionPreset(jsStagger.fastStagger),
  slowStagger: createMotionPreset(jsStagger.slowStagger),
  cinematicStagger: createMotionPreset(jsStagger.cinematicStagger),
} as const;

