# Memory & Puppeteer MCP - Testing Guide

**Date:** January 25, 2025
**Status:** Ready to test after Cursor restart

---

## ✅ Configuration Verified

Both MCP servers are configured in `~/.cursor/mcp.json`:
- ✅ **Memory MCP** (lines 111-115)
- ✅ **Puppeteer MCP** (lines 116-120)

---

## 🧪 Step 1: Test Memory MCP

### Store Your Brand Voice

Copy and paste these commands into Cursor one at a time:

```
use memory to remember my brand voice is: cinematic, confident, intelligent, warmly human
```

```
use memory to remember my content style: short rhythmic sentences, strategic pauses, visceral over abstract, show don't tell
```

```
use memory to remember I avoid: hedging words (might, try, attempt), ellipsis (...), passive voice, jargon without context
```

```
use memory to remember my preferred words: craft, create, shape, turn, move (instead of make, do, get, put)
```

```
use memory to remember my case study tone: bold statements, parallel structure, quantified outcomes, emotional connection
```

### Verify Memory is Working

Test if Memory stored your preferences:

```
use memory to recall my brand voice
```

```
use memory to recall my content style preferences
```

**Expected Result:** Memory should return the information you just stored.

---

## 🧪 Step 2: Test Puppeteer MCP

### Analyze Your Site Structure

Copy and paste these commands into Cursor:

```
use puppeteer to navigate to http://localhost:5173 and analyze the homepage structure
```

**Note:** Make sure your dev server is running (`npm run dev`)

If your site is deployed, use:
```
use puppeteer to navigate to https://mem-rebuild-pl.vercel.app and analyze the homepage structure
```

### Check Navigation Consistency

```
use puppeteer to navigate through my portfolio site and check if navigation is consistent across pages
```

### Map Content Hierarchy

```
use puppeteer to analyze the content hierarchy and layout patterns of my portfolio pages
```

**Expected Result:** Puppeteer should navigate your site and provide analysis.

---

## 🎯 Real-World Usage Examples

### Example 1: Check Content Tone

```
use memory to check if this content matches my brand voice: "I might try to create something that could potentially help users"
```

**Expected:** Memory should flag "might try" as hedging words.

### Example 2: Analyze Case Study Page

```
use puppeteer to navigate to http://localhost:5173/case-studies and analyze the layout structure
```

### Example 3: Verify Tone Across Pages

```
use filesystem to find all case study content files, then use memory to check if each matches my brand voice guidelines
```

---

## ✅ Verification Checklist

After testing, verify:

- [ ] **Memory MCP** - Can store brand voice preferences
- [ ] **Memory MCP** - Can recall stored preferences
- [ ] **Memory MCP** - Can check content against guidelines
- [ ] **Puppeteer MCP** - Can navigate to your site
- [ ] **Puppeteer MCP** - Can analyze page structure
- [ ] **Puppeteer MCP** - Can check navigation consistency

---

## 🐛 Troubleshooting

### Memory MCP Not Working

**Issue:** "MCP server not found" or no response

**Solutions:**
1. Restart Cursor completely (close and reopen)
2. Check `mcp.json` syntax is valid
3. Verify Memory MCP is in the config file
4. Check Cursor logs for errors

### Puppeteer MCP Not Working

**Issue:** Can't navigate or analyze site

**Solutions:**
1. Make sure your dev server is running (`npm run dev`)
2. Use correct URL (localhost:5173 or your deployed URL)
3. Check Puppeteer MCP is in the config file
4. Try a simple navigation first: `use puppeteer to navigate to http://localhost:5173`

### "Server not responding"

**Solutions:**
1. Wait a few seconds after restarting Cursor
2. Check if `npx` is available: `npx --version`
3. Try running manually: `npx -y @modelcontextprotocol/server-memory`
4. Check network connectivity

---

## 📋 Quick Test Commands

Copy these into Cursor to quickly test:

### Memory Tests
```
use memory to remember test: this is a test
use memory to recall test
```

### Puppeteer Tests
```
use puppeteer to navigate to https://example.com and take a screenshot
```

---

## 🎉 Success Indicators

You'll know it's working when:

1. **Memory MCP:**
   - ✅ Stores your brand voice
   - ✅ Recalls stored information
   - ✅ Checks content against guidelines

2. **Puppeteer MCP:**
   - ✅ Navigates to your site
   - ✅ Analyzes page structure
   - ✅ Provides layout insights

---

## 🚀 Next Steps After Testing

Once verified, start using them for real work:

### Content Consistency
```
use memory to check all my case study content matches my brand voice
use filesystem to find content files that need tone review
```

### Site Structure
```
use puppeteer to analyze layout consistency across all portfolio pages
use puppeteer to map the navigation structure
```

### Combined Usage
```
use filesystem to find all page components, then use puppeteer to analyze their layout patterns
```

---

**Ready to test!** Copy the commands above into Cursor and verify everything works. 🚀

**Last Updated:** January 25, 2025

