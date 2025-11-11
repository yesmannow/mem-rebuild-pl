#!/usr/bin/env node
/**
 * MCP Server Validation Script
 * Run this after starting the MCP server to verify it's working correctly
 */

const PORT = process.env.MCP_PORT || 7465;
const AUTH_TOKEN = process.env.MCP_AUTH_TOKEN;

if (!AUTH_TOKEN) {
  console.error("❌ MCP_AUTH_TOKEN not set!");
  console.log("Set it with: export MCP_AUTH_TOKEN=\"$(openssl rand -hex 24)\"");
  process.exit(1);
}

const BASE_URL = `http://localhost:${PORT}`;
const headers = {
  "Authorization": `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json"
};

async function testHealth() {
  try {
    const response = await fetch(`${BASE_URL}/health`, { headers });
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

