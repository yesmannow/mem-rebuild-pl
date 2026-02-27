import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import EmbedWrapper from '../components/media/EmbedWrapper';
import SectionReveal from '../components/animations/SectionReveal';
import { TiltCard } from '../components/animations/TiltCard';
import InteractiveBackground from '../components/ui/InteractiveBackground';
import HeroSplit from '../components/hero/HeroSplit';

/**
 * Creative Work Hub - Consolidated creative portfolio page
 *
 * Sections:
 * - Photography (Lightroom embed + grid)
 * - Graphic Design (Lightroom embed + hero pieces)
 * - Branding Systems
 * - Web Builds
 * - Motion/Animations
 */
const Creative: React.FC = () => {
  const brandingSystems = [
    { id: 1, title: 'Brand Identity System', category: 'Branding', image: '/images/placeholder-brand-1.jpg' },
    { id: 2, title: 'Corporate Rebrand', category: 'Branding', image: '/images/placeholder-brand-2.jpg' },
    { id: 3, title: 'Startup Brand Kit', category: 'Branding', image: '/images/placeholder-brand-3.jpg' },
  ];

  const webBuilds = [
    { id: 1, title: 'E-commerce Platform', category: 'Web', tech: 'React, Node.js', link: '#' },
    { id: 2, title: 'SaaS Dashboard', category: 'Web', tech: 'TypeScript, Tailwind', link: '#' },
    { id: 3, title: 'Marketing Site', category: 'Web', tech: 'Next.js, Framer', link: '#' },
  ];

  return (
    <>
      <Helmet>
        <title>Creative Work | BearCave Marketing</title>
        <meta
          name="description"
          content="Explore creative work across photography, graphic design, branding systems, web builds, and motion design by Jacob Darling."
        />
        <meta
          name="keywords"
          content="creative portfolio, photography, graphic design, branding, web design, motion design, visual design"
        />
      </Helmet>

      <main className="creative-hub min-h-screen bg-[var(--ink-900)] text-[var(--parchment-050)] relative">
        <InteractiveBackground variant="gradient" className="opacity-30" />

        {/* Hero Section */}
        <HeroSplit
          title="Creative Work"
          subtitle="Design & Development"
          description="A showcase of visual storytelling, brand systems, and interactive experiences that blend creativity with strategic thinking."
          ctaText="View Case Studies"
          ctaHref="/case-studies"
        />

        {/* Photography Section */}
        <section className="photography-section relative z-10 py-16 md:py-24 border-t border-[var(--ink-700)]/60">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-clash">
                Photography
              </h2>
              <p className="text-lg md:text-xl text-[var(--parchment-050)]/80 max-w-2xl">
                Capturing moments that inspire and connect. View the full collection in Adobe Lightroom.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <EmbedWrapper
                src="https://lightroom.adobe.com/embed/shares/b1f8050aa3ac452baae9e3590e1c92c8/slideshow?background_color=%232D2D2D&color=%23999999"
                ratio={2 / 1}
                title="Photography Collection"
              />
            </motion.div>

            <div className="mt-8 text-center">
              <Link
                to="/photography"
                className="inline-flex items-center gap-2 text-[var(--signal-500)] hover:text-[var(--signal-500)]/80 font-semibold transition-colors"
              >
                View Full Photography Portfolio
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Graphic Design Section */}
        <section className="graphic-design-section relative z-10 py-16 md:py-24 border-t border-[var(--ink-700)]/60">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-clash">
                Graphic Design
              </h2>
              <p className="text-lg md:text-xl text-[var(--parchment-050)]/80 max-w-2xl">
                Branding, digital layouts, album artwork, and creative direction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-5xl mx-auto mb-12"
            >
              <EmbedWrapper
                src="https://lightroom.adobe.com/embed/shares/f5ddb4cab0ca4bcc95b17fa13ab992bd/slideshow?background_color=%232D2D2D&color=%23999999"
                ratio={2 / 1}
                title="Graphic Design Collection"
              />
            </motion.div>

            {/* Hero Pieces Grid */}
            <SectionReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="design-piece bg-[var(--ink-700)]/30 backdrop-blur-sm rounded-lg overflow-hidden border border-[var(--ink-700)]/60 hover:border-[var(--signal-500)]/40 transition-all duration-300 group cursor-pointer"
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-[var(--telemetry-400)]/20 to-[var(--signal-500)]/20 flex items-center justify-center">
                    <span className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                      {item}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--parchment-050)] mb-1">
                      Design Piece {item}
                    </h3>
                    <p className="text-sm text-[var(--parchment-050)]/70">
                      Category • 2024
                    </p>
                  </div>
                </div>
              ))}
            </SectionReveal>

            <div className="mt-8 text-center">
              <Link
                to="/graphic-design"
                className="inline-flex items-center gap-2 text-[var(--signal-500)] hover:text-[var(--signal-500)]/80 font-semibold transition-colors"
              >
                View Full Design Portfolio
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Branding Systems */}
        <section className="branding-section relative z-10 py-16 md:py-24 border-t border-[var(--ink-700)]/60">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-clash">
                Branding Systems
              </h2>
              <p className="text-lg md:text-xl text-[var(--parchment-050)]/80 max-w-2xl">
                Complete brand identity systems from strategy to execution.
              </p>
            </motion.div>

            <SectionReveal className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {brandingSystems.map((brand) => (
                <TiltCard key={brand.id} className="rounded-xl overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[var(--telemetry-400)]/20 to-[var(--signal-500)]/20 flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-7xl opacity-20 group-hover:opacity-40 transition-opacity">
                      {brand.id}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {brand.title}
                      </h3>
                      <p className="text-sm text-white/80">{brand.category}</p>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </SectionReveal>
          </div>
        </section>

        {/* Web Builds */}
        <section className="web-builds-section relative z-10 py-16 md:py-24 border-t border-[var(--ink-700)]/60">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-clash">
                Web Builds
              </h2>
              <p className="text-lg md:text-xl text-[var(--parchment-050)]/80 max-w-2xl">
                Interactive experiences and technical implementations.
              </p>
            </motion.div>

            <SectionReveal className="space-y-6 max-w-4xl mx-auto">
              {webBuilds.map((build) => (
                <Link
                  key={build.id}
                  to={build.link}
                  className="block group"
                >
                  <motion.div
                    className="bg-[var(--ink-700)]/30 backdrop-blur-sm rounded-lg p-6 border border-[var(--ink-700)]/60 group-hover:border-[var(--signal-500)]/40 transition-all duration-300"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-xl text-[var(--parchment-050)] mb-2 group-hover:text-[var(--signal-500)] transition-colors">
                          {build.title}
                        </h3>
                        <p className="text-sm text-[var(--parchment-050)]/70 mb-3">
                          {build.category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {build.tech.split(', ').map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-[var(--ink-800)]/50 rounded-full text-xs text-[var(--parchment-050)]/90 border border-[var(--ink-600)]/40"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-[var(--parchment-050)]/40 group-hover:text-[var(--signal-500)] transition-colors flex-shrink-0"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </SectionReveal>
          </div>
        </section>

        {/* Motion & Animations */}
        <section className="motion-section relative z-10 py-16 md:py-24 border-t border-[var(--ink-700)]/60">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-clash">
                Motion & Animations
              </h2>
              <p className="text-lg md:text-xl text-[var(--parchment-050)]/80 max-w-2xl">
                Bringing interfaces to life with purposeful motion design.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[var(--parchment-050)]/70 mb-8">
                Animation examples are demonstrated throughout this portfolio in the interactive components,
                scroll reveals, and micro-interactions.
              </p>
              <Link
                to="/showcase"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold rounded-lg hover:bg-[var(--signal-500)]/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                View Component Showcase
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="cta-section relative z-10 py-16 md:py-20 border-t border-[var(--ink-700)]/60">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-clash">
                Let&apos;s Create Together
              </h2>
              <p className="text-lg text-[var(--parchment-050)]/80 mb-8">
                Looking for creative direction, design systems, or technical implementation?
                Let&apos;s discuss your next project.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold text-lg rounded-lg hover:bg-[var(--signal-500)]/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                Get in Touch
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Creative;
