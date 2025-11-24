# MCP+CLI Comprehensive Triage Report

**Generated:** 2025-11-12  
**Branch:** chore/mcp-audit-20251112-003722  
**Status:** Critical blockers identified

---

## Executive Summary

The repository has **3 critical blockers** preventing test execution, and **762 TypeScript errors** that need triage. The MCP server and monitoring endpoints are functional. Primary issues are:

1. ❌ **BLOCKER**: Jest not installed but referenced in test script
2. ❌ **BLOCKER**: Build process requires image processing (182 images, slow)
3. ⚠️ **HIGH**: 762 TypeScript type errors (primarily framer-motion type incompatibilities)
4. ✅ **WORKING**: MCP server health and monitoring endpoints operational

---

## 1. Critical Runtime/Build/Test Blockers

### Issue 1.1: Jest Missing from Dependencies
**Evidence:**
```bash
$ npm test
Error: Cannot find module '/home/runner/work/mem-rebuild-pl/mem-rebuild-pl/node_modules/jest/bin/jest.js'

$ npm list jest
└── (empty)

$ grep jest package.json
"test": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --runInBand",
```

**Root Cause:** Jest is not listed in `devDependencies` but is referenced in the test script. This prevents any test execution.

**Fix:** Add jest to devDependencies
```bash
npm install --save-dev jest @types/jest supertest @types/supertest
```

**Tests:** After fix, run `npm test` - should execute 5 test files in `test/` directory
- test/mcp.integration.test.js
- test/mcp.write-gating.test.js
- test/monitoring.test.js
- test/rate-limit.test.js
- test/safeJoin.test.js

**Commit message:** "fix: add jest and test dependencies to devDependencies"

---

### Issue 1.2: Build Process Image Bottleneck
**Evidence:**
```bash
$ npm run build
> jacob-darling-portfolio@1.0.0 prebuild
> node scripts/prebuild-guard.cjs

📸 Building image manifest...
📸 Processing 182 image(s) in batches of 5...
   Batch 1/37: Processing 1-5/182
   [Continues for 60+ seconds...]
```

**Root Cause:** The build process includes image processing in prebuild step, causing slow builds and potential CI timeouts.

**Fix:** Skip image processing in CI or add environment flag
```javascript
// In scripts/prebuild-guard.cjs
if (process.env.CI || process.env.SKIP_IMAGE_BUILD) {
  console.log('⏭️  Skipping image build in CI environment');
  process.exit(0);
}
```

**Tests:** 
```bash
SKIP_IMAGE_BUILD=1 npm run build  # Should complete faster
```

**Commit message:** "perf: add CI flag to skip image processing in builds"

---

### Issue 1.3: TypeScript Type Errors (762 total)
**Evidence:**
```typescript
// Sample from ts-errors.txt
src/components/animations/FloatingElements.tsx(46,11): error TS2322: 
Type 'string' is not assignable to type 'Easing | Easing[] | undefined'.

src/components/animations/MorphingBlob.tsx(38,9): error TS2322:
Type 'string' is not assignable to type 'AnimationGeneratorType | undefined'.

// Pattern: framer-motion type incompatibilities across 20+ animation components
```

**Root Cause:** Framer Motion v12 has stricter type definitions. String literals for `ease` and `type` are no longer accepted - need proper typed imports.

**Fix:** Import proper types from framer-motion
```typescript
// BEFORE
transition: { ease: "easeInOut", type: "spring" }

// AFTER
import { Easing } from "framer-motion";
transition: { ease: "easeInOut" as Easing, type: "spring" as const }
```

**Tests:** Run `npm run typecheck` - should show reduced errors

**Commit message:** "fix: update framer-motion animation type definitions"

**NOTE:** This is not a true runtime blocker (build still works), but should be addressed for type safety.

---

## 2. MCP Server Status ✅

### Health Endpoint
**Test:**
```bash
$ curl -v http://localhost:5174/health
< HTTP/1.1 200 OK
{"ok":true,"status":"ok","version":"1.0.0"}
```
**Status:** ✅ Working

### Monitoring Endpoint
**Test:**
```bash
$ curl http://localhost:5174/api/monitoring/stats
{
  "timestamp":"2025-11-12T00:38:24.870Z",
  "totalChecks":1,
  "failures":0,
  "consecutiveFailures":0,
  "lastStatus":"ok",
  "lastFailureAt":null,
  "lastSuccessAt":"2025-11-12T00:38:24.860Z",
  "avgResponseMs":0,
  "rateLimit":{"windowMs":1000,"max":60},
  "requests":{"GET /health":1},
  "errors":{}
}
```
**Status:** ✅ Working

### safeJoin Path Sanitizer
**Code:** `/mcp/server.js` lines 71-90  
**Status:** ✅ Exported and functional  
**Tests exist:** `test/safeJoin.test.js`

### Rate Limiter
**Code:** `/mcp/server.js` lines 153-176  
**Status:** ✅ In-memory rate limiter per IP  
**Issue:** Rate limit keys are not deterministic for testing (based on `req.ip`)  
**Fix needed:** Export rate limiter function and allow custom key function for tests

---

## 3. Known Issues from Prior Audits

### Console Errors (Addressed in PR_BROWSER_CONSOLE_ERROR_FIXES.md)
- ✅ Custom element guard fixed
- ✅ Undefined error handler fixed
- ✅ MIME validation script added

### Component Duplication (From FRONTEND_AUDIT_REPORT.md)
- ⚠️ 3 versions of SectionWrapper
- ⚠️ 3 versions of HeroSection  
- ⚠️ Design system fragmentation (GT theme vs BearCave theme)

**Impact:** Not runtime blockers, but cause maintenance and bundle size issues

---

## 4. Test Infrastructure Needs

### Current Test Files (5 files)
```
test/mcp.integration.test.js     - Server integration tests
test/mcp.write-gating.test.js    - Write permission tests
test/monitoring.test.js          - Monitoring endpoint tests
test/rate-limit.test.js          - Rate limiter tests
test/safeJoin.test.js            - Path sanitizer tests
```

### Missing Infrastructure
1. ❌ Jest not installed
2. ❌ Test helper utilities not exported from server.js
3. ⚠️ Rate limit testing is non-deterministic

### Recommended Additions
```javascript
// Create test/utils/server-helper.js
export function createTestServer(port, options = {}) {
  // Helper to start/stop server for tests
}

export function createDeterministicRateLimiter(keyFn) {
  // Rate limiter with custom key function for tests
}
```

---

## 5. CI/CD Pipeline Status

### GitHub Actions Workflows
```
.github/workflows/ci-a11y.yml           - Accessibility tests
.github/workflows/ci-split.yml          - Split CI jobs
.github/workflows/ci.yml                - Main CI pipeline
.github/workflows/full-build.yml        - Full build with assets
.github/workflows/quick-checks.yml      - Fast linting/typecheck
.github/workflows/showcase.yml          - Demo deployment
.github/workflows/verify-signed-commits.yml - Commit signing
```

**Risks:**
- Image processing may timeout in CI
- Test jobs will fail until Jest is installed
- TypeScript errors may fail typecheck jobs

---

## 6. Environment Variables Reference

```bash
# MCP Server
PORT=5174                           # Server port
MCP_PORT=5174                       # Alternative port variable
MCP_AUTH_TOKEN=""                   # Bearer token for write operations
MCP_WRITE_ENABLED=false             # Enable write operations
MCP_READONLY=true                   # Read-only mode
MCP_RATE_LIMIT_WINDOW_MS=1000      # Rate limit window
MCP_RATE_LIMIT_MAX=60              # Max requests per window

# Build
PUPPETEER_SKIP_DOWNLOAD=true       # Skip Puppeteer browser download
PREBUILD_PIPELINE=off              # Skip AI/content generation
SKIP_IMAGE_BUILD=1                 # Skip image processing (proposed)
CI=true                            # CI environment detection
```

---

## 7. Immediate Action Items (Priority Order)

### Priority 1: Unblock Tests
1. Install Jest and dependencies → Patch 1
2. Run tests to validate MCP functionality
3. Document any test failures

### Priority 2: Stabilize Build
1. Add CI flag to skip image processing → Patch 2
2. Validate build completes in <5 minutes
3. Add build time monitoring

### Priority 3: Test Infrastructure
1. Export createServer/start/stop from mcp/server.js → Patch 3
2. Create server-helper utility
3. Make rate-limit keys deterministic

### Priority 4: TypeScript Errors (Non-blocking)
1. Triage 762 errors by category
2. Fix framer-motion type issues
3. Fix missing module imports

---

## 8. Verification Checklist

After applying patches:

```bash
# 1. Test infrastructure works
npm test
# Expected: All MCP tests pass

# 2. Build completes successfully  
SKIP_IMAGE_BUILD=1 npm run build
# Expected: Build completes in <5 minutes

# 3. MCP server starts
npm run mcp:start &
sleep 2
curl http://localhost:5174/health
# Expected: {"ok":true,"status":"ok","version":"1.0.0"}

# 4. Monitoring endpoint works
curl http://localhost:5174/api/monitoring/stats
# Expected: JSON with totalChecks, failures, etc.

# 5. Rate limiter functions
for i in {1..65}; do curl http://localhost:5174/health; done
# Expected: 429 Too Many Requests after 60 requests

# 6. Type checking (may still have errors)
npm run typecheck
# Expected: Fewer than 762 errors
```

---

## 9. Next Steps

After blockers are resolved:
1. Run tooling research (Phase 3)
2. Design system audit and token seed (Phase 4)
3. Create UI/UX experiments (Phase 4)
4. Package hotfix patches for PR (Phase 5)

---

## Appendix A: Package.json Test Dependencies to Add

```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0",
    "supertest": "^6.3.0",
    "@types/supertest": "^6.0.0"
  }
}
```

## Appendix B: Useful Commands

```bash
# Run specific test file
npm test -- test/safeJoin.test.js

# Run tests with coverage
npm test -- --coverage

# Type check without build
npm run typecheck

# Lint code
npm run lint

# Start MCP server
npm run mcp:start

# Health probe
npm run mcp:health-probe
```

---

**End of Triage Report**
