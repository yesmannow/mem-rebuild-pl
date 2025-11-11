import React from 'react';

export default function NoiseOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-5">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
