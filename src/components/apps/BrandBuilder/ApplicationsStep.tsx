import React from 'react';
import { motion } from 'framer-motion';
import { BrandTokens } from './types';

interface ApplicationsStepProps {
  tokens: BrandTokens;
}

const ApplicationsStep: React.FC<ApplicationsStepProps> = ({ tokens }) => {
  // Extract colors for CSS variables
  const primaryColor = tokens.colors.primary || '#6366f1';
  const secondaryColor = tokens.colors.secondary || '#8b5cf6';
  const accentColor = tokens.colors.accent || '#10b981';
  const headingFont = tokens.fonts.heading || 'Inter';
  const bodyFont = tokens.fonts.body || 'Roboto';

  // Create CSS variable style object
  const brandStyle: React.CSSProperties = {
    '--brand-primary': primaryColor,
    '--brand-secondary': secondaryColor,
    '--brand-accent': accentColor,
    '--brand-heading-font': headingFont,
    '--brand-body-font': bodyFont,
  } as React.CSSProperties;

  const applications = [
    {
      name: 'Business Card',
      preview: '💼',
      component: (
        <div className="application-mockup business-card" style={brandStyle}>
          <div className="mockup-header" style={{ backgroundColor: `var(--brand-primary)` }}>
            <h3 style={{ fontFamily: `var(--brand-heading-font)` }}>{tokens.name || 'Your Brand'}</h3>
          </div>
          <div className="mockup-body" style={{ fontFamily: `var(--brand-body-font)` }}>
            <p>Professional Contact Card</p>
            <div className="mockup-accent" style={{ color: `var(--brand-accent)` }}>
              Accent Element
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Letterhead',
      preview: '📄',
      component: (
        <div className="application-mockup letterhead" style={brandStyle}>
          <div className="mockup-header" style={{ borderBottomColor: `var(--brand-primary)` }}>
            <h2 style={{ fontFamily: `var(--brand-heading-font)`, color: `var(--brand-primary)` }}>
              {tokens.name || 'Your Brand'}
            </h2>
          </div>
          <div className="mockup-body" style={{ fontFamily: `var(--brand-body-font)` }}>
            <p>Professional letterhead design with your brand colors and typography.</p>
          </div>
        </div>
      ),
    },
    {
      name: 'Website',
      preview: '🌐',
      component: (
        <div className="application-mockup website" style={brandStyle}>
          <div className="mockup-nav" style={{ backgroundColor: `var(--brand-primary)` }}>
            <span style={{ fontFamily: `var(--brand-heading-font)` }}>Navigation</span>
          </div>
          <div className="mockup-hero" style={{ backgroundColor: `var(--brand-secondary)` }}>
            <h1 style={{ fontFamily: `var(--brand-heading-font)` }}>Hero Section</h1>
          </div>
          <div className="mockup-content" style={{ fontFamily: `var(--brand-body-font)` }}>
            <p>Website content with your brand identity applied.</p>
          </div>
        </div>
      ),
    },
    {
      name: 'Social Media',
      preview: '📱',
      component: (
        <div className="application-mockup social-media" style={brandStyle}>
          <div className="mockup-header" style={{ backgroundColor: `var(--brand-primary)` }}>
            <span style={{ fontFamily: `var(--brand-heading-font)` }}>@{tokens.name?.toLowerCase().replace(/\s+/g, '') || 'yourbrand'}</span>
          </div>
          <div className="mockup-content" style={{ fontFamily: `var(--brand-body-font)` }}>
            <div className="mockup-post">
              <p>Social media post with brand colors</p>
              <div className="mockup-accent" style={{ color: `var(--brand-accent)` }}>
                Call to Action
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="step-panel">
      <h2>Preview Applications</h2>
      <p>See your brand in action with real-time preview</p>
      <div className="applications-grid">
        {applications.map((app, index) => (
          <motion.div
            key={index}
            className="application-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="app-preview-container">
              {app.component}
            </div>
            <h3>{app.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsStep;
