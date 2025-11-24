# GitHub Copilot Agent Mode - MCP Servers Usage Guide

**Purpose:** Detailed instructions on how to use each MCP server to improve the portfolio site

---

## 🎯 Task: Create Comprehensive MCP Usage Guide

Create a detailed usage guide that explains the purpose, best practices, and specific instructions for using each of the 7 MCP servers to improve this portfolio site. Include real-world examples specific to this project's structure (25+ pages, case studies, design portfolio, etc.).

---

## 📋 Project Context

**Portfolio Site Structure:**
- 25+ pages including: Home, About, Case Studies, Projects, Design, Photography, Applications, Toolbox, Resume, Testimonials
- 12+ case studies with varying content styles
- Design portfolio with 47+ images
- Photography gallery with 40+ images
- Complex navigation structure
- Brand voice: Cinematic, Confident, Intelligent, Warmly Human

**Current Challenges:**
- Content tone consistency across pages
- Layout uniformity across 25+ pages
- Component usage consistency
- Design system compliance
- Site structure organization

---

## 🚀 MCP Server Usage Guides

### 1. Shadcn UI MCP Server

#### Purpose
Provides real-time access to shadcn/ui component library with accurate TypeScript props, variants, and usage patterns. Ensures all components follow shadcn/ui best practices.

#### Best Use Cases
- **Component Discovery:** Finding the right shadcn/ui component for a feature
- **Props Verification:** Getting accurate TypeScript props and variants
- **Design Consistency:** Ensuring components match shadcn/ui patterns
- **Implementation:** Getting working code examples

#### How to Use

**Basic Usage:**
```
use shadcn to list all available components
```

**Component Information:**
```
use shadcn to give me information about the button component
use shadcn to show me all button variants
```

**Implementation:**
```
use shadcn to implement a card component that matches my design system
use shadcn to show me how to use the dialog component with my brand colors
```

**Comparison:**
```
use shadcn to compare my current button component with the official shadcn/ui version
```

#### Site Improvement Examples

**For This Portfolio:**

1. **Ensure Consistent Button Usage:**
   ```
   use shadcn to show me button component variants, then check all my pages use consistent button patterns
   ```

2. **Add Missing Components:**
   ```
   use shadcn to list components I should add for better UX: tooltips, popovers, dropdowns
   ```

3. **Design System Compliance:**
   ```
   use shadcn to verify my card components match shadcn/ui patterns across all case study pages
   ```

4. **Component Audit:**
   ```
   use shadcn to check if I'm using shadcn/ui components correctly in my 25+ pages
   ```

#### Best Practices
- ✅ Use before implementing new components
- ✅ Verify existing components match patterns
- ✅ Get accurate TypeScript types
- ✅ Ensure design system compliance

---

### 2. Filesystem MCP Server

#### Purpose
Enhanced file operations for discovering components, analyzing styles, managing assets, and understanding project structure. Provides intelligent file system access within allowed directories.

#### Best Use Cases
- **Component Discovery:** Finding all components of a specific type
- **Style Analysis:** Analyzing CSS and design token usage
- **Asset Management:** Finding and organizing images/icons
- **Structure Mapping:** Understanding file organization

#### How to Use

**Component Discovery:**
```
use filesystem to list all components in src/components/ui
use filesystem to find all button components across the project
use filesystem to find all case study components
```

**Style Analysis:**
```
use filesystem to find all CSS files using color variables
use filesystem to analyze design token usage across stylesheets
use filesystem to find inconsistent spacing usage
```

**Asset Management:**
```
use filesystem to list all images in public/images
use filesystem to find unused icon files
use filesystem to organize design portfolio images
```

**Structure Analysis:**
```
use filesystem to map the component structure of my portfolio
use filesystem to find all page components and their dependencies
```

#### Site Improvement Examples

**For This Portfolio:**

1. **Component Consistency Audit:**
   ```
   use filesystem to find all card components, then analyze if they use consistent patterns
   ```

2. **Design Token Usage:**
   ```
   use filesystem to find all CSS files and check if they use design system tokens consistently
   ```

3. **Case Study Structure:**
   ```
   use filesystem to analyze the structure of all case study pages and identify inconsistencies
   ```

4. **Asset Organization:**
   ```
   use filesystem to organize the 47+ design images and 40+ photography images
   ```

5. **Component Reusability:**
   ```
   use filesystem to find duplicate component code that could be consolidated
   ```

#### Best Practices
- ✅ Use for discovery before refactoring
- ✅ Analyze patterns across multiple files
- ✅ Find inconsistencies in structure
- ✅ Organize assets systematically

---

### 3. GitHub MCP Server

#### Purpose
Access repository information, issues, PRs, and documentation. Track design-related work, reference design tokens, and collaborate on improvements.

#### Best Use Cases
- **Documentation Access:** Reading design system docs in repo
- **Issue Tracking:** Finding and tracking design/content issues
- **PR Review:** Reviewing design-related pull requests
- **Design Tokens:** Accessing design system documentation

#### How to Use

**Repository Access:**
```
use github to list repositories
use github to show me the design system documentation
use github to find issues related to design consistency
```

**Documentation:**
```
use github to show me component examples in the repository
use github to access the design system guide
```

**Issue Management:**
```
use github to create an issue for content tone consistency
use github to list all design-related issues
```

#### Site Improvement Examples

**For This Portfolio:**

1. **Design System Reference:**
   ```
   use github to show me the design system documentation, then verify all pages follow it
   ```

2. **Track Improvements:**
   ```
   use github to create issues for each page that needs tone consistency improvements
   ```

3. **Component Examples:**
   ```
   use github to show me examples of how components are used in other projects
   ```

4. **Documentation Updates:**
   ```
   use github to update design system docs with new patterns discovered
   ```

#### Best Practices
- ✅ Reference documentation regularly
- ✅ Track improvements as issues
- ✅ Review PRs for design consistency
- ✅ Document patterns in repo

---

### 4. Brave Search MCP Server

#### Purpose
Search the web for design patterns, UI examples, accessibility best practices, and content inspiration. Research modern design trends and solutions.

#### Best Use Cases
- **Design Research:** Finding modern design patterns
- **Accessibility:** Researching accessibility best practices
- **UI Inspiration:** Discovering new component patterns
- **Content Research:** Finding content style examples

#### How to Use

**Design Research:**
```
use brave-search to find modern design patterns for hero sections
use brave-search to research spacing systems in modern design
use brave-search to find accessibility best practices for forms
```

**Component Research:**
```
use brave-search to find examples of card component designs
use brave-search to research typography scales for portfolios
```

**Content Research:**
```
use brave-search to find examples of cinematic portfolio copy
use brave-search to research tone consistency in professional portfolios
```

#### Site Improvement Examples

**For This Portfolio:**

1. **Design Pattern Research:**
   ```
   use brave-search to find modern case study page layouts, then compare with mine
   ```

2. **Accessibility Improvements:**
   ```
   use brave-search to research accessibility best practices for portfolio sites
   ```

3. **Content Style Research:**
   ```
   use brave-search to find examples of confident, cinematic copywriting
   ```

4. **Component Inspiration:**
   ```
   use brave-search to find modern navigation patterns for portfolio sites
   ```

#### Best Practices
- ✅ Research before implementing new features
- ✅ Find accessibility best practices
- ✅ Discover modern design patterns
- ✅ Get inspiration for improvements

---

### 5. Memory MCP Server

#### Purpose
Store and recall brand voice, content style preferences, design decisions, and project-specific guidelines. Maintains consistency across all content and design work.

#### Best Use Cases
- **Brand Voice:** Storing and enforcing brand voice guidelines
- **Content Style:** Remembering content style preferences
- **Design Decisions:** Tracking approved design patterns
- **Consistency Checks:** Verifying content matches guidelines

#### How to Use

**Store Brand Voice:**
```
use memory to remember my brand voice is: cinematic, confident, intelligent, warmly human
use memory to remember I avoid: hedging words (might, try, attempt), ellipsis, passive voice
use memory to remember my preferred words: craft, create, shape, turn, move
```

**Store Content Style:**
```
use memory to remember my content style: short rhythmic sentences, strategic pauses, visceral over abstract
use memory to remember my case study structure: challenge, strategy, execution, outcomes
```

**Recall Information:**
```
use memory to recall my brand voice
use memory to recall my content style preferences
```

**Check Content:**
```
use memory to check if this content matches my brand voice: [paste content]
use memory to verify this case study follows my style guidelines
```

#### Site Improvement Examples

**For This Portfolio:**

1. **Store Brand Voice:**
   ```
   use memory to remember my brand voice is: cinematic, confident, intelligent, warmly human. I avoid hedging words, ellipsis, and passive voice. I prefer: craft, create, shape, turn, move.
   ```

2. **Content Consistency Check:**
   ```
   use filesystem to find all case study content, then use memory to check each one matches my brand voice
   ```

3. **Style Enforcement:**
   ```
   use memory to check all page headers match my cinematic tone guidelines
   ```

4. **Content Review:**
   ```
   use memory to review the About page content and suggest improvements to match brand voice
   ```

#### Best Practices
- ✅ Store brand voice first thing
- ✅ Regularly check content against guidelines
- ✅ Update memory as guidelines evolve
- ✅ Use for consistency across all pages

---

### 6. Puppeteer MCP Server

#### Purpose
Navigate and analyze the actual rendered site, check layout consistency, verify navigation, test responsive design, and analyze page structure in real browsers.

#### Best Use Cases
- **Layout Analysis:** Analyzing page layouts across the site
- **Navigation Testing:** Verifying navigation consistency
- **Responsive Design:** Testing at different breakpoints
- **Structure Mapping:** Understanding page hierarchy
- **Visual Consistency:** Checking visual patterns

#### How to Use

**Basic Navigation:**
```
use puppeteer to navigate to http://localhost:5173
use puppeteer to navigate to http://localhost:5173/case-studies
```

**Layout Analysis:**
```
use puppeteer to analyze the layout structure of my homepage
use puppeteer to check if navigation is consistent across all pages
```

**Structure Mapping:**
```
use puppeteer to map the content hierarchy of my portfolio site
use puppeteer to analyze layout patterns across all case study pages
```

**Visual Testing:**
```
use puppeteer to take screenshots of all main pages and compare layouts
use puppeteer to test responsive design at different breakpoints
```

#### Site Improvement Examples

**For This Portfolio:**

1. **Layout Consistency:**
   ```
   use puppeteer to analyze layout patterns across all 25+ pages and identify inconsistencies
   ```

2. **Navigation Audit:**
   ```
   use puppeteer to navigate through all pages and verify navigation is consistent
   ```

3. **Case Study Structure:**
   ```
   use puppeteer to analyze the structure of all case study pages and ensure they follow the same pattern
   ```

4. **Responsive Testing:**
   ```
   use puppeteer to test all pages at mobile, tablet, and desktop breakpoints
   ```

5. **Visual Hierarchy:**
   ```
   use puppeteer to analyze the visual hierarchy and content structure of each page type
   ```

#### Best Practices
- ✅ Test with dev server running (`npm run dev`)
- ✅ Analyze multiple pages for patterns
- ✅ Check responsive design
- ✅ Verify navigation consistency
- ✅ Compare layouts across pages

---

### 7. PostgreSQL MCP Server (Optional)

#### Purpose
If using a database, manage content uniformity, track component usage, store design system data, and manage content relationships.

#### Best Use Cases
- **Content Management:** Storing and querying content data
- **Usage Tracking:** Tracking component usage across pages
- **Design Tokens:** Storing design system tokens
- **Content Relationships:** Managing content connections

#### How to Use

**Content Queries:**
```
use postgres to query all case study content
use postgres to find pages using a specific component
```

**Design System:**
```
use postgres to query design system tokens
use postgres to find all components using a specific color
```

**Content Analysis:**
```
use postgres to analyze content tone consistency across all pages
```

#### Site Improvement Examples

**For This Portfolio (If Using Database):**

1. **Content Inventory:**
   ```
   use postgres to create a content inventory of all 25+ pages
   ```

2. **Component Tracking:**
   ```
   use postgres to track which components are used on which pages
   ```

3. **Design Token Management:**
   ```
   use postgres to store and query design system tokens
   ```

#### Best Practices
- ✅ Only use if database is set up
- ✅ Store content metadata
- ✅ Track component usage
- ✅ Manage design tokens

---

## 🎯 Combined Usage Strategies

### Strategy 1: Content Tone Consistency

**Goal:** Ensure all 25+ pages use consistent cinematic, confident tone

**Steps:**
1. Store brand voice in Memory MCP
2. Use Filesystem to find all content files
3. Use Memory to check each file against guidelines
4. Use GitHub to track improvements as issues
5. Use Brave Search to research best practices

**Commands:**
```
use memory to remember my brand voice is: cinematic, confident, intelligent, warmly human
use filesystem to find all page content files
use memory to check each file matches my brand voice
use github to create issues for pages needing tone improvements
```

### Strategy 2: Layout Consistency

**Goal:** Ensure all pages use consistent layouts and components

**Steps:**
1. Use Puppeteer to analyze all page layouts
2. Use Shadcn to verify component usage
3. Use Filesystem to find layout components
4. Compare patterns and identify inconsistencies

**Commands:**
```
use puppeteer to analyze layout patterns across all portfolio pages
use shadcn to verify components are used correctly
use filesystem to find all layout components
```

### Strategy 3: Design System Compliance

**Goal:** Ensure all components follow design system

**Steps:**
1. Use Shadcn to get component patterns
2. Use Filesystem to find all components
3. Compare with Shadcn patterns
4. Use Memory to store approved patterns

**Commands:**
```
use shadcn to list all available components
use filesystem to find all my components
use shadcn to compare my components with official patterns
use memory to remember approved component patterns
```

### Strategy 4: Site Structure Organization

**Goal:** Organize and improve site structure

**Steps:**
1. Use Puppeteer to map site structure
2. Use Filesystem to analyze file organization
3. Use GitHub to document structure
4. Create improvement plan

**Commands:**
```
use puppeteer to map the content hierarchy of my site
use filesystem to analyze component organization
use github to document the site structure
```

---

## 📊 Improvement Workflow

### Phase 1: Content Consistency (Week 1)

**Tools:** Memory, Filesystem, Content Audit Script

1. Store brand voice in Memory
2. Run content audit: `npm run content:audit`
3. Use Filesystem to find all content files
4. Use Memory to check each against guidelines
5. Create improvement plan

### Phase 2: Layout Consistency (Week 2)

**Tools:** Puppeteer, Shadcn, Filesystem

1. Use Puppeteer to analyze all page layouts
2. Use Shadcn to verify component usage
3. Use Filesystem to find layout inconsistencies
4. Create layout standards
5. Apply consistently

### Phase 3: Design System (Week 3)

**Tools:** Shadcn, Filesystem, Memory

1. Use Shadcn to get component patterns
2. Use Filesystem to audit component usage
3. Use Memory to store approved patterns
4. Ensure all components follow patterns
5. Document standards

### Phase 4: Structure Organization (Week 4)

**Tools:** Puppeteer, Filesystem, GitHub

1. Use Puppeteer to map site structure
2. Use Filesystem to analyze organization
3. Use GitHub to document structure
4. Create improvement plan
5. Implement improvements

---

## ✅ Success Metrics

### Content Quality
- 90%+ tone consistency across all pages
- Zero hedging words in new content
- All content follows brand voice
- Consistent style across case studies

### Layout Consistency
- Consistent layouts across all page types
- Uniform navigation patterns
- Standardized component usage
- Clear visual hierarchy

### Design System
- All components follow shadcn/ui patterns
- Consistent design tokens usage
- Standardized spacing and typography
- Unified interaction patterns

### Site Structure
- Clear content hierarchy
- Organized file structure
- Consistent navigation
- Well-documented structure

---

## 🎯 Quick Reference: When to Use Each Tool

**Need component information?** → Shadcn MCP
**Need to find files?** → Filesystem MCP
**Need to check brand voice?** → Memory MCP
**Need to analyze site?** → Puppeteer MCP
**Need design research?** → Brave Search MCP
**Need repo access?** → GitHub MCP
**Need database queries?** → PostgreSQL MCP

---

## 📚 Documentation References

- **Setup:** `docs/MCP_SETUP_INSTRUCTIONS.md`
- **Quick Reference:** `MCP_SERVERS_QUICK_REFERENCE.md`
- **Complete Guide:** `docs/MCP_SERVERS_GUIDE.md`
- **Test Commands:** `MCP_QUICK_TEST_COMMANDS.md`

---

**This guide provides comprehensive instructions for using each MCP server to improve the portfolio site systematically.**

