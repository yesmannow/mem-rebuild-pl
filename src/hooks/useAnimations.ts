import { useSpring, animated, SpringConfig } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface UseFadeInOptions {
  delay?: number;
  duration?: number;
  from?: number;
  to?: number;
  config?: SpringConfig;
}

export const useFadeIn = ({
  delay = 0,
  duration = 600,
  from = 0,
  to = 1,
  config,
}: UseFadeInOptions = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const springs = useSpring({
    opacity: isInView ? to : from,
    config: config || { duration },
    delay,
  });

  return { ref, springs, Animated: animated.div };
};

interface UseSlideInOptions {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  delay?: number;
  duration?: number;
}

export const useSlideIn = ({
  direction = 'up',
  distance = 50,
  delay = 0,
  duration = 600,
}: UseSlideInOptions = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return { y: isInView ? 0 : distance, opacity: isInView ? 1 : 0 };
      case 'down':
        return { y: isInView ? 0 : -distance, opacity: isInView ? 1 : 0 };
      case 'left':
        return { x: isInView ? 0 : distance, opacity: isInView ? 1 : 0 };
      case 'right':
        return { x: isInView ? 0 : -distance, opacity: isInView ? 1 : 0 };
    }
  };

  const springs = useSpring({
    ...getTransform(),
    config: { duration },
    delay,
  });

  return { ref, springs, Animated: animated.div };
};

interface UseScaleInOptions {
  from?: number;
  to?: number;
  delay?: number;
  duration?: number;
}

export const useScaleIn = ({
  from = 0.8,
  to = 1,
  delay = 0,
  duration = 600,
}: UseScaleInOptions = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const springs = useSpring({
    scale: isInView ? to : from,
    opacity: isInView ? 1 : 0,
    config: { duration },
    delay,
  });

  return { ref, springs, Animated: animated.div };
};

export const useCounter = (target: number, duration = 2000) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const { number } = useSpring({
    number: isInView ? target : 0,
    from: { number: 0 },
    config: { duration },
  });

  return { ref, number };
};

