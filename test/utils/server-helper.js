/* eslint-disable no-console */
import { spawn } from "child_process";
import path from "path";

const SERVER_ENTRY = path.join(process.cwd(), "mcp", "server.js");

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
		stop: async () => stopServer(child),
	};
}

export async function stopServer(child) {
	return new Promise((resolve) => {
		if (!child || child.killed) return resolve();
		child.once("exit", () => resolve());
		try { child.kill(); } catch { /* Ignore kill errors */ }
		setTimeout(() => resolve(), 2000);
	});
}

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

async function waitForHealth(baseUrl, timeoutMs = 15000) {
	const start = Date.now();
	// Avoid adding fetch deps; use supertest dynamically to keep consistency
	const supertest = (await import("supertest")).default;
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


