# MCP Servers - User Quick Start Guide

**Get started with MCP servers in 5 minutes!** 🚀

---

## 🎯 What Are MCP Servers?

MCP (Model Context Protocol) servers give Cursor AI access to specialized tools and data sources:
- **Shadcn UI**: Component library information
- **Filesystem**: Enhanced file operations
- **GitHub**: Repository access
- **Memory**: Brand voice consistency
- **Puppeteer**: Site structure analysis
- **Brave Search**: Web search capabilities
- **PostgreSQL**: Database operations (optional)

---

## ⚡ Quick Start (3 Easy Steps)

### Step 1: Verify Configuration ✅

Your MCP servers are already configured in:
- **Location:** `~/.cursor/mcp.json` (user's home directory)
- **Status:** 4 ready to use, 3 need tokens

### Step 2: Restart Cursor

Close and reopen Cursor completely for MCP servers to load.

### Step 3: Test It!

In Cursor's chat interface, type:
```
use shadcn to list all available components
```

If you see a list of shadcn/ui components, it's working! 🎉

---

## 🚀 First Steps for Each MCP Server

### 1. Shadcn UI MCP (Ready Now) ✅

**What it does:** Access to shadcn/ui component library

**Try this:**
```
use shadcn to list all available components
use shadcn to show me button component variants
use shadcn to implement a card component
```

**Use for:**
- Finding components
- Getting component props
- Implementing design system components

---

### 2. Filesystem MCP (Ready Now) ✅

**What it does:** Enhanced file and directory operations

**Try this:**
```
use filesystem to list all components in src/components/ui
use filesystem to find all CSS files
use filesystem to analyze component structure
```

**Use for:**
- Finding files
- Analyzing project structure
- Managing design assets

---

### 3. Memory MCP (Ready Now) ✅

**What it does:** Stores your brand voice and style guidelines

**First, store your preferences:**
```
use memory to remember my brand voice is: cinematic, confident, intelligent, warmly human
use memory to remember I avoid: hedging words like might, try, attempt
```

**Then check content:**
```
use memory to recall my brand voice
use memory to check if this content matches my guidelines: "I might try to create something"
```

**Use for:**
- Maintaining consistent tone
- Checking content against brand voice
- Storing style preferences

---

### 4. Puppeteer MCP (Ready Now) ✅

**What it does:** Analyzes site structure and layout

**Make sure dev server is running:** `npm run dev`

**Try this:**
```
use puppeteer to navigate to http://localhost:5173
use puppeteer to analyze the homepage structure
use puppeteer to check navigation consistency
```

**Use for:**
- Analyzing page layouts
- Checking navigation patterns
- Site structure analysis

---

### 5. GitHub MCP (Needs Token) ⚠️

**Setup Time:** 5 minutes

**Quick Setup:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Check scope: `repo`
4. Copy token (starts with `ghp_`)
5. Open `~/.cursor/mcp.json`
6. Replace `YOUR_GITHUB_TOKEN_HERE` with your token
7. Restart Cursor

**Try this:**
```
use github to list repositories
use github to show me design system documentation
```

**Full Guide:** `docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md`

---

### 6. Brave Search MCP (Needs API Key) ⚠️

**Setup Time:** 5 minutes

**Quick Setup:**
1. Go to: https://brave.com/search/api/
2. Sign up (free tier available)
3. Get API key
4. Open `~/.cursor/mcp.json`
5. Replace `YOUR_BRAVE_API_KEY_HERE` with your key
6. Restart Cursor

**Try this:**
```
use brave-search to search for "design systems"
use brave-search to find accessibility best practices
```

**Full Guide:** `docs/MCP_SETUP_INSTRUCTIONS.md`

---

### 7. PostgreSQL MCP (Optional) ⚠️

**Only needed if using PostgreSQL database**

Skip this unless you're using PostgreSQL for content management.

**Full Guide:** `docs/MCP_SETUP_INSTRUCTIONS.md`

---

## 🎯 Common Usage Patterns

### Design Uniformity

```
# Check component consistency
use filesystem to find all button components
use shadcn to show me the official button component
# Compare and update as needed

# Ensure design system compliance
use filesystem to list all components in src/components/ui
use shadcn to verify each follows shadcn/ui patterns
```

### Content Consistency

```
# Store brand voice first
use memory to remember my brand voice is cinematic and confident

# Check content
use memory to check if this case study matches my brand voice

# Analyze tone across all pages
npm run content:audit
# Review reports/content-audit-report.json
```

### Site Structure Analysis

```
# Make sure dev server is running
npm run dev

# Analyze structure
use puppeteer to navigate to http://localhost:5173
use puppeteer to analyze homepage structure and navigation
use puppeteer to check layout consistency across pages
```

### Research & Discovery

```
# Find design patterns
use brave-search to find modern hero section patterns

# Research components
use brave-search to find accessible form patterns

# Check repository examples
use github to show me component examples
```

---

## 🛠️ Content Audit Tool

**What it does:** Analyzes all content for tone consistency

**Run it:**
```bash
npm run content:audit
```

**Results:**
- Scans 400+ content files
- Checks for hedging words, passive voice, jargon
- Generates tone scores
- Creates report: `reports/content-audit-report.json`

**Review the report to find:**
- Files needing tone improvements
- Consistency issues
- Style guide violations

---

## 📚 Where to Go Next

### Quick Reference
- **Test Commands:** `MCP_QUICK_TEST_COMMANDS.md`
- **Server Status:** `MCP_SERVERS_QUICK_REFERENCE.md`
- **How to Use:** `HOW_TO_USE_MCP_COMMANDS.md`

### Detailed Guides
- **Complete Guide:** `docs/MCP_SERVERS_GUIDE.md`
- **Setup Instructions:** `docs/MCP_SETUP_INSTRUCTIONS.md`
- **Token Setup:** `docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md`

### Testing & Verification
- **Test Guide:** `docs/MCP_MEMORY_PUPPETEER_TEST_GUIDE.md`
- **Verification:** `docs/MCP_VERIFICATION_CHECKLIST.md`

### All Documentation
- **File Index:** `MCP_FILES_INDEX.md`

---

## ⚠️ Important Tips

### MCP Commands Location
**Type MCP commands in Cursor's chat interface**, not in the terminal!

✅ **Correct:** Type in Cursor chat window
```
use memory to remember my brand voice is cinematic
```

❌ **Incorrect:** Don't type in terminal
```bash
$ use memory to remember...  # This won't work!
```

### Restart After Changes
Always restart Cursor completely after:
- Adding tokens/API keys
- Changing configuration
- Installing new MCP servers

### Natural Language Works Too
Instead of formal commands, you can ask naturally:
```
Can you remember that my brand voice is cinematic and confident?
Can you analyze the structure of my homepage?
```

---

## 🐛 Troubleshooting

### MCP Server Not Working?

1. **Restart Cursor** (most common fix)
2. Check `~/.cursor/mcp.json` is valid JSON
3. Verify tokens/API keys are correct
4. Check for extra spaces or quotes

### Content Audit Fails?

1. Make sure you're in project root
2. Run `npm install` if needed
3. Check Node.js version (20+)

### Puppeteer Can't Access Site?

1. Make sure dev server is running: `npm run dev`
2. Check URL is correct: `http://localhost:5173`
3. Or use deployed URL instead

---

## 🎉 Ready to Use!

**You now have:**
- ✅ 4 MCP servers ready to use
- ✅ Complete documentation
- ✅ Content audit tool
- ✅ Step-by-step guides

**Start with:**
1. Test Shadcn UI MCP
2. Run content audit
3. Store your brand voice in Memory MCP
4. Analyze your site with Puppeteer

**Need help?** See detailed documentation in `docs/` folder.

---

**Questions?** See `docs/MCP_SERVERS_GUIDE.md` for comprehensive information!

**Happy coding!** 🚀
