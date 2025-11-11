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
		await sleep(100);
	}
	throw new Error("Server did not become healthy in time");
}

function startServer(port, extraEnv = {}) {
	const child = spawn(process.execPath, [SERVER_ENTRY], {
		stdio: "pipe",
		env: {
			...process.env,
			PORT: String(port),
			...extraEnv,
		},
	});
	return child;
}

function randomPort() {
	return 4800 + Math.floor(Math.random() * 200);
}

describe("Rate limiter", () => {
	let child;
	let baseUrl;

	afterEach(() => {
		if (child && !child.killed) {
			try {
				child.kill();
			} catch {}
		}
		child = undefined;
	});

	test("returns 429 after exceeding max in window", async () => {
		const port = randomPort();
		// Small window and low max for test
		child = startServer(port, { MCP_RATE_LIMIT_WINDOW_MS: "200", MCP_RATE_LIMIT_MAX: "3" });
		baseUrl = `http://localhost:${port}`;
		await waitForHealth(baseUrl);

		const agent = supertest(baseUrl);
		const statuses = [];
		for (let i = 0; i < 5; i++) {
			const res = await agent.get("/health");
			statuses.push(res.status);
		}
		// Expect some 429s at the end
		const has429 = statuses.some((s) => s === 429);
		expect(has429).toBe(true);
	});
});


