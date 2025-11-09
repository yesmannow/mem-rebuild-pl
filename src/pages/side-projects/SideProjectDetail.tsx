import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Clock,
  Target,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Eye,
  Heart,
  Palette,
  Type,
  Layers,
  Sparkles,
} from 'lucide-react';
import sideProjectsData from '../../data/side-projects-structured.json';
import Lightbox from '../../components/gallery/Lightbox';
import './SideProjectDetail.css';

gsap.registerPlugin(ScrollTrigger);

const SideProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundProject = sideProjectsData.projects.find(p => p.slug === slug);
    setProject(foundProject);
  }, [slug]);

  useEffect(() => {
    if (!project) return;

    // Hero parallax animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelector('.hero-content'),
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      // Parallax background effect
      gsap.to(heroRef.current.querySelector('.hero-image'), {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Content sections stagger animation
    if (contentRef.current) {
      const sections = contentRef.current.querySelectorAll('.content-section');

      sections.forEach((section, index) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, [project]);

  if (!project) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading project...</p>
      </div>
    );
  }

  const lightboxImages = project.images.map((src: string, index: number) => ({
    src,
    alt: `${project.title} - Image ${index + 1}`,
    title: project.title,
    category: project.category,
  }));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % lightboxImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  return (
    <motion.div
      className="side-project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navigation */}
      <nav className="project-nav">
        <Link to="/side-projects" className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Projects</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="project-hero" ref={heroRef}>
        <div className="hero-background">
          <div className="hero-image">
            <img src={project.images[0]} alt={project.title} onClick={() => openLightbox(0)} />
          </div>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="project-meta">
              <span className="category">{project.category}</span>
              <span className="client">{project.client}</span>
            </div>

            <h1 className="project-title">{project.title}</h1>

            <div className="project-details">
              <div className="detail-item">
                <Calendar size={16} />
                <span>{project.year}</span>
              </div>
              <div className="detail-item">
                <Clock size={16} />
                <span>{project.duration}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="project-content" ref={contentRef}>
        <div className="container">
          {/* Logo Display */}
          {project.images && project.images.length > 0 && (
            <section className="content-section logo-section">
              <div className="logo-display-container">
                <img
                  src={project.images[0]}
                  alt={`${project.client} Logo`}
                  className="project-logo"
                  onClick={() => openLightbox(0)}
                />
              </div>
            </section>
          )}

          {/* Website Showcase */}
          {project.website && (
            <section className="content-section website-showcase">
              <div className="website-showcase-container">
                <div className="website-showcase-content">
                  <h2 className="website-showcase-title">Live Website</h2>
                  <p className="website-showcase-description">
                    Explore the fully deployed website for {project.client}
                  </p>
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-cta-button"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={20} />
                  </a>
                  <div className="website-url">
                    <span className="website-url-label">URL:</span>
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      {project.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>
                <div className="website-showcase-icon">
                  <ExternalLink size={64} />
                </div>
              </div>
            </section>
          )}

          {/* Overview */}
          <section className="content-section overview-section">
            <div className="section-grid">
              <div className="section-text">
                <h2>Project Overview</h2>
                <p className="lead-text">{project.challenge}</p>

                <div className="services-list">
                  <h3>Services Provided</h3>
                  <ul>
                    {project.services.map((service: string, index: number) => (
                      <li key={index}>
                        <CheckCircle size={16} />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="section-visual">
                <div className="stats-grid">
                  {project.metrics &&
                    Object.entries(project.metrics).map(([key, value], index) => (
                      <div key={index} className="stat-card">
                        <div className="stat-icon">
                          {key.includes('satisfaction') && <Heart size={24} />}
                          {key.includes('recognition') && <Eye size={24} />}
                          {key.includes('engagement') && <TrendingUp size={24} />}
                          {!key.includes('satisfaction') &&
                            !key.includes('recognition') &&
                            !key.includes('engagement') && <Target size={24} />}
                        </div>
                        <div className="stat-value">{value as string}</div>
                        <div className="stat-label">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>

          {/* Challenge */}
          <section className="content-section challenge-section">
            <div className="section-header">
              <Target size={32} />
              <h2>The Challenge</h2>
            </div>
            <div className="section-content">
              <p>{project.challenge}</p>
            </div>
          </section>

          {/* Approach / Design Process - Enhanced for logo-only projects */}
          <section className="content-section approach-section">
            <div className="section-header">
              <Lightbulb size={32} />
              <h2>{project.logoOnly ? 'Design Process & Rationale' : 'My Approach'}</h2>
            </div>
            <div className="section-content">
              <p>{project.approach}</p>
              {project.logoOnly && (
                <div className="design-breakdown">
                  <div className="design-element">
                    <h4>Concept Development</h4>
                    <p>
                      The design process began with in-depth research into the client's industry,
                      target audience, and competitive landscape. Through collaborative discovery
                      sessions, I identified key brand values and emotional connections that the
                      logo needed to communicate.
                    </p>
                  </div>
                  <div className="design-element">
                    <h4>Symbolism & Meaning</h4>
                    <p>
                      Every element was chosen with strategic intent—from color psychology to
                      typography selection. The final design creates a visual language that
                      resonates with the target audience while differentiating the brand in its
                      marketplace.
                    </p>
                  </div>
                  <div className="design-element">
                    <h4>Versatility & Application</h4>
                    <p>
                      The logo was designed from the start to work across diverse applications, from
                      digital platforms to print materials, ensuring consistent brand presence
                      regardless of medium or scale.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Color Palette & Typography - Logo-only projects */}
          {project.logoOnly && (
            <section className="content-section brand-elements-section">
              <div className="section-header">
                <Palette size={32} />
                <h2>Color Palette & Typography</h2>
              </div>
              <div className="section-content">
                <div className="brand-elements-grid">
                  <div className="element-card">
                    <div className="element-icon">
                      <Palette size={24} />
                    </div>
                    <h4>Color Strategy</h4>
                    <p>
                      The color palette was carefully selected to evoke specific emotions and brand
                      associations. Each color serves a strategic purpose in communicating the
                      brand's personality and values, ensuring the logo resonates with the intended
                      audience while maintaining visual appeal and readability across applications.
                    </p>
                  </div>
                  <div className="element-card">
                    <div className="element-icon">
                      <Type size={24} />
                    </div>
                    <h4>Typography Selection</h4>
                    <p>
                      The typography choice reflects the brand's character and ensures optimal
                      legibility across all sizes and contexts. Whether custom lettering or
                      carefully selected typefaces, the typography enhances the overall brand
                      message and creates a distinctive voice.
                    </p>
                  </div>
                  <div className="element-card">
                    <div className="element-icon">
                      <Layers size={24} />
                    </div>
                    <h4>Visual Hierarchy</h4>
                    <p>
                      The logo's composition creates a clear visual hierarchy that guides the eye
                      and communicates the most important information first. Strategic use of scale,
                      spacing, and contrast ensures the logo remains effective and memorable across
                      all applications.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Execution / Logo Variations - Enhanced for logo-only */}
          <section className="content-section execution-section">
            <div className="section-header">
              <CheckCircle size={32} />
              <h2>{project.logoOnly ? 'Logo Variations & Versatility' : 'Execution'}</h2>
            </div>
            <div className="section-content">
              <p>{project.execution}</p>
              {project.logoOnly && (
                <div className="variations-info">
                  <p>
                    <strong>Versatile Design System:</strong> The logo was developed with multiple
                    applications in mind. From full-color versions to monochrome applications, the
                    design maintains its integrity and recognition across all contexts—whether
                    appearing on digital platforms, print materials, signage, or merchandise.
                  </p>
                  <p>
                    <strong>Adaptive Solutions:</strong> The logo system includes variations
                    optimized for different use cases, ensuring brand consistency while
                    accommodating diverse application requirements and technical constraints.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Brand Story & Impact - Logo-only projects */}
          {project.logoOnly && (
            <section className="content-section brand-story-section">
              <div className="section-header">
                <Sparkles size={32} />
                <h2>Brand Story & Impact</h2>
              </div>
              <div className="section-content">
                <div className="brand-story-content">
                  <p>
                    <strong>The Brand Transformation:</strong> This logo represents more than just a
                    visual mark—it's the foundation of the brand's identity. The design captures the
                    essence of the brand's story, values, and promise to its audience.
                  </p>
                  <p>
                    <strong>Strategic Impact:</strong> A well-designed logo serves as a powerful
                    tool for brand recognition, emotional connection, and market differentiation.
                    This identity establishes a memorable presence that supports marketing efforts
                    and builds long-term brand equity.
                  </p>
                  <p>
                    <strong>Foundation for Growth:</strong> By creating a strong, versatile logo
                    system, I've provided the client with a solid foundation for future brand
                    expansion, ensuring consistency as the brand grows and evolves across new
                    markets and applications.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Gallery */}
          {project.images.length > 1 && (
            <section className="content-section gallery-section">
              <div className="section-header">
                <Eye size={32} />
                <h2>Visual Showcase</h2>
              </div>
              <div className="project-gallery">
                {project.images.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    className="gallery-item"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openLightbox(index)}
                  >
                    <img src={image} alt={`${project.title} - Image ${index + 1}`} />
                    <div className="gallery-overlay">
                      <ExternalLink size={24} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Results */}
          <section className="content-section results-section">
            <div className="section-header">
              <TrendingUp size={32} />
              <h2>Results & Impact</h2>
            </div>
            <div className="section-content">
              <p>{project.results}</p>
              <blockquote className="takeaway">
                <p>"{project.takeaway}"</p>
              </blockquote>
            </div>
          </section>

          {/* Tags */}
          <section className="content-section tags-section">
            <div className="project-tags">
              {project.tags.map((tag: string, index: number) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <section className="project-cta">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Interested in Working Together?</h2>
          <p>
            Let's discuss how strategic design can elevate your brand and drive meaningful results.
          </p>
          <Link to="/contact" className="cta-button">
            <span>Start Your Project</span>
            <ExternalLink size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={currentImageIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </motion.div>
  );
};

export default SideProjectDetail;
