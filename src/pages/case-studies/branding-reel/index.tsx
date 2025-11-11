import React from 'react';
import CaseStudyLayout from '../../../components/case-study/CaseStudyLayout';
import HeroSection from '../../../components/case-study/HeroSection';
import Overview from '../../../components/case-study/Overview';
import ChallengeSection from '../../../components/case-study/ChallengeSection';
import ProcessTimeline from '../../../components/case-study/ProcessTimeline';
import ShowcaseGallery from '../../../components/case-study/ShowcaseGallery';
import ResultSection from '../../../components/case-study/ResultSection';
import CTASection from '../../../components/case-study/CTASection';
import data from './data.json';

const BrandingReel: React.FC = () => {
  return (
    <CaseStudyLayout>
      <HeroSection
        title={data.title}
        backgroundImage="/images/case-studies/branding-reel/cover.svg"
      />
      <Overview role={data.role} tools={data.tools} duration="3 months" summary={data.summary} />
      <ChallengeSection challenge="Crafting a compelling branding reel that captures the essence of the brand." />
      <ProcessTimeline phases={['Concept', 'Design', 'Animation', 'Delivery']} />
      <ShowcaseGallery
        images={[
          '/images/case-studies/branding-reel/gallery-1.svg',
          '/images/case-studies/branding-reel/gallery-2.svg',
        ]}
      />
      <ResultSection
        results="The branding reel effectively communicated the brand's vision and increased engagement."
        beforeImage="/images/case-studies/branding-reel/before.svg"
        afterImage="/images/case-studies/branding-reel/after.svg"
      />
      <CTASection nextProjectSlug="graston-dashboard" />
    </CaseStudyLayout>
  );
};

export default BrandingReel;
