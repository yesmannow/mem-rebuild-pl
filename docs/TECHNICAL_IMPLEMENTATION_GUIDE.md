# Technical Implementation Guide

## Jacob Darling Cinematic Portfolio System

### 🏗️ Architecture Overview

The portfolio system is built on a modern React/TypeScript stack with advanced animation libraries and performance optimizations.

## Core Technology Stack

### **Frontend Framework**

- **React 18.3.1** - Component-based UI library
- **TypeScript 5.5.3** - Type-safe development
- **Vite 7.1.9** - Fast build tool and dev server

### **Animation Libraries**

- **Framer Motion 11.5.4** - Component-level animations and gestures
- **GSAP 3.13.0** - High-performance scroll animations
- **Anime.js 4.2.2** - SVG path animations and complex sequences
- **Lenis 1.0.42** - Smooth scrolling experience

### **UI Components**

- **Lucide React 0.545.0** - Icon system
- **React Router DOM 6.26.0** - Client-side routing

## 🎨 Component Architecture

### **Branding System**

#### AnimatedLogo Component

```typescript
// Location: src/components/branding/AnimatedLogo.tsx
interface AnimatedLogoProps {
  size?: number;
  variant?: "header" | "splash" | "footer";
  onAnimationComplete?: () => void;
}
```

**Key Features:**

- SVG path animation using stroke-dashoffset
- Three size variants with adaptive styling
- Hover effects with glow and scale transforms
- Performance-optimized with will-change properties

**Animation Sequence:**

1. Hexagon frame draws in (1200ms)
2. "JD" letters animate with staggered delay (800ms)
3. Accent dot appears with bounce effect (400ms)
4. Glow effect activates on completion

#### SplashIntro Component

```typescript
// Location: src/components/branding/SplashIntro.tsx
interface SplashIntroProps {
  onComplete?: () => void;
  duration?: number;
  enableAudio?: boolean;
}
```

**Animation Timeline:**

1. Background gradient transition (2000ms)
2. Logo entrance with scale animation (600ms)
3. Tagline reveal with text gradient (800ms)
4. Subtitle fade-in (600ms)
5. Loading bar progression (duration-based)
6. Particle system activation (continuous)

### **Gallery Systems**

#### Photography Page

```typescript
// Location: src/pages/Photography.tsx
// Features: Masonry layout, category filtering, GSAP scroll animations
```

**Performance Optimizations:**

- Lazy loading with Intersection Observer
- GSAP scroll triggers with scrub animation
- Category-based color theming
- Responsive breakpoint management

#### Design Page

```typescript
// Location: src/pages/Design.tsx
// Features: Bento grid, hover effects, parallax scrolling
```

**Interactive Elements:**

- 3D hover transforms with GSAP
- Category-based gradient overlays
- Lightbox integration
- External portfolio links

#### Lightbox Component

```typescript
// Location: src/components/gallery/Lightbox.tsx
interface LightboxProps {
  isOpen: boolean;
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    category?: string;
    tags?: string[];
  }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}
```

**Features:**

- Keyboard navigation (ESC, Arrow keys)
- Touch/swipe support
- Download and share functionality
- Thumbnail navigation strip
- Body scroll prevention

## 🎭 Motion System

### Motion Sync Utility

```typescript
// Location: src/utils/motion-sync.ts
class MotionSync {
  private activeAnimations: Set<any> = new Set();
  private scrollAnimations: Set<gsap.core.Tween> = new Set();

  registerAnime(animation: any): void
  registerGsap(animation: gsap.core.Tween): void
  pauseAll(): void
  resumeAll(): void
  cleanup(): void
}
```

**Coordination Features:**

- Cross-library animation management
- Performance monitoring and throttling
- Visibility-based animation control
- Memory cleanup for completed animations

### Lenis Smooth Scroll Configuration

```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 35,
});
```

### GSAP ScrollTrigger Integration

```typescript
export function useCinematicScrollSync() {
  gsap.utils.toArray<HTMLElement>("[data-scroll-section]").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out"
        });
      }
    });
  });
}
```

## 📊 Asset Management

### Image Manifest System

```json
// Location: public/images/*/manifest.json
{
  "photographyImages": [
    {
      "src": "/images/photography/image.jpg",
      "alt": "Descriptive alt text",
      "variant": "landscape",
      "tags": ["landscape", "dramatic", "cinematic"],
      "size": "8.3MB",
      "featured": true,
      "useIn": ["Gallery", "Hero"]
    }
  ],
  "metadata": {
    "totalImages": 40,
    "featuredCount": 3,
    "categories": ["landscape", "nature", "portrait"],
    "optimizationNeeded": ["large-file.jpg"],
    "recommendedFormats": ["webp", "avif"]
  }
}
```

### Bio Image Integration

```typescript
// Location: src/pages/About.tsx
const bioImages = [
  {
    src: "/images/bio/bio-photo.jpg",
    alt: "Jacob Darling - Professional portrait",
    variant: "hero"
  },
  // ... additional variants
];

// Rotating gallery with 6-second intervals
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bioImages.length);
  }, 6000);
  return () => clearInterval(interval);
}, []);
```

## ⚡ Performance Optimizations

### Animation Performance

```typescript
// RAF loop with performance monitoring
function raf(time: number) {
  const deltaTime = time - lastTime;
  lastTime = time;

  // Throttle if frame rate drops below 30fps
  if (deltaTime < 33) {
    lenis.raf(time);
    ScrollTrigger.update();
  }

  requestAnimationFrame(raf);
}
```

### Memory Management

```typescript
// Automatic cleanup every 60 frames
if (Math.floor(time / 1000) % 1 === 0) {
  motionSync.cleanup();
}

// Visibility-based animation control
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    motionSync.pauseAll();
  } else {
    motionSync.resumeAll();
  }
});
```

### Hardware Acceleration

```css
/* CSS optimizations */
.animated-logo * {
  will-change: transform, opacity, filter;
}

/* 3D acceleration for transforms */
.photo-card {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

## 🎯 Category System

### Dynamic Color Coding

```typescript
export const categoryColors = {
  "Landscape": "#667eea",
  "Portrait": "#f093fb",
  "Nature": "#4facfe",
  "Creative": "#43e97b",
  "Digital Art": "#fa709a",
  "Branding": "#ffecd2"
};
```

### Filter Implementation

```typescript
const filteredPhotos = activeCategory === "All"
  ? photoGallery
  : photoGallery.filter(photo => photo.category === activeCategory);
```

## 🔧 Development Workflow

### Build Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### File Structure

```text
src/
├── components/
│   ├── branding/
│   │   ├── AnimatedLogo.tsx
│   │   ├── AnimatedLogo.css
│   │   ├── SplashIntro.tsx
│   │   └── SplashIntro.css
│   ├── gallery/
│   │   ├── Lightbox.tsx
│   │   └── Lightbox.css
│   └── animations/
├── pages/
│   ├── Photography.tsx
│   ├── Photography.css
│   ├── Design.tsx
│   ├── Design.css
│   └── About.tsx
├── utils/
│   └── motion-sync.ts
└── data/
    ├── applications.ts
    ├── caseStudies.ts
    └── projects.ts
```

## 🚀 Deployment Considerations

### Environment Configuration

- Vite configuration for asset optimization
- TypeScript strict mode enabled
- ESLint and Prettier for code quality

### Performance Targets

- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- First Input Delay: <100ms

### Browser Support

- Modern browsers with ES2020 support
- Graceful degradation for older browsers
- Progressive enhancement for animations

---

*This technical guide provides the foundation for maintaining and extending the Jacob Darling Cinematic Portfolio system.*
