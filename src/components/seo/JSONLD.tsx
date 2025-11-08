import React from "react";

export default function JSONLD() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jacob Darling",
    url: "https://www.bearcavemarketing.com",
    jobTitle: "Marketing Strategist & Systems Architect",
    sameAs: [
      "https://linkedin.com/in/jacobdarling",
      "https://github.com/JdarlingGT",
    ],
    description: "I build marketing systems that turn brands into revenue engines.",
    knowsAbout: [
      "Marketing Automation",
      "CRM Campaigns",
      "Digital Marketing Strategy",
      "SEO/SEM",
      "Web Development",
      "Marketing Analytics",
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "BearCave Marketing",
    url: "https://www.bearcavemarketing.com",
    founder: {
      "@type": "Person",
      name: "Jacob Darling",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "Marketing Strategy & Systems Architecture",
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
    </>
  );
}

