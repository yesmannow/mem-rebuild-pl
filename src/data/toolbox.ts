export interface TechnicalCategory {
  title: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface TechnologyStack {
  category: string;
  icon: string;
  technologies: string[];
}

export const technicalCategories: TechnicalCategory[] = [
  {
    title: "Marketing Strategy & Planning",
    icon: "🎯",
    description: "Strategic marketing and campaign planning expertise",
    skills: [
      "Go-to-market strategy development",
      "Multi-channel campaign orchestration",
      "Customer journey mapping",
      "Marketing funnel optimization",
      "Competitive analysis & positioning",
      "Content strategy & editorial planning",
      "Marketing ROI analysis & forecasting"
    ]
  },
  {
    title: "Marketing Automation & CRM",
    icon: "🔄",
    description: "Customer relationship management and workflow automation",
    skills: [
      "FluentCRM automation workflows",
      "WooCommerce integration & optimization",
      "LearnDash LMS configuration",
      "Email marketing automation",
      "Lead scoring & nurturing",
      "Customer segmentation strategies",
      "Workflow trigger design"
    ]
  },
  {
    title: "Performance & Optimization",
    icon: "⚡",
    description: "Site speed, Core Web Vitals, and optimization expertise",
    skills: [
      "Cloudflare CDN & optimization",
      "WP Rocket caching strategies",
      "LiteSpeed Cache configuration",
      "Apache/PHP performance tuning",
      "Core Web Vitals optimization",
      "Database query optimization",
      "Image optimization & compression",
      "Lazy loading implementation"
    ]
  },
  {
    title: "Security & Infrastructure",
    icon: "🛡️",
    description: "Enterprise-grade security and infrastructure management",
    skills: [
      "Web Application Firewall (WAF)",
      "Bot Management & mitigation",
      "DNSSEC configuration",
      "API key hardening",
      "SSL/TLS configuration",
      "Cloudflare security setup",
      "WordPress security hardening",
      "Rate limiting implementation"
    ]
  },
  {
    title: "Analytics & Conversion Tracking",
    icon: "📊",
    description: "Advanced tracking, insights, and conversion optimization",
    skills: [
      "Google Tag Manager (GTM)",
      "Google Analytics 4 (GA4)",
      "Custom event scripting",
      "Conversion tracking & attribution",
      "E-commerce tracking",
      "Custom dashboards & reporting",
      "A/B testing & optimization",
      "Heatmap analysis"
    ]
  },
  {
    title: "Server Administration & DevOps",
    icon: "🖥️",
    description: "Cloud infrastructure and deployment expertise",
    skills: [
      "Server monitoring & alerting",
      "PHP upgrades & compatibility",
      "Debugging & troubleshooting",
      "Scalability optimization",
      "Linux server administration",
      "Apache/Nginx configuration",
      "MySQL database management",
      "CI/CD pipeline setup"
    ]
  },
  {
    title: "Content & Creative",
    icon: "🎨",
    description: "Brand development and content creation",
    skills: [
      "Brand identity development",
      "Visual design & layouts",
      "Content writing & copywriting",
      "Photography direction",
      "UX/UI design principles",
      "Landing page optimization",
      "Call-to-action design"
    ]
  },
  {
    title: "E-commerce & Payments",
    icon: "💳",
    description: "Online store management and payment processing",
    skills: [
      "WooCommerce store setup",
      "Stripe API integration",
      "Payment gateway configuration",
      "Subscription management",
      "Checkout optimization",
      "Product catalog management",
      "Order fulfillment automation"
    ]
  }
];

export const technologyStacks: TechnologyStack[] = [
  {
    category: "Marketing Automation & CRM",
    icon: "🔄",
    technologies: [
      "HubSpot",
      "Marketo",
      "Salesforce CRM",
      "FluentCRM",
      "ActiveCampaign",
      "Mailchimp",
      "WP Fusion",
      "Zapier",
      "Make (Integromat)"
    ]
  },
  {
    category: "CDN/Security",
    icon: "🛡️",
    technologies: [
      "Cloudflare",
      "Netdata",
      "Wordfence",
      "Sucuri",
      "Cloudflare Tunnel"
    ]
  },
  {
    category: "Analytics & Marketing Tools",
    icon: "📊",
    technologies: [
      "Google Analytics",
      "Google Tag Manager",
      "GA4",
      "Google Ads",
      "Facebook Ads Manager",
      "Meta Ads",
      "Google Search Console",
      "Umami",
      "Hotjar",
      "Microsoft Clarity"
    ]
  },
  {
    category: "Advertising",
    icon: "🌐",
    technologies: [
      "Google Ads",
      "Meta Ads",
      "LinkedIn Ads",
      "PixelYourSite Pro",
      "OptinMonster"
    ]
  },
  {
    category: "E-commerce",
    icon: "💳",
    technologies: [
      "WooCommerce",
      "Stripe",
      "PayPal",
      "Easy Digital Downloads",
      "MemberPress"
    ]
  },
  {
    category: "Hosting & Infrastructure",
    icon: "🖥️",
    technologies: [
      "Liquid Web",
      "Vercel",
      "Netlify",
      "Apache",
      "Nginx",
      "PHP-FPM"
    ]
  },
  {
    category: "WordPress Core",
    icon: "⚙️",
    technologies: [
      "WP-CLI",
      "MU Plugins",
      "Cron Jobs",
      "Heartbeat API",
      "REST API",
      "Custom Post Types"
    ]
  },
  {
    category: "WordPress Plugins",
    icon: "🔌",
    technologies: [
      "Gravity Forms",
      "WPForms",
      "LearnDash",
      "Divi",
      "Elementor",
      "Autoptimize",
      "Yoast SEO",
      "ACF Pro"
    ]
  },
  {
    category: "Programming Languages",
    icon: "💻",
    technologies: [
      "PHP",
      "JavaScript",
      "TypeScript",
      "jQuery",
      "SQL",
      "CSS/SCSS",
      "HTML"
    ]
  },
  {
    category: "Frontend Development",
    icon: "🚀",
    technologies: [
      "React",
      "Framer Motion",
      "Tailwind CSS",
      "Bootstrap",
      "Webpack",
      "Vite"
    ]
  },
  {
    category: "Backend & APIs",
    icon: "🔌",
    technologies: [
      "Node.js",
      "Express",
      "REST APIs",
      "Webhooks",
      "Cloudflare Workers"
    ]
  },
  {
    category: "Development Tools",
    icon: "🛠️",
    technologies: [
      "Git/GitHub",
      "VS Code",
      "GitHub Actions",
      "Postman",
      "Chrome DevTools"
    ]
  },
  {
    category: "Design & Creative",
    icon: "🎨",
    technologies: [
      "Figma",
      "Canva",
      "Adobe Creative Suite",
      "Photoshop",
      "Illustrator"
    ]
  },
  {
    category: "Project Management",
    icon: "📋",
    technologies: [
      "Notion",
      "Asana",
      "Trello",
      "Slack",
      "Microsoft Teams"
    ]
  },
  {
    category: "SEO & Content",
    icon: "🔍",
    technologies: [
      "Yoast SEO",
      "Rank Math",
      "Google Search Console",
      "Ahrefs",
      "SEMrush",
      "Screaming Frog"
    ]
  },
  {
    category: "Database",
    icon: "💾",
    technologies: [
      "MySQL",
      "phpMyAdmin",
      "PostgreSQL",
      "Redis",
      "MongoDB"
    ]
  }
];