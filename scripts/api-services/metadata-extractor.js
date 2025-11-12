/**
 * Metadata Extractor Service
 * 
 * Extracts rich metadata from websites using free APIs:
 * - JsonLink (comprehensive metadata)
 * - Direct HTML parsing (fallback)
 * - Open Graph protocol extraction
 * 
 * Features:
 * - Title, description, images extraction
 * - Open Graph metadata
 * - Twitter Card data
 * - Favicon detection
 * - Author and publication info
 */

import { load } from 'cheerio';

/**
 * JsonLink API Client
 */
class JsonLinkClient {
  constructor() {
    this.baseUrl = 'https://jsonlink.io/api/extract';
  }

  /**
   * Extract metadata from URL
   */
  async extract(url) {
    try {
      const response = await fetch(`${this.baseUrl}?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error(`JsonLink API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        title: data.title,
        description: data.description,
        image: data.images?.[0] || data.image,
        favicon: data.favicon,
        url: data.url,
        domain: data.domain,
        author: data.author,
        publisher: data.publisher,
        type: data.type,
        siteName: data.site_name,
        openGraph: data.og || {},
        twitterCard: data.twitter || {},
        provider: 'jsonlink',
      };
    } catch (error) {
      console.error('JsonLink error:', error.message);
      return null;
    }
  }
}

/**
 * Direct HTML Metadata Extractor
 */
class HtmlMetadataExtractor {
  /**
   * Fetch and parse HTML
   */
  async extract(url) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MetadataBot/1.0)',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const html = await response.text();
      return this.parseHtml(html, url);
    } catch (error) {
      console.error('HTML fetch error:', error.message);
      return null;
    }
  }

  /**
   * Parse HTML and extract metadata
   */
  parseHtml(html, url) {
    const $ = load(html);
    
    // Basic metadata
    const title = this.extractTitle($);
    const description = this.extractDescription($);
    const image = this.extractImage($, url);
    const favicon = this.extractFavicon($, url);
    
    // Open Graph
    const openGraph = this.extractOpenGraph($);
    
    // Twitter Card
    const twitterCard = this.extractTwitterCard($);
    
    // Additional metadata
    const author = this.extractAuthor($);
    const keywords = this.extractKeywords($);
    
    return {
      title,
      description,
      image,
      favicon,
      url,
      domain: new URL(url).hostname,
      author,
      keywords,
      openGraph,
      twitterCard,
      provider: 'html-parser',
    };
  }

  extractTitle($) {
    return (
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('title').text() ||
      $('h1').first().text() ||
      ''
    ).trim();
  }

  extractDescription($) {
    return (
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="twitter:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      ''
    ).trim();
  }

  extractImage($, baseUrl) {
    const ogImage = $('meta[property="og:image"]').attr('content');
    const twitterImage = $('meta[name="twitter:image"]').attr('content');
    const firstImg = $('img').first().attr('src');
    
    const imageUrl = ogImage || twitterImage || firstImg;
    
    if (!imageUrl) return null;
    
    // Convert relative URLs to absolute
    try {
      return new URL(imageUrl, baseUrl).href;
    } catch {
      return imageUrl;
    }
  }

  extractFavicon($, baseUrl) {
    const faviconSelectors = [
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
      'link[rel="apple-touch-icon"]',
    ];
    
    for (const selector of faviconSelectors) {
      const href = $(selector).attr('href');
      if (href) {
        try {
          return new URL(href, baseUrl).href;
        } catch {
          continue;
        }
      }
    }
    
    // Fallback to /favicon.ico
    try {
      return new URL('/favicon.ico', baseUrl).href;
    } catch {
      return null;
    }
  }

  extractOpenGraph($) {
    const og = {};
    
    $('meta[property^="og:"]').each((_, el) => {
      const property = $(el).attr('property').replace('og:', '');
      const content = $(el).attr('content');
      if (content) {
        og[property] = content;
      }
    });
    
    return og;
  }

  extractTwitterCard($) {
    const twitter = {};
    
    $('meta[name^="twitter:"]').each((_, el) => {
      const name = $(el).attr('name').replace('twitter:', '');
      const content = $(el).attr('content');
      if (content) {
        twitter[name] = content;
      }
    });
    
    return twitter;
  }

  extractAuthor($) {
    return (
      $('meta[name="author"]').attr('content') ||
      $('meta[property="article:author"]').attr('content') ||
      $('meta[name="twitter:creator"]').attr('content') ||
      ''
    ).trim();
  }

  extractKeywords($) {
    const keywords = $('meta[name="keywords"]').attr('content');
    return keywords ? keywords.split(',').map(k => k.trim()) : [];
  }
}

/**
 * Unified Metadata Extractor
 */
class MetadataExtractor {
  constructor(options = {}) {
    this.useJsonLink = options.useJsonLink !== false;
    this.jsonLinkClient = new JsonLinkClient();
    this.htmlExtractor = new HtmlMetadataExtractor();
  }

  /**
   * Extract metadata with fallback
   */
  async extract(url) {
    console.log(`\n🔍 Extracting metadata from: ${url}`);

    // Try JsonLink first if enabled
    if (this.useJsonLink) {
      console.log('  📡 Trying JsonLink API...');
      const jsonLinkData = await this.jsonLinkClient.extract(url);
      
      if (jsonLinkData) {
        console.log('  ✅ Success via JsonLink');
        return jsonLinkData;
      }
      
      console.log('  ⚠️  JsonLink failed, falling back to HTML parser...');
    }

    // Fallback to direct HTML parsing
    console.log('  📄 Parsing HTML directly...');
    const htmlData = await this.htmlExtractor.extract(url);
    
    if (htmlData) {
      console.log('  ✅ Success via HTML parser');
      return htmlData;
    }

    console.log('  ❌ All extraction methods failed');
    return null;
  }

  /**
   * Batch extract metadata
   */
  async batchExtract(urls, options = {}) {
    const { delay = 1000 } = options;
    
    console.log(`\n🚀 Batch extracting metadata for ${urls.length} URL(s)...\n`);
    
    const results = [];
    
    for (const url of urls) {
      const metadata = await this.extract(url);
      
      if (metadata) {
        results.push(metadata);
      }
      
      // Delay between requests to be respectful
      if (urls.indexOf(url) < urls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return results;
  }
}

/**
 * CLI Usage
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help')) {
    console.log(`
🔎 Metadata Extractor Service

Usage:
  node metadata-extractor.js <url1> [url2] [...] [options]

Options:
  --no-jsonlink        Skip JsonLink API, use HTML parser only
  --delay=<ms>         Delay between requests (default: 1000)
  --output=<file>      Save results to JSON file
  --pretty             Pretty print JSON output

Examples:
  node metadata-extractor.js https://example.com
  node metadata-extractor.js https://github.com https://google.com
  node metadata-extractor.js https://example.com --output=metadata.json
  node metadata-extractor.js https://example.com --no-jsonlink

Features:
  ✓ Title and description extraction
  ✓ Image and favicon detection
  ✓ Open Graph metadata
  ✓ Twitter Card data
  ✓ Author and keyword extraction
  ✓ Automatic fallback to HTML parsing
    `);
    process.exit(0);
  }

  // Parse arguments
  const urls = args.filter(arg => !arg.startsWith('--') && (arg.startsWith('http://') || arg.startsWith('https://')));
  const useJsonLink = !args.includes('--no-jsonlink');
  const delay = parseInt(args.find(a => a.startsWith('--delay='))?.split('=')[1]) || 1000;
  const outputFile = args.find(a => a.startsWith('--output='))?.split('=')[1];
  const pretty = args.includes('--pretty');

  if (urls.length === 0) {
    console.error('❌ Error: No valid URLs specified\n');
    console.log('Run with --help for usage information');
    process.exit(1);
  }

  try {
    const extractor = new MetadataExtractor({ useJsonLink });
    const results = await extractor.batchExtract(urls, { delay });

    // Display results
    console.log('\n' + '='.repeat(70));
    console.log(`📊 Extracted metadata for ${results.length}/${urls.length} URL(s)`);
    console.log('='.repeat(70) + '\n');

    results.forEach((meta, i) => {
      console.log(`${i + 1}. ${meta.title || 'Untitled'}`);
      console.log(`   URL: ${meta.url}`);
      console.log(`   Domain: ${meta.domain}`);
      if (meta.description) {
        const desc = meta.description.length > 100 ? 
          meta.description.substring(0, 100) + '...' : 
          meta.description;
        console.log(`   Description: ${desc}`);
      }
      if (meta.image) {
        console.log(`   Image: ${meta.image}`);
      }
      if (meta.author) {
        console.log(`   Author: ${meta.author}`);
      }
      console.log(`   Provider: ${meta.provider}`);
      console.log();
    });

    // Save to file if requested
    if (outputFile) {
      const { default: fs } = await import('fs/promises');
      const json = pretty ? JSON.stringify(results, null, 2) : JSON.stringify(results);
      await fs.writeFile(outputFile, json);
      console.log(`💾 Results saved to: ${outputFile}`);
    }

    process.exit(results.length === urls.length ? 0 : 1);
  } catch (error) {
    console.error('❌ Fatal error:', error);
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
  JsonLinkClient,
  HtmlMetadataExtractor,
  MetadataExtractor,
};
