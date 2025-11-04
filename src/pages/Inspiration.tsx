import React from "react";
import InspirationExplorer from "../components/inspiration/InspirationExplorer";
import InspirationTimeline from "../components/inspiration/InspirationTimeline";
import InspirationCTASection from "../components/inspiration/InspirationCTASection";
import WaveDivider from "../components/WaveDivider";
import NoiseOverlay from "../components/NoiseOverlay";
import GlyphOverlay from "../components/GlyphOverlay";
import IdentityTile from "../components/IdentityTile";
import ManualViewer from "../components/ManualViewer";
import SystemsTimeline from "../components/SystemsTimeline";
import ProcessLab from "../components/ProcessLab";
import SpecChips from "../components/SpecChips";
import ArtifactExplorer from "../components/ArtifactExplorer";
import brands from "../data/brands.json";

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
      <section className="relative py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center overflow-hidden">
        <NoiseOverlay />
        <GlyphOverlay />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            What fuels my creativity
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-200">
            A curated journey through the systems, designs, and philosophies that
            shaped my work.
          </p>
        </div>

        <WaveDivider />
      </section>

      <WaveDivider flip />

      {/* Inspiration Explorer */}
      <InspirationExplorer />

      <WaveDivider />

      {/* Inspiration Timeline */}
      <InspirationTimeline />

      <WaveDivider flip />

      {/* Brand Identity Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Brand Identity Showcase
          </h2>

          {/* Identity Wall */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">
              Identity Wall
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brands.map((brand) => (
                <IdentityTile key={brand.slug} brand={brand} />
              ))}
            </div>
          </div>

          {/* Manual Viewer - Example with NASA */}
          <div className="mb-16">
            <ManualViewer brand={brands.find((b) => b.slug === "nasa")!} />
          </div>

          {/* Systems Timeline */}
          <div className="mb-16">
            <SystemsTimeline />
          </div>

          {/* Process Lab */}
          <div className="mb-16">
            <ProcessLab />
          </div>

          {/* Spec Chips */}
          <div className="mb-16">
            <SpecChips />
          </div>

          {/* Artifact Explorer */}
          <div className="mb-16">
            <ArtifactExplorer />
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* CTA Section */}
      <InspirationCTASection />
    </div>
  );
};

export default Inspiration;
