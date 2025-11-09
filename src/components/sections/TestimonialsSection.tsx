import React from 'react';
import { motion, useInView } from 'framer-motion';
import './TestimonialsSection.css';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'cards' | 'minimal' | 'carousel';
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  title,
  subtitle,
  variant = 'default',
  className = '',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      className={`testimonials-section testimonials-section--${variant} ${className}`}
    >
      <div className="testimonials-section__container">
        {(title || subtitle) && (
          <motion.div
            className="testimonials-section__header"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <div className="testimonials-section__subtitle">{subtitle}</div>
            )}
            {title && (
              <h2 className="testimonials-section__title">{title}</h2>
            )}
          </motion.div>
        )}

        <motion.div
          className="testimonials-section__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonials-section__item"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {testimonial.rating && (
                <div className="testimonials-section__rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < testimonial.rating!
                          ? 'testimonials-section__star testimonials-section__star--filled'
                          : 'testimonials-section__star'
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              <blockquote className="testimonials-section__quote">
                "{testimonial.quote}"
              </blockquote>

              <div className="testimonials-section__author">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="testimonials-section__avatar"
                  />
                )}
                <div className="testimonials-section__author-info">
                  <div className="testimonials-section__author-name">
                    {testimonial.author}
                  </div>
                  {(testimonial.role || testimonial.company) && (
                    <div className="testimonials-section__author-role">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ' at '}
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

