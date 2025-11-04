/**
 * Safely defines a custom element only if it hasn't been registered yet.
 *
 * This function implements the recommended pattern for preventing duplicate
 * custom element registration errors:
 *
 * @example
 * ```typescript
 * class MyCustomElement extends HTMLElement { ... }
 * defineCustomElementIfNeeded('my-custom-element', MyCustomElement);
 * ```
 *
 * @param name - The tag name of the custom element (e.g., 'mce-autosize-textarea')
 * @param ctor - The constructor class for the custom element
 * @param options - Optional options object for customized built-in elements (e.g., { extends: 'textarea' })
 *
 * @remarks
 * This follows the pattern: `if (!customElements.get(name)) { customElements.define(...); }`
 * This prevents TypeError: Failed to execute 'define' on 'CustomElementRegistry'
 */
export function defineCustomElementIfNeeded(
  name: string,
  ctor: CustomElementConstructor,
  options?: ElementDefinitionOptions
): void {
  // 1. ENVIRONMENT CHECK: Ensure code runs only in the browser
  // Prevents errors when code is executed during Server-Side Rendering (SSR),
  // where the window and customElements objects do not exist.
  if (typeof window === 'undefined' || !('customElements' in window)) {
    return;
  }

  // 2. CORE PREVENTION LOGIC: Check if the element is NOT already defined
  // This is the recommended pattern: `if (!customElements.get(name)) { define(...); }`
  // The customElements.get(name) method queries the registry. If it returns undefined,
  // the element is not yet registered, and it's safe to proceed with customElements.define.
  if (!customElements.get(name)) {
    try {
      // Element doesn't exist - safe to define
      if (options) {
        customElements.define(name, ctor, options);
      } else {
        customElements.define(name, ctor);
      }

      // Log success in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Custom element "${name}" registered successfully.`);
      }
    } catch (err) {
      // 3. RACE CONDITION HANDLING: Gracefully catch errors if another script
      // registered the element right after the initial check.
      // In large applications, it's possible for the element to be defined by a
      // completely separate script after our check (!customElements.get(name)) passes,
      // but before our customElements.define() call executes.
      const error = err as Error;
      const errorMsg = error?.message || String(err);

      if (errorMsg.includes('has already been used') ||
          errorMsg.includes('has already been defined')) {
        // This is a duplicate registration error (a safe error to ignore)
        // By catching this specific error, we prevent the program from crashing
        // and simply return, effectively suppressing known false-positive errors
        // (e.g., from Vite's HMR overlay system).
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Custom element "${name}" was defined by another script during registration. Skipping.`);
        }
        return;
      }

      // Re-throw any other (real) errors so genuine bugs don't get accidentally suppressed
      throw err;
    }
  } else {
    // Element already exists - skip registration
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Custom element "${name}" is already registered. Skipping re-registration.`);
    }
  }
}
