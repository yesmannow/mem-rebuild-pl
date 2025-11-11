// TODO: Temporary shim for Three.js JSX elements until official @react-three/fiber types are properly configured
// This should be replaced with proper type definitions from @react-three/fiber in a follow-up PR

// Global JSX namespace augmentation for Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      [key: string]: any;
    }
  }
}

export {};

