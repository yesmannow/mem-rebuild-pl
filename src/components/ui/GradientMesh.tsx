import React, { useEffect, useRef } from 'react';

interface GradientMeshProps {
  colors?: string[];
  speed?: number;
  className?: string;
}

const GradientMesh: React.FC<GradientMeshProps> = ({
  colors = ['#88ABF2', '#6B8FD6', '#5A7EC0', '#4A6EAA'],
  speed = 0.0005,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const rgbColors = colors.map(hexToRgb);

    // Create gradient points that move
    interface GradientPoint {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: { r: number; g: number; b: number };
    }

    const points: GradientPoint[] = rgbColors.map((color, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed * 100,
      vy: (Math.random() - 0.5) * speed * 100,
      color,
    }));

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
      });

      // Create mesh gradient by drawing overlapping radial gradients
      points.forEach((point, i) => {
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          Math.max(canvas.width, canvas.height) * 0.7
        );

        gradient.addColorStop(0, `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, 0.3)`);
        gradient.addColorStop(0.5, `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, 0.1)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-50 ${className}`}
      aria-hidden="true"
    />
  );
};

export default GradientMesh;
