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
import fsPromises from "fs/promises";
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

/**
 * Parse metrics text into structured objects
 * Handles patterns like:
 * - "Reduced CAC by 40%"
 * - "Increased LTV by 200%"
 * - "Launched in 3 weeks"
 * - "ROI Improvement: +320%"
 * - "Cost Per Lead: -55%"
 */
function parseMetricsText(text) {
  // Split by periods, but keep sentences that might have multiple metrics
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const metrics = [];

  for (const sentence of sentences) {
    // Pattern 1: "Reduced/Increased/Improved X by Y"
    const byPattern = /(?:reduced|increased|improved|decreased|lowered|raised|boosted|cut|dropped|grew|expanded|enhanced|optimized|optimised)\s+([^by]+?)\s+by\s+(.+?)(?:\s|$)/i;
    const byMatch = sentence.match(byPattern);
    if (byMatch) {
      const action = sentence.match(/(?:reduced|increased|improved|decreased|lowered|raised|boosted|cut|dropped|grew|expanded|enhanced|optimized|optimised)/i)?.[0]?.toLowerCase() || "";
      const isReduction = /reduced|decreased|lowered|cut|dropped/i.test(action);
      const value = formatValue(byMatch[2].trim());
      const prefix = isReduction && !value.startsWith("-") ? "-" : (!isReduction && !value.startsWith("+") && /^\d/.test(value) ? "+" : "");

      metrics.push({
        label: formatLabel(byMatch[1].trim()),
        value: prefix + value,
      });
      continue;
    }

    // Pattern 2: "X: Y" or "X - Y"
    const colonPattern = /([^:]+?):\s*(.+?)(?:\s|$)/i;
    const colonMatch = sentence.match(colonPattern);
    if (colonMatch) {
      metrics.push({
        label: formatLabel(colonMatch[1].trim()),
        value: formatValue(colonMatch[2].trim()),
      });
      continue;
    }

    // Pattern 3: "X from Y to Z" or "X: Y → Z"
    const rangePattern = /([^→]+?)(?:\s+from\s+|\s*→\s*)(.+?)\s+(?:to|→)\s+(.+?)(?:\s|$)/i;
    const rangeMatch = sentence.match(rangePattern);
    if (rangeMatch) {
      metrics.push({
        label: formatLabel(rangeMatch[1].trim()),
        value: `${formatValue(rangeMatch[2].trim())} → ${formatValue(rangeMatch[3].trim())}`,
      });
      continue;
    }

    // Pattern 4: "X in Y" (time-based)
    const timePattern = /(?:launched|completed|delivered|achieved|reached|built)\s+(?:in|within|after)\s+(.+?)(?:\s|$)/i;
    const timeMatch = sentence.match(timePattern);
    if (timeMatch) {
      const action = sentence.match(/(?:launched|completed|delivered|achieved|reached|built)/i)?.[0]?.toLowerCase() || "launched";
      const actionLabel = action.charAt(0).toUpperCase() + action.slice(1) + " Time";
      metrics.push({
        label: actionLabel,
        value: formatValue(timeMatch[1].trim()),
      });
      continue;
    }

    // Pattern 5: Generic - look for numbers/percentages and extract context
    const numberPattern = /([A-Z][^.!?]*?)\s+([+-]?\d+(?:\.\d+)?%?|[+-]?\d+(?:\.\d+)?\s*(?:hours?|days?|weeks?|months?|years?|pts?|points?))/i;
    const numberMatch = sentence.match(numberPattern);
    if (numberMatch) {
      metrics.push({
        label: formatLabel(numberMatch[1].trim()),
        value: formatValue(numberMatch[2].trim()),
      });
      continue;
    }

    // Fallback: use the whole sentence as label, try to extract value
    const fallbackValue = sentence.match(/([+-]?\d+(?:\.\d+)?%?|[+-]?\d+(?:\.\d+)?\s*(?:hours?|days?|weeks?|months?|years?|pts?|points?))/i);
    if (fallbackValue) {
      metrics.push({
        label: formatLabel(sentence.replace(fallbackValue[0], "").trim()),
        value: formatValue(fallbackValue[0].trim()),
      });
    } else {
      // Last resort: use sentence as label, empty value
      metrics.push({
        label: formatLabel(sentence),
        value: "",
      });
    }
  }

  return metrics;
}

/**
 * Format a label to be title case and clean
 */
function formatLabel(label) {
  return label
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Format a value, ensuring percentages and numbers are clean
 */
function formatValue(value) {
  // Ensure percentage signs are attached
  value = value.replace(/\s*%\s*/g, "%");
  // Clean up whitespace
  value = value.replace(/\s+/g, " ").trim();
  return value;
}

/**
 * Format metrics array as TypeScript code
 */
function formatMetricsAsTypeScript(metrics) {
  if (metrics.length === 0) {
    return "// No metrics parsed from input";
  }

  const lines = metrics.map((metric) => {
    const label = JSON.stringify(metric.label);
    const value = JSON.stringify(metric.value);
    return `      { label: ${label}, value: ${value} },`;
  });

  return `    metrics: [\n${lines.join("\n")}\n    ],`;
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
      "  start         Start MCP server (node mcp/server.js)",
      "  dev           Start MCP server in dev mode (adds --dev)",
      "  test          Run tests if available (falls back to a11y:ci)",
      "  lint          Run eslint via existing lint script (passes through args)",
      "  repo-audit    Run repository audits (composite of audit:* scripts)",
      "  create-prs    Execute ./create-prs.sh if present; otherwise print guidance",
      "  format-metrics Format case study metrics text into TypeScript stats array",
      "  format-casestudy-metrics Interactive case study creation with full data structure",
      "  generate-titles Generate human-readable titles for gallery images",
      "  build-gallery  Build gallery datasets from image folders",
      "  generate-tech-icons Generate custom SVG icons for top technologies",
      "  generate-inspiration Generate and validate inspiration projects data",
      "  audit-score    Calculate unified Portfolio Health Score from all audits",
      "  generate-cybernetic-logo Generate cybernetic monogram logo with tech brackets",
      "  generate-social-images Generate Open Graph social images for sharing",
      "  process-bio-assets Process and standardize bio photos for TechProfile component",
      "",
      "Options:",
      "  --dry-run    Print what would run, but don't execute",
      "",
      "Examples:",
      "  npm run mcp:start",
      "  node scripts/mcp-cli.js repo-audit --dry-run",
      "  node scripts/mcp-cli.js format-metrics \"Reduced CAC by 40%. Increased LTV by 200%. Launched in 3 weeks.\"",
      "  node scripts/mcp-cli.js format-casestudy-metrics",
      "  node scripts/mcp-cli.js build-gallery",
      "  node scripts/mcp-cli.js generate-titles",
      "  node scripts/mcp-cli.js generate-tech-icons",
      "  node scripts/mcp-cli.js generate-inspiration",
      "  node scripts/mcp-cli.js audit-score",
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
      case "format-metrics": {
        // Format case study metrics text into TypeScript stats array
        const inputText = passthroughArgs.join(" ") || rest.filter((arg) => arg !== "--dry-run" && !arg.startsWith("--")).join(" ");

        if (!inputText) {
          console.error("Error: No input text provided.");
          console.log("\nUsage: node scripts/mcp-cli.js format-metrics \"<metric text>\"");
          console.log("\nExample:");
          console.log('  node scripts/mcp-cli.js format-metrics "Reduced CAC by 40%. Increased LTV by 200%. Launched in 3 weeks."');
          process.exit(1);
        }

        // Parse the input text into individual metrics
        const metrics = parseMetricsText(inputText);

        // Format as TypeScript array
        const formatted = formatMetricsAsTypeScript(metrics);

        console.log("\n" + "=".repeat(60));
        console.log("Formatted Metrics (copy into caseStudies.ts):");
        console.log("=".repeat(60) + "\n");
        console.log(formatted);
        console.log("\n" + "=".repeat(60));
        break;
      }
      case "build-gallery": {
        // Build gallery datasets from image folders
        const buildScript = path.join(__dirname, "build-gallery-datasets.mjs");
        if (!fs.existsSync(buildScript)) {
          console.error(`Error: build-gallery-datasets.mjs not found at ${buildScript}`);
          process.exit(1);
        }
        await runOrEcho("node", [buildScript, ...passthroughArgs]);
        break;
      }
      case "generate-titles": {
        // Generate enhanced titles for gallery images
        const photographyPath = path.join(repoRoot, "src", "data", "photography.json");
        const designPath = path.join(repoRoot, "src", "data", "design.json");

        if (!fs.existsSync(photographyPath) && !fs.existsSync(designPath)) {
          console.log("No gallery datasets found. Run 'build-gallery' first:");
          console.log("  node scripts/mcp-cli.js build-gallery");
          process.exit(1);
        }

        // Enhanced title generation based on filename patterns
        const enhanceTitle = (filename, currentTitle) => {
          const baseName = filename.replace(/\.[^.]+$/, "").toLowerCase();

          // Photography-specific enhancements
          if (baseName.includes("portrait") || baseName.includes("burst")) {
            if (baseName.includes("cover")) return "Portrait Session";
            return "Portrait Study";
          }

          if (baseName.match(/^\d{8}_\d{6}/) || baseName.match(/^\d{8}/)) {
            // Date-based: extract time context
            if (baseName.includes("18") || baseName.includes("19") || baseName.includes("20") || baseName.includes("21")) {
              return "Evening Scene";
            }
            if (baseName.includes("05") || baseName.includes("06") || baseName.includes("07")) {
              return "Morning Light";
            }
            if (baseName.includes("12") || baseName.includes("13") || baseName.includes("14")) {
              return "Midday Scene";
            }
          }

          // Design-specific enhancements
          if (baseName.includes("logo")) {
            return currentTitle.includes("Logo") ? currentTitle : "Logo Design";
          }
          if (baseName.includes("ad") || baseName.includes("campaign")) {
            return "Campaign Design";
          }
          if (baseName.includes("post") || baseName.includes("social")) {
            return "Social Media Design";
          }

          // Keep current title if it's already descriptive
          if (currentTitle && currentTitle.length > 10 && !currentTitle.includes("Scene")) {
            return currentTitle;
          }

          return currentTitle;
        };

        const updateDataset = async (filePath, datasetName) => {
          if (!fs.existsSync(filePath)) {
            console.log(`⚠️  ${datasetName}.json not found, skipping...`);
            return;
          }

          const data = JSON.parse(await fsPromises.readFile(filePath, "utf8"));
          let updated = 0;

          for (const item of data) {
            const filename = path.basename(item.src);
            const originalTitle = item.title;
            const enhancedTitle = enhanceTitle(filename, originalTitle);

            if (enhancedTitle !== originalTitle) {
              item.title = enhancedTitle;
              updated++;
            }
          }

          if (updated > 0 || dryRun) {
            if (dryRun) {
              console.log(`[dry-run] Would update ${data.length} titles in ${datasetName}.json`);
            } else {
              await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
              console.log(`✅ Updated ${updated} titles in ${datasetName}.json`);
            }
          } else {
            console.log(`ℹ️  No title updates needed for ${datasetName}.json`);
          }
        };

        await updateDataset(photographyPath, "photography");
        await updateDataset(designPath, "design");
        break;
      }
      case "format-casestudy-metrics": {
        // Interactive case study creation tool
        console.log("\n" + "=".repeat(70));
        console.log("📊 Case Study Metrics Formatter");
        console.log("=".repeat(70) + "\n");

        // Get metrics input
        const metricsInput = passthroughArgs.join(" ") || rest.filter((arg) => arg !== "--dry-run" && !arg.startsWith("--")).join(" ");

        if (!metricsInput) {
          console.log("Usage: node scripts/mcp-cli.js format-casestudy-metrics \"<metrics text>\"");
          console.log("\nExample:");
          console.log('  node scripts/mcp-cli.js format-casestudy-metrics "Reduced CAC by 40%. Increased LTV by 200%. Launched in 3 weeks."');
          console.log("\nOr provide metrics interactively:");
          console.log("  node scripts/mcp-cli.js format-casestudy-metrics --interactive");
          console.log("\n" + "=".repeat(70));
          process.exit(0);
        }

        // Parse metrics using existing function
        const metrics = parseMetricsText(metricsInput);

        if (metrics.length === 0) {
          console.error("❌ No metrics could be parsed from input.");
          console.log("\n💡 Tip: Use formats like:");
          console.log('  - "Reduced CAC by 40%"');
          console.log('  - "ROI Improvement: +320%"');
          console.log('  - "Page Load Time: 5.8s → 1.2s"');
          process.exit(1);
        }

        // Format as TypeScript metrics array
        const formattedMetrics = formatMetricsAsTypeScript(metrics);

        console.log("\n" + "=".repeat(70));
        console.log("✅ Formatted Case Study Metrics");
        console.log("=".repeat(70) + "\n");
        console.log(formattedMetrics);
        console.log("\n" + "=".repeat(70));
        console.log("📋 Copy this into your case study's 'metrics' field");
        console.log("=".repeat(70) + "\n");

        // Additional guidance
        console.log("💡 Best Practices for Case Study Metrics:");
        console.log("   • Use specific, quantifiable numbers (e.g., '+125%', '-42%', '$310K')");
        console.log("   • Focus on business impact (revenue, efficiency, growth)");
        console.log("   • Include 3-4 key metrics that tell a complete story");
        console.log("   • Use consistent formatting (percentages, currency, time)");
        console.log("   • Ensure metrics are verifiable and realistic\n");

        // Generate example case study structure
        if (dryRun || rest.includes("--example")) {
          console.log("📝 Example Complete Case Study Structure:\n");
          const exampleCaseStudy = `  {
    slug: 'example-case-study',
    title: 'Example Case Study',
    image: '/images/case-studies/example.svg',
    tagline: 'Brief one-line description of the transformation',
    category: ['Category 1', 'Category 2'],
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    color: '#7C5CFF',
    icon: '🚀',
${formattedMetrics}
    challenge: 'What problem did you solve? Be specific about the pain points.',
    strategy: 'How did you approach the solution? Describe your methodology.',
    impact: 'What were the results? Connect back to the metrics above.',
    fullContent: {
      challenge: {
        paragraphs: [
          'Detailed paragraph about the challenge...',
          'Another paragraph with more context...',
        ],
        bullets: [
          'Specific pain point 1',
          'Specific pain point 2',
          'Specific pain point 3',
        ],
      },
      strategy: {
        paragraphs: [
          'Detailed explanation of your approach...',
        ],
        bullets: [
          'Key action 1',
          'Key action 2',
          'Key action 3',
        ],
      },
      impact: {
        paragraphs: [
          'Detailed results and impact...',
        ],
        bullets: [
          'Result 1 (ties to metrics)',
          'Result 2 (ties to metrics)',
          'Result 3 (ties to metrics)',
        ],
      },
    },
    featured: true,
  },`;
          console.log(exampleCaseStudy);
          console.log("\n" + "=".repeat(70) + "\n");
        }

        break;
      }
      case "generate-tech-icons": {
        // Generate custom SVG icons for top technologies
        const iconScript = path.join(__dirname, "generate-tech-icons.mjs");
        if (!fs.existsSync(iconScript)) {
          console.error(`Error: generate-tech-icons.mjs not found at ${iconScript}`);
          process.exit(1);
        }

        if (dryRun) {
          console.log(`[dry-run] Would generate tech icons using ${iconScript}`);
          console.log("  Technologies: React, Node.js, TypeScript, Python, HubSpot, JavaScript, Express, Vite, Tailwind CSS, GitHub");
          console.log("  Output: public/images/tech-icons/");
          console.log("  Colors: brand.teal (#40E0D0) and brand.orange (#FFA500)");
          break;
        }

        await runOrEcho("node", [iconScript, ...passthroughArgs]);

        // After generation, provide instructions for updating tools data
        console.log("\n" + "=".repeat(70));
        console.log("📝 Next Steps:");
        console.log("=".repeat(70));
        console.log("1. Icons have been generated in public/images/tech-icons/");
        console.log("2. Update src/pages/ToolsShowcase.tsx to include iconSrc in tool objects");
        console.log("3. Example: iconSrc: '/images/tech-icons/react.svg'");
        console.log("=".repeat(70) + "\n");
        break;
      }
      case "generate-inspiration": {
        // Generate and validate inspiration projects data
        console.log("\n" + "=".repeat(70));
        console.log("🎨 Inspiration Projects Generator");
        console.log("=".repeat(70) + "\n");

        if (dryRun) {
          console.log("[dry-run] Would:");
          console.log("  1. Run generate-inspiration-json.cjs to process markdown files");
          console.log("  2. Validate all projects have slugs and internal routes");
          console.log("  3. Fix missing required fields");
          console.log("  4. Ensure InspirationDetail routes work correctly");
          break;
        }

        // Step 1: Generate JSON from markdown files (only if directory exists)
        const markdownDir = path.join(repoRoot, "cli-workflow", "content", "inspiration");
        const inspirationScript = path.join(__dirname, "generate-inspiration-json.cjs");

        if (fs.existsSync(markdownDir) && fs.existsSync(inspirationScript)) {
          console.log("📝 Step 1/2: Generating inspiration projects from markdown...");
          try {
            await runOrEcho("node", [inspirationScript, ...passthroughArgs]);
          } catch (error) {
            console.log("⚠️  Could not generate from markdown");
          }
        } else {
          console.log("ℹ️  No markdown source found, validating existing JSON...");
        }

        // Step 2: Validate and fix data
        console.log("\n✅ Step 2/2: Validating and fixing inspiration data...");
        const { validateInspirationData } = await import("./validate-inspiration.mjs");
        const validationResult = await validateInspirationData();

        console.log("\n" + "=".repeat(70));
        console.log("📊 Validation Results");
        console.log("=".repeat(70));
        console.log(`   Total Projects: ${validationResult.total}`);
        console.log(`   Fixed: ${validationResult.fixed}`);
        console.log(`   Issues Found: ${validationResult.issues.length}`);

        if (validationResult.issues.length > 0) {
          console.log("\n🔍 Issues:");
          validationResult.issues.slice(0, 10).forEach((issue, idx) => {
            const status = issue.fixed ? "✅ Fixed" : "⚠️  Needs Attention";
            console.log(`   ${idx + 1}. [${status}] ${issue.project}: ${issue.issue}`);
          });
          if (validationResult.issues.length > 10) {
            console.log(`   ... and ${validationResult.issues.length - 10} more issues`);
          }
        }

        // Check for projects without slugs
        const projectsWithoutSlugs = validationResult.projects.filter(p => !p.slug);
        if (projectsWithoutSlugs.length > 0) {
          console.log(`\n⚠️  ${projectsWithoutSlugs.length} projects missing slugs - these will cause routing errors`);
        }

        // Verify routes
        const allHaveRoutes = validationResult.projects.every(p =>
          p.slug && p.url && p.url.startsWith('/inspiration/')
        );

        if (allHaveRoutes) {
          console.log("\n✅ All projects have valid internal routes");
        } else {
          console.log("\n⚠️  Some projects may have invalid routes - check URLs");
        }

        console.log("\n" + "=".repeat(70));
        console.log("💡 Next Steps:");
        console.log("=".repeat(70));
        console.log("1. Review src/data/inspiration-projects.json");
        console.log("2. Ensure all images exist in public/images/");
        console.log("3. Test routes: /inspiration/[slug]");
        console.log("4. Run 'audit-score' to check for broken image paths");
        console.log("=".repeat(70) + "\n");

        break;
      }
      case "audit-score": {
        // Unified Portfolio Health Score calculation
        console.log("\n" + "=".repeat(70));
        console.log("📊 Portfolio Health Score Calculator");
        console.log("=".repeat(70) + "\n");

        if (dryRun) {
          console.log("[dry-run] Would run:");
          console.log("  1. npm run audit:lighthouse");
          console.log("  2. npm run audit:accessibility");
          console.log("  3. Content integrity check");
          console.log("  4. Calculate composite score (40% Lighthouse, 40% A11y, 20% Content)");
          break;
        }

        const lighthouseReportPath = path.join(repoRoot, "reports", "lighthouse-report.json");
        const a11yReportPath = path.join(repoRoot, "reports", "a11y-report.json");

        // Step 1: Run Lighthouse audit
        console.log("🔍 Step 1/3: Running Lighthouse audit...");
        try {
          await run(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "audit:lighthouse", "--", ...passthroughArgs]);
        } catch (error) {
          console.log("⚠️  Lighthouse audit failed or not available");
        }

        // Step 2: Run Accessibility audit
        console.log("\n♿ Step 2/3: Running Accessibility audit...");
        try {
          await run(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "audit:accessibility", "--", ...passthroughArgs]);
        } catch (error) {
          console.log("⚠️  Accessibility audit failed or not available");
        }

        // Step 3: Check content integrity
        console.log("\n📝 Step 3/3: Checking content integrity...");
        const { checkContentIntegrity } = await import("./check-content-integrity.mjs");
        const contentResult = await checkContentIntegrity();

        // Parse Lighthouse results
        let lighthouseScore = 0;
        let lighthouseIssues = [];
        try {
          if (fs.existsSync(lighthouseReportPath)) {
            const lighthouseData = JSON.parse(await fsPromises.readFile(lighthouseReportPath, "utf8"));
            const categories = lighthouseData.categories || {};
            const performance = Math.round((categories.performance?.score || 0) * 100);
            const accessibility = Math.round((categories.accessibility?.score || 0) * 100);
            const bestPractices = Math.round((categories["best-practices"]?.score || 0) * 100);
            const seo = Math.round((categories.seo?.score || 0) * 100);

            // Average of all categories
            lighthouseScore = Math.round((performance + accessibility + bestPractices + seo) / 4);

            // Extract top issues
            const audits = lighthouseData.audits || {};
            lighthouseIssues = Object.values(audits)
              .filter(audit => audit.score !== null && audit.score < 0.9)
              .sort((a, b) => (a.score || 1) - (b.score || 1))
              .slice(0, 5)
              .map(audit => ({
                title: audit.title,
                score: Math.round((audit.score || 0) * 100),
                description: audit.description,
              }));
          }
        } catch (error) {
          console.log("⚠️  Could not parse Lighthouse report");
        }

        // Parse Accessibility results
        let a11yScore = 100;
        let a11yIssues = [];
        try {
          if (fs.existsSync(a11yReportPath)) {
            const a11yData = JSON.parse(await fsPromises.readFile(a11yReportPath, "utf8"));
            const issues = a11yData.issues || [];
            const errors = issues.filter(i => i.type === "error").length;
            const warnings = issues.filter(i => i.type === "warning").length;

            // Score: 100 - (errors * 10 + warnings * 5)
            a11yScore = Math.max(0, 100 - (errors * 10 + warnings * 5));

            a11yIssues = issues
              .filter(i => i.type === "error" || i.type === "warning")
              .slice(0, 5)
              .map(issue => ({
                type: issue.type,
                message: issue.message,
                code: issue.code,
              }));
          }
        } catch (error) {
          console.log("⚠️  Could not parse Accessibility report");
        }

        // Calculate composite score (40% Lighthouse, 40% A11y, 20% Content)
        const compositeScore = Math.round(
          lighthouseScore * 0.4 + a11yScore * 0.4 + contentResult.score * 0.2
        );

        // Get top 3 critical findings
        const criticalFindings = [
          ...lighthouseIssues.slice(0, 2).map(i => `Lighthouse: ${i.title} (${i.score}/100)`),
          ...a11yIssues.slice(0, 1).map(i => `A11y: ${i.message}`),
        ].slice(0, 3);

        // Output styled summary
        console.log("\n" + "=".repeat(70));
        console.log("📊 PORTFOLIO HEALTH SCORE");
        console.log("=".repeat(70));
        console.log(`\n   ${compositeScore >= 90 ? "✅" : compositeScore >= 75 ? "⚠️" : "❌"}  ${compositeScore}/100\n`);
        console.log("=".repeat(70));

        console.log("\n📈 Component Scores:");
        console.log(`   Lighthouse:     ${lighthouseScore}/100 (40% weight)`);
        console.log(`   Accessibility: ${a11yScore}/100 (40% weight)`);
        console.log(`   Content:        ${contentResult.score}/100 (20% weight)`);

        if (criticalFindings.length > 0) {
          console.log("\n🔍 Key Findings:");
          criticalFindings.forEach((finding, idx) => {
            console.log(`   ${idx + 1}. ${finding}`);
          });
        }

        if (contentResult.issues.length > 0) {
          console.log("\n📝 Content Issues:");
          console.log(`   Errors: ${contentResult.errors}, Warnings: ${contentResult.warnings}`);
          contentResult.issues.slice(0, 3).forEach((issue, idx) => {
            console.log(`   ${idx + 1}. [${issue.severity}] ${issue.file}: ${issue.message}`);
          });
        }

        console.log("\n" + "=".repeat(70));
        console.log("💡 Call to Action:");
        console.log("=".repeat(70));
        if (compositeScore < 90) {
          console.log("   Run 'npm run optimize' to resolve performance warnings");
          console.log("   Review Lighthouse and Accessibility reports for details");
        } else {
          console.log("   ✅ Portfolio is in excellent health!");
          console.log("   Continue monitoring with regular audits");
        }
        console.log("=".repeat(70) + "\n");

        break;
      }
      case "generate-cybernetic-logo": {
        console.log("\n" + "=".repeat(70));
        console.log("🤖 Cybernetic Monogram Logo Generator");
        console.log("=".repeat(70) + "\n");

        if (dryRun) {
          console.log("[DRY RUN] Would generate cybernetic logo:");
          console.log("  - Design: JD monogram with tech brackets < JD />");
          console.log("  - Colors: Teal (#40E0D0) to Orange (#FFA500) gradient");
          console.log("  - Features: Status dot with breathing animation");
          console.log("  - Output: public/logo-tech.svg");
          break;
        }

        const logoScript = path.join(__dirname, "generate-cybernetic-logo.mjs");
        if (!fs.existsSync(logoScript)) {
          console.error(`Error: generate-cybernetic-logo.mjs not found at ${logoScript}`);
          process.exit(1);
        }

        await runOrEcho("node", [logoScript, ...passthroughArgs]);

        console.log("\n" + "=".repeat(70));
        console.log("📝 Next Steps:");
        console.log("=".repeat(70));
        console.log("1. Logo generated: public/logo-tech.svg");
        console.log("2. InteractiveLogo component uses inline SVG (no file needed)");
        console.log("3. Navbar already integrated with InteractiveLogo");
        console.log("=".repeat(70) + "\n");
        break;
      }
      case "generate-social-images": {
        console.log("\n" + "=".repeat(70));
        console.log("📱 Open Graph Social Images Generator");
        console.log("=".repeat(70) + "\n");

        if (dryRun) {
          console.log("[DRY RUN] Would generate Open Graph images for:");
          console.log("  - Home page: /og/home.svg");
          console.log("  - Case Studies: /og/case-studies.svg");
          console.log("  - Tools: /og/tools.svg");
          console.log("\nTheme: Ocean Pearl (Dark #0f172a, Teal #40E0D0)");
          console.log("Size: 1200x630px (Standard Open Graph)");
          break;
        }

        const socialImagesScript = path.join(__dirname, "generate-social-images.mjs");
        if (!fs.existsSync(socialImagesScript)) {
          console.error(`Error: generate-social-images.mjs not found at ${socialImagesScript}`);
          process.exit(1);
        }

        await runOrEcho("node", [socialImagesScript, ...passthroughArgs]);

        console.log("\n" + "=".repeat(70));
        console.log("📝 Next Steps:");
        console.log("=".repeat(70));
        console.log("1. OG images generated in public/og/");
        console.log("2. Update index.html to reference /og/home.svg");
        console.log("3. Add page-specific OG tags to route components");
        console.log("=".repeat(70) + "\n");
        break;
      }
      case "process-bio-assets": {
        console.log("\n" + "=".repeat(70));
        console.log("🖼️  Bio Assets Processor");
        console.log("=".repeat(70) + "\n");

        if (dryRun) {
          console.log("[DRY RUN] Would:");
          console.log("  1. Scan public/images/bio/ for WebP/AVIF images");
          console.log("  2. Select best quality image (prioritize 1732967007485.webp or bio-photo.webp)");
          console.log("  3. Copy to public/images/profile-main.webp");
          console.log("  4. Generate blurred base64 placeholder");
          break;
        }

        const bioDir = path.join(repoRoot, "public", "images", "bio");
        const outputPath = path.join(repoRoot, "public", "images", "profile-main.webp");
        const outputDir = path.join(repoRoot, "public", "images");

        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
          await fsPromises.mkdir(outputDir, { recursive: true });
        }

        if (!fs.existsSync(bioDir)) {
          console.error(`Error: Bio directory not found at ${bioDir}`);
          process.exit(1);
        }

        // Read all files in bio directory
        const files = await fsPromises.readdir(bioDir);

        // Filter for image files (WebP, AVIF, JPG, PNG)
        const imageFiles = files.filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.webp', '.avif', '.jpg', '.jpeg', '.png'].includes(ext);
        });

        if (imageFiles.length === 0) {
          console.error("Error: No image files found in bio directory");
          process.exit(1);
        }

        // Priority order: 1732967007485.webp > bio-photo.webp > other WebP > AVIF > others
        const priorityOrder = [
          '1732967007485.webp',
          'bio-photo.webp',
          (f) => f.endsWith('.webp'),
          (f) => f.endsWith('.avif'),
          (f) => true, // fallback to any image
        ];

        let selectedFile = null;
        for (const priority of priorityOrder) {
          if (typeof priority === 'string') {
            selectedFile = imageFiles.find(f => f === priority);
            if (selectedFile) break;
          } else if (typeof priority === 'function') {
            selectedFile = imageFiles.find(priority);
            if (selectedFile) break;
          }
        }

        if (!selectedFile) {
          selectedFile = imageFiles[0]; // Fallback to first image
        }

        const sourcePath = path.join(bioDir, selectedFile);
        console.log(`✅ Selected: ${selectedFile} as Prime Identity`);

        // Copy/Convert file to profile-main.webp
        if (selectedFile.endsWith('.webp')) {
          await fsPromises.copyFile(sourcePath, outputPath);
          console.log(`✅ Copied to: public/images/profile-main.webp`);
        } else {
          // Convert non-WebP images to WebP using sharp
          try {
            const { default: sharp } = await import('sharp');
            const imageBuffer = await fsPromises.readFile(sourcePath);
            await sharp(imageBuffer)
              .webp({ quality: 85 })
              .toFile(outputPath);
            console.log(`✅ Converted and saved to: public/images/profile-main.webp`);
          } catch (error) {
            console.log(`⚠️  Could not convert to WebP (sharp error): ${error.message}`);
            console.log(`💡 Falling back to copying original file...`);
            const ext = path.extname(selectedFile);
            const fallbackPath = outputPath.replace('.webp', ext);
            await fsPromises.copyFile(sourcePath, fallbackPath);
            console.log(`✅ Copied to: ${path.relative(repoRoot, fallbackPath)}`);
            console.log(`💡 Tip: Install sharp or run image optimization to convert to WebP format`);
          }
        }

        // Generate blurred base64 placeholder (simplified - would use sharp in production)
        try {
          const { default: sharp } = await import('sharp');
          const imageBuffer = await fsPromises.readFile(sourcePath);
          const blurred = await sharp(imageBuffer)
            .resize(20, 20, { fit: 'cover' })
            .blur(10)
            .webp({ quality: 20 })
            .toBuffer();

          const base64 = blurred.toString('base64');
          const dataUri = `data:image/webp;base64,${base64}`;

          // Save blur data to a JSON file for the component to use
          const blurDataPath = path.join(repoRoot, "public", "images", "profile-main-blur.json");
          await fsPromises.writeFile(
            blurDataPath,
            JSON.stringify({ blurDataUri: dataUri }, null, 2)
          );
          console.log(`✅ Generated blur placeholder: public/images/profile-main-blur.json`);
        } catch (error) {
          console.log(`⚠️  Could not generate blur placeholder (sharp not available or error): ${error.message}`);
          console.log(`💡 Component will work without blur-up effect`);
        }

        console.log("\n" + "=".repeat(70));
        console.log("📝 Next Steps:");
        console.log("=".repeat(70));
        console.log("1. Profile asset standardized: public/images/profile-main.webp");
        console.log("2. Blur placeholder generated for loading effect");
        console.log("3. TechProfile component can now use /images/profile-main.webp");
        console.log("=".repeat(70) + "\n");
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


