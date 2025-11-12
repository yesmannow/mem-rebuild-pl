/* eslint-disable no-console */
import supertest from "supertest";
import { spawn } from "child_process";
import path from "path";

const SERVER_ENTRY = path.join(process.cwd(), "mcp", "server.js");

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHealth(baseUrl, timeoutMs = 10000) {
	const start = Date.now();
	const agent = supertest(baseUrl);
	while (Date.now() - start < timeoutMs) {
		try {
			const res = await agent.get("/health");
			if (res.status === 200) return;
		} catch {
			// ignore until ready
		}
		await sleep(200);
	}
	throw new Error("Server did not become healthy in time");
}

function startServer(port, extraEnv = {}) {
	const child = spawn(process.execPath, [SERVER_ENTRY], {
		stdio: "pipe",
		env: {
			...process.env,
			PORT: String(port),
			MCP_AUTH_TOKEN: "test-token",
			AI_FEATURES_ENABLED: "false",
			...extraEnv,
		},
	});
	let logs = "";
	child.stdout.on("data", (d) => (logs += d.toString()));
	child.stderr.on("data", (d) => (logs += d.toString()));
	return { child, getLogs: () => logs };
}

function randomPort() {
	return 4000 + Math.floor(Math.random() * 1000);
}

describe("AI Playground UI", () => {
	let serverProc;
	let port;
	let baseUrl;

	beforeAll(async () => {
		port = randomPort();
		baseUrl = `http://localhost:${port}`;
		serverProc = startServer(port);
		await waitForHealth(baseUrl);
	});

	afterAll(() => {
		if (serverProc?.child) {
			serverProc.child.kill();
		}
	});

	it("should serve playground UI at /ai-playground", async () => {
		const agent = supertest(baseUrl);
		const res = await agent.get("/ai-playground");
		
		expect(res.status).toBe(200);
		expect(res.text).toContain("AI Playground");
		expect(res.text).toContain("Log Summarize");
		expect(res.text).toContain("Code Review");
		expect(res.text).toContain("Design Tokens");
		expect(res.text).toContain("Microcopy");
		expect(res.text).toContain("Debug Canvas");
		expect(res.text).toContain("Usage Stats");
	});

	it("should show disabled status when AI features are off", async () => {
		const agent = supertest(baseUrl);
		const res = await agent.get("/ai-playground");
		
		expect(res.text).toContain("AI Features Disabled");
		expect(res.text).toContain("AI_FEATURES_ENABLED=true");
	});
});

describe("Enhanced Monitoring", () => {
	let serverProc;
	let port;
	let baseUrl;

	beforeAll(async () => {
		port = randomPort();
		baseUrl = `http://localhost:${port}`;
		serverProc = startServer(port, { AI_FEATURES_ENABLED: "true" });
		await waitForHealth(baseUrl);
	});

	afterAll(() => {
		if (serverProc?.child) {
			serverProc.child.kill();
		}
	});

	it("should include per-endpoint stats in monitoring", async () => {
		const agent = supertest(baseUrl);
		const res = await agent.get("/api/monitoring/stats");
		
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("aiCalls");
		expect(res.body.aiCalls).toHaveProperty("endpoints");
		
		const endpoints = res.body.aiCalls.endpoints;
		expect(endpoints).toHaveProperty("log-summarize");
		expect(endpoints).toHaveProperty("code-review");
		expect(endpoints).toHaveProperty("design-tokens");
		expect(endpoints).toHaveProperty("microcopy");
		expect(endpoints).toHaveProperty("debug-canvas");
		
		// Each endpoint should have tracking fields
		expect(endpoints["log-summarize"]).toHaveProperty("calls");
		expect(endpoints["log-summarize"]).toHaveProperty("tokens");
		expect(endpoints["log-summarize"]).toHaveProperty("errors");
		expect(endpoints["log-summarize"]).toHaveProperty("cacheHits");
	});

	it("should track endpoint calls when AI is enabled but without API keys", async () => {
		const agent = supertest(baseUrl);
		
		// Make a call that will fail due to missing API key
		await agent
			.post("/api/ai/log-summarize")
			.send({ logs: "test log" });
		
		// Check stats
		const res = await agent.get("/api/monitoring/stats");
		const endpoints = res.body.aiCalls.endpoints;
		
		// Should have tracked the call and error
		expect(endpoints["log-summarize"].calls).toBeGreaterThan(0);
		expect(endpoints["log-summarize"].errors).toBeGreaterThan(0);
	});
});

describe("AI Stats endpoint", () => {
	let serverProc;
	let port;
	let baseUrl;

	beforeAll(async () => {
		port = randomPort();
		baseUrl = `http://localhost:${port}`;
		serverProc = startServer(port, { AI_FEATURES_ENABLED: "true" });
		await waitForHealth(baseUrl);
	});

	afterAll(() => {
		if (serverProc?.child) {
			serverProc.child.kill();
		}
	});

	it("should return endpoint statistics", async () => {
		const agent = supertest(baseUrl);
		const res = await agent.get("/api/ai/stats");
		
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("success");
		expect(res.body).toHaveProperty("stats");
		expect(res.body.stats).toHaveProperty("endpoints");
	});
});
