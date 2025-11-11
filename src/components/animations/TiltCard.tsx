import { useMotionValue, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

interface TiltCardProps {
  className?: string;
  imageSrc?: string;
  alt?: string;
  children?: React.ReactNode;
}

export function TiltCard({ className, imageSrc, alt, children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    x.set(offsetX);
    y.set(offsetY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className={clsx(
        "relative transition-transform duration-200 ease-out will-change-transform",
        "hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.35)]",
        className
      )}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover rounded-xl pointer-events-none"
        />
      )}

      {children && (
        <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl">
          <div className="text-white font-medium">{children}</div>
        </div>
      )}
    </motion.div>
  );
}

