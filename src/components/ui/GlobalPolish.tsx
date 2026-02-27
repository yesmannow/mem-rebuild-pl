import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 right-0 w-[2px] h-full bg-cyan-400 origin-top z-[9999]"
      style={{ scaleY }}
    />
  );
};

export const DataDustCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const COUNT = 70;
    particlesRef.current = Array.from({ length: COUNT }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);

    const step = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#00F2FF';

      const { x: mx, y: my } = mouseRef.current;
      for (const p of particlesRef.current) {
        const ax = (mx - p.x) * 0.0006;
        const ay = (my - p.y) * 0.0006;
        p.vx = (p.vx + ax) * 0.985;
        p.vy = (p.vy + ay) * 0.985;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" style={{ opacity: 0.05 }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export const InvertedCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringLight, setIsHoveringLight] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check element under cursor to determine color inversion
      // Using elementsFromPoint for better precision, especially checking background colors
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      let foundLightBg = false;

      for (const el of elements) {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;

        // Very basic check for light backgrounds (white, light gray, cyan accents)
        // RGB values closer to 255
        if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10);
            const g = parseInt(rgbMatch[2], 10);
            const b = parseInt(rgbMatch[3], 10);

            // Brightness formula
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            if (brightness > 128) {
              foundLightBg = true;
              break;
            }
          }
        }
      }

      setIsHoveringLight(foundLightBg);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';

    // Add CSS rule to force hide cursor on all elements
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[10000] w-4 h-4 rounded-full mix-blend-difference"
      animate={{
        x: mousePos.x - 8,
        y: mousePos.y - 8,
        backgroundColor: isHoveringLight ? '#000000' : '#00F2FF',
        scale: isHoveringLight ? 1.5 : 1
      }}
      transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      style={{
        willChange: 'transform'
      }}
    />
  );
};
