import React from 'react';
import { motion } from 'framer-motion';
import { OceanGradientText } from '../ui/OceanGradientText';
import { OceanMarquee, OceanMarqueeItem } from '../ui/OceanMarquee';
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
        className="text-3xl md:text-4xl font-display font-bold"
      >
        <OceanGradientText text="Trusted by Leading Organizations" className="text-[#006d77]" />
      </motion.h2>
      <OceanMarquee speed={30} pauseOnHover={true} className="py-8">
        {clientLogos.map((client, index) => (
          <OceanMarqueeItem key={`${client.name}-${index}`}>
            <motion.div
              className="logo-item flex items-center justify-center h-20 w-32 grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <img src={client.src} alt={client.name} className="max-h-full max-w-full object-contain" />
            </motion.div>
          </OceanMarqueeItem>
        ))}
      </OceanMarquee>
    </section>
  );
};

export default ClientLogos;
