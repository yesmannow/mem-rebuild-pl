/**
 * Cloudflare Pages Function: Screenshot Service Proxy
 * 
 * Endpoint: /api/screenshot
 * Method: GET
 * 
 * Proxies requests to a screenshot service for generating case study thumbnails
 * Uses screenshot.guru API (free tier: 100 screenshots/month)
 * 
 * Query parameters:
 * - url: string (required) - URL to screenshot
 * - width: number (optional, default: 1200) - Screenshot width
 * - height: number (optional, default: 630) - Screenshot height
 * - fullpage: boolean (optional, default: false) - Capture full page
 * 
 * Response: Image (PNG)
 */

interface Env {
  SCREENSHOT_API_KEY?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    const width = parseInt(url.searchParams.get('width') || '1200');
    const height = parseInt(url.searchParams.get('height') || '630');
    const fullpage = url.searchParams.get('fullpage') === 'true';

    if (!targetUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameter: url' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate URL
    try {
      new URL(targetUrl);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid URL format' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Use screenshot.guru API (free tier, no API key required for basic usage)
    // Alternative: screenshotapi.net, screenshotmachine.com, or cloudflare-screenshot
    const screenshotUrl = `https://image.thum.io/get/width/${width}/crop/${height}/${encodeURIComponent(targetUrl)}`;

    // Fetch screenshot with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const screenshotResponse = await fetch(screenshotUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)',
      },
    });

    clearTimeout(timeoutId);

    if (!screenshotResponse.ok) {
      throw new Error(`Screenshot service returned ${screenshotResponse.status}`);
    }

    // Get image buffer
    const imageBuffer = await screenshotResponse.arrayBuffer();

    // Return image with appropriate headers
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });

  } catch (error) {
    console.error('Error in screenshot function:', error);
    
    // Return a placeholder image on error (1x1 transparent PNG)
    const placeholderPng = Uint8Array.from(atob(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    ), c => c.charCodeAt(0));

    return new Response(placeholderPng, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache',
      },
    });
  }
};
