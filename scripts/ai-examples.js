#!/usr/bin/env node
/**
 * AI Server Usage Examples
 * 
 * This script demonstrates how to interact with the Copilot AI Server endpoints
 * Run the examples below to test different AI capabilities
 */

import fetch from 'node-fetch';

const API_BASE = process.env.AI_SERVER_URL || 'http://localhost:5174/api/ai';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bright');
  console.log('='.repeat(60) + '\n');
}

async function makeRequest(endpoint, body) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    log(`Error: ${error.message}`, 'red');
    return null;
  }
}

// Example 1: Summarize build logs
async function example1() {
  logSection('Example 1: Summarize Build Logs');
  
  const logs = `
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR! While resolving: react-dom@18.2.0
npm ERR! Found: react@17.0.2
npm ERR! node_modules/react
npm ERR!   peer react@"^17.0.0" from @testing-library/react@12.1.5

Build failed with exit code 1
TypeError: Cannot read property 'map' of undefined
  at src/components/List.tsx:23:15
`;

  log('Sending logs to summarize_logs endpoint...', 'blue');
  const result = await makeRequest('/summarize_logs', { logs });
  
  if (result) {
    log('\n✅ Summary:', 'green');
    console.log(result.summary);
    
    log('\n📋 Root Causes:', 'yellow');
    result.rootCauses.forEach((cause, i) => {
      console.log(`  ${i + 1}. ${cause}`);
    });
    
    log('\n🔧 Suggested Actions:', 'yellow');
    result.suggestedActions.forEach((action, i) => {
      console.log(`  ${i + 1}. ${action}`);
    });
    
    log(`\n📊 Severity: ${result.severity}`, 'yellow');
    log(`💬 Tokens: ${result.tokens}`, 'yellow');
  }
}

// Example 2: Suggest a patch for an error
async function example2() {
  logSection('Example 2: Suggest Patch for Error');
  
  const error = `TypeError: Cannot read property 'className' of undefined
  at Button.tsx:15:23`;
  
  const context = `
File: src/components/Button.tsx
The component receives props but doesn't check if they exist before accessing nested properties.
  `;

  log('Sending error to suggest_patch endpoint...', 'blue');
  const result = await makeRequest('/suggest_patch', { error, context });
  
  if (result) {
    log('\n✅ Suggested Patch:', 'green');
    console.log(result.patch);
    
    log('\n💡 Explanation:', 'yellow');
    console.log(result.explanation);
    
    log('\n📁 Affected Files:', 'yellow');
    result.files.forEach(file => console.log(`  - ${file}`));
    
    log(`\n🎯 Confidence: ${result.confidence}`, 'yellow');
  }
}

// Example 3: Generate design tokens
async function example3() {
  logSection('Example 3: Generate Design Tokens');
  
  const brief = 'crafty, tactile, no purple';
  
  log(`Generating tokens for brief: "${brief}"`, 'blue');
  const result = await makeRequest('/generate_tokens', { brief });
  
  if (result) {
    log('\n✅ Generated Tokens:', 'green');
    
    log('\n🎨 Colors:', 'yellow');
    Object.entries(result.tokens.colors).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    
    log('\n📏 Spacing:', 'yellow');
    Object.entries(result.tokens.spacing).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    
    log('\n✏️  Typography:', 'yellow');
    console.log('  Font Families:');
    Object.entries(result.tokens.typography.fontFamily).forEach(([key, value]) => {
      console.log(`    ${key}: ${Array.isArray(value) ? value.join(', ') : value}`);
    });
    console.log('  Font Sizes:');
    Object.entries(result.tokens.typography.fontSize).forEach(([key, value]) => {
      console.log(`    ${key}: ${value}`);
    });
  }
}

// Example 4: Check monitoring stats
async function example4() {
  logSection('Example 4: Check Monitoring Stats');
  
  log('Fetching monitoring stats...', 'blue');
  
  try {
    const response = await fetch('http://localhost:5174/api/monitoring/stats');
    const stats = await response.json();
    
    log('\n✅ AI Stats:', 'green');
    Object.entries(stats.aiStats).forEach(([tool, data]) => {
      console.log(`  ${tool}:`);
      console.log(`    - Calls: ${data.count}`);
      console.log(`    - Tokens: ${data.tokens}`);
    });
    
    log('\n📊 Overall Stats:', 'yellow');
    console.log(`  Total Tokens: ${stats.tokenUsage}`);
    console.log(`  Cache Hits: ${stats.cacheHits}`);
    console.log(`  Cache Misses: ${stats.cacheMisses}`);
    console.log(`  Cache Size: ${stats.cacheSize}`);
    console.log(`  Uptime: ${Math.floor(stats.uptime)}s`);
    console.log(`  Dry Run: ${stats.dryRun ? 'Yes' : 'No'}`);
  } catch (error) {
    log(`Error: ${error.message}`, 'red');
  }
}

// Main execution
async function main() {
  log('\n🤖 Copilot AI Server - Usage Examples\n', 'bright');
  
  // Check if server is running
  try {
    const health = await fetch('http://localhost:5174/health');
    if (!health.ok) {
      throw new Error('Server not responding');
    }
    log('✅ Server is running\n', 'green');
  } catch (error) {
    log('❌ Server is not running. Start it with:', 'red');
    log('   AI_DRY_RUN=true node scripts/copilot-ai-server.js\n', 'yellow');
    process.exit(1);
  }

  // Run examples based on command line argument
  const example = process.argv[2];
  
  if (!example) {
    log('Usage: node scripts/ai-examples.js [example_number]', 'yellow');
    log('Available examples:', 'yellow');
    log('  1 - Summarize build logs', 'blue');
    log('  2 - Suggest patch for error', 'blue');
    log('  3 - Generate design tokens', 'blue');
    log('  4 - Check monitoring stats', 'blue');
    log('  all - Run all examples\n', 'blue');
    process.exit(0);
  }

  try {
    switch (example) {
      case '1':
        await example1();
        break;
      case '2':
        await example2();
        break;
      case '3':
        await example3();
        break;
      case '4':
        await example4();
        break;
      case 'all':
        await example1();
        await example2();
        await example3();
        await example4();
        break;
      default:
        log(`Unknown example: ${example}`, 'red');
        process.exit(1);
    }
    
    log('\n✅ Examples completed successfully!\n', 'green');
  } catch (error) {
    log(`\n❌ Error running examples: ${error.message}\n`, 'red');
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { example1, example2, example3, example4 };
