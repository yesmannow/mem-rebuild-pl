import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const InspirationCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">See Inspiration in Action</h2>
        <p className="text-slate-300 mb-8 max-w-md mx-auto">
          Explore how these ideas shaped real client outcomes.
        </p>
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-3 bg-white text-slate-900 hover:bg-slate-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Explore Case Studies
          <ArrowRight className="h-5 w-5" />
        </Link>
      </motion.div>

      {/* Bear watermark */}
      <div className="absolute bottom-4 right-4 text-6xl opacity-20 select-none">🐻</div>
    </section>
  );
};

export default InspirationCTASection;
