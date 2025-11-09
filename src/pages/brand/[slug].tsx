import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Copy } from 'lucide-react';
import AnimatedSection from '../../components/animations/AnimatedSection';
import TextReveal from '../../components/animations/TextReveal';
import { fadeInUp } from '../../utils/animations';
import '../brand/BrandDetail.css';

interface BrandTokens {
  name: string;
  colors: { [key: string]: string };
  fonts: {
    heading: string;
    body: string;
  };
  mark: string | null;
}

const BrandDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tokens, setTokens] = useState<BrandTokens | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setTokens({
        name: slug || 'Brand Board',
        colors: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        fonts: {
          heading: 'Inter',
          body: 'Roboto',
        },
        mark: null,
      });
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <main className="brand-detail-page">
        <div className="loading-state">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p>Loading brand board...</p>
        </div>
      </main>
    );
  }

  if (!tokens) {
    return (
      <main className="brand-detail-page">
        <div className="error-state">
          <h2>Brand board not found</h2>
          <Link to="/gallery" className="btn-primary">
            Back to Gallery
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="brand-detail-page">
      {/* Header */}
      <motion.section
        className="brand-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <Link to="/gallery" className="back-link">
            <ArrowLeft size={20} />
            Back to Gallery
          </Link>
          <TextReveal text={tokens.name} className="brand-title" />
          <p className="brand-subtitle">Brand Identity System</p>
        </div>

        <div className="header-actions">
          <motion.button
            className="action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            Export
          </motion.button>
          <motion.button
            className="action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={20} />
            Share
          </motion.button>
        </div>
      </motion.section>

      {/* Color Palette */}
      <AnimatedSection delay={0.1}>
        <div className="brand-section">
          <h2 className="section-title">Color Palette</h2>
          <div className="color-grid">
            {Object.entries(tokens.colors).map(([key, color]) => (
              <motion.div
                key={key}
                className="color-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="color-preview" style={{ backgroundColor: color }} />
                <div className="color-info">
                  <span className="color-label">{key}</span>
                  <span className="color-value">{color}</span>
                </div>
                <motion.button
                  className="copy-btn"
                  onClick={() => navigator.clipboard.writeText(color)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Copy size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Typography */}
      <AnimatedSection delay={0.2}>
        <div className="brand-section">
          <h2 className="section-title">Typography</h2>
          <div className="typography-grid">
            <div className="typography-card">
              <h3>Heading Font</h3>
              <p className="font-preview" style={{ fontFamily: tokens.fonts.heading }}>
                {tokens.fonts.heading}
              </p>
              <p className="font-sample" style={{ fontFamily: tokens.fonts.heading }}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div className="typography-card">
              <h3>Body Font</h3>
              <p className="font-preview" style={{ fontFamily: tokens.fonts.body }}>
                {tokens.fonts.body}
              </p>
              <p className="font-sample" style={{ fontFamily: tokens.fonts.body }}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Applications Preview */}
      <AnimatedSection delay={0.3}>
        <div className="brand-section">
          <h2 className="section-title">Applications</h2>
          <div className="applications-preview">
            {[
              { name: 'Business Card', icon: '💼' },
              { name: 'Letterhead', icon: '📄' },
              { name: 'Website', icon: '🌐' },
              { name: 'Social Media', icon: '📱' },
            ].map((app, index) => (
              <motion.div
                key={index}
                className="app-preview-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="app-icon">{app.icon}</div>
                <h3>{app.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default BrandDetail;
