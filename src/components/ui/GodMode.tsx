import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GodModeProps {
  active: boolean;
}

const GodMode: React.FC<GodModeProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      dropsRef.current = Array(columns).fill(1);
    };

    const render = () => {
      const { width, height } = canvas;
      const fontSize = 16;
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#40E0D0';
      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      dropsRef.current.forEach((drop, i) => {
        const text = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
        ctx.fillText(text, i * fontSize, drop * fontSize);

        if (drop * fontSize > height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }
        dropsRef.current[i] = drop + 1;
      });

      animationRef.current = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="pointer-events-auto rounded-2xl border border-teal-400/40 bg-slate-900/70 px-8 py-6 text-center shadow-[0_0_30px_rgba(64,224,208,0.3)] backdrop-blur-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-teal-300 mb-3">
                [ System Override ]
              </p>
              <p className="font-semibold text-lg text-white">ACCESS LEVEL: ARCHITECT</p>
              <p className="text-sm text-teal-200/70 mt-1">Command interface unlocked</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GodMode;
