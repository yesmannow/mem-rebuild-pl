/**
 * use3DTilt - Custom hook for 3D tilt effect
 * 
 * Provides smooth 3D tilt effect on mouse movement
 * with spring-based animation for natural motion
 */

import { useRef, useState, useCallback } from 'react';
import { useSpring } from 'framer-motion';

interface TiltConfig {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
}

const defaultConfig: Required<TiltConfig> = {
  maxTilt: 15,
  perspective: 1000,
  scale: 1.05,
  speed: 400,
  glareEnable: true,
  glareMaxOpacity: 0.3,
};

export function use3DTilt(config: TiltConfig = {}) {
  const options = { ...defaultConfig, ...config };
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Spring animations for smooth, natural motion
  const rotateX = useSpring(0, { stiffness: options.speed, damping: 30 });
  const rotateY = useSpring(0, { stiffness: options.speed, damping: 30 });
  const scale = useSpring(1, { stiffness: options.speed, damping: 30 });
  const glareOpacity = useSpring(0, { stiffness: options.speed, damping: 30 });
  const glareX = useSpring(50, { stiffness: options.speed, damping: 30 });
  const glareY = useSpring(50, { stiffness: options.speed, damping: 30 });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = event.clientX - centerX;
      const mouseY = event.clientY - centerY;

      const percentX = mouseX / (rect.width / 2);
      const percentY = mouseY / (rect.height / 2);

      const tiltX = percentY * options.maxTilt;
      const tiltY = -percentX * options.maxTilt;

      rotateX.set(tiltX);
      rotateY.set(tiltY);
      scale.set(options.scale);

      if (options.glareEnable) {
        glareOpacity.set(options.glareMaxOpacity);
        glareX.set(50 + percentX * 50);
        glareY.set(50 + percentY * 50);
      }
    },
    [options, rotateX, rotateY, scale, glareOpacity, glareX, glareY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glareOpacity.set(0);
    glareX.set(50);
    glareY.set(50);
  }, [rotateX, rotateY, scale, glareOpacity, glareX, glareY]);

  return {
    ref: elementRef,
    style: {
      transform: `perspective(${options.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transformStyle: 'preserve-3d' as const,
    },
    glareStyle: options.glareEnable
      ? {
          position: 'absolute' as const,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 80%)`,
          pointerEvents: 'none' as const,
        }
      : undefined,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    isHovering,
  };
}
