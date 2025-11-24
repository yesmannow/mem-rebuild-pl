# MCP Configuration

This directory contains the MCP (Model Context Protocol) server configuration.

## Configuration File

The `config.json` file defines the MCP servers available for this project.

## Setting Up Credentials

The configuration file contains placeholder values for sensitive credentials. To use the GitHub and Brave Search MCP servers, you need to replace the placeholder values with your actual credentials:

### GitHub MCP Server

1. Generate a GitHub Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: `Cursor MCP Server`
   - Select scopes:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `read:org` (Read org and team membership)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. Replace the placeholder in `config.json`:
   ```json
   "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN_HERE"
   ```
   with your actual token:
   ```json
   "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_actual_token_here"
   ```

### Brave Search MCP Server

1. Get a Brave Search API Key:
   - Go to: https://brave.com/search/api/
   - Sign up or log in
   - Navigate to API Keys section
   - Create a new API key
   - **Copy the API key**

2. Replace the placeholder in `config.json`:
   ```json
   "BRAVE_API_KEY": "YOUR_BRAVE_API_KEY_HERE"
   ```
   with your actual API key:
   ```json
   "BRAVE_API_KEY": "your_actual_api_key_here"
   ```

## Security Note

⚠️ **IMPORTANT**: Never commit actual credentials to version control!

- The `config.json` file is tracked in git but should only contain placeholder values
- For local development:
  1. Edit the placeholders in `config.json` with your actual credentials for local use
  2. **IMPORTANT**: Never commit these changes back to the repository
  3. Keep your local changes separate from commits you push to the repository

## Available MCP Servers

### GitHub
- **Command**: `npx @modelcontextprotocol/server-github`
- **Purpose**: Access GitHub repositories, issues, PRs, and documentation
- **Requires**: GitHub Personal Access Token

### Brave Search
- **Command**: `npx @modelcontextprotocol/server-brave-search`
- **Purpose**: Web search functionality
- **Requires**: Brave Search API Key

For more information about MCP servers, see the main [MCP_README.md](../MCP_README.md) in the project root.
