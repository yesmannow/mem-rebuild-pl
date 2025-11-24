# Icon System Workflow & Standardization

**Status:** ✅ CLI Tools Complete | ⏳ Icons Import Pending
**Date:** January 25, 2025

---

## Overview

Complete workflow for importing, optimizing, and using icons in the design system.

---

## Icon Requirements

### Required Icons (17 total)

**Navigation & UI:**
- `menu` - Hamburger menu icon
- `close` - Close/X icon

**Sections:**
- `about` - About section icon
- `projects` - Projects section icon
- `skills` - Skills section icon
- `tools` - Tools section icon

**Actions:**
- `download` - Download icon
- `email` - Email icon
- `pdf` - PDF document icon

**Social:**
- `linkedin` - LinkedIn icon
- `github` - GitHub icon
- `twitter` - Twitter/X icon
- `x` - X (Twitter) icon

**Status:**
- `success` - Success indicator
- `warning` - Warning indicator
- `error` - Error indicator

**Other:**
- `awards` - Awards/badges icon

---

## Standardization Process

### 1. Icon Specifications

All icons must follow these standards:

- **Format:** SVG only
- **Stroke Width:** 2px (for outline icons)
- **Theming:** Use `currentColor` for fill/stroke
- **ViewBox:** Standard 24x24 (or appropriate)
- **Optimization:** Remove metadata, comments, unnecessary attributes
- **Accessibility:** Include `aria-label` or `aria-hidden`

### 2. Import Workflow

```bash
# Step 1: Download icon from source
# - Phosphor Icons: https://phosphoricons.com/
# - Lucide: https://lucide.dev/
# - Iconoir: https://iconoir.com/

# Step 2: Import with CLI tool
npm run icon:add <name> <path>

# Example:
npm run icon:add email ./downloads/email-icon.svg
npm run icon:add linkedin ./downloads/linkedin.svg
```

### 3. Automatic Processing

The CLI tool automatically:
- ✅ Validates SVG structure
- ✅ Optimizes SVG (removes metadata)
- ✅ Ensures `currentColor` theming
- ✅ Sets stroke-width to 2px if needed
- ✅ Adds viewBox if missing
- ✅ Generates React component
- ✅ Updates icon registry

### 4. Component Generation

```bash
# Generate React components for all icons
npm run icon:generate-components:apply

# This creates:
# - src/components/icons/{name}Icon.tsx
# - Updates src/components/icons/IconRegistry.tsx
```

---

## Usage Patterns

### Basic Usage

```tsx
import { EmailIcon } from '@/components/icons/emailIcon';

<EmailIcon size={24} color="var(--color-primary)" />
```

### With Registry

```tsx
import { IconRegistry } from '@/components/icons/IconRegistry';

const Icon = IconRegistry['email'];
<Icon size={24} />
```

### Themed Icons

```tsx
// Icons automatically use currentColor
<EmailIcon
  size={24}
  className="text-primary hover:text-secondary"
/>
```

### Accessible Icons

```tsx
<EmailIcon
  size={24}
  aria-label="Send email"
  color="var(--color-primary)"
/>
```

---

## Component Structure

### Generated Component Template

```tsx
/**
 * {Name}Icon
 * Generated icon component
 * Matches design system: 2px stroke, currentColor theming
 */

import React from 'react';

export interface {Name}IconProps {
  className?: string;
  size?: number | string;
  color?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export const {Name}Icon: React.FC<{Name}IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = !ariaLabel,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaLabel ? 'img' : 'presentation'}
    >
      {/* SVG content */}
    </svg>
  );
};
```

---

## Icon Registry

### Registry Structure

```tsx
export const IconRegistry: Record<string, React.ComponentType<any>> = {
  'email': EmailIcon,
  'linkedin': LinkedinIcon,
  'github': GithubIcon,
  // ... etc
};
```

### Registry Functions

```tsx
// Get icon by name
const Icon = getIcon('email');

// List all icons
const allIcons = listIcons();
```

---

## Best Practices

### 1. Icon Selection
- Choose icons from recommended sources (Phosphor, Lucide, Iconoir)
- Prefer outline style (2px stroke)
- Ensure icons match visual style

### 2. Optimization
- Always run through SVGOMG before importing
- Remove unnecessary attributes
- Minimize path complexity

### 3. Theming
- Always use `currentColor` for theming
- Test with different color tokens
- Ensure contrast meets WCAG AA

### 4. Accessibility
- Provide `aria-label` for decorative icons
- Use `aria-hidden="true"` for purely decorative icons
- Ensure icons are keyboard accessible when interactive

### 5. Performance
- Icons are small and optimized
- Use React.memo for frequently re-rendered icons
- Consider icon sprites for many icons

---

## Workflow Checklist

- [ ] Download icon from source
- [ ] Optimize with SVGOMG
- [ ] Import with CLI: `npm run icon:add <name> <path>`
- [ ] Verify icon appears in `/public/icons/`
- [ ] Generate component: `npm run icon:generate-components:apply`
- [ ] Verify component in `/src/components/icons/`
- [ ] Test icon in component
- [ ] Verify theming works
- [ ] Check accessibility
- [ ] Update documentation if needed

---

## Troubleshooting

### Issue: Icon not appearing
**Solution:** Check file path, verify SVG structure

### Issue: Colors not theming
**Solution:** Ensure `currentColor` is set in SVG

### Issue: Component not generating
**Solution:** Check SVG structure, verify CLI tool output

### Issue: Registry not updating
**Solution:** Manually run `npm run icon:generate-components:apply`

---

## Next Steps

1. Download missing icons from recommended sources
2. Import all 17 required icons
3. Generate React components
4. Test icons in actual components
5. Document icon usage in component library

---

*This workflow ensures consistent, accessible, and maintainable icon system.*

