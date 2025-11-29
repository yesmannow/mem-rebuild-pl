import React from 'react';
import { motion, Easing } from 'framer-motion';
import './FloatingElements.css';

const FloatingElements: React.FC = () => {
  const createFloatingAnimation = (delay: number, duration: number) => ({
    y: ['0%', '-100%', '0%'],
    x: ['-10%', '10%', '-10%'],
    rotate: [0, 360],
    transition: {
      y: {
        duration,
        repeat: Infinity,
        ease: 'linear' as Easing,
        delay,
      },
      x: {
        duration: duration * 0.7,
        repeat: Infinity,
        ease: 'easeInOut' as Easing,
        delay,
      },
      rotate: {
        duration: duration * 1.5,
        repeat: Infinity,
        ease: 'linear' as Easing,
        delay,
      },
    },
  });

  const elements = [
    { delay: 0, duration: 50, size: 100, blur: 40, color: 'rgba(136, 171, 242, 0.05)' },
    { delay: 5, duration: 60, size: 150, blur: 50, color: 'rgba(168, 197, 255, 0.04)' },
    { delay: 10, duration: 70, size: 80, blur: 30, color: 'rgba(136, 171, 242, 0.06)' },
    { delay: 15, duration: 56, size: 120, blur: 45, color: 'rgba(89, 89, 89, 0.03)' },
    { delay: 20, duration: 64, size: 90, blur: 35, color: 'rgba(136, 171, 242, 0.05)' },
  ];

  return (
    <div className="floating-elements-container">
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className="floating-element"
          animate={createFloatingAnimation(el.delay, el.duration)}
          style={{
            width: el.size,
            height: el.size,
            left: `${(index + 1) * 18}%`,
            background: el.color,
            filter: `blur(${el.blur}px)`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
