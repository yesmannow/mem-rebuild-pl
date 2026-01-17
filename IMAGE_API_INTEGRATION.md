# Image API Integration Guide

This guide explains how to use Pexels, Pixabay, and Unsplash APIs to add beautiful, high-quality images throughout your site.

## 🚀 Quick Start

### 1. API Keys Setup

Your API keys are already configured in `.env.local`:

```env
VITE_PEXELS_API_KEY="your_pexels_key"
VITE_PIXABAY_API_KEY="your_pixabay_key"
VITE_UNSPLASH_ACCESS_KEY="your_unsplash_key"
```

**Get Free API Keys:**
- **Pexels**: https://www.pexels.com/api/ (Free, 200 requests/hour)
- **Pixabay**: https://pixabay.com/api/docs/ (Free, generous limits)
- **Unsplash**: https://unsplash.com/developers (Free, 50 requests/hour)

### 2. Basic Usage

#### Using the Hook

```tsx
import { useUnifiedImage } from '../hooks/useUnifiedImage';

function MyComponent() {
  const { image, isLoading, error } = useUnifiedImage('technology workspace', {
    preferredSource: 'pexels', // or 'pixabay', 'unsplash', 'auto'
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !image) return <div>Error loading image</div>;

  return <img src={image.url} alt={image.alt} />;
}
```

#### Using the Gallery Component

```tsx
import { ApiImageGallery } from '../components/ui/ApiImageGallery';

function MyGallery() {
  return (
    <ApiImageGallery
      query="marketing strategy"
      count={12}
      columns={3}
      showAttribution
    />
  );
}
```

#### Using Background Images

```tsx
import { ApiBackgroundImage } from '../components/ui/ApiBackgroundImage';

function HeroSection() {
  return (
    <section className="relative min-h-screen">
      <ApiBackgroundImage
        query="modern office"
        source="pexels"
        overlayColor="dark"
        overlayOpacity={0.7}
      />
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </section>
  );
}
```

## 📚 Available Hooks

### `useUnifiedImage`
Fetch a single image with automatic fallback.

```tsx
const { image, isLoading, error, refetch } = useUnifiedImage(query, {
  preferredSource: 'auto', // 'pexels' | 'pixabay' | 'unsplash' | 'auto'
  enabled: true,
});
```

### `useUnifiedImages`
Fetch multiple images from a search query.

```tsx
const { images, image, isLoading, error, refetch } = useUnifiedImages({
  query: 'technology',
  perPage: 10,
  preferredSource: 'auto',
  orientation: 'landscape',
});
```

### `useCuratedImages`
Get featured/curated images from Pexels.

```tsx
const { images, isLoading, error, refetch } = useCuratedImages(12);
```

### `useThemedImages`
Get images for multiple themes/categories.

```tsx
const { images, isLoading, error, refetch } = useThemedImages(
  ['technology', 'business', 'marketing'],
  3 // images per theme
);
```

## 🎨 Components

### `ApiImageGallery`
Beautiful, responsive image gallery with hover effects and attribution.

**Props:**
- `query?: string` - Search query
- `themes?: string[]` - Array of themes to search
- `curated?: boolean` - Use curated images
- `count?: number` - Number of images (default: 12)
- `columns?: 2 | 3 | 4` - Grid columns (default: 3)
- `showAttribution?: boolean` - Show photographer credit (default: true)
- `onImageClick?: (url: string) => void` - Click handler

### `ApiBackgroundImage`
High-quality background images with overlay support.

**Props:**
- `query: string` - Search query
- `source?: 'pexels' | 'pixabay' | 'unsplash' | 'auto'` - Preferred source
- `overlayColor?: 'dark' | 'light' | 'brand'` - Overlay color
- `overlayOpacity?: number` - Overlay opacity (0-1)
- `priority?: boolean` - Load with priority
- `fallbackGradient?: string` - Fallback gradient CSS

## 🔧 Service API

### Direct Service Usage

```tsx
import { unifiedImageService } from '../services/unifiedImageService';

// Get single image
const image = await unifiedImageService.getImage('technology', 'pexels');

// Get multiple images
const images = await unifiedImageService.getImages('marketing', 10, 'auto');

// Get themed images
const themed = await unifiedImageService.getThemedImages(
  ['tech', 'business'],
  5
);

// Get curated images
const curated = await unifiedImageService.getCuratedImages(20);
```

## 💡 Best Practices

1. **Use 'auto' source** - Let the service choose the best available API
2. **Cache results** - Images are automatically cached for 24 hours
3. **Show loading states** - Always handle `isLoading` state
4. **Handle errors gracefully** - Provide fallbacks for failed requests
5. **Respect attribution** - Show photographer credits when possible
6. **Optimize images** - Use appropriate sizes (the service handles this)

## 🎯 Use Cases

### Hero Sections
```tsx
<ApiBackgroundImage
  query="professional workspace"
  source="pexels"
  overlayOpacity={0.8}
/>
```

### Portfolio Galleries
```tsx
<ApiImageGallery
  themes={['design', 'technology', 'business']}
  count={15}
  columns={3}
/>
```

### Blog Post Headers
```tsx
const { image } = useUnifiedImage(postCategory, { preferredSource: 'pexels' });
```

### Feature Sections
```tsx
const { images } = useThemedImages(['innovation', 'growth', 'success'], 3);
```

## 🔄 Fallback Strategy

The service automatically falls back through providers:
1. **Pexels** (if API key available)
2. **Pixabay** (if API key available)
3. **Unsplash** (if API key available)

If all fail, components show a gradient fallback.

## 📊 API Limits

- **Pexels**: 200 requests/hour (free tier)
- **Pixabay**: Very generous limits
- **Unsplash**: 50 requests/hour (free tier)

The service includes caching to minimize API calls.

## 🐛 Troubleshooting

**Images not loading?**
- Check API keys in `.env.local`
- Verify keys are prefixed with `VITE_`
- Check browser console for errors
- Ensure API keys are valid and not expired

**Slow loading?**
- Images are cached for 24 hours
- Use `priority` prop for above-the-fold images
- Consider preloading critical images

**No results?**
- Try different search queries
- Check API rate limits
- Verify API keys have proper permissions

## 📝 Examples

See `src/components/examples/ImageApiExamples.tsx` for complete usage examples.
