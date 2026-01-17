import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCaseStudyBySlug } from '../data/caseStudies';
import AnimatedSection from '../components/animations/AnimatedSection';
import { getCaseStudyDiagrams } from '../components/diagrams/caseStudyDiagrams';
import { trackPortfolioEngagement, createTimeTracker } from '../utils/analytics';
import { CaseStudyExplainer } from '../components/case-study/CaseStudyExplainer';
import { CaseStudyArchitectureTimeline, CaseStudyTechStack } from '../components/case-study';
import { MetricVisualizer } from '../components/visuals/MetricVisualizer';
import { RichContentRenderer } from '../components/case-study/RichContentRenderer';
import { SimpleSection } from '../components/ui/SimpleSection';
import TechBackdrop from '../components/hero/TechBackdrop';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import caseStudyInspirationMap from '../data/caseStudyInspirationMap.json';
import inspirationsData from '../data/inspirations.json';
import DataStream from '../components/case-studies/DataStream';
import ThreatMap from '../components/case-studies/ThreatMap';
import WorkflowVisualizer from '../components/case-studies/WorkflowVisualizer';
import SystemSchematic from '../components/case-studies/SystemSchematic';
import { useDynamicImage } from '../hooks/useDynamicImage';
import './CaseStudyDetail.css';


const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;
  const diagrams = slug ? getCaseStudyDiagrams(slug) : [];

  // Fetch dynamic background image based on first tag
  const imageQuery = caseStudy?.tags?.[0] || 'technology';
  const { imageUrl: backgroundImage } = useDynamicImage(imageQuery);

  // Track case study view
  useEffect(() => {
    if (caseStudy && slug) {
      trackPortfolioEngagement.caseStudyView(slug, caseStudy.title);
      const timeTracker = createTimeTracker(`/case-studies/${slug}`);

      return () => {
        timeTracker.stop();
      };
    }
  }, [caseStudy, slug]);

  if (!caseStudy) {
    return <Navigate to="/case-studies" replace />;
  }

  // Get related inspirations
  const inspirationMapping = caseStudyInspirationMap.find(m => m.caseStudyId === caseStudy.slug);
  const relatedInspirations = inspirationMapping
    ? inspirationsData.filter(i => inspirationMapping.inspirations.includes(i.id))
    : [];

  // Render Wow component based on case study ID
  const renderWowComponent = (id: string) => {
    switch (id) {
      case 'the-compass':
        return <DataStream />;
      case 'the-fortress':
        return <ThreatMap />;
      case 'the-launchpad':
        return <WorkflowVisualizer />;
      case 'the-conductor':
        return <SystemSchematic />;
      default:
        return null;
    }
  };

  return (
    <main className="case-study-detail-modern">
      {/* Hero Section with TechBackdrop */}
      <SimpleSection variant="default" padding="none" container={false} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <TechBackdrop className="absolute inset-0" backgroundImage={backgroundImage} />
        <div className="relative z-10 w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Content Container - Centered */}
            <div className="text-center mx-auto max-w-4xl">
              {/* Back Link */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex justify-center"
              >
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-turquoise transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Case Studies
                </Link>
              </motion.div>

              {/* Icon */}
              {caseStudy.icon && (
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shadow-lg"
                    style={{
                      backgroundColor: `${caseStudy.color || '#40E0D0'}20`,
                      border: `2px solid ${caseStudy.color || '#40E0D0'}40`,
                    }}
                  >
                    {caseStudy.icon}
                  </div>
                </motion.div>
              )}

              {/* Title and Tagline */}
              <motion.div
                className="text-center mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold text-brand-text mb-4">
                  {caseStudy.title}
                </h1>
                <p className="text-xl md:text-2xl text-brand-muted max-w-3xl mx-auto">
                  {caseStudy.tagline}
                </p>
              </motion.div>

              {/* Categories and Tags */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {caseStudy.category.map(cat => (
                  <span
                    key={cat}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${caseStudy.color || '#40E0D0'}20`,
                      color: caseStudy.color || '#40E0D0',
                      border: `1px solid ${caseStudy.color || '#40E0D0'}40`,
                    }}
                  >
                    {cat}
                  </span>
                ))}
                {caseStudy.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs text-brand-muted bg-slate-800/50 border border-slate-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </SimpleSection>

      {/* Breadcrumbs */}
      <SimpleSection variant="bordered" padding="sm" animated>
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
        </div>
      </SimpleSection>

      {/* Impact Metrics */}
      <SimpleSection variant="elevated" padding="lg" animated>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection delay={0.2}>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-2">
                Impact Metrics
              </h2>
              <p className="text-brand-muted">
                Measurable results and outcomes from this project
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudy.metrics.map((metric, index) => (
                <MetricVisualizer
                  key={index}
                  label={metric.label}
                  value={metric.value}
                  accentColor={caseStudy.color || '#40E0D0'}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </SimpleSection>

      {/* Challenge Section - Gray Background */}
      <SimpleSection variant="default" padding="xl" animated>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.3}>
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4 flex items-center gap-3">
                <span className="text-4xl">⚠️</span>
                The Challenge
              </h2>
            </div>
            <RichContentRenderer
              content={caseStudy.fullContent?.challenge ?? caseStudy.challenge}
            />
          </AnimatedSection>
        </div>
      </SimpleSection>

      {/* Strategy Section - Dark Background */}
      <SimpleSection variant="inset" padding="xl" animated>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.4}>
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4 flex items-center gap-3">
                <span className="text-4xl">🎯</span>
                The Strategy & Solution
              </h2>
            </div>
            <RichContentRenderer
              content={caseStudy.fullContent?.strategy ?? caseStudy.strategy}
            />

            {/* Visual Architecture Diagrams */}
            {diagrams.length > 0 && (
              <div className="mt-12 space-y-8">
                {diagrams.map((DiagramComponent, index) => (
                  <DiagramComponent key={index} />
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>
      </SimpleSection>

        {/* Architecture Section */}
        {caseStudy.architecture && caseStudy.architecture.length > 0 && (
          <AnimatedSection delay={0.45}>
            <section className="content-section architecture">
              <div className="max-w-6xl mx-auto">
                <CaseStudyArchitectureTimeline
                  architecture={caseStudy.architecture}
                  accentColor={caseStudy.color || '#40E0D0'}
                />
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* Tech Stack Section */}
        {caseStudy.technologies && caseStudy.technologies.length > 0 && (
          <AnimatedSection delay={0.47}>
            <section className="content-section">
              <div className="max-w-6xl mx-auto">
                <CaseStudyTechStack
                  technologies={caseStudy.technologies}
                  accentColor={caseStudy.color || '#40E0D0'}
                />
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* Wow Component Section */}
        {renderWowComponent(caseStudy.slug) && (
          <AnimatedSection delay={0.5}>
            <div className="wow-component-wrapper">
              {renderWowComponent(caseStudy.slug)}
            </div>
          </AnimatedSection>
        )}

      {/* Impact Section - Brand Gradient Highlight */}
      <SimpleSection variant="accent-teal" padding="xl" animated>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.5}>
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4 flex items-center gap-3">
                <span className="text-4xl">🚀</span>
                The Value & Impact
              </h2>
            </div>
            <RichContentRenderer
              content={caseStudy.fullContent?.impact ?? caseStudy.impact}
            />
          </AnimatedSection>
        </div>
      </SimpleSection>

      {/* Live Site Preview - if siteUrl exists */}
      {caseStudy.siteUrl && (
        <SimpleSection variant="elevated" padding="lg" animated>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={0.52}>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-text mb-2 flex items-center justify-center gap-3">
                  <span className="text-3xl">🌐</span>
                  Live Site
                </h2>
                <p className="text-brand-muted">
                  Visit the live implementation to see the results in action
                </p>
              </div>
              <motion.div
                className="relative rounded-2xl overflow-hidden border border-brand-turquoise/20 bg-slate-950/40 backdrop-blur-sm p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="text-center">
                    <p className="text-brand-text font-semibold mb-2">
                      {caseStudy.title}
                    </p>
                    <a
                      href={caseStudy.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-turquoise hover:text-brand-turquoise-dark transition-colors inline-flex items-center gap-2"
                    >
                      <span className="text-sm break-all">{caseStudy.siteUrl}</span>
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  <motion.a
                    href={caseStudy.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-turquoise text-white font-semibold hover:bg-brand-turquoise-dark transition-all duration-200 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Visit Live Site</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </SimpleSection>
      )}

      {/* AI Explainer Section */}
      <SimpleSection variant="elevated" padding="lg" animated>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.5}>
            <CaseStudyExplainer
              title={caseStudy.title}
              problem={caseStudy.challenge}
              solution={caseStudy.strategy}
              results={caseStudy.impact}
            />
          </AnimatedSection>
        </div>
      </SimpleSection>

      {/* Inspirations Section */}
      {relatedInspirations.length > 0 && (
        <SimpleSection variant="bordered" padding="lg" animated>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection delay={0.55}>
              <h3 className="text-2xl font-bold text-brand-text mb-4">Inspired by</h3>
              <div className="flex flex-wrap gap-3">
                {relatedInspirations.map(inspiration => (
                  <Link
                    key={inspiration.id}
                    to={`/inspiration#${inspiration.id}`}
                    className="px-4 py-2 rounded-lg bg-slate-800/50 text-brand-text hover:bg-brand-turquoise/20 hover:text-brand-turquoise transition-colors border border-slate-700/50"
                  >
                    {inspiration.title}
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </SimpleSection>
      )}

      {/* CTA Section */}
      <SimpleSection variant="accent-orange" padding="xl" animated>
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection delay={0.6}>
            <h3 className="text-3xl font-bold text-brand-text mb-4">
              Interested in similar results?
            </h3>
            <p className="text-lg text-brand-muted mb-8">
              Let's discuss how I can help transform your marketing systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-brand-turquoise text-white font-semibold hover:bg-brand-turquoise-dark transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start a Conversation
              </Link>
              <Link
                to="/case-studies"
                className="px-6 py-3 rounded-xl bg-slate-800/50 text-brand-text font-semibold hover:bg-slate-700/50 transition-all duration-200 border border-slate-700/50"
              >
                View More Case Studies
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </SimpleSection>
    </main>
  );
};

export default CaseStudyDetail;
