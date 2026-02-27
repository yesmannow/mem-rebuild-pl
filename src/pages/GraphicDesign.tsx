import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import EmbedWrapper from '../components/media/EmbedWrapper';
import SectionReveal from '../components/animations/SectionReveal';
import { TiltCard } from '../components/animations/TiltCard';
import InteractiveBackground from '../components/ui/InteractiveBackground';
import { AnimatedCursorWrapper } from '../components/ui/AnimatedCursorWrapper';

const GraphicDesign: React.FC = () => {
  return (
    <AnimatedCursorWrapper enableByDefault>
      <Helmet>
        <title>Graphic Design Portfolio | BearCave Marketing</title>
        <meta
          name="description"
          content="Explore a curated collection of graphic design work including branding, digital layouts, album artwork, and creative direction by Jacob Darling."
        />
        <meta
          name="keywords"
          content="graphic design, branding, digital design, album artwork, creative direction, visual identity"
        />
        <meta property="og:title" content="Graphic Design Portfolio | BearCave Marketing" />
        <meta
          property="og:description"
          content="Explore a curated collection of graphic design work including branding, digital layouts, album artwork, and creative direction."
        />
      </Helmet>

      <main className="graphic-design-page min-h-screen bg-[var(--ink-900)] text-[var(--parchment-050)] relative">
        <InteractiveBackground variant="mesh" className="opacity-30" />

        {/* Hero Section */}
        <section className="hero-section relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-clash">
                Graphic Design Portfolio
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-[var(--parchment-050)]/80 mb-6">
                Branding, digital layouts, album artwork, and creative direction.
              </p>

              {/* Description */}
              <p className="text-base md:text-lg text-[var(--parchment-050)]/70 max-w-3xl mb-8">
                A collection of design work that blends strategic thinking with visual storytelling.
                From brand identities to digital campaigns, each project represents a unique challenge
                and creative solution.
              </p>
            </motion.div>

            {/* Info Section */}
            <motion.div
              className="info-grid grid md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="info-card bg-[var(--ink-700)]/30 backdrop-blur-sm rounded-lg p-6 border border-[var(--ink-700)]/60">
                <h3 className="text-sm font-semibold text-[var(--signal-500)] uppercase tracking-wide mb-2">
                  Role
                </h3>
                <p className="text-[var(--parchment-050)]/90">
                  Creative Director, Designer
                </p>
              </div>

              <div className="info-card bg-[var(--ink-700)]/30 backdrop-blur-sm rounded-lg p-6 border border-[var(--ink-700)]/60">
                <h3 className="text-sm font-semibold text-[var(--signal-500)] uppercase tracking-wide mb-2">
                  Tools
                </h3>
                <p className="text-[var(--parchment-050)]/90">
                  Adobe Creative Suite, Figma, Sketch
                </p>
              </div>

              <div className="info-card bg-[var(--ink-700)]/30 backdrop-blur-sm rounded-lg p-6 border border-[var(--ink-700)]/60">
                <h3 className="text-sm font-semibold text-[var(--signal-500)] uppercase tracking-wide mb-2">
                  Techniques
                </h3>
                <p className="text-[var(--parchment-050)]/90">
                  Brand Identity, Layout Design, Typography
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lightroom Embed Section */}
        <section className="embed-section relative z-10 py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <EmbedWrapper
                src="https://lightroom.adobe.com/embed/shares/f5ddb4cab0ca4bcc95b17fa13ab992bd/slideshow?background_color=%232D2D2D&color=%23999999"
                ratio={2 / 1}
                title="Graphic Design Slideshow"
              />
            </motion.div>
          </div>
        </section>

        {/* Optional: Selected Works Grid */}
        <section className="selected-works-section relative z-10 py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 font-clash"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Selected Works
            </motion.h2>

            <SectionReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <TiltCard key={item} className="rounded-xl overflow-hidden cursor-hover">
                  <div className="work-card bg-[var(--ink-700)]/30 backdrop-blur-sm border border-[var(--ink-700)]/60 hover:border-[var(--signal-500)]/40 transition-all duration-300 group overflow-hidden">
                    <div className="aspect-[4/3] bg-gradient-to-br from-[var(--telemetry-400)]/20 to-[var(--signal-500)]/20 flex items-center justify-center relative">
                      <span className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">
                        {item}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[var(--parchment-050)] mb-2">
                        Project Title {item}
                      </h3>
                      <p className="text-sm text-[var(--parchment-050)]/70">
                        Brief description of the project and its objectives.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </SectionReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section relative z-10 py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              className="cta-card bg-gradient-to-br from-[var(--telemetry-400)]/10 to-[var(--signal-500)]/10 border border-[var(--signal-500)]/30 rounded-xl p-8 md:p-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-clash">
                Interested in Working Together?
              </h2>
              <p className="text-[var(--parchment-050)]/80 mb-6 max-w-2xl mx-auto">
                Let&apos;s create something exceptional. Reach out to discuss your next project.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold rounded-lg hover:bg-[var(--signal-500)]/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
    </AnimatedCursorWrapper>
  );
};

export default GraphicDesign;
