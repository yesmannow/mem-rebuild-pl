# Design System Documentation

## Overview

This design system implements a bold, cohesive visual language for the mem-rebuild-pl frontend, following modern best practices and accessibility standards.

## Key Features

- **Custom Typography**: Playfair Display for headings, Karla for body text
- **Design Tokens**: CSS variables and TypeScript types for consistent styling
- **Theme System**: Light/dark mode with brand variants and custom accent colors
- **Accessibility**: WCAG AA color contrast, prefers-reduced-motion support, focus states
- **Layered Backgrounds**: CSS gradients with SVG texture overlays
- **Micro-interactions**: Hover elevation, focus rings, smooth transitions

---

## Typography

### Fonts

The system uses two primary fonts loaded from Google Fonts CDN with `font-display: swap` for optimal performance:

- **Headings**: Playfair Display (serif) - Expressive and elegant
- **Body**: Karla (sans-serif) - Clean and humanist

### Usage in CSS

```css
/* Headings */
h1, h2, h3 {
  font-family: var(--font-heading);
}

/* Body text */
p, span, div {
  font-family: var(--font-body);
}

/* Monospace */
code, pre {
  font-family: var(--font-mono);
}
```

### Type Scale

The system provides a responsive type scale using CSS variables:

```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
--font-size-6xl: 3.75rem;   /* 60px */
--font-size-7xl: 4.5rem;    /* 72px */
--font-size-8xl: 6rem;      /* 96px */
```

---

## Design Tokens

### Accessing Tokens

**In CSS:**
```css
.my-element {
  color: var(--color-text);
  background: var(--color-bg);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
}
```

**In TypeScript:**
```typescript
import { colors, spacing, motion } from '@/design-system/tokens';

const MyComponent = () => {
  return (
    <div style={{
      color: colors.brandPrimary,
      padding: spacing.xl,
    }}>
      Content
    </div>
  );
};
```

### Color Tokens

```css
/* Brand Colors */
--color-primary: #3b82f6;  /* Electric Blue */
--color-accent: #ec4899;   /* Magenta Glow */
--color-bg: #0a0a0a;       /* Deep Black */
--color-text: #ffffff;     /* Pure White */

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;

/* Neutral Palette */
--color-neutral-50 through --color-neutral-950
```

### Spacing

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 0.75rem;   /* 12px */
--space-lg: 1rem;      /* 16px */
--space-xl: 1.5rem;    /* 24px */
--space-2xl: 2rem;     /* 32px */
--space-3xl: 3rem;     /* 48px */
--space-4xl: 4rem;     /* 64px */
--space-5xl: 6rem;     /* 96px */
--space-6xl: 8rem;     /* 128px */
```

### Motion

```css
/* Durations */
--duration-fast: 0.15s;
--duration-normal: 0.3s;
--duration-slow: 0.5s;
--duration-slower: 0.8s;

/* Easing Functions */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-dramatic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-smooth: cubic-bezier(0.45, 0, 0.15, 1);

/* Stagger Delays */
--stagger-short: 0.1s;
--stagger-medium: 0.2s;
--stagger-long: 0.3s;
```

---

## Theme System

### ThemeProvider

The `ThemeProvider` component manages theme state and applies CSS classes to the document.

**Usage:**
```typescript
import { ThemeProvider, useTheme } from '@/components/theme/ThemeProvider';

// Wrap your app
function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

// Use theme in components
function MyComponent() {
  const { theme, brand, brandAccent, setTheme, setBrand, setBrandAccent, prefersReducedMotion } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setBrand('dev')}>Dev Brand</button>
      <button onClick={() => setBrandAccent('#ff0000')}>Custom Accent</button>
    </div>
  );
}
```

### Theme Options

**Theme modes:**
- `'light'` - Light color scheme
- `'dark'` - Dark color scheme
- `'system'` - Follow system preference

**Brand variants:**
- `'default'` - Standard brand
- `'cmo'` - CMO-focused (serif, navy accent)
- `'dev'` - Developer-focused (mono, cyan accent)

**Custom Brand Accent:**
```typescript
setBrandAccent('#ff6b6b'); // Sets a custom accent color
setBrandAccent(); // Clears custom accent
```

### Reduced Motion

The system automatically detects `prefers-reduced-motion` and:
- Disables/minimizes animations
- Removes parallax effects
- Simplifies transitions

Access in components:
```typescript
const { prefersReducedMotion } = useTheme();

if (!prefersReducedMotion) {
  // Add fancy animations
}
```

---

## Components

### HeroRedesign

Modern hero section with orchestrated reveal animations.

**Usage:**
```typescript
import HeroRedesign from '@/components/hero/HeroRedesign';

<HeroRedesign
  title="Turn Marketing Chaos Into Scalable Systems"
  subtitle="I blend strategy, automation, and analytics into marketing engines."
  primaryCTA="View Work"
  primaryCTAHref="/case-studies"
  secondaryCTA="Get in Touch"
  secondaryCTAHref="/contact"
  gradientColors={['#0a0a0a', '#1a1a2e', '#16213e']}
  useFramerMotion={false}
/>
```

**Features:**
- CSS-only staggered animations (title → subtitle → CTAs)
- Optional Framer Motion fallback
- Layered background with texture
- Parallax scroll effect
- Respects reduced motion

### LayeredBackground

Reusable background component with gradients and texture.

**Usage:**
```typescript
import LayeredBackground from '@/components/ui/LayeredBackground';

<LayeredBackground
  gradient={['#3b82f6', '#ec4899']}
  textureOpacity={0.3}
  parallax={true}
  parallaxSpeed={0.5}
>
  {/* Optional content */}
</LayeredBackground>
```

### Button

Accessible button with micro-interactions.

**Usage:**
```typescript
import Button from '@/components/ui/Button';

<Button variant="primary" size="lg" icon={<Mail />}>
  Get in Touch
</Button>

<Button variant="outline" href="/contact">
  Learn More
</Button>

<Button variant="secondary" loading={true}>
  Submitting...
</Button>
```

**Variants:**
- `primary` - Gradient background with glow
- `secondary` - Solid background
- `outline` - Transparent with border
- `ghost` - Minimal styling

**Sizes:** `sm`, `md`, `lg`

### ServicesGrid

Responsive grid of service cards.

**Usage:**
```typescript
import ServicesGrid from '@/components/sections/ServicesGrid';

<ServicesGrid
  title="What I Do"
  subtitle="Services that drive results"
  columns={3}
  services={[
    {
      icon: '🚀',
      title: 'Marketing Strategy',
      description: 'Full-funnel campaigns that convert',
      features: ['CRM Architecture', 'Automation', 'Analytics'],
      href: '/services/strategy',
    },
    // More services...
  ]}
/>
```

### ContactCTA

Call-to-action section for contact.

**Usage:**
```typescript
import ContactCTA from '@/components/sections/ContactCTA';

<ContactCTA
  title="Ready to work together?"
  subtitle="Let's build something amazing"
  primaryText="Get in Touch"
  primaryHref="/contact"
  secondaryText="View Work"
  secondaryHref="/case-studies"
  gradientColors={['#3b82f6', '#ec4899']}
/>
```

---

## Accessibility

### WCAG AA Compliance

All components meet WCAG AA standards for:
- **Color Contrast**: Text/background ratios ≥ 4.5:1
- **Focus States**: Visible 3px outlines with 4px offset
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: Proper ARIA labels and semantic HTML

### Focus States

All interactive elements have visible focus indicators:

```css
.btn:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 4px;
}

a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  text-decoration: underline;
}
```

### Reduced Motion

Animations respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Migration Guide

### Updating Existing Components

1. **Import design tokens:**
   ```typescript
   import { colors, spacing, typography } from '@/design-system/tokens';
   ```

2. **Replace hard-coded values:**
   ```typescript
   // Before
   <div style={{ padding: '24px', color: '#3b82f6' }}>
   
   // After
   <div style={{ padding: spacing.xl, color: colors.brandPrimary }}>
   ```

3. **Use CSS variables:**
   ```css
   /* Before */
   .my-component {
     color: #ffffff;
     padding: 24px;
   }
   
   /* After */
   .my-component {
     color: var(--color-text);
     padding: var(--space-xl);
   }
   ```

4. **Add typography classes:**
   ```tsx
   // Before
   <h1 style={{ fontFamily: 'Georgia', fontSize: '48px' }}>
   
   // After
   <h1 className="heading-1">
   ```

5. **Use new components:**
   ```typescript
   // Replace custom buttons
   import Button from '@/components/ui/Button';
   
   // Replace hero sections
   import HeroRedesign from '@/components/hero/HeroRedesign';
   ```

### Testing Checklist

- [ ] Check color contrast with browser DevTools
- [ ] Test keyboard navigation (Tab, Enter, Space)
- [ ] Verify focus indicators are visible
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Enable `prefers-reduced-motion` and verify animations disable
- [ ] Test in light and dark modes
- [ ] Check responsive breakpoints (mobile, tablet, desktop)
- [ ] Validate with axe DevTools or WAVE

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 14+
- Chrome Android: Latest version

---

## Performance

- **Fonts**: Loaded from Google Fonts CDN with `font-display: swap`
- **CSS Variables**: Minimal overhead, excellent browser support
- **Animations**: GPU-accelerated with `transform` and `opacity`
- **Parallax**: Uses `requestAnimationFrame` for smooth 60fps
- **Lazy Loading**: Components are code-split where appropriate

---

## Resources

- [Playfair Display Font](https://fonts.google.com/specimen/Playfair+Display)
- [Karla Font](https://fonts.google.com/specimen/Karla)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Framer Motion Docs](https://www.framer.com/motion/)
