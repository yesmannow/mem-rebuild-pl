import React from 'react';

interface PatternProps {
  className?: string;
  opacity?: number;
}

/**
 * GridPattern - Subtle grid overlay
 */
export const GridPattern: React.FC<PatternProps> = ({ className = '', opacity = 0.05 }) => (
  <div
    className={`absolute inset-0 pointer-events-none ${className}`}
    style={{
      backgroundImage: `linear-gradient(to right, rgba(255,255,255,${opacity}) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
    }}
  />
);

/**
 * DotPattern - Radial dot grid
 */
export const DotPattern: React.FC<PatternProps> = ({ className = '', opacity = 0.08 }) => (
  <div
    className={`absolute inset-0 pointer-events-none ${className}`}
    style={{
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
      backgroundSize: '20px 20px',
    }}
  />
);

/**
 * DiagonalLines - Diagonal stripe pattern
 */
export const DiagonalLines: React.FC<PatternProps> = ({ className = '', opacity = 0.05 }) => (
  <div
    className={`absolute inset-0 pointer-events-none ${className}`}
    style={{
      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,${opacity}) 10px, rgba(255,255,255,${opacity}) 11px)`,
    }}
  />
);

/**
 * HexagonPattern - Hexagonal grid
 */
export const HexagonPattern: React.FC<PatternProps> = ({ className = '', opacity = 0.05 }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
    <svg width="100%" height="100%" className="text-white">
      <defs>
        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse">
          <polygon
            points="25,0 50,14.4 50,28.9 25,43.4 0,28.9 0,14.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  </div>
);

/**
 * NoiseTexture - Subtle noise overlay
 */
export const NoiseTexture: React.FC<PatternProps> = ({ className = '', opacity = 0.015 }) => (
  <div
    className={`absolute inset-0 pointer-events-none ${className}`}
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='a' x='0' y='0'%3E%3CfeTurbulence baseFrequency='.75' stitchTiles='stitch' type='fractalNoise'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23a)' opacity='0.05'/%3E%3C/svg%3E")`,
    }}
  />
);

/**
 * CircuitPattern - Tech circuit board pattern
 */
export const CircuitPattern: React.FC<PatternProps> = ({ className = '', opacity = 0.1 }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
    <svg width="100%" height="100%">
      <defs>
        <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M10,10 L30,10 L30,30 L50,30 L50,10 L70,10 L70,50 L90,50"
            stroke="#40E0D0"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="30" cy="10" r="2" fill="#40E0D0" />
          <circle cx="50" cy="30" r="2" fill="#FFA500" />
          <circle cx="70" cy="50" r="2" fill="#40E0D0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  </div>
);

/**
 * GradientMesh - Animated gradient mesh background
 */
export const GradientMesh: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-teal/10 via-transparent to-brand-orange/5" />
  </div>
);

/**
 * SpotlightEffect - Radial spotlight following cursor
 */
export const SpotlightEffect: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [position, setPosition] = React.useState({ x: 50, y: 50 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div
        className="absolute inset-0 opacity-30 transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}% ${position.y}%, rgba(64, 224, 208, 0.15), transparent 70%)`,
        }}
      />
    </div>
  );
};

export default {
  GridPattern,
  DotPattern,
  DiagonalLines,
  HexagonPattern,
  NoiseTexture,
  CircuitPattern,
  GradientMesh,
  SpotlightEffect,
};
