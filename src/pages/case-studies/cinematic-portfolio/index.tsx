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

const CinematicPortfolio: React.FC = () => {
  return (
    <CaseStudyLayout>
      <HeroSection
        title={data.title}
        backgroundImage="/images/case-studies/cinematic-portfolio/cover.svg"
      />
      <Overview role={data.role} tools={data.tools} duration="4 months" summary={data.summary} />
      <ChallengeSection challenge="Creating a cinematic portfolio that showcases storytelling through motion." />
      <ProcessTimeline phases={['Concept', 'Storyboard', 'Animation', 'Review']} />
      <ShowcaseGallery
        images={[
          '/images/case-studies/cinematic-portfolio/gallery-1.svg',
          '/images/case-studies/cinematic-portfolio/gallery-2.svg',
        ]}
      />
      <ResultSection
        results="The portfolio received praise for its innovative use of motion and storytelling."
        beforeImage="/images/case-studies/cinematic-portfolio/before.svg"
        afterImage="/images/case-studies/cinematic-portfolio/after.svg"
      />
      <CTASection nextProjectSlug="branding-reel" />
    </CaseStudyLayout>
  );
};

export default CinematicPortfolio;
