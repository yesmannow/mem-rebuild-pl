# MCP Server Integration - README

**Quick navigation guide for all MCP documentation**

---

## 🚀 Start Here

### Brand New to MCP?
→ **Read:** [`MCP_USER_QUICK_START.md`](MCP_USER_QUICK_START.md)
- 5-minute introduction
- What MCP servers are
- How to get started

### Want to See What's Available?
→ **Read:** [`MCP_READY_TO_USE.md`](MCP_READY_TO_USE.md)
- Current status
- What works now
- What needs setup

### Need Quick Reference?
→ **Read:** [`MCP_SERVERS_QUICK_REFERENCE.md`](MCP_SERVERS_QUICK_REFERENCE.md)
- One-page overview
- Common commands
- Quick troubleshooting

---

## 📚 Documentation By Purpose

### Setting Up MCP Servers

| If you need... | Read this... |
|---------------|-------------|
| Step-by-step setup | [`docs/MCP_SETUP_INSTRUCTIONS.md`](docs/MCP_SETUP_INSTRUCTIONS.md) |
| GitHub token help | [`docs/GITHUB_TOKEN_TYPE_GUIDE.md`](docs/GITHUB_TOKEN_TYPE_GUIDE.md) |
| Visual token guide | [`docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md`](docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md) |
| Verification checklist | [`docs/MCP_VERIFICATION_CHECKLIST.md`](docs/MCP_VERIFICATION_CHECKLIST.md) |

### Using MCP Servers Daily

| If you need... | Read this... |
|---------------|-------------|
| Complete server guide | [`docs/MCP_SERVERS_GUIDE.md`](docs/MCP_SERVERS_GUIDE.md) |
| Content tools | [`docs/MCP_CONTENT_AND_STRUCTURE_TOOLS.md`](docs/MCP_CONTENT_AND_STRUCTURE_TOOLS.md) |
| How to use commands | [`HOW_TO_USE_MCP_COMMANDS.md`](HOW_TO_USE_MCP_COMMANDS.md) |
| Quick test commands | [`MCP_QUICK_TEST_COMMANDS.md`](MCP_QUICK_TEST_COMMANDS.md) |

### Testing & Verification

| If you need... | Read this... |
|---------------|-------------|
| Test procedures | [`MCP_TEST_PROCEDURES.md`](MCP_TEST_PROCEDURES.md) |
| Memory/Puppeteer tests | [`docs/MCP_MEMORY_PUPPETEER_TEST_GUIDE.md`](docs/MCP_MEMORY_PUPPETEER_TEST_GUIDE.md) |
| Verification report | [`MCP_VERIFICATION_REPORT.md`](MCP_VERIFICATION_REPORT.md) |

### Understanding the Integration

| If you need... | Read this... |
|---------------|-------------|
| Complete summary | [`MCP_FINAL_SUMMARY.md`](MCP_FINAL_SUMMARY.md) |
| File index | [`MCP_FILES_INDEX.md`](MCP_FILES_INDEX.md) |
| Integration summary | [`MCP_INTEGRATION_SUMMARY.md`](MCP_INTEGRATION_SUMMARY.md) |
| Implementation complete | [`MCP_SERVERS_COMPLETE.md`](MCP_SERVERS_COMPLETE.md) |

---

## 🛠️ Tools & Scripts

### Content Audit Tool

**What it does:**
- Analyzes all content files for tone consistency
- Checks for hedging words, passive voice, jargon
- Generates comprehensive reports

**How to run:**
```bash
npm run content:audit
```

**Output:**
- Console summary
- `reports/content-audit-report.json`

**Documentation:**
- Script: `scripts/content-audit-tool.js`
- Summary: [`MCP_CONTENT_TOOLS_SUMMARY.md`](MCP_CONTENT_TOOLS_SUMMARY.md)

---

## 🎯 The 7 MCP Servers

### Ready to Use (No Setup)

1. **Shadcn UI** - Component library access
   ```
   use shadcn to list all available components
   ```

2. **Filesystem** - Enhanced file operations
   ```
   use filesystem to list files in src/components
   ```

3. **Memory** - Brand voice consistency
   ```
   use memory to remember my brand voice is cinematic
   ```

4. **Puppeteer** - Site structure analysis
   ```
   use puppeteer to navigate to http://localhost:5173
   ```

### Need Configuration (5 min each)

5. **GitHub** - Repository access (needs token)
   - Setup: [`docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md`](docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md)

6. **Brave Search** - Web search (needs API key)
   - Setup: [`docs/MCP_SETUP_INSTRUCTIONS.md`](docs/MCP_SETUP_INSTRUCTIONS.md)

7. **PostgreSQL** - Database operations (optional)
   - Setup: [`docs/MCP_SETUP_INSTRUCTIONS.md`](docs/MCP_SETUP_INSTRUCTIONS.md)

---

## ⚡ Quick Start (3 Steps)

### 1. Read the Quick Start
→ [`MCP_USER_QUICK_START.md`](MCP_USER_QUICK_START.md)

### 2. Test Content Audit
```bash
npm run content:audit
```

### 3. Try MCP Servers (in Cursor chat)
```
use shadcn to list all available components
use filesystem to list files in src/components
```

---

## 📊 What's Included

### Documentation Files
- **19 total documentation files**
- **~3,500+ lines** of documentation
- **Complete coverage** of all 7 servers

### Features
- ✅ Step-by-step setup guides
- ✅ Copy-paste test commands
- ✅ Troubleshooting sections
- ✅ Visual guides
- ✅ Use case examples
- ✅ Integration testing

### Tools
- ✅ Content audit script
- ✅ Report generation
- ✅ Package.json integration

---

## 🎓 Learning Path

### Day 1: Introduction
1. Read: [`MCP_USER_QUICK_START.md`](MCP_USER_QUICK_START.md)
2. Run: `npm run content:audit`
3. Try: Test Shadcn UI and Filesystem MCP

### Day 2: Setup
1. Read: [`docs/MCP_SETUP_INSTRUCTIONS.md`](docs/MCP_SETUP_INSTRUCTIONS.md)
2. Configure: GitHub token (if needed)
3. Test: All configured servers

### Day 3: Usage
1. Read: [`docs/MCP_SERVERS_GUIDE.md`](docs/MCP_SERVERS_GUIDE.md)
2. Try: Real use cases
3. Explore: Combined server workflows

### Ongoing
- Use servers in daily workflow
- Refer to quick reference docs
- Run content audits regularly

---

## 🔍 Find Documentation By Topic

### Brand Voice & Content
- [`MCP_CONTENT_TOOLS_SUMMARY.md`](MCP_CONTENT_TOOLS_SUMMARY.md)
- [`docs/MCP_CONTENT_AND_STRUCTURE_TOOLS.md`](docs/MCP_CONTENT_AND_STRUCTURE_TOOLS.md)
- Content Audit Tool

### Design System
- [`docs/MCP_SERVERS_GUIDE.md`](docs/MCP_SERVERS_GUIDE.md) (Shadcn UI section)
- [`MCP_INTEGRATION_SUMMARY.md`](MCP_INTEGRATION_SUMMARY.md)

### Testing
- [`MCP_TEST_PROCEDURES.md`](MCP_TEST_PROCEDURES.md)
- [`docs/MCP_MEMORY_PUPPETEER_TEST_GUIDE.md`](docs/MCP_MEMORY_PUPPETEER_TEST_GUIDE.md)
- [`MCP_QUICK_TEST_COMMANDS.md`](MCP_QUICK_TEST_COMMANDS.md)

### Setup & Configuration
- [`docs/MCP_SETUP_INSTRUCTIONS.md`](docs/MCP_SETUP_INSTRUCTIONS.md)
- [`docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md`](docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md)
- [`docs/GITHUB_TOKEN_TYPE_GUIDE.md`](docs/GITHUB_TOKEN_TYPE_GUIDE.md)

---

## 💡 Tips

### Using This Documentation

1. **Start with Quick Start** - Don't dive into detailed guides first
2. **Use Search** - All docs are searchable with Ctrl+F/Cmd+F
3. **Follow Links** - Documents cross-reference each other
4. **Check Index** - [`MCP_FILES_INDEX.md`](MCP_FILES_INDEX.md) lists all files

### Working with MCP Servers

1. **Type in Cursor** - MCP commands go in Cursor chat, not terminal
2. **Restart After Config** - Always restart Cursor after adding tokens
3. **Test Incrementally** - Try one server at a time
4. **Use Natural Language** - You can ask naturally, not just formal commands

### Content Audit

1. **Run Regularly** - Weekly or after major content changes
2. **Review Reports** - JSON report has detailed per-file analysis
3. **Focus on Low Scores** - Files under 80 need attention
4. **Track Trends** - Compare reports over time

---

## 🆘 Getting Help

### Common Issues

**MCP Server Not Working?**
→ Check: [`MCP_READY_TO_USE.md`](MCP_READY_TO_USE.md) troubleshooting section

**Token Setup Confused?**
→ Check: [`docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md`](docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md)

**Content Audit Failing?**
→ Check: [`MCP_TEST_PROCEDURES.md`](MCP_TEST_PROCEDURES.md) troubleshooting

**Don't Know Which Server to Use?**
→ Check: [`docs/MCP_SERVERS_GUIDE.md`](docs/MCP_SERVERS_GUIDE.md) use cases

### Documentation Sources

- **Quick Help:** Quick reference docs (root directory)
- **Detailed Help:** Main guides (docs/ folder)
- **Testing Help:** Test procedures docs
- **Everything:** [`MCP_FILES_INDEX.md`](MCP_FILES_INDEX.md)

---

## ✅ Verification

All documentation has been verified:
- ✅ All files exist and are complete
- ✅ All commands tested
- ✅ All paths correct
- ✅ No broken links
- ✅ Content audit tool works

See: [`MCP_VERIFICATION_REPORT.md`](MCP_VERIFICATION_REPORT.md)

---

## 📈 Statistics

- **Documentation Files:** 19
- **Total Lines:** ~3,500+
- **MCP Servers:** 7
- **Ready to Use:** 4
- **Average Setup Time:** 3-5 minutes

See: [`MCP_FINAL_SUMMARY.md`](MCP_FINAL_SUMMARY.md)

---

## 🎉 Ready to Start?

### Option 1: Quick Start (5 minutes)
→ [`MCP_USER_QUICK_START.md`](MCP_USER_QUICK_START.md)

### Option 2: Test Content Audit (2 minutes)
```bash
npm run content:audit
```

### Option 3: Explore Everything
→ [`MCP_FINAL_SUMMARY.md`](MCP_FINAL_SUMMARY.md)

---

**Choose your starting point and dive in!** 🚀

For a complete overview of all files and their purposes, see:
→ [`MCP_FILES_INDEX.md`](MCP_FILES_INDEX.md)
