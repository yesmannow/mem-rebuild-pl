#!/usr/bin/env node

/**
 * MIME-type verification script.
 * Usage:
 *   node scripts/check-mime.js https://example.com/assets/index.js https://example.com/assets/app.wasm
 *
 * For each provided URL, the script performs a HEAD request (with GET fallback) and validates that
 * .js/.mjs assets return a JavaScript MIME type, and .wasm assets return application/wasm.
 */

import process from 'process';
import pLimit from 'p-limit';

const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.error('[mime-check] No URLs provided. Usage: node scripts/check-mime.js <url1> <url2> ...');
  process.exit(1);
}

const CONCURRENCY_LIMIT = 4;
const limit = pLimit(CONCURRENCY_LIMIT);

function getExpectedMime(urlString) {
  let pathname;
  try {
    const url = new URL(urlString);
    pathname = url.pathname.toLowerCase();
  } catch (error) {
    console.error(`[mime-check] Invalid URL skipped: ${urlString}`, error.message);
    return null;
  }

  if (pathname.endsWith('.js') || pathname.endsWith('.mjs')) {
    return 'javascript';
  }
  if (pathname.endsWith('.wasm')) {
    return 'application/wasm';
  }
  return null;
}

function isValidJavascriptMime(contentType) {
  if (!contentType) return false;
  const normalized = contentType.toLowerCase();
  if (normalized.includes('javascript')) {
    return true;
  }
  return false;
}

async function performRequest(url, method) {
  const response = await fetch(url, {
    method,
    redirect: 'follow'
  });

  if (response.status === 405 && method === 'HEAD') {
    // Some servers do not allow HEAD, retry with GET (range limited if supported)
    return fetch(url, {
      method: 'GET',
      headers: {
        Range: 'bytes=0-0'
      },
      redirect: 'follow'
    });
  }

  return response;
}

async function verifyUrl(url) {
  const expected = getExpectedMime(url);
  if (!expected) {
    console.log(`[mime-check] Skipping ${url} - no MIME expectation (only .js/.mjs/.wasm checked).`);
    return { url, status: 'skipped' };
  }

  let response;
  try {
    response = await performRequest(url, 'HEAD');
  } catch (error) {
    console.error(`[mime-check] Request failed for ${url}`, error.message);
    return { url, status: 'failed', reason: 'network', details: error.message };
  }

  if (!response.ok) {
    console.error(`[mime-check] Non-OK response for ${url} (status: ${response.status})`);
    return { url, status: 'failed', reason: 'status', details: `HTTP ${response.status}` };
  }

  const contentType = response.headers.get('content-type');
  if (!contentType) {
    console.error(`[mime-check] Missing Content-Type header for ${url}`);
    return { url, status: 'failed', reason: 'missing-header' };
  }

  if (expected === 'javascript') {
    if (!isValidJavascriptMime(contentType)) {
      console.error(`[mime-check] Invalid MIME for ${url}. Got "${contentType}", expected JavaScript MIME.`);
      return { url, status: 'failed', reason: 'invalid-mime', details: contentType };
    }
  } else if (expected === 'application/wasm') {
    if (!contentType.toLowerCase().includes('application/wasm')) {
      console.error(`[mime-check] Invalid MIME for ${url}. Got "${contentType}", expected application/wasm.`);
      return { url, status: 'failed', reason: 'invalid-mime', details: contentType };
    }
  }

  console.log(`[mime-check] OK: ${url} (${contentType})`);
  return { url, status: 'ok', contentType };
}

const results = await Promise.all(urls.map((url) => limit(() => verifyUrl(url))));

if (results.some((result) => result.status === 'failed')) {
  process.exitCode = 1;
  console.error('[mime-check] Failures detected. See details above.');
} else {
  console.log('[mime-check] All provided URLs returned expected MIME types.');
}

