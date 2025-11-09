/**
 * Technology descriptions and usage information
 * Used for tooltips and tool information displays
 */

export interface TechDescription {
  name: string;
  description: string;
  usage: string;
}

export const techDescriptions: Record<string, TechDescription> = {
  // Marketing Automation
  FluentCRM: {
    name: 'FluentCRM',
    description:
      'A powerful WordPress-native CRM and marketing automation platform that integrates seamlessly with WooCommerce and LearnDash.',
    usage:
      "Building automated email sequences, lead scoring systems, and customer journey workflows for healthcare and training businesses. I've built 400+ automations that handle everything from lead nurturing to post-purchase follow-ups.",
  },
  ActiveCampaign: {
    name: 'ActiveCampaign',
    description:
      'Advanced email marketing, marketing automation, and CRM platform with powerful segmentation and automation capabilities.',
    usage:
      'Creating sophisticated multi-channel marketing campaigns with conditional logic, A/B testing, and behavioral triggers. Used for complex lead nurturing sequences that adapt based on user interactions.',
  },
  Mailchimp: {
    name: 'Mailchimp',
    description:
      'All-in-one marketing platform for email campaigns, automation, and audience management.',
    usage:
      'Managing email campaigns for smaller clients and running segmented campaigns based on purchase history and engagement metrics. Great for businesses needing straightforward email marketing without heavy automation complexity.',
  },
  'WP Fusion': {
    name: 'WP Fusion',
    description:
      'WordPress plugin that syncs user data and tags between WordPress and 40+ CRM and marketing automation platforms.',
    usage:
      'Connecting WordPress user actions to CRM platforms, syncing course progress from LearnDash to ActiveCampaign tags, and automating list management based on WooCommerce purchases.',
  },
  Zapier: {
    name: 'Zapier',
    description:
      'No-code automation platform that connects apps and services together with automated workflows called Zaps.',
    usage:
      "Creating integrations between tools that don't natively connect—like syncing form submissions to multiple CRMs, updating Google Sheets from WooCommerce orders, and triggering Slack notifications for key events.",
  },
  'Make (Integromat)': {
    name: 'Make (Integromat)',
    description:
      'Visual automation platform with advanced data transformation and complex workflow capabilities.',
    usage:
      'Building complex multi-step automations with data transformations, error handling, and conditional logic. Used for sophisticated data pipelines that require more power than Zapier provides.',
  },

  // CDN/Security
  Cloudflare: {
    name: 'Cloudflare',
    description:
      'Global CDN, DDoS protection, web application firewall, and DNS management platform.',
    usage:
      'Deploying enterprise-grade security with WAF rules, bot management, and DNSSEC. I configure Cloudflare to cache static assets, protect against attacks, and optimize site performance globally. Essential for high-traffic marketing sites.',
  },
  Netdata: {
    name: 'Netdata',
    description:
      'Real-time system and application performance monitoring with detailed metrics and visualization.',
    usage:
      'Monitoring server performance, database queries, and application health in real-time. Helps me identify bottlenecks, track Core Web Vitals, and ensure sites can handle traffic spikes from successful marketing campaigns.',
  },
  Wordfence: {
    name: 'Wordfence',
    description:
      'WordPress security plugin providing malware scanning, firewall protection, and login security.',
    usage:
      'Hardening WordPress installations with real-time threat defense, two-factor authentication enforcement, and malware scanning. Critical for protecting marketing sites that handle customer data.',
  },
  Sucuri: {
    name: 'Sucuri',
    description:
      'Website security platform offering malware scanning, firewall protection, and security monitoring.',
    usage:
      'Additional security layer for high-value client sites. Provides external malware scanning and DDoS protection to complement on-server security measures.',
  },
  'Cloudflare Tunnel': {
    name: 'Cloudflare Tunnel',
    description:
      "Secure connection method that creates encrypted tunnels between your infrastructure and Cloudflare's network without exposing public IPs.",
    usage:
      'Securely connecting development and staging environments to Cloudflare without opening firewall ports. Essential for testing marketing automation flows in secure environments before production deployment.',
  },

  // Analytics
  GTM: {
    name: 'Google Tag Manager',
    description:
      'Tag management system that allows you to manage marketing tags without editing code.',
    usage:
      'Managing all tracking pixels, conversion tags, and analytics scripts from one central dashboard. I use GTM to deploy tracking for Google Ads, Meta Ads, LinkedIn Ads, and custom events without touching site code—crucial for rapid campaign launches.',
  },
  'Google Tag Manager': {
    name: 'Google Tag Manager',
    description:
      'Tag management system that allows you to manage marketing tags without editing code.',
    usage:
      'Managing all tracking pixels, conversion tags, and analytics scripts from one central dashboard. I use GTM to deploy tracking for Google Ads, Meta Ads, LinkedIn Ads, and custom events without touching site code—crucial for rapid campaign launches.',
  },
  GA4: {
    name: 'Google Analytics 4',
    description:
      'Next-generation analytics platform with event-based tracking and advanced machine learning insights.',
    usage:
      'Tracking user journeys across marketing campaigns, measuring conversion funnels, and analyzing customer behavior. I set up custom events for form submissions, course enrollments, and e-commerce transactions to measure marketing ROI.',
  },
  'Google Analytics 4': {
    name: 'Google Analytics 4',
    description:
      'Next-generation analytics platform with event-based tracking and advanced machine learning insights.',
    usage:
      'Tracking user journeys across marketing campaigns, measuring conversion funnels, and analyzing customer behavior. I set up custom events for form submissions, course enrollments, and e-commerce transactions to measure marketing ROI.',
  },
  Umami: {
    name: 'Umami',
    description:
      "Simple, privacy-focused web analytics platform that doesn't use cookies and is GDPR compliant.",
    usage:
      'Providing privacy-respecting analytics for clients who want to track site performance without cookie consent banners. Great for international clients needing GDPR compliance while still understanding user behavior.',
  },
  Hotjar: {
    name: 'Hotjar',
    description:
      'Behavior analytics platform providing heatmaps, session recordings, and user feedback tools.',
    usage:
      'Understanding how users interact with landing pages and checkout flows. Heatmaps reveal where users click, scroll, and get confused—essential data for optimizing conversion rates on marketing landing pages.',
  },
  'Microsoft Clarity': {
    name: 'Microsoft Clarity',
    description:
      'Free analytics tool providing heatmaps, session recordings, and insights into user behavior.',
    usage:
      'Analyzing user behavior on high-traffic pages to identify friction points. Session recordings show me exactly where users struggle in checkout flows or form completions, helping me optimize conversion rates.',
  },

  // Advertising
  'Google Ads': {
    name: 'Google Ads',
    description:
      "Online advertising platform for running search, display, video, and shopping ads on Google's network.",
    usage:
      'Managing search campaigns, shopping ads for WooCommerce stores, and retargeting campaigns. I optimize ad copy, landing pages, and bidding strategies to maximize ROI—critical for driving qualified leads and sales.',
  },
  'Meta Ads': {
    name: 'Meta Ads',
    description:
      'Advertising platform for Facebook and Instagram with advanced targeting and creative optimization.',
    usage:
      "Running highly targeted campaigns for healthcare practices and training programs. I use Meta's detailed targeting to reach specific demographics and interests, then optimize for conversions using custom conversion events and A/B testing.",
  },
  'LinkedIn Ads': {
    name: 'LinkedIn Ads',
    description:
      'B2B advertising platform with professional targeting based on job title, company, and industry.',
    usage:
      'Targeting healthcare professionals and business decision-makers for B2B marketing campaigns. Essential for reaching practitioners who need continuing education or practice management tools.',
  },
  'PixelYourSite Pro': {
    name: 'PixelYourSite Pro',
    description:
      'WordPress plugin that helps manage and deploy Facebook Pixel and other tracking pixels correctly.',
    usage:
      'Ensuring accurate Facebook Pixel firing across WooCommerce, form submissions, and custom events. This plugin helps me track the complete customer journey from ad click to purchase, enabling proper attribution and campaign optimization.',
  },
  OptinMonster: {
    name: 'OptinMonster',
    description:
      'Lead generation and conversion optimization platform with popups, forms, and exit-intent technology.',
    usage:
      'Creating targeted popups for email capture, course promotions, and abandoned cart recovery. Exit-intent popups help me convert leaving visitors into leads, and I use A/B testing to optimize conversion rates.',
  },

  // E-commerce
  WooCommerce: {
    name: 'WooCommerce',
    description:
      'WordPress e-commerce plugin for building online stores and selling products, courses, and subscriptions.',
    usage:
      'Building custom e-commerce stores for course sales, digital products, and physical goods. I customize WooCommerce with custom checkout flows, subscription management, and integration with marketing automation platforms.',
  },
  Stripe: {
    name: 'Stripe',
    description:
      'Payment processing platform with APIs for accepting online payments, subscriptions, and managing billing.',
    usage:
      'Processing payments securely for course enrollments, software subscriptions, and one-time purchases. I integrate Stripe with WooCommerce and use webhooks to trigger marketing automation based on payment events.',
  },
  PayPal: {
    name: 'PayPal',
    description:
      'Global payment platform for accepting online payments and managing customer transactions.',
    usage:
      'Offering alternative payment methods to increase conversion rates. Many customers prefer PayPal, so I integrate it alongside Stripe to reduce checkout abandonment and capture more sales.',
  },
  'Easy Digital Downloads': {
    name: 'Easy Digital Downloads',
    description:
      'WordPress plugin for selling digital products like software, ebooks, and downloadable files.',
    usage:
      "Selling digital products that don't require the full WooCommerce feature set. Lighter weight and perfect for simple download sales with licensing and access control.",
  },
  MemberPress: {
    name: 'MemberPress',
    description:
      'WordPress membership plugin for creating membership sites, courses, and subscription content.',
    usage:
      'Building membership sites with tiered access levels, subscription management, and course content protection. Integrates with marketing automation to sync member status and trigger welcome sequences.',
  },

  // Hosting & Infrastructure
  'Liquid Web': {
    name: 'Liquid Web',
    description:
      'Managed WordPress and cloud hosting provider with enterprise-grade infrastructure and support.',
    usage:
      'Hosting high-traffic marketing sites and e-commerce stores. Their managed WordPress hosting handles automatic updates, security, and scaling—critical for sites that experience traffic spikes from successful campaigns.',
  },
  Vercel: {
    name: 'Vercel',
    description:
      'Platform for deploying frontend applications with automatic SSL, global CDN, and serverless functions.',
    usage:
      'Deploying React-based marketing sites and applications with instant global performance. Perfect for portfolio sites, landing pages, and client showcases that need blazing-fast load times.',
  },
  Netlify: {
    name: 'Netlify',
    description:
      'Platform for deploying static sites and serverless functions with continuous deployment from Git.',
    usage:
      'Deploying static marketing sites, documentation, and client portals. Forms, redirects, and edge functions help me build marketing tools without managing servers.',
  },
  Apache: {
    name: 'Apache',
    description: 'Open-source web server software powering millions of websites worldwide.',
    usage:
      'Configuring server settings for optimal WordPress performance. I tune Apache modules, enable compression, and configure rewrite rules for SEO-friendly URLs and security.',
  },
  Nginx: {
    name: 'Nginx',
    description: 'High-performance web server and reverse proxy known for speed and efficiency.',
    usage:
      'Serving as a reverse proxy in front of Apache for improved performance. Nginx handles static files efficiently while Apache processes PHP, creating a fast and reliable stack for high-traffic sites.',
  },
  'PHP-FPM': {
    name: 'PHP-FPM',
    description:
      'FastCGI Process Manager for PHP that improves PHP performance and resource usage.',
    usage:
      'Optimizing PHP execution for WordPress and WooCommerce. I configure PHP-FPM pools to handle traffic efficiently, preventing server overload during traffic spikes from marketing campaigns.',
  },

  // WordPress Core
  'WP-CLI': {
    name: 'WP-CLI',
    description:
      'Command-line interface for managing WordPress installations, plugins, themes, and database operations.',
    usage:
      'Automating WordPress maintenance tasks, bulk plugin updates, database optimizations, and deployment workflows. Essential for managing multiple client sites efficiently without logging into each dashboard.',
  },
  'MU Plugins': {
    name: 'Must-Use Plugins',
    description:
      'WordPress plugins that are automatically loaded and cannot be deactivated, stored in wp-content/mu-plugins.',
    usage:
      'Deploying custom functionality that must always run—like custom post types, API integrations, and security enhancements. MU plugins ensure critical code runs regardless of theme or plugin conflicts.',
  },
  'Cron Jobs': {
    name: 'WordPress Cron',
    description:
      "WordPress's built-in pseudo-cron system for scheduling tasks and recurring events.",
    usage:
      'Scheduling automated tasks like sending email summaries, syncing data with external APIs, generating reports, and cleaning up old data. I configure wp-cron for marketing automation triggers and maintenance tasks.',
  },
  'CSS/SCSS': {
    name: 'CSS/SCSS',
    description:
      'Cascading Style Sheets and Sass preprocessor for styling web pages with variables and advanced features.',
    usage:
      'Creating custom designs, responsive layouts, and branded experiences. SCSS variables help me maintain consistent colors and spacing across large projects, while nested selectors keep code organized.',
  },
  'Git/GitHub': {
    name: 'Git & GitHub',
    description:
      'Git is a distributed version control system, and GitHub is a cloud-based platform for hosting Git repositories.',
    usage:
      'Version controlling all my code, managing deployments, and collaborating on projects. GitHub Actions automate my testing and deployment processes, ensuring code quality and consistent deployments.',
  },
  'Adobe Creative Suite': {
    name: 'Adobe Creative Suite',
    description:
      'Professional creative software suite including Photoshop, Illustrator, Premiere, and other design tools.',
    usage:
      'Advanced image editing, vector graphics, video editing, and professional design work. Photoshop and Illustrator are essential for high-quality marketing materials and brand assets that stand out.',
  },
  'Heartbeat API': {
    name: 'WordPress Heartbeat API',
    description:
      'WordPress feature that sends periodic AJAX requests to keep sessions alive and enable auto-saving.',
    usage:
      'Optimizing the Heartbeat API to reduce server load on high-traffic sites. I customize heartbeat intervals and disable it where unnecessary to improve performance without losing functionality.',
  },
  'REST API': {
    name: 'WordPress REST API',
    description:
      'RESTful API that provides programmatic access to WordPress content and functionality.',
    usage:
      'Integrating WordPress with external systems, mobile apps, and headless frontends. I use the REST API to connect WooCommerce with marketing automation platforms and build custom integrations.',
  },
  'Custom Post Types': {
    name: 'Custom Post Types',
    description:
      'WordPress feature allowing creation of custom content types beyond posts and pages.',
    usage:
      'Creating structured content types for case studies, team members, testimonials, and course content. Custom post types help me organize content for marketing sites and enable powerful querying and display options.',
  },

  // WordPress Plugins
  'Gravity Forms': {
    name: 'Gravity Forms',
    description:
      'Advanced WordPress form builder with conditional logic, calculations, and extensive add-ons.',
    usage:
      'Building complex multi-page forms for lead generation, course applications, and quote requests. Conditional logic and integrations with CRMs make it perfect for capturing qualified leads and automating follow-ups.',
  },
  WPForms: {
    name: 'WPForms',
    description:
      'User-friendly WordPress form builder with drag-and-drop interface and marketing integrations.',
    usage:
      'Creating quick contact forms, newsletter signups, and simple lead capture forms. Easier for clients to manage than Gravity Forms, while still offering powerful features like conditional logic and CRM integrations.',
  },
  LearnDash: {
    name: 'LearnDash',
    description:
      'Learning management system plugin for creating and selling online courses on WordPress.',
    usage:
      'Building comprehensive online training programs with quizzes, certificates, and progress tracking. I integrate LearnDash with FluentCRM to automatically enroll students, track progress, and trigger marketing sequences based on course completion.',
  },
  Divi: {
    name: 'Divi',
    description:
      'Visual page builder for WordPress with drag-and-drop design capabilities and pre-built layouts.',
    usage:
      "Rapidly building custom landing pages and marketing sites with visual design. Divi's flexibility helps me create unique pages without extensive custom development, perfect for campaign-specific landing pages.",
  },
  Elementor: {
    name: 'Elementor',
    description:
      'Drag-and-drop page builder for WordPress with extensive widgets and design options.',
    usage:
      'Creating custom page layouts and designs without coding. I use Elementor for building landing pages, sales pages, and marketing-focused site sections with complete design control.',
  },
  Autoptimize: {
    name: 'Autoptimize',
    description:
      'WordPress optimization plugin that minifies, combines, and caches CSS, JavaScript, and HTML.',
    usage:
      'Improving site performance by minifying code, combining files, and optimizing delivery. Essential for maintaining fast load times that impact SEO rankings and conversion rates.',
  },
  'Yoast SEO': {
    name: 'Yoast SEO',
    description:
      'WordPress SEO plugin providing on-page optimization, XML sitemaps, and schema markup.',
    usage:
      'Optimizing every page and post for search engines. I configure Yoast for proper meta descriptions, Open Graph tags for social sharing, and schema markup to help sites rank better in search results.',
  },
  'ACF Pro': {
    name: 'Advanced Custom Fields Pro',
    description:
      'WordPress plugin for adding custom fields and flexible content layouts to posts and pages.',
    usage:
      'Building custom page templates, flexible content blocks, and structured data for marketing sites. ACF Pro gives me the flexibility to create unique layouts while keeping content management simple for clients.',
  },

  // Programming Languages
  PHP: {
    name: 'PHP',
    description: 'Server-side scripting language powering WordPress and most dynamic websites.',
    usage:
      'Customizing WordPress themes and plugins, building custom functionality, and integrating with APIs. I write PHP for WooCommerce customizations, custom post type queries, and WordPress hooks/filters.',
  },
  JavaScript: {
    name: 'JavaScript',
    description:
      'Programming language for creating interactive web experiences and dynamic functionality.',
    usage:
      'Building interactive features, form validations, AJAX requests, and enhancing user experience. I use vanilla JavaScript for lightweight interactions and jQuery for WordPress plugin compatibility.',
  },
  TypeScript: {
    name: 'TypeScript',
    description: 'Typed superset of JavaScript that compiles to plain JavaScript with type safety.',
    usage:
      'Building React applications and modern web tools with type safety. TypeScript helps me catch errors early and maintain large codebases—essential for complex marketing automation tools and custom applications.',
  },
  jQuery: {
    name: 'jQuery',
    description: 'JavaScript library that simplifies DOM manipulation and event handling.',
    usage:
      'Adding interactive features to WordPress sites and ensuring compatibility with WordPress plugins. While I prefer modern JavaScript, jQuery is still necessary for many WordPress integrations and legacy code.',
  },
  SQL: {
    name: 'SQL',
    description: 'Structured Query Language for managing and querying relational databases.',
    usage:
      'Optimizing database queries, creating custom reports, and debugging performance issues. I write SQL queries to analyze WooCommerce sales data, export customer lists for campaigns, and optimize slow queries.',
  },
  CSS: {
    name: 'CSS',
    description: 'Cascading Style Sheets for styling and designing web pages.',
    usage:
      'Creating custom designs, responsive layouts, and branded experiences. I write CSS (and SCSS) to style marketing sites, landing pages, and ensure designs match brand guidelines perfectly.',
  },
  SCSS: {
    name: 'SCSS/Sass',
    description:
      'CSS preprocessor with variables, nesting, and functions for more maintainable stylesheets.',
    usage:
      'Organizing stylesheets with variables for colors and spacing, nested selectors for cleaner code, and mixins for reusable patterns. Makes maintaining large stylesheets much easier.',
  },
  HTML: {
    name: 'HTML',
    description: 'HyperText Markup Language, the standard markup language for web pages.',
    usage:
      'Structuring content, creating semantic markup for SEO, and building accessible interfaces. Clean, semantic HTML is the foundation for everything I build.',
  },

  // Frontend Development
  React: {
    name: 'React',
    description:
      'JavaScript library for building user interfaces with component-based architecture.',
    usage:
      "Building interactive marketing tools, portfolio sites, and custom applications. React's component model helps me create reusable UI elements and build complex interfaces efficiently. This portfolio site is built with React!",
  },
  'Framer Motion': {
    name: 'Framer Motion',
    description: 'Production-ready motion library for React with declarative animations.',
    usage:
      'Creating smooth animations, page transitions, and interactive experiences. I use Framer Motion throughout this portfolio for engaging animations that enhance user experience without impacting performance.',
  },
  'Tailwind CSS': {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapidly building custom designs.',
    usage:
      'Building modern, responsive interfaces quickly with utility classes. Tailwind lets me prototype rapidly and build production-ready designs without writing custom CSS for every element. Used extensively in this portfolio.',
  },
  Bootstrap: {
    name: 'Bootstrap',
    description: 'Popular CSS framework with responsive grid system and pre-built components.',
    usage:
      'Rapidly building responsive layouts for client sites. While I prefer Tailwind now, Bootstrap is still useful for projects that need a quick, consistent design system.',
  },
  Webpack: {
    name: 'Webpack',
    description: 'Module bundler for JavaScript applications that packages code for production.',
    usage:
      'Bundling JavaScript, processing CSS with loaders, and optimizing assets for production. Essential for building modern frontend applications with optimized bundle sizes.',
  },
  Vite: {
    name: 'Vite',
    description:
      'Next-generation frontend build tool with instant hot module replacement and fast builds.',
    usage:
      "Building modern React and TypeScript applications with lightning-fast development experience. Vite's speed makes development much more enjoyable, and this portfolio uses Vite for its build tooling.",
  },

  // Backend & APIs
  'Node.js': {
    name: 'Node.js',
    description: "JavaScript runtime built on Chrome's V8 engine for server-side development.",
    usage:
      'Building server-side tools, APIs, and automation scripts. Node.js lets me use JavaScript across the full stack, making it easier to share code and logic between frontend and backend.',
  },
  Express: {
    name: 'Express',
    description:
      'Fast, minimalist web framework for Node.js for building APIs and web applications.',
    usage:
      'Creating REST APIs, webhook endpoints, and server-side tools. Express is my go-to for building lightweight APIs that integrate with WordPress and marketing automation platforms.',
  },
  'REST APIs': {
    name: 'REST APIs',
    description:
      'Application Programming Interfaces following REST architectural principles for web services.',
    usage:
      'Integrating WordPress, WooCommerce, and LearnDash with external services. I build and consume REST APIs to connect marketing tools, sync data between platforms, and create custom integrations.',
  },
  Webhooks: {
    name: 'Webhooks',
    description:
      'HTTP callbacks that send real-time notifications when events occur in external systems.',
    usage:
      'Triggering marketing automation based on events like purchases, form submissions, or course completions. Webhooks ensure real-time data sync between WordPress, CRMs, and marketing platforms.',
  },
  'Cloudflare Workers': {
    name: 'Cloudflare Workers',
    description:
      "Serverless platform running on Cloudflare's edge network for running JavaScript at the edge.",
    usage:
      'Running lightweight scripts at the edge for A/B testing, request routing, and edge-side logic. Workers help me implement advanced functionality without touching server code.',
  },

  // Development Tools
  Git: {
    name: 'Git',
    description:
      'Distributed version control system for tracking changes in code and collaborating.',
    usage:
      'Version controlling all my code, managing deployments, and collaborating on projects. Git is essential for maintaining code quality and enabling safe, reversible changes.',
  },
  GitHub: {
    name: 'GitHub',
    description:
      'Cloud-based Git repository hosting and collaboration platform with issue tracking and CI/CD.',
    usage:
      'Hosting code repositories, managing project workflows, and collaborating with other developers. GitHub Actions automate my testing and deployment processes.',
  },
  'VS Code': {
    name: 'Visual Studio Code',
    description:
      'Free, open-source code editor with extensive extensions and integrated development tools.',
    usage:
      "My primary code editor for all development work. VS Code's extensions for WordPress, React, and TypeScript make development much more efficient.",
  },
  'GitHub Actions': {
    name: 'GitHub Actions',
    description:
      'CI/CD platform integrated with GitHub for automating workflows, testing, and deployments.',
    usage:
      'Automating testing, building, and deploying applications. GitHub Actions run linting, build processes, and deployments automatically when I push code—ensuring quality and consistency.',
  },
  Postman: {
    name: 'Postman',
    description:
      'API development and testing platform for designing, testing, and documenting APIs.',
    usage:
      'Testing API endpoints, debugging webhooks, and verifying integrations work correctly. Postman helps me quickly test REST APIs and webhook payloads during development.',
  },
  'Chrome DevTools': {
    name: 'Chrome DevTools',
    description:
      'Built-in browser developer tools for debugging, profiling, and optimizing web applications.',
    usage:
      'Debugging JavaScript, analyzing performance, optimizing Core Web Vitals, and testing responsive designs. DevTools are essential for diagnosing issues and optimizing site speed.',
  },

  // Design & Creative
  Figma: {
    name: 'Figma',
    description:
      'Collaborative interface design tool for creating user interfaces, prototypes, and design systems.',
    usage:
      'Designing user interfaces, creating mockups for landing pages, and collaborating with clients on designs. Figma helps me visualize designs before development and create design systems for consistent branding.',
  },
  Canva: {
    name: 'Canva',
    description:
      'Online design tool with templates for creating graphics, social media content, and marketing materials.',
    usage:
      'Quickly creating social media graphics, email headers, and simple marketing visuals. Perfect for rapid prototyping and client-accessible design creation.',
  },
  Adobe: {
    name: 'Adobe Creative Suite',
    description:
      'Professional creative software suite including Photoshop, Illustrator, and other design tools.',
    usage:
      'Advanced image editing, vector graphics, and professional design work. Photoshop and Illustrator are essential for high-quality marketing materials and brand assets.',
  },
  Photoshop: {
    name: 'Adobe Photoshop',
    description: 'Professional image editing and graphics creation software.',
    usage:
      'Editing photos for marketing materials, creating composite images, and preparing visuals for web and print. Essential for professional-quality marketing imagery.',
  },
  Illustrator: {
    name: 'Adobe Illustrator',
    description: 'Vector graphics editor for creating logos, illustrations, and scalable graphics.',
    usage:
      'Designing logos, icons, and vector graphics that scale perfectly. Illustrator is my tool of choice for brand identity work and creating graphics that need to work at any size.',
  },

  // Project Management
  Notion: {
    name: 'Notion',
    description:
      'All-in-one workspace for notes, documentation, project management, and collaboration.',
    usage:
      "Managing projects, documenting processes, and organizing client information. Notion's flexibility helps me track marketing campaigns, plan content strategies, and maintain project documentation.",
  },
  Asana: {
    name: 'Asana',
    description: 'Project management and task tracking platform for teams and workflows.',
    usage:
      'Managing complex marketing projects with multiple stakeholders. Asana helps me track campaign timelines, assign tasks, and maintain visibility across project stages.',
  },
  Trello: {
    name: 'Trello',
    description:
      'Visual project management tool using boards, lists, and cards for organizing work.',
    usage:
      "Organizing smaller projects and quick task lists. Trello's visual board system is perfect for content planning and simple project tracking.",
  },
  Slack: {
    name: 'Slack',
    description: 'Team communication platform with channels, direct messaging, and integrations.',
    usage:
      'Communicating with clients and team members, receiving notifications from tools, and maintaining project visibility. Slack integrations keep me informed about deployments, form submissions, and critical events.',
  },
  'Microsoft Teams': {
    name: 'Microsoft Teams',
    description: 'Collaboration platform with chat, video meetings, and file sharing.',
    usage:
      'Collaborating with enterprise clients who use Microsoft 365. Teams helps me communicate effectively with large organizations and maintain project communication.',
  },

  // SEO & Content
  'Rank Math': {
    name: 'Rank Math',
    description:
      'All-in-one SEO plugin for WordPress with advanced schema markup and optimization tools.',
    usage:
      "Alternative to Yoast with more advanced features. Rank Math's schema markup builder helps me implement structured data that improves search appearance and click-through rates.",
  },
  'Google Search Console': {
    name: 'Google Search Console',
    description:
      'Free tool from Google for monitoring site performance in search results and fixing issues.',
    usage:
      'Monitoring search rankings, identifying indexing issues, and understanding how Google sees my sites. Search Console data informs my SEO strategy and helps me fix technical issues that impact rankings.',
  },
  Ahrefs: {
    name: 'Ahrefs',
    description:
      'SEO toolset providing keyword research, backlink analysis, and competitor research.',
    usage:
      'Researching keywords, analyzing competitor strategies, and tracking backlink profiles. Ahrefs helps me develop SEO strategies and identify content opportunities that drive organic traffic.',
  },
  SEMrush: {
    name: 'SEMrush',
    description:
      'Digital marketing toolkit for SEO, PPC, content marketing, and competitive research.',
    usage:
      'Conducting keyword research, tracking rankings, and analyzing competitor strategies. SEMrush provides comprehensive data for building effective SEO and content marketing strategies.',
  },
  'Screaming Frog': {
    name: 'Screaming Frog SEO Spider',
    description: 'Desktop program for crawling websites and identifying technical SEO issues.',
    usage:
      'Auditing sites for technical SEO problems like broken links, duplicate content, and missing meta tags. Screaming Frog helps me identify and fix issues that impact search rankings.',
  },

  // Database
  MySQL: {
    name: 'MySQL',
    description:
      'Open-source relational database management system powering WordPress and many web applications.',
    usage:
      'Powering WordPress databases and storing all site content, user data, and e-commerce information. I optimize MySQL for performance and use it for custom queries and reporting.',
  },
  phpMyAdmin: {
    name: 'phpMyAdmin',
    description: 'Web-based interface for managing MySQL databases.',
    usage:
      'Managing WordPress databases, running custom queries, optimizing tables, and exporting data. phpMyAdmin is my tool for direct database access when needed.',
  },
  PostgreSQL: {
    name: 'PostgreSQL',
    description:
      'Advanced open-source relational database with advanced features and extensibility.',
    usage:
      'Powering custom applications that need advanced database features. PostgreSQL offers better performance and features for complex applications compared to MySQL.',
  },
  Redis: {
    name: 'Redis',
    description: 'In-memory data store used as a database, cache, and message broker.',
    usage:
      'Caching database queries and API responses to dramatically improve site speed. Redis caching is essential for high-traffic marketing sites that need sub-second load times.',
  },
  MongoDB: {
    name: 'MongoDB',
    description: 'NoSQL document database for storing flexible, schema-less data.',
    usage:
      'Storing unstructured data for custom applications and analytics. MongoDB is useful for projects that need flexible data structures or handle large volumes of variable data.',
  },
};

/**
 * Get description for a technology
 */
export const getTechDescription = (techName: string): TechDescription | null => {
  // Direct lookup
  if (techDescriptions[techName]) {
    return techDescriptions[techName];
  }

  // Case-insensitive lookup
  const lowerName = techName.toLowerCase();
  for (const [key, value] of Object.entries(techDescriptions)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }

  return null;
};
