import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useInView, useMotionValue, useTransform } from 'framer-motion';

export interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
  decimals = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  
  const displayValue = useTransform(springValue, (current) => {
    return decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toString();
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <span
      ref={ref}
      className={`text-4xl font-bold text-brand-teal drop-shadow-neon ${className}`}
    >
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
