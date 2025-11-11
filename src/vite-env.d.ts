/// <reference types="vite/client" />

// Type declarations for @react-three/fiber JSX elements
// TODO: This is a workaround - @react-three/fiber should provide these types automatically
import { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

