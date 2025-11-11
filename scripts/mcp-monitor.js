#!/usr/bin/env node
/**
 * MCP monitoring fetcher.
 * Usage:
 *   node scripts/mcp-monitor.js --url=http://localhost:5174 --threshold=10 [--verbose] [--notify-hook=https://...]
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
		else if (a === "--verbose") opts.verbose = true;
		else if (a.startsWith("--notify-hook=")) opts.notifyHook = a.split("=")[1];
	}
	return opts;
}

async function getFetch() {
	if (typeof fetch === "function") return fetch;
	const mod = await import("node-fetch");
	return mod.default;
}

async function main() {
	const { url, threshold, verbose, notifyHook } = parseArgs();
	if (!url) {
		console.error("Usage: node scripts/mcp-monitor.js --url=http://localhost:5174 --threshold=10");
		process.exit(2);
	}
	const f = await getFetch();
	const endpoint = `${url.replace(/\/+$/, "")}/api/monitoring/stats`;
	try {
		if (verbose) console.log(`GET ${endpoint}`);
		const res = await f(endpoint);
		if (res.status === 404) {
			console.error("Stats endpoint returned 404");
			if (notifyHook) {
				await f(notifyHook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "stats-404", url: endpoint }) }).catch(() => {});
			}
			process.exit(1);
		}
		if (!res.ok) {
			console.error(`Stats endpoint error: ${res.status}`);
			if (notifyHook) {
				await f(notifyHook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "stats-error", url: endpoint, status: res.status }) }).catch(() => {});
			}
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
			if (notifyHook) {
				await f(notifyHook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "stats-threshold", url: endpoint, value: consecutiveFailures, threshold }) }).catch(() => {});
			}
			process.exit(1);
		}
		console.log(`OK: consecutiveFailures=${consecutiveFailures}, avgResponseMs=${avgResponseMs}`);
		process.exit(0);
	} catch (err) {
		console.error(`Monitor fetch error: ${String(err)}`);
		if (notifyHook) {
			try {
				await f(notifyHook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "monitor-exception", error: String(err) }) });
			} catch {}
		}
		process.exit(1);
	}
}

main();

