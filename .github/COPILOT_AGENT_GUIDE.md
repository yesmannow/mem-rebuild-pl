# 🧠 Copilot Coding Agent Guide

To get the best results from GitHub Copilot coding agent, focus on clear communication, scoped tasks, and iterative refinement. This guide applies to all workflows in this repo — from AI tooling to component sourcing and design system evolution.

**Quick Links:**
- [Issue Templates](.github/ISSUE_TEMPLATE/) for bug reports and feature requests
- [MCP Configuration](../mcp/config.json) for tool setup and paths
- [MCP Server](../mcp/server.js) for API endpoints and monitoring

---

## ✍️ Effective Prompting Techniques

### Agent Mode vs. Inline vs. Chat

GitHub Copilot offers three distinct interaction modes, each optimized for different tasks:

| Mode | Best For | Example Use Cases |
|------|----------|-------------------|
| **Agent Mode** | Multi-file changes, repo-wide refactors, tool invocation | Adding new features, refactoring architecture, integrating APIs, running tests |
| **Inline Suggestions** | Quick snippets, autocomplete, small edits | Variable names, function signatures, single-line logic |
| **Copilot Chat** | Brainstorming, explanations, Q&A, debugging | Understanding code flow, exploring alternatives, getting syntax help |

**Agent Mode Tips:**
- Provide complete context in your initial prompt (file paths, dependencies, requirements)
- Break large tasks into logical phases (setup → implementation → testing)
- Use explicit acceptance criteria to guide the agent's validation
- Reference existing patterns: "Follow the structure used in `src/components/Hero.tsx`"

**Inline Suggestions Tips:**
- Keep relevant files open in your editor for better context
- Write descriptive comments before complex logic to guide suggestions
- Use consistent naming patterns across your codebase

**Chat Tips:**
- Ask for explanations before making changes: "Explain how the routing works in this app"
- Request multiple approaches: "Show me 3 different ways to implement this filter"
- Use chat to plan, then agent mode to execute

---

### ✅ Be Specific and Detailed

Vague instructions lead to generic results. Always define:
- The goal (what you want to achieve)
- The context (where in the codebase, what dependencies exist)
- The expected outcome (what success looks like)
- Any constraints or requirements (performance, compatibility, style)

**Examples:**

❌ **Vague:** "Improve this function"  
✅ **Specific:** "Refactor `processData` in `src/utils/data.ts` to reduce O(n²) complexity to O(n) and add TypeScript type safety"

❌ **Vague:** "Add a button"  
✅ **Specific:** "Add a primary CTA button to the hero section in `src/components/Hero.tsx` that navigates to `/contact` and follows our design system tokens from `tailwind.config.js`"

❌ **Vague:** "Fix the tests"  
✅ **Specific:** "Update tests in `tests/routing.test.js` to cover the new `/applications/:id` route and ensure all edge cases (404, invalid ID) are handled"

---

### ✅ Break Down Complex Tasks

Large tasks should be split into modular subtasks.  
Start with a high-level plan, then assign each part to Copilot separately.

**Example Task Breakdown:**
```
Task: Add a new case study filtering system

Phase 1: Data structure
- Update `src/data/caseStudies.ts` to include `tags` and `category` fields
- Add TypeScript interfaces for filters

Phase 2: UI components
- Create `<FilterBar>` component with tag pills
- Create `<CategoryDropdown>` component
- Add search input with debouncing

Phase 3: Logic
- Implement filter state management
- Add filter combination logic (AND vs OR)
- Update URL params for shareable filters

Phase 4: Testing
- Add unit tests for filter logic
- Add integration tests for UI interactions
- Verify accessibility (keyboard navigation, ARIA labels)
```

---

### ✅ Use Positive Instructions

Tell Copilot what to do, not what to avoid.  
Positive instructions are clearer and reduce ambiguity.

✅ "Use `const` or `let` for all variable declarations"  
❌ "Don't use `var`"

✅ "Implement error handling with try-catch blocks and log to console"  
❌ "Don't let errors crash the app"

✅ "Follow the existing animation patterns in `src/animations/transitions.ts`"  
❌ "Don't make animations inconsistent"

---

### ✅ Provide Examples (Few-Shot Prompting)

Include examples of input/output, coding style, or expected behavior.  
This helps Copilot follow patterns already used in your codebase.

**Example:**
```
Add a new application entry to src/data/applications.ts following this pattern:

{
  id: "guardian-ai",
  title: "The Guardian",
  tagline: "Compliance automation that saves time",
  status: "production",
  metrics: {
    efficiency: "+68%",
    impact: "2,400 hours saved"
  },
  tags: ["automation", "compliance", "AI"]
}
```

---

### ✅ Structure Your Prompts

Use clear syntax, punctuation, and delimiters.  
Separate instructions from examples or context.  
Later parts of a prompt may be emphasized more.

**Well-Structured Prompt Template:**
```
Context: [Where this fits in the codebase]
Goal: [What you want to achieve]
Requirements:
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]

Example: [Show existing pattern or desired output]

Constraints: [Performance, compatibility, or style requirements]
```

---

### ✅ Iterate and Refine

The first response might not be perfect.  
Revise your prompt, regenerate, and refine until the result meets expectations.

**Iteration Strategy:**
1. Start with a clear but concise prompt
2. Review the output for correctness and completeness
3. Provide specific feedback on what to adjust
4. Request focused changes rather than full rewrites
5. Validate each iteration before moving forward

---

## 🧠 Context Management and Workflow Integration

### IDE and Repository Structure

**Manage Relevant Files:**  
Open only the files relevant to the task in your IDE.  
Copilot uses open files as context — irrelevant files dilute suggestions.

**Best Practices:**
- Close unrelated files to reduce noise in context
- Group related files by feature (e.g., component + test + styles)
- Keep configuration files open when working with build/tooling
- Use split views to show related files side-by-side

**Repository Context Tips:**
```
For routing changes: Open src/main.tsx, src/App.tsx, affected pages
For component work: Open the component, its test, parent component
For data updates: Open data file, TypeScript types, consuming components
For styling: Open component, tailwind.config.js, relevant CSS
```

---

### Leverage Repository Instructions

Create `.github/instructions/**/*.instructions.md` files to define:
- Path-specific coding standards
- Naming conventions
- Architectural patterns
- Component composition rules
- Testing requirements

Copilot will automatically follow these guidelines when working in those paths.

**Example Structure:**
```
.github/instructions/
├── components.instructions.md  # React component patterns
├── tests.instructions.md       # Testing standards
├── styles.instructions.md      # CSS/Tailwind conventions
└── data.instructions.md        # Data structure rules
```

---

### Context Window Optimization

GitHub Copilot has a limited context window. Maximize its effectiveness:

**Do:**
- Reference specific file paths in prompts: `"Update the filter logic in src/components/CaseStudies/FilterBar.tsx"`
- Provide type definitions when working with TypeScript
- Include relevant imports and dependencies in context
- Reference existing patterns: `"Follow the structure in src/components/Hero.tsx"`

**Don't:**
- Assume Copilot knows about closed files
- Rely on context from previous unrelated conversations
- Mix multiple unrelated tasks in one prompt

---

### Batch Small Tasks

Use agent mode to batch cleanup tasks like:
- Dependency upgrades
- Minor refactors across multiple files
- Lint fixes and formatting
- Adding missing TypeScript types
- Updating documentation

**Benefits:**
- Creates neatly scoped PRs for easy review
- Reduces context switching
- Maintains consistent style across changes
- Easier to revert if needed

**Example Batch Tasks:**
```
"Update all imports to use path aliases (@/components, @/utils, @/data)"
"Add JSDoc comments to all exported functions in src/utils/"
"Convert all .js files in src/data/ to .ts with proper types"
```

---

### Validation and Review Workflow

Always review Copilot's output before merging.  
AI can generate incorrect, biased, or unsafe code.

**Validation Checklist:**
- [ ] Code runs without errors
- [ ] Tests pass (existing and new)
- [ ] Follows project conventions
- [ ] Handles edge cases
- [ ] No security vulnerabilities
- [ ] Documentation is updated
- [ ] Performance is acceptable
- [ ] Accessibility standards met

**Review Strategy:**
1. **Quick scan:** Check overall structure and approach
2. **Detail review:** Examine logic, error handling, edge cases
3. **Test validation:** Run automated tests and manual checks
4. **Integration check:** Verify changes work with rest of system

---

### Testing and Validation Workflows

Copilot can generate comprehensive test coverage.  
Use this to:
- Cover new logic with unit tests
- Discover edge cases through test generation
- Validate behavior with integration tests
- Generate test data and fixtures

**Test Generation Prompts:**
```
"Create unit tests for the filter logic in src/utils/filterCaseStudies.ts covering:
- Empty input arrays
- Single filter active
- Multiple combined filters
- Invalid filter values
- Case-insensitive matching"

"Add integration tests for the contact form in tests/contact.test.js:
- Successful submission
- Validation errors
- Network failures
- Rate limiting"
```

**Test-Driven Development with Copilot:**
1. Write test descriptions and assertions first
2. Ask Copilot to implement the function to pass tests
3. Review generated implementation
4. Iterate on edge cases

---

### Iteration Strategies for PR Review and Agent Feedback

**Using PR Comments Effectively:**  
When reviewers leave feedback, create focused Copilot prompts:

```
"Address PR comment on lines 45-52 in src/components/FilterBar.tsx:
Extract the filter logic into a custom hook useFilters() and add error handling for invalid filter combinations"
```

**Handling Agent Feedback:**  
If Copilot's initial attempt needs refinement:

1. **Be specific about what's wrong:**
   - ❌ "This doesn't work"
   - ✅ "The filter logic returns duplicates when multiple tags match. Use a Set to deduplicate."

2. **Request incremental fixes:**
   - ✅ "First, fix the type error on line 23"
   - ✅ "Now add error handling for null values"
   - ✅ "Finally, add JSDoc comments"

3. **Provide expected output:**
   ```
   "When input is ['tag1', 'tag2'] and 'tag1' matches 3 items and 'tag2' matches 2 items (1 overlap),
   output should be 4 unique items, not 5"
   ```

**Iterative Refinement Pattern:**
```
Iteration 1: Basic implementation
Iteration 2: Add error handling
Iteration 3: Optimize performance
Iteration 4: Add comprehensive tests
Iteration 5: Update documentation
```

---

## 🔧 MCP Integration and Tool Invocation

### MCP Server Configuration

The Model Context Protocol (MCP) server enables Copilot to interact with repository-specific tools and workflows.

**Configuration Location:** `mcp/config.json`

**Key Settings:**
```json
{
  "name": "mem-rebuild-pl-mcp",
  "version": "1.0.0",
  "root": "../",
  "readOnly": true,
  "allowedPaths": ["src", "public", "scripts", "content"]
}
```

**Environment Variables:**
- `MCP_PORT` - Server port (default: 5174)
- `MCP_AUTH_TOKEN` - Optional authentication token
- `MCP_WRITE_ENABLED` - Enable write operations (default: false)
- `MCP_READONLY` - Force read-only mode
- `AI_DRY_RUN` - Enable dry-run mode for safe testing

---

### Tool Registration and Invocation

**Available MCP Tools in This Repository:**

| Tool Name | Purpose | Example Use |
|-----------|---------|-------------|
| `/health` | Check server status | Verify MCP server is running |
| `/ls` | List directory contents | Explore repository structure |
| `/read` | Read file contents | Review code before modification |
| `/write` | Write file contents | Update files (when enabled) |
| `/search` | Search codebase | Find patterns, references, dependencies |

**Tool Invocation Example:**
```
"Use the MCP /search tool to find all components that import 'framer-motion' and list them"

"Read the contents of src/data/caseStudies.ts using the /read endpoint before making changes"

"Check the MCP server health status at /health endpoint"
```

---

### Dry-Run Mode

Dry-run mode allows you to test AI operations without making actual changes.

**Enabling Dry-Run:**
```bash
export AI_DRY_RUN=true
npm run mcp:start
```

**When to Use Dry-Run:**
- Testing new AI workflows
- Validating tool integrations
- Previewing bulk operations
- Training team members
- Debugging agent behavior

**Dry-Run Prompts:**
```
"In dry-run mode, show me what changes would be made to implement the new filter feature"

"Simulate adding TypeScript types to src/utils/ and report what files would be modified"
```

---

### Monitoring and Observability

**Monitoring Endpoint:** `/api/monitoring/stats`

**Available Metrics:**
```json
{
  "totalChecks": 1250,
  "failures": 3,
  "consecutiveFailures": 0,
  "lastStatus": "ok",
  "lastFailureAt": "2024-01-15T10:30:00Z",
  "lastSuccessAt": "2024-01-15T14:22:15Z",
  "avgResponseMs": 45
}
```

**Monitoring Best Practices:**
- Check `/api/monitoring/stats` before large operations
- Monitor `consecutiveFailures` for stability
- Track `avgResponseMs` for performance regression
- Review failure timestamps to identify patterns

**Monitoring Prompts:**
```
"Check the MCP monitoring stats and report current health status"

"Review the monitoring endpoint and alert if there are consecutive failures"

"Compare current avgResponseMs with previous runs to detect performance issues"
```

---

### MCP Tool Usage Patterns

**Pattern 1: Safe Exploration**
```
1. Check health: "Verify MCP server is running via /health"
2. List contents: "Show me the structure of src/components/ via /ls"
3. Read files: "Read FilterBar.tsx via /read to understand current implementation"
4. Plan changes: "Based on the code, propose modifications"
5. Execute (if approved): "Apply the proposed changes"
```

**Pattern 2: Bulk Operations**
```
1. Enable dry-run: "Set AI_DRY_RUN=true"
2. Test operation: "Show what would change if we add types to all utils"
3. Review output: "Examine proposed changes for correctness"
4. Disable dry-run: "Set AI_DRY_RUN=false"
5. Execute: "Apply the validated changes"
```

**Pattern 3: Debugging**
```
1. Check status: "Review /api/monitoring/stats for errors"
2. Search code: "Use /search to find all error handling patterns"
3. Read problematic files: "Read the files with failures via /read"
4. Analyze: "Identify the root cause based on monitoring data"
5. Fix: "Apply fixes and verify via monitoring endpoint"
```

---

## 🎨 Component Sourcing and Tool Invocation

### Allowlisted Component Domains

This repository integrates with trusted component libraries and design systems.

**Approved Domains:**
- **purecode.ai** - AI-generated UI components
- **superdesign.dev** - Premium design system components
- **pagedone.io** - Open-source component library
- **uipkg.com** - Curated component packages
- **pixelapps.io** - Pixel-perfect UI elements

**Security Note:** Only components from these allowlisted domains should be integrated. Always review component code before adding to the repository.

---

### Component Fetching Workflow

**Tool:** Component fetcher (planned/referenced in problem statement)

**Prompts for Component Sourcing:**
```
"Search purecode.ai for a responsive navigation component with mobile menu and dark mode support"

"Find a contact form component from pagedone.io that includes validation and accessibility features"

"Compare pricing table components from superdesign.dev and uipkg.com - which better matches our design tokens?"

"Fetch the hero section component from pixelapps.io and adapt it to use our color scheme from tailwind.config.js"
```

---

### Component Integration Best Practices

**Before Integration:**
1. **Review component code** - Check for security issues, dependencies, and license
2. **Verify compatibility** - Ensure React version, TypeScript types, and styling approach match
3. **Check accessibility** - Validate ARIA labels, keyboard navigation, and screen reader support
4. **Test responsiveness** - Preview on mobile, tablet, and desktop viewports

**Integration Steps:**
```
1. Create component file: "Add new component to src/components/[Category]/"
2. Adapt styling: "Convert inline styles to Tailwind classes using our design tokens"
3. Add TypeScript types: "Create proper interfaces for props"
4. Write tests: "Add unit tests for component behavior"
5. Update documentation: "Add component to Storybook or component library docs"
```

**Customization Prompts:**
```
"Integrate the hero component from purecode.ai but customize:
- Replace their color palette with our brand colors from tailwind.config.js
- Change typography to use our font stack
- Add animations using framer-motion like our existing components
- Ensure it follows our naming conventions"
```

---

### Design System Consistency

When sourcing components, maintain consistency with existing design system:

**Design Tokens to Reference:**
- Colors: `tailwind.config.js` theme colors
- Typography: Font families, sizes, weights
- Spacing: Consistent margin/padding scale
- Shadows: Elevation system
- Border radius: Consistent rounding values
- Animation: Framer Motion presets

**Consistency Check Prompts:**
```
"Review the new component against our design tokens and list any inconsistencies"

"Refactor the sourced component to use design tokens from tailwind.config.js instead of hardcoded values"

"Compare the component's animation style with our existing patterns in src/animations/ and align them"
```

---

## 👁️ Vision Model Integration for UI Tasks

### When to Use Vision Models

GitHub Copilot's vision capabilities can understand visual context from screenshots, mockups, and designs.

**Best Use Cases:**
- **Bug Fixes:** Screenshot showing UI bug to explain exact issue
- **Design Implementation:** Converting mockups/designs to code
- **UI Refinement:** Comparing current implementation with desired design
- **Responsive Issues:** Screenshots at different breakpoints
- **Accessibility Review:** Visual review of contrast, spacing, focus states

---

### Preparing Screenshots for Vision Analysis

**Screenshot Best Practices:**
1. **Clear and focused** - Show only relevant UI area
2. **High resolution** - Ensure text and details are readable
3. **Multiple views** - Include different states (hover, active, error)
4. **Context included** - Show surrounding UI for context
5. **Annotations** - Add arrows, circles, or notes to highlight issues

**Good Screenshot Examples:**
- "Here's the navigation bar with the alignment issue (see red arrow)"
- "Before/after screenshots showing the spacing problem"
- "Mobile screenshot showing broken layout at 375px width"
- "Screenshot of the form with validation errors displayed"

---

### Vision-Enabled Prompts

**Bug Fixing with Screenshots:**
```
"[Attach screenshot] The button in this screenshot is misaligned in Safari. 
Fix the CSS in src/components/Hero.tsx to match the expected design."

"[Attach screenshot] The mobile menu overlaps the logo at 768px breakpoint. 
Review the styles and correct the z-index and positioning."
```

**Design Implementation:**
```
"[Attach mockup] Implement this hero section design in src/components/Hero.tsx:
- Match the exact spacing and typography
- Use our design tokens from tailwind.config.js
- Add the gradient background effect shown
- Implement the hover states for buttons"

"[Attach screenshot] Recreate this card layout using CSS Grid:
- Responsive: 1 column mobile, 2 tablet, 3 desktop
- Match the shadows and border radius shown
- Implement the hover lift effect"
```

**Responsive Design:**
```
"[Attach 3 screenshots: mobile/tablet/desktop] Make this component responsive:
- Match the layout shown at each breakpoint
- Ensure text remains readable
- Adjust spacing proportionally
- Test in Chrome DevTools"
```

**Accessibility Review:**
```
"[Attach screenshot] Review this form for accessibility issues:
- Check color contrast (WCAG AA)
- Verify focus indicators are visible
- Ensure error messages are clear
- Add ARIA labels where needed"
```

---

### Vision Model Workflow

**Step-by-Step Process:**

1. **Capture Visual Context**
   - Take screenshot of current state or desired design
   - Annotate if needed to highlight specific areas
   - Include multiple views if relevant (states, breakpoints)

2. **Attach to Prompt**
   - Include screenshot(s) in your Copilot prompt
   - Add clear description of what you want
   - Reference specific elements by visual description

3. **Provide Technical Context**
   - Specify file paths to modify
   - Mention relevant technologies (Tailwind, Framer Motion, etc.)
   - Reference design system tokens if applicable

4. **Review Generated Code**
   - Check if implementation matches visual design
   - Validate responsive behavior
   - Test interaction states
   - Verify accessibility

5. **Iterate if Needed**
   - Take new screenshots showing remaining issues
   - Provide specific feedback on differences
   - Request focused adjustments

---

### UI Workflow Examples

**Example 1: Implementing a Mockup**
```
Prompt: "[Attach Figma screenshot] Implement this case study card design:

Visual requirements from screenshot:
- Gradient border as shown in mockup
- Hover effect: lift and glow
- Title in our heading-3 style
- Metrics in grid layout (2 columns)
- Tag pills at bottom with our brand colors

Technical requirements:
- Add to src/components/CaseStudies/CaseStudyCard.tsx
- Use Tailwind for styling
- Add framer-motion hover animation
- Ensure responsive (stack metrics on mobile)
- Follow our component structure patterns

Design tokens to use:
- Colors: from tailwind.config.js theme
- Spacing: our scale (4, 8, 16, 24, 32)
- Shadow: elevation-2
- Border radius: our standard 12px"
```

**Example 2: Fixing Layout Bug**
```
Prompt: "[Attach screenshot with annotations] Fix the layout issues marked in red:

Issue 1 (top): Navigation items wrapping on tablet
- Current: Items break to 2 rows at 768px
- Expected: Should stay in 1 row until 640px
- File: src/components/Navigation.tsx

Issue 2 (middle): Card heights uneven
- Current: Cards have different heights
- Expected: All cards same height in row
- File: src/components/CaseStudies/CaseStudyGrid.tsx

Issue 3 (bottom): Footer content overlapping on mobile
- Current: Sections overlap at 375px
- Expected: Stack vertically with 24px gap
- File: src/components/Footer.tsx"
```

**Example 3: Matching Existing Design**
```
Prompt: "[Attach 2 screenshots: current vs. target] Make the new component match the design:

Current state (screenshot 1): Basic unstyled component
Target state (screenshot 2): Polished design

Differences to implement:
- Add gradient background (blue to purple)
- Increase padding to match target spacing
- Change button style to match our primary CTA
- Add subtle shadow under card
- Adjust font sizes to match target
- Add icon to the left of title (same as screenshot)

File: src/components/NewFeature.tsx
Follow patterns from: src/components/Hero.tsx"
```

---

## 🧪 Verification and Validation Checklist

Before considering any Copilot-assisted task complete, verify:

### Code Quality
- [ ] Prompt was scoped and structured clearly
- [ ] Task matches Copilot's strengths (not forcing it to do unsuitable work)
- [ ] Code follows project conventions and style guide
- [ ] TypeScript types are accurate and complete
- [ ] No linting errors or warnings
- [ ] Code is readable and well-documented

### Functionality
- [ ] Feature works as intended
- [ ] Edge cases are handled properly
- [ ] Error handling is comprehensive
- [ ] Performance is acceptable
- [ ] No regressions in existing features

### Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] New tests added for new functionality
- [ ] Test coverage is adequate
- [ ] Manual testing completed

### MCP and Tooling
- [ ] MCP tools are registered and reachable
- [ ] Monitoring endpoint shows healthy status
- [ ] Dry-run mode tested (if applicable)
- [ ] No errors in MCP server logs

### Documentation
- [ ] Code comments are clear and helpful
- [ ] README updated (if needed)
- [ ] API documentation updated
- [ ] Component documentation added
- [ ] Migration guide written (for breaking changes)

### Review and Iteration
- [ ] PR comments addressed
- [ ] Agent feedback incorporated
- [ ] Code reviewed by team member
- [ ] Design review passed (for UI changes)
- [ ] Accessibility review passed

---

## 📚 Additional Resources

### Related Documentation
- [Issue Templates](.github/ISSUE_TEMPLATE/) - Bug reports and feature requests
- [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md) - PR guidelines
- [MCP Configuration](../mcp/config.json) - Tool configuration and paths
- [MCP Server Implementation](../mcp/server.js) - API endpoints and monitoring

### Repository-Specific Tools
- **MCP Server:** `npm run mcp:start`
- **MCP Tests:** `npm run mcp:test`
- **MCP Linting:** `npm run mcp:lint`
- **Monitoring:** Visit `/api/monitoring/stats` when server is running

### Secrets and Environment
- `COPILOT_MCP_OPENAI_API_KEY` - OpenAI API key for MCP integrations
- `AI_DRY_RUN` - Enable safe testing mode
- `MCP_PORT` - Custom port for MCP server
- `MCP_AUTH_TOKEN` - Optional authentication

### Best Practices Summary
1. **Be specific** in your prompts with file paths and requirements
2. **Break down** complex tasks into manageable phases
3. **Use examples** to guide Copilot's output style
4. **Iterate** on responses until they meet your standards
5. **Validate** all generated code before committing
6. **Test** thoroughly with both automated and manual testing
7. **Monitor** MCP health and performance metrics
8. **Document** changes and update related docs
9. **Review** with team members before merging
10. **Learn** from each interaction to improve future prompts

---

> **Pro Tip:** Start each work session by reviewing this guide's relevant sections. The more you practice structured prompting and validation, the better results you'll get from GitHub Copilot.

> **For Contributors:** When creating issues for Copilot tasks, use the [issue templates](.github/ISSUE_TEMPLATE/) to ensure all necessary context is provided.
