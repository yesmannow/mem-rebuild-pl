# MCP Optimization Server - Quick Start Guide

## 🚀 Quick Setup

### 1. Install Python Dependencies

```bash
cd mcp
pip install -r requirements.txt
```

**Required packages:**
- `fastapi` - Web framework
- `uvicorn[standard]` - ASGI server
- `pydantic` - Data validation
- `aiohttp` - Async HTTP client
- `aiofiles` - Async file operations
- `Pillow` - Image processing
- `python-multipart` - Form data handling

### 2. Start the Server

**Windows:**
```powershell
.\launch_mcp.ps1
```

**Linux/Mac:**
```bash
python -m uvicorn mcp.main:app --reload
```

The server will start at `http://localhost:8000`

### 3. Verify Installation

Visit these URLs:
- **API Root**: http://localhost:8000/
- **Health Check**: http://localhost:8000/health
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 4. Configure Client

Add to your `.env` file:
```env
VITE_MCP_URL=http://localhost:8000
```

## 📝 Usage Examples

### Performance Analytics

```typescript
import { usePerformanceAnalytics } from '@/hooks/useMCP';

const { reportPerformance } = usePerformanceAnalytics();

// Report Core Web Vitals
await reportPerformance({
  lcp: 2500,
  fid: 100,
  cls: 0.1,
  fcp: 1800,
  ttfb: 800,
  url: window.location.href
});
```

### Image Optimization

```typescript
import { useImageOptimization } from '@/hooks/useMCP';

const { optimizeImage } = useImageOptimization();

const result = await optimizeImage({
  image_url: 'https://example.com/image.jpg',
  formats: ['webp', 'avif'],
  widths: [400, 800, 1200, 1600]
});

// Use optimized images
<picture>
  <source srcSet={result.optimized_urls.avif} type="image/avif" />
  <source srcSet={result.optimized_urls.webp} type="image/webp" />
  <img src={result.original_url} alt="Optimized" />
</picture>
```

### SEO Generation

```typescript
import { useSEOGeneration } from '@/hooks/useMCP';

const { generateMeta } = useSEOGeneration();

const meta = await generateMeta({
  title: 'My Page Title',
  description: 'Page description here',
  url: 'https://example.com/page',
  keywords: ['keyword1', 'keyword2']
});

// Apply meta tags
document.title = meta.meta_tags.title;
```

### Bundle Analysis

```typescript
import { useBundleAnalysis } from '@/hooks/useMCP';

const { analyzeBuild } = useBundleAnalysis();

// Analyze build output
const analysis = await analyzeBuild('dist');

console.log('Total size:', analysis.total_size_kb, 'KB');
console.log('Recommendations:', analysis.recommendations);
```

### Lighthouse Audit

```typescript
import { useLighthouseAudit } from '@/hooks/useMCP';

const { runAudit } = useLighthouseAudit();

const audit = await runAudit('https://example.com', 'desktop');

console.log('Performance:', audit.scores.performance);
console.log('Opportunities:', audit.opportunities);
```

## 🔧 Integration with Existing Components

### Update PerformanceMonitor Component

```typescript
// src/components/utils/PerformanceMonitor.tsx
import { usePerformanceAnalytics } from '@/hooks/useMCP';

const PerformanceMonitor: React.FC = () => {
  const { reportPerformance } = usePerformanceAnalytics();

  useEffect(() => {
    // ... existing performance measurement code ...

    // Report to MCP server
    reportPerformance({
      lcp: metrics.lcp,
      fid: metrics.fid,
      cls: metrics.cls,
      fcp: metrics.fcp,
      ttfb: metrics.ttfb,
      url: window.location.href
    });
  }, [metrics]);

  // ... rest of component
};
```

### Update OptimizedImage Component

```typescript
// src/components/common/OptimizedImage.tsx
import { useImageOptimization } from '@/hooks/useMCP';

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, ...props }) => {
  const { optimizeImage } = useImageOptimization();
  const [optimized, setOptimized] = useState(null);

  useEffect(() => {
    if (src) {
      optimizeImage({ image_url: src }).then(setOptimized);
    }
  }, [src]);

  // Use optimized sources if available
  // ... rest of component
};
```

## 🎯 Best Practices

1. **Performance Analytics**
   - Report metrics after page load (15-30 seconds)
   - Only report in production
   - Batch multiple metrics together

2. **Image Optimization**
   - Pre-optimize images during build time
   - Cache optimized image URLs
   - Use srcset for responsive images

3. **SEO Generation**
   - Generate meta tags server-side when possible
   - Validate SEO tags before deployment
   - Update sitemap regularly

4. **Bundle Analysis**
   - Run after each build
   - Set up CI/CD integration
   - Track bundle size over time

5. **Lighthouse Audits**
   - Run in CI/CD pipeline
   - Compare scores over time
   - Fix critical issues first

## 🐛 Troubleshooting

### Server won't start
- Check Python version: `python --version` (need 3.8+)
- Install dependencies: `pip install -r requirements.txt`
- Check port 8000 is available

### Image optimization fails
- Ensure Pillow is installed: `pip install Pillow`
- Check image URL is accessible
- Verify disk space for temporary files

### Lighthouse audit fails
- Install Lighthouse CLI: `npm install -g lighthouse`
- Or use mock mode (fallback provided)

### CORS errors
- Server is configured to allow all origins
- Check browser console for specific errors
- Verify MCP_BASE_URL is correct

## 📚 Next Steps

1. Read full documentation: [MCP_OPTIMIZATION_SERVER.md](./MCP_OPTIMIZATION_SERVER.md)
2. Explore API docs: http://localhost:8000/docs
3. Integrate services into your components
4. Set up CI/CD integration
5. Monitor performance improvements

## 🎉 Success!

You now have a comprehensive optimization server running! All 8 services are available and ready to use.

