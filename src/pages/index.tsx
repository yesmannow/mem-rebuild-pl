import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail } from 'lucide-react';
import HeroCommandPanel from '../components/home/HeroCommandPanel';
import HeroStats from '../components/home/HeroStats';
import QuickWins from '../components/home/QuickWins';
import SocialProof from '../components/home/SocialProof';
import { ServiceLadder } from '../components/interactive/ServiceLadder';
import CareerHighlights from '../components/home/CareerHighlights';
import Portfolio from '../components/home/Portfolio';
import EnhancedSkills from '../components/home/EnhancedSkills';
import Testimonials from '../components/home/Testimonials';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import ServiceSchema from '../components/seo/ServiceSchema';
import ReviewSchema from '../components/seo/ReviewSchema';

// Lazy load heavy components
const PersonSchema = lazy(() => import('../components/seo/PersonSchema'));

const testimonialsData = [
  {
    quote: "Jacob brings energy, creativity, and execution. Rare mix of strategy and hands-on delivery.",
    fullQuote: "I've known Jacob and worked with him off and on for more than two decades, and he continues to impress me with the energy, creativity, and passion he brings to everything he does. He thrives in fast-paced environments and is always eager to explore new tools and technologies to get results. Jacob has a great balance of strategic thinking and hands-on execution, and I've learned a lot from working alongside him. I'd recommend him to anyone looking for a marketing professional who's both forward-thinking and results-oriented.",
    name: 'Jesse Wey',
    title: 'Web Development | IT | Marketing | People',
    company: 'LinkedIn Recommendation',
    date: 'October 2025',
  },
  {
    quote: "Jacob delivers impact fast. He's forward-thinking, tech-savvy, and results-driven.",
    fullQuote: "Jacob is the kind of marketer who makes an immediate impact. His passion and energy for the field show up in everything he does, from brainstorming creative campaigns/projects to diving into data to understand what really drives results. He's constantly learning new technologies and figuring out how to put them to work in practical ways. That curiosity and drive to improve make him not just effective, but always evolving as a marketer. Any team would be lucky to have someone with his mix of creativity, adaptability, and reliability.",
    name: 'Andrew Bastnagel, MBA',
    title: 'Financial Services Consultant | Digital Transformation Strategist',
    company: 'LinkedIn Recommendation',
    date: 'October 2025',
  },
  {
    quote: "Unparalleled energy, focus, and follow-through. Jacob gets it done and gets it done right.",
    fullQuote: "Jacob is an involved and dedicated marketer. His exuberance, and moxie are unparalleled. He excels in managing multiple projects concurrently with strong detail, problem solving, and follow-through. Jacob displays a combination of creative and analytical skills, with proven ability to assess and implement marketing strategies that produce a positive return on investment.",
    name: 'Kevin Martin See',
    title: 'IBMer | Connector | Ally',
    company: 'LinkedIn Recommendation',
    date: 'October 2014',
  },
  {
    quote: "Jacob Darling has done PR and marketing work in the past. He is hardworking, creative and a pleasure to work with. Jacob has skills in web design, branding, and personal communication. I would work with Jacob again and recommend others to do the same.",
    fullQuote: "Jacob Darling has done PR and marketing work in the past. He is hardworking, creative and a pleasure to work with. Jacob has skills in web design, branding, and personal communication. I would work with Jacob again and recommend others to do the same.",
    name: 'Nick Brown',
    title: 'DMA, Inc.',
    company: 'LinkedIn Recommendation',
    date: 'October 2013',
  },
  {
    quote: "I found Jacob to have great communication skills and creative abilities. He is focused and engaged in the projects he directs and participates in. What stands out the most in working with him is his energy and enthusiasm for what he does. I highly recommend Jacob.",
    fullQuote: "I found Jacob to have great communication skills and creative abilities. He is focused and engaged in the projects he directs and participates in. What stands out the most in working with him is his energy and enthusiasm for what he does. I highly recommend Jacob.",
    name: 'Terrence L. Black',
    title: 'Co Owner ResQ Organics',
    company: 'LinkedIn Recommendation',
    date: 'April 2013',
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Jacob Darling | Strategic Marketing Technologist & Growth Architect</title>
        <meta
          name="description"
          content="16+ years of experience blending creative strategy, marketing automation, and systems thinking to drive scalable growth. Explore full-funnel campaigns, CRM architecture, and performance marketing across SaaS, healthcare, and more."
        />
        <meta
          name="keywords"
          content="marketing strategist, marketing technologist, marketing automation, CRM campaigns, systems architecture, growth marketing, performance marketing"
        />
        <meta
          property="og:title"
          content="Jacob Darling | Strategic Marketing Technologist & Growth Architect"
        />
        <meta
          property="og:description"
          content="16+ years of experience blending creative strategy, marketing automation, and systems thinking to drive scalable growth. Explore full-funnel campaigns, CRM architecture, and performance marketing across SaaS, healthcare, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mem-rebuild-pl.pages.dev/" />
        <meta property="og:image" content="https://mem-rebuild-pl.pages.dev/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jacob Darling | Strategic Marketing Technologist & Growth Architect" />
        <meta
          name="twitter:description"
          content="16+ years of experience blending creative strategy, marketing automation, and systems thinking to drive scalable growth."
        />
        <meta name="twitter:image" content="https://mem-rebuild-pl.pages.dev/og-image.jpg" />
        <link rel="canonical" href="https://mem-rebuild-pl.pages.dev/" />
      </Helmet>

      {/* Structured Data */}
      <Suspense fallback={null}>
        <PersonSchema />
      </Suspense>
      <OrganizationSchema />
      <ServiceSchema />
      <ReviewSchema />

      {/* Hero Command Panel - Enhanced with bio photos and improved design */}
      <HeroCommandPanel />

      {/* Animated Stats Section */}
      <HeroStats />

      {/* Quick Wins - Highlight key achievements */}
      <QuickWins />

      {/* Social Proof - Client logos and trust indicators */}
      <SocialProof />

      <main id="main-content">
        {/* Experience Section */}
        <CareerHighlights />

        {/* Portfolio Section */}
        <Portfolio />

        {/* Skills Section - Enhanced with Service Ladder */}
        <ServiceLadder
          services={[
            {
              number: '01',
              title: 'Systems Architecture',
              description: 'Design and build scalable marketing infrastructure that connects tools, automates workflows, and delivers measurable results.',
              icon: '🏗️'
            },
            {
              number: '02',
              title: 'Growth Automation',
              description: 'Create intelligent automation systems that nurture leads, optimize campaigns, and scale revenue operations.',
              icon: '⚡'
            },
            {
              number: '03',
              title: 'Analytics Enablement',
              description: 'Transform data into actionable insights with custom dashboards, attribution models, and performance tracking.',
              icon: '📊'
            },
            {
              number: '04',
              title: 'Operator Coaching',
              description: 'Train teams on systems, processes, and best practices to ensure long-term success and scalability.',
              icon: '🎓'
            }
          ]}
        />

        {/* Legacy Skills Section - Keep for detailed breakdown */}
        <EnhancedSkills />

        {/* Testimonials Section */}
        <Testimonials testimonials={testimonialsData} />
      </main>

      {/* Floating Contact Button */}
      <FloatingActionButton
        icon={<Mail />}
        label="Get in Touch"
        href="/contact"
        position="bottom-right"
      />
    </>
  );
};

export default HomePage;
