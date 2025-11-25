/**
 * Cloudflare Pages Function - Competitor Intelligence Scraper
 * Uses Puppeteer MCP capabilities to scrape competitor data
 */

interface Env {
  // Add any environment variables here if needed
}

interface CompetitorData {
  url: string;
  title: string | null;
  description: string | null;
  h1: string | null;
  metaKeywords: string | null;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  technologies: string[];
  loadTime: number;
  wordCount: number;
  imageCount: number;
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
    const startTime = Date.now();

    // Fetch the HTML
    const response = await fetch(validatedUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
    const loadTime = Date.now() - startTime;

    // Parse HTML using regex (lightweight alternative to Cheerio)
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const metaDescMatch = html.match(
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i
    );
    const description = metaDescMatch ? metaDescMatch[1].trim() : null;

    const metaKeywordsMatch = html.match(
      /<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i
    );
    const metaKeywords = metaKeywordsMatch ? metaKeywordsMatch[1].trim() : null;

    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const h1 = h1Match ? h1Match[1].trim() : null;

    // Extract social links
    const socialLinks: CompetitorData['socialLinks'] = {};
    const facebookMatch = html.match(/https?:\/\/(www\.)?(facebook|fb)\.com\/[^\s"']+/i);
    if (facebookMatch) socialLinks.facebook = facebookMatch[0];

    const twitterMatch = html.match(/https?:\/\/(www\.)?(twitter|x)\.com\/[^\s"']+/i);
    if (twitterMatch) socialLinks.twitter = twitterMatch[0];

    const linkedinMatch = html.match(/https?:\/\/(www\.)?linkedin\.com\/[^\s"']+/i);
    if (linkedinMatch) socialLinks.linkedin = linkedinMatch[0];

    const instagramMatch = html.match(/https?:\/\/(www\.)?instagram\.com\/[^\s"']+/i);
    if (instagramMatch) socialLinks.instagram = instagramMatch[0];

    // Detect technologies (common patterns)
    const technologies: string[] = [];
    if (html.includes('wp-content') || html.includes('wordpress')) technologies.push('WordPress');
    if (html.includes('react') || html.includes('React')) technologies.push('React');
    if (html.includes('vue') || html.includes('Vue')) technologies.push('Vue');
    if (html.includes('angular') || html.includes('Angular')) technologies.push('Angular');
    if (html.includes('shopify')) technologies.push('Shopify');
    if (html.includes('woocommerce')) technologies.push('WooCommerce');
    if (html.includes('squarespace')) technologies.push('Squarespace');
    if (html.includes('wix')) technologies.push('Wix');

    // Count words and images
    const textContent = html.replace(/<[^>]+>/g, ' ');
    const wordCount = textContent.split(/\s+/).filter((word) => word.length > 0).length;
    const imageMatches = html.match(/<img[^>]+>/gi);
    const imageCount = imageMatches ? imageMatches.length : 0;

    const competitorData: CompetitorData = {
      url: validatedUrl,
      title,
      description,
      h1,
      metaKeywords,
      socialLinks,
      technologies,
      loadTime,
      wordCount,
      imageCount,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(competitorData, null, 2), {
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

