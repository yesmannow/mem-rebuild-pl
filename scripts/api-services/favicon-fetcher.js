/**
 * Enhanced Favicon & Logo Fetcher
 * 
 * Utilizes free public APIs to fetch website favicons and logos:
 * - Favicone.com (primary)
 * - Favicon.pub (fallback)
 * - Google S2 (fallback)
 * 
 * Features:
 * - Multiple fallback options
 * - Size optimization
 * - Caching support
 * - Error handling
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

// API Providers Configuration
const PROVIDERS = {
  favicone: {
    name: 'Favicone',
    getUrl: (domain) => `https://favicone.com/${domain}`,
    requiresAuth: false,
    cors: true,
  },
  faviconPub: {
    name: 'Favicon.pub',
    getUrl: (domain, size = 64) => `https://favicon.pub/${domain}?size=${size}`,
    requiresAuth: false,
    cors: true,
  },
  google: {
    name: 'Google S2',
    getUrl: (domain, size = 64) => `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`,
    requiresAuth: false,
    cors: true,
  },
};

/**
 * Normalize domain name
 */
function normalizeDomain(url) {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname.replace(/^www\./, '');
  } catch (error) {
    // If URL parsing fails, assume it's already a domain
    return url.replace(/^www\./, '');
  }
}

/**
 * Fetch favicon from a provider
 */
async function fetchFromProvider(domain, provider, size = 64) {
  const url = provider.getUrl(domain, size);
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FaviconFetcher/1.0)',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error(`Invalid content type: ${contentType}`);
    }

    const buffer = await response.arrayBuffer();
    
    // Validate it's actually an image by checking size
    if (buffer.byteLength < 100) {
      throw new Error('Image too small, likely invalid');
    }

    return {
      buffer: Buffer.from(buffer),
      contentType,
      provider: provider.name,
    };
  } catch (error) {
    console.log(`  ⚠️  ${provider.name} failed: ${error.message}`);
    return null;
  }
}

/**
 * Fetch favicon with multiple fallbacks
 */
async function fetchFavicon(domain, options = {}) {
  const {
    size = 64,
    providers = ['favicone', 'faviconPub', 'google'],
    timeout = 10000,
  } = options;

  const normalizedDomain = normalizeDomain(domain);
  console.log(`\n🔍 Fetching favicon for: ${normalizedDomain}`);

  // Try each provider in sequence
  for (const providerKey of providers) {
    const provider = PROVIDERS[providerKey];
    if (!provider) {
      console.log(`  ⚠️  Unknown provider: ${providerKey}`);
      continue;
    }

    console.log(`  📡 Trying ${provider.name}...`);
    const result = await fetchFromProvider(normalizedDomain, provider, size);
    
    if (result) {
      console.log(`  ✅ Success via ${result.provider}`);
      return result;
    }
  }

  console.log(`  ❌ All providers failed for ${normalizedDomain}`);
  return null;
}

/**
 * Download and save favicon
 */
async function downloadFavicon(domain, outputDir, options = {}) {
  const result = await fetchFavicon(domain, options);
  
  if (!result) {
    return null;
  }

  try {
    // Determine file extension from content type
    const ext = result.contentType.includes('png') ? 'png' :
                result.contentType.includes('jpeg') || result.contentType.includes('jpg') ? 'jpg' :
                result.contentType.includes('svg') ? 'svg' :
                result.contentType.includes('webp') ? 'webp' :
                'png';

    const normalizedDomain = normalizeDomain(domain);
    const filename = `${normalizedDomain.replace(/\./g, '-')}.${ext}`;
    const filepath = path.join(outputDir, filename);

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Save file
    await fs.writeFile(filepath, result.buffer);

    console.log(`  💾 Saved: ${filename}`);

    return {
      domain: normalizedDomain,
      filename,
      filepath,
      size: result.buffer.length,
      contentType: result.contentType,
      provider: result.provider,
    };
  } catch (error) {
    console.error(`  ❌ Error saving favicon: ${error.message}`);
    return null;
  }
}

/**
 * Batch fetch favicons
 */
async function batchFetchFavicons(domains, outputDir, options = {}) {
  const {
    concurrent = 3,
    delay = 1000,
  } = options;

  console.log(`\n🚀 Batch fetching ${domains.length} favicon(s)...\n`);
  
  const results = [];
  const errors = [];

  // Process in batches to respect rate limits
  for (let i = 0; i < domains.length; i += concurrent) {
    const batch = domains.slice(i, i + concurrent);
    const promises = batch.map(domain => downloadFavicon(domain, outputDir, options));
    
    const batchResults = await Promise.all(promises);
    
    batchResults.forEach((result, index) => {
      if (result) {
        results.push(result);
      } else {
        errors.push(batch[index]);
      }
    });

    // Delay between batches
    if (i + concurrent < domains.length) {
      console.log(`\n⏳ Waiting ${delay}ms before next batch...\n`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return { results, errors };
}

/**
 * Save manifest file
 */
async function saveManifest(results, manifestPath) {
  const manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    count: results.length,
    favicons: results.map(r => ({
      domain: r.domain,
      filename: r.filename,
      size: r.size,
      contentType: r.contentType,
      provider: r.provider,
    })),
  };

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📄 Manifest saved: ${manifestPath}`);
}

/**
 * CLI Usage
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help')) {
    console.log(`
📦 Enhanced Favicon Fetcher

Usage:
  node favicon-fetcher.js <domain1> [domain2] [...] [options]

Options:
  --output=<dir>       Output directory (default: public/images/logos/favicons)
  --size=<pixels>      Favicon size (default: 64)
  --concurrent=<num>   Concurrent downloads (default: 3)
  --delay=<ms>         Delay between batches (default: 1000)
  --manifest=<path>    Manifest file path (default: src/data/favicons.json)
  --providers=<list>   Comma-separated provider list (default: favicone,faviconPub,google)

Examples:
  node favicon-fetcher.js google.com github.com
  node favicon-fetcher.js facebook.com --size=128
  node favicon-fetcher.js twitter.com --output=./logos
  node favicon-fetcher.js https://example.com --providers=google,faviconPub

Providers:
  - favicone     : Favicone.com (recommended)
  - faviconPub   : Favicon.pub (fast CDN)
  - google       : Google S2 (reliable fallback)
    `);
    process.exit(0);
  }

  // Parse arguments
  const domains = args.filter(arg => !arg.startsWith('--'));
  const outputDir = (args.find(a => a.startsWith('--output='))?.split('=')[1]) || 
                    path.join(ROOT, 'public/images/logos/favicons');
  const size = parseInt(args.find(a => a.startsWith('--size='))?.split('=')[1]) || 64;
  const concurrent = parseInt(args.find(a => a.startsWith('--concurrent='))?.split('=')[1]) || 3;
  const delay = parseInt(args.find(a => a.startsWith('--delay='))?.split('=')[1]) || 1000;
  const manifestPath = (args.find(a => a.startsWith('--manifest='))?.split('=')[1]) || 
                       path.join(ROOT, 'src/data/favicons.json');
  const providers = (args.find(a => a.startsWith('--providers='))?.split('=')[1]?.split(',')) || 
                    ['favicone', 'faviconPub', 'google'];

  if (domains.length === 0) {
    console.error('❌ Error: No domains specified\n');
    console.log('Run with --help for usage information');
    process.exit(1);
  }

  // Fetch favicons
  const { results, errors } = await batchFetchFavicons(domains, outputDir, {
    size,
    concurrent,
    delay,
    providers,
  });

  // Save manifest
  if (results.length > 0) {
    await saveManifest(results, manifestPath);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully fetched: ${results.length}/${domains.length}`);
  if (errors.length > 0) {
    console.log(`❌ Failed: ${errors.length}`);
    console.log(`   Domains: ${errors.join(', ')}`);
  }
  console.log('='.repeat(50) + '\n');

  process.exit(errors.length > 0 ? 1 : 0);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

// Export functions for use as module
export {
  fetchFavicon,
  downloadFavicon,
  batchFetchFavicons,
  normalizeDomain,
  PROVIDERS,
};
