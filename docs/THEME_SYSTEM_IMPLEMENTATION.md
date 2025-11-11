# Theme System Implementation

## Overview
A sophisticated theme system with Light/Dark/System themes and Brand modes (CMO/Dev) that demonstrates polish, taste, and technical range.

## Features

### ✅ Theme Modes
- **Light**: Clean, bright interface
- **Dark**: Dark mode optimized for low-light viewing
- **System**: Automatically follows OS preference

### ✅ Brand Modes
- **CMO Mode** (Default):
  - Navy accent color (#0f3b82)
  - Serif headings (Newsreader font)
  - Slightly squarer radius (1rem)
  - Professional, executive aesthetic

- **Dev Mode** (Easter Egg):
  - Neon cyan accent (#22d3ee)
  - Monospace UI font
  - Extra rounded cards (1.5rem)
  - Modern, tech-forward aesthetic

## Implementation Details

### Files Created/Modified

1. **`src/components/theme/ThemeProvider.tsx`**
   - React Context for theme state management
   - Handles localStorage persistence
   - Watches system preference changes
   - Analytics integration (optional gtag events)

2. **`src/components/theme/ThemeToggle.tsx`**
   - Beautiful toggle component with Framer Motion animations
   - Separate controls for theme (Light/System/Dark) and brand (CMO/Dev)
   - Icons for each option
   - Smooth layoutId animations for active state

3. **`src/styles/tokens.css`** (Updated)
   - Theme-aware CSS variables
   - Brand mode overrides
   - Smooth transition utilities
   - Reduced motion support

4. **`tailwind.config.js`** (Updated)
   - Theme token support (bg, card, text, mute, accent, ring, border)
   - Brand font families
   - Dynamic border radius

5. **`index.html`** (Updated)
   - Zero-FOUC theme init script (runs before paint)
   - Newsreader font import for CMO mode

6. **`src/App.tsx`** (Updated)
   - Wrapped in ThemeProvider
   - Applied theme classes

7. **`src/components/layout/ModernHeader.tsx`** (Updated)
   - ThemeToggle integrated in desktop and mobile views

## Usage

### Basic Theme Switching
The theme toggle appears in the header. Users can:
1. Select Light, System, or Dark theme
2. Toggle between CMO and Dev brand modes

### Programmatic Access
```tsx
import { useTheme } from '@/components/theme/ThemeProvider';

function MyComponent() {
  const { theme, brand, setTheme, setBrand } = useTheme();

  // Access current theme
  console.log('Current theme:', theme); // 'light' | 'dark' | 'system'
  console.log('Current brand:', brand); // 'cmo' | 'dev'

  // Change theme
  setTheme('dark');
  setBrand('dev');
}
```

### Using Theme Tokens in Components
```tsx
// Use Tailwind classes with theme tokens
<div className="bg-card text-text border border-border rounded-theme">
  <h1 className="font-brand text-accent">Brand heading</h1>
  <p className="text-mute">Muted text</p>
</div>

// Or use the theme-card utility
<div className="theme-card p-4">Content</div>
```

## Technical Highlights

### Zero-FOUC (Flash of Unstyled Content)
- Theme script runs **before** React mounts
- Theme is applied to `<html>` element immediately
- No visible flash when page loads

### Smooth Transitions
- 300ms color transitions on all elements
- Respects `prefers-reduced-motion`
- Framer Motion layoutId for pill animations

### Accessibility
- `aria-pressed` on all toggle buttons
- Keyboard navigation support
- Focus states with visible rings
- High contrast ensured by token pairs

### Persistence
- Theme and brand stored in localStorage
- Survives page refreshes
- System preference changes trigger updates

### Analytics Integration
When `window.gtag` is available:
- `theme_change` events tracked
- `brand_change` events tracked
- Event data includes mode selected

## Brand Mode Differences

### CMO Mode
```css
--accent: #0f3b82; /* Navy */
--font-brand: "Newsreader", ui-serif, Georgia, serif;
--radius: 1rem;
```
**Best for**: Presenting to marketing executives, CMOs, business leaders

### Dev Mode
```css
--accent: #22d3ee; /* Cyan */
--font-ui: ui-monospace, "SFMono-Regular", ...;
--radius: 1.5rem;
```
**Best for**: Presenting to technical leads, engineers, developers

## Future Enhancements

### Optional: Konami Code Easter Egg
```tsx
// Add to ThemeProvider
useEffect(() => {
  let sequence = '';
  const konami = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';

  function onKey(e: KeyboardEvent) {
    sequence += e.code;
    if (konami.includes(sequence)) {
      if (sequence === konami) {
        setBrand('dev');
        sequence = '';
      }
    } else {
      sequence = '';
    }
  }

  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, []);
```

### Optional: URL Parameter Support
```tsx
// ?brand=dev in URL sets brand mode
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const urlBrand = params.get('brand');
  if (urlBrand === 'dev' || urlBrand === 'cmo') {
    setBrand(urlBrand);
  }
}, []);
```

## Testing Checklist

- [x] Theme persists across page refreshes
- [x] System preference changes detected
- [x] Zero FOUC on initial load
- [x] Smooth transitions between themes
- [x] CMO mode: navy accent, serif headings
- [x] Dev mode: cyan accent, monospace UI
- [x] Mobile responsive toggle
- [x] Keyboard navigation works
- [x] Reduced motion respected
- [x] Analytics events fire (if gtag available)

## Notes

- The linter may show warnings about `aria-pressed` expressions, but the values are correctly typed as strings ('true' | 'false')
- Font loading: Newsreader is loaded for CMO mode but gracefully falls back to system serif if unavailable
- Theme system works independently of existing design tokens (maintains compatibility)

