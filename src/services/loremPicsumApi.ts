/**
 * Lorem Picsum API Service
 * 
 * Provides access to Lorem Picsum for placeholder and decorative imagery
 * API Documentation: https://picsum.photos/
 * 
 * No authentication required, completely free to use
 */

interface PicsumImageOptions {
  width?: number;
  height?: number;
  blur?: number; // 1-10
  grayscale?: boolean;
  seed?: string; // For consistent random images
}

class LoremPicsumService {
  private readonly baseUrl = 'https://picsum.photos';

  /**
   * Get a random image URL
   */
  getImageUrl(options: PicsumImageOptions = {}): string {
    const {
      width = 1920,
      height = 1080,
      blur,
      grayscale,
      seed,
    } = options;

    let url = `${this.baseUrl}`;
    
    if (seed) {
      url += `/seed/${seed}`;
    }

    url += `/${width}/${height}`;

    const params = new URLSearchParams();
    if (blur) params.append('blur', blur.toString());
    if (grayscale) params.append('grayscale', '');

    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  /**
   * Get a specific image by ID
   */
  getImageById(id: number, width = 1920, height = 1080): string {
    return `${this.baseUrl}/id/${id}/${width}/${height}`;
  }

  /**
   * Get a blurred placeholder for lazy loading
   */
  getBlurredPlaceholder(width = 100, height = 100, blur = 10): string {
    return `${this.baseUrl}/${width}/${height}?blur=${blur}`;
  }

  /**
   * Get multiple images with consistent seeds for a gallery
   */
  getConsistentImages(count: number, width = 1920, height = 1080): string[] {
    const images: string[] = [];
    for (let i = 0; i < count; i++) {
      images.push(this.getImageUrl({ width, height, seed: `resume-${i}` }));
    }
    return images;
  }

  /**
   * Preload an image
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

export const loremPicsumApi = new LoremPicsumService();
export type { PicsumImageOptions };
