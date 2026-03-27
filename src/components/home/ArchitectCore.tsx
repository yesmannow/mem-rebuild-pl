import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSystemStore } from '../../store/useSystemStore';

export default function ArchitectCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const { isProcessing, shakeActive } = useSystemStore();

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 15), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotationSpeed = shakeActive ? 15 : isProcessing ? 3 : 0.4;

    meshRef.current.rotation.y += 0.005 * rotationSpeed;
    pointsRef.current.rotation.y += 0.005 * rotationSpeed;

    const s = 1.5 + Math.sin(time * (isProcessing ? 5 : 2)) * 0.05;
    meshRef.current.scale.set(s, s, s);
  });

  const coreColor = shakeActive ? '#ffffff' : '#22d3ee';

  return (
    <group scale={1.2}>
      <mesh ref={meshRef}>
        <primitive object={geometry} attach="geometry" />
        <meshBasicMaterial
          color={coreColor}
          wireframe
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <Points ref={pointsRef}>
        <primitive object={geometry} attach="geometry" />
        <PointMaterial
          transparent
          color={coreColor}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={0.02}
        />
      </mesh>
    </group>
  );
}
