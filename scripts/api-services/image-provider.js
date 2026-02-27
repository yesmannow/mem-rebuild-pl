/**
 * Image Provider Service
 *
 * Integrates with free image APIs:
 * - Unsplash (high-quality stock photography)
 * - Lorem Picsum (placeholder images)
 * - Placeholder.com (simple placeholders)
 *
 * Features:
 * - Multiple image sources
 * - Search capabilities
 * - Size optimization
 * - Download and caching
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';
import { optimizeImages } from '../optimize-images.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

dotenv.config({ path: path.join(ROOT, '.env.local') });
dotenv.config();

/**
 * Unsplash API Client
 */
class UnsplashClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.unsplash.com';
  }

  /**
   * Search photos
   */
  async searchPhotos(query, options = {}) {
    const {
      page = 1,
      perPage = 10,
      orientation = null, // 'landscape', 'portrait', 'squarish'
      color = null,
    } = options;

    if (!this.apiKey) {
      throw new Error('Unsplash API key required. Set UNSPLASH_API_KEY environment variable.');
    }

    const params = new URLSearchParams({
      query,
      page: page.toString(),
      per_page: perPage.toString(),
    });

    if (orientation) params.append('orientation', orientation);
    if (color) params.append('color', color);

    const url = `${this.baseUrl}/search/photos?${params}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Client-ID ${this.apiKey}`,
          'Accept-Version': 'v1',
        },
      });

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`);
      }

      const data = await response.json();

      return data.results.map(photo => ({
        id: photo.id,
        description: photo.description || photo.alt_description,
        urls: {
          raw: photo.urls.raw,
          full: photo.urls.full,
          regular: photo.urls.regular,
          small: photo.urls.small,
          thumb: photo.urls.thumb,
        },
        width: photo.width,
        height: photo.height,
        color: photo.color,
        author: {
          name: photo.user.name,
          username: photo.user.username,
          link: photo.user.links.html,
        },
        downloadUrl: photo.links.download,
      }));
    } catch (error) {
      console.error('Unsplash search error:', error.message);
      return [];
    }
  }

  /**
   * Get random photo
   */
  async getRandomPhoto(options = {}) {
    const {
      query = null,
      orientation = null,
      count = 1,
    } = options;

    if (!this.apiKey) {
      throw new Error('Unsplash API key required');
    }

    const params = new URLSearchParams({
      count: count.toString(),
    });

    if (query) params.append('query', query);
    if (orientation) params.append('orientation', orientation);

    const url = `${this.baseUrl}/photos/random?${params}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Client-ID ${this.apiKey}`,
          'Accept-Version': 'v1',
        },
      });

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`);
      }

      const data = await response.json();
      const photos = Array.isArray(data) ? data : [data];

      return photos.map(photo => ({
        id: photo.id,
        description: photo.description || photo.alt_description,
        urls: photo.urls,
        width: photo.width,
        height: photo.height,
        color: photo.color,
        author: {
          name: photo.user.name,
          username: photo.user.username,
        },
      }));
    } catch (error) {
      console.error('Unsplash random photo error:', error.message);
      return [];
    }
  }
}

/**
 * Pexels API Client
 */
class PexelsClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.pexels.com/v1';
  }

  async searchPhotos(query, options = {}) {
    const {
      page = 1,
      perPage = 10,
      orientation = 'landscape',
    } = options;

    if (!this.apiKey) {
      throw new Error('Pexels API key required. Set PEXELS_API_KEY environment variable.');
    }

    const params = new URLSearchParams({
      query,
      page: page.toString(),
      per_page: perPage.toString(),
      orientation,
    });

    const url = `${this.baseUrl}/search?${params}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Pexels API error: ${response.status}`);
      }

      const data = await response.json();

      return (data.photos || []).map(photo => ({
        id: String(photo.id),
        description: photo.alt,
        urls: {
          raw: photo.src.original,
          full: photo.src.original,
          regular: photo.src.large,
          small: photo.src.medium,
          thumb: photo.src.tiny,
        },
        width: photo.width,
        height: photo.height,
        color: undefined,
        author: {
          name: photo.photographer,
          username: photo.photographer_url?.split('/')?.pop() || 'pexels',
          link: photo.photographer_url,
        },
        downloadUrl: photo.src.original,
      }));
    } catch (error) {
      console.error('Pexels search error:', error.message);
      return [];
    }
  }
}

/**
 * Pixabay API Client
 */
class PixabayClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://pixabay.com/api/';
  }

  async searchPhotos(query, options = {}) {
    const {
      page = 1,
      perPage = 10,
    } = options;

    if (!this.apiKey) {
      throw new Error('Pixabay API key required. Set PIXABAY_API_KEY environment variable.');
    }

    const params = new URLSearchParams({
      key: this.apiKey,
      q: query,
      page: page.toString(),
      per_page: perPage.toString(),
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: 'true',
    });

    const url = `${this.baseUrl}?${params}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Pixabay API error: ${response.status}`);
      }

      const data = await response.json();

      return (data.hits || []).map(img => ({
        id: String(img.id),
        description: img.tags,
        urls: {
          raw: img.largeImageURL,
          full: img.largeImageURL,
          regular: img.webformatURL,
          small: img.previewURL,
          thumb: img.previewURL,
        },
        width: img.imageWidth,
        height: img.imageHeight,
        color: undefined,
        author: {
          name: img.user,
          username: img.user,
          link: `https://pixabay.com/users/${img.user}-${img.id}/`,
        },
        downloadUrl: img.largeImageURL,
      }));
    } catch (error) {
      console.error('Pixabay search error:', error.message);
      return [];
    }
  }
}

/**
 * Lorem Picsum Client
 */
class LoremPicsumClient {
  constructor() {
    this.baseUrl = 'https://picsum.photos';
  }

  /**
   * Get placeholder image URL
   */
  getImageUrl(width, height, options = {}) {
    const {
      grayscale = false,
      blur = null, // 1-10
      seed = null, // for consistent images
      specific = null, // specific image ID
    } = options;

    let url = specific ?
      `${this.baseUrl}/id/${specific}/${width}/${height}` :
      `${this.baseUrl}/${width}/${height}`;

    const params = [];
    if (grayscale) params.push('grayscale');
    if (blur) params.push(`blur=${blur}`);

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    if (seed) {
      url += `?random=${seed}`;
    }

    return url;
  }

  /**
   * Get list of available images
   */
  async getImageList(page = 1, limit = 30) {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`Lorem Picsum API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Lorem Picsum list error:', error.message);
      return [];
    }
  }

  /**
   * Download image
   */
  async downloadImage(width, height, outputPath, options = {}) {
    const url = this.getImageUrl(width, height, options);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      await fs.writeFile(outputPath, Buffer.from(buffer));

      return {
        path: outputPath,
        size: buffer.byteLength,
        width,
        height,
      };
    } catch (error) {
      console.error('Download error:', error.message);
      return null;
    }
  }
}

/**
 * Placeholder.com Client
 */
class PlaceholderClient {
  getImageUrl(width, height, options = {}) {
    const {
      text = '',
      bgColor = 'cccccc',
      textColor = '333333',
      format = 'png', // png, jpg, gif
    } = options;

    let url = `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}.${format}`;

    if (text) {
      url += `?text=${encodeURIComponent(text)}`;
    }

    return url;
  }
}

/**
 * Unified Image Provider
 */
class ImageProvider {
  constructor(config = {}) {
    this.unsplash = config.unsplashApiKey ?
      new UnsplashClient(config.unsplashApiKey) : null;
    this.pexels = config.pexelsApiKey ?
      new PexelsClient(config.pexelsApiKey) : null;
    this.pixabay = config.pixabayApiKey ?
      new PixabayClient(config.pixabayApiKey) : null;
    this.loremPicsum = new LoremPicsumClient();
    this.placeholder = new PlaceholderClient();
  }

  /**
   * Search for high-quality images
   */
  async searchImages(query, options = {}) {
    const { provider = 'auto' } = options;
    const perPage = options.perPage || options.count || 10;
    const orientation = options.orientation;

    const order = [];
    if (provider === 'pexels' || provider === 'auto') order.push('pexels');
    if (provider === 'unsplash' || provider === 'auto') order.push('unsplash');
    if (provider === 'pixabay' || provider === 'auto') order.push('pixabay');

    for (const p of order) {
      try {
        if (p === 'pexels' && this.pexels) {
          const res = await this.pexels.searchPhotos(query, { perPage, orientation });
          if (res && res.length) return res;
        }
        if (p === 'unsplash' && this.unsplash) {
          const res = await this.unsplash.searchPhotos(query, { perPage, orientation });
          if (res && res.length) return res;
        }
        if (p === 'pixabay' && this.pixabay) {
          const res = await this.pixabay.searchPhotos(query, { perPage, orientation });
          if (res && res.length) return res;
        }
      } catch (err) {
        console.warn(`${p} provider failed:`, err?.message || err);
      }
    }

    console.warn('No provider configured or no results found, using placeholders');
    return this.getPlaceholders(options.count || 10, options);
  }

  /**
   * Get placeholder images
   */
  getPlaceholders(count, options = {}) {
    const { width = 800, height = 600 } = options;
    const placeholders = [];

    for (let i = 0; i < count; i++) {
      placeholders.push({
        id: `placeholder-${i}`,
        url: this.loremPicsum.getImageUrl(width, height, { seed: i }),
        width,
        height,
        type: 'placeholder',
      });
    }

    return placeholders;
  }

  /**
   * Download image to local storage
   */
  async downloadImage(url, outputDir, filename) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      await fs.mkdir(outputDir, { recursive: true });

      const buffer = await response.arrayBuffer();
      const filepath = path.join(outputDir, filename);
      await fs.writeFile(filepath, Buffer.from(buffer));

      return {
        path: filepath,
        size: buffer.byteLength,
      };
    } catch (error) {
      console.error('Download error:', error.message);
      return null;
    }
  }
}

/**
 * CLI Usage
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const config = {
    unsplashApiKey: process.env.UNSPLASH_API_KEY || process.env.VITE_UNSPLASH_ACCESS_KEY,
    pexelsApiKey: process.env.PEXELS_API_KEY || process.env.VITE_PEXELS_API_KEY,
    pixabayApiKey: process.env.PIXABAY_API_KEY || process.env.VITE_PIXABAY_API_KEY,
  };

  const provider = new ImageProvider(config);

  if (!command || command === '--help') {
    console.log(`
📸 Image Provider Service

Commands:
  search <query>           Search images (Unsplash, Pexels, Pixabay)
  random [query]           Get random image(s) from Unsplash
  placeholder <w> <h>      Get Lorem Picsum placeholder
  list                     List available Lorem Picsum images

Options:
  --count=<n>              Number of images (default: 10)
  --orientation=<type>     landscape, portrait, or squarish
  --page=<n>               Page number for search
  --provider=<name>        auto | unsplash | pexels | pixabay (default: auto)
  --output=<dir>           Output directory (default: public/images/_src)
  --download               Download images to output directory
  --optimize               Optimize downloaded images (WebP/AVIF, resize)

Environment:
  UNSPLASH_API_KEY         Unsplash API access key (or VITE_UNSPLASH_ACCESS_KEY)
  PEXELS_API_KEY           Pexels API key (or VITE_PEXELS_API_KEY)
  PIXABAY_API_KEY          Pixabay API key (or VITE_PIXABAY_API_KEY)
                          Get keys at providers' developer portals

Examples:
  node image-provider.js search "technology" --provider=pexels --count=5 --download --optimize
  node image-provider.js random --orientation=landscape
  node image-provider.js placeholder 800 600
  node image-provider.js search "business" --download --output=public/images/_src
    `);
    process.exit(0);
  }

  try {
    switch (command) {
      case 'search': {
        const query = args[1];
        if (!query) {
          console.error('❌ Error: Search query required');
          process.exit(1);
        }

        const count = parseInt(args.find(a => a.startsWith('--count='))?.split('=')[1]) || 10;
        const orientation = args.find(a => a.startsWith('--orientation='))?.split('=')[1];
        const providerName = (args.find(a => a.startsWith('--provider='))?.split('=')[1] || 'auto').toLowerCase();
        let shouldDownload = args.includes('--download');
        const shouldOptimize = args.includes('--optimize');
        const outputDir = args.find(a => a.startsWith('--output='))?.split('=')[1] || 'public/images/_src';

        if (shouldOptimize && !shouldDownload) {
          shouldDownload = true;
        }

        console.log(`🔍 Searching for "${query}"...\n`);
        const results = await provider.searchImages(query, {
          perPage: count,
          orientation,
          provider: providerName,
        });

        console.log(`Found ${results.length} images:\n`);
        results.forEach((img, i) => {
          console.log(`${i + 1}. ${img.description || 'Untitled'}`);
          console.log(`   By: ${img.author.name} (@${img.author.username})`);
          console.log(`   Size: ${img.width}x${img.height}`);
          console.log(`   URL: ${img.urls.regular}\n`);
        });

        if (shouldDownload) {
          console.log(`📥 Downloading images to ${outputDir}...\n`);
          for (let i = 0; i < results.length; i++) {
            const img = results[i];
            const filename = `${query.replace(/\s+/g, '-')}-${i + 1}.jpg`;
            const result = await provider.downloadImage(img.urls.regular, outputDir, filename);
            if (result) {
              console.log(`  ✅ Downloaded: ${filename}`);
            }
          }

          if (shouldOptimize) {
            console.log(`\n✨ Optimizing images in ${outputDir}...`);
            try {
              await optimizeImages(outputDir);
              console.log('✅ Optimization complete.');
            } catch (optErr) {
              console.error('❌ Optimization failed:', optErr?.message || optErr);
            }
          }
        }
        break;
      }

      case 'random': {
        const query = args[1] !== '--count' && !args[1]?.startsWith('--') ? args[1] : null;
        const count = parseInt(args.find(a => a.startsWith('--count='))?.split('=')[1]) || 1;

        console.log(`🎲 Getting ${count} random image(s)...\n`);
        const results = await provider.unsplash.getRandomPhoto({ query, count });

        results.forEach((img, i) => {
          console.log(`${i + 1}. ${img.description || 'Untitled'}`);
          console.log(`   By: ${img.author.name}`);
          console.log(`   URL: ${img.urls.regular}\n`);
        });
        break;
      }

      case 'placeholder': {
        const width = parseInt(args[1]) || 800;
        const height = parseInt(args[2]) || 600;

        const url = provider.loremPicsum.getImageUrl(width, height);
        console.log(`📐 Placeholder URL: ${url}`);
        break;
      }

      case 'list': {
        const page = parseInt(args.find(a => a.startsWith('--page='))?.split('=')[1]) || 1;
        console.log(`📋 Listing available images (page ${page})...\n`);

        const images = await provider.loremPicsum.getImageList(page);
        images.forEach(img => {
          console.log(`ID: ${img.id} - ${img.author} (${img.width}x${img.height})`);
          console.log(`   ${img.url}\n`);
        });
        break;
      }

      default:
        console.error(`❌ Unknown command: ${command}`);
        console.log('Run with --help for usage information');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

export {
  UnsplashClient,
  LoremPicsumClient,
  PlaceholderClient,
  ImageProvider,
};
