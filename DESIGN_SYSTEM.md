# Design System Documentation

## Wow Factor Portfolio - Unified Design System

This document outlines the design system used throughout the portfolio site to ensure consistency, maintainability, and professional appearance.

## Color Palette

### Primary Colors
- **Turquoise** (#40E0D0): Primary accent color for links, highlights, and interactive elements
- **Dark Turquoise** (#0F766E): Darker variant for hover states and contrast

### Secondary Colors
- **Creamsicle** (#FFA500): Secondary accent for warm touches and CTAs
- **Creamsicle Light** (#FFB380): Lighter variant for backgrounds
- **Creamsicle Dark** (#E68A48): Darker variant for hover states

### Foundation Colors
- **Dark Background** (#0f172a): Main page background
- **Surface** (#1e293b): Card and component backgrounds
- **Text** (#F8FAFC): Primary text color
- **Muted Text** (#94A3B8): Secondary text color

### Neutral Colors
- **Light Blue-Gray** (#B3CDE0): Subtle backgrounds and borders

## Typography

### Font Family
- **Primary**: Montserrat (all weights: 300, 400, 500, 600, 700, 800)
- **Monospace**: Fira Code (for code blocks)

### Font Sizes
- Display: 3-6rem (48-96px)
- Heading 1: 2.5-4rem (40-64px)
- Heading 2: 2-3rem (32-48px)
- Heading 3: 1.5-2rem (24-32px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)
- Extra Small: 0.75rem (12px)

## Component Library

### Cards

#### Primary Card
```html
<div class="card-primary">
  <!-- Content -->
</div>
```
Glass-morphic card with hover effects, suitable for main content.

#### Secondary Card
```html
<div class="card-secondary">
  <!-- Content -->
</div>
```
Subtle card for secondary content or nested elements.

#### Glass Card
```html
<div class="card-glass">
  <!-- Content -->
</div>
```
Transparent card with backdrop blur for overlays.

### Buttons

#### Primary Button
```html
<button class="btn-primary">
  Get Started
</button>
```
Solid turquoise button for primary actions.

#### Secondary Button
```html
<button class="btn-secondary">
  Learn More
</button>
```
Outlined button for secondary actions.

#### Accent Button
```html
<button class="btn-accent">
  Download
</button>
```
Warm creamsicle button for special CTAs.

### Badges

#### Primary Badge
```html
<span class="badge-primary">Featured</span>
```
Turquoise badge for primary labels.

#### Secondary Badge
```html
<span class="badge-secondary">New</span>
```
Orange badge for warm labels.

#### Neutral Badge
```html
<span class="badge-neutral">Tag</span>
```
Gray badge for general tags.

### Tech Tags
```html
<span class="tech-tag">React</span>
<span class="tech-tag">TypeScript</span>
```
Small tags for technology stack displays.

## Layout Components

### Content Wrappers

#### Standard Wrapper
```html
<div class="content-wrapper">
  <!-- Max width 7xl, responsive padding -->
</div>
```

#### Section
```html
<div class="content-section">
  <!-- Vertical padding py-20 -->
</div>
```

#### Narrow Content
```html
<div class="content-narrow">
  <!-- Max width 4xl for focused content -->
</div>
```

### Grid Layouts

#### Cards Grid
```html
<div class="grid-cards">
  <!-- 1-2-3 column responsive grid -->
</div>
```

#### Two Column Grid
```html
<div class="grid-2-col">
  <!-- 1-2 column responsive grid -->
</div>
```

#### Auto-fit Grid
```html
<div class="grid-auto-fit">
  <!-- Automatic column fitting (min 300px) -->
</div>
```

## Section Headers

### Standard Header
```html
<div class="section-header">
  <p class="section-label">Featured Work</p>
  <h2 class="section-title">Case Studies</h2>
  <p class="section-subtitle">
    In-depth looks at complex problems and elegant solutions
  </p>
</div>
```

## Form Elements

### Input Field
```html
<label class="form-label" for="email">
  Email Address
</label>
<input
  type="email"
  id="email"
  class="form-input"
  placeholder="your@email.com"
/>
```

### Textarea
```html
<label class="form-label" for="message">
  Message
</label>
<textarea
  id="message"
  class="form-textarea"
  placeholder="Your message..."
></textarea>
```

## Metrics Display

```html
<div class="metric-card">
  <div class="metric-value">+212%</div>
  <div class="metric-label">Qualified Leads</div>
</div>
```

## Timeline Components

```html
<div class="relative pl-10">
  <span class="timeline-dot"></span>
  <div class="timeline-line"></div>
  <!-- Timeline content -->
</div>
```

## Icon Wrappers

### Primary Icon
```html
<div class="icon-wrapper">
  <Icon name="code" size={20} />
</div>
```

### Accent Icon
```html
<div class="icon-wrapper-accent">
  <Icon name="zap" size={20} />
</div>
```

## Utility Classes

### Hover Effects
- `hover-lift`: Translates element up on hover
- `hover-glow`: Adds glow shadow on hover
- `hover-border`: Changes border color on hover

### Animations
- `fade-in`: Fade in animation
- `slide-up`: Slide up from bottom
- `scale-in`: Scale in from 95% to 100%

### Loading States
- `skeleton`: Animated loading skeleton
- `loading-spinner`: Spinning loader

### Accessibility
- `sr-only`: Screen reader only (visually hidden)
- `touch-target`: Minimum 44px touch target
- `focus-visible-primary`: Focus ring with turquoise

## Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile-First Approach
All utility classes are mobile-first. Use Tailwind's responsive prefixes:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

## Accessibility Guidelines

1. **Color Contrast**: All text meets WCAG AA standards (4.5:1 for body text, 3:1 for large text)
2. **Touch Targets**: Minimum 44x44px for interactive elements
3. **Keyboard Navigation**: All interactive elements are keyboard accessible
4. **Focus States**: Clear focus indicators on all interactive elements
5. **Screen Readers**: Semantic HTML and ARIA labels where needed

## Animation Guidelines

1. **Respect User Preferences**: All animations respect `prefers-reduced-motion`
2. **Performance**: Use `transform` and `opacity` for animations
3. **Duration**: Keep animations between 200-600ms
4. **Easing**: Use `cubic-bezier(0.4, 0, 0.2, 1)` for most animations

## Usage Examples

### Feature Card Example
```html
<div class="card-primary hover-lift">
  <div class="flex items-center gap-3 mb-4">
    <div class="icon-wrapper">
      <CodeIcon class="w-5 h-5" />
    </div>
    <h3 class="text-xl font-semibold text-brand-text">
      Full-Stack Development
    </h3>
  </div>
  <p class="text-brand-muted mb-4">
    Modern web applications built with React, TypeScript, and Node.js
  </p>
  <div class="flex flex-wrap gap-2">
    <span class="tech-tag">React</span>
    <span class="tech-tag">TypeScript</span>
    <span class="tech-tag">Node.js</span>
  </div>
</div>
```

### Metric Display Example
```html
<div class="grid-cards">
  <div class="metric-card">
    <div class="metric-value">212%</div>
    <div class="metric-label">Growth</div>
  </div>
  <div class="metric-card">
    <div class="metric-value">85K+</div>
    <div class="metric-label">Visitors</div>
  </div>
  <div class="metric-card">
    <div class="metric-value">99.9%</div>
    <div class="metric-label">Uptime</div>
  </div>
</div>
```

## Dark Mode Support

The design system automatically supports dark mode through:
- CSS variables that adapt to theme
- `.dark` class applied to `<html>` element
- All colors have dark mode variants

## Best Practices

1. **Use utility classes first**: Leverage the style guide utilities before creating custom CSS
2. **Maintain consistency**: Use established patterns for similar components
3. **Test responsiveness**: Check all breakpoints before deploying
4. **Validate accessibility**: Run axe-core or Lighthouse accessibility audits
5. **Optimize performance**: Minimize custom CSS and leverage Tailwind's purge

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Support

For questions or suggestions about the design system, please open an issue or reach out to the maintainers.
