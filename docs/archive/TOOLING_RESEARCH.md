# Tooling Research & Recommendations

**Date:** 2025-11-12  
**Repository:** yesmannow/mem-rebuild-pl  
**Purpose:** High-value tooling recommendations for debugging, QA, and design system

---

## Executive Summary

This document provides curated tooling recommendations across 4 categories:
1. **Debugging & Observability** - Error tracking, replay, telemetry
2. **Local Dev & Testing** - Component dev, E2E, visual regression
3. **Design System Tooling** - Token management, accessibility
4. **Web Platform Best Practices** - MIME types, service workers, performance

All recommendations include:
- Setup effort estimate (hours)
- Cost analysis with free alternatives
- Impact rating (1-5, where 5 = highest value)
- Integration complexity

---

## 1. Debugging & Observability Tools

### Summary Table

| Tool | Purpose | Impact | Setup (hrs) | Cost/Year | Free Alternative |
|------|---------|--------|-------------|-----------|------------------|
| **Sentry** | Error tracking & monitoring | 5 | 2-4 | $26/mo ($312/yr) | Self-hosted Sentry OSS (free) |
| **Sentry Session Replay** | User session recording | 4 | 1-2 | Included in Team plan | LogRocket free tier (1k sessions/mo) |
| **OpenTelemetry + Honeycomb** | Distributed tracing | 4 | 8-12 | $0-$200/mo | Jaeger self-hosted (free) |
| **Logflare** | Log aggregation | 3 | 2-3 | Free tier (5GB/mo) | Loki + Grafana (self-hosted, free) |
| **Lighthouse CI** | Performance monitoring | 5 | 1-2 | Free | N/A |
| **Web Vitals** | Core Web Vitals tracking | 5 | 1 | Free | N/A |

### Detailed Recommendations

#### 1.1 Sentry (Error Tracking) ⭐⭐⭐⭐⭐
**Purpose:** Real-time error tracking, alerting, and performance monitoring

**Why Choose It:**
- Industry standard for JavaScript error tracking
- Excellent React/Vite integration
- Automatic source map support
- Breadcrumbs for debugging context
- Release tracking and deploy notifications

**Setup:**
```bash
npm install --save @sentry/react @sentry/vite-plugin
```

```javascript
// vite.config.js
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "your-org",
      project: "mem-rebuild-pl",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});

// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**Cost:** 
- Developer plan: Free (5k errors/mo, 1 project)
- Team plan: $26/mo (50k errors/mo, includes Session Replay)
- **Free Alternative:** Self-hosted Sentry OSS (requires infrastructure)

**Impact:** ⭐⭐⭐⭐⭐ (Critical for production debugging)

---

#### 1.2 Sentry Session Replay ⭐⭐⭐⭐
**Purpose:** Record user sessions to understand how errors occur

**Why Choose It:**
- Built into Sentry (no additional setup)
- Privacy controls (mask sensitive data)
- Automatically captures sessions with errors
- Network request waterfall
- Console logs and breadcrumbs

**Cost:** Included in Team plan ($26/mo)

**Free Alternative:** LogRocket free tier (1,000 sessions/month)

**Impact:** ⭐⭐⭐⭐ (Extremely valuable for debugging user-reported issues)

---

#### 1.3 OpenTelemetry + Honeycomb ⭐⭐⭐⭐
**Purpose:** Distributed tracing and observability for complex systems

**Why Choose It:**
- Vendor-neutral telemetry standard
- Trace requests across frontend, MCP server, and APIs
- Query-based debugging (not just dashboards)
- Honeycomb's generous free tier

**Setup:**
```bash
npm install --save @opentelemetry/api @opentelemetry/sdk-trace-web \
  @opentelemetry/instrumentation-fetch @opentelemetry/instrumentation-xml-http-request
```

```javascript
// src/telemetry.ts
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const provider = new WebTracerProvider();
provider.addSpanProcessor(
  new BatchSpanProcessor(
    new OTLPTraceExporter({
      url: 'https://api.honeycomb.io/v1/traces',
      headers: { 'x-honeycomb-team': process.env.VITE_HONEYCOMB_KEY },
    })
  )
);

registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      ignoreUrls: [/localhost/],
    }),
  ],
});
```

**Cost:**
- Honeycomb Free: 20M events/mo
- Honeycomb Pro: $200+/mo (for larger teams)
- **Free Alternative:** Jaeger (self-hosted, requires Kubernetes/Docker)

**Impact:** ⭐⭐⭐⭐ (Essential for distributed systems, overkill for simple sites)

**Recommendation:** Start with Sentry. Add OpenTelemetry if MCP server becomes complex.

---

#### 1.4 Logflare ⭐⭐⭐
**Purpose:** Log aggregation and real-time log tailing

**Why Choose It:**
- Built for Cloudflare ecosystem
- SQL queries over logs
- Real-time log streaming
- Generous free tier

**Setup:**
```javascript
// src/logger.ts
import { Logger } from '@logtail/browser';

const logger = new Logger(process.env.VITE_LOGFLARE_TOKEN);

logger.info('Page loaded', { route: window.location.pathname });
logger.error('API error', { endpoint: '/api/data', statusCode: 500 });
```

**Cost:**
- Free tier: 5GB/mo, 30-day retention
- Pro: $25/mo (50GB/mo)
- **Free Alternative:** Loki + Grafana (self-hosted)

**Impact:** ⭐⭐⭐ (Nice to have, not critical for small projects)

---

#### 1.5 Lighthouse CI ⭐⭐⭐⭐⭐
**Purpose:** Automated performance and accessibility audits in CI

**Why Choose It:**
- Already in package.json (@lhci/cli)
- Catches performance regressions before deploy
- Free and open source
- Integrates with GitHub Actions

**Setup:**
```yaml
# .github/workflows/ci.yml
- name: Run Lighthouse CI
  run: |
    npm run build
    npm run perf:ci
  env:
    LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

**Cost:** Free

**Impact:** ⭐⭐⭐⭐⭐ (Essential for maintaining performance standards)

**Status:** ✅ Already configured in `.lighthouserc.js`

---

## 2. Local Dev & Testing Tools

### Summary Table

| Tool | Purpose | Impact | Setup (hrs) | Cost/Year | Free Alternative |
|------|---------|--------|-------------|-----------|------------------|
| **Storybook** | Component development & docs | 5 | 4-8 | Free | N/A |
| **Playwright** | E2E testing | 5 | 4-6 | Free | Cypress (similar) |
| **Vitest** | Unit testing (Vite-native) | 4 | 2-4 | Free | Jest (already in use) |
| **MSW** | API mocking | 4 | 2-3 | Free | N/A |
| **Chromatic** | Visual regression testing | 4 | 2-3 | $149/mo ($1,788/yr) | Percy, Playwright screenshots |
| **Testing Library** | Component testing | 5 | 1-2 | Free | N/A |

### Detailed Recommendations

#### 2.1 Storybook ⭐⭐⭐⭐⭐
**Purpose:** Isolated component development, documentation, and visual testing

**Why Choose It:**
- Build components in isolation (no full app context needed)
- Automatic documentation
- Accessibility addon (axe)
- Visual regression testing with Chromatic
- Design handoff tool for designers

**Setup:**
```bash
npx storybook@latest init
```

```typescript
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};
```

**Cost:** Free (Chromatic visual regression is paid)

**Impact:** ⭐⭐⭐⭐⭐ (Game-changer for component-driven development)

**Status:** ⚠️ Partial setup in `.storybook/` but not actively used

**Recommendation:** **HIGH PRIORITY** - Complete Storybook setup with:
- Component stories for all UI components
- Design system documentation
- Accessibility testing addon
- Interaction testing addon

---

#### 2.2 Playwright ⭐⭐⭐⭐⭐
**Purpose:** End-to-end browser testing with excellent developer experience

**Why Choose It:**
- Fast, reliable, parallelizable
- Multi-browser support (Chromium, Firefox, WebKit)
- Built-in screenshot/video recording
- Trace viewer for debugging
- Component testing support

**Setup:**
```bash
npm install -D @playwright/test
npx playwright install
```

```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads and displays hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /bear cave/i })).toBeVisible();
  await expect(page).toHaveScreenshot('homepage.png');
});
```

**Cost:** Free

**Impact:** ⭐⭐⭐⭐⭐ (Essential for preventing regressions)

**Status:** ✅ Already installed (`@playwright/test` in devDependencies)

**Recommendation:** Expand E2E coverage:
- Homepage flow
- Contact form submission
- Portfolio navigation
- MCP server integration tests

---

#### 2.3 Vitest ⭐⭐⭐⭐
**Purpose:** Vite-native unit testing (faster than Jest for Vite projects)

**Why Choose It:**
- 10x faster than Jest for Vite projects
- Same API as Jest (easy migration)
- Native ESM support
- Built-in code coverage

**Setup:**
```bash
npm install -D vitest @vitest/ui
```

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
```

**Cost:** Free

**Impact:** ⭐⭐⭐⭐ (Valuable for Vite projects, but Jest already works)

**Recommendation:** Consider migrating from Jest to Vitest for:
- Faster test execution
- Better Vite integration
- Native ESM support

**Migration Effort:** 2-4 hours (mostly config changes)

---

#### 2.4 MSW (Mock Service Worker) ⭐⭐⭐⭐
**Purpose:** API mocking for testing and development

**Why Choose It:**
- Intercept network requests in browser and Node
- Same mock setup for tests and Storybook
- No dependency injection needed

**Setup:**
```bash
npm install -D msw
npx msw init public/
```

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/portfolio', () => {
    return HttpResponse.json({
      projects: [{ id: 1, title: 'Project 1' }],
    });
  }),
];
```

**Cost:** Free

**Impact:** ⭐⭐⭐⭐ (Essential for testing components that fetch data)

**Recommendation:** Add MSW for:
- Testing MCP server interactions
- Storybook data states (loading, error, empty)
- E2E test fixtures

---

#### 2.5 Chromatic (Visual Regression) ⭐⭐⭐⭐
**Purpose:** Automated visual testing for Storybook components

**Why Choose It:**
- Pixel-perfect visual diffs
- CI integration
- Review UI for design changes
- Catches unintended CSS changes

**Setup:**
```bash
npm install -D chromatic
npx chromatic --project-token=YOUR_TOKEN
```

**Cost:**
- Free: 5,000 snapshots/month
- Starter: $149/mo (25,000 snapshots)
- **Free Alternative:** Playwright visual comparison, Percy (similar pricing)

**Impact:** ⭐⭐⭐⭐ (Prevents UI regressions, expensive at scale)

**Recommendation:** Start with free tier. Use Playwright screenshots if Chromatic becomes expensive.

---

## 3. Design System Tooling

### Summary Table

| Tool | Purpose | Impact | Setup (hrs) | Cost/Year | Free Alternative |
|------|---------|--------|-------------|-----------|------------------|
| **Style Dictionary** | Design token management | 4 | 4-6 | Free | N/A |
| **Tailwind IntelliSense** | Autocomplete & linting | 5 | 0.5 | Free | N/A |
| **Figma Dev Mode** | Design-to-code handoff | 4 | N/A | $12/seat/mo ($144/yr) | Figma free tier |
| **Radix UI** | Accessible component primitives | 5 | 1-2 | Free | Headless UI (similar) |
| **axe DevTools** | Accessibility testing | 5 | 0.5 | Free | N/A |

### Detailed Recommendations

#### 3.1 Style Dictionary ⭐⭐⭐⭐
**Purpose:** Transform design tokens into multiple formats (CSS, JS, JSON, iOS, Android)

**Why Choose It:**
- Single source of truth for design tokens
- Generate Tailwind config from tokens
- Export to Figma, iOS, Android
- Version control for design decisions

**Setup:**
```bash
npm install -D style-dictionary
```

```javascript
// config/tokens.json
{
  "color": {
    "brand": {
      "turquoise": { "value": "#3CC6C4" },
      "creamsicle": { "value": "#FF9E58" },
      "ember": { "value": "#FF7A3D" }
    },
    "cave": {
      "bg": { "value": "#0D0D0F" },
      "text": { "value": "#F5F5F5" }
    }
  },
  "typography": {
    "font": {
      "family": {
        "display": { "value": "Montserrat, sans-serif" }
      }
    }
  }
}

// build-tokens.js
const StyleDictionary = require('style-dictionary');

StyleDictionary.extend({
  source: ['config/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
    },
    tailwind: {
      transformGroup: 'js',
      buildPath: 'config/',
      files: [{
        destination: 'tailwind-tokens.js',
        format: 'javascript/module'
      }]
    }
  }
}).buildAllPlatforms();
```

**Cost:** Free

**Impact:** ⭐⭐⭐⭐ (Essential for design system consistency)

**Recommendation:** **HIGH PRIORITY** - Create single source of truth for:
- Colors (GT theme + BearCave theme)
- Typography (Montserrat weights, sizes)
- Spacing, shadows, radii
- Animation durations

---

#### 3.2 Tailwind IntelliSense ⭐⭐⭐⭐⭐
**Purpose:** VS Code extension for Tailwind autocomplete and linting

**Why Choose It:**
- Autocomplete class names
- Lint invalid classes
- Show color swatches
- Syntax highlighting

**Setup:** Install VS Code extension: `bradlc.vscode-tailwindcss`

**Cost:** Free

**Impact:** ⭐⭐⭐⭐⭐ (Massive productivity boost)

**Status:** Likely already in use

---

#### 3.3 Radix UI ⭐⭐⭐⭐⭐
**Purpose:** Unstyled, accessible React components

**Why Choose It:**
- ARIA-compliant out of the box
- Keyboard navigation
- Focus management
- Works with Tailwind

**Setup:**
```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
```

**Cost:** Free

**Impact:** ⭐⭐⭐⭐⭐ (Critical for accessibility)

**Status:** ✅ Already used (`@radix-ui/react-*` in dependencies)

---

#### 3.4 axe DevTools ⭐⭐⭐⭐⭐
**Purpose:** Browser extension for accessibility testing

**Why Choose It:**
- Industry standard (WCAG 2.1 Level A/AA)
- Detects 57% of accessibility issues
- Clear remediation guidance
- Free browser extension

**Setup:** Install browser extension from Chrome/Firefox store

**Cost:** Free (Pro version $990/yr for teams)

**Impact:** ⭐⭐⭐⭐⭐ (Essential for accessibility compliance)

**Recommendation:** Use in combination with:
- `@axe-core/playwright` (automated testing)
- `.pa11yci` (already configured)
- Lighthouse accessibility audit

---

## 4. Web Platform Best Practices

### Summary Table

| Topic | Tool/Approach | Impact | Setup (hrs) | Cost |
|-------|---------------|--------|-------------|------|
| **MIME Types** | validate-asset-mime-types.mjs | 5 | 0.5 | Free |
| **Service Workers** | Workbox | 4 | 2-4 | Free |
| **Preload/Prefetch** | vite-plugin-html | 3 | 1-2 | Free |
| **Image Optimization** | sharp (already in use) | 5 | N/A | Free |

### Detailed Recommendations

#### 4.1 MIME Type Validation ⭐⭐⭐⭐⭐
**Purpose:** Prevent deployment failures due to incorrect MIME types

**Status:** ✅ Already implemented in `scripts/validate-asset-mime-types.mjs`

**Recommendation:** Add to CI pipeline:
```yaml
# .github/workflows/ci.yml
- name: Validate Asset MIME Types
  run: npm run validate:mime
```

**GitHub Pages MIME Rules:**
- `.js` → `application/javascript` (NOT `text/javascript`)
- `.mjs` → `application/javascript`
- `.css` → `text/css`
- `.json` → `application/json`
- `.avif` → `image/avif`

---

#### 4.2 Service Worker with Workbox ⭐⭐⭐⭐
**Purpose:** Offline support, caching strategy, precaching

**Why Choose It:**
- Battle-tested by Google
- Vite plugin available
- Network-first, cache-first, stale-while-revalidate strategies

**Setup:**
```bash
npm install -D vite-plugin-pwa
```

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,avif,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
              },
            },
          },
        ],
      },
    }),
  ],
});
```

**Cost:** Free

**Impact:** ⭐⭐⭐⭐ (Improves perceived performance, enables offline)

**Recommendation:** Implement if PWA features are desired. Not critical for portfolio site.

---

#### 4.3 Preload/Prefetch ⭐⭐⭐
**Purpose:** Load critical resources faster

**Why Choose It:**
- Faster LCP (Largest Contentful Paint)
- Better user experience
- Easy with vite-plugin-html

**Setup:**
```javascript
// vite.config.js
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      inject: {
        tags: [
          {
            injectTo: 'head',
            tag: 'link',
            attrs: {
              rel: 'preload',
              href: '/fonts/Montserrat-Bold.woff2',
              as: 'font',
              type: 'font/woff2',
              crossorigin: 'anonymous',
            },
          },
        ],
      },
    }),
  ],
});
```

**Cost:** Free

**Impact:** ⭐⭐⭐ (Marginal performance gains, use sparingly)

---

## 5. Prioritized Roadmap

### Immediate (Next Sprint)
1. ✅ **Jest + Testing Infrastructure** (Done)
2. **Storybook Setup** (4-8 hours)
   - Create stories for 10 core components
   - Add accessibility addon
   - Document design tokens
3. **Style Dictionary** (4-6 hours)
   - Extract current Tailwind tokens to JSON
   - Generate CSS variables
   - Update Tailwind config to use tokens

### Short Term (1-2 Weeks)
4. **Sentry Error Tracking** (2-4 hours)
   - Add Sentry SDK
   - Configure source maps
   - Set up alerts
5. **Expand Playwright Tests** (4-6 hours)
   - E2E tests for critical flows
   - Visual regression with screenshots
6. **MSW API Mocking** (2-3 hours)
   - Mock MCP server responses
   - Add to Storybook and tests

### Medium Term (1 Month)
7. **Lighthouse CI Enforcement** (1-2 hours)
   - Add to CI pipeline
   - Set performance budgets
8. **OpenTelemetry + Honeycomb** (8-12 hours, optional)
   - Only if MCP server complexity grows
9. **Chromatic Visual Testing** (2-3 hours, optional)
   - Start with free tier
   - Switch to Playwright if too expensive

---

## 6. Total Cost Estimate

### Minimum Viable Setup (Free)
- Sentry Developer (free tier)
- Storybook (free)
- Playwright (free)
- MSW (free)
- Style Dictionary (free)
- Lighthouse CI (free)
- **Total: $0/year**

### Recommended Setup
- Sentry Team: $26/mo × 12 = $312/year
- Chromatic Starter (optional): $149/mo × 12 = $1,788/year
- **Total: $312-$2,100/year**

### Enterprise Setup
- Sentry Business: $80/mo × 12 = $960/year
- Chromatic: $149/mo × 12 = $1,788/year
- Honeycomb Pro: $200/mo × 12 = $2,400/year
- Figma Dev Mode: $12/seat/mo × 12 = $144/year
- **Total: $5,292/year**

---

## 7. Key Takeaways

1. **Start with free tools:** Storybook, Playwright, Style Dictionary, Sentry free tier
2. **Prioritize developer experience:** Tailwind IntelliSense, MSW, Vitest
3. **Accessibility first:** Radix UI, axe DevTools, Playwright a11y tests
4. **Add paid tools only when needed:** Sentry Team ($26/mo) provides huge value
5. **Avoid over-engineering:** Don't add OpenTelemetry unless MCP server grows complex

---

## 8. Next Steps

1. Complete Storybook setup with component stories
2. Extract design tokens to Style Dictionary
3. Add Sentry for production error tracking
4. Expand Playwright E2E test coverage
5. Document design system in Storybook

---

**End of Tooling Research**
