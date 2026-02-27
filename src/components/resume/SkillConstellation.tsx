// @ts-nocheck — R3F JSX intrinsic elements (group, mesh, etc.) not in standard React JSX namespace
import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { SkillCategory } from '../../types';

interface ConstellationPointsProps {
  count: number;
  radius: number;
  color: string;
  mousePos: React.MutableRefObject<[number, number]>;
}

function randomInSphere(count: number, radius: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * Math.cbrt(Math.random());
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

const ConstellationPoints: React.FC<ConstellationPointsProps> = ({
  count,
  radius,
  color,
  mousePos,
}) => {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => randomInSphere(count, radius), [count, radius]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    const [mx, my] = mousePos.current;
    ref.current.rotation.x += delta * 0.04 + my * 0.0008;
    ref.current.rotation.y += delta * 0.06 + mx * 0.0008;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
        />
      </Points>
    </group>
  );
};

interface NodeOrbitProps {
  label: string;
  angle: number;
  orbitRadius: number;
  color: string;
  isHovered: boolean;
  onHover: (label: string | null) => void;
}

const NodeOrbit: React.FC<NodeOrbitProps> = ({
  label,
  angle,
  orbitRadius,
  color,
  isHovered,
  onHover,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const baseAngleRef = useRef(angle);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const a = baseAngleRef.current + t * 0.3;
    groupRef.current.position.x = Math.cos(a) * orbitRadius;
    groupRef.current.position.z = Math.sin(a) * orbitRadius;
    groupRef.current.position.y = Math.sin(a * 0.7) * 0.4;

    if (meshRef.current) {
      const targetScale = isHovered ? 1.6 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.12
      );
    }
  });

  const hexColor = new THREE.Color(color);

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(label)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={hexColor}
          emissive={hexColor}
          emissiveIntensity={isHovered ? 2.5 : 1.2}
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>
      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color={hexColor} transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <Text
        position={[0, 0.22, 0]}
        fontSize={0.11}
        color={color}
        anchorX="center"
        anchorY="bottom"
        font={undefined}
        fillOpacity={isHovered ? 1 : 0.6}
      >
        {label}
      </Text>
    </group>
  );
};

const Scene: React.FC<{ categories: SkillCategory[]; mousePos: React.MutableRefObject<[number, number]> }> = ({
  categories,
  mousePos,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { gl } = useThree();

  gl.setClearColor(new THREE.Color('#020409'), 0);

  const NODE_COLORS: Record<string, string> = {
    leadership: '#40E0D0',
    strategy: '#FF6B35',
    automation: '#A78BFA',
    engineering: '#00F2FF',
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#00F2FF" />
      <pointLight position={[-3, -2, -2]} intensity={0.6} color="#FF6B35" />

      {/* Background particle sphere — subtle */}
      <ConstellationPoints count={800} radius={2.4} color="#00F2FF" mousePos={mousePos} />

      {/* Secondary sparse cloud */}
      <ConstellationPoints count={200} radius={2.8} color="#FF6B35" mousePos={mousePos} />

      {/* Category orbital nodes */}
      {categories.map((cat, i) => (
        <NodeOrbit
          key={cat.id}
          label={cat.title}
          angle={(i / categories.length) * Math.PI * 2}
          orbitRadius={1.2}
          color={NODE_COLORS[cat.id] ?? '#FFFFFF'}
          isHovered={hoveredNode === cat.title}
          onHover={setHoveredNode}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </>
  );
};

interface SkillConstellationProps {
  categories: SkillCategory[];
  className?: string;
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({
  categories,
  className = '',
}) => {
  const mousePos = useRef<[number, number]>([0, 0]);
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id ?? '');

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeTab),
    [categories, activeTab]
  );

  const NODE_COLORS: Record<string, string> = {
    leadership: '#40E0D0',
    strategy: '#FF6B35',
    automation: '#A78BFA',
    engineering: '#00F2FF',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[#020409] shadow-[0_40px_120px_rgba(0,0,0,0.7)] ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 p-6 lg:px-8 lg:pt-8">
        <div>
          <h2 className="font-['Playfair_Display'] italic text-[clamp(1.75rem,4vw,3rem)] text-white mb-1 flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-orange-400 rounded-full not-italic" />
            Skill Constellation
          </h2>
          <p className="font-['Geist',_sans-serif] text-[10px] uppercase tracking-widest text-white/40">
            Drag to rotate · Hover nodes to activate
          </p>
        </div>
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`font-['Geist',_sans-serif] text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-200 ${
                activeTab === cat.id
                  ? 'border-cyan-400/60 text-cyan-400 bg-cyan-400/10 shadow-[0_0_12px_rgba(0,242,255,0.2)]'
                  : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {cat.title}
              <span className="ml-1.5 opacity-60">({cat.items.length})</span>
            </button>
          ))}
        </div>
      </div>

      {/* WebGL + skill list side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px]">
        {/* Canvas */}
        <div
          className="relative h-[380px] lg:h-[460px]"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mousePos.current = [
              ((e.clientX - rect.left) / rect.width - 0.5) * 2,
              ((e.clientY - rect.top) / rect.height - 0.5) * 2,
            ];
          }}
          onMouseLeave={() => {
            mousePos.current = [0, 0];
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 3.8], fov: 55 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <Scene categories={categories} mousePos={mousePos} />
            </Suspense>
          </Canvas>

          {/* Radial fade overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 55%, #020409 95%)',
            }}
          />
        </div>

        {/* Skill list panel */}
        <div className="border-t lg:border-t-0 lg:border-l border-white/[0.06] p-5 lg:p-6 overflow-y-auto max-h-[460px] custom-scrollbar">
          {activeCategory && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: NODE_COLORS[activeCategory.id] ?? '#fff' }}
                />
                <span
                  className="font-['Geist',_sans-serif] text-[10px] uppercase tracking-widest"
                  style={{ color: NODE_COLORS[activeCategory.id] ?? '#fff' }}
                >
                  {activeCategory.title}
                </span>
                <span className="ml-auto font-['Geist',_sans-serif] text-[9px] text-white/25 uppercase tracking-widest">
                  {activeCategory.items.length} nodes
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {activeCategory.items.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-150 group"
                  >
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ background: NODE_COLORS[activeCategory.id] ?? '#fff' }}
                    />
                    <span className="text-white/60 text-xs group-hover:text-white/80 transition-colors duration-150 leading-tight">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
