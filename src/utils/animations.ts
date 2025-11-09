// Reusable Framer Motion animation variants
import { Variants, Easing } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as Easing },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as Easing },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as Easing },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as Easing },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as Easing },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as Easing },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as Easing },
  },
};

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const hoverLift = {
  y: -8,
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: 'easeInOut' },
};

export const navLinkHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const buttonHover = {
  scale: 1.05,
  y: -2,
  transition: { duration: 0.2, ease: 'easeInOut' },
};

export const cardHover = {
  y: -8,
  boxShadow: '0 12px 40px rgba(136, 171, 242, 0.25)',
  borderColor: 'rgba(136, 171, 242, 0.4)',
  transition: { duration: 0.3, ease: 'easeInOut' },
};
