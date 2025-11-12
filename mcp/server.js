#!/usr/bin/env node
import fs from "fs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import aiRoutes from "./routes/ai.js";
import { getAIStats } from "./utils/ai-proxy.js";

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
	config = { readOnly: true, allowedPaths: ["src", "public", "scripts", "content", "mcp", "tmp"] };
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
	const extraTestPaths = process.env.JEST_WORKER_ID ? ["tmp", "mcp"] : [];
	const allowedPaths = Array.isArray(config.allowedPaths) ? [...config.allowedPaths, ...extraTestPaths] : extraTestPaths;
	if (allowedPaths.length) {
		const isAllowed = allowedPaths.some((p) => {
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
	// Get AI stats if available
	let aiStats = null;
	try {
		aiStats = getAIStats();
	} catch {
		// AI module might not be loaded or configured
	}
	
	res.json({
		timestamp: new Date().toISOString(),
		totalChecks: monitoring.totalChecks,
		failures: monitoring.failures,
		consecutiveFailures: monitoring.consecutiveFailures,
		lastStatus: monitoring.lastStatus,
		lastFailureAt: monitoring.lastFailureAt,
		lastSuccessAt: monitoring.lastSuccessAt,
		avgResponseMs: monitoring.avgResponseMs,
		rateLimit: { windowMs: RATE_WINDOW_MS, max: RATE_MAX },
		// Also include endpoint-level stats
		requests: Object.fromEntries(requestCounts),
		errors: Object.fromEntries(errorCounts),
		// Include AI stats if available
		...(aiStats && { aiCalls: aiStats })
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

// Mount AI routes (with built-in rate limiting and feature flag checks)
app.use("/api/ai", aiRoutes);

// AI Playground UI
app.get("/ai-playground", (req, res) => {
	const aiEnabled = (process.env.AI_FEATURES_ENABLED || "false").toLowerCase() === "true";
	
	res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>AI Playground - MCP Server</title>
	<style>
		* { box-sizing: border-box; }
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			max-width: 1200px;
			margin: 0 auto;
			padding: 2rem;
			background: #f5f5f5;
		}
		h1 { color: #333; margin-bottom: 0.5rem; }
		.status { 
			padding: 0.5rem 1rem; 
			border-radius: 4px; 
			margin-bottom: 2rem;
			font-weight: 500;
		}
		.status.enabled { background: #d4edda; color: #155724; }
		.status.disabled { background: #f8d7da; color: #721c24; }
		.endpoints {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			gap: 1.5rem;
			margin-top: 2rem;
		}
		.endpoint {
			background: white;
			border-radius: 8px;
			padding: 1.5rem;
			box-shadow: 0 2px 4px rgba(0,0,0,0.1);
		}
		.endpoint h3 { margin-top: 0; color: #0066cc; }
		.endpoint p { color: #666; font-size: 0.9rem; margin: 0.5rem 0; }
		.form-group {
			margin: 1rem 0;
		}
		label {
			display: block;
			font-weight: 500;
			margin-bottom: 0.25rem;
			color: #333;
		}
		input, textarea {
			width: 100%;
			padding: 0.5rem;
			border: 1px solid #ddd;
			border-radius: 4px;
			font-family: inherit;
		}
		textarea { min-height: 80px; resize: vertical; }
		button {
			background: #0066cc;
			color: white;
			border: none;
			padding: 0.5rem 1.5rem;
			border-radius: 4px;
			cursor: pointer;
			font-weight: 500;
		}
		button:hover { background: #0052a3; }
		button:disabled { background: #ccc; cursor: not-allowed; }
		.result {
			margin-top: 1rem;
			padding: 1rem;
			background: #f8f9fa;
			border-radius: 4px;
			max-height: 300px;
			overflow-y: auto;
			display: none;
		}
		.result.show { display: block; }
		.result pre {
			margin: 0;
			white-space: pre-wrap;
			word-wrap: break-word;
			font-size: 0.85rem;
		}
		.error { color: #dc3545; }
		.loading { color: #0066cc; }
	</style>
</head>
<body>
	<h1>🤖 AI Playground</h1>
	<div class="status ${aiEnabled ? "enabled" : "disabled"}">
		${aiEnabled ? "✓ AI Features Enabled" : "✗ AI Features Disabled - Set AI_FEATURES_ENABLED=true"}
	</div>

	<div class="endpoints">
		<!-- Log Summarize -->
		<div class="endpoint">
			<h3>📊 Log Summarize</h3>
			<p>Analyze logs and identify root causes</p>
			<form onsubmit="return handleSubmit(event, '/api/ai/log-summarize', 'logs-result')">
				<div class="form-group">
					<label>Logs:</label>
					<textarea name="logs" placeholder="Error: ECONNREFUSED..." required></textarea>
				</div>
				<div class="form-group">
					<label>Context (optional):</label>
					<input type="text" name="context" placeholder="Server startup issue">
				</div>
				<button type="submit">Summarize</button>
				<div id="logs-result" class="result"></div>
			</form>
		</div>

		<!-- Code Review -->
		<div class="endpoint">
			<h3>🔍 Code Review</h3>
			<p>Get patch suggestions for errors</p>
			<form onsubmit="return handleSubmit(event, '/api/ai/code-review', 'review-result')">
				<div class="form-group">
					<label>Code:</label>
					<textarea name="code" placeholder="function test() { ... }" required></textarea>
				</div>
				<div class="form-group">
					<label>Error:</label>
					<input type="text" name="error" placeholder="TypeError: ..." required>
				</div>
				<div class="form-group">
					<label>Language:</label>
					<input type="text" name="language" value="javascript">
				</div>
				<button type="submit">Review</button>
				<div id="review-result" class="result"></div>
			</form>
		</div>

		<!-- Design Tokens -->
		<div class="endpoint">
			<h3>🎨 Design Tokens</h3>
			<p>Generate Tailwind tokens from brand brief</p>
			<form onsubmit="return handleSubmit(event, '/api/ai/design-tokens', 'tokens-result')">
				<div class="form-group">
					<label>Brand Brief:</label>
					<textarea name="brief" placeholder="Modern, minimal, tactile..." required></textarea>
				</div>
				<div class="form-group">
					<label>Base Color (optional):</label>
					<input type="text" name="baseColor" placeholder="#2d5f5f">
				</div>
				<button type="submit">Generate</button>
				<div id="tokens-result" class="result"></div>
			</form>
		</div>

		<!-- Microcopy -->
		<div class="endpoint">
			<h3>✍️ Microcopy</h3>
			<p>Generate UX copy variations</p>
			<form onsubmit="return handleSubmit(event, '/api/ai/microcopy', 'copy-result')">
				<div class="form-group">
					<label>Component:</label>
					<input type="text" name="component" placeholder="Subscribe button" required>
				</div>
				<div class="form-group">
					<label>Intent:</label>
					<input type="text" name="intent" placeholder="Encourage signup" required>
				</div>
				<div class="form-group">
					<label>Tone:</label>
					<input type="text" name="tone" value="professional">
				</div>
				<button type="submit">Generate</button>
				<div id="copy-result" class="result"></div>
			</form>
		</div>

		<!-- Debug Canvas -->
		<div class="endpoint">
			<h3>🐛 Debug Canvas</h3>
			<p>Natural language debugging</p>
			<form onsubmit="return handleSubmit(event, '/api/ai/debug-canvas', 'debug-result')">
				<div class="form-group">
					<label>Query:</label>
					<textarea name="query" placeholder="Why is my server slow?" required></textarea>
				</div>
				<div class="form-group">
					<label>Context (optional):</label>
					<input type="text" name="context" placeholder="Production server">
				</div>
				<button type="submit">Debug</button>
				<div id="debug-result" class="result"></div>
			</form>
		</div>

		<!-- Stats -->
		<div class="endpoint">
			<h3>📈 Usage Stats</h3>
			<p>View AI usage statistics</p>
			<button onclick="fetchStats()">Refresh Stats</button>
			<div id="stats-result" class="result"></div>
		</div>
	</div>

	<script>
		async function handleSubmit(event, endpoint, resultId) {
			event.preventDefault();
			const form = event.target;
			const resultDiv = document.getElementById(resultId);
			const button = form.querySelector('button[type="submit"]');
			
			// Get form data
			const formData = new FormData(form);
			const data = {};
			for (const [key, value] of formData.entries()) {
				if (value) data[key] = value;
			}
			
			// Show loading
			resultDiv.className = 'result show loading';
			resultDiv.innerHTML = '<pre>Loading...</pre>';
			button.disabled = true;
			
			try {
				const response = await fetch(endpoint, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data)
				});
				
				const result = await response.json();
				
				if (response.ok) {
					resultDiv.className = 'result show';
					resultDiv.innerHTML = '<pre>' + JSON.stringify(result, null, 2) + '</pre>';
				} else {
					resultDiv.className = 'result show error';
					resultDiv.innerHTML = '<pre>Error: ' + JSON.stringify(result, null, 2) + '</pre>';
				}
			} catch (error) {
				resultDiv.className = 'result show error';
				resultDiv.innerHTML = '<pre>Error: ' + error.message + '</pre>';
			} finally {
				button.disabled = false;
			}
			
			return false;
		}
		
		async function fetchStats() {
			const resultDiv = document.getElementById('stats-result');
			resultDiv.className = 'result show loading';
			resultDiv.innerHTML = '<pre>Loading...</pre>';
			
			try {
				const response = await fetch('/api/ai/stats');
				const result = await response.json();
				
				if (response.ok) {
					resultDiv.className = 'result show';
					resultDiv.innerHTML = '<pre>' + JSON.stringify(result, null, 2) + '</pre>';
				} else {
					resultDiv.className = 'result show error';
					resultDiv.innerHTML = '<pre>Error: ' + JSON.stringify(result, null, 2) + '</pre>';
				}
			} catch (error) {
				resultDiv.className = 'result show error';
				resultDiv.innerHTML = '<pre>Error: ' + error.message + '</pre>';
			}
		}
	</script>
</body>
</html>
	`);
});

// only start server when executed directly (not when imported for tests)
const isMain = fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "");

// Server instance for programmatic control
let serverInstance = null;

/**
 * Start the MCP server programmatically
 * @param {number} port - Port to listen on
 * @returns {Promise<object>} Server instance with close method
 */
export function createServer(port = PORT) {
	return new Promise((resolve, reject) => {
		const server = app.listen(port, (err) => {
			if (err) {
				reject(err);
			} else {
				log(`MCP server listening on port ${port}`);
				serverInstance = server;
				resolve({
					server,
					close: () => new Promise((res) => server.close(res)),
					port,
				});
			}
		});
	});
}

/**
 * Stop the MCP server
 * @returns {Promise<void>}
 */
export function stopServer() {
	if (!serverInstance) {
		return Promise.resolve();
	}
	return new Promise((resolve) => {
		serverInstance.close(() => {
			serverInstance = null;
			resolve();
		});
	});
}

// Auto-start if executed directly
if (isMain) {
	createServer(PORT).catch((err) => {
		console.error("Failed to start server:", err);
		process.exit(1);
	});
}

export { app, rateLimiter, requireAuth, monitoring };

