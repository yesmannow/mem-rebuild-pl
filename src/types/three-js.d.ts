/**
 * Temporary JSX shim for react-three-fiber elements.
 * TODO: remove once @react-three/fiber types are properly configured.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      group: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      perspectiveCamera: any;
      orthographicCamera: any;
      [key: string]: any;
    }
  }
}

export {};
