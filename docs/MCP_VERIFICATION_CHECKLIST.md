# MCP Servers Verification Checklist

**Date:** January 25, 2025
**Status:** Ready to test

---

## ✅ Configuration Complete

You've added:
- ✅ GitHub Personal Access Token
- ✅ Brave Search API Key

---

## 🔄 Next Step: Restart Cursor

**IMPORTANT:** You must restart Cursor completely for the MCP servers to load with your new tokens.

1. **Close Cursor completely** (not just the window, fully quit)
2. **Reopen Cursor**
3. **Wait a few seconds** for MCP servers to initialize

---

## 🧪 Test Commands

After restarting Cursor, test each MCP server:

### 1. **Shadcn UI MCP** ✅ (Should work immediately)

```
use shadcn to list all available components
```

**Expected:** List of shadcn/ui components

---

### 2. **Filesystem MCP** ✅ (Should work immediately)

```
use filesystem to list all files in src/components/ui
```

**Expected:** List of component files

---

### 3. **GitHub MCP** ⚠️ (Test with your token)

```
use github to list repositories
```

**Expected:** List of your GitHub repositories

**If it works:** You'll see your repos listed

**If it fails:**
- Check token is correct (starts with `ghp_`)
- Verify token has `repo` scope
- Check for extra spaces or quotes in mcp.json
- Restart Cursor again

---

### 4. **Brave Search MCP** ⚠️ (Test with your API key)

```
use brave-search to search for "design systems"
```

**Expected:** Search results about design systems

**If it works:** You'll see search results

**If it fails:**
- Check API key is correct
- Verify API key hasn't expired
- Check for extra spaces or quotes in mcp.json
- Restart Cursor again

---

## ✅ Verification Checklist

After restarting Cursor, test each server:

- [ ] **Shadcn UI** - `use shadcn to list components` ✅
- [ ] **Filesystem** - `use filesystem to list files in src/components` ✅
- [ ] **GitHub** - `use github to list repositories` ⚠️
- [ ] **Brave Search** - `use brave-search to search for "test"` ⚠️

---

## 🎯 Real-World Usage Examples

Once verified, try these:

### Design Uniformity
```
use shadcn to show me how to implement a card component
use filesystem to find all button components and compare their props
use brave-search to find modern spacing systems
```

### Style Consistency
```
use filesystem to find all CSS files using color variables
use github to show me the design system documentation
use brave-search to research typography scales
```

### Content Improvements
```
use filesystem to list all interactive components
use github to show me component examples in the repository
use brave-search to find accessibility content guidelines
```

---

## 🐛 Troubleshooting

### "MCP server not found"
- **Solution:** Restart Cursor completely (close and reopen)
- Check `mcp.json` is valid JSON (no syntax errors)
- Verify file saved correctly

### "Authentication failed" (GitHub)
- **Solution:**
  - Check token is correct (starts with `ghp_`)
  - Verify token has `repo` scope
  - Check token hasn't expired
  - Try generating a new token

### "Authentication failed" (Brave Search)
- **Solution:**
  - Check API key is correct
  - Verify API key hasn't expired
  - Check for extra spaces or quotes
  - Try generating a new API key

### "Invalid token"
- **Solution:**
  - Remove any extra spaces
  - Check quotes are correct (double quotes)
  - Verify token/key is complete (not truncated)
  - Restart Cursor

---

## 📊 Expected Results

### Successful GitHub Test:
```
✅ Found 5 repositories:
- repo-name-1
- repo-name-2
...
```

### Successful Brave Search Test:
```
✅ Search results for "design systems":
1. [Title] - [URL]
2. [Title] - [URL]
...
```

### If You See Errors:
- Note the exact error message
- Check the troubleshooting section above
- Verify your tokens/keys are correct
- Try restarting Cursor again

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Shadcn UI returns component lists
2. ✅ Filesystem can list and search files
3. ✅ GitHub can list your repositories
4. ✅ Brave Search returns search results

---

## 📚 Next Steps

Once all servers are verified:

1. **Start using them in your workflow:**
   - Ask Cursor about shadcn/ui components
   - Use filesystem to discover components
   - Search for design patterns with Brave
   - Access GitHub docs and issues

2. **Explore capabilities:**
   - Try different queries
   - Combine multiple MCP servers
   - Use for design system work
   - Improve code consistency

3. **Document your findings:**
   - Note which queries work best
   - Save useful component examples
   - Build your design system library

---

## 🔒 Security Reminder

- ✅ Never commit `mcp.json` to git
- ✅ Don't share your tokens/keys
- ✅ Rotate tokens regularly
- ✅ Revoke unused tokens

---

**Ready to test!** Restart Cursor and run the test commands above. 🚀

**Last Updated:** January 25, 2025

