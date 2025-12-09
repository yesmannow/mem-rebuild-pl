/**
 * TiltCard - Reusable 3D tilt card component
 * 
 * A wrapper component that adds 3D tilt effect to any content
 * with optional shine/glare effect
 */

import React from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '../../hooks/use3DTilt';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  onClick?: () => void;
  as?: keyof React.JSX.IntrinsicElements;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  speed = 400,
  glareEnable = true,
  glareMaxOpacity = 0.3,
  onClick,
  as: Component = 'div',
}) => {
  const { ref, style, glareStyle, handlers, isHovering } = use3DTilt({
    maxTilt,
    perspective,
    scale,
    speed,
    glareEnable,
    glareMaxOpacity,
  });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={style}
      onClick={onClick}
      {...handlers}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
    >
      {children}
      {glareEnable && glareStyle && (
        <div style={glareStyle} className="rounded-inherit pointer-events-none" />
      )}
    </motion.div>
  );
};

export default TiltCard;
