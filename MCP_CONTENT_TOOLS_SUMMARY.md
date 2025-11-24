# MCP Content & Structure Tools - Summary

**Date:** January 25, 2025
**Status:** Recommendations ready to implement

---

## 🎯 What You Need

Based on your portfolio site analysis:
- ✅ **25+ pages** with varying content styles
- ✅ **Cinematic tone** guidelines (confident, intelligent, warmly human)
- ✅ **Complex site structure** (case studies, projects, applications)
- ✅ **Content consistency** challenges
- ✅ **Layout organization** improvements needed

---

## 🚀 Top Recommendations

### 1. **Memory MCP Server** ⭐ HIGHEST PRIORITY

**Why:** Maintains your brand voice across all content

**What it does:**
- Stores your "cinematic, confident, intelligent" tone guidelines
- Remembers content style preferences
- Ensures consistency across 25+ pages
- Tracks approved content patterns

**Add to `mcp.json`:**
```json
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"],
  "env": {}
}
```

**Usage:**
```
use memory to remember my brand voice is cinematic and confident
use memory to check if this content matches my tone guidelines
use memory to recall my content style preferences
```

---

### 2. **Puppeteer MCP Server** ⭐ HIGH PRIORITY

**Why:** Analyzes your entire site structure and layout

**What it does:**
- Crawls all 25+ pages
- Analyzes page structure and layout patterns
- Identifies layout inconsistencies
- Maps content hierarchy and navigation

**Add to `mcp.json`:**
```json
"puppeteer": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
  "env": {}
}
```

**Usage:**
```
use puppeteer to analyze the structure of all my portfolio pages
use puppeteer to check if navigation is consistent across pages
use puppeteer to map the content hierarchy of my site
```

---

### 3. **Content Audit Tool** ✅ READY TO USE

**What it does:**
- Scans all content files for tone consistency
- Checks for style guide violations
- Identifies hedging words, passive voice, jargon
- Generates tone consistency reports

**Already created:** `scripts/content-audit-tool.js`

**Usage:**
```bash
npm run content:audit
```

**Output:** `reports/content-audit-report.json`

---

## 📋 Implementation Steps

### Step 1: Add Memory MCP (5 minutes)

1. Open: `C:\Users\hoosi\.cursor\mcp.json`
2. Add the Memory MCP configuration (see above)
3. Restart Cursor
4. Store your brand voice:
   ```
   use memory to remember my brand voice: cinematic, confident, intelligent, warmly human
   ```

### Step 2: Add Puppeteer MCP (5 minutes)

1. Open: `C:\Users\hoosi\.cursor\mcp.json`
2. Add the Puppeteer MCP configuration (see above)
3. Restart Cursor
4. Analyze your site:
   ```
   use puppeteer to analyze the structure of all my portfolio pages
   ```

### Step 3: Run Content Audit (2 minutes)

```bash
npm run content:audit
```

Review the report in `reports/content-audit-report.json`

---

## 🎯 Specific Use Cases

### Maintain Tone Across Case Studies

**Problem:** 12+ case studies with varying tone

**Solution:**
```
use memory to remember my case study tone guidelines
use filesystem to find all case study content files
use memory to check each case study matches tone guidelines
```

### Ensure Layout Consistency

**Problem:** 25+ pages with different layouts

**Solution:**
```
use puppeteer to analyze layout patterns across all pages
use filesystem to find all page components
use shadcn to ensure consistent component usage
```

### Organize Site Structure

**Problem:** Complex site structure needs organization

**Solution:**
```
use filesystem to map all routes and pages
use puppeteer to analyze navigation structure
use github to document site structure
```

---

## 📊 Expected Benefits

### Content Quality
- ✅ **90%+ tone consistency** across all pages
- ✅ **Unified voice** throughout portfolio
- ✅ **Style guide compliance** automated
- ✅ **Content quality** improvements

### Site Structure
- ✅ **Consistent layouts** across pages
- ✅ **Organized navigation** patterns
- ✅ **Clear content hierarchy**
- ✅ **Improved user experience**

### Development Speed
- ✅ **Faster content creation** with templates
- ✅ **Automated consistency checks**
- ✅ **Reduced review time**
- ✅ **Better organization**

---

## 📚 Documentation Created

1. **`docs/MCP_CONTENT_AND_STRUCTURE_TOOLS.md`**
   - Complete guide with all recommendations
   - Detailed configuration instructions
   - Usage examples
   - Implementation plan

2. **`scripts/content-audit-tool.js`**
   - Automated content analysis
   - Tone consistency checking
   - Style guide enforcement
   - Report generation

3. **`MCP_CONTENT_TOOLS_SUMMARY.md`** (this file)
   - Quick reference
   - Implementation steps
   - Use cases

---

## 🔧 Additional Tools (Optional)

### If Using Notion:
- **Notion MCP** - Store content style guide, plan content

### If Using Airtable:
- **Airtable MCP** - Content inventory, track consistency

### If Using Slack:
- **Slack MCP** - Content collaboration, review workflows

See `docs/MCP_CONTENT_AND_STRUCTURE_TOOLS.md` for full details.

---

## ✅ Quick Start Checklist

- [ ] Add Memory MCP to `mcp.json`
- [ ] Add Puppeteer MCP to `mcp.json`
- [ ] Restart Cursor
- [ ] Store brand voice in Memory MCP
- [ ] Run content audit: `npm run content:audit`
- [ ] Analyze site structure with Puppeteer
- [ ] Review audit report
- [ ] Start using for content consistency

---

## 🎉 Next Steps

1. **Add Memory MCP** - Start maintaining consistent tone
2. **Add Puppeteer MCP** - Analyze site structure
3. **Run content audit** - Check current consistency
4. **Use tools together** - Combine MCP servers for best results

**These tools will significantly improve your content consistency, tone uniformity, and site organization!** 🚀

---

**Last Updated:** January 25, 2025

