/**
 * Enhanced API Background Image Component
 *
 * Fetches high-quality background images from Pexels, Pixabay, or Unsplash
 * with automatic fallback and loading states
 */

import React from 'react';
import { useUnifiedImage } from '../../hooks/useUnifiedImage';
import EnhancedImage from './EnhancedImage';

export interface ApiBackgroundImageProps {
  query: string;
  source?: 'pexels' | 'pixabay' | 'unsplash' | 'auto';
  overlayColor?: 'dark' | 'light' | 'brand';
  overlayOpacity?: number;
  className?: string;
  priority?: boolean;
  fallbackGradient?: string;
}

export const ApiBackgroundImage: React.FC<ApiBackgroundImageProps> = ({
  query,
  source = 'auto',
  overlayColor = 'dark',
  overlayOpacity = 0.7,
  className = '',
  priority = false,
  fallbackGradient = 'linear-gradient(135deg, #0f172a, #1e293b)',
}) => {
  const { image, isLoading, error } = useUnifiedImage(query, { preferredSource: source });

  if (isLoading) {
    return (
      <div
        className={`absolute inset-0 bg-slate-900/50 animate-pulse ${className}`}
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

  return (
    <EnhancedImage
      src={image.url}
      alt={image.alt}
      className={`absolute inset-0 z-0 ${className}`}
      overlayColor={overlayColor}
      overlayOpacity={overlayOpacity}
      priority={priority}
      objectFit="cover"
    />
  );
};

export default ApiBackgroundImage;
