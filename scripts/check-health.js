#!/usr/bin/env node

/**
 * Health Check Script
 * Fetches the health endpoint and validates deployment status
 */

const HEALTH_URL = process.env.HEALTH_URL || 'https://mem-rebuild-pl.pages.dev/api/health';
const TIMEOUT_MS = 10000;

async function checkHealth() {
  console.log(`🏥 Checking deployment health...\n`);
  console.log(`URL: ${HEALTH_URL}`);
  
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
    
    const response = await fetch(HEALTH_URL, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Health-Check-Script/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    if (!response.ok) {
      console.error(`❌ Health check failed: HTTP ${response.status}`);
      console.error(`Response time: ${responseTime}ms`);
      process.exit(1);
    }
    
    const data = await response.json();
    
    console.log(`\n✅ Health check passed!`);
    console.log(`Response time: ${responseTime}ms`);
    console.log(`\nHealth Status:`);
    console.log(`  Status: ${data.status}`);
    console.log(`  Version: ${data.version}`);
    console.log(`  Environment: ${data.env}`);
    console.log(`  Branch: ${data.branch}`);
    console.log(`  Timestamp: ${data.timestamp}`);
    
    if (data.checks) {
      console.log(`\nSystem Checks:`);
      Object.entries(data.checks).forEach(([key, value]) => {
        const icon = value === 'ok' ? '✓' : '✗';
        console.log(`  ${icon} ${key}: ${value}`);
      });
    }
    
    // Performance warnings
    if (responseTime > 1000) {
      console.warn(`\n⚠️  Warning: Response time is high (${responseTime}ms)`);
    }
    
    // Status validation
    if (data.status !== 'ok') {
      console.error(`\n❌ Health status is not OK: ${data.status}`);
      process.exit(1);
    }
    
    console.log(`\n✨ All checks passed!`);
    process.exit(0);
    
  } catch (error) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    console.error(`\n❌ Health check failed after ${responseTime}ms`);
    
    if (error.name === 'AbortError') {
      console.error(`Reason: Request timeout (>${TIMEOUT_MS}ms)`);
    } else if (error.code === 'ENOTFOUND') {
      console.error(`Reason: DNS lookup failed - domain not found`);
    } else if (error.code === 'ECONNREFUSED') {
      console.error(`Reason: Connection refused - service may be down`);
    } else {
      console.error(`Reason: ${error.message}`);
    }
    
    console.error(`\nStack trace:`);
    console.error(error.stack);
    
    process.exit(1);
  }
}

// Run health check
checkHealth();
