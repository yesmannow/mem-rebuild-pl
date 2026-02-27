/**
 * Unified Image Service
 *
 * Provides a single interface for fetching high-quality images from multiple sources:
 * - Pexels (preferred for high-quality stock photos)
 * - Pixabay (fallback with large library)
 * - Unsplash (fallback for themed images)
 *
 * Automatically handles API key management and fallback logic.
 */

import { searchPexelsImages, getCuratedPexelsImage } from '../lib/pexels';
import { searchPixabayImages } from '../lib/pixabay';
import { unsplashApi } from './unsplashApi';

export interface ImageResult {
  url: string;
  alt: string;
  photographer?: string;
  photographer_url?: string;
  width: number;
  height: number;
  source: 'pexels' | 'pixabay' | 'unsplash';
}

export interface ImageSearchOptions {
  query: string;
  perPage?: number;
  orientation?: 'landscape' | 'portrait' | 'square';
  preferredSource?: 'pexels' | 'pixabay' | 'unsplash' | 'auto';
  fallbackToUnsplash?: boolean;
}

const LS_CACHE_PREFIX = 'uimg_cache__';
const LS_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface LsCacheEntry {
  data: ImageResult[];
  ts: number;
}

function lsCacheGet(key: string): ImageResult[] | null {
  try {
    const raw = localStorage.getItem(LS_CACHE_PREFIX + key);
    if (!raw) return null;
    const entry: LsCacheEntry = JSON.parse(raw);
    if (Date.now() - entry.ts > LS_CACHE_TTL) {
      localStorage.removeItem(LS_CACHE_PREFIX + key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function lsCacheSet(key: string, data: ImageResult[]): void {
  try {
    const entry: LsCacheEntry = { data, ts: Date.now() };
    localStorage.setItem(LS_CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // localStorage quota exceeded — silently ignore
  }
}

class UnifiedImageService {
  /**
   * Search for images across multiple providers
   * Tries providers in order: Pexels -> Pixabay -> Unsplash
   * Results are cached in localStorage for 24 hours.
   */
  async searchImages(options: ImageSearchOptions): Promise<ImageResult[]> {
    const {
      query,
      perPage = 10,
      preferredSource = 'auto',
      fallbackToUnsplash = true,
    } = options;

    const cacheKey = `${query}__${perPage}__${preferredSource}`;
    const cached = lsCacheGet(cacheKey);
    if (cached) return cached;

    const results: ImageResult[] = [];
    const sources = this.getSourceOrder(preferredSource);
    let remaining = perPage;

    for (const source of sources) {
      if (remaining <= 0) break;

      try {
        let sourceResults: ImageResult[] = [];

        if (source === 'pexels') {
          // Pexels API supports multiple results
          const pexelsResults = await searchPexelsImages(query, Math.min(remaining, 80));
          sourceResults = pexelsResults.map(result => ({
            url: result.url,
            alt: result.alt,
            photographer: result.photographer,
            photographer_url: result.photographer_url,
            width: result.width,
            height: result.height,
            source: 'pexels' as const,
          }));
        } else if (source === 'pixabay') {
          // Pixabay API supports multiple results
          const pixabayResults = await searchPixabayImages(query, Math.min(remaining, 200));
          sourceResults = pixabayResults.map(result => ({
            url: result.url,
            alt: result.alt,
            photographer: result.photographer,
            photographer_url: result.photographer_url,
            width: result.width,
            height: result.height,
            source: 'pixabay' as const,
          }));
        } else if (source === 'unsplash' && fallbackToUnsplash) {
          // Unsplash uses themed URLs, generate multiple variations
          for (let i = 0; i < remaining; i++) {
            const seed = `${query}-${i}`;
            const unsplashUrl = unsplashApi.getThemedPhotoUrl(seed, 1920, 1080);
            sourceResults.push({
              url: unsplashUrl,
              alt: `${query} - ${i + 1}`,
              width: 1920,
              height: 1080,
              source: 'unsplash',
            });
          }
        }

        if (sourceResults.length > 0) {
          results.push(...sourceResults);
          remaining = perPage - results.length;

          // If we got results from preferred source and have enough, return early
          if (preferredSource !== 'auto' && results.length >= perPage) {
            const sliced = results.slice(0, perPage);
            lsCacheSet(cacheKey, sliced);
            return sliced;
          }
        }
      } catch (error) {
        console.warn(`Error fetching from ${source}:`, error);
        continue;
      }
    }

    const final = results.slice(0, perPage);
    if (final.length > 0) lsCacheSet(cacheKey, final);
    return final;
  }

  /**
   * Get a single image (best match)
   */
  async getImage(query: string, preferredSource: 'pexels' | 'pixabay' | 'unsplash' | 'auto' = 'auto'): Promise<ImageResult | null> {
    const results = await this.searchImages({ query, perPage: 1, preferredSource });
    return results[0] || null;
  }

  /**
   * Get multiple images from a single query
   */
  async getImages(query: string, count: number = 10, preferredSource: 'pexels' | 'pixabay' | 'unsplash' | 'auto' = 'auto'): Promise<ImageResult[]> {
    return this.searchImages({ query, perPage: count, preferredSource });
  }

  /**
   * Get curated/featured images from Pexels
   */
  async getCuratedImages(count: number = 10): Promise<ImageResult[]> {
    const results: ImageResult[] = [];

    for (let i = 0; i < Math.ceil(count / 15); i++) {
      try {
        const curated = await getCuratedPexelsImage(i + 1);
        if (curated) {
          results.push({
            url: curated.url,
            alt: curated.alt,
            photographer: curated.photographer,
            photographer_url: curated.photographer_url,
            width: curated.width,
            height: curated.height,
            source: 'pexels',
          });
        }
      } catch (error) {
        console.warn('Error fetching curated images:', error);
      }
    }

    return results.slice(0, count);
  }

  /**
   * Get images for specific themes/categories
   */
  async getThemedImages(themes: string[], imagesPerTheme: number = 3): Promise<ImageResult[]> {
    const allResults: ImageResult[] = [];

    for (const theme of themes) {
      const results = await this.searchImages({
        query: theme,
        perPage: imagesPerTheme,
        preferredSource: 'auto',
      });
      allResults.push(...results);
    }

    return allResults;
  }

  /**
   * Get background image for a page/section
   */
  async getBackgroundImage(theme: string): Promise<ImageResult | null> {
    return this.getImage(theme, 'pexels');
  }

  /**
   * Determine source order based on preference
   */
  private getSourceOrder(preferred: 'pexels' | 'pixabay' | 'unsplash' | 'auto'): Array<'pexels' | 'pixabay' | 'unsplash'> {
    if (preferred === 'auto') {
      // Check which APIs are available
      const hasPexels = !!import.meta.env.VITE_PEXELS_API_KEY;
      const hasPixabay = !!import.meta.env.VITE_PIXABAY_API_KEY;
      const hasUnsplash = !!import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

      const order: Array<'pexels' | 'pixabay' | 'unsplash'> = [];
      if (hasPexels) order.push('pexels');
      if (hasPixabay) order.push('pixabay');
      if (hasUnsplash) order.push('unsplash');

      return order.length > 0 ? order : ['pexels', 'pixabay', 'unsplash']; // Fallback order
    }

    // Specific source requested
    const allSources: Array<'pexels' | 'pixabay' | 'unsplash'> = ['pexels', 'pixabay', 'unsplash'];
    const index = allSources.indexOf(preferred);
    if (index === -1) return allSources;

    // Put preferred source first
    return [preferred, ...allSources.filter(s => s !== preferred)];
  }
}

export const unifiedImageService = new UnifiedImageService();
export default unifiedImageService;
