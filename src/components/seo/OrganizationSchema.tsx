import React from "react";

const BASE_URL = "https://www.bearcavemarketing.com";

const OrganizationSchema: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BearCave Marketing",
    "url": BASE_URL,
    "logo": `${BASE_URL}/images/logo-primary.svg`,
    "description": "Marketing systems architecture and automation services. Building revenue engines through strategy, creative, analytics, and execution.",
    "foundingDate": "2009",
    "founder": {
      "@type": "Person",
      "name": "Jacob Darling"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "jacob@jacobdarling.com",
      "url": `${BASE_URL}/contact`,
      "areaServed": "US",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://linkedin.com/in/jacobdarling",
      "https://github.com/JdarlingGT"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  );
};

export default OrganizationSchema;

