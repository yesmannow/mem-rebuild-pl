import React from "react";
import { motion } from "framer-motion";
import { Zap, Target, BarChart3, RefreshCw, Palette, Code } from "lucide-react";
import "./ServicesSection.css";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}

const services: Service[] = [
  {
    icon: <Target size={32} />,
    title: "Marketing Strategy",
    description: "Data-driven strategies that align with business goals and drive measurable growth.",
    tags: ["Positioning", "Go-to-Market", "Competitive Analysis"]
  },
  {
    icon: <RefreshCw size={32} />,
    title: "Marketing Automation",
    description: "End-to-end automation systems that reduce manual work and increase efficiency.",
    tags: ["CRM Workflows", "Email Sequences", "Lead Nurturing"]
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Analytics & Optimization",
    description: "Full-funnel analytics and conversion optimization to maximize ROI.",
    tags: ["GA4", "Conversion Tracking", "A/B Testing"]
  },
  {
    icon: <Code size={32} />,
    title: "Systems Architecture",
    description: "Technical systems that connect marketing, sales, and operations seamlessly.",
    tags: ["MarTech Stack", "API Integration", "Data Pipelines"]
  },
  {
    icon: <Palette size={32} />,
    title: "Brand & Creative",
    description: "Visual identity and creative assets that communicate brand value effectively.",
    tags: ["Brand Systems", "Web Design", "Content Creation"]
  },
  {
    icon: <Zap size={32} />,
    title: "Lifecycle Marketing",
    description: "Customer journey optimization from acquisition to retention and expansion.",
    tags: ["Onboarding", "Retention", "Upsell/Cross-sell"]
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="section-heading">Services & Expertise</h2>
        <p className="section-subheading">
          A unique combination of marketing strategy and technical execution. I build systems that drive measurable results.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

