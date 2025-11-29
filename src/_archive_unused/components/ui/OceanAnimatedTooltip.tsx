"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export type OceanAnimatedTooltipItem = {
  id: number;
  name: string;
  designation?: string;
  image?: string;
  description?: string;
};

export type OceanAnimatedTooltipProps = {
  items: OceanAnimatedTooltipItem[];
  children?: React.ReactNode;
};

export const OceanAnimatedTooltip = ({ items, children }: OceanAnimatedTooltipProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = (event: any) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const halfWidth = event.target.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    });
  };

  if (children) {
    return (
      <div className="relative inline-block">
        {children}
        {items.map((item, idx) => (
          <div
            className="group relative -mr-4"
            key={item.id}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-[#006d77] px-4 py-2 text-xs shadow-xl border border-[#83c5be]/20"
                >
                  <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-[#83c5be] to-transparent" />
                  <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-[#e29578] to-transparent" />
                  <div className="relative z-30 text-base font-bold text-[#edf6f9]">
                    {item.name}
                  </div>
                  {item.designation && (
                    <div className="text-xs text-[#83c5be]">{item.designation}</div>
                  )}
                  {item.description && (
                    <div className="text-xs text-[#edf6f9]/80 mt-1 max-w-xs text-center">
                      {item.description}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {item.image ? (
              <img
                onMouseMove={handleMouseMove}
                height={100}
                width={100}
                src={item.image}
                alt={item.name}
                className="relative !m-0 h-14 w-14 rounded-full border-2 border-[#83c5be] object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
              />
            ) : (
              <div
                onMouseMove={handleMouseMove}
                className="relative !m-0 h-14 w-14 rounded-full border-2 border-[#83c5be] bg-gradient-to-br from-[#006d77] to-[#83c5be] flex items-center justify-center text-white font-bold text-lg transition duration-500 group-hover:z-30 group-hover:scale-105"
              >
                {item.name.charAt(0)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="group relative -mr-4"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-[#006d77] px-4 py-2 text-xs shadow-xl border border-[#83c5be]/20"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-[#83c5be] to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-[#e29578] to-transparent" />
                <div className="relative z-30 text-base font-bold text-[#edf6f9]">
                  {item.name}
                </div>
                {item.designation && (
                  <div className="text-xs text-[#83c5be]">{item.designation}</div>
                )}
                {item.description && (
                  <div className="text-xs text-[#edf6f9]/80 mt-1 max-w-xs text-center">
                    {item.description}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {item.image ? (
            <img
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              className="relative !m-0 h-14 w-14 rounded-full border-2 border-[#83c5be] object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
            />
          ) : (
            <div
              onMouseMove={handleMouseMove}
              className="relative !m-0 h-14 w-14 rounded-full border-2 border-[#83c5be] bg-gradient-to-br from-[#006d77] to-[#83c5be] flex items-center justify-center text-white font-bold text-lg transition duration-500 group-hover:z-30 group-hover:scale-105"
            >
              {item.name.charAt(0)}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

