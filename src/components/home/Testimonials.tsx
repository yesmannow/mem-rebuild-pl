import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './Testimonials.css';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  date?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 6000); // Longer interval for longer testimonials

    return () => clearInterval(interval);
  }, [testimonials.length, prefersReducedMotion, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent, direction: 'prev' | 'next') => {
    if (e.key === 'ArrowLeft' && direction === 'prev') {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === 'ArrowRight' && direction === 'next') {
      e.preventDefault();
      goToNext();
    }
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="testimonials container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="testimonials__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">What People Say</h2>
      </motion.div>

      <div
        className="testimonials__carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          className="testimonials__nav testimonials__nav--prev"
          onClick={goToPrevious}
          onKeyDown={(e) => handleKeyDown(e, 'prev')}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="testimonials__wrapper" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonial-card"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <Star className="testimonial-card__star-icon" size={48} fill="currentColor" />
              <blockquote className="testimonial-card__quote">
                {current.quote}
              </blockquote>
              <div className="testimonial-card__author">
                <div className="testimonial-card__author-info">
                  <div className="testimonial-card__author-name">{current.name}</div>
                  <div className="testimonial-card__author-title">{current.title}</div>
                  {current.date && (
                    <div className="testimonial-card__author-date">{current.date}</div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="testimonials__nav testimonials__nav--next"
          onClick={goToNext}
          onKeyDown={(e) => handleKeyDown(e, 'next')}
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="testimonials__indicators" role="tablist">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`testimonials__indicator ${index === currentIndex ? 'is-active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            role="tab"
            aria-selected={index === currentIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
