# MCP Quick Test Commands

**Copy and paste these into Cursor to test your new MCP servers**

---

## 🧠 Memory MCP Tests

### Store Brand Voice (Run these first)
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

### Verify Memory Works
```
use memory to recall my brand voice
```

```
use memory to recall my content style preferences
```

### Test Content Check
```
use memory to check if this content matches my brand voice: "I might try to create something that could potentially help users"
```

**Expected:** Should flag "might try" and "could potentially" as hedging words.

---

## 🎭 Puppeteer MCP Tests

### Basic Navigation (Make sure dev server is running)
```
use puppeteer to navigate to http://localhost:5173
```

### Analyze Homepage
```
use puppeteer to navigate to http://localhost:5173 and analyze the homepage structure, layout, and navigation
```

### Check Navigation Consistency
```
use puppeteer to navigate through my portfolio site starting at http://localhost:5173 and check if navigation is consistent across all pages
```

### Analyze Case Studies Page
```
use puppeteer to navigate to http://localhost:5173/case-studies and analyze the page structure and layout patterns
```

### Map Site Structure
```
use puppeteer to analyze the content hierarchy and layout patterns across my portfolio pages starting from http://localhost:5173
```

---

## 🔗 Combined Usage Examples

### Check Content Tone Across Site
```
use filesystem to find all case study content files, then use memory to check if each matches my brand voice guidelines
```

### Analyze Layout and Verify Tone
```
use puppeteer to analyze the layout of http://localhost:5173/case-studies, then use memory to check if the content matches my brand voice
```

---

## ⚠️ Important Notes

1. **Dev Server:** Make sure `npm run dev` is running for localhost tests
2. **Alternative URL:** If deployed, use `https://mem-rebuild-pl.vercel.app` instead
3. **One at a time:** Run commands one at a time, not all at once
4. **Wait for response:** Give each command a few seconds to complete

---

## ✅ Expected Results

### Memory MCP
- ✅ Stores your preferences
- ✅ Recalls stored information
- ✅ Flags content that doesn't match guidelines

### Puppeteer MCP
- ✅ Navigates to your site
- ✅ Analyzes page structure
- ✅ Provides layout insights
- ✅ Checks navigation consistency

---

**Start with Memory MCP tests first, then move to Puppeteer!** 🚀

