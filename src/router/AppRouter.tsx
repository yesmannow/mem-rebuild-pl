import React, { Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../components/animations/PageTransition';
import SEOHead from '../components/seo/SEOHead';
import Loader from '../components/ui/Loader';
import './AppRouter.css';

// Lazy load pages for code splitting with better chunking
const Home = React.lazy(() => import('../pages/Home')); // Ocean Pearl Hero homepage
const About = React.lazy(() => import('../pages/About'));
const CaseStudies = React.lazy(() => import('../pages/CaseStudies'));
const CaseStudyDetail = React.lazy(() => import('../pages/CaseStudyDetail'));
const ComponentShowcase = React.lazy(() => import('../pages/ComponentShowcase'));
// Toolbox removed - content merged with Bio page
const ToolsShowcase = React.lazy(() => import('../pages/ToolsShowcase'));
const DevOpsPortfolio = React.lazy(() => import('../pages/DevOpsPortfolio'));
const Projects = React.lazy(() => import('../pages/Projects'));
const ProjectDetail = React.lazy(() => import('../pages/ProjectDetail'));
const Applications = React.lazy(() => import('../pages/Applications'));
const ApplicationDetail = React.lazy(() => import('../pages/ApplicationDetail'));
const Photography = React.lazy(() => import('../pages/Photography'));
const Design = React.lazy(() => import('../pages/Design'));
const GraphicDesign = React.lazy(() => import('../pages/GraphicDesign'));
const Studio = React.lazy(() => import('../pages/Studio'));
const Creative = React.lazy(() => import('../pages/Creative'));
const SideProjects = React.lazy(() => import('../pages/SideProjects'));
const SideProjectDetail = React.lazy(() => import('../pages/side-projects/SideProjectDetail'));
const PrivacyPolicy = React.lazy(() => import('../pages/legal/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('../pages/legal/TermsOfService'));
const Testimonials = React.lazy(() => import('../pages/Testimonials'));
const Contact = React.lazy(() => import('../pages/Contact'));
const Services = React.lazy(() => import('../pages/Services'));
// Legacy routes - commented out
// const Inspiration = React.lazy(() => import('../pages/InspirationPage'));
// const InspirationDetail = React.lazy(() => import('../pages/InspirationDetail'));
const Gallery = React.lazy(() => import('../pages/Gallery'));
// const BrandBuilder = React.lazy(() => import('../pages/BrandBuilder'));
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
const DesignSystemDemo = React.lazy(() => import('../pages/DesignSystemDemo'));
const DeploymentStatus = React.lazy(() => import('../pages/DeploymentStatus'));
const ResumePrint = React.lazy(() => import('../pages/ResumePrint'));
const AppsLibrary = React.lazy(() => import('../pages/AppsLibrary'));
const Lab = React.lazy(() => import('../pages/Lab'));
const GrowthEngine = React.lazy(() => import('../components/apps/GrowthEngine'));
const LicenseHub = React.lazy(() => import('../components/apps/LicenseHub'));
const ClinicalCompass = React.lazy(() => import('../components/apps/ClinicalCompass'));
const LeadScoreLab = React.lazy(() => import('../components/apps/LeadScoreLab'));
const LinkArchitect = React.lazy(() => import('../components/apps/LinkArchitect'));
const SEOScanner = React.lazy(() => import('../components/apps/SEOScanner'));
const CampaignPerformanceVisualizer = React.lazy(() => import('../components/apps/CampaignPerformanceVisualizer'));
const CompetitorIntelligenceHub = React.lazy(() => import('../components/apps/CompetitorIntelligenceHub'));
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
        title: 'Jacob Darling — Marketing Strategist & Systems Architect',
        description: 'I build marketing systems that turn brands into revenue engines. Portfolio showcasing 15+ years of experience in marketing strategy, automation, and full-stack implementation.',
        keywords:
          'marketing strategist, marketing technologist, marketing automation, CRM campaigns, systems architect, portfolio',
      };
    } else if (path === '/about') {
      return {
        title: 'About | Jacob Darling',
        description:
          'Meet Jacob Darling—marketing automation, analytics, and growth systems architect with 15+ years of experience building revenue engines for SaaS, healthcare, and e-commerce brands.',
        keywords: 'Jacob Darling, marketing strategist, marketing technologist, automation, systems architect',
      };
    } else if (path === '/applications') {
      return {
        title: 'Developer Tools | Jacob Darling Portfolio',
        description:
          'Custom tools and applications engineered by Jacob Darling showcasing marketing automation, analytics, and product systems.',
        keywords:
          'developer tools, custom applications, interactive demos, marketing technology, web tools',
      };
    } else if (path.startsWith('/applications/')) {
      return {
        title: 'Developer Tool | Jacob Darling Portfolio',
        description:
          'Deep dive into a custom tool or application engineered by Jacob Darling to solve real marketing, sales, and operations challenges.',
      };
    } else if (path === '/projects') {
      return {
        title: 'Projects | Jacob Darling Portfolio',
        description:
          'Technical and value-driven projects delivered by Jacob Darling across automation, analytics, and growth operations.',
        keywords: 'marketing projects, technical portfolio, automation',
      };
    } else if (path === '/services') {
      return {
        title: 'Services | Jacob Darling Portfolio',
        description:
          'Deployable marketing systems. Audit, architect, automate, and scale your marketing operations with proven frameworks and pre-built modules.',
        keywords: 'marketing automation, marketing systems, growth operations, marketing technology, CRM automation',
      };
    } else if (path === '/tools') {
      return {
        title: 'CLI Tools & MCP Servers | Jacob Darling Portfolio',
        description:
          'Command-line utilities, automation scripts, and MCP servers for portfolio development, content generation, and design system management.',
        keywords: 'CLI tools, MCP servers, automation, build tools, content generation, developer tools',
      };
    } else if (path === '/devops') {
      return {
        title: 'DevOps & Deployment | Jacob Darling Portfolio',
        description:
          'Deep dive into deployment architecture, dual base path configuration, custom element guards, and bundle optimization strategies.',
        keywords: 'devops, deployment, vite, github pages, cloudflare pages, build optimization, CI/CD',
      };
    } else if (path === '/war-room') {
      return {
        title: 'The War Room | Jacob Darling Portfolio',
        description:
          'A transparent, real-time look at how we executed a multi-week site optimization project, transforming performance, security, and reliability from the server to the browser.',
        keywords: 'devops, system optimization, performance tuning, server administration, cloudflare, litespeed, redis',
      };
    } else if (path === '/resume') {
      return {
        title: 'Resume | Jacob Darling Portfolio',
        description:
          'Professional resume and experience of Jacob Darling - Marketing Strategist & Systems Architect with 16+ years experience',
        keywords: 'resume, CV, marketing director, systems architect, marketing automation',
      };
    } else if (path === '/resume-print') {
      return {
        title: 'Resume - Jacob Darling | Marketing Director & Systems Architect',
        description:
          'ATS-optimized, printable resume for Jacob Darling - Marketing Director & Systems Architect with 15+ years experience building revenue-driving infrastructure.',
        keywords: 'resume, CV, marketing director, systems architect, ATS, printable resume',
      };
    } else if (path === '/case-studies') {
      return {
        title: 'Case Studies | Jacob Darling Portfolio',
        description:
          'Detailed case studies showing problem-solving approach and measurable results in marketing automation and systems architecture',
        keywords: 'marketing case studies, project portfolio, marketing automation examples',
      };
    } else if (path.startsWith('/case-studies/')) {
      return {
        title: 'Case Study | Jacob Darling Portfolio',
        description: 'Detailed case study showing problem-solving approach and measurable results',
      };
    } else if (path === '/contact') {
      return {
        title: 'Contact | Jacob Darling Portfolio',
        description:
          'Get in touch with Jacob Darling for job opportunities, collaborations, or consulting inquiries',
        keywords: 'contact, hire, job opportunity, marketing consultant',
      };
    } else if (path === '/design') {
      return {
        title: 'Design Portfolio | Jacob Darling Portfolio',
        description:
          'Explore a curated collection of design work including branding, digital design, print campaigns, and creative concepts',
        keywords:
          'design portfolio, graphic design, branding, digital design, print design, creative design',
      };
    } else if (path === '/graphic-design') {
      return {
        title: 'Graphic Design Portfolio | Jacob Darling Portfolio',
        description:
          'Explore a curated collection of graphic design work including branding, digital layouts, album artwork, and creative direction',
        keywords:
          'graphic design, branding, digital design, album artwork, creative direction, visual identity',
      };
    } else if (path === '/photography') {
      return {
        title: 'Photography Portfolio | Jacob Darling Portfolio',
        description:
          'Explore a curated collection of photography work capturing moments that inspire and connect',
        keywords:
          'photography, visual storytelling, photo gallery, Adobe Lightroom, photographic portfolio',
      };
    } else if (path === '/creative') {
      return {
        title: 'Creative Work | Jacob Darling Portfolio',
        description:
          'Explore creative work across photography, graphic design, branding systems, web builds, and motion design',
        keywords:
          'creative portfolio, photography, graphic design, branding, web design, motion design, visual design',
      };
    // Legacy inspiration routes - commented out
    // } else if (path === '/inspiration') {
    //   return {
    //     title: 'Inspiration | BearCave Marketing',
    //     description:
    //       'A curated journey through the systems, designs, and philosophies that shape creative work',
    //     keywords: 'design inspiration, creative influences, design systems, branding inspiration',
    //   };
    // } else if (path.startsWith('/inspiration/')) {
    //   return {
    //     title: 'Brand Project | BearCave Marketing',
    //     description: 'Explore this exceptional branding and design project',
    //     keywords: 'branding project, design case study, brand identity',
    //   };
    } else if (path === '/gallery') {
      return {
        title: 'Brand Gallery | Jacob Darling Portfolio',
        description:
          'Explore curated brand identity systems and design systems created with the Brand Builder',
        keywords: 'brand gallery, brand boards, design systems, brand identity',
      };
    // Legacy brand builder route - commented out
    // } else if (path === '/brand-builder') {
    //   return {
    //     title: 'Brand Builder | BearCave Marketing',
    //     description:
    //       'Create a complete brand identity system in minutes with our interactive brand builder',
    //     keywords: 'brand builder, brand identity, design system, brand creation',
    //   };
    } else if (path === '/showcase') {
      return {
        title: 'Component Showcase | Jacob Darling Portfolio',
        description:
          'Interactive showcase of modern UI components featuring particle effects, glassmorphism, and smooth animations',
        keywords: 'component showcase, UI components, interactive demos, particle effects, glassmorphism',
      };
    } else if (path === '/design-system') {
      return {
        title: 'Design System Demo | Jacob Darling Portfolio',
        description:
          'Interactive demo of the new design system featuring design tokens, typography, and accessible components',
        keywords: 'design system, design tokens, typography, accessibility, UI components',
      };
    } else if (path.startsWith('/brand/')) {
      return {
        title: 'Brand Board | Jacob Darling Portfolio',
        description: 'Explore this brand identity system and design tokens',
      };
    } else if (path === '/apps') {
      return {
        title: 'The Lab | Jacob Darling Portfolio',
        description:
          'Interactive tools, live system telemetry, and command center. Explore applications, engineering tools, and real-time infrastructure monitoring.',
        keywords: 'interactive tools, React applications, telemetry, command center, devops, portfolio showcase',
      };
    } else if (path === '/apps/growth-engine') {
      return {
        title: 'Growth Engine | Jacob Darling Portfolio',
        description: 'ROI modeling & quote generation tools for sales enablement',
      };
    } else if (path === '/apps/seo-scanner') {
      return {
        title: 'SEO Scanner | Jacob Darling Portfolio',
        description: 'Edge HTMLRewriter audit for titles, meta descriptions, H1, and og:image.',
      };
    } else if (path === '/apps/license-hub') {
      return {
        title: 'License Hub | Jacob Darling Portfolio',
        description: '50-state compliance database for continuing education requirements',
      };
    } else if (path === '/apps/clinical-compass') {
      return {
        title: 'Clinical Compass | Jacob Darling Portfolio',
        description: 'Logic-based treatment protocols and clinical reasoning tool',
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
            {/* Toolbox redirects to Bio page - content merged */}
            <Route path="/toolbox" element={<Navigate to="/about" replace />} />
            <Route
              path="/services"
              element={
                <PageTransition>
                  <Services />
                </PageTransition>
              }
            />
            <Route
              path="/tools"
              element={
                <PageTransition>
                  <ToolsShowcase />
                </PageTransition>
              }
            />
            <Route
              path="/devops"
              element={
                <PageTransition>
                  <DevOpsPortfolio />
                </PageTransition>
              }
            />
            <Route
              path="/war-room"
              element={<Navigate to="/apps" replace />}
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
              path="/studio"
              element={
                <PageTransition>
                  <Studio />
                </PageTransition>
              }
            />
            {/* Legacy routes - kept for backward compatibility */}
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
              path="/graphic-design"
              element={
                <PageTransition>
                  <GraphicDesign />
                </PageTransition>
              }
            />
            <Route
              path="/creative"
              element={
                <PageTransition>
                  <Creative />
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
              path="/side-projects/:id"
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
            <Route path="/resume" element={<Navigate to="/about" replace />} />
            <Route
              path="/resume-print"
              element={
                <PageTransition>
                  <ResumePrint />
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
              path="/privacy"
              element={
                <PageTransition>
                  <PrivacyPolicy />
                </PageTransition>
              }
            />
            <Route
              path="/terms"
              element={
                <PageTransition>
                  <TermsOfService />
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
              path="/showcase"
              element={
                <PageTransition>
                  <ComponentShowcase />
                </PageTransition>
              }
            />
            <Route
              path="/design-system"
              element={
                <PageTransition>
                  <DesignSystemDemo />
                </PageTransition>
              }
            />
            <Route
              path="/deployment-status"
              element={
                <PageTransition>
                  <DeploymentStatus />
                </PageTransition>
              }
            />
            <Route
              path="/apps"
              element={
                <PageTransition>
                  <Lab />
                </PageTransition>
              }
            />
            <Route
              path="/apps/campaign-performance"
              element={
                <PageTransition>
                  <CampaignPerformanceVisualizer />
                </PageTransition>
              }
            />
            <Route
              path="/apps/competitor-intelligence"
              element={
                <PageTransition>
                  <CompetitorIntelligenceHub />
                </PageTransition>
              }
            />
            <Route
              path="/apps/lead-lab"
              element={
                <PageTransition>
                  <LeadScoreLab />
                </PageTransition>
              }
            />
            <Route
              path="/apps/link-architect"
              element={
                <PageTransition>
                  <LinkArchitect />
                </PageTransition>
              }
            />
            <Route
              path="/apps/seo-scanner"
              element={
                <PageTransition>
                  <SEOScanner />
                </PageTransition>
              }
            />
            <Route
              path="/apps/growth-engine"
              element={
                <PageTransition>
                  <GrowthEngine />
                </PageTransition>
              }
            />
            <Route
              path="/apps/license-hub"
              element={
                <PageTransition>
                  <LicenseHub />
                </PageTransition>
              }
            />
            <Route
              path="/apps/clinical-compass"
              element={
                <PageTransition>
                  <ClinicalCompass />
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
