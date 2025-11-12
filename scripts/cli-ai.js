#!/usr/bin/env node
/**
 * CLI wrapper for AI endpoints
 * Provides easy command-line access to all AI features
 * 
 * Usage:
 *   npm run ai:summarize -- --logs "error log content"
 *   npm run ai:patch -- --code "function() {}" --error "TypeError"
 *   npm run ai:tokens -- --brief "modern, minimal"
 *   npm run ai:copy -- --component "button" --intent "submit"
 */

import fetch from "node-fetch";
import { parseArgs } from "node:util";

const BASE_URL = process.env.MCP_URL || "http://localhost:5174";
const AI_TRACE_ENABLED = (process.env.AI_TRACE_ENABLED || "false").toLowerCase() === "true";

// Generate trace ID if tracing is enabled
function generateTraceId() {
	return AI_TRACE_ENABLED ? `trace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` : null;
}

// Log trace information
function trace(message, data = null) {
	if (AI_TRACE_ENABLED) {
		const timestamp = new Date().toISOString();
		console.error(`[TRACE ${timestamp}] ${message}`);
		if (data) {
			console.error(JSON.stringify(data, null, 2));
		}
	}
}

async function makeRequest(endpoint, body, options = {}) {
	const traceId = generateTraceId();
	const startTime = Date.now();
	
	trace(`Request to ${endpoint}`, { body, traceId });
	
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(traceId && { "X-Trace-ID": traceId }),
			},
			body: JSON.stringify(body),
			...options,
		});
		
		const duration = Date.now() - startTime;
		const result = await response.json();
		
		trace(`Response from ${endpoint}`, { 
			status: response.status,
			duration: `${duration}ms`,
			traceId,
		});
		
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${result.error || result.message}`);
		}
		
		return result;
	} catch (error) {
		const duration = Date.now() - startTime;
		trace(`Error from ${endpoint}`, {
			error: error.message,
			duration: `${duration}ms`,
			traceId,
		});
		throw error;
	}
}

// Command handlers
const commands = {
	async summarize(args) {
		const { logs, context = "" } = args;
		
		if (!logs) {
			throw new Error("--logs argument is required");
		}
		
		const result = await makeRequest("/api/ai/log-summarize", {
			logs,
			context,
		});
		
		return result;
	},
	
	async patch(args) {
		const { code, error, language = "javascript", testName = "" } = args;
		
		if (!code || !error) {
			throw new Error("--code and --error arguments are required");
		}
		
		const result = await makeRequest("/api/ai/code-review", {
			code,
			error,
			language,
			testName,
		});
		
		return result;
	},
	
	async tokens(args) {
		const { brief, baseColor = "" } = args;
		
		if (!brief) {
			throw new Error("--brief argument is required");
		}
		
		const result = await makeRequest("/api/ai/design-tokens", {
			brief,
			baseColor,
		});
		
		return result;
	},
	
	async copy(args) {
		const { component, intent, tone = "professional" } = args;
		
		if (!component || !intent) {
			throw new Error("--component and --intent arguments are required");
		}
		
		const result = await makeRequest("/api/ai/microcopy", {
			component,
			intent,
			tone,
		});
		
		return result;
	},
	
	async debug(args) {
		const { query, context = "" } = args;
		
		if (!query) {
			throw new Error("--query argument is required");
		}
		
		const result = await makeRequest("/api/ai/debug-canvas", {
			query,
			context,
		});
		
		return result;
	},
	
	async stats() {
		const response = await fetch(`${BASE_URL}/api/ai/stats`);
		return response.json();
	},
};

// Parse command line arguments
function parseCliArgs() {
	const args = process.argv.slice(2);
	const command = args[0];
	
	if (!command || command === "--help" || command === "-h") {
		printUsage();
		process.exit(0);
	}
	
	// Parse remaining args as key-value pairs
	const parsedArgs = {};
	for (let i = 1; i < args.length; i++) {
		const arg = args[i];
		if (arg.startsWith("--")) {
			const key = arg.slice(2);
			const value = args[i + 1];
			if (value && !value.startsWith("--")) {
				parsedArgs[key] = value;
				i++; // Skip next arg as we've consumed it
			} else {
				parsedArgs[key] = true;
			}
		}
	}
	
	return { command, args: parsedArgs };
}

function printUsage() {
	console.log(`
AI CLI - Command line interface for AI endpoints

Usage:
  node scripts/cli-ai.js <command> [options]
  npm run ai:<command> -- [options]

Commands:
  summarize    Summarize logs and identify root causes
  patch        Suggest code patches for errors
  tokens       Generate design tokens from brand brief
  copy         Generate microcopy variations
  debug        Debug canvas for natural language queries
  stats        Show AI usage statistics

Examples:
  # Summarize logs
  npm run ai:summarize -- --logs "Error: ECONNREFUSED" --context "startup"
  
  # Suggest patch
  npm run ai:patch -- --code "function test() {}" --error "TypeError"
  
  # Generate tokens
  npm run ai:tokens -- --brief "modern, minimal, tactile"
  
  # Generate microcopy
  npm run ai:copy -- --component "button" --intent "submit form"
  
  # Debug query
  npm run ai:debug -- --query "why is my server slow?"
  
  # View stats
  npm run ai:stats

Options:
  --help, -h   Show this help message

Environment:
  MCP_URL             Server URL (default: http://localhost:5174)
  AI_TRACE_ENABLED    Enable verbose tracing (default: false)
`);
}

// Main execution
async function main() {
	try {
		const { command, args } = parseCliArgs();
		
		if (!commands[command]) {
			console.error(`Unknown command: ${command}`);
			console.error('Run "node scripts/cli-ai.js --help" for usage');
			process.exit(1);
		}
		
		trace(`Executing command: ${command}`, args);
		
		const result = await commands[command](args);
		
		// Pretty print result
		console.log(JSON.stringify(result, null, 2));
		
	} catch (error) {
		console.error(`Error: ${error.message}`);
		if (AI_TRACE_ENABLED) {
			console.error(error.stack);
		}
		process.exit(1);
	}
}

main();
