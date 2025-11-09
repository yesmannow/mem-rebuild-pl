import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './Floating3DCard.css';

interface Floating3DCardProps {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  speed?: number;
}

const FloatingBox: React.FC<{ color?: string; speed?: number }> = ({
  color = '#3b82f6',
  speed = 1,
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Floating3DCard: React.FC<Floating3DCardProps> = ({
  children,
  className = '',
  color = '#3b82f6',
  speed = 1,
}) => {
  return (
    <div className={`floating-3d-card ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingBox color={color} speed={speed} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      {children && <div className="floating-3d-card__content">{children}</div>}
    </div>
  );
};

export default Floating3DCard;

