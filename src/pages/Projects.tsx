import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../components/animations/AnimatedSection";
import TextReveal from "../components/animations/TextReveal";
import TiltCard from "../components/interactive/TiltCard";
import StaggerGrid from "../components/animations/StaggerGrid";
import { fadeInUp } from "../utils/animations";
import "./Projects.css";

interface Project {
  id: string;
  title: string;
  client: string;
  type: string;
  description: string;
  year: string;
  services: string[];
  logo?: string;
  images: string[];
  video?: string;
  url?: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    id: "riley-bennett-egloff",
    title: "Riley Bennett Egloff",
    client: "Riley Bennett Egloff LLP",
    type: "Legal Services Website",
    description: "Professional law firm website showcasing attorneys, practice areas, and legal expertise with a modern, trustworthy design.",
    year: "2024",
    services: ["Web Design", "WordPress Development", "Content Strategy", "Photography Integration"],
    logo: "/images/projects/riley bennett egloff/RBE-Logo-with-®-RGB-jpg.jpg",
    images: [
      "/images/projects/riley bennett egloff/attorneys.jpg",
      "/images/projects/riley bennett egloff/download.jpg",
      "/images/projects/riley bennett egloff/dss.jpg"
    ],
    url: "https://rbelaw.com",
    highlights: [
      "Attorney profiles with professional photography",
      "Practice area showcase pages",
      "Responsive design for all devices",
      "Professional branding integration"
    ]
  },
  {
    id: "tuohy-bailey-moore",
    title: "Tuohy Bailey & Moore LLP",
    client: "Tuohy Bailey & Moore LLP",
    type: "Corporate Law Firm Website",
    description: "Sophisticated law firm website highlighting business transactions, commercial law, and corporate legal services.",
    year: "2024",
    services: ["Web Design", "WordPress Development", "SEO", "Content Management"],
    images: [
      "/images/projects/Tuohy Bailey & Moore LLP/Screenshot of Home - Tuohy Bailey & Moore LLP.jpg",
      "/images/projects/Tuohy Bailey & Moore LLP/Screenshot of Business Transactions - Tuohy Bailey & Moore LLP.jpg",
      "/images/projects/Tuohy Bailey & Moore LLP/Screenshot of Commercial Law - Tuohy Bailey & Moore LLP.jpg"
    ],
    video: "/images/projects/Tuohy Bailey & Moore LLP/Screen recording (2).webm",
    url: "https://tuohybaileymoore.com",
    highlights: [
      "Clean, professional design aesthetic",
      "Service area navigation",
      "Business transaction expertise showcase",
      "Mobile-optimized experience"
    ]
  },
  {
    id: "russell-painting",
    title: "Russell Painting Company",
    client: "Russell Painting Company, Inc.",
    type: "Service Business Website",
    description: "Modern website for painting and power washing services, designed to generate leads and showcase service quality.",
    year: "2024",
    services: ["Web Design", "WordPress Development", "Lead Generation", "Visual Branding"],
    logo: "/images/projects/Russell painting/New-Logo-Transparent-1.png",
    images: [
      "/images/projects/Russell painting/Screenshot of Power Washing _ Russell Painting Company, Inc.jpg"
    ],
    video: "/images/projects/Russell painting/Screen recording (2).webm",
    url: "https://russellpainting.com",
    highlights: [
      "Service-focused layout",
      "Lead generation optimization",
      "Before/after project showcases",
      "Local SEO implementation"
    ]
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="projects-page">
      <AnimatedSection>
        <header className="projects-header">
          <TextReveal text="Web Development Projects" className="page-title" />
          <motion.p className="page-subtitle" variants={fadeInUp}>
            Professional websites built with WordPress, combining strategic design with technical execution
          </motion.p>
        </header>
      </AnimatedSection>

      {/* Projects Stats */}
      <AnimatedSection delay={0.1}>
        <div className="projects-stats">
          <div className="stat-item">
            <span className="stat-number">{projects.length}</span>
            <span className="stat-label">Websites Built</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">WordPress</span>
            <span className="stat-label">Platform</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Grid */}
      <AnimatedSection delay={0.2}>
        <StaggerGrid className="projects-grid" staggerDelay={0.1}>
          {projects.map((project) => (
            <TiltCard key={project.id} className="project-card-wrapper" tiltAmount={5}>
              <motion.div
                className="project-card"
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -8 }}
              >
                {/* Project Image */}
                <div className="project-image-wrapper">
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    className="project-image"
                  />
                  {project.logo && (
                    <div className="project-logo">
                      <img src={project.logo} alt={`${project.client} logo`} />
                    </div>
                  )}
                  <div className="project-overlay">
                    <span className="view-project">View Details →</span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="project-info">
                  <span className="project-type">{project.type}</span>
                  <h3>{project.title}</h3>
                  <p className="project-client">{project.client}</p>
                  <p className="project-description">{project.description}</p>
                  
                  {/* Services Tags */}
                  <div className="services-tags">
                    {project.services.slice(0, 3).map((service) => (
                      <span key={service} className="service-tag">{service}</span>
                    ))}
                  </div>

                  <span className="project-year">{project.year}</span>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </StaggerGrid>
      </AnimatedSection>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          className="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>

            {/* Modal Header */}
            <div className="modal-header">
              {selectedProject.logo && (
                <img src={selectedProject.logo} alt={selectedProject.client} className="modal-logo" />
              )}
              <h2>{selectedProject.title}</h2>
              <p className="modal-client">{selectedProject.client}</p>
              <span className="modal-type">{selectedProject.type} • {selectedProject.year}</span>
            </div>

            {/* Video if available */}
            {selectedProject.video && (
              <div className="modal-video">
                <video controls autoPlay muted loop>
                  <source src={selectedProject.video} type="video/webm" />
                  Your browser doesn't support video.
                </video>
              </div>
            )}

            {/* Project Images */}
            <div className="modal-images">
              {selectedProject.images.map((image, index) => (
                <img key={index} src={image} alt={`${selectedProject.title} screenshot ${index + 1}`} />
              ))}
            </div>

            {/* Description */}
            <div className="modal-description">
              <p>{selectedProject.description}</p>
            </div>

            {/* Highlights */}
            <div className="modal-highlights">
              <h3>Key Features</h3>
              <ul>
                {selectedProject.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="modal-services">
              <h3>Services Provided</h3>
              <div className="services-list">
                {selectedProject.services.map((service) => (
                  <span key={service} className="service-badge">{service}</span>
                ))}
              </div>
            </div>

            {/* Visit Website Button */}
            {selectedProject.url && (
              <a 
                href={selectedProject.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="visit-website-btn"
              >
                Visit Website →
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

export default Projects;