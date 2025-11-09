import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

interface AnimatedBackgroundProps {
  images: string[];
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ images, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating animation for background elements
    const elements = containerRef.current?.querySelectorAll('.bg-image-layer');
    if (!elements) return;

    elements.forEach((element, index) => {
      const el = element as HTMLElement;
      const duration = 20 + index * 5; // Varying durations for each layer
      const delay = index * 2;

      el.style.animation = `float ${duration}s ease-in-out infinite`;
      el.style.animationDelay = `${delay}s`;
    });
  }, [images]);

  return (
    <div ref={containerRef} className={`animated-background ${className}`}>
      {images.map((image, index) => (
        <div
          key={`bg-${index}`}
          className="bg-image-layer"
          style={{
            backgroundImage: `url(${image})`,
            opacity: 0.15 + (index * 0.05), // Varying opacity
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

