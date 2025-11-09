import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/animations/PageTransition";
import SEOHead from "../components/seo/SEOHead";
import "./AppRouter.css";

// Lazy load pages for code splitting with better chunking
const Home = React.lazy(() => import("../pages/index")); // Cinematic homepage
const About = React.lazy(() => import("../pages/About"));
const CaseStudies = React.lazy(() => import("../pages/CaseStudies"));
const CaseStudyDetail = React.lazy(() => import("../pages/CaseStudyDetail"));
const Toolbox = React.lazy(() => import("../pages/Toolbox"));
const Projects = React.lazy(() => import("../pages/Projects"));
const ProjectDetail = React.lazy(() => import("../pages/ProjectDetail"));
const Applications = React.lazy(() => import("../pages/Applications"));
const ApplicationDetail = React.lazy(() => import("../pages/ApplicationDetail"));
const Photography = React.lazy(() => import("../pages/Photography"));
const Design = React.lazy(() => import("../pages/Design"));
const SideProjects = React.lazy(() => import("../pages/SideProjects"));
const SideProjectDetail = React.lazy(() => import("../pages/side-projects/SideProjectDetail"));
const Testimonials = React.lazy(() => import("../pages/Testimonials"));
const Resume = React.lazy(() => import("../pages/Resume"));
const Contact = React.lazy(() => import("../pages/Contact"));
const Inspiration = React.lazy(() => import("../pages/Inspiration"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

// Loading component - use unique class to avoid GSAP selector conflicts
const PageLoader = () => (
  <div className="route-loader-fallback initial-loader">
    <div className="loading-spinner"></div>
  </div>
);

const AppRouter: React.FC = () => {
  const location = useLocation();

  // Dynamic SEO based on route
  const getSEOData = () => {
    const path = location.pathname;

    if (path === '/') {
      return {
        title: "BearCave Marketing — Jacob Darling",
        description: "I build marketing systems that turn brands into revenue engines.",
        keywords: "marketing strategist, marketing technologist, marketing automation, CRM campaigns"
      };
    } else if (path === '/resume') {
      return {
        title: "Resume | BearCave Marketing",
        description: "Professional resume and experience of Jacob Darling - Marketing Strategist & Systems Architect with 16+ years experience",
        keywords: "resume, CV, marketing director, systems architect, marketing automation"
      };
    } else if (path === '/case-studies') {
      return {
        title: "Case Studies | BearCave Marketing",
        description: "Detailed case studies showing problem-solving approach and measurable results in marketing automation and systems architecture",
        keywords: "marketing case studies, project portfolio, marketing automation examples"
      };
    } else if (path.startsWith('/case-studies/')) {
      return {
        title: "Case Study | BearCave Marketing",
        description: "Detailed case study showing problem-solving approach and measurable results"
      };
    } else if (path === '/contact') {
      return {
        title: "Contact | BearCave Marketing",
        description: "Get in touch with Jacob Darling for job opportunities, collaborations, or consulting inquiries",
        keywords: "contact, hire, job opportunity, marketing consultant"
      };
    }

    return {};
  };

  const seoData = getSEOData();

  return (
    <>
      <SEOHead {...seoData} />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
            <Route path="/case-studies/:slug" element={<PageTransition><CaseStudyDetail /></PageTransition>} />
            <Route path="/toolbox" element={<PageTransition><Toolbox /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
            <Route path="/applications" element={<PageTransition><Applications /></PageTransition>} />
            <Route path="/applications/:id" element={<PageTransition><ApplicationDetail /></PageTransition>} />
            <Route path="/photography" element={<PageTransition><Photography /></PageTransition>} />
            <Route path="/design" element={<PageTransition><Design /></PageTransition>} />
            <Route path="/inspiration" element={<PageTransition><Inspiration /></PageTransition>} />
            <Route path="/side-projects" element={<PageTransition><SideProjects /></PageTransition>} />
            <Route path="/side-projects/:slug" element={<PageTransition><SideProjectDetail /></PageTransition>} />
            <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
            <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
};

export default AppRouter;
