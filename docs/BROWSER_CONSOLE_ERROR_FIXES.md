# Browser Console Error Fixes - Implementation Guide

**Date:** 2025-01-27
**Related:** `BROWSER_CONSOLE_ERROR_TRIAGE_REPORT.md`

---

## Priority 1: Fix Custom Element Guard Production Check

### Issue
The custom element guard in `index.html` exits early in production, preventing protection from working.

### Current Code (index.html line 14)
```javascript
if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') return;
```

### Problem
This check prevents the guard from running in production, where it's most needed. The guard should work in all environments.

### Fix
Remove the production check or invert the logic to only skip in development if needed.

### Implementation

**File:** `index.html`
**Lines:** 9-73

**Change:**
```diff
-        if (typeof window === 'undefined') return;
-        if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') return;
+        if (typeof window === 'undefined') return;
+        // Guard should work in all environments, including production
```

### Testing
1. Build production: `npm run build`
2. Serve locally: `npx serve -s dist -l 5000`
3. Open browser console
4. Verify guard is active (no early return)
5. Check for custom element duplicate warnings

---

## Priority 2: Fix Global Error Handler Undefined Check

### Issue
Global error handler logs errors even when all properties are undefined, creating noise.

### Current Code (index.html line 242)
```javascript
console.error('Global error caught:', {
  message: e.message,
  filename: e.filename,
  lineno: e.lineno,
  colno: e.colno,
  error: e.error
});
```

### Problem
Logs undefined errors that provide no useful information.

### Fix
Add check to only log errors with meaningful information.

### Implementation

**File:** `index.html`
**Lines:** 228-305

**Change:**
```diff
      window.addEventListener('error', function(e) {
        if (!e) return;

        // Aggressively suppress TinyMCE custom element errors (from Vite overlay)
        const message = e.message || '';
        const filename = e.filename || '';

        if (message.includes('mce-autosize-textarea') || filename.includes('webcomponents-ce.js')) {
          // Silently ignore TinyMCE/Vite overlay errors
          e.preventDefault();
          e.stopPropagation();
          return false;
        }

+        // Only log errors with meaningful information
+        if (!e.message && !e.filename && !e.error) {
+          // Skip logging undefined errors
+          return;
+        }

        console.error('Global error caught:', {
          message: e.message,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno,
          error: e.error
        });
```

### Testing
1. Build and serve locally
2. Trigger various error scenarios
3. Verify undefined errors are not logged
4. Verify real errors are still logged

---

## Priority 3: CI Validation for Asset MIME Types

### Issue
No automated validation that built assets have correct MIME types.

### Solution
Create CI script to validate asset MIME types after build.

### Implementation

**New File:** `scripts/validate-asset-mime-types.mjs`

```javascript
#!/usr/bin/env node
/**
 * Validates that all built assets have correct MIME types
 * Run after build: node scripts/validate-asset-mime-types.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = join(__dirname, '..', 'dist');
const indexHtmlPath = join(distDir, 'index.html');

// Expected MIME types
const MIME_TYPES = {
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.html': 'text/html',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function getExpectedMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || null;
}

function extractAssetReferences(htmlContent) {
  const assets = new Set();

  // Extract script src
  const scriptMatches = htmlContent.matchAll(/src=["']([^"']+\.(js|mjs))["']/g);
  for (const match of scriptMatches) {
    assets.add(match[1]);
  }

  // Extract link href (CSS, modulepreload)
  const linkMatches = htmlContent.matchAll(/href=["']([^"']+\.(css|js|mjs))["']/g);
  for (const match of linkMatches) {
    assets.add(match[1]);
  }

  return Array.from(assets);
}

function checkAssetExists(assetPath) {
  const fullPath = join(distDir, assetPath.startsWith('/') ? assetPath.slice(1) : assetPath);
  return statSync(fullPath, { throwIfNoEntry: false }) !== undefined;
}

function validateAssets() {
  console.log('🔍 Validating asset MIME types...\n');

  if (!statSync(indexHtmlPath, { throwIfNoEntry: false })) {
    console.error('❌ index.html not found in dist/');
    process.exit(1);
  }

  const htmlContent = readFileSync(indexHtmlPath, 'utf-8');
  const referencedAssets = extractAssetReferences(htmlContent);

  console.log(`Found ${referencedAssets.length} referenced assets\n`);

  let errors = 0;
  let warnings = 0;

  for (const asset of referencedAssets) {
    const assetPath = asset.startsWith('/') ? asset.slice(1) : asset;
    const fullPath = join(distDir, assetPath);

    if (!checkAssetExists(assetPath)) {
      console.error(`❌ Asset not found: ${asset}`);
      errors++;
      continue;
    }

    const expectedMime = getExpectedMimeType(fullPath);
    if (expectedMime) {
      console.log(`✅ ${asset} → ${expectedMime}`);
    } else {
      console.warn(`⚠️  ${asset} → Unknown MIME type`);
      warnings++;
    }
  }

  // Check all assets in dist/assets
  console.log('\n📦 Checking all assets in dist/assets/...\n');
  const assetsDir = join(distDir, 'assets');
  if (statSync(assetsDir, { throwIfNoEntry: false })) {
    const assetFiles = readdirSync(assetsDir);
    for (const file of assetFiles) {
      const filePath = join(assetsDir, file);
      const expectedMime = getExpectedMimeType(filePath);
      if (expectedMime) {
        console.log(`✅ assets/${file} → ${expectedMime}`);
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Referenced assets: ${referencedAssets.length}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Warnings: ${warnings}`);

  if (errors > 0) {
    console.error('\n❌ Validation failed');
    process.exit(1);
  }

  console.log('\n✅ All assets validated successfully');
}

validateAssets();
```

**Update:** `package.json` scripts section
```json
{
  "scripts": {
    "build:verify": "npm run build && node scripts/validate-asset-mime-types.mjs",
    "validate:mime": "node scripts/validate-asset-mime-types.mjs"
  }
}
```

### Testing
```bash
npm run build
npm run validate:mime
```

---

## Priority 4: Test Checklist

### Pre-Deployment Checklist

- [ ] Build completes without errors: `npm run build`
- [ ] All assets exist in `dist/`: `ls -la dist/assets/`
- [ ] MIME type validation passes: `npm run validate:mime`
- [ ] Service worker registers: Check browser console for SW logs
- [ ] No custom element errors: Check console for duplicate registration warnings
- [ ] No undefined error logs: Check console for undefined error objects
- [ ] Page loads within 5 seconds: Test on slow 3G throttling
- [ ] All module scripts load: Check Network tab for 200 status
- [ ] Preload links work: Check Network tab for preloaded resources

### Post-Deployment Verification

1. **Open site in incognito:** https://mem-rebuild-pl.pages.dev/
2. **Open DevTools Console:**
   - [ ] No red errors
   - [ ] Service worker installs successfully
   - [ ] No custom element duplicate warnings
   - [ ] No undefined error logs
3. **Open DevTools Network:**
   - [ ] All JS modules return 200
   - [ ] All CSS files return 200
   - [ ] Content-Type headers are correct:
     - JS: `application/javascript`
     - CSS: `text/css`
4. **Test Page Functionality:**
   - [ ] Page renders correctly
   - [ ] Navigation works
   - [ ] No console errors on navigation
   - [ ] Service worker caches assets

### Rollback Plan

If issues occur after deployment:

1. **Immediate:** Revert to previous deployment in Cloudflare Pages dashboard
2. **Verify:** Check previous deployment hash matches known good version
3. **Debug:** Review Cloudflare Pages build logs
4. **Fix:** Apply fixes in separate branch, test locally, then redeploy

---

## Documentation References

### Service Workers
- [MDN Service Worker Lifecycle](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_service_workers)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox/)
- [Vite PWA Plugin](https://vitejs.dev/guide/static-deploy.html)

### Custom Elements
- [MDN Custom Elements Best Practices](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Registering_a_custom_element)
- [Web Components Spec](https://html.spec.whatwg.org/multipage/custom-elements.html)

### MIME Types
- [MDN MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [MDN Module Scripts](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-type)
- [Cloudflare Pages Headers](https://developers.cloudflare.com/pages/platform/headers/)

### Preload
- [MDN Preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)
- [MDN Modulepreload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/modulepreload)
- [Preload vs Prefetch](https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch)

---

## Implementation Order

1. ✅ Fix custom element guard (Priority 1)
2. ✅ Fix global error handler (Priority 2)
3. ✅ Add CI validation script (Priority 3)
4. ✅ Test all fixes locally
5. ✅ Deploy and verify
6. ✅ Document results

---

## Expected Outcomes

After implementing these fixes:

- ✅ Custom element guard works in production
- ✅ No undefined error logs in console
- ✅ CI validates asset MIME types automatically
- ✅ Clear test checklist for future deployments
- ✅ Comprehensive documentation for troubleshooting

