# GitHub Token Type Guide - Classic vs Fine-Grained

**For GitHub MCP Server:** Use **Classic Token** ✅

---

## 🎯 Quick Answer

**Use: Classic Token** (not fine-grained)

The GitHub MCP server works best with classic tokens because:
- ✅ Simpler setup
- ✅ Broader permissions that MCP needs
- ✅ Better compatibility with the MCP server package
- ✅ Easier to configure

---

## 📋 Step-by-Step: Creating a Classic Token

1. **Go to GitHub Settings:**
   - Visit: https://github.com/settings/tokens
   - Or: GitHub → Your Profile → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate Classic Token:**
   - Click **"Generate new token"** dropdown
   - Select **"Generate new token (classic)"** ← Important!
   - NOT "Generate new token (fine-grained)"

3. **Configure Token:**
   - **Note:** `Cursor MCP Server` (or any name you prefer)
   - **Expiration:** Choose your preference (90 days recommended)
   - **Select scopes:**
     - ✅ **`repo`** - Full control of private repositories
       - This gives access to repositories, issues, PRs, etc.
       - Required for the MCP server to work

4. **Generate and Copy:**
   - Click "Generate token"
   - **Copy the token immediately** (starts with `ghp_`)
   - You won't be able to see it again!

5. **Add to MCP Config:**
   - Open: `C:\Users\hoosi\.cursor\mcp.json`
   - Find line 94
   - Replace `YOUR_GITHUB_TOKEN_HERE` with your token
   - Save and restart Cursor

---

## 🔍 Classic Token vs Fine-Grained Token

### Classic Token ✅ (Recommended for MCP)

**Pros:**
- ✅ Simple setup
- ✅ Works immediately with MCP server
- ✅ Broad permissions (what MCP needs)
- ✅ Well-tested with MCP packages

**Cons:**
- ⚠️ Less granular control
- ⚠️ Broader permissions than needed

**Best for:** MCP servers, automation, tools

---

### Fine-Grained Token ❌ (Not Recommended for MCP)

**Pros:**
- ✅ More secure (granular permissions)
- ✅ Better for specific repositories
- ✅ Modern approach

**Cons:**
- ❌ More complex setup
- ❌ May not work with all MCP server features
- ❌ Requires repository-specific configuration
- ❌ May need additional permissions that aren't obvious

**Best for:** Specific repository access with minimal permissions

---

## ✅ Recommended Classic Token Scopes

For GitHub MCP Server, you need:

**Minimum Required:**
- ✅ **`repo`** - Full control of private repositories
  - Includes: Read/write access to code, issues, PRs, etc.

**Optional (if you want more features):**
- `read:org` - Read org and team membership (if using org repos)
- `read:user` - Read user profile information

**For most use cases, just `repo` is enough!**

---

## 📝 Example: Creating Classic Token

1. Go to: https://github.com/settings/tokens
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in:
   - **Note:** `Cursor MCP Server`
   - **Expiration:** `90 days` (or your preference)
   - **Scopes:** Check ✅ `repo`
4. Click: **"Generate token"**
5. Copy the token (starts with `ghp_`)
6. Paste into `mcp.json` at line 94

---

## 🔒 Security Best Practices

Even with classic tokens:

1. **Use minimal scopes** - Only check `repo` if that's all you need
2. **Set expiration** - Don't use "No expiration" unless necessary
3. **Rotate regularly** - Create new tokens every 90 days
4. **Never commit tokens** - `mcp.json` is in your home directory, not in git
5. **Revoke unused tokens** - Delete old tokens you're not using

---

## 🐛 Troubleshooting

### "Token doesn't work"
- Make sure you selected **"Generate new token (classic)"**
- Verify you checked the `repo` scope
- Check token hasn't expired
- Restart Cursor after adding token

### "Insufficient permissions"
- Make sure `repo` scope is checked
- Verify token is a classic token (not fine-grained)
- Check token hasn't been revoked

### "Fine-grained token not working"
- Switch to classic token instead
- Fine-grained tokens may not work with all MCP features

---

## ✅ Summary

**For GitHub MCP Server:**
- ✅ Use **Classic Token**
- ✅ Select **`repo`** scope
- ✅ Token starts with `ghp_`
- ✅ Add to line 94 in `mcp.json`

**Don't use fine-grained tokens** - They're more complex and may not work properly with the MCP server.

---

**Last Updated:** January 25, 2025

