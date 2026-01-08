# Phase 5 Verification Checklist

**Date:** January 7, 2025  
**Phase:** Performance & SEO Optimization  
**Status:** Ready for Testing

---

## ✅ Pre-Verification Setup

### 1. Dev Server Status
- [x] Vite cache cleared (`node_modules/.vite`)
- [x] React alias cleanup applied
- [ ] Dev server running on `http://localhost:5173`

**To Start:**
```bash
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Verification:**
- [ ] No "@vitejs/plugin-react can't detect preamble" errors
- [ ] No duplicate React warnings
- [ ] Clean HMR connection

---

## 🖼️ Image Loading Tests

### Test 1: Primary Colours Project
**URL:** `http://localhost:5173/side-projects/primary-colours`

**What to Check:**
1. **Hero Image:**
   - [ ] Loads `primary colours logo.webp` or `.avif`
   - [ ] No 404 errors in Network tab
   - [ ] Image displays correctly

2. **Gallery Images:**
   - [ ] `primary colours logo.webp`
   - [ ] `art v art.webp`
   - [ ] `Broad Ripple Village Association.webp`
   - [ ] `installation nation .webp`
   - [ ] `installation nation 2.webp`

3. **Network Tab Verification:**
   - [ ] Open DevTools → Network → Img filter
   - [ ] Refresh page
   - [ ] Verify AVIF or WebP served (not JPG)
   - [ ] Check file sizes (should be 40-60% smaller)

**How to Verify `<picture>` Element:**
```
1. Right-click hero image → Inspect
2. Look for <picture> element with:
   - <source type="image/avif">
   - <source type="image/webp">
   - <img> fallback
```

---

### Test 2: Piko Fg Music Project
**URL:** `http://localhost:5173/side-projects/piko-fg-music`

**What to Check:**
1. **Hero Image:**
   - [ ] Loads `Screenshot of PIKO _ Pro DJ Console.webp` or `.avif`
   - [ ] Industrial brutalist styling intact
   - [ ] No layout shifts

2. **Gallery Images:**
   - [ ] `Screenshot of Piko Artist Studio.webp`
   - [ ] `Screenshot of PIKO _ Pro DJ Console.webp`
   - [ ] `hero-bw.webp`
   - [ ] `hero-white.webp`
   - [ ] `graffiti-wall-2.webp`
   - [ ] `grunge-window.webp`

3. **Performance Check:**
   - [ ] Images load progressively
   - [ ] No visible lag or jank
   - [ ] Smooth scroll through gallery

---

## 📊 SEO Meta Integration (Optional)

### Generated Files
All SEO meta files are ready in `src/data/`:
- `seo-home.json`
- `seo-about.json`
- `seo-studio.json`
- `seo-case-studies.json`
- `seo-side-projects.json`
- `seo-contact.json`

### Integration Example (if desired)

**Option A: Import in Page Component**
```tsx
// src/pages/Home.tsx
import seoMeta from '../data/seo-home.json';

// In Helmet component:
<Helmet>
  <title>{seoMeta.title}</title>
  <meta name="description" content={seoMeta.description} />
  <meta name="keywords" content={seoMeta.keywords} />
  {/* Open Graph */}
  <meta property="og:title" content={seoMeta.openGraph.title} />
  <meta property="og:description" content={seoMeta.openGraph.description} />
  <meta property="og:image" content={seoMeta.openGraph.image} />
  {/* Twitter */}
  <meta name="twitter:title" content={seoMeta.twitter.title} />
  <meta name="twitter:description" content={seoMeta.twitter.description} />
</Helmet>
```

**Option B: Keep Current Meta Tags**
- Current `index.html` meta tags are already optimized
- Generated JSON files serve as reference/backup
- Use for future page additions

---

## 🚀 Lighthouse Performance Audit

### Prerequisites
1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Preview the build:**
   ```bash
   npm run preview
   ```
   - Server runs on `http://localhost:4173`

3. **Run Lighthouse:**
   ```bash
   npm run audit:lighthouse
   ```

### Expected Improvements

**Before (Phase 4):**
- LCP: ~2.5-3.0s (JPG images)
- Performance Score: ~85-90

**After (Phase 5):**
- LCP: ~1.5-2.0s (AVIF/WebP images)
- Performance Score: ~90-95
- Image size reduction: 40-60%

**Key Metrics to Check:**
- [ ] **LCP (Largest Contentful Paint):** < 2.5s (green)
- [ ] **FID (First Input Delay):** < 100ms (green)
- [ ] **CLS (Cumulative Layout Shift):** < 0.1 (green)
- [ ] **Total Blocking Time:** < 300ms
- [ ] **Speed Index:** < 3.0s

### Manual Lighthouse Run (Alternative)

If `npm run audit:lighthouse` fails:

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select:
   - [x] Performance
   - [x] Accessibility
   - [x] Best Practices
   - [x] SEO
4. Device: Desktop
5. Click "Analyze page load"

**Save Report:**
- Click "Save as HTML"
- Save to `reports/lighthouse-manual-[date].html`

---

## 🔍 Browser DevTools Checks

### Network Tab
**Filter:** Img

**What to Look For:**
1. **Image Formats:**
   - Modern browsers: AVIF served first
   - Fallback browsers: WebP served
   - Legacy browsers: JPG/PNG served

2. **File Sizes:**
   - AVIF: ~40-50 KB (was ~100-150 KB JPG)
   - WebP: ~60-80 KB (was ~100-150 KB JPG)

3. **Response Headers:**
   - `Content-Type: image/avif` or `image/webp`
   - `Cache-Control` present

### Console Tab
**Expected:** Clean, no errors

**Should NOT See:**
- ❌ "@vitejs/plugin-react can't detect preamble"
- ❌ "Duplicate React" warnings
- ❌ Image 404 errors
- ❌ Preload warnings

**May See (Safe to Ignore):**
- ℹ️ React DevTools suggestion
- ℹ️ Vite HMR connection messages

### Elements Tab
**Inspect Hero Image:**

**Expected Structure:**
```html
<picture class="...">
  <source srcset="/images/.../image.avif" type="image/avif">
  <source srcset="/images/.../image.webp" type="image/webp">
  <img src="/images/.../image.webp" alt="..." class="...">
</picture>
```

---

## 📈 Performance Comparison

### Before Phase 5
```
Image Delivery:
- Format: JPG/PNG
- Size: 100-200 KB per image
- LCP: 2.5-3.0s

Build:
- HMR: Occasional preamble errors
- React: Potential duplicates
```

### After Phase 5
```
Image Delivery:
- Format: AVIF → WebP → JPG fallback
- Size: 40-80 KB per image (40-60% reduction)
- LCP: 1.5-2.0s (target)

Build:
- HMR: Clean, no preamble errors
- React: Single instance, deduplicated
```

---

## ✅ Verification Checklist Summary

### Critical Tests
- [ ] Dev server starts without errors
- [ ] Primary Colours hero loads AVIF/WebP
- [ ] Piko Fg Music hero loads AVIF/WebP
- [ ] No console errors
- [ ] `<picture>` elements present in DOM

### Performance Tests
- [ ] Build completes successfully
- [ ] Preview server runs
- [ ] Lighthouse audit runs
- [ ] LCP < 2.5s
- [ ] Performance score > 90

### Optional Tests
- [ ] SEO meta files reviewed
- [ ] Network tab shows AVIF/WebP
- [ ] Image sizes reduced 40-60%

---

## 🐛 Troubleshooting

### Issue: Dev server won't start
**Solution:**
```bash
# Clear all caches
Remove-Item -Recurse -Force node_modules\.vite
Remove-Item -Recurse -Force dist

# Reinstall if needed
npm install

# Restart
npm run dev
```

### Issue: Images still loading as JPG
**Solution:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check if AVIF/WebP files exist in `public/images/projects/`

### Issue: Lighthouse audit fails
**Solution:**
1. Ensure preview server is running: `npm run preview`
2. Wait 5 seconds after starting preview
3. Try manual Lighthouse in DevTools instead

### Issue: Console shows React warnings
**Solution:**
1. Stop dev server
2. Clear Vite cache: `Remove-Item -Recurse -Force node_modules\.vite`
3. Restart: `npm run dev`

---

## 📝 Test Results Template

```
Date: ___________
Tester: ___________

Dev Server:
- Started: [ ] Yes [ ] No
- Errors: [ ] None [ ] List: ___________

Image Loading:
- Primary Colours: [ ] AVIF [ ] WebP [ ] JPG
- Piko Fg Music: [ ] AVIF [ ] WebP [ ] JPG
- Gallery: [ ] All loaded [ ] Issues: ___________

Performance:
- LCP: _____ s
- Performance Score: _____ / 100
- Image Size Reduction: _____ %

Issues Found:
1. ___________
2. ___________

Notes:
___________
```

---

**Status:** Ready for verification  
**Next Steps:** Run through checklist and report findings
