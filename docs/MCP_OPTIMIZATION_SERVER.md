# MCP Optimization Server Documentation

## Overview

The MCP (Model Context Protocol) Optimization Server provides comprehensive optimization services for your portfolio website. It includes 8 major optimization services plus the existing branding services.

## Version

**Current Version**: 2.0.0

## Services

### 1. Performance Analytics (`/analytics`)
Track and analyze Core Web Vitals (LCP, FID, CLS, FCP, TTFB)

**Endpoints:**
- `POST /analytics/performance-report` - Submit performance metrics and get analysis
- `GET /analytics/metrics/{url}` - Get historical metrics for a URL
- `GET /analytics/trends/{url}` - Get performance trends

**Usage:**
```typescript
import { usePerformanceAnalytics } from '@/hooks/useMCP';

const { reportPerformance } = usePerformanceAnalytics();
await reportPerformance({
  lcp: 2500,
  fid: 100,
  cls: 0.1,
  fcp: 1800,
  ttfb: 800,
  url: window.location.href
});
```

### 2. Image Optimization (`/images`)
Server-side image processing, compression, and format conversion

**Endpoints:**
- `POST /images/optimize-image` - Optimize a single image
- `POST /images/optimize-batch` - Optimize multiple images

**Usage:**
```typescript
import { useImageOptimization } from '@/hooks/useMCP';

const { optimizeImage } = useImageOptimization();
const result = await optimizeImage({
  image_url: 'https://example.com/image.jpg',
  formats: ['webp', 'avif'],
  widths: [400, 800, 1200, 1600],
  quality: 85
});
```

### 3. SEO Meta Generation (`/seo`)
Dynamic meta tag generation and validation

**Endpoints:**
- `POST /seo/generate-meta` - Generate optimized meta tags
- `POST /seo/validate` - Validate SEO tags
- `POST /seo/generate-sitemap` - Generate sitemap.xml

**Usage:**
```typescript
import { useSEOGeneration } from '@/hooks/useMCP';

const { generateMeta } = useSEOGeneration();
const meta = await generateMeta({
  title: 'Page Title',
  description: 'Page description',
  url: 'https://example.com/page',
  keywords: ['keyword1', 'keyword2']
});
```

### 4. Bundle Analysis (`/bundles`)
Analyze JavaScript bundles and suggest optimizations

**Endpoints:**
- `POST /bundles/analyze-bundle` - Analyze bundle stats
- `GET /bundles/analyze-build` - Analyze build directory

**Usage:**
```typescript
import { useBundleAnalysis } from '@/hooks/useMCP';

const { analyzeBundle } = useBundleAnalysis();
const analysis = await analyzeBundle(buildStatsJson, 100);
```

### 5. Lighthouse Integration (`/lighthouse`)
Automated Lighthouse audits and reporting

**Endpoints:**
- `POST /lighthouse/audit` - Run Lighthouse audit
- `POST /lighthouse/audit-batch` - Run audits for multiple URLs

**Usage:**
```typescript
import { useLighthouseAudit } from '@/hooks/useMCP';

const { runAudit } = useLighthouseAudit();
const audit = await runAudit('https://example.com', 'desktop');
```

### 6. Resource Hints (`/resource-hints`)
Generate optimal preload, prefetch, and preconnect hints

**Endpoints:**
- `POST /resource-hints/generate-hints` - Generate resource hints
- `POST /resource-hints/analyze-page` - Analyze page for hints

**Usage:**
```typescript
import { useResourceHints } from '@/hooks/useMCP';

const { generateHints } = useResourceHints();
const hints = await generateHints({
  page_url: 'https://example.com',
  critical_resources: ['/styles.css', '/main.js'],
  next_pages: ['/about', '/contact'],
  external_domains: ['fonts.googleapis.com']
});
```

### 7. Content Analysis (`/content`)
Analyze content for readability, SEO, and engagement

**Endpoints:**
- `POST /content/analyze-content` - Analyze content
- `POST /content/suggest-improvements` - Get improvement suggestions

**Usage:**
```typescript
import { useContentAnalysis } from '@/hooks/useMCP';

const { analyzeContent } = useContentAnalysis();
const analysis = await analyzeContent(
  htmlContent,
  'blog-post',
  ['keyword1', 'keyword2']
);
```

### 8. Cache Optimization (`/cache`)
Generate optimal cache headers and platform configurations

**Endpoints:**
- `POST /cache/generate-strategy` - Generate cache strategy
- `GET /cache/platform-config/{platform}` - Get platform config

**Usage:**
```typescript
import { useCacheOptimization } from '@/hooks/useMCP';

const { generateStrategy } = useCacheOptimization();
const strategy = await generateStrategy(
  ['static', 'images', 'fonts', 'css', 'js'],
  'vercel'
);
```

## Setup

### 1. Install Dependencies

```bash
cd mcp
pip install -r requirements.txt
```

### 2. Start Server

```bash
# Windows
.\launch_mcp.ps1

# Linux/Mac
python -m uvicorn mcp.main:app --reload
```

### 3. Configure Client

Set environment variable:
```bash
VITE_MCP_URL=http://localhost:8000
```

## Integration Examples

### Performance Monitoring Integration

```typescript
import { usePerformanceAnalytics } from '@/hooks/useMCP';
import { useEffect } from 'react';

function PerformanceReporter() {
  const { reportPerformance } = usePerformanceAnalytics();

  useEffect(() => {
    // Measure Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          reportPerformance({
            lcp: entry.startTime,
            url: window.location.href
          });
        }
      }
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }, [reportPerformance]);
}
```

### Image Optimization Integration

```typescript
import { useImageOptimization } from '@/hooks/useMCP';

function OptimizedImage({ src, alt }) {
  const { optimizeImage } = useImageOptimization();
  const [optimized, setOptimized] = useState(null);

  useEffect(() => {
    optimizeImage({ image_url: src }).then(setOptimized);
  }, [src]);

  if (!optimized) return <img src={src} alt={alt} />;

  return (
    <picture>
      <source srcSet={optimized.optimized_urls.avif} type="image/avif" />
      <source srcSet={optimized.optimized_urls.webp} type="image/webp" />
      <img src={src} alt={alt} />
    </picture>
  );
}
```

### SEO Integration

```typescript
import { useSEOGeneration } from '@/hooks/useMCP';
import { Helmet } from 'react-helmet-async';

function SEOHead({ pageData }) {
  const { generateMeta } = useSEOGeneration();
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    generateMeta(pageData).then(setMeta);
  }, [pageData]);

  if (!meta) return null;

  return (
    <Helmet>
      <title>{meta.meta_tags.title}</title>
      <meta name="description" content={meta.meta_tags.description} />
      {Object.entries(meta.open_graph).map(([key, value]) => (
        <meta key={key} property={key} content={value} />
      ))}
      <script type="application/ld+json">
        {JSON.stringify(meta.structured_data)}
      </script>
    </Helmet>
  );
}
```

## API Reference

### Base URL
- Development: `http://localhost:8000`
- Production: Set via `VITE_MCP_URL` environment variable

### Health Check
```bash
GET /health
```

### Version Info
```bash
GET /version
```

### API Documentation
Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Best Practices

1. **Performance Analytics**: Report metrics after page load (15-30 seconds)
2. **Image Optimization**: Pre-optimize images during build time
3. **SEO**: Generate meta tags server-side when possible
4. **Bundle Analysis**: Run after each build
5. **Lighthouse**: Run audits in CI/CD pipeline
6. **Resource Hints**: Generate based on actual page analysis
7. **Content Analysis**: Use for content quality checks
8. **Cache Strategy**: Generate once per deployment

## Troubleshooting

### Server Won't Start
- Check Python version (3.8+)
- Install dependencies: `pip install -r requirements.txt`
- Check port 8000 is available

### Image Optimization Fails
- Ensure Pillow is installed: `pip install Pillow`
- Check image URL is accessible
- Verify disk space for temporary files

### Lighthouse Audit Fails
- Install Lighthouse CLI: `npm install -g lighthouse`
- Or use mock mode (fallback provided)

## Future Enhancements

- Database integration for metrics storage
- CDN integration for optimized images
- Real-time performance monitoring dashboard
- Automated optimization recommendations
- Integration with CI/CD pipelines

