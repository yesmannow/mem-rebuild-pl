# MCP Monitoring & Health Checks

This directory contains scripts for monitoring the MCP server health and detecting issues.

## Scripts

- `scripts/mcp-health-probe.js` - Health check probe (runs every 5-15 minutes)
- `scripts/mcp-monitor.js` - Monitoring stats checker (runs periodically to detect error patterns)

## Health Probe Setup

### Linux/macOS (cron)

Add to crontab (`crontab -e`):

```bash
# Health check every 10 minutes
*/10 * * * * /usr/bin/node /path/to/repo/scripts/mcp-health-probe.js --url=http://localhost:5174 --alert-on-failure >> /var/log/mcp-health.log 2>&1
```

### Windows (Task Scheduler)

1. Open Task Scheduler
2. Create Basic Task
3. Trigger: Daily, repeat every 10 minutes
4. Action: Start a program
5. Program: `node.exe`
6. Arguments: `C:\path\to\repo\scripts\mcp-health-probe.js --url=http://localhost:5174 --alert-on-failure`
7. Start in: `C:\path\to\repo`

### Environment Variables

```bash
export MCP_HEALTH_URL="http://localhost:5174"
export MCP_ALERT_ON_FAILURE="true"
export MCP_PROBE_TIMEOUT_MS="5000"
```

## Monitoring Setup

### Check Stats Periodically

```bash
# Run every 30 minutes
*/30 * * * * /usr/bin/node /path/to/repo/scripts/mcp-monitor.js --url=http://localhost:5174 --threshold=10 >> /var/log/mcp-monitor.log 2>&1
```

### Manual Checks

```bash
# Health check
node scripts/mcp-health-probe.js --url=http://localhost:5174

# Monitor stats
node scripts/mcp-monitor.js --url=http://localhost:5174 --threshold=10

# View monitoring stats endpoint
curl http://localhost:5174/api/monitoring/stats
```

## Log Monitoring

### Tail Server Logs (24-48 hours post-deploy)

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
- Path traversal attempts
- Rate limit violations (429)
- 5xx server errors

## Alerting Integration

The scripts output alerts to stderr. Integrate with:

- **Email**: Pipe stderr to `mail` command
- **Slack/Discord**: Use webhook in alert function
- **Monitoring Services**: Datadog, New Relic, etc.
- **PagerDuty**: Use PagerDuty agent or API

Example webhook integration:

```javascript
// In scripts/mcp-health-probe.js or mcp-monitor.js
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

## Rate Limiting

The server includes rate limiting:
- Default: 60 requests per second per IP
- Configurable via `MCP_RATE_LIMIT_MAX` and `MCP_RATE_LIMIT_WINDOW_MS`
- Returns 429 Too Many Requests when exceeded

## Monitoring Endpoints

- `GET /health` - Health check (returns 200 with status field)
- `GET /api/monitoring/stats` - Request/error statistics

## Post-Deployment Checklist

After deploying MCP server changes:

1. ✅ Verify health probe is scheduled and running
2. ✅ Monitor logs for first 24-48 hours
3. ✅ Check `/api/monitoring/stats` for error patterns
4. ✅ Verify rate limiting is working (test with rapid requests)
5. ✅ Confirm path traversal protection (test with `../` attempts)
6. ✅ Validate write protection (test `/write` endpoint)

