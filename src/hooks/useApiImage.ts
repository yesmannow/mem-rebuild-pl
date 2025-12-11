/**
 * Custom hook for loading and managing API images with lazy loading
 */

import { useState, useEffect } from 'react';
import { unsplashApi } from '../services/unsplashApi';
import { loremPicsumApi } from '../services/loremPicsumApi';

interface UseApiImageOptions {
  source: 'unsplash' | 'picsum';
  theme?: string;
  seed?: string;
  width?: number;
  height?: number;
  blur?: number;
  lazy?: boolean;
}

interface UseApiImageResult {
  imageUrl: string | null;
  isLoading: boolean;
  error: Error | null;
  placeholderUrl: string | null;
}

export function useApiImage(options: UseApiImageOptions): UseApiImageResult {
  const {
    source,
    theme = 'technology',
    seed,
    width = 1920,
    height = 1080,
    blur,
    lazy = true,
  } = options;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [placeholderUrl, setPlaceholderUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Generate placeholder first
        if (lazy) {
          const placeholder = loremPicsumApi.getBlurredPlaceholder(100, 100, 10);
          if (mounted) setPlaceholderUrl(placeholder);
        }

        let url: string;

        if (source === 'unsplash') {
          url = unsplashApi.getThemedPhotoUrl(theme, width, height);
        } else {
          url = loremPicsumApi.getImageUrl({ width, height, blur, seed });
        }

        // Preload the image
        if (lazy) {
          const loaded = await (source === 'unsplash' 
            ? unsplashApi.preloadImage(url)
            : loremPicsumApi.preloadImage(url));

          if (!loaded) {
            throw new Error('Failed to load image');
          }
        }

        if (mounted) {
          setImageUrl(url);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setIsLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      mounted = false;
    };
  }, [source, theme, seed, width, height, blur, lazy]);

  return {
    imageUrl,
    isLoading,
    error,
    placeholderUrl,
  };
}

/**
 * Hook for getting multiple themed images
 */
export function useApiImages(themes: string[], source: 'unsplash' | 'picsum' = 'unsplash', width = 1920, height = 1080) {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (source === 'unsplash') {
      const urls = unsplashApi.getThemedPhotoUrls(themes, width, height);
      setImages(urls);
    } else {
      const urls = themes.map((_, index) => 
        loremPicsumApi.getImageUrl({ width, height, seed: `theme-${index}` })
      );
      setImages(urls);
    }

    setIsLoading(false);
  }, [themes, source, width, height]);

  return { images, isLoading };
}
