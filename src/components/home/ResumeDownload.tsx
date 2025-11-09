import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Download, FileText, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ResumeDownload: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="resume-download"
      className="py-32 bg-gradient-to-b from-black via-gray-900/30 to-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          ref={cardRef}
          className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />

          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm font-semibold text-blue-300 mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Hiring Manager Resource</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Download My Resume
                </span>
              </h2>

              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Get a complete overview of my experience, skills, and achievements in a single,
                ATS-friendly document.
              </p>
            </motion.div>

            {/* Resume Highlights */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">15+ Years</div>
                  <div className="text-gray-400 text-xs">Experience</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">ATS Optimized</div>
                  <div className="text-gray-400 text-xs">Format</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">PDF Format</div>
                  <div className="text-gray-400 text-xs">Ready to Print</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                to="/resume"
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Download className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">View & Download Resume</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <a
                href="/resume/Resume JD draft.pdf"
                download="Jacob-Darling-Resume.pdf"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gray-800/50 border border-white/10 text-white font-semibold rounded-xl hover:bg-gray-700/50 hover:border-white/20 transition-all duration-300 w-full sm:w-auto"
              >
                <FileText className="w-5 h-5" />
                <span>Direct PDF Download</span>
              </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="mt-8 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-center text-sm text-gray-500 mb-4">Resume includes:</p>
              <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400">
                <span>✓ Full Work History</span>
                <span>✓ Key Achievements</span>
                <span>✓ Technical Skills</span>
                <span>✓ Education & Certifications</span>
                <span>✓ Leadership Roles</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeDownload;
