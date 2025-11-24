"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export type OceanTestimonial = {
  quote: string;
  name: string;
  designation: string;
  src?: string;
  company?: string;
  rating?: number;
};

export interface OceanAnimatedTestimonialsProps {
  testimonials: OceanTestimonial[];
  autoplay?: boolean;
  className?: string;
}

export const OceanAnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: OceanAnimatedTestimonialsProps) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12", className)}>
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  {testimonial.src ? (
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  ) : (
                    <div className="h-full w-full rounded-3xl bg-gradient-to-br from-[#006d77] to-[#83c5be] flex items-center justify-center">
                      <div className="text-6xl font-bold text-white/20">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-[#006d77] dark:text-[#edf6f9]">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-[#5a7a7d] dark:text-[#83c5be]">
              {testimonials[active].designation}
              {testimonials[active].company && ` • ${testimonials[active].company}`}
            </p>
            <motion.p className="mt-8 text-lg text-[#5a7a7d] dark:text-[#edf6f9]/80">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-[#83c5be]/20 dark:bg-[#5a7a7d]/30 hover:bg-[#83c5be]/30 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-[#006d77] transition-transform duration-300 group-hover/button:rotate-12 dark:text-[#83c5be]" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-[#83c5be]/20 dark:bg-[#5a7a7d]/30 hover:bg-[#83c5be]/30 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-[#006d77] transition-transform duration-300 group-hover/button:-rotate-12 dark:text-[#83c5be]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

