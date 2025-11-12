# AI Integration Guide

This document describes the AI-powered features integrated into the MCP server for enhanced debugging, design, and developer experience.

## Overview

The server includes secure, server-side AI integrations using OpenAI GPT and Google Gemini APIs. These features help with:

- **Smart debugging** - Log summarization and root-cause analysis
- **Automated code review** - Suggested fixes for failing tests
- **Design token generation** - Tailwind theme creation from brand briefs
- **UX microcopy generation** - Multiple tone variations for UI copy
- **Interactive debugging** - Natural language queries about errors and metrics

## Security & Architecture

### Key Principles

1. **Server-side only** - API keys never exposed to clients
2. **Rate limiting** - Separate, stricter limits for AI endpoints
3. **Feature flags** - AI features disabled by default
4. **Cost controls** - Token limits per endpoint, caching for expensive operations
5. **Monitoring** - Full instrumentation of API calls, tokens, and errors

### Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
# Enable AI features (default: false)
AI_FEATURES_ENABLED=true

# API Keys (server-side only)
GPT_API_KEY=sk-your-openai-api-key
GEMINI_API_KEY=AIza-your-gemini-api-key

# Model selection
GPT_MODEL=gpt-4o-mini
GEMINI_MODEL=gemini-pro

# Rate limiting (per IP, per minute)
AI_RATE_LIMIT_WINDOW_MS=60000
AI_RATE_LIMIT_MAX=10

# Token budgets per endpoint
AI_MAX_TOKENS_LOG_SUMMARY=500
AI_MAX_TOKENS_CODE_REVIEW=1000
AI_MAX_TOKENS_DESIGN_TOKENS=800
AI_MAX_TOKENS_MICROCOPY=200
AI_MAX_TOKENS_DEBUG_CANVAS=1000

# Cache TTL (seconds)
AI_CACHE_TTL_DESIGN_TOKENS=3600
AI_CACHE_TTL_MICROCOPY=1800
```

### Security Checklist

- ✅ `.env` in `.gitignore` 
- ✅ Keys never in client code
- ✅ Rate limiting on all AI endpoints
- ✅ Feature flag for controlled rollout
- ✅ Token usage tracking and monitoring
- ✅ Structured prompts to prevent injection

## API Endpoints

All endpoints require `AI_FEATURES_ENABLED=true` and return `503` if disabled.

### POST `/api/ai/log-summarize`

Analyze logs and identify root causes.

**Request:**
```json
{
  "logs": "string (required) - Log content to analyze",
  "context": "string (optional) - Additional context"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": ["bullet point 1", "bullet point 2", "bullet point 3"],
    "causes": ["likely cause 1", "likely cause 2"],
    "reproduce": "command to reproduce locally",
    "severity": "low|medium|high|critical"
  },
  "raw": "raw AI response"
}
```

**Example:**
```bash
curl -X POST http://localhost:5174/api/ai/log-summarize \
  -H "Content-Type: application/json" \
  -d '{
    "logs": "Error: ECONNREFUSED...\n    at Socket.emit...",
    "context": "Server startup failure"
  }'
```

### POST `/api/ai/code-review`

Analyze code and suggest fixes for errors.

**Request:**
```json
{
  "code": "string (required) - Code to review",
  "error": "string (required) - Error message",
  "language": "string (optional) - Language (default: javascript)",
  "testName": "string (optional) - Name of failing test"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "explanation": "Why the error occurred",
    "patch": "Git unified diff format patch",
    "risks": "Potential risks of the fix",
    "alternatives": "Alternative approaches"
  },
  "raw": "raw AI response"
}
```

**Example:**
```bash
curl -X POST http://localhost:5174/api/ai/code-review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function add(a, b) { return a + b; }",
    "error": "TypeError: Cannot read property of undefined",
    "language": "javascript",
    "testName": "should add two numbers"
  }'
```

### POST `/api/ai/design-tokens`

Generate Tailwind design tokens from brand brief.

**Request:**
```json
{
  "brief": "string (required) - Brand description",
  "baseColor": "string (optional) - Starting color hint"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "palettes": [
      {
        "name": "Palette name",
        "colors": {
          "primary": {"50": "#...", "900": "#..."},
          "secondary": {"50": "#...", "900": "#..."}
        },
        "spacing": {"xs": "0.25rem", "xl": "2rem"},
        "borderRadius": {"sm": "0.125rem", "lg": "0.5rem"},
        "contrast": ["WCAG notes"]
      }
    ]
  }
}
```

**Caching:** Responses cached for 1 hour by default (configurable via `AI_CACHE_TTL_DESIGN_TOKENS`).

**Example:**
```bash
curl -X POST http://localhost:5174/api/ai/design-tokens \
  -H "Content-Type: application/json" \
  -d '{
    "brief": "Modern, minimal, tactile. Primary: earth tones. Avoid purple."
  }'
```

### POST `/api/ai/microcopy`

Generate UX copy variations with different tones.

**Request:**
```json
{
  "component": "string (required) - Component type",
  "intent": "string (required) - Purpose of the copy",
  "tone": "string (optional) - Comma-separated tones (default: professional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "variations": [
      {"id": 1, "tone": "playful", "text": "Let's go!", "subtext": "Start now"},
      {"id": 2, "tone": "professional", "text": "Get started", "subtext": "Begin trial"},
      {"id": 3, "tone": "terse", "text": "Start", "subtext": ""}
    ]
  }
}
```

**Caching:** Responses cached for 30 minutes by default.

**Example:**
```bash
curl -X POST http://localhost:5174/api/ai/microcopy \
  -H "Content-Type: application/json" \
  -d '{
    "component": "CTA button",
    "intent": "Start free trial",
    "tone": "playful,professional,terse"
  }'
```

### POST `/api/ai/debug-canvas`

Interactive debugging assistant for natural language queries.

**Request:**
```json
{
  "query": "string (required) - Question about the system",
  "stats": "object (optional) - Monitoring stats",
  "recentErrors": "array (optional) - Recent error messages",
  "context": "string (optional) - Additional context"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "explanation": "What's happening",
    "diagnosticCommands": ["curl command", "grep command"],
    "suggestedFixes": ["fix 1", "fix 2"],
    "documentation": "Relevant docs"
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:5174/api/ai/debug-canvas \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Why is my server responding slowly?",
    "stats": {"avgResponseMs": 2500},
    "recentErrors": ["ECONNREFUSED", "Timeout"]
  }'
```

### GET `/api/ai/stats`

Get AI usage statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "gpt": {"calls": 42, "tokens": 15000, "errors": 1},
    "gemini": {"calls": 10, "tokens": 5000, "errors": 0},
    "cache": {"hits": 15, "misses": 37},
    "cacheSize": 15
  },
  "timestamp": "2025-11-12T00:00:00.000Z"
}
```

## Monitoring & Instrumentation

### Included in `/api/monitoring/stats`

The main monitoring endpoint now includes AI usage:

```json
{
  "timestamp": "...",
  "totalChecks": 100,
  "aiCalls": {
    "gpt": {"calls": 42, "tokens": 15000, "errors": 1},
    "gemini": {"calls": 10, "tokens": 5000, "errors": 0},
    "cache": {"hits": 15, "misses": 37},
    "cacheSize": 15
  }
}
```

### Cost Tracking

Token usage is tracked for both GPT and Gemini:

- **GPT tokens:** Exact count from API response
- **Gemini tokens:** Estimated (4 chars ≈ 1 token)

Monitor token usage regularly and set budget alerts.

## Rate Limiting

Two layers of rate limiting:

1. **General MCP rate limit:** Default 60 requests/second
2. **AI-specific rate limit:** Default 10 requests/minute per IP

Adjust via environment variables:
```bash
AI_RATE_LIMIT_WINDOW_MS=60000  # 1 minute
AI_RATE_LIMIT_MAX=10           # 10 requests per window
```

## Best Practices

### Development

1. **Start with staging:** Set `AI_FEATURES_ENABLED=true` in staging only
2. **Mock in tests:** Never call real APIs in unit tests (see `test/ai.test.js`)
3. **Monitor costs:** Check token usage daily via `/api/ai/stats`
4. **Cache aggressively:** Design tokens and microcopy are great candidates

### Production

1. **Set budgets:** Configure max tokens per endpoint
2. **Enable logging:** Track all AI calls for audit
3. **Rate limit strictly:** Keep `AI_RATE_LIMIT_MAX` low initially
4. **Human review:** Never auto-apply code patches without review

### Prompt Engineering

1. **Be specific:** Include exact format requirements in prompts
2. **Request JSON:** Structured output is easier to parse
3. **Set context limits:** Truncate logs/code to prevent token waste
4. **Lower temperature:** Use 0.2-0.3 for deterministic results

## Testing

### Unit Tests

Run tests with mocked responses:
```bash
npm test -- test/ai.test.js
```

Tests verify:
- Feature flag enforcement
- Input validation
- Error handling
- Rate limiting (indirectly)

### Manual Testing

1. Copy `.env.example` to `.env`
2. Add real API keys
3. Set `AI_FEATURES_ENABLED=true`
4. Start server: `npm run mcp:dev`
5. Test endpoints with curl (see examples above)

### Staging Verification

```bash
# Enable in staging only
export AI_FEATURES_ENABLED=true
export GPT_API_KEY=sk-staging-key...
export GEMINI_API_KEY=AIza-staging-key...

# Start server
npm run mcp:start

# Test endpoints
curl http://localhost:5174/api/ai/stats
```

## Troubleshooting

### "AI features are not enabled"

Set `AI_FEATURES_ENABLED=true` in `.env`.

### "GPT_API_KEY not configured"

Add your OpenAI API key to `.env`:
```bash
GPT_API_KEY=sk-your-key-here
```

### "Too Many Requests"

You've hit the AI rate limit. Wait or increase `AI_RATE_LIMIT_MAX`.

### High token usage

- Check `/api/ai/stats` for usage breakdown
- Reduce max tokens per endpoint
- Enable caching for design tokens and microcopy
- Truncate logs before sending to log-summarize

## Future Enhancements

Potential additions (not implemented):

- **Embeddings + RAG:** Search repo docs with vector database
- **Session summarization:** Auto-generate PR descriptions
- **Visual analysis:** Use Gemini for screenshot analysis
- **Streaming responses:** For long-running queries
- **Webhook integration:** Trigger AI reviews on CI failures

## Architecture

```
mcp/
├── server.js              # Main server, mounts AI routes
├── routes/
│   └── ai.js             # AI endpoint handlers
└── utils/
    └── ai-proxy.js       # GPT/Gemini API wrappers, caching
```

### Key Components

- **ai-proxy.js:** Low-level API calls, token tracking, caching
- **routes/ai.js:** Express routes, validation, prompt templates
- **server.js:** Integration, monitoring, feature flags

## Support

For issues or questions:
1. Check this documentation
2. Review test examples in `test/ai.test.js`
3. Check monitoring stats: `GET /api/monitoring/stats`
4. Review server logs for API errors
