# CLI Tools Documentation

This document describes all the CLI tools available for improving and maintaining the site.

## 📋 Quick Reference

### Code Quality
```bash
npm run lint              # Check code with ESLint
npm run lint:fix          # Fix ESLint issues automatically
npm run format            # Format code with Prettier
npm run format:check      # Check code formatting
npm run typecheck         # TypeScript type checking
```

### Performance & Quality Assurance
```bash
npm run audit:lighthouse      # Run Lighthouse audit
npm run audit:accessibility   # Run accessibility audit
npm run check:links            # Check for broken links
npm run check:images           # Validate image references
npm run monitor:size           # Monitor bundle size
```

### SEO & Content
```bash
npm run validate:seo          # Validate SEO meta tags
npm run validate:content       # Validate content quality
npm run validate:routes        # Validate all routes
npm run generate:sitemap       # Generate sitemap.xml
```

### Analysis & Optimization
```bash
npm run analyze:bundle         # Analyze bundle composition
npm run analyze:dead-code      # Find potentially unused code
npm run optimize:images        # Optimize images
npm run check:deps             # Check for outdated dependencies
```

### Pre-Deployment
```bash
npm run predeploy              # Quick pre-deployment check
npm run predeploy:full         # Full pre-deployment checklist
npm run validate:all           # Run all validations
npm run audit:all              # Run all audits
```

---

## 🔧 Detailed Usage

### 1. Lighthouse Audit (`audit:lighthouse`)

Runs Lighthouse performance audits and generates reports.

**Usage:**
```bash
npm run audit:lighthouse [url] [--device=desktop|mobile] [--output=report.html]
```

**Examples:**
```bash
# Audit local preview
npm run build && npm run preview
npm run audit:lighthouse http://localhost:4173

# Audit production
npm run audit:lighthouse https://www.bearcavemarketing.com --device=mobile

# Custom output location
npm run audit:lighthouse http://localhost:4173 --output=reports/lighthouse.html
```

**Output:**
- HTML report: `reports/lighthouse-report.html`
- JSON report: `reports/lighthouse-report.json`
- Console summary with scores and Core Web Vitals

**Requirements:**
- Lighthouse CLI (installed via npm or npx)
- Built site in `dist/` directory

---

### 2. Accessibility Audit (`audit:accessibility`)

Runs accessibility checks using pa11y.

**Usage:**
```bash
npm run audit:accessibility [url] [--output=report.json]
```

**Examples:**
```bash
npm run audit:accessibility http://localhost:4173
npm run audit:accessibility https://www.bearcavemarketing.com
```

**Output:**
- JSON report: `reports/a11y-report.json`
- Summary of errors, warnings, and notices

**Requirements:**
- pa11y (install with `npm install -g pa11y`)

---

### 3. Link Checker (`check:links`)

Validates internal and external links.

**Usage:**
```bash
npm run check:links [--base-url=http://localhost:4173] [--check-external]
```

**Examples:**
```bash
# Check internal links only
npm run check:links --base-url=http://localhost:4173

# Check external links too
npm run check:links --base-url=https://www.bearcavemarketing.com --check-external
```

**Output:**
- JSON report: `reports/link-check-report.json`
- List of broken links
- Warnings for hardcoded localhost URLs

---

### 4. Image Checker (`check:images`)

Validates image references and finds missing/broken images.

**Usage:**
```bash
npm run check:images [--check-dist] [--check-src]
```

**Examples:**
```bash
# Check source files
npm run check:images --check-src

# Check built files
npm run check:images --check-dist

# Check both
npm run check:images --check-src --check-dist
```

**Output:**
- JSON report: `reports/image-check-report.json`
- List of missing images
- List of potentially unused images

---

### 5. SEO Validator (`validate:seo`)

Validates SEO meta tags, Open Graph, Twitter Cards, and structured data.

**Usage:**
```bash
npm run validate:seo [--url=http://localhost:4173] [--check-all-pages]
```

**Examples:**
```bash
# Check homepage only
npm run validate:seo --url=http://localhost:4173

# Check all pages from sitemap
npm run validate:seo --url=https://www.bearcavemarketing.com --check-all-pages
```

**Output:**
- JSON report: `reports/seo-validation-report.json`
- Issues with missing or invalid meta tags
- Warnings for suboptimal tag lengths

**Checks:**
- Required meta tags (title, description, og:title, og:description, og:image)
- Meta tag length validation
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)

---

### 6. Content Validator (`validate:content`)

Validates content quality, spelling, and markdown links.

**Usage:**
```bash
npm run validate:content [--check-spelling] [--check-markdown]
```

**Examples:**
```bash
# Full content check
npm run validate:content --check-spelling --check-markdown

# Just markdown
npm run validate:content --check-markdown
```

**Output:**
- JSON report: `reports/content-validation-report.json`
- Spelling errors
- Broken markdown links
- Missing image alt text
- Placeholder text warnings

**Requirements:**
- cspell for spelling checks (already configured)

---

### 7. Route Validator (`validate:routes`)

Validates that all routes are accessible and properly configured.

**Usage:**
```bash
npm run validate:routes [--base-url=http://localhost:4173]
```

**Examples:**
```bash
npm run validate:routes --base-url=http://localhost:4173
npm run validate:routes --base-url=https://www.bearcavemarketing.com
```

**Output:**
- JSON report: `reports/route-validation-report.json`
- List of accessible routes
- List of broken routes
- List of redirect routes

---

### 8. Bundle Size Monitor (`monitor:size`)

Tracks bundle size over time and alerts on increases.

**Usage:**
```bash
npm run monitor:size [--compare] [--threshold=100]
```

**Examples:**
```bash
# Initial size check
npm run monitor:size

# Compare with previous build
npm run monitor:size --compare

# Alert if size increases by more than 50KB
npm run monitor:size --compare --threshold=50
```

**Output:**
- JSON report: `reports/bundle-size-report.json`
- Size history: `reports/bundle-size-history.json`
- Breakdown by file type (JS, CSS, images)
- Largest files list

---

### 9. Dead Code Finder (`analyze:dead-code`)

Finds potentially unused exports, files, and CSS.

**Usage:**
```bash
npm run analyze:dead-code [--check-exports] [--check-files] [--check-css]
```

**Examples:**
```bash
# Check all
npm run analyze:dead-code --check-exports --check-files --check-css

# Just exports
npm run analyze:dead-code --check-exports
```

**Output:**
- JSON report: `reports/dead-code-report.json`
- List of potentially unused exports
- List of potentially unused files
- List of potentially unused CSS classes

**Note:** This is a heuristic analysis. Review carefully before removing code.

---

### 10. Pre-Deployment Checklist (`predeploy:full`)

Runs comprehensive pre-deployment validation.

**Usage:**
```bash
npm run predeploy:full [--skip-build] [--url=http://localhost:4173]
```

**Examples:**
```bash
# Full check (builds first)
npm run predeploy:full

# Skip build if already built
npm run predeploy:full --skip-build

# Check production URL
npm run predeploy:full --url=https://www.bearcavemarketing.com
```

**Checks:**
1. TypeScript type checking
2. Production build
3. Bundle size comparison
4. Link validation
5. Image validation
6. SEO validation
7. Content validation
8. Route validation
9. Console.log check
10. Environment variables check

**Output:**
- JSON report: `reports/pre-deploy-report.json`
- Summary of all checks
- Deployment readiness status

---

## 📊 Report Locations

All reports are saved to the `reports/` directory:

```
reports/
├── lighthouse-report.html
├── lighthouse-report.json
├── a11y-report.json
├── link-check-report.json
├── image-check-report.json
├── seo-validation-report.json
├── content-validation-report.json
├── route-validation-report.json
├── bundle-size-report.json
├── bundle-size-history.json
├── dead-code-report.json
└── pre-deploy-report.json
```

---

## 🚀 Workflow Examples

### Daily Development
```bash
# Format code
npm run format

# Check for issues
npm run lint
npm run typecheck
```

### Before Committing
```bash
# Quick checks
npm run lint:fix
npm run format
npm run typecheck
```

### Before Deploying
```bash
# Full validation
npm run predeploy:full

# Or step by step
npm run build
npm run validate:all
npm run audit:all
```

### Performance Monitoring
```bash
# Build and audit
npm run build
npm run preview
npm run audit:lighthouse http://localhost:4173

# Monitor bundle size
npm run monitor:size --compare
```

---

## 🔧 Installation Requirements

Some tools require additional dependencies:

```bash
# Lighthouse (optional - uses npx if not installed)
npm install -g lighthouse

# pa11y for accessibility (optional - uses npx if not installed)
npm install -g pa11y

# ESLint and Prettier (already in devDependencies)
npm install
```

---

## 💡 Tips

1. **Run `predeploy:full` before every deployment** to catch issues early
2. **Use `monitor:size --compare`** to track bundle size over time
3. **Check `validate:all`** weekly to maintain content quality
4. **Run `audit:lighthouse`** after major changes to track performance
5. **Use `analyze:dead-code`** periodically to clean up unused code

---

## 🐛 Troubleshooting

### Scripts fail with "command not found"
- Ensure you've run `npm install` to install dependencies
- Some tools use `npx` as fallback if not installed globally

### Reports directory doesn't exist
- Scripts create it automatically, but you can create it manually: `mkdir reports`

### Lighthouse/pa11y not found
- Install globally: `npm install -g lighthouse pa11y`
- Or scripts will use `npx` automatically

### Build required but dist doesn't exist
- Run `npm run build` first
- Or use `--skip-build` flag where supported

---

## 📝 Notes

- All scripts output JSON reports for programmatic access
- Scripts exit with code 1 on failure (useful for CI/CD)
- Most scripts support custom output paths via `--output` flag
- Reports are cumulative - history is maintained where applicable

