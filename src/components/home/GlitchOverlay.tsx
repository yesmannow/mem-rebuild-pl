import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GlitchOverlayProps {
  isBooting: boolean;
}

const GlitchOverlay: React.FC<GlitchOverlayProps> = ({ isBooting }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    if (isBooting) {
      // 1. Setup noise canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      canvas.width = w;
      canvas.height = h;

      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      // Fill with heavy RGB static
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;       // R
        data[i + 1] = noise;   // G
        data[i + 2] = noise;   // B
        data[i + 3] = 255;     // A
      }
      ctx.putImageData(imgData, 0, 0);

      // 2. GSAP high-intensity digital glitch
      wrapper.style.display = 'block';
      
      const tl = gsap.timeline();
      
      tl.fromTo(wrapper,
        { 
          opacity: 0, 
          filter: 'hue-rotate(0deg) contrast(200%)',
          skewX: 0
        },
        { 
          opacity: 0.7, 
          filter: 'hue-rotate(180deg) contrast(100%)', 
          skewX: () => Math.random() * 40 - 20, // random skew between -20 and 20
          repeat: 12, 
          yoyo: true, 
          duration: 0.05,
          ease: 'rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })'
        }
      );

      // Add horizontal slice displacement
      for (let i = 0; i < 5; i++) {
        tl.to(wrapper, {
          x: () => Math.random() * 40 - 20,
          scaleY: () => 1 + Math.random() * 0.1,
          duration: 0.05,
          repeat: 1,
          yoyo: true,
        }, i * 0.1);
      }

      tl.to(wrapper, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          wrapper.style.display = 'none';
          ctx.clearRect(0, 0, w, h);
        }
      });

    }
  }, [isBooting]);

  return (
    <div 
      ref={wrapperRef}
      className="absolute inset-0 z-50 pointer-events-none mix-blend-difference"
      style={{ display: 'none' }}
    >
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      {/* Scanline overlay for extra texture during glitch */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,242,255,0.15) 2px, rgba(0,242,255,0.15) 4px)'
        }}
      />
    </div>
  );
};

export default GlitchOverlay;
