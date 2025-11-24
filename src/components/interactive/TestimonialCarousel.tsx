/**
 * Testimonial Carousel Component
 * Reveal-on-scroll testimonial carousel with Framer Motion
 * Matches design system palette and typography
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './TestimonialCarousel.css';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  theme?: 'light' | 'dark';
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
  theme = 'dark',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  React.useEffect(() => {
    if (!autoPlay || !isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, testimonials.length, isInView]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (!isInView) {
    return <div ref={ref} className={`testimonial-carousel ${theme} ${className}`} />;
  }

  return (
    <motion.div
      ref={ref}
      className={`testimonial-carousel ${theme} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="testimonial-carousel__item"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {currentTestimonial.avatar && (
            <div className="testimonial-carousel__avatar">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.author}
                loading="lazy"
              />
            </div>
          )}

          <blockquote className="testimonial-carousel__quote">
            {currentTestimonial.quote}
          </blockquote>

          <div className="testimonial-carousel__author">
            <div className="testimonial-carousel__author-name">
              {currentTestimonial.author}
            </div>
            <div className="testimonial-carousel__author-role">
              {currentTestimonial.role}
              {currentTestimonial.company && `, ${currentTestimonial.company}`}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="testimonial-carousel__controls">
        <button
          className="testimonial-carousel__button testimonial-carousel__button--prev"
          onClick={goToPrev}
          aria-label="Previous testimonial"
        >
          ←
        </button>

        <div className="testimonial-carousel__indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-carousel__indicator ${
                index === currentIndex ? 'active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          className="testimonial-carousel__button testimonial-carousel__button--next"
          onClick={goToNext}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </motion.div>
  );
};

export default TestimonialCarousel;

