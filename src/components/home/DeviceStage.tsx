/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import {
  PresentationControls,
  Float,
  ContactShadows,
  Environment,
  Text,
  QuadraticBezierLine
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Activity, Cpu, Wifi } from 'lucide-react';

extend(THREE);

// ── Types ────────────────────────────────────────────────────────────────────
interface DeviceStageProps {
  color?: string;
  label?: string;
  videoUrl?: string;
}

interface BentoNodeDef {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  offset: [number, number];
}

// ── Cursor-following point light ─────────────────────────────────────────────
function CursorLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    if (!lightRef.current) return;
    lightRef.current.position.x = (mouse.x * viewport.width)  / 2;
    lightRef.current.position.y = (mouse.y * viewport.height) / 2;
    lightRef.current.position.z = 3;
  });

  return <primitive object={new THREE.PointLight('#22d3ee', 0.8, 8)} ref={lightRef} />;
}

// ── 3D Interactive Architecture Nodes ────────────────────────────────────────
const NODES: Record<string, { label: string; pos: THREE.Vector3 }> = {
  ads:  { label: 'ADS',  pos: new THREE.Vector3(0, 0.6, 0.08) },
  crm:  { label: 'CRM',  pos: new THREE.Vector3(0.28, 0.2, 0.08) },
  auto: { label: 'AUTO', pos: new THREE.Vector3(0.18, -0.4, 0.08) },
  roi:  { label: 'ROI',  pos: new THREE.Vector3(-0.18, -0.4, 0.08) },
  data: { label: 'DATA', pos: new THREE.Vector3(-0.28, 0.2, 0.08) },
};

const OUTGOING_EDGES: Record<string, string[]> = {
  ads:  ['crm', 'roi'],
  crm:  ['auto', 'data'],
  auto: ['roi'],
  roi:  ['data'],
  data: ['ads'],
};

const EDGES: [string, string][] = [];
Object.entries(OUTGOING_EDGES).forEach(([src, targets]) => {
  targets.forEach(tgt => EDGES.push([src, tgt]));
});

function ArchitectureNodes3D({ color, visible }: { color: string; visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null!);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);
  
  const curves = useMemo(() => {
    const map = new Map<string, THREE.QuadraticBezierCurve3>();
    EDGES.forEach(([a, b]) => {
      const pA = NODES[a].pos;
      const pB = NODES[b].pos;
      const mid = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);
      mid.x *= 1.2;
      mid.y *= 1.2;
      mid.z += 0.06; // arch outwards slightly
      map.set(`${a}_${b}`, new THREE.QuadraticBezierCurve3(pA, mid, pB));
    });
    return map;
  }, []);

  const packetsRef = useRef<{ id: string; src: string; tgt: string; progress: number }[]>([]);

  const spawnPacket = (src: string, tgt: string) => {
    packetsRef.current.push({
      id: Math.random().toString(),
      src,
      tgt,
      progress: 0,
    });
  };

  const handleNodeClick = (nodeId: string) => {
    const targets = OUTGOING_EDGES[nodeId] || [];
    targets.forEach(t => spawnPacket(nodeId, t));
  };

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    
    // Smoothly scale in/out based on architectMode
    const targetScale = visible ? 1 : 0;
    groupRef.current.scale.lerpScalar(targetScale, 0.1);
    
    // Don't process logic if hidden
    if (!visible && groupRef.current.scale.x < 0.01) return;

    if (instancedMeshRef.current) {
      const dummy = new THREE.Object3D();
      let count = 0;
      for (let i = packetsRef.current.length - 1; i >= 0; i--) {
        const p = packetsRef.current[i];
        p.progress += delta * 1.5; // packet travel speed
        
        if (p.progress >= 1) {
          // Chain to next node randomly to create ongoing flow
          const nextTargets = OUTGOING_EDGES[p.tgt] || [];
          if (nextTargets.length > 0 && Math.random() > 0.3) {
            const nextTgt = nextTargets[Math.floor(Math.random() * nextTargets.length)];
            packetsRef.current.push({ id: Math.random().toString(), src: p.tgt, tgt: nextTgt, progress: 0 });
          }
          packetsRef.current.splice(i, 1);
          continue;
        }

        const curve = curves.get(`${p.src}_${p.tgt}`);
        if (curve) {
          const pt = curve.getPoint(p.progress);
          dummy.position.copy(pt);
          dummy.scale.setScalar(1 - Math.abs(p.progress - 0.5) * 0.5);
          dummy.updateMatrix();
          instancedMeshRef.current.setMatrixAt(count, dummy.matrix);
          count++;
        }
      }
      instancedMeshRef.current.count = count;
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    // @ts-expect-error
    <group ref={groupRef} scale={0}>
      {/* Edges */}
      {EDGES.map(([a, b]) => {
        const curve = curves.get(`${a}_${b}`)!;
        return (
          <QuadraticBezierLine
            key={`${a}_${b}`}
            start={curve.v0}
            mid={curve.v1}
            end={curve.v2}
            color={color}
            lineWidth={1.5}
            transparent
            opacity={0.3}
          />
        );
      })}

      {/* Nodes */}
      {Object.entries(NODES).map(([id, node]) => (
        // @ts-expect-error
        <group 
          key={id} 
          position={node.pos} 
          onClick={(e: any) => { e.stopPropagation(); handleNodeClick(id); }}
          onPointerOver={(e: any) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={(e: any) => { e.stopPropagation(); setHovered(false); }}
        >
          {/* Visible Node */}
          {/* @ts-expect-error */}
          <mesh>
            {/* @ts-expect-error */}
            <sphereGeometry args={[0.035, 16, 16]} />
            {/* @ts-expect-error */}
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
          </mesh>
          
          {/* Invisible Hit Area */}
          {/* @ts-expect-error */}
          <mesh>
            {/* @ts-expect-error */}
            <sphereGeometry args={[0.1, 8, 8]} />
            {/* @ts-expect-error */}
            <meshBasicMaterial visible={false} />
          </mesh>

          {/* Node Label */}
          <Text
            position={[0, -0.08, 0]}
            fontSize={0.06}
            color={color}
            anchorX="center"
            anchorY="middle"
          >
            {node.label}
          </Text>
        </group>
      ))}

      {/* Data Packets (Pulses) */}
      {/* @ts-expect-error */}
      <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, 100]} frustumCulled={false}>
        {/* @ts-expect-error */}
        <sphereGeometry args={[0.015, 8, 8]} />
        {/* @ts-expect-error */}
        <meshBasicMaterial color="#ffffff" />
      </instancedMesh>
    </group>
  );
}

// ── Obsidian device mesh ──────────────────────────────────────────────────────
function ObsidianDevice({
  videoUrl,
  architectMode,
  color,
}: {
  videoUrl?: string;
  architectMode: boolean;
  color: string;
}) {
  const groupRef  = useRef<THREE.Group>(null!);
  const rimMeshRef = useRef<THREE.Mesh>(null!);
  const [videoTex, setVideoTex] = useState<THREE.VideoTexture | null>(null);

  useEffect(() => {
    if (!videoUrl) return;
    const vid = document.createElement('video');
    vid.src       = videoUrl;
    vid.loop      = true;
    vid.muted     = true;
    vid.playsInline = true;
    vid.play().catch(() => {/* needs user gesture */});
    const tex = new THREE.VideoTexture(vid);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    setVideoTex(tex);
    return () => { vid.pause(); tex.dispose(); };
  }, [videoUrl]);

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:           '#0a0a0f',
    roughness:       0.2,
    metalness:       0.8,
    envMapIntensity: 1.2,
    transparent:     true,
    opacity:         1,
  }), []);

  const screenMat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color:            videoTex ? '#ffffff' : '#050507',
      roughness:        0.05,
      metalness:        0.1,
      emissive:         new THREE.Color(videoTex ? '#000000' : color),
      emissiveIntensity: videoTex ? 0 : 0.12,
      transparent:      true,
      opacity:          1,
    });
    if (videoTex) m.map = videoTex;
    return m;
  }, [videoTex, color]);

  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    roughness:        0.3,
    metalness:        0.9,
    emissive:         new THREE.Color(color),
    emissiveIntensity: 0.3,
  }), [color]);

  const rimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    transparent:       true,
    opacity:           0.07,
    side:              THREE.BackSide,
    emissive:          new THREE.Color(color),
    emissiveIntensity: 0.2,
  }), [color]);

  // Smooth material transitions
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Breathe
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.04;

    // Cross-fade opacity based on mode
    const targetBodyOp = architectMode ? 0.15 : 1;
    bodyMat.opacity = THREE.MathUtils.lerp(bodyMat.opacity, targetBodyOp, 0.1);

    const targetScreenOp = architectMode ? 0.05 : 1;
    screenMat.opacity = THREE.MathUtils.lerp(screenMat.opacity, targetScreenOp, 0.1);

    const targetRimOp = architectMode ? 0.25 : 0.07;
    rimMat.opacity = THREE.MathUtils.lerp(rimMat.opacity, targetRimOp, 0.1);
    
    const targetEmissive = architectMode ? 0.6 : 0.2;
    rimMat.emissiveIntensity = THREE.MathUtils.lerp(rimMat.emissiveIntensity, targetEmissive, 0.1);

    if (rimMeshRef.current) {
      const targetScale = architectMode ? 1.12 : 1.0;
      rimMeshRef.current.scale.lerpScalar(targetScale, 0.1);
    }
  });

  return (
    // @ts-expect-error
    <group ref={groupRef}>
      {/* Body */}
      {/* @ts-expect-error */}
      <mesh material={bodyMat} castShadow>
        {/* @ts-expect-error */}
        <boxGeometry args={[1.0, 2.0, 0.1]} />
      </mesh>

      {/* Screen */}
      {/* @ts-expect-error */}
      <mesh position={[0, 0, 0.052]} material={screenMat}>
        {/* @ts-expect-error */}
        <planeGeometry args={[0.84, 1.72]} />
      </mesh>

      {/* Top accent */}
      {/* @ts-expect-error */}
      <mesh position={[0, 1.02, 0.052]} material={accentMat}>
        {/* @ts-expect-error */}
        <planeGeometry args={[0.28, 0.008]} />
      </mesh>

      {/* Home indicator */}
      {/* @ts-expect-error */}
      <mesh position={[0, -1.02, 0.052]} material={accentMat}>
        {/* @ts-expect-error */}
        <cylinderGeometry args={[0.04, 0.04, 0.008, 32]} />
      </mesh>

      {/* Rim glow (BackSide) */}
      {/* @ts-expect-error */}
      <mesh ref={rimMeshRef} material={rimMat}>
        {/* @ts-expect-error */}
        <boxGeometry args={[1.02, 2.02, 0.102]} />
      </mesh>
    </group>
  );
}

// ── Floating Bento-Metrics nodes ──────────────────────────────────────────────
function BentoMetrics({ color, label }: { color: string; label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  const nodes: BentoNodeDef[] = [
    { id: 'stack',   label: 'STACK',   value: 'NEXT.JS', icon: <Cpu     size={9} />, offset: [-40, -26] },
    { id: 'uptime',  label: 'UPTIME',  value: '99.9%',   icon: <Wifi    size={9} />, offset: [ 40, -26] },
    { id: 'latency', label: 'LATENCY', value: '42ms',    icon: <Activity size={9} />, offset: [-40,  26] },
    {
      id: 'project', label: 'PROJECT',
      value: label.toUpperCase().replace(/-/g, ' ').slice(0, 12),
      icon: <Eye size={9} />,
      offset: [40, 26],
    },
  ];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMx(((e.clientX - r.left)  / r.width  - 0.5) * 2);
      setMy(((e.clientY - r.top)   / r.height - 0.5) * 2);
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none">
      {nodes.map((node) => {
        const pull = 6;
        const dx = mx * pull * (node.offset[0] < 0 ? -0.35 : 0.35);
        const dy = my * pull * (node.offset[1] < 0 ? -0.35 : 0.35);
        return (
          <motion.div
            key={node.id}
            className="absolute pointer-events-auto"
            style={{
              left:      `calc(50% + ${node.offset[0]}%)`,
              top:       `calc(50% + ${node.offset[1]}%)`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ x: dx, y: dy }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            initial={{ opacity: 0, scale: 0.75 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              style={{
                background:     'rgba(5,5,7,0.82)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border:         `1px solid ${color}28`,
                borderRadius:   8,
                padding:        '5px 9px',
                boxShadow:      `0 0 18px ${color}0E, inset 0 1px 0 rgba(255,255,255,0.04)`,
                minWidth:       72,
              }}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.14 }}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <span style={{ color: `${color}80` }}>{node.icon}</span>
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: 6, letterSpacing: '0.18em', color: `${color}55` }}
                >
                  {node.label}
                </span>
              </div>
              <div
                className="font-mono font-bold tabular-nums"
                style={{ fontSize: 10, color, lineHeight: 1 }}
              >
                {node.value}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
const DeviceStage: React.FC<DeviceStageProps> = ({
  color    = '#22d3ee',
  label    = 'interactive',
  videoUrl = '',
}) => {
  const [architectMode, setArchitectMode] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[460px] flex flex-col">

      {/* Architecture toggle */}
      <div className="absolute top-3 right-3 z-30">
        <motion.button
          onClick={() => setArchitectMode(v => !v)}
          className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 rounded-lg"
          style={{
            background:     architectMode ? `${color}18` : 'rgba(0,0,0,0.55)',
            border:         `1px solid ${architectMode ? color : 'rgba(255,255,255,0.08)'}`,
            color:          architectMode ? color : 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(8px)',
          }}
          whileTap={{ scale: 0.93 }}
          transition={{ duration: 0.1 }}
        >
          {architectMode ? <EyeOff size={10} /> : <Eye size={10} />}
          {architectMode ? 'EXIT ARCH' : 'VIEW ARCHITECTURE'}
        </motion.button>
      </div>

      {/* R3F Canvas */}
      <div className="relative flex-1">
        <Canvas
          shadows
          camera={{ position: [0, 0, 4.2], fov: 36 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          {/* @ts-expect-error */}
          <ambientLight intensity={0.14} />
          {/* @ts-expect-error */}
          <spotLight
            position={[5, 5, 5]}
            color="#22d3ee"
            intensity={1.2}
            angle={0.4}
            penumbra={0.8}
            castShadow
          />
          <CursorLight />

          <Suspense fallback={null}>
            <Environment preset="night" />
            <PresentationControls
              global
              speed={1.3}
              zoom={0.9}
              rotation={[0.06, -0.18, 0]}
              polar={[-0.35, 0.35]}
              azimuth={[-0.75, 0.75]}
            >
              <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
                <ObsidianDevice
                  videoUrl={videoUrl}
                  architectMode={architectMode}
                  color={color}
                />
                <ArchitectureNodes3D color={color} visible={architectMode} />
              </Float>
            </PresentationControls>

            {/* @ts-expect-error */}
            <ContactShadows
              position={[0, -1.35, 0]}
              opacity={0.45}
              blur={1.5}
              far={3}
              scale={4}
            />
          </Suspense>
        </Canvas>

        {/* Bento metrics */}
        <BentoMetrics color={color} label={label} />
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5 font-mono text-[9px] shrink-0"
        style={{
          borderTop:  `1px solid ${color}18`,
          background: 'rgba(0,0,0,0.28)',
          color:      `${color}45`,
        }}
      >
        <span className="uppercase tracking-widest">3D STAGE · {label.toUpperCase()}</span>
        <span className="flex items-center gap-1.5">
          {architectMode ? (
            <span className="text-[9px]">CLICK NODES TO INJECT DATA</span>
          ) : (
            <>
              <span
                className="w-1 h-1 rounded-full animate-pulse"
                style={{ background: color }}
              />
              DRAG · ROTATE · ZOOM
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default DeviceStage;
