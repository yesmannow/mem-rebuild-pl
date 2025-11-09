import React from 'react';
import InspirationExplorer from '../components/inspiration/InspirationExplorer';
import InspirationTimeline from '../components/InspirationTimeline';
import CTASection from '../components/CTASection';
import WaveDivider from '../components/WaveDivider';
import NoiseOverlay from '../components/NoiseOverlay';
import GlyphOverlay from '../components/GlyphOverlay';
import ProcessLab from '../components/ProcessLab';
import SpecChips from '../components/SpecChips';
import ArtifactExplorer from '../components/ArtifactExplorer';
import BrandLineageSection from '../components/BrandLineageSection';
import DesignPrinciplesExplorer from '../components/DesignPrinciplesExplorer';
import BrandBuilderCTA from '../components/inspiration/BrandBuilderCTA';
import DesignChallenges from '../components/inspiration/DesignChallenges';
import inspirationsData from '../data/inspirations.json';
import brandIdentitiesData from '../data/brand-identities.json';

/**
 * Inspiration Page - Explorer + Timeline + CTA
 * ------------------------------------------
 * A comprehensive showcase of creative influences featuring:
 * - Interactive Inspiration Explorer with filtering and expandable details
 * - Scroll-driven Inspiration Timeline showing creative evolution
 * - Design Principles Explorer for discovering shared design philosophies
 * - Call-to-action section linking to Case Studies
 * - Cave/bear theming throughout with WaveDivider, NoiseOverlay, GlyphOverlay
 */

const Inspiration: React.FC = () => {
  // Prepare brand data for DesignPrinciplesExplorer
  const inspirations = inspirationsData as any[];
  const brandIdentities = (brandIdentitiesData as any).brands || [];

  const getBrandData = (item: any) => {
    if (!item.brandId) return null;
    return brandIdentities.find((b: any) => b.id === item.brandId) || null;
  };

  const brandsWithData = inspirations
    .map(item => {
      const brandData = getBrandData(item);
      return brandData ? { ...item, ...brandData } : null;
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center overflow-hidden">
        <NoiseOverlay />
        <GlyphOverlay />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">What fuels my creativity</h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-200">
            A curated journey through the systems, designs, and philosophies that shaped my work.
          </p>
        </div>
      </section>

      <WaveDivider flip />

      {/* Inspiration Explorer */}
      <InspirationExplorer />

      <WaveDivider />

      {/* Design Principles Explorer */}
      <DesignPrinciplesExplorer brands={brandsWithData as any} />

      <WaveDivider flip />

      {/* Inspiration Timeline */}
      <InspirationTimeline />

      <WaveDivider />

      {/* Brand Lineage Timeline */}
      <BrandLineageSection />

      <WaveDivider flip />

      {/* Process Lab (Studio Sutherland) */}
      <ProcessLab />

      <WaveDivider />

      {/* Spec Chips (Tokens) */}
      <SpecChips />

      <WaveDivider flip />

      {/* Artifact Explorer (Eames Institute) */}
      <ArtifactExplorer />

      <WaveDivider />

      {/* Design Challenges */}
      <DesignChallenges />

      <WaveDivider flip />

      {/* Brand Builder CTA */}
      <BrandBuilderCTA />

      <WaveDivider />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Inspiration;
