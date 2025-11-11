#!/usr/bin/env node
/**
 * Simple health probe for MCP server.
 * Usage:
 *   node scripts/mcp-health-probe.js --url=http://localhost:5174 [--verbose] [--notify-hook=https://...]
 */
import process from "process";

function parseArgs() {
	const args = process.argv.slice(2);
	const opts = {};
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a.startsWith("--url=")) opts.url = a.split("=")[1];
		if (a === "--verbose") opts.verbose = true;
		if (a.startsWith("--notify-hook=")) opts.notifyHook = a.split("=")[1];
	}
	return opts;
}

async function getFetch() {
	if (typeof fetch === "function") return fetch;
	const mod = await import("node-fetch");
	return mod.default;
}

async function main() {
	const { url, verbose, notifyHook } = parseArgs();
	if (!url) {
		console.error("Usage: node scripts/mcp-health-probe.js --url=http://localhost:5174");
		process.exit(2);
	}
	const f = await getFetch();
	const start = Date.now();
	try {
		const endpoint = `${url.replace(/\/+$/, "")}/health`;
		if (verbose) console.log(`GET ${endpoint}`);
		const res = await f(endpoint);
		const ms = Date.now() - start;
		if (!res.ok) {
			const body = await res.text().catch(() => "");
			console.error(`FAILED: /health returned ${res.status} in ${ms}ms. Body: ${body}`);
			if (notifyHook) {
				await f(notifyHook, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ type: "health-fail", url: endpoint, status: res.status, body, ms })
				}).catch(() => {});
			}
			process.exit(1);
		}
		const json = await res.json().catch(() => ({}));
		if (json && (json.ok === true || json.status === "ok")) {
			console.log(`Health OK (${ms}ms)`);
			if (verbose) console.log(JSON.stringify(json));
			process.exit(0);
		}
		console.error(`FAILED: /health response missing ok/status fields (${ms}ms)`);
		if (notifyHook) {
			await f(notifyHook, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ type: "bad-payload", url: endpoint, json, ms })
			}).catch(() => {});
		}
		process.exit(1);
	} catch (err) {
		const ms = Date.now() - start;
		console.error(`FAILED: /health fetch error after ${ms}ms: ${String(err)}`);
		if (notifyHook) {
			try {
				await f(notifyHook, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ type: "exception", error: String(err), ms })
				});
			} catch {}
		}
		process.exit(1);
	}
}

main();

