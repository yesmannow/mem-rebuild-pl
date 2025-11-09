import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTE_CONTACT, ROUTE_RESUME, ROUTE_WORK } from '../../lib/links';
import { trackCTA } from '../../utils/analytics';
import './CtaBand.css';

const CtaBand: React.FC = () => {
  return (
    <section className="cta-band container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="card cta-band__card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="cta-band__heading">
          Let's Build Something Extraordinary
        </h2>
        <p className="cta-band__subheading">
          I'm currently open to full-time, contract, or fractional marketing leadership roles. If you're looking for someone who brings clarity to complexity, creativity to execution, and strategy to storytelling — let's talk.
        </p>
        <div className="cta-band__actions">
          <Link
            to={ROUTE_CONTACT}
            className="btn-primary cta-band__cta"
            onClick={() => trackCTA('contact', 'cta_band')}
            aria-label="Contact me"
          >
            Contact Me
          </Link>
          <Link
            to={ROUTE_RESUME}
            className="btn-secondary cta-band__cta"
            onClick={() => trackCTA('view_resume', 'cta_band')}
            aria-label="View resume"
          >
            View Resume
          </Link>
          <a
            href="https://linkedin.com/in/jacobdarling"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary cta-band__cta"
            onClick={() => trackCTA('linkedin', 'cta_band')}
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <Link
            to="/case-studies"
            className="btn-secondary cta-band__cta"
            onClick={() => trackCTA('view_portfolio', 'cta_band')}
            aria-label="View portfolio"
          >
            Portfolio
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaBand;

