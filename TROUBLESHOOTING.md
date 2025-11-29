# Troubleshooting Guide

Common issues and solutions for the mem-rebuild-pl repository.

## Build Issues

### Puppeteer Installation Fails

**Symptom**: Error during `npm install` - "Failed to set up chrome" or "ENOTFOUND googlechromelabs.github.io"

**Solution**:
```bash
# Set environment variable before install
export PUPPETEER_SKIP_DOWNLOAD=true
npm install
```

Or add to `.env`:
```
PUPPETEER_SKIP_DOWNLOAD=true
```

**Why**: Puppeteer tries to download Chromium, which may be blocked by network restrictions. The application doesn't require Puppeteer for core functionality.

---

### Build Timeout on Vercel

**Symptom**: Vercel build times out during image processing

**Solutions**:

1. **Quick fix** - Skip image generation:
```bash
# In Vercel environment variables
PREBUILD_PIPELINE=off
```

2. **Better fix** - Increase build timeout in Vercel project settings:
   - Go to Project Settings → General
   - Increase "Build Timeout" to 15-20 minutes

3. **Optimize** - Pre-process images locally:
```bash
npm run images:all
git add public/images
git commit -m "Add pre-processed images"
```

---

### TypeScript Errors After Pull

**Symptom**: `tsc` reports errors after pulling changes

**Solution**:
```bash
# Clean and rebuild
npm run clean:types
npm run typecheck

# If that doesn't work, reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Deployment Issues

### Vercel Deployment Not Connected

**Symptom**: Pushing to main doesn't trigger deployment

**Solution**:

1. Check Vercel project settings:
   - Go to https://vercel.com/dashboard
   - Select project
   - Settings → Git → Ensure repository is connected

2. Verify webhook:
   - GitHub repo → Settings → Webhooks
   - Should have a webhook pointing to Vercel

3. Manual deployment:
```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Deploy
vercel deploy --prod
```

---

### Wrong Vercel Project

**Symptom**: Deployment goes to wrong Vercel project

**Solution**:

The correct project URL is: https://mem-rebuild-55q0c32al-gpttttys-projects.vercel.app/

To fix:
1. Go to Vercel Dashboard
2. Select correct project
3. Settings → Git
4. Disconnect old repository (if any)
5. Connect to yesmannow/mem-rebuild-pl

---

### Environment Variables Missing

**Symptom**: Build succeeds but features don't work

**Solution**:

Check Vercel environment variables:
1. Go to Project Settings → Environment Variables
2. Add required variables from `.env.example`:
   - `NODE_ENV=production`
   - `PUPPETEER_SKIP_DOWNLOAD=true`
3. Redeploy

---

## Development Issues

### npm audit Shows Vulnerabilities

**Symptom**: `npm audit` shows 27 vulnerabilities

**Status**: These are in development dependencies (Lighthouse CI, Puppeteer)

**Solution**:

For production:
```bash
# Check production dependencies only
npm audit --production
```

To fix non-breaking vulnerabilities:
```bash
npm audit fix
```

**Note**: Force fixes may break development tools:
```bash
# Only if you know what you're doing
npm audit fix --force
```

---

### ESLint Warnings

**Symptom**: 58 ESLint warnings during build

**Status**: Non-blocking warnings (console statements, `any` types)

**Solutions**:

1. **Ignore for now** - Warnings don't block builds

2. **Auto-fix safe issues**:
```bash
npm run lint:fix
```

3. **Disable specific rules** (if needed):
Edit `.eslintrc.json` to adjust rule severity

---

### Dev Server Won't Start

**Symptom**: `npm run dev` fails

**Solutions**:

1. Check port availability:
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

2. Clear cache:
```bash
rm -rf node_modules/.vite
npm run dev
```

3. Reinstall:
```bash
rm -rf node_modules
npm install
npm run dev
```

---

### Images Not Loading

**Symptom**: Broken image links in development or production

**Solutions**:

1. **Check image paths** - Must be relative to `public/`:
```tsx
// ✅ Correct
<img src="/images/logo.png" />

// ❌ Wrong
<img src="./images/logo.png" />
<img src="../public/images/logo.png" />
```

2. **Regenerate optimized images**:
```bash
npm run images:build:all
```

3. **Check file exists**:
```bash
ls -la public/images/
```

---

### MCP Server Won't Start

**Symptom**: `npm run mcp:start` fails

**Solutions**:

1. Check port availability (default: 5174):
```bash
lsof -ti:5174 | xargs kill -9
```

2. Check dependencies:
```bash
# Ensure express is installed
npm list express
```

3. Check configuration:
```bash
cat mcp/config.json
```

---

### AI Features Not Working

**Symptom**: AI endpoints return errors

**Root Cause**: AI features are disabled by default

**Solution**:

1. **Enable AI features** (staging only):
```bash
# In .env
AI_FEATURES_ENABLED=true
GPT_API_KEY=sk-...
GEMINI_API_KEY=AIza...
```

2. **Test in dry-run mode** first:
```bash
AI_DRY_RUN=true
```

3. **Monitor usage**:
```bash
curl http://localhost:5174/api/monitoring/stats
```

---

## Testing Issues

### Tests Fail After Dependencies Update

**Symptom**: Jest tests fail with module errors

**Solution**:

```bash
# Clear Jest cache
npx jest --clearCache

# Reinstall
rm -rf node_modules
npm install

# Run tests
npm test
```

---

### Tests Pass Locally but Fail in CI

**Symptom**: Tests work on your machine but fail in GitHub Actions

**Solutions**:

1. **Check Node version**:
```yaml
# In .github/workflows/*.yml
- uses: actions/setup-node@v3
  with:
    node-version: '20'  # Match local version
```

2. **Check environment variables**:
   - Add to GitHub Secrets
   - Reference in workflow

3. **Check timezone issues**:
```javascript
// Use UTC for consistent tests
process.env.TZ = 'UTC';
```

---

## Performance Issues

### Slow Build Times

**Symptom**: Builds take > 10 minutes

**Solutions**:

1. **Skip optional steps**:
```bash
PREBUILD_PIPELINE=off npm run build
```

2. **Parallelize image processing**:
   - Already done in `scripts/build-images.mjs`
   - Processes 5 images at a time

3. **Use build cache** (Vercel automatically does this)

---

### Large Bundle Size

**Symptom**: dist/ is > 10MB

**Solutions**:

1. **Analyze bundle**:
```bash
npm run analyze
```

2. **Check for large dependencies**:
```bash
npx npm-check -u
```

3. **Lazy load components**:
```tsx
const LazyComponent = lazy(() => import('./Component'));
```

---

## Git Issues

### Merge Conflicts

**Symptom**: Git reports conflicts when merging PR

**Solutions**:

1. **Update your branch**:
```bash
git fetch origin
git merge origin/main
# Resolve conflicts
git add .
git commit
git push
```

2. **Use rebase** (if comfortable):
```bash
git fetch origin
git rebase origin/main
# Resolve conflicts
git rebase --continue
```

---

### Large Files in Git

**Symptom**: Git complains about large files

**Solution**:

1. **Check .gitignore**:
```bash
cat .gitignore
```

2. **Remove from staging**:
```bash
git rm --cached path/to/large/file
```

3. **Add to .gitignore**:
```
# Add to .gitignore
dist/
node_modules/
*.log
```

---

## Quick Reference

### Essential Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type checking
npm run typecheck

# Lint code
npm run lint

# Start MCP server
npm run mcp:start

# Deploy to Vercel
vercel deploy --prod
```

### Environment Variables

```bash
# Required for Vercel
NODE_ENV=production
PUPPETEER_SKIP_DOWNLOAD=true

# Optional
PREBUILD_PIPELINE=off
AI_FEATURES_ENABLED=false
```

### Support Resources

- [docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md) - Deployment guide
- [.env.example](./.env.example) - Environment variables
- [README.md](./README.md) - Project overview

---

**Last Updated**: 2025-11-24
