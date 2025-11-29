import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialBadgeProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  rating?: number;
  className?: string;
}

const TestimonialBadge: React.FC<TestimonialBadgeProps> = ({
  quote,
  author,
  role,
  company,
  rating = 5,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`relative rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur p-6 ${className}`}
    >
      {/* Quote Icon */}
      <div className="absolute -top-3 -left-3">
        <div className="p-2 rounded-full bg-brand-teal/20 border border-brand-teal/30">
          <Quote size={16} className="text-brand-teal" />
        </div>
      </div>

      {/* Rating Stars */}
      {rating > 0 && (
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? 'text-brand-orange fill-brand-orange' : 'text-slate-700'}
            />
          ))}
        </div>
      )}

      {/* Quote Text */}
      <p className="text-brand-text/90 italic mb-4 leading-relaxed">"{quote}"</p>

      {/* Author Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-teal to-brand-orange flex items-center justify-center text-white font-bold text-sm">
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-brand-text">{author}</p>
          {(role || company) && (
            <p className="text-sm text-brand-muted">
              {role}
              {role && company && ' • '}
              {company}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Compact inline version for embedding in sections
export const TestimonialInline: React.FC<{
  quote: string;
  author: string;
  className?: string;
}> = ({ quote, author, className = '' }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/40 border border-white/5 ${className}`}>
    <Quote size={16} className="text-brand-teal flex-shrink-0" />
    <p className="text-sm text-brand-muted italic">
      "{quote}" <span className="text-brand-teal font-medium">— {author}</span>
    </p>
  </div>
);

export default TestimonialBadge;
