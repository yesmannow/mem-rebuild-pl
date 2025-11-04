import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Star, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Awards: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const awardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Award glow animation
      gsap.to(".award-glow", {
        boxShadow: "0 0 60px rgba(255, 215, 0, 0.6)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Section reveal animation
      gsap.fromTo(awardRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating particles animation
      gsap.to(".award-particle", {
        y: -20,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-black via-yellow-900/10 to-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="award-particle absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl"
            whileHover={{ 
              scale: 1.1, 
              rotate: 360,
              boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)"
            }}
            transition={{ duration: 0.8 }}
          >
            <Award className="w-8 h-8 text-black" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Recognition & Highlights
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Celebrating excellence in creative achievement — honoring the foundation 
            of visual storytelling that continues to inspire innovative design solutions.
          </p>
        </motion.div>

        {/* Main Award Card */}
        <motion.div
          ref={awardRef}
          className="award-glow relative bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-sm border border-yellow-400/30 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glow Effect Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-yellow-400/10" />
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Award Badge/Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Award Icon/Badge */}
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    <Star className="w-16 h-16 text-black" />
                  </motion.div>
                  
                  {/* Glow Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/50 to-orange-500/50 blur-xl animate-pulse" />
                </div>
              </div>

              {/* Award Content */}
              <div className="lg:col-span-2 text-center lg:text-left">
                
                {/* Category Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-300 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Creative Excellence</span>
                </motion.div>

                {/* Award Title */}
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Gold Key Award in Photography
                </motion.h3>

                {/* Organization */}
                <motion.p 
                  className="text-xl text-yellow-400 font-semibold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Scholastic Art & Writing Awards
                </motion.p>

                {/* Date */}
                <motion.div 
                  className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>March 16, 2004</span>
                </motion.div>

                {/* Description */}
                <motion.p 
                  className="text-gray-300 leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Awarded to Jacob Darling for outstanding achievement in photography — 
                  recognizing artistic excellence, originality, and technical mastery in 
                  the Regional Scholastic Art Awards competition.
                </motion.p>

                {/* Significance */}
                <motion.div 
                  className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-sm text-yellow-200 italic">
                    <strong className="text-yellow-400">Significance:</strong> The Gold Key is the top regional honor 
                    in the Scholastic Art Awards, placing recipients in the top 5% of emerging artists nationwide.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60" />
          <div className="absolute top-4 right-4 w-1 h-1 bg-orange-400 rounded-full opacity-40" />
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-yellow-400 rounded-full opacity-40" />
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-60" />
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-full">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-yellow-200 font-medium">
              Foundation of Creative Excellence
            </span>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          
          <p className="text-gray-400 text-sm mt-4 max-w-2xl mx-auto">
            These early recognitions in visual arts established the creative foundation that continues to drive 
            innovative design thinking and aesthetic excellence in every marketing and technical project.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;
