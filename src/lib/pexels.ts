/**
 * Pexels API Helper
 *
 * Fetches high-quality stock photos from Pexels API
 * Uses environment variable PEXELS_API_KEY for authentication
 */

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
  page: number;
  per_page: number;
}

interface PexelsImageResult {
  url: string;
  alt: string;
  photographer: string;
  photographer_url: string;
  width: number;
  height: number;
}

const PEXELS_API_URL = 'https://api.pexels.com/v1';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Simple in-memory cache
const cache = new Map<string, { data: PexelsImageResult | null; timestamp: number }>();

/**
 * Search for images on Pexels
 * @param query Search query
 * @param perPage Number of results to return (default: 1)
 * @returns Array of matching images or empty array on failure
 */
export async function searchPexelsImages(
  query: string,
  perPage: number = 1
): Promise<PexelsImageResult[]> {
  const cacheKey = `${query}-${perPage}`;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data ? [cached.data] : [];
  }

  const apiKey = import.meta.env.VITE_PEXELS_API_KEY || process.env.PEXELS_API_KEY;

  if (!apiKey) {
    console.warn('Pexels API key not found. Set PEXELS_API_KEY environment variable.');
    cache.set(cacheKey, { data: null, timestamp: Date.now() });
    return [];
  }

  try {
    const response = await fetch(
      `${PEXELS_API_URL}/search?query=${encodeURIComponent(query)}&per_page=${Math.min(perPage, 80)}&orientation=landscape`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data: PexelsResponse = await response.json();

    if (data.photos && data.photos.length > 0) {
      const results: PexelsImageResult[] = data.photos.slice(0, perPage).map(photo => ({
        url: photo.src.large2x, // High quality image
        alt: photo.alt || query,
        photographer: photo.photographer,
        photographer_url: photo.photographer_url,
        width: photo.width,
        height: photo.height,
      }));

      // Cache first result for backward compatibility
      cache.set(cacheKey, { data: results[0], timestamp: Date.now() });
      return results;
    }

    // No results found
    cache.set(cacheKey, { data: null, timestamp: Date.now() });
    return [];
  } catch (error) {
    console.error('Error fetching from Pexels:', error);
    cache.set(cacheKey, { data: null, timestamp: Date.now() });
    return [];
  }
}

/**
 * Get a curated photo from Pexels
 * @param page Page number (default: 1)
 * @returns Random curated image or null on failure
 */
export async function getCuratedPexelsImage(page: number = 1): Promise<PexelsImageResult | null> {
  const cacheKey = `curated-${page}`;

  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const apiKey = import.meta.env.VITE_PEXELS_API_KEY || process.env.PEXELS_API_KEY;

  if (!apiKey) {
    console.warn('Pexels API key not found.');
    return null;
  }

  try {
    const response = await fetch(
      `${PEXELS_API_URL}/curated?page=${page}&per_page=15`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data: PexelsResponse = await response.json();

    if (data.photos && data.photos.length > 0) {
      // Pick a random photo from the curated list
      const photo = data.photos[Math.floor(Math.random() * data.photos.length)];
      const result: PexelsImageResult = {
        url: photo.src.large2x,
        alt: photo.alt || 'Curated photo',
        photographer: photo.photographer,
        photographer_url: photo.photographer_url,
        width: photo.width,
        height: photo.height,
      };

      cache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    }

    return null;
  } catch (error) {
    console.error('Error fetching curated from Pexels:', error);
    return null;
  }
}
