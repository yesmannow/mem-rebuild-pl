import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import CaseStudy from "../components/CaseStudy";
import StickyCTA from "../components/StickyCTA";
import Testimonials from "../components/Testimonials";
import { trackCTA } from "../utils/analytics";

const selectedWork = [
  {
    title: "317 BBQ Growth Engine",
    summary:
      "Rebuilt the brand narrative, redesigned the commerce experience, and automated lifecycle journeys that keep fans coming back.",
    metrics: [
      { label: "Online Orders", value: "↑ 29% in 90 days" },
      { label: "Email Revenue", value: "+54%" },
      { label: "Average Order Value", value: "+18%" }
    ],
    image: "/images/side-projects/317-bbq.svg",
    tags: ["Brand System", "Lifecycle Automation", "CRO"],
    slug: "the-launchpad",
    accent: "#FF8A65"
  },
  {
    title: "Graston Technique Lifecycle",
    summary:
      "Unified WooCommerce, LearnDash, and FluentCRM so education, sales, and support work from the same playbook.",
    metrics: [
      { label: "Enrollments", value: "↑ 38% YoY" },
      { label: "Support Volume", value: "-70%" },
      { label: "Automation Coverage", value: "400+ flows" }
    ],
    image: "/images/case-studies/graston-dashboard/cover.svg",
    tags: ["Systems Architecture", "MarTech", "Analytics"],
    slug: "the-conductor",
    accent: "#7C5CFF"
  },
  {
    title: "Next Build in Progress",
    summary:
      "Currently architecting a new growth system that fuses product, analytics, and automation for a healthcare operator.",
    metrics: [
      { label: "Launch Window", value: "Summer 2025" },
      { label: "Focus", value: "Predictable pipeline" },
      { label: "Status", value: "In build" }
    ],
    image: "/images/case-studies/promotional-campaigns.svg",
    tags: ["Automation", "Analytics", "Ops"],
    accent: "#64748B"
  }
];

const testimonialsData = [
  {
    quote: "Jacob is the rare operator who can architect the system, build it, and prove the ROI inside the same sprint.",
    name: "Sarah Chen",
    title: "Chief Marketing Officer",
    company: "Series B SaaS"
  },
  {
    quote: "He turned our fragmented data into a growth engine. Strategy, implementation, and documentation all shipped together.",
    name: "Michael Rodriguez",
    title: "Founder",
    company: "Commerce Collective"
  },
  {
    quote: "Jacob's marketing automation work gave our team time back and produced the most predictable pipeline we've ever had.",
    name: "Emily Johnson",
    title: "VP of Growth",
    company: "Healthcare Network"
  }
];

const HomePage: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
      </motion.div>

      <motion.section
        id="work"
        className="container-px mx-auto max-w-6xl py-16 md:py-24 space-y-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-display">Selected Work</h2>
          <p className="max-w-2xl text-base md:text-lg opacity-80">
            Real systems, real metrics. Every project below combines brand, product, analytics, and automation so the business can
            scale without guesswork.
          </p>
        </div>
        <div className="space-y-8">
          {selectedWork.map((work, index) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
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
      </motion.section>

      <motion.section
        id="about"
        className="container-px mx-auto max-w-6xl py-16 md:py-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2 card p-6">
            <img src="/images/bio/bio-photo.jpg" alt="Jacob Darling" className="rounded-xl w-full h-auto" loading="lazy" />
          </div>
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-3xl md:text-4xl font-display">About me</h2>
            <p>
              I’m Jacob Darling—a marketing strategist and systems architect. I connect product positioning, lifecycle marketing,
              analytics, and automation so operators have a dependable revenue engine. I move from insight to implementation without
              handoffs.
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
              <motion.a
                href="/about"
                className="btn-secondary inline-flex"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Testimonials items={testimonialsData} />
      </motion.div>

      <motion.section
        id="contact"
        className="container-px mx-auto max-w-6xl py-16 md:py-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="card p-8 md:p-10">
          <h2 className="text-3xl md:text-4xl font-display mb-4">Ready to build your next growth system?</h2>
          <p className="mb-6">Tell me what needs to work better. I’ll map the strategy, architect the system, and ship it.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hoosierdarling@gmail.com"
              className="btn-secondary"
              onClick={() => trackCTA("email", "contact")}
            >
              Email me
            </a>
            <a
              href="https://cal.com/jacob-darling"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              onClick={() => trackCTA("book_call", "contact")}
            >
              Book a strategy call
            </a>
          </div>
        </div>
      </motion.section>

      <StickyCTA />
    </>
  );
};

export default HomePage;
