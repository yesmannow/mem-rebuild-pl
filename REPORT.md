Repo audit started: [timestamp will be updated in follow-up commits]

Checklist:
- backup created
- working branch created: chore/repo-audit-mcp-20251111
- adopting pnpm if present (workspace hints detected)

Sections to be appended:
- Environment details
- Install logs
- Typecheck, lint, and test outputs
- MCP server checks
- Candidate deletions summary
- TODOs and recommendations

## MCP Server Hardening Summary

### Implemented Features
- ✅ ESM __dirname fix (fileURLToPath)
- ✅ safeJoin path sanitizer with allowedPaths enforcement
- ✅ Write protection (readOnly + MCP_WRITE_ENABLED gating)
- ✅ Request logging and error tracking middleware
- ✅ Rate limiting (60 req/sec per IP, configurable)
- ✅ Monitoring stats endpoint (`/api/monitoring/stats`)
- ✅ Health probe script (`scripts/mcp-health-probe.js`)
- ✅ Monitoring script (`scripts/mcp-monitor.js`)
- ✅ Smoke test runner (`scripts/mcp-smoke.js`)

### New npm Scripts
- `npm run mcp:validate` - Validate MCP server configuration
- `npm run mcp:health-probe` - Run health check probe (supports --verbose, --notify-hook)
- `npm run mcp:monitor` - Check monitoring stats (supports --threshold, --verbose, --notify-hook)
- `npm run mcp:smoke` - Run comprehensive smoke tests

### Test Results
- Health endpoint: ✅ Returns standardized JSON (`{ok: true, status: "ok", version: "..."}`)
- Path traversal: ✅ Rejected with 400 error
- Rate limiting: ✅ Returns 429 when exceeded
- Monitoring stats: ✅ Returns comprehensive metrics
- Smoke tests: ✅ All 5 tests passing


