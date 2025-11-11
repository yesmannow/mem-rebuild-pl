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
// Prefer PORT (generic), then MCP_PORT; default to 5174 for local API dev
const PORT = process.env.PORT || process.env.MCP_PORT || 5174;
const AUTH_TOKEN = process.env.MCP_AUTH_TOKEN;

// Load config
const configPath = path.join(__dirname, "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

// Setup logging
const logDir = path.join(__dirname);
const logFile = path.join(logDir, "mcp.log");

function log(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFile, logLine);
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
    return res.status(403).json({ error: "Unauthorized" });
  }

  const token = authHeader.substring(7);
  if (token !== AUTH_TOKEN) {
    log(`WARN: Invalid token from ${req.ip}`);
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
}

// Path validation
function validatePath(filePath) {
  if (!filePath) return { valid: false, error: "Path required" };

  const normalized = path.normalize(filePath);
  const fullPath = path.resolve(root, normalized);

  // Ensure path is within root using path.relative() to prevent path traversal
  // path.relative() returns a path with '..' if the target is outside the root
  const relativePath = path.relative(root, fullPath);

  // Check if path escapes root directory (contains '..' or is absolute)
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return { valid: false, error: "Path outside root directory" };
  }

  // Check allowed paths if configured
  if (config.allowedPaths && Array.isArray(config.allowedPaths)) {
    const allowed = config.allowedPaths.some(allowedPath => {
      const allowedFull = path.resolve(root, allowedPath);
      const allowedRelative = path.relative(allowedFull, fullPath);
      // Ensure the path is within the allowed path (not escaping with '..')
      return !allowedRelative.startsWith('..') && !path.isAbsolute(allowedRelative);
    });
    if (!allowed) {
      return { valid: false, error: "Path not in allowedPaths" };
    }
  }

  return { valid: true, fullPath };
}

// Apply auth to all routes
app.use(requireAuth);

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Portfolio API - serve resume data from repo
app.get("/api/portfolio", (req, res) => {
  try {
    const candidates = [
      path.resolve(root, "src", "data", "resume.json"),
      path.resolve(root, "public", "resume.json"),
    ];
    const file = candidates.find(p => fs.existsSync(p));
    if (!file) {
      return res.status(404).json({ error: "resume.json not found" });
    }
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    const experience = Array.isArray(data?.experience) ? data.experience : [];
    res.json(experience);
  } catch (error) {
    log(`ERROR /api/portfolio: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// List directory
app.get("/ls", (req, res) => {
  try {
    const validation = validatePath(req.query.path || ".");
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const target = validation.fullPath;
    if (!fs.existsSync(target)) {
      return res.status(404).json({ error: "Path not found" });
    }

    const stat = fs.statSync(target);
    if (!stat.isDirectory()) {
      return res.status(400).json({ error: "Path is not a directory" });
    }

    const entries = fs.readdirSync(target, { withFileTypes: true });
    const result = entries.map(e => ({ name: e.name, dir: e.isDirectory() }));
    log(`GET /ls: ${req.query.path || "."}`);
    res.json(result);
  } catch (error) {
    log(`ERROR /ls: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Read file (GET)
app.get("/read", (req, res) => {
  try {
    const validation = validatePath(req.query.path);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const file = validation.fullPath;
    if (!fs.existsSync(file)) {
      return res.status(404).json({ error: "File not found" });
    }

    const content = fs.readFileSync(file, "utf8");
    log(`GET /read: ${req.query.path}`);
    res.json({ path: req.query.path, content });
  } catch (error) {
    log(`ERROR /read: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Read file (POST)
app.post("/read", (req, res) => {
  try {
    const validation = validatePath(req.body.path);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const file = validation.fullPath;
    if (!fs.existsSync(file)) {
      return res.status(404).json({ error: "File not found" });
    }

    const content = fs.readFileSync(file, "utf8");
    log(`POST /read: ${req.body.path}`);
    res.json({ path: req.body.path, content });
  } catch (error) {
    log(`ERROR /read: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Write file
app.post("/write", (req, res) => {
  try {
    if (config.readOnly) {
      log(`WARN: Write blocked - server in read-only mode`);
      return res.status(403).json({ error: "Server is in read-only mode" });
    }

    const validation = validatePath(req.body.path);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const file = validation.fullPath;
    fs.writeFileSync(file, req.body.content, "utf8");
    log(`POST /write: ${req.body.path}`);
    res.json({ ok: true, path: req.body.path });
  } catch (error) {
    log(`ERROR /write: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Search text
app.get("/search", (req, res) => {
  try {
    const term = req.query.q;
    if (!term) {
      return res.status(400).json({ error: "Query parameter 'q' required" });
    }

    let results = [];
    const searchRoot = config.allowedPaths && config.allowedPaths.length > 0
      ? config.allowedPaths.map(p => path.resolve(root, p))
      : [root];

    function walk(dir) {
      try {
        for (const entry of fs.readdirSync(dir)) {
          const full = path.join(dir, entry);
          const stat = fs.statSync(full);

          // Skip node_modules, .git, and other common exclusions
          if (entry === "node_modules" || entry === ".git" || entry.startsWith(".")) {
            continue;
          }

          if (stat.isDirectory()) {
            walk(full);
          } else {
            try {
              const text = fs.readFileSync(full, "utf8");
              if (text.includes(term)) {
                const relative = path.relative(root, full).replace(/\\/g, "/");
                results.push(relative);
              }
            } catch (err) {
              // Skip binary files or unreadable files
            }
          }
        }
      } catch (err) {
        // Skip directories we can't read
      }
    }

    searchRoot.forEach(dir => {
      if (fs.existsSync(dir)) {
        walk(dir);
      }
    });

    log(`GET /search: "${term}" (${results.length} results)`);
    res.json(results);
  } catch (error) {
    log(`ERROR /search: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, "127.0.0.1", () => {
  log(`✅ MCP Server Running → http://127.0.0.1:${PORT}`);
  if (!AUTH_TOKEN) {
    log("⚠️  WARNING: MCP_AUTH_TOKEN not set - server running without authentication");
  }
  if (config.readOnly) {
    log("📖 Server running in READ-ONLY mode");
  }
});
