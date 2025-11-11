import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollReveal.css';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  });

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { y: 100, opacity: 0 };
      case 'down':
        return { y: -100, opacity: 0 };
      case 'left':
        return { x: 100, opacity: 0 };
      case 'right':
        return { x: -100, opacity: 0 };
      default:
        return { y: 100, opacity: 0 };
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 1]);

  const transform = {
    up: { y, opacity },
    down: { y: useTransform(scrollYProgress, [0, 1], [-100, 0]), opacity },
    left: { x, opacity },
    right: { x: useTransform(scrollYProgress, [0, 1], [-100, 0]), opacity },
  }[direction];

  return (
    <motion.div
      ref={ref}
      className={`scroll-reveal scroll-reveal--${direction} ${className}`}
      style={transform}
      initial={getInitialTransform()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

