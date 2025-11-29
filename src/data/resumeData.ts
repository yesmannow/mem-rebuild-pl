/**
 * ATS-Optimized Resume Data
 * 
 * Structured for "Dual-Threat" narrative: Marketing Strategy + Technical Execution
 * Optimized for Applicant Tracking Systems (ATS) with clear, parseable content
 */

export const resumeData = {
  header: {
    name: "JACOB DARLING",
    title: "MARKETING DIRECTOR & SYSTEMS ARCHITECT",
    contact: [
      "Indianapolis, IN",
      "555-555-5555",
      "email@example.com",
      "bearcavemarketing.com",
      "linkedin.com/in/jacobdarling"
    ]
  },
  summary: "Marketing strategist and systems architect with 15+ years of experience building revenue-driving infrastructure for global healthcare brands. A 'Dual-Threat' leader bridging the gap between CMO strategy (Revenue, Brand) and CTO execution (DevOps, Automation). Proven track record of architecting secure, scalable platforms serving 30,000+ users while driving 40% conversion lifts through automated ecosystems.",
  coreCompetencies: [
    "Revenue Operations (RevOps)",
    "Full-Stack Development (React/Node)",
    "Marketing Automation Architecture",
    "Technical SEO & Analytics",
    "CRM Implementation (HubSpot/Fluent)",
    "Team Leadership & Agile"
  ],
  experience: [
    {
      company: "Graston Technique, LLC",
      role: "Marketing Director",
      period: "Aug 2023 – Present",
      location: "Indianapolis, IN",
      stack: "Tech Stack: WordPress, LearnDash, React, Cloudflare Workers, HubSpot, Stripe API",
      bullets: [
        "Leads both marketing strategy and technical execution for a high-volume educational platform serving 30,000+ clinicians.",
        "Architected a 'Defense-in-Depth' security system (Cloudflare WAF, Rate Limiting) blocking 85k threats/mo while reducing server load by 40%.",
        "Built an automated 'Conversion Engine' using LearnDash and FluentCRM, resulting in a 40% conversion lift and 95% reduction in admin time.",
        "Engineered a dynamic 'Quote-to-Order' payment system integrating Stripe and ACF, achieving zero manual invoicing.",
        "Managed cross-functional sprints with developers and designers, translating business goals into dev-ready specifications."
      ]
    },
    {
      company: "Ultimate Technologies Group",
      role: "Interim Director of Marketing",
      period: "Mar 2023 – Jul 2023",
      location: "Fishers, IN",
      stack: "Tech Stack: HubSpot CRM, Google Ads, GA4, WordPress",
      bullets: [
        "Spearheaded marketing strategy execution during a key transitional period, ensuring business continuity.",
        "Audited and optimized existing marketing technology stack for immediate efficiency gains.",
        "Maintained brand consistency across all digital and physical channels during leadership transition."
      ]
    },
    {
      company: "BearCave Marketing (Consultancy)",
      role: "Founder & Lead Architect",
      period: "2008 – 2023",
      location: "Remote",
      stack: "Tech Stack: LAMP Stack, React, Shopify, WooCommerce, Python",
      bullets: [
        "Delivered digital transformation projects for 50+ clients, focusing on e-commerce growth and workflow automation.",
        "Developed custom ROI calculators and interactive lead magnets that increased client lead capture by avg. 35%.",
        "Managed full lifecycle development: Strategy -> UI/UX -> Code -> Deployment -> Analytics."
      ]
    }
  ],
  education: {
    degree: "Bachelor of Science in Business Management",
    school: "Indiana University-Bloomington",
    year: "Graduated: 2008"
  }
};

export type ResumeData = typeof resumeData;
