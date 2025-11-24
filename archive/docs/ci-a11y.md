# CI: Accessibility and Lighthouse Checks

This document explains the CI jobs added to run type checks, accessibility tests, and Lighthouse CI.

## What the workflow does

- **Build & typecheck**: runs `npm ci` and `npm run build` (or `tsc --noEmit`) to validate the repo.
- **Storybook build (optional)**: `npm run build-storybook` if present; artifact uploaded for A11Y tests.
- **Accessibility (pa11y / pa11y-ci)**: serves the built Storybook static site and runs pa11y-ci using `.pa11yci` configuration.
- **Lighthouse CI**: runs LHCI autorun and uploads results to temporary public storage (or configured LHCI server), failing on low scores.

## How to run locally

1. Install dependencies:
   ```bash
   npm ci
   ```

2. Build storybook:
   ```bash
   npm run build-storybook
   ```

3. Run accessibility test:
   ```bash
   ./scripts/run-a11y.sh
   ```

4. Run Lighthouse:
   ```bash
   LHCI_URL="http://localhost:9001" ./scripts/run-lighthouse.sh
   ```

## Required repository secrets (optional)

- `LHCI_GITHUB_APP_TOKEN` or `LHCI_URL` if you want to push Lighthouse results to a CI server.
- No secrets are required to run the local scripts.

## Notes and troubleshooting

- The workflow expects `storybook-static` as the build output directory. Adjust `.lighthouserc.js` or workflow if your build output differs.
- The CI job will fail if pa11y finds accessibility issues (severity "error"). Use the generated `pa11y-report.json` to triage.

