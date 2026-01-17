import React from 'react';

/**
 * BackgroundGrid - Technical 'Blueprint' background component
 *
 * Replaces old CSS grid with GPU-accelerated SVG pattern.
 * Provides a technical blueprint aesthetic for the Blueprint/HUD theme.
 *
 * Features:
 * - SVG grid pattern (40x40px cells)
 * - Radial gradient mask for edge fade
 * - Subtle stroke color (white/5 or slate-800)
 * - Absolute positioning with pointer-events-none
 */
export const BackgroundGrid: React.FC<{
  cellSize?: number;
  strokeColor?: string;
  className?: string;
}> = ({
  cellSize = 40,
  strokeColor = 'rgba(255, 255, 255, 0.05)',
  className = ''
}) => {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
      }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
};

export default BackgroundGrid;
