This PR hardens the MCP server and adds automation:

- ESM fix for __dirname via fileURLToPath(import.meta.url)
- safeJoin path sanitizer with allowedPaths enforcement
- write gating via readOnly and MCP_WRITE_ENABLED
- Enhanced monitoring with request logging and error tracking
- Rate limiting (60 req/sec per IP, configurable)
- Health probe script for scheduled monitoring
- Monitoring script for stats endpoint checks
- Smoke test runner for integration testing

**New npm scripts:**
- `npm run mcp:validate` - Validate MCP server configuration
- `npm run mcp:health-probe` - Run health check probe
- `npm run mcp:monitor` - Check monitoring stats and alert on failures
- `npm run mcp:smoke` - Run comprehensive smoke tests

Review checklist:
[ ] Server startup verified (no ESM __dirname crash)
[ ] /health returns 200 with standardized JSON payload (`{ok: true, status: "ok", version: "..."}`)
[ ] /ls and /read work for allowedPaths; traversal attempts return 4xx
[ ] /write blocked (readOnly or MCP_WRITE_ENABLED=false) and returns 403 when appropriate
[ ] /api/monitoring/stats returns comprehensive stats (totalChecks, failures, consecutiveFailures, rateLimit, etc.)
[ ] Smoke tests pass locally and in CI (`npm run mcp:smoke`)
[ ] Health probe works (`npm run mcp:health-probe -- --url=http://localhost:5174`)
[ ] Monitor script works (`npm run mcp:monitor -- --url=http://localhost:5174 --threshold=10`)
[ ] Rate limiting enforced (test with rapid requests, expect 429)
[ ] CI green on PR

---
Smoke test summary: health OK; traversal rejected with 400; ls/read OK; portfolio OK.
Monitoring: Request logging active, error tracking enabled, stats endpoint functional.
Scripts: Health probe and monitor support --verbose and --notify-hook flags for production use.
