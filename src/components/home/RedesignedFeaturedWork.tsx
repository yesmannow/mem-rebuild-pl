import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, TrendingUp, Clock, Users } from "lucide-react";
import { getFeaturedCaseStudies } from "../../data/caseStudies";

gsap.registerPlugin(ScrollTrigger);

const RedesignedFeaturedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredCaseStudies = getFeaturedCaseStudies().slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced stagger animation for cards
      gsap.fromTo(".case-study-card",
        { opacity: 0, y: 120, scale: 0.8, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Metrics counter animation
      gsap.fromTo(".metric-counter",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".metrics-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating elements animation
      gsap.to(".floating-element", {
        y: -20,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  const getMetricIcon = (label: string) => {
    if (label.toLowerCase().includes('reduction') || label.toLowerCase().includes('increase')) {
      return <TrendingUp className="w-4 h-4" />;
    }
    if (label.toLowerCase().includes('time') || label.toLowerCase().includes('response')) {
      return <Clock className="w-4 h-4" />;
    }
    if (label.toLowerCase().includes('satisfaction') || label.toLowerCase().includes('engagement')) {
      return <Users className="w-4 h-4" />;
    }
    return <TrendingUp className="w-4 h-4" />;
  };

  return (
    <section
      id="featured-work"
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-slate-900 via-gray-900 to-black relative overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl floating-element" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl floating-element" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-2xl floating-element" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="text-blue-300 text-sm font-medium">Featured Case Studies</span>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Where Strategy Meets
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Execution
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Real projects with measurable impact. Each case study demonstrates the intersection of
            <span className="text-blue-300 font-semibold"> strategic thinking</span>,
            <span className="text-purple-300 font-semibold"> technical execution</span>, and
            <span className="text-pink-300 font-semibold"> business results</span>.
          </motion.p>
        </motion.div>

        {/* Redesigned Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {featuredCaseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.slug}
              className="case-study-card group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/10"
              whileHover={{
                y: -15,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)"
              }}
            >
              {/* Card Header with Gradient */}
              <div className="relative p-8 pb-6">
                {/* Category Tags with Enhanced Styling */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {caseStudy.category.map((cat, idx) => (
                    <motion.span
                      key={cat}
                      className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 rounded-full border border-blue-500/30 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {cat}
                    </motion.span>
                  ))}
                </div>

                {/* Enhanced Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-500 leading-tight">
                  {caseStudy.title}
                </h3>

                {/* Improved Tagline */}
                <p className="text-gray-300 mb-8 leading-relaxed text-base">
                  {caseStudy.tagline}
                </p>

                {/* Enhanced Metrics Grid */}
                <div className="metrics-grid grid grid-cols-1 gap-4 mb-8">
                  {caseStudy.metrics.map((metric, idx) => (
                    <motion.div
                      key={idx}
                      className="metric-counter flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                          {getMetricIcon(metric.label)}
                        </div>
                        <span className="text-sm text-gray-400 font-medium">{metric.label}</span>
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {metric.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced CTA */}
                <Link
                  to={`/case-studies/${caseStudy.slug}`}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl text-blue-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 font-semibold transition-all duration-300 group/link backdrop-blur-sm"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight
                    size={18}
                    className="group-hover/link:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              </div>

              {/* Enhanced Hover Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Enhanced View All CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 group text-lg"
          >
            <span>View All Case Studies</span>
            <ExternalLink
              size={22}
              className="group-hover:rotate-45 transition-transform duration-300"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RedesignedFeaturedWork;
