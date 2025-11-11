import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import BrandHero from '../components/hero/BrandHero';
import HeroIntro from '../components/home/HeroIntro';
import WhoIAm from '../components/home/WhoIAm';
import CareerHighlights from '../components/home/CareerHighlights';
import Portfolio from '../components/home/Portfolio';
import MySkills from '../components/home/MySkills';
import Testimonials from '../components/home/Testimonials';
import FinalCTA from '../components/home/FinalCTA';
import FromTheWork from '../components/sections/FromTheWork';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import ServiceSchema from '../components/seo/ServiceSchema';
import ReviewSchema from '../components/seo/ReviewSchema';
import CaseStudyCard from '../components/cards/CaseStudyCard';

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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <BrandHero />
      </motion.div>

      {/* Hero Intro Section */}
      <HeroIntro
        metrics={[
          { label: 'Years Experience', value: '16+' },
          { label: 'Projects Delivered', value: '200+' },
          { label: 'Clients Served', value: '50+' },
          { label: 'Systems Built', value: '100+' },
        ]}
      />

      {/* Featured Project Placeholder */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <CaseStudyCard
          title="Featured Project"
          microtagline="A showcase of recent work"
          emoji="🚀"
          statLine="2024"
          badges={['Design', 'Development', 'Strategy']}
          gradient="linear-gradient(135deg, #0f1720 0%, #16a34a 100%)"
          hoverGlow="#16a34a"
          slug="/case-studies"
        />
      </section>

      <main id="main-content">
        {/* About Section */}
        <WhoIAm />

        {/* Experience Section */}
        <CareerHighlights />

        {/* Portfolio Section */}
        <Portfolio />

        {/* From the Work Section */}
        <FromTheWork />

        {/* Skills Section */}
        <MySkills />

        {/* Testimonials Section */}
        <Testimonials testimonials={testimonialsData} />

        {/* Contact Section */}
        <FinalCTA />
      </main>
    </>
  );
};

export default HomePage;
