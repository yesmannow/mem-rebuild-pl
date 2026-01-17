/**
 * MouseSpotlight - Radial gradient tracking cursor effect
 * Creates a spotlight effect that follows the mouse cursor
 */

import React, { useEffect, useRef, useState } from 'react';

interface MouseSpotlightProps {
  className?: string;
  intensity?: number;
  size?: number;
}

export const MouseSpotlight: React.FC<MouseSpotlightProps> = ({
  className = '',
  intensity = 0.3,
  size = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        background: `radial-gradient(circle ${size}px at ${mousePosition.x}px ${mousePosition.y}px, rgba(64, 224, 208, ${intensity}), transparent 70%)`,
      }}
    />
  );
};
