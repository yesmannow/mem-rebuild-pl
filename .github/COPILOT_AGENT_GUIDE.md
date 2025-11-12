# 🧠 Copilot Coding Agent Guide

To get the best results from GitHub Copilot coding agent, focus on clear communication, scoped tasks, and iterative refinement. This guide applies to all workflows in this repo — from AI tooling to component sourcing and design system evolution.

---

## ✍️ Effective Prompting Techniques

### ✅ Be Specific and Detailed
Vague instructions lead to generic results. Always define:
- The goal
- The context
- The expected outcome
- Any constraints or requirements

**Example:**  
❌ "Improve this function"  
✅ "Refactor `processData` to reduce time complexity and improve readability"

---

### ✅ Break Down Complex Tasks
Large tasks should be split into modular subtasks.  
Start with a high-level plan, then assign each part to Copilot separately.

---

### ✅ Use Positive Instructions
Tell Copilot what to do, not what to avoid.  
✅ "Use `const` or `let` for all variable declarations"  
❌ "Don't use `var`"

---

### ✅ Provide Examples (Few-Shot Prompting)
Include examples of input/output, coding style, or expected behavior.  
This helps Copilot follow patterns already used in your codebase.

---

### ✅ Structure Your Prompts
Use clear syntax, punctuation, and delimiters.  
Separate instructions from examples or context.  
Later parts of a prompt may be emphasized more.

---

### ✅ Iterate and Refine
The first response might not be perfect.  
Revise your prompt, regenerate, and refine until the result meets expectations.

---

## 🧠 Context Management and Workflow Integration

### ✅ Manage Relevant Files
Open only the files relevant to the task in your IDE.  
Copilot uses open files as context — irrelevant files dilute suggestions.

---

### ✅ Leverage Repository Instructions
Create `.github/instructions/**/*.instructions.md` files to define:
- Path-specific coding standards
- Naming conventions
- Architectural patterns

Copilot will automatically follow these guidelines.

---

### ✅ Use the Right Tool for the Job

| Mode            | Best For                                                                 |
|-----------------|--------------------------------------------------------------------------|
| Inline Suggestions | Quick snippets, variable names, small edits                          |
| Copilot Chat       | Brainstorming, code explanations, Q&A                               |
| Agent Mode         | Multi-file changes, repo-wide refactors, tool invocation            |

---

### ✅ Batch Small Tasks
Use agent mode to batch cleanup tasks like:
- Dependency upgrades
- Minor refactors
- Lint fixes

This results in neatly scoped PRs for easy review.

---

### ✅ Validate and Review
Always review Copilot’s output before merging.  
AI can generate incorrect, biased, or unsafe code.

---

### ✅ Incorporate Testing
Copilot can generate unit tests.  
Use this to:
- Cover new logic
- Discover edge cases
- Validate behavior

---

### ✅ Utilize Vision Models (if available)
For UI tasks, attach screenshots of bugs or mockups.  
Copilot can use these images to understand visual context.

---

## ✅ Repo-Specific Enhancements

This repo includes:
- AI endpoints: `summarize_logs`, `suggest_patch`, `generate_tokens`
- MCP config: `mcp/config.json`
- Component sourcing: `scripts/component-fetcher.js`
- Monitoring: `/api/monitoring/stats`
- Dry-run mode: `AI_DRY_RUN=true`
- Secrets: `COPILOT_MCP_OPENAI_API_KEY`

Use these tools to extend Copilot’s capabilities and automate workflows.

---

## 🧪 Verification Checklist

- [ ] Prompt is scoped and structured
- [ ] Task matches Copilot’s strengths
- [ ] MCP tool is registered and reachable
- [ ] Comments guide PR iteration
- [ ] Monitoring and dry-run modes are active
- [ ] Tests and docs are updated

---

> For issue templates, use `.github/ISSUE_TEMPLATE/copilot-task.md` to guide contributors in writing Copilot-friendly tasks.
