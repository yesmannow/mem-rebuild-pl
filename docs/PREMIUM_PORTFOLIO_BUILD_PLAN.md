# Premium Portfolio Build Structure Plan

This document outlines the complete scaffold for transforming case study prompts into a premium portfolio experience.

---

## 🧱 Build Structure Overview

### 1. Content Layer

**Location**: `content/case-studies/`

**Structure**:
```
content/
  case-studies/
    [slug]/
      index.md          (Stage A: Voice Rewrite output)
      visual-identity.json  (Stage B: Visual Identity output)
      card-design.json      (Stage C: Card Generator output)
  value-projects/
    [slug].md
  technical-projects/
    [slug].md
  site-overview.md      (Global strategy reference)
```

**Markdown Frontmatter Format**:
```yaml
---
title: "The Launchpad"
slug: "the-launchpad"
positioning: "What this initiative proved"
challenge: "The real business stakes..."
strategy: "How I reframed the problem..."
whatIBuilt: "Concrete systems, workflows..."
outcomes: "Quantified improvements..."
capabilities:
  - "Product Vision"
  - "Marketing Automation"
metrics:
  - label: "Qualified Leads"
    value: "+212%"
visualIdentity:
  primaryColor: "#7C5CFF"
  secondaryColor: "#4EC5B8"
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
---
```

---

### 2. Component Layer (React + Tailwind + Framer Motion)

**Global Layout**: `src/components/layout/GlobalLayout.tsx`
- Header with navigation
- Footer
- Theme tokens integration
- Motion providers

**Case Study Components**: `src/components/case-study/`

**New/Enhanced Components**:
- `CaseStudyHero.tsx` - Hero block (title, impact, stat)
- `CaseStudySection.tsx` - Reusable section wrapper (Challenge, Strategy, What I Built, Outcomes)
- `PullQuote.tsx` - Insight highlight callout
- `CapabilitiesBadges.tsx` - Badge list component
- `CaseStudyCTA.tsx` - CTA block (Contact/Download PDF)
- `SystemArchitecturePlaceholder.tsx` - Optional diagram slot
- `CaseStudyCard.tsx` - Homepage grid card (uses Stage C output)
- `ProjectCard.tsx` - Value/Technical project cards

**Component Structure**:
```typescript
// CaseStudyHero.tsx
interface CaseStudyHeroProps {
  title: string;
  impact: string;
  stat: { label: string; value: string };
  gradient?: string;
  emoji?: string;
}

// CaseStudySection.tsx
interface CaseStudySectionProps {
  title: string;
  content: string | RichSection;
  visualIdentity?: VisualIdentity;
}

// CaseStudyCard.tsx
interface CaseStudyCardProps {
  title: string;
  microtagline: string;
  emoji: string;
  statLine: string;
  badges: string[];
  hoverGlow: string;
  gradient: string;
  slug: string;
}
```

---

### 3. Navigation & Routing

**Routes** (already exist, verify integration):
- `/` → Home (hero, featured case studies, CTA)
- `/case-studies` → Filterable grid of deep dives
- `/case-studies/:slug` → Individual case study pages
- `/projects` → ROI-focused projects (value projects)
- `/projects/:slug` → Technical builds (technical projects)
- `/about`, `/contact`, `/resume` → Standard pages

**Router Updates**:
- Ensure dynamic imports for new components
- Add route-level SEO metadata
- Implement scroll restoration

---

### 4. Styling & Identity

**Tailwind Theme Config**: `tailwind.config.js`

**Add Visual Identity Token System**:
```javascript
theme: {
  extend: {
    colors: {
      // Case study specific colors (from Stage B outputs)
      'case-study': {
        primary: 'var(--case-study-primary)',
        secondary: 'var(--case-study-secondary)',
        accent: 'var(--case-study-accent)',
      },
      // ... existing colors
    },
    backgroundImage: {
      'case-study-gradient': 'var(--case-study-gradient)',
    },
    // ... existing config
  }
}
```

**CSS Variables**: `src/styles/case-study-tokens.css`
```css
:root {
  --case-study-primary: #7C5CFF;
  --case-study-secondary: #4EC5B8;
  --case-study-accent: #FF7A3D;
  --case-study-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

**Typography Scale**:
- Editorial scale (serif for headlines, sans for body)
- Comfortable line heights
- Generous spacing (pt-20+)

**Motion**:
- Framer Motion for scroll storytelling
- Hover parallax effects
- Fade-in sections
- Stagger animations

**Card Styling**:
- Gradient backgrounds from Stage C
- Emoji/icon metaphors
- Premium product UI feel (not blog posts)
- Hover interactions (scale 1.00 → 1.05, ambient glow)

---

### 5. Workflow Integration

**Prompt → Build Pipeline**:

1. **Run Stage A**: Voice Rewrite
   - Input: Raw case study text
   - Output: `content/case-studies/[slug]/index.md`

2. **Run Stage B**: Visual Identity
   - Input: Case study title, challenge
   - Output: `content/case-studies/[slug]/visual-identity.json`

3. **Run Stage C**: Card Generator
   - Input: Title + outcomes
   - Output: `content/case-studies/[slug]/card-design.json`

4. **Run Stage D**: Page Layout Blueprint
   - Input: Rewritten content + visual identity
   - Output: React components in `src/components/case-study/`

**Build Script Integration**: `package.json`
```json
{
  "scripts": {
    "build:case-study": "node scripts/build-case-study.js [slug]",
    "build:all-case-studies": "node scripts/build-all-case-studies.js"
  }
}
```

**Build Script**: `scripts/build-case-study.js`
- Reads Markdown + JSON files from `content/case-studies/[slug]/`
- Generates TypeScript data files in `src/data/case-studies/[slug].ts`
- Validates visual identity tokens
- Updates routing if needed

---

## 📁 Complete File Structure

```
content/
  case-studies/
    [slug]/
      index.md
      visual-identity.json
      card-design.json
  value-projects/
    [slug].md
  technical-projects/
    [slug].md
  site-overview.md

src/
  components/
    case-study/
      CaseStudyHero.tsx
      CaseStudySection.tsx
      PullQuote.tsx
      CapabilitiesBadges.tsx
      CaseStudyCTA.tsx
      SystemArchitecturePlaceholder.tsx
      CaseStudyCard.tsx
      [existing components...]
    cards/
      CaseStudyCard.tsx
      ProjectCard.tsx
    layout/
      GlobalLayout.tsx
      [existing components...]
  data/
    case-studies/
      [slug].ts (generated from content/)
  styles/
    case-study-tokens.css
    [existing styles...]

scripts/
  build-case-study.js
  build-all-case-studies.js

prompts/
  case-study-build/
    [existing prompts...]
```

---

## ✅ Implementation Checklist

### Phase 1: Content Structure
- [ ] Create `content/case-studies/` directory
- [ ] Create `content/value-projects/` directory
- [ ] Create `content/technical-projects/` directory
- [ ] Create `content/site-overview.md` template
- [ ] Document Markdown frontmatter schema

### Phase 2: Component Scaffolding
- [ ] Create `CaseStudyHero.tsx` component
- [ ] Create `CaseStudySection.tsx` reusable component
- [ ] Create `PullQuote.tsx` component
- [ ] Create `CapabilitiesBadges.tsx` component
- [ ] Create `CaseStudyCTA.tsx` component
- [ ] Create `SystemArchitecturePlaceholder.tsx` component
- [ ] Create `CaseStudyCard.tsx` for homepage grid
- [ ] Create `ProjectCard.tsx` for project listings
- [ ] Update `GlobalLayout.tsx` with theme integration

### Phase 3: Styling & Identity
- [ ] Create `src/styles/case-study-tokens.css`
- [ ] Update `tailwind.config.js` with visual identity tokens
- [ ] Add CSS variable system for dynamic theming
- [ ] Implement gradient utilities
- [ ] Add motion presets (Framer Motion)

### Phase 4: Build Scripts
- [ ] Create `scripts/build-case-study.js`
- [ ] Create `scripts/build-all-case-studies.js`
- [ ] Add npm scripts to `package.json`
- [ ] Document build workflow

### Phase 5: Integration & Testing
- [ ] Test prompt → content → component pipeline
- [ ] Verify routing works with new components
- [ ] Test visual identity token application
- [ ] Verify card hover interactions
- [ ] Test responsive behavior
- [ ] Performance audit (Lighthouse)

---

## 🎯 Design Principles

- **Narrative clarity**: Show strategic reasoning before execution details
- **Identity consistency**: Tie outputs back into Tailwind theme tokens
- **UI premium feel**: Cards and layouts feel like product UI, not blog posts
- **Assistant-ready**: Prompts are atomic, reusable, and documented
- **Max-width**: 980px content area
- **Generous spacing**: pt-20+ for breathing room
- **Editorial typography**: Comfortable scale, serif headlines
- **Motion guidance**: Opacity + motion guide scanning
- **Modular components**: Independent, reusable sections

---

## 🚀 Next Steps

1. Review and approve this structure
2. Begin Phase 1: Content Structure scaffolding
3. Run a test case study through the full workflow
4. Iterate based on results
5. Document final workflow in README

