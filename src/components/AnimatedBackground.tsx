import React, { useEffect, useRef } from 'react';
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
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    // Respect user's motion preferences
    const shouldReduceMotion = reducedMotion || prefersReducedMotion.current;

    // Create floating animation for background elements
    const elements = containerRef.current?.querySelectorAll('.bg-image-layer');
    if (!elements) return;

    elements.forEach((element, index) => {
      const el = element as HTMLElement;

      if (shouldReduceMotion) {
        // Disable animations when reduced motion is preferred
        el.style.animation = 'none';
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
        if (shouldReduceMotion) {
          el.style.animation = 'none';
        }
      });
    }
  }, [images, speed, reducedMotion]);

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
            transform: `scale(${0.8 + index * 0.1})`, // Varying scale
            zIndex: index,
            left: `${index * 10}%`, // Spread layers horizontally
            top: `${index * 5}%`, // Spread layers vertically
          }}
        />
      ))}
      {/* Additional animated shapes */}
      <div className="animated-shape shape-1" />
      <div className="animated-shape shape-2" />
      <div className="animated-shape shape-3" />
    </div>
  );
};

export default AnimatedBackground;

