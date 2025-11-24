# AI Integration Documentation

## Overview

The Copilot AI Server provides AI-powered tools for log analysis, patch suggestions, and design token generation. This document covers endpoint schemas, configuration, and usage examples.

## Quick Start

### Starting the Server

```bash
# Start in dry-run mode (uses mock responses)
AI_DRY_RUN=true node scripts/copilot-ai-server.js

# Start in live mode (requires OpenAI API key)
OPENAI_API_KEY=sk-... node scripts/copilot-ai-server.js

# Or use environment variable from GitHub
COPILOT_MCP_OPENAI_API_KEY=sk-... node scripts/copilot-ai-server.js
```

The server runs on port `5174` by default. Override with:
```bash
AI_SERVER_PORT=8080 node scripts/copilot-ai-server.js
```

### Health Check

```bash
curl http://localhost:5174/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-12T06:00:00.000Z",
  "dryRun": true,
  "openaiConfigured": false
}
```

---

## API Endpoints

### 1. POST /api/ai/summarize_logs

Analyzes build logs and error messages to provide root cause analysis and suggested fixes.

**Request Body:**
```json
{
  "logs": "string (required) - The log content to analyze"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5174/api/ai/summarize_logs \
  -H "Content-Type: application/json" \
  -d '{
    "logs": "npm ERR! code ERESOLVE\nnpm ERR! ERESOLVE could not resolve\nTypeError: Cannot read property map of undefined"
  }'
```

**Response Schema:**
```json
{
  "summary": "string - Concise summary of the issue",
  "rootCauses": ["string"] - Array of identified root causes,
  "suggestedActions": ["string"] - Array of actionable fixes,
  "severity": "low|medium|high",
  "tokens": 0,
  "cacheStatus": "hit|miss"
}
```

**Example Response:**
```json
{
  "summary": "Build failed due to dependency resolution conflict between React versions and a TypeError in List component.",
  "rootCauses": [
    "React version mismatch: react-dom@18.2.0 requires react@^18.0.0 but found react@17.0.2",
    "Undefined array access in src/components/List.tsx:23"
  ],
  "suggestedActions": [
    "Update React to version 18: npm install react@18.2.0 react-dom@18.2.0",
    "Add null check before calling .map() in List.tsx",
    "Update @testing-library/react to version compatible with React 18"
  ],
  "severity": "high",
  "tokens": 245,
  "cacheStatus": "miss"
}
```

---

### 2. POST /api/ai/suggest_patch

Generates minimal unified diff patches to fix code errors.

**Request Body:**
```json
{
  "error": "string (required) - Error message or description",
  "context": "string (optional) - Additional context about the error"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5174/api/ai/suggest_patch \
  -H "Content-Type: application/json" \
  -d '{
    "error": "TypeError: Cannot read property className of undefined",
    "context": "Error occurs in Button component when props are not properly validated"
  }'
```

**Response Schema:**
```json
{
  "patch": "string - Unified diff format patch",
  "explanation": "string - Description of what the patch does",
  "files": ["string"] - Array of affected file paths,
  "confidence": "low|medium|high",
  "tokens": 0,
  "cacheStatus": "hit|miss"
}
```

**Example Response:**
```json
{
  "patch": "--- a/src/components/Button.tsx\n+++ b/src/components/Button.tsx\n@@ -10,7 +10,7 @@ interface ButtonProps {\n \n export const Button: React.FC<ButtonProps> = (props) => {\n-  return <button className={props.className}>{props.children}</button>\n+  return <button className={props.className ?? 'btn-default'}>{props.children}</button>\n }",
  "explanation": "Added nullish coalescing operator to provide a default className when props.className is undefined, preventing the TypeError.",
  "files": ["src/components/Button.tsx"],
  "confidence": "high",
  "tokens": 180,
  "cacheStatus": "miss"
}
```

---

### 3. POST /api/ai/generate_tokens

Generates Tailwind-compatible design tokens based on a creative brief.

**Request Body:**
```json
{
  "brief": "string (required) - Design direction/constraints"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5174/api/ai/generate_tokens \
  -H "Content-Type: application/json" \
  -d '{
    "brief": "crafty, tactile, no purple"
  }'
```

**Response Schema:**
```json
{
  "tokens": {
    "colors": {
      "primary": "string",
      "secondary": "string",
      "accent": "string",
      "background": "string",
      "surface": "string",
      "text": "string"
    },
    "spacing": {
      "xs": "string",
      "sm": "string",
      "md": "string",
      "lg": "string",
      "xl": "string",
      "2xl": "string"
    },
    "typography": {
      "fontFamily": {
        "sans": ["string"],
        "mono": ["string"]
      },
      "fontSize": {
        "xs": "string",
        "sm": "string",
        "base": "string",
        "lg": "string",
        "xl": "string",
        "2xl": "string",
        "3xl": "string"
      },
      "fontWeight": {
        "normal": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700
      }
    }
  },
  "brief": "string - Original brief",
  "tokens_used": 0,
  "cacheStatus": "hit|miss"
}
```

**Example Response:**
```json
{
  "tokens": {
    "colors": {
      "primary": "#8B5A3C",
      "secondary": "#D4A574",
      "accent": "#E8C4A0",
      "background": "#FFF8F0",
      "surface": "#F5E6D3",
      "text": "#2C1810"
    },
    "spacing": {
      "xs": "0.25rem",
      "sm": "0.5rem",
      "md": "1rem",
      "lg": "1.5rem",
      "xl": "2rem",
      "2xl": "3rem"
    },
    "typography": {
      "fontFamily": {
        "sans": ["Lora", "Georgia", "serif"],
        "mono": ["Courier Prime", "monospace"]
      },
      "fontSize": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem"
      },
      "fontWeight": {
        "normal": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700
      }
    }
  },
  "brief": "crafty, tactile, no purple",
  "tokens_used": 320,
  "cacheStatus": "miss"
}
```

---

### 4. GET /api/monitoring/stats

Returns monitoring statistics for AI tool usage.

**Example Request:**
```bash
curl http://localhost:5174/api/monitoring/stats
```

**Response Schema:**
```json
{
  "aiStats": {
    "summarize_logs": {
      "count": 0,
      "tokens": 0
    },
    "suggest_patch": {
      "count": 0,
      "tokens": 0
    },
    "generate_tokens": {
      "count": 0,
      "tokens": 0
    }
  },
  "tokenUsage": 0,
  "cacheHits": 0,
  "cacheMisses": 0,
  "cacheSize": 0,
  "uptime": 0,
  "dryRun": false
}
```

---

## MCP Configuration

The AI tools are exposed through Model Context Protocol (MCP). Add this configuration to `mcp/config.json`:

```json
{
  "mcpServers": {
    "aiTools": {
      "type": "http",
      "url": "http://localhost:5174/api/ai",
      "tools": ["summarize_logs", "suggest_patch", "generate_tokens"],
      "env": {
        "OPENAI_API_KEY": "COPILOT_MCP_OPENAI_API_KEY"
      }
    },
    "componentTools": {
      "type": "local",
      "command": "node",
      "args": ["scripts/component-fetcher.js"],
      "tools": ["fetch_component"]
    }
  }
}
```

### MCP Tool Registration

The following tools are available through MCP:

1. **summarize_logs** - Analyze build logs and error messages
2. **suggest_patch** - Generate code patches for errors
3. **generate_tokens** - Create design token sets
4. **fetch_component** - Fetch component code from allowlisted domains

---

## Dry-Run Mode

Dry-run mode allows testing the API without consuming OpenAI tokens. It returns realistic mock data.

### Enabling Dry-Run Mode

```bash
AI_DRY_RUN=true node scripts/copilot-ai-server.js
```

### When to Use Dry-Run

- **Development**: Testing API integration without API costs
- **CI/CD**: Running tests without external dependencies
- **Demo**: Showing functionality without API keys

### Dry-Run Behavior

- All endpoints return realistic mock responses
- No calls are made to OpenAI API
- Response format is identical to live mode
- `tokens` field is set to `0`
- Health check shows `dryRun: true`

### Example Mock Response

```json
{
  "summary": "Mock summary: Build failed due to missing dependencies and type errors.",
  "rootCauses": [
    "Missing dependency: express-rate-limit",
    "Type error in component props",
    "Configuration file not found"
  ],
  "suggestedActions": [
    "Run npm install to install missing dependencies",
    "Fix type definitions in affected components",
    "Verify configuration files exist"
  ],
  "severity": "high",
  "tokens": 0,
  "cacheStatus": "miss"
}
```

---

## Component Fetcher

The component fetcher retrieves install instructions and code from allowlisted component libraries.

### Allowlisted Domains

- `https://purecode.ai`
- `https://superdesign.dev`
- `https://pagedone.io`
- `https://uipkg.com`
- `https://pixelapps.io`

### Usage

```bash
node scripts/component-fetcher.js "button"
node scripts/component-fetcher.js "text shimmer"
node scripts/component-fetcher.js "card hover"
```

### Response Format

```json
{
  "source": "https://purecode.ai",
  "title": "Animated Button",
  "install": "npx shadcn@latest add button",
  "code": "import { Button } from '@/components/ui/button'...",
  "query": "button"
}
```

### Error Response

```json
{
  "error": "No component found across allowlisted sources.",
  "query": "nonexistent-component",
  "searchedDomains": [
    "https://purecode.ai",
    "https://superdesign.dev",
    "https://pagedone.io",
    "https://uipkg.com",
    "https://pixelapps.io"
  ]
}
```

---

## Usage Examples

### Running Examples

```bash
# Show available examples
node scripts/ai-examples.js

# Run specific example
node scripts/ai-examples.js 1  # Summarize logs
node scripts/ai-examples.js 2  # Suggest patch
node scripts/ai-examples.js 3  # Generate tokens
node scripts/ai-examples.js 4  # Check stats

# Run all examples
node scripts/ai-examples.js all
```

### Programmatic Usage

```javascript
import fetch from 'node-fetch';

const response = await fetch('http://localhost:5174/api/ai/summarize_logs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    logs: 'Error: Build failed...'
  })
});

const result = await response.json();
console.log(result.summary);
```

---

## Features

### Rate Limiting

- 30 requests per minute per IP
- Applies to all `/api/ai/*` endpoints
- Returns `429 Too Many Requests` when exceeded

### Caching

- 5-minute TTL for responses
- Cache key based on request payload
- Cache hits/misses tracked in monitoring stats
- Cache automatically cleaned on expiration

### Error Handling

- Validates required fields
- Returns descriptive error messages
- Logs errors to console
- Returns 400 for client errors
- Returns 500 for server errors

### Logging

- Request/response logging with duration
- Tool name and token count per request
- Cache status per request
- Console output in color-coded format

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AI_SERVER_PORT` | Server port | `5174` |
| `AI_DRY_RUN` | Enable dry-run mode | `false` |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `COPILOT_MCP_OPENAI_API_KEY` | Alternative OpenAI key | - |
| `AI_SERVER_URL` | Base URL for examples | `http://localhost:5174/api/ai` |

---

## Troubleshooting

### Server Won't Start

**Problem**: Port already in use
```bash
Error: listen EADDRINUSE: address already in use :::5174
```

**Solution**: Change port or kill existing process
```bash
AI_SERVER_PORT=5175 node scripts/copilot-ai-server.js
# or
lsof -ti:5174 | xargs kill
```

### OpenAI API Errors

**Problem**: Invalid API key
```
Error calling OpenAI: Request failed with status code 401
```

**Solution**: Verify API key
```bash
# Test key is valid
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Rate Limit Errors

**Problem**: Too many requests
```json
{ "error": "Too many requests, please try again later." }
```

**Solution**: Wait 1 minute or reduce request rate

---

## Development

### Running Tests

```bash
npm test -- test/ai-server.test.js
```

### Adding New Endpoints

1. Add route handler to `scripts/copilot-ai-server.js`
2. Add stats tracking: `stats.new_endpoint = { count: 0, tokens: 0 }`
3. Update MCP config with new tool name
4. Add tests to `test/ai-server.test.js`
5. Update this documentation

### Debugging

Enable verbose logging:
```bash
DEBUG=* node scripts/copilot-ai-server.js
```

Check monitoring stats:
```bash
watch -n 1 'curl -s http://localhost:5174/api/monitoring/stats | jq'
```

---

## Security

- All allowlisted domains are verified and safe
- Rate limiting prevents abuse
- No user data is stored permanently
- Cache is in-memory only
- API keys are never logged
- HTTPS recommended for production

---

## Performance

- Average response time: 50-200ms (dry-run), 1-3s (live)
- Cache hit rate: ~40-60% typical
- Memory usage: ~50-100MB
- Supports 30 requests/minute/IP

---

## Roadmap

- [ ] Add streaming responses for long outputs
- [ ] Persistent cache with Redis
- [ ] Multiple AI provider support (Anthropic, Gemini)
- [ ] Webhook support for async processing
- [ ] GraphQL endpoint
- [ ] WebSocket support for real-time updates
