import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export default function SEOHead({
  title = 'BearCave Marketing — Jacob Darling',
  description = 'I build marketing systems that turn brands into revenue engines.',
  keywords,
  image = '/og-image.jpg',
  url = 'https://www.bearcavemarketing.com',
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
}: SEOHeadProps) {
  const fullTitle = title.includes('BearCave') ? title : `${title} | BearCave Marketing`;
  const fullUrl = url.startsWith('http') ? url : `https://www.bearcavemarketing.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://www.bearcavemarketing.com${image}`;
  const siteName = 'BearCave Marketing';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags && tags.map((tag, index) => <meta key={index} property="article:tag" content={tag} />)}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@bearcavemarketing" />
      <meta name="twitter:creator" content="@jacobdarling" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#0D0D0F" />
    </Helmet>
  );
}
