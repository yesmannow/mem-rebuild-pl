import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimalPlaces = 0,
  className,
}) => {
  const spring = useSpring(value, { stiffness: 85, damping: 16, mass: 0.9 });
  const display = useTransform(spring, (latest) =>
    `${prefix}${latest.toFixed(decimalPlaces)}${suffix}`
  );

  React.useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.span className={className}>
      {display}
    </motion.span>
  );
};

export default AnimatedNumber;
