/**
 * Dynamic Image Engine Hook
 *
 * Fetches high-quality images from Unsplash with intelligent caching
 * and graceful fallbacks to themed gradients.
 */

import React from 'react';

interface CachedImage {
  url: string;
  timestamp: number;
  query: string;
}

interface UseDynamicImageResult {
  imageUrl: string | null;
  isLoading: boolean;
  error: Error | null;
}

const CACHE_PREFIX = 'dynamic_image_';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get a gradient string based on query theme
 */
function getGradientFallback(query: string): string {
  const normalizedQuery = query.toLowerCase();

  // Tech-related queries
  if (normalizedQuery.includes('tech') || normalizedQuery.includes('code') || normalizedQuery.includes('developer')) {
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

  // Healthcare
  if (normalizedQuery.includes('health') || normalizedQuery.includes('medical') || normalizedQuery.includes('care')) {
    return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
  }

  // Security
  if (normalizedQuery.includes('security') || normalizedQuery.includes('safe') || normalizedQuery.includes('protect')) {
    return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
  }

  // Business/Finance
  if (normalizedQuery.includes('business') || normalizedQuery.includes('finance') || normalizedQuery.includes('corporate')) {
    return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
  }

  // Marketing
  if (normalizedQuery.includes('marketing') || normalizedQuery.includes('brand') || normalizedQuery.includes('advertising')) {
    return 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)';
  }

  // Default blue gradient
  return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

/**
 * Get cached image if valid
 */
function getCachedImage(query: string): string | null {
  try {
    const cacheKey = `${CACHE_PREFIX}${query}`;
    const cached = localStorage.getItem(cacheKey);

    if (!cached) return null;

    const data: CachedImage = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid (within 24 hours)
    if (now - data.timestamp < CACHE_DURATION) {
      return data.url;
    }

    // Cache expired, remove it
    localStorage.removeItem(cacheKey);
    return null;
  } catch (error) {
    console.warn('Error reading image cache:', error);
    return null;
  }
}

/**
 * Save image to cache
 */
function setCachedImage(query: string, url: string): void {
  try {
    const cacheKey = `${CACHE_PREFIX}${query}`;
    const data: CachedImage = {
      url,
      timestamp: Date.now(),
      query,
    };
    localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch (error) {
    console.warn('Error saving image cache:', error);
  }
}

/**
 * Fetch random image from Unsplash
 */
async function fetchUnsplashImage(query: string): Promise<string | null> {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    console.warn('Unsplash access key not found, using gradient fallback');
    return null;
  }

  try {
    // Use Unsplash's random photo endpoint
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${accessKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();

    // Return the regular size URL (good balance of quality and size)
    return data.urls?.regular || data.urls?.full || null;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return null;
  }
}

/**
 * Hook for fetching dynamic images with caching
 *
 * @param query - Search query for the image (e.g., 'Healthcare', 'Security', 'Technology')
 * @returns Object with imageUrl (or gradient string), isLoading, and error
 */
export function useDynamicImage(query: string): UseDynamicImageResult {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (!query) {
      setIsLoading(false);
      setImageUrl(null);
      return;
    }

    let isMounted = true;

    const loadImage = async () => {
      setIsLoading(true);
      setError(null);

      // Check cache first
      const cached = getCachedImage(query);
      if (cached) {
        if (isMounted) {
          setImageUrl(cached);
          setIsLoading(false);
        }
        return;
      }

      // Fetch from Unsplash
      const unsplashUrl = await fetchUnsplashImage(query);

      if (!isMounted) return;

      if (unsplashUrl) {
        // Cache the result
        setCachedImage(query, unsplashUrl);
        setImageUrl(unsplashUrl);
      } else {
        // Use gradient fallback
        const gradient = getGradientFallback(query);
        setImageUrl(gradient);
      }

      setIsLoading(false);
    };

    loadImage().catch((err) => {
      if (isMounted) {
        const fallbackGradient = getGradientFallback(query);
        setImageUrl(fallbackGradient);
        setError(err instanceof Error ? err : new Error('Failed to load image'));
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [query]);

  return {
    imageUrl,
    isLoading,
    error,
  };
}
