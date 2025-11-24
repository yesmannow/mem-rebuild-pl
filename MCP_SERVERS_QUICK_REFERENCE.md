# MCP Servers Quick Reference

**Date:** January 25, 2025
**Status:** ✅ All servers configured

---

## 🎯 Ready to Use (No Setup Required)

### ✅ Shadcn UI MCP
**Status:** Working immediately

**Test:**
```
use shadcn to list all available components
use shadcn to show me button component variants
```

**Benefits:**
- Real-time shadcn/ui component information
- Accurate TypeScript props
- Design system consistency

---

### ✅ Filesystem MCP
**Status:** Working immediately

**Test:**
```
use filesystem to list all components in src/components/ui
use filesystem to find all CSS files using design tokens
```

**Benefits:**
- Component discovery
- Asset management
- Style sheet analysis

---

## ⚠️ Needs Configuration

### 🔑 GitHub MCP
**Status:** Needs GitHub Personal Access Token

**Quick Setup:**
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic) with `repo` scope
3. Replace `YOUR_GITHUB_TOKEN_HERE` in `~/.cursor/mcp.json`
4. Restart Cursor

**Test:**
```
use github to list repositories
use github to show me design system documentation
```

**Full Instructions:** See `docs/MCP_SETUP_INSTRUCTIONS.md`

---

### 🔑 Brave Search MCP
**Status:** Needs Brave Search API Key

**Quick Setup:**
1. Go to: https://brave.com/search/api/
2. Sign up and get API key
3. Replace `YOUR_BRAVE_API_KEY_HERE` in `~/.cursor/mcp.json`
4. Restart Cursor

**Test:**
```
use brave-search to find modern design patterns
use brave-search to research accessibility best practices
```

**Full Instructions:** See `docs/MCP_SETUP_INSTRUCTIONS.md`

---

### 🔑 PostgreSQL MCP (Optional)
**Status:** Only if using PostgreSQL database

**Quick Setup:**
1. Get PostgreSQL connection string
2. Replace `YOUR_POSTGRES_CONNECTION_STRING_HERE` in `~/.cursor/mcp.json`
3. Restart Cursor

**Or:** Remove this section if not using PostgreSQL

**Full Instructions:** See `docs/MCP_SETUP_INSTRUCTIONS.md`

---

## 📋 Configuration File Location

**Windows:** `C:\Users\hoosi\.cursor\mcp.json`

**All servers are already added!** Just need to add API keys/tokens for some.

---

## 🚀 Usage Examples

### Design Uniformity
```
# Find inconsistent components
use filesystem to find all button components and compare their props

# Check shadcn/ui patterns
use shadcn to show me how my card component should be structured

# Research design patterns
use brave-search to find modern spacing systems
```

### Style Consistency
```
# Analyze design tokens
use filesystem to find all CSS files using color variables

# Review documentation
use github to show me the design system documentation

# Find best practices
use brave-search to research typography scales
```

### Content Improvements
```
# Component discovery
use filesystem to list all interactive components

# Documentation review
use github to show me component examples

# Research content patterns
use brave-search to find accessibility content guidelines
```

---

## 📚 Documentation

- **Setup Guide:** `docs/MCP_SETUP_INSTRUCTIONS.md` - Complete setup instructions
- **Full Guide:** `docs/MCP_SERVERS_GUIDE.md` - Detailed usage and examples
- **Integration Summary:** `MCP_INTEGRATION_SUMMARY.md` - What was done

---

## ✅ Next Steps

1. ✅ **Shadcn UI** - Start using it now!
2. ✅ **Filesystem** - Start using it now!
3. ⏳ **GitHub** - Get token (5 minutes)
4. ⏳ **Brave Search** - Get API key (5 minutes)
5. ⏳ **PostgreSQL** - Configure only if needed

**Restart Cursor after adding API keys!**

---

**Last Updated:** January 25, 2025

