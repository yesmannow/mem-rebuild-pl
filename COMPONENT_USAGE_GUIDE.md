# Modern UI Components Usage Guide

This guide demonstrates how to use the new modern UI components added to the portfolio.

## 📊 LivePortfolioMetrics

**Location:** `src/components/ui/LivePortfolioMetrics.tsx`

Displays real-time portfolio statistics in an animated glassmorphism dashboard.

### Usage

```tsx
import { LivePortfolioMetrics } from '@/components/ui/LivePortfolioMetrics';

function MyPage() {
  return (
    <div className="container mx-auto py-12">
      <LivePortfolioMetrics className="mb-8" />
    </div>
  );
}
```

### Features
- 6 animated metric cards
- Glassmorphism design with backdrop blur
- Trend indicators showing growth
- Hover effects with shine animation
- Responsive grid layout (1/2/3 columns)

### Metrics Displayed
- Years of Experience
- Projects Completed
- Clients Served
- Certifications
- GitHub Repositories (live updating)
- Tech Stack Size

---

## ⌨️ TypewriterEffect

**Location:** `src/components/ui/TypewriterEffect.tsx`

Dynamic typewriter animation that cycles through multiple phrases.

### Usage

```tsx
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';

function HeroSection() {
  return (
    <h1>
      I'm a <TypewriterEffect 
        words={['Developer', 'Designer', 'Marketer', 'Strategist']}
        className="text-brand-teal"
      />
    </h1>
  );
}
```

### Props
- `words: string[]` - Array of phrases to cycle through
- `className?: string` - Custom styling
- `cursorClassName?: string` - Cursor styling
- `typingSpeed?: number` - Typing speed in ms (default: 100)
- `deletingSpeed?: number` - Deleting speed in ms (default: 50)
- `pauseDuration?: number` - Pause between words in ms (default: 2000)
- `loop?: boolean` - Enable infinite loop (default: true)

---

## 💎 GlassmorphismCard

**Location:** `src/components/ui/GlassmorphismCard.tsx`

Modern glassmorphism UI card with backdrop blur and optional effects.

### Usage

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';

function ContentCard() {
  return (
    <GlassmorphismCard 
      hoverable={true}
      gradient={true}
      blur="xl"
      className="p-6"
    >
      <h3>Card Title</h3>
      <p>Card content goes here...</p>
    </GlassmorphismCard>
  );
}
```

### Props
- `children: React.ReactNode` - Card content
- `className?: string` - Custom styling
- `hoverable?: boolean` - Enable hover effects (default: true)
- `blur?: 'sm' | 'md' | 'lg' | 'xl'` - Backdrop blur level (default: 'xl')
- `border?: boolean` - Show border (default: true)
- `gradient?: boolean` - Enable gradient overlay (default: false)
- `animate?: boolean` - Animate on scroll (default: true)

---

## 📈 InteractiveSkillsVisualization

**Location:** `src/components/ui/InteractiveSkillsVisualization.tsx`

Filterable skill visualization with animated progress bars.

### Usage

```tsx
import { InteractiveSkillsVisualization, SkillCategory } from '@/components/ui/InteractiveSkillsVisualization';

function SkillsSection() {
  const categories: SkillCategory[] = [
    {
      name: 'Frontend',
      color: '#40E0D0',
      skills: [
        { name: 'React', level: 5, years: 6 },
        { name: 'TypeScript', level: 5, years: 5 },
        { name: 'Tailwind CSS', level: 4, years: 3 },
      ],
    },
    {
      name: 'Backend',
      color: '#FFA500',
      skills: [
        { name: 'Node.js', level: 4, years: 5 },
        { name: 'Python', level: 3, years: 4 },
        { name: 'PostgreSQL', level: 4, years: 5 },
      ],
    },
  ];

  return (
    <InteractiveSkillsVisualization 
      categories={categories}
      className="py-12"
    />
  );
}
```

### Features
- Filterable categories with color coding
- Animated progress bars (0-100%)
- Level indicators (1-5 scale)
- Years of experience display
- Responsive grid layout
- Hover effects with shine animation

---

## 🎨 SkeletonLoader

**Location:** `src/components/ui/SkeletonLoader.tsx`

Skeleton loading components for better perceived performance.

### Usage

```tsx
import { 
  SkeletonLoader, 
  SkeletonCard, 
  SkeletonGrid 
} from '@/components/ui/SkeletonLoader';

// Basic skeleton
<SkeletonLoader variant="text" width="60%" />

// Multiple text lines
<SkeletonLoader variant="text" count={3} />

// Card skeleton
<SkeletonCard />

// Grid of skeletons
<SkeletonGrid count={6} columns={3} />
```

### Variants
- `text` - Text line skeleton (h-4)
- `card` - Card skeleton (h-48)
- `avatar` - Circular avatar (w-12 h-12)
- `image` - Image skeleton (aspect-video)
- `button` - Button skeleton (h-10)

### Props
- `variant?: 'text' | 'card' | 'avatar' | 'image' | 'button'`
- `width?: string | number` - Custom width
- `height?: string | number` - Custom height
- `count?: number` - Number of skeleton elements
- `animate?: boolean` - Enable shimmer animation (default: true)

---

## 🎯 AnimatedCounter

**Location:** `src/components/ui/AnimatedCounter.tsx`

Smooth counting animation with spring physics (already exists, enhanced).

### Usage

```tsx
import AnimatedCounter from '@/components/ui/AnimatedCounter';

function StatsCard() {
  return (
    <div>
      <AnimatedCounter 
        value={1000}
        prefix="$"
        suffix="+"
        decimals={0}
        duration={2}
        className="text-4xl font-bold text-brand-teal"
      />
    </div>
  );
}
```

### Props
- `value: number` - Target number to count to
- `prefix?: string` - Text before number (e.g., "$")
- `suffix?: string` - Text after number (e.g., "+", "%")
- `decimals?: number` - Decimal places (default: 0)
- `duration?: number` - Animation duration in seconds (default: 2)
- `className?: string` - Custom styling

---

## 🎨 Design System Colors

The components use the following brand colors:

```css
--brand-teal: #40E0D0;      /* Primary accent */
--brand-orange: #FFA500;     /* Secondary accent */
--brand-blue-gray: #B3CDE0;  /* Tertiary */
--brand-dark: #0f172a;       /* Background */
--brand-text: #F8FAFC;       /* Text */
--brand-muted: #94a3b8;      /* Muted text */
```

### Tailwind Classes
- `text-brand-teal` - Primary brand color
- `text-brand-orange` - Secondary brand color
- `bg-brand-dark` - Dark background
- `text-brand-text` - Primary text
- `text-brand-muted` - Secondary text

---

## 💡 Best Practices

### Performance
1. Use `SkeletonLoader` for async content
2. Enable `animate={false}` on static glassmorphism cards
3. Lazy load heavy components with React.lazy()

### Accessibility
1. Ensure WCAG AA contrast (4.5:1 minimum)
2. Add `aria-label` to interactive elements
3. Support `prefers-reduced-motion`

### Responsive Design
1. Test on mobile, tablet, and desktop
2. Use responsive classes (`sm:`, `md:`, `lg:`)
3. Ensure touch targets are 48px minimum

### Animation Guidelines
1. Keep animations <500ms for micro-interactions
2. Use spring physics for natural feel
3. Respect `prefers-reduced-motion`
4. Avoid excessive motion on page load

---

## 🚀 Examples in Production

### Homepage
- **TypewriterEffect** in hero subtitle
- **LivePortfolioMetrics** section after Featured Apps
- **GlassmorphismCard** for tech stack preview

### About Page
- **InteractiveSkillsVisualization** for skills section
- **AnimatedCounter** for statistics
- **SkeletonLoader** while loading portfolio data

### Case Studies
- **GlassmorphismCard** for metric displays
- **AnimatedCounter** for impact numbers
- **SkeletonLoader** for lazy-loaded content

---

## 📚 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated:** December 31, 2024  
**Maintained By:** Jacob Darling Portfolio Team
