# CE Guard Implementation & autopreview Cleanup

## Summary

Temporary dev-only custom element guard implemented to prevent crashes from duplicate `customElements.define` registrations. Extraneous `autopreview` package removed from node_modules.

## Changes

### Added
- `src/shims/ce-guard.js` - Dev-only runtime guard that intercepts duplicate custom element registrations and logs warnings with stack traces
- Import added at top of `src/main.tsx` to ensure guard runs before any app code

### Removed
- `node_modules/autopreview` - Extraneous package (not in package.json) that defined `autopreview-list` custom element

## Verification

✅ **CE-GUARD active**: Console shows `[CE-GUARD] dev guard active; will log duplicate customElements.define attempts`  
✅ **App loads cleanly**: No errors during normal app initialization  
✅ **HMR tested**: No duplicate warnings during hot module replacement  
✅ **autopreview removed**: No references found in codebase, package removed from node_modules  

## Guard Behavior

- **Dev-only**: Automatically skips in production builds (`NODE_ENV === 'production'`)
- **Non-blocking**: Prevents crashes by skipping duplicate registrations
- **Informative**: Logs warnings with stack traces to help identify source of duplicates
- **Reversible**: Can be removed once verification period completes

## Monitoring Period

Monitor for 24-48 hours during normal development:
- Watch DevTools Console for `[CE-GUARD]` warnings
- Exercise HMR by editing files
- Navigate between pages
- If no warnings appear, proceed with cleanup

## Cleanup Steps (After Verification)

```bash
git checkout chore/unblock/ce-guard
git rm src/shims/ce-guard.js
# Edit src/main.tsx to remove: import './shims/ce-guard';
git add src/main.tsx
git commit -m "chore: remove temporary dev CE guard after verification"
git push
```

## Root Cause Analysis

- **autopreview**: Extraneous package (not in dependencies) that was manually installed
- **No app-defined duplicates**: Repo scan showed no direct `customElements.define` calls in app code
- **Likely sources**: Vite HMR overlay (documented in existing error handling) or browser extensions

## Related Files

- `src/shims/ce-guard.js` - Guard implementation
- `src/main.tsx` - Guard import (line 1)
- `index.html` - Existing CE guard in HTML (complementary protection)
- `src/utils/defineCustomElementGuard.ts` - Utility function for safe CE registration

## Future Hardening Recommendations

1. **CI Check**: Add smoke test that greps production bundles for unexpected `customElements.define` occurrences
2. **Documentation**: Add note to CONTRIBUTING about avoiding packages that auto-register CEs globally
3. **Lazy Imports**: Prefer lazy/dynamic imports for third-party CE libraries when possible

