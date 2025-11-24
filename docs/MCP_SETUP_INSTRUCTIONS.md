# MCP Servers Setup Instructions

**Date:** January 25, 2025
**Project:** mem-rebuild-pl

---

## ✅ Currently Configured MCP Servers

All MCP servers have been added to your `~/.cursor/mcp.json` configuration. Some require API keys or tokens to function.

---

## 🚀 Quick Setup Status

| MCP Server | Status | Action Required |
|------------|--------|-----------------|
| **Shadcn UI** | ✅ Ready | None - Works immediately |
| **Filesystem** | ✅ Ready | None - Works immediately |
| **GitHub** | ⚠️ Needs Token | Get GitHub Personal Access Token |
| **Brave Search** | ⚠️ Needs API Key | Get Brave Search API Key |
| **PostgreSQL** | ⚠️ Optional | Only if using PostgreSQL database |
| **Browser** | ✅ Available | Via Cursor Extension (if installed) |

---

## 📝 Step-by-Step Setup

### 1. **Shadcn UI MCP** ✅ (Already Working)

**Status:** Configured and ready to use

**Test it:**
```
use shadcn to list all available components
```

**No action needed!**

---

### 2. **Filesystem MCP** ✅ (Already Working)

**Status:** Configured and ready to use

**What it does:**
- Enhanced file operations for design assets
- Component discovery across your codebase
- Style sheet analysis
- Asset management

**Test it:**
```
use filesystem to list all components in src/components/ui
use filesystem to find all CSS files that use color variables
```

**No action needed!**

---

### 3. **GitHub MCP** ⚠️ (Needs Token)

**Status:** Configured but needs GitHub Personal Access Token

**Why you need it:**
- Access design documentation in your repository
- Track design-related issues and PRs
- Reference design tokens and style guides
- Review component examples

**Setup Steps:**

1. **Create GitHub Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: `Cursor MCP Server`
   - Select scopes:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `read:org` (Read org and team membership)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Update MCP Configuration:**
   - Open: `C:\Users\hoosi\.cursor\mcp.json`
   - Find the `github` section
   - Replace `YOUR_GITHUB_TOKEN_HERE` with your actual token
   - Save the file

3. **Restart Cursor**

**Test it:**
```
use github to list issues in my repository
use github to show me the design system documentation
```

**Security Note:** Never commit your token to git. It's in your local `mcp.json` file which should not be in version control.

---

### 4. **Brave Search MCP** ⚠️ (Needs API Key)

**Status:** Configured but needs Brave Search API Key

**Why you need it:**
- Search for design patterns and UI examples
- Research accessibility best practices
- Find design system examples
- Discover modern UI patterns

**Setup Steps:**

1. **Get Brave Search API Key:**
   - Go to: https://brave.com/search/api/
   - Sign up for a Brave Search API account (free tier available)
   - Navigate to API Keys section
   - Create a new API key
   - **Copy the API key**

2. **Update MCP Configuration:**
   - Open: `C:\Users\hoosi\.cursor\mcp.json`
   - Find the `brave-search` section
   - Replace `YOUR_BRAVE_API_KEY_HERE` with your actual API key
   - Save the file

3. **Restart Cursor**

**Test it:**
```
use brave-search to find modern design patterns for hero sections
use brave-search to research accessibility best practices for forms
```

**Free Tier:** Brave Search API offers a free tier with generous limits for development use.

---

### 5. **PostgreSQL MCP** ⚠️ (Optional)

**Status:** Configured but needs database connection string

**Why you might need it:**
- Content uniformity across pages
- Design system data management
- Component usage tracking
- Content management

**Setup Steps (Only if using PostgreSQL):**

1. **Get Connection String:**
   - Format: `postgresql://username:password@host:port/database`
   - Or use environment variable format

2. **Update MCP Configuration:**
   - Open: `C:\Users\hoosi\.cursor\mcp.json`
   - Find the `postgres` section
   - Replace `YOUR_POSTGRES_CONNECTION_STRING_HERE` with your connection string
   - Save the file

3. **Restart Cursor**

**Note:** If you're not using PostgreSQL, you can remove this section from `mcp.json` or leave it as-is (it won't cause errors).

**Test it:**
```
use postgres to query design system tokens
use postgres to find all components using a specific color
```

---

### 6. **Browser MCP** ✅ (Via Extension)

**Status:** Available if Cursor Browser Extension is installed

**What it does:**
- Visual testing and validation
- Cross-browser compatibility checks
- Responsive design validation
- Accessibility testing in real browsers

**How to use:**
- Install Cursor Browser Extension (if not already installed)
- Use browser tools via Cursor's built-in browser capabilities

**Test it:**
```
use browser to take a screenshot of my homepage
use browser to test responsive design at different breakpoints
```

---

## 🔒 Security Best Practices

### Protecting Your API Keys

1. **Never commit `mcp.json` to git:**
   - Add to `.gitignore` if it's in your project directory
   - Your `~/.cursor/mcp.json` is already outside the project

2. **Use environment variables (optional):**
   - You can reference environment variables in `mcp.json`
   - Example: `"GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"`

3. **Rotate tokens regularly:**
   - GitHub tokens: Every 90 days
   - Brave API keys: As needed

4. **Use minimal scopes:**
   - Only grant necessary permissions
   - GitHub: Use `repo` scope only if needed

---

## ✅ Verification Checklist

After setting up each MCP server:

- [ ] **Shadcn UI** - Test with: `use shadcn to list components`
- [ ] **Filesystem** - Test with: `use filesystem to list files in src/components`
- [ ] **GitHub** - Test with: `use github to list repositories` (after adding token)
- [ ] **Brave Search** - Test with: `use brave-search to search for "design systems"` (after adding key)
- [ ] **PostgreSQL** - Test with: `use postgres to list tables` (if using database)
- [ ] **Browser** - Test with: `use browser to navigate to localhost:3000` (if extension installed)

---

## 🎯 Usage Examples

### Design Uniformity

```
# Find all components using inconsistent colors
use filesystem to find all CSS files and check for hardcoded colors

# Compare with shadcn/ui patterns
use shadcn to show me how my button component compares to the official version

# Research design patterns
use brave-search to find modern card component designs
```

### Style Consistency

```
# Analyze design system usage
use filesystem to find all components using design tokens

# Check GitHub for design documentation
use github to show me the design system documentation

# Find design inspiration
use brave-search to research spacing systems in modern design
```

### Content Improvements

```
# Review component documentation
use github to show me component examples in the repository

# Search for content best practices
use brave-search to find accessibility content guidelines

# Analyze file structure
use filesystem to audit component organization
```

---

## 🐛 Troubleshooting

### MCP Server Not Working?

1. **Check Configuration:**
   - Verify `mcp.json` is valid JSON
   - Check file path: `~/.cursor/mcp.json` (Windows: `C:\Users\<username>\.cursor\mcp.json`)

2. **Restart Cursor:**
   - Close Cursor completely
   - Reopen to reload MCP servers

3. **Check API Keys:**
   - Verify tokens/keys are correct
   - Check for extra spaces or quotes
   - Test API key directly (e.g., GitHub token works in browser)

4. **Check Logs:**
   - Look for MCP connection errors in Cursor logs
   - Verify network connectivity

5. **Test Individual Servers:**
   - Try simple commands first
   - Check if server-specific errors appear

### Common Issues

**"MCP server not found"**
- Verify the server package name is correct
- Check if `npx` is available
- Try running the command manually: `npx -y @modelcontextprotocol/server-github`

**"Authentication failed"**
- Verify API key/token is correct
- Check token hasn't expired
- Verify token has correct permissions/scopes

**"Connection refused"**
- Check network connectivity
- Verify server URL is correct
- Check firewall settings

---

## 📚 Additional Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [Brave Search API](https://brave.com/search/api/)
- [Shadcn MCP Documentation](https://www.shadcn.io/mcp/cursor)
- [Your MCP Guide](./MCP_SERVERS_GUIDE.md)

---

## 🎉 Next Steps

1. ✅ **Shadcn UI** - Already working, start using it!
2. ✅ **Filesystem** - Already working, start using it!
3. ⏳ **GitHub** - Get token and configure
4. ⏳ **Brave Search** - Get API key and configure
5. ⏳ **PostgreSQL** - Configure only if using database
6. ⏳ **Browser** - Install extension if needed

Once configured, these MCP servers will significantly improve your development workflow, design consistency, and code quality!

---

**Last Updated:** January 25, 2025

