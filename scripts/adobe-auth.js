#!/usr/bin/env node

import readline from 'readline';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables if .env exists
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  brightGreen: '\x1b[1m\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function printColor(text, color) {
  console.log(`${color}${text}${colors.reset}`);
}

async function main() {
  console.log('\n=== Adobe OAuth Refresh Token Generator ===\n');

  // Step 1: Get CLIENT_ID and CLIENT_SECRET
  let clientId = process.env.ADOBE_CLIENT_ID;
  let clientSecret = process.env.ADOBE_CLIENT_SECRET;

  if (!clientId) {
    clientId = await question('Enter your Adobe CLIENT_ID: ');
  } else {
    printColor(`Using CLIENT_ID from environment: ${clientId.substring(0, 10)}...`, colors.cyan);
  }

  if (!clientSecret) {
    clientSecret = await question('Enter your Adobe CLIENT_SECRET: ');
  } else {
    printColor(`Using CLIENT_SECRET from environment: ${'*'.repeat(10)}...`, colors.cyan);
  }

  // Step 2: Generate Authorization URL
  const redirectUri = 'https://localhost/';
  const scopes = 'openid,offline_access,lr_partner_apis,lr_partner_rendition_apis';
  const state = Math.random().toString(36).substring(2, 15);

  const authUrl = new URL('https://ims-na1.adobelogin.com/ims/authorize/v2');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('scope', scopes);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('state', state);

  console.log('\n' + '='.repeat(60));
  printColor('STEP 1: Authorization URL Generated', colors.bright);
  console.log('='.repeat(60));
  console.log('\nFollow these steps:\n');
  console.log('1. Copy and paste this URL into your browser:\n');
  printColor(authUrl.toString(), colors.cyan);
  console.log('\n2. Log in with your Adobe account.');
  console.log('3. You will see a "Site Can\'t Be Reached" error (this is expected).');
  printColor('4. Copy the "code=" value from the address bar in your browser.', colors.yellow);
  console.log('\nExample URL: https://localhost/?code=ABC123XYZ&state=xyz');
  console.log('Copy just the code value: ABC123XYZ\n');

  // Step 3: Get authorization code from user
  const authCode = await question('Paste the authorization code here: ');

  if (!authCode || authCode.trim().length === 0) {
    printColor('Error: Authorization code is required.', colors.red);
    rl.close();
    process.exit(1);
  }

  // Step 4: Exchange code for refresh token
  console.log('\n' + '='.repeat(60));
  printColor('STEP 2: Exchanging code for refresh token...', colors.bright);
  console.log('='.repeat(60) + '\n');

  try {
    const tokenResponse = await axios.post(
      'https://ims-na1.adobelogin.com/ims/token/v3',
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: authCode.trim(),
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const refreshToken = tokenResponse.data.refresh_token;

    if (!refreshToken) {
      printColor('Error: No refresh token received in response.', colors.red);
      console.log('Response:', JSON.stringify(tokenResponse.data, null, 2));
      rl.close();
      process.exit(1);
    }

    // Step 5: Display the refresh token
    console.log('\n' + '='.repeat(60));
    printColor('SUCCESS! Refresh Token Retrieved', colors.brightGreen);
    console.log('='.repeat(60) + '\n');
    printColor('REFRESH_TOKEN:', colors.bright);
    printColor(refreshToken, colors.brightGreen);
    console.log('\n' + '='.repeat(60));
    console.log('\nSave this refresh token securely! You can use it to get access tokens.');
    console.log('Add it to your .env file as:');
    printColor(`ADOBE_REFRESH_TOKEN=${refreshToken}`, colors.cyan);
    console.log('\n');

  } catch (error) {
    printColor('Error exchanging code for token:', colors.red);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    rl.close();
    process.exit(1);
  }

  rl.close();
}

main().catch((error) => {
  printColor('Unexpected error:', colors.red);
  console.error(error);
  rl.close();
  process.exit(1);
});

