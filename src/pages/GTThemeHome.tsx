import React from 'react';
import MainNavbar from '../components/layout/MainNavbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/gt/HeroSection';
import FeaturesSection from '../components/sections/gt/FeaturesSection';
import TestimonialsSection from '../components/sections/gt/TestimonialsSection';
import CTASection from '../components/sections/gt/CTASection';
import { Zap, Target, TrendingUp } from 'lucide-react';

/**
 * New GT Theme Home Page
 * 
 * Features:
 * - Modern, clean, premium UI
 * - GT global theme (turquoise, creamsicle, light-blue-gray, Montserrat)
 * - Reusable section system
 * - Scroll-reveal animations
 * - Responsive design
 */
const GTThemeHomePage: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Optimized for performance with modern technologies and best practices.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Precision Focused',
      description: 'Every element designed with purpose and attention to detail.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growth Driven',
      description: 'Built to scale and adapt as your business grows.',
    },
  ];

  const testimonials = [
    {
      quote: 'This is exactly what we needed. The attention to detail and modern design exceeded our expectations.',
      author: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechStart Inc',
    },
    {
      quote: 'Working with this team was a game-changer. They delivered beyond what we imagined.',
      author: 'Michael Chen',
      role: 'Founder',
      company: 'Innovate Labs',
    },
    {
      quote: 'The quality and professionalism is unmatched. Highly recommend!',
      author: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'Growth Co',
    },
  ];

  return (
    <div className="min-h-screen">
      <MainNavbar ctaText="Get Started" ctaLink="/contact" />
      
      <HeroSection
        headline="Build Marketing Systems That Drive Growth"
        supportingText="We create modern, scalable solutions that turn your brand into a revenue engine."
        ctaText="Get Started"
        ctaLink="/contact"
      />

      <FeaturesSection
        title="Why Choose Us"
        subtitle="Features"
        features={features}
      />

      <TestimonialsSection
        title="What Clients Say"
        subtitle="Testimonials"
        testimonials={testimonials}
      />

      <CTASection
        title="Ready to Get Started?"
        description="Let's build something amazing together. Get in touch today."
        primaryCTA={{
          text: 'Contact Us',
          link: '/contact',
        }}
        secondaryCTA={{
          text: 'Learn More',
          link: '/about',
        }}
      />

      <Footer />
    </div>
  );
};

export default GTThemeHomePage;

