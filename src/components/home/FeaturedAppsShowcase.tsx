import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, TrendingUp, Palette, Mail, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { applications } from '../../data/applications';
import ScrollReveal from '../animations/ScrollReveal';
import GlassCard from '../components/ui/GlassCard';

/**
 * Featured Apps Showcase - Homepage Section
 * Displays top marketing apps with impressive 3D card effects,
 * live preview animations, and interactive features
 */
export const FeaturedAppsShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Select featured apps (top 5 most impressive)
  const featuredApps = [
    applications.find(app => app.id === 'marketing-simulator'),
    applications.find(app => app.id === 'brand-builder'),
    applications.find(app => app.id === 'email-marketing-simulator'),
    applications.find(app => app.id === 'social-media-simulator'),
    applications.find(app => app.id === 'graston-growth-engine'),
  ].filter(Boolean);

  // Auto-rotate carousel (pause on hover)
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % featuredApps.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, featuredApps.length]);

  const currentApp = featuredApps[activeIndex];
  if (!currentApp) return null;

  const iconMap: Record<string, React.ReactNode> = {
    '🎯': <TrendingUp className="w-8 h-8" />,
    '🎨': <Palette className="w-8 h-8" />,
    '📧': <Mail className="w-8 h-8" />,
    '📱': <Share2 className="w-8 h-8" />,
    '🚀': <Zap className="w-8 h-8" />,
  };

  const getIcon = (emoji: string) => iconMap[emoji] || <Sparkles className="w-8 h-8" />;

  const nextApp = () => setActiveIndex((prev) => (prev + 1) % featuredApps.length);
  const prevApp = () => setActiveIndex((prev) => (prev - 1 + featuredApps.length) % featuredApps.length);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-ocean/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brand-teal" />
              <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">
                Interactive Showcases
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text mb-4">
              Featured Marketing Apps
            </h2>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              Explore interactive tools that demonstrate marketing mastery through real-world simulations
            </p>
          </div>
        </ScrollReveal>

        {/* Main Carousel */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {/* Left: Featured App Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentApp.id}
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 50, rotateY: 15 }}
              transition={{ duration: 0.5, type: 'spring' }}
              style={{ perspective: '1000px' }}
            >
              <GlassCard
                className="p-8 hover:shadow-[0_0_50px_rgba(64,224,208,0.3)] transition-shadow duration-300"
                gradient={currentApp.accentGradient?.replace('linear-gradient(135deg, ', 'from-').replace(' 0%, ', '/20 via-').replace(' 100%)', '/10') || 'from-brand-teal/20 via-brand-ocean/10'}
              >
                {/* App Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ background: currentApp.accentGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  >
                    {getIcon(currentApp.icon)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-text">{currentApp.title}</h3>
                    <p className="text-brand-muted text-sm">{currentApp.category.join(' • ')}</p>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-lg text-brand-text/90 mb-6 leading-relaxed">
                  {currentApp.tagline}
                </p>

                {/* Key Features */}
                <div className="space-y-3 mb-8">
                  {currentApp.features.slice(0, 3).map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal/30 transition-colors">
                        <span className="text-brand-teal text-sm">{feature.icon || '✓'}</span>
                      </div>
                      <div>
                        <h4 className="text-brand-text font-semibold text-sm">{feature.title}</h4>
                        <p className="text-brand-muted text-xs">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {currentApp.technicalDetails.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-slate-800/50 border border-brand-teal/20 text-brand-teal font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {currentApp.technicalDetails.techStack.length > 4 && (
                    <span className="px-3 py-1 text-xs rounded-full bg-slate-800/50 border border-brand-muted/20 text-brand-muted">
                      +{currentApp.technicalDetails.techStack.length - 4} more
                    </span>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={currentApp.demoUrl.startsWith('http') ? currentApp.demoUrl : `/apps/${currentApp.id}`}
                    className="flex-1 min-w-[140px] px-6 py-3 bg-brand-teal text-brand-dark rounded-lg font-semibold hover:shadow-[0_10px_30px_rgba(64,224,208,0.4)] transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Launch App
                    <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to={`/applications/${currentApp.id}`}
                    className="flex-1 min-w-[140px] px-6 py-3 bg-slate-800/50 border border-brand-teal/30 text-brand-text rounded-lg font-semibold hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Right: Metrics & Info */}
          <div className="space-y-6">
            {/* Metrics Grid */}
            {currentApp.metrics && currentApp.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {currentApp.metrics.slice(0, 4).map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <GlassCard className="p-6 text-center" hover={false}>
                      <div className="text-3xl font-bold text-brand-teal mb-2">{metric.value}</div>
                      <div className="text-sm text-brand-muted">{metric.label}</div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Value Proposition */}
            <GlassCard className="p-6">
              <h4 className="text-sm font-mono uppercase tracking-wide text-brand-teal mb-3">
                Why It Matters
              </h4>
              <p className="text-brand-muted text-sm leading-relaxed mb-4">
                {currentApp.valueProposition.solution}
              </p>
              {currentApp.valueProposition.impact && (
                <div className="space-y-2">
                  {currentApp.valueProposition.impact.slice(0, 2).map((impact, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-brand-muted">
                      <TrendingUp className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                      <span>{impact}</span>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prevApp}
            className="p-3 rounded-full bg-slate-800/50 border border-brand-teal/30 text-brand-teal hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(64,224,208,0.3)] transition-all"
            aria-label="Previous app"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicator Dots */}
          <div className="flex gap-2">
            {featuredApps.map((app, idx) => (
              <button
                key={app?.id || idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all ${
                  idx === activeIndex
                    ? 'w-8 h-2 bg-brand-teal rounded-full'
                    : 'w-2 h-2 bg-slate-700 rounded-full hover:bg-brand-teal/50'
                }`}
                aria-label={`Go to ${app?.title}`}
              />
            ))}
          </div>

          <button
            onClick={nextApp}
            className="p-3 rounded-full bg-slate-800/50 border border-brand-teal/30 text-brand-teal hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(64,224,208,0.3)] transition-all"
            aria-label="Next app"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View All Apps CTA */}
        <div className="text-center mt-12">
          <Link
            to="/applications"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-teal to-brand-ocean text-brand-dark rounded-xl font-bold text-lg hover:shadow-[0_20px_60px_rgba(64,224,208,0.4)] transition-all duration-300 group"
          >
            Explore All Apps
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
