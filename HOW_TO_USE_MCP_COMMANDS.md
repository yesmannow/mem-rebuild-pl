# How to Use MCP Commands in Cursor

**Important:** MCP commands need to be typed in **Cursor's chat interface**, not in the terminal or to me directly.

---

## 🎯 How MCP Servers Work

MCP (Model Context Protocol) servers are loaded by Cursor when it starts. When you chat with me (the AI assistant) in Cursor, I can use these MCP servers to help you.

**You don't run MCP commands directly** - instead, you ask me to do things, and I use the MCP servers behind the scenes.

---

## ✅ Correct Way to Use Memory MCP

### Option 1: Direct Command (What You Tried)
Type this in **Cursor's chat interface** (the chat window where you talk to me):

```
use memory to remember my brand voice is: cinematic, confident, intelligent, warmly human
```

**Where:** In Cursor's chat interface (not terminal, not here)

### Option 2: Ask Me to Do It
You can also just ask me naturally:

```
Can you remember that my brand voice is cinematic, confident, intelligent, and warmly human?
```

Or:

```
Store my brand voice preferences: cinematic, confident, intelligent, warmly human
```

I'll use the Memory MCP server to store it.

---

## 🧪 Testing if MCP Servers Are Working

### Test Memory MCP

**In Cursor chat, type:**
```
Can you remember that my brand voice is cinematic and confident?
```

**Then ask:**
```
What did you remember about my brand voice?
```

If Memory MCP is working, I'll be able to recall what you told me.

### Test Puppeteer MCP

**In Cursor chat, type:**
```
Can you analyze the structure of my homepage at http://localhost:5173?
```

If Puppeteer MCP is working, I'll be able to navigate and analyze your site.

---

## 📋 Quick Reference

### Memory MCP Commands (Type in Cursor Chat)

**Store information:**
```
Remember that my brand voice is cinematic, confident, intelligent, warmly human
```

**Recall information:**
```
What did you remember about my brand voice?
```

**Check content:**
```
Does this content match my brand voice: "I might try to create something"
```

### Puppeteer MCP Commands (Type in Cursor Chat)

**Analyze site:**
```
Analyze the structure of my homepage at http://localhost:5173
```

**Check navigation:**
```
Check if navigation is consistent across my portfolio pages
```

---

## ⚠️ Common Mistakes

### ❌ Wrong: Typing in Terminal
```bash
# This won't work - MCP commands don't run in terminal
use memory to remember...
```

### ❌ Wrong: Asking Me Here
```
# If you're asking me in a context where I can't access Cursor's MCP servers
use memory to remember...
```

### ✅ Correct: Typing in Cursor Chat
```
# In Cursor's chat interface (where you normally talk to me)
use memory to remember my brand voice is: cinematic, confident, intelligent, warmly human
```

Or simply:
```
Remember that my brand voice is cinematic, confident, intelligent, warmly human
```

---

## 🔍 How to Know if It's Working

### Memory MCP Working:
- ✅ I can remember things you tell me across conversations
- ✅ I can recall your brand voice preferences
- ✅ I can check content against your guidelines

### Puppeteer MCP Working:
- ✅ I can navigate to your site
- ✅ I can analyze page structure
- ✅ I can check layout patterns

---

## 🚀 Try This Now

**In Cursor's chat interface, type:**

```
Remember that my brand voice is: cinematic, confident, intelligent, warmly human. Also remember I avoid hedging words like might, try, and attempt.
```

**Then ask:**

```
What did you remember about my brand voice?
```

If Memory MCP is working, I'll recall what you just told me!

---

## 📚 More Information

- **Test Guide:** `docs/MCP_MEMORY_PUPPETEER_TEST_GUIDE.md`
- **Quick Commands:** `MCP_QUICK_TEST_COMMANDS.md`
- **Full Guide:** `docs/MCP_CONTENT_AND_STRUCTURE_TOOLS.md`

---

**Remember: MCP commands work in Cursor's chat interface, not in the terminal!** 🚀

