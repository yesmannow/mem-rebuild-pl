import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';
import PhysicsBackground from './PhysicsBackground';
import { ApiBackgroundImage } from '../ui/ApiBackgroundImage';

// Sample projects data - ideally this would come from a CMS or props
export interface Project {
  id: string;
  name: string;
  hero?: string;
  imageQuery?: string;
  stack: string[];
  tags?: string[];
}

type MagnetType = 'ai' | 'brand' | 'digital';

const MAGNET_FILTERS: Array<{ id: MagnetType; label: string; match: (project: Project) => boolean }> = [
  {
    id: 'ai',
    label: '[AI]',
    match: (project) => project.tags?.some((tag) => /ai|automation|machine/i.test(tag)) ?? false,
  },
  {
    id: 'brand',
    label: '[Brand]',
    match: (project) => project.tags?.some((tag) => /brand|identity|logo/i.test(tag)) ?? false,
  },
  {
    id: 'digital',
    label: '[Digital]',
    match: (project) => project.tags?.some((tag) => /web|digital|app|seo|marketing/i.test(tag)) ?? false,
  },
];

const DEFAULT_PROJECTS: Project[] = [
  { id: '317-bbq', name: '317 BBQ', imageQuery: 'smokehouse barbecue fire ember dark noir', stack: ['React', 'Node.js'], tags: ['web', 'digital', 'commerce'] },
  { id: 'behr-pet', name: 'Behr Pet Essentials', imageQuery: 'pet care product lifestyle minimal white clean', stack: ['Shopify', 'Liquid'], tags: ['brand', 'identity', 'web'] },
  { id: 'black-letter', name: 'Black Letter', imageQuery: 'editorial typography dark ink minimal black white luxury', stack: ['Vue', 'Express'], tags: ['brand', 'identity', 'digital'] },
  { id: 'circle-city', name: 'Circle City Kicks', imageQuery: 'sneaker streetwear urban culture neon night', stack: ['Next.js', 'Tailwind'], tags: ['web', 'digital', 'app'] },
  { id: 'clean-aesthetic', name: 'Clean Aesthetic', imageQuery: 'minimalist interior design clean white modern architecture', stack: ['Webflow', 'GSAP'], tags: ['brand', 'web', 'digital'] },
  { id: 'hoosierboy', name: 'Hoosierboy Barbershop', imageQuery: 'barbershop vintage grooming dark moody interior', stack: ['HTML', 'CSS', 'JS'], tags: ['brand', 'web', 'digital'] },
  { id: 'perpetual', name: 'Perpetual Movement', imageQuery: 'fitness training athlete dark cinematic motion blur', stack: ['React Native', 'Firebase'], tags: ['ai', 'automation', 'app', 'digital'] },
  { id: 'piko', name: 'Piko Fg Music', imageQuery: 'music producer studio neon abstract sound wave dark', stack: ['Next.js', 'Sanity'], tags: ['brand', 'web', 'digital'] },
];

const CARD_WIDTH = 150;
const CARD_HEIGHT = 200;

export const PhysicsVault: React.FC<{ onProjectSelect: (project: Project) => void; projects?: Project[] }> = ({
  onProjectSelect,
  projects,
}) => {
  const activeProjects = projects && projects.length ? projects : DEFAULT_PROJECTS;
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyMapRef = useRef<Map<string, Matter.Body>>(new Map());
  const [positions, setPositions] = useState<Record<string, { x: number; y: number; angle: number; speed: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [activeMagnet, setActiveMagnet] = useState<MagnetType | null>(null);
  const [flashedCards, setFlashedCards] = useState<Record<string, number>>({});
  const [ripple, setRipple] = useState({ x: 0.5, y: 0.5, intensity: 0 });
  const [nodePositions, setNodePositions] = useState<Record<MagnetType, { x: number; y: number }>>({
    ai: { x: 90, y: 130 },
    brand: { x: 90, y: 220 },
    digital: { x: 90, y: 310 },
  });
  const [draggingNode, setDraggingNode] = useState<MagnetType | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup Engine
    const engine = Matter.Engine.create();
    engine.world.gravity.y = 0.3;

    // Get container dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Boundaries
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -500, width * 2, 100, wallOptions);

    Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    bodyMapRef.current.clear();
    const bodies = activeProjects.map((project) => {
      const x = Math.random() * (width - CARD_WIDTH * 2) + CARD_WIDTH;
      const y = -Math.random() * 1000 - CARD_HEIGHT; // Drop from above

      const body = Matter.Bodies.rectangle(x, y, CARD_WIDTH, CARD_HEIGHT, {
        chamfer: { radius: 10 },
        restitution: 0.6,
        frictionAir: 0.05,
        render: { visible: false },
        label: project.id
      });

      bodyMapRef.current.set(project.id, body);
      return body;
    });

    Matter.Composite.add(engine.world, bodies);

    // Instead of a canvas renderer, we sync positions to React state
    let frameId = 0;
    const updatePositions = () => {
      if (activeMagnet && containerRef.current) {
        const filter = MAGNET_FILTERS.find((item) => item.id === activeMagnet);
        const center = {
          x: containerRef.current.clientWidth / 2,
          y: containerRef.current.clientHeight / 2,
        };

        if (filter) {
          activeProjects.forEach((project) => {
            if (!filter.match(project)) return;
            const body = bodyMapRef.current.get(project.id);
            if (!body) return;
            const dx = center.x - body.position.x;
            const dy = center.y - body.position.y;
            Matter.Body.applyForce(body, body.position, {
              x: dx * 0.000015,
              y: dy * 0.000015,
            });
          });
        }
      }

      const newPositions: Record<string, { x: number; y: number; angle: number; speed: number }> = {};
      bodies.forEach(body => {
        const speed = Math.hypot(body.velocity.x, body.velocity.y);
        newPositions[body.label] = {
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
          speed,
        };
      });
      setPositions(newPositions);
      setRipple((prev) => ({
        ...prev,
        intensity: Math.max(0, prev.intensity * 0.92 - 0.01),
      }));
      frameId = requestAnimationFrame(updatePositions);
    };

    frameId = requestAnimationFrame(updatePositions);

    // Mouse Interaction for DOM overlay (invisible canvas just for mouse handling)
    const render = Matter.Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        hasBounds: false,
        pixelRatio: window.devicePixelRatio
      }
    });

    // Hide the actual canvas completely, we just need it for the Mouse constraint
    if (render.canvas) {
      render.canvas.style.position = 'absolute';
      render.canvas.style.top = '0';
      render.canvas.style.left = '0';
      render.canvas.style.opacity = '0';
      render.canvas.style.zIndex = '10';
    }

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.12,
        damping: 0.05,
        render: { visible: false }
      }
    });

    Matter.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Track dragging state
    Matter.Events.on(mouseConstraint, 'startdrag', () => setIsDragging(true));
    Matter.Events.on(mouseConstraint, 'enddrag', () => {
      // Small delay to prevent click firing immediately after drag
      setTimeout(() => setIsDragging(false), 50);
    });

    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const collisionBodies = [pair.bodyA, pair.bodyB];
        const dynamicBodies = collisionBodies.filter((body) => !body.isStatic);

        if (dynamicBodies.length >= 2) {
          setFlashedCards((prev) => {
            const next = { ...prev };
            dynamicBodies.forEach((body) => {
              next[body.label] = Date.now();
            });
            return next;
          });
        }

        if (dynamicBodies.length && collisionBodies.some((body) => body.isStatic) && containerRef.current) {
          const hit = dynamicBodies[0];
          const widthNow = containerRef.current.clientWidth || 1;
          const heightNow = containerRef.current.clientHeight || 1;
          setRipple({
            x: Math.min(1, Math.max(0, hit.position.x / widthNow)),
            y: Math.min(1, Math.max(0, hit.position.y / heightNow)),
            intensity: 0.85,
          });
        }
      });
    });

    // Start Engine (but no render.run)
    Matter.Runner.run(engine);
    Matter.Render.run(render);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      Matter.Mouse.setScale(mouse, { x: 1, y: 1 });

      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, [activeMagnet, activeProjects]);

  useEffect(() => {
    if (!draggingNode) return;

    const handleMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setNodePositions((prev) => ({
        ...prev,
        [draggingNode]: {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        },
      }));
    };

    const handleUp = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pos = nodePositions[draggingNode];
      const center = { x: rect.width / 2, y: rect.height / 2 };
      const distance = Math.hypot(pos.x - center.x, pos.y - center.y);

      if (distance < 120) {
        setActiveMagnet(draggingNode);
      } else if (activeMagnet === draggingNode) {
        setActiveMagnet(null);
      }

      setDraggingNode(null);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp, { once: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [activeMagnet, draggingNode, nodePositions]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-neutral-950" ref={containerRef}>
      {/* Screen-reader fallback — WebGL canvas is invisible to assistive tech */}
      <div className="sr-only">
        <h2>Interactive Side Projects Sandbox</h2>
        <ul>
          {activeProjects.map((p) => (
            <li key={p.id}>
              {p.name}
              {p.tags && p.tags.length > 0 ? `: ${p.tags.join(', ')}` : ''}
            </li>
          ))}
        </ul>
      </div>

      {/* Background Grid/Styling */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-80">
        <PhysicsBackground ripple={ripple} />
      </div>

      {/* Vault Title */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <h2 className="text-4xl font-black text-white/80 tracking-tighter mix-blend-overlay">THE VAULT</h2>
        <p className="text-cyan-500/70 font-mono text-xs uppercase mt-2">PHYSICS_ENABLED // INTERACTIVE_ARCHIVE</p>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-cyan-400/20" />
      </div>

      {MAGNET_FILTERS.map((node) => {
        const pos = nodePositions[node.id];
        const active = activeMagnet === node.id;
        return (
          <button
            key={node.id}
            type="button"
            onMouseDown={() => setDraggingNode(node.id)}
            className={`absolute z-30 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] tech-label transition-colors ${
              active ? 'bg-cyan-500/25 border-cyan-300 text-cyan-100' : 'bg-black/70 border-cyan-500/30 text-cyan-300'
            }`}
            style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
          >
            {node.label}
          </button>
        );
      })}

      {/* DOM-based Physics Bodies */}
      {activeProjects.map(project => {
        const pos = positions[project.id];
        if (!pos) return null;

        return (
          <motion.div
            key={project.id}
            layoutId={`project-${project.id}`}
            onClick={() => {
              if (!isDragging) {
                onProjectSelect(project);
              }
            }}
            className="absolute rounded-xl overflow-hidden shadow-2xl border border-white/10 group cursor-grab active:cursor-grabbing z-0 hover:z-30 hover:border-cyan-500/50 hover:shadow-cyan-500/20 transition-colors"
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              left: 0,
              top: 0,
              transform: `translate(${pos.x - CARD_WIDTH / 2}px, ${pos.y - CARD_HEIGHT / 2}px) rotate(${pos.angle}rad)`,
              filter: `blur(${Math.min(3, pos.speed * 0.08)}px) brightness(${flashedCards[project.id] && Date.now() - flashedCards[project.id] < 220 ? 1.5 : 1})`,
            }}
          >
            {project.imageQuery ? (
              <ApiBackgroundImage
                query={project.imageQuery}
                source="auto"
                overlayOpacity={0.35}
                twilight
                className="w-full h-full"
                fallbackGradient="linear-gradient(135deg,#0a0a0a,#1a1a2e)"
              />
            ) : project.hero ? (
              <img
                src={project.hero}
                alt={project.name}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
                style={{ filter: 'brightness(0.4) contrast(1.2) grayscale(0.2)' }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800" />
            )}

            {/* Overlay for hover state */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="text-white font-black uppercase text-xs tracking-widest bg-black/50 px-3 py-1.5 rounded backdrop-blur-sm border border-white/20">
                View Dossier
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
