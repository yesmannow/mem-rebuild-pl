# Cloudflare Pages Deployment Configuration

This document outlines the required Cloudflare Pages settings for proper deployment of the Vite + React + TypeScript application.

## Required Build Settings

### Framework Preset
- **Framework preset**: `Vite`
- Cloudflare Pages will automatically detect Vite and configure basic settings

### Build Configuration
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Root directory**: `/` (project root)

### Environment Variables
No special environment variables required for basic deployment.

### Node Version
- **Node version**: Check `package.json` `engines` field (if specified)
- Default: Cloudflare Pages uses Node.js 18.x or latest LTS

## Build Output Structure

After running `npm run build`, the `dist/` directory should contain:

```
dist/
├── index.html          # Main HTML entry point
├── _headers            # Cloudflare Pages headers (MIME types)
├── _redirects          # SPA routing fallback
├── assets/
│   ├── *.css          # Extracted CSS files
│   ├── *.js           # ES module JavaScript files
│   └── *.json         # Manifest and other JSON files
└── [other static assets]
```

## Critical Files

### `dist/_headers`
This file ensures correct MIME types for assets:
- CSS files: `Content-Type: text/css; charset=utf-8`
- JS files: `Content-Type: application/javascript; charset=utf-8`
- Prevents MIME type mismatches that break stylesheets and module loading

### `dist/_redirects`
SPA routing fallback:
```
/*    /index.html   200
```
Ensures all routes fallback to `index.html` for client-side routing.

## Verification

After deployment, verify:

1. **CSS files load correctly**
   - Open browser DevTools → Network tab
   - Check CSS files have `Content-Type: text/css`
   - Stylesheets should apply correctly

2. **JavaScript modules load**
   - Check JS files have `Content-Type: application/javascript`
   - No "Failed to load module script" errors
   - Application should initialize properly

3. **SPA routing works**
   - Navigate directly to routes like `/about` or `/case-studies`
   - Should load correctly without 404 errors

## Troubleshooting

### CSS files served as `application/javascript`
- Verify `dist/_headers` exists and has CSS rules
- Check that CSS rules come before JS rules in `_headers`
- Ensure Cloudflare Pages is reading `_headers` file

### JS files served as `application/octet-stream`
- Verify `dist/_headers` has JS MIME type rules
- Check that files have `.js` extension (not `.mjs` unless configured)
- Ensure `vite.config.js` has `assetsDir: 'assets'`

### SPA routes return 404
- Verify `dist/_redirects` exists with correct format
- Check that fallback rule is: `/*    /index.html   200`
- Ensure Cloudflare Pages Functions aren't overriding redirects

### Build fails
- Check Node version matches `package.json` engines
- Verify all dependencies install correctly
- Run `npm run build:verify` locally to check build output

## Local Testing

Before deploying, test the build locally:

```bash
# Build and verify
npm run build:verify

# Preview build
npm run preview

# Check MIME types (in browser DevTools)
# Open http://localhost:4173
# Network tab → Check Content-Type headers
```

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Vite Build Configuration](https://vitejs.dev/config/build-options.html)
- [Cloudflare Pages Headers](https://developers.cloudflare.com/pages/platform/headers/)

