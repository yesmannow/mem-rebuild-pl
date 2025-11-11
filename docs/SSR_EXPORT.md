# Static Resume Export

## Overview

The resume export script (`scripts/export-resume.cjs`) generates a pre-rendered static HTML version of the resume at build time. This ensures that crawlers, share links, and users without JavaScript can access the resume content.

## How It Works

1. **Data Source**: Reads resume data from `src/data/resume.json` (or `public/resume.json` as fallback)
2. **Output**: Generates `dist/resume/index.html` with static HTML
3. **Template**: Uses a simple HTML template (no React/SSR dependencies)
4. **Build Integration**: Runs automatically via `build:export` script

## Usage

### Manual Export

```bash
npm run export-resume
# or
pnpm export-resume
```

### Build with Export

```bash
npm run build:export
# or
pnpm build:export
```

### Preview Static File

```bash
npx serve dist
# Then visit http://localhost:3000/resume/index.html
```

## Customization

### Modify Template

Edit `scripts/export-resume.cjs` and update the `renderHtml()` function:

- Change styling: Modify the `<style>` block
- Add sections: Extend the template with additional resume fields
- Change structure: Update the HTML structure as needed

### Change Data Source

Update `DATA_PATHS` array in the script to read from different locations.

### Output Location

Change `OUT_DIR` and `OUT_FILE` constants to write to a different path.

## CI Integration

The export runs automatically in CI as part of the build process. The CI workflow verifies that `dist/resume/index.html` exists after the export step.

## Notes

- The script is framework-agnostic and doesn't require React or SSR infrastructure
- HTML is escaped for security (XSS prevention)
- The static file is optimized for both web and print media
- Generated HTML includes proper meta tags for SEO

