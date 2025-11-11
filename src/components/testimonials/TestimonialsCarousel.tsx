import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './TestimonialsCarousel.css';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  autoPlay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="testimonials-carousel-section">
      <h2 className="section-heading">What Clients Say</h2>
      <p className="section-subheading">Trusted by founders, CMOs, and growth teams</p>

      <div className="testimonials-carousel-container">
        <button
          className="carousel-nav carousel-nav-prev"
          onClick={goToPrevious}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="testimonials-carousel-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Quote className="testimonial-quote-icon" size={32} />
              <blockquote className="testimonial-quote">
                {testimonials[currentIndex].quote}
              </blockquote>
              <div className="testimonial-author">
                {testimonials[currentIndex].avatar && (
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="testimonial-avatar"
                  />
                )}
                <div className="testimonial-author-info">
                  <div className="testimonial-name">{testimonials[currentIndex].name}</div>
                  <div className="testimonial-title">
                    {testimonials[currentIndex].title}
                    {testimonials[currentIndex].company &&
                      ` • ${testimonials[currentIndex].company}`}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="carousel-nav carousel-nav-next"
          onClick={goToNext}
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      {testimonials.length > 1 && (
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TestimonialsCarousel;
