# Icon Usage Examples

This document provides examples of how to use the newly generated icon components.

## Quick Start

All icons are available as React components in `src/components/icons/`. Each icon follows the design system with 2px stroke, currentColor theming, and full accessibility support.

## Basic Usage

```tsx
import { MenuIcon } from '@/components/icons/menuIcon';
import { CloseIcon } from '@/components/icons/closeIcon';
import { EmailIcon } from '@/components/icons/emailIcon';

function MyComponent() {
  return (
    <div>
      {/* Default icon (24x24, currentColor) */}
      <MenuIcon />
      
      {/* Custom size */}
      <CloseIcon size={32} />
      
      {/* Custom color */}
      <EmailIcon color="#FF5733" />
      
      {/* With accessibility label */}
      <MenuIcon aria-label="Open menu" />
      
      {/* With custom className */}
      <EmailIcon className="hover:text-blue-500" />
    </div>
  );
}
```

## Using the Icon Registry

```tsx
import { getIcon, listIcons } from '@/components/icons/IconRegistry';

function DynamicIcon({ iconName }: { iconName: string }) {
  const IconComponent = getIcon(iconName);
  
  if (!IconComponent) {
    return <span>Icon not found</span>;
  }
  
  return <IconComponent size={24} aria-label={iconName} />;
}

// List all available icons
function IconGallery() {
  const icons = listIcons();
  
  return (
    <div className="grid grid-cols-6 gap-4">
      {icons.map(iconName => {
        const Icon = getIcon(iconName);
        return Icon ? (
          <div key={iconName} className="flex flex-col items-center">
            <Icon size={32} aria-label={iconName} />
            <span className="text-sm mt-2">{iconName}</span>
          </div>
        ) : null;
      })}
    </div>
  );
}
```

## Available Icons (17 total)

### Navigation Icons
- `MenuIcon` - Hamburger menu
- `CloseIcon` - Close/X icon
- `AboutIcon` - User/profile icon
- `ProjectsIcon` - Projects/folder icon
- `SkillsIcon` - Skills/award icon
- `ToolsIcon` - Tools/wrench icon

### Action Icons
- `DownloadIcon` - Download icon
- `EmailIcon` - Email/mail icon
- `PdfIcon` - PDF document icon

### Social Icons
- `LinkedinIcon` - LinkedIn
- `GithubIcon` - GitHub
- `TwitterIcon` - Twitter
- `XIcon` - X (Twitter alternative)

### Status Icons
- `SuccessIcon` - Success/check circle
- `WarningIcon` - Warning/alert triangle
- `ErrorIcon` - Error/X circle
- `AwardsIcon` - Awards/badges

## Props Interface

All icon components support the following props:

```typescript
interface IconProps {
  className?: string;        // CSS class names
  size?: number | string;    // Width/height (default: 24)
  color?: string;            // Fill/stroke color (default: 'currentColor')
  'aria-label'?: string;     // Accessibility label
  'aria-hidden'?: boolean;   // Hide from screen readers (default: true unless aria-label is provided)
}
```

## Navigation Menu Example

```tsx
import { MenuIcon, CloseIcon } from '@/components/icons';

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className="p-2 hover:bg-gray-100 rounded-lg"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <CloseIcon size={24} aria-hidden />
      ) : (
        <MenuIcon size={24} aria-hidden />
      )}
    </button>
  );
}
```

## Social Links Example

```tsx
import { GithubIcon, LinkedinIcon, TwitterIcon, EmailIcon } from '@/components/icons';

function SocialLinks() {
  return (
    <div className="flex gap-4">
      <a 
        href="https://github.com/username" 
        className="hover:text-blue-500 transition-colors"
        aria-label="GitHub Profile"
      >
        <GithubIcon size={24} aria-hidden />
      </a>
      <a 
        href="https://linkedin.com/in/username"
        className="hover:text-blue-500 transition-colors"
        aria-label="LinkedIn Profile"
      >
        <LinkedinIcon size={24} aria-hidden />
      </a>
      <a 
        href="https://twitter.com/username"
        className="hover:text-blue-500 transition-colors"
        aria-label="Twitter Profile"
      >
        <TwitterIcon size={24} aria-hidden />
      </a>
      <a 
        href="mailto:email@example.com"
        className="hover:text-blue-500 transition-colors"
        aria-label="Email Contact"
      >
        <EmailIcon size={24} aria-hidden />
      </a>
    </div>
  );
}
```

## Status Indicators Example

```tsx
import { SuccessIcon, WarningIcon, ErrorIcon } from '@/components/icons';

function StatusMessage({ type, message }: { type: 'success' | 'warning' | 'error', message: string }) {
  const icons = {
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
  };
  
  const colors = {
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };
  
  const Icon = icons[type];
  
  return (
    <div className={`flex items-center gap-2 ${colors[type]}`}>
      <Icon size={20} aria-hidden />
      <span>{message}</span>
    </div>
  );
}
```

## Design System Compliance

All icons follow the design system guidelines:

- ✅ **2px stroke width** - Consistent line weight
- ✅ **currentColor theming** - Inherits text color
- ✅ **24x24 viewBox** - Standard sizing
- ✅ **Accessibility ready** - ARIA support built-in
- ✅ **Customizable** - Size, color, and className props
- ✅ **TypeScript types** - Full type safety

## Notes

- Icons automatically use `currentColor` so they match your text color
- The `aria-hidden` attribute is automatically set to `true` when no `aria-label` is provided
- Icons are optimized and minified from Lucide Icons
- All icons are tree-shakeable - only import what you use

## Importing Tips

```tsx
// Import individual icons (tree-shakeable)
import { MenuIcon, CloseIcon } from '@/components/icons/menuIcon';

// Use dynamic imports for code splitting
const DynamicIcon = lazy(() => import('@/components/icons/emailIcon'));

// Use the registry for truly dynamic cases
import { getIcon } from '@/components/icons/IconRegistry';
const Icon = getIcon(dynamicIconName);
```

---

**Generated:** November 24, 2025
**Icon Source:** Lucide Icons (https://lucide.dev)
**Total Icons:** 17
