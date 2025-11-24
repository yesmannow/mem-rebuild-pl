This PR hardens the MCP server and adds automation:

- ESM fix for __dirname via fileURLToPath(import.meta.url)
- safeJoin path sanitizer with allowedPaths enforcement
- write gating via readOnly and MCP_WRITE_ENABLED
- smoke test runner (scripts/mcp-smoke.js)

Review checklist:
[ ] Server startup verified (no ESM __dirname crash)
[ ] /health returns 200 and payload validated
[ ] /ls and /read work for allowedPaths; traversal attempts return 4xx
[ ] /write blocked (readOnly or MCP_WRITE_ENABLED=false) and returns 403 when appropriate
[ ] Smoke tests pass locally and in CI (scripts/mcp-smoke.js)
[ ] Integration tests pass (if present)
[ ] package.json scripts and CLI validated (n/a for this change)
[ ] CI green on PR

---
Smoke test summary: health OK; traversal rejected with 400; ls/read OK; portfolio OK.
