# Modern Animation System & Section Templates

## Overview

This document outlines the modern animation system and reusable section templates added to enhance the BearCave Marketing portfolio site. These additions provide impressive, modern animations while maintaining performance and accessibility.

## 🎨 Animation Libraries

### Installed Libraries

1. **@react-spring/web** - Physics-based animations with spring dynamics
2. **@react-three/fiber** - React renderer for Three.js (3D graphics)
3. **@react-three/drei** - Useful helpers for react-three-fiber
4. **framer-motion** - Already installed, enhanced with new patterns
5. **GSAP** - Already installed, for complex scroll animations
6. **animejs** - Already installed, for SVG animations

## 📦 Section Templates

All section templates are located in `src/components/sections/` and can be imported from `src/components/sections/index.ts`.

### 1. HeroSection

A flexible hero section with multiple variants and animations.

**Features:**
- Multiple variants: `default`, `minimal`, `gradient`, `split`
- Animated title, subtitle, and description
- CTA button support
- Background image support with overlay
- Responsive design

**Usage:**
```tsx
import { HeroSection } from '@/components/sections';

<HeroSection
  title="Welcome to BearCave"
  subtitle="Marketing Excellence"
  description="Building marketing systems that drive growth"
  ctaText="Get Started"
  ctaLink="/contact"
  variant="gradient"
/>
```

### 2. FeaturesSection

Display features in a grid layout with hover animations.

**Features:**
- Grid layouts: 2, 3, or 4 columns
- Variants: `default`, `grid`, `cards`, `minimal`
- Icon support
- Staggered animations
- Hover effects

**Usage:**
```tsx
import { FeaturesSection } from '@/components/sections';

<FeaturesSection
  title="Our Features"
  subtitle="What We Offer"
  features={[
    {
      icon: <Icon />,
      title: "Feature 1",
      description: "Description here",
      link: "/feature1"
    }
  ]}
  columns={3}
  variant="cards"
/>
```

### 3. StatsSection

Animated statistics counter with multiple variants.

**Features:**
- Animated number counting
- Multiple variants: `default`, `minimal`, `gradient`
- Responsive grid
- Prefix/suffix support

**Usage:**
```tsx
import { StatsSection } from '@/components/sections';

<StatsSection
  title="Our Impact"
  stats={[
    { value: 100, suffix: "+", label: "Happy Clients" },
    { value: 500, suffix: "+", label: "Projects Completed" }
  ]}
  variant="gradient"
/>
```

### 4. TestimonialsSection

Testimonial cards with ratings and author info.

**Features:**
- Star rating support
- Avatar images
- Multiple variants: `default`, `cards`, `minimal`, `carousel`
- Hover animations

**Usage:**
```tsx
import { TestimonialsSection } from '@/components/sections';

<TestimonialsSection
  title="What Clients Say"
  testimonials={[
    {
      quote: "Amazing work!",
      author: "John Doe",
      role: "CEO",
      company: "Company Inc",
      rating: 5,
      avatar: "/avatar.jpg"
    }
  ]}
  variant="cards"
/>
```

### 5. CTASection

Call-to-action section with multiple variants.

**Features:**
- Primary and secondary CTA buttons
- Variants: `default`, `gradient`, `minimal`, `split`
- Animated entrance
- Responsive design

**Usage:**
```tsx
import { CTASection } from '@/components/sections';

<CTASection
  title="Ready to Get Started?"
  description="Let's build something amazing together"
  primaryCTA={{
    text: "Contact Us",
    link: "/contact"
  }}
  secondaryCTA={{
    text: "Learn More",
    link: "/about"
  }}
  variant="gradient"
/>
```

## 🎭 Animation Components

All animation components are located in `src/components/animations/` and can be imported from `src/components/animations/index.ts`.

### 1. MagneticButton

A button that follows mouse movement with magnetic effect.

**Features:**
- Configurable strength
- Multiple variants: `primary`, `secondary`, `ghost`
- Smooth spring animations
- Hover and tap effects

**Usage:**
```tsx
import { MagneticButton } from '@/components/animations';

<MagneticButton
  strength={0.3}
  variant="primary"
  onClick={() => console.log('clicked')}
>
  Click Me
</MagneticButton>
```

### 2. ParallaxSection

Parallax scrolling effect component.

**Features:**
- Configurable speed
- Direction control: `up` or `down`
- Custom offset support
- Opacity fade on scroll

**Usage:**
```tsx
import { ParallaxSection } from '@/components/animations';

<ParallaxSection speed={0.5} direction="up">
  <div>Content with parallax effect</div>
</ParallaxSection>
```

### 3. TiltCard

3D tilt effect card that responds to mouse movement.

**Features:**
- 3D perspective transforms
- Configurable max tilt angle
- Scale on hover
- Smooth spring animations

**Usage:**
```tsx
import { TiltCard } from '@/components/animations';

<TiltCard maxTilt={15} scale={1.05}>
  <div>Card content</div>
</TiltCard>
```

### 4. Floating3DCard

3D floating box using Three.js.

**Features:**
- 3D box geometry
- Auto-rotation
- Floating animation
- Customizable color and speed
- Orbit controls

**Usage:**
```tsx
import { Floating3DCard } from '@/components/animations';

<Floating3DCard color="#3b82f6" speed={1}>
  <div>Overlay content</div>
</Floating3DCard>
```

### 5. ScrollReveal

Reveal content on scroll with directional animations.

**Features:**
- Multiple directions: `up`, `down`, `left`, `right`
- Configurable delay
- Threshold control
- Smooth animations

**Usage:**
```tsx
import { ScrollReveal } from '@/components/animations';

<ScrollReveal direction="up" delay={0.2}>
  <div>Content revealed on scroll</div>
</ScrollReveal>
```

## 🪝 Animation Hooks

Custom hooks for consistent animations are located in `src/hooks/useAnimations.ts`.

### useFadeIn

Fade in animation hook.

```tsx
import { useFadeIn } from '@/hooks/useAnimations';

const { ref, springs, Animated } = useFadeIn({ delay: 0.2 });

<Animated ref={ref} style={springs}>
  Content
</Animated>
```

### useSlideIn

Slide in animation hook with direction control.

```tsx
import { useSlideIn } from '@/hooks/useAnimations';

const { ref, springs, Animated } = useSlideIn({
  direction: 'up',
  distance: 50
});

<Animated ref={ref} style={springs}>
  Content
</Animated>
```

### useScaleIn

Scale in animation hook.

```tsx
import { useScaleIn } from '@/hooks/useAnimations';

const { ref, springs, Animated } = useScaleIn({
  from: 0.8,
  to: 1
});

<Animated ref={ref} style={springs}>
  Content
</Animated>
```

### useCounter

Animated counter hook.

```tsx
import { useCounter } from '@/hooks/useAnimations';
import { animated } from '@react-spring/web';

const { ref, number } = useCounter(100, 2000);

<animated.span ref={ref}>
  {number.to(n => Math.floor(n))}
</animated.span>
```

## 🎯 Animation Variants

Pre-defined Framer Motion variants are located in `src/utils/animationVariants.ts`.

### Available Variants

- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `scaleIn` - Scale in animation
- `staggerContainer` - Container for staggered children
- `slideUp` - Slide up animation
- `slideDown` - Slide down animation
- `rotateIn` - Rotate in animation
- `blurIn` - Blur in animation

**Usage:**
```tsx
import { fadeInUp, staggerContainer } from '@/utils/animationVariants';
import { motion } from 'framer-motion';

<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={fadeInUp}>Item 1</motion.div>
  <motion.div variants={fadeInUp}>Item 2</motion.div>
</motion.div>
```

## 🎨 Styling

All components use CSS variables for theming:

- `--bc-bg` - Background color
- `--bc-text-primary` - Primary text color
- `--bc-text-secondary` - Secondary text color
- `--bc-accent` - Accent color
- `--bc-accent-hover` - Accent hover color
- `--bc-border` - Border color
- `--bc-surface` - Surface color

## 📱 Responsive Design

All components are fully responsive and include:
- Mobile-first approach
- Breakpoint optimizations
- Touch-friendly interactions
- Reduced motion support (via prefers-reduced-motion)

## ⚡ Performance Considerations

1. **Lazy Loading**: 3D components are lazy-loaded
2. **Will-Change**: Applied where appropriate for GPU acceleration
3. **Intersection Observer**: Used for scroll-triggered animations
4. **Spring Physics**: React Spring provides smooth, performant animations
5. **Code Splitting**: Components can be code-split as needed

## 🔧 Best Practices

1. **Use section templates** for consistent page layouts
2. **Combine animations** for layered effects
3. **Test on mobile** devices for touch interactions
4. **Respect prefers-reduced-motion** for accessibility
5. **Optimize images** used in hero sections
6. **Use appropriate variants** for different contexts

## 📚 Examples

### Complete Page Example

```tsx
import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialsSection,
  CTASection
} from '@/components/sections';
import { ScrollReveal } from '@/components/animations';

const HomePage = () => (
  <>
    <HeroSection
      title="Welcome"
      subtitle="BearCave Marketing"
      description="Building marketing systems"
      ctaText="Get Started"
      variant="gradient"
    />

    <ScrollReveal direction="up">
      <FeaturesSection
        title="Features"
        features={features}
        columns={3}
      />
    </ScrollReveal>

    <StatsSection
      title="Our Impact"
      stats={stats}
      variant="gradient"
    />

    <TestimonialsSection
      title="Testimonials"
      testimonials={testimonials}
    />

    <CTASection
      title="Ready to Start?"
      primaryCTA={{ text: "Contact", link: "/contact" }}
      variant="gradient"
    />
  </>
);
```

## 🚀 Next Steps

1. Integrate section templates into existing pages
2. Add more animation variants as needed
3. Create custom section templates for specific use cases
4. Optimize bundle size by code-splitting heavy components
5. Add more 3D components using react-three-fiber

## 📝 Notes

- All components are TypeScript-enabled
- Components follow BearCave design system
- CSS variables ensure consistent theming
- Components are accessible and keyboard-navigable
- Animation timing follows brand guidelines

