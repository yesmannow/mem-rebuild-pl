# Bear Cave Marketing Portfolio Build Implementation Plan

Complete scaffold for premium portfolio site using React + TailwindCSS + Framer Motion.

---

## 📋 Implementation Phases

### Phase 1: Content Structure & Directories
- [ ] Create `content/deep-dives/` directory for Markdown case studies
- [ ] Create `content/value-projects/` directory
- [ ] Create `content/technical-projects/` directory
- [ ] Create `content/site-overview.md` template
- [ ] Create Markdown frontmatter schema documentation

### Phase 2: Core Reusable Components
- [ ] `src/components/case-study/HeroBlock.tsx` - Hero with title, impact, stat
- [ ] `src/components/case-study/ChallengeSection.tsx` - Challenge narrative section
- [ ] `src/components/case-study/StrategySection.tsx` - Strategy narrative section
- [ ] `src/components/case-study/BuildSection.tsx` - What I Built section
- [ ] `src/components/case-study/OutcomesSection.tsx` - Outcomes with metrics
- [ ] `src/components/case-study/KeyTakeaways.tsx` - Key takeaways component
- [ ] `src/components/case-study/CapabilitiesBadges.tsx` - Badge list
- [ ] `src/components/case-study/PullQuote.tsx` - Insight highlight callout
- [ ] `src/components/case-study/CTA.tsx` - CTA block (Contact/Download PDF)
- [ ] `src/components/cards/CaseStudyCard.tsx` - Homepage grid card
- [ ] `src/components/cards/ProjectCard.tsx` - Value/Technical project cards
- [ ] `src/components/filters/FilterBar.tsx` - Filterable grid controls
- [ ] `src/components/layout/Layout.tsx` - Enhanced global wrapper

### Phase 3: Page Components & Routes
- [ ] Update `src/pages/index.tsx` - Home with hero, featured cards, testimonials
- [ ] Update `src/pages/CaseStudies.tsx` - Filterable grid with FilterBar
- [ ] Update `src/pages/CaseStudyDetail.tsx` - Use new component structure
- [ ] Create `src/pages/ValueProjects.tsx` - ROI-focused projects page
- [ ] Create `src/pages/TechnicalProjects.tsx` - Technical builds page
- [ ] Update `src/pages/About.tsx` - Story + visuals
- [ ] Update `src/pages/Resume.tsx` - Interactive timeline + PDF
- [ ] Update `src/pages/Toolbox.tsx` - Skills grid
- [ ] Update `src/pages/SideProjects.tsx` - Visual gallery
- [ ] Update `src/pages/Contact.tsx` - Form + Calendly + LinkedIn

### Phase 4: Routing & Navigation
- [ ] Update `src/router/AppRouter.tsx` - Add `/projects/value` and `/projects/technical` routes
- [ ] Update navigation component with new routes
- [ ] Add route-level SEO metadata
- [ ] Implement scroll restoration

### Phase 5: Styling & Visual Identity System
- [ ] Create `src/styles/case-study-tokens.css` - CSS variables for visual identities
- [ ] Update `tailwind.config.js` - Add visual identity token system
- [ ] Create typography scale (editorial hierarchy)
- [ ] Add gradient utilities
- [ ] Implement Framer Motion presets
- [ ] Create card hover interaction styles

### Phase 6: Markdown Content Integration
- [ ] Create `src/utils/markdownLoader.ts` - Markdown parser utility
- [ ] Create `src/utils/frontmatterParser.ts` - Frontmatter extraction
- [ ] Update data layer to read from `content/` directory
- [ ] Create build script to process Markdown → TypeScript data

### Phase 7: Accessibility & Performance
- [ ] Add ARIA labels to all interactive components
- [ ] Ensure WCAG contrast compliance
- [ ] Implement tab focus management
- [ ] Add lazy loading for images
- [ ] Optimize semantic HTML structure
- [ ] Add schema.org structured data
- [ ] SEO meta tags for all pages

### Phase 8: Integration & Testing
- [ ] Test full workflow: Prompt → Content → Component
- [ ] Verify all routes work correctly
- [ ] Test filter functionality
- [ ] Verify visual identity token application
- [ ] Test responsive behavior
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit

---

## 📁 File Structure

```
content/
  deep-dives/
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
      HeroBlock.tsx
      ChallengeSection.tsx
      StrategySection.tsx
      BuildSection.tsx
      OutcomesSection.tsx
      KeyTakeaways.tsx
      CapabilitiesBadges.tsx
      PullQuote.tsx
      CTA.tsx
      [existing components...]
    cards/
      CaseStudyCard.tsx
      ProjectCard.tsx
    filters/
      FilterBar.tsx
    layout/
      Layout.tsx (enhanced)
      [existing components...]
  pages/
    index.tsx (updated)
    CaseStudies.tsx (updated)
    CaseStudyDetail.tsx (updated)
    ValueProjects.tsx (new)
    TechnicalProjects.tsx (new)
    About.tsx (updated)
    Resume.tsx (updated)
    Toolbox.tsx (updated)
    SideProjects.tsx (updated)
    Contact.tsx (updated)
  router/
    AppRouter.tsx (updated)
  styles/
    case-study-tokens.css (new)
    [existing styles...]
  utils/
    markdownLoader.ts (new)
    frontmatterParser.ts (new)
  data/
    [existing data files...]

scripts/
  build-case-study.js (new)
  process-markdown.js (new)

tailwind.config.js (updated)
```

---

## 🎨 Component Specifications

### HeroBlock.tsx
```typescript
interface HeroBlockProps {
  title: string;
  impact: string; // One-line impact statement
  stat: { label: string; value: string };
  gradient?: string;
  emoji?: string;
}
```

### ChallengeSection.tsx / StrategySection.tsx / BuildSection.tsx
```typescript
interface NarrativeSectionProps {
  title: string;
  content: string | RichSection;
  visualIdentity?: VisualIdentity;
}
```

### OutcomesSection.tsx
```typescript
interface OutcomesSectionProps {
  outcomes: string | RichSection;
  metrics: Array<{ label: string; value: string }>;
  beforeAfter?: Array<{ before: string; after: string }>;
}
```

### CaseStudyCard.tsx
```typescript
interface CaseStudyCardProps {
  title: string;
  microtagline: string;
  emoji: string;
  statLine: string;
  badges: string[];
  hoverGlow: string;
  gradient: string;
  slug: string;
  featured?: boolean;
}
```

### FilterBar.tsx
```typescript
interface FilterBarProps {
  filters: string[]; // ['Automation', 'Analytics', 'Security', 'Product Vision']
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}
```

---

## 🎨 Styling Specifications

### Tailwind Theme Extensions
```javascript
// tailwind.config.js additions
theme: {
  extend: {
    colors: {
      'case-study': {
        primary: 'var(--case-study-primary)',
        secondary: 'var(--case-study-secondary)',
        accent: 'var(--case-study-accent)',
      },
    },
    backgroundImage: {
      'case-study-gradient': 'var(--case-study-gradient)',
    },
    fontFamily: {
      serif: ['var(--font-serif)', 'serif'],
      sans: ['var(--font-sans)', 'sans-serif'],
    },
  }
}
```

### CSS Variables System
```css
/* src/styles/case-study-tokens.css */
:root {
  --case-study-primary: #7C5CFF;
  --case-study-secondary: #4EC5B8;
  --case-study-accent: #FF7A3D;
  --case-study-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

[data-case-study="the-launchpad"] {
  --case-study-primary: #7C5CFF;
  --case-study-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Card Hover Interactions
- Scale: `transform: scale(1.00) → scale(1.05)`
- Ambient glow: `box-shadow` with color from visual identity
- Micro parallax: Subtle transform on hover
- Transition: `transition-all duration-300 ease-out`

---

## ⚙️ Markdown Content Schema

### Case Study Frontmatter
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
cardDesign:
  emoji: "🚀"
  microtagline: "Transforming a static directory into a revenue engine"
  statLine: "+212% Qualified Leads"
  badges: ["Product Vision", "Marketing Automation"]
  hoverGlow: "#7C5CFF"
---
```

---

## 🚀 Build Scripts

### scripts/build-case-study.js
- Reads Markdown from `content/deep-dives/[slug]/index.md`
- Parses frontmatter and content
- Generates TypeScript data file in `src/data/case-studies/[slug].ts`
- Validates visual identity tokens
- Updates routing if needed

### scripts/process-markdown.js
- Batch processes all Markdown files
- Generates index files
- Validates schema compliance
- Outputs build report

---

## ✅ Success Criteria

1. **Functionality**
   - All routes work correctly
   - Filter system functions properly
   - Markdown content loads and renders
   - Components are reusable and modular

2. **Design**
   - Visual identity tokens apply correctly
   - Cards have premium UI feel
   - Typography hierarchy is editorial
   - Motion enhances storytelling

3. **Performance**
   - Lighthouse score ≥ 95
   - Images lazy load
   - Code splitting works
   - Fast initial load

4. **Accessibility**
   - WCAG AA compliance
   - Keyboard navigation works
   - Screen reader friendly
   - Proper ARIA labels

5. **Integration**
   - Prompt outputs feed into content
   - Content feeds into components
   - Visual identity tokens apply dynamically
   - Build scripts work end-to-end

---

## 📝 Implementation Order

1. **Start with Content Structure** (Phase 1)
   - Create directories
   - Document schema
   - Create example Markdown files

2. **Build Core Components** (Phase 2)
   - Start with HeroBlock
   - Build narrative sections
   - Create card components
   - Build filter system

3. **Create Pages** (Phase 3)
   - Update existing pages
   - Create new project pages
   - Wire up components

4. **Styling System** (Phase 5)
   - Set up CSS variables
   - Update Tailwind config
   - Create motion presets

5. **Markdown Integration** (Phase 6)
   - Build parser utilities
   - Create data layer
   - Test content loading

6. **Polish & Test** (Phases 7-8)
   - Accessibility audit
   - Performance optimization
   - End-to-end testing

---

This plan provides a complete roadmap for building the premium portfolio site scaffold.

