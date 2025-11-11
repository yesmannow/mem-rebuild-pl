/* eslint-disable no-console */
import supertest from "supertest";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

const SERVER_ENTRY = path.join(process.cwd(), "mcp", "server.js");

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHealth(baseUrl, timeoutMs = 10000) {
	const start = Date.now();
	// supertest supports URL strings
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
	let logs = "";
	child.stdout.on("data", (d) => (logs += d.toString()));
	child.stderr.on("data", (d) => (logs += d.toString()));
	return { child, getLogs: () => logs };
}

function randomPort() {
	return 4000 + Math.floor(Math.random() * 1000);
}

describe("MCP server integration", () => {
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

	test("health returns 200", async () => {
		const port = randomPort();
		({ child } = startServer(port));
		baseUrl = `http://localhost:${port}`;
		await waitForHealth(baseUrl);
		const res = await supertest(baseUrl).get("/health");
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("status", "ok");
	});

	test("rejects path traversal for ls/read (non-200)", async () => {
		const port = randomPort();
		({ child } = startServer(port));
		baseUrl = `http://localhost:${port}`;
		await waitForHealth(baseUrl);

		// Attempt traversal; server should not succeed with 200 OK listing unrelated parent
		const lsRes = await supertest(baseUrl).get("/ls").query({ path: "../../.." });
		expect(lsRes.status).not.toBe(200);

		const readRes = await supertest(baseUrl).get("/read").query({ path: "../../etc/passwd" });
		expect(readRes.status).not.toBe(200);
	});

	test("write requires auth when token configured and obeys gating", async () => {
		const token = "test-secret-token";
		const port = randomPort();
		// start with writes disabled/readOnly true to test 403s
		({ child } = startServer(port, token, { MCP_WRITE_ENABLED: "false", MCP_READONLY: "true" }));
		baseUrl = `http://localhost:${port}`;
		await waitForHealth(baseUrl);

		const relTarget = `mcp/tmp-test-${Date.now()}.txt`;
		const url = `${baseUrl}/write`;

		// No auth -> 401
		let res = await supertest(baseUrl).post("/write").send({ path: relTarget, content: "x" });
		expect(res.status).toBe(401);

		// Wrong token -> 403
		res = await supertest(baseUrl)
			.post("/write")
			.set("Authorization", "Bearer wrong")
			.send({ path: relTarget, content: "x" });
		expect(res.status).toBe(403);

		// With token but readOnly true -> 403
		res = await supertest(baseUrl)
			.post("/write")
			.set("Authorization", `Bearer ${token}`)
			.send({ path: relTarget, content: "x" });
		expect(res.status).toBe(403);

		// restart with readOnly false but MCP_WRITE_ENABLED false -> 403
		if (child && !child.killed) child.kill();
		({ child } = startServer(port, token, { MCP_READONLY: "false", MCP_WRITE_ENABLED: "false" }));
		await waitForHealth(baseUrl);
		res = await supertest(baseUrl)
			.post("/write")
			.set("Authorization", `Bearer ${token}`)
			.send({ path: relTarget, content: "x" });
		expect(res.status).toBe(403);

		// Correct token -> 200
		// restart with readOnly false and writes enabled
		if (child && !child.killed) child.kill();
		({ child } = startServer(port, token, { MCP_READONLY: "false", MCP_WRITE_ENABLED: "true" }));
		await waitForHealth(baseUrl);
		res = await supertest(baseUrl)
			.post("/write")
			.set("Authorization", `Bearer ${token}`)
			.send({ path: relTarget, content: "hello world" });
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("ok", true);

		// Verify write happened (and clean up)
		const abs = path.join(process.cwd(), relTarget);
		const content = fs.readFileSync(abs, "utf8");
		expect(content).toBe("hello world");
		fs.unlinkSync(abs);
	});

	test("portfolio endpoint responds", async () => {
		const port = randomPort();
		({ child } = startServer(port));
		baseUrl = `http://localhost:${port}`;
		await waitForHealth(baseUrl);
		const res = await supertest(baseUrl).get("/api/portfolio");
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("message");
	});
});


