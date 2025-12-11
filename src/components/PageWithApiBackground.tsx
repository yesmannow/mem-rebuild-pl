/**
 * PageWithApiBackground Component
 * 
 * Wrapper for pages with dynamic API-driven backgrounds
 * Fetches from Pexels (primary) and Pixabay (fallback)
 */

import { useState, useEffect, ReactNode } from 'react';
import { searchPexelsImages } from '@/lib/pexels';
import { searchPixabayImages } from '@/lib/pixabay';

export interface PageWithApiBackgroundProps {
  query: string;
  fallbackGradient?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children: ReactNode;
  className?: string;
}

/**
 * PageWithApiBackground - Dynamic background from stock photo APIs
 * 
 * @example
 * <PageWithApiBackground query="marketing strategy" overlay overlayOpacity={0.7}>
 *   <h1>Marketing Services</h1>
 * </PageWithApiBackground>
 */
export function PageWithApiBackground({
  query,
  fallbackGradient = 'linear-gradient(135deg, #0f172a, #1e293b)',
  overlay = true,
  overlayOpacity = 0.8,
  children,
  className = '',
}: PageWithApiBackgroundProps) {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBackground() {
      setIsLoading(true);
      
      try {
        // Try Pexels first
        const pexelsResult = await searchPexelsImages(query);
        if (pexelsResult) {
          setBackgroundImage(pexelsResult.url);
          setIsLoading(false);
          return;
        }

        // Fall back to Pixabay
        const pixabayResult = await searchPixabayImages(query);
        if (pixabayResult) {
          setBackgroundImage(pixabayResult.url);
          setIsLoading(false);
          return;
        }

        // No results, use fallback
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching background:', error);
        setIsLoading(false);
      }
    }

    fetchBackground();
  }, [query]);

  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : { background: fallbackGradient };

  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{
          ...backgroundStyle,
          opacity: isLoading ? 0 : 1,
        }}
      />

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 to-brand-dark"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default PageWithApiBackground;
