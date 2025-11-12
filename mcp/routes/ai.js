#!/usr/bin/env node
import express from "express";
import {
	callGPT,
	callGemini,
	extractGPTContent,
	extractGeminiContent,
	parseAIJson,
	callWithCache,
	getAIStats,
	recordEndpointUsage,
} from "../utils/ai-proxy.js";

const router = express.Router();

// AI-specific rate limiter (stricter than general rate limit)
const aiRateState = new Map();

function aiRateLimiter(req, res, next) {
	const windowMs = Number(process.env.AI_RATE_LIMIT_WINDOW_MS || 60000);
	const max = Number(process.env.AI_RATE_LIMIT_MAX || 10);
	
	const now = Date.now();
	const key = `ai:${req.ip}`;
	let bucket = aiRateState.get(key);
	
	if (!bucket) {
		bucket = [];
		aiRateState.set(key, bucket);
	}
	
	// Prune old entries
	const cutoff = now - windowMs;
	while (bucket.length && bucket[0] < cutoff) {
		bucket.shift();
	}
	
	if (bucket.length >= max) {
		return res.status(429).json({
			error: "Too Many Requests",
			message: "AI rate limit exceeded. Please try again later.",
		});
	}
	
	bucket.push(now);
	next();
}

// Apply rate limiter to all AI routes
router.use(aiRateLimiter);

// Middleware to check if AI features are enabled
function checkAIEnabled(req, res, next) {
	const aiEnabled = (process.env.AI_FEATURES_ENABLED || "false").toLowerCase() === "true";
	if (!aiEnabled) {
		return res.status(503).json({
			error: "AI features are not enabled",
			message: "Set AI_FEATURES_ENABLED=true to enable AI endpoints",
		});
	}
	next();
}

router.use(checkAIEnabled);

/**
 * POST /api/ai/log-summarize
 * Summarize logs and identify root causes
 * 
 * Body:
 * - logs: string - Log content to analyze
 * - context: string (optional) - Additional context
 */
router.post("/log-summarize", async (req, res) => {
	try {
		const { logs, context = "" } = req.body;
		
		if (!logs) {
			return res.status(400).json({ error: "Missing required field: logs" });
		}
		
		// Truncate logs if too long
		const maxLogLength = 3000;
		const truncatedLogs = logs.length > maxLogLength 
			? logs.slice(-maxLogLength) + "\n... (truncated)"
			: logs;
		
		const prompt = `You are an expert Node.js engineer. Analyze these logs and provide a concise summary.

${context ? `Context: ${context}\n\n` : ""}Logs:
${truncatedLogs}

Return ONLY a JSON object with this exact structure (no other text):
{
  "summary": ["bullet point 1", "bullet point 2", "bullet point 3"],
  "causes": ["likely cause 1", "likely cause 2"],
  "reproduce": "one-line command to reproduce locally",
  "severity": "low|medium|high|critical"
}`;

		const maxTokens = Number(process.env.AI_MAX_TOKENS_LOG_SUMMARY || 500);
		const response = await callGPT({ prompt, maxTokens, temperature: 0.2 });
		const content = extractGPTContent(response);
		const parsed = parseAIJson(content, {
			summary: ["Unable to parse logs"],
			causes: ["Unknown"],
			reproduce: "N/A",
			severity: "unknown",
		});
		
		// Record usage
		const tokensUsed = response?.usage?.total_tokens || 0;
		recordEndpointUsage("log-summarize", tokensUsed, false, false);
		
		res.json({
			success: true,
			data: parsed,
			raw: content,
		});
	} catch (error) {
		console.error("Error in log-summarize:", error);
		recordEndpointUsage("log-summarize", 0, true, false);
		res.status(500).json({
			error: "Failed to summarize logs",
			message: error.message,
		});
	}
});

/**
 * POST /api/ai/code-review
 * Analyze code and suggest fixes
 * 
 * Body:
 * - code: string - Code snippet to review
 * - error: string - Error message or test failure
 * - language: string (optional) - Programming language
 * - testName: string (optional) - Name of failing test
 */
router.post("/code-review", async (req, res) => {
	try {
		const { code, error, language = "javascript", testName = "" } = req.body;
		
		if (!code || !error) {
			return res.status(400).json({ error: "Missing required fields: code, error" });
		}
		
		const prompt = `You are a cautious senior code reviewer for ${language}.

${testName ? `Failing test: ${testName}\n` : ""}Error:
${error}

Code:
${code}

Analyze the code and error, then return ONLY a JSON object with this exact structure:
{
  "explanation": "Brief explanation of the likely cause",
  "patch": "Minimal git unified diff format patch to fix the issue",
  "risks": "Potential risks or side effects of this fix",
  "alternatives": "Alternative approaches if applicable"
}`;

		const maxTokens = Number(process.env.AI_MAX_TOKENS_CODE_REVIEW || 1000);
		const response = await callGPT({ prompt, maxTokens, temperature: 0.3 });
		const content = extractGPTContent(response);
		const parsed = parseAIJson(content, {
			explanation: "Unable to analyze",
			patch: "",
			risks: "Unknown",
			alternatives: "N/A",
		});
		
		res.json({
			success: true,
			data: parsed,
			raw: content,
		});
	} catch (error) {
		console.error("Error in code-review:", error);
		res.status(500).json({
			error: "Failed to review code",
			message: error.message,
		});
	}
});

/**
 * POST /api/ai/design-tokens
 * Generate Tailwind design tokens based on brand brief
 * 
 * Body:
 * - brief: string - Brand brief (mood, colors, keywords)
 * - baseColor: string (optional) - Starting color
 */
router.post("/design-tokens", async (req, res) => {
	try {
		const { brief, baseColor = "" } = req.body;
		
		if (!brief) {
			return res.status(400).json({ error: "Missing required field: brief" });
		}
		
		const prompt = `You are a design systems expert. Create Tailwind CSS design tokens based on this brand brief:

Brief: ${brief}
${baseColor ? `Base color hint: ${baseColor}` : ""}

Generate 3 distinct color palette variations. Return ONLY a JSON object with this structure:
{
  "palettes": [
    {
      "name": "Palette name",
      "colors": {
        "primary": {"50": "#...", "100": "#...", ... "900": "#..."},
        "secondary": {"50": "#...", ... "900": "#..."},
        "accent": {"50": "#...", ... "900": "#..."}
      },
      "spacing": {"xs": "0.25rem", "sm": "0.5rem", "md": "1rem", "lg": "1.5rem", "xl": "2rem"},
      "borderRadius": {"sm": "0.125rem", "md": "0.375rem", "lg": "0.5rem"},
      "contrast": ["Primary on white: AAA", "Secondary on primary-900: AA"]
    }
  ]
}`;

		const maxTokens = Number(process.env.AI_MAX_TOKENS_DESIGN_TOKENS || 800);
		const cacheTTL = Number(process.env.AI_CACHE_TTL_DESIGN_TOKENS || 3600);
		
		const response = await callWithCache(
			"design-tokens",
			callGPT,
			{ prompt, maxTokens, temperature: 0.7 },
			cacheTTL
		);
		
		const content = extractGPTContent(response);
		const parsed = parseAIJson(content, {
			palettes: [],
		});
		
		res.json({
			success: true,
			data: parsed,
			raw: content,
		});
	} catch (error) {
		console.error("Error in design-tokens:", error);
		res.status(500).json({
			error: "Failed to generate design tokens",
			message: error.message,
		});
	}
});

/**
 * POST /api/ai/microcopy
 * Generate UX microcopy variations
 * 
 * Body:
 * - component: string - Component type or context
 * - intent: string - Purpose of the copy
 * - tone: string (optional) - Desired tone (playful, professional, terse)
 */
router.post("/microcopy", async (req, res) => {
	try {
		const { component, intent, tone = "professional" } = req.body;
		
		if (!component || !intent) {
			return res.status(400).json({ error: "Missing required fields: component, intent" });
		}
		
		const tones = tone.split(",").map(t => t.trim());
		const tonesStr = tones.length > 1 ? tones.join(", ") : `${tone}, professional, terse`;
		
		const prompt = `You are a UX copywriter. Generate microcopy variations for:

Component: ${component}
Intent: ${intent}
Tones needed: ${tonesStr}

Return ONLY a JSON object with exactly 3 variations:
{
  "variations": [
    {"id": 1, "tone": "playful", "text": "Main text", "subtext": "Optional subtext"},
    {"id": 2, "tone": "professional", "text": "Main text", "subtext": "Optional subtext"},
    {"id": 3, "tone": "terse", "text": "Main text", "subtext": "Optional subtext"}
  ]
}`;

		const maxTokens = Number(process.env.AI_MAX_TOKENS_MICROCOPY || 200);
		const cacheTTL = Number(process.env.AI_CACHE_TTL_MICROCOPY || 1800);
		
		const response = await callWithCache(
			"microcopy",
			callGPT,
			{ prompt, maxTokens, temperature: 0.8 },
			cacheTTL
		);
		
		const content = extractGPTContent(response);
		const parsed = parseAIJson(content, {
			variations: [],
		});
		
		res.json({
			success: true,
			data: parsed,
			raw: content,
		});
	} catch (error) {
		console.error("Error in microcopy:", error);
		res.status(500).json({
			error: "Failed to generate microcopy",
			message: error.message,
		});
	}
});

/**
 * POST /api/ai/debug-canvas
 * Interactive debugging assistant - natural language queries
 * 
 * Body:
 * - query: string - Natural language question
 * - stats: object (optional) - Monitoring stats
 * - recentErrors: array (optional) - Recent error messages
 * - context: string (optional) - Additional context
 */
router.post("/debug-canvas", async (req, res) => {
	try {
		const { query, stats = {}, recentErrors = [], context = "" } = req.body;
		
		if (!query) {
			return res.status(400).json({ error: "Missing required field: query" });
		}
		
		const statsStr = Object.keys(stats).length > 0 ? JSON.stringify(stats, null, 2) : "N/A";
		const errorsStr = recentErrors.length > 0 ? recentErrors.slice(0, 5).join("\n") : "N/A";
		
		const prompt = `You are a debugging assistant for a Node.js/Express application. Answer this developer query:

Query: ${query}

${context ? `Context: ${context}\n` : ""}${Object.keys(stats).length > 0 ? `Monitoring stats:\n${statsStr}\n` : ""}${recentErrors.length > 0 ? `Recent errors:\n${errorsStr}\n` : ""}
Provide a helpful response with:
1. Explanation of likely cause
2. Specific commands to run for diagnosis (curl, grep, etc.)
3. Suggested fixes

Return ONLY a JSON object:
{
  "explanation": "What's likely happening",
  "diagnosticCommands": ["command 1", "command 2"],
  "suggestedFixes": ["fix 1", "fix 2"],
  "documentation": "Relevant docs or links"
}`;

		const maxTokens = Number(process.env.AI_MAX_TOKENS_DEBUG_CANVAS || 1000);
		const response = await callGPT({ prompt, maxTokens, temperature: 0.3 });
		const content = extractGPTContent(response);
		const parsed = parseAIJson(content, {
			explanation: "Unable to analyze",
			diagnosticCommands: [],
			suggestedFixes: [],
			documentation: "N/A",
		});
		
		res.json({
			success: true,
			data: parsed,
			raw: content,
		});
	} catch (error) {
		console.error("Error in debug-canvas:", error);
		res.status(500).json({
			error: "Failed to process debug query",
			message: error.message,
		});
	}
});

/**
 * GET /api/ai/stats
 * Get AI usage statistics
 */
router.get("/stats", (req, res) => {
	const stats = getAIStats();
	res.json({
		success: true,
		stats,
		timestamp: new Date().toISOString(),
	});
});

export default router;
