import React from 'react';
import { motion } from 'framer-motion';
import WaveDivider from '../components/WaveDivider';
import NoiseOverlay from '../components/NoiseOverlay';
import GlyphOverlay from '../components/GlyphOverlay';
import InspirationExplorer from '../components/inspiration/InspirationExplorer';
import InspirationTimeline from '../components/inspiration/InspirationTimeline';
import InspirationCTASection from '../components/inspiration/InspirationCTASection';

/**
 * Inspiration Page - Explorer + Timeline + CTA
 * ------------------------------------------
 * A comprehensive showcase of creative influences featuring:
 * - Interactive Inspiration Explorer with filtering and expandable details
 * - Scroll-driven Inspiration Timeline showing creative evolution
 * - Call-to-action section linking to Case Studies
 * - Cave/bear theming throughout with WaveDivider, NoiseOverlay, GlyphOverlay
 */

const Inspiration: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-100 via-amber-50 to-orange-50 dark:from-slate-900 dark:via-amber-950 dark:to-orange-950 overflow-hidden">
        <NoiseOverlay />
        <GlyphOverlay />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              What fuels my creativity
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From cave explorations to mountain summits, discover the experiences that shaped
              Bear Cave Marketing and continue to inspire every project.
            </p>
          </motion.div>

          {/* Bear watermark */}
          <div className="absolute bottom-8 right-8 text-8xl opacity-10 select-none">
            🐻
          </div>
        </div>

        <WaveDivider />
      </section>

      {/* Inspiration Explorer */}
      <InspirationExplorer />

      <WaveDivider flip />

      {/* Inspiration Timeline */}
      <InspirationTimeline />

      <WaveDivider />

      {/* CTA Section */}
      <InspirationCTASection />
    </div>
  );
};

export default Inspiration;
