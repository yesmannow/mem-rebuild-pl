#!/usr/bin/env node
import fs from "fs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const root = path.resolve(__dirname, "..");

// env + config
const PORT = process.env.PORT || process.env.MCP_PORT || 5174;
const AUTH_TOKEN = process.env.MCP_AUTH_TOKEN || "";
const MCP_WRITE_ENABLED = (process.env.MCP_WRITE_ENABLED || "false").toLowerCase() === "true";
const MCP_READONLY_ENV = process.env.MCP_READONLY;
const RATE_WINDOW_MS = Number(process.env.MCP_RATE_LIMIT_WINDOW_MS || 1000);
const RATE_MAX = Number(process.env.MCP_RATE_LIMIT_MAX || 60);

// load config.json safely
let config = {};
try {
	const configPath = path.join(__dirname, "config.json");
	config = JSON.parse(fs.readFileSync(configPath, "utf8"));
} catch {
	console.warn("WARN: could not load mcp/config.json, using defaults");
	config = { readOnly: true, allowedPaths: ["src", "public", "scripts", "content"] };
}

// derive readOnly from env if provided
const READ_ONLY = typeof MCP_READONLY_ENV === "string"
	? (MCP_READONLY_ENV || "true").toLowerCase() === "true"
	: Boolean(config.readOnly);

// --- monitoring helpers ---
const monitoring = {
	totalChecks: 0,
	failures: 0,
	consecutiveFailures: 0,
	lastStatus: "unknown",
	lastFailureAt: null,
	lastSuccessAt: null,
	avgResponseMs: 0,
	samples: [], // circular buffer for simple avg
	maxSamples: 100
};

function recordCheck(ok, durationMs) {
	monitoring.totalChecks += 1;
	if (!ok) {
		monitoring.failures += 1;
		monitoring.consecutiveFailures += 1;
		monitoring.lastFailureAt = new Date().toISOString();
		monitoring.lastStatus = "error";
	} else {
		monitoring.consecutiveFailures = 0;
		monitoring.lastSuccessAt = new Date().toISOString();
		monitoring.lastStatus = "ok";
	}
	monitoring.samples.push(durationMs);
	if (monitoring.samples.length > monitoring.maxSamples) monitoring.samples.shift();
	// rolling average
	const sum = monitoring.samples.reduce((a, b) => a + b, 0);
	monitoring.avgResponseMs = Math.round(sum / monitoring.samples.length);
}

// helper: check allowedPaths and prevent traversal
export function safeJoin(rootDir, requestedPath) {
	const joined = path.join(rootDir, requestedPath || ".");
	const resolved = path.resolve(joined);
	// must remain inside rootDir
	const rel = path.relative(rootDir, resolved);
	if (rel.startsWith("..") || path.isAbsolute(rel)) {
		throw new Error("Path traversal detected");
	}
	// optional allowedPaths enforcement
	if (Array.isArray(config.allowedPaths) && config.allowedPaths.length) {
		const isAllowed = config.allowedPaths.some((p) => {
			const allowedAbs = path.resolve(path.join(rootDir, p));
			return resolved === allowedAbs || resolved.startsWith(allowedAbs + path.sep);
		});
		if (!isAllowed) throw new Error("Path not allowed by config.allowedPaths");
	}
	return resolved;
}

// logging helper
function log(msg) {
	const ts = new Date().toISOString();
	// eslint-disable-next-line no-console
	console.log(`[mcp:${ts}] ${msg}`);
}

// monitoring: track errors and request patterns
const errorCounts = new Map(); // endpoint -> count
const requestCounts = new Map(); // endpoint -> count

function trackError(endpoint) {
	const count = errorCounts.get(endpoint) || 0;
	errorCounts.set(endpoint, count + 1);
}

function trackRequest(endpoint) {
	const count = requestCounts.get(endpoint) || 0;
	requestCounts.set(endpoint, count + 1);
}

// request logging middleware (for monitoring)
function requestLogger(req, res, next) {
	const start = Date.now();
	const endpoint = `${req.method} ${req.path}`;
	trackRequest(endpoint);

	// Log 4xx/5xx responses
	const originalSend = res.send;
	res.send = function(body) {
		const duration = Date.now() - start;
		if (res.statusCode >= 400) {
			trackError(endpoint);
			log(`[${res.statusCode}] ${endpoint} from ${req.ip} (${duration}ms) - ${res.statusCode >= 500 ? "ERROR" : "CLIENT_ERROR"}`);
		}
		return originalSend.call(this, body);
	};

	next();
}

// expose monitoring stats endpoint
app.get("/api/monitoring/stats", (req, res) => {
	res.json({
		timestamp: new Date().toISOString(),
		totalChecks: monitoring.totalChecks,
		failures: monitoring.failures,
		consecutiveFailures: monitoring.consecutiveFailures,
		lastStatus: monitoring.lastStatus,
		lastFailureAt: monitoring.lastFailureAt,
		lastSuccessAt: monitoring.lastSuccessAt,
		avgResponseMs: monitoring.avgResponseMs,
		// Also include endpoint-level stats
		requests: Object.fromEntries(requestCounts),
		errors: Object.fromEntries(errorCounts)
	});
});

// simple in-memory rate limiter (per IP)
const rateState = new Map(); // key -> number[] timestamps
function rateLimiter(req, res, next) {
	try {
		const now = Date.now();
		const key = `${req.ip}`;
		let bucket = rateState.get(key);
		if (!bucket) {
			bucket = [];
			rateState.set(key, bucket);
		}
		// prune old
		const cutoff = now - RATE_WINDOW_MS;
		while (bucket.length && bucket[0] < cutoff) {
			bucket.shift();
		}
		if (bucket.length >= RATE_MAX) {
			res.status(429).json({ error: "Too Many Requests" });
			return;
		}
		bucket.push(now);
		next();
	} catch (e) {
		next();
	}
}

// apply middleware: request logging first, then rate limiter
app.use(requestLogger);
app.use(rateLimiter);

// auth middleware for write
function requireAuth(req, res, next) {
	if (!AUTH_TOKEN) {
		log("WARN: MCP_AUTH_TOKEN not set - running without auth");
		return next();
	}
	const auth = req.headers.authorization || "";
	if (!auth.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
	const token = auth.slice("Bearer ".length);
	if (token !== AUTH_TOKEN) return res.status(403).json({ error: "Forbidden" });
	next();
}

// endpoints
app.get("/health", (req, res) => {
	const start = Date.now();
	// Use existing health checks if any, otherwise simple OK
	const payload = { ok: true, status: "ok", version: config.version || "unknown" };
	const duration = Date.now() - start;
	recordCheck(true, duration);
	res.json(payload);
});

app.get("/ls", (req, res) => {
	try {
		const p = req.query.path || ".";
		const target = safeJoin(root, p);
		const entries = fs.readdirSync(target, { withFileTypes: true });
		res.json(entries.map((e) => ({ name: e.name, dir: e.isDirectory() })));
	} catch (err) {
		log(`ls error: ${String(err)}`);
		res.status(400).json({ error: String(err) });
	}
});

app.get("/read", (req, res) => {
	try {
		const p = req.query.path || "";
		const file = safeJoin(root, p);
		res.type("text/plain").send(fs.readFileSync(file, "utf8"));
	} catch (err) {
		log(`read error: ${String(err)}`);
		res.status(400).json({ error: String(err) });
	}
});

app.post("/write", requireAuth, (req, res) => {
	try {
		if (READ_ONLY) return res.status(403).json({ error: "Server is readOnly" });
		if (!MCP_WRITE_ENABLED) return res.status(403).json({ error: "Writes disabled by MCP_WRITE_ENABLED" });
		const filePath = req.body.path;
		const content = req.body.content || "";
		const target = safeJoin(root, filePath);
		fs.writeFileSync(target, content, "utf8");
		res.json({ ok: true });
	} catch (err) {
		log(`write error: ${String(err)}`);
		res.status(400).json({ error: String(err) });
	}
});

// placeholder portfolio endpoint
app.get("/api/portfolio", (req, res) => {
	res.json({ message: "portfolio endpoint placeholder" });
});

// only start server when executed directly (not when imported for tests)
const isMain = fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "");
if (isMain) {
	app.listen(PORT, () => {
		log(`MCP server listening on port ${PORT}`);
	});
}

export { app };

