# MCP Tools for Content, Tone, Style & Site Structure

**Date:** January 25, 2025
**Purpose:** Additional MCP servers and tools to improve content quality, uniform tone/style, and site organization

---

## 🎯 Your Current Needs

Based on your portfolio site analysis:
- ✅ **25+ pages** with varying content styles
- ✅ **Cinematic tone** guidelines already established
- ✅ **Complex site structure** (case studies, projects, applications)
- ✅ **Content consistency** challenges across pages
- ✅ **Layout organization** improvements needed

---

## 🚀 Recommended MCP Servers

### 1. **Memory MCP Server** ⭐ HIGH PRIORITY
**Purpose:** Maintain consistent tone and style across all content

**What it does:**
- Stores your brand voice guidelines
- Remembers content patterns and preferences
- Ensures consistent tone across all pages
- Tracks style decisions

**Configuration:**
```json
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"],
  "env": {}
}
```

**Benefits for your site:**
- ✅ Maintains "cinematic, confident, intelligent" tone
- ✅ Remembers your content style guide
- ✅ Ensures consistency across 25+ pages
- ✅ Tracks approved content patterns

**Usage:**
```
use memory to remember my brand voice is cinematic and confident
use memory to check if this content matches my tone guidelines
use memory to recall my content style preferences
```

---

### 2. **Puppeteer/Playwright MCP** ⭐ HIGH PRIORITY
**Purpose:** Analyze site structure, layout, and content organization

**What it does:**
- Crawls your entire site
- Analyzes page structure
- Identifies layout inconsistencies
- Maps content hierarchy
- Checks navigation patterns

**Configuration:**
```json
"puppeteer": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
  "env": {}
}
```

**Benefits for your site:**
- ✅ Analyzes all 25+ pages for structure consistency
- ✅ Identifies layout patterns across pages
- ✅ Maps navigation and content hierarchy
- ✅ Finds structural inconsistencies

**Usage:**
```
use puppeteer to analyze the structure of all my portfolio pages
use puppeteer to check if navigation is consistent across pages
use puppeteer to map the content hierarchy of my site
```

---

### 3. **Slack MCP** (If using Slack)
**Purpose:** Content collaboration and review workflow

**Configuration:**
```json
"slack": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-slack"],
  "env": {
    "SLACK_BOT_TOKEN": "YOUR_SLACK_BOT_TOKEN"
  }
}
```

**Benefits:**
- Content review workflows
- Team collaboration on tone/style
- Approval processes

---

### 4. **Notion MCP** (If using Notion)
**Purpose:** Content planning and style guide management

**Configuration:**
```json
"notion": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-notion"],
  "env": {
    "NOTION_API_KEY": "YOUR_NOTION_API_KEY"
  }
}
```

**Benefits:**
- Store content style guide
- Plan content structure
- Track content consistency
- Manage editorial calendar

---

### 5. **Airtable MCP** (If using Airtable)
**Purpose:** Content inventory and organization

**Configuration:**
```json
"airtable": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-airtable"],
  "env": {
    "AIRTABLE_API_KEY": "YOUR_API_KEY",
    "AIRTABLE_BASE_ID": "YOUR_BASE_ID"
  }
}
```

**Benefits:**
- Content inventory across all pages
- Track tone/style consistency
- Organize content by type
- Content audit and planning

---

## 🛠️ Additional Tools (Non-MCP)

### Content & Writing Tools

#### 1. **Grammarly API** (If available)
- Tone consistency checking
- Style guide enforcement
- Content quality analysis

#### 2. **Hemingway Editor Integration**
- Readability analysis
- Sentence structure improvement
- Tone consistency

#### 3. **Readable.io API**
- Content scoring
- Tone analysis
- Readability metrics

---

### Structure & Layout Tools

#### 1. **Site Structure Analyzer Script**
Create a custom script to:
- Map all routes and pages
- Analyze component usage patterns
- Identify layout inconsistencies
- Generate structure reports

#### 2. **Content Audit Script**
Custom tool to:
- Scan all content files
- Check tone consistency
- Identify style deviations
- Generate content reports

---

## 📋 Recommended Implementation Plan

### Phase 1: Content Consistency (Week 1)

1. **Add Memory MCP Server**
   - Store your brand voice guidelines
   - Document content style preferences
   - Create tone reference

2. **Content Audit Script**
   - Scan all pages for tone consistency
   - Identify style deviations
   - Generate improvement report

**Commands:**
```
use memory to remember my brand voice: cinematic, confident, intelligent, warmly human
use memory to store my content style guide
use filesystem to analyze all content files for tone consistency
```

---

### Phase 2: Structure Analysis (Week 2)

1. **Add Puppeteer MCP Server**
   - Crawl entire site
   - Analyze page structure
   - Map navigation patterns

2. **Structure Analysis**
   - Identify layout inconsistencies
   - Map content hierarchy
   - Generate structure report

**Commands:**
```
use puppeteer to analyze the structure of all my portfolio pages
use puppeteer to check navigation consistency
use filesystem to map component usage across pages
```

---

### Phase 3: Content Management (Week 3)

1. **Add Notion/Airtable MCP** (if using)
   - Store content style guide
   - Track content inventory
   - Plan improvements

2. **Content Organization**
   - Organize content by type
   - Create content templates
   - Establish review process

---

## 🎯 Specific Use Cases for Your Site

### 1. **Tone Consistency Across Case Studies**

**Problem:** 12+ case studies with varying tone

**Solution:**
```
use memory to remember my case study tone guidelines
use filesystem to find all case study content files
use memory to check each case study matches tone guidelines
```

### 2. **Layout Consistency Across Pages**

**Problem:** 25+ pages with different layouts

**Solution:**
```
use puppeteer to analyze layout patterns across all pages
use filesystem to find all page components
use shadcn to ensure consistent component usage
```

### 3. **Content Structure Organization**

**Problem:** Complex site structure needs organization

**Solution:**
```
use filesystem to map all routes and pages
use puppeteer to analyze navigation structure
use github to document site structure
```

### 4. **Style Guide Enforcement**

**Problem:** Ensure all content follows style guide

**Solution:**
```
use memory to store style guide
use filesystem to scan all content
use memory to verify style compliance
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

## 🔧 Quick Setup Commands

### Add Memory MCP
```json
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"],
  "env": {}
}
```

### Add Puppeteer MCP
```json
"puppeteer": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
  "env": {}
}
```

---

## 📚 Documentation to Create

1. **Content Style Guide** (store in Memory MCP)
   - Tone: Cinematic, Confident, Intelligent, Warmly Human
   - Writing patterns
   - Approved phrases
   - Avoided patterns

2. **Site Structure Map**
   - All routes documented
   - Component usage patterns
   - Layout standards

3. **Content Templates**
   - Case study template
   - Project template
   - Page template

---

## 🎉 Next Steps

1. **Add Memory MCP** - Start storing your brand voice
2. **Add Puppeteer MCP** - Analyze site structure
3. **Create content audit script** - Check consistency
4. **Document style guide** - Store in Memory MCP
5. **Run structure analysis** - Map your site

---

**These tools will significantly improve your content consistency, tone uniformity, and site organization!** 🚀

**Last Updated:** January 25, 2025

