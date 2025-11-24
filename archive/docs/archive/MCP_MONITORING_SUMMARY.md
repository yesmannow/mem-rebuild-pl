# MCP Monitoring & Health Checks - Implementation Summary

## Overview

Added scheduled health probes, enhanced monitoring/logging, and rate limiting to the MCP server for production readiness and observability.

## What Was Added

### 1. Health Probe Script (`scripts/mcp-health-probe.js`)

- Scheduled health check that hits `/health` endpoint
- Alerts on non-200 responses
- Configurable via environment variables or CLI args
- Exit codes: 0 = healthy, 1 = unhealthy, 2 = config error

**Usage:**

```bash
# Manual check
npm run mcp:health-probe -- --url=http://localhost:5174

# With alerting
npm run mcp:health-probe -- --url=http://localhost:5174 --alert-on-failure
```

### 2. Monitoring Script (`scripts/mcp-monitor.js`)

- Checks `/api/monitoring/stats` endpoint
- Detects repeated 4xx errors above threshold
- Alerts on error patterns
- Useful for post-deployment monitoring

**Usage:**

```bash
npm run mcp:monitor -- --url=http://localhost:5174 --threshold=10
```

### 3. Enhanced Server Monitoring (`mcp/server.js`)

- Request logging middleware tracks all requests
- Error tracking for 4xx/5xx responses
- Monitoring stats endpoint: `GET /api/monitoring/stats`
- Rate limiting already present (60 req/sec per IP, configurable)

**New Endpoints:**

- `GET /api/monitoring/stats` - Returns request/error counts

### 4. Rate Limiting

- Already implemented: 60 requests per second per IP (default)
- Configurable via `MCP_RATE_LIMIT_MAX` and `MCP_RATE_LIMIT_WINDOW_MS`
- Returns 429 Too Many Requests when exceeded

## Scheduling Setup

### Linux/macOS (cron)

```bash
# Health check every 10 minutes
*/10 * * * * cd /path/to/repo && npm run mcp:health-probe -- --url=http://localhost:5174 --alert-on-failure >> /var/log/mcp-health.log 2>&1

# Monitor stats every 30 minutes
*/30 * * * * cd /path/to/repo && npm run mcp:monitor -- --url=http://localhost:5174 --threshold=10 >> /var/log/mcp-monitor.log 2>&1
```

### Windows (Task Scheduler)

1. Create task for health probe:
   - Trigger: Daily, repeat every 10 minutes
   - Action: Run `node.exe`
   - Arguments: `C:\path\to\repo\scripts\mcp-health-probe.js --url=http://localhost:5174 --alert-on-failure`
   - Start in: `C:\path\to\repo`

2. Create task for monitor:
   - Trigger: Daily, repeat every 30 minutes
   - Action: Run `node.exe`
   - Arguments: `C:\path\to\repo\scripts\mcp-monitor.js --url=http://localhost:5174 --threshold=10`
   - Start in: `C:\path\to\repo`

## Environment Variables

```bash
# Health probe
export MCP_HEALTH_URL="http://localhost:5174"
export MCP_ALERT_ON_FAILURE="true"
export MCP_PROBE_TIMEOUT_MS="5000"

# Monitor
export MCP_MONITOR_URL="http://localhost:5174"
export MCP_ERROR_THRESHOLD="10"

# Server rate limiting
export MCP_RATE_LIMIT_MAX="60"
export MCP_RATE_LIMIT_WINDOW_MS="1000"
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

Scripts output alerts to stderr. Integrate with:

- **Email**: Pipe stderr to `mail` command
- **Slack/Discord**: Use webhook in alert function
- **Monitoring Services**: Datadog, New Relic, etc.
- **PagerDuty**: Use PagerDuty agent or API

Example webhook integration (add to scripts):

```javascript
async function sendWebhook(message, details) {
  if (process.env.ALERT_WEBHOOK_URL) {
    await fetch(process.env.ALERT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, details, timestamp: new Date().toISOString() })
    });
  }
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
