import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface InspirationCTASectionProps {
  className?: string;
}

const InspirationCTASection: React.FC<InspirationCTASectionProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Bring Your Vision to Life?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-2xl mx-auto">
            See how these inspirations transform into real results. Explore my case studies to witness the cave-to-creation process in action.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-3 bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Case Studies
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          <p className="text-sm text-orange-200 mt-6">
            Discover the transformation from inspiration to implementation
          </p>
        </motion.div>
      </div>

      {/* Bear Watermark */}
      <div className="absolute bottom-4 right-4 text-6xl opacity-20">
        🐻
      </div>
    </section>
  );
};

export default InspirationCTASection;