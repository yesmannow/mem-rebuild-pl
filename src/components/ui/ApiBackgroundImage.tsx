/**
 * Enhanced API Background Image Component
 *
 * Fetches high-quality background images from Pexels, Pixabay, or Unsplash
 * with automatic fallback and loading states.
 * Supports Digital Twilight aesthetic: brightness(0.4) contrast(1.2) grayscale(0.2)
 * with a cyan radial vignette overlay.
 */

import React from 'react';
import { useUnifiedImage } from '../../hooks/useUnifiedImage';

export interface ApiBackgroundImageProps {
  query: string;
  source?: 'pexels' | 'pixabay' | 'unsplash' | 'auto';
  overlayColor?: 'turquoise' | 'orange' | 'dark' | 'none' | 'light' | 'brand';
  overlayOpacity?: number;
  className?: string;
  priority?: boolean;
  fallbackGradient?: string;
  twilight?: boolean;
}

export const ApiBackgroundImage: React.FC<ApiBackgroundImageProps> = ({
  query,
  source = 'auto',
  overlayOpacity = 0.7,
  className = '',
  priority = false,
  fallbackGradient = 'linear-gradient(135deg, #0f172a, #1e293b)',
  twilight = false,
}) => {
  const { image, isLoading, error } = useUnifiedImage(query, { preferredSource: source });

  if (isLoading) {
    return (
      <div
        className={`absolute inset-0 animate-pulse ${className}`}
        style={{ background: fallbackGradient }}
      />
    );
  }

  if (error || !image) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{ background: fallbackGradient }}
      />
    );
  }

  const twilightFilter = twilight
    ? 'brightness(0.4) contrast(1.2) grayscale(0.2)'
    : undefined;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={image.url}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: twilightFilter }}
        loading={priority ? 'eager' : 'lazy'}
      />

      {/* Dark base overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />

      {twilight && (
        <>
          {/* Cyan radial vignette — corners to center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0,10,20,0.85) 100%)',
            }}
          />
          {/* Cyan edge glow for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 80px rgba(0,242,255,0.08)',
            }}
          />
        </>
      )}
    </div>
  );
};

export default ApiBackgroundImage;
