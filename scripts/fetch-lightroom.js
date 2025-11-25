#!/usr/bin/env node

/**
 * Adobe Lightroom Photo Fetcher
 * ------------------------------
 * Fetches photos from Adobe Lightroom API and downloads them locally
 * Requires: ADOBE_CLIENT_ID, ADOBE_CLIENT_SECRET, ADOBE_REFRESH_TOKEN in .env
 */

import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';
import { pipeline } from 'stream/promises';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function printColor(text, color) {
  console.log(`${color}${text}${colors.reset}`);
}

function printStep(step, message) {
  console.log(`\n${colors.cyan}[${step}]${colors.reset} ${message}`);
}

/**
 * Strip Adobe's security prefix and parse JSON response
 * Adobe wraps JSON in "while (1) {}" to prevent JSON hijacking
 */
function parseAdobeResponse(data) {
  // If data is already an object, return it
  if (typeof data === 'object' && data !== null) {
    return data;
  }

  // If data is a string, check for security prefix
  if (typeof data === 'string') {
    let cleanData = data;

    // Strip the "while (1) {}" prefix if present
    if (cleanData.trim().startsWith('while')) {
      cleanData = cleanData.replace(/^while\s*\(1\)\s*\{\}\s*/, '');
    }

    // Parse the JSON
    try {
      return JSON.parse(cleanData);
    } catch (error) {
      throw new Error(`Failed to parse JSON response: ${error.message}`);
    }
  }

  return data;
}

/**
 * Get access token from refresh token
 */
async function getAccessToken(clientId, clientSecret, refreshToken) {
  printStep('1/4', 'Exchanging refresh token for access token...');

  try {
    const response = await axios.post(
      'https://ims-na1.adobelogin.com/ims/token/v3',
      new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!response.data.access_token) {
      throw new Error('No access token received in response');
    }

    printColor('✓ Access token obtained', colors.green);
    return response.data.access_token;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Failed to get access token: ${error.response.status} - ${JSON.stringify(error.response.data)}`
      );
    }
    throw error;
  }
}

/**
 * Discover catalog ID
 */
async function discoverCatalog(accessToken) {
  printStep('2/4', 'Discovering Lightroom catalog...');

  try {
    const response = await axios.get('https://lr.adobe.io/v2/catalog', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-API-Key': process.env.ADOBE_CLIENT_ID,
      },
      responseType: 'text', // Get raw response to handle security prefix
    });

    // Handle Adobe's security prefix and parse JSON
    const data = parseAdobeResponse(response.data);

    const catalogId = data?.id || data?.catalog?.id;
    if (!catalogId) {
      console.log('\nDEBUG: Adobe Catalog Response:', JSON.stringify(data, null, 2));
      throw new Error('No catalog ID found in response');
    }

    printColor(`✓ Found catalog ID: ${catalogId}`, colors.green);
    return catalogId;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;

      // Enhanced logging for 403 errors
      if (status === 403) {
        console.error('\n❌ 403 Forbidden Error - Full Response:');
        console.error('Status:', status);
        console.error('Headers:', JSON.stringify(error.response.headers, null, 2));

        // Try to parse error data if it's a string
        let parsedError = errorData;
        if (typeof errorData === 'string') {
          try {
            parsedError = parseAdobeResponse(errorData);
          } catch {
            // If parsing fails, use raw string
          }
        }

        console.error('Error Body:', JSON.stringify(parsedError, null, 2));
        throw new Error(
          `403 Forbidden: Access denied. Check if your refresh token has the required scopes (lr_partner_apis, lr_partner_rendition_apis).`
        );
      }

      throw new Error(
        `Failed to discover catalog: ${status} - ${JSON.stringify(errorData)}`
      );
    }
    throw error;
  }
}

/**
 * Fetch assets from catalog
 */
async function fetchAssets(accessToken, catalogId, limit = 20) {
  printStep('3/4', `Fetching first ${limit} assets from catalog...`);

  try {
    const response = await axios.get(
      `https://lr.adobe.io/v2/catalogs/${catalogId}/assets`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-API-Key': process.env.ADOBE_CLIENT_ID,
        },
        params: {
          limit,
          subtype: 'image',
        },
        responseType: 'text', // Get raw response to handle security prefix
      }
    );

    // Handle Adobe's security prefix and parse JSON
    const data = parseAdobeResponse(response.data);

    const assets = data?.resources || data?.assets || [];
    printColor(`✓ Found ${assets.length} assets`, colors.green);
    return assets;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;

      // Enhanced logging for 403 errors
      if (status === 403) {
        console.error('\n❌ 403 Forbidden Error - Full Response:');
        console.error('Status:', status);
        console.error('Headers:', JSON.stringify(error.response.headers, null, 2));

        // Try to parse error data if it's a string
        let parsedError = errorData;
        if (typeof errorData === 'string') {
          try {
            parsedError = parseAdobeResponse(errorData);
          } catch {
            // If parsing fails, use raw string
          }
        }

        console.error('Error Body:', JSON.stringify(parsedError, null, 2));
        throw new Error(
          `403 Forbidden: Access denied. Check if your refresh token has the required scopes (lr_partner_apis, lr_partner_rendition_apis).`
        );
      }

      throw new Error(
        `Failed to fetch assets: ${status} - ${JSON.stringify(errorData)}`
      );
    }
    throw error;
  }
}

/**
 * Get rendition URL for an asset
 * Tries multiple endpoint formats and sizes as fallbacks
 */
async function getRenditionUrl(accessToken, catalogId, assetId, size = '2048') {
  // Try different sizes in order of preference (thumbnail2x first as it's often pre-generated)
  const sizesToTry = ['thumbnail2x', size, '1280', '640'];

  for (const trySize of sizesToTry) {
    // Try multiple endpoint and body format combinations
    const attempts = [
      // Attempt 1: GET with size in URL path
      {
        method: 'GET',
        url: `https://lr.adobe.io/v2/catalogs/${catalogId}/assets/${assetId}/renditions/${trySize}`,
        body: null,
      },
      // Attempt 2: POST to /renditions with rendition_type in body
      {
        method: 'POST',
        url: `https://lr.adobe.io/v2/catalogs/${catalogId}/assets/${assetId}/renditions`,
        body: { rendition_type: trySize },
      },
      // Attempt 3: POST to /renditions with type in body
      {
        method: 'POST',
        url: `https://lr.adobe.io/v2/catalogs/${catalogId}/assets/${assetId}/renditions`,
        body: { type: trySize },
      },
      // Attempt 4: POST to /renditions/2048 with empty body
      {
        method: 'POST',
        url: `https://lr.adobe.io/v2/catalogs/${catalogId}/assets/${assetId}/renditions/${trySize}`,
        body: {},
      },
    ];

    for (const attempt of attempts) {
      try {
        const requestConfig = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-API-Key': process.env.ADOBE_CLIENT_ID,
          },
          responseType: 'text', // Get raw response to handle security prefix
        };

        let response;
        if (attempt.method === 'POST') {
          requestConfig.headers['Content-Type'] = 'application/json';
          if (attempt.body && Object.keys(attempt.body).length > 0) {
            response = await axios.post(attempt.url, attempt.body, requestConfig);
          } else {
            response = await axios.post(attempt.url, {}, requestConfig);
          }
        } else {
          response = await axios.get(attempt.url, requestConfig);
        }

        // Handle Adobe's security prefix and parse JSON
        const data = parseAdobeResponse(response.data);

        // The rendition URL might be in different places depending on API version
        const renditionUrl =
          data?.resources?.[0]?.href ||
          data?.resources?.[0]?.url ||
          data?.href ||
          data?.url ||
          data?.link?.href;

        if (renditionUrl) {
          if (trySize !== size) {
            console.log(`    ℹ️  Using fallback size: ${trySize} (requested: ${size})`);
          }
          return renditionUrl;
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          const errorData = error.response.data;

          // Enhanced logging for 400 errors (only log once per size to reduce noise)
          if (status === 400 && attempt === attempts[attempts.length - 1]) {
            // Only log on the last attempt for this size
            let parsedError = errorData;
            if (typeof errorData === 'string') {
              try {
                parsedError = parseAdobeResponse(errorData);
              } catch {
                // If parsing fails, use raw string
              }
            }

            // Continue to next attempt/size silently unless it's the last one
            continue;
          }

          // Enhanced logging for 403 errors
          if (status === 403) {
            console.error(`\n❌ 403 Forbidden Error for asset ${assetId} - Full Response:`);
            console.error('Status:', status);
            console.error('Headers:', JSON.stringify(error.response.headers, null, 2));

            // Try to parse error data if it's a string
            let parsedError = errorData;
            if (typeof errorData === 'string') {
              try {
                parsedError = parseAdobeResponse(errorData);
              } catch {
                // If parsing fails, use raw string
              }
            }

            console.error('Error Body:', JSON.stringify(parsedError, null, 2));
            console.error('This likely means the refresh token is missing the lr_partner_rendition_apis scope.');
            return null; // Don't retry for 403
          }

          // For other errors, continue to next endpoint/size
          if (status !== 404) {
            // 404 might mean size not available, so continue
            continue;
          }
        } else {
          // Network or other non-HTTP error, continue
          continue;
        }
      }
    }
  }

  // All attempts failed
  console.warn(`    ⚠️  Could not get rendition for asset ${assetId} after trying all sizes and endpoints`);
  return null;
}

/**
 * Download image from URL
 */
async function downloadImage(url, filePath) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fsPromises.mkdir(dir, { recursive: true });

    // Write file
    const writer = fs.createWriteStream(filePath);
    await pipeline(response.data, writer);

    return true;
  } catch (error) {
    console.warn(`Warning: Failed to download ${url}: ${error.message}`);
    return false;
  }
}

/**
 * Extract metadata from asset
 */
function extractMetadata(asset) {
  return {
    id: asset.id || asset.asset_id,
    title: asset.title || asset.caption || 'Untitled',
    width: asset.width || asset.dimensions?.width || null,
    height: asset.height || asset.dimensions?.height || null,
    captured: asset.captured || asset.capture_date || null,
    created: asset.created || asset.created_date || null,
    modified: asset.modified || asset.modified_date || null,
  };
}

/**
 * Main function
 */
async function main() {
  console.log('\n' + '='.repeat(70));
  printColor('📸 Adobe Lightroom Photo Fetcher', colors.bright);
  console.log('='.repeat(70));

  // Check for required environment variables
  const clientId = process.env.ADOBE_CLIENT_ID;
  const clientSecret = process.env.ADOBE_CLIENT_SECRET;
  const refreshToken = process.env.ADOBE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.error('\n❌ Missing required environment variables:');
    if (!clientId) console.error('   - ADOBE_CLIENT_ID');
    if (!clientSecret) console.error('   - ADOBE_CLIENT_SECRET');
    if (!refreshToken) console.error('   - ADOBE_REFRESH_TOKEN');
    console.error('\nPlease add these to your .env file.\n');
    process.exit(1);
  }

  try {
    // Step 1: Get access token
    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);

    // Step 2: Discover catalog
    const catalogId = await discoverCatalog(accessToken);

    // Step 3: Fetch assets
    const assets = await fetchAssets(accessToken, catalogId, 20);

    if (assets.length === 0) {
      printColor('\n⚠️  No assets found in catalog.', colors.yellow);
      process.exit(0);
    }

    // Step 4: Download images
    printStep('4/4', 'Downloading images and generating metadata...');

    const outputDir = path.join(repoRoot, 'public', 'images', 'lightroom');
    const galleryData = [];

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const assetId = asset.id || asset.asset_id;
      const metadata = extractMetadata(asset);

      printColor(`\n  Processing ${i + 1}/${assets.length}: ${metadata.title}`, colors.blue);

      // Get rendition URL
      const renditionUrl = await getRenditionUrl(accessToken, catalogId, assetId, '2048');

      if (!renditionUrl) {
        console.warn(`    ⚠️  Skipping ${metadata.title} - no rendition URL`);
        continue;
      }

      // Determine file extension from URL or default to jpg
      const urlExt = path.extname(new URL(renditionUrl).pathname) || '.jpg';
      const fileName = `${assetId}${urlExt}`;
      const filePath = path.join(outputDir, fileName);
      const relativePath = `/images/lightroom/${fileName}`;

      // Download image
      const downloaded = await downloadImage(renditionUrl, filePath);

      if (downloaded) {
        printColor(`    ✓ Downloaded: ${fileName}`, colors.green);
        galleryData.push({
          src: relativePath,
          title: metadata.title,
          id: assetId,
          width: metadata.width,
          height: metadata.height,
          captured: metadata.captured,
          created: metadata.created,
        });
      } else {
        console.warn(`    ⚠️  Failed to download: ${metadata.title}`);
      }
    }

    // Save gallery JSON
    const galleryJsonPath = path.join(repoRoot, 'src', 'data', 'lightroom-gallery.json');
    await fsPromises.writeFile(
      galleryJsonPath,
      JSON.stringify(galleryData, null, 2),
      'utf8'
    );

    printColor(`\n✓ Gallery data saved to: src/data/lightroom-gallery.json`, colors.green);
    printColor(`✓ Downloaded ${galleryData.length} images to: public/images/lightroom/`, colors.green);

    console.log('\n' + '='.repeat(70));
    printColor('✅ Lightroom fetch complete!', colors.bright);
    console.log('='.repeat(70) + '\n');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();

