import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../lib/utils';
import { testimonials, getFeaturedTestimonials } from '../data/testimonials';

export interface TestimonialLog {
  id: string;
  quote: string;
  author: string;
  role?: string;
  timestamp?: string;
}

interface TestimonialTerminalProps {
  testimonials?: TestimonialLog[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  useFeatured?: boolean;
}

const TestimonialTerminal: React.FC<TestimonialTerminalProps> = ({
  testimonials: providedTestimonials,
  className,
  autoPlay = true,
  interval = 8000,
  useFeatured = true,
}) => {
  // Use provided testimonials or fetch from data
  const testimonialData = providedTestimonials || (useFeatured
    ? getFeaturedTestimonials().map(t => ({
        id: t.id,
        quote: t.quote,
        author: t.name,
        role: t.role,
        timestamp: t.date,
      }))
    : testimonials.map(t => ({
        id: t.id,
        quote: t.quote,
        author: t.name,
        role: t.role,
        timestamp: t.date,
      }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const currentTestimonial = testimonialData[currentIndex];

  // Typewriter effect
  useEffect(() => {
    if (!isInView) return;

    setDisplayedText('');
    setIsTyping(true);
    let currentCharIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentCharIndex < currentTestimonial.quote.length) {
        setDisplayedText(currentTestimonial.quote.slice(0, currentCharIndex + 1));
        currentCharIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 30); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentIndex, currentTestimonial.quote, isInView]);

  // Auto-advance to next testimonial
  useEffect(() => {
    if (!isInView || !autoPlay || isTyping) return;

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearTimeout(timeout);
  }, [isInView, autoPlay, interval, isTyping, testimonialData.length]);

  if (!isInView) {
    return <div ref={containerRef} className={cn('h-64', className)} />;
  }

  return (
    <div ref={containerRef} className={cn('w-full', className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800 relative">
          {/* Subtle glow on header */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/0 via-brand-teal/5 to-brand-orange/0" />
          <div className="flex gap-2 relative z-10">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-yellow-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <div className="flex-1 text-center relative z-10">
            <span className="text-xs font-mono text-slate-400">testimonial.log</span>
          </div>
          <div className="w-12 relative z-10" /> {/* Spacer for centering */}
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm">
          {/* System prompt */}
          <div className="mb-4 text-slate-500">
            <span className="text-brand-teal">$</span>{' '}
            <span className="text-slate-400">cat testimonial.log</span>
          </div>

          {/* Log entry */}
          <div className="space-y-2">
            <div className="text-slate-500">
              <span className="text-slate-600">[{currentTestimonial.timestamp || new Date().toISOString().split('T')[0]}]</span>{' '}
              <span className="text-brand-teal">INFO</span>{' '}
              <span className="text-slate-400">testimonial.system</span>
            </div>

            {/* Quote with typewriter effect */}
            <div className="text-slate-200 leading-relaxed min-h-[4rem]">
              <span className="text-slate-500">&gt;</span>{' '}
              <span>{displayedText}</span>
              {isTyping && (
                <motion.span
                  className="inline-block w-2 h-4 bg-brand-teal ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </div>

            {/* Author metadata */}
            {!isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 pt-4 border-t border-slate-800"
              >
                <div className="text-slate-400 space-y-1">
                  <div>
                    <span className="text-slate-600">author:</span>{' '}
                    <span className="text-brand-teal">{currentTestimonial.author}</span>
                  </div>
                  {currentTestimonial.role && (
                    <div>
                      <span className="text-slate-600">role:</span>{' '}
                      <span className="text-slate-300">{currentTestimonial.role}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Progress indicator */}
            <div className="flex gap-1 mt-6">
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-1 flex-1 rounded transition-all',
                    index === currentIndex
                      ? 'bg-brand-teal'
                      : 'bg-slate-800 hover:bg-slate-700'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialTerminal;

