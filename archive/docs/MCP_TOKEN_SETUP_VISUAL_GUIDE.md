# MCP Token Setup - Visual Guide

**File Location:** `C:\Users\hoosi\.cursor\mcp.json`

---

## 📍 Where to Add Your Tokens

### 1. **GitHub Token** (Line 94)

**Find this section:**
```json
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN_HERE"  ← REPLACE THIS
  }
}
```

**Replace `YOUR_GITHUB_TOKEN_HERE` with your actual token:**

**Before:**
```json
"GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN_HERE"
```

**After (example):**
```json
"GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_1234567890abcdefghijklmnopqrstuvwxyz"
```

**⚠️ Important:**
- Keep the quotes around the token
- Don't add any spaces
- The token should start with `ghp_` for classic tokens

---

### 2. **Brave Search API Key** (Line 101)

**Find this section:**
```json
"brave-search": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-brave-search"],
  "env": {
    "BRAVE_API_KEY": "YOUR_BRAVE_API_KEY_HERE"  ← REPLACE THIS
  }
}
```

**Replace `YOUR_BRAVE_API_KEY_HERE` with your actual API key:**

**Before:**
```json
"BRAVE_API_KEY": "YOUR_BRAVE_API_KEY_HERE"
```

**After (example):**
```json
"BRAVE_API_KEY": "BSA_1234567890abcdefghijklmnopqrstuvwxyz"
```

**⚠️ Important:**
- Keep the quotes around the API key
- Don't add any spaces
- The API key format may vary

---

## 🔧 Step-by-Step Instructions

### For GitHub Token:

1. **Get your token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: `Cursor MCP Server`
   - Select scope: ✅ `repo`
   - Click "Generate token"
   - **Copy the token** (starts with `ghp_`)

2. **Open the file:**
   - Open: `C:\Users\hoosi\.cursor\mcp.json`
   - Find line 94 (search for `YOUR_GITHUB_TOKEN_HERE`)

3. **Replace the placeholder:**
   - Replace `YOUR_GITHUB_TOKEN_HERE` with your actual token
   - Keep the quotes: `"ghp_your_actual_token_here"`

4. **Save the file**

5. **Restart Cursor**

---

### For Brave Search API Key:

1. **Get your API key:**
   - Go to: https://brave.com/search/api/
   - Sign up or log in
   - Navigate to API Keys section
   - Create a new API key
   - **Copy the API key**

2. **Open the file:**
   - Open: `C:\Users\hoosi\.cursor\mcp.json`
   - Find line 101 (search for `YOUR_BRAVE_API_KEY_HERE`)

3. **Replace the placeholder:**
   - Replace `YOUR_BRAVE_API_KEY_HERE` with your actual API key
   - Keep the quotes: `"your_actual_api_key_here"`

4. **Save the file**

5. **Restart Cursor**

---

## 📋 Complete Example

Here's what the sections should look like after adding your tokens:

```json
{
  "mcpServers": {
    // ... other servers ...

    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_1234567890abcdefghijklmnopqrstuvwxyz"
      }
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "BSA_1234567890abcdefghijklmnopqrstuvwxyz"
      }
    },

    // ... other servers ...
  }
}
```

---

## ✅ Verification

After adding your tokens:

1. **Save the file**
2. **Restart Cursor completely** (close and reopen)
3. **Test GitHub:**
   ```
   use github to list repositories
   ```
4. **Test Brave Search:**
   ```
   use brave-search to search for "design systems"
   ```

---

## 🔒 Security Notes

- ✅ **Never commit `mcp.json` to git** - It's in your home directory, not the project
- ✅ **Don't share your tokens** - They give access to your accounts
- ✅ **Rotate tokens regularly** - Especially GitHub tokens (every 90 days)
- ✅ **Use minimal scopes** - Only grant necessary permissions

---

## 🐛 Troubleshooting

### "Invalid token" error
- Check for extra spaces or quotes
- Verify token hasn't expired
- Make sure you copied the entire token

### "MCP server not found"
- Restart Cursor after adding tokens
- Check JSON syntax is valid (no trailing commas)
- Verify the file saved correctly

### Token not working
- Verify token has correct permissions/scopes
- Check token hasn't been revoked
- Try generating a new token

---

## 📚 Related Documentation

- **Full Setup Guide:** `docs/MCP_SETUP_INSTRUCTIONS.md`
- **Quick Reference:** `MCP_SERVERS_QUICK_REFERENCE.md`
- **Complete Summary:** `MCP_SERVERS_COMPLETE.md`

---

**Last Updated:** January 25, 2025

