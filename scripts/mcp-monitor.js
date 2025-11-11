#!/usr/bin/env node
/**
 * MCP monitoring fetcher.
 * Usage:
 *   node scripts/mcp-monitor.js --url=http://localhost:5174 --threshold=10
 * Prints the monitoring stats and warns if consecutiveFailures > threshold.
 */
import process from "process";

function parseArgs() {
	const args = process.argv.slice(2);
	const opts = { threshold: 10 };
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a.startsWith("--url=")) opts.url = a.split("=")[1];
		else if (a.startsWith("--threshold=")) opts.threshold = Number(a.split("=")[1]) || 10;
	}
	return opts;
}

async function getFetch() {
	if (typeof fetch === "function") return fetch;
	const mod = await import("node-fetch");
	return mod.default;
}

async function main() {
	const { url, threshold } = parseArgs();
	if (!url) {
		console.error("Usage: node scripts/mcp-monitor.js --url=http://localhost:5174 --threshold=10");
		process.exit(2);
	}
	const f = await getFetch();
	const endpoint = `${url.replace(/\/+$/, "")}/api/monitoring/stats`;
	try {
		const res = await f(endpoint);
		if (res.status === 404) {
			console.error("Stats endpoint returned 404");
			process.exit(1);
		}
		if (!res.ok) {
			console.error(`Stats endpoint error: ${res.status}`);
			process.exit(1);
		}
		const stats = await res.json();
		const {
			totalChecks,
			failures,
			consecutiveFailures,
			avgResponseMs,
			requests,
			errors
		} = stats || {};
		console.log("Monitoring stats:");
		console.log(JSON.stringify(stats, null, 2));
		if (typeof totalChecks !== "number" || typeof failures !== "number" || typeof consecutiveFailures !== "number") {
			console.error("Missing expected fields in stats (totalChecks/failures/consecutiveFailures).");
			process.exit(1);
		}
		if (consecutiveFailures > threshold) {
			console.error(`WARN: consecutiveFailures ${consecutiveFailures} exceeds threshold ${threshold}`);
			process.exit(1);
		}
		console.log(`OK: consecutiveFailures=${consecutiveFailures}, avgResponseMs=${avgResponseMs}`);
		process.exit(0);
	} catch (err) {
		console.error(`Monitor fetch error: ${String(err)}`);
		process.exit(1);
	}
}

main();

#!/usr/bin/env node
/**
 * MCP Monitoring Script
 *
 * Checks monitoring stats endpoint and alerts on repeated 4xx errors.
 * Designed to run periodically to detect issues.
 *
 * Usage:
 *   node scripts/mcp-monitor.js [--url=http://localhost:5174] [--threshold=10]
 */

const DEFAULT_URL = process.env.MCP_MONITOR_URL || "http://localhost:5174";
const ERROR_THRESHOLD = Number(process.env.MCP_ERROR_THRESHOLD || 10);

function parseArgs() {
	const args = process.argv.slice(2);
	const urlArg = args.find(a => a.startsWith("--url="));
	const thresholdArg = args.find(a => a.startsWith("--threshold="));
	const url = urlArg ? urlArg.split("=")[1] : DEFAULT_URL;
	const threshold = thresholdArg ? Number(thresholdArg.split("=")[1]) : ERROR_THRESHOLD;
	return { url, threshold };
}

async function fetchStats(baseUrl) {
	try {
		const statsUrl = new URL("/api/monitoring/stats", baseUrl).toString();
		const response = await fetch(statsUrl, {
			method: "GET",
			headers: { "User-Agent": "mcp-monitor/1.0" }
		});

		if (!response.ok) {
			throw new Error(`Stats endpoint returned ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		return { error: String(error) };
	}
}

function analyzeStats(stats, threshold = ERROR_THRESHOLD) {
	if (stats.error) {
		return { alert: true, message: `Failed to fetch stats: ${stats.error}` };
	}

	const errors = stats.errors || {};
	const totalErrors = Object.values(errors).reduce((sum, count) => sum + count, 0);
	const requests = stats.requests || {};
	const totalRequests = Object.values(requests).reduce((sum, count) => sum + count, 0);

	const highErrorEndpoints = Object.entries(errors)
		.filter(([_, count]) => count >= threshold)
		.map(([endpoint, count]) => ({ endpoint, count }));

	// Check consecutive failures from health checks
	const consecutiveFailures = stats.consecutiveFailures || 0;
	const hasConsecutiveFailures = consecutiveFailures >= 3; // Alert if 3+ consecutive failures

	if (highErrorEndpoints.length > 0 || hasConsecutiveFailures) {
		return {
			alert: true,
			message: `High error rates detected`,
			details: {
				totalRequests,
				totalErrors,
				highErrorEndpoints,
				consecutiveFailures: hasConsecutiveFailures ? consecutiveFailures : undefined,
				lastStatus: stats.lastStatus,
				avgResponseMs: stats.avgResponseMs
			}
		};
	}

	return {
		alert: false,
		message: `Monitoring OK (${totalRequests} requests, ${totalErrors} errors, ${stats.totalChecks || 0} health checks)`,
		details: {
			totalRequests,
			totalErrors,
			totalChecks: stats.totalChecks,
			avgResponseMs: stats.avgResponseMs
		}
	};
}

function alert(message, details) {
	const timestamp = new Date().toISOString();
	const alertMsg = `[MCP MONITOR ALERT ${timestamp}] ${message}`;

	console.error(alertMsg);
	if (details) {
		console.error(JSON.stringify(details, null, 2));
	}

	process.stderr.write(`${alertMsg}\n`);
}

async function main() {
	const { url, threshold } = parseArgs();

	if (!url || !url.startsWith("http")) {
		// eslint-disable-next-line no-console
		console.error("Invalid URL. Use --url=http://host:port or set MCP_MONITOR_URL");
		process.exit(2);
	}

	const stats = await fetchStats(url);
	const analysis = analyzeStats(stats, threshold);
	const timestamp = new Date().toISOString();

	if (analysis.alert) {
		// eslint-disable-next-line no-console
		console.error(`[${timestamp}] ${analysis.message}`);
		alert(analysis.message, analysis.details);
		process.exit(1);
	} else {
		// eslint-disable-next-line no-console
		console.log(`[${timestamp}] ${analysis.message}`);
		if (analysis.details) {
			// eslint-disable-next-line no-console
			console.log(JSON.stringify(analysis.details, null, 2));
		}
		process.exit(0);
	}
}

main().catch((err) => {
	console.error("Fatal error in monitor:", err);
	process.exit(1);
});

