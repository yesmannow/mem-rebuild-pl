# Deployment Guide - Professional Portfolio Enhancements

## Overview

This guide walks through deploying the enhanced portfolio with AI-powered features, screenshot API, and dynamic backgrounds to Cloudflare Pages.

## Pre-Deployment Checklist

- [ ] All code changes committed and pushed
- [ ] Environment variables documented
- [ ] API keys obtained (OpenAI or Gemini)
- [ ] Dependencies installed
- [ ] Build process verified locally
- [ ] Linting passed
- [ ] TypeScript compilation successful

## Environment Variables

### Required Variables

Set these in your Cloudflare Pages dashboard under Settings > Environment Variables:

#### Production Environment

```env
# AI APIs (at least one required for case study explainer)
OPENAI_API_KEY=sk-proj-...
# OR
GEMINI_API_KEY=AI...

# Database (existing)
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=eyJ...

# Optional: Screenshot API (uses free thum.io by default)
# SCREENSHOT_API_KEY=...
```

#### Preview Environment (Optional)

Same as production or use test API keys.

### Getting API Keys

#### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and save the key (starts with `sk-proj-`)
4. Recommended model: `gpt-4o-mini` (cost-effective)

#### Google Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy and save the key (starts with `AI`)
4. Free tier: 60 requests/minute

## Build Configuration

### Cloudflare Pages Settings

1. **Build command**: `npm run build`
2. **Build output directory**: `dist`
3. **Root directory**: `/`
4. **Node.js version**: `20.x` (or latest LTS)

### Functions Configuration

Cloudflare Pages Functions are automatically deployed from the `/functions` directory:

- `/functions/api/explain-case-study.ts` → `/api/explain-case-study`
- `/functions/api/screenshot.ts` → `/api/screenshot`
- `/functions/api/health.ts` → `/api/health` (existing)

No additional configuration needed.

## Deployment Steps

### Step 1: Local Build Test

```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Run build
npm run build

# Verify dist/ directory created
ls -la dist/

# Test locally with Vite preview
npm run preview
```

### Step 2: Deploy to Cloudflare Pages

#### Via Git Integration (Recommended)

1. Push your code to GitHub
2. Cloudflare Pages will automatically detect changes and build
3. Monitor build logs in Cloudflare dashboard

#### Via Wrangler CLI (Alternative)

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist --project-name=mem-rebuild-pl
```

### Step 3: Configure Environment Variables

1. Go to Cloudflare Pages dashboard
2. Select your project (`mem-rebuild-pl`)
3. Click **Settings** > **Environment Variables**
4. Add all required variables for **Production**
5. Optionally add for **Preview** environment

### Step 4: Verify Deployment

1. **Check deployment status**:
   - Cloudflare Pages dashboard shows build status
   - Wait for "Success" status

2. **Test API endpoints**:
   ```bash
   # Health check
   curl https://bearcavemarketing.com/api/health
   
   # Screenshot API
   curl https://bearcavemarketing.com/api/screenshot?url=https://google.com
   
   # AI Explainer (requires POST with JSON body)
   curl -X POST https://bearcavemarketing.com/api/explain-case-study \
     -H "Content-Type: application/json" \
     -d '{"title":"Test","problem":"Test problem","solution":"Test solution","results":"Test results","persona":"general"}'
   ```

3. **Test frontend**:
   - Visit https://bearcavemarketing.com
   - Navigate to a case study detail page
   - Verify AI Explainer loads
   - Test persona selection
   - Check background images load
   - Verify screenshot cards (if siteUrl added to case studies)

### Step 5: Monitor Performance

1. **Cloudflare Analytics**:
   - Monitor requests to `/api/*` endpoints
   - Check error rates
   - Monitor bandwidth usage

2. **Lighthouse Audit**:
   ```bash
   npm run audit:lighthouse
   ```
   
   Target scores:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 90
   - SEO: > 90

3. **Error Monitoring**:
   - Check Cloudflare Pages Functions logs for errors
   - Monitor browser console for client-side errors
   - Set up alerts for high error rates

## Troubleshooting

### Build Fails

**Error**: "Cannot find module..."

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Verify package.json has all dependencies
npm ls
```

**Error**: "TypeScript compilation failed"

**Solution**:
```bash
# Run typecheck
npm run typecheck

# Fix any type errors
# Then rebuild
npm run build
```

### API Functions Not Working

**Error**: "404 Not Found" on `/api/*` endpoints

**Solution**:
1. Verify functions are in `/functions/api/` directory
2. Check Cloudflare Pages build logs for function compilation
3. Ensure `.ts` files are being compiled

**Error**: "Environment variable not defined"

**Solution**:
1. Check Cloudflare Pages dashboard > Settings > Environment Variables
2. Ensure variables are set for **Production** environment
3. Re-deploy to pick up new variables

### AI Explainer Not Working

**Error**: "Failed to generate explanation"

**Solution**:
1. Check browser console for detailed error
2. Verify API key is set in Cloudflare
3. Test API endpoint directly with curl
4. Check API key has credits/quota remaining
5. Verify OpenAI/Gemini API is accessible from Cloudflare

### Screenshots Not Loading

**Error**: Images show placeholder

**Solution**:
1. Check if URL is publicly accessible
2. Verify thum.io service is online
3. Check browser console for CORS errors
4. Test screenshot API directly: `/api/screenshot?url=https://google.com`

### Background Images Not Loading

**Error**: Gray background instead of images

**Solution**:
1. Check browser console for image load errors
2. Verify Unsplash is accessible
3. Check internet connection
4. Verify image URLs are correct in pageBackgroundService.ts

## Performance Optimization

### Image Optimization

1. **Lazy Loading**: Already implemented
2. **WebP Format**: Cloudflare automatically converts
3. **Caching**: Set up Cloudflare Page Rules:
   - Cache Level: Standard
   - Edge Cache TTL: 24 hours for `/api/screenshot`
   - Browser Cache TTL: 4 hours

### API Rate Limiting

**Unsplash** (free tier):
- 50 requests/hour
- Solution: Browser caching reduces requests

**OpenAI** (pay-as-you-go):
- ~$0.0001 per request (GPT-4o-mini)
- Monitor usage in OpenAI dashboard

**Gemini** (free tier):
- 60 requests/minute
- 1,500 requests/day
- Solution: Use as fallback only

### Bundle Size

Current additions:
- AI Explainer: ~15KB gzipped
- Screenshot Card: ~8KB gzipped
- Page Background Service: ~5KB gzipped
- Total: ~28KB gzipped

## Security Considerations

### API Key Protection

✅ **Correct**: API keys stored in Cloudflare environment variables
✅ **Correct**: API calls go through serverless functions
❌ **Never**: Expose API keys in client-side code

### CORS Configuration

All API functions include proper CORS headers:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
```

### Rate Limiting

Consider adding rate limiting for production:
```typescript
// Example: Cloudflare Workers rate limiting
const rateLimit = {
  limit: 100,
  period: 60, // 60 seconds
};
```

## Rollback Plan

If deployment causes issues:

1. **Revert to previous deployment**:
   - Cloudflare Pages > Deployments
   - Find last working deployment
   - Click "Rollback to this deployment"

2. **Remove new features**:
   ```bash
   git revert HEAD
   git push
   ```

3. **Disable AI Explainer temporarily**:
   - Remove environment variables
   - API will return error, but site remains functional

## Post-Deployment

### Tasks

- [ ] Update documentation with production URLs
- [ ] Test all personas in AI Explainer
- [ ] Add siteUrl to case studies for screenshot previews
- [ ] Monitor API usage and costs
- [ ] Set up error alerts
- [ ] Update sitemap.xml if needed
- [ ] Share with stakeholders

### Monitoring Checklist

- [ ] API endpoint uptime
- [ ] Error rates < 1%
- [ ] Response times < 2s
- [ ] Lighthouse scores maintained
- [ ] Bundle size within budget
- [ ] No console errors
- [ ] All routes accessible

## Support

For issues:
1. Check Cloudflare Pages build logs
2. Check browser console errors
3. Test API endpoints directly
4. Review `/docs/PROFESSIONAL_API_ENHANCEMENTS.md`
5. Check GitHub issues

## Next Steps

After successful deployment:

1. **Add siteUrl to case studies**:
   ```typescript
   // src/data/caseStudies.ts
   {
     slug: 'graston-ceu-system',
     siteUrl: 'https://grastontech.com',
     // ... other fields
   }
   ```

2. **Test AI Explainer**:
   - Visit case study detail page
   - Try all four personas
   - Verify explanations are relevant

3. **Monitor Costs**:
   - OpenAI: ~$0.01 per 100 requests
   - Cloudflare Pages: Free tier includes 500 builds/month

4. **Gather Feedback**:
   - Share with stakeholders
   - Monitor user engagement
   - Iterate on prompt engineering

---

**Deployment Date**: _[Add date]_
**Version**: 1.0.0
**Status**: Production Ready ✅
