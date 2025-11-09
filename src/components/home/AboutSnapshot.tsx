import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSnapshot: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for portrait
      gsap.to(imageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Stagger animation for content
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-snapshot"
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Portrait Section */}
          <motion.div
            ref={imageRef}
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Portrait */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <motion.img
                src="/images/bio/Adobe Express 2025-10-12 09.58.18.PNG"
                alt="Jacob Darling - Creative Technologist"
                className="relative z-10 w-full h-[500px] object-cover rounded-2xl border border-white/10 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl z-20" />
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 text-white">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Available for Projects</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <div ref={contentRef} className="space-y-8">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Who I Am
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </motion.div>

            {/* Bio Text */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm Jacob Darling, a marketing strategist and systems architect based in
                Indianapolis. I specialize in marketing automation, CRM campaigns, SEO/SEM
                optimization, and analytics-driven strategy. My unique strength is combining
                marketing strategy with technical implementation—building the systems that make
                campaigns scalable, measurable, and profitable.
              </p>

              <p className="text-lg text-gray-400 leading-relaxed">
                At Graston Technique®, I developed a marketing automation system with 400+
                workflows that reduced support tickets by 70% and increased checkout conversions by
                40%. My marketing systems serve 30,000+ practitioners worldwide, and I've managed
                multi-channel campaigns with proven ROI across Google Ads, Meta Ads, and LinkedIn
                advertising platforms.
              </p>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="text-center p-4 bg-gray-900/30 border border-white/10 rounded-xl">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  15+
                </div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>

              <div className="text-center p-4 bg-gray-900/30 border border-white/10 rounded-xl">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  30K+
                </div>
                <div className="text-sm text-gray-400">Users Served</div>
              </div>
            </motion.div>

            {/* Location & Role */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={20} className="text-blue-400" />
                <span>Indianapolis, IN</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <Briefcase size={20} className="text-purple-400" />
                <span>Marketing Strategist & Marketing Technologist</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
              >
                <span>Learn More About Me</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
