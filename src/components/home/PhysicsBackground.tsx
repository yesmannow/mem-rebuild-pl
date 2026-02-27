/* eslint-disable react/no-unknown-property */
// @ts-nocheck
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RippleUniform {
  x: number;
  y: number;
  intensity: number;
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec3 uRipplePos;
uniform float uRippleStrength;

void main() {
  vec2 uv = vUv;
  float dist = distance(uv, uRipplePos.xy);
  float ripple = sin(dist * 50.0 - uTime * 10.0) * uRippleStrength;

  vec3 color = vec3(0.02, 0.04, 0.08);
  color += ripple * vec3(0.0, 0.95, 1.0);
  gl_FragColor = vec4(color, 1.0);
}
`;

const RipplePlane = ({ ripple }: { ripple: RippleUniform }) => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRipplePos: { value: new THREE.Vector3(0.5, 0.5, 0) },
      uRippleStrength: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    uniforms.uTime.value += delta;
    uniforms.uRipplePos.value.set(ripple.x, 1 - ripple.y, ripple.intensity);
    uniforms.uRippleStrength.value = ripple.intensity;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
};

const PhysicsBackground = ({ ripple }: { ripple: RippleUniform }) => {
  return (
    <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }}>
      <RipplePlane ripple={ripple} />
    </Canvas>
  );
};

export default PhysicsBackground;
