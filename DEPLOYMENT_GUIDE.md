# Deployment Guide

## Overview

This portfolio supports deployment to multiple platforms with environment-specific configurations:

- **GitHub Pages** (subdirectory: `/mem-rebuild-pl/`)
- **Cloudflare Pages** (custom domain: root `/`)
- **Vercel** (custom domain: root `/`)

## Environment Variables

### Required for Cloudflare Pages

All API keys are configured as **Cloudflare Variables/Secrets**. Do NOT create `.env` files or commit secrets to the repository.

```
# Photography APIs (configured in Cloudflare dashboard)
PEXELS_API_KEY=<your-key>          # Pexels stock photos
PIXABAY_API_KEY=<your-key>         # Pixabay fallback

# AI APIs (optional - for AI explainer features)
OPENAI_API_KEY=<your-key>          # OpenAI GPT-4
GEMINI_API_KEY=<your-key>          # Google Gemini

# Database (if using Supabase)
SUPABASE_URL=<your-url>
SUPABASE_ANON_KEY=<your-key>
```

### Accessing Environment Variables

```typescript
// In browser/client code
const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

// In Cloudflare Pages Functions (/functions/api/*)
const apiKey = env.PEXELS_API_KEY; // Direct access via context
```

## Build Commands

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type check
npm run typecheck

# Lint code
npm run lint
```

### Production Builds

#### For Cloudflare Pages (Custom Domain)

```bash
# Standard build (base path: /)
npm run build

# Output: dist/
```

**Cloudflare Pages Configuration:**
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 20.x
- Environment variables: Configure in Cloudflare dashboard

#### For GitHub Pages (Subdirectory)

```bash
# Build with GitHub Pages base path
GITHUB_PAGES=true npm run build

# Output: dist/
# Base path: /mem-rebuild-pl/
```

**GitHub Actions Workflow (`.github/workflows/deploy.yml`):**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: GITHUB_PAGES=true npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Base Path Configuration

The portfolio uses environment-based base path logic in `vite.config.js`:

```javascript
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true'
    ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || 'mem-rebuild-pl'}/`
    : '/',
  // ... rest of config
});
```

### How It Works

1. **Cloudflare Pages / Custom Domain**:
   - `base: '/'` (root)
   - URLs: `https://yourdomain.com/`
   - No environment variable needed

2. **GitHub Pages**:
   - `base: '/mem-rebuild-pl/'` (subdirectory)
   - URLs: `https://username.github.io/mem-rebuild-pl/`
   - Set `GITHUB_PAGES=true` during build

### Routing Considerations

React Router paths work seamlessly with both configurations:

```tsx
<Route path="/" element={<Home />} />
<Route path="/case-study/:slug" element={<CaseStudyDetail />} />
<Route path="/tools" element={<ToolsShowcase />} />
```

Vite automatically adjusts all asset paths and route matching based on the configured `base`.

## Deployment Workflows

### Cloudflare Pages

1. **Connect Repository**:
   - Go to Cloudflare Pages dashboard
   - Connect your GitHub repository
   - Select branch (e.g., `main`)

2. **Configure Build**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (leave blank)

3. **Set Environment Variables**:
   - Add all API keys as **Environment Variables** (not secrets for build-time vars)
   - Use **Secrets** for sensitive runtime values

4. **Deploy**:
   - Push to `main` branch triggers automatic deployment
   - Preview deployments created for all pull requests

### GitHub Pages

1. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: GitHub Actions

2. **Create Workflow**:
   - Add `.github/workflows/deploy.yml` (see example above)

3. **Deploy**:
   - Push to `main` branch triggers GitHub Actions
   - Site available at `https://username.github.io/mem-rebuild-pl/`

### Vercel

1. **Import Project**:
   - Connect GitHub repository
   - Select framework preset: **Vite**

2. **Configure**:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

3. **Environment Variables**:
   - Add via Vercel dashboard
   - Prefix browser vars with `VITE_`

4. **Deploy**:
   - Automatic deployments on push
   - Preview deployments for PRs

## Custom Domains

### Cloudflare Pages

1. Add custom domain in Cloudflare Pages dashboard
2. Update DNS records (automatic if using Cloudflare DNS)
3. SSL/TLS automatically provisioned

### GitHub Pages

1. Add `CNAME` file to `public/` with your domain:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   ```
   CNAME   www   username.github.io.
   A       @     185.199.108.153
   A       @     185.199.109.153
   A       @     185.199.110.153
   A       @     185.199.111.153
   ```

3. Enable HTTPS in repository settings

## Troubleshooting

### Routes Not Working on Deployment

**Problem**: Direct navigation to routes (e.g., `/case-study/foo`) returns 404.

**Solution**: Configure redirects/rewrites for SPA routing.

**Cloudflare Pages**:
Create `public/_redirects`:
```
/*  /index.html  200
```

**GitHub Pages**:
Create `public/404.html` (copy of `index.html`):
```html
<!DOCTYPE html>
<html lang="en">
  <!-- Same content as index.html -->
</html>
```

### Environment Variables Not Working

**Problem**: API calls fail with missing keys.

**Solution**:
- Cloudflare: Use dashboard to set variables
- GitHub Actions: Use repository secrets
- Local: Create `.env.local` (gitignored)

### Build Fails with Sharp Error

**Problem**: `Cannot find module 'sharp'`

**Solution**:
```bash
# Install Sharp explicitly
npm install sharp --save-dev

# Or skip image optimization in build
SKIP_IMAGE_BUILD=true npm run build
```

### Large Bundle Size

**Problem**: Initial bundle > 1MB

**Solution**:
1. Run bundle analyzer:
   ```bash
   ANALYZE=true npm run build
   ```

2. Check for large dependencies in visualizer

3. Lazy load heavy components:
   ```tsx
   const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
   ```

## Performance Optimization

### Image Optimization

```bash
# Optimize all images >1MB
npm run optimize-images

# Build image manifest
npm run images:build
```

### Bundle Analysis

```bash
# Generate interactive bundle visualization
ANALYZE=true npm run build

# Output: dist/stats.html
```

### Caching Strategy

- **Cloudflare Pages**: Automatic edge caching
- **GitHub Pages**: 10-minute default cache
- **Service Worker**: PWA with Workbox (optional)

## Monitoring

### Cloudflare Analytics

- Pageviews, unique visitors
- Geographic distribution
- Performance metrics (TTFB, LCP, etc.)

### Lighthouse CI

```bash
# Run Lighthouse audit
npm run audit:lighthouse

# Check performance, accessibility, SEO
```

## Rollback

### Cloudflare Pages

- Go to Deployments tab
- Click "..." on previous deployment
- Select "Rollback to this deployment"

### GitHub Pages

- Revert commit in `main` branch
- Push to trigger rebuild

### Vercel

- Go to Deployments
- Click "..." on previous deployment
- Select "Promote to Production"

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [React Router and Base Path](https://reactrouter.com/en/main/routers/create-browser-router#basename)
