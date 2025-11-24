# Signalcraft Systems - Design System Redesign

## Overview

This document outlines the complete redesign of the portfolio site, moving away from the "AI slop" aesthetic (purple gradients, generic fonts, cookie-cutter layouts) to a unique "Signalcraft Systems" brand identity inspired by operations room aesthetics and instrument-grade precision.

## Design Philosophy

**Signalcraft Systems** represents the intersection of:
- **Operations Room Aesthetic**: Clean, data-driven, instrument-grade precision
- **High-Trust Consultancy**: Calm confidence, measurable outcomes
- **Human-Centered Design**: Editorial typography, deliberate negative space, process artifacts

## Key Changes

### 1. Color System

**Removed:**
- Purple/indigo gradients (`#3b82f6`, `#ec4899`, `#8B5CF6`)
- Generic blue/pink color schemes
- Gradient meshes and animated backgrounds

**New Palette:**
- `--ink-900`: `#0b1014` (Obsidian - Base background)
- `--ink-700`: `#1e2a32` (Graphite - Secondary surfaces)
- `--parchment-050`: `#f4efe5` (Parchment - Light surface)
- `--signal-500`: `#ff6b3d` (Signal Orange - Primary accent)
- `--telemetry-400`: `#00a8a8` (Telemetry Teal - Secondary accent)

### 2. Typography

**Removed:**
- Inter, Roboto, Arial (generic system fonts)
- Montserrat (overused)

**New Typography:**
- **Display**: `Fraunces 144` - High-contrast serif for headlines
- **Body**: `Space Grotesk` - Technical, open-aperture sans-serif
- **Mono**: `IBM Plex Mono` - For data callouts and telemetry

### 3. Components Redesigned

#### Hero Section
- **Before**: Generic centered hero with particle effects
- **After**: Split-screen "Command Panel" layout with:
  - Left: Portrait with telemetry captions
  - Right: Headline with rotating ticker (Insight → Architecture → Ops)
  - Blueprint texture overlay (subtle grid pattern)

#### Background System
- **Before**: Animated gradient mesh with purple/blue colors
- **After**: Static blueprint grid texture, no gradients
- Updated `GradientMesh` component to use ink colors only

#### Footer
- **Before**: Standard footer with links
- **After**: Added `SignalTape` component - persistent metrics marquee
  - Displays: Projects Shipped, Automations Live, Revenue Influenced, Systems Built

### 4. Layout & Spacing

- Updated global background to `--ink-900`
- Increased border radius to `12px` (from `8px`)
- Removed all gradient backgrounds
- Added blueprint grid texture class for depth

### 5. Motion & Interaction

- Staggered reveals using `cubic-bezier(0.65, 0, 0.35, 1)` easing
- Telemetry ticker rotates every 3 seconds
- SignalTape marquee scrolls continuously
- Hover states use signal orange accent

## Files Modified

### Core Design System
- `src/styles/tokens.css` - Complete color system overhaul
- `src/styles/globals.css` - Updated CSS variables and utilities
- `tailwind.config.js` - Updated font families and colors
- `index.html` - Updated Google Fonts imports

### Components
- `src/components/ui/GradientMesh.tsx` - Removed purple gradients
- `src/components/hero/ParticleHero.tsx` - Updated to signal orange
- `src/components/home/HeroCommandPanel.tsx` - **NEW** Split-screen hero
- `src/components/home/SignalTape.tsx` - **NEW** Metrics marquee
- `src/components/home/HeroIntro.tsx` - Updated colors and typography
- `src/components/layout/Footer.tsx` - Added SignalTape, updated colors
- `src/components/layout/Layout.tsx` - Updated background colors

### Pages
- `src/pages/index.tsx` - Replaced ParticleHero with HeroCommandPanel
- `src/App.tsx` - Updated GradientMesh colors

## Design Principles Applied

1. **No Purple Gradients**: Completely removed all purple/indigo color schemes
2. **Distinctive Typography**: Using Fraunces 144 (display) instead of generic fonts
3. **Texture Over Gradients**: Blueprint grid patterns instead of animated gradients
4. **Data-Driven Aesthetics**: Telemetry tickers, metrics marquees, mono fonts for data
5. **Asymmetric Layouts**: Split-screen hero instead of centered layouts
6. **High Contrast**: Signal orange on obsidian background for maximum visibility

## Next Steps

1. **Content Updates**: Update copy to match "Signalcraft Systems" narrative
2. **Image Assets**: Add portrait photography with consistent grading
3. **Case Studies**: Redesign case study cards with new color system
4. **Service Ladder**: Create four-tall service modules component
5. **Testimonial Lab**: Redesign testimonials with engineering logbook aesthetic

## References

Design inspiration drawn from:
- Emma Johnson (editorial typography, stacked wordmarks)
- Aliah Johnson (kinetic headlines, flexible grids)
- Harvey Oliver (split-grid storytelling)
- GTE.xyz (high-impact signal blocks, monochrome + accent)
- Janar Siniloo (typographic sculpture, interactive data overlays)

## Accessibility

- All color contrasts meet WCAG AA standards
- Typography scales properly for readability
- Motion respects `prefers-reduced-motion`
- Focus states use signal orange for visibility

---

**Status**: Core redesign complete. Ready for content updates and additional component refinements.

