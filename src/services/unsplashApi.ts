/**
 * Unsplash API Service
 * 
 * Provides access to Unsplash's public API for fetching high-quality imagery
 * API Documentation: https://unsplash.com/documentation
 * 
 * Note: For production use, you should register for an API key at:
 * https://unsplash.com/developers
 * 
 * Free tier limits: 50 requests/hour
 */

interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
  };
  links: {
    html: string;
  };
  color: string;
}

interface UnsplashApiParams {
  query?: string;
  orientation?: 'landscape' | 'portrait' | 'squarish';
  color?: string;
  perPage?: number;
  page?: number;
}

class UnsplashApiService {
  private readonly baseUrl = 'https://api.unsplash.com';
  private readonly accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';

  /**
   * Fetch a random photo from Unsplash
   */
  async getRandomPhoto(params: UnsplashApiParams = {}): Promise<UnsplashPhoto | null> {
    try {
      // Use source.unsplash.com for random images (no API key required)
      // This is a simpler endpoint that doesn't require authentication
      const url = `https://source.unsplash.com/featured/1920x1080/?${params.query || 'technology,workspace'}`;
      
      return {
        id: `random-${Date.now()}`,
        urls: {
          raw: url,
          full: url,
          regular: url,
          small: url,
          thumb: url,
        },
        alt_description: params.query || 'Professional workspace',
        description: null,
        user: {
          name: 'Unsplash',
          username: 'unsplash',
        },
        links: {
          html: 'https://unsplash.com',
        },
        color: '#0f172a',
      };
    } catch (error) {
      console.error('Error fetching Unsplash photo:', error);
      return null;
    }
  }

  /**
   * Get a themed photo URL using source.unsplash.com (no API key required)
   */
  getThemedPhotoUrl(theme: string, width = 1920, height = 1080): string {
    return `https://source.unsplash.com/${width}x${height}/?${theme}`;
  }

  /**
   * Get multiple themed photo URLs for variety
   */
  getThemedPhotoUrls(themes: string[], width = 1920, height = 1080): string[] {
    return themes.map(theme => this.getThemedPhotoUrl(theme, width, height));
  }

  /**
   * Preload an image to avoid flash
   */
  async preloadImage(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
}

export const unsplashApi = new UnsplashApiService();
export type { UnsplashPhoto, UnsplashApiParams };
