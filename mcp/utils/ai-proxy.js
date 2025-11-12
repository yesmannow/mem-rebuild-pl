#!/usr/bin/env node
import fetch from "node-fetch";

/**
 * AI proxy utilities for OpenAI and Gemini API calls
 * Server-side only - never expose API keys to client
 */

// Track usage for monitoring
export const aiUsageStats = {
	gpt: { calls: 0, tokens: 0, errors: 0 },
	gemini: { calls: 0, tokens: 0, errors: 0 },
	cache: { hits: 0, misses: 0 },
};

// Simple in-memory cache for AI responses
const cache = new Map();

/**
 * Generate cache key from endpoint and request body
 */
function getCacheKey(endpoint, body) {
	return `${endpoint}:${JSON.stringify(body)}`;
}

/**
 * Get cached response if available and not expired
 */
function getCached(key, ttl) {
	const entry = cache.get(key);
	if (!entry) {
		aiUsageStats.cache.misses++;
		return null;
	}
	
	if (Date.now() - entry.timestamp > ttl * 1000) {
		cache.delete(key);
		aiUsageStats.cache.misses++;
		return null;
	}
	
	aiUsageStats.cache.hits++;
	return entry.data;
}

/**
 * Store response in cache
 */
function setCache(key, data) {
	cache.set(key, {
		data,
		timestamp: Date.now(),
	});
}

/**
 * Call OpenAI GPT API
 * @param {Object} options - API call options
 * @param {string} options.prompt - The prompt to send
 * @param {number} options.maxTokens - Maximum tokens for response
 * @param {number} options.temperature - Temperature for response (0-1)
 * @param {string} options.model - Model to use (default: from env)
 * @returns {Promise<Object>} API response
 */
export async function callGPT({ prompt, maxTokens = 800, temperature = 0.3, model = null }) {
	const apiKey = process.env.GPT_API_KEY;
	if (!apiKey) {
		throw new Error("GPT_API_KEY not configured");
	}

	const modelToUse = model || process.env.GPT_MODEL || "gpt-4o-mini";
	
	aiUsageStats.gpt.calls++;
	
	try {
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: modelToUse,
				messages: [{ role: "user", content: prompt }],
				max_tokens: maxTokens,
				temperature,
			}),
		});

		if (!response.ok) {
			aiUsageStats.gpt.errors++;
			const errorText = await response.text();
			throw new Error(`GPT API error: ${response.status} ${errorText}`);
		}

		const data = await response.json();
		
		// Track token usage
		if (data.usage) {
			aiUsageStats.gpt.tokens += data.usage.total_tokens || 0;
		}

		return data;
	} catch (error) {
		aiUsageStats.gpt.errors++;
		throw error;
	}
}

/**
 * Call Google Gemini API
 * @param {Object} options - API call options
 * @param {string} options.prompt - The prompt to send
 * @param {number} options.maxTokens - Maximum tokens for response
 * @param {number} options.temperature - Temperature for response (0-1)
 * @param {string} options.model - Model to use (default: from env)
 * @returns {Promise<Object>} API response
 */
export async function callGemini({ prompt, maxTokens = 800, temperature = 0.3, model = null }) {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		throw new Error("GEMINI_API_KEY not configured");
	}

	const modelToUse = model || process.env.GEMINI_MODEL || "gemini-pro";
	
	aiUsageStats.gemini.calls++;

	try {
		const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${apiKey}`;
		
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contents: [{
					parts: [{
						text: prompt
					}]
				}],
				generationConfig: {
					temperature,
					maxOutputTokens: maxTokens,
				},
			}),
		});

		if (!response.ok) {
			aiUsageStats.gemini.errors++;
			const errorText = await response.text();
			throw new Error(`Gemini API error: ${response.status} ${errorText}`);
		}

		const data = await response.json();
		
		// Estimate token usage (Gemini doesn't always provide exact counts)
		if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
			const textLength = data.candidates[0].content.parts[0].text.length;
			aiUsageStats.gemini.tokens += Math.ceil(textLength / 4); // Rough estimate: 4 chars per token
		}

		return data;
	} catch (error) {
		aiUsageStats.gemini.errors++;
		throw error;
	}
}

/**
 * Extract text content from GPT response
 */
export function extractGPTContent(response) {
	return response?.choices?.[0]?.message?.content || "";
}

/**
 * Extract text content from Gemini response
 */
export function extractGeminiContent(response) {
	return response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

/**
 * Parse JSON from AI response, with fallback
 */
export function parseAIJson(text, fallback = {}) {
	try {
		// Try to find JSON in the response
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (jsonMatch) {
			return JSON.parse(jsonMatch[0]);
		}
		return fallback;
	} catch {
		return fallback;
	}
}

/**
 * Call AI with caching support
 * @param {string} endpoint - Endpoint name for cache key
 * @param {Function} aiFunction - AI function to call (callGPT or callGemini)
 * @param {Object} options - Options for AI function
 * @param {number} cacheTTL - Cache TTL in seconds (0 to disable)
 * @returns {Promise<Object>} API response
 */
export async function callWithCache(endpoint, aiFunction, options, cacheTTL = 0) {
	if (cacheTTL > 0) {
		const cacheKey = getCacheKey(endpoint, options);
		const cached = getCached(cacheKey, cacheTTL);
		if (cached) {
			return cached;
		}
		
		const result = await aiFunction(options);
		setCache(cacheKey, result);
		return result;
	}
	
	return aiFunction(options);
}

/**
 * Get AI usage stats for monitoring
 */
export function getAIStats() {
	return {
		...aiUsageStats,
		cacheSize: cache.size,
	};
}

/**
 * Reset usage stats (for testing)
 */
export function resetAIStats() {
	aiUsageStats.gpt.calls = 0;
	aiUsageStats.gpt.tokens = 0;
	aiUsageStats.gpt.errors = 0;
	aiUsageStats.gemini.calls = 0;
	aiUsageStats.gemini.tokens = 0;
	aiUsageStats.gemini.errors = 0;
	aiUsageStats.cache.hits = 0;
	aiUsageStats.cache.misses = 0;
	cache.clear();
}
