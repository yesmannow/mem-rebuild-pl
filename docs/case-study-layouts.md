# Case Study Layouts - Jacob Darling Portfolio

## Overview
This document outlines the structure and implementation details for the case study pages within the Jacob Darling Portfolio. Each case study is designed to provide an immersive storytelling experience, integrating visuals, animations, and a cohesive brand-aligned layout.

---

## 🎨 **Component Hierarchy**

### **CaseStudyLayout**
- **Purpose**: Acts as the main wrapper for each case study page, ensuring consistent styling and layout.
- **File**: `/src/components/case-study/CaseStudyLayout.tsx`

### **HeroSection**
- **Purpose**: Provides a fullscreen visual introduction with an animated title.
- **File**: `/src/components/case-study/HeroSection.tsx`

### **Overview**
- **Purpose**: Displays a brief project summary, including roles, tools, and objectives.
- **File**: `/src/components/case-study/Overview.tsx`

### **ChallengeSection**
- **Purpose**: Details the problem or creative challenge faced during the project.
- **File**: `/src/components/case-study/ChallengeSection.tsx`

### **ProcessTimeline**
- **Purpose**: Animates the phases of the project using GSAP ScrollTrigger.
- **File**: `/src/components/case-study/ProcessTimeline.tsx`

### **ShowcaseGallery**
- **Purpose**: Displays a carousel of images and videos with motion depth.
- **File**: `/src/components/case-study/ShowcaseGallery.tsx`

### **ResultSection**
- **Purpose**: Highlights the final impact and outcomes of the project.
- **File**: `/src/components/case-study/ResultSection.tsx`

### **CTASection**
- **Purpose**: Encourages users to view the next project or contact.
- **File**: `/src/components/case-study/CTASection.tsx`

---

## 💫 **Reusable Animation Presets**
- **fadeIn**: Gradual appearance of elements
- **slideUp**: Vertical entrance from below
- **staggerChildren**: Sequential animation of child elements
- **glowPulse**: Subtle pulsating glow effect

---

## 📁 **File Naming Conventions**
- **Case Study Pages**: `/src/pages/case-studies/[slug]/index.tsx`
- **Data Files**: `/src/pages/case-studies/[slug]/data.json`
- **Images**: `/src/pages/case-studies/[slug]/gallery/`
- **Hero Image**: `/src/pages/case-studies/[slug]/cover.webp`

---

## 📝 **Example Content JSON Format**
```json
{
  "title": "Graston Dashboard Redesign",
  "subtitle": "UX/UI overhaul for healthcare SaaS",
  "role": "Design Lead, Front-End Dev",
  "tools": ["React", "Figma", "GSAP"],
  "summary": "Redesigned Graston’s dashboard to improve UX and motion fluidity...",
  "slug": "graston-dashboard"
}
```

---

## 🚀 **Steps to Add New Case Studies**
1. **Create a New Folder**: `/src/pages/case-studies/[new-slug]/`
2. **Add `index.tsx`**: Implement the case study using the provided components.
3. **Add `data.json`**: Include project metadata and content.
4. **Add Visuals**: Place images in the `gallery/` subfolder.
5. **Update Routing**: Ensure the new slug is accessible via the router.

---

## 📊 **Performance & Consistency**
- **Lighthouse Score**: Target ≥ 95
- **Scroll Performance**: Maintain ≥ 60 FPS
- **Brand Consistency**: Ensure color, typography, and motion alignment
- **Responsive Design**: Verify graceful degradation on mobile

---

**Document Version**: 1.0 - October 2025
**Author**: Jacob Darling Portfolio Team
