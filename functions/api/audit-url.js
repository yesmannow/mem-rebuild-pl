export const onRequestGet = async ({ request }) => {
  const url = new URL(request.url);
  const target = url.searchParams.get('url');

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (!target) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const normalized =
    target.startsWith('http://') || target.startsWith('https://') ? target : `https://${target}`;

  let fetched;
  try {
    fetched = await fetch(normalized, { redirect: 'follow' });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Could not scan target' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  if (!fetched || !fetched.ok) {
    return new Response(JSON.stringify({ error: 'Could not scan target' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const result = {
    title: '',
    description: '',
    h1: '',
    ogImage: '',
  };

  const rewriter = new HTMLRewriter()
    .on('title', {
      text(text) {
        result.title += text.text;
      },
    })
    .on('meta[name="description"]', {
      element(el) {
        result.description ||= el.getAttribute('content') || '';
      },
    })
    .on('h1', {
      text(text) {
        if (!result.h1) {
          result.h1 += text.text;
        }
      },
    })
    .on('meta[property="og:image"]', {
      element(el) {
        result.ogImage ||= el.getAttribute('content') || '';
      },
    });

  // Consume the stream to trigger HTMLRewriter
  await rewriter.transform(fetched).text();

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
};

export const onRequestOptions = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
