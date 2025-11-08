import React from "react";
import Hero from "../components/Hero";
import CaseStudy from "../components/CaseStudy";
import StickyCTA from "../components/StickyCTA";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />

      <section id="work" className="container-px mx-auto max-w-6xl py-16 md:py-24 space-y-10">
        <h2 className="text-3xl md:text-4xl font-display">Selected work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CaseStudy
            title="317 BBQ — Brand, Web, Growth"
            summary="I rebuilt the narrative, redesigned for conversions, and implemented CRM + automated flows."
            statLabel="Online orders"
            statValue="↑ 29% in 90 days"
            image="/images/317bbq.jpg"
            tags={["Brand", "Web", "Email Automation"]}
          />
          <CaseStudy
            title="Graston Technique — Education Funnel"
            summary="I designed a CEU-first content engine and built a multi-step lifecycle that increased enrollments."
            statLabel="Enrollments"
            statValue="↑ 38% YoY"
            image="/images/graston.jpg"
            tags={["Lifecycle", "Content", "CRM"]}
          />
        </div>
      </section>

      <section id="about" className="container-px mx-auto max-w-6xl py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2 card p-6">
            <img src="/images/jacob.jpg" alt="Jacob Darling" className="rounded-xl w-full h-auto" loading="lazy" />
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
      </section>

      <section id="contact" className="container-px mx-auto max-w-6xl py-16 md:py-24">
        <div className="card p-8 md:p-10">
          <h2 className="text-3xl md:text-4xl font-display mb-4">Let's talk</h2>
          <p className="mb-6">Tell me your goal. I'll reply with options and cost.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:hoosierdarling@gmail.com" className="btn-secondary">Email me</a>
            <a href="https://cal.com/" target="_blank" rel="noreferrer" className="btn-primary">Book a strategy call</a>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
};

export default HomePage;
