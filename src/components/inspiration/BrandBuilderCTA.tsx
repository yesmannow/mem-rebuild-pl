import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Palette, Type, Lightbulb, ArrowRight } from 'lucide-react';

const BrandBuilderCTA: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center mb-6"
          >
            <Sparkles className="h-12 w-12 text-yellow-400 animate-pulse" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Design Your Own Brand?
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl mb-4 opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Apply the principles you've learned and create a brand identity that's uniquely yours
          </motion.p>

          <motion.p
            className="text-lg mb-12 opacity-75 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Our Brand Builder tool guides you through colors, typography, and design principles to
            create a cohesive brand system
          </motion.p>
        </div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Palette className="h-8 w-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Color Palette Generator</h3>
            <p className="text-white/80 text-sm">
              Extract colors from your inspiration and create harmonious palettes
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Type className="h-8 w-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Typography Pairing</h3>
            <p className="text-white/80 text-sm">
              Discover perfect font combinations based on design principles
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Lightbulb className="h-8 w-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Design Principles</h3>
            <p className="text-white/80 text-sm">
              Build your brand foundation with proven design principles
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="/brand-builder"
            className="group relative px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-lg rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3">
              <Sparkles className="h-6 w-6" />
              <span>Start Building Your Brand</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>

          <Link
            to="/case-studies"
            className="px-10 py-5 border-2 border-white/30 text-white font-semibold text-lg rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            View Examples
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-white/60 text-sm">
            Trusted by designers and brands worldwide • Free to use • No signup required
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default BrandBuilderCTA;

