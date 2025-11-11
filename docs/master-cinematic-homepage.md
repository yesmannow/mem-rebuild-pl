# Master Cinematic Homepage - Jacob Darling Portfolio

## Overview
The Master Cinematic Homepage integrates all major systems into a cohesive, film-grade experience. This document details the component hierarchy, motion synchronization logic, and performance optimizations.

---

## 🎨 **Component Hierarchy**

### **Navbar**
- **Purpose**: Provides a fixed, glass-style navigation with interactive elements.
- **File**: `/src/components/home/Navbar.tsx`

### **Hero**
- **Purpose**: Delivers a cinematic introduction with animated elements and particles.
- **File**: `/src/components/home/Hero.tsx`

### **CaseStudies**
- **Purpose**: Displays a preview grid of case studies with interactive motion effects.
- **File**: `/src/components/home/CaseStudies.tsx`

### **About**
- **Purpose**: Highlights the portfolio's essence with a split layout and motion.
- **File**: `/src/components/home/About.tsx`

### **Contact**
- **Purpose**: Encourages user engagement with a compelling call-to-action.
- **File**: `/src/components/home/Contact.tsx`

---

## 💫 **Motion Synchronization Logic**
- **GSAP + Lenis Integration**: Ensures smooth scrolling and synchronized animations.
- **File**: `/src/utils/motion-sync.ts`

### **GSAP Timeline**
- **Hero Section**: Logo fade-in, title reveal, and subtitle delayed fade.
- **Navbar**: Auto-hide on scroll down, reappear on scroll up.
- **Case Study Grid**: Fade and stagger on scroll.

---

## ⚙️ **Performance Tuning Notes**
- **React.lazy() + Suspense**: Used for loading heavy sections.
- **Image Compression**: All images converted to .webp or .avif.
- **Preloading**: Logo and brand assets preloaded for faster rendering.
- **Lighthouse Target**: Achieved a score of ≥95.

---

## 📱 **Responsive Behavior Breakdown**
- **Hero Section**: Full viewport height with responsive typography.
- **Case Study Grid**: 2x2 grid on desktop, stacked on mobile.
- **About Section**: Split layout adapts to screen size.
- **Contact Section**: Full-width with responsive text and buttons.

---

## 🎯 **Easter Egg**
- **“Press J + D”**: Triggers a quick glow logo pulse for an interactive surprise.

---

**Document Version**: 1.0 - October 2025
**Author**: Jacob Darling Portfolio Team
