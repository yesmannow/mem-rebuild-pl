# Case Study Build System Prompts

This folder contains four upgraded Markdown prompts that orchestrate the full case study workflow. These prompts don't just rewrite—they generate new conceptual visual identity, layout structure, motion direction, and data highlights for each case study.

**Result**: Case studies feel like **designed narratives**, not text blocks.

---

## 📂 Folder Contents

- `stage-a-voice-rewrite.md` (🔥 Advanced Voice Rewrite)
- `stage-b-visual-identity.md` (🎨 Visual Identity Generation)
- `stage-c-card-generator.md` (🟣 Card Generator)
- `stage-d-page-layout.md` (📐 Page Layout Blueprint)

---

## 🧭 Workflow Sequence

| Step | Action | Tool | Purpose |
|------|--------|------|---------|
| 1 | Run Voice Rewrite Prompt | ChatGPT / Cursor | Clear, executive case study narrative |
| 2 | Run Visual Identity Prompt | ChatGPT / Cursor | Design direction + moodboards + element suggestions |
| 3 | Generate Card UI from Card Prompt | ChatGPT / Cursor | Hover-card headlines, badges, emoji-icon metaphors, gradients |
| 4 | Build layout using Layout Blueprint Prompt | Cursor (write code) | Modular page layout wireframe |
| 5 | Apply brand tokens (typography, color, spacing) | Tailwind theme config | Visual identity integration |

---

## 📋 Detailed Workflow

### 1. Stage A: Advanced Voice Rewrite
- **Input**: Raw case study text (challenge, solution, outcomes, metrics)
- **Output**: Strategic narrative in Markdown
- **Use**: Run when refining text for clarity and executive tone
- **Returns**: Only the rewritten Markdown body (no frontmatter)

### 2. Stage B: Visual Identity Generation
- **Input**: Case study title, challenge, emotional tone
- **Output**: Design tokens (keywords, colors, shapes, motion, gradients, hero composition)
- **Use**: Use to guide UI / component styling
- **Run**: After rewriting (Stage A)
- **Returns**: Structured Markdown with hex codes, CSS values, actionable design tokens

### 3. Stage C: Card Generator
- **Input**: Case study title + outcomes
- **Output**: Homepage card artifacts (title, tagline, emoji metaphor, stat line, badges, hover style)
- **Use**: Use to style your home/cards page
- **For**: Homepage + list pages
- **Returns**: Structured Markdown with CSS-ready values for Tailwind + Framer Motion

### 4. Stage D: Page Layout Blueprint
- **Input**: Rewritten case study content (from Stage A) + Visual identity tokens (from Stage B)
- **Output**: React + Tailwind + Framer Motion component blueprint
- **Use**: Use to build page components in code
- **Tool**: Cursor (write code)
- **Returns**: Complete, production-ready React component code with TypeScript interfaces

---

## ⚙️ How to Use in Cursor

1. **Open any `.md` file** in Cursor
2. **Run it as a custom prompt** (`Cmd/Ctrl + K`, then paste the file content)
3. **Provide the required input** (case study text, title, outcomes, visual identity)
4. **Follow the workflow sequentially**:
   - Stage A → transforms raw content into strategic narrative
   - Stage B → generates visual identity tokens
   - Stage C → creates portfolio card designs
   - Stage D → scaffolds React components

---

## ✅ Design Principles

- **Narrative clarity**: Show strategic reasoning before execution details
- **Identity consistency**: Tie outputs back into Tailwind theme tokens
- **UI premium feel**: Cards and layouts should feel like product UI, not blog posts
- **Assistant-ready**: Prompts are atomic, reusable, and documented
- **Designed narratives**: Each case study gets unique visual identity, not generic templates

---

## 🚀 Outcome

Running these prompts in sequence produces:

- **Executive-level case study narratives** with strategic voice
- **Unique visual identities** per case study (colors, gradients, motion)
- **Branded homepage card artifacts** that look like brand artifacts, not blog links
- **Modular, motion-driven React layouts** with independent reusable components

This system ensures case studies feel like **designed narratives**, not static text blocks.

---

## 💡 Key Improvements

These upgraded prompts now:

- Generate **conceptual visual identity** (not just colors, but atmosphere, motion, texture)
- Create **layout structure** with modular component blueprints
- Define **motion direction** (hover, scroll, focus interactions)
- Highlight **data points** strategically (strongest metrics, before/after comparisons)

Each case study becomes a unique narrative experience with its own visual language.

