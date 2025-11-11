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
		} catch {}
		await sleep(200);
	}
	throw new Error("Server did not become healthy in time");
}

function startServer(port, extraEnv = {}) {
	const child = spawn(process.execPath, [SERVER_ENTRY], {
		stdio: "pipe",
		env: { ...process.env, PORT: String(port), ...extraEnv },
	});
	return child;
}

function randomPort() {
	return 5000 + Math.floor(Math.random() * 200);
}

describe("Monitoring stats", () => {
	let child;
	let baseUrl;

	afterEach(() => {
		if (child && !child.killed) {
			try { child.kill(); } catch {}
		}
		child = undefined;
	});

	test("stats endpoint includes rateLimit and counters", async () => {
		const port = randomPort();
		child = startServer(port);
		baseUrl = `http://localhost:${port}`;
		await waitForHealth(baseUrl);

		const res = await supertest(baseUrl).get("/api/monitoring/stats");
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("timestamp");
		expect(res.body).toHaveProperty("lastStatus");
		expect(res.body).toHaveProperty("rateLimit");
		expect(typeof res.body.rateLimit.windowMs).toBe("number");
		expect(typeof res.body.rateLimit.max).toBe("number");
	});
});



