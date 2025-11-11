/**
 * ce-guard.js
 *
 * Lightweight runtime guard to avoid throwing on duplicate customElements.define calls.
 *
 * Safe to keep in dev while tracing; remove once the root cause is fixed.
 */
(function installCEGuard(){
  try {
    if (typeof window === 'undefined') return;
    if (!window.customElements) return;
    if (window.customElements.ce_guard_installed) return;

    const nativeCE = window.customElements;
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

    Object.defineProperty(nativeCE, 'ce_guard_installed', {
      value: true,
      configurable: true
    });
    if (window.CE_GUARD_TRACE) {
      console.info('[CE-GUARD] installed');
    }
  } catch (err) {
    try {
      console.warn('[CE-GUARD] install failed', err);
    } catch(e){}
  }
})();

