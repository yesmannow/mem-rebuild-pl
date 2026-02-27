import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Rocket } from 'lucide-react';
import { getApplicationById } from '../data/applications';
import AnimatedSection from '../components/animations/AnimatedSection';
import AppDemoModal from '../components/modals/AppDemoModal';
import { AppTechStackVisualization } from '../components/apps/AppTechStackVisualization';
import { CodeVault } from '../components/apps/CodeVault';
import { SimpleSection } from '../components/ui/SimpleSection';
import TechBackdrop from '../components/hero/TechBackdrop';
import { AppButton } from '../components/ui/AppButton';
import ScrollReveal from '../components/animations/ScrollReveal';
import './ApplicationDetail.css';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data retrieval with 404 handling
  const app = id ? getApplicationById(id) : undefined;

  if (!app) {
    return <Navigate to="/applications" replace />;
  }

  return (
    <main className="application-detail">
      {/* Hero Section with TechBackdrop */}
      <SimpleSection variant="default" padding="none" container={false} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <TechBackdrop className="absolute inset-0" backgroundImage={app.thumbnail} />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900 z-[1]" />
        <div className="relative z-10 w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Back Link - Magnetic */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                to="/applications"
                className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-turquoise transition-colors text-sm cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Developer Tools & Projects
              </Link>
            </motion.div>

            {/* Hero Content */}
            <div className="max-w-4xl mx-auto text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-6"
              >
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shadow-lg mx-auto"
                  style={{
                    background: app.accentGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  {app.icon}
                </div>
              </motion.div>

              {/* Title and Tagline */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-5xl md:text-6xl font-bold text-brand-text mb-4">
                  {app.title}
                </h1>
                <p className="text-xl md:text-2xl text-brand-muted">
                  {app.tagline}
                </p>
              </motion.div>

              {/* Live Demo Button - Magnetic with Creamsicle Gradient */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <AppButton
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #FFA500 0%, #FFB380 100%)',
                    color: '#0f172a',
                    border: 'none',
                  }}
                >
                  <Rocket className="w-5 h-5" />
                  Launch Live Demo
                </AppButton>
              </motion.div>
            </div>
          </div>
        </div>
      </SimpleSection>

      {/* Value Proposition & Features Section */}
      <SimpleSection variant="default" padding="xl" animated>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.2}>
            {/* Problem & Solution - 2 Column Grid */}
            <ScrollReveal direction="up" stagger={false} speed="fast">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Problem */}
                <ScrollReveal direction="right" speed="fast">
                  <motion.div
                    className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 hover:border-brand-turquoise/50 transition-all duration-300"
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <h2 className="text-2xl font-bold text-brand-text mb-4 flex items-center gap-3">
                      <motion.span
                        className="text-3xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        ⚠️
                      </motion.span>
                      The Problem
                    </h2>
                    <p className="text-lg text-brand-text leading-relaxed">{app.valueProposition.problem}</p>
                  </motion.div>
                </ScrollReveal>

                {/* Solution */}
                <ScrollReveal direction="left" speed="fast" delay={0.1}>
                  <motion.div
                    className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 hover:border-brand-turquoise/50 transition-all duration-300"
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <h2 className="text-2xl font-bold text-brand-text mb-4 flex items-center gap-3">
                      <motion.span
                        className="text-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        🎯
                      </motion.span>
                      The Solution
                    </h2>
                    <p className="text-lg text-brand-text leading-relaxed">{app.valueProposition.solution}</p>
                  </motion.div>
                </ScrollReveal>
              </div>
            </ScrollReveal>

            {/* Features Grid */}
            <ScrollReveal direction="up" speed="fast" delay={0.2}>
              <section>
                <h2 className="text-3xl font-bold text-brand-text mb-6">Key Features</h2>
                <ScrollReveal direction="up" stagger={true} speed="fast">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {app.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="glass-panel p-6 hover:border-brand-turquoise/50 transition-all cursor-pointer"
                        whileHover={{ y: -8, scale: 1.03, boxShadow: '0 20px 40px rgba(64, 224, 208, 0.2)' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {feature.icon && (
                          <motion.div
                            className="text-3xl mb-3"
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                          >
                            {feature.icon}
                          </motion.div>
                        )}
                        <h3 className="text-xl font-semibold text-brand-text mb-2">{feature.title}</h3>
                        <p className="text-brand-muted">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </section>
            </ScrollReveal>
          </AnimatedSection>
        </div>
      </SimpleSection>

      {/* Tech Stack Section */}
      <ScrollReveal direction="up" delay={0.2}>
        <SimpleSection variant="elevated" padding="xl" animated>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection delay={0.3}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <AppTechStackVisualization
                  techStack={app.technicalDetails.techStack}
                  architecture={app.technicalDetails.architecture}
                />
              </motion.div>
            </AnimatedSection>
          </div>
        </SimpleSection>
      </ScrollReveal>

      {/* Code Vault Section */}
      {app.technicalDetails.codeHighlights && app.technicalDetails.codeHighlights.length > 0 && (
        <ScrollReveal direction="up" delay={0.3}>
          <SimpleSection variant="inset" padding="xl" animated>
            <div className="max-w-6xl mx-auto">
              <AnimatedSection delay={0.4}>
                <CodeVault codeHighlights={app.technicalDetails.codeHighlights} />
              </AnimatedSection>
            </div>
          </SimpleSection>
        </ScrollReveal>
      )}

      {/* Key Components Section */}
      {app.technicalDetails.keyComponents && app.technicalDetails.keyComponents.length > 0 && (
        <ScrollReveal direction="up" delay={0.4}>
          <SimpleSection variant="elevated" padding="xl" animated>
            <div className="max-w-6xl mx-auto">
              <AnimatedSection delay={0.5}>
                <section>
                  <h2 className="text-3xl font-bold text-brand-text mb-6">Key Components & Complexity Analysis</h2>
                  <div className="space-y-4">
                    {app.technicalDetails.keyComponents.map((component, idx) => (
                      <ScrollReveal
                        key={idx}
                        direction="right"
                        delay={0.1 * idx}
                      >
                        <motion.div
                          className="glass-panel p-6 border border-slate-700/50 hover:border-brand-turquoise/50 transition-all cursor-pointer"
                          whileHover={{ x: 8, scale: 1.02, boxShadow: '0 10px 30px rgba(64, 224, 208, 0.15)' }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-semibold text-brand-text">{component.name}</h3>
                            <motion.span
                              className="px-3 py-1 rounded-full text-xs font-medium bg-brand-turquoise/20 text-brand-turquoise border border-brand-turquoise/30"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                              {component.complexity} Complexity
                            </motion.span>
                          </div>
                          <p className="text-brand-muted">{component.purpose}</p>
                        </motion.div>
                      </ScrollReveal>
                    ))}
                  </div>
                </section>
              </AnimatedSection>
            </div>
          </SimpleSection>
        </ScrollReveal>
      )}

      {/* Demo Section */}
      <ScrollReveal direction="up" delay={0.5}>
        <SimpleSection variant="accent-teal" padding="xl" animated>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection delay={0.6}>
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-brand-text mb-4">Interactive Demo</h2>
                <p className="text-lg text-brand-muted">
                  Experience the application in action. This is a fully functional demo running the production code.
                </p>
              </motion.div>
              <motion.div
                className="glass-panel p-4 border border-slate-700/50 rounded-xl overflow-hidden mb-6"
                whileHover={{ scale: 1.01, boxShadow: '0 20px 60px rgba(64, 224, 208, 0.2)' }}
                transition={{ duration: 0.3 }}
              >
                <iframe
                  src={app.demoUrl}
                  title={`${app.title} Demo`}
                  className="w-full h-[600px] rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                />
              </motion.div>
            <div className="flex flex-wrap gap-4 justify-center">
              <AppButton
                onClick={() => setIsModalOpen(true)}
                variant="primary"
                className="shadow-lg hover:shadow-xl"
              >
                Launch Interactive Demo
              </AppButton>
              <a
                href={app.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-turquoise text-brand-turquoise hover:bg-brand-turquoise hover:text-white transition-all duration-200"
              >
                <ExternalLink className="w-5 h-5" />
                Open in New Tab
              </a>
            </div>
          </AnimatedSection>
        </div>
      </SimpleSection>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal direction="up" delay={0.6}>
        <SimpleSection variant="accent-orange" padding="xl" animated>
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection delay={0.6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-brand-text mb-4">
                  Interested in similar solutions?
                </h3>
                <p className="text-lg text-brand-muted mb-8">
                  Let's discuss how I can build custom tools and applications for your business needs.
                </p>
              </motion.div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center font-semibold transition-all duration-200 px-6 py-3 text-base rounded-xl bg-brand-turquoise text-white hover:bg-brand-turquoise-dark shadow-brand-shadow-accent hover:shadow-xl"
              >
                Start a Conversation
              </Link>
              <Link
                to="/applications"
                className="inline-flex items-center justify-center font-semibold transition-all duration-200 px-6 py-3 text-base rounded-xl border-2 border-brand-turquoise text-brand-turquoise hover:bg-brand-turquoise hover:text-white"
              >
                View More Tools
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </SimpleSection>
      </ScrollReveal>

      {/* App Demo Modal */}
      <AppDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appTitle={app.title}
        appUrl={app.demoUrl}
        embeddable={app.embeddable}
        thumbnail={app.thumbnail}
      />
    </main>
  );
};

export default ApplicationDetail;
