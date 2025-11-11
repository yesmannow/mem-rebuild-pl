# MCP Monitoring and Health Checks

This repo ships two small scripts intended for cron/systemd/Task Scheduler monitoring:

- scripts/mcp-health-probe.js – quick /health probe to verify the server is up
- scripts/mcp-monitor.js – reads /api/monitoring/stats and alerts on repeated failures

Both scripts support:

- --url=http://host:port – target base URL
- --verbose – print extra logging and payloads
- --notify-hook=https://example.com/webhook – POST a JSON payload on error or threshold breach
- MCP_AUTH_TOKEN env to add Authorization: Bearer headers when needed

Example CLI:

```bash
node scripts/mcp-health-probe.js --url=http://localhost:5174 --verbose
node scripts/mcp-monitor.js --url=http://localhost:5174 --threshold=10 --notify-hook=https://example.com/alert
```

Webhook payloads (typical shape):

```json
{ "level": "error", "type": "health", "url": "http://localhost:5174", "durationMs": 123, "ok": false }
```

Scheduling examples

- Cron (Linux/macOS):
  - */5 * * * * cd /path/to/repo && /usr/bin/node scripts/mcp-health-probe.js --url=http://127.0.0.1:5174 >> health-probe.log 2>&1
  - */10 * * * * cd /path/to/repo && /usr/bin/node scripts/mcp-monitor.js --url=http://127.0.0.1:5174 --threshold=10 >> monitor.log 2>&1

- systemd (Linux):
  - Create /etc/systemd/system/mcp-health.timer and mcp-health.service to run every 5m with ExecStart=/usr/bin/node /srv/app/scripts/mcp-health-probe.js --url=http://127.0.0.1:5174
  - Create mcp-monitor.timer and mcp-monitor.service similarly for the monitor script

- Windows Task Scheduler:
  - Program/script: C:\Program Files\nodejs\node.exe
  - Add arguments: scripts\\mcp-health-probe.js --url=http://127.0.0.1:5174 --verbose
  - Start in: C:\\path\\to\\repo

Notes

- Both endpoints are ESM-friendly; no global deps required.
- /api/monitoring/stats returns: timestamp, totalChecks, failures, consecutiveFailures, lastStatus, avgResponseMs, rateLimit{windowMs,max}, requests{}, errors{}.
- Use header x-rate-key to group monitor requests if running behind NAT/CI.

# MCP Monitoring and Scheduling

This document explains how to run the MCP health probe and monitoring scripts on a schedule and how to receive alerts.

## Scripts

- Health probe:
  - `npm run mcp:health-probe -- --url=http://localhost:5174 [--verbose] [--notify-hook=https://webhook.test]`
- Monitor stats:
  - `npm run mcp:monitor -- --url=http://localhost:5174 --threshold=10 [--verbose] [--notify-hook=https://webhook.test]`

## Environment flags

- MCP_READONLY=true|false
- MCP_WRITE_ENABLED=true|false
- MCP_AUTH_TOKEN=token (enables write auth)
- MCP_RATE_LIMIT_WINDOW_MS=1000
- MCP_RATE_LIMIT_MAX=60
- MCP_RATE_LIMIT_KEY=static (for deterministic tests)

## Scheduling examples

### Cron (Linux/macOS)

```
*/5 * * * * cd /path/to/repo && npm run mcp:health-probe -- --url=http://localhost:5174 --notify-hook=https://example.com/hook >> /var/log/mcp-health.log 2>&1
*/10 * * * * cd /path/to/repo && npm run mcp:monitor -- --url=http://localhost:5174 --threshold=10 --notify-hook=https://example.com/hook >> /var/log/mcp-monitor.log 2>&1
```

### systemd unit + timer

Create `/etc/systemd/system/mcp-health.service`:
```
[Unit]
Description=MCP Health Probe

[Service]
Type=oneshot
WorkingDirectory=/path/to/repo
ExecStart=/usr/bin/npm run mcp:health-probe -- --url=http://localhost:5174
```

Timer `/etc/systemd/system/mcp-health.timer`:
```
[Unit]
Description=Run MCP Health Probe every 5 minutes

[Timer]
OnBootSec=60
OnUnitActiveSec=300
Unit=mcp-health.service

[Install]
WantedBy=timers.target
```

### Windows Task Scheduler

Action:
- Program/script: `powershell.exe`
- Arguments:
  ```
  -NoLogo -NoProfile -Command "cd 'C:\path\to\repo'; npm run mcp:health-probe -- --url=http://localhost:5174 --verbose"
  ```

## Webhook payload

On failures, the scripts can POST JSON to `--notify-hook`:

```json
{
  "type": "health-fail | stats-404 | stats-error | stats-threshold | monitor-exception",
  "url": "http://localhost:5174/health",
  "status": 500,
  "body": "...",
  "ms": 123
}
```

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

