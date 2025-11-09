import React from "react";

const BASE_URL = "https://www.bearcavemarketing.com";

interface ServiceSchemaProps {
  services?: Array<{
    name: string;
    description: string;
    category?: string;
  }>;
}

const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  services = [
    {
      name: "Marketing Strategy",
      description: "Data-driven strategies that align with business goals and drive measurable growth.",
      category: "Marketing"
    },
    {
      name: "Marketing Automation",
      description: "End-to-end automation systems that reduce manual work and increase efficiency.",
      category: "Marketing"
    },
    {
      name: "Analytics & Optimization",
      description: "Full-funnel analytics and conversion optimization to maximize ROI.",
      category: "Marketing"
    },
    {
      name: "Systems Architecture",
      description: "Technical systems that connect marketing, sales, and operations seamlessly.",
      category: "Technology"
    },
    {
      name: "Brand & Creative",
      description: "Visual identity and creative assets that communicate brand value effectively.",
      category: "Design"
    },
    {
      name: "Lifecycle Marketing",
      description: "Customer journey optimization from acquisition to retention and expansion.",
      category: "Marketing"
    }
  ]
}) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Marketing Services",
    "provider": {
      "@type": "Organization",
      "name": "BearCave Marketing",
      "url": BASE_URL
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Marketing Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "category": service.category || "Marketing"
        },
        "position": index + 1
      }))
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  );
};

export default ServiceSchema;

