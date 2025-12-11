# Professional API Enhancements

This document outlines the professional-grade API integrations and visual asset systems implemented in the Bear Cave Marketing portfolio.

## Stock Photo APIs

### Pexels Integration
- **Location**: `src/lib/pexels.ts`
- **Features**:
  - High-quality stock photos
  - 24-hour caching
  - Automatic fallback handling
  - Landscape-oriented images optimized for hero sections
  
### Pixabay Integration
- **Location**: `src/lib/pixabay.ts`
- **Features**:
  - Fallback for Pexels failures
  - Safe search enabled
  - Horizontal orientation preference
  - Photographer attribution

### Usage
```typescript
import { searchPexelsImages } from '@/lib/pexels';
import { getStockImage } from '@/lib/pixabay';

// Search Pexels
const image = await searchPexelsImages('marketing strategy');

// Unified search (Pexels first, Pixabay fallback)
const image = await getStockImage('analytics dashboard');
```

## SVG Illustration System

### unDraw Integration
- **Location**: `public/illustrations/`
- **Component**: `src/components/Illustration.tsx`
- **Features**:
  - MIT-licensed SVG illustrations
  - Dynamic color theming
  - Lazy loading
  - Brand color application

### Usage
```tsx
import { Illustration } from '@/components/Illustration';

<Illustration 
  name="analytics" 
  className="w-64" 
  themeColor="#40E0D0"
  alt="Analytics dashboard illustration" 
/>
```

## Icon System

### Lucide React Icons
- **Component**: `src/components/LucideIcon.tsx`
- **Features**:
  - Standardized sizing (xs, sm, md, lg, xl)
  - Consistent stroke width
  - Accessibility built-in
  - Color customization

### Usage
```tsx
import { LucideIconWrapper } from '@/components/LucideIcon';
import { ArrowRight } from 'lucide-react';

<LucideIconWrapper 
  icon={ArrowRight} 
  size="md" 
  title="Navigate forward" 
/>
```

## Particle Background

### tsParticles Integration
- **Component**: `src/components/PageParticleBackground.tsx`
- **Features**:
  - Subtle, non-distracting animations
  - Performance-optimized
  - Respects `prefers-reduced-motion`
  - Customizable particle count, color, opacity

### Usage
```tsx
import { PageParticleBackground } from '@/components/PageParticleBackground';

<div className="relative">
  <PageParticleBackground 
    particleColor="#40E0D0" 
    opacity={0.05} 
    particleCount={50}
  />
  {/* Your content */}
</div>
```

## Brand UI Components

### src/ui/ Component Library
Custom Bear Cave Marketing components built on shadcn/ui primitives with Framer Motion:

#### AppButton
```tsx
import { AppButton } from '@/ui';
import { ArrowRight } from 'lucide-react';

<AppButton 
  variant="gradient" 
  size="lg" 
  icon={ArrowRight}
  iconPosition="right"
>
  Get Started
</AppButton>
```

#### AppCard
```tsx
import { AppCard } from '@/ui';

<AppCard variant="glass" padding="lg" hover>
  <h3>Card Title</h3>
  <p>Card content</p>
</AppCard>
```

#### AppSection
```tsx
import { AppSection } from '@/ui';

<AppSection variant="hero" padding="xl">
  <h1>Hero Section</h1>
</AppSection>
```

#### AppBadge
```tsx
import { AppBadge } from '@/ui';

<AppBadge variant="primary" size="md">Featured</AppBadge>
```

## Page Background Component

### PageWithApiBackground
- **Component**: `src/components/PageWithApiBackground.tsx`
- **Features**:
  - Automatic Pexels → Pixabay fallback
  - Gradient fallback if APIs fail
  - Customizable overlay
  - Lazy loading with smooth transitions

### Usage
```tsx
import { PageWithApiBackground } from '@/components/PageWithApiBackground';

<PageWithApiBackground 
  query="marketing strategy" 
  overlay 
  overlayOpacity={0.7}
>
  <h1>Services Page</h1>
</PageWithApiBackground>
```

## Environment Variables

All API integrations use environment variables (configured in Cloudflare Pages):

- `PEXELS_API_KEY` - Pexels API authentication
- `PIXABAY_API_KEY` - Pixabay API authentication

**Note**: These are already configured as Cloudflare Variables/Secrets. Do NOT create `.env` files or commit secrets.

## Performance Considerations

- **Caching**: All API responses cached for 24 hours
- **Lazy Loading**: Images and illustrations loaded on-demand
- **Bundle Size**: tsParticles uses `loadSlim()` to minimize bundle impact
- **Accessibility**: All components include proper ARIA labels and roles
- **Motion**: Respects `prefers-reduced-motion` user preference

## Next Steps

1. Add unDraw SVG illustrations to `public/illustrations/`
2. Integrate `PageWithApiBackground` into existing pages
3. Refactor existing components to use `src/ui` primitives
4. Add fallback backgrounds for API failures
5. Test across different viewport sizes and devices
