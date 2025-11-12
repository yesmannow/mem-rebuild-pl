import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../components/animations/PageTransition';
import SEOHead from '../components/seo/SEOHead';
import Loader from '../components/ui/Loader';
import './AppRouter.css';

// Lazy load pages for code splitting with better chunking
const Home = React.lazy(() => import('../pages/index')); // Cinematic homepage
const About = React.lazy(() => import('../pages/About'));
const CaseStudies = React.lazy(() => import('../pages/CaseStudies'));
const CaseStudyDetail = React.lazy(() => import('../pages/CaseStudyDetail'));
const Toolbox = React.lazy(() => import('../pages/Toolbox'));
const Projects = React.lazy(() => import('../pages/Projects'));
const ProjectDetail = React.lazy(() => import('../pages/ProjectDetail'));
const Applications = React.lazy(() => import('../pages/Applications'));
const ApplicationDetail = React.lazy(() => import('../pages/ApplicationDetail'));
const Photography = React.lazy(() => import('../pages/Photography'));
const Design = React.lazy(() => import('../pages/Design'));
const SideProjects = React.lazy(() => import('../pages/SideProjects'));
const SideProjectDetail = React.lazy(() => import('../pages/side-projects/SideProjectDetail'));
const Testimonials = React.lazy(() => import('../pages/Testimonials'));
const Resume = React.lazy(() => import('../pages/Resume'));
const Contact = React.lazy(() => import('../pages/Contact'));
const Inspiration = React.lazy(() => import('../pages/InspirationPage'));
const InspirationDetail = React.lazy(() => import('../pages/InspirationDetail'));
const Gallery = React.lazy(() => import('../pages/Gallery'));
const Demos = React.lazy(() => import('../pages/Demos'));
const BrandBuilder = React.lazy(() => import('../pages/BrandBuilder'));
const BrandDetail = React.lazy(() => import('../pages/brand/BrandDetail'));
const TheLaunchpad = React.lazy(() => import('../pages/case-studies/the-launchpad'));
const TheCompass = React.lazy(() => import('../pages/case-studies/the-compass'));
const TheEngineRoom = React.lazy(() => import('../pages/case-studies/the-engine-room'));
const TheGuardian = React.lazy(() => import('../pages/case-studies/the-guardian'));
const TheFortress = React.lazy(() => import('../pages/case-studies/the-fortress'));
const TheConductor = React.lazy(() => import('../pages/case-studies/the-conductor'));
const GrastonCEU = React.lazy(() => import('../pages/case-studies/graston-ceu-system'));
const RBELaw = React.lazy(() => import('../pages/case-studies/rbe-law'));
const UltimateTechROI = React.lazy(() => import('../pages/case-studies/ultimate-tech-roi'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Loading component with accessible Loader
const PageLoader = () => (
  <div className="route-loader-fallback flex items-center justify-center min-h-[50vh]">
    <Loader size="lg" message="Loading page..." />
  </div>
);

const AppRouter: React.FC = () => {
  const location = useLocation();

  // Dynamic SEO based on route
  const getSEOData = () => {
    const path = location.pathname;

    if (path === '/') {
      return {
        title: 'BearCave Marketing — Jacob Darling',
        description: 'I build marketing systems that turn brands into revenue engines.',
        keywords:
          'marketing strategist, marketing technologist, marketing automation, CRM campaigns',
      };
    } else if (path === '/about') {
      return {
        title: 'About | BearCave Marketing',
        description:
          'Meet Jacob Darling, the solo operator behind BearCave Marketing—marketing automation, analytics, and growth systems architect.',
        keywords: 'Jacob Darling, marketing strategist, marketing technologist, automation',
      };
    } else if (path === '/applications') {
      return {
        title: 'Developer Tools | BearCave Marketing',
        description:
          'Custom tools and applications engineered by Jacob Darling showcasing marketing automation, analytics, and product systems.',
        keywords:
          'developer tools, custom applications, interactive demos, marketing technology, web tools',
      };
    } else if (path.startsWith('/applications/')) {
      return {
        title: 'Developer Tool | BearCave Marketing',
        description:
          'Deep dive into a custom tool or application engineered by Jacob Darling to solve real marketing, sales, and operations challenges.',
      };
    } else if (path === '/projects') {
      return {
        title: 'Projects | BearCave Marketing',
        description:
          'Technical and value-driven projects delivered by Jacob Darling across automation, analytics, and growth operations.',
        keywords: 'marketing projects, technical portfolio, automation',
      };
    } else if (path === '/toolbox') {
      return {
        title: 'Toolbox | BearCave Marketing',
        description:
          'Marketing and product systems toolkit built by Jacob Darling—frameworks, automations, and go-to templates.',
        keywords: 'marketing toolbox, automation toolkit, systems architecture',
      };
    } else if (path === '/resume') {
      return {
        title: 'Resume | BearCave Marketing',
        description:
          'Professional resume and experience of Jacob Darling - Marketing Strategist & Systems Architect with 16+ years experience',
        keywords: 'resume, CV, marketing director, systems architect, marketing automation',
      };
    } else if (path === '/case-studies') {
      return {
        title: 'Case Studies | BearCave Marketing',
        description:
          'Detailed case studies showing problem-solving approach and measurable results in marketing automation and systems architecture',
        keywords: 'marketing case studies, project portfolio, marketing automation examples',
      };
    } else if (path.startsWith('/case-studies/')) {
      return {
        title: 'Case Study | BearCave Marketing',
        description: 'Detailed case study showing problem-solving approach and measurable results',
      };
    } else if (path === '/contact') {
      return {
        title: 'Contact | BearCave Marketing',
        description:
          'Get in touch with Jacob Darling for job opportunities, collaborations, or consulting inquiries',
        keywords: 'contact, hire, job opportunity, marketing consultant',
      };
    } else if (path === '/design') {
      return {
        title: 'Design Portfolio | BearCave Marketing',
        description:
          'Explore a curated collection of design work including branding, digital design, print campaigns, and creative concepts',
        keywords:
          'design portfolio, graphic design, branding, digital design, print design, creative design',
      };
    } else if (path === '/inspiration') {
      return {
        title: 'Inspiration | BearCave Marketing',
        description:
          'A curated journey through the systems, designs, and philosophies that shape creative work',
        keywords: 'design inspiration, creative influences, design systems, branding inspiration',
      };
    } else if (path.startsWith('/inspiration/')) {
      return {
        title: 'Brand Project | BearCave Marketing',
        description: 'Explore this exceptional branding and design project',
        keywords: 'branding project, design case study, brand identity',
      };
    } else if (path === '/gallery') {
      return {
        title: 'Brand Gallery | BearCave Marketing',
        description:
          'Explore curated brand identity systems and design systems created with the Brand Builder',
        keywords: 'brand gallery, brand boards, design systems, brand identity',
      };
    } else if (path === '/demos') {
      return {
        title: 'Interactive Demos | BearCave Marketing',
        description:
          'Explore interactive demos and tools built for marketing automation, lead generation, and growth systems',
        keywords: 'interactive demos, marketing tools, marketing automation demos, lead generation tools',
      };
    } else if (path === '/brand-builder') {
      return {
        title: 'Brand Builder | BearCave Marketing',
        description:
          'Create a complete brand identity system in minutes with our interactive brand builder',
        keywords: 'brand builder, brand identity, design system, brand creation',
      };
    } else if (path.startsWith('/brand/')) {
      return {
        title: 'Brand Board | BearCave Marketing',
        description: 'Explore this brand identity system and design tokens',
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
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies"
              element={
                <PageTransition>
                  <CaseStudies />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies/the-launchpad"
              element={
                <PageTransition>
                  <TheLaunchpad />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies/the-compass"
              element={
                <PageTransition>
                  <TheCompass />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies/the-engine-room"
              element={
                <PageTransition>
                  <TheEngineRoom />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies/the-guardian"
              element={
                <PageTransition>
                  <TheGuardian />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies/the-fortress"
              element={
                <PageTransition>
                  <TheFortress />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies/the-conductor"
              element={
                <PageTransition>
                  <TheConductor />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies/graston-ceu-system"
              element={
                <PageTransition>
                  <GrastonCEU />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies/rbe-law-brand-and-digital"
              element={
                <PageTransition>
                  <RBELaw />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies/ultimate-tech-roi-growth"
              element={
                <PageTransition>
                  <UltimateTechROI />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies/:slug"
              element={
                <PageTransition>
                  <CaseStudyDetail />
                </PageTransition>
              }
            />
            <Route
              path="/toolbox"
              element={
                <PageTransition>
                  <Toolbox />
                </PageTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              }
            />
            <Route
              path="/projects/:slug"
              element={
                <PageTransition>
                  <ProjectDetail />
                </PageTransition>
              }
            />
            <Route
              path="/applications"
              element={
                <PageTransition>
                  <Applications />
                </PageTransition>
              }
            />
            <Route
              path="/applications/:id"
              element={
                <PageTransition>
                  <ApplicationDetail />
                </PageTransition>
              }
            />
            <Route
              path="/photography"
              element={
                <PageTransition>
                  <Photography />
                </PageTransition>
              }
            />
            <Route
              path="/design"
              element={
                <PageTransition>
                  <Design />
                </PageTransition>
              }
            />
            <Route
              path="/inspiration"
              element={
                <PageTransition>
                  <Inspiration />
                </PageTransition>
              }
            />
            <Route
              path="/inspiration/:slug"
              element={
                <PageTransition>
                  <InspirationDetail />
                </PageTransition>
              }
            />
            <Route
              path="/side-projects"
              element={
                <PageTransition>
                  <SideProjects />
                </PageTransition>
              }
            />
            <Route
              path="/side-projects/:slug"
              element={
                <PageTransition>
                  <SideProjectDetail />
                </PageTransition>
              }
            />
            <Route
              path="/testimonials"
              element={
                <PageTransition>
                  <Testimonials />
                </PageTransition>
              }
            />
            <Route
              path="/resume"
              element={
                <PageTransition>
                  <Resume />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/gallery"
              element={
                <PageTransition>
                  <Gallery />
                </PageTransition>
              }
            />
            <Route
              path="/demos"
              element={
                <PageTransition>
                  <Demos />
                </PageTransition>
              }
            />
            <Route
              path="/brand-builder"
              element={
                <PageTransition>
                  <BrandBuilder />
                </PageTransition>
              }
            />
            <Route
              path="/brand/:slug"
              element={
                <PageTransition>
                  <BrandDetail />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
};

export default AppRouter;
