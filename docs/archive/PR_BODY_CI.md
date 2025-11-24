## Executive Summary

- Add CI workflow to run typecheck/build, Storybook build (if configured), pa11y accessibility checks, and Lighthouse CI (LHCI).
- Accessibility job runs against the built Storybook static site (storybook-static) and fails on severe violations.
- Lighthouse CI runs via LHCI autorun (uploads to temporary-public-storage by default).

## Files Added

- `.github/workflows/ci-a11y.yml`
- `scripts/run-a11y.sh`
- `scripts/run-lighthouse.sh`
- `.pa11yci`
- `.lighthouserc.js`
- `docs/ci-a11y.md`

## How to Run Locally

1. `npm ci`
2. `npm run build` (or `npx tsc --noEmit`)
3. `npm run build-storybook`
4. `./scripts/run-a11y.sh`
5. `LHCI_URL="http://localhost:9001" ./scripts/run-lighthouse.sh`

## Notes

- The workflow expects Storybook artifacts at `storybook-static`. If your Storybook output differs, update `.github/workflows/ci-a11y.yml` and `.lighthouserc.js`.
- To run Lighthouse CI against PR preview URLs, configure `LHCI_URL` via repository or environment secrets and update the workflow.

