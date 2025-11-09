import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import './Recognition.css';

const recognitionItems = [
  'Gold Key Award – Scholastic Art & Writing (Photography)',
  'Marketing campaigns featured in industry publications and trade organizations',
  'Team leader on award-winning community engagement campaigns',
];

const Recognition: React.FC = () => {
  return (
    <section id="recognition" className="recognition container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="recognition__card card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="recognition__header">
          <Award className="recognition__icon" size={32} />
          <h2 className="section-heading">Recognition & Highlights</h2>
        </div>
        <ul className="recognition__list">
          {recognitionItems.map((item, index) => (
            <motion.li
              key={index}
              className="recognition__item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default Recognition;

