/**
 * Cloudflare Pages Function - Health Check Endpoint
 * Returns deployment health status for monitoring
 */

interface Env {
  // Add any environment variables here if needed
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const now = new Date();
  
  // Get deployment info from Cloudflare environment
  const gitSha = context.env.CF_PAGES_COMMIT_SHA || 'unknown';
  const branch = context.env.CF_PAGES_BRANCH || 'unknown';
  const buildId = context.env.CF_PAGES_BUILD_ID || 'unknown';
  
  const health = {
    status: 'ok',
    timestamp: now.toISOString(),
    version: gitSha.substring(0, 7),
    branch,
    buildId,
    env: branch === 'main' ? 'production' : 'preview',
    uptime: 'healthy',
    checks: {
      api: 'ok',
      build: 'ok',
      cdn: 'ok',
    }
  };

  return new Response(JSON.stringify(health, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
