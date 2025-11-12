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
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

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
    this.loremPicsum = new LoremPicsumClient();
    this.placeholder = new PlaceholderClient();
  }

  /**
   * Search for high-quality images
   */
  async searchImages(query, options = {}) {
    if (!this.unsplash) {
      console.warn('Unsplash not configured, using placeholders');
      return this.getPlaceholders(options.count || 10, options);
    }

    return await this.unsplash.searchPhotos(query, options);
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
    unsplashApiKey: process.env.UNSPLASH_API_KEY,
  };

  const provider = new ImageProvider(config);

  if (!command || command === '--help') {
    console.log(`
📸 Image Provider Service

Commands:
  search <query>           Search Unsplash for images
  random [query]           Get random image(s) from Unsplash
  placeholder <w> <h>      Get Lorem Picsum placeholder
  list                     List available Lorem Picsum images

Options:
  --count=<n>              Number of images (default: 10)
  --orientation=<type>     landscape, portrait, or squarish
  --page=<n>               Page number for search
  --output=<dir>           Output directory for downloads
  --download               Download images to output directory

Environment:
  UNSPLASH_API_KEY         Your Unsplash API access key (optional)
                          Get one at: https://unsplash.com/developers

Examples:
  node image-provider.js search "technology" --count=5
  node image-provider.js random --orientation=landscape
  node image-provider.js placeholder 800 600
  node image-provider.js search "business" --download --output=./images
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
        const shouldDownload = args.includes('--download');
        const outputDir = args.find(a => a.startsWith('--output='))?.split('=')[1] || './images';

        console.log(`🔍 Searching for "${query}"...\n`);
        const results = await provider.searchImages(query, {
          perPage: count,
          orientation,
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

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
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
