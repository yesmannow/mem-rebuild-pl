import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../components/animations/AnimatedSection";
import TextReveal from "../components/animations/TextReveal";
import StaggerGrid from "../components/animations/StaggerGrid";
import { testimonials, getFeaturedTestimonials } from "../data/testimonials";
import { fadeInUp } from "../utils/animations";
import "./Testimonials.css";

const Testimonials: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const featuredTestimonials = getFeaturedTestimonials();
  const displayedTestimonials = showAll ? testimonials : featuredTestimonials;

  const getInitials = (name: string): string => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <main className="testimonials-page">
      <AnimatedSection>
        <header className="testimonials-header">
          <TextReveal text="Client Testimonials" className="page-title" />
          <motion.p className="page-subtitle" variants={fadeInUp}>
            What colleagues, clients, and partners say about working with me
          </motion.p>
        </header>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection delay={0.1}>
        <div className="testimonials-stats">
          <div className="stat-item">
            <span className="stat-number">{testimonials.length}</span>
            <span className="stat-label">Recommendations</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Would Recommend</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Years Experience</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Quote */}
      <AnimatedSection delay={0.2}>
        <div className="featured-quote">
          <div className="quote-icon">"</div>
          <blockquote>
            Jacob is an involved and dedicated marketer. His exuberance and moxie are unparalleled. 
            He excels in managing multiple projects concurrently with strong detail, problem solving, 
            and follow-through.
          </blockquote>
          <div className="quote-author">
            <strong>Kevin Martin See</strong>
            <span>IBM | Connector | Ally</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Grid */}
      <AnimatedSection delay={0.3}>
        <StaggerGrid className="testimonials-grid" staggerDelay={0.08}>
          {displayedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
            >
              {/* Quote Icon */}
              <div className="card-quote-icon">"</div>

              {/* Quote Text */}
              <p className="testimonial-quote">{testimonial.quote}</p>

              {/* Author Info */}
              <div className="testimonial-author">
                <div className="author-avatar">
                  {getInitials(testimonial.name)}
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                  {testimonial.company && (
                    <p className="author-company">{testimonial.company}</p>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="testimonial-meta">
                {testimonial.relationship && (
                  <span className="meta-badge">{testimonial.relationship}</span>
                )}
                <span className="meta-date">{testimonial.date}</span>
              </div>

              {/* LinkedIn Badge */}
              <div className="linkedin-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </div>
            </motion.div>
          ))}
        </StaggerGrid>
      </AnimatedSection>

      {/* Show More/Less Button */}
      {!showAll && testimonials.length > featuredTestimonials.length && (
        <AnimatedSection delay={0.4}>
          <div className="show-more-container">
            <motion.button
              className="btn-secondary show-more-btn"
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show All {testimonials.length} Testimonials
            </motion.button>
          </div>
        </AnimatedSection>
      )}

      {showAll && (
        <AnimatedSection delay={0.4}>
          <div className="show-more-container">
            <motion.button
              className="btn-secondary show-more-btn"
              onClick={() => setShowAll(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show Less
            </motion.button>
          </div>
        </AnimatedSection>
      )}

      {/* CTA Section */}
      <AnimatedSection delay={0.5}>
        <div className="testimonials-cta">
          <h2>Ready to Work Together?</h2>
          <p>Let's discuss how I can help transform your marketing systems and drive results.</p>
          <motion.a
            href="/contact"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default Testimonials;