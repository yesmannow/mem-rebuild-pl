#!/usr/bin/env node
/**
 * MCP Server Validation Script
 * Run this after starting the MCP server to verify it's working correctly
 */

// Mirror server port resolution: PORT > MCP_PORT > 5174
const PORT = process.env.PORT || process.env.MCP_PORT || 5174;
const AUTH_TOKEN = process.env.MCP_AUTH_TOKEN;

const BASE_URL = `http://localhost:${PORT}`;
const headers = (() => {
	const base = {};
	if (AUTH_TOKEN) base["Authorization"] = `Bearer ${AUTH_TOKEN}`;
	return base;
})();

async function testHealth() {
	try {
		const started = Date.now();
		const response = await fetch(`${BASE_URL}/health`, { headers });
		const duration = Date.now() - started;
		if (!response.ok) {
			const text = await response.text();
			console.error(`❌ Health check failed: HTTP ${response.status} ${response.statusText}`);
			if (text) console.error(`   Response: ${text.substring(0, 200)}`);
			return false;
		}
		const data = await response.json();
		if (data && (data.ok === true || data.status === "ok")) {
			console.log(`✅ Health OK (${duration}ms)`);
			return true;
		}
		console.error("❌ Health check failed:", data);
		return false;
	} catch (error) {
		console.error("❌ Health check error:", error.message);
		return false;
	}
}

async function testRead() {
	try {
		// Server contract: GET /read?path=... returns text/plain
		const target = "README.md";
		const started = Date.now();
		const response = await fetch(`${BASE_URL}/read?path=${encodeURIComponent(target)}`, { headers });
		const duration = Date.now() - started;
		if (!response.ok) {
			const text = await response.text();
			console.error(`❌ Read test failed: HTTP ${response.status} ${response.statusText}`);
			if (text) console.error(`   Response: ${text.substring(0, 200)}`);
			return false;
		}
		const text = await response.text();
		console.log(`✅ Read OK (${duration}ms) — ${target} (${text.length} chars)`);
		return true;
	} catch (error) {
		console.error("❌ Read test error:", error.message);
		return false;
	}
}

async function runTests() {
	console.log(`\n🔍 Testing MCP Server at ${BASE_URL}\n`);
	const healthOk = await testHealth();
	const readOk = await testRead();
	console.log("\n" + "=".repeat(50));
	if (healthOk && readOk) {
		console.log("✅ All validation tests passed!");
	} else {
		console.log("❌ Some tests failed");
		process.exit(1);
	}
}

runTests();

