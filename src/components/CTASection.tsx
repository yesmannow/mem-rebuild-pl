import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <div className="w-full bg-amber-600 text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Create Something Extraordinary?
        </motion.h2>

        <motion.p
          className="text-xl mb-8 opacity-90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          See how these design principles come to life in our case studies
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/case-studies"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Explore Case Studies →
          </Link>
        </motion.div>

        {/* Cave theming elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute top-4 left-4 text-6xl">🕳️</div>
          <div className="absolute bottom-4 right-4 text-4xl">🐻</div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
