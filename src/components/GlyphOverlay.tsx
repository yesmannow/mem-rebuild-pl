import React from 'react';

export default function GlyphOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute bottom-8 right-8 w-32 h-32 opacity-5 text-amber-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 337.5 228.75"
      >
        <path
          d="M100.78 226.88c-1.0312-0.44315-3.5125-0.83537-5.514-0.8716..."
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
