import React, { Suspense, lazy } from "react";
import CaseStudyLayout from "../../../components/case-study/CaseStudyLayout";
import HeroSection from "../../../components/case-study/HeroSection";
import Overview from "../../../components/case-study/Overview";
import ChallengeSection from "../../../components/case-study/ChallengeSection";
import ProcessTimeline from "../../../components/case-study/ProcessTimeline";
import ShowcaseGallery from "../../../components/case-study/ShowcaseGallery";
import ResultSection from "../../../components/case-study/ResultSection";
import CTASection from "../../../components/case-study/CTASection";
import data from "./data.json";

// Lazy load MarketingCommandCenter to prevent recharts from bloating initial bundle
const MarketingCommandCenter = lazy(() => import("../../../components/dashboard/MarketingCommandCenter"));

const GrastonDashboard: React.FC = () => {
  return (
    <CaseStudyLayout>
      <HeroSection title={data.title} backgroundImage="/images/case-studies/graston-dashboard/cover.svg" />
      <Overview
        role={data.role}
        tools={data.tools}
        duration="6 months"
        summary={data.summary}
      />
      <ChallengeSection challenge="The challenge was to redesign the dashboard for better UX and motion fluidity." />
      <ProcessTimeline phases={["Research", "Design", "Development", "Testing"]} />
      <ShowcaseGallery
        images={[
          "/images/case-studies/graston-dashboard/gallery-1.svg",
          "/images/case-studies/graston-dashboard/gallery-2.svg"
        ]}
      />
      <Suspense fallback={null}>
        <MarketingCommandCenter />
      </Suspense>
      <ResultSection
        results="The redesign led to a 30% increase in user satisfaction and a 20% reduction in task completion time."
        beforeImage="/images/case-studies/graston-dashboard/before.svg"
        afterImage="/images/case-studies/graston-dashboard/after.svg"
      />
      <CTASection nextProjectSlug="cinematic-portfolio" />
    </CaseStudyLayout>
  );
};

export default GrastonDashboard;
