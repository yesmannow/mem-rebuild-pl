import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

/**
 * Dynamic SEO Head Component
 * Updates meta tags, Open Graph, and Twitter Card data for each page
 */
const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage = "https://jacobdarling.com/og-image.jpg",
  canonical
}) => {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = "Jacob Darling — Marketing Strategist & Systems Architect";
    const baseDescription = "Results-driven marketing professional specializing in digital marketing strategies, campaign automation, CRM integration, SEO/SEM, and analytics-driven strategy. Proven results: 400+ marketing automations, 70% ticket reduction, 40% conversion increase.";
    const baseKeywords = "marketing strategist, marketing technologist, marketing automation, CRM campaigns, SEO SEM, digital marketing, campaign automation, marketing ROI, Google Ads, Meta Ads, LinkedIn Ads, analytics-driven strategy, cross-functional project management, marketing manager, marketing systems architect";

    const finalTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    const finalDescription = description || baseDescription;
    const finalKeywords = keywords || baseKeywords;
    const finalCanonical = canonical || `https://jacobdarling.com${location.pathname}`;

    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Primary Meta Tags
    updateMetaTag("description", finalDescription);
    updateMetaTag("keywords", finalKeywords);

    // Open Graph / Facebook
    updateMetaTag("og:title", finalTitle, true);
    updateMetaTag("og:description", finalDescription, true);
    updateMetaTag("og:url", finalCanonical, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:site_name", "Jacob Darling Portfolio", true);

    // Twitter Card
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", finalTitle);
    updateMetaTag("twitter:description", finalDescription);
    updateMetaTag("twitter:image", ogImage);

    // Canonical URL
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", finalCanonical);
  }, [title, description, keywords, ogImage, canonical, location.pathname]);

  return null; // This component doesn't render anything
};

export default SEOHead;
