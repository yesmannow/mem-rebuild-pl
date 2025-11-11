import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, Star } from 'lucide-react';
import AwardCard from './AwardCard';
import { motionVariants } from '../../utils/narrativeMotion';
import awardsData from '../../data/awards.json';

const AwardShowcase: React.FC = () => {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/20 via-black to-orange-950/20" />

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={motionVariants.sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl"
            whileHover={{
              scale: 1.1,
              rotate: 360,
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)',
            }}
            transition={{ duration: 0.8 }}
          >
            <Trophy className="w-10 h-10 text-black" />
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Awards & Recognition
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Celebrating excellence in creative achievement and artistic recognition — honoring the
            foundation of visual storytelling that continues to inspire innovative design solutions.
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Excellence in Photography</span>
            </div>
            <div className="w-px h-4 bg-gray-600" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-gray-400">Top 5% Nationally</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Awards Grid */}
        <motion.div
          className="grid gap-8 max-w-5xl mx-auto"
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {awardsData.map((award, index) => (
            <motion.div key={award.id} variants={motionVariants.staggerItem}>
              <AwardCard award={award} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Decorative Section */}
        <motion.div
          className="text-center mt-16 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
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
            These early recognitions in visual arts established the creative foundation that
            continues to drive innovative design thinking and aesthetic excellence in every
            marketing and technical project.
          </p>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-tl-full" />
    </section>
  );
};

export default AwardShowcase;
