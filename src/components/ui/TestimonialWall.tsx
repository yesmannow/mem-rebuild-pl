import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';

interface TestimonialWallProps {
  className?: string;
}

const TestimonialWall: React.FC<TestimonialWallProps> = ({ className = '' }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Split into 3 columns for masonry effect
  const column1 = duplicatedTestimonials.filter((_, i) => i % 3 === 0);
  const column2 = duplicatedTestimonials.filter((_, i) => i % 3 === 1);
  const column3 = duplicatedTestimonials.filter((_, i) => i % 3 === 2);

  return (
    <div
      className={`testimonial-wall-container relative py-8 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden h-[600px] relative">
        {/* Column 1 */}
        <motion.div
          className="flex flex-col gap-4"
          animate={{
            y: isPaused ? 0 : [0, -50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {column1.map((testimonial, index) => (
            <motion.div
              key={`col1-${index}`}
              className="bg-brand-surface/40 backdrop-blur-md border border-brand-teal/20 rounded-2xl p-6 relative transition-all hover:border-brand-teal/40 hover:-translate-y-0.5 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-2 left-4 text-6xl leading-none text-brand-teal/30 font-serif">
                "
              </div>
              <p className="text-brand-text/90 leading-relaxed text-sm mt-4 mb-4 pl-2">
                {testimonial.quote}
              </p>
              <div className="mt-4 pt-4 border-t border-brand-teal/10">
                <div className="font-semibold text-brand-teal text-sm mb-1">{testimonial.name}</div>
                <div className="text-xs text-brand-muted/70">
                  {testimonial.role}
                  {testimonial.company && ` • ${testimonial.company}`}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div
          className="flex flex-col gap-4"
          animate={{
            y: isPaused ? 0 : [-25, -75],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {column2.map((testimonial, index) => (
            <motion.div
              key={`col2-${index}`}
              className="bg-brand-surface/40 backdrop-blur-md border border-brand-teal/20 rounded-2xl p-6 relative transition-all hover:border-brand-teal/40 hover:-translate-y-0.5 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-2 left-4 text-6xl leading-none text-brand-teal/30 font-serif">
                "
              </div>
              <p className="text-brand-text/90 leading-relaxed text-sm mt-4 mb-4 pl-2">
                {testimonial.quote}
              </p>
              <div className="mt-4 pt-4 border-t border-brand-teal/10">
                <div className="font-semibold text-brand-teal text-sm mb-1">{testimonial.name}</div>
                <div className="text-xs text-brand-muted/70">
                  {testimonial.role}
                  {testimonial.company && ` • ${testimonial.company}`}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Column 3 */}
        <motion.div
          className="flex flex-col gap-4"
          animate={{
            y: isPaused ? 0 : [-50, -100],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {column3.map((testimonial, index) => (
            <motion.div
              key={`col3-${index}`}
              className="bg-brand-surface/40 backdrop-blur-md border border-brand-teal/20 rounded-2xl p-6 relative transition-all hover:border-brand-teal/40 hover:-translate-y-0.5 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-2 left-4 text-6xl leading-none text-brand-teal/30 font-serif">
                "
              </div>
              <p className="text-brand-text/90 leading-relaxed text-sm mt-4 mb-4 pl-2">
                {testimonial.quote}
              </p>
              <div className="mt-4 pt-4 border-t border-brand-teal/10">
                <div className="font-semibold text-brand-teal text-sm mb-1">{testimonial.name}</div>
                <div className="text-xs text-brand-muted/70">
                  {testimonial.role}
                  {testimonial.company && ` • ${testimonial.company}`}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient fade at top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-brand-dark to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default TestimonialWall;
