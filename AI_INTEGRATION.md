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

## Developer Tools & Enhancements

### CLI Wrappers

Command-line interface for easy access to all AI endpoints without curl:

```bash
# Summarize logs
npm run ai:summarize -- --logs "Error: ECONNREFUSED" --context "startup"

# Suggest code patch
npm run ai:patch -- --code "function() {}" --error "TypeError: Cannot read property"

# Generate design tokens
npm run ai:tokens -- --brief "modern, minimal, tactile"

# Generate microcopy
npm run ai:copy -- --component "button" --intent "submit form" --tone "playful"

# Debug query
npm run ai:debug -- --query "why is my server slow?" --context "production"

# View statistics
npm run ai:stats
```

**CLI Features:**
- Automatic JSON formatting
- Error handling with clear messages
- Optional trace logging via `AI_TRACE_ENABLED=true`
- Help text: `node scripts/cli-ai.js --help`

**Trace Mode:**
```bash
AI_TRACE_ENABLED=true npm run ai:summarize -- --logs "test"
```

Outputs detailed timing and request/response information to stderr.

### AI Playground UI

Interactive web interface for testing AI endpoints at `/ai-playground`:

**Features:**
- Visual forms for all 5 AI endpoints
- Real-time response display
- Feature flag status indicator
- No authentication required (uses server-side keys)
- Works with AI_FEATURES_ENABLED flag

**Access:**
```bash
# Start server
npm run mcp:start

# Open browser
open http://localhost:5174/ai-playground
```

**Screenshot:**

![AI Playground UI](https://github.com/user-attachments/assets/cc784cf1-241d-4f50-806b-96279092d1a1)

The playground includes:
- 📊 Log Summarize
- 🔍 Code Review
- 🎨 Design Tokens
- ✍️ Microcopy
- 🐛 Debug Canvas
- 📈 Usage Stats

### Enhanced Monitoring

Per-endpoint tracking in `/api/monitoring/stats`:

```json
{
  "aiCalls": {
    "gpt": { "calls": 42, "tokens": 15000, "errors": 1 },
    "gemini": { "calls": 10, "tokens": 5000, "errors": 0 },
    "cache": { "hits": 15, "misses": 37 },
    "endpoints": {
      "log-summarize": {
        "calls": 12,
        "tokens": 6000,
        "errors": 0,
        "cacheHits": 0
      },
      "code-review": {
        "calls": 8,
        "tokens": 8000,
        "errors": 1,
        "cacheHits": 0
      },
      "design-tokens": {
        "calls": 15,
        "tokens": 12000,
        "errors": 0,
        "cacheHits": 10
      },
      "microcopy": {
        "calls": 20,
        "tokens": 4000,
        "errors": 0,
        "cacheHits": 15
      },
      "debug-canvas": {
        "calls": 5,
        "tokens": 5000,
        "errors": 0,
        "cacheHits": 0
      }
    }
  }
}
```

**Monitoring Benefits:**
- Track usage per endpoint
- Identify expensive operations
- Monitor error rates
- Measure cache effectiveness
- Set per-endpoint alerts

**Example Alert Rules:**
```bash
# Alert if log-summarize has high error rate
if endpoints["log-summarize"].errors / endpoints["log-summarize"].calls > 0.1
  alert "Log summarize error rate > 10%"

# Alert if token usage exceeds budget
if endpoints["code-review"].tokens > 50000
  alert "Code review token budget exceeded"
```

### Developer Environment Variables

```bash
# Enable detailed tracing
AI_TRACE_ENABLED=true

# Dry run mode (coming soon)
AI_DRY_RUN=false
```

## Testing

### New Test Coverage

Enhanced test suite covers:
- ✅ Playground UI rendering
- ✅ Feature flag status display
- ✅ Per-endpoint statistics tracking
- ✅ Endpoint call counting
- ✅ Error tracking
- ✅ AI stats endpoint

**Run tests:**
```bash
# All AI tests
npm test -- test/ai.test.js test/ai-enhancements.test.js

# Just enhancements
npm test -- test/ai-enhancements.test.js
```

**Test Results:**
```
AI Playground UI
  ✓ should serve playground UI at /ai-playground
  ✓ should show disabled status when AI features are off
Enhanced Monitoring
  ✓ should include per-endpoint stats in monitoring
  ✓ should track endpoint calls
AI Stats endpoint
  ✓ should return endpoint statistics

Test Suites: 1 passed
Tests:       5 passed
```

## Quick Start Workflows

### 1. Local Development with Playground

```bash
# 1. Configure
cp .env.example .env
# Add GPT_API_KEY and GEMINI_API_KEY

# 2. Enable AI
export AI_FEATURES_ENABLED=true

# 3. Start server
npm run mcp:start

# 4. Open playground
open http://localhost:5174/ai-playground

# 5. Test endpoints interactively
```

### 2. CLI-Based Debugging

```bash
# Enable tracing for detailed logs
export AI_TRACE_ENABLED=true

# Analyze recent error
npm run ai:summarize -- \
  --logs "$(tail -100 /var/log/app.log)" \
  --context "Production server crashed"

# Get suggested fix
npm run ai:patch -- \
  --code "$(cat src/problematic-file.js)" \
  --error "TypeError: Cannot read property 'foo' of undefined"
```

### 3. Design System Generation

```bash
# Generate theme tokens
npm run ai:tokens -- \
  --brief "Modern SaaS, trust-building, accessible, professional" \
  --baseColor "#2d5f5f"

# Generate microcopy variations
npm run ai:copy -- \
  --component "pricing-cta" \
  --intent "Encourage free trial signup" \
  --tone "confident,urgent,friendly"
```

### 4. Monitoring & Alerting

```bash
# Check current usage
npm run ai:stats

# Or via HTTP
curl http://localhost:5174/api/monitoring/stats | jq '.aiCalls'

# Set up cron job for monitoring
*/5 * * * * curl -s http://localhost:5174/api/ai/stats | \
  jq '.stats.gpt.tokens' | \
  awk '{if($1>100000) print "Token budget alert!"}'
```

## Changelog

### v1.1.0 - Developer Experience Enhancements

**Added:**
- CLI wrappers for all AI endpoints (6 new npm scripts)
- Interactive playground UI at `/ai-playground`
- Per-endpoint usage tracking in monitoring
- Trace logging with `AI_TRACE_ENABLED`
- Enhanced test coverage (5 new tests)

**Improved:**
- Monitoring stats now include per-endpoint metrics
- Better error tracking per endpoint
- Cache hit tracking per endpoint
- Documentation expanded with CLI examples

**Files:**
- `scripts/cli-ai.js` - New CLI wrapper (242 lines)
- `mcp/server.js` - Added playground UI route
- `mcp/utils/ai-proxy.js` - Added per-endpoint tracking
- `mcp/routes/ai.js` - Integrated endpoint usage recording
- `test/ai-enhancements.test.js` - New test suite
- `.env.example` - Added developer flags
- `package.json` - Added 6 CLI scripts

---

For issues or questions, refer to the main documentation above or check test examples in `test/ai-enhancements.test.js`.
