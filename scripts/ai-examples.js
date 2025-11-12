#!/usr/bin/env node

/**
 * AI Integration Usage Examples
 * 
 * This script demonstrates how to use the AI endpoints.
 * Prerequisites:
 * 1. Copy .env.example to .env
 * 2. Add your GPT_API_KEY and/or GEMINI_API_KEY
 * 3. Set AI_FEATURES_ENABLED=true
 * 4. Start the server: npm run mcp:start
 * 
 * Then run: node scripts/ai-examples.js
 */

const BASE_URL = process.env.MCP_URL || "http://localhost:5174";

async function makeRequest(endpoint, body) {
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	
	return response.json();
}

async function exampleLogSummarize() {
	console.log("\n=== Log Summarization Example ===");
	
	const sampleLog = `
Error: ECONNREFUSED at connect
  at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16)
Error: Database connection failed
  at Database.connect (/app/db.js:42:15)
Server startup failed after 3 retries
	`.trim();
	
	try {
		const result = await makeRequest("/api/ai/log-summarize", {
			logs: sampleLog,
			context: "Server startup issue in production",
		});
		
		console.log("Result:", JSON.stringify(result, null, 2));
	} catch (error) {
		console.error("Error:", error.message);
	}
}

async function exampleCodeReview() {
	console.log("\n=== Code Review Example ===");
	
	const code = `
function getUserById(id) {
  const user = database.users[id];
  return user.name;
}
	`.trim();
	
	const error = "TypeError: Cannot read property 'name' of undefined";
	
	try {
		const result = await makeRequest("/api/ai/code-review", {
			code,
			error,
			language: "javascript",
			testName: "should get user by id",
		});
		
		console.log("Result:", JSON.stringify(result, null, 2));
	} catch (error) {
		console.error("Error:", error.message);
	}
}

async function exampleDesignTokens() {
	console.log("\n=== Design Tokens Example ===");
	
	try {
		const result = await makeRequest("/api/ai/design-tokens", {
			brief: "Modern portfolio site. Minimal, elegant, professional. Earth tones with a pop of teal. Avoid harsh blacks.",
			baseColor: "#2d5f5f",
		});
		
		console.log("Result:", JSON.stringify(result, null, 2));
	} catch (error) {
		console.error("Error:", error.message);
	}
}

async function exampleMicrocopy() {
	console.log("\n=== Microcopy Example ===");
	
	try {
		const result = await makeRequest("/api/ai/microcopy", {
			component: "Subscribe button",
			intent: "Encourage newsletter signup",
			tone: "friendly,professional,urgent",
		});
		
		console.log("Result:", JSON.stringify(result, null, 2));
	} catch (error) {
		console.error("Error:", error.message);
	}
}

async function exampleDebugCanvas() {
	console.log("\n=== Debug Canvas Example ===");
	
	try {
		const result = await makeRequest("/api/ai/debug-canvas", {
			query: "My Express server is returning 503 errors intermittently. What could be causing this?",
			stats: {
				avgResponseMs: 450,
				consecutiveFailures: 3,
				lastFailureAt: new Date().toISOString(),
			},
			recentErrors: [
				"Error: Service Unavailable",
				"Error: ECONNREFUSED",
				"Timeout waiting for database",
			],
			context: "Production server under medium load",
		});
		
		console.log("Result:", JSON.stringify(result, null, 2));
	} catch (error) {
		console.error("Error:", error.message);
	}
}

async function checkAIStats() {
	console.log("\n=== AI Usage Stats ===");
	
	try {
		const response = await fetch(`${BASE_URL}/api/ai/stats`);
		const result = await response.json();
		console.log("Stats:", JSON.stringify(result, null, 2));
	} catch (error) {
		console.error("Error:", error.message);
	}
}

async function main() {
	console.log("AI Integration Usage Examples");
	console.log("=============================");
	console.log(`Server: ${BASE_URL}`);
	
	// Check if server is running
	try {
		const response = await fetch(`${BASE_URL}/health`);
		if (!response.ok) {
			throw new Error("Server not responding");
		}
		console.log("✓ Server is running");
	} catch (error) {
		console.error("✗ Server is not running. Start it with: npm run mcp:start");
		process.exit(1);
	}
	
	// Run examples
	const examples = [
		exampleLogSummarize,
		exampleCodeReview,
		exampleDesignTokens,
		exampleMicrocopy,
		exampleDebugCanvas,
		checkAIStats,
	];
	
	for (const example of examples) {
		try {
			await example();
			await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limit friendly
		} catch (error) {
			console.error(`Example failed: ${error.message}`);
		}
	}
	
	console.log("\n✓ All examples completed");
}

// Only run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
	main().catch(console.error);
}

export { exampleLogSummarize, exampleCodeReview, exampleDesignTokens, exampleMicrocopy, exampleDebugCanvas, checkAIStats };
