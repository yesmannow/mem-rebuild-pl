# MCP Servers - Complete Test Procedures

**Comprehensive testing guide for all MCP servers and tools**

---

## 📋 Overview

This document provides detailed test procedures for:
- All 7 MCP servers
- Content audit tool
- Documentation accuracy
- Integration testing

---

## 🧪 Test 1: Content Audit Tool

### Purpose
Verify the content audit tool correctly analyzes content for tone consistency.

### Prerequisites
- Node.js 20+ installed
- Project dependencies installed (`npm install`)
- Repository cloned locally

### Test Steps

1. **Navigate to project root:**
   ```bash
   cd /path/to/mem-rebuild-pl
   ```

2. **Run content audit:**
   ```bash
   npm run content:audit
   ```

3. **Verify output:**
   - Check console shows scanning progress
   - Verify summary statistics displayed
   - Confirm exit code (0 for success, 1 if issues found)

4. **Check generated report:**
   ```bash
   ls -lh reports/content-audit-report.json
   cat reports/content-audit-report.json | head -50
   ```

### Expected Results

**Console Output:**
```
🔍 Content Audit Tool
Scanning content files...
Found 434 content files

📊 Content Audit Report
Summary:
  Total Files: 434
  Files with Issues: 131
  Clean Files: 303
  Average Tone Score: 93.8/100

Issues Found:
  Ellipsis: 120 files
  Hedging: 32 files
  Passive Voice: 5 files
  Jargon: 1 files
```

**Report File:**
- File exists at `reports/content-audit-report.json`
- File size approximately 70-80 KB
- Valid JSON format
- Contains summary and per-file details

**Report Structure:**
```json
{
  "summary": {
    "totalFiles": 434,
    "filesWithIssues": 131,
    "filesClean": 303,
    "averageToneScore": 93.8
  },
  "issues": {
    "ellipsis": 120,
    "hedging": 32,
    "passiveVoice": 5,
    "jargon": 1
  },
  "files": [...]
}
```

### Pass Criteria
- ✅ Script executes without errors
- ✅ Scans 400+ content files
- ✅ Generates valid JSON report
- ✅ Identifies tone issues correctly
- ✅ Calculates tone scores

### Troubleshooting

**Issue:** `Cannot find module`
- **Solution:** Run `npm install`

**Issue:** Script not found
- **Solution:** Verify `scripts/content-audit-tool.js` exists

**Issue:** No files scanned
- **Solution:** Check you're in project root directory

---

## 🧪 Test 2: Shadcn UI MCP Server

### Purpose
Verify Shadcn UI MCP server provides component information.

### Prerequisites
- Cursor IDE installed
- MCP servers configured in `~/.cursor/mcp.json`
- Cursor restarted after configuration

### Test Steps

1. **Open Cursor IDE**

2. **Open chat interface** (Cmd/Ctrl+L)

3. **Test basic command:**
   ```
   use shadcn to list all available components
   ```

4. **Test component details:**
   ```
   use shadcn to show me button component variants
   ```

5. **Test component implementation:**
   ```
   use shadcn to explain how to implement a card component
   ```

### Expected Results

**List Components:**
- Returns list of shadcn/ui components
- Includes: button, card, dialog, sheet, etc.
- Response from shadcn.io API

**Component Details:**
- Shows component props
- Includes variants (if applicable)
- Provides TypeScript types
- Shows usage examples

**Implementation Help:**
- Step-by-step instructions
- Code examples
- Import statements
- Configuration details

### Pass Criteria
- ✅ Server responds to commands
- ✅ Returns accurate component information
- ✅ Provides up-to-date data (not training data)
- ✅ Response time < 5 seconds

### Troubleshooting

**Issue:** MCP server not found
- **Solution:** Restart Cursor completely
- **Solution:** Check `~/.cursor/mcp.json` exists

**Issue:** No response
- **Solution:** Check network connectivity
- **Solution:** Verify URL: `https://www.shadcn.io/api/mcp`

---

## 🧪 Test 3: Filesystem MCP Server

### Purpose
Verify Filesystem MCP server can access and analyze project files.

### Prerequisites
- Cursor IDE installed
- Project open in Cursor
- MCP servers configured

### Test Steps

1. **Test directory listing:**
   ```
   use filesystem to list all files in src/components/ui
   ```

2. **Test file search:**
   ```
   use filesystem to find all CSS files
   ```

3. **Test pattern matching:**
   ```
   use filesystem to find files containing "shadcn"
   ```

### Expected Results

**Directory Listing:**
- Shows files in `src/components/ui/`
- Lists: button.tsx, card.tsx, dialog.tsx, etc.
- Includes file types

**File Search:**
- Finds CSS files
- Shows file paths
- May include file sizes

**Pattern Matching:**
- Finds files with "shadcn" in content
- Lists matching files
- Shows context (optional)

### Pass Criteria
- ✅ Server accesses project files
- ✅ Returns accurate file listings
- ✅ Search functionality works
- ✅ Response time < 3 seconds

### Troubleshooting

**Issue:** Permission denied
- **Solution:** Check file permissions
- **Solution:** Ensure Cursor has access to project directory

**Issue:** No files found
- **Solution:** Verify project path is correct
- **Solution:** Check files exist in specified paths

---

## 🧪 Test 4: Memory MCP Server

### Purpose
Verify Memory MCP server can store and recall information.

### Prerequisites
- Cursor IDE with MCP servers configured
- Cursor restarted after configuration

### Test Steps

1. **Store brand voice:**
   ```
   use memory to remember my brand voice is: cinematic, confident, intelligent, warmly human
   ```

2. **Store style guidelines:**
   ```
   use memory to remember I avoid: hedging words like might, try, attempt
   ```

3. **Recall information:**
   ```
   use memory to recall my brand voice
   ```

4. **Check content:**
   ```
   use memory to check if this matches my brand voice: "I might try to create something"
   ```

### Expected Results

**Store Information:**
- Confirms information stored
- No errors
- Quick response

**Recall Information:**
- Returns exactly what was stored
- Complete information
- Formatted clearly

**Content Check:**
- Identifies "might" and "try" as hedging words
- Flags as not matching brand voice
- Provides explanation

### Pass Criteria
- ✅ Successfully stores information
- ✅ Accurately recalls stored data
- ✅ Persists across commands
- ✅ Correctly evaluates content

### Troubleshooting

**Issue:** Information not recalled
- **Solution:** Restart Cursor
- **Solution:** Re-store information

**Issue:** Server not responding
- **Solution:** Check MCP configuration
- **Solution:** Verify NPX command works

---

## 🧪 Test 5: Puppeteer MCP Server

### Purpose
Verify Puppeteer MCP server can navigate and analyze web pages.

### Prerequisites
- Development server running (`npm run dev`)
- Site accessible at `http://localhost:5173`
- Cursor IDE with MCP configured

### Test Steps

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test navigation:**
   ```
   use puppeteer to navigate to http://localhost:5173
   ```

3. **Analyze homepage:**
   ```
   use puppeteer to analyze the homepage structure at http://localhost:5173
   ```

4. **Check navigation:**
   ```
   use puppeteer to check navigation consistency across pages
   ```

### Expected Results

**Navigation:**
- Successfully loads page
- No navigation errors
- Confirms page loaded

**Structure Analysis:**
- Describes page layout
- Lists main sections
- Identifies navigation elements
- Reports on content hierarchy

**Navigation Check:**
- Analyzes multiple pages
- Compares navigation across pages
- Reports consistency or inconsistencies
- Lists navigation patterns

### Pass Criteria
- ✅ Successfully navigates to pages
- ✅ Analyzes page structure
- ✅ Provides detailed insights
- ✅ No browser errors

### Troubleshooting

**Issue:** Cannot connect
- **Solution:** Ensure dev server is running
- **Solution:** Check URL is correct
- **Solution:** Try deployed URL instead

**Issue:** Timeout errors
- **Solution:** Increase timeout settings
- **Solution:** Check page loads in regular browser

---

## 🧪 Test 6: GitHub MCP Server

### Purpose
Verify GitHub MCP server can access repository information.

### Prerequisites
- GitHub Personal Access Token configured
- Token has `repo` scope
- Cursor restarted after token added

### Test Steps

1. **Test repository listing:**
   ```
   use github to list repositories
   ```

2. **Test repository details:**
   ```
   use github to show details for mem-rebuild-pl repository
   ```

3. **Test file access:**
   ```
   use github to show me the README.md file
   ```

### Expected Results

**Repository Listing:**
- Shows user's repositories
- Includes repository names
- May include descriptions

**Repository Details:**
- Shows repository information
- Includes branches, issues, PRs
- Provides stats

**File Access:**
- Returns file content
- Shows README.md
- Proper formatting

### Pass Criteria
- ✅ Successfully authenticates
- ✅ Lists repositories
- ✅ Accesses repository data
- ✅ Returns file contents

### Troubleshooting

**Issue:** Authentication failed
- **Solution:** Verify token is correct
- **Solution:** Check token hasn't expired
- **Solution:** Ensure token has `repo` scope

**Issue:** Token format error
- **Solution:** Token should start with `ghp_`
- **Solution:** Remove extra spaces/quotes
- **Solution:** Regenerate token if needed

---

## 🧪 Test 7: Brave Search MCP Server

### Purpose
Verify Brave Search MCP server can perform web searches.

### Prerequisites
- Brave Search API key configured
- Cursor restarted after API key added

### Test Steps

1. **Test basic search:**
   ```
   use brave-search to search for "design systems"
   ```

2. **Test specific query:**
   ```
   use brave-search to find accessibility best practices for forms
   ```

3. **Test design research:**
   ```
   use brave-search to find modern hero section patterns
   ```

### Expected Results

**Basic Search:**
- Returns search results
- Includes titles and URLs
- Shows relevant results

**Specific Query:**
- Finds relevant articles
- Shows accessibility resources
- Quality results

**Design Research:**
- Returns design examples
- Shows relevant patterns
- Useful resources

### Pass Criteria
- ✅ Successfully performs searches
- ✅ Returns relevant results
- ✅ No API errors
- ✅ Response time reasonable

### Troubleshooting

**Issue:** API error
- **Solution:** Check API key is correct
- **Solution:** Verify API quota not exceeded
- **Solution:** Check API key hasn't expired

**Issue:** No results
- **Solution:** Try different search terms
- **Solution:** Check network connectivity

---

## 🧪 Test 8: Integration Testing

### Purpose
Test multiple MCP servers working together.

### Test Scenarios

#### Scenario 1: Design System Consistency

```
1. use filesystem to list all button components
2. use shadcn to show me the official button component
3. use memory to remember the button component structure
4. Compare and identify inconsistencies
```

**Expected:** Identifies any buttons not following shadcn patterns

#### Scenario 2: Content Tone Check

```
1. use filesystem to find all case study content
2. use memory to check each case study matches brand voice
3. npm run content:audit
4. Review combined results
```

**Expected:** Comprehensive tone analysis from multiple sources

#### Scenario 3: Site Structure Analysis

```
1. use puppeteer to analyze homepage structure
2. use filesystem to map component usage
3. use github to check documentation matches implementation
```

**Expected:** Complete site structure overview

### Pass Criteria
- ✅ Servers work independently
- ✅ Data from one server informs another
- ✅ No conflicts between servers
- ✅ Combined insights valuable

---

## 📊 Test Results Template

Use this template to record test results:

```
## Test Run: [Date]

### Environment
- Node.js version: [version]
- Cursor version: [version]
- Operating System: [OS]

### Test Results

| Test | Status | Notes |
|------|--------|-------|
| Content Audit Tool | ✅/❌ | |
| Shadcn UI MCP | ✅/❌ | |
| Filesystem MCP | ✅/❌ | |
| Memory MCP | ✅/❌ | |
| Puppeteer MCP | ✅/❌ | |
| GitHub MCP | ✅/❌ | |
| Brave Search MCP | ✅/❌ | |
| Integration Tests | ✅/❌ | |

### Issues Found
[List any issues]

### Recommendations
[List recommendations]
```

---

## ✅ Complete Test Checklist

- [ ] Content audit tool runs successfully
- [ ] Content audit generates report
- [ ] Shadcn UI MCP returns component list
- [ ] Shadcn UI MCP provides component details
- [ ] Filesystem MCP lists files
- [ ] Filesystem MCP searches files
- [ ] Memory MCP stores information
- [ ] Memory MCP recalls information
- [ ] Puppeteer MCP navigates to site
- [ ] Puppeteer MCP analyzes structure
- [ ] GitHub MCP lists repositories (if configured)
- [ ] Brave Search MCP performs searches (if configured)
- [ ] Integration test: Design consistency
- [ ] Integration test: Content tone
- [ ] Integration test: Site structure

---

## 📚 Related Documentation

- **Verification Checklist:** `docs/MCP_VERIFICATION_CHECKLIST.md`
- **Setup Instructions:** `docs/MCP_SETUP_INSTRUCTIONS.md`
- **Quick Test Commands:** `MCP_QUICK_TEST_COMMANDS.md`
- **User Guide:** `MCP_USER_QUICK_START.md`

---

**Last Updated:** November 24, 2025
