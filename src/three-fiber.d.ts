/**
 * Type bridge: @react-three/fiber v8 augments the legacy global `JSX.IntrinsicElements`,
 * but @types/react v19 moved JSX to `React.JSX`. This shim extends both the `react` and
 * `react/jsx-runtime` module namespaces so that r3f elements (mesh, group, ambientLight, etc.)
 * are recognized by the TypeScript checker.
 */
import type { ThreeElements } from '@react-three/fiber';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
