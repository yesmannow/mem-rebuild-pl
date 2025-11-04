import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IntroStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered fade-in animation
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle parallax effect
      gsap.to(sectionRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          ref={textRef}
          className="text-3xl md:text-4xl lg:text-5xl leading-relaxed text-white font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          I combine{" "}
          <motion.span
            className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            strategic marketing leadership
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 origin-left block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.span>
          {" "}with{" "}
          <motion.span
            className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            technical systems architecture
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 origin-left block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.span>
          {" "}to deliver{" "}
          <motion.span
            className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-semibold relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            measurable business results
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 origin-left block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.8 }}
            />
          </motion.span>
          .
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl text-gray-400 mt-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Through analytics-driven strategy, cross-functional project management, and technical marketing expertise,
          I deliver campaigns that convert—with 400+ marketing automations, 70% reduction in support tickets,
          and 40% increase in checkout conversions to prove it.
        </motion.p>

        {/* Decorative elements */}
        <div className="flex justify-center items-center mt-12 space-x-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroStatement;
