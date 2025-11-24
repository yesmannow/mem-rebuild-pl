import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { OceanGradientText } from '../ui/OceanGradientText';
import { OceanAnimatedTestimonials } from '../ui/OceanAnimatedTestimonials';
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

  // Convert testimonials to OceanAnimatedTestimonials format
  const oceanTestimonials = testimonials.map((t, index) => ({
    quote: t.quote,
    name: t.name,
    designation: t.title,
    company: t.company,
    src: undefined, // Can add avatar images later
  }));

  return (
    <section id="testimonials" className="testimonials container-px mx-auto max-w-6xl py-16 md:py-24 relative">
      {/* Background decorative gradient - Ocean Pearl */}
      <motion.div
        className="absolute -top-10 right-0 w-80 h-80 bg-[#e29578]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="testimonials__header relative z-10 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">
          <OceanGradientText text="What People Say" className="text-[#edf6f9]" />
        </h2>
        <p className="text-lg text-[#edf6f9]/60 mt-4 max-w-2xl mx-auto text-center font-body">
          Trusted by leaders across industries
        </p>
      </motion.div>

      {/* Enhanced Animated Testimonials */}
      <OceanAnimatedTestimonials
        testimonials={oceanTestimonials}
        autoplay={true}
        className="relative z-10"
      />
    </section>
  );
};

export default Testimonials;
