# BearCave Navigation + Command-K Integration

## Overview

This document outlines the implementation of the new navigation system for BearCave Marketing, including desktop mega-nav, mobile drawer, and Command-K palette for global navigation.

## Architecture

### Component Structure

```
src/
├── components/
│   ├── nav/
│   │   └── MainNav.tsx                 # Primary navigation component
│   ├── command/
│   │   ├── CommandMenu.tsx            # Command palette interface
│   │   └── CommandMenuToggle.tsx      # Global keyboard handler
│   └── ui/
│       ├── navigation-menu.tsx        # shadcn/ui navigation primitives
│       ├── sheet.tsx                  # Mobile drawer component
│       ├── dialog.tsx                 # Modal component
│       ├── tooltip.tsx                # Tooltip component
│       ├── hover-card.tsx             # Rich preview component
│       └── scroll-area.tsx            # Scrollable content area
```

## Navigation System

### MainNav Component

The `MainNav` component provides:

- **Desktop Mega-Nav**: Dropdown navigation with rich content previews
- **Mobile Drawer**: Full-screen mobile navigation with collapsible sections
- **Command-K Integration**: Global keyboard shortcut support
- **Scroll Effects**: Transparent header that becomes solid on scroll
- **Active State Management**: Visual feedback for current page

#### Navigation Structure

```typescript
const NAV_SECTIONS = [
  { label: 'About Me', to: '/about', icon: User },
  {
    label: 'Work',
    icon: Briefcase,
    subItems: [
      { label: 'Case Studies', to: '/case-studies', icon: Briefcase },
      { label: 'Graphic Design', to: '/design', icon: Palette },
      { label: 'Photography', to: '/photography', icon: Camera },
      { label: 'Side Projects', to: '/side-projects', icon: Code }
    ]
  },
  {
    label: 'Tools/Skills',
    icon: Wrench,
    subItems: [
      { label: 'Dev Builds', to: '/applications', icon: Code },
      { label: 'Toolbox', to: '/toolbox', icon: Wrench }
    ]
  },
  {
    label: 'Inspiration',
    icon: Lightbulb,
    subItems: [
      { label: 'Inspiration', to: '/inspiration', icon: Lightbulb },
      { label: 'Brand Builder', to: '/brand-builder', icon: Building2 },
      { label: 'Gallery', to: '/gallery', icon: Palette }
    ]
  },
  { label: 'Contact', to: '/contact', icon: Mail }
];
```

### Desktop Navigation

- **Mega-Nav Dropdowns**: Rich content previews with icons and descriptions
- **Hover States**: Smooth transitions with `motion-safe:` animations
- **Active States**: Turquoise accent for current page
- **Focus Management**: Keyboard navigation with proper focus rings

### Mobile Navigation

- **Sheet Drawer**: Full-screen mobile navigation
- **Collapsible Sections**: Hierarchical content organization
- **Touch-Friendly**: Large touch targets and smooth animations
- **State Persistence**: Maintains section states during interaction

## Command-K Palette

### Global Keyboard Shortcuts

- **⌘K (Mac) / Ctrl+K (Windows/Linux)**: Opens command palette
- **Escape**: Closes any open modal/drawer
- **Arrow Keys**: Navigate through command items
- **Enter**: Select highlighted command

### Command Menu Structure

```typescript
const COMMAND_ITEMS = {
  pages: [
    { title: 'Home', to: '/', icon: Home },
    { title: 'About Me', to: '/about', icon: User },
    { title: 'Contact', to: '/contact', icon: Mail },
    { title: 'Resume', to: '/resume', icon: FileText }
  ],
  work: [
    { title: 'Case Studies', to: '/case-studies', icon: Briefcase },
    { title: 'Design', to: '/design', icon: Palette },
    { title: 'Photography', to: '/photography', icon: Camera }
  ],
  tools: [
    { title: 'Dev Builds', to: '/applications', icon: Code },
    { title: 'Toolbox', to: '/toolbox', icon: Wrench }
  ],
  inspiration: [
    { title: 'Inspiration', to: '/inspiration', icon: Lightbulb },
    { title: 'Brand Builder', to: '/brand-builder', icon: Building2 }
  ]
};
```

### Features

- **Search Functionality**: Real-time filtering across all commands
- **Keyboard Navigation**: Full keyboard accessibility
- **Lazy Loading**: Performance optimized
- **Context Awareness**: Responsive to current page

## UI Components

### Tooltip Component

```typescript
<Tooltip
  content="Additional information"
  variant="turquoise"
  side="top"
>
  <button>Hover me</button>
</Tooltip>
```

**Variants:**
- `default`: Standard cave theme
- `turquoise`: GT accent for highlights
- `creamsicle`: Secondary GT accent

### HoverCard Component

```typescript
<HoverCard
  content={
    <div>
      <h4>Project Preview</h4>
      <p>Detailed project information...</p>
    </div>
  }
  side="right"
  delay={200}
>
  <div>Project Card</div>
</HoverCard>
```

### ScrollArea Component

```typescript
<ScrollArea orientation="vertical" className="h-64">
  <div>Scrollable content</div>
</ScrollArea>
```

**Orientations:**
- `vertical`: Y-axis scrolling
- `horizontal`: X-axis scrolling
- `both`: Freeform scrolling

## Motion & Animation

### Motion-Safe Implementation

All animations respect the `prefers-reduced-motion` media query:

```css
/* Example motion-safe usage */
className="transition motion-safe:hover:scale-105 motion-reduce:transition-none"
```

### Animation Guidelines

- **Duration**: 0.2s for micro-interactions, 0.3s for layout changes
- **Easing**: `ease-out` for natural feel
- **Scale**: Subtle 0.95-1.05 range for hover effects
- **Opacity**: 0.8-1.0 range for fade transitions

## Accessibility Features

### Keyboard Navigation

- **Tab Order**: Logical tab sequence through all interactive elements
- **Focus Trapping**: Proper focus management in modals and drawers
- **Skip Links**: Skip to content functionality
- **ARIA Labels**: Comprehensive aria-label coverage

### Screen Reader Support

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Roles**: Dialog, navigation, menu roles
- **Live Regions**: Dynamic content announcements
- **Alt Text**: Descriptive alt attributes for images

### Color Contrast

- **WCAG AA Compliance**: All text meets 4.5:1 contrast ratio
- **Focus Indicators**: Clear focus outlines (2px turquoise)
- **State Indicators**: Visual feedback for all interactive states

## Brand Integration

### Color Palette

```css
/* Primary Brand (BearCave) */
--bc-bg: theme('colors.cave.bg');          /* #0D0D0F */
--bc-text-primary: theme('colors.cave.text'); /* #E6E6E6 */
--bc-ember: theme('colors.cave.ember');    /* #FF7A3D */

/* Accent Colors (GT) */
--turquoise: #3CC6C4;    /* Primary accent */
--creamsicle: #FF9E58;   /* Secondary accent */
--light-blue-gray: #F3F6F7; /* Background variations */
```

### Typography

- **Font Family**: Montserrat (sans-serif)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Responsive Scale**: Fluid typography with Tailwind's text sizing

## Performance Considerations

### Code Splitting

- **Lazy Loading**: All components use React.lazy()
- **Route-Based Splitting**: Automatic chunking by route
- **Component-Level Splitting**: Heavy components separated

### Bundle Optimization

- **Tree Shaking**: Unused code elimination
- **Dynamic Imports**: On-demand component loading
- **Asset Optimization**: Image and CSS optimization

### Monitoring

- **Bundle Analysis**: `npm run analyze:bundle` for size monitoring
- **Performance Metrics**: Core Web Vitals tracking
- **Accessibility Testing**: Automated a11y validation

## Usage Examples

### Adding New Navigation Items

```typescript
// In MainNav.tsx, update NAV_SECTIONS
const NAV_SECTIONS = [
  // ... existing items
  {
    label: 'New Section',
    icon: NewIcon,
    to: '/new-section',
    description: 'Section description'
  }
];
```

### Custom Command Items

```typescript
// In CommandMenu.tsx, update COMMAND_ITEMS
const COMMAND_ITEMS = {
  // ... existing groups
  custom: [
    {
      id: 'custom-action',
      title: 'Custom Action',
      description: 'Action description',
      icon: CustomIcon,
      to: '/custom-path',
      keywords: ['custom', 'action', 'keywords']
    }
  ]
};
```

## Testing

### Manual Testing Checklist

- [ ] Desktop navigation hover states
- [ ] Mobile drawer open/close
- [ ] Command-K shortcut (⌘K/Ctrl+K)
- [ ] Keyboard navigation (Tab, Arrow keys, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Screen reader announcements
- [ ] Motion reduction preference respected
- [ ] Touch interactions on mobile
- [ ] Scroll behavior in navigation

### Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support with vendor prefixes for scrollbars
- **Mobile**: iOS Safari, Android Chrome

## Deployment Notes

### Environment Variables

No additional environment variables required.

### Build Process

1. **Type Checking**: `npm run typecheck`
2. **Linting**: `npm run lint`
3. **Build**: `npm run build`
4. **Bundle Analysis**: `npm run analyze:bundle` (optional)

### Rollback Plan

- Keep `MainNavbar.tsx` as fallback
- Easy component swap in `App.tsx`
- Feature flags for gradual rollout

## Future Enhancements

### Planned Improvements

- **Search Integration**: Connect to content search API
- **Analytics**: Track navigation patterns
- **Personalization**: User-specific navigation preferences
- **PWA Support**: Offline navigation capability
- **Voice Navigation**: Voice command integration

### Technical Debt

- **Radix Dependencies**: Consider direct Radix UI for advanced interactions
- **Animation Library**: Evaluate Framer Motion vs CSS transitions
- **Testing Coverage**: Add unit and integration tests
- **TypeScript Strictness**: Enhance type safety

## Support

For questions or issues:

1. Check this documentation
2. Review component source code
3. Test in development environment
4. Open an issue with reproduction steps

---

*Last updated: 2025-11-09*
*Version: 1.0.0*