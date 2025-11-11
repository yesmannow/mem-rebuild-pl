import { Variants } from 'framer-motion';
import { fadeInUp, scaleIn, staggerContainer } from '../../utils/animationVariants';

// Re-export existing variants
export { fadeInUp, scaleIn, staggerContainer };

// Add hoverLift variant for interactive elements
export const hoverLift: Variants = {
  rest: {
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

