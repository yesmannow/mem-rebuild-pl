/**
 * Home Page Integration Examples
 * Shows how to integrate new interactive components into the home page
 *
 * Usage: Copy relevant sections into src/pages/index.tsx
 */

import React from 'react';
import { AnimatedHero } from '../interactive/AnimatedHero';
import { StatCounter } from '../interactive/StatCounter';
import { TestimonialCarousel } from '../interactive/TestimonialCarousel';
import type { Testimonial } from '../interactive/TestimonialCarousel';

// ============================================================================
// EXAMPLE 1: Replace HeroIntro with AnimatedHero
// ============================================================================

export const AnimatedHeroExample: React.FC = () => {
  return (
    <AnimatedHero
      title="Jacob Darling"
      subtitle="Marketing Strategist & Systems Architect"
      ctaText="View My Work"
      ctaHref="/projects"
      theme="dark"
    />
  );
};

// ============================================================================
// EXAMPLE 2: Enhanced Stats Section with StatCounter
// ============================================================================

export const EnhancedStatsExample: React.FC = () => {
  return (
    <section className="py-16 bg-[var(--color-dark)]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-[var(--color-light)]">
          By The Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter
            value={16}
            label="Years Experience"
            suffix="+"
            theme="primary"
          />
          <StatCounter
            value={200}
            label="Projects Delivered"
            suffix="+"
            theme="secondary"
          />
          <StatCounter
            value={50}
            label="Clients Served"
            suffix="+"
            theme="accent"
          />
          <StatCounter
            value={100}
            label="Systems Built"
            suffix="+"
            theme="primary"
          />
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// EXAMPLE 3: Replace Testimonials with TestimonialCarousel
// ============================================================================

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    quote: "Jacob brings energy, creativity, and execution. Rare mix of strategy and hands-on delivery.",
    author: 'Jesse Wey',
    role: 'Web Development | IT | Marketing | People',
    company: 'LinkedIn Recommendation',
  },
  {
    id: '2',
    quote: "Jacob delivers impact fast. He's forward-thinking, tech-savvy, and results-driven.",
    author: 'Andrew Bastnagel, MBA',
    role: 'Financial Services Consultant',
    company: 'LinkedIn Recommendation',
  },
  {
    id: '3',
    quote: "Unparalleled energy, focus, and follow-through. Jacob gets it done and gets it done right.",
    author: 'Kevin Martin See',
    role: 'IBMer | Connector | Ally',
    company: 'LinkedIn Recommendation',
  },
];

export const EnhancedTestimonialsExample: React.FC = () => {
  return (
    <section className="py-16 bg-[var(--color-dark)]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-[var(--color-light)]">
          What People Say
        </h2>
        <TestimonialCarousel
          testimonials={testimonialsData}
          autoPlay={true}
          autoPlayInterval={6000}
          theme="dark"
        />
      </div>
    </section>
  );
};

// ============================================================================
// COMPLETE INTEGRATION EXAMPLE
// ============================================================================

/**
 * Complete home page integration showing all three components
 * Replace sections in src/pages/index.tsx with these examples
 */
export const CompleteHomePageIntegration: React.FC = () => {
  return (
    <>
      {/* Option 1: Replace HeroCommandPanel + HeroIntro with AnimatedHero */}
      <AnimatedHero
        title="Jacob Darling"
        subtitle="Marketing Strategist & Systems Architect"
        ctaText="View My Work"
        ctaHref="/projects"
        theme="dark"
      />

      {/* Option 2: Keep existing hero, add enhanced stats below */}
      <EnhancedStatsExample />

      {/* Rest of page content... */}

      {/* Replace existing Testimonials component with TestimonialCarousel */}
      <EnhancedTestimonialsExample />
    </>
  );
};

export default CompleteHomePageIntegration;

