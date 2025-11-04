import React, { Suspense, useEffect, lazy } from "react";
import { motion } from "framer-motion";
import Hero from "../components/home/Hero";
import ScrollProgress from "../components/ui/ScrollProgress";
import { refreshLenis } from "../utils/motion-sync";

// Lazy load heavy components for better performance
const IntroStatement = lazy(() => import("../components/home/IntroStatement"));
const GlanceMetrics = lazy(() => import("../components/home/GlanceMetrics"));
const SkillsShowcase = lazy(() => import("../components/home/SkillsShowcase"));
const ResumeDownload = lazy(() => import("../components/home/ResumeDownload"));
const RedesignedFeaturedWork = lazy(() => import("../components/home/RedesignedFeaturedWork"));
const AboutSnapshot = lazy(() => import("../components/home/AboutSnapshot"));
const InteractiveTimeline = lazy(() => import("../components/timeline/InteractiveTimeline"));
const Testimonials = lazy(() => import("../components/home/Testimonials"));
const Awards = lazy(() => import("../components/home/Awards"));
const CTA = lazy(() => import("../components/home/CTA"));

const HomePage: React.FC = () => {
  useEffect(() => {
    // Refresh Lenis for this page
    refreshLenis();
  }, []);

  return (
    <>
      {/* UX Enhancement Components */}
      <ScrollProgress />

      {/* Cinematic Hero Section */}
      <Hero />

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        {/* About Snapshot - Personal Introduction - MOVED TO FIRST */}
        <AboutSnapshot />

        {/* Career Journey - Experience Timeline - MOVED TO SECOND */}
        <InteractiveTimeline />

        {/* Where Strategy Meets Technical Execution - MOVED TO THIRD */}
        <RedesignedFeaturedWork />

        {/* Value Proposition Statement */}
        <IntroStatement />

        {/* Impact Metrics Dashboard - Quantifiable Results */}
        <GlanceMetrics />

        {/* Resume Download - Prominent CTA for Hiring Managers */}
        <ResumeDownload />

        {/* Core Competencies - Skills Overview */}
        <SkillsShowcase />

        {/* Awards & Recognition - Credibility */}
        <Awards />

        {/* Testimonials - Social Proof */}
        <Testimonials />

        {/* Final CTA - Contact Opportunity */}
        <CTA />
      </Suspense>
    </>
  );
};

export default HomePage;
