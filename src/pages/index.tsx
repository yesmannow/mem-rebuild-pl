import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import CaseStudy from '../components/CaseStudy';
import StickyCTA from '../components/StickyCTA';
import Carousel from '../components/Carousel';
import NewsletterForm from '../components/newsletter/NewsletterForm';
import ServicesSection from '../components/services/ServicesSection';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import ServiceSchema from '../components/seo/ServiceSchema';
import ReviewSchema from '../components/seo/ReviewSchema';
import ClientLogos from '../components/clients/ClientLogos';
import { trackCTA } from '../utils/analytics';

const selectedWork = [
  {
    title: '317 BBQ Growth Engine',
    summary:
      'Rebuilt the brand narrative, redesigned the commerce experience, and automated lifecycle journeys that keep fans coming back.',
    metrics: [
      { label: 'Online Orders', value: '↑ 29% in 90 days' },
      { label: 'Email Revenue', value: '+54%' },
      { label: 'Average Order Value', value: '+18%' },
    ],
    image: '/images/side-projects/317-bbq.svg',
    tags: ['Brand System', 'Lifecycle Automation', 'CRO'],
    slug: 'the-launchpad',
    accent: '#FF8A65',
  },
  {
    title: 'Graston Technique Lifecycle',
    summary:
      'Unified WooCommerce, LearnDash, and FluentCRM so education, sales, and support work from the same playbook.',
    metrics: [
      { label: 'Enrollments', value: '↑ 38% YoY' },
      { label: 'Support Volume', value: '-70%' },
      { label: 'Automation Coverage', value: '400+ flows' },
    ],
    image: '/images/case-studies/graston-dashboard/cover.svg',
    tags: ['Systems Architecture', 'MarTech', 'Analytics'],
    slug: 'the-conductor',
    accent: '#7C5CFF',
  },
  {
    title: 'Next Build in Progress',
    summary:
      'Currently architecting a new growth system that fuses product, analytics, and automation for a healthcare operator.',
    metrics: [
      { label: 'Launch Window', value: 'Summer 2025' },
      { label: 'Focus', value: 'Predictable pipeline' },
      { label: 'Status', value: 'In build' },
    ],
    image: '/images/case-studies/promotional-campaigns.svg',
    tags: ['Automation', 'Analytics', 'Ops'],
    accent: '#64748B',
  },
];

const testimonialsData = [
  {
    quote:
      'Jacob is the rare operator who can architect the system, build it, and prove the ROI inside the same sprint.',
    name: 'Sarah Chen',
    title: 'Chief Marketing Officer',
    company: 'Series B SaaS',
  },
  {
    quote:
      'He turned our fragmented data into a growth engine. Strategy, implementation, and documentation all shipped together.',
    name: 'Michael Rodriguez',
    title: 'Founder',
    company: 'Commerce Collective',
  },
  {
    quote:
      "Jacob's marketing automation work gave our team time back and produced the most predictable pipeline we've ever had.",
    name: 'Emily Johnson',
    title: 'VP of Growth',
    company: 'Healthcare Network',
  },
];

const HomePage: React.FC = () => {
  // Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>BearCave Marketing — Jacob Darling | Marketing Strategist & Systems Architect</title>
        <meta
          name="description"
          content="I build marketing systems that turn brands into revenue engines. Strategy, creative, analytics, and execution—unified under one operator."
        />
        <meta
          name="keywords"
          content="marketing strategist, marketing technologist, marketing automation, CRM campaigns, systems architecture"
        />
        <meta
          property="og:title"
          content="BearCave Marketing — Jacob Darling | Marketing Strategist & Systems Architect"
        />
        <meta
          property="og:description"
          content="I build marketing systems that turn brands into revenue engines. Strategy, creative, analytics, and execution—unified under one operator."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bearcavemarketing.com/" />
        <meta property="og:image" content="https://www.bearcavemarketing.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BearCave Marketing — Jacob Darling" />
        <meta
          name="twitter:description"
          content="I build marketing systems that turn brands into revenue engines."
        />
        <meta name="twitter:image" content="https://www.bearcavemarketing.com/og-image.jpg" />
        <link rel="canonical" href="https://www.bearcavemarketing.com/" />
      </Helmet>

      {/* Structured Data */}
      <OrganizationSchema />
      <ServiceSchema />
      <ReviewSchema />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <Hero />
      </motion.div>

      <motion.section
        id="work"
        className="container-px mx-auto max-w-6xl py-16 md:py-24 space-y-10 section-panel section-panel--work"
        className="section-block section-block--work py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="section-block__inner container-px mx-auto max-w-6xl space-y-10">
          <motion.div className="space-y-4" variants={itemVariants}>
            <h2 className="section-heading">Selected Work</h2>
            <p className="section-subheading">
              Real systems, real metrics. Every project below combines brand, product, analytics, and
              automation so the business can scale without guesswork.
            </p>
          </motion.div>
          <div className="space-y-8">
            {selectedWork.map(work => (
              <motion.div
                key={work.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <CaseStudy
                  title={work.title}
                  summary={work.summary}
                  metrics={work.metrics}
                  image={work.image}
                  tags={work.tags}
                  slug={work.slug}
                  accent={work.accent}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="container-px mx-auto max-w-6xl py-16 md:py-24 section-panel section-panel--about"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-block__inner container-px mx-auto max-w-6xl">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2 card p-6">
              <img
                src="/images/bio/bio-photo.jpg"
                alt="Jacob Darling"
                className="rounded-xl w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-3 space-y-4">
              <h2 className="section-heading">About me</h2>
              <p>
                I'm Jacob Darling—a marketing strategist and systems architect. I connect product
                positioning, lifecycle marketing, analytics, and automation so operators have a
                dependable revenue engine. I move from insight to implementation without handoffs.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="chip">Strategy</span>
                <span className="chip">Positioning</span>
                <span className="chip">Web + CRO</span>
                <span className="chip">Lifecycle</span>
                <span className="chip">Paid</span>
                <span className="chip">Analytics</span>
              </div>
              <div>
                <Link
                  to="/about"
                  className="btn-secondary inline-flex"
                  onClick={() => trackCTA('learn_more', 'homepage')}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="services"
        className="container-px mx-auto max-w-6xl py-16 md:py-24 section-panel section-panel--services"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-block__inner">
          <ServicesSection />
        </div>
      </motion.section>

      <motion.section
        id="clients"
        className="container-px mx-auto max-w-6xl py-16 md:py-24 section-panel section-panel--clients"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-block__inner container-px mx-auto max-w-6xl">
          <ClientLogos />
        </div>
      </motion.section>

      <motion.div
        className="container-px mx-auto max-w-6xl py-16 md:py-24 section-panel section-panel--testimonials"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="section-block__inner space-y-10">
          <motion.div
            className="container-px mx-auto max-w-4xl text-center space-y-4"
            variants={itemVariants}
          >
            <h2 className="section-heading">Client Proof</h2>
            <p className="section-subheading">
              Operators and founders trust these systems to power revenue, retention, and reporting.
            </p>
          </motion.div>
          <motion.div className="container-px mx-auto max-w-4xl" variants={itemVariants}>
            <Carousel
              autoPlay={true}
              interval={5000}
              pauseOnHover={true}
              ariaLabel="Client testimonials"
            >
              {testimonialsData.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <blockquote className="testimonial-quote">"{testimonial.quote}"</blockquote>
                  <div className="testimonial-author">
                    <div className="testimonial-author-info">
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-title">
                        {testimonial.title} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="container-px mx-auto max-w-6xl py-16 md:py-24 section-panel section-panel--contact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-block__inner container-px mx-auto max-w-6xl">
          <div className="card">
            <h2 className="section-heading">Ready to build your next growth system?</h2>
            <p className="section-subheading">
              Tell me what needs to work better. I'll map the strategy, architect the system, and ship
              it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:hoosierdarling@gmail.com"
                className="btn-secondary"
                onClick={() => trackCTA('email', 'contact')}
              >
                Email me
              </a>
              <a
                href="https://cal.com/jacob-darling"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                onClick={() => trackCTA('book_call', 'contact')}
              >
                Book a strategy call
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="newsletter"
        className="container-px mx-auto max-w-4xl py-16 md:py-24 section-panel section-panel--newsletter"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-block__inner container-px mx-auto max-w-4xl">
          <NewsletterForm />
        </div>
      </motion.section>

      <StickyCTA />
    </>
  );
};

export default HomePage;
