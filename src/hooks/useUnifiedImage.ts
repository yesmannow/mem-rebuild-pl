/**
 * React Hook for Unified Image Service
 *
 * Provides easy access to images from multiple providers with React state management
 */

import { useState, useEffect } from 'react';
import { unifiedImageService, ImageResult, ImageSearchOptions } from '../services/unifiedImageService';

export interface UseUnifiedImageOptions extends Omit<ImageSearchOptions, 'query'> {
  query: string;
  enabled?: boolean;
}

export interface UseUnifiedImageResult {
  images: ImageResult[];
  image: ImageResult | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching a single image
 */
export function useUnifiedImage(query: string, options?: Omit<UseUnifiedImageOptions, 'query'>): {
  image: ImageResult | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [image, setImage] = useState<ImageResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchImage = async () => {
    if (!query) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await unifiedImageService.getImage(query, options?.preferredSource);
      setImage(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch image'));
      setImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (options?.enabled !== false) {
      fetchImage();
    }
  }, [query, options?.preferredSource]);

  return {
    image,
    isLoading,
    error,
    refetch: fetchImage,
  };
}

/**
 * Hook for fetching multiple images
 */
export function useUnifiedImages(options: UseUnifiedImageOptions): UseUnifiedImageResult {
  const { query, enabled = true, ...searchOptions } = options;
  const [images, setImages] = useState<ImageResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchImages = async () => {
    if (!query || !enabled) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const results = await unifiedImageService.searchImages({
        query,
        ...searchOptions,
      });
      setImages(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch images'));
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [query, searchOptions.perPage, searchOptions.preferredSource, enabled]);

  return {
    images,
    image: images[0] || null,
    isLoading,
    error,
    refetch: fetchImages,
  };
}

/**
 * Hook for fetching curated/featured images
 */
export function useCuratedImages(count: number = 10): {
  images: ImageResult[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [images, setImages] = useState<ImageResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCurated = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const results = await unifiedImageService.getCuratedImages(count);
      setImages(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch curated images'));
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurated();
  }, [count]);

  return {
    images,
    isLoading,
    error,
    refetch: fetchCurated,
  };
}

/**
 * Hook for fetching themed images
 */
export function useThemedImages(themes: string[], imagesPerTheme: number = 3): {
  images: ImageResult[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [images, setImages] = useState<ImageResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchThemed = async () => {
    if (!themes.length) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const results = await unifiedImageService.getThemedImages(themes, imagesPerTheme);
      setImages(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch themed images'));
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThemed();
  }, [themes.join(','), imagesPerTheme]);

  return {
    images,
    isLoading,
    error,
    refetch: fetchThemed,
  };
}
