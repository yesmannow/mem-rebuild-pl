/**
 * Pixabay API Helper (Fallback for Pexels)
 *
 * Fetches stock photos from Pixabay API
 * Uses environment variable PIXABAY_API_KEY for authentication
 *
 * Note: Pixabay has restrictions on permanent hotlinking.
 * This helper is designed for download/store patterns.
 */

interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  user: string;
  userImageURL: string;
}

interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}

interface PixabayImageResult {
  url: string;
  alt: string;
  photographer: string;
  photographer_url: string;
  width: number;
  height: number;
}

const PIXABAY_API_URL = 'https://pixabay.com/api/';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Simple in-memory cache
const cache = new Map<string, { data: PixabayImageResult | null; timestamp: number }>();

/**
 * Search for images on Pixabay
 * @param query Search query
 * @param perPage Number of results to return (default: 3)
 * @returns Array of matching images or empty array on failure
 */
export async function searchPixabayImages(
  query: string,
  perPage: number = 3
): Promise<PixabayImageResult[]> {
  const cacheKey = `${query}-${perPage}`;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data ? [cached.data] : [];
  }

  const apiKey = import.meta.env.VITE_PIXABAY_API_KEY || process.env.PIXABAY_API_KEY;

  if (!apiKey) {
    console.warn('Pixabay API key not found. Set PIXABAY_API_KEY environment variable.');
    cache.set(cacheKey, { data: null, timestamp: Date.now() });
    return [];
  }

  try {
    const response = await fetch(
      `${PIXABAY_API_URL}?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=${Math.min(perPage, 200)}&safesearch=true`
    );

    if (!response.ok) {
      throw new Error(`Pixabay API error: ${response.status}`);
    }

    const data: PixabayResponse = await response.json();

    if (data.hits && data.hits.length > 0) {
      const results: PixabayImageResult[] = data.hits.slice(0, perPage).map(image => ({
        url: image.largeImageURL, // High quality image
        alt: image.tags || query,
        photographer: image.user,
        photographer_url: `https://pixabay.com/users/${image.user}-${image.id}/`,
        width: image.imageWidth,
        height: image.imageHeight,
      }));

      // Cache first result for backward compatibility
      cache.set(cacheKey, { data: results[0], timestamp: Date.now() });
      return results;
    }

    // No results found
    cache.set(cacheKey, { data: null, timestamp: Date.now() });
    return [];
  } catch (error) {
    console.error('Error fetching from Pixabay:', error);
    cache.set(cacheKey, { data: null, timestamp: Date.now() });
    return [];
  }
}

/**
 * Unified interface for fetching stock photos
 * Tries Pexels first, falls back to Pixabay
 */
export async function getStockImage(query: string): Promise<PixabayImageResult | null> {
  // Try Pexels first
  try {
    const { searchPexelsImages } = await import('./pexels');
    const pexelsResults = await searchPexelsImages(query, 1);
    if (pexelsResults && pexelsResults.length > 0) {
      // Convert Pexels result to Pixabay format for compatibility
      const pexelsResult = pexelsResults[0];
      return {
        url: pexelsResult.url,
        alt: pexelsResult.alt,
        photographer: pexelsResult.photographer || '',
        photographer_url: pexelsResult.photographer_url || '',
        width: pexelsResult.width,
        height: pexelsResult.height,
      };
    }
  } catch (error) {
    console.warn('Pexels failed, trying Pixabay:', error);
  }

  // Fall back to Pixabay
  const pixabayResults = await searchPixabayImages(query, 1);
  return pixabayResults[0] || null;
}
