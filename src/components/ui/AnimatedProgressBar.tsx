import React, { useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedProgressBarProps {
  value: number; // 0-100
  duration?: number;
  delay?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  label?: string;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  duration = 1.5,
  delay = 0,
  className = '',
  barClassName = '',
  showLabel = false,
  label,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const progress = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });

  const width = useTransform(progress, [0, 100], ['0%', `${value}%`]);

  React.useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        progress.set(value);
      }, delay * 1000);
    }
  }, [isInView, value, progress, delay]);

  return (
    <div ref={ref} className={className}>
      {showLabel && label && (
        <div className="text-xs text-brand-muted mb-2">{label}</div>
      )}
      <div className="w-full bg-brand-dark h-2 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-brand-teal rounded-full ${barClassName}`}
          style={{ width }}
          transition={{ duration, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default AnimatedProgressBar;

