import React from 'react';
import { motion, Easing } from 'framer-motion';

const container = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as Easing },
  },
};
const stagger = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + i * 0.1, duration: 0.5, ease: 'easeOut' as Easing },
  }),
};

export default function HeroAnimated() {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={container}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Where Complexity Becomes Clarity
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="show"
          variants={container}
          className="mt-4 text-lg md:text-xl text-slate-300"
        >
          Marketing Strategist & Systems Architect
        </motion.p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <motion.a
            custom={0}
            initial="hidden"
            animate="show"
            variants={stagger}
            href="#contact"
            className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-500"
          >
            Work With Me
          </motion.a>
          <motion.a
            custom={1}
            initial="hidden"
            animate="show"
            variants={stagger}
            href="#case-studies"
            className="px-6 py-3 border border-slate-400 rounded-lg font-semibold hover:bg-slate-700"
          >
            View Case Studies
          </motion.a>
        </div>
      </div>
    </section>
  );
}
