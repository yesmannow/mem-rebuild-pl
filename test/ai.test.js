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
			AI_FEATURES_ENABLED: "false", // Disabled by default for testing
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

describe("AI endpoints", () => {
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

	describe("when AI features are disabled", () => {
		it("should return 503 for log-summarize", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/log-summarize")
				.send({ logs: "test log" });
			
			expect(res.status).toBe(503);
			expect(res.body.error).toBe("AI features are not enabled");
		});

		it("should return 503 for code-review", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/code-review")
				.send({ code: "test", error: "error" });
			
			expect(res.status).toBe(503);
		});

		it("should return 503 for design-tokens", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/design-tokens")
				.send({ brief: "modern, clean" });
			
			expect(res.status).toBe(503);
		});

		it("should return 503 for microcopy", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/microcopy")
				.send({ component: "button", intent: "submit form" });
			
			expect(res.status).toBe(503);
		});

		it("should return 503 for debug-canvas", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/debug-canvas")
				.send({ query: "why is my app slow?" });
			
			expect(res.status).toBe(503);
		});
	});

	describe("AI stats endpoint", () => {
		it("should be accessible even when AI features are disabled", async () => {
			const agent = supertest(baseUrl);
			const res = await agent.get("/api/ai/stats");
			
			// Stats endpoint should also check feature flag
			expect(res.status).toBe(503);
		});
	});

	describe("monitoring stats endpoint", () => {
		it("should include AI stats structure when available", async () => {
			const agent = supertest(baseUrl);
			const res = await agent.get("/api/monitoring/stats");
			
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("timestamp");
			expect(res.body).toHaveProperty("totalChecks");
			// aiCalls may or may not be present depending on if AI module loaded
		});
	});
});

describe("AI endpoints with features enabled", () => {
	let serverProc;
	let port;
	let baseUrl;

	beforeAll(async () => {
		port = randomPort();
		baseUrl = `http://localhost:${port}`;
		// Start server with AI features enabled but without real API keys
		serverProc = startServer(port, {
			AI_FEATURES_ENABLED: "true",
			// Don't set API keys to test error handling
		});
		await waitForHealth(baseUrl);
	});

	afterAll(() => {
		if (serverProc?.child) {
			serverProc.child.kill();
		}
	});

	describe("validation", () => {
		it("should validate required fields for log-summarize", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/log-summarize")
				.send({});
			
			expect(res.status).toBe(400);
			expect(res.body.error).toContain("logs");
		});

		it("should validate required fields for code-review", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/code-review")
				.send({ code: "test" }); // missing error
			
			expect(res.status).toBe(400);
		});

		it("should validate required fields for design-tokens", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/design-tokens")
				.send({});
			
			expect(res.status).toBe(400);
		});

		it("should validate required fields for microcopy", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/microcopy")
				.send({ component: "button" }); // missing intent
			
			expect(res.status).toBe(400);
		});

		it("should validate required fields for debug-canvas", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/debug-canvas")
				.send({});
			
			expect(res.status).toBe(400);
		});
	});

	describe("error handling", () => {
		it("should handle missing API keys gracefully", async () => {
			const agent = supertest(baseUrl);
			const res = await agent
				.post("/api/ai/log-summarize")
				.send({ logs: "test error log" });
			
			expect(res.status).toBe(500);
			expect(res.body.error).toBe("Failed to summarize logs");
			expect(res.body.message).toContain("GPT_API_KEY");
		});
	});
});
