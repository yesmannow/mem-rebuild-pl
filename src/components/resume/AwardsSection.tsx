import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AwardsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for the image
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  useEffect(() => {
    if (!imageRef.current) return;

    // GSAP ScrollTrigger for advanced animations
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scale: 0.8,
        rotation: -10,
        duration: 1.2,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      aria-label="Scholastic Gold Key Award — Photography Excellence"
      className="relative py-32 text-center bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-300 text-black overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10 pointer-events-none" />

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.h2
        className="text-5xl font-extrabold mb-4 award-shine relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        Scholastic Gold Key Award
      </motion.h2>

      <motion.h3
        className="text-xl font-semibold tracking-wide mb-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
      >
        Photography Excellence
      </motion.h3>

      <motion.p
        className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-900/80 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
      >
        Awarded by the <strong>Scholastic Art & Writing Awards</strong>, this Gold Key honors the
        top <strong>1% of submissions nationwide</strong> for creativity, originality, and technical
        mastery in visual storytelling — recognizing emerging talent across the United States.
      </motion.p>

      {/* Enhanced Image with Parallax and Responsive Container */}
      <motion.div className="relative mx-auto mt-10 w-40 h-40 aspect-square" style={{ y, scale }}>
        {/* Shimmer Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 rounded-full animate-pulse" />

        {/* Image with Lazy Loading */}
        <motion.img
          ref={imageRef}
          src="/images/auto-generated/awards/gold-key-award.png"
          alt="Scholastic Art & Writing Awards Gold Key Medal - Top 1% National Recognition"
          className="relative z-10 w-full h-full object-contain rounded-full border-4 border-yellow-400/30 drop-shadow-2xl"
          loading="lazy"
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 200 }}
          onLoad={e => {
            // Hide shimmer on load
            const shimmer = e.currentTarget.previousElementSibling;
            if (shimmer) (shimmer as HTMLElement).style.display = 'none';
          }}
        />

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 to-orange-500/40 rounded-full blur-xl -z-10" />
      </motion.div>
    </motion.section>
  );
};

export default AwardsSection;
