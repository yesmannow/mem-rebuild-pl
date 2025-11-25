import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Camera, Palette, Sparkles } from 'lucide-react';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import SmartGallery from '../components/SmartGallery';
import smartGalleryData from '../data/smart-gallery.json';

type GalleryMode = 'photo' | 'design';

const Studio: React.FC = () => {
  const [mode, setMode] = useState<GalleryMode>('photo');
  const [filter, setFilter] = useState<string>('all');

  const photos = smartGalleryData.photography;
  const designs = smartGalleryData.design;

  const currentItems = mode === 'photo' ? photos : designs;
  const categories = Array.from(
    new Set(currentItems.map((item) => item.category))
  ).sort();

  const filteredItems =
    filter === 'all'
      ? currentItems
      : currentItems.filter((item) => item.category === filter);

  return (
    <>
      <Helmet>
        <title>The Studio | Visual Engineering & Creative Direction</title>
        <meta
          name="description"
          content="Visual Engineering & Creative Direction. Explore photography and design work by Jacob Darling."
        />
      </Helmet>

      <OceanAuroraBackground>
        <main className="min-h-screen relative z-10 pt-24 pb-20">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-brand-text mb-4"
              >
                The Studio
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl text-brand-muted"
              >
                Visual Engineering & Creative Direction
              </motion.p>
            </motion.div>

            {/* Mission Control Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-center mb-12"
            >
              <div className="relative inline-flex items-center gap-2 p-2 bg-brand-surface/50 border border-brand-teal/20 rounded-full backdrop-blur-sm">
                <motion.button
                  onClick={() => setMode('photo')}
                  className={`relative px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                    mode === 'photo'
                      ? 'text-brand-dark'
                      : 'text-brand-muted hover:text-brand-text'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mode === 'photo' && (
                    <motion.div
                      layoutId="activeMode"
                      className="absolute inset-0 bg-brand-teal rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Camera size={20} />
                    Lens Mode
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => setMode('design')}
                  className={`relative px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                    mode === 'design'
                      ? 'text-brand-dark'
                      : 'text-brand-muted hover:text-brand-text'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mode === 'design' && (
                    <motion.div
                      layoutId="activeMode"
                      className="absolute inset-0 bg-brand-orange rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Palette size={20} />
                    Pixel Mode
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-brand-teal text-brand-dark'
                    : 'bg-brand-surface/30 text-brand-muted hover:bg-brand-surface/50 hover:text-brand-text border border-brand-teal/20'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === category
                      ? 'bg-brand-teal text-brand-dark'
                      : 'bg-brand-surface/30 text-brand-muted hover:bg-brand-surface/50 hover:text-brand-text border border-brand-teal/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </section>

          {/* Gallery Content with Crossfade */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-surface/30 border border-brand-teal/20 rounded-full"
                  >
                    <Sparkles size={16} className="text-brand-teal" />
                    <span className="text-sm text-brand-muted">
                      {filteredItems.length} {mode === 'photo' ? 'Photos' : 'Designs'} Found
                    </span>
                  </motion.div>
                </div>
                <SmartGallery mode={mode} items={filteredItems} />
              </motion.div>
            </AnimatePresence>
          </section>
        </main>
      </OceanAuroraBackground>
    </>
  );
};

export default Studio;

