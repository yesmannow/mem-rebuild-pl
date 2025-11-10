import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';
import './WhoIAm.css';

const WhoIAm: React.FC = () => {
  return (
    <SectionWrapper bg="bg-[color:theme('colors.cave.bg')]" id="about">
      <div className="who-i-am__grid">
        {/* Bio Photo */}
        <motion.div
          className="who-i-am__photo-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/images/bio/1732967007485.jpg"
            alt="Jacob Darling"
            className="who-i-am__photo"
            loading="lazy"
            width="500"
            height="500"
          />
        </motion.div>

        {/* Content */}
        <div className="who-i-am__content">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Who I Am
          </motion.h2>

          <motion.p
            className="who-i-am__intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            I'm Jacob Darling — a marketing technologist with a strategist's mindset and an engineer's precision.
          </motion.p>
          <motion.p
            className="who-i-am__intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            I design and deploy systems that align creative direction with technical execution — from CRM workflows and automation to analytics, SEO, and campaign strategy.
          </motion.p>
          <motion.p
            className="who-i-am__intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            At Graston Technique®, I built a marketing system with 400+ automations, reducing support tickets by 70% and increasing checkout conversions by 40%. My work supports 30,000+ users across industries like SaaS, healthcare, legal, and finance.
          </motion.p>
          <motion.p
            className="who-i-am__intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            If you need someone who can architect the backend <strong>and</strong> craft the message — let's talk.
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default WhoIAm;

