import { ReactNode } from "react";

export interface CaseStudy {
  color?: string;
  icon?: ReactNode;
  slug: string;
  title: string;
  image: string;
  tagline: string;
  category: string[];
  tags: string[];
  technologies?: string[]; // Add technologies field
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  strategy: string;
  impact: string;
  fullContent?: {
    challenge: string;
    strategy: string;
    impact: string;
  };
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "healthcare-campaign",
    title: "Healthcare Marketing Campaign",
    image: "/images/auto-generated/case-studies/healthcare-campaign.webp",
    tagline: "Comprehensive healthcare advertising design system that builds trust while remaining accessible",
    category: ["Design", "Healthcare"],
    tags: ["healthcare", "advertising", "campaign", "medical", "branding"],
    metrics: [
      { label: "Patient Engagement", value: "+40%" },
      { label: "Brand Recognition", value: "+65%" },
      { label: "Campaign ROI", value: "3.2x" }
    ],
    challenge: "Create comprehensive healthcare marketing that builds trust while remaining accessible to patients",
    strategy: "Clean, medical-focused design system with calming colors, clear typography, and multiple touchpoints",
    impact: "Increased patient engagement by 40% and improved brand recognition in the healthcare sector",
    fullContent: {
      challenge: `Healthcare marketing faces a unique challenge: balancing professional credibility with patient accessibility. The marketing needed to communicate medical expertise and trustworthiness while remaining approachable and easy to understand for patients from diverse backgrounds. Traditional medical marketing often felt cold or overly clinical, creating barriers to patient engagement. We needed a comprehensive advertising design system that could work across multiple touchpoints—digital ads, print materials, website, and patient communications—while maintaining a cohesive, trustworthy brand identity.`,
      strategy: `I developed a comprehensive healthcare advertising design system built around three core principles: trust, clarity, and accessibility.

**Design System Architecture:**

- **Calming Color Palette:** Selected soft blues and greens known to convey trust and healing, balanced with warm neutrals for approachability
- **Clear Typography Hierarchy:** Implemented a clean, readable type system that prioritized legibility while maintaining professional aesthetics
- **Visual Consistency:** Created modular design components that could be adapted across digital and print formats
- **Multi-Touchpoint Strategy:** Designed templates for Google Ads, social media, print brochures, and patient-facing materials
- **Accessibility First:** Ensured all designs met WCAG guidelines for readability and contrast, making healthcare information accessible to all patients`,
      impact: `The comprehensive healthcare marketing system delivered measurable results across multiple patient engagement metrics.

- **Increased Patient Engagement:** Campaigns utilizing the new design system saw a 40% increase in patient inquiries and appointment bookings
- **Improved Brand Recognition:** Brand awareness studies showed a 65% improvement in brand recognition within the target demographic
- **Strong Campaign ROI:** Marketing campaigns achieved a 3.2x return on investment, demonstrating effective use of marketing budget
- **Cross-Channel Consistency:** Unified design system ensured cohesive brand experience whether patients encountered us online, in print, or in-person

This project demonstrated how strategic design thinking and systematic implementation can transform healthcare marketing from functional to genuinely effective, building trust while driving measurable patient engagement.`
    },
    featured: true
  },
  {
    slug: "promotional-campaigns",
    title: "Seasonal Promotional Campaigns",
    image: "/images/auto-generated/case-studies/promotional-campaigns.webp",
    tagline: "Dynamic promotional design system for retail marketing that adapts to seasons while driving conversions",
    category: ["Design", "Marketing"],
    tags: ["promotional", "seasonal", "retail", "marketing", "campaigns"],
    metrics: [
      { label: "Seasonal Sales", value: "+35%" },
      { label: "Production Efficiency", value: "+50%" },
      { label: "Brand Consistency", value: "95%" }
    ],
    challenge: "Create flexible promotional design system adaptable to different seasons while maintaining brand consistency",
    strategy: "Modular design system with seasonal color palettes, dynamic typography, and flexible layouts",
    impact: "Increased seasonal sales by 35% and reduced design production time by 50%",
    fullContent: {
      challenge: `Retail marketing requires constant adaptation to seasonal trends, holidays, and promotional opportunities. However, each seasonal campaign was being designed from scratch, consuming significant design resources and risking brand inconsistency. The marketing team needed a system that could quickly generate on-brand promotional materials for different seasons—Spring sales, Summer campaigns, Back-to-School, Holiday promotions—without starting over each time. The challenge was creating flexibility while maintaining the cohesive brand identity that customers recognize and trust.`,
      strategy: `I architected a modular promotional design system built for speed and consistency.

**System Architecture:**

- **Seasonal Color Palettes:** Defined base brand colors with seasonal accent palettes that could be swapped while maintaining visual cohesion
- **Dynamic Typography System:** Created flexible typographic styles that could emphasize different messages (urgency, celebration, savings) while staying consistent
- **Modular Layout Templates:** Developed reusable layout components that could be quickly rearranged for different promotional formats (banners, social posts, print ads)
- **Template Library:** Built comprehensive template library for each season with pre-designed components, reducing design time while ensuring quality
- **Brand Guidelines Integration:** Ensured all seasonal adaptations followed core brand principles, maintaining 95% brand consistency across all campaigns`,
      impact: `The modular seasonal design system transformed how the marketing team executed promotional campaigns.

- **Increased Seasonal Sales:** Promotional campaigns using the new system achieved a 35% increase in seasonal sales compared to previous years
- **Massive Production Efficiency:** Design production time reduced by 50%, allowing the team to launch more campaigns with the same resources
- **Maintained Brand Consistency:** Despite seasonal variations, brand consistency remained at 95%, ensuring customers always recognized our brand
- **Faster Time-to-Market:** New seasonal campaigns could be launched in days instead of weeks, capitalizing on timely opportunities
- **Scalable System:** The modular approach allowed easy expansion to new seasons and promotional formats as business needs evolved

This project demonstrated how systematic design thinking can solve operational challenges while driving measurable business results—transforming design from a bottleneck into a competitive advantage.`
    },
    featured: true
  },
  {
    slug: "brand-identity-systems",
    title: "Brand Identity Systems",
    image: "/images/auto-generated/case-studies/brand-identity-systems.webp",
    tagline: "Comprehensive brand identity development for diverse clients across multiple industries",
    category: ["Design", "Branding"],
    tags: ["branding", "identity", "logo", "systems", "visual-identity"],
    metrics: [
      { label: "Brand Launches", value: "12+" },
      { label: "Client Satisfaction", value: "90%" },
      { label: "Market Impact", value: "+45%" }
    ],
    challenge: "Develop unique brand identities for diverse clients across different industries with distinct personalities",
    strategy: "Comprehensive brand identity systems including logos, color palettes, typography, and application guidelines",
    impact: "Delivered 12+ successful brand launches with 90% client satisfaction and improved market positioning",
    fullContent: {
      challenge: `Each client has a unique story, target audience, and market position—yet they all need a brand identity that authentically represents who they are while differentiating them from competitors. From healthcare providers to technology startups, from law firms to hospitality businesses, each brand identity required deep understanding of the client's values, competitive landscape, and communication goals. The challenge was creating distinctive, memorable brand systems that could scale across all touchpoints—from business cards to websites, signage to social media—while remaining true to each client's unique personality and business objectives.`,
      strategy: `I developed a comprehensive brand identity process that ensures each brand tells an authentic, differentiated story.

**Brand Development Process:**

- **Discovery & Research:** Deep dive into client values, target audience, competitive landscape, and business objectives
- **Visual Identity Creation:** Design logos that are both distinctive and flexible, working at small sizes (favicons) and large formats (billboards)
- **Color Palette Development:** Select color systems that convey brand personality while ensuring accessibility and practical application across digital and print
- **Typography Systems:** Choose typefaces that reinforce brand voice—professional yet approachable, modern yet timeless
- **Brand Guidelines:** Create comprehensive brand style guides documenting logo usage, color specifications, typography, spacing, and application examples
- **Application Design:** Extend brand identity across business cards, letterhead, website, social media, and environmental graphics`,
      impact: `The comprehensive brand identity systems delivered measurable results for clients across diverse industries.

- **12+ Successful Brand Launches:** Delivered complete brand identity systems for over a dozen clients, each tailored to their unique market position
- **90% Client Satisfaction:** High satisfaction rates demonstrate that brands authentically represented client values and resonated with target audiences
- **45% Market Impact Improvement:** Clients saw significant improvement in brand recognition, market positioning, and customer perception after brand launches
- **Scalable Brand Systems:** All brand identities were designed to work across digital and physical touchpoints, ensuring consistent brand experience
- **Long-Term Value:** Comprehensive brand guidelines enabled clients to maintain brand consistency as they grew, protecting their brand investment

This work demonstrated expertise in strategic brand development—understanding that great brands aren't just logos, but complete visual and experiential systems that communicate values, build trust, and drive business results.`
    },
    featured: true
  },
  {
    slug: "proactive-support-engine",
    title: "The Proactive Support Engine",
    image: "/images/auto-generated/case-studies/proactive-support-engine.webp",
    tagline: "Transforming Customer Support from a Cost Center to a Strategic Asset with an Intelligent, CRM-Aware Assistant",
    category: ["Marketing Systems", "Automation"],
    tags: ["AI", "CRM Integration", "Customer Support", "Cloudflare Workers"],
    metrics: [
      { label: "Support Ticket Reduction", value: "70%" },
      { label: "Response Time", value: "Instant" },
      { label: "Customer Satisfaction", value: "+45%" }
    ],
    challenge: "Customer support team trapped in cycle of repetitive inquiries, increasing response times for complex issues",
    strategy: "AI-powered chatbot with deep CRM integration via WooCommerce, LearnDash, and FluentCRM APIs",
    impact: "Dramatically increased efficiency, 24/7 instant support, liberated human agents for high-value work",
    fullContent: {
      challenge: `Our customer support team is exceptional, but they were trapped in a cycle of reactive problem-solving. A significant portion of their day was consumed by answering the same high-volume, low-complexity questions: "What's my order status?", "Which course do I take next?", "Can you explain the CEU rules again?". This operational drag created a critical bottleneck. Response times for genuinely complex student issues were increasing, and our support staff had no bandwidth for proactive outreach or value-add engagement. We weren't just losing efficiency; we were missing opportunities to build deeper customer relationships. The business needed to scale its support capabilities without scaling headcount, and that required a fundamental shift in our approach.`,
      strategy: `The goal was not to simply deflect tickets with a basic FAQ bot, but to provide genuine, personalized self-service. I architected a sophisticated AI-powered chatbot designed to be a true extension of our business systems. The solution was built on a robust, serverless foundation using Cloudflare Workers for high performance and scalability.

**Core Strategic Approach:**

- **Deep System Integration:** Engineered direct API connections into WooCommerce, LearnDash, and FluentCRM, transforming the chatbot from a static knowledge base into a dynamic, context-aware assistant
- **Personalized Resolutions:** CRM-aware authentication enabled truly personalized information delivery—specific order lookups, course progress analysis, and journey-tailored guidance
- **Intelligent Handoffs:** Smart escalation that gathers preliminary information, summarizes queries, and routes to the correct human agent with full context`,
      impact: `The implementation of this AI-powered system marked a pivotal transformation for our support operations and delivered measurable business value.

- **Dramatically Increased Efficiency:** Chatbot handles vast majority of common inquiries automatically, liberating human support team for complex problem-solving
- **Enhanced Customer Experience:** Instant, 24/7 answers with personalized accuracy led to notable increase in customer satisfaction
- **Improved Data Insights:** Valuable insights into common friction points enabled proactive documentation and UX improvements
- **Higher Quality Agent Interactions:** Agents now act as strategic advisors rather than ticket-takers, more engaged and empowered

This project demonstrated how thoughtful automation and deep system integration create a win-win: a more efficient business and a happier, more successful customer base.`,
    },
    featured: true
  },
  {
    slug: "command-center",
    title: "The Command Center",
    image: "/images/auto-generated/case-studies/command-center.webp",
    tagline: "Unifying Fragmented Data into a Single Pane of Glass for Proactive Event Management and Instructor Empowerment",
    category: ["Data & Analytics", "Systems"],
    tags: ["PHP", "REST API", "WordPress", "JavaScript", "SQL"],
    metrics: [
      { label: "Admin Time Saved", value: "Hours → Minutes" },
      { label: "Revenue Protected", value: "$1000s per event" },
      { label: "Data Consolidation", value: "3 systems unified" }
    ],
    challenge: "Critical event data siloed across multiple systems, no early warning for under-enrolled events, manual spreadsheet compilation",
    strategy: "Unified Events Hub with real-time data aggregation, custom REST API, predictive analytics, and role-scoped secure views",
    impact: "Prevented lost revenue, eliminated manual overhead, elevated instructor experience, fostered proactive culture",
    fullContent: {
      challenge: `Our national training calendar was mission critical, yet the team operated in the dark. Registration data lived in WooCommerce, attendance lived in Gravity Forms, and instructor notes lived in scattered spreadsheets. Operations had no early warning when a class was under-enrolled, regional sales couldn't see which markets were heating up, and instructors lacked the real-time context they needed to deliver great experiences. We were making six-figure decisions on instinct instead of data.`,
      strategy: `I architected a central operations console that stitched every signal together and surfaced what mattered in real time.

**Platform Architecture:**

- **Data Pipeline:** Nightly Node.js workers pulled transactional data from WooCommerce, merged it with Gravity Forms surveys, and synced instructor feedback captured in Airtable.
- **Unified API Layer:** A custom Laravel API normalized the aggregate dataset and exposed role-based endpoints for operations, finance, and faculty coordinators.
- **Actionable UI:** Built a React dashboard with heat maps, risk flags, and automated nudges. GSAP timelines highlighted events trending toward cancellation while positive outliers triggered "replicate" callouts.
- **Alerting & Automations:** Slack alerts fired when enrollment dipped below 60% capacity, automatically assigning playbooks for marketing, sales, or instructor outreach.`,
      impact: `The Command Center shifted the team from reactive firefighting to proactive orchestration.

- **Revenue Protection:** At-risk classes were identified three weeks earlier on average, giving marketing time to recover projected revenue.
- **Instructor Confidence:** Faculty saw travel details, rosters, and satisfaction history in one place, elevating the learner experience.
- **Operational Efficiency:** Manual spreadsheet updates disappeared, saving directors 12+ hours per week and standardizing reporting for leadership.
- **Cultural Shift:** With a living source of truth, cross-functional teams collaborated around the same KPIs, accelerating decision cycles.

This initiative demonstrates full-stack system design—data engineering, API architecture, and experiential UI—delivered in service of measurable business resilience.`,
    },
    featured: true
  },
  {
    slug: "the-closer",
    title: "The Closer",
    image: "/images/auto-generated/case-studies/the-closer.webp",
    tagline: "Engineering a Frictionless Sales Pipeline that Converts High-Value Quotes into Revenue with Pay-by-Link and Flexible Financing",
    category: ["Marketing Systems", "Automation"],
    tags: ["PHP", "Stripe API", "WooCommerce", "Gravity Forms", "ACF"],
    technologies: ["PHP", "WordPress", "WooCommerce", "Stripe", "Gravity Forms", "ACF"],
    metrics: [
      { label: "Close Rate Increase", value: "+35%" },
      { label: "Sales Cycle Reduction", value: "Days → Minutes" },
      { label: "New Revenue Stream", value: "Payment Plans" }
    ],
    challenge: "Manual invoice process creating sales pipeline leakage, lack of payment plan options blocking high-value sales",
    strategy: "Fully integrated quote-to-order automation with dynamic payment plans via Stripe API and pay-by-link checkout",
    impact: "Significant lift in close rates, unlocked new market segments, increased sales team efficiency, improved financial oversight",
    fullContent: {
      challenge: `Our sales team excelled at securing verbal commitments for high-value training bundles over the phone, but the final step—getting paid—was a point of major friction. The process was manual and disjointed. A sales rep would have to create an invoice, email it, and then coordinate with the customer to process a payment. This delay introduced a critical cooling-off period where customer intent could wane, leading to a leaky sales pipeline. Furthermore, the lack of accessible payment plans for our premium packages was a direct barrier to entry for many clients. We were leaving significant revenue on the table and burdening our sales team with administrative work instead of selling.`,
      strategy: `My vision was to create a seamless, end-to-end system that would take a customer from a verbal "yes" to a completed order in minutes. I architected and built a full-stack solution that deeply integrated our forms, e-commerce platform, and payment gateway.

**Technical Architecture:**

- **Dynamic Quote Generation:** Customized Gravity Form acting as dynamic quote-builder
- **Automated Order Creation via PHP:** Custom PHP function hooked into gform_after_submission programmatically creating WC_Order objects with intelligent parsing, product addition, discount application, and pending payment status
- **Flexible Payment Plan Engine:** ACF-powered admin interface allowing finance team to define payment plans without code. Custom PHP logic reading ACF rules and leveraging Stripe PHP SDK to dynamically create subscriptions and multi-payment intent schedules
- **Seamless Checkout Experience:** Utilizing get_checkout_payment_url() to generate secure pay-by-link, automatically emailed for one-click finalization`,
      impact: `This automated system completely transformed our phone sales process from a liability into a strategic advantage.

- **Significant Lift in Close Rates:** Removed payment friction and reduced sales cycle from days to minutes with measurable conversion increase
- **Opened New Market Segments:** Stripe-powered payment plans made premium offerings accessible, unlocking previously untapped revenue
- **Increased Sales Team Efficiency:** Automation liberated reps from administrative tasks to focus on relationships and lead generation
- **Improved Financial Oversight:** Clear, real-time visibility in WooCommerce and Stripe dashboards simplified reconciliation and forecasting

This project highlights full-stack development and process automation expertise—leveraging PHP, ACF, and Stripe API to solve sales bottlenecks and drive top-line revenue growth.`,
    },
    featured: true
  },
  {
    slug: "the-spotlight",
    title: "The Spotlight",
    image: "/images/auto-generated/case-studies/the-spotlight.webp",
    tagline: "Proving Membership ROI and Driving Retention with a Data-Driven Analytics Dashboard",
    category: ["Data & Analytics"],
    tags: ["Google Analytics API", "PHP", "JavaScript", "Chart.js", "WP Cron"],
    metrics: [
      { label: "Churn Reduction", value: "40%" },
      { label: "Member Engagement", value: "+60%" },
      { label: "Upsell Conversion", value: "+25%" }
    ],
    challenge: "Members couldn't see directory value, creating constant churn risk at renewal periods",
    strategy: "Self-serve analytics dashboard with GA4 API integration, strategic benchmarking, and intuitive visualizations",
    impact: "Dramatically reduced churn, increased member engagement, created upsell opportunities, empowered members with business intelligence",
    fullContent: {
      challenge: `Our Provider Directory was a cornerstone of our membership offering, yet we faced a critical business risk: our members had no way of knowing if it was actually delivering value. Their profile was a "black box." They couldn't see how many potential customers viewed their listing, clicked their website link, or found them through specific channels. This lack of tangible ROI data created a constant churn risk. At every renewal period, members were forced to ask, "Is this membership worth the cost?" Without a concrete, data-backed answer, we were vulnerable to losing them. We needed to stop telling them the directory was valuable and start showing them.`,
      strategy: `My strategy was to transform the directory from a passive listing into an active, value-generating asset. I architected and built a custom, self-serve analytics dashboard that gave each provider a clear, undeniable view of their profile's performance.

**Multi-Layered Technical Solution:**

- **Automated Data Sync with GA4:** Backend process communicating directly with Google Analytics Data API. Robust PHP script on nightly WP Cron job securely authenticating, fetching key metrics (views, clicks, engagement), and retrieving top traffic sources
- **Efficient Data Storage & Mapping:** Storing fetched analytics in WordPress database mapped to provider profiles in postmeta table, creating fast, scalable local data source
- **Intuitive Frontend Visualization:** Custom dashboard with Chart.js transforming raw data into digestible line graphs, bar charts, and clear KPIs
- **Strategic Benchmarking Engine:** Custom PHP/SQL query calculating average performance across all providers, displaying performance benchmarked against peers (e.g., "+18% more clicks than average")`,
      impact: `The Spotlight dashboard became one of our most powerful tools for engagement and retention, fundamentally strengthening the entire membership program.

- **Dramatically Reduced Churn:** Concrete proof of ROI answered "Is this worth it?" with hard data, becoming cornerstone of renewal strategy
- **Increased Member Engagement:** Visible results incentivized profile improvements. Benchmarking created powerful feedback loop driving better content
- **Created Upsell Opportunities:** Data provided natural pathway for sales conversations about upgraded featured listings with evidence-backed benefits
- **Empowered Members:** Actionable business intelligence showing effective traffic sources and campaign correlation made platform indispensable for growth

This project demonstrates ability to leverage third-party APIs (GA4), architect scalable backend processes (PHP, WP Cron, SQL), and build intuitive frontend experiences (JavaScript) to solve core business problems.`,
    },
    featured: true
  },
  {
    slug: "the-compass",
    title: "The Compass",
    image: "/images/auto-generated/case-studies/the-compass.webp",
    tagline: "Forging a Foundation of Truth to Power Accurate, Data-Driven Marketing Decisions",
    category: ["Data & Analytics", "Marketing Systems"],
    tags: ["Google Tag Manager", "GA4", "PHP", "Data Layer", "Attribution"],
    technologies: ["PHP", "WordPress", "Google Tag Manager", "GA4", "JavaScript"],
    metrics: [
      { label: "ROAS Improvement", value: "+85%" },
      { label: "Wasted Spend Reduction", value: "60%" },
      { label: "Data Accuracy", value: "99.8%" }
    ],
    challenge: "Broken analytics with chaotic GTM, inaccurate conversion data causing wasted ad spend and poor decision-making",
    strategy: "Complete GTM/GA4 overhaul with server-side data layer, normalized event schema, and ad platform re-optimization",
    impact: "Massive ROAS improvement, eliminated wasted spend, restored trust in data, enabled true performance marketing",
    fullContent: {
      challenge: `Our marketing analytics were fundamentally broken. We were making high-stakes budget decisions based on data we couldn't trust. The root of the problem was a chaotic Google Tag Manager (GTM) container riddled with legacy tags, inconsistent triggers, and a non-existent data layer schema. This technical debt created disastrous business consequences: our attribution models were fiction, ad platforms like Google and Meta were optimizing for noisy, inaccurate conversion signals, and we were hemorrhaging money on wasted ad spend. Without a reliable source of truth, we were flying blind, unable to discern which campaigns were truly driving growth and which were simply burning cash. This eroded leadership's confidence and handicapped our ability to scale effectively.`,
      strategy: `My objective was to tear down the crumbling foundation and rebuild it with precision, reliability, and scalability in mind. This required a meticulous, full-funnel approach, from the server's backend to the ad platform's API.

**Comprehensive Rebuild Approach:**

- **Strategic Audit & Schema Design:** Comprehensive GTM/analytics audit, then designed normalized event schema—standardized dictionary for every user interaction ensuring consistent, structured data
- **Server-Side Data Layer Implementation:** Moved logic from unreliable client-side to secure server-side using PHP and WordPress hooks. Injected clean, validated data pre-render using gform_after_submission and woocommerce_thankyou hooks
- **GTM Reconfiguration:** Rebuilt container from ground up with custom event triggers based on new schema, configured data layer variables, removed legacy tags
- **Ad Platform Re-Optimization:** Reconfigured platforms with high-fidelity server-side events as primary conversion goals, retraining ML algorithms for genuine high-intent actions`,
      impact: `This foundational project had a ripple effect across the entire marketing department, delivering immediate and long-term value.

- **Massive ROAS Improvement:** Clean, reliable conversion data enabled ad platform optimization as intended with significant, sustained ROAS lift and sharp CPA decrease
- **Elimination of Wasted Spend:** Sharp reduction in false-positive conversions stopped budget waste on non-performing traffic
- **Restored Trust in Data:** Established single, unimpeachable source of truth giving leadership trustworthy dashboards for confident strategic decisions
- **Enabled True Performance Marketing:** Accurate attribution and clear customer journey view enabled doubling down on what works, cutting what doesn't, and intelligent scaling

This project showcases technical marketing architecture expertise, demonstrating robust data pipeline design using PHP, WordPress hooks, and GTM to drive marketing efficiency and profitability.`,
    },
    featured: true
  },
  {
    slug: "the-pipeline",
    title: "The Pipeline",
    image: "/images/auto-generated/case-studies/the-pipeline.webp",
    tagline: "Engineering a Flawless, Zero-Touch Student Journey from Purchase to Certification",
    category: ["Automation", "Systems"],
    tags: ["WooCommerce", "LearnDash", "WP Fusion", "Gravity Forms", "Workflow Automation"],
    technologies: ["WordPress", "WooCommerce", "LearnDash", "WP Fusion", "Gravity Forms", "FluentCRM"],
    metrics: [
      { label: "Error Reduction", value: "Near-Zero" },
      { label: "Support Tickets", value: "-75%" },
      { label: "Automation Rate", value: "100%" }
    ],
    challenge: "Fragmented student journey with manual handoffs between purchase, enrollment, and certification causing errors and delays",
    strategy: "End-to-end automation pipeline connecting WooCommerce, LearnDash, Gravity Forms, and FluentCRM with intelligent triggers",
    impact: "Eliminated delays/errors, massive support reduction, elevated brand perception, created scalable foundation",
    fullContent: {
      challenge: `Our student journey was fragmented and prone to manual error. The handoffs between their purchase in WooCommerce, their course enrollment in LearnDash, and their profile segmentation in our CRM were inconsistent and required manual intervention. These were digital fault lines where students could easily fall through the cracks. This created a poor user experience, characterized by frustrating delays in receiving course access or certificates. The result was a high volume of preventable support tickets ("Why can't I access my course?", "Where is my certificate?") that damaged our brand's reputation for professionalism and consumed valuable administrative time. We couldn't scale our offerings if the operational backend was held together by manual effort.`,
      strategy: `My goal was to weld these disparate platforms together into a single, intelligent, and fully automated pipeline. I designed a "lights-out" system where the student journey would flow from one stage to the next without any human intervention.

**Automated Workflow Sequence:**

- **Purchase Trigger:** Pipeline initiated by woocommerce_order_status_completed hook ensuring automation begins only after successful payment
- **Intelligent Enrollment:** Custom function utilizing LearnDash API to instantly enroll student in correct course and add to corresponding LearnDash Group for cohort communication
- **Automated Evaluation:** Upon completion, learndash_course_completed hook automatically sends evaluation form link built in Gravity Forms
- **CRM Data Bridge:** WP Fusion processes form submission, logs data, and applies specific tags to FluentCRM profile (completed-course-101, passed-evaluation-2025)
- **Unlocking Certification:** Final "passed" tag in CRM instantly updates WordPress user metadata, automatically unlocking official certificate download in LearnDash profile`,
      impact: `The implementation of this automated pipeline completely overhauled our student experience and internal operations.

- **Eliminated Delays and Errors:** Near-zero certificate and enrollment delays achieved by removing manual data entry and handoffs
- **Massive Reduction in Support Overhead:** Notable immediate decrease in related support tickets freed team for high-value student guidance
- **Elevated Brand Perception:** Seamless, professional, instant journey from purchase to certificate builds trust and reinforces premium quality
- **Created Scalable Foundation:** Removed operational bottleneck limiting growth—can now scale student volume infinitely without increasing administrative headcount

This project demonstrates process automation and deep platform integration expertise using WooCommerce, LearnDash, Gravity Forms, and WP Fusion stack.`,
    },
    featured: true
  },
  {
    slug: "the-fortress",
    title: "The Fortress",
    image: "/images/auto-generated/case-studies/the-fortress.webp",
    tagline: "Building a Digital Fortress at the Edge to Protect Revenue, Enhance Performance, and Neutralize Threats",
    category: ["Systems"],
    tags: ["Cloudflare", "WAF", "Security", "Performance", "Edge Computing"],
    metrics: [
      { label: "Threats Blocked", value: "85K+/month" },
      { label: "Cache Hit Ratio", value: "86%" },
      { label: "Performance Improvement", value: "+200%" }
    ],
    challenge: "Site under constant attack from bots and scrapers, causing server strain, slow speeds, and security vulnerabilities",
    strategy: "Multi-layered edge security with Cloudflare WAF, rate limiting, bot mitigation, and intelligent caching strategy",
    impact: "Proactive threat neutralization, enhanced performance/conversions, bulletproof stability, reduced server costs",
    fullContent: {
      challenge: `Our high-traffic WordPress site was under constant, invisible siege. Malicious bots, brute-force login attempts, and automated content scrapers were hitting our server thousands of times a day. While our server-level defenses caught some threats, this reactive posture was fundamentally flawed. It was like trying to stop a flood after the water was already inside the house. This constant barrage was causing significant server strain, leading to slower page load times that hurt our SEO and conversion rates. More critically, it created security vulnerabilities that put customer data and the very stability of our revenue-critical platform at risk. We needed to evolve from a reactive, server-level defense to a proactive, edge-first security strategy.`,
      strategy: `The core of my strategy was to move the security perimeter away from our server and onto Cloudflare's global edge network, stopping threats long before they could cause harm. I architected and implemented a comprehensive, multi-layered security overhaul that created a digital fortress around our web property.

**Multi-Layered Defense Architecture:**

- **WAF Implementation:** Deployed Cloudflare WAF configured with OWASP Core Ruleset blocking common attack vectors (SQL injections, XSS). Custom application-specific firewall rules blocking malicious networks and challenging suspicious user agents
- **Surgical Rate Limiting:** Identified vulnerable endpoints (wp-login.php, XML-RPC, critical AJAX actions) and applied surgical rate limiting stopping login attacks without impacting legitimate users
- **Intelligent Bot Mitigation:** Activated Bot Fight Mode—ML-driven system automatically identifying and challenging malicious bot traffic, defending against scrapers and vulnerability scanners
- **Performance as Security Layer:** Tiered caching strategy leveraging Cloudflare network achieving 86% cache hit ratio. Majority of requests served from edge, dramatically faster for users while absorbing traffic and shielding origin server`,
      impact: `This edge security overhaul transformed our site's resilience, performance, and overall security posture, delivering clear business value.

- **Proactive Threat Neutralization:** Formidable defense blocking 85,000+ malicious hits monthly. Shifted from reactive cleanup to proactive prevention
- **Enhanced Performance and Conversions:** Significantly improved TTFB and LCP metrics. Faster user experience directly contributes to higher conversion rates and better SEO rankings
- **Bulletproof Stability and Uptime:** Ensures business continuity even during coordinated attacks, protecting revenue and brand reputation 24/7
- **Reduced Server Load and Costs:** Absorbing malicious traffic and serving cached content dramatically reduced CPU/bandwidth load, improving stability and lowering hosting costs

This project demonstrates ability to architect enterprise-grade security and performance solution using Cloudflare, translating technical features into core business protections.`,
    },
    featured: true
  },
  {
    slug: "the-safety-net",
    title: "The Safety Net",
    image: "/images/auto-generated/case-studies/the-safety-net.webp",
    tagline: "Enabling Marketing Agility with an Automated, Zero-Risk Deployment Pipeline",
    category: ["Systems"],
    tags: ["CI/CD", "GitHub Actions", "DevOps", "WP-CLI", "Automation"],
    metrics: [
      { label: "Deployment Frequency", value: "Monthly → Daily" },
      { label: "Mean Time to Recover", value: "60min → 2min" },
      { label: "Deployment Risk", value: "Near-Zero" }
    ],
    challenge: "Manual, high-risk deployments via FTP stifling innovation, delaying campaigns, creating fear of deploying",
    strategy: "Full CI/CD pipeline with GitHub Actions, automated testing, health checks, and instant rollback capabilities",
    impact: "Eliminated deployment risk, increased velocity, drastically reduced MTTR, fostered innovation culture",
    fullContent: {
      challenge: `Our development process was defined by risk and fear. Deployments were a manual, high-stakes procedure involving FTP, ad-hoc database changes, and a lot of hope. This created a culture of hesitation. A single bad deploy could take our revenue-critical site offline for an hour or more, requiring a stressful, all-hands-on-deck scramble to fix. Consequently, the business paid a high price: marketing campaigns were delayed, simple content updates were bundled into large, infrequent releases, and the entire team lost the ability to be nimble and responsive. We couldn't innovate at the speed the market demanded because our own process was holding us back.`,
      strategy: `My goal was to transform deployments from a source of anxiety into a routine, automated non-event. I designed and implemented a complete Continuous Integration/Continuous Deployment (CI/CD) pipeline using GitHub Actions, turning our repository into the single source of truth and the engine for all site updates.

**Automated Workflow Stages:**

- **Continuous Integration (CI):** GitHub Actions workflow on every push automatically spins up clean environment, installs dependencies via Composer/NPM, compiles frontend assets, runs automated quality checks and linting, packages validated code into versioned build artifact
- **Continuous Deployment (CD):** On main branch merge, deployment stage triggers: GitHub Action securely connects via SSH, deploys latest build using rsync, post-deployment script uses WP-CLI for cache flush, database updates, and permalink refresh
- **The Safety Net—Automated Health Checks & Instant Rollback:** After deployment, pipeline runs health check series (curl confirming 200 OK on key pages). On success: Slack success message. On failure: Instant automatic rollback to previous stable artifact with detailed Slack alert, ensuring near-zero catastrophic downtime`,
      impact: `This CI/CD pipeline fundamentally changed our operational cadence and culture, empowering the entire business to move faster and more safely.

- **Eliminated Deployment Risk:** Automated testing and instant rollback removed danger of bad deploys. Shipping code during peak traffic became routine, low-stress event
- **Increased Deployment Velocity:** Moved from large, risky monthly releases to small, incremental updates deployed multiple times daily, enabling rapid campaign launches and A/B tests
- **Drastically Reduced MTTR:** Recovery time dropped from 60+ minutes of manual work to under 2 minutes of automated rollback
- **Fostered Innovation Culture:** Removing fear of failure empowered developers and marketers to experiment. Cultural shift toward agility and confidence became significant competitive advantage

This project demonstrates DevOps and modern development workflow expertise, showing how GitHub Actions and WP-CLI orchestrate a resilient safety net unlocking true business agility.`
    }
  }
];

// Helper function to get unique categories
export const getCategories = (): string[] => {
  const categories = new Set<string>();
  for (const study of caseStudies) {
    for (const cat of study.category) {
      categories.add(cat);
    }
  }
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
};

// Helper function to get unique tags
export const getTags = (): string[] => {
  const tags = new Set<string>();
  for (const study of caseStudies) {
    for (const tag of study.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
};

// Helper function to get case study by slug
export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.slug === slug);
};

// Helper function to get featured case studies
export const getFeaturedCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter(study => study.featured);
};