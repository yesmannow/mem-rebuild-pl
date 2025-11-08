import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEOHead({
  title = "BearCave Marketing — Jacob Darling",
  description = "I build marketing systems that turn brands into revenue engines.",
  keywords,
  image = "/og.jpg",
  url = "https://www.bearcavemarketing.com",
}: SEOHeadProps) {
  const fullTitle = title.includes("BearCave") ? title : `${title} | BearCave Marketing`;
  const fullUrl = url.startsWith("http") ? url : `https://www.bearcavemarketing.com${url}`;
  const fullImage = image.startsWith("http") ? image : `https://www.bearcavemarketing.com${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="BearCave Marketing" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}
