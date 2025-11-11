#!/usr/bin/env node
/**
 * MCP Server Validation Script
 * Run this after starting the MCP server to verify it's working correctly
 */

// Mirror server port resolution: PORT > MCP_PORT > 5174
const PORT = process.env.PORT || process.env.MCP_PORT || 5174;
const AUTH_TOKEN = process.env.MCP_AUTH_TOKEN;

const BASE_URL = `http://localhost:${PORT}`;
const headers = (() => {
  const base = { "Content-Type": "application/json" };
  if (AUTH_TOKEN) base["Authorization"] = `Bearer ${AUTH_TOKEN}`;
  return base;
})();

async function testHealth() {
  try {
    const response = await fetch(`${BASE_URL}/health`, { headers });

    // Check HTTP status before parsing JSON
    if (!response.ok) {
      const text = await response.text();
      console.error(`❌ Health check failed: HTTP ${response.status} ${response.statusText}`);
      if (text) console.error(`   Response: ${text.substring(0, 200)}`);
      return false;
    }

    const data = await response.json();
    if (data.ok === true) {
      console.log("✅ Health check passed");
      return true;
    } else {
      console.error("❌ Health check failed:", data);
      return false;
    }
  } catch (error) {
    console.error("❌ Health check error:", error.message);
    return false;
  }
}

async function testRead() {
  try {
    const response = await fetch(`${BASE_URL}/read`, {
      method: "POST",
      headers,
      body: JSON.stringify({ path: "src/main.tsx" })
    });

    // Check HTTP status before parsing JSON
    if (!response.ok) {
      const text = await response.text();
      console.error(`❌ Read test failed: HTTP ${response.status} ${response.statusText}`);
      if (text) console.error(`   Response: ${text.substring(0, 200)}`);
      return false;
    }

    const data = await response.json();
    if (data.path && data.content) {
      console.log("✅ Read test passed");
      console.log(`   Path: ${data.path}`);
      console.log(`   Content length: ${data.content.length} chars`);
      return true;
    } else {
      console.error("❌ Read test failed:", data);
      return false;
    }
  } catch (error) {
    console.error("❌ Read test error:", error.message);
    return false;
  }
}

async function runTests() {
  console.log(`\n🔍 Testing MCP Server at ${BASE_URL}\n`);

  const healthOk = await testHealth();
  const readOk = await testRead();

  console.log("\n" + "=".repeat(50));
  if (healthOk && readOk) {
    console.log("✅ All validation tests passed!");
  } else {
    console.log("❌ Some tests failed");
    process.exit(1);
  }
}

runTests();

