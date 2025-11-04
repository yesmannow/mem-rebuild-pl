import React from "react";

interface ImageObject {
  src: string;
  alt: string;
  title?: string;
  category?: string;
  tags?: string[];
}

interface GallerySchemaProps {
  type: "photography" | "design";
  images: ImageObject[];
  galleryTitle: string;
  galleryDescription: string;
}

const GallerySchema: React.FC<GallerySchemaProps> = ({
  type,
  images,
  galleryTitle,
  galleryDescription
}) => {
  const baseUrl = "https://jacobdarling.com";
  
  // Create ImageGallery structured data
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": galleryTitle,
    "description": galleryDescription,
    "url": `${baseUrl}/${type}`,
    "author": {
      "@type": "Person",
      "name": "Jacob Darling",
      "url": baseUrl,
      "sameAs": [
        "https://linkedin.com/in/jacobdarling",
        "https://github.com/JdarlingGT"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jacob Darling Portfolio",
      "url": baseUrl
    },
    "image": images.slice(0, 10).map(img => ({
      "@type": "ImageObject",
      "url": `${baseUrl}${img.src}`,
      "name": img.title || img.alt,
      "description": img.alt,
      "keywords": img.tags?.join(", ") || "",
      "contentUrl": `${baseUrl}${img.src}`,
      "thumbnailUrl": `${baseUrl}${img.src}`,
      "author": {
        "@type": "Person",
        "name": "Jacob Darling"
      },
      "copyrightHolder": {
        "@type": "Person",
        "name": "Jacob Darling"
      },
      "license": "https://creativecommons.org/licenses/by-nc/4.0/",
      "acquireLicensePage": `${baseUrl}/contact`
    }))
  };

  // Create CreativeWork schema for portfolio
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": galleryTitle,
    "description": galleryDescription,
    "url": `${baseUrl}/${type}`,
    "creator": {
      "@type": "Person",
      "name": "Jacob Darling",
      "jobTitle": "Marketing Strategist & Systems Architect",
      "url": baseUrl
    },
    "genre": type === "photography" ? "Photography" : "Graphic Design",
    "keywords": [
      ...new Set(images.flatMap(img => img.tags || []))
    ].join(", "),
    "inLanguage": "en-US",
    "dateCreated": "2024",
    "dateModified": new Date().toISOString().split('T')[0],
    "copyrightHolder": {
      "@type": "Person",
      "name": "Jacob Darling"
    },
    "license": "https://creativecommons.org/licenses/by-nc/4.0/"
  };

  // Create WebPage schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": galleryTitle,
    "description": galleryDescription,
    "url": `${baseUrl}/${type}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Jacob Darling Portfolio",
      "url": baseUrl
    },
    "author": {
      "@type": "Person",
      "name": "Jacob Darling"
    },
    "mainEntity": {
      "@id": `${baseUrl}/${type}#gallery`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": galleryTitle,
          "item": `${baseUrl}/${type}`
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageGallerySchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema, null, 2)
        }}
      />
    </>
  );
};

export default GallerySchema;
