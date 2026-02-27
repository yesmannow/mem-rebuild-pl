import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { sideProjects } from '../../data/sideProjects';

export const PhysicsVault: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [ripplePos, setRipplePos] = useState<{x: number, y: number} | null>(null);

  const categories = ['AI', 'Web3', 'Automation'];
  const isEmpty = !sideProjects || sideProjects.length === 0;

  useEffect(() => {
    if (isEmpty || !containerRef.current) return;

    // Initialize Matter.js engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.2, scale: 0.001 } // Light gravity
    });
    engineRef.current = engine;

    const render = Matter.Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
        wireframes: false,
        background: 'transparent',
      }
    });
    renderRef.current = render;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    Matter.World.add(engine.world, [
      Matter.Bodies.rectangle(width / 2, -50, width, 100, wallOptions),
      Matter.Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
      Matter.Bodies.rectangle(-50, height / 2, 100, height, wallOptions),
      Matter.Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions),
    ]);

    // Add project bodies
    const projectBodies = sideProjects.map((project) => {
      // Create HTML element for the body
      const el = document.createElement('div');
      el.className = 'absolute cursor-grab active:cursor-grabbing bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-white w-64 select-none';
      el.innerHTML = `
        <div class="font-['Geist_Mono',_monospace] text-[10px] uppercase tracking-widest text-cyan-400 mb-2">${project.category[0] || 'Experiment'}</div>
        <h3 class="font-sans font-black tracking-tighter text-xl mb-2">${project.title}</h3>
        <p class="font-['Geist',_sans-serif] text-sm text-white/70 leading-relaxed line-clamp-2">${project.description}</p>
      `;
      containerRef.current?.appendChild(el);

      const body = Matter.Bodies.rectangle(
        Math.random() * (width - 300) + 150,
        Math.random() * (height - 300) + 150,
        256, 140, // Match w-64 and approx h
        {
          restitution: 0.8,
          frictionAir: 0.05,
          friction: 0.1,
          render: { visible: false },
          label: `project-${project.id}`
        }
      );

      // Link DOM to Body
      body.plugin.el = el;
      body.plugin.project = project;

      return body;
    });

    Matter.World.add(engine.world, projectBodies);

    // Add Mouse Constraint for dragging
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Matter.World.add(engine.world, mouseConstraint);
    render.mouse = mouse; // Keep the mouse in sync with rendering

    // Handle Collisions for Ripple Shader
    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const isWallA = pair.bodyA.isStatic;
        const isWallB = pair.bodyB.isStatic;
        if ((isWallA || isWallB) && pair.collision.depth > 2) {
          const impact = isWallA ? pair.bodyA.position : pair.bodyB.position;
          triggerRipple(impact.x, impact.y);
        }
      });
    });

    // Handle Clicks
    let isDragging = false;
    Matter.Events.on(mouseConstraint, 'startdrag', () => { isDragging = true; });
    Matter.Events.on(mouseConstraint, 'enddrag', () => {
      setTimeout(() => { isDragging = false; }, 100);
    });

    containerRef.current.addEventListener('click', (e) => {
      if (isDragging) return;
      const rect = containerRef.current!.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const clickedBody = Matter.Query.point(projectBodies, { x: px, y: py })[0];
      if (clickedBody && clickedBody.plugin.project) {
        navigate(`/side-projects/${clickedBody.plugin.project.id}`);
      }
    });

    // Render loop to sync DOM elements with Matter bodies
    Matter.Events.on(render, 'afterRender', () => {
      projectBodies.forEach((body) => {
        if (body.plugin.el) {
          const { x, y } = body.position;
          body.plugin.el.style.transform = `translate(${x - 128}px, ${y - 70}px) rotate(${body.angle}rad)`;

          // Apply magnetic force if category is active
          if (activeCategory && body.plugin.project.category.includes(activeCategory)) {
            const forceMagnitude = 0.001 * body.mass;
            Matter.Body.applyForce(body, body.position, {
              x: (width/2 - body.position.x) * forceMagnitude,
              y: (height/2 - body.position.y) * forceMagnitude
            });
          }
        }
      });
    });

    // Start engine
    Matter.Runner.run(engine);
    Matter.Render.run(render);

    // Handle Resize
    const handleResize = () => {
      render.canvas.width = containerRef.current?.clientWidth || 0;
      render.canvas.height = containerRef.current?.clientHeight || 0;
    };
    window.addEventListener('resize', handleResize);

    const currentContainer = containerRef.current;
    return () => {
      window.removeEventListener('resize', handleResize);
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
      if (currentContainer) {
         Array.from(currentContainer.children).forEach(child => {
           if (child !== render.canvas && !child.classList.contains('ripple') && !(child as HTMLElement).classList.contains('category-magnet')) {
             child.remove();
           }
         });
      }
    };
  }, [activeCategory, isEmpty, navigate]);

  const triggerRipple = (x: number, y: number) => {
    setRipplePos({ x, y });
    setTimeout(() => setRipplePos(null), 1000);
  };

  if (isEmpty) {
    return (
      <div className="flex items-center justify-center w-full h-full text-white/40 font-mono text-sm uppercase tracking-widest">
        [ VAULT EMPTY — NO PROJECTS FOUND ]
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-transparent rounded-3xl border border-white/10" ref={containerRef}>

      {/* WebGL Ripple Shader Placeholder */}
      <AnimatePresence>
        {ripplePos && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="ripple absolute w-64 h-64 rounded-full border border-cyan-400/50 pointer-events-none z-0"
            style={{
              left: ripplePos.x - 128,
              top: ripplePos.y - 128,
              boxShadow: '0 0 40px rgba(0,242,255,0.4) inset'
            }}
          />
        )}
      </AnimatePresence>

      {/* Category Magnets */}
      <div className="category-magnet absolute top-6 left-1/2 -translate-x-1/2 flex gap-4 z-50">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-6 py-2 rounded-full font-['Geist_Mono',_monospace] text-[10px] uppercase tracking-widest transition-all backdrop-blur-sm border ${
              activeCategory === cat
                ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_20px_rgba(0,242,255,0.5)]'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
            }`}
          >
            [{cat}]
          </button>
        ))}
      </div>
    </div>
  );
};
