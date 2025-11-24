# MCP Servers Guide - Design System & Development Tools

**Date:** January 25, 2025
**Project:** mem-rebuild-pl

---

## 📋 Overview

This guide explains the MCP (Model Context Protocol) servers configured for this project and how they help improve development efficiency, design consistency, and code quality.

---

## ✅ Currently Configured MCP Servers

### 1. **Shadcn UI MCP Server** ✨ NEW

**Configuration:**
```json
"shadcn": {
  "url": "https://www.shadcn.io/api/mcp"
}
```

**What It Does:**
- Provides Cursor AI with direct access to the shadcn/ui component registry
- Gives real-time, up-to-date component information (not training data)
- Enables accurate TypeScript props and intelligent code completion
- Helps maintain consistency with shadcn/ui patterns

**Why It's Helpful:**
- ✅ **Accurate Component Data**: Cursor knows the exact props, variants, and usage patterns for shadcn/ui components
- ✅ **Better Code Suggestions**: When you ask for components, Cursor can pull from the actual registry
- ✅ **Design Consistency**: Ensures components follow shadcn/ui best practices
- ✅ **Type Safety**: Provides correct TypeScript types for all components

**Usage Examples:**
```
# List all available shadcn/ui components
use shadcn to give me a list of all components available

# Get information about a specific component
use shadcn and give me information about the color picker component

# Implement a component in your app
use shadcn and implement the color picker component in my app

# Get component with specific styling
use shadcn to show me how to use the button component with variants
```

**Your Project Benefits:**
Since you're already using shadcn/ui (I can see `components.json` and components like `dialog.tsx`, `sheet.tsx`, etc.), this MCP server will:
- Help Cursor suggest the correct shadcn/ui components when you need them
- Ensure new components match your existing design system
- Provide accurate prop types and examples
- Speed up component implementation

---

## 🎯 Additional MCP Servers (Now Configured!)

All recommended MCP servers have been added to your configuration. See setup status below:

### 1. **Browser MCP** (Already Available via Extension)
**Purpose:** Test and validate designs in real browsers

**Benefits:**
- Visual regression testing
- Cross-browser compatibility checks
- Responsive design validation
- Accessibility testing in real browsers

**Note:** You may already have this via the Cursor browser extension. Check if `mcp_cursor-browser-extension_*` tools are available.

---

### 2. **GitHub MCP Server** ⚠️ NEEDS TOKEN
**Purpose:** Access repository information, issues, and PRs

**Status:** ⚠️ Configured but needs GitHub Personal Access Token

**Configuration:** Already added to `~/.cursor/mcp.json` (needs token)

**Setup:** See `docs/MCP_SETUP_INSTRUCTIONS.md` for detailed steps

**Benefits:**
- Review design system documentation in your repo
- Access component examples from other projects
- Track design-related issues and PRs
- Reference design tokens and style guides

**Usage:**
```
use github to list repositories
use github to show me design system documentation
```

---

### 3. **Filesystem MCP Server** ✅ CONFIGURED
**Purpose:** Enhanced file operations for design assets

**Status:** ✅ Ready to use immediately

**Configuration:** Already added to `~/.cursor/mcp.json`

**Benefits:**
- Better asset management
- Design system file organization
- Component discovery across the codebase
- Style sheet analysis

**Usage:**
```
use filesystem to list all components in src/components/ui
use filesystem to find all CSS files using design tokens
```

---

### 5. **PostgreSQL MCP Server** ⚠️ OPTIONAL
**Purpose:** Content management and data consistency

**Status:** ⚠️ Configured but optional (only if using PostgreSQL)

**Configuration:** Already added to `~/.cursor/mcp.json` (needs connection string)

**Setup:** See `docs/MCP_SETUP_INSTRUCTIONS.md` for detailed steps

**Benefits:**
- Content uniformity across pages
- Design system data management
- Component usage tracking

**Note:** If not using PostgreSQL, you can remove this section or leave it as-is.

---

### 4. **Brave Search MCP** ⚠️ NEEDS API KEY
**Purpose:** Search for design patterns and UI examples

**Status:** ⚠️ Configured but needs Brave Search API Key

**Configuration:** Already added to `~/.cursor/mcp.json` (needs API key)

**Setup:** See `docs/MCP_SETUP_INSTRUCTIONS.md` for detailed steps

**Benefits:**
- Find design system examples
- Research UI patterns
- Discover accessibility best practices
- Content improvement suggestions

**Usage:**
```
use brave-search to find modern design patterns
use brave-search to research accessibility best practices
```

---

## 🎨 Design System & Uniformity Recommendations

### Using MCP Servers for Design Consistency

1. **Component Discovery**
   ```
   use shadcn to list all available components and show me which ones I should use for [specific feature]
   ```

2. **Style Consistency Checks**
   ```
   use filesystem to analyze all CSS files and identify inconsistent color usage
   ```

3. **Component Audit**
   ```
   use shadcn to compare my current components with shadcn/ui best practices
   ```

4. **Design Pattern Research**
   ```
   use brave-search to find modern design patterns for [feature type]
   ```

---

## 🚀 Quick Start

### Test Shadcn MCP Server

1. **Restart Cursor** after adding the MCP configuration
2. **Try these prompts:**
   ```
   use shadcn to list all available components

   use shadcn and show me how to implement a card component with my design system colors

   use shadcn to help me create a consistent button component that matches my existing design
   ```

### Verify It's Working

If the MCP server is working, Cursor will:
- Reference actual shadcn/ui component documentation
- Provide accurate TypeScript types
- Suggest components that match shadcn/ui patterns
- Give you up-to-date component information

---

## 📊 Impact on Your Project

### Design Uniformity
- ✅ Consistent component usage across all pages
- ✅ Standardized props and variants
- ✅ Design system compliance

### Development Speed
- ✅ Faster component implementation
- ✅ Accurate code suggestions
- ✅ Reduced trial-and-error

### Code Quality
- ✅ Type-safe component usage
- ✅ Best practice adherence
- ✅ Maintainable component patterns

---

## 🔧 Troubleshooting

### MCP Server Not Working?

1. **Check Configuration**
   - Ensure `mcp.json` is in `~/.cursor/` (Windows: `C:\Users\<username>\.cursor\`)
   - JSON syntax is valid
   - URL is correct: `https://www.shadcn.io/api/mcp`

2. **Restart Cursor**
   - Close and reopen Cursor completely
   - MCP servers load on startup

3. **Check Cursor Logs**
   - Look for MCP connection errors
   - Verify network connectivity

4. **Test Connection**
   ```
   # Try a simple prompt
   use shadcn to list components
   ```

---

## 📚 Additional Resources

- [Shadcn MCP Documentation](https://www.shadcn.io/mcp/cursor)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Your Design System Docs](./DESIGN_SYSTEM.md)
- [Component Usage Guide](./UI_COMPONENTS.md)

---

## 🎯 Next Steps

1. ✅ **Shadcn MCP** - Already configured
2. ⏳ **Test the integration** - Try the example prompts above
3. ⏳ **Consider additional MCP servers** - Based on your specific needs
4. ⏳ **Document component patterns** - Use MCP to create a component library guide

---

**Last Updated:** January 25, 2025

