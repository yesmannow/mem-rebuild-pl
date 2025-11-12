/* eslint-disable no-console */
import supertest from 'supertest';
import { spawn } from 'child_process';
import path from 'path';

const AI_SERVER_ENTRY = path.join(process.cwd(), 'scripts', 'copilot-ai-server.js');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHealth(baseUrl, timeoutMs = 10000) {
  const start = Date.now();
  const agent = supertest(baseUrl);
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await agent.get('/health');
      if (res.status === 200) return;
    } catch {}
    await sleep(200);
  }
  throw new Error('AI Server did not become healthy in time');
}

function startAIServer(port, extraEnv = {}) {
  const child = spawn(process.execPath, [AI_SERVER_ENTRY], {
    stdio: 'pipe',
    env: { 
      ...process.env, 
      AI_SERVER_PORT: String(port),
      AI_DRY_RUN: 'true',
      ...extraEnv 
    },
  });
  return child;
}

function randomPort() {
  return 5175 + Math.floor(Math.random() * 100);
}

describe('AI Server API Tests', () => {
  let child;
  let baseUrl;
  let port;

  beforeEach(async () => {
    port = randomPort();
    child = startAIServer(port);
    baseUrl = `http://localhost:${port}`;
    await waitForHealth(baseUrl);
  });

  afterEach(() => {
    if (child && !child.killed) {
      try { 
        child.kill(); 
      } catch {}
    }
    child = undefined;
  });

  describe('Health Check', () => {
    test('GET /health should return ok status', async () => {
      const response = await supertest(baseUrl)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('dryRun', true);
      expect(response.body).toHaveProperty('openaiConfigured');
    });
  });

  describe('POST /api/ai/summarize_logs', () => {
    test('should return summary of logs', async () => {
      const response = await supertest(baseUrl)
        .post('/api/ai/summarize_logs')
        .send({
          logs: 'Error: Module not found\nTypeError: Cannot read property of undefined'
        })
        .expect(200);

      expect(response.body).toHaveProperty('summary');
      expect(response.body).toHaveProperty('rootCauses');
      expect(response.body).toHaveProperty('suggestedActions');
      expect(response.body).toHaveProperty('severity');
      expect(response.body).toHaveProperty('tokens');
      expect(response.body).toHaveProperty('cacheStatus');
      
      expect(Array.isArray(response.body.rootCauses)).toBe(true);
      expect(Array.isArray(response.body.suggestedActions)).toBe(true);
    });

    test('should return 400 if logs field is missing', async () => {
      const response = await supertest(baseUrl)
        .post('/api/ai/summarize_logs')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('logs');
    });
  });

  describe('POST /api/ai/suggest_patch', () => {
    test('should return patch suggestion', async () => {
      const response = await supertest(baseUrl)
        .post('/api/ai/suggest_patch')
        .send({
          error: 'TypeError: Cannot read property className of undefined',
          context: 'src/components/Button.tsx'
        })
        .expect(200);

      expect(response.body).toHaveProperty('patch');
      expect(response.body).toHaveProperty('explanation');
      expect(response.body).toHaveProperty('files');
      expect(response.body).toHaveProperty('confidence');
      expect(response.body).toHaveProperty('tokens');
      expect(response.body).toHaveProperty('cacheStatus');
      
      expect(Array.isArray(response.body.files)).toBe(true);
      expect(['low', 'medium', 'high']).toContain(response.body.confidence);
    });

    test('should return 400 if error field is missing', async () => {
      const response = await supertest(baseUrl)
        .post('/api/ai/suggest_patch')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('error');
    });
  });

  describe('POST /api/ai/generate_tokens', () => {
    test('should generate design tokens from brief', async () => {
      const response = await supertest(baseUrl)
        .post('/api/ai/generate_tokens')
        .send({
          brief: 'crafty, tactile, no purple'
        })
        .expect(200);

      expect(response.body).toHaveProperty('tokens');
      expect(response.body).toHaveProperty('brief', 'crafty, tactile, no purple');
      expect(response.body).toHaveProperty('tokens_used');
      expect(response.body).toHaveProperty('cacheStatus');
      
      // Check token structure
      expect(response.body.tokens).toHaveProperty('colors');
      expect(response.body.tokens).toHaveProperty('spacing');
      expect(response.body.tokens).toHaveProperty('typography');
      
      // Verify colors
      expect(response.body.tokens.colors).toHaveProperty('primary');
      expect(response.body.tokens.colors).toHaveProperty('secondary');
      
      // Verify spacing
      expect(response.body.tokens.spacing).toHaveProperty('md');
      
      // Verify typography
      expect(response.body.tokens.typography).toHaveProperty('fontFamily');
      expect(response.body.tokens.typography).toHaveProperty('fontSize');
    });

    test('should return 400 if brief field is missing', async () => {
      const response = await supertest(baseUrl)
        .post('/api/ai/generate_tokens')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('brief');
    });
  });

  describe('GET /api/monitoring/stats', () => {
    test('should return monitoring statistics', async () => {
      const response = await supertest(baseUrl)
        .get('/api/monitoring/stats')
        .expect(200);

      expect(response.body).toHaveProperty('aiStats');
      expect(response.body).toHaveProperty('tokenUsage');
      expect(response.body).toHaveProperty('cacheHits');
      expect(response.body).toHaveProperty('cacheMisses');
      expect(response.body).toHaveProperty('cacheSize');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('dryRun', true);
      
      // Check aiStats structure
      expect(response.body.aiStats).toHaveProperty('summarize_logs');
      expect(response.body.aiStats).toHaveProperty('suggest_patch');
      expect(response.body.aiStats).toHaveProperty('generate_tokens');
      
      // Each tool should have count and tokens
      expect(response.body.aiStats.summarize_logs).toHaveProperty('count');
      expect(response.body.aiStats.summarize_logs).toHaveProperty('tokens');
    });

    test('should track request counts', async () => {
      // Get initial stats
      const stats1 = await supertest(baseUrl)
        .get('/api/monitoring/stats')
        .expect(200);
      
      const initialCount = stats1.body.aiStats.summarize_logs.count;

      // Make a request
      await supertest(baseUrl)
        .post('/api/ai/summarize_logs')
        .send({ logs: 'test error' })
        .expect(200);

      // Check updated stats
      const stats2 = await supertest(baseUrl)
        .get('/api/monitoring/stats')
        .expect(200);
      
      expect(stats2.body.aiStats.summarize_logs.count).toBe(initialCount + 1);
    });
  });

  describe('Rate Limiting', () => {
    test('should allow reasonable number of requests', async () => {
      // Make 5 requests quickly
      for (let i = 0; i < 5; i++) {
        await supertest(baseUrl)
          .get('/health')
          .expect(200);
      }
    });
  });

  describe('Dry Run Mode', () => {
    test('all endpoints should work in dry-run mode', async () => {
      const endpoints = [
        { method: 'post', path: '/api/ai/summarize_logs', body: { logs: 'test' } },
        { method: 'post', path: '/api/ai/suggest_patch', body: { error: 'test' } },
        { method: 'post', path: '/api/ai/generate_tokens', body: { brief: 'test' } }
      ];

      for (const endpoint of endpoints) {
        const response = await supertest(baseUrl)
          .post(endpoint.path)
          .send(endpoint.body)
          .expect(200);

        expect(response.body).toBeDefined();
      }
    });
  });
});
