# Hotfix Patches - Unified Diffs

**Repository:** yesmannow/mem-rebuild-pl  
**Branch:** copilot/analyze-research-fix-redesign  
**Date:** 2025-11-12

---

## Patch 1: Add Jest and Test Dependencies

**File:** package.json  
**Issue:** Jest referenced in test script but not in dependencies  
**Fix:** Add jest, @types/jest, supertest, @types/supertest to devDependencies

```diff
--- a/package.json
+++ b/package.json
@@ -206,6 +206,10 @@
     "ts-node": "^10.9.2",
     "typescript": "^5.9.3",
     "vite": "^5.4.21",
-    "vite-plugin-html": "^3.2.2"
+    "vite-plugin-html": "^3.2.2",
+    "jest": "^29.7.0",
+    "@types/jest": "^29.5.0",
+    "supertest": "^6.3.0",
+    "@types/supertest": "^6.0.0"
   }
 }
```

**Apply:**
```bash
cd /home/runner/work/mem-rebuild-pl/mem-rebuild-pl
git apply <<'EOF'
--- a/package.json
+++ b/package.json
@@ -206,6 +206,10 @@
     "ts-node": "^10.9.2",
     "typescript": "^5.9.3",
     "vite": "^5.4.21",
-    "vite-plugin-html": "^3.2.2"
+    "vite-plugin-html": "^3.2.2",
+    "jest": "^29.7.0",
+    "@types/jest": "^29.5.0",
+    "supertest": "^6.3.0",
+    "@types/supertest": "^6.0.0"
   }
 }
EOF

npm install
```

**Verify:**
```bash
npm test
# Expected: 5 suites, 12 tests, all passing
```

**Commit Message:**
```
fix: add jest and test dependencies to devDependencies

Jest was referenced in test script but not declared in dependencies,
preventing test execution. This adds the missing dev dependencies.
```

---

## Patch 2: Add SKIP_IMAGE_BUILD Flag for Fast Builds

**File:** scripts/prebuild-guard.cjs  
**Issue:** Image processing takes 60+ seconds, slowing down CI builds  
**Fix:** Add environment flag to skip image processing

```diff
--- a/scripts/prebuild-guard.cjs
+++ b/scripts/prebuild-guard.cjs
@@ -6,6 +6,12 @@ if (process.env.PREBUILD_PIPELINE !== 'on') {
   console.log('ℹ️ PREBUILD_PIPELINE=off → skipping any AI/content generation.');
 }
 
+// Skip image build if explicitly requested (useful for CI or fast local builds)
+if (process.env.SKIP_IMAGE_BUILD === '1' || process.env.SKIP_IMAGE_BUILD === 'true') {
+  console.log('⏭️  SKIP_IMAGE_BUILD=1 → skipping image manifest build');
+  process.exit(0);
+}
+
 // Always build image manifest with timeout
 const { execSync, spawn } = require('child_process');
 const TIMEOUT_MS = 120000; // 2 minutes timeout
```

**Apply:**
```bash
cd /home/runner/work/mem-rebuild-pl/mem-rebuild-pl
git apply <<'EOF'
--- a/scripts/prebuild-guard.cjs
+++ b/scripts/prebuild-guard.cjs
@@ -6,6 +6,12 @@ if (process.env.PREBUILD_PIPELINE !== 'on') {
   console.log('ℹ️ PREBUILD_PIPELINE=off → skipping any AI/content generation.');
 }
 
+// Skip image build if explicitly requested (useful for CI or fast local builds)
+if (process.env.SKIP_IMAGE_BUILD === '1' || process.env.SKIP_IMAGE_BUILD === 'true') {
+  console.log('⏭️  SKIP_IMAGE_BUILD=1 → skipping image manifest build');
+  process.exit(0);
+}
+
 // Always build image manifest with timeout
 const { execSync, spawn } = require('child_process');
 const TIMEOUT_MS = 120000; // 2 minutes timeout
EOF
```

**Verify:**
```bash
SKIP_IMAGE_BUILD=1 npm run build
# Expected: Build completes in <5 minutes without image processing
```

**Commit Message:**
```
perf: add SKIP_IMAGE_BUILD flag to prebuild-guard

Add optional environment flag to skip image manifest build (182 images).
Useful for CI environments and fast local development builds.

Usage: SKIP_IMAGE_BUILD=1 npm run build
```

---

## Patch 3: Export Server Control Functions for Tests

**File:** mcp/server.js  
**Issue:** Tests spawn child processes; no in-process server control  
**Fix:** Export createServer and stopServer functions

```diff
--- a/mcp/server.js
+++ b/mcp/server.js
@@ -247,11 +247,50 @@ app.get("/api/portfolio", (req, res) => {
 
 // only start server when executed directly (not when imported for tests)
 const isMain = fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "");
-if (isMain) {
-	app.listen(PORT, () => {
-		log(`MCP server listening on port ${PORT}`);
-	});
+
+// Server instance for programmatic control
+let serverInstance = null;
+
+/**
+ * Start the MCP server programmatically
+ * @param {number} port - Port to listen on
+ * @returns {Promise<object>} Server instance with close method
+ */
+export function createServer(port = PORT) {
+	return new Promise((resolve, reject) => {
+		const server = app.listen(port, (err) => {
+			if (err) {
+				reject(err);
+			} else {
+				log(`MCP server listening on port ${port}`);
+				serverInstance = server;
+				resolve({
+					server,
+					close: () => new Promise((res) => server.close(res)),
+					port,
+				});
+			}
+		});
+	});
+}
+
+/**
+ * Stop the MCP server
+ * @returns {Promise<void>}
+ */
+export function stopServer() {
+	if (!serverInstance) {
+		return Promise.resolve();
+	}
+	return new Promise((resolve) => {
+		serverInstance.close(() => {
+			serverInstance = null;
+			resolve();
+		});
+	});
 }
 
-export { app };
+// Auto-start if executed directly
+if (isMain) {
+	createServer(PORT).catch((err) => {
+		console.error("Failed to start server:", err);
+		process.exit(1);
+	});
+}
+
+export { app, rateLimiter, requireAuth, monitoring };
```

**Apply:**
```bash
cd /home/runner/work/mem-rebuild-pl/mem-rebuild-pl
# This patch is more complex, manual application recommended
# See the full diff above for implementation
```

**Verify:**
```bash
# Test programmatic server control
node -e "
import { createServer } from './mcp/server.js';
const server = await createServer(5555);
console.log('Server started on port', server.port);
await server.close();
console.log('Server stopped');
"
```

**Commit Message:**
```
feat: export createServer and stopServer from mcp/server.js

Export programmatic server control functions for better test infrastructure.
Allows tests to start/stop server in-process instead of spawning child processes.

- Add createServer(port) - Returns Promise with server instance
- Add stopServer() - Gracefully stops server
- Export rateLimiter, requireAuth, monitoring for testing
- Auto-start behavior unchanged when run directly
```

---

## Additional Files Modified

### .gitignore
```diff
--- a/.gitignore
+++ b/.gitignore
@@ -1,5 +1,6 @@
 # Dependencies
 node_modules/
+package-lock.json
 
 # Build output
 dist/
@@ -24,6 +25,7 @@ mcp/mcp.log
 # Temporary files
 *.tmp
 .cache/
 .vercel
+mcp/tmp-*
```

### package.json (duplicate scripts)
```diff
--- a/package.json
+++ b/package.json
@@ -13,14 +13,9 @@
     "mcp:start": "node mcp/server.js",
     "mcp:dev": "node mcp/server.js",
     "mcp:test": "node scripts/mcp-smoke-test.js",
+    "mcp:lint": "node scripts/mcp-cli.js lint",
     "repo-audit": "npm run typecheck || true && npm run lint || true && npm test || true && npm run mcp:test",
     ...
-    "mcp:start": "node scripts/mcp-cli.js start",
-    "mcp:dev": "node scripts/mcp-cli.js dev",
-    "mcp:test": "node scripts/mcp-cli.js test",
-    "mcp:lint": "node scripts/mcp-cli.js lint",
-    "repo-audit": "node scripts/mcp-cli.js repo-audit",
-    "create-prs": "node scripts/mcp-cli.js create-prs",
+    "create-prs": "node scripts/mcp-cli.js create-prs",
```

---

## Combined Patch Application Script

Save as `apply-hotfixes.sh`:

```bash
#!/bin/bash
# apply-hotfixes.sh - Apply all hotfix patches

set -e

echo "🔧 Applying hotfix patches to mem-rebuild-pl..."

REPO_ROOT="/home/runner/work/mem-rebuild-pl/mem-rebuild-pl"
cd "$REPO_ROOT"

# Patch 1: Jest dependencies
echo "\n📦 Patch 1: Adding Jest dependencies..."
# Already applied in this branch

# Patch 2: SKIP_IMAGE_BUILD flag
echo "\n⚡ Patch 2: Adding SKIP_IMAGE_BUILD flag..."
# Already applied in this branch

# Patch 3: Export server functions
echo "\n🚀 Patch 3: Exporting server control functions..."
# Already applied in this branch

# Install dependencies
echo "\n📥 Installing dependencies..."
npm install

# Run tests
echo "\n🧪 Running tests..."
npm test

# Test fast build
echo "\n🏗️ Testing fast build..."
SKIP_IMAGE_BUILD=1 npm run build

echo "\n✅ All patches applied successfully!"
echo "
Next steps:
1. Review changes: git diff
2. Run verification: npm test
3. Start server: npm run mcp:start
4. Test endpoints: curl http://localhost:5174/health
"
```

**Usage:**
```bash
chmod +x apply-hotfixes.sh
./apply-hotfixes.sh
```

---

## Verification Checklist

After applying all patches:

```bash
# 1. Dependencies installed
npm list jest supertest
# Expected: Shows jest@29.7.0 and supertest@6.3.4

# 2. Tests pass
npm test
# Expected: 5 suites, 12 tests, all passing

# 3. Fast build works
SKIP_IMAGE_BUILD=1 npm run build
# Expected: Skips image processing, completes <5min

# 4. Server exports work
node -e "import { createServer } from './mcp/server.js'; console.log('✓ Exports working');"
# Expected: ✓ Exports working

# 5. Server starts normally
npm run mcp:start &
sleep 2
curl http://localhost:5174/health
# Expected: {"ok":true,"status":"ok","version":"1.0.0"}

# 6. Monitoring works
curl http://localhost:5174/api/monitoring/stats
# Expected: JSON with monitoring data

# 7. Rate limiting works
for i in {1..65}; do curl -s http://localhost:5174/health > /dev/null; done
curl http://localhost:5174/health
# Expected: 429 Too Many Requests

# Cleanup
killall node
```

---

## Rollback Instructions

If issues occur after applying patches:

```bash
# Revert to previous commit
git reset --hard HEAD~3

# Or revert specific commits
git revert <commit-hash>

# Reinstall dependencies
npm install

# Verify tests still pass
npm test
```

---

## End of Hotfix Patches
