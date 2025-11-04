import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedSection from "../components/animations/AnimatedSection";
import TextReveal from "../components/animations/TextReveal";
import { fadeInUp } from "../utils/animations";
import { loadPhotographyImages, getPhotoCategories, categoryColors, type PhotoItem } from "../utils/loadPhotography";
import photographyManifest from "../../public/images/photography/manifest.json";
import "./Photography.css";

gsap.registerPlugin(ScrollTrigger);

const Photography: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Load all photography images dynamically
  const photoGallery = useMemo(() => loadPhotographyImages(), []);
  const categories = useMemo(() => getPhotoCategories(photoGallery), [photoGallery]);

  const filteredPhotos = activeCategory === "All"
    ? photoGallery
    : photoGallery.filter(photo => photo.category === activeCategory);

  const handlePhotoClick = (photo: PhotoItem) => {
    const index = filteredPhotos.findIndex(item => item.id === photo.id);
    setCurrentImageIndex(index);
    setSelectedPhoto(photo);
  };

  const handlePrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredPhotos.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentImageIndex < filteredPhotos.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

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
          setSelectedPhoto(null);
          break;
      }
    };

    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedPhoto, currentImageIndex, filteredPhotos]);

  // Enhanced GSAP Cinematic Animations
  useEffect(() => {
    const photos = gsap.utils.toArray(".photo-card");

    photos.forEach((photo: HTMLElement, index: number) => {
      // Cinematic entrance with depth
      gsap.fromTo(
        photo,
        {
          autoAlpha: 0,
          y: 80,
          scale: 0.85,
          rotateX: 25,
          rotateY: 5,
          filter: "blur(8px)"
        },
        {
          duration: 1.5,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          filter: "blur(0px)",
          ease: "power4.out",
          scrollTrigger: {
            trigger: photo,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            scrub: 0.3
          },
          delay: index * 0.08
        }
      );

      // Subtle parallax on individual images
      gsap.to(photo.querySelector("img"), {
        scrollTrigger: {
          trigger: photo,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        y: -30,
        scale: 1.05
      });
    });

    // Enhanced hero parallax with multiple layers
    gsap.to(".photo-hero", {
      scrollTrigger: {
        trigger: ".photo-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
      },
      y: 250,
      opacity: 0.2,
      scale: 1.15,
      filter: "blur(2px)"
    });

    // Floating categories animation
    gsap.to(".floating-categories", {
      scrollTrigger: {
        trigger: ".floating-categories",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
      },
      y: -50,
      opacity: 0.8
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, [filteredPhotos]);

  return (
    <main className="photography-page-modern">
      {/* Hero Section with Parallax */}
      <motion.section
        className="photo-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content-photo">
          <motion.h1
            className="photo-page-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Visual Stories
          </motion.h1>
          <motion.p
            className="photo-page-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Capturing moments that inspire and connect
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
                  ? `linear-gradient(135deg, ${categoryColors[category] || '#667eea'}, ${categoryColors[category] || '#764ba2'})`
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
            className="photo-bento-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className={`photo-card photo-${photo.size || 'medium'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handlePhotoClick(photo)}
              >
                <div className="photo-card-inner">
                  <img src={photo.src} alt={photo.title} loading="lazy" />
                  <motion.div
                    className="photo-info"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="photo-info-content">
                      <h3>{photo.title}</h3>
                      <span
                        className="category-badge"
                        data-category={photo.category}
                      >
                        {photo.category}
                      </span>
                    </div>
                  </motion.div>
                  <div
                    className="photo-card-gradient"
                    data-category={photo.category}
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
          href="https://lightroom.adobe.com/shares/1bd278c4190442cbbdc4eccfcef0d91b"
          target="_blank"
          rel="noopener noreferrer"
          className="lightroom-cta"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="cta-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
          <div className="cta-text">
            <h3>Explore Full Collection</h3>
            <p>View 100+ photos in Adobe Lightroom</p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>
      </motion.section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="modern-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
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
              {currentImageIndex + 1} / {filteredPhotos.length}
            </motion.div>

            <motion.button
              className="lightbox-close"
              onClick={() => setSelectedPhoto(null)}
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
              key={selectedPhoto.id} // Force re-mount for smooth transitions
            >
              <img src={selectedPhoto.src} alt={selectedPhoto.title} />
              <motion.div
                className="lightbox-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2>{selectedPhoto.title}</h2>
                <span
                  className="lightbox-category"
                  data-category={selectedPhoto.category}
                >
                  {selectedPhoto.category}
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

export default Photography;
