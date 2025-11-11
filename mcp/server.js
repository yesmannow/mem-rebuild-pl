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



// load config.json safely

let config = {};

try {

  const configPath = path.join(__dirname, "config.json");

  config = JSON.parse(fs.readFileSync(configPath, "utf8"));

} catch (err) {

  console.warn("WARN: could not load mcp/config.json, using defaults");

  config = { readOnly: true, allowedPaths: ["src", "public", "scripts", "content"] };

}



// helper: check allowedPaths and prevent traversal

function safeJoin(rootDir, requestedPath) {

  const joined = path.join(rootDir, requestedPath || ".");

  const resolved = path.resolve(joined);

  if (!resolved.startsWith(rootDir)) {

    throw new Error("Path traversal detected");

  }

  // ensure requested path is within one of allowedPaths if configured

  if (Array.isArray(config.allowedPaths) && config.allowedPaths.length) {

    const isAllowed = config.allowedPaths.some(p => {

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

  console.log(`[mcp:${ts}] ${msg}`);

}



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

  res.json({ status: "ok", version: config.version || "unknown" });

});



app.get("/ls", (req, res) => {

  try {

    const p = req.query.path || ".";

    const target = safeJoin(root, p);

    const entries = fs.readdirSync(target, { withFileTypes: true });

    res.json(entries.map(e => ({ name: e.name, dir: e.isDirectory() })));

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

    if (config.readOnly) return res.status(403).json({ error: "Server is readOnly" });

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



app.listen(PORT, () => {

  log(`MCP server listening on port ${PORT}`);

});

