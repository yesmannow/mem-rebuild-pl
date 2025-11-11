/**
 * Temporary JSX shim for react-three-fiber elements.
 * TODO: remove after @react-three/fiber types are properly loaded.
 */
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
