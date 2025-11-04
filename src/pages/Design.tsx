import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedSection from "../components/animations/AnimatedSection";
import { fadeInUp } from "../utils/animations";
import { loadDesignImages, getDesignCategories, categoryColors, type DesignItem } from "../utils/loadDesign";
import designManifest from "../../public/images/design/manifest.json";
import "./Design.css";

gsap.registerPlugin(ScrollTrigger);


const Design: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Load all design images dynamically
  const designPortfolio = useMemo(() => loadDesignImages(), []);
  const categories = useMemo(() => getDesignCategories(designPortfolio), [designPortfolio]);

  const filteredDesigns = activeCategory === "All"
    ? designPortfolio
    : designPortfolio.filter(design => design.category === activeCategory);

  const handleDesignClick = (design: DesignItem) => {
    const index = filteredDesigns.findIndex(item => item.id === design.id);
    setCurrentImageIndex(index);
    setSelectedDesign(design);
  };

  const handlePrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredDesigns.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedDesign(filteredDesigns[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentImageIndex < filteredDesigns.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedDesign(filteredDesigns[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedDesign) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'Escape':
          e.preventDefault();
          setSelectedDesign(null);
          break;
      }
    };

    if (selectedDesign) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedDesign, currentImageIndex, filteredDesigns]);

  // Enhanced GSAP Cinematic Animations
  useEffect(() => {
    const designs = gsap.utils.toArray(".design-card");

    designs.forEach((design: any, index) => {
      // Cinematic entrance with 3D depth
      gsap.fromTo(
        design,
        {
          autoAlpha: 0,
          y: 70,
          scale: 0.88,
          rotateY: 15,
          rotateX: 10,
          filter: "blur(6px) brightness(0.7)"
        },
        {
          duration: 1.4,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          filter: "blur(0px) brightness(1)",
          ease: "power4.out",
          scrollTrigger: {
            trigger: design,
            start: "top 88%",
            end: "top 25%",
            toggleActions: "play none none reverse",
            scrub: 0.2
          },
          delay: index * 0.06
        }
      );

      // Individual image parallax with depth
      gsap.to(design.querySelector("img"), {
        scrollTrigger: {
          trigger: design,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        },
        y: -40,
        scale: 1.08,
        filter: "brightness(1.1)"
      });

      // Hover enhancement with GSAP
      design.addEventListener("mouseenter", () => {
        gsap.to(design, {
          scale: 1.03,
          y: -12,
          rotateY: 3,
          boxShadow: "0 25px 50px rgba(0,0,0,0.25), 0 0 30px rgba(136,171,242,0.2)",
          duration: 0.4,
          ease: "power2.out"
        });
      });

      design.addEventListener("mouseleave", () => {
        gsap.to(design, {
          scale: 1,
          y: 0,
          rotateY: 0,
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    // Enhanced hero parallax with multiple layers
    gsap.to(".design-hero", {
      scrollTrigger: {
        trigger: ".design-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      },
      y: 220,
      opacity: 0.3,
      scale: 1.12,
      filter: "blur(3px)"
    });

    // Floating categories with depth
    gsap.to(".floating-categories", {
      scrollTrigger: {
        trigger: ".floating-categories",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
      },
      y: -60,
      opacity: 0.85,
      scale: 0.98
    });

    // Enhanced glow effect on category pills
    gsap.utils.toArray(".category-pill").forEach((pill: any, index) => {
      gsap.fromTo(pill,
        {
          boxShadow: "0 0 0px rgba(136, 171, 242, 0)"
        },
        {
          scrollTrigger: {
            trigger: pill,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          boxShadow: "0 0 25px rgba(136, 171, 242, 0.4), 0 0 50px rgba(136, 171, 242, 0.2)",
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out"
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredDesigns]);

  return (
    <main className="design-page-modern">
      {/* Hero Section */}
      <motion.section
        className="design-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content-design">
          <motion.h1
            className="design-page-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Design Portfolio
          </motion.h1>
          <motion.p
            className="design-page-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Creating visual solutions that drive engagement and deliver results
          </motion.p>
        </div>

        {/* Floating Category Pills */}
        <motion.div
          className="floating-categories"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              className={`category-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.05 }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: activeCategory === category
                  ? `linear-gradient(135deg, ${categoryColors[category] || '#f093fb'}, ${categoryColors[category] || '#f5576c'})`
                  : 'rgba(136, 171, 242, 0.1)'
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.section>

      {/* Bento Grid Gallery */}
      <section className="bento-gallery">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="design-bento-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                className={`design-card design-${design.size || 'medium'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleDesignClick(design)}
              >
                <div className="design-card-inner">
                  <img src={design.src} alt={design.title} loading="lazy" />
                  <motion.div
                    className="design-info"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="design-info-content">
                      <h3>{design.title}</h3>
                      <span
                        className="category-badge"
                        data-category={design.category}
                      >
                        {design.category}
                      </span>
                    </div>
                  </motion.div>
                  <div
                    className="design-card-gradient"
                    data-category={design.category}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* View More CTA */}
      <motion.section
        className="view-more-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.a
          href="https://www.behance.net/your-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-cta"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="cta-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <div className="cta-text">
            <h3>View Full Design Portfolio</h3>
            <p>Explore 100+ design projects on Behance</p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>
      </motion.section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            className="modern-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDesign(null)}
          >
            <motion.div
              className="lightbox-backdrop"
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
            />

            {/* Previous Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>

            {/* Image Counter */}
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentImageIndex + 1} / {filteredDesigns.length}
            </motion.div>

            <motion.button
              className="lightbox-close"
              onClick={() => setSelectedDesign(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </motion.button>

            <motion.div
              className="lightbox-image-container"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              key={selectedDesign.id} // Force re-mount for smooth transitions
            >
              <img src={selectedDesign.src} alt={selectedDesign.title} />
              <motion.div
                className="lightbox-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2>{selectedDesign.title}</h2>
                <span
                  className="lightbox-category"
                  data-category={selectedDesign.category}
                >
                  {selectedDesign.category}
                </span>

                {/* Keyboard hints */}
                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-400">
                  <span>← Previous</span>
                  <span>→ Next</span>
                  <span>ESC Close</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Design;
