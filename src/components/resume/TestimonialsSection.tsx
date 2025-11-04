import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Linkedin } from 'lucide-react';
import testimonialsData from '../../data/testimonials.json';
import './TestimonialsSection.css';

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = testimonialsData.testimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const current = testimonials[currentIndex];

  return (
    <motion.section
      id="testimonials"
      className="testimonials-section scroll-mt-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-6">
          <Quote className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            What Colleagues Say
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Recommendations from professionals I've worked with throughout my career
        </p>
      </motion.div>

      {/* Testimonials Carousel */}
      <div className="max-w-4xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="testimonial-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Quote Icon */}
            <div className="absolute top-0 left-0 text-blue-500/20 -translate-y-4 -translate-x-4">
              <Quote size={80} />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              {/* Highlight */}
              <motion.div
                className="highlight-badge mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">{current.highlight}</span>
              </motion.div>

              {/* Quote */}
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 italic">
                "{current.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{current.name}</h3>
                  <p className="text-gray-400 text-sm">{current.role}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {current.relationship} • {current.date}
                  </p>
                </div>
                <motion.div
                  className="linkedin-badge"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Previous Button */}
          <motion.button
            onClick={prevTestimonial}
            className="nav-button prev-button"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === currentIndex ? 1.2 : 1,
                }}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            onClick={nextTestimonial}
            className="nav-button next-button"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Testimonial Counter */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          {currentIndex + 1} of {testimonials.length}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;

