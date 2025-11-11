#!/usr/bin/env node
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import net from "node:net";

async function findFreePort() {
	return await new Promise((resolve, reject) => {
		const srv = net.createServer();
		srv.on("error", reject);
		srv.listen(0, "127.0.0.1", () => {
			const address = srv.address();
			const port = typeof address === "object" && address ? address.port : null;
			srv.close(() => (port ? resolve(port) : reject(new Error("No port assigned"))));
		});
	});
}

function delay(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

async function waitForHealth(baseUrl, timeoutMs = 10000) {
	const start = Date.now();
	let lastError = null;
	while (Date.now() - start < timeoutMs) {
		try {
			const resp = await fetch(new URL("/health", baseUrl), { method: "GET" });
			if (resp.ok) {
				const json = await resp.json().catch(() => ({}));
				return { ok: true, json };
			}
			lastError = new Error(`Health returned ${resp.status}`);
		} catch (e) {
			lastError = e;
		}
		await delay(200);
	}
	return { ok: false, error: lastError ? String(lastError) : "Timed out" };
}

async function httpJson(method, url, options = {}) {
	const headers = { ...(options.headers || {}) };
	const body = options.body ? JSON.stringify(options.body) : undefined;
	if (body) headers["content-type"] = "application/json";
	let text = "";
	let json = null;
	let status = 0;
	let ok = false;
	let error = null;
	try {
		const resp = await fetch(url, { method, headers, body });
		status = resp.status;
		ok = resp.ok;
		text = await resp.text();
		try {
			json = JSON.parse(text);
		} catch {
			json = null;
		}
	} catch (e) {
		error = String(e);
	}
	return { request: { method, url, headers, body: options.body || null }, response: { status, ok, text, json }, error };
}

async function run() {
	const timestamp = new Date().toISOString();
	const repoRoot = process.cwd();

	// Inputs via env with sensible defaults
	const requestedPortEnv = process.env.PORT ?? process.env.MCP_PORT ?? "0";
	const writeEnabled = process.env.MCP_WRITE_ENABLED ?? "false";
	const authToken = process.env.MCP_AUTH_TOKEN || `smoke_${Math.random().toString(36).slice(2)}`;

	// Choose actual port: if PORT=0, pick a free one so client can connect
	const actualPort = requestedPortEnv === "0" ? await findFreePort() : Number(requestedPortEnv);
	const baseUrl = `http://127.0.0.1:${actualPort}`;

	// Sandbox directory inside the repo (non-destructive)
	const sandboxParent = join(repoRoot, "scripts", ".mcp-smoke-tmp");
	if (!existsSync(sandboxParent)) mkdirSync(sandboxParent, { recursive: true });
	const sandboxDir = mkdtempSync(join(sandboxParent, "/run-"));
	const sandboxRel = relative(repoRoot, sandboxDir);

	// Prepare a harmless file for read test
	const sampleFilePath = join(sandboxDir, "sample.txt");
	const sampleContent = "hello from mcp smoke";
	writeFileSync(sampleFilePath, sampleContent, "utf8");
	const sampleRelPath = relative(repoRoot, sampleFilePath).replace(/\\/g, "/");

	// Spawn MCP server
	const serverPath = join(repoRoot, "mcp", "server.js");
	const childEnv = {
		...process.env,
		PORT: String(actualPort),
		MCP_PORT: String(actualPort),
		MCP_AUTH_TOKEN: authToken,
		MCP_WRITE_ENABLED: String(writeEnabled),
	};

	let serverStdout = "";
	let serverStderr = "";
	let serverStartError = null;

	const child = spawn(process.execPath, [serverPath], {
		cwd: repoRoot,
		env: childEnv,
		stdio: ["ignore", "pipe", "pipe"],
	});
	child.stdout.on("data", (d) => (serverStdout += d.toString()));
	child.stderr.on("data", (d) => (serverStderr += d.toString()));
	child.on("error", (e) => {
		serverStartError = String(e);
	});

	// Wait for /health
	const healthWait = await waitForHealth(baseUrl, 12000);

	const tests = [];

	// health test
	if (!healthWait.ok) {
		tests.push({
			name: "GET /health",
			pass: false,
			error: `Server not healthy or failed to start: ${healthWait.error || "unknown"}`,
		});
	} else {
		const healthRes = await httpJson("GET", `${baseUrl}/health`);
		const hasStatusField = !!(healthRes.response.json && Object.prototype.hasOwnProperty.call(healthRes.response.json, "status"));
		tests.push({
			name: "GET /health",
			request: healthRes.request,
			response: { status: healthRes.response.status, body: healthRes.response.json ?? healthRes.response.text },
			pass: healthRes.response.status === 200 && hasStatusField,
			error: healthRes.error || (!hasStatusField ? "missing status field" : null),
		});
	}

	// ls test (safe path: sandbox)
	if (healthWait.ok) {
		const lsRes = await httpJson("GET", `${baseUrl}/ls?path=${encodeURIComponent(sandboxRel)}`);
		const isArray = Array.isArray(lsRes.response.json);
		tests.push({
			name: "GET /ls (sandbox dir)",
			request: lsRes.request,
			response: { status: lsRes.response.status, body: lsRes.response.json ?? lsRes.response.text },
			pass: lsRes.response.status === 200 && isArray,
			error: lsRes.error || (!isArray ? "response not array" : null),
		});
	}

	// read test (safe file in sandbox)
	if (healthWait.ok) {
		const readRes = await httpJson("GET", `${baseUrl}/read?path=${encodeURIComponent(sampleRelPath)}`);
		const bodyText = readRes.response.text;
		tests.push({
			name: "GET /read (sandbox file)",
			request: readRes.request,
			response: { status: readRes.response.status, body: bodyText },
			pass: readRes.response.status === 200 && bodyText === sampleContent,
			error: readRes.error || (bodyText !== sampleContent ? "content mismatch" : null),
		});
	}

	// path traversal rejection test
	if (healthWait.ok) {
		const traversalRes = await httpJson("GET", `${baseUrl}/read?path=${encodeURIComponent("../README.md")}`);
		const rejected = traversalRes.response.status >= 400 && traversalRes.response.status < 500;
		tests.push({
			name: "GET /read (path traversal attempt ../README.md)",
			request: traversalRes.request,
			response: { status: traversalRes.response.status, body: traversalRes.response.json ?? traversalRes.response.text },
			pass: rejected,
			error: traversalRes.error || (!rejected ? "path traversal not explicitly rejected (expected 4xx)" : null),
		});
	}

	// portfolio endpoint test
	if (healthWait.ok) {
		const portfolioRes = await httpJson("GET", `${baseUrl}/api/portfolio`);
		const isObject = portfolioRes.response.json && typeof portfolioRes.response.json === "object";
		tests.push({
			name: "GET /api/portfolio",
			request: portfolioRes.request,
			response: { status: portfolioRes.response.status, body: portfolioRes.response.json ?? portfolioRes.response.text },
			pass: portfolioRes.response.status === 200 && isObject,
			error: portfolioRes.error || (!isObject ? "response not JSON object" : null),
		});
	}

	// Teardown server
	const stopServer = async () => {
		if (!child.killed) {
			try {
				child.kill("SIGTERM");
			} catch {}
			// Give it a moment, then force kill if needed
			await delay(300);
			if (!child.killed) {
				try {
					child.kill("SIGKILL");
				} catch {}
			}
		}
	};

	await stopServer();
	// Cleanup sandbox
	try {
		rmSync(sandboxDir, { recursive: true, force: true });
	} catch {}

	const report = {
		timestamp,
		env: {
			requestedPort: requestedPortEnv,
			actualPort,
			MCP_WRITE_ENABLED: writeEnabled,
			MCP_AUTH_TOKEN_set: Boolean(authToken),
		},
		server: {
			entry: "mcp/server.js",
			stdout: serverStdout,
			stderr: serverStderr,
			startError: serverStartError,
		},
		endpointsTested: tests.map((t) => t.name),
		results: tests,
		summary: {
			passed: tests.filter((t) => t.pass).length,
			failed: tests.filter((t) => !t.pass).length,
		},
	};

	console.log(JSON.stringify(report, null, 2));
}

run().catch((err) => {
	const fallback = {
		timestamp: new Date().toISOString(),
		error: String(err?.stack || err),
	};
	console.log(JSON.stringify(fallback, null, 2));
	process.exitCode = 1;
});


