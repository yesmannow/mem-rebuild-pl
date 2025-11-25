/**
 * Cloudflare Pages Function - SEO URL Audit Endpoint
 * Fetches HTML from a URL and extracts SEO metadata
 */

interface Env {
  // Add any environment variables here if needed
}

interface SEOAuditResult {
  url: string;
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1Count: number;
  h1Text: string[];
  healthScore: number;
  issues: string[];
  timestamp: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = context.request.url;
  const searchParams = new URL(url).searchParams;
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response(
      JSON.stringify({ error: 'Missing url parameter' }, null, 2),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  try {
    // Validate URL format
    let validatedUrl = targetUrl.trim();
    if (!validatedUrl.startsWith('http://') && !validatedUrl.startsWith('https://')) {
      validatedUrl = `https://${validatedUrl}`;
    }

    // Validate URL is properly formatted
    let urlObj: URL;
    try {
      urlObj = new URL(validatedUrl);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid URL format' }, null, 2),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Fetch the HTML
    const response = await fetch(validatedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOAuditBot/1.0)',
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify(
          {
            error: `Failed to fetch URL: ${response.status} ${response.statusText}`,
          },
          null,
          2
        ),
        {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const html = await response.text();

    // Extract SEO elements using regex
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;
    const titleLength = title ? title.length : 0;

    // Extract meta description
    const metaDescMatch = html.match(
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i
    );
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;
    const metaDescriptionLength = metaDescription ? metaDescription.length : 0;

    // Extract H1 tags
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
    const h1Text = h1Matches.map((match) => {
      const textMatch = match.match(/<h1[^>]*>([^<]+)<\/h1>/i);
      return textMatch ? textMatch[1].trim() : '';
    }).filter(Boolean);
    const h1Count = h1Text.length;

    // Calculate health score (0-100)
    let healthScore = 100;
    const issues: string[] = [];

    // Title checks
    if (!title) {
      healthScore -= 30;
      issues.push('Missing title tag');
    } else if (titleLength < 30) {
      healthScore -= 10;
      issues.push('Title too short (recommended: 30-60 characters)');
    } else if (titleLength > 60) {
      healthScore -= 10;
      issues.push('Title too long (recommended: 30-60 characters)');
    }

    // Meta description checks
    if (!metaDescription) {
      healthScore -= 25;
      issues.push('Missing meta description');
    } else if (metaDescriptionLength < 120) {
      healthScore -= 10;
      issues.push('Meta description too short (recommended: 120-160 characters)');
    } else if (metaDescriptionLength > 160) {
      healthScore -= 10;
      issues.push('Meta description too long (recommended: 120-160 characters)');
    }

    // H1 checks
    if (h1Count === 0) {
      healthScore -= 20;
      issues.push('Missing H1 tag');
    } else if (h1Count > 1) {
      healthScore -= 5;
      issues.push(`Multiple H1 tags found (${h1Count}) - recommended: 1`);
    }

    // Ensure score doesn't go below 0
    healthScore = Math.max(0, healthScore);

    const result: SEOAuditResult = {
      url: validatedUrl,
      title,
      titleLength,
      metaDescription,
      metaDescriptionLength,
      h1Count,
      h1Text,
      healthScore,
      issues,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(result, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify(
        {
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        },
        null,
        2
      ),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};

