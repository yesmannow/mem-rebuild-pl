import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroRedesign from '../components/hero/HeroRedesign';
import ServicesGrid from '../components/sections/ServicesGrid';
import ContactCTA from '../components/sections/ContactCTA';
import AppButton from '../components/ui/AppButton';
import LayeredBackground from '../components/ui/LayeredBackground';
import { useTheme } from '../components/theme/ThemeProvider';
import './DesignSystemDemo.css';

/**
 * DesignSystemDemo - Showcase page for the new design system
 *
 * This page demonstrates all the new components and design tokens
 * as part of the frontend redesign initiative.
 */
const DesignSystemDemo: React.FC = () => {
  const { setTheme, setBrandAccent, prefersReducedMotion } = useTheme();

  const services = [
    {
      icon: '🚀',
      title: 'Marketing Strategy',
      description: 'Full-funnel campaigns that convert visitors into customers',
      features: ['CRM Architecture', 'Marketing Automation', 'Analytics & Reporting'],
      href: '/services/strategy',
    },
    {
      icon: '⚙️',
      title: 'Marketing Technology',
      description: 'Technical implementation of marketing systems and tools',
      features: ['Integrations', 'Custom Development', 'API Connections'],
      href: '/services/technology',
    },
    {
      icon: '📊',
      title: 'Growth Operations',
      description: 'Scalable processes and systems for sustainable growth',
      features: ['Process Design', 'Team Training', 'Performance Optimization'],
      href: '/services/operations',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Design System Demo | BearCave Marketing</title>
        <meta
          name="description"
          content="Interactive demo of the new design system featuring design tokens, typography, and accessible components"
        />
      </Helmet>

      {/* Hero Section */}
      <HeroRedesign
        title="Building Marketing Systems That Scale"
        subtitle="Strategy, automation, and analytics blended into powerful marketing engines"
        primaryCTA="View Work"
        primaryCTAHref="/case-studies"
        secondaryCTA="Get in Touch"
        secondaryCTAHref="/contact"
        gradientColors={['var(--color-neutral-1)', '#1a1a2e', '#16213e']}
      />

      {/* Main Content */}
      <main className="demo-content">
        {/* Theme Controls Section */}
        <section className="demo-section demo-section--theme-controls">
          <LayeredBackground
            gradient={['rgba(59, 130, 246, 0.05)', 'rgba(236, 72, 153, 0.05)']}
            textureOpacity={0.1}
            zIndex={-1}
          />
          <div className="demo-container">
            <h2 className="demo-heading">Theme Controls</h2>
            <p className="demo-subheading">
              Test the dynamic theme system with different modes and custom accents
            </p>

            <div className="demo-controls">
              <div className="demo-control-group">
                <h3 className="demo-control-label">Color Mode</h3>
                <div className="demo-buttons">
                  <AppButton variant="outline" size="sm" onClick={() => setTheme('light')}>
                    Light
                  </AppButton>
                  <AppButton variant="outline" size="sm" onClick={() => setTheme('dark')}>
                    Dark
                  </AppButton>
                  <AppButton variant="outline" size="sm" onClick={() => setTheme('system')}>
                    System
                  </AppButton>
                </div>
              </div>

              <div className="demo-control-group">
                <h3 className="demo-control-label">Custom Accent</h3>
                <div className="demo-buttons">
                  <AppButton
                    variant="outline"
                    size="sm"
                    onClick={() => setBrandAccent('#ff6b6b')}
                  >
                    Red
                  </AppButton>
                  <AppButton
                    variant="outline"
                    size="sm"
                    onClick={() => setBrandAccent('#4ecdc4')}
                  >
                    Teal
                  </AppButton>
                  <AppButton
                    variant="outline"
                    size="sm"
                    onClick={() => setBrandAccent('#ffd93d')}
                  >
                    Yellow
                  </AppButton>
                  <AppButton variant="outline" size="sm" onClick={() => setBrandAccent()}>
                    Reset
                  </AppButton>
                </div>
              </div>

              <div className="demo-info">
                <p>
                  <strong>Reduced Motion:</strong>{' '}
                  {prefersReducedMotion ? 'Enabled ✓' : 'Disabled'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Button Variants Section */}
        <section className="demo-section">
          <div className="demo-container">
            <h2 className="demo-heading">Button Variants</h2>
            <p className="demo-subheading">
              Accessible buttons with hover elevation and focus rings
            </p>

            <div className="demo-button-showcase">
              <div className="demo-button-row">
                <AppButton variant="primary" size="lg">
                  Primary Large
                </AppButton>
                <AppButton variant="primary" size="md">
                  Primary Medium
                </AppButton>
                <AppButton variant="primary" size="sm">
                  Primary Small
                </AppButton>
              </div>

              <div className="demo-button-row">
                <AppButton variant="secondary" size="lg">
                  Secondary Large
                </AppButton>
                <AppButton variant="secondary" size="md">
                  Secondary Medium
                </AppButton>
                <AppButton variant="secondary" size="sm">
                  Secondary Small
                </AppButton>
              </div>

              <div className="demo-button-row">
                <AppButton variant="outline" size="lg">
                  Outline Large
                </AppButton>
                <AppButton variant="outline" size="md">
                  Outline Medium
                </AppButton>
                <AppButton variant="outline" size="sm">
                  Outline Small
                </AppButton>
              </div>

              <div className="demo-button-row">
                <AppButton variant="ghost" size="lg">
                  Ghost Large
                </AppButton>
                <AppButton variant="ghost" size="md">
                  Ghost Medium
                </AppButton>
                <AppButton variant="ghost" size="sm">
                  Ghost Small
                </AppButton>
              </div>

              <div className="demo-button-row">
                <AppButton variant="primary" size="md" isLoading>
                  Loading State
                </AppButton>
                <AppButton variant="primary" size="md" disabled>
                  Disabled State
                </AppButton>
                <AppButton variant="primary" size="md" fullWidth>
                  Full Width Button
                </AppButton>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <ServicesGrid
          title="What We Do"
          subtitle="Comprehensive marketing solutions for modern businesses"
          services={services}
          columns={3}
        />

        {/* Typography Section */}
        <section className="demo-section demo-section--dark">
          <div className="demo-container">
            <h2 className="demo-heading">Typography System</h2>
            <p className="demo-subheading">
              Space Grotesk & Clash Display for headings, Montserrat for body text
            </p>

            <div className="demo-typography">
              <h1 className="heading-1">Heading 1 - Display</h1>
              <h2 className="heading-2">Heading 2 - Section</h2>
              <h3 className="heading-3">Heading 3 - Subsection</h3>
              <h4 className="heading-4">Heading 4 - Card Title</h4>
              <h5 className="heading-5">Heading 5 - Small Title</h5>
              <h6 className="heading-6">Heading 6 - Caption</h6>

              <p className="text-large">
                Large body text - Perfect for important paragraphs and lead-ins
              </p>
              <p>
                Regular body text - The standard paragraph size for most content. Karla
                provides excellent readability with its humanist proportions.
              </p>
              <p className="text-small">
                Small text - Used for captions, labels, and secondary information
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <ContactCTA
          title="Ready to Transform Your Marketing?"
          subtitle="Let's discuss how we can build systems that drive real growth for your business"
          primaryText="Schedule a Call"
          primaryHref="/contact"
          secondaryText="View Case Studies"
          secondaryHref="/case-studies"
          gradientColors={['var(--color-primary)', '#8b5cf6', 'var(--color-danger)']}
        />
      </main>
    </>
  );
};

export default DesignSystemDemo;
