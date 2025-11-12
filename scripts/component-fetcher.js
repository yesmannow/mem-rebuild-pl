#!/usr/bin/env node
import fetch from 'node-fetch';
import { load } from 'cheerio';

const ALLOWLISTED_SOURCES = [
  'https://purecode.ai',
  'https://superdesign.dev',
  'https://pagedone.io',
  'https://uipkg.com',
  'https://pixelapps.io'
];

const query = process.argv[2] || 'button';

/**
 * Fetch component data from allowlisted domains
 * @param {string} query - Component name or search term
 * @returns {Promise<Object>} Component data with source, title, install, code
 */
async function fetchComponentData(query) {
  console.error(`🔍 Searching for "${query}" across ${ALLOWLISTED_SOURCES.length} domains...`);

  for (const domain of ALLOWLISTED_SOURCES) {
    try {
      console.error(`  Checking ${domain}...`);
      
      // Construct search URL
      const searchUrl = `${domain}/search?q=${encodeURIComponent(query)}`;
      
      const res = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 5000
      });

      if (!res.ok) {
        console.error(`    ⚠️  ${domain} returned ${res.status}`);
        continue;
      }

      const html = await res.text();
      const $ = load(html);

      // Try to extract install command (look for npx, npm, or yarn commands)
      const install = $('code:contains("npx"), code:contains("npm"), code:contains("yarn")')
        .first()
        .text()
        .trim();

      // Try to extract code snippet
      const code = $('pre code, .code-block code, [class*="code"] pre')
        .first()
        .text()
        .trim();

      // Extract title
      const title = $('h1, h2, .component-title, [class*="title"]')
        .first()
        .text()
        .trim();

      if (install && code) {
        console.error(`  ✅ Found component at ${domain}`);
        return {
          source: domain,
          title: title || query,
          install,
          code,
          query
        };
      }

      // If we got partial results, store them as fallback
      if (code) {
        console.error(`  ⚠️  Found code but no install instructions at ${domain}`);
      }

    } catch (err) {
      console.error(`    ❌ Failed to fetch from ${domain}:`, err.message);
    }
  }

  console.error(`  ❌ No component found across all sources`);
  return {
    error: 'No component found across allowlisted sources.',
    query,
    searchedDomains: ALLOWLISTED_SOURCES
  };
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchComponentData(query)
    .then(result => {
      // Output JSON to stdout (stderr is used for logging)
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.error('Fatal error:', err);
      process.exit(1);
    });
}

export { fetchComponentData, ALLOWLISTED_SOURCES };
