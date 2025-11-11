# MCP Monitoring & Health Checks - Implementation Summary

## Overview

Added scheduled health probes, enhanced monitoring/logging, and rate limiting to the MCP server for production readiness and observability.

## What Was Added

### 1. Health Probe Script (`scripts/mcp-health-probe.js`)

- Scheduled health check that hits `/health` endpoint
- Alerts on non-200 responses
- Configurable via CLI args
- Supports webhook notifications on failure
- Exit codes: 0 = healthy, 1 = unhealthy, 2 = config error

**Usage:**

```bash
# Manual check
npm run mcp:health-probe -- --url=http://localhost:5174

# With verbose output
npm run mcp:health-probe -- --url=http://localhost:5174 --verbose

# With webhook notifications
npm run mcp:health-probe -- --url=http://localhost:5174 --notify-hook=https://example.com/webhook
```

### 2. Monitoring Script (`scripts/mcp-monitor.js`)

- Checks `/api/monitoring/stats` endpoint
- Detects consecutive health check failures above threshold
- Alerts on error patterns
- Supports webhook notifications
- Useful for post-deployment monitoring

**Usage:**

```bash
# Basic usage
npm run mcp:monitor -- --url=http://localhost:5174 --threshold=10

# With verbose output
npm run mcp:monitor -- --url=http://localhost:5174 --threshold=10 --verbose

# With webhook notifications
npm run mcp:monitor -- --url=http://localhost:5174 --threshold=10 --notify-hook=https://example.com/webhook
```

### 3. Enhanced Server Monitoring (`mcp/server.js`)

- Request logging middleware tracks all requests
- Error tracking for 4xx/5xx responses
- Monitoring stats endpoint: `GET /api/monitoring/stats`
- Rate limiting already present (60 req/sec per IP, configurable)

**New Endpoints:**

- `GET /api/monitoring/stats` - Returns comprehensive monitoring stats including:
  - Health check metrics: `totalChecks`, `failures`, `consecutiveFailures`, `lastStatus`, `avgResponseMs`
  - Rate limiting config: `rateLimit.windowMs`, `rateLimit.max`
  - Endpoint-level stats: `requests{}`, `errors{}`
  - Timestamp: `timestamp`

### 4. Rate Limiting

- Already implemented: 60 requests per second per IP (default)
- Configurable via `MCP_RATE_LIMIT_MAX` and `MCP_RATE_LIMIT_WINDOW_MS`
- Returns 429 Too Many Requests when exceeded

## Scheduling Setup

### Linux/macOS (cron)

```bash
# Health check every 10 minutes
*/10 * * * * cd /path/to/repo && npm run mcp:health-probe -- --url=http://localhost:5174 --notify-hook=https://example.com/webhook >> /var/log/mcp-health.log 2>&1

# Monitor stats every 30 minutes
*/30 * * * * cd /path/to/repo && npm run mcp:monitor -- --url=http://localhost:5174 --threshold=10 --notify-hook=https://example.com/webhook >> /var/log/mcp-monitor.log 2>&1
```

### Windows (Task Scheduler)

1. Create task for health probe:
   - Trigger: Daily, repeat every 10 minutes
   - Action: Run `node.exe`
   - Arguments: `C:\path\to\repo\scripts\mcp-health-probe.js --url=http://localhost:5174 --notify-hook=https://example.com/webhook`
   - Start in: `C:\path\to\repo`

2. Create task for monitor:
   - Trigger: Daily, repeat every 30 minutes
   - Action: Run `node.exe`
   - Arguments: `C:\path\to\repo\scripts\mcp-monitor.js --url=http://localhost:5174 --threshold=10 --notify-hook=https://example.com/webhook`
   - Start in: `C:\path\to\repo`

## CLI Arguments

Both scripts use CLI arguments (not environment variables):

**Health Probe:**
- `--url=http://host:port` (required) - Target server URL
- `--verbose` (optional) - Print detailed output including response bodies
- `--notify-hook=https://...` (optional) - Webhook URL for failure notifications

**Monitor:**
- `--url=http://host:port` (required) - Target server URL
- `--threshold=N` (optional, default: 10) - Alert if consecutiveFailures exceeds this value
- `--verbose` (optional) - Print detailed output
- `--notify-hook=https://...` (optional) - Webhook URL for alert notifications

**Server Environment Variables:**
```bash
# Rate limiting
export MCP_RATE_LIMIT_MAX="60"
export MCP_RATE_LIMIT_WINDOW_MS="1000"

# Write protection
export MCP_WRITE_ENABLED="false"
export MCP_READONLY="true"
export MCP_AUTH_TOKEN="your-token-here"
```

## Post-Deployment Monitoring Checklist

After deploying MCP server changes:

1. ✅ Schedule health probe (every 5-15 minutes)
2. ✅ Schedule monitoring script (every 30 minutes)
3. ✅ Monitor server logs for 24-48 hours
4. ✅ Check `/api/monitoring/stats` for error patterns
5. ✅ Verify rate limiting (test with rapid requests)
6. ✅ Confirm path traversal protection (test with `../` attempts)
7. ✅ Validate write protection (test `/write` endpoint)

## Log Monitoring

### Tail Server Logs

```bash
# If logs go to file
tail -f /var/log/mcp-server.log

# If logs go to stdout (systemd/journald)
journalctl -u mcp-server -f

# Docker
docker logs -f mcp-server
```

### Watch for Patterns

Look for:

- Repeated 4xx errors from same IP
- Path traversal attempts (`../`)
- Rate limit violations (429)
- 5xx server errors

## Alerting Integration

Scripts support webhook notifications via `--notify-hook` flag. They also output alerts to stderr for integration with:

- **Email**: Pipe stderr to `mail` command
- **Slack/Discord**: Use `--notify-hook` with your webhook URL
- **Monitoring Services**: Use webhooks or pipe stderr to monitoring agents
- **PagerDuty**: Use PagerDuty webhook URL with `--notify-hook`

**Webhook Payload Format:**

Health probe sends:
```json
{
  "type": "health-fail | bad-payload | exception",
  "url": "http://localhost:5174/health",
  "status": 500,
  "body": "...",
  "ms": 123
}
```

Monitor sends:
```json
{
  "type": "stats-404 | stats-error | stats-threshold | monitor-exception",
  "url": "http://localhost:5174/api/monitoring/stats",
  "value": 15,
  "threshold": 10
}
```

## Files Changed

- `mcp/server.js` - Added request logging, error tracking, monitoring stats endpoint
- `scripts/mcp-health-probe.js` - New health check script
- `scripts/mcp-monitor.js` - New monitoring script
- `docs/mcp-monitoring.md` - Documentation
- `package.json` - Added npm scripts

## Testing

```bash
# Start server
PORT=53611 MCP_WRITE_ENABLED=false npm run mcp

# Test health probe (in another terminal)
npm run mcp:health-probe -- --url=http://localhost:53611

# Test monitor (after some requests)
npm run mcp:monitor -- --url=http://localhost:53611

# Check stats endpoint
curl http://localhost:53611/api/monitoring/stats
```

## Next Steps

1. Set up cron/task scheduler for health probe
2. Configure alerting (webhook, email, etc.)
3. Monitor logs for 24-48 hours post-deployment
4. Adjust rate limits if needed based on traffic patterns
5. Consider adding metrics export (Prometheus, etc.) for long-term monitoring
