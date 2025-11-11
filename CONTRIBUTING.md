# Contributing Guidelines

## Custom Elements & Third-Party Packages

### Best Practices

1. **Avoid packages that auto-register custom elements globally** - These can cause duplicate registration errors, especially during HMR
2. **Prefer lazy/dynamic imports** - For third-party custom element libraries, use dynamic imports so they only load when needed
3. **Use the safe registration utility** - When defining custom elements, use `defineCustomElementIfNeeded()` from `src/utils/defineCustomElementGuard.ts`

### Example: Safe Custom Element Registration

```typescript
import { defineCustomElementIfNeeded } from '@/utils/defineCustomElementGuard';

class MyCustomElement extends HTMLElement {
  // ...
}

// Safe registration that checks for duplicates
defineCustomElementIfNeeded('my-custom-element', MyCustomElement);
```

### Example: Lazy Loading Custom Element Libraries

```typescript
// Instead of: import 'some-ce-library';
// Use dynamic import:
const loadCELibrary = async () => {
  const module = await import('some-ce-library');
  return module;
};
```

## Development Workflow

See `docs/CE_GUARD_IMPLEMENTATION.md` for details on the dev-only CE guard that prevents crashes from duplicate registrations.

