# Resume Page API Enhancements

## Overview

The resume page (`/resume` route, `src/pages/About.tsx`) has been enhanced with dynamic photography and visual elements from public APIs to create a more engaging, professional presentation while maintaining the site's turquoise/orange dark theme.

## APIs Integrated

### 1. Unsplash API
- **Service**: `src/services/unsplashApi.ts`
- **Usage**: High-quality professional background images
- **Authentication**: Optional (works without API key using source.unsplash.com)
- **Rate Limits**: 50 requests/hour (free tier)
- **Themes Used**:
  - Hero section: `technology,workspace,minimal`
  - Leadership skills: `team,collaboration,leadership`
  - Strategy skills: `analytics,data,charts`
  - Automation skills: `technology,code,automation`
  - Analytics skills: `data,visualization,metrics`
  - Development skills: `coding,programming,developer`
  - Tools skills: `workspace,tools,software`
  - Volunteer section: `community,people,volunteer`

### 2. Lorem Picsum
- **Service**: `src/services/loremPicsumApi.ts`
- **Usage**: Placeholder images and blur placeholders for lazy loading
- **Authentication**: None required
- **Rate Limits**: None
- **Features**: Blur effects, grayscale, consistent seeding

## Components Created

### 1. EnhancedImage (`src/components/ui/EnhancedImage.tsx`)
A sophisticated image component with:
- **Lazy Loading**: Images load only when visible in viewport
- **Blur-up Placeholder**: Smooth loading experience with blur effect
- **Brand Color Overlay**: Applies turquoise/orange/dark overlays
- **Accessibility**: Proper alt text, ARIA labels
- **Error Handling**: Graceful fallback for failed images
- **Performance**: Intersection Observer API for optimal loading

**Props**:
```typescript
interface EnhancedImageProps {
  src: string;                    // Main image URL
  alt: string;                     // Accessibility text
  placeholderSrc?: string;         // Blur placeholder URL
  className?: string;              // Additional CSS classes
  overlayColor?: 'turquoise' | 'orange' | 'dark' | 'none';
  overlayOpacity?: number;         // 0-1
  lazy?: boolean;                  // Enable lazy loading
  aspectRatio?: string;            // CSS aspect ratio
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  priority?: boolean;              // Load immediately
}
```

### 2. ApiBackgroundImage (`src/components/ui/ApiBackgroundImage.tsx`)
Purpose-built for section backgrounds:
- **Themed Images**: Automatically fetches images based on theme keywords
- **Brand Integration**: Applies dark overlays to maintain readability
- **Lazy Loading**: Defers loading until section is visible
- **Responsive**: Adapts to container size

**Props**:
```typescript
interface ApiBackgroundImageProps {
  theme: string;                   // Theme keywords (e.g., "technology,workspace")
  className?: string;
  overlayColor?: 'turquoise' | 'orange' | 'dark' | 'none';
  overlayOpacity?: number;
  source?: 'unsplash' | 'picsum';
  lazy?: boolean;
  priority?: boolean;
}
```

### 3. SectionWithApiBackground
Wrapper component for sections needing background imagery:
```typescript
<SectionWithApiBackground
  theme="analytics,data"
  overlayColor="dark"
  overlayOpacity={0.85}
>
  {/* Your section content */}
</SectionWithApiBackground>
```

## Custom Hooks

### useApiImage (`src/hooks/useApiImage.ts`)
Hook for managing API image loading state:

```typescript
const { imageUrl, isLoading, error, placeholderUrl } = useApiImage({
  source: 'unsplash',
  theme: 'technology',
  width: 1920,
  height: 1080,
  lazy: true
});
```

### useApiImages
For fetching multiple themed images:
```typescript
const { images, isLoading } = useApiImages(
  ['technology', 'workspace', 'code'],
  'unsplash',
  1920,
  1080
);
```

## Implementation Details

### Resume Page Enhancements

1. **Hero Section**
   - Subtle tech/workspace background image
   - Dark overlay (85% opacity) for text readability
   - Priority loading for above-the-fold content

2. **Skills Section**
   - Each skill category card has a themed background
   - Lazy loaded for performance
   - Hover effects enhance the background visibility
   - Dark overlay (92% opacity) maintains focus on content

3. **Volunteer Section**
   - Community-themed background
   - High opacity (90%) to keep focus on volunteer cards
   - Enhances the emotional connection of giving back

### Performance Optimizations

1. **Lazy Loading**
   - Images load only when visible (Intersection Observer)
   - Blur placeholders provide smooth loading experience
   - Reduces initial page load time

2. **Image Optimization**
   - Uses appropriate dimensions (1920x1080 for backgrounds)
   - Leverages CDN (Unsplash/Picsum)
   - WebP support where available

3. **Caching**
   - Browser caching enabled for API responses
   - Consistent seeding for Lorem Picsum ensures same images

### Accessibility

1. **Alt Text**: All images have descriptive alt text
2. **ARIA Labels**: Appropriate ARIA labels for screen readers
3. **Color Contrast**: Overlays ensure WCAG AA compliance
4. **Motion Sensitivity**: Respects `prefers-reduced-motion`

## Configuration

### Environment Variables

Create a `.env` file (optional):
```env
VITE_UNSPLASH_ACCESS_KEY=your_key_here
```

**Note**: The app works without an API key using `source.unsplash.com`

### Customizing Themes

Edit the theme mappings in `About.tsx`:
```typescript
const categoryThemes: Record<string, string> = {
  'leadership': 'team,collaboration,leadership',
  'strategy': 'analytics,data,charts',
  // Add your custom themes here
};
```

## Future Enhancements

Potential additions to explore:

1. **GitHub API Integration**
   - Display contribution graph
   - Show pinned repositories
   - Real-time commit activity

2. **Dev.to API**
   - Featured blog posts
   - Technical writing showcase

3. **Analytics APIs**
   - Display portfolio metrics
   - Visitor statistics visualization

4. **Social Proof APIs**
   - LinkedIn recommendations
   - Twitter/X testimonials

## Troubleshooting

### Images Not Loading
1. Check console for API errors
2. Verify internet connection
3. Try different themes
4. Use Lorem Picsum as fallback

### Performance Issues
1. Reduce number of API images
2. Increase overlay opacity
3. Use smaller dimensions
4. Enable more aggressive lazy loading

### Styling Issues
1. Verify Tailwind classes are compiled
2. Check z-index layering
3. Ensure overlays have proper opacity
4. Validate brand color variables

## Credits

- **Unsplash**: High-quality photography (https://unsplash.com)
- **Lorem Picsum**: Placeholder service (https://picsum.photos)
- **Framer Motion**: Animation library
- **React**: UI framework
