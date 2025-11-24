# Modern UI Components Documentation

This document describes the new interactive UI components added to enhance the user experience of the portfolio site.

## 🎨 Components Overview

### ParticleHero
An interactive hero section with canvas-based particle effects and mouse interaction.

**Location:** `src/components/hero/ParticleHero.tsx`

**Features:**
- Dynamic particle generation based on viewport size
- Mouse repulsion effect (particles move away from cursor)
- Connection lines between nearby particles
- Smooth scroll parallax effect
- Brand-colored particles with gradient overlays
- Animated CTA buttons

**Usage:**
```tsx
import ParticleHero from '../components/hero/ParticleHero';

<ParticleHero />
```

**Performance:**
- Adaptive particle count based on screen size
- RequestAnimationFrame for smooth 60fps animations
- Efficient canvas rendering

---

### GlassCard
Modern glassmorphism card component with backdrop blur and hover effects.

**Location:** `src/components/ui/GlassCard.tsx`

**Props:**
- `children`: ReactNode - Card content
- `className`: string (optional) - Additional CSS classes
- `hover`: boolean (default: true) - Enable hover animations
- `blur`: 'sm' | 'md' | 'lg' (default: 'md') - Blur intensity
- `gradient`: string (optional) - Custom gradient colors

**Features:**
- Backdrop blur effect
- Subtle gradient overlays
- Border glow on hover
- Smooth scale and lift animations
- Customizable appearance

**Usage:**
```tsx
import GlassCard from '../components/ui/GlassCard';

<GlassCard blur="lg" gradient="from-blue-500/10 to-purple-500/5">
  <h3>Card Title</h3>
  <p>Card content</p>
</GlassCard>
```

---

### SkillBadge
Animated badge component for displaying skills with level indicators.

**Location:** `src/components/ui/SkillBadge.tsx`

**Props:**
- `skill`: string - Skill name
- `icon`: string (optional) - Emoji icon
- `level`: 'beginner' | 'intermediate' | 'advanced' | 'expert' (default: 'advanced')
- `category`: string (optional) - Skill category (shown in tooltip)
- `delay`: number (optional) - Animation delay

**Features:**
- Level indicators (1-4 dots)
- Color-coded by skill level
- Hover tooltips showing category
- Smooth entrance animations
- Scale effect on hover

**Usage:**
```tsx
import SkillBadge from '../components/ui/SkillBadge';

<SkillBadge 
  skill="React" 
  icon="⚛️" 
  level="expert" 
  category="Frontend" 
/>
```

---

### GradientMesh
Animated gradient background using canvas with moving color points.

**Location:** `src/components/ui/GradientMesh.tsx`

**Props:**
- `colors`: string[] (optional) - Array of hex colors (default: brand colors)
- `speed`: number (optional) - Animation speed multiplier (default: 0.0005)
- `className`: string (optional) - Additional CSS classes

**Features:**
- Multiple radial gradients that move smoothly
- Bounce effect at viewport edges
- Customizable color palette
- Full viewport coverage
- Low performance impact

**Usage:**
```tsx
import GradientMesh from '../components/ui/GradientMesh';

<GradientMesh 
  colors={['#88ABF2', '#6B8FD6', '#5A7EC0']} 
  speed={0.0003} 
/>
```

---

### FloatingActionButton
Magnetic floating action button with smooth animations.

**Location:** `src/components/ui/FloatingActionButton.tsx`

**Props:**
- `icon`: ReactNode - Button icon (lucide-react or custom)
- `label`: string (optional) - Tooltip label
- `onClick`: () => void (optional) - Click handler
- `href`: string (optional) - Navigation link
- `position`: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' (default: 'bottom-right')
- `magnetic`: boolean (default: true) - Enable magnetic effect
- `className`: string (optional) - Additional CSS classes

**Features:**
- Magnetic mouse tracking effect
- Spring-based animations
- Hover tooltip
- Scale on hover/tap
- Gradient background with shadow
- Ripple effect

**Usage:**
```tsx
import FloatingActionButton from '../components/ui/FloatingActionButton';
import { Mail } from 'lucide-react';

<FloatingActionButton
  icon={<Mail />}
  label="Contact Me"
  href="/contact"
  position="bottom-right"
/>
```

---

### ParallaxSection
Wrapper component for parallax scroll effects.

**Location:** `src/components/ui/ParallaxSection.tsx`

**Props:**
- `children`: ReactNode - Content to parallax
- `speed`: number (default: 0.5) - Parallax speed multiplier
- `className`: string (optional) - Additional CSS classes
- `offset`: number (default: 0) - Vertical offset

**Features:**
- Smooth scroll-based movement
- Fade in/out based on viewport position
- Customizable speed
- Uses Framer Motion's useScroll

**Usage:**
```tsx
import ParallaxSection from '../components/ui/ParallaxSection';

<ParallaxSection speed={0.3}>
  <div>This content will parallax slowly</div>
</ParallaxSection>
```

---

### EnhancedSkills
Enhanced skills section using GlassCard and SkillBadge components.

**Location:** `src/components/home/EnhancedSkills.tsx`

**Features:**
- Organized skill categories
- Glass card containers
- Animated skill badges
- Level indicators
- Staggered animations
- Responsive grid layout

**Usage:**
```tsx
import EnhancedSkills from '../components/home/EnhancedSkills';

<EnhancedSkills />
```

---

## 🎯 Design System

### Brand Colors
- Primary Blue: `#88ABF2`
- Secondary Blue: `#6B8FD6`
- Tertiary Blue: `#5A7EC0`
- Dark Background: `#0b0b0c`
- Neutral: `#595959`

### Animation Principles
- **Duration**: 0.2-0.6s for most transitions
- **Easing**: Use `ease-out` for entrances, `ease-in-out` for continuous animations
- **Delay**: Stagger by 0.05-0.1s per item
- **Accessibility**: Respect `prefers-reduced-motion`

### Glassmorphism Style
- Backdrop blur: 8-20px depending on context
- Background: Semi-transparent gradients (5-10% opacity)
- Borders: 1px solid white/10-20% opacity
- Shadows: Soft, colored shadows matching brand colors

---

## 🚀 Performance Considerations

1. **Canvas Animations**: Use `requestAnimationFrame` for 60fps
2. **Particle Count**: Dynamically adjust based on viewport size
3. **Blur Effects**: Use `backdrop-filter` with `-webkit-` prefix
4. **Transforms**: Prefer `transform` over `top/left` for animations
5. **Will-change**: Use sparingly for frequently animated elements

---

## ♿ Accessibility

All components support:
- Keyboard navigation where applicable
- `aria-hidden` for decorative elements
- Proper semantic HTML
- Color contrast > 4.5:1
- Reduced motion preferences respected

---

## 🎨 Missing Company Logos

Added SVG logos for:
- Tuohy Bailey & Moore LLP (`public/images/logos/tuohy-bailey-moore.svg`)
- Riley Bennett Egloff LLP (`public/images/logos/riley-bennett-egloff.svg`)
- Russell Painting Company (`public/images/logos/russell-painting.svg`)

These logos use the brand color palette and maintain consistency with the site design.

---

## 📱 Responsive Design

All components are fully responsive:
- Mobile-first approach
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Touch-friendly targets (min 44x44px)
- Optimized particle count for mobile devices

---

## 🔧 Implementation Notes

### Homepage Changes
1. Replaced `BrandHero` with `ParticleHero`
2. Added `GradientMesh` to `App.tsx` for site-wide background
3. Replaced `MySkills` with `EnhancedSkills`
4. Added `FloatingActionButton` for quick contact access

### Future Enhancements
- WebGL-based particle effects for high-end devices
- Three.js integration for 3D elements
- Advanced gesture controls
- More particle presets (snow, stars, etc.)
- Custom cursor animations
