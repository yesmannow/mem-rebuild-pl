# BearCave Marketing - Design System Guide

## Overview
Unified design system for BearCave Marketing website, combining BearCave brand identity with GT theme accent colors for enhanced user experience.

## Color System Strategy

### Primary Brand Identity (BearCave)
**Primary Background**: `cave.bg: #0D0D0F` (Main dark background)
**Primary Text**: `cave.text: #E6E6E6` (Light text on dark backgrounds)
**Accent Elements**: `cave.ember: #FF7A3D` (BearCave accent)

### Accent Colors (GT Theme)
**Primary Accent**: `turquoise: #3CC6C4` (CTA buttons, links, interactive elements)
**Secondary Accent**: `creamsicle: #FF9E58` (Hover states, highlights, secondary CTAs)
**Background Variant**: `light-blue-gray: #F3F6F7` (Section backgrounds, cards)

### Color Usage Guidelines

#### Primary Backgrounds
- **Main layout**: `bg-cave-bg` (#0D0D0F)
- **Section backgrounds**: Use `bg-cave-bg` or `bg-light-blue-gray` for contrast
- **Cards/containers**: `bg-white` or `bg-light-blue-gray`

#### Accent Elements
- **Primary CTAs**: `bg-turquoise` with `text-white`
- **Secondary CTAs**: `bg-creamsicle` with `text-white`
- **Hover states**: `hover:bg-creamsicle-dark` for turquoise, `hover:bg-turquoise` for creamsicle
- **Links**: `text-turquoise hover:text-creamsicle`
- **Interactive elements**: `text-turquoise` for icons, dividers

#### Text Hierarchy
- **Primary text**: `text-cave-text` on dark backgrounds
- **Secondary text**: `text-gray-600` on light backgrounds
- **Accent text**: `text-turquoise` for emphasis, links
- **Highlight text**: `text-creamsicle` for special emphasis

### Typography System
**Primary Font**: Montserrat (all weights: 300-700)
- **Headings**: `font-bold` (700)
- **Body text**: `font-normal` (400)
- **Captions**: `font-light` (300)

### Spacing & Layout
**Section Padding**: `py-20` (5rem/80px)
**Container**: `container mx-auto max-w-7xl px-6`
**Grid Gaps**: `gap-8` (2rem)

### Animation Patterns
**Standard Duration**: 0.6s
**Easing**: `[0.22, 1, 0.36, 1]` (easeOut)
**Stagger**: 0.1-0.2s between elements
**Hover Transform**: `scale: 1.05, y: -2px`

## Component Usage

### SectionWrapper
- **Default spacing**: `py-20`
- **Background variants**: `bgVariant="transparent|white|light-blue-gray|turquoise|creamsicle|dark"`
- **Animation**: Enabled by default with scroll-triggered reveals

### Button Styles
- **Primary CTA**: `bg-turquoise text-white px-8 py-4 rounded-lg font-semibold`
- **Secondary CTA**: `bg-creamsicle text-white px-8 py-4 rounded-lg font-semibold`
- **Ghost**: `border-turquoise text-turquoise bg-transparent`

### Card Components
- **Default**: `bg-white p-8 rounded-xl shadow-sm`
- **Hover**: `hover:shadow-lg hover:-translate-y-2`
- **Background variant**: `bg-light-blue-gray` for testimonial cards

## Implementation Notes

### Design Tokens Priority
1. **BearCave primary colors** (cave.*) - Main brand foundation
2. **GT accent colors** (turquoise, creamsicle) - Interactive highlights
3. **System grays** - Text hierarchy and subtle elements
4. **CSS variables** - For theme-aware components

### Mobile-First Considerations
- **Touch targets**: Minimum 44px height
- **Text scaling**: Responsive font sizes (`text-xl md:text-2xl`)
- **Spacing**: Consistent padding/margins across breakpoints
- **Animation performance**: Reduced complexity on mobile devices

This design system ensures consistent, accessible, and performant user experience while maintaining brand identity and leveraging accent colors for enhanced interactions.