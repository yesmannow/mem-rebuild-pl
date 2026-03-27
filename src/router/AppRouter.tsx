import React, { Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../components/animations/PageTransition';
import SEOHead from '../components/seo/SEOHead';
import Loader from '../components/ui/Loader';
import { getSEOData } from './routeSEOConfig';
import './AppRouter.css';

// Lazy load pages for code splitting with better chunking
const Home = React.lazy(() => import('../pages/Home')); // Ocean Pearl Hero homepage
const Resume = React.lazy(() => import('../pages/Resume'));
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
const Gallery = React.lazy(() => import('../pages/Gallery'));
// const BrandDetail = React.lazy(() => import('../pages/brand/BrandDetail'));
// Legacy case study imports removed - all case studies now use dynamic CaseStudyDetail template
const DesignSystemDemo = React.lazy(() => import('../pages/DesignSystemDemo'));
const DeploymentStatus = React.lazy(() => import('../pages/DeploymentStatus'));
const ResumePrint = React.lazy(() => import('../pages/ResumePrint'));
const Lab = React.lazy(() => import('../pages/Lab'));
const WarRoom = React.lazy(() => import('../pages/WarRoom'));
// Removed deleted app components:
const GrowthEngineLab = React.lazy(() => import('../pages/apps/GrowthEngineLab'));
const MarketingSimulatorLab = React.lazy(() => import('../pages/apps/MarketingSimulatorLab'));
const LicenseHubLab = React.lazy(() => import('../pages/apps/LicenseHubLab'));
const SEOScannerLab = React.lazy(() => import('../pages/apps/SEOScannerLab'));
const ClinicalCompassLab = React.lazy(() => import('../pages/apps/ClinicalCompassLab'));
// const LeadScoreLab = React.lazy(() => import('../components/apps/LeadScoreLab'));
// const LinkArchitect = React.lazy(() => import('../components/apps/LinkArchitect'));
// const SEOScanner = React.lazy(() => import('../components/apps/SEOScanner'));
// const CampaignPerformanceVisualizer = React.lazy(() => import('../components/apps/CampaignPerformanceVisualizer'));
// const CompetitorIntelligenceHub = React.lazy(() => import('../components/apps/CompetitorIntelligenceHub'));
// const MarketingSimulator = React.lazy(() => import('../components/apps/MarketingSimulator'));
// const MarketingSimulatorGame = React.lazy(() => import('../components/apps/MarketingSimulatorGame'));
const BrandBuilder = React.lazy(() => import('../components/apps/BrandBuilder'));
// const EmailMarketingSimulator = React.lazy(() => import('../components/apps/EmailMarketingSimulator'));
// const SocialMediaSimulator = React.lazy(() => import('../components/apps/SocialMediaSimulator'));
const BusinessDevelopmentDemo = React.lazy(() => import('../pages/BusinessDevelopmentDemo'));
const WorkersCompensationPage = React.lazy(() => import('../pages/legal/WorkersCompensationPage'));
const LitigationPage = React.lazy(() => import('../pages/legal/LitigationPage'));
const BusinessLawPage = React.lazy(() => import('../pages/legal/BusinessLawPage'));
const FinanceIndustryPage = React.lazy(() => import('../pages/legal/FinanceIndustryPage'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Loading component with accessible Loader
const PageLoader = () => (
  <div className="route-loader-fallback flex items-center justify-center min-h-[50vh]">
    <Loader size="lg" message="Loading page..." />
  </div>
);

const AppRouter: React.FC = () => {
  const location = useLocation();

  // Dynamic SEO based on route — config lives in routeSEOConfig.ts
  const seoData = getSEOData(location.pathname);

  return (
    <>
      <SEOHead {...seoData} />
      <AnimatePresence mode="wait">
        <Suspense key={location.pathname} fallback={<PageLoader />}>
          <Routes location={location}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
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
            <Route path="/about" element={<Navigate to="/resume" replace />} />
            <Route
              path="/case-studies"
              element={
                <PageTransition>
                  <CaseStudies />
                </PageTransition>
              }
            />
            {/* All case studies now use the dynamic CaseStudyDetail template */}
            <Route
              path="/case-studies/:slug"
              element={
                <PageTransition>
                  <CaseStudyDetail />
                </PageTransition>
              }
            />
            {/* Toolbox redirects to Bio page - content merged */}
            <Route path="/toolbox" element={<Navigate to="/resume" replace />} />
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
              element={
                <PageTransition>
                  <WarRoom />
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
              path="/apps/growth-engine"
              element={
                <PageTransition>
                  <GrowthEngineLab />
                </PageTransition>
              }
            />
            <Route
              path="/apps/marketing-simulator"
              element={
                <PageTransition>
                  <MarketingSimulatorLab />
                </PageTransition>
              }
            />
            <Route
              path="/apps/license-hub"
              element={
                <PageTransition>
                  <LicenseHubLab />
                </PageTransition>
              }
            />
            <Route
              path="/apps/seo-scanner"
              element={
                <PageTransition>
                  <SEOScannerLab />
                </PageTransition>
              }
            />
            <Route
              path="/apps/clinical-compass"
              element={
                <PageTransition>
                  <ClinicalCompassLab />
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
              path="/apps/brand-builder"
              element={
                <PageTransition>
                  <BrandBuilder />
                </PageTransition>
              }
            />
            {/* Removed routes for deleted app components:
            <Route
              path="/apps/email-marketing-simulator"
              element={
                <PageTransition>
                  <EmailMarketingSimulator />
                </PageTransition>
              }
            />
            <Route
              path="/apps/social-media-simulator"
              element={
                <PageTransition>
                  <SocialMediaSimulator />
                </PageTransition>
              }
            />
            */}
            <Route
              path="/business-development-demo"
              element={
                <PageTransition>
                  <BusinessDevelopmentDemo />
                </PageTransition>
              }
            />
            <Route
              path="/legal/workers-compensation"
              element={
                <PageTransition>
                  <WorkersCompensationPage />
                </PageTransition>
              }
            />
            <Route
              path="/legal/litigation"
              element={
                <PageTransition>
                  <LitigationPage />
                </PageTransition>
              }
            />
            <Route
              path="/legal/business-law"
              element={
                <PageTransition>
                  <BusinessLawPage />
                </PageTransition>
              }
            />
            <Route
              path="/legal/finance-industry"
              element={
                <PageTransition>
                  <FinanceIndustryPage />
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
