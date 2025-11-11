/**
 * ce-guard.js — dev-only guard
 *
 * Lightweight runtime guard to avoid throwing on duplicate customElements.define calls.
 *
 * Safe to keep in dev while tracing; remove once the root cause is fixed.
 */
(function installCEGuard(){
  try {
    if (typeof window === 'undefined') return;
    
    // Only run in non-production builds
    try {
      if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') {
        return;
      }
    } catch(e) {}
    
    if (window.__CE_GUARD_INSTALLED_DEV__) return;
    
    console.info('[CE-GUARD] dev guard active; will log duplicate customElements.define attempts');
    
    const nativeCE = window.customElements;
    if (!nativeCE) return;
    
    const origDefine = nativeCE.define.bind(nativeCE);

    nativeCE.define = function(name, ctor, options) {
      try {
        if (nativeCE.get(name)) {
          // Already defined: skip and log a helpful stack for tracing.
          const stack = (new Error()).stack || 'no-stack';
          console.warn('[CE-GUARD] duplicate define skipped:', name, {
            time: new Date().toISOString(),
            stack
          });
          return;
        }
      } catch (err) {
        // If customElements.get throws for any reason, avoid blocking app startup.
        try {
          console.warn('[CE-GUARD] check failed for', name, err);
        } catch(e){}
      }
      return origDefine(name, ctor, options);
    };

    Object.defineProperty(nativeCE, '__CE_GUARD_INSTALLED_DEV__', {
      value: true,
      configurable: true
    });
    
    // Expose a toggle for wrappers to enable extra tracing
    window.__CE_GUARD_TRACE__ = window.__CE_GUARD_TRACE__ || false;
  } catch (err) {
    try {
      console.warn('[CE-GUARD] install failed', err);
    } catch(e){}
  }
})();

