#!/usr/bin/env node
/**
 * Simple health probe for MCP server.
 * Usage:
 *   node scripts/mcp-health-probe.js --url=http://localhost:5174
 */
import process from "process";

function parseArgs() {
	const args = process.argv.slice(2);
	const opts = {};
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a.startsWith("--url=")) opts.url = a.split("=")[1];
	}
	return opts;
}

async function getFetch() {
	if (typeof fetch === "function") return fetch;
	const mod = await import("node-fetch");
	return mod.default;
}

async function main() {
	const { url } = parseArgs();
	if (!url) {
		console.error("Usage: node scripts/mcp-health-probe.js --url=http://localhost:5174");
		process.exit(2);
	}
	const f = await getFetch();
	const start = Date.now();
	try {
		const res = await f(`${url.replace(/\/+$/, "")}/health`);
		const ms = Date.now() - start;
		if (!res.ok) {
			const body = await res.text().catch(() => "");
			console.error(`FAILED: /health returned ${res.status} in ${ms}ms. Body: ${body}`);
			process.exit(1);
		}
		const json = await res.json().catch(() => ({}));
		if (json && (json.ok === true || json.status === "ok")) {
			console.log(`Health OK (${ms}ms)`);
			process.exit(0);
		}
		console.error(`FAILED: /health response missing ok/status fields (${ms}ms)`);
		process.exit(1);
	} catch (err) {
		const ms = Date.now() - start;
		console.error(`FAILED: /health fetch error after ${ms}ms: ${String(err)}`);
		process.exit(1);
	}
}

main();

#!/usr/bin/env node
/**
 * MCP Health Probe
 *
 * Scheduled health check that hits /health endpoint and alerts on non-200 responses.
 * Designed to run every 5-15 minutes via cron or task scheduler.
 *
 * Usage:
 *   node scripts/mcp-health-probe.js [--url=http://localhost:5174] [--alert-on-failure]
 *
 * Exit codes:
 *   0 = health check passed
 *   1 = health check failed (non-200 or network error)
 *   2 = configuration error
 */

import { URL } from "url";

const DEFAULT_URL = process.env.MCP_HEALTH_URL || "http://localhost:5174";
const ALERT_ON_FAILURE = process.env.MCP_ALERT_ON_FAILURE === "true" || process.argv.includes("--alert-on-failure");
const TIMEOUT_MS = Number(process.env.MCP_PROBE_TIMEOUT_MS || 5000);

function parseArgs() {
	const args = process.argv.slice(2);
	const urlArg = args.find(a => a.startsWith("--url="));
	const url = urlArg ? urlArg.split("=")[1] : DEFAULT_URL;
	return { url, alertOnFailure: ALERT_ON_FAILURE };
}

async function probeHealth(baseUrl) {
	const startTime = Date.now();
	const healthUrl = new URL("/health", baseUrl).toString();

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

		const response = await fetch(healthUrl, {
			method: "GET",
			signal: controller.signal,
			headers: { "User-Agent": "mcp-health-probe/1.0" }
		});

		clearTimeout(timeoutId);
		const duration = Date.now() - startTime;

		const resStatus = response.status;
		let bodyText;
		try {
			bodyText = await response.text();
		} catch (e) {
			bodyText = null;
		}

		let body = null;
		try {
			body = JSON.parse(bodyText);
		} catch {
			body = bodyText;
		}

		return {
			success: resStatus === 200,
			status: resStatus,
			duration,
			body,
			bodyText,
			error: null
		};
	} catch (error) {
		const duration = Date.now() - startTime;
		return {
			success: false,
			status: 0,
			duration,
			body: null,
			error: error.name === "AbortError" ? "Timeout" : String(error)
		};
	}
}

function alert(message, details) {
	const timestamp = new Date().toISOString();
	const alertMsg = `[MCP HEALTH ALERT ${timestamp}] ${message}`;

	console.error(alertMsg);
	if (details) {
		console.error(JSON.stringify(details, null, 2));
	}

	// In production, you might:
	// - Send to monitoring service (Datadog, Sentry, etc.)
	// - Send email/SMS
	// - Write to alert log file
	// - Trigger webhook

	// For now, write to stderr which can be captured by cron/systemd
	process.stderr.write(`${alertMsg}\n`);
}

async function main() {
	const { url, alertOnFailure } = parseArgs();

	if (!url || !url.startsWith("http")) {
		console.error("Invalid URL. Use --url=http://host:port or set MCP_HEALTH_URL");
		process.exit(2);
	}

	const result = await probeHealth(url);
	const timestamp = new Date().toISOString();

	if (result.status === 200) {
		// default success
		// eslint-disable-next-line no-console
		console.log(`[${timestamp}] Health OK: ${url}/health (status: 200, duration: ${result.duration}ms)`);
		if (result.body && typeof result.body === "object") {
			// eslint-disable-next-line no-console
			console.log(JSON.stringify(result.body));
		}
		process.exit(0);
	} else {
		// eslint-disable-next-line no-console
		console.error(`[${timestamp}] Health check FAILED: ${url}/health (status: ${result.status}, body: ${result.bodyText || "N/A"})`);
		if (alertOnFailure) {
			alert("MCP health check failed", {
				url,
				status: result.status,
				error: result.error,
				duration: result.duration,
				body: result.bodyText
			});
		}
		process.exit(1);
	}
}

main().catch((err) => {
	console.error("Fatal error in health probe:", err);
	process.exit(1);
});

