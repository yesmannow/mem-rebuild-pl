import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../ui/SectionWrapper';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = 'Testimonials',
  subtitle,
  testimonials,
}) => {
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
    <SectionWrapper bgVariant="white">
      <div className="container mx-auto px-4 md:px-8">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <p className="text-sm font-semibold text-turquoise uppercase tracking-wider mb-2">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-light-blue-gray p-8 rounded-xl"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <p className="text-gray-700 text-lg mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ' at '}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;

