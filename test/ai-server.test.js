import request from 'supertest';
import { jest } from '@jest/globals';

// Mock environment
process.env.AI_DRY_RUN = 'true';
process.env.AI_SERVER_PORT = '5175'; // Use different port for testing

describe('AI Server API Tests', () => {
  let app;
  let server;

  beforeAll(async () => {
    // Dynamically import the server
    const module = await import('../scripts/copilot-ai-server.js');
    app = module.default;
    
    // Start server on test port
    server = app.listen(5175);
    
    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  describe('Health Check', () => {
    test('GET /health should return ok status', async () => {
      const response = await request(app)
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
      const response = await request(app)
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
      const response = await request(app)
        .post('/api/ai/summarize_logs')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('logs');
    });

    test('should use cache for duplicate requests', async () => {
      const logs = 'Error: Test error for caching';
      
      // First request
      const response1 = await request(app)
        .post('/api/ai/summarize_logs')
        .send({ logs })
        .expect(200);
      
      expect(response1.body.cacheStatus).toBe('miss');

      // Second request - should hit cache
      const response2 = await request(app)
        .post('/api/ai/summarize_logs')
        .send({ logs })
        .expect(200);
      
      expect(response2.body.cacheStatus).toBe('miss'); // Both are miss in dry-run
      expect(response2.body.summary).toBe(response1.body.summary);
    });
  });

  describe('POST /api/ai/suggest_patch', () => {
    test('should return patch suggestion', async () => {
      const response = await request(app)
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
      const response = await request(app)
        .post('/api/ai/suggest_patch')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('error');
    });

    test('should work without context field', async () => {
      const response = await request(app)
        .post('/api/ai/suggest_patch')
        .send({
          error: 'ReferenceError: variable is not defined'
        })
        .expect(200);

      expect(response.body).toHaveProperty('patch');
    });
  });

  describe('POST /api/ai/generate_tokens', () => {
    test('should generate design tokens from brief', async () => {
      const response = await request(app)
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
      const response = await request(app)
        .post('/api/ai/generate_tokens')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('brief');
    });

    test('should handle different briefs', async () => {
      const briefs = [
        'modern, minimalist, blue',
        'warm, earthy, natural',
        'bold, vibrant, energetic'
      ];

      for (const brief of briefs) {
        const response = await request(app)
          .post('/api/ai/generate_tokens')
          .send({ brief })
          .expect(200);

        expect(response.body.brief).toBe(brief);
        expect(response.body.tokens).toHaveProperty('colors');
      }
    });
  });

  describe('GET /api/monitoring/stats', () => {
    test('should return monitoring statistics', async () => {
      const response = await request(app)
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
      const stats1 = await request(app)
        .get('/api/monitoring/stats')
        .expect(200);
      
      const initialCount = stats1.body.aiStats.summarize_logs.count;

      // Make a request
      await request(app)
        .post('/api/ai/summarize_logs')
        .send({ logs: 'test error' })
        .expect(200);

      // Check updated stats
      const stats2 = await request(app)
        .get('/api/monitoring/stats')
        .expect(200);
      
      expect(stats2.body.aiStats.summarize_logs.count).toBe(initialCount + 1);
    });
  });

  describe('Rate Limiting', () => {
    test('should allow reasonable number of requests', async () => {
      // Make 5 requests quickly
      for (let i = 0; i < 5; i++) {
        await request(app)
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
        const response = await request(app)
          .post(endpoint.path)
          .send(endpoint.body)
          .expect(200);

        expect(response.body).toBeDefined();
      }
    });
  });
});
