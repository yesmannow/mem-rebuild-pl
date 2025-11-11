import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './MagneticButton.css';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href,
  variant = 'primary',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const content = (
    <motion.div
      ref={ref}
      className={`magnetic-button magnetic-button--${variant} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none', display: 'inline-block' }}>
        {content}
      </a>
    );
  }

  return content;
};

export default MagneticButton;

