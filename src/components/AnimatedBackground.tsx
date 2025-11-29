import React, { useEffect, useRef, useState } from 'react';
import './AnimatedBackground.css';

interface AnimatedBackgroundProps {
  images: string[];
  className?: string;
  color?: string;
  speed?: number;
  reducedMotion?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  images,
  className = '',
  color,
  speed = 1,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMotionAndDevice = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      
      setShouldReduceMotion(prefersReducedMotion || reducedMotion);
      setIsMobile(isTouchDevice && isSmallScreen);
    };
    
    checkMotionAndDevice();
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkMotionAndDevice);
    window.addEventListener('resize', checkMotionAndDevice);
    
    return () => {
      motionQuery.removeEventListener('change', checkMotionAndDevice);
      window.removeEventListener('resize', checkMotionAndDevice);
    };
  }, [reducedMotion]);

  useEffect(() => {
    // Disable animations when reduced motion is preferred or on mobile
    const shouldDisableAnimations = shouldReduceMotion || isMobile;

    // Create floating animation for background elements
    const elements = containerRef.current?.querySelectorAll('.bg-image-layer');
    if (!elements) return;

    elements.forEach((element, index) => {
      const el = element as HTMLElement;

      if (shouldDisableAnimations) {
        // Disable animations when reduced motion is preferred
        el.style.animation = 'none';
        el.style.transform = 'none';
      } else {
        const duration = (20 + index * 5) / speed; // Varying durations for each layer, adjusted by speed
        const delay = index * 2;

        el.style.animation = `float ${duration}s ease-in-out infinite`;
        el.style.animationDelay = `${delay}s`;
      }
    });

    // Handle shape animations
    const shapes = containerRef.current?.querySelectorAll('.animated-shape');
    if (shapes) {
      shapes.forEach((shape) => {
        const el = shape as HTMLElement;
        if (shouldDisableAnimations) {
          el.style.animation = 'none';
          el.style.transform = 'none';
        }
      });
    }
  }, [images, speed, shouldReduceMotion, isMobile]);
  
  // On mobile, render a simplified version without animated elements
  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className={`animated-background ${className}`}
        aria-hidden="true"
        style={{
          ...(color ? { '--bg-color': color } as React.CSSProperties : undefined),
          willChange: 'auto',
        }}
      >
        {/* No animated shapes or image layers on mobile */}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`animated-background ${className}`}
      aria-hidden="true"
      style={color ? { '--bg-color': color } as React.CSSProperties : undefined}
    >
      {images.map((image, index) => (
        <div
          key={`bg-${index}`}
          className="bg-image-layer"
          style={{
            backgroundImage: `url(${image})`,
            opacity: 0.15 + index * 0.05, // Varying opacity
            transform: shouldReduceMotion ? 'none' : `scale(${0.8 + index * 0.1})`, // Varying scale
            zIndex: index,
            left: `${index * 10}%`, // Spread layers horizontally
            top: `${index * 5}%`, // Spread layers vertically
          }}
        />
      ))}
      {/* Additional animated shapes - only render if motion is allowed */}
      {!shouldReduceMotion && (
        <>
          <div className="animated-shape shape-1" />
          <div className="animated-shape shape-2" />
          <div className="animated-shape shape-3" />
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;

