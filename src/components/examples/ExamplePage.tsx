import React from 'react';
import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialsSection,
  CTASection,
} from '@/components/sections';
import {
  MagneticButton,
  ScrollReveal,
  TiltCard,
} from '@/components/animations';
import { ArrowRight, Zap, Star } from 'lucide-react';

/**
 * Example page demonstrating the new section templates and animation components
 *
 * This shows how to use:
 * - Section templates (Hero, Features, Stats, Testimonials, CTA)
 * - Animation components (MagneticButton, ScrollReveal, TiltCard)
 * - Proper composition and styling
 */
const ExamplePage: React.FC = () => {
  const features = [
    {
      icon: <ArrowRight className="w-8 h-8" />,
      title: 'Feature One',
      description: 'Amazing feature description that explains what this feature does and why it matters.',
      link: '/feature1',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Feature Two',
      description: 'Another great feature that provides value to users and solves real problems.',
      link: '/feature2',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Feature Three',
      description: 'A third feature that completes the set and provides comprehensive functionality.',
      link: '/feature3',
    },
  ];

  const stats = [
    { value: 100, suffix: '+', label: 'Happy Clients' },
    { value: 500, suffix: '+', label: 'Projects Completed' },
    { value: 50, suffix: '+', label: 'Team Members' },
    { value: 10, suffix: '+', label: 'Years Experience' },
  ];

  const testimonials = [
    {
      quote: 'This is an amazing service that has transformed our business.',
      author: 'John Doe',
      role: 'CEO',
      company: 'Company Inc',
      rating: 5,
    },
    {
      quote: 'Outstanding results and exceptional customer service throughout.',
      author: 'Jane Smith',
      role: 'Marketing Director',
      company: 'Brand Co',
      rating: 5,
    },
    {
      quote: 'Highly recommend! The team is professional and delivers on time.',
      author: 'Bob Johnson',
      role: 'Founder',
      company: 'StartupXYZ',
      rating: 5,
    },
  ];

  return (
    <div className="example-page">
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Modern Animations"
        subtitle="BearCave Marketing"
        description="Experience cutting-edge animations and beautiful section templates that will impress your visitors"
        ctaText="Get Started"
        variant="gradient"
      />

      {/* Features Section with Scroll Reveal */}
      <ScrollReveal direction="up" delay={0.2}>
        <FeaturesSection
          title="Amazing Features"
          subtitle="What We Offer"
          features={features}
          columns={3}
          variant="cards"
        />
      </ScrollReveal>

      {/* Stats Section */}
      <StatsSection
        title="Our Impact"
        subtitle="By The Numbers"
        stats={stats}
        variant="gradient"
      />

      {/* Testimonials with Tilt Cards */}
      <TestimonialsSection
        title="What Clients Say"
        subtitle="Testimonials"
        testimonials={testimonials}
        variant="cards"
      />

      {/* CTA Section with Magnetic Button */}
      <CTASection
        title="Ready to Get Started?"
        description="Join thousands of satisfied customers and transform your business today"
        primaryCTA={{
          text: 'Contact Us',
          link: '/contact',
        }}
        secondaryCTA={{
          text: 'Learn More',
          link: '/about',
        }}
        variant="gradient"
      />

      {/* Example of Magnetic Button */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem' }}>Try the Magnetic Button</h2>
        <MagneticButton variant="primary" strength={0.3}>
          Hover Me!
        </MagneticButton>
      </section>

      {/* Example of Tilt Card */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Tilt Card Example
          </h2>
          <TiltCard>
            <div
              style={{
                padding: '2rem',
                background: 'var(--bc-surface, #fff)',
                borderRadius: '1rem',
                border: '1px solid var(--bc-border, #e5e7eb)',
              }}
            >
              <h3>Card Title</h3>
              <p>Move your mouse over this card to see the 3D tilt effect!</p>
            </div>
          </TiltCard>
        </div>
      </section>
    </div>
  );
};

export default ExamplePage;

