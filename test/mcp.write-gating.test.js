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

function startServer(port, token, extraEnv = {}) {
	const child = spawn(process.execPath, [SERVER_ENTRY], {
		stdio: "pipe",
		env: {
			...process.env,
			PORT: String(port),
			MCP_AUTH_TOKEN: token || "",
			...extraEnv,
		},
	});
	return child;
}

function randomPort() {
	return 4500 + Math.floor(Math.random() * 500);
}

describe("MCP write gating", () => {
	let child;
	let baseUrl;
	const token = "gating-token";
	const relTarget = `mcp/tmp-write-gate-${Date.now()}.txt`;

	afterEach(() => {
		if (child && !child.killed) {
			try {
				child.kill();
			} catch {}
		}
		child = undefined;
	});

	test("403 when readOnly=true even with token and writes enabled", async () => {
		const port = randomPort();
		child = startServer(port, token, { MCP_READONLY: "true", MCP_WRITE_ENABLED: "true" });
		baseUrl = `http://localhost:${port}`;
		await waitForHealth(baseUrl);

		const res = await supertest(baseUrl)
			.post("/write")
			.set("Authorization", `Bearer ${token}`)
			.send({ path: relTarget, content: "x" });
		expect([400, 403]).toContain(res.status); // 403 expected; 400 acceptable if path blocked
	});

	test("403 when writes disabled even with token and readOnly=false", async () => {
		const port = randomPort();
		child = startServer(port, token, { MCP_READONLY: "false", MCP_WRITE_ENABLED: "false" });
		baseUrl = `http://localhost:${port}`;
		await waitForHealth(baseUrl);

		const res = await supertest(baseUrl)
			.post("/write")
			.set("Authorization", `Bearer ${token}`)
			.send({ path: relTarget, content: "x" });
		expect(res.status).toBe(403);
	});

	test("200 when token valid, readOnly=false, and writes enabled", async () => {
		const port = randomPort();
		child = startServer(port, token, { MCP_READONLY: "false", MCP_WRITE_ENABLED: "true" });
		baseUrl = `http://localhost:${port}`;
		await waitForHealth(baseUrl);

		const res = await supertest(baseUrl)
			.post("/write")
			.set("Authorization", `Bearer ${token}`)
			.send({ path: relTarget, content: "ok" });
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("ok", true);
	});
});


