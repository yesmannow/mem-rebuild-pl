/**
 * NoiseOverlay - Subtle noise texture overlay
 * Adds grain/texture effect for visual depth
 */

import React, { CSSProperties } from 'react';

interface NoiseOverlayProps {
  className?: string;
  opacity?: number;
  blendMode?: CSSProperties['mixBlendMode'];
}

const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  className = '',
  opacity = 0.02,
  blendMode = 'overlay',
}) => {
  // Generate SVG noise pattern
  const noiseId = `noise-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className={`noise-overlay pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        mixBlendMode: blendMode,
      }}
    >
      <svg className="w-full h-full">
        <defs>
          <filter id={noiseId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
      </svg>
    </div>
  );
};

export default NoiseOverlay;
