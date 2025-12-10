/**
 * ApiBackgroundImage Component
 * 
 * Provides themed background images from photography APIs
 * Optimized for resume page sections
 */

import React from 'react';
import { EnhancedImage } from './EnhancedImage';
import { useApiImage } from '../../hooks/useApiImage';

interface ApiBackgroundImageProps {
  theme: string;
  className?: string;
  overlayColor?: 'turquoise' | 'orange' | 'dark' | 'none';
  overlayOpacity?: number;
  source?: 'unsplash' | 'picsum';
  lazy?: boolean;
  priority?: boolean;
}

export const ApiBackgroundImage: React.FC<ApiBackgroundImageProps> = ({
  theme,
  className = '',
  overlayColor = 'dark',
  overlayOpacity = 0.7,
  source = 'unsplash',
  lazy = true,
  priority = false,
}) => {
  const { imageUrl, placeholderUrl, isLoading } = useApiImage({
    source,
    theme,
    lazy,
    width: 1920,
    height: 1080,
  });

  if (isLoading && !placeholderUrl) {
    return (
      <div className={`absolute inset-0 bg-slate-900/50 animate-pulse ${className}`} />
    );
  }

  if (!imageUrl && !placeholderUrl) {
    return null;
  }

  return (
    <EnhancedImage
      src={imageUrl || placeholderUrl || ''}
      placeholderSrc={placeholderUrl || undefined}
      alt={`${theme} background`}
      className={`absolute inset-0 z-0 ${className}`}
      overlayColor={overlayColor}
      overlayOpacity={overlayOpacity}
      lazy={lazy}
      priority={priority}
      objectFit="cover"
    />
  );
};

/**
 * Section with API Background
 * 
 * Wrapper component for sections that need API background images
 */
interface SectionWithApiBackgroundProps {
  theme: string;
  children: React.ReactNode;
  className?: string;
  overlayColor?: 'turquoise' | 'orange' | 'dark' | 'none';
  overlayOpacity?: number;
  source?: 'unsplash' | 'picsum';
}

export const SectionWithApiBackground: React.FC<SectionWithApiBackgroundProps> = ({
  theme,
  children,
  className = '',
  overlayColor = 'dark',
  overlayOpacity = 0.7,
  source = 'unsplash',
}) => {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <ApiBackgroundImage
        theme={theme}
        overlayColor={overlayColor}
        overlayOpacity={overlayOpacity}
        source={source}
      />
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};
