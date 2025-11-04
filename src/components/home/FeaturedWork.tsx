import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { getFeaturedCaseStudies } from "../../data/caseStudies";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredCaseStudies = getFeaturedCaseStudies().slice(0, 3); // Get top 3 featured

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for cards
      gsap.fromTo(".featured-card",
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for section
      gsap.to(sectionRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="featured-work"
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-black via-gray-900/30 to-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Featured Work
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Flagship projects that showcase the intersection of strategic thinking, 
            technical execution, and measurable business impact.
          </motion.p>
        </motion.div>

        {/* Featured Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCaseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.slug}
              className="featured-card group relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
            >
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseStudy.category.map((cat) => (
                    <span 
                      key={cat}
                      className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {caseStudy.title}
                </h3>

                {/* Tagline */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {caseStudy.tagline}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {caseStudy.metrics.slice(0, 2).map((metric, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{metric.label}</span>
                      <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link 
                  to={`/case-studies/${caseStudy.slug}`}
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium group/link transition-colors duration-300"
                >
                  <span>View Case Study</span>
                  <ArrowRight 
                    size={16} 
                    className="group-hover/link:translate-x-1 transition-transform duration-300" 
                  />
                </Link>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link 
            to="/case-studies"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
          >
            <span>View All Case Studies</span>
            <ExternalLink 
              size={20} 
              className="group-hover:rotate-45 transition-transform duration-300" 
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork;
