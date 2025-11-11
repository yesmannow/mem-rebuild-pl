#!/usr/bin/env node
/**
 * Minimal MCP CLI wrapper to dispatch to npm scripts with optional --dry-run.
 * Usage: node scripts/mcp-cli.js <command> [--dry-run] [-- ...args]
 *
 * Commands:
 *   start        Start MCP server (npm run mcp:start)
 *   dev          Start MCP server in dev mode
 *   test         Run tests if available (falls back gracefully)
 *   lint         Run ESLint via existing lint script
 *   repo-audit   Run repository audit scripts (composite)
 *   create-prs   Run ./create-prs.sh if present; otherwise guide user
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function readPackageJson() {
  const pkgPath = path.join(repoRoot, "package.json");
  try {
    const raw = fs.readFileSync(pkgPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function run(cmd, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      ...options,
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

function printUsage() {
  console.log(
    [
      "mcp CLI - helper commands",
      "",
      "Usage:",
      "  mcp <command> [--dry-run] [-- ...args]",
      "",
      "Commands:",
      "  start        Start MCP server (node mcp/server.js)",
      "  dev          Start MCP server in dev mode (adds --dev)",
      "  test         Run tests if available (falls back to a11y:ci)",
      "  lint         Run eslint via existing lint script (passes through args)",
      "  repo-audit   Run repository audits (composite of audit:* scripts)",
      "  create-prs   Execute ./create-prs.sh if present; otherwise print guidance",
      "",
      "Options:",
      "  --dry-run    Print what would run, but don't execute",
      "",
      "Examples:",
      "  npm run mcp:start",
      "  node scripts/mcp-cli.js repo-audit --dry-run",
    ].join("\n")
  );
}

async function main() {
  const pkg = readPackageJson();
  const [, , rawCommand, ...rest] = process.argv;
  if (!rawCommand || rawCommand === "-h" || rawCommand === "--help") {
    printUsage();
    process.exit(0);
  }

  // Global flags
  const dryRun = rest.includes("--dry-run");
  // Capture args after a standalone "--" to pass to underlying tools/scripts
  const dashDashIndex = rest.indexOf("--");
  const passthroughArgs = dashDashIndex >= 0 ? rest.slice(dashDashIndex + 1) : [];

  const logPlanned = (cmd, args) => {
    console.log(`[dry-run] ${cmd} ${args.join(" ")}`.trim());
  };

  const runOrEcho = async (cmd, args = []) => {
    if (dryRun) {
      logPlanned(cmd, args);
      return;
    }
    await run(cmd, args);
  };

  const command = rawCommand.toLowerCase();
  try {
    switch (command) {
      case "start": {
        const args = ["mcp/server.js"];
        await runOrEcho("node", args);
        break;
      }
      case "dev": {
        const args = ["mcp/server.js", "--dev"];
        await runOrEcho("node", args);
        break;
      }
      case "test": {
        // Prefer an explicit "test" script; otherwise try a11y:ci; otherwise no-op.
        const hasTest = pkg?.scripts && typeof pkg.scripts.test === "string";
        const hasA11y = pkg?.scripts && typeof pkg.scripts["a11y:ci"] === "string";
        if (hasTest) {
          await runOrEcho(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "test", "--", ...passthroughArgs]);
        } else if (hasA11y) {
          await runOrEcho(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "a11y:ci", "--", ...passthroughArgs]);
        } else {
          console.log("No tests configured. Skipping.");
        }
        break;
      }
      case "lint": {
        const hasLint = pkg?.scripts && typeof pkg.scripts.lint === "string";
        if (!hasLint) {
          console.log("No lint script found in package.json.");
          break;
        }
        // For dry-run, encourage non-mutating linting (avoid --fix)
        const forwarded = dryRun ? ["--", "--max-warnings=0", ...passthroughArgs] : ["--", ...passthroughArgs];
        await runOrEcho(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "lint", ...forwarded]);
        break;
      }
      case "repo-audit": {
        const steps = [
          ["run", "audit:all"],
          ["run", "audit:mime"],
          ["run", "audit:duplicates"],
          ["run", "audit:unused"],
          ["run", "audit:assets"],
          ["run", "audit:moodboards"],
          ["run", "audit:svgs"],
          ["run", "audit:animations"],
        ];
        for (const step of steps) {
          const args = [...step];
          if (passthroughArgs.length) args.push("--", ...passthroughArgs);
          if (dryRun) {
            logPlanned(process.platform === "win32" ? "npm.cmd" : "npm", args);
          } else {
            await run(process.platform === "win32" ? "npm.cmd" : "npm", args);
          }
        }
        break;
      }
      case "create-prs": {
        // Attempt to run a top-level create-prs.sh if present; otherwise inform the user.
        const candidates = [
          path.join(repoRoot, "create-prs.sh"),
          path.join(repoRoot, "scripts", "create-prs.sh"),
        ];
        const target = candidates.find((p) => fs.existsSync(p));
        if (!target) {
          console.log(
            "No create-prs.sh found. Add one at project root or scripts/create-prs.sh, then re-run.\n" +
              "Example expected behavior: generate PRs across branches from a template.\n" +
              "Tip: use --dry-run first to preview actions."
          );
          process.exit(0);
        }
        if (dryRun) {
          logPlanned(process.platform === "win32" ? "bash.exe" : "bash", [target, ...passthroughArgs]);
          break;
        }
        // Prefer bash if available on PATH; on Windows with Git Bash, bash.exe is commonly present
        const bashCmd = process.platform === "win32" ? "bash.exe" : "bash";
        await run(bashCmd, [target, ...passthroughArgs]);
        break;
      }
      default:
        console.error(`Unknown command: ${rawCommand}\n`);
        printUsage();
        process.exit(1);
    }
  } catch (err) {
    console.error(String(err));
    process.exit(1);
  }
}

main();


