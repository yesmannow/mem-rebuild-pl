# AI Tooling Quick Start Guide

## 🚀 What's New

This PR implements a comprehensive AI tooling infrastructure:

- **AI Server** with 3 endpoints (log analysis, patch suggestions, design tokens)
- **Component Fetcher** for pulling UI components from allowlisted sources
- **MCP Integration** for Copilot workflow
- **Monitoring & Observability** with stats tracking
- **Comprehensive Tests** (11 passing tests)
- **Full Documentation** (see AI_INTEGRATION.md)

## 📦 Files Added

```
scripts/
  ├── copilot-ai-server.js     # Express server with 3 AI endpoints
  ├── component-fetcher.js     # Fetch components from allowlisted domains
  └── ai-examples.js           # CLI examples for testing

test/
  └── ai-server.test.js        # Comprehensive test suite (11 tests)

mcp/
  └── config.json              # Updated with AI tools and component fetcher

AI_INTEGRATION.md              # Complete documentation with examples
```

## 🎯 Quick Start

### 1. Start the AI Server

```bash
# Dry-run mode (no API calls, uses mock data)
AI_DRY_RUN=true node scripts/copilot-ai-server.js

# Live mode (requires OpenAI API key)
OPENAI_API_KEY=sk-... node scripts/copilot-ai-server.js
```

Server runs on `http://localhost:5174`

### 2. Test the Endpoints

```bash
# Health check
curl http://localhost:5174/health

# Summarize logs
curl -X POST http://localhost:5174/api/ai/summarize_logs \
  -H "Content-Type: application/json" \
  -d '{"logs":"Error: Build failed..."}'

# Suggest patch
curl -X POST http://localhost:5174/api/ai/suggest_patch \
  -H "Content-Type: application/json" \
  -d '{"error":"TypeError: Cannot read property..."}'

# Generate design tokens
curl -X POST http://localhost:5174/api/ai/generate_tokens \
  -H "Content-Type: application/json" \
  -d '{"brief":"crafty, tactile, no purple"}'

# Check monitoring stats
curl http://localhost:5174/api/monitoring/stats
```

### 3. Run Examples

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

### 4. Fetch Components

```bash
# Search for a component
node scripts/component-fetcher.js "button"
node scripts/component-fetcher.js "text shimmer"

# Returns JSON with source, title, install, and code
```

### 5. Run Tests

```bash
npm test -- test/ai-server.test.js
```

Expected output: **11 tests passing** ✅

## 📊 Available Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Server health check |
| `/api/ai/summarize_logs` | POST | Analyze logs, identify root causes |
| `/api/ai/suggest_patch` | POST | Generate unified diff patches |
| `/api/ai/generate_tokens` | POST | Create Tailwind design tokens |
| `/api/monitoring/stats` | GET | AI usage statistics |

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AI_SERVER_PORT` | Server port | `5174` |
| `AI_DRY_RUN` | Enable mock responses | `false` |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `COPILOT_MCP_OPENAI_API_KEY` | Alternative OpenAI key | - |

## 🎨 Features

- ✅ **Dry-Run Mode**: Test without API costs
- ✅ **Caching**: 5-minute TTL for responses
- ✅ **Rate Limiting**: 30 requests/minute
- ✅ **Monitoring**: Per-tool usage tracking
- ✅ **Error Handling**: Comprehensive validation
- ✅ **Logging**: Request/response timing
- ✅ **Security**: Zero vulnerabilities (CodeQL verified)

## 📚 Documentation

See `AI_INTEGRATION.md` for:
- Complete API schemas
- Request/response examples
- MCP configuration details
- Troubleshooting guide
- Development guidelines

## 🧪 Testing

All 11 tests pass:
- Health checks
- All 3 AI endpoints (success + error cases)
- Monitoring stats
- Request counting
- Rate limiting
- Dry-run mode

## 🔐 Security

✅ **CodeQL Scan**: 0 vulnerabilities found
✅ **Input Validation**: All fields validated
✅ **Rate Limiting**: Prevents abuse
✅ **Allowlisted Domains**: Component fetcher restricted
✅ **No Secrets Logged**: API keys protected

## 🚦 MCP Integration

The AI tools are registered in `mcp/config.json`:

```json
{
  "mcpServers": {
    "aiTools": {
      "type": "http",
      "url": "http://localhost:5174/api/ai",
      "tools": ["summarize_logs", "suggest_patch", "generate_tokens"]
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

## 💡 Example Usage

```javascript
// Summarize build logs
const response = await fetch('http://localhost:5174/api/ai/summarize_logs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ logs: 'npm ERR! ...' })
});
const result = await response.json();
// { summary, rootCauses, suggestedActions, severity }

// Generate design tokens
const tokens = await fetch('http://localhost:5174/api/ai/generate_tokens', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ brief: 'modern, minimal, blue' })
});
const design = await tokens.json();
// { tokens: { colors, spacing, typography } }
```

## 🎯 Next Steps

1. Add OpenAI API key to `.env` file for live mode
2. Integrate with Copilot workflows via MCP
3. Customize design token generation prompts
4. Add more component sources to allowlist
5. Set up monitoring alerts

## 🐛 Troubleshooting

**Server won't start?**
- Check if port 5174 is available: `lsof -i:5174`
- Try a different port: `AI_SERVER_PORT=5175 node scripts/copilot-ai-server.js`

**Tests failing?**
- Ensure no server is running on test ports
- Run tests individually: `npm test -- test/ai-server.test.js`

**API errors?**
- Verify API key is valid
- Check dry-run mode is enabled for testing: `AI_DRY_RUN=true`

## 📞 Support

For detailed documentation, see:
- `AI_INTEGRATION.md` - Complete API reference
- `scripts/ai-examples.js` - Working code examples
- `test/ai-server.test.js` - Test patterns

---

**Built with**: Express, OpenAI API, Node.js, Jest, Supertest
**Status**: ✅ Production Ready | All tests passing | Zero vulnerabilities
