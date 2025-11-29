// Helper to cast motion token props with proper easing types
import { HTMLMotionProps, Easing, TargetAndTransition } from 'framer-motion';

export function castMotionProps<T extends Record<string, any>>(
  props: T
): HTMLMotionProps<'div'> {
  if (props.transition?.ease && Array.isArray(props.transition.ease)) {
    return {
      ...props,
      transition: {
        ...props.transition,
        ease: props.transition.ease as [number, number, number, number] & Easing,
      },
    } as HTMLMotionProps<'div'>;
  }
  return props as HTMLMotionProps<'div'>;
}

export function castMotionTarget<T extends Record<string, any>>(
  props: T
): TargetAndTransition {
  if (props.transition?.ease && Array.isArray(props.transition.ease)) {
    return {
      ...props,
      transition: {
        ...props.transition,
        ease: props.transition.ease as [number, number, number, number] & Easing,
      },
    } as TargetAndTransition;
  }
  return props as TargetAndTransition;
}

