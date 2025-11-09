import React from "react";

const BASE_URL = "https://www.bearcavemarketing.com";
const BIO_IMAGE_PATH = "/images/bio/bio-photo.jpg";

const PersonSchema: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jacob Darling",
    "image": `${BASE_URL}${BIO_IMAGE_PATH}`,
    "description": "Creative Technologist and Marketing Strategist integrating strategy, design, and motion. Specializing in marketing automation, web development, and systems architecture.",
    "jobTitle": "Marketing Strategist & Systems Architect",
    "url": BASE_URL,
    "sameAs": [
      "https://linkedin.com/in/jacobdarling",
      "https://github.com/JdarlingGT"
    ],
    "knowsAbout": [
      "Marketing Strategy",
      "Marketing Automation",
      "Web Development",
      "Systems Architecture",
      "Brand Design",
      "React Development",
      "GSAP Animation",
      "SEO Optimization"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Various Marketing and Technology Organizations"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Jacob Darling Portfolio",
      "url": BASE_URL
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "professional",
      "url": `${BASE_URL}/contact`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  );
};

export default PersonSchema;
