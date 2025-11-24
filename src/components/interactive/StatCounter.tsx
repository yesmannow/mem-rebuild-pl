/**
 * Stat Counter Component
 * Animated count-up component for KPIs and statistics
 * Matches design system palette and typography
 */

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import './StatCounter.css';

export interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  theme?: 'primary' | 'secondary' | 'accent';
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  label,
  prefix = '',
  suffix = '',
  duration = 2000,
  decimals = 0,
  className = '',
  theme = 'primary',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = value * easeOut;

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  const formatNumber = (num: number): string => {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div ref={ref} className={`stat-counter stat-counter--${theme} ${className}`}>
      <div className="stat-counter__value">
        {prefix}
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="stat-counter__label">{label}</div>
    </div>
  );
};

export default StatCounter;

