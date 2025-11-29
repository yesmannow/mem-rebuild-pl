# GitHub Copilot Agent Mode - Direct Prompt

**Copy and paste this entire prompt into GitHub Copilot Agent Mode:**

---

## 🎯 Task: Review and Verify MCP Servers Integration

I need you to review, verify, and document the complete MCP (Model Context Protocol) server integration that has been added to this portfolio repository. This includes 7 MCP servers, comprehensive documentation, testing tools, and usage guides.

### 📋 Critical Files to Review

#### Configuration Reference (NOT in repo - user's home directory)
- **`~/.cursor/mcp.json`** - Contains 7 MCP server configurations:
  1. Shadcn UI (lines 80-82) - HTTP URL, ready
  2. Filesystem (lines 83-89) - NPX command, ready
  3. GitHub (lines 90-96) - NPX command, needs token
  4. Brave Search (lines 97-103) - NPX command, needs API key
  5. PostgreSQL (lines 104-110) - NPX command, optional
  6. Memory (lines 111-115) - NPX command, ready
  7. Puppeteer (lines 116-120) - NPX command, ready

#### Documentation Files (In Repository - Verify All Exist)

**Main Guides:**
1. `docs/MCP_SERVERS_GUIDE.md` - Complete guide for all 7 servers
2. `docs/MCP_SETUP_INSTRUCTIONS.md` - Step-by-step setup instructions
3. `docs/MCP_CONTENT_AND_STRUCTURE_TOOLS.md` - Content consistency tools
4. `docs/MCP_MEMORY_PUPPETEER_TEST_GUIDE.md` - Testing procedures
5. `docs/MCP_VERIFICATION_CHECKLIST.md` - Verification checklist
6. `docs/MCP_TOKEN_SETUP_VISUAL_GUIDE.md` - Visual token setup guide
7. `docs/GITHUB_TOKEN_TYPE_GUIDE.md` - GitHub token explanation

**Quick References:**
8. `MCP_INTEGRATION_SUMMARY.md` - Initial integration summary
9. `MCP_SERVERS_QUICK_REFERENCE.md` - Quick status reference
10. `MCP_SERVERS_COMPLETE.md` - Complete implementation summary
11. `MCP_READY_TO_USE.md` - Ready-to-use status
12. `MCP_CONTENT_TOOLS_SUMMARY.md` - Content tools summary
13. `MCP_QUICK_TEST_COMMANDS.md` - Copy-paste test commands
14. `HOW_TO_USE_MCP_COMMANDS.md` - How to use MCP correctly

#### Scripts Created
15. `scripts/content-audit-tool.js` - Automated content analysis tool
    - Analyzes tone consistency
    - Checks for hedging words, passive voice, jargon
    - Generates reports in `reports/content-audit-report.json`

#### Package.json Updates
16. `package.json` - Added script: `"content:audit": "node scripts/content-audit-tool.js"`

### ✅ Required Tasks

#### Task 1: File Verification
- [ ] Verify all 14 documentation files exist and are complete
- [ ] Check `scripts/content-audit-tool.js` exists and is functional
- [ ] Verify `package.json` contains `content:audit` script
- [ ] Check all file paths in documentation are accurate

#### Task 2: Script Testing
- [ ] Run `npm run content:audit` and verify it works
- [ ] Check script generates `reports/content-audit-report.json`
- [ ] Verify script analyzes content correctly
- [ ] Test error handling

#### Task 3: Documentation Review
For each documentation file:
- [ ] Verify information is accurate
- [ ] Check all commands/examples work
- [ ] Verify file paths are correct
- [ ] Check for broken links
- [ ] Ensure no placeholder text remains

#### Task 4: MCP Server Documentation
For each of the 7 MCP servers, verify:
- [ ] Configuration examples are correct
- [ ] Setup instructions are complete
- [ ] Usage examples are accurate
- [ ] Status (ready/needs setup) is correct
- [ ] Troubleshooting sections exist

#### Task 5: Create Test Procedures
- [ ] Document test procedures for each MCP server
- [ ] Create verification commands
- [ ] Document expected behaviors
- [ ] Create troubleshooting guide

### 🧪 Test Procedures to Document

#### Test 1: Content Audit Tool
```bash
npm run content:audit
```
**Expected:**
- Scans content files in `src/pages`, `src/components`, `content`, `docs`
- Generates report with tone scores
- Identifies issues (hedging, passive voice, jargon)
- Creates `reports/content-audit-report.json`

#### Test 2: MCP Server Verification
For each server, document:
- How to verify it's configured
- Test commands to run in Cursor
- Expected responses
- Troubleshooting steps

#### Test 3: Documentation Links
- Verify all cross-references work
- Check file paths are accurate
- Ensure examples are complete

### 📊 Deliverables

After completing all tasks, provide:

1. **Verification Report**
   - Status of each file
   - Test results
   - Issues found
   - Recommendations

2. **Documentation Index**
   - Complete list of all docs
   - Purpose of each
   - When to use each
   - Quick access guide

3. **User Quick Start**
   - How to get started with MCP servers
   - First steps for each server
   - Common usage patterns

4. **Test Results Summary**
   - All tests performed
   - Results
   - Any failures
   - Next steps

### ⚠️ Important Notes

1. **mcp.json Location:** File is in `~/.cursor/mcp.json` (user's home directory), NOT in repository
2. **Token Security:** GitHub and Brave tokens are in mcp.json - never commit this file
3. **MCP Commands:** Work in Cursor chat interface, not terminal
4. **Server Status:**
   - Ready: Shadcn, Filesystem, Memory, Puppeteer
   - Needs Setup: GitHub (token), Brave Search (API key)
   - Optional: PostgreSQL (connection string)

### 🎯 Success Criteria

- All 14 documentation files verified and complete
- Content audit script works correctly
- All MCP servers properly documented
- Test procedures documented
- User can successfully use all tools

**Begin by reviewing all files, then test the content audit tool, verify documentation accuracy, and create a comprehensive summary report.**

