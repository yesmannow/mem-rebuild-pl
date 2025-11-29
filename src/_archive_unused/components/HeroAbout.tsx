import React from 'react';
import { motion } from 'framer-motion';

export default function HeroAbout() {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          I build marketing systems that turn complexity into clarity.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg md:text-xl text-slate-300"
        >
          15+ years connecting content, automation, and analytics to drive measurable growth.
        </motion.p>
      </div>
    </section>
  );
}
