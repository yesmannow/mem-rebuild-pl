#!/usr/bin/env node
import fs from "fs";
import express from "express";
import path from "path";

const app = express();
app.use(express.json());

const root = path.resolve(__dirname, "..");

// Prefer PORT (generic), then MCP_PORT; default to 5174 for local API dev
const PORT = process.env.PORT || process.env.MCP_PORT || 5174;
const AUTH_TOKEN = process.env.MCP_AUTH_TOKEN;

// Load config
const configPath = path.join(__dirname, "config.json");
let config = {};
try {
  config = JSON.parse(fs.readFileSync(configPath, "utf8"));
} catch (err) {
  console.warn("Could not load mcp config.json, continuing with defaults");
}

// Setup logging
const logDir = path.join(__dirname);
const logFile = path.join(logDir, "mcp.log");

function log(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  try { fs.appendFileSync(logFile, logLine); } catch (e) {}
  console.log(message);
}

// Authentication middleware
function requireAuth(req, res, next) {
  if (!AUTH_TOKEN) {
    log("WARN: MCP_AUTH_TOKEN not set - server running without auth");
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    log(`WARN: Unauthorized request from ${req.ip}`);
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (token !== AUTH_TOKEN) {
    log(`WARN: Invalid token attempt from ${req.ip}`);
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}

// List directory
app.get("/ls", (req, res) => {
  const target = path.join(root, req.query.path || ".");
  try {
    const entries = fs.readdirSync(target, { withFileTypes: true });
    res.json(entries.map(e => ({ name: e.name, dir: e.isDirectory() })));
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Read file
app.get("/read", (req, res) => {
  const file = path.join(root, req.query.path || "");
  try {
    res.send(fs.readFileSync(file, "utf8"));
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Write file (protected)
app.post("/write", requireAuth, (req, res) => {
  const file = path.join(root, req.body.path || "");
  try {
    fs.writeFileSync(file, req.body.content || "", "utf8");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Search (simple)
app.get("/search", (req, res) => {
  const query = req.query.q || "";
  // naive search implementation
  res.json({ query, result: [] });
});

// Health endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", version: config.version || "unknown" });
});

// Example portfolio endpoint (if present in incoming commit)
app.get("/api/portfolio", (req, res) => {
  // placeholder: implement portfolio logic here
  res.json({ message: "portfolio endpoint placeholder" });
});

app.listen(PORT, () => {
  log(`MCP server listening on port ${PORT}`);
});

