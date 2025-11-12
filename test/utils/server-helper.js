/* eslint-disable no-console */
import { spawn } from "child_process";
import path from "path";
import { createServer, stopServer as stopServerInstance } from "../../mcp/server.js";
import supertest from "supertest";

const SERVER_ENTRY = path.join(process.cwd(), "mcp", "server.js");

/**
 * Start server in a child process (for integration tests)
 */
export async function startServer({ port = 5174, env = {}, timeout = 15000 } = {}) {
	const child = spawn(process.execPath, [SERVER_ENTRY], {
		env: { ...process.env, PORT: String(port), ...env },
		stdio: ["ignore", "pipe", "pipe"],
	});
	let stdout = "";
	let stderr = "";
	child.stdout?.on("data", (d) => (stdout += d.toString()));
	child.stderr?.on("data", (d) => (stderr += d.toString()));

	const baseUrl = `http://localhost:${port}`;
	const ok = await waitForHealth(baseUrl, timeout);
	if (!ok) {
		try { child.kill(); } catch { /* Ignore kill errors */ }
		throw new Error(`Server did not become healthy within ${timeout}ms.\n${stdout}\n${stderr}`);
	}
	return {
		child,
		baseUrl,
		logs: () => ({ stdout, stderr }),
		stop: async () => stopServerChild(child),
	};
}

/**
 * Stop child process server
 */
export async function stopServerChild(child) {
	return new Promise((resolve) => {
		if (!child || child.killed) return resolve();
		child.once("exit", () => resolve());
		try { child.kill(); } catch { /* Ignore kill errors */ }
		setTimeout(() => resolve(), 2000);
	});
}

/**
 * Create server in-process (for unit tests - faster)
 */
export async function createTestServer(options = {}) {
	const port = options.port || randomPort();
	const baseUrl = `http://localhost:${port}`;
	
	// Set environment variables for this test server
	if (options.authToken) process.env.MCP_AUTH_TOKEN = options.authToken;
	if (options.writeEnabled !== undefined) {
		process.env.MCP_WRITE_ENABLED = String(options.writeEnabled);
	}
	if (options.readOnly !== undefined) {
		process.env.MCP_READONLY = String(options.readOnly);
	}
	
	// Start server
	const serverInstance = await createServer(port);
	
	// Wait for health check
	await waitForHealth(baseUrl, 5000);
	
	return {
		port,
		baseUrl,
		server: serverInstance.server,
		agent: supertest(baseUrl),
		async close() {
			await serverInstance.close();
			cleanupTestEnv();
		},
	};
}

/**
 * Clean up test environment variables
 */
export function cleanupTestEnv() {
	delete process.env.MCP_AUTH_TOKEN;
	delete process.env.MCP_WRITE_ENABLED;
	delete process.env.MCP_READONLY;
}

/**
 * Generate random port for testing
 */
export function randomPort() {
	return 4000 + Math.floor(Math.random() * 1000);
}

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

async function waitForHealth(baseUrl, timeoutMs = 15000) {
	const start = Date.now();
	const agent = supertest(baseUrl);
	while (Date.now() - start < timeoutMs) {
		try {
			const res = await agent.get("/health");
			if (res.status === 200) return true;
		} catch { /* Ignore connection errors during startup */ }
		await sleep(200);
	}
	return false;
}

