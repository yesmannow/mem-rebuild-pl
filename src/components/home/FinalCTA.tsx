import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Calendar } from 'lucide-react';
import SectionWrapper from '../SectionWrapper';
import { ROUTE_CONTACT } from '../../lib/links';
import { trackCTA } from '../../utils/analytics';
import './FinalCTA.css';

const FinalCTA: React.FC = () => {
  return (
    <SectionWrapper bg="bg-[color:theme('colors.cave.ember')]" id="contact">
      <motion.div
        className="final-cta__content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">Let's Build Smarter Marketing Together</h2>
        <p className="final-cta__description">
          If you're looking for a strategic marketing partner who can turn vision into execution — I'm ready.
        </p>
        <div className="final-cta__info">
          <span className="final-cta__location">📍 Indianapolis, IN (Remote/On-Site Available)</span>
          <a href="mailto:jacob@jacobdarling.com" className="final-cta__email">
            ✉️ jacob@jacobdarling.com
          </a>
        </div>
        <div className="final-cta__buttons">
          <a
            href="mailto:jacob@jacobdarling.com"
            className="final-cta__button final-cta__button--primary"
            onClick={() => trackCTA('contact_email', 'final_cta')}
          >
            <Mail size={20} />
            <span>Contact Me</span>
          </a>
          <Link
            to={ROUTE_CONTACT}
            className="final-cta__button final-cta__button--secondary"
            onClick={() => trackCTA('schedule_call', 'final_cta')}
          >
            <Calendar size={20} />
            <span>Schedule a Call</span>
          </Link>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default FinalCTA;

