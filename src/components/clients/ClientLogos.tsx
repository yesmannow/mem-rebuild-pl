import React from 'react';
import { motion } from 'framer-motion';
import './ClientLogos.css';

const clientLogos = [
  { name: 'Primary Care', src: '/images/logos/primary-care.svg' },
  { name: 'Black Letter', src: '/images/logos/black-letter.svg' },
  { name: 'Perpetual Movement Fitness', src: '/images/logos/perpetual-movement.svg' },
  { name: 'Tuohy Bailey & Moore', src: '/images/logos/ca-logo.svg' },
  { name: 'Gomez BBQ', src: '/images/logos/gomez-bbq.svg' },
  { name: 'Herbs Rub', src: '/images/logos/herbs-rub.svg' },
  { name: 'TBM', src: '/images/logos/tbm.svg' },
  { name: 'BF Monogram', src: '/images/logos/bf-monogram.svg' },
  { name: 'Indiana University', src: '/images/logos/indiana-university.svg' },
  { name: 'Heart Health', src: '/images/logos/heart-mark.svg' },
];

const ClientLogos: React.FC = () => {
  return (
    <section className="client-logos-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Trusted by Leading Organizations
      </motion.h2>
      <motion.div
        className="logos-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {clientLogos.map((client, index) => (
          <motion.div
            key={client.name}
            className="logo-item"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <img src={client.src} alt={client.name} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ClientLogos;
