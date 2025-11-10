import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AnimatedSection from '../components/animations/AnimatedSection';
import TextReveal from '../components/animations/TextReveal';
import { fadeInUp } from '../utils/animations';
import { Sparkles, Grid3x3, Search, Filter } from 'lucide-react';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

interface BrandBoard {
  slug: string;
  name: string;
  colors: { [key: string]: string };
  created: string;
  preview?: string;
}

const Gallery: React.FC = () => {
  const [brandBoards, setBrandBoards] = useState<BrandBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBoard, setSelectedBoard] = useState<BrandBoard | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate loading brand boards
    setTimeout(() => {
      setBrandBoards([
        {
          slug: 'example-brand-1',
          name: 'Modern Tech Brand',
          colors: { 500: '#6366f1' },
          created: new Date().toISOString(),
        },
        {
          slug: 'example-brand-2',
          name: 'Creative Agency',
          colors: { 500: '#ec4899' },
          created: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          slug: 'example-brand-3',
          name: 'Healthcare Solutions',
          colors: { 500: '#10b981' },
          created: new Date(Date.now() - 172800000).toISOString(),
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredBoards = useMemo(() => {
    if (!searchQuery) return brandBoards;
    return brandBoards.filter(board =>
      board.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [brandBoards, searchQuery]);

  // GSAP animations
  useEffect(() => {
    const cards = gsap.utils.toArray('.brand-card');

    cards.forEach((card: any, index: number) => {
      gsap.fromTo(
        card,
        {
          autoAlpha: 0,
          y: 60,
          scale: 0.9,
          rotateY: 10,
        },
        {
          duration: 0.8,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.05,
        }
      );

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          rotateY: -5,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          rotateY: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, [filteredBoards]);

  if (loading) {
    return (
      <main className="gallery-page">
        <div className="loading-state">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p>Loading brand boards...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="gallery-page">
      {/* Hero Section */}
      <motion.section
        className="gallery-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.div
            className="hero-icon"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <Sparkles size={48} />
          </motion.div>
          <TextReveal text="Brand Gallery" className="page-title" />
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Explore curated brand identity systems and design systems
          </motion.p>
        </div>

        {/* Floating particles */}
        <div className="floating-particles">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* Controls Section */}
      <AnimatedSection delay={0.2}>
        <div className="gallery-controls">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search brand boards..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="view-toggle">
            <motion.button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Grid3x3 size={18} />
            </motion.button>
            <motion.button
              className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`}
              onClick={() => setViewMode('masonry')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Filter size={18} />
            </motion.button>
          </div>
        </div>
      </AnimatedSection>

      {/* Brand Boards Grid */}
      <AnimatedSection delay={0.3}>
        {filteredBoards.length === 0 ? (
          <div className="empty-state">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <Sparkles size={64} className="empty-icon" />
            </motion.div>
            <h3>No brand boards found</h3>
            <p>
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Start creating brand boards to see them here'}
            </p>
            {!searchQuery && (
              <motion.a
                href="/brand-builder"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Brand Board
              </motion.a>
            )}
          </div>
        ) : (
          <div className={`brand-boards-grid ${viewMode}`}>
            {filteredBoards.map((board, index) => (
              <motion.div
                key={board.slug}
                className="brand-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Link to={`/brand/${board.slug}`} className="card-link">
                  <div
                    className="card-color-preview"
                    style={{ backgroundColor: board.colors[500] || '#6366f1' }}
                  >
                    <motion.div
                      className="card-overlay"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="overlay-content">
                        <h3>{board.name}</h3>
                        <span className="view-link">View Details →</span>
                      </div>
                    </motion.div>
                  </div>
                  <div className="card-info">
                    <h3>{board.name}</h3>
                    <p className="card-date">
                      Created {new Date(board.created).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection delay={0.4}>
        <motion.div
          className="gallery-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Create Your Own Brand Board</h2>
          <p>Design a complete brand identity system with our interactive builder</p>
          <motion.a
            href="/brand-builder"
            className="btn-primary cta-button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Launch Brand Builder
          </motion.a>
        </motion.div>
      </AnimatedSection>
    </main>
  );
};

export default Gallery;
