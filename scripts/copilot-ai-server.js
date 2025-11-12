#!/usr/bin/env node
import express from 'express';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.AI_SERVER_PORT || 5174;
const DRY_RUN = process.env.AI_DRY_RUN === 'true';

// Statistics tracking
const stats = {
  summarize_logs: { count: 0, tokens: 0 },
  suggest_patch: { count: 0, tokens: 0 },
  generate_tokens: { count: 0, tokens: 0 },
  cacheHits: 0,
  cacheMisses: 0,
  totalTokens: 0
};

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Initialize OpenAI client
let openai = null;
if (!DRY_RUN) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.COPILOT_MCP_OPENAI_API_KEY;
  if (apiKey) {
    openai = new OpenAI({ apiKey });
  } else {
    console.warn('⚠️  No OpenAI API key found. Server will run in dry-run mode.');
  }
}

app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/ai', limiter);

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Helper function to get cached response
function getCachedResponse(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    stats.cacheHits++;
    return cached.data;
  }
  if (cached) {
    cache.delete(key);
  }
  stats.cacheMisses++;
  return null;
}

// Helper function to set cached response
function setCachedResponse(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

// Helper function to call OpenAI
async function callOpenAI(messages, toolName) {
  if (DRY_RUN || !openai) {
    console.log(`🔧 DRY RUN MODE: Skipping OpenAI call for ${toolName}`);
    return null;
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const tokens = response.usage?.total_tokens || 0;
    stats[toolName].tokens += tokens;
    stats.totalTokens += tokens;

    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error(`Error calling OpenAI for ${toolName}:`, error.message);
    throw error;
  }
}

// POST /api/ai/summarize_logs
app.post('/api/ai/summarize_logs', async (req, res) => {
  const toolName = 'summarize_logs';
  stats[toolName].count++;

  try {
    const { logs } = req.body;
    
    if (!logs) {
      return res.status(400).json({ error: 'Missing required field: logs' });
    }

    console.log(`📊 Processing summarize_logs request (${logs.length} chars)`);

    // Check cache
    const cacheKey = `logs:${logs.substring(0, 100)}`;
    const cached = getCachedResponse(cacheKey);
    if (cached) {
      console.log('✅ Cache hit for summarize_logs');
      return res.json(cached);
    }

    if (DRY_RUN || !openai) {
      const mockResponse = {
        summary: 'Mock summary: Build failed due to missing dependencies and type errors.',
        rootCauses: [
          'Missing dependency: express-rate-limit',
          'Type error in component props',
          'Configuration file not found'
        ],
        suggestedActions: [
          'Run npm install to install missing dependencies',
          'Fix type definitions in affected components',
          'Verify configuration files exist'
        ],
        severity: 'high',
        tokens: 0,
        cacheStatus: 'miss'
      };
      setCachedResponse(cacheKey, mockResponse);
      return res.json(mockResponse);
    }

    const messages = [
      {
        role: 'system',
        content: 'You are an expert at analyzing build logs and error messages. Provide a concise summary, identify root causes, and suggest actionable fixes. Return JSON with: summary (string), rootCauses (array), suggestedActions (array), severity (low/medium/high).'
      },
      {
        role: 'user',
        content: `Analyze these logs and provide insights:\n\n${logs}`
      }
    ];

    const content = await callOpenAI(messages, toolName);
    const result = JSON.parse(content);
    result.tokens = stats[toolName].tokens;
    result.cacheStatus = 'miss';

    setCachedResponse(cacheKey, result);
    console.log(`✅ Log analysis complete (${result.tokens} tokens)`);
    
    res.json(result);
  } catch (error) {
    console.error('Error in summarize_logs:', error);
    res.status(500).json({ 
      error: 'Failed to summarize logs', 
      details: error.message 
    });
  }
});

// POST /api/ai/suggest_patch
app.post('/api/ai/suggest_patch', async (req, res) => {
  const toolName = 'suggest_patch';
  stats[toolName].count++;

  try {
    const { error, context } = req.body;
    
    if (!error) {
      return res.status(400).json({ error: 'Missing required field: error' });
    }

    console.log(`🔧 Processing suggest_patch request`);

    // Check cache
    const cacheKey = `patch:${error.substring(0, 100)}`;
    const cached = getCachedResponse(cacheKey);
    if (cached) {
      console.log('✅ Cache hit for suggest_patch');
      return res.json(cached);
    }

    if (DRY_RUN || !openai) {
      const mockResponse = {
        patch: `--- a/src/components/Example.tsx
+++ b/src/components/Example.tsx
@@ -10,7 +10,7 @@
 
 export const Example: React.FC<Props> = ({ title }) => {
-  return <div>{title}</div>
+  return <div className="text-lg">{title}</div>
 }`,
        explanation: 'Added className prop to fix styling issue',
        files: ['src/components/Example.tsx'],
        confidence: 'high',
        tokens: 0,
        cacheStatus: 'miss'
      };
      setCachedResponse(cacheKey, mockResponse);
      return res.json(mockResponse);
    }

    const messages = [
      {
        role: 'system',
        content: 'You are an expert at generating minimal unified diff patches to fix errors. Return JSON with: patch (unified diff string), explanation (string), files (array of affected files), confidence (low/medium/high).'
      },
      {
        role: 'user',
        content: `Generate a minimal patch to fix this error:\n\nError: ${error}\n\nContext: ${context || 'Not provided'}`
      }
    ];

    const content = await callOpenAI(messages, toolName);
    const result = JSON.parse(content);
    result.tokens = stats[toolName].tokens;
    result.cacheStatus = 'miss';

    setCachedResponse(cacheKey, result);
    console.log(`✅ Patch suggestion complete (${result.tokens} tokens)`);
    
    res.json(result);
  } catch (error) {
    console.error('Error in suggest_patch:', error);
    res.status(500).json({ 
      error: 'Failed to suggest patch', 
      details: error.message 
    });
  }
});

// POST /api/ai/generate_tokens
app.post('/api/ai/generate_tokens', async (req, res) => {
  const toolName = 'generate_tokens';
  stats[toolName].count++;

  try {
    const { brief } = req.body;
    
    if (!brief) {
      return res.status(400).json({ error: 'Missing required field: brief' });
    }

    console.log(`🎨 Processing generate_tokens request: "${brief}"`);

    // Check cache
    const cacheKey = `tokens:${brief}`;
    const cached = getCachedResponse(cacheKey);
    if (cached) {
      console.log('✅ Cache hit for generate_tokens');
      return res.json(cached);
    }

    if (DRY_RUN || !openai) {
      const mockResponse = {
        tokens: {
          colors: {
            primary: '#3B82F6',
            secondary: '#10B981',
            accent: '#F59E0B',
            background: '#FFFFFF',
            surface: '#F3F4F6',
            text: '#111827'
          },
          spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
            '2xl': '3rem'
          },
          typography: {
            fontFamily: {
              sans: ['Inter', 'system-ui', 'sans-serif'],
              mono: ['Fira Code', 'monospace']
            },
            fontSize: {
              xs: '0.75rem',
              sm: '0.875rem',
              base: '1rem',
              lg: '1.125rem',
              xl: '1.25rem',
              '2xl': '1.5rem',
              '3xl': '1.875rem'
            },
            fontWeight: {
              normal: 400,
              medium: 500,
              semibold: 600,
              bold: 700
            }
          }
        },
        brief,
        tokens_used: 0,
        cacheStatus: 'miss'
      };
      setCachedResponse(cacheKey, mockResponse);
      return res.json(mockResponse);
    }

    const messages = [
      {
        role: 'system',
        content: 'You are an expert design system architect. Generate Tailwind-compatible design tokens based on a creative brief. Return JSON with: tokens (object with colors, spacing, typography), brief (string), tokens_used (number).'
      },
      {
        role: 'user',
        content: `Generate Tailwind design tokens based on this brief: "${brief}"\n\nInclude colors (primary, secondary, accent, etc), spacing scale, and typography (fonts, sizes, weights).`
      }
    ];

    const content = await callOpenAI(messages, toolName);
    const result = JSON.parse(content);
    result.tokens_used = stats[toolName].tokens;
    result.cacheStatus = 'miss';

    setCachedResponse(cacheKey, result);
    console.log(`✅ Token generation complete (${result.tokens_used} tokens)`);
    
    res.json(result);
  } catch (error) {
    console.error('Error in generate_tokens:', error);
    res.status(500).json({ 
      error: 'Failed to generate tokens', 
      details: error.message 
    });
  }
});

// GET /api/monitoring/stats
app.get('/api/monitoring/stats', (req, res) => {
  res.json({
    aiStats: {
      summarize_logs: stats.summarize_logs,
      suggest_patch: stats.suggest_patch,
      generate_tokens: stats.generate_tokens
    },
    tokenUsage: stats.totalTokens,
    cacheHits: stats.cacheHits,
    cacheMisses: stats.cacheMisses,
    cacheSize: cache.size,
    uptime: process.uptime(),
    dryRun: DRY_RUN
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    dryRun: DRY_RUN,
    openaiConfigured: !!openai
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Copilot AI Server running on http://localhost:${PORT}`);
  console.log(`📊 Mode: ${DRY_RUN ? 'DRY RUN (mock responses)' : 'LIVE (OpenAI API)'}`);
  console.log(`🔑 OpenAI: ${openai ? 'Configured ✅' : 'Not configured ⚠️'}`);
  console.log(`\nEndpoints:`);
  console.log(`  POST /api/ai/summarize_logs`);
  console.log(`  POST /api/ai/suggest_patch`);
  console.log(`  POST /api/ai/generate_tokens`);
  console.log(`  GET  /api/monitoring/stats`);
  console.log(`  GET  /health\n`);
});

export default app;
