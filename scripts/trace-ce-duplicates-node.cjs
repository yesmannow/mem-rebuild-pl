#!/usr/bin/env node
// CommonJS trace script (writes reports/CE_TRACE_SUMMARY.md and UNBLOCK-TODO.md)
const fs = require("fs");
const { execSync } = require("child_process");
const http = require("http");
const https = require("https");

const OUT_DIR = "reports";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const outPath = `${OUT_DIR}/CE_TRACE_SUMMARY.md`;
function append(line = "") { fs.appendFileSync(outPath, line + "\n"); }

append(`Tracing customElements.define occurrences - ${new Date().toISOString()}`);
append("");
append("=== git grep customElements.define ===");
try { append(execSync('git grep -n \"customElements.define\" || true', { encoding: "utf8" })); } catch (e) { append("(git grep failed)"); }
append("");
append("=== git grep mce-autosize-textarea ===");
try { append(execSync('git grep -n \"mce-autosize-textarea\" || true', { encoding: "utf8" })); } catch (e) { append("(git grep failed)"); }

append("");
append("=== node_modules scan (may be slow) ===");
try {
  try {
    append(execSync('rg -n \"mce-autosize-textarea|customElements.define\" node_modules || true', { encoding: "utf8" }));
  } catch (e) {
    append(execSync('grep -RIn --line-number \"mce-autosize-textarea\\|customElements.define\" node_modules || true', { encoding: "utf8" }));
  }
} catch (e) { append("(node_modules scan failed or node_modules missing)"); }

append("");
append("=== served HTML client scripts (local) ===");

function fetchHtml(url, cb) {
  const lib = url.startsWith("https") ? https : http;
  const req = lib.get(url, (res) => {
    let data = "";
    res.on("data", (c) => data += c);
    res.on("end", () => cb(null, { status: res.statusCode, body: data }));
  });
  req.on("error", (err) => cb(err));
  req.setTimeout(5000, () => { req.abort(); cb(new Error("timeout")); });
}

const localUrl = "http://localhost:5173";
fetchHtml(localUrl, (err, result) => {
  if (err) {
    append("Could not fetch local index (server down or fetch error): " + (err.message || err));
  } else {
    append(`URL: ${localUrl}`);
    append(`HTTP status: ${result.status}`);
    append("Found script src tags:");
    const scripts = [...result.body.matchAll(/<script[^>]*src=[\"']([^\"']+)[\"'][^>]*>/gi)];
    scripts.forEach(m => append(" - " + m[1]));
    append("Found /@vite/client mentions in HTML: " + (result.body.includes("/@vite/client") ? "yes" : "no"));
    append("--- HTML snippet (first 1000 chars) ---");
    append(result.body.slice(0, 1000));
  }

  append("");
  append('=== files referencing /@vite/client ===');
  try { append(execSync('git grep -n \"/@vite/client\" || true', { encoding: "utf8" })); } catch (e) { append("(git grep /@vite/client failed)"); }

  append("");
  append("=== rel=preload tags found in repo ===");
  try {
    try { append(execSync('rg -n \"<link[^>]+rel=[\\\"\\']preload[\\\"\\']\" || true', { encoding: "utf8" })); }
    catch (e) { append(execSync('grep -RIn --line-number \"<link[^>]*rel=[\\\"\\']preload[\\\"\\']\" || true', { encoding: "utf8" })); }
  } catch (e) { append("(preload grep failed)"); }

  const todo = `# UNBLOCK TODO (auto-generated)

Timestamp: ${new Date().toISOString()}

1. Inspect CE_TRACE_SUMMARY.md for locations defining 'mce-autosize-textarea' and customElements.define occurrences.
2. If duplicates exist in node_modules, record package name/version and consider upgrading or filing an upstream issue.
3. If duplicates come from injected overlay or multiple dev servers, ensure only one /@vite/client is present and restart dev servers.
4. Correct any rel=preload entries with improper as values found in CE_TRACE_SUMMARY.md.
5. After fixes, remove temporary CE guard and re-run npm run lint && npm run build.
`;
  fs.writeFileSync(`${OUT_DIR}/UNBLOCK-TODO.md`, todo, "utf8");

  console.log("Wrote", outPath, "and UNBLOCK-TODO.md");
});
