import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SideProjectSchemaProps {
  project: {
    id: string;
    title: string;
    slug: string;
    category: string;
    client: string;
    year: string;
    challenge: string;
    results: string;
    images: string[];
    tags: string[];
  };
}

const SideProjectSchema: React.FC<SideProjectSchemaProps> = ({ project }) => {
  const baseUrl = 'https://jacobdarling.com';
  const projectUrl = `${baseUrl}/side-projects/${project.slug}`;
  const imageUrl = `${baseUrl}${project.images[0]}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.challenge,
    url: projectUrl,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: 'Jacob Darling',
      url: baseUrl,
      sameAs: ['https://linkedin.com/in/jacobdarling', 'https://behance.net/jacobdarling'],
    },
    creator: {
      '@type': 'Person',
      name: 'Jacob Darling',
    },
    dateCreated: project.year,
    genre: project.category,
    keywords: project.tags.join(', '),
    about: project.category,
    workExample: {
      '@type': 'CreativeWork',
      name: project.title,
      description: project.results,
      image: imageUrl,
    },
    provider: {
      '@type': 'Organization',
      name: 'Jacob Darling Design',
      url: baseUrl,
    },
  };

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Client Work',
        item: `${baseUrl}/side-projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{project.title} | Jacob Darling Design</title>
      <meta name="title" content={`${project.title} | Jacob Darling Design`} />
      <meta name="description" content={project.challenge} />
      <meta
        name="keywords"
        content={`${project.tags.join(', ')}, jacob darling, design, branding, ${project.category.toLowerCase()}`}
      />
      <meta name="author" content="Jacob Darling" />
      <link rel="canonical" href={projectUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={projectUrl} />
      <meta property="og:title" content={`${project.title} | Jacob Darling Design`} />
      <meta property="og:description" content={project.challenge} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Jacob Darling Design" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={projectUrl} />
      <meta property="twitter:title" content={`${project.title} | Jacob Darling Design`} />
      <meta property="twitter:description" content={project.challenge} />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="twitter:creator" content="@jacobdarling" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbStructuredData)}</script>
    </Helmet>
  );
};

export default SideProjectSchema;
