import React from 'react';
import { motion } from 'framer-motion';
import './WhatIDo.css';

const WhatIDo: React.FC = () => {
  return (
    <section id="what-i-do" className="what-i-do container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="what-i-do__content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">What I Do</h2>
        <p className="what-i-do__main-description">
          I combine strategic marketing leadership with technical system architecture to drive measurable business results.
        </p>
        <p className="what-i-do__sub-description">
          My expertise spans the entire digital landscape, from crafting compelling narratives to building robust, scalable solutions.
        </p>
      </motion.div>
    </section>
  );
};

export default WhatIDo;

