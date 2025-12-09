/**
 * AnimatedGradient - Animated gradient text and backgrounds
 * Creates flowing, dynamic gradients with motion
 */

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientProps {
  children: React.ReactNode;
  colors?: string[];
  speed?: number;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  children,
  colors = ['#40E0D0', '#FFA500', '#40E0D0'],
  speed = 3,
  direction = 'horizontal',
  as = 'span',
  className = '',
}) => {
  const Component = motion[as] as any;

  const gradientDirection = {
    horizontal: 'linear-gradient(90deg, ',
    vertical: 'linear-gradient(180deg, ',
    diagonal: 'linear-gradient(135deg, ',
  };

  const gradientString = `${gradientDirection[direction]}${colors.join(', ')})`;

  return (
    <Component
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: gradientString,
        backgroundSize: '200% 200%',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </Component>
  );
};

export default AnimatedGradient;
