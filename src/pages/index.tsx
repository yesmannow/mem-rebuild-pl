import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import CaseStudy from "../components/CaseStudy";
import StickyCTA from "../components/StickyCTA";
import Testimonials from "../components/Testimonials";
import { trackCTA, trackCaseStudy } from "../utils/analytics";

const testimonialsData = [
  {
    quote: "Jacob transformed our marketing operations. The systems he built created predictable pipeline and measurable ROI.",
    name: "Sarah Chen",
    title: "CMO",
    company: "Tech Startup",
  },
  {
    quote: "Working with Jacob was seamless. He moved from strategy to execution without handoffs, delivering results faster than expected.",
    name: "Michael Rodriguez",
    title: "Founder",
    company: "SaaS Company",
  },
  {
    quote: "Jacob's approach to marketing systems is unmatched. He doesn't just build campaigns—he builds revenue engines.",
    name: "Emily Johnson",
    title: "VP Marketing",
    company: "E-commerce Brand",
  },
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
        <h2 className="text-3xl md:text-4xl font-display">Selected work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <CaseStudy
              title="317 BBQ — Brand, Web, Growth"
              summary="I rebuilt the narrative, redesigned for conversions, and implemented CRM + automated flows."
              statLabel="Online orders"
              statValue="↑ 29% in 90 days"
              image="/images/side-projects/317-bbq.svg"
              tags={["Brand", "Web", "Email Automation"]}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <CaseStudy
              title="Graston Technique — Education Funnel"
              summary="I designed a CEU-first content engine and built a multi-step lifecycle that increased enrollments."
              statLabel="Enrollments"
              statValue="↑ 38% YoY"
              image="/images/case-studies/graston-dashboard/cover.svg"
              tags={["Lifecycle", "Content", "CRM"]}
            />
          </motion.div>
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
              I design and run growth systems that create predictable pipeline. 16+ years across brand, performance, and product-led growth. I move from strategy to execution without handoffs.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="chip">Strategy</span>
              <span className="chip">Positioning</span>
              <span className="chip">Web + CRO</span>
              <span className="chip">Lifecycle</span>
              <span className="chip">Paid</span>
              <span className="chip">Analytics</span>
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
          <h2 className="text-3xl md:text-4xl font-display mb-4">Let's talk</h2>
          <p className="mb-6">Tell me your goal. I'll reply with options and cost.</p>
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
