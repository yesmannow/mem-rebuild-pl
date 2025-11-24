# 📐 Case Study Page Layout Component Blueprint

**Purpose**: Creates a modular page layout wireframe
**Use**: Use to build page components in code
**Tool**: Cursor (write code)

---

This is what you paste into Cursor when coding the actual page.

Generate a component layout for a Case Study page using React + Tailwind + Framer Motion.

## Input
- Case study content (from Stage A: Voice Rewrite)
- Visual identity tokens (from Stage B: Visual Identity)

## Layout Requirements

The layout must include:

### Hero Block
- Title
- One-line impact statement
- Supporting stat (key metric)

### Content Sections
- **Challenge** → **Strategy** → **What I Built** → **Outcomes** sections

### Additional Components
- Optional System Architecture Diagram placeholder slot
- Pull-quote / insight highlight callout component
- "Capabilities Demonstrated" badge list
- CTA block at bottom that leads to Contact or Download PDF

---

## Design Rules

- Max-width: 980px content
- Generous spacing (pt-20+)
- Typography scale comfortable and editorial
- Use opacity + motion to guide scanning
- Cards should *feel* like premium product UI, not blog posts
- Export all sections as independent reusable components

---

## Component Structure

Generate React + Tailwind + Framer Motion code for:

1. **CaseStudyHero** component
2. **CaseStudySection** component (reusable for Challenge, Strategy, What I Built, Outcomes)
3. **PullQuote** component
4. **CapabilitiesBadges** component
5. **CaseStudyCTA** component
6. **SystemArchitecturePlaceholder** component (optional)

---

## Return Format

Return complete, production-ready React component code with:
- TypeScript interfaces
- Tailwind classes
- Framer Motion animations
- Proper component exports
- Comments explaining animation intent

Each component should be independently usable and follow the visual identity tokens from Stage B.

